import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { z } from 'zod';

const initiateMessageSchema = z.object({
  receiverId: z.string().min(1, 'Receiver ID is required'),
  serviceRequestId: z.string().min(1, 'Service request ID is required'),
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long (max 1000 characters)'),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Validate request body
    const body = await request.json();
    const validation = initiateMessageSchema.safeParse(body);

    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { receiverId, serviceRequestId, message } = validation.data;

    // Check if receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      return createErrorResponse(
        ErrorCode.USER_NOT_FOUND,
        'Receiver not found',
        404
      );
    }

    // Check if service request exists
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    // Check if chat already exists for this service request
    const existingChat = await prisma.message.findFirst({
      where: {
        requestId: serviceRequestId,
        OR: [
          {
            senderId: user.id,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: user.id,
          },
        ],
      },
    });

    if (existingChat) {
      return NextResponse.json({
        success: true,
        message: 'Chat already exists for this request',
        alreadyExists: true,
        data: existingChat,
      });
    }

    // Create the message
    const newMessage = await prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: receiverId,
        content: message,
        messageType: 'INITIATE_CHAT',
        requestId: serviceRequestId,
      },
    });

    // Get the created message with user details
    const messageWithDetails = await prisma.message.findUnique({
      where: { id: newMessage.id },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Chat initiated successfully',
      alreadyExists: false,
      data: messageWithDetails,
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
