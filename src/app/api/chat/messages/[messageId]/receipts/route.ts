import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { ReadReceiptService } from '@/lib/realtime/read-receipts';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/chat/messages/[messageId]/receipts
 * Get read receipts for a message
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

    // Verify message exists and user has access
    const message = await prisma.message.findFirst({
      where: {
        id: params.messageId,
        room: {
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

    // Get receipts
    const receipts = await ReadReceiptService.getReceipts(params.messageId);

    return NextResponse.json(receipts, { status: 200 });
  } catch (error) {
    console.error('Failed to get receipts:', error);
    return NextResponse.json(
      { error: 'Failed to get receipts' },
      { status: 500 }
    );
  }
}
