/**
 * Unit tests for src/lib/contractor-matching.ts
 *
 * The matching helpers decide which contractors can be offered a job.
 * A regression here either over-matches (assigning unqualified
 * contractors) or under-matches (no offer). Both are silent prod
 * failure modes, so we pin the pure helpers tightly.
 */

import { describe, it, expect } from 'vitest';
import {
  calculateDistanceKm,
  getRadiusCoverageKm,
  contractorCoversDistance,
  getRequiredCertifications,
  contractorIsQualified,
  OFFER_TIMEOUT_MINUTES,
} from '../contractor-matching';

describe('OFFER_TIMEOUT_MINUTES', () => {
  it('is exported as 30 (half-hour offer window)', () => {
    expect(OFFER_TIMEOUT_MINUTES).toBe(30);
  });
});

describe('calculateDistanceKm — Haversine', () => {
  it('returns 0 for identical points', () => {
    expect(calculateDistanceKm(-27.4698, 153.0251, -27.4698, 153.0251)).toBe(0);
  });

  it('Brisbane CBD → Sydney CBD is ~730 km within 5% tolerance', () => {
    // Brisbane CBD (-27.4698, 153.0251) → Sydney CBD (-33.8688, 151.2093)
    const km = calculateDistanceKm(-27.4698, 153.0251, -33.8688, 151.2093);
    expect(km).toBeGreaterThan(720);
    expect(km).toBeLessThan(770);
  });

  it('Brisbane CBD → Gold Coast (~70 km) within 5% tolerance', () => {
    const km = calculateDistanceKm(-27.4698, 153.0251, -28.0167, 153.4);
    expect(km).toBeGreaterThan(65);
    expect(km).toBeLessThan(80);
  });

  it('is symmetric (a→b == b→a)', () => {
    const ab = calculateDistanceKm(-27.4698, 153.0251, -33.8688, 151.2093);
    const ba = calculateDistanceKm(-33.8688, 151.2093, -27.4698, 153.0251);
    expect(ab).toBeCloseTo(ba, 6);
  });
});

describe('getRadiusCoverageKm', () => {
  it('25km tier returns 28 (small buffer)', () => {
    expect(getRadiusCoverageKm('25km')).toBe(28);
  });

  it('50km tier returns 53 (small buffer)', () => {
    expect(getRadiusCoverageKm('50km')).toBe(53);
  });

  it('100km tier returns 100 (no buffer)', () => {
    expect(getRadiusCoverageKm('100km')).toBe(100);
  });

  it("rural tier returns the contractor's maxKmRadius when provided", () => {
    expect(getRadiusCoverageKm('rural', 350)).toBe(350);
  });

  it('rural tier falls back to 200 when maxKmRadius is unset', () => {
    expect(getRadiusCoverageKm('rural')).toBe(200);
    expect(getRadiusCoverageKm('rural', null)).toBe(200);
  });

  it('returns 0 for an unknown tier', () => {
    expect(getRadiusCoverageKm('moon')).toBe(0);
  });
});

describe('contractorCoversDistance', () => {
  it('returns false when serviceRadiusTier is null (no purchase)', () => {
    expect(contractorCoversDistance({ serviceRadiusTier: null, maxKmRadius: null }, 10)).toBe(
      false,
    );
  });

  it('25km tier covers a 27 km job (under buffer)', () => {
    expect(contractorCoversDistance({ serviceRadiusTier: '25km', maxKmRadius: null }, 27)).toBe(
      true,
    );
  });

  it('25km tier does not cover a 30 km job (above buffer)', () => {
    expect(contractorCoversDistance({ serviceRadiusTier: '25km', maxKmRadius: null }, 30)).toBe(
      false,
    );
  });

  it('rural tier with maxKmRadius=300 covers a 250 km job', () => {
    expect(contractorCoversDistance({ serviceRadiusTier: 'rural', maxKmRadius: 300 }, 250)).toBe(
      true,
    );
  });
});

describe('getRequiredCertifications', () => {
  it('Water damage requires S500', () => {
    expect(getRequiredCertifications('Water damage')).toEqual(['S500']);
  });

  it('Mould requires S520', () => {
    expect(getRequiredCertifications('Mould')).toEqual(['S520']);
  });

  it('Structural Drying requires S500 + WRT + ASD + CDS', () => {
    expect(getRequiredCertifications('Structural Drying')).toEqual(['S500', 'WRT', 'ASD', 'CDS']);
  });

  it('lookup is case-insensitive (e.g. "MOULD" resolves)', () => {
    expect(getRequiredCertifications('MOULD')).toEqual(['S520']);
  });

  it('returns an empty array for an unknown job type', () => {
    expect(getRequiredCertifications('Wormholes')).toEqual([]);
  });
});

describe('contractorIsQualified', () => {
  it('returns true when no certifications are required (vacuous)', () => {
    expect(contractorIsQualified(['S500'], [])).toBe(true);
  });

  it('returns true when contractor holds every required cert', () => {
    expect(contractorIsQualified(['S500', 'S520', 'WRT'], ['S500'])).toBe(true);
  });

  it('returns false when even one required cert is missing', () => {
    expect(contractorIsQualified(['S500'], ['S500', 'S520'])).toBe(false);
  });

  it('comparison is case-insensitive on both sides', () => {
    expect(contractorIsQualified(['s500', 'wrt'], ['S500', 'WRT'])).toBe(true);
  });
});
