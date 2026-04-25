import { describe, it, expect } from 'vitest';
import { resolveIncomingSource } from '../route';

/**
 * DR-NRPG-equipment-finance: referral API must honour the `channel=contractor`
 * hand-off from the NRPG contractor equipment-finance page, while ignoring
 * unknown / spoofed source values.
 */
describe('resolveIncomingSource (channel handling)', () => {
  it('maps a contractor-channel source to the contractor equipment-finance surface', () => {
    expect(resolveIncomingSource('disasterrecovery.com.au/contractor/equipment-finance')).toBe(
      'disasterrecovery.com.au/contractor/equipment-finance',
    );
  });

  it('falls back to the default /finance source for missing or unknown values', () => {
    expect(resolveIncomingSource(undefined)).toBe('disasterrecovery.com.au/finance');
    expect(resolveIncomingSource(null)).toBe('disasterrecovery.com.au/finance');
    expect(resolveIncomingSource('')).toBe('disasterrecovery.com.au/finance');
    expect(resolveIncomingSource('https://attacker.example/spoof')).toBe(
      'disasterrecovery.com.au/finance',
    );
    expect(resolveIncomingSource(123 as unknown as string)).toBe(
      'disasterrecovery.com.au/finance',
    );
  });
});
