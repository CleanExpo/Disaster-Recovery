import { NextRequest, NextResponse } from 'next/server';
import { createOnboardingCheckoutSession, createStripeCustomer, isStripeConfigured } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/lib/auth-middleware';
import { PaymentValidator, PaymentAuditLogger } from '@/lib/payment-security';
import { z } from 'zod';

// SECURITY: Strict validation schema for payment creation
const createPaymentSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional().default('Contractor'),
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
      where: { id: validatedData.contractorId }
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

    // Check if contractor has already paid
    const existingPayment = await prisma.onboardingPayment.findFirst({
      where: { contractorId: validatedData.contractorId }
    });

    if (existingPayment?.status === 'completed') {
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

    // Create Stripe customer for tracking purposes
    let stripeCustomerId: string | undefined;
    try {
      const customer = await createStripeCustomer(
        validatedData.email,
        validatedData.name,
        validatedData.contractorId
      );
      stripeCustomerId = customer.id;
    } catch {
      // Non-fatal — proceed without customer ID
    }

    // SECURITY: Create checkout session with server-calculated amount
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${appUrl}/contractor/onboarding/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${appUrl}/contractor/onboarding`;

    // Build string-only metadata for Stripe (values must be strings)
    const stripeMetadata: Record<string, string> = {};
    for (const [k, v] of Object.entries(paymentMetadata)) {
      stripeMetadata[k] = String(v);
    }
    if (stripeCustomerId) {
      stripeMetadata.stripeCustomerId = stripeCustomerId;
    }

    const session = await createOnboardingCheckoutSession(
      validatedData.contractorId,
      validatedData.email,
      successUrl,
      cancelUrl,
      expectedPayment.amount,
      stripeMetadata
    );

    // Create or update payment record using the actual schema fields
    if (!existingPayment) {
      await prisma.onboardingPayment.create({
        data: {
          contractorId: validatedData.contractorId,
          status: 'pending',
          amount: expectedPayment.amount / 100, // store in dollars
          currency: expectedPayment.currency,
          stripeSessionId: session.id,
          metadata: JSON.stringify({ ...paymentMetadata, stripeCustomerId })
        }
      });
    } else {
      await prisma.onboardingPayment.update({
        where: { id: existingPayment.id },
        data: {
          status: 'pending',
          amount: expectedPayment.amount / 100,
          currency: expectedPayment.currency,
          stripeSessionId: session.id,
          metadata: JSON.stringify({ ...paymentMetadata, stripeCustomerId })
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
