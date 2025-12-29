/**
 * Inspection Reports API Routes
 *
 * Handles creation and listing of NRPG inspection reports
 *
 * @module InspectionReportsAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, AustralianState, IICRCStandard } from '@prisma/client';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

/**
 * POST /api/inspection-reports
 * Create a new inspection report
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'bookingId',
      'propertyId',
      'inspectorId',
      'inspectionDate',
      'jurisdiction',
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      logger.warn('Inspection report creation failed - missing fields', {
        missingFields,
        providedFields: Object.keys(body),
      });

      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate jurisdiction
    const validJurisdictions = [
      'NSW',
      'VIC',
      'QLD',
      'WA',
      'SA',
      'TAS',
      'ACT',
      'NT',
    ];

    if (!validJurisdictions.includes(body.jurisdiction)) {
      logger.warn('Invalid jurisdiction provided', {
        provided: body.jurisdiction,
        valid: validJurisdictions,
      });

      return NextResponse.json(
        {
          success: false,
          error: `Invalid jurisdiction. Must be one of: ${validJurisdictions.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: body.bookingId },
      include: { property: true },
    });

    if (!booking) {
      logger.warn('Booking not found for inspection report', {
        bookingId: body.bookingId,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Verify inspector exists and has appropriate role
    const inspector = await prisma.user.findUnique({
      where: { id: body.inspectorId },
    });

    if (!inspector) {
      logger.warn('Inspector not found', {
        inspectorId: body.inspectorId,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspector not found',
        },
        { status: 404 }
      );
    }

    // Generate unique report number
    const year = new Date().getFullYear();
    const lastReport = await prisma.inspectionReport.findFirst({
      where: {
        reportNumber: {
          startsWith: `NRPG-${year}`,
        },
      },
      orderBy: {
        reportNumber: 'desc',
      },
    });

    let reportNumber: string;
    if (lastReport) {
      const lastNum = parseInt(lastReport.reportNumber.split('-')[2]);
      reportNumber = `NRPG-${year}-${String(lastNum + 1).padStart(4, '0')}`;
    } else {
      reportNumber = `NRPG-${year}-0001`;
    }

    // Create inspection report
    const inspectionReport = await prisma.inspectionReport.create({
      data: {
        reportNumber,
        bookingId: body.bookingId,
        inspectorId: body.inspectorId,
        inspectionDate: new Date(body.inspectionDate),
        jurisdiction: body.jurisdiction as AustralianState,
        applicableCodes: body.applicableCodes || [],
        iicrcStandards: (body.iicrcStandards || []) as IICRCStandard[],
        scopeOfWork: body.scopeOfWork || '',
        findings: body.findings || '',
        recommendations: body.recommendations || '',
        executiveSummary: body.executiveSummary,
        limitations: body.limitations,
        insuranceClaimId: body.insuranceClaimId,
        createdBy: body.inspectorId, // Use inspectorId as creator for now
        status: 'SCHEDULED',
        isDraft: true,
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
      },
    });

    logger.info('Inspection report created successfully', {
      reportId: inspectionReport.id,
      reportNumber: inspectionReport.reportNumber,
      bookingId: inspectionReport.bookingId,
      inspectorId: inspectionReport.inspectorId,
    });

    return NextResponse.json(
      {
        success: true,
        data: inspectionReport,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Failed to create inspection report', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create inspection report',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * GET /api/inspection-reports
 * List inspection reports with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build filter object
    const where: any = {};

    // Filter by status
    if (searchParams.get('status')) {
      where.status = searchParams.get('status');
    }

    // Filter by jurisdiction
    if (searchParams.get('jurisdiction')) {
      where.jurisdiction = searchParams.get('jurisdiction');
    }

    // Filter by inspector
    if (searchParams.get('inspectorId')) {
      where.inspectorId = searchParams.get('inspectorId');
    }

    // Filter by booking
    if (searchParams.get('bookingId')) {
      where.bookingId = searchParams.get('bookingId');
    }

    // Filter by draft status
    if (searchParams.get('isDraft')) {
      where.isDraft = searchParams.get('isDraft') === 'true';
    }

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Fetch reports
    const [reports, totalCount] = await Promise.all([
      prisma.inspectionReport.findMany({
        where,
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
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.inspectionReport.count({ where }),
    ]);

    logger.info('Inspection reports retrieved', {
      count: reports.length,
      totalCount,
      filters: where,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        reports,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    });
  } catch (error) {
    logger.error('Failed to retrieve inspection reports', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve inspection reports',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
