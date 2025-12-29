/**
 * Inspection Report PDF Generation API
 *
 * Generates PDF reports with optional template types
 *
 * @module InspectionReportPDFAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

/**
 * Available PDF template types
 */
enum PDFTemplateType {
  STANDARD = 'STANDARD',
  INSURANCE = 'INSURANCE',
  CLIENT = 'CLIENT',
}

interface PDFGenerationRequest {
  templateType?: PDFTemplateType;
  includePhotos?: boolean;
  includeCostEstimate?: boolean;
  watermark?: boolean;
}

/**
 * POST /api/inspection-reports/[id]/pdf
 * Generate PDF report
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: PDFGenerationRequest = await request.json();

    // Default template type
    const templateType = body.templateType || PDFTemplateType.STANDARD;

    // Validate template type
    if (!Object.values(PDFTemplateType).includes(templateType)) {
      logger.warn('Invalid PDF template type', {
        reportId: id,
        providedType: templateType,
        validTypes: Object.values(PDFTemplateType),
      });

      return NextResponse.json(
        {
          success: false,
          error: `Invalid template type. Must be one of: ${Object.values(PDFTemplateType).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Fetch report with all necessary data
    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            property: true,
            serviceRequest: true,
            client: true,
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
          take: 50, // Limit to most recent readings
        },
        photos: {
          where: body.includePhotos !== false ? {} : { id: 'none' },
          orderBy: {
            takenAt: 'asc',
          },
        },
        costEstimate: body.includeCostEstimate !== false
          ? {
              include: {
                lineItems: {
                  orderBy: {
                    category: 'asc',
                  },
                },
              },
            }
          : undefined,
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
      },
    });

    if (!report) {
      logger.warn('Inspection report not found for PDF generation', { id });

      return NextResponse.json(
        {
          success: false,
          error: 'Inspection report not found',
        },
        { status: 404 }
      );
    }

    // Check if report is in a valid state for PDF generation
    const validStatuses = [
      'DRAFT_GENERATED',
      'TECHNICAL_REVIEW',
      'MANAGER_REVIEW',
      'APPROVED',
      'SENT_TO_CLIENT',
      'SENT_TO_INSURER',
    ];

    if (!validStatuses.includes(report.status)) {
      logger.warn('Report not in valid status for PDF generation', {
        reportId: id,
        reportNumber: report.reportNumber,
        currentStatus: report.status,
        validStatuses,
      });

      return NextResponse.json(
        {
          success: false,
          error: `Report must be in one of these statuses: ${validStatuses.join(', ')}`,
          currentStatus: report.status,
        },
        { status: 400 }
      );
    }

    // TODO: Implement actual PDF generation logic
    // This is a placeholder that would integrate with a PDF generation service
    // such as Puppeteer, PDFKit, or a cloud service like DocRaptor

    const pdfUrl = await generatePDF(report, templateType, body);

    // Update report with PDF information
    const updatedReport = await prisma.inspectionReport.update({
      where: { id },
      data: {
        pdfUrl,
        pdfGeneratedAt: new Date(),
        pdfVersion: report.pdfVersion + 1,
      },
      select: {
        id: true,
        reportNumber: true,
        pdfUrl: true,
        pdfGeneratedAt: true,
        pdfVersion: true,
      },
    });

    logger.info('PDF generated successfully', {
      reportId: id,
      reportNumber: report.reportNumber,
      templateType,
      pdfUrl,
      pdfVersion: updatedReport.pdfVersion,
    });

    return NextResponse.json({
      success: true,
      data: {
        reportId: updatedReport.id,
        reportNumber: updatedReport.reportNumber,
        pdfUrl: updatedReport.pdfUrl,
        pdfGeneratedAt: updatedReport.pdfGeneratedAt,
        pdfVersion: updatedReport.pdfVersion,
        templateType,
        options: {
          includePhotos: body.includePhotos !== false,
          includeCostEstimate: body.includeCostEstimate !== false,
          watermark: body.watermark,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to generate PDF', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate PDF report',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * GET /api/inspection-reports/[id]/pdf
 * Get PDF generation status and URL
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const report = await prisma.inspectionReport.findUnique({
      where: { id },
      select: {
        id: true,
        reportNumber: true,
        pdfUrl: true,
        pdfGeneratedAt: true,
        pdfVersion: true,
        status: true,
        updatedAt: true,
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

    const pdfStatus = {
      hasGeneratedPdf: !!report.pdfUrl,
      pdfUrl: report.pdfUrl,
      generatedAt: report.pdfGeneratedAt,
      version: report.pdfVersion,
      isOutdated:
        report.pdfGeneratedAt && report.updatedAt > report.pdfGeneratedAt,
      lastModified: report.updatedAt,
    };

    return NextResponse.json({
      success: true,
      data: pdfStatus,
    });
  } catch (error) {
    logger.error('Failed to get PDF status', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get PDF status',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PDF Generation Logic (Placeholder)
 *
 * This function should be replaced with actual PDF generation implementation
 * using a library like Puppeteer, PDFKit, or a cloud service
 */
async function generatePDF(
  report: any,
  templateType: PDFTemplateType,
  options: PDFGenerationRequest
): Promise<string> {
  // TODO: Implement actual PDF generation
  // For now, return a mock URL

  const timestamp = Date.now();
  const filename = `${report.reportNumber}-${templateType}-v${report.pdfVersion + 1}-${timestamp}.pdf`;

  // In production, this would:
  // 1. Generate HTML from template
  // 2. Convert HTML to PDF using Puppeteer or similar
  // 3. Upload PDF to S3 or similar storage
  // 4. Return the public URL

  // Mock URL for development
  const mockUrl = `https://storage.nrpg.com.au/reports/${report.id}/${filename}`;

  logger.info('PDF generation placeholder called', {
    reportId: report.id,
    reportNumber: report.reportNumber,
    templateType,
    filename,
    mockUrl,
    options,
  });

  return mockUrl;
}

/**
 * PDF Template Selection Logic
 *
 * Different templates for different audiences
 */
function selectTemplate(templateType: PDFTemplateType): string {
  switch (templateType) {
    case PDFTemplateType.STANDARD:
      return 'templates/standard-report.html';
    case PDFTemplateType.INSURANCE:
      return 'templates/insurance-report.html';
    case PDFTemplateType.CLIENT:
      return 'templates/client-report.html';
    default:
      return 'templates/standard-report.html';
  }
}
