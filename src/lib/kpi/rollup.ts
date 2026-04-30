/**
 * KPI rollup engine — turns `JobOutcome` rows into `ContractorKPI` records.
 *
 * Input:  the canonical KPI ledger (`job_outcome_logs` via @@map). Every
 *         job completion / decline / cancel writes a row at completion time.
 * Output: per-contractor / per-period rollup rows in `ContractorKPI`.
 *         Read by /api/contractor/dashboard and /api/contractor/analytics.
 *
 * Period types supported:
 *   MONTHLY    — calendar month containing the run date
 *   QUARTERLY  — calendar quarter containing the run date
 *   ANNUAL     — calendar year containing the run date
 *
 * Idempotency: the unique key is (contractorId, periodType, periodStart).
 * Re-running the same period upserts (replaces) the row, never duplicates.
 *
 * What the rollup computes (per contractor per period):
 *   - totalJobs         all outcomes in window
 *   - completedJobs     outcome=COMPLETED only
 *   - averageResponseTime  hours (responseMinutes / 60), completed only
 *   - averageCompletionTime  days (durationMinutes / 1440), completed only
 *   - complaints / violations  COUNT JobOutcome.outcome === 'CANCELLED'
 *                              + 'DECLINED' respectively (interim proxy
 *                              until a dedicated complaint surface lands)
 *
 * What the rollup does NOT compute (yet):
 *   - customerSatisfaction  — needs a rating ledger surface
 *   - qualityScore          — needs an admin-scored review surface
 *   - cleanClaimsScore      — needs Clean Claims integration sync
 *   - carsiCompliance       — needs CARSI compliance ledger
 *   - totalRevenue / averageJobValue  — needs ContractorPayment + JobOutcome.actualCost
 *
 * Those columns stay null until their source ledgers exist. Today's
 * dashboards already handle null gracefully ("no data yet" placeholders).
 */

import { PrismaClient } from '@prisma/client';

export type PeriodType = 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';

export interface PeriodWindow {
  periodType: PeriodType;
  periodStart: Date;
  periodEnd: Date;
}

/**
 * Compute the calendar window containing the given date for a period type.
 * Boundaries are inclusive-start, exclusive-end (standard SQL between).
 */
export function periodWindow(now: Date, periodType: PeriodType): PeriodWindow {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth(); // 0-indexed

  if (periodType === 'MONTHLY') {
    const periodStart = new Date(Date.UTC(year, month, 1));
    const periodEnd = new Date(Date.UTC(year, month + 1, 1));
    return { periodType, periodStart, periodEnd };
  }

  if (periodType === 'QUARTERLY') {
    const quarterMonth = Math.floor(month / 3) * 3;
    const periodStart = new Date(Date.UTC(year, quarterMonth, 1));
    const periodEnd = new Date(Date.UTC(year, quarterMonth + 3, 1));
    return { periodType, periodStart, periodEnd };
  }

  // ANNUAL
  const periodStart = new Date(Date.UTC(year, 0, 1));
  const periodEnd = new Date(Date.UTC(year + 1, 0, 1));
  return { periodType, periodStart, periodEnd };
}

export interface ContractorKpiAggregate {
  contractorId: string;
  totalJobs: number;
  completedJobs: number;
  averageResponseTime: number | null; // hours
  averageCompletionTime: number | null; // days
  complaints: number;
  violations: number;
}

/**
 * Pull the per-contractor aggregates for a period window from JobOutcome.
 * Returns one row per contractor that has outcomes in the window.
 */
export async function aggregateContractors(
  prisma: PrismaClient,
  window: PeriodWindow,
): Promise<ContractorKpiAggregate[]> {
  // Outcome counts per contractor.
  const outcomeRows = await prisma.jobOutcome.groupBy({
    by: ['contractorId', 'outcome'],
    where: {
      contractorId: { not: null },
      loggedAt: { gte: window.periodStart, lt: window.periodEnd },
    },
    _count: { outcome: true },
  });

  // Timing aggregates (completed only) per contractor.
  const timingRows = await prisma.jobOutcome.groupBy({
    by: ['contractorId'],
    where: {
      contractorId: { not: null },
      outcome: 'COMPLETED',
      loggedAt: { gte: window.periodStart, lt: window.periodEnd },
    },
    _avg: {
      responseMinutes: true,
      durationMinutes: true,
    },
  });

  const byContractor = new Map<string, ContractorKpiAggregate>();

  for (const row of outcomeRows) {
    if (!row.contractorId) continue;
    const agg = byContractor.get(row.contractorId) ?? {
      contractorId: row.contractorId,
      totalJobs: 0,
      completedJobs: 0,
      averageResponseTime: null,
      averageCompletionTime: null,
      complaints: 0,
      violations: 0,
    };
    const count = row._count.outcome;
    agg.totalJobs += count;
    if (row.outcome === 'COMPLETED') agg.completedJobs += count;
    if (row.outcome === 'CANCELLED') agg.complaints += count;
    if (row.outcome === 'DECLINED') agg.violations += count;
    byContractor.set(row.contractorId, agg);
  }

  for (const row of timingRows) {
    if (!row.contractorId) continue;
    const agg = byContractor.get(row.contractorId);
    if (!agg) continue; // shouldn't happen — outcome rows come first
    if (row._avg.responseMinutes != null) {
      agg.averageResponseTime = row._avg.responseMinutes / 60; // → hours
    }
    if (row._avg.durationMinutes != null) {
      agg.averageCompletionTime = row._avg.durationMinutes / 1440; // → days
    }
  }

  return Array.from(byContractor.values());
}

/**
 * Upsert one ContractorKPI row.
 * Unique key: (contractorId, periodType, periodStart).
 */
export async function upsertKpiRow(
  prisma: PrismaClient,
  agg: ContractorKpiAggregate,
  window: PeriodWindow,
): Promise<void> {
  await prisma.contractorKPI.upsert({
    where: {
      contractorId_periodType_periodStart: {
        contractorId: agg.contractorId,
        periodType: window.periodType,
        periodStart: window.periodStart,
      },
    },
    create: {
      contractorId: agg.contractorId,
      periodType: window.periodType,
      periodStart: window.periodStart,
      periodEnd: window.periodEnd,
      totalJobs: agg.totalJobs,
      completedJobs: agg.completedJobs,
      averageResponseTime: agg.averageResponseTime,
      averageCompletionTime: agg.averageCompletionTime,
      complaints: agg.complaints,
      violations: agg.violations,
    },
    update: {
      periodEnd: window.periodEnd,
      totalJobs: agg.totalJobs,
      completedJobs: agg.completedJobs,
      averageResponseTime: agg.averageResponseTime,
      averageCompletionTime: agg.averageCompletionTime,
      complaints: agg.complaints,
      violations: agg.violations,
      calculatedAt: new Date(),
    },
  });
}

export interface RollupResult {
  periodType: PeriodType;
  periodStart: string;
  periodEnd: string;
  contractorsAggregated: number;
  rowsUpserted: number;
}

/**
 * Run a single rollup pass for a (now, periodType) tuple.
 * Returns a result summary suitable for cron logging.
 */
export async function runRollup(
  prisma: PrismaClient,
  now: Date,
  periodType: PeriodType,
): Promise<RollupResult> {
  const window = periodWindow(now, periodType);
  const aggregates = await aggregateContractors(prisma, window);

  for (const agg of aggregates) {
    await upsertKpiRow(prisma, agg, window);
  }

  return {
    periodType,
    periodStart: window.periodStart.toISOString(),
    periodEnd: window.periodEnd.toISOString(),
    contractorsAggregated: aggregates.length,
    rowsUpserted: aggregates.length,
  };
}
