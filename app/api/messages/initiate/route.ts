import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const initiateMessageSchema = z.object({
  receiverId: z.string().min(1),
  serviceRequestId: z.string().min(1),
  message: z.string().min(1).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { receiverId, serviceRequestId, message } = initiateMessageSchema.parse(body);

    // Check if users exist
    const sender = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!sender || !receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if service request exists
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    // Check if chat already exists for this service request
    const existingChat = await prisma.message.findFirst({
      where: {
        requestId: serviceRequestId,
        OR: [
          {
            senderId: payload.userId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: payload.userId,
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
        senderId: payload.userId,
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
    console.error('Error initiating chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
