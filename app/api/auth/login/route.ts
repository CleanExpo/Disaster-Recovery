import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
  hashPassword,
  UserRole,
  getRolePermissions,
} from '@/lib/jwt-auth';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { randomUUID } from 'node:crypto';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// SECURITY: Production users stored in database only - NO hardcoded credentials
const isDevelopment = process.env.NODE_ENV === 'development';

// Development-only demo users (removed in production)
const getDemoUsers = () => {
  if (!isDevelopment) {
    return []; // No demo users in production
  }

  // Demo users only available in development with environment flag
  if (process.env.ENABLE_DEMO_USERS !== 'true') {
    return [];
  }

  return [
    {
      id: 'dev-admin',
      email: 'dev-admin@local.dev',
      name: 'Development Admin',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY3pp/eQhJ2XWIa',
      role: UserRole.ADMIN,
      companyId: 'dev-company',
    },
  ];
};

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/login' });
  const correlationId = randomUUID();

  await logComplianceEvent({
    eventType: 'auth_login_attempt',
    correlationId,
    correlationType: 'system',
    entityType: 'system',
    metadata: { request_id: log.requestId },
  });

  try {
    const body = await request.json();

    // Validate request body
    const validatedData = loginSchema.parse(body);

    // SECURITY: Find user in database (with fallback to demo users in development only)
    const demoUsers = getDemoUsers();
    let user = null;

    // Try database first (production and development)
    try {
      // In production, this would query the User table
      // user = await prisma.user.findUnique({
      //   where: { email: validatedData.email.toLowerCase() }
      // });
    } catch (error) {
      log.error('database user lookup failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      captureException(error, {
        tags: { route: '/api/auth/login', stage: 'db_lookup' },
        extra: { requestId: log.requestId },
      });
    }

    // Fallback to demo users only in development
    if (!user && isDevelopment) {
      user = demoUsers.find((u) => u.email.toLowerCase() === validatedData.email.toLowerCase());
    }

    if (!user) {
      log.warn('login failed: unknown user', { email_hash: hashIdentifier(validatedData.email) });
      await logComplianceEvent({
        eventType: 'auth_login_failure',
        correlationId,
        correlationType: 'system',
        entityType: 'system',
        entityIdentifier: validatedData.email,
        metadata: { reason: 'unknown_user', request_id: log.requestId },
      });
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);

    if (!isPasswordValid) {
      log.warn('login failed: bad password', { userId: user.id });
      await logComplianceEvent({
        eventType: 'auth_login_failure',
        correlationId,
        correlationType: 'system',
        entityType: 'system',
        entityIdentifier: validatedData.email,
        metadata: { reason: 'bad_password', user_id: user.id, request_id: log.requestId },
      });
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 },
      );
    }

    // Get role-based permissions
    const permissions = getRolePermissions(user.role);

    // Generate tokens
    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      permissions,
    };

    const accessToken = await generateAccessToken(userPayload);
    const refreshToken = await generateRefreshToken(user.id);

    log.info('login successful', { userId: user.id, role: user.role });
    await logComplianceEvent({
      eventType: 'auth_login_success',
      correlationId,
      correlationType: 'system',
      entityType: 'system',
      entityIdentifier: validatedData.email,
      metadata: { user_id: user.id, role: user.role, request_id: log.requestId },
    });

    // Return success response with tokens
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
        },
        tokens: {
          access: accessToken,
          refresh: refreshToken,
        },
        permissions,
      },
      { status: 200 },
    );
  } catch (error) {
    log.error('login error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/auth/login' },
      extra: { requestId: log.requestId },
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login. Please try again.',
      },
      { status: 500 },
    );
  }
}
