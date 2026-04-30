/**
 * Bond-forfeit orchestration — turns KPI breaches into formal forfeit
 * triggers at the schema level.
 *
 * INPUT:  ContractorKPI rows for a recently-completed period (written
 *         by /api/cron/kpi-rollup).
 * OUTPUT: For each contractor whose KPI row breaches a threshold:
 *           1. ContractorSubscription.bondStatus -> 'FORFEIT_PENDING'
 *           2. New ContractorPayment row (type=BOND, status=PENDING)
 *              for the bond amount, due 14 days out.
 *           3. ContractorNotification (type=COMPLIANCE, URGENT).
 *
 * What this does NOT do (intentionally, per .claude/rules/business-
 * rules.md §10 — reg-change surface):
 *   - Capture the bond at Stripe. That's Path-A counsel-gated.
 *   - Mark bond status as FORFEITED (terminal). Operator review
 *     gates that transition; FORFEIT_PENDING is the invoke-Ops step.
 *   - Suspend dispatch. Separate state machine (Contractor.status).
 *
 * Idempotency: each pass is keyed on (contractorId, periodType,
 * periodStart). If a ContractorPayment row of type=BOND already
 * exists for the same contractor + period bond-event, skip — never
 * create a duplicate forfeit.
 */

import type { PrismaClient } from '@prisma/client';

/**
 * Default thresholds. Override via env when product wants to tune
 * without a redeploy. Documented in
 * docs/audits/dr-804-kpi-payment-loss-surface-2026-05-01.md §3.
 */
export const FORFEIT_THRESHOLDS = {
  /** Complaint count (proxy: CANCELLED outcomes) above this triggers. */
  maxComplaints: Number(process.env.BOND_FORFEIT_MAX_COMPLAINTS ?? '3'),
  /** Violation count (proxy: DECLINED outcomes) above this triggers. */
  maxViolations: Number(process.env.BOND_FORFEIT_MAX_VIOLATIONS ?? '5'),
  /** Days between FORFEIT_PENDING and the ContractorPayment dueDate. */
  paymentDueDays: Number(process.env.BOND_FORFEIT_DUE_DAYS ?? '14'),
} as const;

export interface BreachReason {
  reason: 'TOO_MANY_COMPLAINTS' | 'TOO_MANY_VIOLATIONS';
  metric: number;
  threshold: number;
}

export interface KpiBreach {
  contractorId: string;
  periodType: string;
  periodStart: Date;
  periodEnd: Date;
  reasons: BreachReason[];
}

/**
 * Pure helper: given a ContractorKPI row, return the breach reasons
 * (empty if the row is within thresholds).
 */
export function evaluateBreach(kpi: {
  complaints: number | null;
  violations: number | null;
}): BreachReason[] {
  const reasons: BreachReason[] = [];
  const complaints = kpi.complaints ?? 0;
  const violations = kpi.violations ?? 0;

  if (complaints > FORFEIT_THRESHOLDS.maxComplaints) {
    reasons.push({
      reason: 'TOO_MANY_COMPLAINTS',
      metric: complaints,
      threshold: FORFEIT_THRESHOLDS.maxComplaints,
    });
  }
  if (violations > FORFEIT_THRESHOLDS.maxViolations) {
    reasons.push({
      reason: 'TOO_MANY_VIOLATIONS',
      metric: violations,
      threshold: FORFEIT_THRESHOLDS.maxViolations,
    });
  }
  return reasons;
}

/**
 * Find KPI rows for the given period that breach thresholds.
 */
export async function findBreaches(
  prisma: PrismaClient,
  periodType: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL',
  periodStart: Date,
): Promise<KpiBreach[]> {
  const rows = await prisma.contractorKPI.findMany({
    where: { periodType, periodStart },
    select: {
      contractorId: true,
      periodType: true,
      periodStart: true,
      periodEnd: true,
      complaints: true,
      violations: true,
    },
  });

  return rows
    .map((row) => {
      const reasons = evaluateBreach(row);
      if (reasons.length === 0) return null;
      return {
        contractorId: row.contractorId,
        periodType: row.periodType,
        periodStart: row.periodStart,
        periodEnd: row.periodEnd,
        reasons,
      } satisfies KpiBreach;
    })
    .filter((b): b is KpiBreach => b !== null);
}

export interface ForfeitResult {
  contractorId: string;
  status:
    | 'forfeit_pending_created'
    | 'already_forfeit_pending'
    | 'no_subscription'
    | 'subscription_inactive';
  paymentId?: string;
  notificationId?: string;
}

/**
 * Apply the forfeit-pending state to a single breaching contractor.
 *
 * Idempotent: if the contractor's subscription is ALREADY
 * FORFEIT_PENDING for this period (we detect via existing pending
 * BOND ContractorPayment), this is a no-op.
 */
export async function applyForfeitPending(
  prisma: PrismaClient,
  breach: KpiBreach,
): Promise<ForfeitResult> {
  const subscription = await prisma.contractorSubscription.findUnique({
    where: { contractorId: breach.contractorId },
  });

  if (!subscription) {
    return { contractorId: breach.contractorId, status: 'no_subscription' };
  }

  if (subscription.status !== 'ACTIVE') {
    return { contractorId: breach.contractorId, status: 'subscription_inactive' };
  }

  // Idempotency check: an existing pending BOND ContractorPayment for
  // this subscription is the marker that this period's forfeit was
  // already raised. Skip on hit.
  const existingPending = await prisma.contractorPayment.findFirst({
    where: {
      subscriptionId: subscription.id,
      type: 'BOND',
      status: 'PENDING',
    },
  });

  if (existingPending) {
    return {
      contractorId: breach.contractorId,
      status: 'already_forfeit_pending',
      paymentId: existingPending.id,
    };
  }

  // 1. Mark subscription bondStatus.
  await prisma.contractorSubscription.update({
    where: { id: subscription.id },
    data: { bondStatus: 'FORFEIT_PENDING' },
  });

  // 2. Create the BOND ContractorPayment row.
  const dueDate = new Date(Date.now() + FORFEIT_THRESHOLDS.paymentDueDays * 24 * 60 * 60 * 1000);
  const payment = await prisma.contractorPayment.create({
    data: {
      subscriptionId: subscription.id,
      amount: subscription.bondAmount,
      type: 'BOND',
      status: 'PENDING',
      paymentMethod: subscription.paymentMethod ?? 'PENDING',
      dueDate,
    },
  });

  // 3. Notify the contractor.
  const reasonSummary = breach.reasons
    .map((r) =>
      r.reason === 'TOO_MANY_COMPLAINTS'
        ? `${r.metric} cancellations (limit ${r.threshold})`
        : `${r.metric} declined offers (limit ${r.threshold})`,
    )
    .join('; ');

  const periodLabel = `${breach.periodType.toLowerCase()} period from ${breach.periodStart.toISOString().slice(0, 10)}`;

  const notification = await prisma.contractorNotification.create({
    data: {
      contractorId: breach.contractorId,
      type: 'COMPLIANCE',
      priority: 'URGENT',
      subject: 'Performance bond marked for forfeit — Ops review required',
      message:
        `Your KPIs for the ${periodLabel} are outside the network's compliance ` +
        `thresholds (${reasonSummary}). Your performance bond of $${subscription.bondAmount.toLocaleString()} ` +
        `has been marked FORFEIT_PENDING and is due ${dueDate.toISOString().slice(0, 10)}. ` +
        `Ops will contact you within two business days to discuss next steps.`,
      actionRequired: true,
      actionUrl: '/contractor/dashboard?focus=compliance',
      actionDeadline: dueDate,
    },
  });

  return {
    contractorId: breach.contractorId,
    status: 'forfeit_pending_created',
    paymentId: payment.id,
    notificationId: notification.id,
  };
}

export interface ForfeitRunSummary {
  periodType: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  periodStart: string;
  breachesFound: number;
  forfeitPendingCreated: number;
  alreadyForfeitPending: number;
  skippedNoSubscription: number;
  skippedInactiveSubscription: number;
}

/**
 * Run a single forfeit pass for a (periodType, periodStart) window.
 */
export async function runForfeitPass(
  prisma: PrismaClient,
  periodType: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL',
  periodStart: Date,
): Promise<ForfeitRunSummary> {
  const breaches = await findBreaches(prisma, periodType, periodStart);

  const summary: ForfeitRunSummary = {
    periodType,
    periodStart: periodStart.toISOString(),
    breachesFound: breaches.length,
    forfeitPendingCreated: 0,
    alreadyForfeitPending: 0,
    skippedNoSubscription: 0,
    skippedInactiveSubscription: 0,
  };

  for (const breach of breaches) {
    const result = await applyForfeitPending(prisma, breach);
    if (result.status === 'forfeit_pending_created') summary.forfeitPendingCreated++;
    if (result.status === 'already_forfeit_pending') summary.alreadyForfeitPending++;
    if (result.status === 'no_subscription') summary.skippedNoSubscription++;
    if (result.status === 'subscription_inactive') summary.skippedInactiveSubscription++;
  }

  return summary;
}
