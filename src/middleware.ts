import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAdminRole } from '@/lib/admin-constants';

// ── In-memory rate limiting (sliding window, per Edge instance) ───────────────
// Provides meaningful flood protection on public POST endpoints.
// Per-instance (not globally distributed) — acceptable for single-source abuse
// prevention. Upgrade to @upstash/ratelimit when Redis is provisioned.

const _rlStore = new Map<string, number[]>();

interface RateLimitRule {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMIT_RULES: Readonly<Record<string, RateLimitRule>> = {
  '/api/claims/submit': { windowMs: 60_000, maxRequests: 5 },
  '/api/contact/submit': { windowMs: 60_000, maxRequests: 10 },
  '/api/bookings/create': { windowMs: 60_000, maxRequests: 10 },
  // Health-check audit A9 (P2, 2026-04-26): expand rate limiting to
  // contractor onboarding (prevent fake-application spam) + voice tool
  // surface (defence-in-depth on top of HMAC auth + 5-tool whitelist).
  '/api/contractor/register': { windowMs: 3_600_000, maxRequests: 5 },
  '/api/contractor/onboarding/submit': { windowMs: 3_600_000, maxRequests: 5 },
  '/api/contractors/apply/start': { windowMs: 3_600_000, maxRequests: 10 },
  '/api/voice/widget-consent': { windowMs: 60_000, maxRequests: 20 },
  '/api/finance/referral': { windowMs: 60_000, maxRequests: 10 },
};

function checkRateLimit(
  path: string,
  ip: string,
  method: string,
): { limited: boolean; retryAfter?: number } {
  if (method !== 'POST') return { limited: false };

  const rule = RATE_LIMIT_RULES[path];
  if (!rule) return { limited: false };

  const now = Date.now();
  const windowStart = now - rule.windowMs;
  const key = `${path}:${ip}`;

  const timestamps = (_rlStore.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= rule.maxRequests) {
    const retryAfter = Math.ceil((timestamps[0] + rule.windowMs - now) / 1000);
    return { limited: true, retryAfter };
  }

  timestamps.push(now);
  _rlStore.set(key, timestamps);

  // Evict fully-expired keys periodically to prevent unbounded Map growth
  if (_rlStore.size > 0 && _rlStore.size % 200 === 0) {
    for (const [k, ts] of _rlStore) {
      if (ts[ts.length - 1] <= windowStart) _rlStore.delete(k);
    }
  }

  return { limited: false };
}

const ALLOWED_ORIGINS = [
  'https://disasterrecovery.com.au',
  'https://www.disasterrecovery.com.au',
  'https://nrpg.com.au',
  'https://www.nrpg.com.au',
  // Mobile apps will use these custom schemes (future)
  // 'disasterrecovery://',
  // 'nrpg://',
];

// Dev CORS: only the canonical Next.js dev port. Tightened from
// `localhost(:\d+)?` per audit finding A14 (P3, 2026-04-26) — wildcard ports
// allow other locally-running services (Storybook, custom dev servers) to
// piggyback on dev CORS by accident. If you genuinely need a different port,
// add it explicitly.
const DEV_ORIGIN_RE = /^https?:\/\/localhost:3000$/;

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && (ALLOWED_ORIGINS.includes(origin) || DEV_ORIGIN_RE.test(origin));

  return {
    'Access-Control-Allow-Origin': allowed ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

// GAP-044 / DR-547: Crawl-critical paths that must always be publicly accessible.
// These are excluded from the matcher below, but this guard handles edge-runtime
// scenarios where the middleware fires unexpectedly (e.g. CDN cache miss fallback).
//
// `/api/log-error` is included so client-side error telemetry never has middleware
// interference (CORS / cache-control mutation on POST) cascading into a 500 — the
// route owns its own validation and is best-effort by design.
const ALWAYS_PUBLIC = ['/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/api/log-error'];

// Known search-engine crawler user-agent fragments (GAP-044).
const CRAWLER_UA_RE = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ── Crawl-critical paths — always pass through (GAP-044) ─────────────────
  if (ALWAYS_PUBLIC.includes(path)) {
    return NextResponse.next();
  }

  // ── Search-engine crawlers — pass through on any non-API path ─────────────
  const ua = request.headers.get('user-agent') ?? '';
  if (CRAWLER_UA_RE.test(ua) && !path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // ── CORS preflight for API routes ────────────────────────────────────────
  if (path.startsWith('/api/') && request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  // ── Rate limiting on public POST endpoints ────────────────────────────────
  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const rl = checkRateLimit(path, clientIp, request.method);
  if (rl.limited) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rl.retryAfter ?? 60),
          'X-RateLimit-Limit': String(RATE_LIMIT_RULES[path]?.maxRequests ?? 10),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  // ── RBAC: protect /admin, /api/admin, /api/analytics, /contractor routes ─
  // API surfaces (/api/admin, /api/analytics) get a JSON 401/403 instead of a
  // login redirect — browsers + fetch clients both handle that cleanly, and the
  // smoke suite asserts the gate runs before the route handler.
  const isAdminPage = path.startsWith('/admin');
  const isAdminApi = path.startsWith('/api/admin');
  const isAnalyticsApi = path.startsWith('/api/analytics');
  const isContractorPage = path.startsWith('/contractor') && !path.startsWith('/api/');
  const isProtected = isAdminPage || isAdminApi || isAnalyticsApi || isContractorPage;

  if (isProtected) {
    // Safely resolve the JWT — if NEXTAUTH_SECRET is absent or token is malformed,
    // treat as unauthenticated rather than letting an uncaught error return 500.
    let token: Awaited<ReturnType<typeof getToken>> = null;
    try {
      token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
    } catch {
      token = null;
    }

    const isApi = isAdminApi || isAnalyticsApi;

    if (!token) {
      if (isApi) {
        return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
      }
      // Not authenticated — redirect browser users to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    // /admin + /api/admin additionally require an admin role
    const tokenRole =
      typeof token === 'object'
        ? ((token as Record<string, unknown>).role as string | undefined)
        : undefined;
    if ((isAdminPage || isAdminApi) && !isAdminRole(tokenRole)) {
      if (isApi) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('error', 'AccessDenied');
      return NextResponse.redirect(homeUrl);
    }
  }

  // ── Security + cache headers ──────────────────────────────────────────────
  const response = NextResponse.next();

  // Add CORS headers on all API responses
  if (path.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const cors = getCorsHeaders(origin);
    Object.entries(cors).forEach(([k, v]) => response.headers.set(k, v));
  }

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Static assets — cache for 1 year
  if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // CSS and JS — cache for 1 month
  else if (path.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  }
  // API routes — never set a default cache header from middleware. Each route
  // owns its own cache policy via NextResponse headers (e.g. next-auth's
  // /api/auth/* returns `private, no-cache, no-store`). Stomping that with
  // `public, max-age=3600` from middleware caused two production failures:
  //   (1) `/api/auth/providers`, `/api/auth/_log`, and any auth path without
  //       its own Cache-Control got CDN-cached for an hour. If a single
  //       request hit a cold function and Vercel returned an HTML error
  //       page, that HTML was served back as JSON for up to 25 hours
  //       (stale-while-revalidate=86400), surfacing as
  //       `[next-auth][error][CLIENT_FETCH_ERROR] Unexpected token '<'`
  //       on every page load and tripping lighthouse `errors-in-console`.
  //   (2) Personalised JSON (e.g. `/api/auth/providers` carrying any
  //       configuration that varies per environment) leaking across users
  //       via the shared edge cache.
  // Route handlers that genuinely want CDN caching must opt in explicitly.
  else if (path.startsWith('/api/')) {
    // No-op: do not override the route's own Cache-Control.
  }
  // HTML — short-lived with revalidation
  else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    );
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml).*)'],
};
