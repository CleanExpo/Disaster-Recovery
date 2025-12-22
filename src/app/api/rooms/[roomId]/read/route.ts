import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { ReadReceiptService } from '@/lib/realtime/read-receipts';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/rooms/[roomId]/read
 * Mark all messages in room as read
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user has access to room
    const room = await prisma.chatRoom.findFirst({
      where: {
        id: params.roomId,
        members: {
          some: { id: session.user.id },
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found or access denied' },
        { status: 404 }
      );
    }

    // Mark room as read
    const result = await ReadReceiptService.markRoomAsRead(params.roomId, session.user.id);

    return NextResponse.json(
      {
        roomId: params.roomId,
        userId: session.user.id,
        markedAt: new Date(),
        messagesMarked: result.messagesMarked || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to mark room as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark room as read' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/rooms/[roomId]/read
 * Get unread count for room
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user has access to room
    const room = await prisma.chatRoom.findFirst({
      where: {
        id: params.roomId,
        members: {
          some: { id: session.user.id },
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found or access denied' },
        { status: 404 }
      );
    }

    // Get unread count
    const unreadCount = await ReadReceiptService.getUnreadCountInRoom(params.roomId, session.user.id);

    return NextResponse.json(
      {
        roomId: params.roomId,
        userId: session.user.id,
        unreadCount,
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get unread count:', error);
    return NextResponse.json(
      { error: 'Failed to get unread count' },
      { status: 500 }
    );
  }
}
