/**
 * /api/contractor/jobs/[id]
 *
 * DR-322 Path B: PATCH handler writes to Job table and logs an immutable
 * JobOutcome record when a job transitions to 'completed' or 'cancelled'.
 *
 * GET  — fetch job detail (contractor or admin)
 * PATCH — update job status / notes / progress; logs outcome on terminal states
 * DELETE — cancel job (admin only; also logs JobOutcome CANCELLED)
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { handleAPIError, successResponse, APIError } from '@/lib/api-error-handler';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const jobUpdateSchema = z.object({
  status: z.enum(['active', 'in_progress', 'completed', 'cancelled']).optional(),
  notes: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  completedAt: z.string().optional(),
  actualCost: z.number().optional(),
  hoursWorked: z.number().optional(),
});

/** Map contractor-facing status strings to the DB status values. */
const STATUS_MAP: Record<string, string> = {
  active: 'assigned',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'completed', // soft-cancel is stored as completed + outcome=CANCELLED
};

/** Compute minutes between two nullable timestamps. Returns null if either is absent. */
function minutesBetween(a: Date | null | undefined, b: Date | null | undefined): number | null {
  if (!a || !b) return null;
  return Math.round(Math.abs(b.getTime() - a.getTime()) / 60_000);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }

    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { outcome: true },
    });

    if (!job) {
      throw new APIError('Job not found', 404);
    }

    // Contractors can only see their own jobs
    if (
      user.role === UserRole.CONTRACTOR &&
      job.contractorId !== user.id
    ) {
      throw new APIError('Job not found', 404);
    }

    return successResponse(job);
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }

    const body = await request.json();
    const validatedData = jobUpdateSchema.parse(body);

    // Fetch current job state (include outcome to prevent duplicate logging)
    const existing = await prisma.job.findUnique({
      where: { id: params.id },
      include: { outcome: true },
    });
    if (!existing) {
      throw new APIError('Job not found', 404);
    }

    if (
      user.role === UserRole.CONTRACTOR &&
      existing.contractorId !== user.id
    ) {
      throw new APIError('Job not found', 404);
    }

    const dbStatus = validatedData.status
      ? STATUS_MAP[validatedData.status]
      : undefined;

    const completedAt =
      validatedData.completedAt
        ? new Date(validatedData.completedAt)
        : validatedData.status === 'completed' || validatedData.status === 'cancelled'
          ? new Date()
          : undefined;

    // Update the Job row
    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: {
        ...(dbStatus ? { status: dbStatus } : {}),
        ...(validatedData.notes ? { internalNotes: validatedData.notes } : {}),
        ...(completedAt ? { completedAt } : {}),
        updatedAt: new Date(),
      },
    });

    // ---------- DR-322 Path B: log JobOutcome on terminal states ----------
    const isTerminal =
      validatedData.status === 'completed' || validatedData.status === 'cancelled';

    if (isTerminal && !existing.outcome) {
      const outcomeCode =
        validatedData.status === 'completed' ? 'COMPLETED' : 'CANCELLED';

      const now = completedAt ?? new Date();

      await prisma.jobOutcome.create({
        data: {
          jobId:           existing.id,
          outcome:         outcomeCode,
          jobType:         existing.serviceType,
          contractorId:    existing.contractorId ?? undefined,
          insuranceClaimId: existing.claimNumber ?? undefined,
          actualCost:      validatedData.actualCost ?? undefined,
          hoursWorked:     validatedData.hoursWorked ?? undefined,
          loggedByUserId:  user.id ?? 'SYSTEM',

          // KPI geo/classification columns
          state:           existing.state,
          suburb:          existing.suburb,
          postcode:        existing.postcode,
          urgency:         existing.urgency,
          insuranceClaim:  existing.insuranceClaim,
          insurerName:     existing.insurerName ?? undefined,

          // Timing metrics
          responseMinutes: minutesBetween(existing.assignedAt, existing.acceptedAt),
          durationMinutes: minutesBetween(existing.acceptedAt, now),
          totalMinutes:    minutesBetween(existing.createdAt, now),
        },
      });
    }
    // ----------------------------------------------------------------------

    return successResponse({
      message: `Job ${params.id} updated successfully`,
      job: updatedJob,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      throw new APIError('Admin authentication required', 401);
    }

    const existing = await prisma.job.findUnique({
      where: { id: params.id },
      include: { outcome: true },
    });
    if (!existing) {
      throw new APIError('Job not found', 404);
    }

    const now = new Date();

    await prisma.job.update({
      where: { id: params.id },
      data: { status: 'completed', completedAt: now, updatedAt: now },
    });

    // Log outcome unless one already exists (idempotent)
    if (!existing.outcome) {
      await prisma.jobOutcome.create({
        data: {
          jobId:           existing.id,
          outcome:         'CANCELLED',
          jobType:         existing.serviceType,
          contractorId:    existing.contractorId ?? undefined,
          loggedByUserId:  user.id ?? 'SYSTEM',
          state:           existing.state,
          suburb:          existing.suburb,
          postcode:        existing.postcode,
          urgency:         existing.urgency,
          insuranceClaim:  existing.insuranceClaim,
          insurerName:     existing.insurerName ?? undefined,
          totalMinutes:    minutesBetween(existing.createdAt, now),
        },
      });
    }

    return successResponse({
      message: `Job ${params.id} cancelled successfully`,
      jobId: params.id,
    });
  } catch (error) {
    return handleAPIError(error);
  }
}
