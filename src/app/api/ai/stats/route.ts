import { NextRequest, NextResponse } from 'next/server';
import { getAIStats, clearAICache } from '@/lib/ai/ai.service';
import { getWorkerStats } from '@/lib/ai/autonomous-worker.service';
import { getQueueStats } from '@/lib/config/queue.config';
import { logger } from '@/lib/logger';

/**
 * GET /api/ai/stats
 * Get AI system statistics
 */
export async function GET() {
  try {
    const [aiStats, workerStats, queueStats] = await Promise.all([
      getAIStats(),
      getWorkerStats(),
      getQueueStats(),
    ]);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ai: aiStats,
      worker: workerStats,
      queue: queueStats,
    });
  } catch (error) {
    logger.error('Error fetching AI stats:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch statistics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/stats
 * Perform admin actions (clear cache, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'clearCache':
        clearAICache();
        return NextResponse.json({
          success: true,
          message: 'AI cache cleared successfully',
        });

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('Error in AI stats admin action:', error);
    return NextResponse.json(
      {
        error: 'Failed to perform action',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
