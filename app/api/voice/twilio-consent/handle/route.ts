/**
 * NOT LEGAL ADVICE.
 *
 * Twilio <Gather> action handler. DR-707.
 *
 * Receives the digit/speech result from the APP 8 consent gate.
 *   - digit "0"                                                                => explicit decline (opt-out)
 *   - speech matches /no|nope|human|person|operator/i                          => explicit decline
 *   - speech matches /yes|yeah|ok|okay|correct|continue|agree/i                => consent granted
 *   - any digit 1-9                                                            => consent granted (caller acknowledged)
 *   - empty / timeout                                                          => declined / fallback (safe default — no LLM)
 *
 * Per canonical APP 8 wording (compliance.md §3): the opt-out is "press 0"
 * — we MUST NOT require positive press-1; that would invert the script.
 *
 * On consent AND VOICE_AGENT_ENABLED === 'true' we <Connect><Stream> to the
 * ElevenLabs conversational agent. Otherwise we redirect to human-transfer.
 *
 * Every outcome is logged via logComplianceEvent so the 7-year audit ledger
 * can reconstruct which callers heard which consent version and what they did.
 *
 * Refs: DR-706, DR-707, DR-713.
 */

import { NextResponse } from 'next/server';
import { CONSENT_UTTERANCE, CONSENT_UTTERANCE_VERSION } from '@/lib/voice/consent-utterance';
import { verifyTwilioSignature } from '@/lib/voice/twilio-signature';
import { logComplianceEvent, hashConsent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const CONSENT_WORD_RE = /\b(yes|yeah|yep|ok|okay|correct|continue|agree)\b/i;
const DECLINE_WORD_RE = /\b(no|nope|human|person|operator|stop|cancel)\b/i;

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

  const digits = (params.Digits ?? '').trim();
  const speech = (params.SpeechResult ?? '').trim();
  const callSid = params.CallSid ?? 'unknown';
  const from = params.From ?? '';

  // Decline takes precedence: press 0, speech matches decline words, or
  // empty/timeout → no consent. Otherwise any digit 1-9 or yes-words = consent.
  const explicitDecline = digits === '0' || (speech.length > 0 && DECLINE_WORD_RE.test(speech));
  const explicitConsent = (digits.length === 1 && digits !== '0') || CONSENT_WORD_RE.test(speech);
  const consentGranted = explicitConsent && !explicitDecline;
  const agentEnabled = process.env.VOICE_AGENT_ENABLED === 'true';
  const agentId = process.env.ELEVENLABS_AGENT_ID_SARAH ?? '';

  if (consentGranted) {
    // Log the grant event. Fire-and-forget — must not block TwiML response.
    void logComplianceEvent({
      eventType: 'claim_intake_consent_given',
      correlationId: callSid,
      correlationType: 'claim',
      entityType: 'customer',
      entityIdentifier: from || undefined,
      consentCopyHash: hashConsent(CONSENT_UTTERANCE),
      consentVersion: CONSENT_UTTERANCE_VERSION,
      consentMethod: 'voice_sarah',
      metadata: {
        call_sid: callSid,
        outcome: 'granted',
        channel: digits === '1' ? 'dtmf' : 'speech',
        agent_enabled: agentEnabled,
      },
    });

    if (agentEnabled && agentId) {
      // Brief Twilio-side beat to cover the WS handshake latency. The
      // actual greeting is delivered by the ElevenLabs agent's
      // configured `first_message` (CLAIMS_ASSISTANT_INTRO from
      // src/lib/voice/consent-utterance.ts) — keep this Say short so
      // the two greetings don't overlap.
      const streamUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${encodeURIComponent(agentId)}`;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Nicole-Neural" language="en-AU">Thanks. One moment.</Say>
  <Connect>
    <Stream url="${escapeXml(streamUrl)}" />
  </Connect>
</Response>`;
      return twimlResponse(xml);
    }

    // Consent granted but agent disabled — fall through to human.
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Nicole-Neural" language="en-AU">Thanks. Transferring you to a human operator now.</Say>
  <Redirect method="POST">/api/voice/twilio-consent/human-transfer</Redirect>
</Response>`;
    return twimlResponse(xml);
  }

  // Decline or silent.
  void logComplianceEvent({
    eventType: 'claim_intake_consent_given',
    correlationId: callSid,
    correlationType: 'claim',
    entityType: 'customer',
    entityIdentifier: from || undefined,
    consentCopyHash: hashConsent(CONSENT_UTTERANCE),
    consentVersion: CONSENT_UTTERANCE_VERSION,
    consentMethod: 'voice_sarah',
    metadata: {
      call_sid: callSid,
      outcome: digits || speech ? 'declined' : 'silent',
      channel: digits ? 'dtmf' : speech ? 'speech' : 'none',
      raw_speech_len: speech.length,
    },
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Nicole-Neural" language="en-AU">No problem. Transferring you to a human operator now.</Say>
  <Redirect method="POST">/api/voice/twilio-consent/human-transfer</Redirect>
</Response>`;
  return twimlResponse(xml);
}
