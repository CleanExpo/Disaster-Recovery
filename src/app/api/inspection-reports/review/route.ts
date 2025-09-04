import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { reportId, reviewStatus, reviewNotes, reviewedBy } = await req.json();

    // Validate input
    if (!reportId || !reviewStatus || !reviewedBy) {
      return NextResponse.json(
        { error: 'Missing required fields: reportId, reviewStatus, reviewedBy' },
        { status: 400 }
      );
    }

    const validStatuses = ['APPROVED', 'REVISION_REQUIRED', 'REJECTED'];
    if (!validStatuses.includes(reviewStatus)) {
      return NextResponse.json(
        { error: `Invalid review status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // TODO: Implement when inspectionReport model is added
    return NextResponse.json(
      { error: 'Inspection reports not yet implemented' },
      { status: 501 }
    );
    
    /* Commented out until model is added:
    const existingReport: any = null;
    
    // const existingReport = await prisma.inspectionReport.findUnique({
    //   where: { id: reportId },
    //   include: {
    //     contractor: {
    //       select: {
    //         id: true,
    //         email: true,
    //         username: true
    //       }
    //     }
    //   }
    // });

    if (!existingReport) {
      return NextResponse.json(
        { error: 'Inspection report not found' },
        { status: 404 }
      );
    }

    // TODO: Update the report when model is added
    const updatedReport: any = { id: reportId, reviewStatus };
    
    // const updatedReport = await prisma.inspectionReport.update({
    //   where: { id: reportId },
    //   data: {
    //     reviewStatus,
    //     reviewNotes,
    //     reviewedBy,
    //     reviewedAt: new Date(),
    //     approvedAt: reviewStatus === 'APPROVED' ? new Date() : null
    //   }
    // });

    // Create notification for contractor
    const notificationType = reviewStatus === 'APPROVED' ? 'INSPECTION_REPORT_APPROVED' : 
                            reviewStatus === 'REVISION_REQUIRED' ? 'INSPECTION_REPORT_REVISION_REQUIRED' :
                            'INSPECTION_REPORT_REJECTED';
    
    const notificationTitle = reviewStatus === 'APPROVED' ? 'Inspection Report Approved' :
                             reviewStatus === 'REVISION_REQUIRED' ? 'Inspection Report - Revision Required' :
                             'Inspection Report Rejected';

    const notificationMessage = reviewStatus === 'APPROVED' ? 
      `Your inspection report ${existingReport.reportNumber} has been approved` :
      reviewStatus === 'REVISION_REQUIRED' ?
      `Your inspection report ${existingReport.reportNumber} requires revisions. Please review the feedback and resubmit.` :
      `Your inspection report ${existingReport.reportNumber} has been rejected. Please review the feedback.`;

    await prisma.notification.create({
      data: {
        type: notificationType,
        title: notificationTitle,
        message: notificationMessage,
        metadata: JSON.stringify({
          reportId,
          reportNumber: existingReport.reportNumber,
          reviewStatus,
          reviewNotes,
          reviewedBy,
          reviewedAt: new Date().toISOString() }),
        read: false,
        recipientType: 'CONTRACTOR',
        recipientId: existingReport.contractorId }
    });

    // Update contractor quality metrics
    if (reviewStatus === 'APPROVED') {
      await prisma.contractor.update({
        where: { id: existingReport.contractorId },
        data: {
          approvedReports: {
            increment: 1
          },
          qualityScore: {
            // Simple quality score calculation based on validation score and approval
            increment: Math.max(1, Math.floor(existingReport.validationScore / 20))
          }
        }
      });
    } else if (reviewStatus === 'REJECTED') {
      await prisma.contractor.update({
        where: { id: existingReport.contractorId },
        data: {
          rejectedReports: {
            increment: 1
          },
          qualityScore: {
            decrement: 2
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      reportId: updatedReport.id,
      reviewStatus,
      message: `Inspection report ${reviewStatus.toLowerCase().replace('_', ' ')} successfully` });
    */
  } catch (error) {
    console.error('Error reviewing inspection report:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during report review',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // TODO: Implement when inspectionReport model is added
    return NextResponse.json(
      { error: 'Inspection reports not yet implemented' },
      { status: 501 }
    );

    /* Commented out until model is added:
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'SUBMITTED';
    const workType = searchParams.get('workType');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const whereClause: any = { 
      submissionStatus: 'SUBMITTED',
      reviewStatus: status === 'PENDING' ? null : status
    };
    
    if (workType) {
      whereClause.workType = workType;
    }

    const [reports, totalCount] = await Promise.all([
      prisma.inspectionReport.findMany({
        where: whereClause,
        include: {
          contractor: {
            select: {
              id: true,
              businessName: true,
              email: true,
              phone: true,
              qualityScore: true,
              totalReports: true,
              approvedReports: true
            }
          }
        },
        orderBy: {
          submittedAt: 'asc' // Oldest first for review queue
        },
        take: limit,
        skip: offset
      }),
      prisma.inspectionReport.count({ where: whereClause })
    ]);

    // Calculate priority scores for review queue
    const reportsWithPriority = reports.map(report => {
      let priorityScore = 0;
      
      // Age factor (older reports get higher priority)
      const ageInHours = (Date.now() - report.submittedAt.getTime()) / (1000 * 60 * 60);
      priorityScore += Math.min(ageInHours * 2, 48); // Max 48 points for age
      
      // Validation score factor (lower scores need more attention)
      priorityScore += (100 - report.validationScore) * 0.3;
      
      // Contractor quality factor (new contractors get priority)
      const contractorQuality = report.contractor.qualityScore || 0;
      priorityScore += Math.max(0, (50 - contractorQuality) * 0.2);
      
      // Work type urgency
      const workTypeUrgency = {
        'biohazard': 20,
        'water_damage': 15,
        'fire_damage': 12,
        'mould_remediation': 10,
        'storm_damage': 8
      };
      priorityScore += workTypeUrgency[report.workType as keyof typeof workTypeUrgency] || 5;

      return {
        ...report,
        priorityScore: Math.round(priorityScore),
        estimatedReviewTime: report.validationScore > 90 ? '15 min' : 
                           report.validationScore > 70 ? '30 min' : '45 min',
        validationErrors: JSON.parse(report.validationErrors || '[]'),
        validationWarnings: JSON.parse(report.validationWarnings || '[]')
      };
    });

    // Sort by priority score (highest first)
    reportsWithPriority.sort((a, b) => b.priorityScore - a.priorityScore);

    return NextResponse.json({
      reports: reportsWithPriority,
      totalCount,
      hasMore: offset + limit < totalCount,
      nextOffset: offset + limit,
      statistics: {
        pending: await prisma.inspectionReport.count({
          where: { submissionStatus: 'SUBMITTED', reviewStatus: null }
        }),
        approved: await prisma.inspectionReport.count({
          where: { reviewStatus: 'APPROVED' }
        }),
        revisionRequired: await prisma.inspectionReport.count({
          where: { reviewStatus: 'REVISION_REQUIRED' }
        }),
        rejected: await prisma.inspectionReport.count({
          where: { reviewStatus: 'REJECTED' }
        })
      }
    });
    */
  } catch (error) {
    console.error('Error retrieving inspection reports for review:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inspection reports' },
      { status: 500 }
    );
  }
}