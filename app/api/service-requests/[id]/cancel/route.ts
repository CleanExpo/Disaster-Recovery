import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log('[CANCEL_REQUEST] ID:', id);

    if (!id) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Request ID is required',
        400
      );
    }

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

    // Find the service request
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id },
      include: {
        user: true
      }
    });

    console.log('[CANCEL_REQUEST] Found service request:', serviceRequest ? 'Yes' : 'No');

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    // Check if the user owns this request
    if (serviceRequest.userId !== user.id) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        'Unauthorized to cancel this request',
        403
      );
    }

    // Check if the request can be cancelled (only PENDING requests can be cancelled)
    console.log('[CANCEL_REQUEST] Current status:', serviceRequest.status);
    if (serviceRequest.status !== 'PENDING') {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Only pending requests can be cancelled',
        400,
        { currentStatus: serviceRequest.status }
      );
    }

    // Update the request status to CANCELLED
    console.log('[CANCEL_REQUEST] Updating status to CANCELLED');
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      },
      include: {
        user: true
      }
    });

    console.log('[CANCEL_REQUEST] Update successful');

    return NextResponse.json({
      success: true,
      message: 'Request cancelled successfully',
      request: updatedRequest
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
