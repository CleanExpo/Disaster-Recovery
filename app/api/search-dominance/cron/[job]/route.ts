/**
 * Search Dominance Cron Job Handler
 *
 * Handles all Search Dominance background jobs triggered by Vercel Cron
 *
 * Jobs:
 * - rank-tracking: Every 6 hours
 * - traffic-sync: Every 1 hour
 * - competitor-snapshot: Daily 3 AM
 * - dominance-aggregation: Daily 1 AM
 * - blue-ocean-scan: Weekly Monday 1 AM
 * - algorithm-monitor: Every 6 hours
 */

import { NextResponse } from 'next/server';

// Import job processors
import { processRankTracking } from '@/lib/search-dominance/jobs/rank-tracking-job';
import { processTrafficSync } from '@/lib/search-dominance/jobs/traffic-sync-job';
import { processCompetitorSnapshot } from '@/lib/search-dominance/jobs/competitor-snapshot-job';
import { processDominanceAggregation } from '@/lib/search-dominance/jobs/dominance-aggregation-job';

export const maxDuration = 300; // 5 minutes max execution time

/**
 * Verify cron request is from Vercel
 */
function verifyCronRequest(request: Request): boolean {
  const authHeader = request.headers.get('authorization');

  // In production, verify the authorization header
  if (process.env.NODE_ENV === 'production') {
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error('[Cron] CRON_SECRET not configured');
      return false;
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('[Cron] Invalid authorization header');
      return false;
    }
  }

  return true;
}

export async function GET(
  request: Request,
  { params }: { params: { job: string } }
) {
  try {
    const { job } = params;

    console.log(`[Cron] Starting job: ${job}`);

    // Verify request
    if (!verifyCronRequest(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let result;

    // Execute the appropriate job
    switch (job) {
      case 'rank-tracking':
        result = await processRankTracking();
        break;

      case 'traffic-sync':
        result = await processTrafficSync();
        break;

      case 'competitor-snapshot':
        result = await processCompetitorSnapshot();
        break;

      case 'dominance-aggregation':
        result = await processDominanceAggregation();
        break;

      case 'blue-ocean-scan':
        // TODO: Implement when Blue Ocean detector is complete
        result = {
          success: false,
          recordsProcessed: 0,
          recordsCreated: 0,
          errors: ['Blue Ocean scanner not yet implemented'],
          warnings: [],
          duration: 0,
          completedAt: new Date(),
        };
        break;

      case 'algorithm-monitor':
        // TODO: Implement when Algorithm monitor is complete
        result = {
          success: false,
          recordsProcessed: 0,
          recordsCreated: 0,
          errors: ['Algorithm monitor not yet implemented'],
          warnings: [],
          duration: 0,
          completedAt: new Date(),
        };
        break;

      default:
        return NextResponse.json(
          { error: `Unknown job: ${job}` },
          { status: 400 }
        );
    }

    console.log(`[Cron] Job ${job} completed:`, result);

    return NextResponse.json({
      success: result.success,
      job,
      recordsProcessed: result.recordsProcessed,
      recordsCreated: result.recordsCreated,
      errors: result.errors,
      warnings: result.warnings,
      duration: result.duration,
      completedAt: result.completedAt,
    });
  } catch (error) {
    console.error('[Cron] Job failed:', error);
    return NextResponse.json(
      {
        error: 'Job execution failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
