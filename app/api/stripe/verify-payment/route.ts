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
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';
import { PaymentValidator } from '@/lib/payment-security';
import { ONBOARDING_MODULE_COUNT, onboardingModuleName } from '@/lib/onboarding/program-constants';
import { buildContractorActivationUrl } from '@/lib/contractor-activation';
import { sendEmail, emailTemplates } from '@/lib/email';
import { z } from 'zod';

const schema = z.object({
  sessionId: z
    .string()
    .min(1, 'Session ID is required')
    .refine((v) => v.startsWith('cs_'), { message: 'Invalid Stripe session ID' }),
});

async function initialiseOnboardingAfterPayment(contractorId: string, sessionId: string) {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.onboardingPayment.findFirst({
      where: { stripeSessionId: sessionId },
      select: { id: true, status: true },
    });

    if (payment && payment.status !== 'completed') {
      await tx.onboardingPayment.update({
        where: { id: payment.id },
        data: { status: 'completed' },
      });
    }

    const contractor = await tx.contractor.update({
      where: { id: contractorId },
      data: {
        status: 'UNDER_REVIEW',
        onboardingStep: 1,
      },
      select: { id: true, email: true, username: true, emailVerified: true },
    });

    await tx.onboardingProgress.upsert({
      where: { contractorId },
      create: {
        contractorId,
        currentStep: 1,
        totalSteps: ONBOARDING_MODULE_COUNT,
        completed: false,
      },
      update: {
        currentStep: 1,
        totalSteps: ONBOARDING_MODULE_COUNT,
        completed: false,
      },
    });

    for (let moduleNumber = 1; moduleNumber <= ONBOARDING_MODULE_COUNT; moduleNumber++) {
      const moduleName = onboardingModuleName(moduleNumber);
      await tx.moduleProgress.upsert({
        where: {
          contractorId_moduleName: {
            contractorId,
            moduleName,
          },
        },
        create: {
          contractorId,
          moduleName,
          completed: false,
          attempts: 0,
        },
        update: {},
      });
    }

    return contractor;
  });
}

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/stripe/verify-payment' });
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
      { status: 400 },
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
      { status: 503 },
    );
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    });

    const isPaymentPaid = session.payment_status === 'paid';
    const contractorId = session.metadata?.contractorId ?? null;
    const isOnboardingSession = session.metadata?.type === 'onboarding';

    if (!isPaymentPaid) {
      return NextResponse.json({
        success: false,
        verified: false,
        paymentStatus: session.payment_status,
        error: 'Payment has not been completed',
      });
    }

    if (!isOnboardingSession || !contractorId) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Payment session is not a contractor onboarding session',
          code: 'SESSION_NOT_ONBOARDING',
        },
        { status: 400 },
      );
    }

    const expectedPayment = PaymentValidator.calculateOnboardingAmount();
    const actualAmount = session.amount_total ?? 0;
    if (actualAmount !== expectedPayment.amount) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: 'Payment amount validation failed',
          code: 'AMOUNT_MISMATCH',
        },
        { status: 400 },
      );
    }

    // Sync DB state idempotently. This mirrors the Stripe webhook path so
    // returning from Checkout is safe even if the webhook is delayed.
    const contractor = await initialiseOnboardingAfterPayment(contractorId, sessionId);
    const activationUrl = contractor.emailVerified
      ? undefined
      : buildContractorActivationUrl(contractor.id);

    if (contractor.email) {
      sendEmail(
        contractor.email,
        emailTemplates.contractorPaymentConfirmed(
          contractor.username ?? 'Contractor',
          contractor.id,
          activationUrl,
        ),
      ).catch(() => {
        // Non-fatal — payment + onboarding state are the source of truth.
      });
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'contractor',
      metadata: {
        route: '/api/stripe/verify-payment',
        request_id: log.requestId,
        stripe_session_id: sessionId,
        contractor_id: contractorId,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
      },
    });

    return NextResponse.json({
      success: true,
      verified: true,
      contractorId,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    log.error('stripe verify-payment error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/stripe/verify-payment' },
      extra: { requestId: log.requestId },
    });

    // If session doesn't exist or is expired, Stripe throws a resource_missing error
    const stripeError = error as { type?: string; message?: string };
    if (stripeError?.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired payment session', code: 'SESSION_NOT_FOUND' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to verify payment', code: 'VERIFICATION_ERROR' },
      { status: 500 },
    );
  }
}
