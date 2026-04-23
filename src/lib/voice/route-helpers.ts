// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Shared helpers for the five voice-tool route handlers. Keeps HMAC / flag /
// rate-limit boilerplate out of each route file.

import { NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import { verifyToolWebhookSignature, rateLimitCheck } from './tool-auth';
import { logEvent } from '../compliance/events';

export const SESSION_HEADER = 'x-elevenlabs-session-id';
export const SIGNATURE_HEADER = 'elevenlabs-signature';

export type PreflightResult<T> = {
  ok: boolean;
  body?: T;
  sessionId?: string | null;
  response?: NextResponse;
};

export async function preflight<T>(
  request: Request,
  opts: {
    toolName: string;
    schema: ZodSchema<T>;
    rateLimitMax?: number;
  }
): Promise<PreflightResult<T>> {
  // Feature flag — 503 when disabled.
  if (process.env.VOICE_AGENT_ENABLED !== 'true') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'agent_disabled' }, { status: 503 }),
    };
  }

  const rawBody = await request.text();
  const sig = request.headers.get(SIGNATURE_HEADER);

  if (!verifyToolWebhookSignature(rawBody, sig)) {
    await logEvent({
      event_type: 'voice_tool_invoked',
      tool_name: opts.toolName,
      outcome: 'rejected',
      metadata: { reason: 'bad_signature' },
    });
    return {
      ok: false,
      response: NextResponse.json({ error: 'invalid_signature' }, { status: 401 }),
    };
  }

  let parsed: unknown;
  try {
    parsed = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'invalid_json' }, { status: 400 }),
    };
  }

  const result = opts.schema.safeParse(parsed);
  if (!result.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'invalid_input', issues: result.error.issues },
        { status: 400 }
      ),
    };
  }

  const sessionId = request.headers.get(SESSION_HEADER);

  if (opts.rateLimitMax && opts.rateLimitMax > 0) {
    const permitted = rateLimitCheck(sessionId, opts.toolName, opts.rateLimitMax);
    if (!permitted) {
      await logEvent({
        session_id: sessionId,
        event_type: 'voice_tool_invoked',
        tool_name: opts.toolName,
        outcome: 'rate_limited',
      });
      return {
        ok: false,
        response: NextResponse.json({ error: 'rate_limited' }, { status: 429 }),
      };
    }
  }

  return { ok: true, body: result.data, sessionId };
}

// Small helper re-export to stabilise the zod import surface for routes.
export { z };
