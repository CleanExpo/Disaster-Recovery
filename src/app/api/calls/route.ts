import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { callService } from '@/lib/calling/call-service';
import type { CallType } from '@/lib/calling/call-service';

/**
 * POST /api/calls
 * Initiate a new call
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipientId, type = 'voice', roomId } = await req.json();

    if (!recipientId) {
      return NextResponse.json(
        { error: 'recipientId is required' },
        { status: 400 }
      );
    }

    if (!['voice', 'video'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid call type' },
        { status: 400 }
      );
    }

    const call = await callService.initiateCall(
      session.user.id,
      recipientId,
      type as CallType,
      roomId
    );

    return NextResponse.json(
      {
        call,
        timestamp: new Date(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calls
 * Get user's active calls and call history
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'active'; // active | history | missed

    switch (type) {
      case 'history': {
        const history = await callService.getCallHistory(session.user.id);
        return NextResponse.json(
          { calls: history, type: 'history' },
          { status: 200 }
        );
      }

      case 'missed': {
        const missed = await callService.getMissedCalls(session.user.id);
        return NextResponse.json(
          { calls: missed, type: 'missed' },
          { status: 200 }
        );
      }

      case 'active':
      default: {
        const activeCalls = callService.getUserActiveCalls(session.user.id);
        return NextResponse.json(
          { calls: activeCalls, type: 'active' },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error('Error getting calls:', error);
    return NextResponse.json(
      { error: 'Failed to get calls' },
      { status: 500 }
    );
  }
}
