import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { captureException } from '@/lib/observability/vercel';
import { logComplianceEvent } from '@/lib/compliance/events';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { id } = await params;
  let application;
  try {
    application = await prisma.contractorApplication.findUnique({
      where: { id },
    });
  } catch (e) {
    captureException(e, {
      tags: {
        route: '/api/admin/contractor-applications/[id]',
        model: 'contractorApplication',
        op: 'findUnique',
      },
    });
    throw e;
  }

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { id } = await params;
  let body: { status?: string; adminNotes?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const allowedStatuses = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'];
  const status = body.status?.trim();
  if (status && !allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: `status must be one of: ${allowedStatuses.join(', ')}` },
      { status: 400 },
    );
  }

  let application;
  try {
    application = await prisma.contractorApplication.findUnique({
      where: { id },
    });
  } catch (e) {
    captureException(e, {
      tags: {
        route: '/api/admin/contractor-applications/[id]',
        model: 'contractorApplication',
        op: 'findUnique',
      },
    });
    throw e;
  }

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  const updateData: { status?: string } = {};
  if (status) updateData.status = status;

  let updated;
  try {
    updated = await prisma.contractorApplication.update({
      where: { id },
      data: updateData,
    });
  } catch (e) {
    captureException(e, {
      tags: {
        route: '/api/admin/contractor-applications/[id]',
        model: 'contractorApplication',
        op: 'update',
      },
    });
    throw e;
  }

  await logComplianceEvent({
    eventType: 'api_route_invocation',
    correlationId: '00000000-0000-0000-0000-000000000000',
    correlationType: 'system',
    entityType: 'system',
    metadata: {
      route: '/api/admin/contractor-applications/[id]',
      method: 'PATCH',
      application_id: id,
      new_status: status ?? null,
    },
  });

  return NextResponse.json(updated);
}
