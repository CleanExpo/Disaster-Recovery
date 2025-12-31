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

    // Check authorization - only CLIENT and CONTRACTOR can access
    if (!requireRole(user, ['CLIENT', 'CONTRACTOR'])) {
      return unauthorizedRoleResponse(['CLIENT', 'CONTRACTOR']);
    }

    // Get the active project (ContractorMatch with ACCEPTED status)
    const project = await prisma.contractorMatch.findUnique({
      where: { id: params.id },
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
    });

    if (!project) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Project not found',
        404
      );
    }

    // Check if user has access to this project
    if (user.userType === 'CLIENT') {
      // Client can only view projects for their own service requests
      if (project.serviceRequest.userId !== user.id) {
        return createErrorResponse(
          ErrorCode.FORBIDDEN,
          'Unauthorized to view this project',
          403
        );
      }
    } else if (user.userType === 'CONTRACTOR') {
      // Contractor can only view their own projects
      if (project.contractor.userId !== user.id) {
        return createErrorResponse(
          ErrorCode.FORBIDDEN,
          'Unauthorized to view this project',
          403
        );
      }
    }

    // Transform the data based on user type
    const contractorSummary = user.userType === 'CLIENT'
      ? { id: project.contractorId }
      : project.contractor;

    const transformedProject = {
      id: project.id,
      budget: project.budget,
      timeline: project.timeline,
      startDate: project.startDate,
      estimatedHours: project.estimatedHours,
      message: project.contractorMessage,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      contractor: contractorSummary,
      client: {
        user: project.serviceRequest.user,
      },
      serviceRequest: {
        id: project.serviceRequest.id,
        serviceTitle: project.serviceRequest.serviceTitle,
        description: project.serviceRequest.description,
        location: project.serviceRequest.location,
        serviceCategory: project.serviceRequest.serviceCategory,
        urgency: project.serviceRequest.urgency,
        budget: project.serviceRequest.budget,
        createdAt: project.serviceRequest.createdAt,
      },
    };

    return NextResponse.json({
      success: true,
      project: transformedProject,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
