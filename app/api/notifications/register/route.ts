/**
 * DR-389: Push token registration endpoint.
 *
 * POST /api/notifications/register
 *   Body: { claimId: string; token: string; platform?: "web" | "ios" | "android" }
 *   Stores or updates the push subscription token for a given claim.
 *
 * DELETE /api/notifications/register
 *   Body: { claimId: string; token: string }
 *   Removes a previously registered token (e.g. on logout / permission revoke).
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

const RegisterSchema = z.object({
  claimId: z.string().min(1).max(100),
  token: z.string().min(1).max(4096),
  platform: z.enum(['web', 'ios', 'android']).default('web'),
});

const DeregisterSchema = z.object({
  claimId: z.string().min(1).max(100),
  token: z.string().min(1).max(4096),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/notifications/register' });
  try {
    const raw = await request.json();
    const parsed = RegisterSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { claimId, token, platform } = parsed.data;

    // Upsert by (claimId + token) so duplicate registrations don't pile up.
    // Prisma doesn't support upsert on non-unique composite without raw SQL,
    // so we do a find-or-create pattern instead.
    const existing = await prisma.pushToken.findFirst({
      where: { claimId, token },
    });

    if (!existing) {
      await prisma.pushToken.create({
        data: { claimId, token, platform },
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    log.error('token registration error', { ref: 'DR-389', error: err instanceof Error ? err.message : String(err) });
    captureException(err, { tags: { route: '/api/notifications/register' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { success: false, error: 'Failed to register token' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/notifications/register' });
  try {
    const raw = await request.json();
    const parsed = DeregisterSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { claimId, token } = parsed.data;

    await prisma.pushToken.deleteMany({
      where: { claimId, token },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    log.error('token deregistration error', { ref: 'DR-389', error: err instanceof Error ? err.message : String(err) });
    captureException(err, { tags: { route: '/api/notifications/register' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { success: false, error: 'Failed to deregister token' },
      { status: 500 },
    );
  }
}
