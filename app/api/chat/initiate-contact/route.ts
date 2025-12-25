import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { z } from 'zod';

const initiateContactSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize: CLIENT role only
    if (!requireRole(user, ['CLIENT'])) {
      return unauthorizedRoleResponse(['CLIENT']);
    }

    // Validate request body
    const body = await request.json();
    const validation = initiateContactSchema.safeParse(body);

    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { contractorId } = validation.data;

    // Check if contractor exists and is verified
    const contractor = await prisma.contractorProfile.findFirst({
      where: {
        userId: contractorId,
        isVerified: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!contractor) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor not found or not verified',
        404
      );
    }

    // Check if there's already a connection (via service request match)
    const existingConnection = await prisma.contractorMatch.findFirst({
      where: {
        contractorId: contractor.id,
        serviceRequest: {
          userId: user.id,
        },
      },
    });

    if (existingConnection) {
      return NextResponse.json({
        success: true,
        message: 'Connection already exists',
        connectionId: existingConnection.id,
      });
    }

    // Create a direct contact request
    const contactRequest = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: contractorId,
        content: 'I would like to discuss a potential project with you.',
        messageType: 'GENERAL',
        subject: 'New Contact Request',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Contact request sent successfully',
      contactRequest,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
