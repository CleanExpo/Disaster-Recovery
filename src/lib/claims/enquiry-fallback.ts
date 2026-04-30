/**
 * Enquiry-fallback helper for the public `/api/claims/submit` route.
 *
 * D4 Path 1 (per `docs/audits/dr-claim-submission-fk-debt-2026-04-29.md`).
 *
 * Anonymous public claim submissions cannot directly write to
 * `InsuranceClaimAU` because that table has FK constraints to:
 *   - `Booking(id)`        — public form has no booking concept
 *   - `users(id)`          — anonymous submitters are not in Supabase auth
 *   - `InsuranceProvider(id)` — only ops-curated, public insurer text
 *                              is unverified
 *
 * The previous workaround was a filesystem JSONL fallback at /tmp,
 * which is read-only on Vercel — submissions silently disappeared.
 *
 * This helper writes the submission to the `Enquiry` table instead:
 *   - Core contact fields (name / email / phone) → top-level columns.
 *   - Full claim payload → `metadata` JSON for downstream Ops promotion.
 *   - `source = 'public_claim_submit'` so Ops dashboards can filter.
 *
 * Promotion path (separate, not part of this helper):
 *   1. Ops contacts the enquirer to verify identity.
 *   2. Once a real `users` row exists + insurer is verified + booking
 *      is created, an Ops mutation copies fields from `Enquiry.metadata`
 *      into a proper `InsuranceClaimAU` row and marks the Enquiry
 *      `responded = true`.
 *
 * No PII handling concerns: `Enquiry` is the canonical place for
 * pre-claim contact data (per UBIQUITOUS_LANGUAGE.md), already used
 * by `/api/contact/submit` and disputes flow.
 */

import type { PrismaClient } from '@prisma/client';

export interface ClaimBodyShape {
  fullName: string;
  email: string;
  phone?: string;
  propertyAddress: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  damageDescription: string;
  damageTypes?: string[];
  urgencyLevel?: string;
  insuranceCompany?: string;
  policyNumber?: string;
  insuranceClaimNumber?: string;
  // Anything else from the schema — passthrough into metadata.
  [key: string]: unknown;
}

export interface EnquiryFallbackResult {
  enquiryId: string;
  writtenAt: string;
}

/**
 * Build a short, ops-readable summary message for the Enquiry row.
 * Keeps full payload in metadata; `message` is for the Ops queue
 * preview pane.
 */
export function summariseClaimForEnquiry(body: ClaimBodyShape): string {
  const damageTypes =
    Array.isArray(body.damageTypes) && body.damageTypes.length > 0
      ? body.damageTypes.join(', ')
      : 'unspecified';
  const urgency = body.urgencyLevel ?? 'unspecified';
  const location =
    [body.suburb, body.state, body.postcode].filter((s) => typeof s === 'string' && s).join(' ') ||
    body.propertyAddress;
  return (
    `[public-claim-submit] ${urgency} ${damageTypes} damage at ${location}. ` +
    `${body.damageDescription}`
  );
}

/**
 * Write the claim payload to the `Enquiry` table.
 *
 * Returns `{ enquiryId, writtenAt }` — the caller uses `enquiryId` as
 * the tracking id surfaced to the user (replaces the previous
 * `local-${timestamp}` fallback id).
 */
export async function writeEnquiryFromClaimBody(
  prisma: PrismaClient,
  body: ClaimBodyShape,
  options?: { ipAddress?: string; userAgent?: string },
): Promise<EnquiryFallbackResult> {
  const message = summariseClaimForEnquiry(body);

  // Strip top-level fields that already become first-class columns —
  // the metadata payload should preserve EVERYTHING ELSE so the
  // promotion-to-Claim step has full fidelity.
  const metadata = {
    payload: body,
    submission: {
      ipAddress: options?.ipAddress ?? 'unknown',
      userAgent: options?.userAgent ?? 'unknown',
      submittedAt: new Date().toISOString(),
    },
  };

  const enquiry = await prisma.enquiry.create({
    data: {
      name: body.fullName,
      email: body.email,
      phone: body.phone ?? null,
      message,
      source: 'public_claim_submit',
      metadata: JSON.stringify(metadata),
      responded: false,
    },
  });

  return {
    enquiryId: enquiry.id,
    writtenAt: enquiry.createdAt.toISOString(),
  };
}
