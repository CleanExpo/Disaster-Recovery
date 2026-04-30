/**
 * GET /api/cron/kpi-rollup
 *
 * Daily cron — rolls up `JobOutcome` rows into `ContractorKPI` records
 * for the MONTHLY, QUARTERLY, and ANNUAL period containing the run date.
 *
 * Idempotent: each rollup upserts on (contractorId, periodType, periodStart)
 * so a re-run within the same period overwrites the row, never duplicates.
 *
 * Secured with CRON_SECRET header (same convention as
 * /api/cron/expire-job-offers).
 *
 * Schedule (vercel.json): `0 18 * * *` — 18:00 UTC daily (~04:00 AEST).
 * Runs after the daily bot orchestrator at 20:00 UTC; no overlap.
 *
 * Why no live KPIs without this:
 *   - JobOutcome rows are the canonical KPI ledger (already wired,
 *     write sites at app/api/contractor/jobs/*).
 *   - ContractorKPI rows are what /api/contractor/dashboard reads for
 *     the contractor-facing performance panel.
 *   - Without this cron the dashboard's `findFirst` returns null and
 *     the UI shows the "no KPI data yet" placeholder.
 *
 * See `docs/audits/dr-804-kpi-payment-loss-surface-2026-05-01.md` §2.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';
import { runRollup, type PeriodType } from '@/lib/kpi/rollup';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PERIOD_TYPES: PeriodType[] = ['MONTHLY', 'QUARTERLY', 'ANNUAL'];

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/cron/kpi-rollup' });

  const secret = request.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const results: Array<Record<string, unknown>> = [];

  try {
    for (const periodType of PERIOD_TYPES) {
      const result = await runRollup(prisma, now, periodType);
      results.push({ ...result });
      log.info('kpi rollup complete', { source: 'kpi-rollup', ...result });
    }

    // Use the generic api_route_invocation marker — there's no domain
    // event type for cron runs and we don't need one (the route field
    // is the discriminator).
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/cron/kpi-rollup',
        request_id: log.requestId,
        ts: now.toISOString(),
        results,
      },
    });

    return NextResponse.json({
      success: true,
      runAt: now.toISOString(),
      rollups: results,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log.error('kpi rollup failed', { error: message });
    captureException(error, {
      tags: { route: '/api/cron/kpi-rollup' },
      extra: { requestId: log.requestId, results },
    });
    return NextResponse.json(
      {
        success: false,
        error: 'KPI rollup failed',
        partialResults: results,
      },
      { status: 500 },
    );
  }
}
