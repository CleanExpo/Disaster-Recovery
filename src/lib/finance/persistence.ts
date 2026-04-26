/**
 * NOT LEGAL ADVICE.
 *
 * Persistence helpers for FinanceReferral + FinanceReferralEvent (audit B12).
 * Mirrors the audit B13 voice scaffold at `src/lib/voice/persistence.ts`.
 *
 * Flag-gated via FINANCE_REFERRAL_WRITER_ENABLED — when off, every helper
 * returns null silently. When on, helpers upsert rows keyed on the
 * Equipped-side opaque referral identifier (`equippedReferralId`) for
 * idempotent retries.
 *
 * IMPORTANT: This is the SCAFFOLD surface only. The live submission path
 * at `app/api/finance/referral/route.ts` and the webhook store at
 * `src/lib/finance/referral-store.ts` remain in place and are NOT wired
 * to this module. Wiring will land in a follow-up PR once the partner
 * DPA finalises (see `.context/domain-models.md` known drift entry for
 * FinanceReferral).
 *
 * Data class: CONFIDENTIAL (per `.claude/rules/privacy.md` §1).
 * - Identifier fields are hashes only; raw PII never reaches this layer
 *   (the upstream form + webhook already strip plaintext per the consent
 *   + Reg 25 boundary at `.claude/rules/compliance.md` §8).
 * - The full payload sent to Equipped is NOT stored here; only its
 *   `payloadHash` (SHA-256 hex). That hash is enough to prove-or-deny
 *   what left our side without creating a new PII honeypot.
 */

import { prisma } from '@/lib/prisma';
import type { FinanceReferral, FinanceReferralEvent, Prisma } from '@prisma/client';

function enabled(): boolean {
  return process.env.FINANCE_REFERRAL_WRITER_ENABLED === 'true';
}

export type UpsertFinanceReferralInput = Omit<
  Prisma.FinanceReferralUncheckedCreateInput,
  'id' | 'createdAt' | 'updatedAt' | 'events'
> & { equippedReferralId: string };

export async function upsertFinanceReferral(
  input: UpsertFinanceReferralInput,
): Promise<FinanceReferral | null> {
  if (!enabled()) return null;
  const { equippedReferralId, ...rest } = input;
  return prisma.financeReferral.upsert({
    where: { equippedReferralId },
    create: { equippedReferralId, ...rest },
    update: rest,
  });
}

export type AppendFinanceReferralEventInput = Omit<
  Prisma.FinanceReferralEventUncheckedCreateInput,
  'id' | 'receivedAt'
>;

export async function appendFinanceReferralEvent(
  input: AppendFinanceReferralEventInput,
): Promise<FinanceReferralEvent | null> {
  if (!enabled()) return null;
  return prisma.financeReferralEvent.create({ data: input });
}

export async function findReferralByEquippedId(
  equippedReferralId: string,
): Promise<FinanceReferral | null> {
  if (!enabled()) return null;
  return prisma.financeReferral.findUnique({ where: { equippedReferralId } });
}
