/**
 * POST /api/native/device-token
 *
 * Receives an APNs (iOS) or FCM (Android) push token from the Capacitor
 * bridge (`src/lib/native-bridge.ts` -> registerPushNotifications()).
 * Stores / refreshes the row in `PushToken` so we can later dispatch
 * claim-status updates to the device.
 *
 * DR-725 iOS App epic, Phase 2 PR #1.
 *
 * Privacy notes (.claude/rules/privacy.md §1):
 * - Tokens are CONFIDENTIAL. Not logged in full — only prefix + length.
 * - If a claimId is provided, we associate; otherwise we store with the
 *   sentinel "unclaimed" so the user's device can still receive generic
 *   app notifications (welcome, maintenance) while they browse.
 * - compliance_events ledger receives a `booking_created`-style stub
 *   when the flag is on — see events.ts ComplianceEventType for the
 *   authoritative list. For now we skip ledger writes here (Phase 2
 *   PR adds a dedicated `device_registered` event type).
 *
 * NOT LEGAL ADVICE.
 */

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { deviceTokenRegistrationSchema } from '@/lib/validation/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UNCLAIMED_SENTINEL = 'unclaimed';

function tokenFingerprint(token: string): string {
  // First 8 chars + length — enough for debugging duplicates without
  // leaking the push credential.
  return `${token.slice(0, 8)}…(${token.length}ch)`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  const parsed = deviceTokenRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  const { token, platform, claimId, deviceId, appVersion } = parsed.data;

  try {
    // Idempotent upsert: re-registration on the same device overwrites.
    // Dedup key: (claimId OR unclaimed) + platform + deviceId when given,
    // falling back to the token itself. We delete any stale rows matching
    // the token to avoid multi-claim orphan rows.
    await prisma.pushToken.deleteMany({
      where: { token },
    });

    const stored = await prisma.pushToken.create({
      data: {
        claimId: claimId ?? UNCLAIMED_SENTINEL,
        token,
        platform,
      },
      select: { id: true },
    });

    // Minimal server log — never log the full token.
    // eslint-disable-next-line no-console
    console.info('[device-token] registered', {
      id: stored.id,
      platform,
      appVersion,
      deviceIdPresent: Boolean(deviceId),
      claimIdPresent: Boolean(claimId),
      fingerprint: tokenFingerprint(token),
    });

    return NextResponse.json(
      { ok: true, id: stored.id },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[device-token] store_failed', { message });
    return NextResponse.json(
      { ok: false, error: 'store_failed' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/native/device-token?token=...
 *
 * Called by the app on logout / token invalidation (APNs unregister).
 * Idempotent — absence of rows returns 200.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  if (!token || token.length < 32 || token.length > 4096) {
    return NextResponse.json(
      { ok: false, error: 'invalid_token' },
      { status: 400 },
    );
  }

  try {
    const result = await prisma.pushToken.deleteMany({ where: { token } });
    return NextResponse.json({ ok: true, removed: result.count });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[device-token] delete_failed', { message });
    return NextResponse.json(
      { ok: false, error: 'delete_failed' },
      { status: 500 },
    );
  }
}
