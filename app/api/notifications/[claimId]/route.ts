/**
 * DR-389: Claim notification polling endpoint.
 *
 * GET /api/notifications/[claimId]
 *   Returns the 20 most recent ClaimNotification rows for the given claim.
 *   Optionally filters to unread-only via ?unread=true.
 *
 * POST /api/notifications/[claimId]
 *   Body: { ids: string[] }  — mark the listed notification IDs as read.
 *   Body: { all: true }     — mark ALL notifications for this claim as read.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const MarkReadSchema = z.union([
  z.object({ ids: z.array(z.string()).min(1).max(100) }),
  z.object({ all: z.literal(true) }),
]);

export async function GET(
  request: NextRequest,
  { params }: { params: { claimId: string } },
): Promise<NextResponse> {
  const { claimId } = params;

  if (!claimId || typeof claimId !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Claim ID required' },
      { status: 400 },
    );
  }

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get('unread') === 'true';

  try {
    const notifications = await prisma.claimNotification.findMany({
      where: {
        claimId,
        ...(unreadOnly ? { read: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        claimId: true,
        status: true,
        title: true,
        message: true,
        read: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  } catch (err) {
    console.error('[DR-389] Notification fetch error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { claimId: string } },
): Promise<NextResponse> {
  const { claimId } = params;

  if (!claimId || typeof claimId !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Claim ID required' },
      { status: 400 },
    );
  }

  try {
    const raw = await request.json();
    const parsed = MarkReadSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: parsed.error.issues },
        { status: 400 },
      );
    }

    const body = parsed.data;

    if ('all' in body && body.all) {
      await prisma.claimNotification.updateMany({
        where: { claimId, read: false },
        data: { read: true },
      });
    } else if ('ids' in body) {
      await prisma.claimNotification.updateMany({
        where: { claimId, id: { in: body.ids } },
        data: { read: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DR-389] Mark-read error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 },
    );
  }
}
