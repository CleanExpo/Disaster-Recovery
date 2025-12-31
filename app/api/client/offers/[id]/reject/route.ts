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
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
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

    // Auto-dispatch: client rejection is not supported. Admin-only override.
    // (Ownership checks are not required for admin actions.)

    // Update the offer status to REJECTED
    await prisma.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'REJECTED' },
    });

    // Send notification message to contractor
    await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: offer.contractor.userId,
        content: `Thank you for your interest in "${offer.serviceRequest.serviceTitle}". Unfortunately, we've decided to go with another contractor for this project. We'll keep your information for future opportunities.`,
        messageType: 'BID_REJECTED',
        requestId: offer.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Offer rejected successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
