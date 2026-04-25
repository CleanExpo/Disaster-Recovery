# Phase 2 — Design-an-Interface

**Loop:** `2026-04-29-finance-referral-persistence`
**Skill invoked:** `design-an-interface`.

## External contracts

| Surface                                    | Change                                                            |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `POST /api/finance/referral` JSON response | None — `{ ok, referral_id, handoff_token, expires_in }` unchanged |
| `POST /api/finance/status`                 | None — still hits in-memory store                                 |
| `GET /admin/finance-referrals`             | None — still reads in-memory store                                |

The persistence change is **additive** behind the API. No public
contract changes.

## Internal change set

1. **New migration:** `prisma/migrations/20260429000000_finance_referral/migration.sql`
   - `CREATE TABLE IF NOT EXISTS "FinanceReferral"` with the exact
     columns from `schema.prisma` lines 2099-2123.
   - Indexes: `(createdAt)`, `(country, customerType)`, `(receiver, createdAt)`.

2. **Wire `app/api/finance/referral/route.ts`:**
   - Import `prisma` from `@/lib/prisma`.
   - After computing `auditEntry`, call:
     ```ts
     try {
       await prisma.financeReferral.create({
         data: {
           id: referralId,
           country: 'AU',
           customerType: customer_type,
           fundingBand: funding_band,
           disasterCategory: disaster_category,
           source: equippedPayload.source,
           disclosureVersion: equippedPayload.disclosure_version,
           privacyNoticeVersion: equippedPayload.privacy_notice_version,
           consentShareEquipped: true,
           consentReferralDisclosure: true,
           consentMarketing: consent_marketing,
           payloadHash,
           ip: auditEntry.ip,
           userAgent: auditEntry.user_agent,
           receiver: auditEntry.receiver,
         },
       });
     } catch (err) {
       log.error('finance.referral persistence failed', {
         referralId,
         error: err instanceof Error ? err.message : String(err),
       });
       // continue — stdout audit log already captured the data above
     }
     ```
   - Remove the TODO comment.

3. **No Prisma client config change** — singleton at `src/lib/prisma.ts`
   already exists and is what the rest of the app uses.

## Verification contract

- `npx prisma generate` — regenerates client without errors.
- Migration SQL is syntactically valid (no `prisma migrate deploy` in
  this loop — that's Phill's call against Supabase).
- `npx tsc --noEmit` — clean on changed files.
- The API route still returns 200 on success path even when the DB
  is unreachable / table missing (try/catch pattern).
- No new banned phrases, no PII added to logs, AU English preserved.

## Out of scope

- Status webhook persistence migration.
- Schema extensions for webhook fields.
- `compliance_events` log-line for `finance_referral_submitted`.
- Production migration deploy (Phill's call).

## Exit gate

- [x] Migration SQL designed.
- [x] Route change minimal and try/catch protected.
- [x] No public API contract change.

**Proceed to Phase 3 — Plan.**
