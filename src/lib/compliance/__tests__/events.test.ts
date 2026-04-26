/**
 * Unit tests for compliance event writer.
 *
 * The live Prisma path is flag-gated behind COMPLIANCE_EVENTS_ENABLED.
 * We test:
 *   - hash helpers (pure)
 *   - no-op behaviour when the flag is unset (the module-level ENABLED
 *     constant is captured at import time, and in the test runner the
 *     env var is absent — so logComplianceEvent should return immediately).
 *   - Vitest Batch 2 additions (DR-791): characterisation of ENABLED-path
 *     behaviour, breach_suspected + data_deletion_request event types,
 *     consentMethod variants (incl. 'web_widget' added in PR #205), PII
 *     hashing of entityIdentifier, optional amount fields, and occurredAt
 *     fallback to current Date.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ComplianceConsentMethod, ComplianceEventType } from '../events';

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

// ---------------------------------------------------------------------------
// Vitest Batch 2 additions (DR-791) — characterise ENABLED-path behaviour and
// the type-level guarantees of the input shape. These tests use isolated
// module re-imports so we can flip the COMPLIANCE_EVENTS_ENABLED flag without
// affecting the suite above.
// ---------------------------------------------------------------------------

describe('logComplianceEvent — ENABLED path (flag flipped on)', () => {
  const ORIGINAL_ENV = process.env.COMPLIANCE_EVENTS_ENABLED;
  let executeRawMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    // Reset the module graph so events.ts re-evaluates the ENABLED constant.
    vi.resetModules();
    process.env.COMPLIANCE_EVENTS_ENABLED = 'true';

    executeRawMock = vi.fn(async () => 1);
    vi.doMock('@/lib/prisma', () => ({
      prisma: { $executeRaw: executeRawMock },
    }));
  });

  afterEach(() => {
    if (ORIGINAL_ENV === undefined) delete process.env.COMPLIANCE_EVENTS_ENABLED;
    else process.env.COMPLIANCE_EVENTS_ENABLED = ORIGINAL_ENV;
    vi.doUnmock('@/lib/prisma');
    vi.resetModules();
  });

  it('writes a row when valid input is provided (flag = "true")', async () => {
    const mod = await import('../events');
    await mod.logComplianceEvent({
      eventType: 'claim_intake_created',
      correlationId: '11111111-1111-1111-1111-111111111111',
      correlationType: 'claim',
    });
    expect(executeRawMock).toHaveBeenCalledTimes(1);
  });

  it('hashes raw entityIdentifier (email PII) before persisting — never raw', async () => {
    const mod = await import('../events');
    const rawEmail = 'Jane.Doe@Example.COM';
    const expectedHash = mod.hashIdentifier(rawEmail);

    await mod.logComplianceEvent({
      eventType: 'claim_intake_consent_given',
      correlationId: '22222222-2222-2222-2222-222222222222',
      correlationType: 'claim',
      entityType: 'customer',
      entityIdentifier: rawEmail,
    });

    // The Prisma tagged-template call receives the values array as the
    // second argument. Walk it and assert the raw email is absent and the
    // hash is present.
    const callArgs = executeRawMock.mock.calls[0];
    const flatValues = JSON.stringify(callArgs);
    expect(flatValues).not.toContain(rawEmail);
    expect(flatValues).toContain(expectedHash);
  });

  it('accepts breach_suspected event type (NDB Part IIIC retention row)', async () => {
    const mod = await import('../events');
    await mod.logComplianceEvent({
      eventType: 'breach_suspected',
      correlationId: '33333333-3333-3333-3333-333333333333',
      correlationType: 'system',
      metadata: { summary: 'unauthorised access attempt' },
    });
    expect(executeRawMock).toHaveBeenCalledTimes(1);
  });

  it('accepts data_deletion_request event type (APP 12/13)', async () => {
    const mod = await import('../events');
    await mod.logComplianceEvent({
      eventType: 'data_deletion_request',
      correlationId: '44444444-4444-4444-4444-444444444444',
      correlationType: 'claim',
    });
    expect(executeRawMock).toHaveBeenCalledTimes(1);
  });

  it('accepts amountCents and amountCurrency optional fields', async () => {
    const mod = await import('../events');
    await mod.logComplianceEvent({
      eventType: 'referral_fee_received',
      correlationId: '55555555-5555-5555-5555-555555555555',
      correlationType: 'finance_referral',
      amountCents: 12345,
      amountCurrency: 'AUD',
    });
    const flatValues = JSON.stringify(executeRawMock.mock.calls[0]);
    expect(flatValues).toContain('12345');
    expect(flatValues).toContain('AUD');
  });

  it('falls back to a current Date for occurredAt when not provided', async () => {
    const mod = await import('../events');
    const before = Date.now();
    await mod.logComplianceEvent({
      eventType: 'privacy_notice_shown',
      correlationId: '66666666-6666-6666-6666-666666666666',
      correlationType: 'system',
    });
    const after = Date.now();

    // Locate a Date instance in the captured args and assert it falls in range.
    const args = executeRawMock.mock.calls[0] as unknown[];
    const dateArg = args.flat(Infinity as 0).find((v): v is Date => v instanceof Date);
    expect(dateArg).toBeInstanceOf(Date);
    expect(dateArg!.getTime()).toBeGreaterThanOrEqual(before);
    expect(dateArg!.getTime()).toBeLessThanOrEqual(after);
  });
});

describe('ComplianceEventType + ComplianceConsentMethod (compile-time surface)', () => {
  // These are characterisation tests of the union shape. They exist so a
  // future PR that accidentally narrows the union (e.g. drops 'web_widget')
  // breaks the build with a recognised, type-level signal.

  it('recognises all four consentMethod variants the codebase relies on', () => {
    const variants: ComplianceConsentMethod[] = [
      'web_form',
      'voice_sarah',
      'voice_human',
      'chat',
      'web_widget', // added in PR #205 for the in-browser ElevenLabs widget
    ];
    // Runtime sanity — every entry is a non-empty string.
    for (const v of variants) {
      expect(typeof v).toBe('string');
      expect(v.length).toBeGreaterThan(0);
    }
    // Compile-time exhaustiveness probe: assigning an unknown method must
    // be a TypeScript error. Kept as a runtime no-op (the // @ts-expect-error
    // is the actual assertion, enforced by `tsc --noEmit`).
    // @ts-expect-error — 'sms_otp' is not a recognised ComplianceConsentMethod
    const invalid: ComplianceConsentMethod = 'sms_otp';
    expect(typeof invalid).toBe('string');
  });

  it('recognises breach_suspected and data_deletion_request as event types', () => {
    const breach: ComplianceEventType = 'breach_suspected';
    const deletion: ComplianceEventType = 'data_deletion_request';
    expect(breach).toBe('breach_suspected');
    expect(deletion).toBe('data_deletion_request');

    // @ts-expect-error — 'totally_made_up_event' is not in the union
    const bogus: ComplianceEventType = 'totally_made_up_event';
    expect(typeof bogus).toBe('string');
  });
});
