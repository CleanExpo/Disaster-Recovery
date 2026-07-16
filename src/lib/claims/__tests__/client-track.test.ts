/**
 * Unit tests for claim track payload builders used by GET /api/claims/submit.
 * Behaviour: Enquiry metadata rebuilds a rich track view; Lead maps status; no local-* IDs.
 */

import { describe, it, expect } from 'vitest';
import { summariseClaimForEnquiry } from '../enquiry-fallback';

describe('client claim track helpers (enquiry summary)', () => {
  it('keeps public_claim_submit prefix for ops filtering', () => {
    const summary = summariseClaimForEnquiry({
      fullName: 'Test Client',
      email: 'client@example.com',
      phone: '0400000000',
      propertyAddress: '1 Test St',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      damageDescription: 'Ceiling leak',
      damageTypes: ['Water/Flood Damage'],
      urgencyLevel: 'urgent',
    });
    expect(summary.startsWith('[public-claim-submit]')).toBe(true);
    expect(summary).not.toContain('local-');
  });
});
