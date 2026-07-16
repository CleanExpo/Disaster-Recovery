import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth/session';
import { isAdminRole } from '@/lib/admin-constants';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);

    if (!session || !isAdminRole(session.role)) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') ?? '30d';
    const metric = searchParams.get('metric');

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

    // Contractor metrics
    const [contractorStats, approvedContractors, totalContractors, activeContractors] =
      await Promise.all([
        prisma.contractor.aggregate({
          where: { createdAt: { gte: startDate } },
          _count: { id: true },
        }),
        prisma.contractor.count({
          where: { status: 'APPROVED', createdAt: { gte: startDate } },
        }),
        prisma.contractor.count(),
        prisma.contractor.count({ where: { status: 'APPROVED' } }),
      ]);

    // Revenue metrics
    const revenueStats = await prisma.contractorPayment.aggregate({
      where: { status: 'succeeded', createdAt: { gte: startDate } },
      _sum: { amount: true },
      _count: { id: true },
    });

    // Lead metrics
    const [leadStats, convertedLeads] = await Promise.all([
      prisma.lead.aggregate({
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
      }),
      prisma.lead.count({
        where: { status: 'CONVERTED', createdAt: { gte: startDate } },
      }),
    ]);

    // Inspection report metrics
    const [reportsSubmitted, reportsApproved] = await Promise.all([
      prisma.inspectionReport.count({ where: { createdAt: { gte: startDate } } }),
      prisma.inspectionReport.count({
        where: { createdAt: { gte: startDate }, status: 'APPROVED' },
      }),
    ]);

    const kpis = {
      contractors: {
        total: totalContractors,
        new: contractorStats._count.id,
        approved: approvedContractors,
        active: activeContractors,
        approvalRate:
          contractorStats._count.id > 0
            ? (approvedContractors / contractorStats._count.id) * 100
            : 0,
      },
      revenue: {
        total: revenueStats._sum.amount ?? 0,
        transactions: revenueStats._count.id,
        averageTransaction:
          revenueStats._count.id > 0
            ? (revenueStats._sum.amount ?? 0) / revenueStats._count.id
            : 0,
      },
      leads: {
        total: leadStats._count.id,
        converted: convertedLeads,
        conversionRate:
          leadStats._count.id > 0 ? (convertedLeads / leadStats._count.id) * 100 : 0,
      },
      quality: {
        reportsSubmitted,
        reportsApproved,
        approvalRate:
          reportsSubmitted > 0 ? (reportsApproved / reportsSubmitted) * 100 : 0,
      },
    };

    if (metric && metric in kpis) {
      return NextResponse.json({
        timeframe,
        metric,
        data: kpis[metric as keyof typeof kpis],
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ timeframe, kpis, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
