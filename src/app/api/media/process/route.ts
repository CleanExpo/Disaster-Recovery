/**
 * Media Processing API
 *
 * Handle video, audio, and image processing jobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { mediaProcessor } from '@/lib/storage/media-processor';

/**
 * POST /api/media/process
 *
 * Create a processing job
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileId, type, options } = body;

    if (!fileId || !type) {
      return NextResponse.json(
        { error: 'fileId and type are required' },
        { status: 400 }
      );
    }

    let job;

    switch (type) {
      case 'video':
        job = await mediaProcessor.createTranscodeJob(fileId, options || {
          format: 'mp4',
          quality: 'high',
        });
        break;

      case 'audio':
        job = await mediaProcessor.createAudioJob(fileId, options || {
          format: 'mp3',
          quality: 'high',
        });
        break;

      case 'image':
        job = await mediaProcessor.createImageJob(fileId, options || {
          format: 'webp',
          quality: 80,
          compress: true,
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown media type: ${type}` },
          { status: 400 }
        );
    }

    return NextResponse.json(
      {
        success: true,
        job: {
          id: job.id,
          fileId: job.fileId,
          type: job.type,
          status: job.status,
          progress: job.progress,
          createdAt: job.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Media processing error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Processing failed',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/media/process
 *
 * Get processing job status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');
    const fileId = searchParams.get('fileId');

    if (jobId) {
      const job = mediaProcessor.getJob(jobId);

      if (!job) {
        return NextResponse.json(
          { error: 'Job not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        job: {
          id: job.id,
          fileId: job.fileId,
          type: job.type,
          status: job.status,
          progress: job.progress,
          error: job.error,
          outputs: job.outputs,
          createdAt: job.createdAt,
          startedAt: job.startedAt,
          completedAt: job.completedAt,
        },
      });
    } else if (fileId) {
      const jobs = mediaProcessor.getFileJobs(fileId);

      return NextResponse.json({
        success: true,
        jobs: jobs.map((job) => ({
          id: job.id,
          type: job.type,
          status: job.status,
          progress: job.progress,
          createdAt: job.createdAt,
        })),
      });
    }

    return NextResponse.json(
      { error: 'jobId or fileId parameter required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Media status error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get status',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/media/process
 *
 * Cancel a processing job
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'jobId parameter required' },
        { status: 400 }
      );
    }

    const cancelled = mediaProcessor.cancelJob(jobId);

    if (!cancelled) {
      return NextResponse.json(
        { error: 'Job not found or cannot be cancelled' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job cancelled',
    });
  } catch (error) {
    console.error('Job cancel error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to cancel job',
      },
      { status: 500 }
    );
  }
}
