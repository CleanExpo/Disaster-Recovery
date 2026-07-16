import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';
import { issueSession, setAuthCookies } from '@/lib/auth/session';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/login' });
  try {
    const body = await request.json();
    const username = (body.username || body.email || '').trim();
    const password = body.password || '';
    const rememberMe = !!body.rememberMe;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    logger.info('auth', `Contractor login attempt for username: ${username}`, {
      ipAddress,
      userAgent,
    });

    const contractor = await prisma.contractor.findFirst({
      where: {
        OR: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }],
      },
      include: {
        companyProfile: true,
        subscription: true,
      },
    });

    if (!contractor) {
      void logComplianceEvent({
        eventType: 'auth_login_failure',
        correlationId: log.requestId,
        correlationType: 'system',
        entityType: 'contractor',
        entityIdentifier: username,
        metadata: { reason: 'contractor_not_found', request_id: log.requestId },
      });
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    if (!contractor.emailVerified) {
      void logComplianceEvent({
        eventType: 'auth_login_failure',
        correlationId: contractor.id,
        correlationType: 'contractor_membership',
        entityType: 'contractor',
        entityIdentifier: contractor.id,
        metadata: { reason: 'account_not_activated', request_id: log.requestId },
      });
      return NextResponse.json(
        {
          error: 'Account activation required. Use the activation link from your payment email.',
          code: 'ACCOUNT_NOT_ACTIVATED',
        },
        { status: 403 },
      );
    }

    const isValidPassword = await bcrypt.compare(password, contractor.passwordHash);
    if (!isValidPassword) {
      void logComplianceEvent({
        eventType: 'auth_login_failure',
        correlationId: contractor.id,
        correlationType: 'contractor_membership',
        entityType: 'contractor',
        entityIdentifier: contractor.id,
        metadata: { reason: 'invalid_password', request_id: log.requestId },
      });
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    if (contractor.status !== 'APPROVED' && contractor.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Account ${contractor.status.toLowerCase()}. Please contact support.` },
        { status: 403 },
      );
    }

    let user = await prisma.user.findUnique({ where: { email: contractor.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email: contractor.email,
          name: contractor.username,
          password: contractor.passwordHash,
          userType: 'CONTRACTOR',
          isEmailVerified: contractor.emailVerified,
        },
      });
    } else if (
      user.userType !== 'CONTRACTOR' &&
      user.userType !== 'ADMIN' &&
      user.userType !== 'SUPER_ADMIN'
    ) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { userType: 'CONTRACTOR' },
      });
    }

    await prisma.contractor.update({
      where: { id: contractor.id },
      data: { lastLoginAt: new Date() },
    });

    logger.logContractorLogin(contractor.id, true, ipAddress, userAgent);

    await prisma.contractorAuditLog.create({
      data: {
        contractorId: contractor.id,
        action: 'LOGIN',
        category: 'AUTH',
        details: JSON.stringify({
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString(),
        }),
        ipAddress,
        userAgent,
        performedBy: contractor.id,
        performedByType: 'CONTRACTOR',
      },
    });

    const tokens = await issueSession(
      {
        userId: user.id,
        email: contractor.email,
        role: 'CONTRACTOR',
        name: contractor.username,
        contractorId: contractor.id,
      },
      rememberMe,
    );

    void logComplianceEvent({
      eventType: 'auth_login_success',
      correlationId: contractor.id,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: contractor.id,
      metadata: { request_id: log.requestId },
    });

    const res = NextResponse.json({
      id: contractor.id,
      username: contractor.username,
      email: contractor.email,
      companyName: contractor.companyProfile?.companyName || 'Not Set',
      status: contractor.status,
      emailVerified: contractor.emailVerified,
      twoFactorEnabled: contractor.twoFactorEnabled,
      onboardingCompleted: contractor.onboardingCompleted,
      subscription: contractor.subscription
        ? {
            tier: contractor.subscription.tier,
            status: contractor.subscription.status,
          }
        : null,
      role: 'CONTRACTOR',
      tokens: {
        access: tokens.access,
        refresh: tokens.refresh,
      },
    });
    setAuthCookies(res, tokens, rememberMe);
    return res;
  } catch (error: unknown) {
    logger.error('auth', 'Contractor login error', error instanceof Error ? error : undefined);
    captureException(error, {
      tags: { route: '/api/contractor/login' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
