import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { TypingIndicatorService } from '@/lib/realtime/typing-indicators';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/rooms/[roomId]/typing
 * Get current typing users in a room
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

    const typingUsers = await TypingIndicatorService.getTypingUsers(params.roomId);

    return NextResponse.json(
      {
        roomId: params.roomId,
        typingUsers: Array.from(typingUsers.entries()).map(([userId, user]) => ({
          userId: user.userId,
          userName: user.userName,
          startedAt: user.startedAt,
        })),
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get typing users:', error);
    return NextResponse.json(
      { error: 'Failed to get typing users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rooms/[roomId]/typing
 * Update typing status for current user
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

    const { isTyping, userName } = await req.json();

    if (typeof isTyping !== 'boolean') {
      return NextResponse.json(
        { error: 'isTyping must be a boolean' },
        { status: 400 }
      );
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

    if (isTyping) {
      // Set user as typing
      await TypingIndicatorService.setTyping(
        params.roomId,
        session.user.id,
        userName || session.user.name || 'Unknown'
      );
    } else {
      // Stop typing
      await TypingIndicatorService.stopTyping(params.roomId, session.user.id);
    }

    const typingUsers = await TypingIndicatorService.getTypingUsers(params.roomId);

    return NextResponse.json(
      {
        roomId: params.roomId,
        userId: session.user.id,
        isTyping,
        typingUsers: Array.from(typingUsers.entries()).map(([userId, user]) => ({
          userId: user.userId,
          userName: user.userName,
          startedAt: user.startedAt,
        })),
        timestamp: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update typing status:', error);
    return NextResponse.json(
      { error: 'Failed to update typing status' },
      { status: 500 }
    );
  }
}
