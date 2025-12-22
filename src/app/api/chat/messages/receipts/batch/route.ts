import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { ReadReceiptService } from '@/lib/realtime/read-receipts';

/**
 * POST /api/chat/messages/receipts/batch
 * Get read receipts for multiple messages
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messageIds } = await req.json();

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return NextResponse.json(
        { error: 'messageIds must be a non-empty array' },
        { status: 400 }
      );
    }

    if (messageIds.length > 100) {
      return NextResponse.json(
        { error: 'Maximum 100 message IDs allowed per request' },
        { status: 400 }
      );
    }

    // Get receipts for all messages
    const receiptsMap = await ReadReceiptService.getReceiptsBatch(messageIds);

    // Convert Map to object for JSON serialization
    const receiptsObject: Record<string, any> = {};
    for (const [messageId, receipt] of receiptsMap.entries()) {
      receiptsObject[messageId] = receipt;
    }

    return NextResponse.json(receiptsObject, { status: 200 });
  } catch (error) {
    console.error('Failed to get batch receipts:', error);
    return NextResponse.json(
      { error: 'Failed to get batch receipts' },
      { status: 500 }
    );
  }
}
