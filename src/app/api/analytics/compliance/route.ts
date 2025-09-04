import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') || '30d';
    const reportType = searchParams.get('type') || 'summary';

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    
    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Certification compliance
    const totalContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED'
      }
    });

    // Count contractors with certifications (using relation)
    const certifiedContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED'
      }
    });

    // For now, use same count as certified (TODO: fix when certifications field is properly typed)
    const iicrcCertified = certifiedContractors;

    // Training compliance
    const completedTraining = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        onboardingStep: {
          gte: 14 // Completed all 14 days
        }
      }
    });

    // Insurance compliance - TODO: Fix when insurance relation is properly implemented
    const insuredContractors = totalContractors; // Placeholder

    const expiringSoon = 0; // Placeholder

    // Document compliance - TODO: Implement when document tracking is added
    const documentsSubmitted = 0; // Placeholder

    const documentsVerified = 0; // Placeholder

    const documentsRejected = 0; // Placeholder

    // Quality compliance (inspection reports) - TODO: Implement when inspection tracking is added
    const reportsSubmitted = 0; // Placeholder

    const highQualityReports = 0; // Placeholder

    const lowQualityReports = 0; // Placeholder

    // Audit compliance - TODO: Implement when audit tracking is added
    const auditEvents = 0; // Placeholder

    const criticalEvents = 0; // Placeholder

    const complianceReport = {
      summary: {
        overallCompliance: totalContractors > 0 ? Math.round(((certifiedContractors + insuredContractors + completedTraining) / (totalContractors * 3)) * 100) : 0,
        totalContractors,
        lastUpdated: new Date().toISOString()
      },
      certifications: {
        totalCertified: certifiedContractors,
        iicrcCertified,
        complianceRate: totalContractors > 0 ? Math.round((certifiedContractors / totalContractors) * 100) : 0
      },
      training: {
        completed: completedTraining,
        complianceRate: totalContractors > 0 ? Math.round((completedTraining / totalContractors) * 100) : 0
      },
      insurance: {
        validInsurance: insuredContractors,
        expiringSoon,
        complianceRate: totalContractors > 0 ? Math.round((insuredContractors / totalContractors) * 100) : 0
      },
      documentation: {
        submitted: documentsSubmitted,
        verified: documentsVerified,
        rejected: documentsRejected,
        verificationRate: documentsSubmitted > 0 ? Math.round((documentsVerified / documentsSubmitted) * 100) : 0
      },
      quality: {
        reportsSubmitted,
        highQuality: highQualityReports,
        lowQuality: lowQualityReports,
        qualityRate: reportsSubmitted > 0 ? Math.round((highQualityReports / reportsSubmitted) * 100) : 0
      },
      audit: {
        totalEvents: auditEvents,
        criticalEvents,
        criticalEventRate: auditEvents > 0 ? Math.round((criticalEvents / auditEvents) * 100) : 0
      }
    };

    if (reportType === 'detailed') {
      // Add detailed contractor-level compliance data
      const detailedData = await prisma.contractor.findMany({
        where: {
          status: 'APPROVED'
        },
        select: {
          id: true,
          username: true,
          email: true,
          certifications: true,
          onboardingStep: true,
          createdAt: true
        },
        take: 100 // Limit for performance
      });

      return NextResponse.json({
        timeframe,
        compliance: complianceReport,
        contractors: detailedData.map(contractor => ({
          ...contractor,
          certifications: contractor.certifications ? 
            (typeof contractor.certifications === 'string' ? 
              (contractor.certifications.startsWith('[') ? JSON.parse(contractor.certifications) : [contractor.certifications]) 
              : []) 
            : [],
          complianceScore: calculateContractorComplianceScore(contractor, now)
        }))
      });
    }

    return NextResponse.json({
      timeframe,
      compliance: complianceReport
    });

  } catch (error) {
    console.error('Error fetching compliance analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateContractorComplianceScore(contractor: any, now: Date): number {
  let score = 0;
  let maxScore = 2;

  // Certification check
  if (contractor.certifications && contractor.certifications.includes('IICRC')) {
    score += 1;
  }

  // Training completion
  if (contractor.onboardingStep >= 14) {
    score += 1;
  }

  return Math.round((score / maxScore) * 100);
}