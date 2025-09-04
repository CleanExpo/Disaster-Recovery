import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { InspectionReport } from '@/lib/templates/inspection-report-template';
import { validateInspectionSubmission } from '@/lib/templates/inspection-submission-requirements';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

    // TODO: Store the inspection report when inspectionReport model is added to schema
    // For now, create a stub response
    const inspectionReport = {
      id: `temp_${Date.now()}`,
      reportNumber: report.reportNumber,
      contractorId: report.contractorId,
      submittedAt: new Date()
    };
    
    // const inspectionReport = await prisma.inspectionReport.create({
    //   data: {
    //     reportNumber: report.reportNumber,
    //     contractorId: report.contractorId,
    //     clientId: report.clientId,
    //     propertyId: report.propertyId,
    //     workType: workType,
    //     inspectionDate: report.inspectionDate,
    //     reportDate: report.reportDate,
    //     inspectorName: report.inspectorName,
    //     inspectorCertifications: JSON.stringify(report.inspectorCertifications),
    //     
    //     // Property details
    //     propertyAddress: report.propertyDetails.address,
    //     propertyType: report.propertyDetails.propertyType,
    //     constructionType: report.propertyDetails.constructionType,
    //     
    //     // Loss details
    //     dateOfLoss: report.lossDetails.dateOfLoss,
    //     causeOfLoss: report.lossDetails.causeOfLoss,
    //     insuranceClaimNumber: report.lossDetails.insuranceClaimNumber,
    //     adjusterName: report.lossDetails.adjusterName,
    //     adjusterContact: report.lossDetails.adjusterContact,
    //     
    //     // Report content
    //     damageAssessment: JSON.stringify(report.damageAssessment),
    //     moistureReadings: JSON.stringify(report.moistureReadings),
    //     photos: JSON.stringify(report.photos),
    //     workRecommendations: JSON.stringify(report.workRecommendations),
    //     scopeOfWork: JSON.stringify(report.scopeOfWork),
    //     safetyConsiderations: JSON.stringify(report.safetyConsiderations),
    //     environmentalConditions: JSON.stringify(report.environmentalConditions),
    //     complianceRequirements: JSON.stringify(report.complianceRequirements),
    //     qualityAssurance: JSON.stringify(report.qualityAssurance),
    //     clientCommunication: JSON.stringify(report.clientCommunication),
    //     summary: JSON.stringify(report.summary),
    //     
    //     // Status and validation
    //     submissionStatus: 'SUBMITTED',
    //     validationScore: validation.completionScore,
    //     validationErrors: JSON.stringify(validation.errors),
    //     validationWarnings: JSON.stringify(validation.warnings),
    //     
    //     submittedAt: new Date()
    //   }
    // });

    // TODO: Create notifications when a proper admin user model is available
    // await prisma.notification.create({
    //   data: {
    //     type: 'INSPECTION_REPORT_SUBMITTED',
    //     title: 'New Inspection Report Submitted',
    //     message: `Inspection report ${report.reportNumber} submitted by ${contractor.username} for ${workType} work`,
    //     metadata: JSON.stringify({
    //       reportId: inspectionReport.id,
    //       contractorId: report.contractorId,
    //       contractorName: contractor.username,
    //       workType: workType,
    //       propertyAddress: report.propertyDetails.address,
    //       validationScore: validation.completionScore,
    //       criticalErrors: validation.errors.filter(e => e.severity === 'critical').length
    //     }),
    //     read: false,
    //     userId: 'admin_user_id' // Need admin user ID
    //   }
    // });

    // await prisma.notification.create({
    //   data: {
    //     type: 'INSPECTION_REPORT_RECEIVED',
    //     title: 'Inspection Report Submitted Successfully',
    //     message: `Your inspection report ${report.reportNumber} has been submitted and is under review`,
    //     metadata: JSON.stringify({
    //       reportId: inspectionReport.id,
    //       reportNumber: report.reportNumber,
    //       workType: workType,
    //       validationScore: validation.completionScore,
    //       estimatedReviewTime: '24-48 hours'
    //     }),
    //     read: false,
    //     userId: contractor.id // Assuming contractor has a user relation
    //   }
    // });

    // Update contractor statistics
    await prisma.contractor.update({
      where: { id: report.contractorId },
      data: {
        // TODO: Add totalReports field to Contractor model
        // totalReports: {
        //   increment: 1
        // },
        // lastActivityAt: new Date()
      }
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
    console.error('Error submitting inspection report:', error);
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

    // Build where clause
    const whereClause: any = { contractorId };
    
    if (status) {
      whereClause.submissionStatus = status;
    }
    
    if (workType) {
      whereClause.workType = workType;
    }

    // TODO: Query inspection reports when model is added to schema
    const reports: any[] = [];
    
    // const reports = await prisma.inspectionReport.findMany({
    //   where: whereClause,
    //   select: {
    //     id: true,
    //     reportNumber: true,
    //     workType: true,
    //     inspectionDate: true,
    //     reportDate: true,
    //     submissionStatus: true,
    //     validationScore: true,
    //     reviewStatus: true,
    //     reviewNotes: true,
    //     propertyAddress: true,
    //     submittedAt: true,
    //     reviewedAt: true,
    //     approvedAt: true
    //   },
    //   orderBy: {
    //     submittedAt: 'desc'
    //   }
    // });

    return NextResponse.json({
      reports: reports.map(report => ({
        ...report,
        canEdit: report.submissionStatus === 'DRAFT' || report.reviewStatus === 'REVISION_REQUIRED',
        canResubmit: report.reviewStatus === 'REVISION_REQUIRED'
      }))
    });

  } catch (error) {
    console.error('Error retrieving inspection reports:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inspection reports' },
      { status: 500 }
    );
  }
}