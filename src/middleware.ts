import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com;
  `.replace(/\n/g, '').trim()
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // Max requests per window
const API_RATE_LIMIT = 30; // Stricter limit for API routes

function getClientIdentifier(request: NextRequest): string {
  // Use IP address as identifier (in production, consider using forwarded headers)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

function checkRateLimit(
  identifier: string,
  maxRequests: number = RATE_LIMIT_MAX_REQUESTS
): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Get client identifier
  const clientId = getClientIdentifier(request);
  const pathname = request.nextUrl.pathname;

  // Check if this is an API route
  const isApiRoute = pathname.startsWith('/api/');
  
  // Apply rate limiting
  const maxRequests = isApiRoute ? API_RATE_LIMIT : RATE_LIMIT_MAX_REQUESTS;
  
  if (!checkRateLimit(clientId, maxRequests)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString()
      }
    });
  }

  // Protected routes authentication check
  const protectedPaths = [
    '/admin',
    '/dashboard',
    '/contractor/dashboard',
    '/api/admin',
    '/api/contractor/protected'
  ];

  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected) {
    const token = await getToken({ req: request });
    
    if (!token) {
      if (isApiRoute) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
      
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Add request timing header for performance monitoring
  response.headers.set('X-Response-Time', Date.now().toString());

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimisation files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};