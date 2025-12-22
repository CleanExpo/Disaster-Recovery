import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth-config';
import { callRecording } from '@/lib/calling/call-recording';

/**
 * POST /api/calls/[callId]/recording
 * Manage call recording (start, stop, pause, resume)
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

    const { action, participantIds, format, audioEnabled, videoEnabled, fileUrl, fileSize } =
      await req.json();

    switch (action) {
      case 'start': {
        if (!participantIds || !Array.isArray(participantIds)) {
          return NextResponse.json(
            { error: 'participantIds array is required' },
            { status: 400 }
          );
        }

        const recording = await callRecording.startRecording(
          params.callId,
          participantIds,
          format || 'mp4',
          { audioEnabled, videoEnabled }
        );

        return NextResponse.json(
          { recording, message: 'Recording started' },
          { status: 201 }
        );
      }

      case 'stop': {
        if (!fileUrl || fileSize === undefined) {
          return NextResponse.json(
            { error: 'fileUrl and fileSize are required' },
            { status: 400 }
          );
        }

        // Find the current recording for this call
        const recordings = callRecording.getCallRecordings(params.callId);
        if (recordings.length === 0) {
          return NextResponse.json(
            { error: 'No active recording found' },
            { status: 404 }
          );
        }

        const latestRecording = recordings[recordings.length - 1];
        const recording = await callRecording.stopRecording(
          latestRecording.id,
          fileUrl,
          fileSize
        );

        return NextResponse.json(
          { recording, message: 'Recording stopped' },
          { status: 200 }
        );
      }

      case 'pause': {
        const recordings = callRecording.getCallRecordings(params.callId);
        if (recordings.length === 0) {
          return NextResponse.json(
            { error: 'No active recording found' },
            { status: 404 }
          );
        }

        const latestRecording = recordings[recordings.length - 1];
        const success = await callRecording.pauseRecording(latestRecording.id);

        if (!success) {
          return NextResponse.json(
            { error: 'Failed to pause recording' },
            { status: 400 }
          );
        }

        const recording = callRecording.getRecording(latestRecording.id);

        return NextResponse.json(
          { recording, message: 'Recording paused' },
          { status: 200 }
        );
      }

      case 'resume': {
        const recordings = callRecording.getCallRecordings(params.callId);
        if (recordings.length === 0) {
          return NextResponse.json(
            { error: 'No active recording found' },
            { status: 404 }
          );
        }

        const latestRecording = recordings[recordings.length - 1];
        const success = await callRecording.resumeRecording(latestRecording.id);

        if (!success) {
          return NextResponse.json(
            { error: 'Failed to resume recording' },
            { status: 400 }
          );
        }

        const recording = callRecording.getRecording(latestRecording.id);

        return NextResponse.json(
          { recording, message: 'Recording resumed' },
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
    console.error('Recording error:', error);
    return NextResponse.json(
      { error: 'Recording operation failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calls/[callId]/recording
 * Get recording details and progress
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

    const recordings = callRecording.getCallRecordings(params.callId);

    if (recordings.length === 0) {
      return NextResponse.json(
        { recordings: [], message: 'No recordings found' },
        { status: 200 }
      );
    }

    const recordingDetails = recordings.map((recording) => {
      const progress = callRecording.getRecordingProgress(recording.id);
      const bitrate = callRecording.calculateBitrate(recording.id);

      return {
        recording,
        progress,
        bitrate,
      };
    });

    return NextResponse.json(
      { recordings: recordingDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error('Recording fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to get recording details' },
      { status: 500 }
    );
  }
}
