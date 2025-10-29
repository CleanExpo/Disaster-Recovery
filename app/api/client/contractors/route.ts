import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';

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
    const requestId = searchParams.get('requestId');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!requestId) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Get the service request to verify ownership
    const serviceRequest = await prisma.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: payload.userId
      }
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    // Use enhanced matching service to get relevant contractors
    const matchingContractors = await EnhancedMatchingServiceV2.getContractorsForClientRequest(
      requestId,
      payload.userId
    );

    // Get full contractor details for matched contractors
    const contractorIds = matchingContractors.map(match => match.contractorId);
    
    // Apply additional filters if provided
    const where: any = {
      id: { in: contractorIds },
      availability: 'AVAILABLE',
      isVerified: true,
    };

    if (category) {
      where.services = {
        has: category
      };
    }

    if (location) {
      where.serviceAreas = {
        has: location
      };
    }

    // Get contractors with additional filters
    const [contractors, totalCount] = await Promise.all([
      prisma.contractorProfile.findMany({
        where,
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
        orderBy: [
          { rating: 'desc' },
          { experience: 'desc' },
          { totalJobs: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.contractorProfile.count({ where }),
    ]);

    // Combine with match scores from enhanced matching
    const contractorsWithScores = contractors.map(contractor => {
      const matchData = matchingContractors.find(match => match.contractorId === contractor.id);

      return {
        ...contractor,
        matchScore: matchData?.matchScore || 0,
        matchReasons: matchData?.reasons || [],
        canBid: matchData?.canBid || false,
      };
    });

    // Sort by match score
    contractorsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      contractors: contractorsWithScores,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      request: {
        id: serviceRequest.id,
        serviceCategory: serviceRequest.serviceCategory,
        location: serviceRequest.location,
        urgency: serviceRequest.urgency,
      },
    });
  } catch (error) {
    console.error('Get contractors for client error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contractors' },
      { status: 500 }
    );
  }
}
