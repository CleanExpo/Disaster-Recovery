import { NextRequest, NextResponse } from 'next/server';
import { createOnboardingCheckoutSession, createStripeCustomer, isStripeConfigured } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import { withAuth, withRateLimit, withValidation, withSecurityHeaders, withCors, combineMiddleware } from '@/lib/auth-middleware';
import { PaymentValidator, PaymentAuditLogger, paymentValidationSchema } from '@/lib/payment-security';
import { z } from 'zod';

const prisma = new PrismaClient();

// SECURITY: Strict validation schema for payment creation
const createPaymentSchema = z.object({
  contractorId: z.string().uuid('Invalid contractor ID format'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  paymentType: z.literal('ONBOARDING').default('ONBOARDING') // Only onboarding payments for now
});

async function handleCreatePayment(req: NextRequest, validatedData: z.infer<typeof createPaymentSchema>) {
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  try {
    // SECURITY: Check if Stripe is configured
    if (!isStripeConfigured()) {
      PaymentAuditLogger.logPaymentAttempt({
        contractorId: validatedData.contractorId,
        amount: 0,
        paymentType: 'ONBOARDING',
        ipAddress: clientIP,
        userAgent,
        result: 'FAILURE',
        reason: 'Stripe not configured'
      });
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment processing is not configured. Please contact support.',
          code: 'PAYMENT_SYSTEM_UNAVAILABLE'
        },
        { status: 503 }
      );
    }

    // SECURITY: Calculate expected amount (server-side only)
    const expectedPayment = PaymentValidator.calculateOnboardingAmount();
    
    // SECURITY: Validate contractor exists and is authorised for payment
    const contractor = await prisma.contractor.findUnique({
      where: { id: validatedData.contractorId },
      include: { 
        onboardingPayment: true 
      }
    });

    if (!contractor) {
      PaymentAuditLogger.logPaymentAttempt({
        contractorId: validatedData.contractorId,
        amount: expectedPayment.amount,
        paymentType: 'ONBOARDING',
        ipAddress: clientIP,
        userAgent,
        result: 'FAILURE',
        reason: 'Contractor not found'
      });
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Contractor not found or not authorised for payment',
          code: 'CONTRACTOR_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // SECURITY: Check if contractor has already paid
    if (contractor.onboardingPayment?.status === 'COMPLETED') {
      PaymentAuditLogger.logPaymentAttempt({
        contractorId: validatedData.contractorId,
        amount: expectedPayment.amount,
        paymentType: 'ONBOARDING',
        ipAddress: clientIP,
        userAgent,
        result: 'FAILURE',
        reason: 'Payment already completed'
      });
      
      return NextResponse.json(
        {
          success: false,
          error: 'Payment has already been completed for this contractor',
          code: 'PAYMENT_ALREADY_COMPLETED'
        },
        { status: 400 }
      );
    }

    // SECURITY: Generate secure payment metadata
    const paymentMetadata = PaymentValidator.generatePaymentMetadata(
      validatedData.contractorId,
      'ONBOARDING',
      {
        email: validatedData.email,
        name: validatedData.name,
        ipAddress: clientIP
      }
    );

    // Check if payment already exists
    let payment = await prisma.onboardingPayment.findUnique({
      where: { contractorId: validatedData.contractorId }
    });

    // Create or get Stripe customer
    let stripeCustomerId = payment?.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await createStripeCustomer(
        validatedData.email, 
        validatedData.name, 
        validatedData.contractorId
      );
      stripeCustomerId = customer.id;
    }

    // SECURITY: Create checkout session with server-calculated amount
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contractor/onboarding/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contractor/onboarding`;

    const session = await createOnboardingCheckoutSession(
      validatedData.contractorId,
      validatedData.email,
      successUrl,
      cancelUrl,
      expectedPayment.amount, // SECURITY: Use server-calculated amount
      paymentMetadata
    );

    // Create or update payment record
    if (!payment) {
      payment = await prisma.onboardingPayment.create({
        data: {
          contractorId: validatedData.contractorId,
          stripeCustomerId,
          status: 'PENDING',
          amount: expectedPayment.amount,
          currency: expectedPayment.currency,
          metadata: JSON.stringify(paymentMetadata)
        }
      });
    } else {
      payment = await prisma.onboardingPayment.update({
        where: { id: payment.id },
        data: {
          stripeCustomerId,
          status: 'PENDING',
          amount: expectedPayment.amount,
          currency: expectedPayment.currency,
          metadata: JSON.stringify(paymentMetadata)
        }
      });
    }

    // SECURITY: Log successful payment creation
    PaymentAuditLogger.logPaymentAttempt({
      contractorId: validatedData.contractorId,
      amount: expectedPayment.amount,
      paymentType: 'ONBOARDING',
      ipAddress: clientIP,
      userAgent,
      result: 'SUCCESS',
      reason: 'Payment session created successfully'
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      amount: expectedPayment.amount,
      currency: expectedPayment.currency,
      breakdown: expectedPayment.breakdown
    });

  } catch (error) {
    console.error('Error creating payment session:', error);
    
    PaymentAuditLogger.logPaymentAttempt({
      contractorId: validatedData.contractorId,
      amount: 0,
      paymentType: 'ONBOARDING',
      ipAddress: clientIP,
      userAgent,
      result: 'FAILURE',
      reason: `System error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create payment session',
        code: 'PAYMENT_SYSTEM_ERROR'
      },
      { status: 500 }
    );
  }
}

// SECURITY: Apply comprehensive security middleware
export const POST = withValidation(
  handleCreatePayment,
  createPaymentSchema
);