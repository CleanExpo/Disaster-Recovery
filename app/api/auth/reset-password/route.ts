import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/reset-password' });
  try {
    const body = await request.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 },
      );
    }

    const now = new Date();
    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiry: { gt: now },
      },
    });

    const contractor = await prisma.contractor.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpiry: { gt: now },
      },
    });

    if (!user && !contractor) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hash,
          passwordResetToken: null,
          passwordResetExpiry: null,
        },
      });
    }

    if (contractor) {
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: {
          passwordHash: hash,
          passwordResetToken: null,
          passwordResetExpiry: null,
        },
      });
      // Keep linked User password in sync when present
      if (!user) {
        const linked = await prisma.user.findUnique({ where: { email: contractor.email } });
        if (linked) {
          await prisma.user.update({
            where: { id: linked.id },
            data: { password: hash },
          });
        }
      }
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: user?.id || contractor?.id || log.requestId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/reset-password',
        request_id: log.requestId,
      },
    });

    return NextResponse.json({ success: true, message: 'Password updated. You can sign in.' });
  } catch (error) {
    log.error('reset-password error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, { tags: { route: '/api/auth/reset-password' } });
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }
}
