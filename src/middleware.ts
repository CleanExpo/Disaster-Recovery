/**
 * Global Middleware for Next.js
 *
 * Applies security headers and other global middleware to all requests
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY');

  // Enable XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Strict Transport Security (HTTPS only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdn.vercel-analytics.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https://api.stripe.com https://vitals.vercel-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy (formerly Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );

  // Additional security headers
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('X-DNS-Prefetch-Control', 'off');

  return response;
}

/**
 * Global middleware for all requests
 */
export function middleware(request: NextRequest) {
  // Create response
  let response = NextResponse.next();

  // Add security headers
  response = addSecurityHeaders(response);

  return response;
}

/**
 * Configure which routes to apply middleware to
 * Excludes static files and image optimization
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/* (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
