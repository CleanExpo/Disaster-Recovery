import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers - minimal and serverless-compatible
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  
  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Image optimization headers for uploads (simplified)
  if (pathname.startsWith('/api/upload') || 
      pathname.startsWith('/api/image')) {
    response.headers.set('x-optimize-images', 'true');
  }
  
  // Add response timing for monitoring
  response.headers.set('X-Response-Time', Date.now().toString());
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};