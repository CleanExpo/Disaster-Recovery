import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'CLIENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all contractors the user has connections with
    const connections = await prisma.contractorMatch.findMany({
      where: {
        serviceRequest: {
          userId: payload.userId
        }
      },
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
          select: {
            id: true,
            serviceTitle: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get unread message counts and last messages
    const connectionsWithMessages = await Promise.all(
      connections.map(async (connection) => {
        // Get unread message count
        const unreadCount = await prisma.message.count({
          where: {
            senderId: connection.contractor.userId,
            receiverId: payload.userId,
            isRead: false,
          },
        });

        // Get last message
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: payload.userId, receiverId: connection.contractor.userId },
              { senderId: connection.contractor.userId, receiverId: payload.userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        });

        return {
          id: connection.id,
          contractor: {
            id: connection.contractor.userId,
            name: connection.contractor.user.name,
            businessName: connection.contractor.businessName,
            avatar: connection.contractor.user.avatar,
            rating: connection.contractor.rating,
            isOnline: true, // This would be determined by a real-time system
          },
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            timestamp: lastMessage.createdAt.toISOString(),
            isFromUser: lastMessage.senderId === payload.userId,
          } : null,
          unreadCount,
          canChat: true,
          connectionReason: `Connected via ${connection.serviceRequest.serviceTitle}`,
        };
      })
    );

    return NextResponse.json({
      connections: connectionsWithMessages,
    });
  } catch (error) {
    console.error('Get chat connections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}
