import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import {
  issueSession,
  setAuthCookies,
  type SessionUser,
} from '@/lib/auth/session';
import { dashboardPathForRole, normaliseRole, type AppRole } from '@/lib/auth/roles';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type LoginBody = {
  email?: string;
  username?: string;
  password?: string;
  rememberMe?: boolean;
};

async function loginAsUser(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password || user.isBlocked || !user.isActive) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  const role = normaliseRole(user.userType) ?? 'CLIENT';
  let contractorId: string | null = null;
  if (role === 'CONTRACTOR') {
    const c = await prisma.contractor.findUnique({ where: { email: user.email } });
    contractorId = c?.id ?? null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    userId: user.id,
    email: user.email,
    role,
    name: user.name,
    contractorId,
  };
}

async function loginAsContractor(
  identifier: string,
  password: string,
): Promise<SessionUser | null> {
  const contractor = await prisma.contractor.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
  if (!contractor) return null;
  if (!contractor.emailVerified) return null;

  const ok = await bcrypt.compare(password, contractor.passwordHash);
  if (!ok) return null;

  // Ensure a User row exists for cookie session identity
  let user = await prisma.user.findUnique({ where: { email: contractor.email } });
  if (!user) {
    const { randomUUID } = await import('node:crypto');
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
  } else if (user.userType !== 'CONTRACTOR' && user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
    await prisma.user.update({
      where: { id: user.id },
      data: { userType: 'CONTRACTOR' },
    });
  }

  await prisma.contractor.update({
    where: { id: contractor.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    userId: user.id,
    email: contractor.email,
    role: 'CONTRACTOR' as AppRole,
    name: contractor.username,
    contractorId: contractor.id,
  };
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/login' });
  try {
    const body = (await request.json()) as LoginBody;
    const password = body.password || '';
    const identifier = (body.email || body.username || '').trim().toLowerCase();
    const rememberMe = !!body.rememberMe;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    // Prefer User table (admin/client), then Contractor credentials
    let sessionUser =
      (await loginAsUser(identifier, password)) ||
      (await loginAsContractor(identifier, password)) ||
      (body.email ? await loginAsContractor(body.email.trim(), password) : null);

    // Username-only contractor login when email field holds username
    if (!sessionUser && body.username) {
      sessionUser = await loginAsContractor(body.username.trim(), password);
    }

    if (!sessionUser) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const tokens = await issueSession(sessionUser, rememberMe);
    const res = NextResponse.json({
      success: true,
      user: {
        id: sessionUser.userId,
        email: sessionUser.email,
        name: sessionUser.name,
        role: sessionUser.role,
        contractorId: sessionUser.contractorId,
      },
      redirectTo: dashboardPathForRole(sessionUser.role),
    });
    setAuthCookies(res, tokens, rememberMe);

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: sessionUser.userId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/login',
        request_id: log.requestId,
        role: sessionUser.role,
        email_hash: hashIdentifier(sessionUser.email),
      },
    });

    return res;
  } catch (error) {
    log.error('login error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/auth/login' } });
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
