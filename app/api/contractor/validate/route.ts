import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { getSessionFromRequest } from '@/lib/auth/session';
import { isAdminRole } from '@/lib/auth/roles';

export const dynamic = 'force-dynamic';

/** Health check */
export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/validate' });
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'Contractor validation endpoint is operational',
      timestamp: new Date().toISOString(),
      methods: ['GET', 'POST'],
    });
  } catch (error) {
    log.error('contractor validation GET error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/validate' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error', status: 'error' }, { status: 500 });
  }
}

/**
 * Validate a contractor exists and is active.
 * Restricted to the contractor themselves (matching email/id) or an admin.
 */
export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/validate' });
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', status: 'error', valid: false },
        { status: 401 },
      );
    }
    const isAdmin = isAdminRole(session.role);

    const body = await request.json();
    const { contractorId, abn, email } = body as {
      contractorId?: string;
      abn?: string;
      email?: string;
    };

    if (!contractorId && !abn && !email) {
      return NextResponse.json(
        {
          error: 'At least one identifier required (contractorId, abn, or email)',
          status: 'error',
          valid: false,
        },
        { status: 400 },
      );
    }

    let contractor = null;
    if (contractorId) {
      contractor = await prisma.contractor.findUnique({
        where: { id: contractorId },
        include: { companyProfile: { select: { abn: true, companyName: true } } },
      });
    } else if (email) {
      contractor = await prisma.contractor.findUnique({
        where: { email: String(email).trim().toLowerCase() },
        include: { companyProfile: { select: { abn: true, companyName: true } } },
      });
    } else if (abn) {
      const company = await prisma.contractorCompany.findFirst({
        where: { abn: String(abn).replace(/\s/g, '') },
        select: { contractorId: true },
      });
      if (company) {
        contractor = await prisma.contractor.findUnique({
          where: { id: company.contractorId },
          include: { companyProfile: { select: { abn: true, companyName: true } } },
        });
      }
    }

    if (
      contractor &&
      !isAdmin &&
      session.role === 'CONTRACTOR' &&
      session.email.toLowerCase() !== contractor.email.toLowerCase() &&
      session.contractorId !== contractor.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden', status: 'error', valid: false },
        { status: 403 },
      );
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: contractor?.id ?? '00000000-0000-0000-0000-000000000000',
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: contractor?.email,
      metadata: {
        route: '/api/contractor/validate',
        request_id: log.requestId,
        has_contractor_id: Boolean(contractorId),
        has_abn: Boolean(abn),
        email_hash: email ? hashIdentifier(String(email)) : null,
        found: Boolean(contractor),
      },
    });

    if (!contractor) {
      return NextResponse.json({
        status: 'error',
        valid: false,
        message: 'Contractor not found',
        timestamp: new Date().toISOString(),
      });
    }

    const active = ['APPROVED', 'UNDER_REVIEW'].includes(contractor.status);

    return NextResponse.json({
      status: 'success',
      valid: active,
      contractor: {
        id: contractor.id,
        email: contractor.email,
        username: contractor.username,
        status: contractor.status,
        emailVerified: contractor.emailVerified,
        abn: contractor.companyProfile?.abn ?? null,
        companyName: contractor.companyProfile?.companyName ?? null,
        verified: contractor.emailVerified,
        active,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    log.error('contractor validation POST error', {
      error: error instanceof Error ? error.message : String(error),
    });
    captureException(error, {
      tags: { route: '/api/contractor/validate' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error', status: 'error' }, { status: 500 });
  }
}
