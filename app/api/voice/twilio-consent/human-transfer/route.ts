/**
 * NOT LEGAL ADVICE.
 *
 * Human transfer fallback. DR-707.
 *
 * Target for <Redirect> from both the consent entry route (on timeout) and
 * the handle route (on decline or agent-disabled). Plays a short message and
 * <Dial>s the ops queue number from env. If the queue number is missing, we
 * play a polite apology and hang up rather than 500 — caller is never stuck
 * listening to silence.
 *
 * Refs: DR-706, DR-707.
 */

import { NextResponse } from 'next/server';
import { CONSENT_UTTERANCE_VERSION } from '@/lib/voice/consent-utterance';
import { verifyTwilioSignature } from '@/lib/voice/twilio-signature';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function twimlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'X-DR-Consent-Version': CONSENT_UTTERANCE_VERSION,
    },
  });
}

function reconstructUrl(request: Request): string {
  const urlOverride = process.env.TWILIO_WEBHOOK_BASE_URL;
  if (urlOverride) {
    const u = new URL(request.url);
    return `${urlOverride.replace(/\/$/, '')}${u.pathname}${u.search}`;
  }
  return request.url;
}

export async function POST(request: Request): Promise<NextResponse> {
  const rawBody = await request.text();
  const params: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(rawBody)) params[k] = v;

  const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
  const header = request.headers.get('x-twilio-signature');
  const url = reconstructUrl(request);

  if (!verifyTwilioSignature(authToken, url, params, header)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const callSid = params.CallSid ?? 'unknown';
  const queue = process.env.TWILIO_HUMAN_QUEUE_NUMBER ?? '';

  void logComplianceEvent({
    eventType: 'claim_intake_created',
    correlationId: callSid,
    correlationType: 'claim',
    entityType: 'customer',
    consentMethod: 'voice_human',
    metadata: {
      call_sid: callSid,
      outcome: 'human_transfer',
      queue_configured: Boolean(queue),
    },
  });

  if (!queue) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Nicole-Neural" language="en-AU">We're sorry, our operators are unavailable right now. Please call back shortly or lodge a claim online at disasterrecovery.com.au.</Say>
  <Hangup />
</Response>`;
    return twimlResponse(xml);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Nicole-Neural" language="en-AU">Transferring you now.</Say>
  <Dial timeout="25" answerOnBridge="true">${escapeXml(queue)}</Dial>
</Response>`;
  return twimlResponse(xml);
}
