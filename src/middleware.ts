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

/**
 * Canonical path for access-control decisions: percent-decoded (repeatedly,
 * so `%2563` cannot hide a segment), backslashes and repeated slashes
 * collapsed, dot segments resolved, lower-cased, trailing slash removed.
 * Decoded characters are kept (not re-encoded) so lookalike folding sees
 * them. Returns null when the path cannot be decoded — callers must reject it.
 */
export function canonicalPath(raw: string): string | null {
  let p = raw;
  try {
    for (let i = 0; i < 5 && /%[0-9a-f]{2}/i.test(p); i++) p = decodeURIComponent(p);
  } catch {
    return null;
  }
  if (/%[0-9a-f]{2}/i.test(p)) return null;
  const segments: string[] = [];
  for (const segment of p.replace(/\\/g, '/').split('/')) {
    if (segment === '' || segment === '.') continue;
    if (segment === '..') segments.pop();
    else segments.push(segment);
  }
  return `/${segments.join('/')}`.toLowerCase();
}

// Cyrillic/Greek letters that render like the Latin letters used in the
// protected prefixes. A fast path only: the non-ASCII rule in classifyPath is
// what makes lookalike handling complete.
const CONFUSABLES: Readonly<Record<string, string>> = {
  а: 'a',
  е: 'e',
  о: 'o',
  р: 'p',
  с: 'c',
  і: 'i',
  ѕ: 's',
  у: 'y',
  х: 'x',
  ο: 'o',
  α: 'a',
  ι: 'i',
  ν: 'v',
  ρ: 'p',
};

const CONFUSABLE_RE = /[аеорсіѕухοαινρ]/g;
const NON_ASCII_RE = /[^\x00-\x7f]/;

export interface Classification {
  /** Path used for namespace matching (never used to serve the request). */
  kpath: string;
  /**
   * True when a namespace-deciding segment (the first, and for /api/* also
   * the second) contains any non-ASCII code point after NFKC. No real route
   * has one, so such requests are treated as protected and fail closed.
   */
  nonAsciiNamespace: boolean;
  /** True when the first segment is, or resembles, a contractor namespace. */
  contractorLike: boolean;
}

/**
 * Code-point skeleton match: equal length, and every character either equals
 * the target's or is non-ASCII (an unknown lookalike). Picks the login page
 * for a fail-closed redirect only; never grants access.
 */
function resembles(segment: string, target: string): boolean {
  const chars = Array.from(segment);
  return (
    chars.length === target.length &&
    chars.every((ch, i) => ch === target[i] || NON_ASCII_RE.test(ch))
  );
}

/**
 * CLASSIFICATION ONLY — the request URL is never rewritten.
 * Cuts each segment at its first ';' (matrix parameters), re-resolves dot
 * segments, then folds with NFKC, lower-case and the confusables map.
 */
export function classifyPath(canonical: string): Classification {
  const segments: string[] = [];
  for (const raw of canonical.split('/')) {
    const segment = raw.split(';')[0].normalize('NFKC').toLowerCase();
    if (segment === '' || segment === '.') continue;
    if (segment === '..') segments.pop();
    else segments.push(segment);
  }
  const deciding = segments[0] === 'api' ? segments.slice(0, 2) : segments.slice(0, 1);
  const nonAsciiNamespace = deciding.some((segment) => NON_ASCII_RE.test(segment));
  const folded = segments.map((segment) =>
    segment.replace(CONFUSABLE_RE, (ch) => CONFUSABLES[ch] ?? ch),
  );
  const first = segments[0] ?? '';
  const contractorLike =
    (folded[0] ?? '').startsWith('contractor') ||
    resembles(first, 'contractor') ||
    resembles(first, 'contractor-portal');
  return { kpath: `/${folded.join('/')}`, nonAsciiNamespace, contractorLike };
}

/** Segment-boundary match: `/contractor` and `/contractor/x`, never `/contractors`. */
function inNamespace(path: string, namespace: string): boolean {
  return path === namespace || path.startsWith(`${namespace}/`);
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cpath = canonicalPath(path);
  if (cpath === null) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const { kpath, nonAsciiNamespace, contractorLike } = classifyPath(cpath);

  if (ALWAYS_PUBLIC.includes(cpath)) {
    return NextResponse.next();
  }

  // Lookalike namespace (non-ASCII deciding segment): no real route exists,
  // so fail closed before anything else, with or without a session.
  if (nonAsciiNamespace) {
    if (kpath.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
    const loginUrl = new URL(contractorLike ? '/contractor/login' : '/login', request.url);
    loginUrl.searchParams.set('reason', 'session_expired');
    return NextResponse.redirect(loginUrl);
  }

  // Access decisions use the classification path so case, encoding, slash,
  // dot-segment, matrix-parameter and lookalike variants cannot escape the
  // guard. The explicit public allow-list is applied before the protected
  // namespaces.
  const isAdminPage = inNamespace(kpath, '/admin');
  const isAdminApi = inNamespace(kpath, '/api/admin');
  const isAnalyticsApi = inNamespace(kpath, '/api/analytics');
  const isAccountPage = inNamespace(kpath, '/account');
  const isPublicContractorPage =
    PUBLIC_CONTRACTOR_PATHS.has(kpath) || kpath.startsWith('/contractor/activate/');
  const isContractorPage =
    (inNamespace(kpath, '/contractor') || inNamespace(kpath, '/contractor-portal')) &&
    !isPublicContractorPage;
  const isProtected =
    isAdminPage || isAdminApi || isAnalyticsApi || isContractorPage || isAccountPage;

  // Crawler shortcut only for unprotected pages: the User-Agent header is
  // client-controlled and must never bypass authentication.
  const ua = request.headers.get('user-agent') ?? '';
  if (!isProtected && CRAWLER_UA_RE.test(ua) && !kpath.startsWith('/api/')) {
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

  const rl = checkRateLimit(cpath, clientIp, request.method);
  if (rl.limited) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rl.retryAfter ?? 60),
          'X-RateLimit-Limit': String(RATE_LIMIT_RULES[cpath]?.maxRequests ?? 10),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  if (isProtected) {
    const session = await getCookieSession(request);
    const isApi = isAdminApi || isAnalyticsApi;

    if (!session) {
      if (isApi) {
        return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
      }
      const loginUrl = new URL(isContractorPage ? '/contractor/login' : '/login', request.url);
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
    // No-op: do not override the route's own Cache-Control. A prior blanket
    // Cache-Control here cached /api/auth/* responses for 25 hours, which broke
    // next-auth in production with CLIENT_FETCH_ERROR (fixed in #298). If someone
    // "cleans up" this comment, the middleware-cache-policy regression guard
    // fails LOUD — that is intentional.
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
