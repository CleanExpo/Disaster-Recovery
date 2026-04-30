/**
 * Unit tests for src/lib/guide-authors.ts
 *
 * The author records are surfaced into Article + Person JSON-LD on
 * every guide page. Drift here means malformed schema and a measurable
 * SEO regression, so we keep this thin file pinned with assertions on
 * shape + IICRC credential format.
 */

import { describe, it, expect } from 'vitest';
import {
  WATER_DAMAGE_AUTHOR,
  INSURANCE_GUIDE_AUTHOR,
  FIRE_DAMAGE_AUTHOR,
  MOULD_AUTHOR,
} from '../guide-authors';

const ALL_AUTHORS = [
  WATER_DAMAGE_AUTHOR,
  INSURANCE_GUIDE_AUTHOR,
  FIRE_DAMAGE_AUTHOR,
  MOULD_AUTHOR,
] as const;

describe('guide-authors', () => {
  it('every author has the four required fields populated', () => {
    for (const author of ALL_AUTHORS) {
      expect(typeof author.name).toBe('string');
      expect(author.name.length).toBeGreaterThan(0);
      expect(typeof author.jobTitle).toBe('string');
      expect(author.jobTitle.length).toBeGreaterThan(0);
      expect(Array.isArray(author.credentials)).toBe(true);
      expect(author.credentials!.length).toBeGreaterThan(0);
      expect(typeof author.url).toBe('string');
      expect(author.url).toMatch(/^https:\/\/disasterrecovery\.com\.au\//);
    }
  });

  it('every credential is in IICRC <token> form', () => {
    for (const author of ALL_AUTHORS) {
      for (const credential of author.credentials ?? []) {
        expect(credential).toMatch(/^IICRC [A-Z]+$/);
      }
    }
  });

  it('every author name uses the canonical NRPG editorial-team string', () => {
    for (const author of ALL_AUTHORS) {
      expect(author.name).toBe('NRPG Technical Editorial Team');
    }
  });

  it('every jobTitle starts with "IICRC-Certified"', () => {
    for (const author of ALL_AUTHORS) {
      expect(author.jobTitle.startsWith('IICRC-Certified')).toBe(true);
    }
  });

  it('insurance author advertises IICRC FSRT alongside WRT + ASD', () => {
    expect(INSURANCE_GUIDE_AUTHOR.credentials).toContain('IICRC FSRT');
    expect(INSURANCE_GUIDE_AUTHOR.credentials).toContain('IICRC WRT');
    expect(INSURANCE_GUIDE_AUTHOR.credentials).toContain('IICRC ASD');
  });

  it('mould author carries the IICRC AMRT (mould remediation) credential', () => {
    expect(MOULD_AUTHOR.credentials).toContain('IICRC AMRT');
  });

  it('fire author carries the IICRC FSRT (fire & smoke) credential', () => {
    expect(FIRE_DAMAGE_AUTHOR.credentials).toContain('IICRC FSRT');
  });
});
