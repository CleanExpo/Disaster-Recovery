/**
 * POST /api/stripe/verify-payment
 *
 * Verifies a Stripe Checkout Session after the contractor returns from Stripe.
 * Called by /contractor/onboarding/payment-success?session_id={CHECKOUT_SESSION_ID}
 *
 * Returns { verified: true, contractorId } on success so the UI can unlock
 * the onboarding dashboard.
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  sessionId: z
    .string()
    .min(1, 'Session ID is required')
    .refine((v) => v.startsWith('cs_'), { message: 'Invalid Stripe session ID' }),
});

export async function POST(req: NextRequest) {
  // Parse + validate body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid request' },
      { status: 400 }
    );
  }

  const { sessionId } = parsed.data;

  // Graceful degradation when Stripe is not configured (local dev without keys)
  if (!isStripeConfigured() || !stripe) {
    // Look up local DB record and return verified if payment was already marked completed
    const payment = await prisma.onboardingPayment.findFirst({
      where: { stripeSessionId: sessionId },
    });

    if (payment?.status === 'completed') {
      return NextResponse.json({
        success: true,
        verified: true,
        contractorId: payment.contractorId,
        source: 'db-fallback',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Payment system not configured', code: 'STRIPE_NOT_CONFIGURED' },
      { status: 503 }
    );
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    const isPaymentPaid = session.payment_status === 'paid';
    const contractorId = session.metadata?.contractorId ?? null;

    if (!isPaymentPaid) {
      return NextResponse.json({
        success: false,
        verified: false,
        paymentStatus: session.payment_status,
        error: 'Payment has not been completed',
      });
    }

    // Sync DB record to completed (idempotent — webhook may have already done this)
    if (contractorId) {
      const payment = await prisma.onboardingPayment.findFirst({
        where: { stripeSessionId: sessionId },
      });

      if (payment && payment.status !== 'completed') {
        await prisma.onboardingPayment.update({
          where: { id: payment.id },
          data: { status: 'completed' },
        });
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      contractorId,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error('[verify-payment] Stripe error:', error);

    // If session doesn't exist or is expired, Stripe throws a resource_missing error
    const stripeError = error as { type?: string; message?: string };
    if (stripeError?.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired payment session', code: 'SESSION_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to verify payment', code: 'VERIFICATION_ERROR' },
      { status: 500 }
    );
  }
}
