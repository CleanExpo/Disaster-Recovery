import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    // Get all contractors the user has connections with
    const connections = await prisma.contractorMatch.findMany({
      where: {
        serviceRequest: {
          userId: user.id
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
            receiverId: user.id,
            isRead: false,
          },
        });

        // Get last message
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: user.id, receiverId: connection.contractor.userId },
              { senderId: connection.contractor.userId, receiverId: user.id },
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
            isFromUser: lastMessage.senderId === user.id,
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
    return handleUnexpectedError(error);
  }
}
