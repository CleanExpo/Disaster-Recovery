import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Require CLIENT role
    if (!requireRole(user, ['CLIENT'])) {
      return unauthorizedRoleResponse(['CLIENT']);
    }

    const requestId = params.id;

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

    // Get matched contractors for this request
    const matches = await prisma.contractorMatch.findMany({
      where: {
        serviceRequestId: requestId
      },
      include: {
        contractor: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        matchScore: 'desc'
      }
    });

    // Format the response
    const contractorMatches = matches.map(match => ({
      id: match.id,
      contractorId: match.contractorId,
      matchScore: match.matchScore,
      status: match.status,
      contractor: {
        id: match.contractor.id,
        businessName: match.contractor.businessName,
        phone: match.contractor.phone,
        city: match.contractor.city,
        state: match.contractor.state,
        services: match.contractor.services,
        experience: match.contractor.experience,
        rating: match.contractor.rating,
        totalJobs: match.contractor.totalJobs,
        hourlyRate: match.contractor.hourlyRate,
        bio: match.contractor.bio,
        availability: match.contractor.availability,
        isVerified: match.contractor.isVerified,
        user: {
          id: match.contractor.user.id,
          name: match.contractor.user.name,
          email: match.contractor.user.email,
          avatar: match.contractor.user.avatar
        }
      }
    }));

    return NextResponse.json({
      success: true,
      data: contractorMatches
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
