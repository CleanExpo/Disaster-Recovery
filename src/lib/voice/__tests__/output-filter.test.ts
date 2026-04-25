// NOT LEGAL ADVICE — flag-gated scaffold.
// Unit tests for output filter + SMS sanitiser (Vitest).

import { describe, it, expect } from 'vitest';
import { filterToolOutput, sanitiseSmsBody } from '../output-filter';

describe('filterToolOutput', () => {
  it('drops unexpected keys and keeps allowed ones', () => {
    const filtered = filterToolOutput(
      { covered: true, typical_response_hours: 1, secret: 'hidden' },
      ['covered', 'typical_response_hours'],
    );
    expect(filtered.covered).toBe(true);
    expect(filtered.typical_response_hours).toBe(1);
    expect('secret' in filtered).toBe(false);
  });

  it('returns an empty object when given a non-object input', () => {
    const filtered = filterToolOutput(
      null as unknown as Record<string, unknown>,
      ['a'],
    );
    expect(filtered).toEqual({});
  });

  it('shallow-clones nested plain objects for allowed keys', () => {
    const meta = { a: 1, b: 2 };
    const filtered = filterToolOutput({ meta, other: 'x' }, ['meta']);
    expect(filtered.meta).toEqual({ a: 1, b: 2 });
    expect(filtered.meta).not.toBe(meta); // shallow clone
    expect('other' in filtered).toBe(false);
  });
});

describe('sanitiseSmsBody', () => {
  it('redacts sk_live_ secret prefixes', () => {
    const out = sanitiseSmsBody('sk_live_abc123DEF tap here for claim');
    expect(out).not.toContain('sk_live_abc123DEF');
    expect(out).toContain('[REDACTED]');
  });

  it('redacts UUIDs', () => {
    const out = sanitiseSmsBody('claim 550e8400-e29b-41d4-a716-446655440000 ready');
    expect(out).not.toContain('550e8400-e29b-41d4-a716-446655440000');
  });

  it('preserves innocuous text and URLs', () => {
    const out = sanitiseSmsBody('Disaster Recovery: tap here https://example.com');
    expect(out).toContain('Disaster Recovery');
    expect(out).toContain('https://example.com');
  });
});
