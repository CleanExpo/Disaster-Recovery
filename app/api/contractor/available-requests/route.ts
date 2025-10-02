import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
    if (!payload || payload.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const urgency = searchParams.get('urgency');
    const minBudget = searchParams.get('minBudget');
    const maxBudget = searchParams.get('maxBudget');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: payload.userId },
      include: { user: true },
    });

    if (!contractorProfile) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Use enhanced matching service to get relevant requests
    const matchingRequests = await EnhancedMatchingServiceV2.findMatchingRequestsForContractor(
      contractorProfile.id,
      contractorProfile.tenantId
    );

    // Get full request details for matched requests
    const requestIds = matchingRequests.map(match => match.requestId);
    
    // Apply additional filters if provided
    const where: any = {
      id: { in: requestIds },
      status: 'PENDING',
    };

    if (category) {
      where.serviceCategory = category;
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (urgency) {
      where.urgency = urgency;
    }

    if (minBudget) {
      where.budget = {
        gte: parseFloat(minBudget),
      };
    }

    if (maxBudget) {
      where.budget = {
        lte: parseFloat(maxBudget),
      };
    }

    // Get available requests with additional filters
    const [requests, totalCount] = await Promise.all([
      prisma.serviceRequest.findMany({
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
          matches: {
            where: {
              contractorId: contractorProfile.id,
            },
          },
        },
        orderBy: [
          { leadScore: 'desc' },
          { urgentResponse: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.serviceRequest.count({ where }),
    ]);

    // Combine with match scores from enhanced matching
    const requestsWithScores = requests.map(request => {
      const matchData = matchingRequests.find(match => match.requestId === request.id);
      const hasBid = request.matches.length > 0;

      return {
        ...request,
        matchScore: matchData?.matchScore || 0,
        matchReasons: matchData?.reasons || [],
        hasBid,
        canBid: !hasBid && matchData?.canBid && contractorProfile.availability === 'AVAILABLE',
      };
    });

    // Sort by match score
    requestsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      requests: requestsWithScores,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      contractor: {
        id: contractorProfile.id,
        businessName: contractorProfile.businessName,
        services: contractorProfile.services,
        serviceAreas: contractorProfile.serviceAreas,
        availability: contractorProfile.availability,
      },
    });
  } catch (error) {
    console.error('Get available requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available requests' },
      { status: 500 }
    );
  }
}
