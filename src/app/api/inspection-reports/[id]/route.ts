/**
 * Inspection Report Details API Routes
 *
 * Handles retrieval of individual inspection reports with all relations
 *
 * @module InspectionReportDetailsAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

/**
 * GET /api/inspection-reports/[id]
 * Get detailed inspection report with all relations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch report with all relations
    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            property: true,
            serviceRequest: true,
          },
        },
        inspector: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        insuranceClaim: true,
        damageAreas: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        moistureReadings: {
          orderBy: {
            readingDate: 'desc',
          },
        },
        photos: {
          orderBy: {
            takenAt: 'asc',
          },
        },
        costEstimate: {
          include: {
            lineItems: true,
          },
        },
        complianceChecks: {
          orderBy: {
            checkedAt: 'desc',
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
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        revisions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10, // Limit to 10 most recent revisions
        },
      },
    });

    if (!report) {
      logger.warn('Inspection report not found', { id });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    logger.info('Inspection report retrieved', {
      reportId: report.id,
      reportNumber: report.reportNumber,
      status: report.status,
    });

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error) {
    logger.error('Failed to retrieve inspection report', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve inspection report',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PATCH /api/inspection-reports/[id]
 * Update inspection report
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Verify report exists
    const existingReport = await prisma.inspectionReport.findUnique({
      where: { id },
    });

    if (!existingReport) {
      logger.warn('Inspection report not found for update', { id });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    // Prevent updating certain fields directly
    const protectedFields = [
      'id',
      'reportNumber',
      'createdAt',
      'createdBy',
      'bookingId',
    ];

    protectedFields.forEach((field) => {
      if (body[field] !== undefined) {
        delete body[field];
      }
    });

    // Update report
    const updatedReport = await prisma.inspectionReport.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
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
        damageAreas: true,
        moistureReadings: true,
        photos: true,
        costEstimate: true,
      },
    });

    logger.info('Inspection report updated', {
      reportId: updatedReport.id,
      reportNumber: updatedReport.reportNumber,
      updatedFields: Object.keys(body),
    });

    return NextResponse.json({
      success: true,
      data: updatedReport,
    });
  } catch (error) {
    logger.error('Failed to update inspection report', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update inspection report',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * DELETE /api/inspection-reports/[id]
 * Delete inspection report (soft delete by setting status to CANCELLED)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verify report exists
    const existingReport = await prisma.inspectionReport.findUnique({
      where: { id },
    });

    if (!existingReport) {
      logger.warn('Inspection report not found for deletion', { id });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    // Soft delete by updating status
    const deletedReport = await prisma.inspectionReport.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        isDraft: false,
        updatedAt: new Date(),
      },
    });

    logger.info('Inspection report deleted (soft delete)', {
      reportId: deletedReport.id,
      reportNumber: deletedReport.reportNumber,
    });

    return NextResponse.json({
      success: true,
      data: {
        message: 'Inspection report cancelled successfully',
        reportId: deletedReport.id,
      },
    });
  } catch (error) {
    logger.error('Failed to delete inspection report', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete inspection report',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
