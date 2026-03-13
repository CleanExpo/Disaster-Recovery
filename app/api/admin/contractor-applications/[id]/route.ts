import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { id } = await params;
  const application = await prisma.contractorApplication.findUnique({
    where: { id },
  });

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
      { status: 400 }
    );
  }

  const application = await prisma.contractorApplication.findUnique({
    where: { id },
  });

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  const updateData: { status?: string } = {};
  if (status) updateData.status = status;

  const updated = await prisma.contractorApplication.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}
