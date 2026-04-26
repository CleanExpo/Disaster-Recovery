/**
 * Manual Trigger API — Admin-initiated orchestrator runs
 *
 * POST /api/reddit/orchestrator
 * Body: { command?: string, dryRun?: boolean, subreddit?: string, category?: string }
 *
 * Supports v2.0 commands: DAILY-AUTO, AUTO-7D, CATEGORY:X, SUBREDDIT:X,
 * COMMENT-FIRST, LINKLESS, REVIEW-LAST-7
 */

import { NextRequest, NextResponse } from 'next/server';
import { runDailyOrchestrator } from '@/lib/reddit/orchestrator';
import type { PostCategory } from '@/lib/reddit/reddit-types';
import { requestLogger, captureException } from '@/lib/observability';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/reddit/orchestrator' });
  try {
    const body = await request.json();

    const command = (body.command as string) || 'DAILY-AUTO';
    const dryRun = Boolean(body.dryRun);
    const subreddit = body.subreddit as string | undefined;

    // Parse category from command if present (e.g. "CATEGORY:water-damage")
    let category: PostCategory | undefined;
    if (command.startsWith('CATEGORY:')) {
      category = command.split(':')[1] as PostCategory;
    } else if (body.category) {
      category = body.category as PostCategory;
    }

    const result = await runDailyOrchestrator({
      triggerType: 'API',
      command,
      dryRun,
      subreddit,
      category,
    });

    return NextResponse.json({
      success: result.status === 'COMPLETED',
      dryRun,
      run: result,
    });
  } catch (error: unknown) {
    captureException(error, {
      tags: { route: '/api/reddit/orchestrator' },
      extra: { requestId: log.requestId },
    });
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
