import { NextRequest, NextResponse } from 'next/server';
import { getWorkerService } from '@/lib/services/autonomousWorker.service';

export async function POST(request: NextRequest) {
    try {
          const { text, userId } = await request.json();

      if (!text || !userId) {
              return NextResponse.json(
                { error: 'Missing required fields: text, userId' },
                { status: 400 }
                      );
      }

      const workerService = getWorkerService();
          const jobId = await workerService.enqueueTask(
                  userId,
                  'extraction',
            {
                      taskType: 'extraction',
                      input: text,
            },
                  8
                );

      return NextResponse.json({
              success: true,
              jobId,
              status: 'queued',
      });
    } catch (error) {
          return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to process' },
            { status: 500 }
                );
    }
}
