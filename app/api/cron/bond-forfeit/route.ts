/**
 * GET /api/cron/bond-forfeit
 *
 * Runs after the KPI rollup cron. Scans freshly-rolled-up
 * ContractorKPI rows for the current MONTHLY period and, for each row
 * that breaches forfeit thresholds, applies the FORFEIT_PENDING state:
 *
 *   1. ContractorSubscription.bondStatus -> 'FORFEIT_PENDING'
 *   2. New ContractorPayment row (type=BOND, status=PENDING),
 *      dueDate = now + BOND_FORFEIT_DUE_DAYS (default 14)
 *   3. ContractorNotification (type=COMPLIANCE, URGENT)
 *
 * Does NOT capture the bond at Stripe — that's a separate Path-A
 * counsel-gated step, handled by Ops review of the FORFEIT_PENDING
 * queue (see .claude/rules/business-rules.md §10).
 *
 * Idempotent: if the contractor already has a pending BOND
 * ContractorPayment, this is a no-op for that contractor.
 *
 * Schedule (vercel.json): `0 19 * * *` — 19:00 UTC daily.
 * 1 hour after /api/cron/kpi-rollup (`0 18 * * *`) so KPI rows exist.
 *
 * Secured with CRON_SECRET header.
 *
 * See `docs/audits/dr-804-kpi-payment-loss-surface-2026-05-01.md` §3.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';
import { runForfeitPass } from '@/lib/bond/forfeit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Calendar-month start in UTC for the run-time month. */
function currentMonthStart(now: Date): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/cron/bond-forfeit' });

  const secret = request.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const periodStart = currentMonthStart(now);

  try {
    const summary = await runForfeitPass(prisma, 'MONTHLY', periodStart);
    log.info('bond forfeit pass complete', { source: 'bond-forfeit', ...summary });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/cron/bond-forfeit',
        request_id: log.requestId,
        ts: now.toISOString(),
        summary: { ...summary },
      },
    });

    return NextResponse.json({
      success: true,
      runAt: now.toISOString(),
      summary,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    log.error('bond forfeit pass failed', { error: message });
    captureException(error, {
      tags: { route: '/api/cron/bond-forfeit' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      { success: false, error: 'Bond forfeit pass failed' },
      { status: 500 },
    );
  }
}
