/**
 * POST /api/internal/push-dispatch
 *
 * RA-1633 iOS epic — Phase 3b. Server-only APNs dispatcher.
 *
 * Private endpoint. Guarded by a shared-secret header
 *   x-internal-auth: ${INTERNAL_PUSH_SHARED_SECRET}
 * so only server-side job runners (cron, claim-state-change hooks)
 * can trigger a push. No rate-limiting here — callers are internal.
 *
 * Flow:
 *   1. Authorise via shared-secret header.
 *   2. Read + validate JSON body via Zod (templateKey whitelist).
 *   3. Read APNs env vars — gracefully 503 if any are missing.
 *   4. Look up PushToken rows for the claim, platform='ios'.
 *   5. Sign (or reuse cached) APNs JWT via native Node crypto.
 *   6. For each token: HTTP/2 POST to Apple; on 410 delete the row;
 *      on any 4xx leave the row and log the error.
 *   7. Write a single `push_dispatched` compliance_events entry with
 *      the deliveredCount (never the tokens themselves, never PII).
 *
 * Privacy (.claude/rules/privacy.md §1, §2, §6):
 *   - Device tokens are CONFIDENTIAL — never logged in full.
 *   - JWT is SECRET — never logged.
 *   - Notification body uses `buildPushPayload()` which enforces the
 *     "no raw status verbs, no email, no phone" guard.
 *
 * Env setup (Phase 3 prerequisite — populated when Apple credentials
 * arrive):
 *   APNS_KEY_ID            10-char Apple key id
 *   APNS_TEAM_ID           10-char Apple team id
 *   APNS_P8_BASE64         base64-encoded .p8 file contents
 *   INTERNAL_PUSH_SHARED_SECRET  bearer guard
 *
 * Until those four env vars are populated, this route returns 503 and
 * does nothing. Zero runtime impact.
 *
 * NOT LEGAL ADVICE.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { logComplianceEvent } from '@/lib/compliance/events';
import { buildPushPayload, PUSH_TEMPLATE_KEYS } from '@/lib/push/build-payload';
import { getApnsJwt } from '@/lib/push/sign-apns-jwt';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const APNS_HOST = 'https://api.push.apple.com';
const APNS_TOPIC = 'au.com.disasterrecovery.app';

const dispatchSchema = z.object({
  claimId: z.string().min(1).max(128),
  templateKey: z.enum(PUSH_TEMPLATE_KEYS),
  params: z.record(z.string(), z.string()).optional(),
});

function tokenFingerprint(token: string): string {
  return `${token.slice(0, 8)}…(${token.length}ch)`;
}

interface ApnsEnv {
  keyId: string;
  teamId: string;
  p8Base64: string;
  sharedSecret: string;
}

function readApnsEnv(): ApnsEnv | null {
  const keyId = process.env.APNS_KEY_ID;
  const teamId = process.env.APNS_TEAM_ID;
  const p8Base64 = process.env.APNS_P8_BASE64;
  const sharedSecret = process.env.INTERNAL_PUSH_SHARED_SECRET;
  if (!keyId || !teamId || !p8Base64 || !sharedSecret) return null;
  return { keyId, teamId, p8Base64, sharedSecret };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const env = readApnsEnv();
  if (!env) {
    return NextResponse.json(
      { ok: false, error: 'apns_unconfigured' },
      { status: 503 },
    );
  }

  const authHeader = request.headers.get('x-internal-auth');
  if (authHeader !== env.sharedSecret) {
    return NextResponse.json(
      { ok: false, error: 'unauthorised' },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  const parsed = dispatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  const { claimId, templateKey, params } = parsed.data;

  let payload;
  try {
    payload = buildPushPayload(templateKey, claimId, params);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[push-dispatch] payload_build_failed', {
      templateKey,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { ok: false, error: 'payload_build_failed' },
      { status: 400 },
    );
  }

  const tokens = await prisma.pushToken.findMany({
    where: { claimId, platform: 'ios' },
    select: { id: true, token: true },
  });

  if (tokens.length === 0) {
    return NextResponse.json({ ok: true, dispatched: 0, failed: 0 });
  }

  let jwt: string;
  try {
    jwt = getApnsJwt({
      keyId: env.keyId,
      teamId: env.teamId,
      p8Base64: env.p8Base64,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[push-dispatch] jwt_sign_failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { ok: false, error: 'jwt_sign_failed' },
      { status: 500 },
    );
  }

  const body_json = JSON.stringify(payload);

  let dispatched = 0;
  let failed = 0;

  for (const row of tokens) {
    try {
      const response = await fetch(`${APNS_HOST}/3/device/${row.token}`, {
        method: 'POST',
        headers: {
          'apns-topic': APNS_TOPIC,
          'apns-push-type': 'alert',
          authorization: `bearer ${jwt}`,
          'content-type': 'application/json',
        },
        body: body_json,
      });

      if (response.ok) {
        dispatched += 1;
        continue;
      }

      if (response.status === 410) {
        // Device unregistered — remove the stale token row.
        await prisma.pushToken.delete({ where: { id: row.id } });
        failed += 1;
        continue;
      }

      failed += 1;
      let reason = '';
      try {
        const errBody = (await response.json()) as { reason?: string };
        reason = errBody?.reason ?? '';
      } catch {
        // ignore JSON parse failure — Apple occasionally returns empty
      }
      // eslint-disable-next-line no-console
      console.warn('[push-dispatch] apns_error', {
        status: response.status,
        reason,
        fingerprint: tokenFingerprint(row.token),
      });
    } catch (err) {
      failed += 1;
      // eslint-disable-next-line no-console
      console.error('[push-dispatch] network_error', {
        fingerprint: tokenFingerprint(row.token),
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Compliance ledger — aggregate counts only, no tokens, no PII.
  await logComplianceEvent({
    eventType: 'push_dispatched',
    correlationType: 'claim',
    correlationId: claimId,
    metadata: {
      templateKey,
      deliveredCount: dispatched,
      failedCount: failed,
    },
  });

  return NextResponse.json({ ok: true, dispatched, failed });
}
