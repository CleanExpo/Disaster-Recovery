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

    // NRPG uses private, automatic claim dispatch. Clients do not browse matched contractors.
    return NextResponse.json({
      success: true,
      dispatchMode: 'AUTO',
      data: []
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
