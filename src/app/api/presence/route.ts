import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { PresenceService } from '@/lib/realtime/presence';

/**
 * GET /api/presence
 * Get current user presence
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const presence = await PresenceService.getPresence(session.user.id);

    return NextResponse.json(presence, { status: 200 });
  } catch (error) {
    console.error('Failed to get presence:', error);
    return NextResponse.json(
      { error: 'Failed to get presence' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/presence
 * Update user presence status
 */
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, currentRoom, statusMessage } = await req.json();

    if (!status || !['online', 'away', 'dnd', 'offline'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const presence = await PresenceService.updatePresence(
      session.user.id,
      status as 'online' | 'away' | 'dnd' | 'offline',
      currentRoom,
      statusMessage
    );

    return NextResponse.json(presence, { status: 200 });
  } catch (error) {
    console.error('Failed to update presence:', error);
    return NextResponse.json(
      { error: 'Failed to update presence' },
      { status: 500 }
    );
  }
}
