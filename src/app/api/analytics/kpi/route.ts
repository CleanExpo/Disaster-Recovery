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
    const timeframe = searchParams.get('timeframe') || '30d'; // 7d, 30d, 90d, 1y
    const metric = searchParams.get('metric'); // specific metric or all

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

    // Get contractor metrics
    const contractorStats = await prisma.contractor.aggregate({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        id: true
      }
    });

    const approvedContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED',
        createdAt: {
          gte: startDate
        }
      }
    });

    const totalContractors = await prisma.contractor.count();
    const activeContractors = await prisma.contractor.count({
      where: {
        status: 'APPROVED'
        // TODO: Add activity tracking when lastActivityAt field is added
      }
    });

    // Get revenue metrics - using ContractorPayment
    const revenueStats = await prisma.contractorPayment.aggregate({
      where: {
        status: 'succeeded',
        createdAt: {
          gte: startDate
        }
      },
      _sum: {
        amount: true
      },
      _count: {
        id: true
      }
    });

    // Get lead metrics
    const leadStats = await prisma.lead.aggregate({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        id: true
      }
    });

    const convertedLeads = await prisma.lead.count({
      where: {
        status: 'CONVERTED',
        createdAt: {
          gte: startDate
        }
      }
    });

    // Get inspection report metrics - TODO: Implement when inspection model is added
    const inspectionStats = {
      _count: { id: 0 },
      _avg: { validationScore: 0 }
    };

    const approvedReports = 0;

    // Calculate KPIs
    const kpis = {
      contractors: {
        total: totalContractors,
        new: contractorStats._count.id,
        approved: approvedContractors,
        active: activeContractors,
        approvalRate: contractorStats._count.id > 0 ? (approvedContractors / contractorStats._count.id) * 100 : 0
      },
      revenue: {
        total: revenueStats._sum.amount || 0,
        transactions: revenueStats._count.id,
        averageTransaction: revenueStats._count.id > 0 ? (revenueStats._sum.amount || 0) / revenueStats._count.id : 0
      },
      leads: {
        total: leadStats._count.id,
        converted: convertedLeads,
        conversionRate: leadStats._count.id > 0 ? (convertedLeads / leadStats._count.id) * 100 : 0
      },
      quality: {
        reportsSubmitted: inspectionStats._count.id,
        reportsApproved: approvedReports,
        approvalRate: inspectionStats._count.id > 0 ? (approvedReports / inspectionStats._count.id) * 100 : 0,
        averageQualityScore: inspectionStats._avg.validationScore || 0
      }
    };

    // If specific metric requested, return only that
    if (metric && metric in kpis) {
      return NextResponse.json({
        timeframe,
        metric,
        data: kpis[metric as keyof typeof kpis],
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      timeframe,
      kpis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching KPI analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}