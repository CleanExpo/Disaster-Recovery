import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { PresenceService } from '@/lib/realtime/presence';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/rooms/[roomId]/presence
 * Get presence status for all users in a room
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

    const roomPresence = await PresenceService.getRoomPresence(params.roomId);

    return NextResponse.json(
      {
        roomId: params.roomId,
        presenceList: roomPresence,
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get room presence:', error);
    return NextResponse.json(
      { error: 'Failed to get room presence' },
      { status: 500 }
    );
  }
}
