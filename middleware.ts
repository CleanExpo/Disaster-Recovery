import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/contractors',
    '/property-owners',
    '/help-center',
    '/support',
    '/privacy',
    '/terms',
    '/login',
    '/signup',
  ];

  // Add claim wizard routes to public routes
  const isClaimRoute = pathname.startsWith('/claim');

  // Skip security headers for static files
  const isStatic = pathname.startsWith('/_next') || pathname.startsWith('/static');
  const isApi = pathname.startsWith('/api');

  if (!isStatic) {
    // ============================================================================
    // Content Security Policy (CSP) Headers
    // ============================================================================

    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://hcaptcha.com https://*.hcaptcha.com",
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://cdn.jsdelivr.net",
      "connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
      "frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ];

    response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

    // ============================================================================
    // Additional Security Headers
    // ============================================================================

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS protection
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions policy (allow geolocation for claim wizard)
    response.headers.set(
      'Permissions-Policy',
      'geolocation=(self), microphone=(), camera=(), payment=()'
    );
  }

  // ============================================================================
  // CORS for Public APIs
  // ============================================================================

  if (isApi && pathname.startsWith('/api/public')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Check if the current path is a public route or claim route
  if (publicRoutes.includes(pathname) || isClaimRoute) {
    return response;
  }

  // Check if the current path is an auth route
  if (pathname.startsWith('/api/auth/')) {
    return response;
  }

  // Check if the current path is a dashboard route
  if (pathname.startsWith('/dashboard')) {
    // For dashboard routes, we'll let the client-side handle authentication
    // The AuthContext will redirect unauthenticated users
    return response;
  }

  // For all other routes, allow access
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
