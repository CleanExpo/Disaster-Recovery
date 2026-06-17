import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyContractorActivationToken } from '@/lib/contractor-activation';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const schema = z.object({
  token: z.string().min(20, 'Activation token is required'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[a-z]/, 'Password must include a lowercase letter')
    .regex(/[A-Z]/, 'Password must include an uppercase letter')
    .regex(/[0-9]/, 'Password must include a number')
    .regex(/[^A-Za-z0-9]/, 'Password must include a symbol'),
});

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/activate' });

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid request' },
        { status: 400 },
      );
    }

    let payload;
    try {
      payload = verifyContractorActivationToken(parsed.data.token);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : 'Invalid activation token',
        },
        { status: 400 },
      );
    }

    const contractor = await prisma.contractor.findUnique({
      where: { id: payload.contractorId },
      select: { id: true, emailVerified: true, status: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { success: false, error: 'Contractor account not found' },
        { status: 404 },
      );
    }

    if (contractor.emailVerified) {
      return NextResponse.json(
        { success: false, error: 'This activation link has already been used' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        passwordHash,
        emailVerified: true,
      },
    });

    await prisma.contractorAuditLog.create({
      data: {
        contractorId: contractor.id,
        action: 'ACTIVATE_ACCOUNT',
        category: 'AUTH',
        details: JSON.stringify({ activatedAt: new Date().toISOString() }),
        performedBy: contractor.id,
        performedByType: 'CONTRACTOR',
      },
    });

    await logComplianceEvent({
      eventType: 'auth_login_success',
      correlationId: contractor.id,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: contractor.id,
      metadata: {
        route: '/api/contractor/activate',
        request_id: log.requestId,
        activation: true,
      },
    });

    return NextResponse.json({
      success: true,
      contractorId: contractor.id,
      status: contractor.status,
    });
  } catch (error) {
    log.error('contractor activation failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/activate' },
      extra: { requestId: log.requestId },
    });

    return NextResponse.json(
      { success: false, error: 'Failed to activate contractor account' },
      { status: 500 },
    );
  }
}
