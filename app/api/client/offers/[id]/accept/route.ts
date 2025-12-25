import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, ErrorCode, createErrorResponse } from '@/lib/api-errors';

export async function POST(
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

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get the offer/match
    const offer = await prisma.contractorMatch.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          include: {
            user: true,
          },
        },
        serviceRequest: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!offer) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Offer not found',
        404
      );
    }

    // Check if the client owns this service request (unless ADMIN)
    if (user.userType !== 'ADMIN' && offer.serviceRequest.userId !== user.id) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        'Unauthorized to accept this offer',
        403
      );
    }

    // Update the offer status to ACCEPTED
    await prisma.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'ACCEPTED' },
    });

    // Update the service request status to MATCHED
    await prisma.serviceRequest.update({
      where: { id: offer.serviceRequestId },
      data: { status: 'MATCHED' },
    });

    // Send notification message to contractor
    await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: offer.contractor.userId,
        content: `Great news! Your bid for "${offer.serviceRequest.serviceTitle}" has been accepted. The client is looking forward to working with you.`,
        messageType: 'BID_ACCEPTED',
        requestId: offer.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer accepted successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
