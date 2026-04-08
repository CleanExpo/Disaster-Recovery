import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAdminRole } from '@/lib/admin-constants';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

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
