import { NextRequest, NextResponse } from 'next/server';
import { createOnboardingCheckoutSession, createStripeCustomer, isStripeConfigured } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Payment processing is not configured. Please contact support.' },
        { status: 503 }
      );
    }
    const { contractorId, email, name } = await req.json();

    if (!contractorId || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if contractor exists
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: { 
        onboardingPayment: true 
      }
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Check if payment already exists
    let payment = await prisma.onboardingPayment.findUnique({
      where: { contractorId }
    });

    // Create or get Stripe customer
    let stripeCustomerId = payment?.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await createStripeCustomer(email, name, contractorId);
      stripeCustomerId = customer.id;
    }

    // Create checkout session
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contractor/onboarding/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contractor/onboarding`;

    const session = await createOnboardingCheckoutSession(
      contractorId,
      email,
      successUrl,
      cancelUrl
    );

    // Create or update payment record
    if (!payment) {
      payment = await prisma.onboardingPayment.create({
        data: {
          contractorId,
          stripeCustomerId,
          status: 'PENDING',
        }
      });
    } else {
      payment = await prisma.onboardingPayment.update({
        where: { id: payment.id },
        data: {
          stripeCustomerId,
          status: 'PENDING',
        }
      });
    }

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Error creating payment session:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}