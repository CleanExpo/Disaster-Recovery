import { NextRequest, NextResponse } from 'next/server';
import { getWorkerService } from '@/lib/services/autonomousWorker.service';
import { prisma } from '@/lib/prisma';
// import pino from 'pino';

// const logger = pino();

interface ProcessRequest {
    taskType: 'summarization' | 'qa' | 'generation' | 'extraction';
    input: string;
    context?: string;
    userId: string;
    disasterId?: string;
}

export async function POST(request: NextRequest) {
    try {
          const body: ProcessRequest = await request.json();
          const { taskType, input, context, userId, disasterId } = body;

      if (!input || !taskType || !userId) {
              return NextResponse.json(
                { error: 'Missing required fields: input, taskType, userId' },
                { status: 400 }
                      );
      }

      logger.info(`Processing T5Gemma task: ${taskType} for user: ${userId}`);

      const workerService = getWorkerService();
          const jobId = await workerService.enqueueTask(
                  // userId,
                  taskType,
            {
                      taskType,
                      input,
                      context,
            },
                  8
                );

      return NextResponse.json({
              success: true,
              jobId,
              status: 'queued',
              message: `Task queued successfully`,
      });
    } catch (error) {
          logger.error('API error:', error);
          return NextResponse.json(
            {
                      error: error instanceof Error ? error.message : 'Processing failed',
            },
            { status: 500 }
                );
    }
}

export async function GET(request: NextRequest) {
    const jobId = request.nextUrl.searchParams.get('jobId');

  if (!jobId) {
        return NextResponse.json(
          { error: 'Missing jobId parameter' },
          { status: 400 }
              );
  }

  const workerService = getWorkerService();
    const status = await workerService.getJobStatus(jobId);

  return NextResponse.json(status);
}
