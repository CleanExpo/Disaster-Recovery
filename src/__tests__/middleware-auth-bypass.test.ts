// @vitest-environment node
/**
 * Security regression guard for src/middleware.ts.
 *
 * 1. The crawler shortcut (Googlebot etc.) ran before the auth check, so any
 *    request with a crawler User-Agent reached /admin and /contractor/* without
 *    a session. The User-Agent is client-controlled; it must never bypass auth.
 * 2. Access checks ran on the raw path, so case, percent-encoding, slash and
 *    dot-segment variants of a protected path escaped the guard.
 * 3. Unicode lookalikes (Cyrillic/Greek letters, full-width forms) of a
 *    protected prefix must fail closed, and prefix matching must respect
 *    segment boundaries so public /contractors pages stay public.
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
  ['/contractor-portal/earnings', '/contractor/login'],
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

describe('middleware — public /contractors pages stay public (segment boundary)', () => {
  it.each(['/contractors', '/contractors/apply', '/Contractors'])(
    '%s is public with a normal User-Agent',
    async (path) => {
      const res = await get(path);
      expect(res.status).toBe(200);
      expect(redirectPath(res)).toBeNull();
    },
  );

  it.each(['/contractors', '/contractors/apply'])('%s is public for Googlebot', async (path) => {
    const res = await get(path, CRAWLER_UAS[0]);
    expect(res.status).toBe(200);
    expect(redirectPath(res)).toBeNull();
  });
});

describe('middleware — Unicode lookalikes of protected prefixes fail closed', () => {
  const pages: [string, string][] = [
    ['/admin', '/login'],
    ['/%D0%B0dmin', '/login'], // Cyrillic а
    ['/%EF%BD%81dmin', '/login'], // full-width ａ (NFKC)
    ['/account', '/login'],
    ['/acc%D0%BEunt', '/login'], // Cyrillic о
    ['/contractor/portal', '/contractor/login'],
    ['/c%D0%BEntractor/portal', '/contractor/login'], // Cyrillic о
    ['/c%CE%BFntractor/portal', '/contractor/login'], // Greek ο
  ];
  const apis = [
    '/api/admin/stats',
    '/api/%D0%B0dmin/stats', // Cyrillic а
    '/api/analytics/summary',
    '/api/analyt%D1%96cs/summary', // Cyrillic і
  ];

  describe.each([
    ['normal UA', undefined],
    ['Googlebot UA', CRAWLER_UAS[0]],
  ])('%s', (_label, ua) => {
    it.each(pages)('%s redirects to %s', async (path, login) => {
      const res = await get(path, ua);
      expect(res.status).toBe(307);
      expect(redirectPath(res)).toBe(login);
    });

    it.each(apis)('%s returns 401', async (path) => {
      expect((await get(path, ua)).status).toBe(401);
    });
  });
});

// Review of 97dd451d: matrix parameters and lookalikes outside the
// confusables map must fail closed; the non-ASCII rule makes it complete.
describe('middleware — matrix parameters and any non-ASCII namespace fail closed', () => {
  const UAS: [string, string | undefined][] = [
    ['normal UA', undefined],
    ['Googlebot UA', CRAWLER_UAS[0]],
    ['bingbot UA', CRAWLER_UAS[1]],
  ];
  const pages: [string, string][] = [
    ['/admin;role=public', '/login'],
    ['/account;role=public', '/login'],
    ['/contractor;role=public/portal', '/contractor/login'],
    ['/contractor-portal;role=public/earnings', '/contractor/login'],
    ['/con%CF%84ractor/portal', '/contractor/login'], // Greek tau
    ['/acco%CF%85nt', '/login'], // Greek upsilon
    ['/%CF%B2ontractor/portal', '/contractor/login'], // Greek lunate sigma
    ['/%E2%98%83%E2%9C%93/anything', '/login'], // arbitrary non-ASCII first segment
    // ASCII originals still guarded
    ['/admin', '/login'],
    ['/account', '/login'],
    ['/contractor/portal', '/contractor/login'],
    ['/contractor-portal/earnings', '/contractor/login'],
  ];
  const apis = [
    '/api/admin;role=public/stats',
    '/api/analytics;role=public/summary',
    '/api/analy%CF%84ics/summary', // Greek tau
    '/api/%E2%98%83/stats', // arbitrary non-ASCII second segment
    '/api/admin/stats',
    '/api/analytics/summary',
  ];

  describe.each(UAS)('%s', (_label, ua) => {
    it.each(pages)('%s redirects to %s', async (path, login) => {
      const res = await get(path, ua);
      expect(res.status).toBe(307);
      expect(redirectPath(res)).toBe(login);
    });

    it.each(apis)('%s returns 401', async (path) => {
      expect((await get(path, ua)).status).toBe(401);
    });

    it.each(['/contractors', '/contractors/apply', '/contractors;ref=ad'])(
      '%s stays public',
      async (path) => {
        const res = await get(path, ua);
        expect(res.status).toBe(200);
        expect(redirectPath(res)).toBeNull();
      },
    );
  });
});
