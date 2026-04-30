/**
 * Unit tests for src/lib/lead-assignment.ts — pure helpers only.
 *
 * `calculateLeadValue` is a pure function and the value drives partner
 * pricing. The async `assignLeadToPartner` requires Prisma + a real
 * partner table and is tested via integration suites elsewhere.
 */

import { describe, it, expect } from 'vitest';
import { calculateLeadValue } from '../lead-assignment';

describe('calculateLeadValue — base damage values', () => {
  it('water damage = 500', () => {
    expect(calculateLeadValue({ damageType: ['water'] })).toBe(500);
  });

  it('fire damage = 800', () => {
    expect(calculateLeadValue({ damageType: ['fire'] })).toBe(800);
  });

  it('storm damage = 600', () => {
    expect(calculateLeadValue({ damageType: ['storm'] })).toBe(600);
  });

  it('mould damage = 400', () => {
    expect(calculateLeadValue({ damageType: ['mould'] })).toBe(400);
  });

  it('unknown damage type falls back to 300', () => {
    expect(calculateLeadValue({ damageType: ['unicorn'] })).toBe(300);
  });

  it('multiple damage types sum (water + fire = 1300)', () => {
    expect(calculateLeadValue({ damageType: ['water', 'fire'] })).toBe(1300);
  });
});

describe('calculateLeadValue — multipliers', () => {
  it('IMMEDIATE urgency applies a 1.5x multiplier', () => {
    const base = calculateLeadValue({ damageType: ['water'] });
    const urgent = calculateLeadValue({
      damageType: ['water'],
      urgencyLevel: 'IMMEDIATE',
    });
    expect(urgent).toBe(Math.round(base * 1.5));
  });

  it('HIGH urgency applies a 1.3x multiplier', () => {
    const base = calculateLeadValue({ damageType: ['water'] });
    const high = calculateLeadValue({
      damageType: ['water'],
      urgencyLevel: 'HIGH',
    });
    expect(high).toBe(Math.round(base * 1.3));
  });

  it('hasInsurance applies a 1.4x multiplier', () => {
    const without = calculateLeadValue({ damageType: ['water'] });
    const with_ = calculateLeadValue({
      damageType: ['water'],
      hasInsurance: true,
    });
    expect(with_).toBe(Math.round(without * 1.4));
  });

  it('isBusinessProperty applies a 1.6x multiplier', () => {
    const residential = calculateLeadValue({ damageType: ['water'] });
    const commercial = calculateLeadValue({
      damageType: ['water'],
      isBusinessProperty: true,
    });
    expect(commercial).toBe(Math.round(residential * 1.6));
  });

  it('estimatedAreaAffected > 100 applies 1.5x', () => {
    const small = calculateLeadValue({ damageType: ['water'] });
    const large = calculateLeadValue({
      damageType: ['water'],
      estimatedAreaAffected: '150',
    });
    expect(large).toBe(Math.round(small * 1.5));
  });

  it('estimatedAreaAffected 50-100 applies 1.3x', () => {
    const small = calculateLeadValue({ damageType: ['water'] });
    const mid = calculateLeadValue({
      damageType: ['water'],
      estimatedAreaAffected: '75',
    });
    expect(mid).toBe(Math.round(small * 1.3));
  });
});

describe('calculateLeadValue — input shape tolerance', () => {
  it('accepts a JSON-string damageType (legacy serialised form)', () => {
    expect(calculateLeadValue({ damageType: '["water"]' })).toBe(500);
  });

  it('returns 0 when damageType is missing entirely', () => {
    expect(calculateLeadValue({})).toBe(0);
  });

  it('rounds the final value (no fractional dollars)', () => {
    const value = calculateLeadValue({
      damageType: ['water'],
      urgencyLevel: 'HIGH',
      hasInsurance: true,
    });
    expect(Number.isInteger(value)).toBe(true);
  });
});
