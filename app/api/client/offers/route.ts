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
    if (!payload || payload.userType !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all contractor matches for this client's service requests
    const offers = await prisma.contractorMatch.findMany({
      where: {
        serviceRequest: {
          userId: payload.userId,
        },
        contractorMessage: {
          not: null, // Only matches with bids/messages
        },
      },
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
        serviceRequest: {
          select: {
            id: true,
            serviceTitle: true,
            description: true,
            location: true,
            serviceCategory: true,
            urgency: true,
            budget: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform the data to include bid details
    const transformedOffers = offers.map(offer => ({
      id: offer.id,
      contractor: offer.contractor,
      serviceRequest: offer.serviceRequest,
      budget: offer.budget,
      timeline: offer.timeline,
      startDate: offer.startDate,
      estimatedHours: offer.estimatedHours,
      message: offer.contractorMessage,
      status: offer.status,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      offers: transformedOffers,
    });
  } catch (error) {
    console.error('Get client offers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}