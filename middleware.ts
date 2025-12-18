import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
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

  // Check if the current path is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the current path is an auth route
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Check if the current path is a dashboard route
  if (pathname.startsWith('/dashboard')) {
    // For dashboard routes, we'll let the client-side handle authentication
    // The AuthContext will redirect unauthenticated users
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
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
