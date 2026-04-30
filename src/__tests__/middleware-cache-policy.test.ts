/**
 * Regression-guard tests for src/middleware.ts cache-control behaviour.
 *
 * Yesterday (2026-04-29, PR #298) we fixed a 25-hour CDN-cache bug
 * where middleware's blanket `public, max-age=3600,
 * stale-while-revalidate=86400` was being applied to /api/auth/*
 * routes that didn't set their own Cache-Control, so transient HTML
 * error responses got cached as JSON for a full day. The next-auth
 * client surfaced this as `[next-auth][error][CLIENT_FETCH_ERROR]
 * Unexpected token '<'` on every page load.
 *
 * These static-analysis tests guard against the bug returning. They
 * do not mock NextRequest — they read middleware.ts as text and
 * assert structural properties.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MIDDLEWARE_PATH = resolve(__dirname, '..', 'middleware.ts');
const MIDDLEWARE = readFileSync(MIDDLEWARE_PATH, 'utf8');

describe('middleware.ts — cache-control regression guards', () => {
  describe('/api/* paths must not get a default public Cache-Control', () => {
    /**
     * The fix in PR #298 was to add an `else if (path.startsWith('/api/'))`
     * branch that explicitly does NOT set Cache-Control, AHEAD of the HTML
     * fallback that DOES set the long-cache header.
     *
     * If a future edit removes that branch, the `else` HTML rule fires
     * for /api/ paths again and we're back in the 25-hour cache bug.
     */
    it('contains an /api/ branch that explicitly skips Cache-Control', () => {
      // The exact pattern the fix introduced. Tolerate whitespace.
      expect(MIDDLEWARE).toMatch(
        /else\s+if\s*\(\s*path\.startsWith\(\s*['"]\/api\/['"]\s*\)\s*\)\s*\{[^}]*\}/,
      );
    });

    it('the /api/ branch does NOT call response.headers.set("Cache-Control", "public', () => {
      // Find the /api/ branch body and verify it doesn't set a public Cache-Control.
      const apiBranch = MIDDLEWARE.match(
        /else\s+if\s*\(\s*path\.startsWith\(\s*['"]\/api\/['"]\s*\)\s*\)\s*\{([^}]*)\}/,
      );
      expect(apiBranch).not.toBeNull();
      const body = apiBranch?.[1] ?? '';
      // Body should be a no-op or only contain comments — never a Cache-Control set.
      expect(body).not.toMatch(/Cache-Control['"]?\s*,\s*['"]public/);
    });

    it('keeps an explanatory comment naming the incident', () => {
      // Future engineers must understand WHY this branch is no-op. If
      // someone "cleans up" the comment, this test fails LOUD.
      expect(MIDDLEWARE).toMatch(/\/api\/auth/);
      expect(MIDDLEWARE).toMatch(/CLIENT_FETCH_ERROR|25-hour|25 hour/);
    });
  });

  describe('static asset cache headers — preserved', () => {
    /**
     * The bug fix REMOVED API routes from the long-cache path but did
     * NOT change the legitimate use of long caches on static assets +
     * CSS/JS. These tests assert those rules survive.
     */
    it('caches images for 1 year', () => {
      expect(MIDDLEWARE).toMatch(/jpg\|jpeg\|png\|gif\|webp\|svg\|ico/);
      expect(MIDDLEWARE).toMatch(/max-age=31536000/);
    });

    it('caches CSS + JS for 1 month', () => {
      expect(MIDDLEWARE).toMatch(/css\|js/);
      expect(MIDDLEWARE).toMatch(/max-age=2592000/);
    });
  });

  describe('security headers — always set', () => {
    /**
     * Defence in depth: we want X-Frame-Options, X-Content-Type-Options,
     * and Referrer-Policy on every response. If middleware refactors
     * accidentally drop these, this test fails.
     */
    it.each([
      ['X-Frame-Options', /X-Frame-Options['"]?\s*,\s*['"]DENY/],
      ['X-Content-Type-Options', /X-Content-Type-Options['"]?\s*,\s*['"]nosniff/],
      ['Referrer-Policy', /Referrer-Policy['"]?\s*,\s*['"]strict-origin-when-cross-origin/],
    ])('sets %s', (_name, pattern) => {
      expect(MIDDLEWARE).toMatch(pattern);
    });
  });
});
