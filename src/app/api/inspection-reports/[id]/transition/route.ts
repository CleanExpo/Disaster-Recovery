/**
 * Inspection Report Status Transition API
 *
 * Handles status transitions with validation and approval workflows
 *
 * @module InspectionReportTransitionAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, InspectionStatus } from '@prisma/client';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

/**
 * Define allowed status transitions
 * Maps current status -> allowed next statuses
 */
const ALLOWED_TRANSITIONS: Record<InspectionStatus, InspectionStatus[]> = {
  SCHEDULED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['DATA_COLLECTION_COMPLETE', 'CANCELLED'],
  DATA_COLLECTION_COMPLETE: ['DRAFT_GENERATED', 'IN_PROGRESS', 'CANCELLED'],
  DRAFT_GENERATED: ['TECHNICAL_REVIEW', 'DATA_COLLECTION_COMPLETE', 'CANCELLED'],
  TECHNICAL_REVIEW: ['MANAGER_REVIEW', 'REVISED', 'DRAFT_GENERATED', 'CANCELLED'],
  MANAGER_REVIEW: ['APPROVED', 'REVISED', 'TECHNICAL_REVIEW', 'CANCELLED'],
  APPROVED: ['SENT_TO_CLIENT', 'SENT_TO_INSURER', 'REVISED'],
  SENT_TO_CLIENT: ['REVISED'],
  SENT_TO_INSURER: ['REVISED'],
  REVISED: ['DRAFT_GENERATED', 'CANCELLED'],
  CANCELLED: [], // Cannot transition from cancelled
};

/**
 * Define required roles for each status transition
 */
const REQUIRED_ROLES: Record<InspectionStatus, string[]> = {
  SCHEDULED: ['INSPECTOR', 'ADMIN'],
  IN_PROGRESS: ['INSPECTOR', 'ADMIN'],
  DATA_COLLECTION_COMPLETE: ['INSPECTOR', 'ADMIN'],
  DRAFT_GENERATED: ['INSPECTOR', 'ADMIN'],
  TECHNICAL_REVIEW: ['TECHNICAL_REVIEWER', 'ADMIN'],
  MANAGER_REVIEW: ['MANAGER', 'ADMIN'],
  APPROVED: ['MANAGER', 'ADMIN'],
  SENT_TO_CLIENT: ['MANAGER', 'ADMIN'],
  SENT_TO_INSURER: ['MANAGER', 'ADMIN'],
  REVISED: ['INSPECTOR', 'TECHNICAL_REVIEWER', 'MANAGER', 'ADMIN'],
  CANCELLED: ['MANAGER', 'ADMIN'],
};

interface TransitionRequest {
  toStatus: InspectionStatus;
  userId: string;
  userRole: string;
  notes?: string;
}

interface TransitionError {
  code: string;
  message: string;
  currentStatus?: InspectionStatus;
  requestedStatus?: InspectionStatus;
  allowedStatuses?: InspectionStatus[];
  requiredRole?: string[];
  providedRole?: string;
}

/**
 * POST /api/inspection-reports/[id]/transition
 * Transition report status with validation
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: TransitionRequest = await request.json();

    // Validate required fields
    if (!body.toStatus || !body.userId || !body.userRole) {
      logger.warn('Status transition failed - missing required fields', {
        reportId: id,
        providedFields: Object.keys(body),
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: toStatus, userId, userRole',
        },
        { status: 400 }
      );
    }

    // Fetch current report
    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      include: {
        booking: true,
        inspector: true,
      },
    });

    if (!report) {
      logger.warn('Inspection report not found for transition', { id });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (!user) {
      logger.warn('User not found for transition', {
        userId: body.userId,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    // Validate transition is allowed
    const currentStatus = report.status;
    const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus];

    if (!allowedNextStatuses.includes(body.toStatus)) {
      const error: TransitionError = {
        code: 'INVALID_TRANSITION',
        message: `Cannot transition from ${currentStatus} to ${body.toStatus}`,
        currentStatus,
        requestedStatus: body.toStatus,
        allowedStatuses: allowedNextStatuses,
      };

      logger.warn('Invalid status transition attempt', {
        reportId: id,
        reportNumber: report.reportNumber,
        currentStatus,
        requestedStatus: body.toStatus,
        allowedStatuses: allowedNextStatuses,
        userId: body.userId,
      });

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 400 }
      );
    }

    // Validate user has required role
    const requiredRoles = REQUIRED_ROLES[body.toStatus];

    if (!requiredRoles.includes(body.userRole)) {
      const error: TransitionError = {
        code: 'INSUFFICIENT_PERMISSIONS',
        message: `User role ${body.userRole} cannot transition to ${body.toStatus}`,
        requestedStatus: body.toStatus,
        requiredRole: requiredRoles,
        providedRole: body.userRole,
      };

      logger.warn('Insufficient permissions for transition', {
        reportId: id,
        reportNumber: report.reportNumber,
        requestedStatus: body.toStatus,
        requiredRoles,
        providedRole: body.userRole,
        userId: body.userId,
      });

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 403 }
      );
    }

    // Build update data based on target status
    const updateData: any = {
      status: body.toStatus,
      updatedAt: new Date(),
    };

    // Set draft status based on target status
    if (
      ['APPROVED', 'SENT_TO_CLIENT', 'SENT_TO_INSURER'].includes(body.toStatus)
    ) {
      updateData.isDraft = false;
    }

    // Update reviewer fields based on status
    if (body.toStatus === 'TECHNICAL_REVIEW' && body.userRole === 'TECHNICAL_REVIEWER') {
      updateData.technicalReviewerId = body.userId;
      updateData.technicalReviewDate = new Date();
      updateData.technicalReviewNotes = body.notes;
    }

    if (body.toStatus === 'MANAGER_REVIEW' && body.userRole === 'MANAGER') {
      updateData.managerReviewerId = body.userId;
      updateData.managerReviewDate = new Date();
      updateData.managerReviewNotes = body.notes;
    }

    if (body.toStatus === 'APPROVED' && body.userRole === 'MANAGER') {
      updateData.finalApproverId = body.userId;
      updateData.finalApprovalDate = new Date();
    }

    // Perform transition
    const updatedReport = await prisma.inspectionReport.update({
      where: { id },
      data: updateData,
      include: {
        booking: {
          include: {
            property: true,
          },
        },
        inspector: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        technicalReviewer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        managerReviewer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        finalApprover: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create revision record
    await prisma.reportRevision.create({
      data: {
        reportId: id,
        version: report.version,
        changedBy: body.userId,
        changeType: 'STATUS_CHANGE',
        changeDescription: `Status changed from ${currentStatus} to ${body.toStatus}`,
        previousData: JSON.stringify({ status: currentStatus }),
        newData: JSON.stringify({ status: body.toStatus }),
        notes: body.notes,
      },
    });

    logger.info('Inspection report status transitioned successfully', {
      reportId: id,
      reportNumber: report.reportNumber,
      fromStatus: currentStatus,
      toStatus: body.toStatus,
      userId: body.userId,
      userRole: body.userRole,
    });

    return NextResponse.json({
      success: true,
      data: {
        report: updatedReport,
        transition: {
          from: currentStatus,
          to: body.toStatus,
          performedBy: {
            id: user.id,
            name: user.name,
            role: body.userRole,
          },
          timestamp: new Date(),
          notes: body.notes,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to transition inspection report status', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to transition inspection report status',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * GET /api/inspection-reports/[id]/transition
 * Get available transitions for current status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userRole = searchParams.get('userRole');

    // Fetch current report
    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      select: {
        id: true,
        reportNumber: true,
        status: true,
      },
    });

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    const currentStatus = report.status;
    const allowedStatuses = ALLOWED_TRANSITIONS[currentStatus];

    // Filter by user role if provided
    let availableTransitions = allowedStatuses.map((status) => ({
      status,
      requiredRoles: REQUIRED_ROLES[status],
      canTransition: userRole
        ? REQUIRED_ROLES[status].includes(userRole)
        : undefined,
    }));

    return NextResponse.json({
      success: true,
      data: {
        currentStatus,
        availableTransitions,
        userRole: userRole || null,
      },
    });
  } catch (error) {
    logger.error('Failed to get available transitions', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get available transitions',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
