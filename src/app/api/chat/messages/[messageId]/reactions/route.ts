import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { MessageReactionService } from '@/lib/chat/message-reactions';

/**
 * GET /api/chat/messages/[messageId]/reactions
 *
 * Get reactions for a message
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

    const reactions = await MessageReactionService.getReactions(
      params.messageId,
      session.user.id
    );

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error('Failed to get reactions:', error);
    return NextResponse.json(
      { error: 'Failed to get reactions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chat/messages/[messageId]/reactions
 *
 * Add or remove a reaction
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

    const body = await req.json();
    const { emoji, roomId } = body;

    if (!emoji || !roomId) {
      return NextResponse.json(
        { error: 'Emoji and roomId are required' },
        { status: 400 }
      );
    }

    const payload = await MessageReactionService.addReaction(
      params.messageId,
      session.user.id,
      emoji,
      roomId
    );

    return NextResponse.json({ success: true, payload });
  } catch (error: any) {
    console.error('Failed to add reaction:', error);
    const statusCode = error.message?.includes('not found') ? 404 : 400;
    return NextResponse.json(
      { error: error.message || 'Failed to add reaction' },
      { status: statusCode }
    );
  }
}

/**
 * DELETE /api/chat/messages/[messageId]/reactions?emoji=...
 *
 * Remove a reaction
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

    const searchParams = req.nextUrl.searchParams;
    const emoji = searchParams.get('emoji');
    const roomId = searchParams.get('roomId');

    if (!emoji || !roomId) {
      return NextResponse.json(
        { error: 'Emoji and roomId are required' },
        { status: 400 }
      );
    }

    const payload = await MessageReactionService.removeReaction(
      params.messageId,
      session.user.id,
      emoji,
      roomId
    );

    return NextResponse.json({ success: true, payload });
  } catch (error) {
    console.error('Failed to remove reaction:', error);
    return NextResponse.json(
      { error: 'Failed to remove reaction' },
      { status: 500 }
    );
  }
}
