/**
 * CRON: Reddit Orchestrator — Daily content generation
 *
 * Scheduled: 06:00 AEST daily (0 6 * * * in vercel.json)
 * Generates and posts one GEO-optimised Reddit post per day.
 */

import { NextRequest, NextResponse } from 'next/server';
import { runDailyOrchestrator } from '@/lib/reddit/orchestrator';
import { requestLogger, captureException } from '@/lib/observability';

export const maxDuration = 120;

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/cron/reddit-orchestrator' });
  try {
    // Verify CRON secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    // Check kill switch
    if (process.env.REDDIT_ORCHESTRATOR_ENABLED === 'false') {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: 'Reddit orchestrator is disabled via REDDIT_ORCHESTRATOR_ENABLED=false',
      });
    }

    const result = await runDailyOrchestrator({
      triggerType: 'CRON',
      command: 'DAILY-AUTO',
    });

    return NextResponse.json({
      success: result.status === 'COMPLETED',
      run: result,
    });
  } catch (error: unknown) {
    captureException(error, {
      tags: { route: '/api/cron/reddit-orchestrator' },
      extra: { requestId: log.requestId },
    });
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
