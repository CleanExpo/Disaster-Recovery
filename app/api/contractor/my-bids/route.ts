import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: payload.userId },
    });

    if (!contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Get contractor's bids
    const bids = await prisma.contractorMatch.findMany({
      where: { contractorId: contractorProfile.id },
      include: {
        serviceRequest: {
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
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics
    const stats = {
      total: bids.length,
      pending: bids.filter(bid => bid.status === 'PENDING').length,
      accepted: bids.filter(bid => bid.status === 'ACCEPTED').length,
      rejected: bids.filter(bid => bid.status === 'REJECTED').length,
      expired: bids.filter(bid => bid.status === 'EXPIRED').length,
    };

    return NextResponse.json({
      bids,
      stats,
    });
  } catch (error) {
    console.error('Get contractor bids error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bids' },
      { status: 500 }
    );
  }
}
