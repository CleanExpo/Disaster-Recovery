import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contractorId = searchParams.get('contractorId');

    // Build where clause
    let whereClause: any = {
      OR: [
        { senderId: decoded.userId },
        { receiverId: decoded.userId },
      ],
    };

    // If contractorId is provided, filter messages between user and contractor
    if (contractorId) {
      whereClause = {
        OR: [
          {
            AND: [
              { senderId: decoded.userId },
              { receiverId: contractorId },
            ],
          },
          {
            AND: [
              { senderId: contractorId },
              { receiverId: decoded.userId },
            ],
          },
        ],
      };
    }

    // Get messages for the user
    const messages = await prisma.message.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' }, // Changed to asc for chat display
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, userType: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true, userType: true },
        },
      },
    });

    const unreadCount = await prisma.message.count({
      where: {
        receiverId: decoded.userId,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      messages,
      unreadCount,
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { receiverId, content, subject, requestId, messageType } = body;

    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Receiver ID and content are required' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: decoded.userId,
        receiverId,
        content,
        subject,
        requestId,
        messageType: messageType || 'GENERAL',
        isRead: false,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, userType: true },
        },
        receiver: {
          select: { id: true, name: true, avatar: true, userType: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message,
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { messageIds, conversationId } = body;

    if (messageIds && Array.isArray(messageIds)) {
      // Mark specific messages as read
      await prisma.message.updateMany({
        where: {
          id: { in: messageIds },
          receiverId: decoded.userId,
        },
        data: { isRead: true },
      });
    } else if (conversationId) {
      // Mark all messages in a conversation as read
      await prisma.message.updateMany({
        where: {
          OR: [
            {
              AND: [
                { senderId: conversationId },
                { receiverId: decoded.userId },
              ],
            },
            {
              AND: [
                { senderId: decoded.userId },
                { receiverId: conversationId },
              ],
            },
          ],
          receiverId: decoded.userId,
        },
        data: { isRead: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Messages marked as read',
    });

  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}