import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { ReadReceiptService } from '@/lib/realtime/read-receipts';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/rooms/[roomId]/unread-count
 * Get count of unread messages in a room for current user
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
