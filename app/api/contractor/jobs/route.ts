import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const jobFilterSchema = z.object({
  status: z.enum(['pending', 'assigned', 'in_progress', 'completed']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  service: z.string().optional(),
  location: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required',
      }, { status: 401 });
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      status: searchParams.get('status') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      service: searchParams.get('service') || undefined,
      location: searchParams.get('location') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };

    // Validate filters
    const validatedFilters = jobFilterSchema.parse(filters);

    // Build Prisma where clause
    const where: Record<string, unknown> = {};

    if (validatedFilters.status) {
      where.status = validatedFilters.status;
    }

    if (validatedFilters.service) {
      where.serviceType = { contains: validatedFilters.service, mode: 'insensitive' };
    }

    if (validatedFilters.location) {
      where.OR = [
        { suburb: { contains: validatedFilters.location, mode: 'insensitive' } },
        { state: { contains: validatedFilters.location, mode: 'insensitive' } },
        { address: { contains: validatedFilters.location, mode: 'insensitive' } },
      ];
    }

    if (validatedFilters.dateFrom || validatedFilters.dateTo) {
      where.createdAt = {};
      if (validatedFilters.dateFrom) {
        (where.createdAt as Record<string, unknown>).gte = new Date(validatedFilters.dateFrom);
      }
      if (validatedFilters.dateTo) {
        (where.createdAt as Record<string, unknown>).lte = new Date(validatedFilters.dateTo);
      }
    }

    // Query total count for pagination
    const totalJobs = await prisma.job.count({ where });

    // Query jobs with pagination
    const skip = (validatedFilters.page - 1) * validatedFilters.limit;
    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: validatedFilters.limit,
    });

    // Map database rows to response structure
    const mappedJobs = jobs.map((job) => ({
      id: job.id,
      customer: {
        name: job.customerName,
        email: job.customerEmail || '',
        address: `${job.address}, ${job.suburb}, ${job.state} ${job.postcode}`,
      },
      service: {
        type: job.serviceType,
        name: job.serviceType.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        category: job.urgency === 'emergency' ? 'emergency' : 'standard',
      },
      status: job.status,
      priority: job.urgency,
      scheduledDate: job.assignedAt?.toISOString() || null,
      value: null,
      insurance: {
        hasInsurance: job.insuranceClaim,
        company: job.insurerName || undefined,
        claimNumber: job.claimNumber || undefined,
        policyNumber: job.policyNumber || undefined,
      },
      notes: job.description,
      internalNotes: job.internalNotes || null,
      completedAt: job.completedAt?.toISOString() || undefined,
      startedAt: job.startedAt?.toISOString() || undefined,
      acceptedAt: job.acceptedAt?.toISOString() || undefined,
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
    }));

    const totalPages = Math.ceil(totalJobs / validatedFilters.limit);

    return NextResponse.json({
      success: true,
      data: {
        jobs: mappedJobs,
        pagination: {
          page: validatedFilters.page,
          limit: validatedFilters.limit,
          total: totalJobs,
          totalPages,
          hasNext: validatedFilters.page < totalPages,
          hasPrev: validatedFilters.page > 1,
        },
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Jobs API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid filters',
        errors: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to fetch jobs',
    }, { status: 500 });
  }
}

// Accept or update a job
export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      return NextResponse.json({
        success: false,
        message: 'Contractor authentication required',
      }, { status: 401 });
    }

    const body = await request.json();
    const { jobId, action, data } = body;

    // Validate required fields
    if (!jobId || !action) {
      return NextResponse.json({
        success: false,
        message: 'jobId and action are required',
      }, { status: 400 });
    }

    // Validate action
    if (!['accept', 'decline', 'complete', 'update'].includes(action)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid action',
      }, { status: 400 });
    }

    // Verify the job exists
    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });
    if (!existingJob) {
      return NextResponse.json({
        success: false,
        message: `Job ${jobId} not found`,
      }, { status: 404 });
    }

    // Build update payload based on action
    let updateData: Record<string, unknown> = {};
    let message = '';

    switch (action) {
      case 'accept':
        updateData = { status: 'in_progress', acceptedAt: new Date() };
        message = `Job ${jobId} accepted successfully`;
        break;

      case 'decline':
        updateData = { status: 'pending', contractorId: null };
        message = `Job ${jobId} declined`;
        break;

      case 'complete':
        updateData = { status: 'completed', completedAt: new Date() };
        message = `Job ${jobId} marked as completed`;
        break;

      default:
        break;

      case 'update':
        // Only allow safe fields to be updated
        const allowedFields = ['description', 'internalNotes', 'status'];
        updateData = {};
        if (data && typeof data === 'object') {
          for (const key of allowedFields) {
            if (key in data) {
              updateData[key] = data[key];
            }
          }
        }
        message = `Job ${jobId} updated successfully`;
        break;
    }

    // Perform the database update
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData,
    });

    // DR-322 Path B — log outcome when job completes or is declined
    if (action === 'complete' || action === 'decline') {
      const now = new Date();
      const outcomeValue = action === 'complete' ? 'COMPLETED' : 'DECLINED';

      const responseMinutes = existingJob.assignedAt && existingJob.acceptedAt
        ? Math.round((existingJob.acceptedAt.getTime() - existingJob.assignedAt.getTime()) / 60000)
        : null;

      const durationMinutes = existingJob.acceptedAt
        ? Math.round((now.getTime() - existingJob.acceptedAt.getTime()) / 60000)
        : null;

      const totalMinutes = existingJob.createdAt
        ? Math.round((now.getTime() - existingJob.createdAt.getTime()) / 60000)
        : null;

      // Fire-and-forget — do not block the response on logging
      prisma.jobOutcome.create({
        data: {
          jobId: existingJob.id,
          outcome: outcomeValue,
          jobType: existingJob.serviceType,
          contractorId: existingJob.contractorId,
          loggedByUserId: user.id ?? 'SYSTEM',
          state: existingJob.state,
          suburb: existingJob.suburb,
          postcode: existingJob.postcode,
          urgency: existingJob.urgency,
          insuranceClaim: existingJob.insuranceClaim,
          insurerName: existingJob.insurerName ?? null,
          responseMinutes,
          durationMinutes,
          totalMinutes,
          metadata: {
            assignedAt: existingJob.assignedAt?.toISOString() ?? null,
            acceptedAt: existingJob.acceptedAt?.toISOString() ?? null,
            startedAt: existingJob.startedAt?.toISOString() ?? null,
            completedAt: action === 'complete' ? now.toISOString() : null,
          },
        },
      }).catch((err: unknown) => {
        console.error('[DR-322] JobOutcome log failed:', err);
      });
    }

    return NextResponse.json({
      success: true,
      message,
      job: {
        id: updatedJob.id,
        status: updatedJob.status,
        acceptedAt: updatedJob.acceptedAt?.toISOString() || null,
        completedAt: updatedJob.completedAt?.toISOString() || null,
        updatedAt: updatedJob.updatedAt.toISOString(),
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Job action error:', error);

    return NextResponse.json({
      success: false,
      message: 'Failed to process job action',
    }, { status: 500 });
  }
}
