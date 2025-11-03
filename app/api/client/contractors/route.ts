import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, ErrorCode, createErrorResponse } from '@/lib/api-errors';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!requestId) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Request ID is required',
        400
      );
    }

    // Get the service request to verify ownership
    const serviceRequest = await prisma.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: user.id
      }
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    // Use enhanced matching service to get relevant contractors
    const matchingContractors = await EnhancedMatchingServiceV2.getContractorsForClientRequest(
      requestId,
      user.id
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
    return handleUnexpectedError(error);
  }
}
