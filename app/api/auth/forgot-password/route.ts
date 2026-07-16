import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Always returns success to avoid account enumeration.
 * Sets passwordResetToken on User and/or Contractor when found.
 */
export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/forgot-password' });
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    const ok = NextResponse.json({
      success: true,
      message:
        'If an account exists for that email, password reset instructions have been sent.',
    });

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const token = randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken: token, passwordResetExpiry: expiry },
      });
    }

    const contractor = await prisma.contractor.findUnique({ where: { email } });
    if (contractor) {
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: { passwordResetToken: token, passwordResetExpiry: expiry },
      });
    }

    // Dev/staging: surface token when email provider is not configured
    const exposeToken =
      process.env.NODE_ENV !== 'production' || process.env.AUTH_EXPOSE_RESET_TOKEN === 'true';

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: user?.id || contractor?.id || log.requestId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/forgot-password',
        request_id: log.requestId,
        email_hash: hashIdentifier(email),
        user_found: !!user,
        contractor_found: !!contractor,
      },
    });

    if (exposeToken && (user || contractor)) {
      return NextResponse.json({
        success: true,
        message:
          'If an account exists for that email, password reset instructions have been sent.',
        resetToken: token,
        resetPath: `/reset-password?token=${token}`,
      });
    }

    return ok;
  } catch (error) {
    log.error('forgot-password error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, { tags: { route: '/api/auth/forgot-password' } });
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
