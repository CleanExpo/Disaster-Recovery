/**
 * Enhanced Security Middleware
 *
 * This middleware implements comprehensive security measures:
 * - Rate limiting on sensitive endpoints
 * - Security headers
 * - Request logging
 * - Suspicious activity detection
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  applyRateLimit,
  leadCaptureRateLimiter,
  contractorInquiryRateLimiter,
  authRateLimiter,
  generalApiRateLimiter,
  isRateLimitingEnabled,
} from '@/lib/security/rate-limit';
import { logWarn, logInfo } from '@/lib/logger/helpers';

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
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
  '/forgot-password',
  '/reset-password',
];

/**
 * Rate limited endpoints configuration
 */
const RATE_LIMITED_ROUTES: Record<string, any> = {
  '/api/public/lead-capture': leadCaptureRateLimiter,
  '/api/public/contractor-inquiry': contractorInquiryRateLimiter,
  '/api/auth/signin': authRateLimiter,
  '/api/auth/signup': authRateLimiter,
  '/api/auth/forgot-password': authRateLimiter,
  '/api/auth/reset-password': authRateLimiter,
};

/**
 * Apply rate limiting if enabled
 */
async function handleRateLimiting(
  request: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  if (!isRateLimitingEnabled()) {
    // Skip rate limiting if not configured (development)
    if (process.env.NODE_ENV === 'development') {
      logWarn('Rate limiting not configured - skipping in development', { pathname });
    }
    return null;
  }

  // Check if route requires rate limiting
  const rateLimiter = RATE_LIMITED_ROUTES[pathname];
  if (rateLimiter) {
    const result = await applyRateLimit(request, rateLimiter);
    if (!result.success && result.response) {
      return result.response;
    }
  }

  // Apply general API rate limiting
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    const result = await applyRateLimit(request, generalApiRateLimiter);
    if (!result.success && result.response) {
      return result.response;
    }
  }

  return null;
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Remove server information
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');

  // Add additional security headers not in next.config.mjs
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

/**
 * Log security event for monitoring
 */
function logSecurityEvent(
  request: NextRequest,
  event: string,
  details?: Record<string, any>
): void {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to logging service via structured logger
    logInfo('Security event', {
      event,
      path: request.nextUrl.pathname,
      method: request.method,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent'),
      ...details,
    });
  }
}

/**
 * Check for suspicious patterns in request
 */
function detectSuspiciousActivity(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';

  // Detect common attack patterns
  const suspiciousPatterns = [
    /\.\.\//, // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /eval\s*\(/i, // Code injection
    /base64_decode/i, // Obfuscation
    /%00/, // Null byte injection
    /\.\.\\/i, // Path traversal
  ];

  const fullUrl = request.nextUrl.toString();

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(pathname) || pattern.test(fullUrl)) {
      logSecurityEvent(request, 'suspicious_pattern_detected', {
        pattern: pattern.toString(),
        url: fullUrl,
      });
      return true;
    }
  }

  // Detect suspicious user agents
  const suspiciousAgents = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /acunetix/i,
  ];

  for (const agent of suspiciousAgents) {
    if (agent.test(userAgent)) {
      logSecurityEvent(request, 'suspicious_user_agent', {
        userAgent,
      });
      return true;
    }
  }

  return false;
}

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect and block suspicious activity
  if (detectSuspiciousActivity(request)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  // Apply rate limiting
  const rateLimitResponse = await handleRateLimiting(request, pathname);
  if (rateLimitResponse) {
    return addSecurityHeaders(rateLimitResponse);
  }

  // Check if the current path is a public route
  if (PUBLIC_ROUTES.includes(pathname)) {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Check if the current path is an auth route
  if (pathname.startsWith('/api/auth/')) {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Check if the current path is a public API route
  if (pathname.startsWith('/api/public/')) {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Check if the current path is a dashboard route
  if (pathname.startsWith('/dashboard')) {
    // For dashboard routes, we'll let the client-side handle authentication
    // The AuthContext will redirect unauthenticated users
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // For all other routes, allow access with security headers
  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

/**
 * Middleware configuration
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
