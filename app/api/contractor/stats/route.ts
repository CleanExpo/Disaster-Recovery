import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id }
    });

    if (!contractorProfile) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor profile not found',
        404
      );
    }

    // Get contractor matches (active projects)
    const activeMatches = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        status: 'ACCEPTED'
      },
      include: {
        serviceRequest: true
      }
    });

    // Get completed jobs (matches with completed service requests)
    const completedMatches = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        serviceRequest: {
          status: 'COMPLETED'
        }
      }
    });

    // Calculate stats
    const activeProjects = activeMatches.length;
    const completedJobs = completedMatches.length;
    const totalEarnings = completedJobs * (contractorProfile.hourlyRate || 0) * 8; // Assuming 8 hours per job
    const rating = contractorProfile.rating || 0;

    // Get today's opportunities (service requests in contractor's service areas)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysOpportunities = await prisma.serviceRequest.count({
      where: {
        status: 'PENDING',
        serviceCategory: {
          in: contractorProfile.services
        },
        createdAt: {
          gte: today
        }
      }
    });

    const stats = {
      activeProjects,
      totalEarnings,
      completedJobs,
      rating,
      todaysOpportunities
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
