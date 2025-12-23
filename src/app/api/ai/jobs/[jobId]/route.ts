import { NextRequest, NextResponse } from 'next/server';
import { queueManager } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * GET /api/ai/jobs/[jobId]
 * Get job status and result
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;

    const queue = await queueManager.getQueue('ai-processing');
    const job = await queue.getJob(jobId);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    const state = await job.getState();
    const progress = job.progress();
    const result = job.returnvalue;

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        state,
        progress,
        data: job.data,
        result,
        createdAt: job.timestamp,
        processedOn: job.processedOn,
        finishedOn: job.finishedOn,
        failedReason: job.failedReason,
      },
    });
  } catch (error) {
    logger.error('Error fetching job status:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch job status',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ai/jobs/[jobId]
 * Cancel or remove a job
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;

    const queue = await queueManager.getQueue('ai-processing');
    const job = await queue.getJob(jobId);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    await job.remove();
    logger.info(`Job ${jobId} removed`);

    return NextResponse.json({
      success: true,
      message: 'Job removed successfully',
    });
  } catch (error) {
    logger.error('Error removing job:', error);
    return NextResponse.json(
      {
        error: 'Failed to remove job',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
