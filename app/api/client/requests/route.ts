import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      userId: payload.userId,
    };

    if (status) {
      where.status = status;
    }

    if (category) {
      where.serviceCategory = category;
    }

    // Get requests with matches and user info
    const [requests, totalCount] = await Promise.all([
      prisma.serviceRequest.findMany({
        where,
        include: {
          matches: {
            include: {
              contractor: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              matchScore: 'desc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.serviceRequest.count({ where }),
    ]);

    // Calculate statistics
    const stats = await prisma.serviceRequest.groupBy({
      by: ['status'],
      where: { userId: payload.userId },
      _count: {
        status: true,
      },
    });

    const statusCounts = stats.reduce((acc, stat) => {
      acc[stat.status] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      stats: {
        total: totalCount,
        pending: statusCounts.PENDING || 0,
        matched: statusCounts.MATCHED || 0,
        inProgress: statusCounts.IN_PROGRESS || 0,
        completed: statusCounts.COMPLETED || 0,
        cancelled: statusCounts.CANCELLED || 0,
      },
    });
  } catch (error) {
    console.error('Get client requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
