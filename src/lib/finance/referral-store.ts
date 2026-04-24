/**
 * NOT LEGAL ADVICE.
 *
 * In-memory store for Equipped finance referrals (DR-691, DR-692).
 *
 * TODO: migrate to Prisma (new `FinanceReferral` model) once the
 * Equipped contract lands and we flip NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED.
 * Until then, this store exists purely so the webhook writer and the
 * admin reader share a type-safe interface; process-restart loses state.
 *
 * Shared between:
 *   - app/api/finance/status/route.ts  (writer)
 *   - app/admin/finance-referrals/page.tsx  (reader)
 *
 * No plaintext PII is stored. The referralId is opaque (Equipped's own
 * identifier); the entityIdentifierHash is SHA-256 already when it
 * arrives via the compliance_events ledger.
 */

export type ReferralStage =
  | "received"
  | "qualified"
  | "approved"
  | "funded"
  | "declined"
  | "withdrawn"
  | "unknown";

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

const referrals = new Map<string, FinanceReferralRecord>();
const seenEvents = new Set<string>();

/** Idempotency key: hash-free combo of referralId + timestamp. */
export function eventKey(referralId: string, timestamp: string): string {
  return `${referralId}::${timestamp}`;
}

export function hasSeen(key: string): boolean {
  return seenEvents.has(key);
}

export function markSeen(key: string): void {
  seenEvents.add(key);
}

export function upsertReferral(
  record: Omit<FinanceReferralRecord, "createdAt" | "updatedAt"> & {
    createdAt?: string;
    updatedAt?: string;
  },
): FinanceReferralRecord {
  const now = new Date().toISOString();
  const existing = referrals.get(record.referralId);
  const next: FinanceReferralRecord = {
    ...existing,
    ...record,
    createdAt: existing?.createdAt ?? record.createdAt ?? now,
    updatedAt: record.updatedAt ?? now,
    smsSent: record.smsSent ?? existing?.smsSent ?? false,
  };
  referrals.set(record.referralId, next);
  return next;
}

export function listReferrals(filter: ListFilter = {}): FinanceReferralRecord[] {
  const rows = Array.from(referrals.values());
  return rows
    .filter((r) => !filter.stage || r.stage === filter.stage)
    .filter((r) => !filter.since || r.createdAt >= filter.since)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

/** Test-only reset. */
export function __resetStore(): void {
  referrals.clear();
  seenEvents.clear();
}
