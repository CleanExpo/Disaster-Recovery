/**
 * NOT LEGAL ADVICE.
 *
 * Twilio SMS helper for Stripe Checkout handoff. DR-712.
 *
 * Sends the Checkout URL to the customer's phone via Twilio's REST API.
 * Graceful no-op when Twilio creds are absent: logs a compliance event
 * (`sms_queued_sans_twilio`) rather than throwing — lets the create-session
 * path succeed in dev/staging without live Twilio.
 *
 * Uses the Fetch API (no Twilio SDK dependency).
 *
 * Refs: DR-706 (epic), DR-712 (Stripe Checkout + SMS handoff).
 */

import { logComplianceEvent } from '@/lib/compliance/events';

export interface SmsLinkInput {
  /** Stripe Checkout session URL (https://checkout.stripe.com/...). */
  sessionUrl: string;
  /** E.164 customer phone (e.g. +61412345678). */
  customerPhone: string;
  /** Optional correlation id — claim_id or stripe session id — for audit. */
  correlationId?: string;
}

export interface SmsLinkResult {
  sent: boolean;
  reason?: string;
  twilioSid?: string;
}

const SMS_BODY = (url: string): string =>
  `Disaster Recovery: tap to pay your platform fee — ${url}. Expires in 60 min. Reply STOP to opt out.`;

/**
 * Send the Checkout SMS. Never throws — returns `{ sent: false, reason }`
 * instead so callers can decide whether to 500 or continue.
 */
export async function sendCheckoutSms(input: SmsLinkInput): Promise<SmsLinkResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID ?? '';
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
  const fromNumber = process.env.TWILIO_SMS_FROM_NUMBER ?? '';

  if (!accountSid || !authToken || !fromNumber) {
    void logComplianceEvent({
      eventType: 'finance_referral_handoff',
      correlationId: input.correlationId ?? 'unknown',
      correlationType: 'finance_referral',
      entityType: 'customer',
      entityIdentifier: input.customerPhone,
      metadata: {
        channel: 'sms',
        outcome: 'sms_queued_sans_twilio',
        reason_missing_creds: !accountSid
          ? 'TWILIO_ACCOUNT_SID'
          : !authToken
            ? 'TWILIO_AUTH_TOKEN'
            : 'TWILIO_SMS_FROM_NUMBER',
      },
    });
    return { sent: false, reason: 'twilio-not-configured' };
  }

  const body = SMS_BODY(input.sessionUrl);
  const form = new URLSearchParams({
    To: input.customerPhone,
    From: fromNumber,
    Body: body,
  });

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      void logComplianceEvent({
        eventType: 'finance_referral_handoff',
        correlationId: input.correlationId ?? 'unknown',
        correlationType: 'finance_referral',
        entityType: 'customer',
        entityIdentifier: input.customerPhone,
        metadata: {
          channel: 'sms',
          outcome: 'sms_send_failed',
          http_status: res.status,
          error_preview: errText.slice(0, 200),
        },
      });
      return { sent: false, reason: `twilio-http-${res.status}` };
    }

    const json = (await res.json()) as { sid?: string };
    void logComplianceEvent({
      eventType: 'finance_referral_handoff',
      correlationId: input.correlationId ?? 'unknown',
      correlationType: 'finance_referral',
      entityType: 'customer',
      entityIdentifier: input.customerPhone,
      metadata: {
        channel: 'sms',
        outcome: 'sms_sent',
        twilio_sid: json.sid,
      },
    });
    return { sent: true, twilioSid: json.sid };
  } catch (err) {
    void logComplianceEvent({
      eventType: 'finance_referral_handoff',
      correlationId: input.correlationId ?? 'unknown',
      correlationType: 'finance_referral',
      entityType: 'customer',
      entityIdentifier: input.customerPhone,
      metadata: {
        channel: 'sms',
        outcome: 'sms_exception',
        error: err instanceof Error ? err.message : String(err),
      },
    });
    return { sent: false, reason: 'twilio-exception' };
  }
}
