/**
 * NOT LEGAL ADVICE — retention policy implementation is defence-in-depth,
 * not a compliance substitute. Counsel review required.
 *
 * Voice-channel retention policy (DR-714, epic DR-706).
 *
 * Policy:
 *   - audio: 30 days
 *   - raw_transcripts: 90 days
 *   - redacted_transcripts + compliance_events: 7 years
 *   - unfilled claim_drafts: 30 days (then PII-scrubbed)
 */

export const RETENTION_POLICY = {
  audio_days: 30,
  raw_transcript_days: 90,
  redacted_transcript_years: 7,
  draft_claim_unfilled_days: 30,
} as const;

export type RetentionPolicyKey =
  | 'audio'
  | 'raw_transcript'
  | 'redacted'
  | 'draft_unfilled';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * MS_PER_DAY);
}

function addYears(d: Date, years: number): Date {
  const copy = new Date(d.getTime());
  copy.setUTCFullYear(copy.getUTCFullYear() + years);
  return copy;
}

export function computeExpiryDate(createdAt: Date, policy: RetentionPolicyKey): Date {
  switch (policy) {
    case 'audio':
      return addDays(createdAt, RETENTION_POLICY.audio_days);
    case 'raw_transcript':
      return addDays(createdAt, RETENTION_POLICY.raw_transcript_days);
    case 'redacted':
      return addYears(createdAt, RETENTION_POLICY.redacted_transcript_years);
    case 'draft_unfilled':
      return addDays(createdAt, RETENTION_POLICY.draft_claim_unfilled_days);
  }
}

export function isExpired(
  createdAt: Date,
  policy: RetentionPolicyKey,
  now: Date = new Date(),
): boolean {
  return now.getTime() >= computeExpiryDate(createdAt, policy).getTime();
}
