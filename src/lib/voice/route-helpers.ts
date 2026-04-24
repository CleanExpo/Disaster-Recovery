// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Shared helpers for the five voice-tool route handlers. Keeps HMAC / flag /
// rate-limit boilerplate out of each route file.

import { NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import { verifyToolWebhookSignature, rateLimitCheck } from './tool-auth';
import { logComplianceEvent as logComplianceEventRaw } from '../compliance/events';

export const SESSION_HEADER = 'x-elevenlabs-session-id';
export const SIGNATURE_HEADER = 'elevenlabs-signature';

/**
 * Adapter between the voice-tool call-sites (snake_case, tool-centric shape)
 * and the canonical compliance ledger API (camelCase, event-centric shape
 * defined in DR-624 / src/lib/compliance/events.ts).
 */
export interface VoiceToolLog {
  session_id?: string | null;
  event_type?: string;
  tool_name?: string;
  outcome?: 'ok' | 'rejected' | 'rate_limited' | 'error' | 'queued';
  actor?: string;
  metadata?: Record<string, unknown>;
}

export async function logComplianceEvent(input: VoiceToolLog): Promise<void> {
  try {
    // `voice_tool_invoked` is not a first-class event in the canonical
    // ComplianceEventType enum yet; piggy-back on the closest match and
    // surface the real label in metadata. When the canonical enum is
    // extended (DR-624 schema v2) this cast can be removed.
    await logComplianceEventRaw({
      eventType: 'claim_intake_created' as never,
      correlationId: input.session_id ?? 'no-session',
      correlationType: 'system',
      metadata: {
        voice_tool_event: 'voice_tool_invoked',
        tool_name: input.tool_name,
        outcome: input.outcome,
        ...(input.metadata ?? {}),
      },
    });
  } catch {
    // Compliance logging must never break the primary flow; the underlying
    // writer already no-ops when COMPLIANCE_EVENTS_ENABLED is unset.
  }
}

export type PreflightResult<T> =
  | { ok: true; body: T; sessionId: string | null; response?: undefined }
  | { ok: false; response: NextResponse; body?: undefined; sessionId?: string | null };

export async function preflight<T>(
  request: Request,
  opts: {
    toolName: string;
    schema: ZodSchema<T>;
    rateLimitMax?: number;
  }
): Promise<PreflightResult<T>> {
  if (process.env.VOICE_AGENT_ENABLED !== 'true') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'agent_disabled' }, { status: 503 }),
    };
  }

  const rawBody = await request.text();
  const sig = request.headers.get(SIGNATURE_HEADER);

  if (!verifyToolWebhookSignature(rawBody, sig)) {
    await logComplianceEvent({
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
      await logComplianceEvent({
        session_id: sessionId,
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

export { z };
