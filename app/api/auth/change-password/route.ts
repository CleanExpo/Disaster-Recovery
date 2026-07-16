import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth/session';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/change-password' });
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }

    const body = await request.json();
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current and new password are required' },
        { status: 400 },
      );
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user?.password) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hash },
    });

    if (session.contractorId) {
      await prisma.contractor.update({
        where: { id: session.contractorId },
        data: { passwordHash: hash },
      });
    } else if (session.role === 'CONTRACTOR') {
      const c = await prisma.contractor.findUnique({ where: { email: session.email } });
      if (c) {
        await prisma.contractor.update({
          where: { id: c.id },
          data: { passwordHash: hash },
        });
      }
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: session.userId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/change-password',
        request_id: log.requestId,
        email_hash: hashIdentifier(session.email),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    log.error('change-password error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, { tags: { route: '/api/auth/change-password' } });
    return NextResponse.json({ error: 'Change password failed' }, { status: 500 });
  }
}
