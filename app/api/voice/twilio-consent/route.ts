/**
 * NOT LEGAL ADVICE.
 *
 * Twilio Programmable Voice entry webhook. DR-707.
 *
 * When an inbound call lands on the 1300 number, Twilio POSTs to this URL.
 * We respond with TwiML that plays the DR-713 consent utterance then
 * <Gather>s DTMF or speech. On consent, control passes to the `/handle`
 * sub-route which either bridges to Sarah or falls back to a human.
 *
 * Flag-off by default: until `VOICE_AGENT_ENABLED === 'true'` the handler
 * still plays consent and still gathers input, but declined/silent calls go
 * straight to the human queue. That way we can exercise the wire path in
 * staging with zero risk of bridging to ElevenLabs.
 *
 * Refs: DR-706 (epic), DR-707 (1300 + Twilio), DR-713 (consent utterance).
 */

import { NextResponse } from 'next/server';
import { CONSENT_UTTERANCE, CONSENT_UTTERANCE_VERSION } from '@/lib/voice/consent-utterance';
import { verifyTwilioSignature } from '@/lib/voice/twilio-signature';
import { requestLogger, captureException } from '@/lib/observability';

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

/** Reconstruct the full public URL Twilio signed against. */
function reconstructUrl(request: Request): string {
  const urlOverride = process.env.TWILIO_WEBHOOK_BASE_URL;
  if (urlOverride) {
    const u = new URL(request.url);
    return `${urlOverride.replace(/\/$/, '')}${u.pathname}${u.search}`;
  }
  return request.url;
}

export async function POST(request: Request): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/voice/twilio-consent' });
  try {
    // Parse form-encoded Twilio body once — used for both signature verify and TwiML context.
    const rawBody = await request.text();
    const params: Record<string, string> = {};
    for (const [k, v] of new URLSearchParams(rawBody)) params[k] = v;

    const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
    const header = request.headers.get('x-twilio-signature');
    const url = reconstructUrl(request);

    if (!verifyTwilioSignature(authToken, url, params, header)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Gather the caller's response. Speech "yes/ok/agree" OR pressing any
    // digit OTHER than 0 = consent. Pressing 0, saying "no/human/person",
    // or timing out = decline (routes to human, no LLM).
    // Per canonical APP 8 wording (compliance.md §3): "press 0 at any time
    // to speak to a person" — opt-out is press-0, not opt-in press-1.
    const gatherAction = '/api/voice/twilio-consent/handle';
    const humanTransfer = '/api/voice/twilio-consent/human-transfer';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="dtmf speech" numDigits="1" timeout="8" speechTimeout="auto" action="${gatherAction}" method="POST" language="en-AU" hints="yes, yeah, ok, okay, correct, continue, agree, no, human, person, operator">
    <Say voice="Polly.Nicole-Neural" language="en-AU">${escapeXml(CONSENT_UTTERANCE)}</Say>
  </Gather>
  <Say voice="Polly.Nicole-Neural" language="en-AU">We didn't catch that. Transferring you to a human operator now.</Say>
  <Redirect method="POST">${humanTransfer}</Redirect>
</Response>`;

    return twimlResponse(xml);
  } catch (error) {
    log.error('handler failed', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/voice/twilio-consent' },
      extra: { requestId: log.requestId },
    });
    // TwiML fallback — terminate cleanly so the caller is never stuck on silence.
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Hangup/></Response>`;
    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
    });
  }
}
