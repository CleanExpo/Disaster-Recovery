import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { InspectionReport } from '@/lib/templates/inspection-report-template';
import { validateInspectionSubmission } from '@/lib/templates/inspection-submission-requirements';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/inspection-reports/submit' });
  try {
    const { report, workType }: { report: InspectionReport; workType: string } = await req.json();

    // Validate the inspection report
    const validation = validateInspectionSubmission(report, workType);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          validationErrors: validation.errors,
          validationWarnings: validation.warnings,
          completionScore: validation.completionScore
        },
        { status: 400 }
      );
    }

    // Check if contractor exists and is approved
    const contractor = await prisma.contractor.findUnique({
      where: { id: report.contractorId },
      select: {
        id: true,
        status: true,
        username: true,
        email: true
      }
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 404 }
      );
    }

    if (contractor.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Only approved contractors can submit inspection reports' },
        { status: 403 }
      );
    }

    // Create inspection report in database
    const inspectionReport = await prisma.inspectionReport.create({
      data: {
        reportNumber: report.reportNumber,
        bookingId: report.bookingId || `BK-${Date.now()}`,
        insuranceClaimId: report.lossDetails?.insuranceClaimNumber || null,
        inspectionDate: new Date(report.inspectionDate),
        inspectorId: report.contractorId,
        jurisdiction: report.propertyDetails?.state || 'QLD',
        applicableCodes: report.complianceRequirements ? Object.keys(report.complianceRequirements) : [],
        iicrcStandards: [],
        status: 'SUBMITTED',
        isDraft: false,
        executiveSummary: typeof report.summary === 'string' ? report.summary : JSON.stringify(report.summary || ''),
        scopeOfWork: typeof report.scopeOfWork === 'string' ? report.scopeOfWork : JSON.stringify(report.scopeOfWork || ''),
        findings: JSON.stringify(report.damageAssessment || {}),
        recommendations: JSON.stringify(report.workRecommendations || {}),
        limitations: JSON.stringify(report.safetyConsiderations || {}),
        complianceStatus: validation.completionScore >= 80 ? 'COMPLIANT' : 'REVIEW_REQUIRED',
        createdBy: report.contractorId,
      },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'contractor',
      metadata: {
        route: '/api/inspection-reports/submit',
        request_id: log.requestId,
        report_id: inspectionReport.id,
        contractor_id: report.contractorId,
        validation_score: validation.completionScore,
      },
    });

    return NextResponse.json({
      success: true,
      reportId: inspectionReport.id,
      reportNumber: report.reportNumber,
      status: 'SUBMITTED',
      validationScore: validation.completionScore,
      message: 'Inspection report submitted successfully and is under review',
      estimatedReviewTime: '24-48 hours',
      validationWarnings: validation.warnings
    });

  } catch (error) {
    log.error('error submitting inspection report', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/inspection-reports/submit' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        error: 'Internal server error during report submission',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/inspection-reports/submit' });
  try {
    const { searchParams } = new URL(req.url);
    const contractorId = searchParams.get('contractorId');
    const status = searchParams.get('status');
    const workType = searchParams.get('workType');

    if (!contractorId) {
      return NextResponse.json(
        { error: 'contractorId parameter is required' },
        { status: 400 }
      );
    }

    // Build where clause using actual InspectionReport model fields
    const whereClause: any = { inspectorId: contractorId };

    if (status) {
      whereClause.status = status;
    }

    const reports = await prisma.inspectionReport.findMany({
      where: whereClause,
      select: {
        id: true,
        reportNumber: true,
        inspectionDate: true,
        status: true,
        complianceStatus: true,
        scopeOfWork: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      reports: reports.map(report => ({
        ...report,
        canEdit: report.status === 'DRAFT' || report.status === 'REVISION_REQUIRED',
        canResubmit: report.status === 'REVISION_REQUIRED'
      }))
    });

  } catch (error) {
    log.error('error retrieving inspection reports', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/inspection-reports/submit' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { error: 'Failed to retrieve inspection reports' },
      { status: 500 }
    );
  }
}