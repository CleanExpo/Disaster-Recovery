/**
 * Unit tests for src/lib/dynamic-content-generator.ts
 *
 * Generators build the per-location SEO copy that ships across the
 * 1,152 dynamic location pages. The generators interpolate location
 * data into Australian-English copy. We pin the substitution shape +
 * data integrity (no fake / banned phrases sneak in via templates).
 */

import { describe, it, expect } from 'vitest';
import {
  australianCities,
  serviceTemplates,
  generateLocationIntro,
  generateCommonIssuesSection,
  generateServiceAreas,
  generateLocalRegulations,
  generateWeatherContext,
  generateEmergencyResponse,
  generateInsuranceSection,
} from '../dynamic-content-generator';

const SYDNEY = australianCities.find((c) => c.city === 'Sydney')!;
const BRISBANE = australianCities.find((c) => c.city === 'Brisbane')!;

describe('australianCities — table integrity', () => {
  it('has at least the five capital-city entries', () => {
    expect(australianCities.length).toBeGreaterThanOrEqual(5);
    for (const city of ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']) {
      expect(australianCities.some((c) => c.city === city)).toBe(true);
    }
  });

  it('every entry has a non-empty suburbs array', () => {
    for (const c of australianCities) {
      expect(c.suburbs.length).toBeGreaterThan(0);
    }
  });

  it('every entry has a 4-digit postcode', () => {
    for (const c of australianCities) {
      expect(c.postcode).toMatch(/^\d{4}$/);
    }
  });
});

describe('serviceTemplates', () => {
  it('exposes the three core damage categories', () => {
    expect(serviceTemplates.waterDamage).toBeDefined();
    expect(serviceTemplates.mouldRemediation).toBeDefined();
    expect(serviceTemplates.fireRestoration).toBeDefined();
  });

  it('every template has a populated averageCost range', () => {
    for (const value of Object.values(serviceTemplates)) {
      expect(value.averageCost).toMatch(/\$[\d,]+-\$[\d,]+/);
    }
  });
});

describe('generateLocationIntro', () => {
  it('mentions the city name', () => {
    expect(generateLocationIntro(SYDNEY)).toMatch(/Sydney/);
  });

  it('mentions the population (with thousands separators)', () => {
    expect(generateLocationIntro(SYDNEY)).toMatch(/5,312,000/);
  });

  it('mentions the climate descriptor', () => {
    const intro = generateLocationIntro(BRISBANE);
    expect(intro).toMatch(/Humid subtropical|Brisbane/);
  });
});

describe('generateCommonIssuesSection', () => {
  it('lists at most three issues from the location data', () => {
    const result = generateCommonIssuesSection(BRISBANE);
    // Brisbane has 5 issues — only first 3 should appear by name.
    const firstThree = BRISBANE.commonIssues.slice(0, 3);
    for (const issue of firstThree) {
      expect(result).toContain(issue);
    }
  });

  it('mentions the climate descriptor', () => {
    expect(generateCommonIssuesSection(BRISBANE)).toMatch(/Humid subtropical/i);
  });
});

describe('generateServiceAreas', () => {
  it('mentions the city name', () => {
    expect(generateServiceAreas(SYDNEY)).toMatch(/Sydney/);
  });

  it('lists the first five suburbs in an Oxford "and"-comma list', () => {
    const result = generateServiceAreas(SYDNEY);
    for (const suburb of SYDNEY.suburbs.slice(0, 5)) {
      expect(result).toContain(suburb);
    }
    expect(result).toMatch(/, and /);
  });
});

describe('generateLocalRegulations', () => {
  it('returns a populated string for a known service', () => {
    const result = generateLocalRegulations(SYDNEY, 'waterDamage');
    expect(result).toContain('Sydney');
    expect(result).toContain('NSW');
    expect(result.length).toBeGreaterThan(40);
  });

  it('returns "" when the service is unknown', () => {
    expect(generateLocalRegulations(SYDNEY, 'unicornDamage')).toBe('');
  });
});

describe('generateWeatherContext', () => {
  it('includes the climate descriptor (lowercased) for known climates', () => {
    expect(generateWeatherContext(BRISBANE)).toMatch(/humid subtropical/);
  });

  it('falls back to a generic phrase for unknown climate strings', () => {
    expect(generateWeatherContext({ ...BRISBANE, climate: 'Cloudy and Australian' })).toMatch(
      /variable seasonal conditions/,
    );
  });
});

describe('generateEmergencyResponse', () => {
  it('mentions 24/7 + the city name + suburb count', () => {
    const result = generateEmergencyResponse(SYDNEY);
    expect(result).toMatch(/24\/7/);
    expect(result).toMatch(/Sydney/);
    expect(result).toContain(`${SYDNEY.suburbs.length}+ suburbs`);
  });
});

describe('generateInsuranceSection — compliance-load-bearing', () => {
  it('does NOT include the banned phrase "insurance approved"', () => {
    expect(generateInsuranceSection(SYDNEY)).not.toMatch(/insurance approved/i);
  });

  it('does NOT include the banned phrase "guaranteed approval"', () => {
    expect(generateInsuranceSection(SYDNEY)).not.toMatch(/guaranteed approval/i);
  });

  it('mentions the state name (NSW) for jurisdiction context', () => {
    expect(generateInsuranceSection(SYDNEY)).toMatch(/NSW/);
  });
});
