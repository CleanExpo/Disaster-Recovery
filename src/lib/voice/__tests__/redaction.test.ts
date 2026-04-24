/**
 * DR-714 redaction unit tests (Vitest).
 */

import { describe, it, expect } from 'vitest';
import {
  redactTranscript,
  redactTranscriptWithFlags,
} from '../redaction';

describe('redactTranscript — card data', () => {
  it('redacts a Luhn-valid PAN (4242 test card)', () => {
    const out = redactTranscript('card 4242 4242 4242 4242 please');
    expect(out).toContain('[REDACTED_PAN]');
    expect(out).not.toContain('4242 4242 4242 4242');
  });

  it('leaves a Luhn-invalid number untouched', () => {
    const out = redactTranscript('number 1234 5678 9012 3456 here');
    expect(out).not.toContain('[REDACTED_PAN]');
  });

  it('redacts a CVV near a keyword', () => {
    const out = redactTranscript('security code 123 confirmed');
    expect(out).toContain('[REDACTED_CVV]');
    expect(out).not.toMatch(/\b123\b/);
  });
});

describe('redactTranscript — banking', () => {
  it('redacts a BSB + account combination', () => {
    const out = redactTranscript('BSB 062-000 account 12345678');
    expect(out).toContain('[REDACTED_BANK]');
    expect(out).not.toContain('062-000');
  });
});

describe('redactTranscript — caller-specified preservation', () => {
  it('preserves the caller email while redacting other emails', () => {
    const out = redactTranscript(
      'caller joe@example.com cc sally@example.com',
      { preserveCallerEmail: 'joe@example.com' },
    );
    expect(out).toContain('joe@example.com');
    expect(out).not.toContain('sally@example.com');
    expect(out).toContain('[REDACTED_EMAIL]');
  });
});

describe('redactTranscript — addresses', () => {
  it('redacts a street address but preserves the postcode', () => {
    const out = redactTranscript('I live at 42 Smith Street, Brisbane 4101');
    expect(out).toContain('[REDACTED_ADDRESS]');
    expect(out).not.toMatch(/42 Smith Street/i);
    expect(out).toContain('4101');
  });

  it('leaves benign sentences untouched', () => {
    const out = redactTranscript('The weather is nice today');
    expect(out).toBe('The weather is nice today');
  });
});

describe('redactTranscriptWithFlags — leakage flags', () => {
  it('flags secret_leak and redacts the secret prefix', () => {
    const r = redactTranscriptWithFlags('token is sk_live_abc123def456 ok');
    expect(r.text).toContain('[REDACTED_SECRET]');
    expect(r.text).not.toContain('sk_live_');
    expect(r.flags.secret_leak).toBe(true);
  });

  it('flags internal_leak when a contractor deny-list term appears', () => {
    const r = redactTranscriptWithFlags(
      'Acme Restoration handles this',
      { contractorDenyList: ['Acme Restoration'] },
    );
    expect(r.text).toContain('[REDACTED_INTERNAL]');
    expect(r.text).not.toMatch(/Acme Restoration/i);
    expect(r.flags.internal_leak).toBe(true);
  });
});
