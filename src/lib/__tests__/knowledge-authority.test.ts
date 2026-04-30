/**
 * Unit tests for src/lib/knowledge-authority.ts
 *
 * E.E.A.T support helpers used to score and translate technical
 * content. Pin the credibility scoring + the technical-to-common
 * dictionary substitutions (drift here = SEO-quality regression).
 */

import { describe, it, expect } from 'vitest';
import {
  AUTHORITATIVE_SOURCES,
  verifyInformation,
  getCredibilityScore,
  convertTechnicalToCommon,
} from '../knowledge-authority';

describe('AUTHORITATIVE_SOURCES — table integrity', () => {
  it('every entry has a credibility score in [0, 10]', () => {
    for (const source of AUTHORITATIVE_SOURCES) {
      expect(source.credibility).toBeGreaterThanOrEqual(0);
      expect(source.credibility).toBeLessThanOrEqual(10);
    }
  });

  it('includes IICRC Standards as a top-tier industry source', () => {
    const iicrc = AUTHORITATIVE_SOURCES.find((s) => s.name === 'IICRC Standards');
    expect(iicrc).toBeDefined();
    expect(iicrc!.credibility).toBe(10);
  });

  it('includes Bureau of Meteorology as a top-tier government source', () => {
    const bom = AUTHORITATIVE_SOURCES.find((s) => s.name === 'Bureau of Meteorology');
    expect(bom).toBeDefined();
    expect(bom!.type).toBe('government');
  });
});

describe('verifyInformation', () => {
  it('returns false for an empty source list', () => {
    expect(verifyInformation('any claim', [])).toBe(false);
  });

  it('returns true when at least one source matches a known authority', () => {
    expect(verifyInformation('any claim', ['IICRC Standards'])).toBe(true);
  });

  it('returns false when no source matches any known authority', () => {
    expect(verifyInformation('any claim', ['Some Random Blog'])).toBe(false);
  });

  it('returns true when at least one of multiple sources is authoritative', () => {
    expect(verifyInformation('any claim', ['Random Blog', 'IICRC Standards'])).toBe(true);
  });
});

describe('getCredibilityScore', () => {
  it('returns 0 for an empty list', () => {
    expect(getCredibilityScore([])).toBe(0);
  });

  it('returns the source credibility (rounded to 1dp) when given one source', () => {
    expect(getCredibilityScore(['IICRC Standards'])).toBe(10);
  });

  it('averages multiple sources', () => {
    // IICRC Standards = 10, RIA Guidelines = 9 → average 9.5.
    expect(getCredibilityScore(['IICRC Standards', 'RIA Guidelines'])).toBe(9.5);
  });

  it('treats unknown sources as credibility 0 (drag the average down)', () => {
    // IICRC = 10, unknown = 0 → average 5.
    expect(getCredibilityScore(['IICRC Standards', 'Unknown Source'])).toBe(5);
  });
});

describe('convertTechnicalToCommon', () => {
  it('replaces "remediation" with "cleanup and repair"', () => {
    expect(convertTechnicalToCommon('Remediation services')).toContain('cleanup and repair');
  });

  it('replaces "HEPA" (case-insensitive) with the plain-English equivalent', () => {
    expect(convertTechnicalToCommon('HEPA filter')).toContain('high-efficiency particle filter');
  });

  it('replaces multiple terms in a single sentence', () => {
    const result = convertTechnicalToCommon(
      'Microbial growth needs remediation and proper desiccant use',
    );
    expect(result).toContain('mould and bacteria growth');
    expect(result).toContain('cleanup and repair');
    expect(result).toContain('drying agent');
  });

  it('leaves untouched terms alone', () => {
    expect(convertTechnicalToCommon('water damage')).toContain('water damage');
  });

  it('lowercases the output as a side effect (current implementation)', () => {
    expect(convertTechnicalToCommon('REMEDIATION')).toBe('cleanup and repair');
  });
});
