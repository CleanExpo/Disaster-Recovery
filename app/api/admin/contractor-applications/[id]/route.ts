import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { captureException } from '@/lib/observability/vercel';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { hashPassword } from '@/lib/jwt-auth';
import { buildContractorActivationUrl } from '@/lib/contractor-activation';
import { sendEmail, emailTemplates } from '@/lib/email';

export const dynamic = 'force-dynamic';

async function ensureContractorForApplication(application: {
  id: string;
  email: string;
  phone: string;
  contactName: string;
  convertedContractor: string | null;
}): Promise<{ contractorId: string; created: boolean; emailVerified: boolean }> {
  if (application.convertedContractor) {
    const existing = await prisma.contractor.findUnique({
      where: { id: application.convertedContractor },
      select: { id: true, emailVerified: true },
    });
    if (existing) {
      return {
        contractorId: existing.id,
        created: false,
        emailVerified: existing.emailVerified,
      };
    }
  }

  const byEmail = await prisma.contractor.findUnique({
    where: { email: application.email },
    select: { id: true, emailVerified: true },
  });
  if (byEmail) {
    await prisma.contractorApplication.update({
      where: { id: application.id },
      data: { convertedContractor: byEmail.id },
    });
    return {
      contractorId: byEmail.id,
      created: false,
      emailVerified: byEmail.emailVerified,
    };
  }

  const tempPasswordHash = await hashPassword(
    `temp-${application.email}-${crypto.randomBytes(16).toString('hex')}`,
  );
  const baseUsername = application.email
    .split('@')[0]
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
  const username = `${baseUsername}_${crypto.randomBytes(3).toString('hex')}`;

  const contractor = await prisma.contractor.create({
    data: {
      email: application.email,
      username,
      passwordHash: tempPasswordHash,
      mobileNumber: application.phone ?? '',
      status: 'PENDING',
      onboardingStep: 1,
    },
  });

  await prisma.contractorApplication.update({
    where: { id: application.id },
    data: { convertedContractor: contractor.id },
  });

  return {
    contractorId: contractor.id,
    created: true,
    emailVerified: false,
  };
}

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
  const adminUser = sessionOrError.user;

  const { id } = await params;
  let body: { status?: string; adminNotes?: string; rejectionReason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const allowedStatuses = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'PENDING'];
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

  const updateData: {
    status?: string;
    reviewedAt?: Date;
    reviewedBy?: string;
    rejectionReason?: string | null;
    notes?: string | null;
  } = {};
  if (status) {
    updateData.status = status;
    updateData.reviewedAt = new Date();
    updateData.reviewedBy = adminUser.email ?? adminUser.id ?? 'admin';
  }
  if (typeof body.adminNotes === 'string') {
    updateData.notes = body.adminNotes;
  }
  if (status === 'REJECTED' && typeof body.rejectionReason === 'string') {
    updateData.rejectionReason = body.rejectionReason;
  }

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

  let activationUrl: string | undefined;
  let contractorId: string | null = updated.convertedContractor;

  if (status === 'APPROVED') {
    try {
      const ensured = await ensureContractorForApplication(application);
      contractorId = ensured.contractorId;

      await prisma.contractor.update({
        where: { id: ensured.contractorId },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
          rejectionReason: null,
          rejectedAt: null,
        },
      });

      if (!ensured.emailVerified) {
        activationUrl = buildContractorActivationUrl(ensured.contractorId);
      }

      sendEmail(
        application.email,
        emailTemplates.contractorApplicationApproved(
          application.contactName,
          application.id,
          activationUrl,
        ),
      ).catch(() => {
        // Non-fatal — approval is durable in DB
      });
    } catch (e) {
      captureException(e, {
        tags: {
          route: '/api/admin/contractor-applications/[id]',
          stage: 'approve_activate',
        },
      });
      return NextResponse.json(
        {
          error:
            'Application was marked approved, but contractor activation could not be completed. Retry or contact engineering.',
          application: updated,
        },
        { status: 502 },
      );
    }
  }

  if (status === 'REJECTED' && contractorId) {
    await prisma.contractor
      .update({
        where: { id: contractorId },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectionReason: body.rejectionReason ?? 'Application rejected',
        },
      })
      .catch(() => {
        // Non-fatal if contractor row missing
      });
  }

  await logComplianceEvent({
    eventType: 'api_route_invocation',
    correlationId: id,
    correlationType: 'contractor_membership',
    entityType: 'contractor',
    entityIdentifier: application.email,
    metadata: {
      route: '/api/admin/contractor-applications/[id]',
      method: 'PATCH',
      application_id: id,
      new_status: status ?? null,
      contractor_id: contractorId,
      activation_sent: Boolean(activationUrl),
      email_hash: hashIdentifier(application.email),
    },
  });

  return NextResponse.json({
    ...updated,
    contractorId,
    activationSent: Boolean(activationUrl),
  });
}
