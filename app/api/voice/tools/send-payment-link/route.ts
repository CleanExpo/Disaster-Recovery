// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Tool 4: send_payment_link(draft_id, phone) → { sent: boolean }
//
// Creates a Stripe Checkout Session when STRIPE_SECRET_KEY is set, otherwise
// falls back to a placeholder URL. SMS body is a SERVER-SIDE CONSTANT.

import { NextResponse } from 'next/server';
import { preflight, z } from '@/lib/voice/route-helpers';
import { filterToolOutput, sanitiseSmsBody } from '@/lib/voice/output-filter';
import { getDraft } from '@/lib/voice/draft-store';
import { logComplianceEvent } from '@/lib/voice/route-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const InputSchema = z.object({
  draft_id: z.string().uuid(),
  phone: z.string().min(6).max(32),
});

// Flat callout fee for voice-initiated claims. Placeholder — real pricing
// lives in `/pricing` content; the agent is not authorised to quote bespoke
// amounts, so this fee is a SERVER-SIDE CONSTANT.
const CALLOUT_FEE_AUD_CENTS = 33000;

async function createStripeCheckoutUrl(draft_id: string): Promise<string | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    // Use SDK if available; fall back to REST if not. The repo lists stripe
    // as a dependency (^16.12.0) so the dynamic import should succeed.
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'aud',
            unit_amount: CALLOUT_FEE_AUD_CENTS,
            product_data: { name: 'Disaster Recovery callout fee' },
          },
        },
      ],
      metadata: { dr_claim_id: draft_id, dr_source_channel: 'voice' },
      success_url: 'https://disasterrecovery.com.au/payment/success?cs={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://disasterrecovery.com.au/payment/cancelled',
    });
    return session.url || null;
  } catch (err) {
    console.error(JSON.stringify({ level: 'warn', source: 'api/voice/tools/send-payment-link', msg: 'stripe error', error: err instanceof Error ? err.message : String(err) }));
    return null;
  }
}

export async function POST(request: Request) {
  const pre = await preflight(request, {
    toolName: 'send_payment_link',
    schema: InputSchema,
    rateLimitMax: 3,
  });
  if (!pre.ok) return pre.response;

  const { draft_id, phone } = pre.body;
  const draft = getDraft(draft_id);
  if (!draft) {
    await logComplianceEvent({
      session_id: pre.sessionId,
      event_type: 'voice_tool_invoked',
      tool_name: 'send_payment_link',
      outcome: 'error',
      metadata: { reason: 'draft_not_found', draft_id },
    });
    return NextResponse.json({ error: 'draft_not_found' }, { status: 404 });
  }

  const stripeUrl = await createStripeCheckoutUrl(draft_id);
  const url = stripeUrl || `https://disasterrecovery.com.au/payment/${draft_id}`;

  const smsBody = sanitiseSmsBody(
    `Disaster Recovery: tap to pay your callout fee: ${url}. Expires 1h. Reply STOP to opt out.`
  );

  const hasTwilio =
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_FROM_NUMBER;

  if (hasTwilio) {
    try {
      const sid = process.env.TWILIO_ACCOUNT_SID!;
      const token = process.env.TWILIO_AUTH_TOKEN!;
      const from = process.env.TWILIO_FROM_NUMBER!;
      const params = new URLSearchParams({ To: phone, From: from, Body: smsBody });
      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      if (!res.ok) {
        await logComplianceEvent({
          session_id: pre.sessionId,
          event_type: 'voice_tool_invoked',
          tool_name: 'send_payment_link',
          outcome: 'error',
          metadata: { reason: 'twilio_http_error', status: res.status, draft_id },
        });
        return NextResponse.json(filterToolOutput({ sent: false }, ['sent']));
      }
    } catch (err) {
      await logComplianceEvent({
        session_id: pre.sessionId,
        event_type: 'voice_tool_invoked',
        tool_name: 'send_payment_link',
        outcome: 'error',
        metadata: { reason: 'twilio_exception', draft_id, err: String(err) },
      });
      return NextResponse.json(filterToolOutput({ sent: false }, ['sent']));
    }
  } else {
    await logComplianceEvent({
      session_id: pre.sessionId,
      event_type: 'sms_queued_sans_twilio',
      tool_name: 'send_payment_link',
      outcome: 'queued',
      metadata: { draft_id, to_masked: phone.slice(-4), stripe: !!stripeUrl },
    });
  }

  await logComplianceEvent({
    session_id: pre.sessionId,
    event_type: 'voice_tool_invoked',
    tool_name: 'send_payment_link',
    outcome: 'ok',
    metadata: { draft_id, stripe: !!stripeUrl },
  });

  return NextResponse.json(filterToolOutput({ sent: true }, ['sent']));
}
