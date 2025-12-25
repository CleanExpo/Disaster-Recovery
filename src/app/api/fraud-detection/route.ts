import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { fraudReviewSchema, validateRequest, formatZodErrors } from '@/lib/validation';

export interface FraudRiskAssessment {
  riskScore: number;
  flags: string[];
  recommendation: 'APPROVE' | 'REVIEW' | 'REJECT';
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
}

// Get flagged transactions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    if (!isAdmin(user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const minRiskScore = parseFloat(searchParams.get('minRiskScore') || '0');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status !== 'all') {
      where.reviewStatus = status.toUpperCase();
    }

    if (minRiskScore > 0) {
      where.riskScore = { gte: minRiskScore };
    }

    const [flaggedTransactions, total] = await Promise.all([
      prisma.fraudAlert.findMany({
        where,
        include: {
          payment: {
            include: {
              client: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              booking: {
                select: {
                  id: true,
                  serviceType: true,
                },
              },
            },
          },
          reviewedBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { riskScore: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.fraudAlert.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: flaggedTransactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + flaggedTransactions.length < total,
      },
    });
  } catch (error) {
    console.error('Get fraud alerts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Review a flagged transaction
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    if (!isAdmin(user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();

    const validation = validateRequest(fraudReviewSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { transactionId, action, reason, notes } = validation.data;

    // Get the fraud alert
    const fraudAlert = await prisma.fraudAlert.findFirst({
      where: { paymentId: transactionId },
    });

    if (!fraudAlert) {
      return NextResponse.json(
        { success: false, error: 'Fraud alert not found' },
        { status: 404 }
      );
    }

    // Update fraud alert
    const updatedAlert = await prisma.fraudAlert.update({
      where: { id: fraudAlert.id },
      data: {
        reviewStatus: action,
        reviewedById: user.id,
        reviewedAt: new Date(),
        reviewNotes: notes,
        reviewReason: reason,
      },
    });

    // Update payment status based on action
    if (action === 'APPROVE') {
      await prisma.payment.update({
        where: { id: transactionId },
        data: { status: 'COMPLETED' },
      });
    } else if (action === 'REJECT') {
      await prisma.payment.update({
        where: { id: transactionId },
        data: { status: 'FAILED', failureReason: reason || 'Rejected due to fraud concerns' },
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedAlert,
      message: `Transaction ${action.toLowerCase()}ed successfully`,
    });
  } catch (error) {
    console.error('Review fraud alert error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
