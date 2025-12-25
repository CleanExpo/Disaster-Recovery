import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { callService } from '@/lib/calling/call-service';
import { webrtcSignaling } from '@/lib/calling/webrtc-signaling';

/**
 * GET /api/calls/[callId]
 * Get call details
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const call = callService.getCall(params.callId);
    if (!call) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }

    const participants = callService.getCallParticipants(params.callId);
    const metrics = callService.getCallMetrics(params.callId);

    return NextResponse.json(
      {
        call,
        participants,
        metrics,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting call:', error);
    return NextResponse.json(
      { error: 'Failed to get call' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/calls/[callId]/accept
 * Accept an incoming call
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await req.json();

    switch (action) {
      case 'accept': {
        const call = await callService.acceptCall(params.callId, session.user.id);
        return NextResponse.json(
          { call, message: 'Call accepted' },
          { status: 200 }
        );
      }

      case 'reject': {
        const call = await callService.rejectCall(params.callId);
        return NextResponse.json(
          { call, message: 'Call rejected' },
          { status: 200 }
        );
      }

      case 'end': {
        const call = await callService.endCall(params.callId);
        return NextResponse.json(
          { call, message: 'Call ended' },
          { status: 200 }
        );
      }

      case 'miss': {
        const call = await callService.markCallAsMissed(params.callId);
        return NextResponse.json(
          { call, message: 'Call marked as missed' },
          { status: 200 }
        );
      }

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Call action error:', error);
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/calls/[callId]
 * Update call settings (audio/video toggle)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { callId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, enabled } = await req.json();

    let success = false;

    switch (action) {
      case 'toggle-audio':
        success = await callService.toggleAudio(params.callId, session.user.id, enabled);
        break;

      case 'toggle-video':
        success = await callService.toggleVideo(params.callId, session.user.id, enabled);
        break;

      case 'update-quality': {
        const quality = enabled;
        success = await callService.updateConnectionQuality(
          params.callId,
          session.user.id,
          quality
        );
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update call' },
        { status: 400 }
      );
    }

    const call = callService.getCall(params.callId);

    return NextResponse.json(
      {
        call,
        message: `${action} successful`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating call:', error);
    return NextResponse.json(
      { error: 'Failed to update call' },
      { status: 500 }
    );
  }
}
