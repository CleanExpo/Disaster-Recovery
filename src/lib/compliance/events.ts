/**
 * Compliance event writer. Feature-flagged via COMPLIANCE_EVENTS_ENABLED.
 *
 * When the flag is unset or not "true", every call to logComplianceEvent
 * returns immediately. Nothing is written, nothing is logged. Safe to
 * drop call-sites into the primary business flows with zero runtime cost.
 *
 * When the flag is flipped to "true", events are persisted as an append-only
 * ledger (see prisma/migrations/20260423000000_compliance_events/).
 * PII is never stored raw - identifiers are SHA-256 hashed before insert.
 *
 * Rationale: if counsel opinion on DR-624 (AML/CTF Tranche 2 scope) flips
 * our working position from out-of-scope to in-scope, we can enable
 * compliance logging within minutes rather than months.
 */

import { createHash } from 'node:crypto';
import { prisma } from '@/lib/prisma';

const ENABLED = process.env.COMPLIANCE_EVENTS_ENABLED === 'true';

export type ComplianceEventType =
  | 'claim_intake_created'
  | 'claim_intake_consent_given'
  | 'finance_referral_offered'
  | 'finance_referral_consent_given'
  | 'finance_referral_handoff'
  | 'contractor_dispatched'
  | 'contractor_accepted'
  | 'referral_fee_received'
  | 'kyc_triggered'
  | 'smr_lodged'
  | 'tttr_lodged'
  | 'booking_created'
  | 'auth_login_attempt'
  | 'auth_login_success'
  | 'auth_login_failure'
  | 'push_dispatched'
  // Privacy + NDB (Notifiable Data Breaches) — Part IIIC of Privacy Act 1988.
  // These rows are NEVER deleted from the audit trail. See
  // .claude/rules/privacy.md §5 + §9 for the canonical retention policy.
  | 'breach_suspected'
  | 'data_deletion_request'
  | 'data_access_request'
  | 'privacy_notice_shown'
  // Payments: emitted when Stripe-side refund succeeded but the
  // matching DB write failed. Operator must reconcile manually.
  // See app/api/payments/refund/route.ts.
  | 'payment_refund_db_failure'
  // Payments: contractor self-service subscription cancellation.
  // See app/api/contractor/subscription/cancel/route.ts (audit B8).
  | 'payment_subscription_cancel';

export type ComplianceCorrelationType =
  | 'claim'
  | 'finance_referral'
  | 'contractor_dispatch'
  | 'contractor_membership'
  | 'system';

export type ComplianceEntityType = 'customer' | 'contractor' | 'finance_partner' | 'system';

export type ComplianceConsentMethod =
  | 'web_form'
  | 'voice_sarah'
  | 'voice_human'
  | 'chat'
  | 'web_widget';

export interface ComplianceEventInput {
  eventType: ComplianceEventType;
  correlationId: string;
  correlationType: ComplianceCorrelationType;
  entityType?: ComplianceEntityType;
  /** Raw PII (email or phone). Will be SHA-256 hashed before storage. */
  entityIdentifier?: string;
  amountCents?: number;
  amountCurrency?: string;
  designatedServiceCode?: string;
  consentCopyHash?: string;
  consentVersion?: string;
  consentMethod?: ComplianceConsentMethod;
  metadata?: Record<string, unknown>;
  occurredAt?: Date;
}

/**
 * SHA-256 hash of a canonical (trimmed, lowercase) identifier.
 * Use for email or phone so the table never stores raw PII.
 */
export function hashIdentifier(raw: string): string {
  return createHash('sha256').update(raw.trim().toLowerCase()).digest('hex');
}

/**
 * SHA-256 hash of the exact consent text shown to the user.
 * Lets regulators verify "this hash corresponds to this exact wording"
 * without us storing N copies of the same consent string.
 */
export function hashConsent(consentText: string): string {
  return createHash('sha256').update(consentText).digest('hex');
}

/**
 * Log a compliance event. No-ops silently if COMPLIANCE_EVENTS_ENABLED is
 * not "true". Errors are logged but never propagated - compliance logging
 * must not break the primary business flow.
 */
export async function logComplianceEvent(input: ComplianceEventInput): Promise<void> {
  if (!ENABLED) return;

  try {
    const data = {
      event_type: input.eventType,
      correlation_id: input.correlationId,
      correlation_type: input.correlationType,
      entity_type: input.entityType ?? null,
      entity_identifier_hash: input.entityIdentifier
        ? hashIdentifier(input.entityIdentifier)
        : null,
      amount_cents: input.amountCents ?? null,
      amount_currency: input.amountCurrency ?? null,
      designated_service_code: input.designatedServiceCode ?? null,
      consent_copy_hash: input.consentCopyHash ?? null,
      consent_version: input.consentVersion ?? null,
      consent_method: input.consentMethod ?? null,
      metadata: input.metadata ?? {},
      occurred_at: input.occurredAt ?? new Date(),
    };

    // $executeRaw until the Prisma schema is regenerated with the model.
    // Using parameterised interpolation to prevent injection.
    await prisma.$executeRaw`
      INSERT INTO compliance_events (
        event_type, correlation_id, correlation_type,
        entity_type, entity_identifier_hash,
        amount_cents, amount_currency, designated_service_code,
        consent_copy_hash, consent_version, consent_method,
        metadata, occurred_at
      ) VALUES (
        ${data.event_type}, ${data.correlation_id}::uuid, ${data.correlation_type},
        ${data.entity_type}, ${data.entity_identifier_hash},
        ${data.amount_cents}, ${data.amount_currency}, ${data.designated_service_code},
        ${data.consent_copy_hash}, ${data.consent_version}, ${data.consent_method},
        ${JSON.stringify(data.metadata)}::jsonb, ${data.occurred_at}
      )
    `;
  } catch (err) {
    // Never throw from the compliance path.
    // eslint-disable-next-line no-console
    console.error('[compliance_events] write failed', {
      eventType: input.eventType,
      correlationId: input.correlationId,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
