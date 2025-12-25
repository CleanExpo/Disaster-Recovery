import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { webrtcSignaling } from '@/lib/calling/webrtc-signaling';

/**
 * POST /api/calls/[callId]/signaling
 * Handle WebRTC signaling (offers, answers, ICE candidates)
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

    const { type, peerId, data } = await req.json();

    switch (type) {
      case 'offer': {
        if (!data?.sdp) {
          return NextResponse.json(
            { error: 'SDP data required' },
            { status: 400 }
          );
        }

        const offer = await webrtcSignaling.setLocalOffer(
          params.callId,
          peerId,
          data.sdp
        );

        return NextResponse.json(
          {
            type: 'offer',
            offer,
            message: 'Offer created',
          },
          { status: 200 }
        );
      }

      case 'answer': {
        if (!data?.sdp) {
          return NextResponse.json(
            { error: 'SDP data required' },
            { status: 400 }
          );
        }

        const answer = await webrtcSignaling.setRemoteAnswer(
          params.callId,
          peerId,
          data.sdp
        );

        return NextResponse.json(
          {
            type: 'answer',
            answer,
            message: 'Answer received',
          },
          { status: 200 }
        );
      }

      case 'ice-candidate': {
        if (!data?.candidate) {
          return NextResponse.json(
            { error: 'Candidate data required' },
            { status: 400 }
          );
        }

        const success = await webrtcSignaling.addICECandidate(
          params.callId,
          peerId,
          {
            candidate: data.candidate,
            sdpMLineIndex: data.sdpMLineIndex || 0,
            sdpMid: data.sdpMid || 'media',
          }
        );

        if (!success) {
          return NextResponse.json(
            { error: 'Failed to add ICE candidate' },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { message: 'ICE candidate added' },
          { status: 200 }
        );
      }

      default:
        return NextResponse.json(
          { error: 'Unknown signaling type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Signaling error:', error);
    return NextResponse.json(
      { error: 'Signaling failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calls/[callId]/signaling
 * Get pending signaling data (offers, answers, ICE candidates)
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

    const searchParams = req.nextUrl.searchParams;
    const peerId = searchParams.get('peerId');

    if (!peerId) {
      return NextResponse.json(
        { error: 'peerId query parameter required' },
        { status: 400 }
      );
    }

    const offer = webrtcSignaling.getPendingOffer(params.callId, peerId);
    const answer = webrtcSignaling.getPendingAnswer(params.callId, peerId);
    const iceCandidates = webrtcSignaling.getPendingICECandidates(
      params.callId,
      peerId
    );

    return NextResponse.json(
      {
        callId: params.callId,
        peerId,
        offer: offer || undefined,
        answer: answer || undefined,
        iceCandidates,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signaling fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to get signaling data' },
      { status: 500 }
    );
  }
}
