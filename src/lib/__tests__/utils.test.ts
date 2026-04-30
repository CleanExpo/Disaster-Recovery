/**
 * Unit tests for src/lib/utils.ts
 *
 * Pins the format helpers used in user-facing copy + the cn() class
 * merger used in dozens of components.
 */

import { describe, it, expect } from 'vitest';
import { cn, formatEmail, formatCurrency, formatDate } from '../utils';

describe('cn — tailwind-merge wrapper', () => {
  it('merges plain class strings', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('strips falsy values (undefined, false, 0)', () => {
    expect(cn('a', undefined, false && 'b', null, 'c')).toBe('a c');
  });

  it('lets later tailwind classes override earlier conflicting ones', () => {
    // tailwind-merge collapses padding conflicts to the last winner.
    expect(cn('p-4', 'p-8')).toBe('p-8');
  });

  it('supports object syntax via clsx', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });
});

describe('formatEmail', () => {
  it('lowercases the input', () => {
    expect(formatEmail('Phill@Example.COM')).toBe('phill@example.com');
  });

  it('trims surrounding whitespace', () => {
    expect(formatEmail('  hello@a.com  ')).toBe('hello@a.com');
  });
});

describe('formatCurrency', () => {
  it('renders AUD with the AU locale', () => {
    // en-AU AUD format is "$X,XXX.XX" with a non-breaking space inside Intl.
    const result = formatCurrency(1234);
    expect(result).toMatch(/\$1,234/);
    expect(result).toMatch(/\.00$/);
  });

  it('renders zero as $0.00', () => {
    expect(formatCurrency(0)).toMatch(/\$0\.00$/);
  });

  it('handles negative amounts', () => {
    expect(formatCurrency(-50)).toMatch(/-?\$50\.00$/);
  });
});

describe('formatDate', () => {
  it('renders en-AU long form (e.g. "30 April 2026")', () => {
    expect(formatDate(new Date('2026-04-30T00:00:00Z'))).toMatch(/\d{1,2} \w+ \d{4}/);
  });

  it('uses a month name (not numeric)', () => {
    const result = formatDate(new Date('2026-01-15T12:00:00Z'));
    expect(result).toMatch(/January/);
  });
});
