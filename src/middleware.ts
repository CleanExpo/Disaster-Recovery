import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_COOKIE, verifySessionToken } from '@/lib/auth/session';
import { isAdminRole, isContractorRole, dashboardPathForRole } from '@/lib/auth/roles';

// ── In-memory rate limiting (sliding window, per Edge instance) ───────────────
const _rlStore = new Map<string, number[]>();

interface RateLimitRule {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMIT_RULES: Readonly<Record<string, RateLimitRule>> = {
  '/api/claims/submit': { windowMs: 60_000, maxRequests: 5 },
  '/api/contact/submit': { windowMs: 60_000, maxRequests: 10 },
  '/api/bookings/create': { windowMs: 60_000, maxRequests: 10 },
  '/api/contractor/register': { windowMs: 3_600_000, maxRequests: 5 },
  '/api/contractor/onboarding/submit': { windowMs: 3_600_000, maxRequests: 5 },
  '/api/contractors/apply/start': { windowMs: 3_600_000, maxRequests: 10 },
  '/api/voice/widget-consent': { windowMs: 60_000, maxRequests: 20 },
  '/api/finance/referral': { windowMs: 60_000, maxRequests: 10 },
  '/api/auth/login': { windowMs: 60_000, maxRequests: 10 },
  '/api/auth/forgot-password': { windowMs: 60_000, maxRequests: 5 },
  '/api/auth/signup': { windowMs: 60_000, maxRequests: 5 },
  '/api/contractor/login': { windowMs: 60_000, maxRequests: 10 },
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
];

const DEV_ORIGIN_RE = /^https?:\/\/localhost:3000$/;

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && (ALLOWED_ORIGINS.includes(origin) || DEV_ORIGIN_RE.test(origin));

  return {
    'Access-Control-Allow-Origin': allowed ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Authorisation, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

const ALWAYS_PUBLIC = ['/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/api/log-error'];
const PUBLIC_CONTRACTOR_PATHS = new Set([
  '/contractor',
  '/contractor/apply',
  '/contractor/login',
  '/contractor/forgot-password',
  '/contractor/application-success',
  '/contractor/activate',
  '/contractor/onboarding/payment-success',
]);

const CRAWLER_UA_RE = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i;

async function getCookieSession(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    const claims = await verifySessionToken(token);
    if (!claims || claims.typ === 'refresh') return null;
    return claims;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (ALWAYS_PUBLIC.includes(path)) {
    return NextResponse.next();
  }

  const ua = request.headers.get('user-agent') ?? '';
  if (CRAWLER_UA_RE.test(ua) && !path.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (path.startsWith('/api/') && request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

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

  const isAdminPage = path.startsWith('/admin');
  const isAdminApi = path.startsWith('/api/admin');
  const isAnalyticsApi = path.startsWith('/api/analytics');
  const isAccountPage = path.startsWith('/account');
  const isPublicContractorPage =
    PUBLIC_CONTRACTOR_PATHS.has(path) || path.startsWith('/contractor/activate/');
  const isContractorPage =
    path.startsWith('/contractor') && !path.startsWith('/api/') && !isPublicContractorPage;
  const isProtected =
    isAdminPage || isAdminApi || isAnalyticsApi || isContractorPage || isAccountPage;

  if (isProtected) {
    const session = await getCookieSession(request);
    const isApi = isAdminApi || isAnalyticsApi;

    if (!session) {
      if (isApi) {
        return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
      }
      const loginUrl = new URL(
        isContractorPage ? '/contractor/login' : '/login',
        request.url,
      );
      loginUrl.searchParams.set('callbackUrl', path);
      loginUrl.searchParams.set('reason', 'session_expired');
      return NextResponse.redirect(loginUrl);
    }

    if ((isAdminPage || isAdminApi) && !isAdminRole(session.role)) {
      if (isApi) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL(dashboardPathForRole(session.role), request.url));
    }

    if (isContractorPage && !isContractorRole(session.role) && !isAdminRole(session.role)) {
      return NextResponse.redirect(new URL(dashboardPathForRole(session.role), request.url));
    }

    if (isAccountPage && isAdminRole(session.role)) {
      // Admins landing on /account go to admin console
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    if (isAccountPage && isContractorRole(session.role)) {
      return NextResponse.redirect(new URL('/contractor/portal', request.url));
    }
  }

  const response = NextResponse.next();

  if (path.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const cors = getCorsHeaders(origin);
    Object.entries(cors).forEach(([k, v]) => response.headers.set(k, v));
  }

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (path.match(/\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  } else if (path.startsWith('/api/')) {
    // No-op: do not override the route's own Cache-Control.
  } else {
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
