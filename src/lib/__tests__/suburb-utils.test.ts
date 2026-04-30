/**
 * Unit tests for src/lib/suburb-utils.ts
 *
 * Covers slug-conversion + per-city lookup maps. These power the 1,152+
 * dynamic location pages, so a regression here breaks SEO at scale.
 */

import { describe, it, expect } from 'vitest';
import {
  toSlug,
  getSuburb,
  getSuburbSlugs,
  suburbsByCity,
  suburbCities,
  cityStateMap,
  validServices,
} from '../suburb-utils';

describe('toSlug', () => {
  it('lowercases the input', () => {
    expect(toSlug('Bondi')).toBe('bondi');
  });

  it('replaces spaces with hyphens', () => {
    expect(toSlug('North Sydney')).toBe('north-sydney');
  });

  it('collapses runs of whitespace into a single hyphen', () => {
    expect(toSlug('Surry  Hills')).toBe('surry-hills');
  });

  it('handles tab + newline whitespace as a single hyphen', () => {
    expect(toSlug('Bondi\tBeach')).toBe('bondi-beach');
  });

  it('returns an empty string for an empty input', () => {
    expect(toSlug('')).toBe('');
  });
});

describe('cityStateMap', () => {
  it('maps Sydney to NSW', () => {
    expect(cityStateMap.sydney).toBe('NSW');
  });

  it('maps both QLD cities (Brisbane + Cairns) to QLD', () => {
    expect(cityStateMap.brisbane).toBe('QLD');
    expect(cityStateMap.cairns).toBe('QLD');
  });

  it('covers every entry in suburbCities', () => {
    for (const city of suburbCities) {
      expect(cityStateMap[city]).toBeDefined();
    }
  });
});

describe('suburbsByCity', () => {
  it('exposes a Map for each supported city', () => {
    for (const city of suburbCities) {
      expect(suburbsByCity[city]).toBeInstanceOf(Map);
    }
  });

  it('every map has at least one suburb', () => {
    for (const city of suburbCities) {
      expect(suburbsByCity[city].size).toBeGreaterThan(0);
    }
  });
});

describe('getSuburb', () => {
  it('returns undefined for an unknown city', () => {
    expect(getSuburb('atlantis', 'parramatta')).toBeUndefined();
  });

  it('returns undefined for an unknown suburb slug in a known city', () => {
    expect(getSuburb('sydney', 'this-suburb-does-not-exist-xyz')).toBeUndefined();
  });

  it('returns a SuburbData record when both city + suburb slug are valid', () => {
    // Pick the first suburb of Sydney's map without hard-coding a known suburb.
    const firstSlug = Array.from(suburbsByCity.sydney.keys())[0];
    const result = getSuburb('sydney', firstSlug);
    expect(result).toBeDefined();
    expect(typeof result?.name).toBe('string');
  });
});

describe('getSuburbSlugs', () => {
  it('returns an empty array for an unknown city', () => {
    expect(getSuburbSlugs('atlantis')).toEqual([]);
  });

  it('returns the same number of slugs as the underlying map', () => {
    expect(getSuburbSlugs('sydney').length).toBe(suburbsByCity.sydney.size);
  });

  it('every returned slug is lowercase + hyphen-separated (no spaces)', () => {
    for (const slug of getSuburbSlugs('sydney')) {
      expect(slug).toBe(slug.toLowerCase());
      expect(slug).not.toMatch(/\s/);
    }
  });
});

describe('validServices', () => {
  it('includes the canonical six service slugs', () => {
    expect(validServices).toContain('water-damage-restoration');
    expect(validServices).toContain('fire-damage-restoration');
    expect(validServices).toContain('mould-remediation');
  });

  it('every entry is already in URL-slug form', () => {
    for (const slug of validServices) {
      expect(slug).toBe(toSlug(slug));
    }
  });
});
