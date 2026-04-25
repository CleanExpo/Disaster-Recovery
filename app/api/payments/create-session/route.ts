/**
 * NOT LEGAL ADVICE.
 *
 * Stripe Checkout Session endpoint for consumer platform-fee payments.
 * DR-712 prep. Flag-gated via NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED + STRIPE_SECRET_KEY.
 *
 * POST /api/payments/create-session
 *   body: { claim_id, amount_cents, currency, customer_email, customer_phone, metadata? }
 *   ->   { url, session_id, expires_at }
 *
 * Flow:
 *   1. Validate body with zod.
 *   2. Reuse or create a Stripe Customer keyed on email.
 *   3. Create a Checkout Session (mode=payment, 1 hr expiry,
 *      3DS forced ≥ AU$500, idempotency key = dr:{claim}:create-session).
 *   4. Log `finance_referral_offered` compliance event.
 *   5. Return the hosted Checkout URL for the caller to SMS or redirect.
 *
 * Refs: DR-706 (epic), DR-712.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BodySchema = z.object({
  claim_id: z.string().uuid(),
  amount_cents: z.number().int().positive().max(10_000_00), // sanity cap AU$10k
  currency: z.literal('aud'),
  customer_email: z.string().email(),
  customer_phone: z.string().min(5).max(20),
  metadata: z.record(z.string()).optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
  // Flag gate — both server secret AND public consumer flag must be on.
  if (
    !process.env.STRIPE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_CONSUMER_PAYMENTS_ENABLED !== 'true'
  ) {
    return NextResponse.json(
      { error: 'consumer_payments_disabled', code: 'FLAG_OFF' },
      { status: 503 },
    );
  }

  if (!stripe) {
    return NextResponse.json(
      { error: 'stripe_not_configured', code: 'STRIPE_NOT_CONFIGURED' },
      { status: 503 },
    );
  }

  let parsed: z.infer<typeof BodySchema>;
  try {
    const json = await request.json();
    parsed = BodySchema.parse(json);
  } catch (err) {
    return NextResponse.json(
      {
        error: 'invalid_body',
        code: 'VALIDATION_ERROR',
        detail: err instanceof z.ZodError ? err.flatten() : String(err),
      },
      { status: 400 },
    );
  }

  const {
    claim_id,
    amount_cents,
    currency,
    customer_email,
    customer_phone,
    metadata,
  } = parsed;

  // 1. Reuse existing customer by email, else create.
  let customerId: string;
  try {
    const existing = await stripe.customers.list({ email: customer_email, limit: 1 });
    if (existing.data.length > 0) {
      customerId = existing.data[0]!.id;
    } else {
      const created = await stripe.customers.create({
        email: customer_email,
        phone: customer_phone,
        metadata: { dr_claim_id: claim_id },
      });
      customerId = created.id;
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: 'stripe_customer_error',
        code: 'STRIPE_CUSTOMER_ERROR',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }

  // 2. Build session params.
  const threeDsThresholdCents = Number.parseInt(
    process.env.DR_FORCE_3DS_ABOVE_CENTS ?? '50000',
    10,
  );
  const successUrl =
    process.env.DR_CHECKOUT_SUCCESS_URL ??
    'https://disasterrecovery.com.au/claim/paid?session_id={CHECKOUT_SESSION_ID}';
  const cancelUrl =
    process.env.DR_CHECKOUT_CANCEL_URL ?? 'https://disasterrecovery.com.au/claim/cancelled';
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;

  const sharedMetadata: Record<string, string> = {
    dr_claim_id: claim_id,
    dr_source_channel: metadata?.source_channel ?? 'consumer_web',
    dr_fee_type: 'platform_fee',
    ...(metadata ?? {}),
  };

  let sessionUrl: string | null;
  let sessionId: string;
  let sessionExpiresAt: number;

  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        customer: customerId,
        expires_at: expiresAt,
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency,
              unit_amount: amount_cents,
              product_data: {
                name: 'Disaster Recovery Platform Fee',
                description: `Claim ${claim_id}`,
              },
            },
          },
        ],
        payment_intent_data: {
          metadata: sharedMetadata,
        },
        payment_method_options: {
          card: {
            request_three_d_secure:
              amount_cents >= threeDsThresholdCents ? 'any' : 'automatic',
          },
        },
        metadata: sharedMetadata,
      },
      { idempotencyKey: `dr:${claim_id}:create-session` },
    );

    sessionUrl = session.url;
    sessionId = session.id;
    sessionExpiresAt = session.expires_at;
  } catch (err) {
    return NextResponse.json(
      {
        error: 'stripe_session_error',
        code: 'STRIPE_SESSION_ERROR',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }

  // 3. Compliance ledger.
  void logComplianceEvent({
    eventType: 'finance_referral_offered',
    correlationId: claim_id,
    correlationType: 'finance_referral',
    entityType: 'customer',
    entityIdentifier: customer_email,
    amountCents: amount_cents,
    amountCurrency: currency,
    consentMethod: 'web_form',
    metadata: {
      stripe_session_id: sessionId,
      stripe_customer_id: customerId,
      expires_at: sessionExpiresAt,
      source_channel: sharedMetadata.dr_source_channel,
      three_ds_forced: amount_cents >= threeDsThresholdCents,
    },
  });

  return NextResponse.json({
    url: sessionUrl,
    session_id: sessionId,
    expires_at: sessionExpiresAt,
  });
}
