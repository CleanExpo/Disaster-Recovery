/**
 * Unit tests for src/lib/consistency-engine.ts
 *
 * Pins the ConsistencyValidator behaviour and the orchestration shape
 * of `enhanceConsistency`. The validator is used by the QA harness to
 * flag drift between rendered pages and the brand standards table —
 * a regression here means the harness silently passes broken pages.
 */

import { describe, it, expect } from 'vitest';
import {
  ConsistencyValidator,
  enhanceConsistency,
  VISUAL_STANDARDS,
  WRITING_STYLE,
} from '../consistency-engine';

const validator = new ConsistencyValidator();

const validVisual = {
  color: VISUAL_STANDARDS.colors.primary.disaster,
  font: VISUAL_STANDARDS.typography.fonts.heading,
  spacing: VISUAL_STANDARDS.spacing.md,
};

describe('ConsistencyValidator.validateVisuals', () => {
  it('returns no issues for a fully-valid component', () => {
    expect(validator.validateVisuals(validVisual)).toEqual([]);
  });

  it('flags an unknown colour', () => {
    const issues = validator.validateVisuals({ ...validVisual, color: '#000000' });
    expect(issues.some((i) => i.includes('Invalid color'))).toBe(true);
  });

  it('flags an unknown font', () => {
    const issues = validator.validateVisuals({ ...validVisual, font: 'Comic Sans' });
    expect(issues.some((i) => i.includes('Invalid font'))).toBe(true);
  });

  it('flags an unknown spacing token', () => {
    const issues = validator.validateVisuals({ ...validVisual, spacing: '999rem' });
    expect(issues.some((i) => i.includes('Invalid spacing'))).toBe(true);
  });

  it('accepts semantic colours alongside primary brand colours', () => {
    expect(
      validator.validateVisuals({
        ...validVisual,
        color: VISUAL_STANDARDS.colors.semantic.success,
      }),
    ).toEqual([]);
  });
});

describe('ConsistencyValidator.validateContent', () => {
  // Composed string covering every required signal: tone (professional + empathetic),
  // ≥2 of WRITING_STYLE.content.keywords.primary, and length within 40-500 words.
  const PRIMARY_KEYWORDS = WRITING_STYLE.content.keywords.primary as readonly string[];

  function compose(extra = ''): string {
    const base =
      'Our certified team understands the urgency of every disaster recovery ' +
      'job in Australia. We help you with professional 24/7 support and care ' +
      'about your outcome. We bring trusted expertise and experienced operators ' +
      'to every assessment, from initial scoping through completion.';
    // Pad to exceed the 40-word floor so length validation is satisfied.
    const padding = ` ${extra} ${'restoration claim assessment '.repeat(10)}`;
    return base + padding;
  }

  it('returns no issues for a valid piece of content', () => {
    expect(validator.validateContent(compose())).toEqual([]);
  });

  it('contains the >=2 required primary keywords', () => {
    const text = compose().toLowerCase();
    const hits = PRIMARY_KEYWORDS.filter((k) => text.includes(k.toLowerCase())).length;
    expect(hits).toBeGreaterThanOrEqual(2);
  });

  it('flags content that is too short', () => {
    const issues = validator.validateContent('Too short.');
    expect(issues.some((i) => i.includes('length'))).toBe(true);
  });

  it('flags content lacking the required tone (no professional + empathetic words)', () => {
    const text =
      'this is just generic filler text that has none of the brand signals ' +
      'whatsoever and exists only to satisfy the length floor of forty words ' +
      'so that the tone branch is what fails first; nothing else here matters.';
    const issues = validator.validateContent(text);
    expect(issues.some((i) => i.toLowerCase().includes('tone'))).toBe(true);
  });
});

describe('ConsistencyValidator.validateLinks', () => {
  it('flags pages with fewer than 3 internal links', () => {
    const issues = validator.validateLinks({
      internalLinks: ['/a', '/b'],
      links: [{ text: 'A' }, { text: 'B' }],
    });
    expect(issues.some((i) => i.includes('Insufficient internal links'))).toBe(true);
  });

  it('flags non-descriptive anchor text (click here, more, etc.)', () => {
    const issues = validator.validateLinks({
      internalLinks: ['/a', '/b', '/c'],
      links: [{ text: 'click here' }, { text: 'A descriptive anchor' }],
    });
    expect(issues.some((i) => i.includes('click here'))).toBe(true);
  });

  it('returns no issues for a healthy link set', () => {
    expect(
      validator.validateLinks({
        internalLinks: ['/a', '/b', '/c'],
        links: [
          { text: 'Brisbane water-damage costs' },
          { text: 'IICRC-certified contractor list' },
          { text: '24/7 emergency response' },
        ],
      }),
    ).toEqual([]);
  });
});

describe('enhanceConsistency', () => {
  it('returns visual issues + standards + recommendations for "visual"', () => {
    const result = enhanceConsistency('visual', validVisual);
    expect(result).toBeDefined();
    expect(result!.standards).toBe(VISUAL_STANDARDS);
    expect(Array.isArray((result as { issues: string[] }).issues)).toBe(true);
    expect(Array.isArray((result as { recommendations: string[] }).recommendations)).toBe(true);
  });

  it('returns content issues + guidelines + suggestions for "content"', () => {
    const result = enhanceConsistency('content', 'Some content');
    expect((result as { guidelines: typeof WRITING_STYLE }).guidelines).toBe(WRITING_STYLE);
  });

  it('returns linking issues + strategy + opportunities for "linking"', () => {
    const result = enhanceConsistency('linking', {
      service: 'water-damage',
      internalLinks: ['/a'],
      links: [{ text: 'click here' }],
    });
    expect(result).toBeDefined();
    expect(Array.isArray((result as { issues: string[] }).issues)).toBe(true);
  });
});
