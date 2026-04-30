/**
 * Unit tests for src/lib/internal-links.ts
 *
 * `getRelatedPages` is the SEO link-equity router used across service,
 * guide, location, and cost pages. A regression here breaks the
 * cross-linking footer on hundreds of pages — silently, because nothing
 * crashes (it just returns []).
 */

import { describe, it, expect } from 'vitest';
import { getRelatedPages } from '../internal-links';

describe('getRelatedPages', () => {
  it('returns an empty array for an unknown slug', () => {
    expect(getRelatedPages('this-slug-matches-no-pattern-xyz')).toEqual([]);
  });

  it('returns the same shape (RelatedPage[]) for every category', () => {
    const result = getRelatedPages('water-damage');
    expect(Array.isArray(result)).toBe(true);
    for (const item of result) {
      expect(typeof item.title).toBe('string');
      expect(typeof item.href).toBe('string');
      expect(typeof item.description).toBe('string');
      expect(item.href.startsWith('/')).toBe(true);
    }
  });

  describe('damage-type pattern matching', () => {
    it('matches water-damage variants', () => {
      expect(getRelatedPages('water-damage-restoration-sydney').length).toBeGreaterThan(0);
      expect(getRelatedPages('emergency-water-damage').length).toBeGreaterThan(0);
    });

    it('matches both "mould" and the US spelling "mold"', () => {
      const ukResult = getRelatedPages('mould-remediation');
      const usResult = getRelatedPages('black-mold-removal');
      expect(ukResult.length).toBeGreaterThan(0);
      expect(usResult).toEqual(ukResult);
    });

    it('matches storm-damage AND cyclone via the storm-damage bucket', () => {
      const stormResult = getRelatedPages('storm-damage-perth');
      const cycloneResult = getRelatedPages('cyclone-recovery');
      expect(stormResult.length).toBeGreaterThan(0);
      expect(cycloneResult).toEqual(stormResult);
    });

    it('routes biohazard, trauma, and sewage to the biohazard bucket', () => {
      const a = getRelatedPages('biohazard-cleanup');
      const b = getRelatedPages('trauma-scene-cleaning');
      const c = getRelatedPages('sewage-remediation');
      expect(a.length).toBeGreaterThan(0);
      expect(b).toEqual(a);
      expect(c).toEqual(a);
    });
  });

  describe('cost-page disambiguation', () => {
    /**
     * Damage-type buckets (water-damage, fire-damage) match BEFORE the
     * cost branch, so use slugs that contain `cost` + a damage word
     * WITHOUT the compound `water-damage` / `fire-damage` token.
     */
    it('routes "cost" + "water" to cost-water', () => {
      const result = getRelatedPages('cost-of-water-extraction');
      expect(result.length).toBeGreaterThan(0);
    });

    it('routes "cost" + "fire" to cost-fire', () => {
      const result = getRelatedPages('cost-of-fire-cleanup');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('location pattern matching', () => {
    /**
     * Note: keyword-bucket checks (emergency / insurance / commercial /
     * cost / damage-types) run BEFORE location matching in
     * `getRelatedPages`. Use slugs that contain ONLY the location
     * token to confirm the city → location-* fallthrough fires.
     */
    it('matches every major AU capital via a city-only slug', () => {
      for (const city of ['sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'darwin']) {
        const result = getRelatedPages(`${city}-page`);
        expect(result.length, `expected matches for ${city}`).toBeGreaterThan(0);
      }
    });

    it('routes ACT slugs through canberra → location-canberra', () => {
      const canberra = getRelatedPages('canberra-page');
      const actSlug = getRelatedPages('act-page');
      expect(canberra.length).toBeGreaterThan(0);
      expect(actSlug).toEqual(canberra);
    });

    it('matches gold-coast as a single suburb token', () => {
      expect(getRelatedPages('gold-coast-page').length).toBeGreaterThan(0);
    });

    it('matches Auckland for NZ pages', () => {
      expect(getRelatedPages('auckland-page').length).toBeGreaterThan(0);
    });
  });

  describe('knowledge + guide fallbacks', () => {
    it('routes IICRC- and psychrometric-keyword slugs to the knowledge-base bucket', () => {
      const base = getRelatedPages('knowledge-base');
      expect(getRelatedPages('iicrc-s500-summary')).toEqual(base);
      expect(getRelatedPages('psychrometric-chart-explainer')).toEqual(base);
    });

    it('falls through to guides-general for any slug containing "guide"', () => {
      const result = getRelatedPages('insurance-claim-guide-2026');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
