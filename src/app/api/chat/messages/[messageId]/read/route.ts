import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { ReadReceiptService } from '@/lib/realtime/read-receipts';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/chat/messages/[messageId]/read
 * Mark message as read by current user
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roomId } = await req.json();

    if (!roomId) {
      return NextResponse.json(
        { error: 'roomId is required' },
        { status: 400 }
      );
    }

    // Verify message exists and user has access to room
    const message = await prisma.message.findFirst({
      where: {
        id: params.messageId,
        room: {
          id: roomId,
          members: {
            some: { id: session.user.id },
          },
        },
      },
    });

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found or access denied' },
        { status: 404 }
      );
    }

    // Mark as read
    await ReadReceiptService.markAsRead(params.messageId, session.user.id, roomId);

    return NextResponse.json(
      {
        messageId: params.messageId,
        userId: session.user.id,
        status: 'read',
        readAt: new Date(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to mark message as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    );
  }
}
