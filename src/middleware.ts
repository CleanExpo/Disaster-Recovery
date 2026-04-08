import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAdminRole } from '@/lib/admin-constants';

const ALLOWED_ORIGINS = [
  'https://disasterrecovery.com.au',
  'https://www.disasterrecovery.com.au',
  'https://nrpg.com.au',
  'https://www.nrpg.com.au',
  // Mobile apps will use these custom schemes (future)
  // 'disasterrecovery://',
  // 'nrpg://',
];

const DEV_ORIGIN_RE = /^https?:\/\/localhost(:\d+)?$/;

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin &&
    (ALLOWED_ORIGINS.includes(origin) || DEV_ORIGIN_RE.test(origin));

  return {
    'Access-Control-Allow-Origin': allowed ? origin! : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ── CORS preflight for API routes ────────────────────────────────────────
  if (path.startsWith('/api/') && request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin),
    });
  }

  // ── RBAC: protect /admin routes ──────────────────────────────────────────
  if (path.startsWith('/admin')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Not authenticated — redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    if (!isAdminRole(token.role as string | undefined)) {
      // Authenticated but not an admin — redirect to home with error
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
  // HTML and API — short-lived with revalidation
  else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
};
