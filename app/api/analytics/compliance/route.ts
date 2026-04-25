import { NextRequest, NextResponse } from 'next/server';
import { getServerSession, type Session } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // ── Auth gate (fail closed) ───────────────────────────────────────────────
  // If session resolution throws (e.g. NEXTAUTH_SECRET missing in a preview
  // environment), treat the caller as unauthenticated rather than surfacing a
  // 500. This endpoint must never return internal data without a valid session.
  let session: Session | null = null;
  try {
    session = await getServerSession();
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {

    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') ?? '30d';
    const reportType = searchParams.get('type') ?? 'summary';

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
      where: { status: 'APPROVED' },
    });

    const certifiedContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        certifications: { some: { status: 'VERIFIED' } },
      },
    });

    const iicrcCertified = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        certifications: {
          some: {
            status: 'VERIFIED',
            certificationType: { startsWith: 'IICRC' },
          },
        },
      },
    });

    // Training compliance
    const completedTraining = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        onboardingStep: { gte: 14 },
      },
    });

    // Insurance compliance
    const insuredContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        insurance: {
          some: {
            status: 'ACTIVE',
            expiryDate: { gt: now },
          },
        },
      },
    });

    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const expiringSoon = await prisma.contractorInsurance.count({
      where: {
        status: 'ACTIVE',
        expiryDate: { gt: now, lte: thirtyDaysFromNow },
      },
    });

    // Inspection report quality compliance
    const reportsSubmitted = await prisma.inspectionReport.count({
      where: { createdAt: { gte: startDate } },
    });

    const approvedReports = await prisma.inspectionReport.count({
      where: {
        createdAt: { gte: startDate },
        status: 'APPROVED',
      },
    });

    const rejectedReports = await prisma.inspectionReport.count({
      where: {
        createdAt: { gte: startDate },
        status: 'REJECTED',
      },
    });

    // Audit compliance
    const auditEvents = await prisma.auditLog.count({
      where: { createdAt: { gte: startDate } },
    });

    const criticalEvents = await prisma.auditLog.count({
      where: {
        createdAt: { gte: startDate },
        success: false,
      },
    });

    const complianceReport = {
      summary: {
        overallCompliance:
          totalContractors > 0
            ? Math.round(
                ((certifiedContractors + insuredContractors + completedTraining) /
                  (totalContractors * 3)) *
                  100
              )
            : 0,
        totalContractors,
        lastUpdated: new Date().toISOString(),
      },
      certifications: {
        totalCertified: certifiedContractors,
        iicrcCertified,
        complianceRate:
          totalContractors > 0
            ? Math.round((certifiedContractors / totalContractors) * 100)
            : 0,
      },
      training: {
        completed: completedTraining,
        complianceRate:
          totalContractors > 0
            ? Math.round((completedTraining / totalContractors) * 100)
            : 0,
      },
      insurance: {
        validInsurance: insuredContractors,
        expiringSoon,
        complianceRate:
          totalContractors > 0
            ? Math.round((insuredContractors / totalContractors) * 100)
            : 0,
      },
      quality: {
        reportsSubmitted,
        approved: approvedReports,
        rejected: rejectedReports,
        approvalRate:
          reportsSubmitted > 0
            ? Math.round((approvedReports / reportsSubmitted) * 100)
            : 0,
      },
      audit: {
        totalEvents: auditEvents,
        failedEvents: criticalEvents,
        failureRate:
          auditEvents > 0 ? Math.round((criticalEvents / auditEvents) * 100) : 0,
      },
    };

    if (reportType === 'detailed') {
      const detailedData = await prisma.contractor.findMany({
        where: { status: 'APPROVED' },
        select: {
          id: true,
          username: true,
          email: true,
          onboardingStep: true,
          createdAt: true,
        },
        take: 100,
      });

      return NextResponse.json({
        timeframe,
        compliance: complianceReport,
        contractors: detailedData.map((contractor) => ({
          ...contractor,
          certifications: [] as string[],
          complianceScore: calculateContractorComplianceScore(contractor),
        })),
      });
    }

    return NextResponse.json({ timeframe, compliance: complianceReport });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calculateContractorComplianceScore(contractor: {
  onboardingStep: number | null;
}): number {
  const score = (contractor.onboardingStep ?? 0) >= 14 ? 1 : 0;
  return Math.round((score / 1) * 100);
}
