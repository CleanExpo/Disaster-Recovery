import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-options';
import { MessageThreadService } from '@/lib/chat/message-threads';

/**
 * GET /api/chat/messages/[messageId]/thread
 *
 * Get thread replies for a message
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
    const offset = parseInt(searchParams.get('offset') || '0');

    const replies = await MessageThreadService.getThreadReplies(
      params.messageId,
      limit,
      offset
    );

    const summary = await MessageThreadService.getThreadSummary(
      params.messageId,
      session.user.id
    );

    return NextResponse.json({
      replies,
      summary,
      hasMore: replies.length === limit,
    });
  } catch (error) {
    console.error('Failed to get thread:', error);
    return NextResponse.json(
      { error: 'Failed to get thread' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chat/messages/[messageId]/thread
 *
 * Create a thread reply
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
    const { roomId, content, attachments } = body;

    if (!roomId || !content) {
      return NextResponse.json(
        { error: 'RoomId and content are required' },
        { status: 400 }
      );
    }

    const payload = await MessageThreadService.createThreadReply(
      params.messageId,
      roomId,
      session.user.id,
      session.user.name || 'Unknown',
      content,
      attachments
    );

    return NextResponse.json({ success: true, payload });
  } catch (error: any) {
    console.error('Failed to create thread reply:', error);
    const statusCode = error.message?.includes('not found') ? 404 : 400;
    return NextResponse.json(
      { error: error.message || 'Failed to create thread reply' },
      { status: statusCode }
    );
  }
}
