/**
 * Vitest Batch 3 — claim-intake invariants (audit goal C3).
 *
 * Characterisation tests for the EXISTING `claimSubmitSchema` shape.
 * Companion to `schemas.test.ts` — these focus on the audit's six
 * invariants (required fields, email shape, AU phone, ABN, damageType
 * enum) and `it.skip` anything that would need a source change.
 *
 * NOT LEGAL ADVICE — see CLAUDE.md compliance pointer.
 */

import { describe, it, expect } from 'vitest';
import { claimSubmitSchema } from '../schemas';

// Minimal valid payload — matches `app/claim/ClaimFormClient.tsx`.
const validClaim = {
  fullName: 'Joe Smith',
  email: 'joe@example.com',
  propertyAddress: '42 Smith St',
  damageTypes: ['Water/Flood Damage'],
  damageDescription: 'burst pipe in kitchen',
};

describe('claimSubmitSchema — audit invariants', () => {
  it('rejects a payload missing required fields (postcode-class characterisation)', () => {
    // `postcode` is OPTIONAL in the current shape — the load-bearing
    // required fields are fullName/email/propertyAddress/damageTypes/
    // damageDescription. Drop one and confirm rejection.
    const { damageTypes: _drop, ...rest } = validClaim;
    const res = claimSubmitSchema.safeParse(rest);
    expect(res.success).toBe(false);
  });

  it('accepts a minimal valid claim (no optional fields)', () => {
    const res = claimSubmitSchema.safeParse(validClaim);
    expect(res.success).toBe(true);
  });

  it('rejects malformed emails (no @, no domain, trailing dot)', () => {
    for (const bad of ['no-at-sign', 'foo@', '@bar.com', 'foo@bar', 'foo@bar.']) {
      const res = claimSubmitSchema.safeParse({ ...validClaim, email: bad });
      expect(res.success, `expected reject for ${bad}`).toBe(false);
    }
  });

  // The `phone` field on `claimSubmitSchema` is currently a generic
  // `z.string().min(6).max(20)` — no AU mobile regex. A strict
  // `04XXXXXXXX` / `+614XXXXXXXX` invariant would require a source
  // change (regex on the schema). Skip until that lands.
  it.skip('AU mobile validation accepts 04XXXXXXXX and +614XXXXXXXX, rejects bad shapes', () => {
    // Pending: tighten `claimSubmitSchema.phone` to a regex such as
    // /^(?:\+614|04)\d{8}$/ (with optional spacing). Currently the
    // schema accepts any 6-20 char string, so this test would not
    // characterise the live behaviour without modifying the source.
  });

  // No contractor application Zod schema exists in
  // `src/lib/validation/schemas.ts`. Legacy `src/lib/validation.ts`
  // has an `ABN` regex pattern but that file currently has TS parse
  // errors (orphan dead code) and cannot be imported. Skip until the
  // contractor application schema is added to the canonical registry.
  it.skip('contractor application schema rejects an invalid ABN', () => {
    // Pending: add `contractorApplicationSchema` to schemas.ts with
    // `abn: z.string().regex(/^\d{11}$/)`.
  });

  // `damageTypes` is currently a free-form array of strings (max 100
  // chars per entry). The canonical 9-category enum (water, fire,
  // mould, storm, flood, biohazard, sewage, vehicle_impact, trauma —
  // per business-rules.md §4) is NOT enforced on the wire. Skip until
  // the schema is tightened to `z.enum([...])`.
  it.skip('damageTypes enum only accepts the canonical 9 categories', () => {
    // Pending: replace `z.array(z.string().max(100))` with
    // `z.array(z.enum(['water','fire','mould','storm','flood','biohazard','sewage','vehicle_impact','trauma']))`.
  });
});
