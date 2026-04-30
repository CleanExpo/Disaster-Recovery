/**
 * Unit tests for src/lib/sitemap-generator.ts
 *
 * Generates a programmatic sitemap covering core pages, ~20 services
 * × cities, knowledge categories, and cost guides. We pin the
 * generator output (priority + changefreq + URL shape) and the XML
 * serialiser format.
 */

import { describe, it, expect } from 'vitest';
import {
  generateSitemapEntries,
  generateSitemapXML,
  generateSitemapIndex,
} from '../sitemap-generator';

describe('generateSitemapEntries', () => {
  const entries = generateSitemapEntries();

  it('returns a non-empty array', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('includes the homepage with priority 1.0', () => {
    const home = entries.find((e) => e.url.endsWith('/'));
    expect(home).toBeDefined();
    expect(home!.priority).toBe(1.0);
  });

  it('every entry has a valid lastmod (ISO YYYY-MM-DD)', () => {
    for (const e of entries) {
      expect(e.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('every priority is in the [0, 1] range', () => {
    for (const e of entries) {
      expect(e.priority).toBeGreaterThanOrEqual(0);
      expect(e.priority).toBeLessThanOrEqual(1);
    }
  });

  it('every changefreq is one of the allowed enum values', () => {
    const allowed = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
    for (const e of entries) {
      expect(allowed.has(e.changefreq), `bad changefreq: ${e.changefreq}`).toBe(true);
    }
  });

  it('includes the canonical /services/water-damage-restoration page', () => {
    expect(entries.some((e) => e.url.endsWith('/services/water-damage-restoration'))).toBe(true);
  });

  it('includes a /locations/sydney entry', () => {
    expect(entries.some((e) => e.url.endsWith('/locations/sydney'))).toBe(true);
  });

  it('every URL is absolute (starts with http)', () => {
    for (const e of entries) {
      expect(e.url.startsWith('http')).toBe(true);
    }
  });
});

describe('generateSitemapXML', () => {
  it('emits an XML declaration + urlset root', () => {
    const xml = generateSitemapXML([
      {
        url: 'https://example.com/',
        lastmod: '2026-04-30',
        changefreq: 'daily',
        priority: 1.0,
      },
    ]);
    expect(xml).toMatch(/^<\?xml version="1.0"/);
    expect(xml).toMatch(/<urlset[^>]*>/);
    expect(xml).toMatch(/<\/urlset>$/);
  });

  it('renders one <url> block per entry with all four fields', () => {
    const xml = generateSitemapXML([
      {
        url: 'https://example.com/a',
        lastmod: '2026-04-30',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://example.com/b',
        lastmod: '2026-04-30',
        changefreq: 'monthly',
        priority: 0.6,
      },
    ]);
    const urlBlocks = xml.match(/<url>/g) ?? [];
    expect(urlBlocks.length).toBe(2);
    expect(xml).toContain('<loc>https://example.com/a</loc>');
    expect(xml).toContain('<priority>0.8</priority>');
    expect(xml).toContain('<changefreq>weekly</changefreq>');
  });
});

describe('generateSitemapIndex', () => {
  it('emits an XML sitemapindex root', () => {
    const xml = generateSitemapIndex();
    expect(xml).toMatch(/<sitemapindex[^>]*>/);
    expect(xml).toMatch(/<\/sitemapindex>$/);
  });

  it('references the four child sitemaps (main / locations / services / knowledge)', () => {
    const xml = generateSitemapIndex();
    expect(xml).toContain('sitemap-main.xml');
    expect(xml).toContain('sitemap-locations.xml');
    expect(xml).toContain('sitemap-services.xml');
    expect(xml).toContain('sitemap-knowledge.xml');
  });
});
