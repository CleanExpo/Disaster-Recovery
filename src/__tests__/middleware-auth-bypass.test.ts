// @vitest-environment node
/**
 * Security regression guard for src/middleware.ts.
 *
 * 1. The crawler shortcut (Googlebot etc.) ran before the auth check, so any
 *    request with a crawler User-Agent reached /admin and /contractor/* without
 *    a session. The User-Agent is client-controlled; it must never bypass auth.
 * 2. Access checks ran on the raw path, so case, percent-encoding, slash and
 *    dot-segment variants of a protected path escaped the guard.
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

const CRAWLER_UAS = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'DuckDuckBot/1.1',
];

async function get(path: string, ua?: string) {
  // Concatenate: `new URL('//x', base)` would parse `x` as a host.
  return middleware(
    new NextRequest(`https://disasterrecovery.com.au${path}`, {
      headers: ua ? { 'user-agent': ua } : {},
    }),
  );
}

function redirectPath(res: Response): string | null {
  const location = res.headers.get('location');
  return location ? new URL(location).pathname : null;
}

const PROTECTED_PAGES: [string, string][] = [
  ['/admin', '/login'],
  ['/admin/contractors', '/login'],
  ['/account', '/login'],
  ['/contractor/portal', '/contractor/login'],
  ['/contractor/dashboard', '/contractor/login'],
];
const PROTECTED_APIS = ['/api/admin/stats', '/api/analytics/summary'];

describe('middleware — spoofed crawler User-Agent cannot bypass auth', () => {
  describe.each(CRAWLER_UAS)('UA %s', (ua) => {
    it.each(PROTECTED_PAGES)('%s redirects to %s', async (path, login) => {
      const res = await get(path, ua);
      expect(res.status).toBe(307);
      expect(redirectPath(res)).toBe(login);
    });

    it.each(PROTECTED_APIS)('%s returns 401', async (path) => {
      expect((await get(path, ua)).status).toBe(401);
    });
  });

  it.each(['/', '/claim', '/contractor/login', '/guides/water-damage'])(
    'public page %s is still served to crawlers',
    async (path) => {
      const res = await get(path, CRAWLER_UAS[0]);
      expect(res.status).toBe(200);
      expect(redirectPath(res)).toBeNull();
    },
  );
});

describe('middleware — hostile path variants of protected routes', () => {
  const variants: [string, string][] = [
    ['/Admin', '/login'],
    ['/ADMIN/contractors', '/login'],
    ['/%61dmin', '/login'],
    ['/%2561dmin', '/login'],
    ['//admin', '/login'],
    ['/./admin', '/login'],
    ['/Account/settings', '/login'],
    ['/%61ccount', '/login'],
    ['/Contractor/portal', '/contractor/login'],
    ['/CONTRACTOR/PORTAL', '/contractor/login'],
    ['/contractor/Portal', '/contractor/login'],
    ['/%63ontractor/portal', '/contractor/login'],
    ['/%2563ontractor/portal', '/contractor/login'],
    ['/contractor%2Fportal', '/contractor/login'],
    ['/contractor%2fportal', '/contractor/login'],
    ['/contractor%5Cportal', '/contractor/login'],
    ['//contractor//portal', '/contractor/login'],
    ['/contractor/./portal', '/contractor/login'],
    ['/contractor/portal/', '/contractor/login'],
    ['/claim/%2E%2E/contractor/portal', '/contractor/login'],
  ];

  it.each(variants)('%s redirects to %s', async (path, login) => {
    const res = await get(path);
    expect(res.status).toBe(307);
    expect(redirectPath(res)).toBe(login);
  });

  it.each(['/API/admin/stats', '/api/%61dmin/stats', '/api//analytics/summary'])(
    'API variant %s returns 401',
    async (path) => {
      expect((await get(path)).status).toBe(401);
    },
  );

  it('undecodable paths are rejected with 400', async () => {
    expect((await get('/admin/%E0%A4%A')).status).toBe(400);
  });

  it.each(['/', '/claim', '/contractor', '/contractor/apply', '/contractor/login'])(
    'public page %s is unchanged',
    async (path) => {
      const res = await get(path);
      expect(res.status).toBe(200);
      expect(redirectPath(res)).toBeNull();
    },
  );
});
