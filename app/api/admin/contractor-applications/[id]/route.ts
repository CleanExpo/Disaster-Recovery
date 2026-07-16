import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-auth';
import { captureException } from '@/lib/observability/vercel';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { hashPassword } from '@/lib/jwt-auth';
import { buildContractorActivationUrl } from '@/lib/contractor-activation';
import { sendEmail, emailTemplates } from '@/lib/email';

export const dynamic = 'force-dynamic';

type Tx = Prisma.TransactionClient;

async function ensureContractorForApplication(
  tx: Tx,
  application: {
    id: string;
    email: string;
    phone: string;
    contactName: string;
    convertedContractor: string | null;
  },
): Promise<{ contractorId: string; created: boolean; emailVerified: boolean }> {
  if (application.convertedContractor) {
    const existing = await tx.contractor.findUnique({
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

  const byEmail = await tx.contractor.findUnique({
    where: { email: application.email },
    select: { id: true, emailVerified: true },
  });
  if (byEmail) {
    await tx.contractorApplication.update({
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

  const contractor = await tx.contractor.create({
    data: {
      email: application.email,
      username,
      passwordHash: tempPasswordHash,
      mobileNumber: application.phone ?? '',
      status: 'PENDING',
      onboardingStep: 1,
    },
  });

  await tx.contractorApplication.update({
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

  const application = await prisma.contractorApplication.findUnique({
    where: { id },
  });

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  const reviewedAt = new Date();
  const reviewedBy = adminUser.email ?? adminUser.id ?? 'admin';

  let activationUrl: string | undefined;
  let contractorId: string | null = application.convertedContractor;
  let updated = application;
  let activationSent = false;

  try {
    if (status === 'APPROVED') {
      const result = await prisma.$transaction(async (tx) => {
        const ensured = await ensureContractorForApplication(tx, application);

        const appRow = await tx.contractorApplication.update({
          where: { id },
          data: {
            status: 'APPROVED',
            reviewedAt,
            reviewedBy,
            convertedContractor: ensured.contractorId,
            ...(typeof body.adminNotes === 'string' ? { notes: body.adminNotes } : {}),
            rejectionReason: null,
          },
        });

        await tx.contractor.update({
          where: { id: ensured.contractorId },
          data: {
            status: 'APPROVED',
            approvedAt: reviewedAt,
            rejectionReason: null,
            rejectedAt: null,
          },
        });

        return { appRow, ensured };
      });

      updated = result.appRow;
      contractorId = result.ensured.contractorId;

      if (!result.ensured.emailVerified) {
        activationUrl = buildContractorActivationUrl(result.ensured.contractorId);
      }

      const emailed = await sendEmail(
        application.email,
        emailTemplates.contractorApplicationApproved(
          application.contactName,
          application.id,
          activationUrl,
        ),
      ).catch(() => false);

      activationSent = Boolean(activationUrl) && Boolean(emailed);

      if (activationUrl && !emailed) {
        // Durable approval succeeded; surface email failure so admin can resend.
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
            new_status: 'APPROVED',
            contractor_id: contractorId,
            activation_sent: false,
            email_failed: true,
            email_hash: hashIdentifier(application.email),
          },
        });

        return NextResponse.json(
          {
            ...updated,
            contractorId,
            activationSent: false,
            warning:
              'Application approved and contractor linked, but the activation email could not be sent. Resend from the application detail page or contact the applicant.',
          },
          { status: 200 },
        );
      }
    } else if (status === 'REJECTED') {
      updated = await prisma.$transaction(async (tx) => {
        const appRow = await tx.contractorApplication.update({
          where: { id },
          data: {
            status: 'REJECTED',
            reviewedAt,
            reviewedBy,
            rejectionReason: body.rejectionReason ?? 'Application rejected',
            ...(typeof body.adminNotes === 'string' ? { notes: body.adminNotes } : {}),
          },
        });

        const linkedId = appRow.convertedContractor ?? application.convertedContractor;
        if (linkedId) {
          await tx.contractor
            .update({
              where: { id: linkedId },
              data: {
                status: 'REJECTED',
                rejectedAt: reviewedAt,
                rejectionReason: body.rejectionReason ?? 'Application rejected',
              },
            })
            .catch(() => null);
        }

        return appRow;
      });
      contractorId = updated.convertedContractor;
    } else {
      const updateData: {
        status?: string;
        reviewedAt?: Date;
        reviewedBy?: string;
        notes?: string | null;
      } = {};
      if (status) {
        updateData.status = status;
        updateData.reviewedAt = reviewedAt;
        updateData.reviewedBy = reviewedBy;
      }
      if (typeof body.adminNotes === 'string') {
        updateData.notes = body.adminNotes;
      }

      updated = await prisma.contractorApplication.update({
        where: { id },
        data: updateData,
      });
    }
  } catch (e) {
    captureException(e, {
      tags: {
        route: '/api/admin/contractor-applications/[id]',
        stage: status === 'APPROVED' ? 'approve_transaction' : 'status_update',
      },
    });
    return NextResponse.json(
      {
        error:
          status === 'APPROVED'
            ? 'Approval failed. The application was not marked approved. Please retry.'
            : 'Failed to update application status. Please retry.',
      },
      { status: 500 },
    );
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
      activation_sent: activationSent,
      email_hash: hashIdentifier(application.email),
    },
  });

  return NextResponse.json({
    ...updated,
    contractorId,
    activationSent,
  });
}
