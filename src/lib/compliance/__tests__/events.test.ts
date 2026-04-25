/**
 * Unit tests for compliance event writer.
 *
 * The live Prisma path is flag-gated behind COMPLIANCE_EVENTS_ENABLED.
 * We only test:
 *   - hash helpers (pure)
 *   - no-op behaviour when the flag is unset (the module-level ENABLED
 *     constant is captured at import time, and in the test runner the
 *     env var is absent — so logComplianceEvent should return immediately).
 */

import { describe, it, expect, vi } from 'vitest';

// Mock prisma so a mistaken real-DB call would surface loudly.
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $executeRaw: vi.fn(async () => {
      throw new Error('prisma should not be called when flag is unset');
    }),
  },
}));

import { hashIdentifier, hashConsent, logComplianceEvent } from '../events';
import { prisma } from '@/lib/prisma';

describe('hashIdentifier', () => {
  it('is deterministic for the same normalised input', () => {
    expect(hashIdentifier('Joe@Example.COM')).toBe(hashIdentifier('joe@example.com'));
  });

  it('trims whitespace before hashing', () => {
    expect(hashIdentifier('  joe@example.com  ')).toBe(hashIdentifier('joe@example.com'));
  });

  it('produces a 64-char hex SHA-256 digest', () => {
    const h = hashIdentifier('joe@example.com');
    expect(h).toMatch(/^[a-f0-9]{64}$/);
  });

  it('produces different digests for different inputs', () => {
    expect(hashIdentifier('a@example.com')).not.toBe(hashIdentifier('b@example.com'));
  });
});

describe('hashConsent', () => {
  it('is deterministic', () => {
    const t = 'I agree to the thing.';
    expect(hashConsent(t)).toBe(hashConsent(t));
  });

  it('is case-sensitive (unlike hashIdentifier)', () => {
    expect(hashConsent('I agree')).not.toBe(hashConsent('i agree'));
  });

  it('produces 64-char hex', () => {
    expect(hashConsent('x')).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe('logComplianceEvent', () => {
  it('no-ops when COMPLIANCE_EVENTS_ENABLED is not "true"', async () => {
    // In the test env the flag is absent, so this must NOT call prisma.
    await expect(
      logComplianceEvent({
        eventType: 'claim_intake_created',
        correlationId: '00000000-0000-0000-0000-000000000000',
        correlationType: 'claim',
      }),
    ).resolves.toBeUndefined();
    expect(prisma.$executeRaw).not.toHaveBeenCalled();
  });
});
