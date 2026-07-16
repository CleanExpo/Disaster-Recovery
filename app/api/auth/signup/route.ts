import { NextResponse } from 'next/server';
import { randomUUID, randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { sendEmail, emailTemplates } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const log = requestLogger(req, { route: '/api/auth/signup' });
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const normalisedEmail = String(email).trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = randomBytes(32).toString('hex');

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email: normalisedEmail,
        password: hashedPassword,
        userType: 'CLIENT',
        isEmailVerified: false,
        emailVerificationToken: verifyToken,
        emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://disasterrecovery.com.au';
    const verifyUrl = `${appUrl}/verify-email?token=${encodeURIComponent(verifyToken)}`;

    // Non-blocking — account creation is the source of truth
    sendEmail(
      normalisedEmail,
      emailTemplates.clientEmailVerification(name || 'there', verifyUrl),
    ).catch(() => {
      log.warn('signup verification email failed (non-critical)', {
        email_hash: hashIdentifier(normalisedEmail),
      });
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/signup',
        request_id: log.requestId,
        user_id: user.id,
        email_hash: hashIdentifier(normalisedEmail),
        user_type: 'CLIENT',
      },
    });

    const exposeToken =
      process.env.NODE_ENV !== 'production' || process.env.AUTH_EXPOSE_VERIFY_TOKEN === 'true';

    return NextResponse.json({
      message: 'User created successfully. Check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
      ...(exposeToken ? { verifyPath: `/verify-email?token=${verifyToken}` } : {}),
    });
  } catch (error) {
    log.error('signup error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/auth/signup' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
