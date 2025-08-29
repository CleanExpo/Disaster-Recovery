import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

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

    const certifiedContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        certifications: {
          not: null
        }
      }
    });

    const iicrcCertified = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        certifications: {
          contains: 'IICRC'
        }
      }
    });

    // Training compliance
    const completedTraining = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        onboardingStep: {
          gte: 14 // Completed all 14 days
        }
      }
    });

    // Insurance compliance
    const insuredContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        insuranceExpiry: {
          gte: now // Valid insurance
        }
      }
    });

    const expiringSoon = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        insuranceExpiry: {
          gte: now,
          lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // Expires in 30 days
        }
      }
    });

    // Document compliance
    const documentsSubmitted = await prisma.proofOfWork.count({
      where: {
        submittedAt: {
          gte: startDate
        }
      }
    });

    const documentsVerified = await prisma.proofOfWork.count({
      where: {
        verificationStatus: 'VERIFIED',
        submittedAt: {
          gte: startDate
        }
      }
    });

    const documentsRejected = await prisma.proofOfWork.count({
      where: {
        verificationStatus: 'REJECTED',
        submittedAt: {
          gte: startDate
        }
      }
    });

    // Quality compliance (inspection reports)
    const reportsSubmitted = await prisma.inspectionReport.count({
      where: {
        submittedAt: {
          gte: startDate
        }
      }
    });

    const highQualityReports = await prisma.inspectionReport.count({
      where: {
        validationScore: {
          gte: 90
        },
        submittedAt: {
          gte: startDate
        }
      }
    });

    const lowQualityReports = await prisma.inspectionReport.count({
      where: {
        validationScore: {
          lt: 70
        },
        submittedAt: {
          gte: startDate
        }
      }
    });

    // Audit compliance
    const auditEvents = await prisma.auditLog.count({
      where: {
        timestamp: {
          gte: startDate
        }
      }
    });

    const criticalEvents = await prisma.auditLog.count({
      where: {
        severity: 'CRITICAL',
        timestamp: {
          gte: startDate
        }
      }
    });

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
          businessName: true,
          email: true,
          certifications: true,
          onboardingStep: true,
          insuranceExpiry: true,
          createdAt: true,
          lastActivityAt: true,
          qualityScore: true
        },
        take: 100 // Limit for performance
      });

      return NextResponse.json({
        timeframe,
        compliance: complianceReport,
        contractors: detailedData.map(contractor => ({
          ...contractor,
          certifications: contractor.certifications ? JSON.parse(contractor.certifications as string) : [],
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
  let maxScore = 4;

  // Certification check
  if (contractor.certifications && contractor.certifications.includes('IICRC')) {
    score += 1;
  }

  // Training completion
  if (contractor.onboardingStep >= 14) {
    score += 1;
  }

  // Insurance validity
  if (contractor.insuranceExpiry && new Date(contractor.insuranceExpiry) >= now) {
    score += 1;
  }

  // Activity (last 30 days)
  if (contractor.lastActivityAt && new Date(contractor.lastActivityAt) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)) {
    score += 1;
  }

  return Math.round((score / maxScore) * 100);
}