// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Tool 3: send_signature_link(draft_id, phone) → { sent: boolean }
//
// SMS body is a SERVER-SIDE CONSTANT. The agent never supplies message text.
// When Twilio creds are absent we log `sms_queued_sans_twilio` and return
// sent: true so the voice flow can continue in dev.

import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
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

export async function POST(request: Request) {
  const pre = await preflight(request, {
    toolName: 'send_signature_link',
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
      tool_name: 'send_signature_link',
      outcome: 'error',
      metadata: { reason: 'draft_not_found', draft_id },
    });
    return NextResponse.json({ error: 'draft_not_found' }, { status: 404 });
  }

  const shortId = randomUUID().slice(0, 8);
  const url = `https://disasterrecovery.com.au/c/${shortId}`;
  const smsBody = sanitiseSmsBody(
    `Disaster Recovery: tap to review & sign your claim: ${url}. Expires 24h. Reply STOP to opt out.`
  );

  const hasTwilio =
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_FROM_NUMBER;

  if (hasTwilio) {
    try {
      // Twilio REST call (no SDK required — form-encoded POST).
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
          tool_name: 'send_signature_link',
          outcome: 'error',
          metadata: { reason: 'twilio_http_error', status: res.status, draft_id },
        });
        return NextResponse.json(filterToolOutput({ sent: false }, ['sent']));
      }
    } catch (err) {
      await logComplianceEvent({
        session_id: pre.sessionId,
        event_type: 'voice_tool_invoked',
        tool_name: 'send_signature_link',
        outcome: 'error',
        metadata: { reason: 'twilio_exception', draft_id, err: String(err) },
      });
      return NextResponse.json(filterToolOutput({ sent: false }, ['sent']));
    }
  } else {
    await logComplianceEvent({
      session_id: pre.sessionId,
      event_type: 'sms_queued_sans_twilio',
      tool_name: 'send_signature_link',
      outcome: 'queued',
      metadata: { draft_id, short_id: shortId, to_masked: phone.slice(-4) },
    });
  }

  await logComplianceEvent({
    session_id: pre.sessionId,
    event_type: 'voice_tool_invoked',
    tool_name: 'send_signature_link',
    outcome: 'ok',
    metadata: { draft_id, short_id: shortId },
  });

  return NextResponse.json(filterToolOutput({ sent: true }, ['sent']));
}
