import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/verify-email' });
  try {
    const body = await request.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
    }

    const now = new Date();
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        OR: [
          { emailVerificationTokenExpiry: null },
          { emailVerificationTokenExpiry: { gt: now } },
        ],
      },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          emailVerificationToken: null,
          emailVerificationTokenExpiry: null,
        },
      });
    }

    const contractor = await prisma.contractor.findFirst({
      where: { emailVerificationToken: token },
    });

    if (contractor) {
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: {
          emailVerified: true,
          emailVerificationToken: null,
        },
      });
    }

    if (!user && !contractor) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: user?.id || contractor?.id || log.requestId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/verify-email',
        request_id: log.requestId,
      },
    });

    return NextResponse.json({ success: true, message: 'Email verified.' });
  } catch (error) {
    log.error('verify-email error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, { tags: { route: '/api/auth/verify-email' } });
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
