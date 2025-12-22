import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { MessageEditingService } from '@/lib/chat/message-editing';

/**
 * GET /api/chat/messages/[messageId]/edit
 *
 * Get message edit history
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const editHistory = await MessageEditingService.getEditHistory(
      params.messageId,
      limit
    );

    const message = await MessageEditingService.getMessageWithEditInfo(
      params.messageId,
      false
    );

    return NextResponse.json({
      message,
      editHistory,
    });
  } catch (error) {
    console.error('Failed to get edit history:', error);
    return NextResponse.json(
      { error: 'Failed to get edit history' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/chat/messages/[messageId]/edit
 *
 * Edit a message
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { content, roomId } = body;

    if (!content || !roomId) {
      return NextResponse.json(
        { error: 'Content and roomId are required' },
        { status: 400 }
      );
    }

    const payload = await MessageEditingService.editMessage(
      params.messageId,
      session.user.id,
      content,
      roomId
    );

    return NextResponse.json({ success: true, payload });
  } catch (error: any) {
    console.error('Failed to edit message:', error);
    const statusCode = error.message?.includes('not found')
      ? 404
      : error.message?.includes('Not authorized')
        ? 403
        : 400;
    return NextResponse.json(
      { error: error.message || 'Failed to edit message' },
      { status: statusCode }
    );
  }
}

/**
 * DELETE /api/chat/messages/[messageId]/edit
 *
 * Delete a message
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { messageId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { roomId, soft = true } = body;

    if (!roomId) {
      return NextResponse.json(
        { error: 'RoomId is required' },
        { status: 400 }
      );
    }

    const success = await MessageEditingService.deleteMessage(
      params.messageId,
      session.user.id,
      roomId,
      soft
    );

    return NextResponse.json({ success });
  } catch (error: any) {
    console.error('Failed to delete message:', error);
    const statusCode = error.message?.includes('not found')
      ? 404
      : error.message?.includes('Not authorized')
        ? 403
        : 400;
    return NextResponse.json(
      { error: error.message || 'Failed to delete message' },
      { status: statusCode }
    );
  }
}
