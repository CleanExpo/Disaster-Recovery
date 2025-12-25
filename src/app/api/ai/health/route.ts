import { NextRequest, NextResponse } from 'next/server';
import { aiHealthCheck, getAIStats } from '@/lib/ai/ai.service';
import { redisHealthCheck } from '@/lib/config/redis.config';
import { queueManager } from '@/lib/config/queue.config';
import { workerHealthCheck, getWorkerStats } from '@/lib/ai/autonomous-worker.service';
import { logger } from '@/lib/logger';

/**
 * GET /api/ai/health
 * Health check for AI infrastructure
 */
export async function GET(request: NextRequest) {
  try {
    const detailed = request.nextUrl.searchParams.get('detailed') === 'true';

    // Perform health checks
    const [aiHealth, redisHealth, queueHealth, workerHealth] = await Promise.all([
      aiHealthCheck().catch(() => false),
      redisHealthCheck().catch(() => false),
      queueManager.healthCheck().catch(() => false),
      workerHealthCheck().catch(() => false),
    ]);

    const overall = aiHealth && redisHealth && queueHealth && workerHealth;

    const response: any = {
      status: overall ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      components: {
        ai: aiHealth ? 'healthy' : 'unhealthy',
        redis: redisHealth ? 'healthy' : 'unhealthy',
        queue: queueHealth ? 'healthy' : 'unhealthy',
        worker: workerHealth ? 'healthy' : 'unhealthy',
      },
    };

    // Add detailed statistics if requested
    if (detailed) {
      const [aiStats, workerStats, queueStats] = await Promise.all([
        getAIStats(),
        getWorkerStats().catch(() => null),
        queueManager.getQueueStats('ai-processing').catch(() => null),
      ]);

      response.details = {
        ai: aiStats,
        worker: workerStats,
        queue: queueStats,
      };
    }

    const statusCode = overall ? 200 : 503;
    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logger.error('Error in AI health check endpoint:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
