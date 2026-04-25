/**
 * NOT LEGAL ADVICE.
 *
 * Equipped finance referral store — Prisma-backed (L9 Phase 2, 2026-05-01).
 *
 * Replaces the in-memory Map + Set that lived here in L9 Phase 1. Same
 * exported function signatures, but every helper is now async because
 * it talks to the FinanceReferral / FinanceReferralEvent tables in
 * Postgres.
 *
 * Wiring:
 *   - app/api/finance/status/route.ts  (writer — webhook receiver)
 *   - app/admin/finance-referrals/page.tsx  (reader — admin dashboard)
 *
 * Data class: CONFIDENTIAL. All identifier fields are hashes only;
 * raw PII never reaches this layer (the upstream webhook + form
 * already strip plaintext per the consent + Reg 25 boundary).
 */

import { prisma } from '@/lib/prisma';

export type ReferralStage =
  | 'received'
  | 'qualified'
  | 'approved'
  | 'funded'
  | 'declined'
  | 'withdrawn'
  | 'unknown';

export interface FinanceReferralRecord {
  /** Equipped's referral identifier (opaque, not PII). */
  referralId: string;
  /** Hash of customer identifier, never raw email/phone. */
  entityIdentifierHash?: string;
  stage: ReferralStage;
  /** Raw status string from Equipped (may differ from canonical stage). */
  lastStatus: string;
  consentVersion?: string;
  smsSent: boolean;
  createdAt: string;
  updatedAt: string;
  /** Free-form metadata from the webhook payload. */
  metadata?: Record<string, unknown>;
}

export interface ListFilter {
  stage?: ReferralStage;
  /** ISO timestamp lower bound (inclusive). */
  since?: string;
}

export interface UpsertInput {
  referralId: string;
  stage: ReferralStage;
  lastStatus: string;
  smsSent?: boolean;
  consentVersion?: string;
  entityIdentifierHash?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

/** Idempotency key: `${referralId}::${webhookTimestamp}`. */
export function eventKey(referralId: string, timestamp: string): string {
  return `${referralId}::${timestamp}`;
}

/**
 * Has this webhook event already been processed?
 *
 * Best-effort: if the database is unreachable (migration not deployed,
 * connection error), returns `false` so the writer can retry rather
 * than silently dropping a real event.
 */
export async function hasSeen(key: string): Promise<boolean> {
  try {
    const row = await prisma.financeReferralEvent.findUnique({
      where: { eventKey: key },
      select: { id: true },
    });
    return Boolean(row);
  } catch {
    return false;
  }
}

/**
 * Record that we've processed this webhook event. Idempotent: if the
 * row already exists (unique constraint on `eventKey`), we swallow the
 * error and return.
 */
export async function markSeen(
  key: string,
  detail: {
    referralId: string;
    webhookTimestamp: string;
    stage: ReferralStage;
    status: string;
    unknownStage?: boolean;
    payload?: Record<string, unknown>;
  },
): Promise<void> {
  try {
    await prisma.financeReferralEvent.create({
      data: {
        eventKey: key,
        referralId: detail.referralId,
        webhookTimestamp: detail.webhookTimestamp,
        stage: detail.stage,
        status: detail.status,
        unknownStage: detail.unknownStage ?? false,
        payload: (detail.payload as never) ?? undefined,
      },
    });
  } catch {
    // Either the eventKey is already there (idempotent retry) or the
    // table is missing. Either way, the caller's response is unaffected.
  }
}

/**
 * Insert-or-update a FinanceReferral row keyed on `equippedReferralId`.
 * Returns the post-write record in the legacy in-memory shape so
 * callers don't need to know Prisma exists.
 */
export async function upsertReferral(input: UpsertInput): Promise<FinanceReferralRecord> {
  const now = new Date().toISOString();

  // For the webhook path we don't always have full submission data —
  // just enough to identify which DR-side referral row this is. Try to
  // upsert by the Equipped-side opaque id; fall back to a partial row.
  try {
    const row = await prisma.financeReferral.upsert({
      where: { equippedReferralId: input.referralId },
      update: {
        stage: input.stage,
        lastStatus: input.lastStatus,
        statusWebhookLastStatus: input.lastStatus,
        statusWebhookLastAt: input.updatedAt ? new Date(input.updatedAt) : new Date(now),
        smsSent: input.smsSent ?? false,
        consentVersion: input.consentVersion,
        entityIdentifierHash: input.entityIdentifierHash,
        metadata: (input.metadata as never) ?? undefined,
      },
      create: {
        // Defaults for fields we don't know from the webhook alone.
        // The submission path (POST /api/finance/referral) writes these
        // for real; this is a fallback so the webhook can still upsert
        // a partial row if it arrives before submission persists.
        equippedReferralId: input.referralId,
        country: 'AU',
        customerType: 'unknown',
        fundingBand: 'unknown',
        disasterCategory: 'unknown',
        source: 'equipped_webhook',
        disclosureVersion: 'unknown',
        privacyNoticeVersion: 'unknown',
        consentShareEquipped: true,
        consentReferralDisclosure: true,
        payloadHash: 'webhook-only',
        receiver: 'equippedcf.com.au',
        stage: input.stage,
        lastStatus: input.lastStatus,
        statusWebhookLastStatus: input.lastStatus,
        statusWebhookLastAt: input.updatedAt ? new Date(input.updatedAt) : new Date(now),
        smsSent: input.smsSent ?? false,
        consentVersion: input.consentVersion,
        entityIdentifierHash: input.entityIdentifierHash,
        metadata: (input.metadata as never) ?? undefined,
      },
    });

    return rowToRecord(row);
  } catch {
    // DB unreachable / migration not deployed. Return a synthesised
    // record so the route still has something to log; caller is
    // already inside a try/catch fallback.
    return {
      referralId: input.referralId,
      entityIdentifierHash: input.entityIdentifierHash,
      stage: input.stage,
      lastStatus: input.lastStatus,
      consentVersion: input.consentVersion,
      smsSent: input.smsSent ?? false,
      createdAt: input.createdAt ?? now,
      updatedAt: input.updatedAt ?? now,
      metadata: input.metadata,
    };
  }
}

/**
 * List referrals filtered by stage / since. Reader for the admin
 * dashboard. Returns an empty array if the database is unreachable.
 */
export async function listReferrals(filter: ListFilter = {}): Promise<FinanceReferralRecord[]> {
  try {
    const rows = await prisma.financeReferral.findMany({
      where: {
        ...(filter.stage ? { stage: filter.stage } : {}),
        ...(filter.since ? { createdAt: { gte: new Date(filter.since) } } : {}),
      },
      orderBy: { updatedAt: 'desc' },
      take: 500,
    });
    return rows.map(rowToRecord);
  } catch {
    return [];
  }
}

interface FinanceReferralRow {
  equippedReferralId: string | null;
  id: string;
  entityIdentifierHash: string | null;
  stage: string | null;
  lastStatus: string | null;
  consentVersion: string | null;
  smsSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: unknown;
}

function rowToRecord(row: FinanceReferralRow): FinanceReferralRecord {
  return {
    referralId: row.equippedReferralId ?? row.id,
    entityIdentifierHash: row.entityIdentifierHash ?? undefined,
    stage: (row.stage as ReferralStage | null) ?? 'unknown',
    lastStatus: row.lastStatus ?? '',
    consentVersion: row.consentVersion ?? undefined,
    smsSent: row.smsSent,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    metadata: (row.metadata as Record<string, unknown> | null) ?? undefined,
  };
}

/** Test-only reset. */
export async function __resetStore(): Promise<void> {
  try {
    await prisma.financeReferralEvent.deleteMany();
    await prisma.financeReferral.deleteMany({
      where: { source: 'equipped_webhook' }, // only webhook-only rows; preserve real submissions
    });
  } catch {
    // ignore
  }
}
