/**
 * SECURE AUTHENTICATION MIDDLEWARE
 * =================================
 * 
 * Comprehensive authentication and authorization system
 * to secure all API endpoints.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, UserRole } from '@/lib/jwt-auth';
import { z } from 'zod';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    companyId: string;
    permissions: string[];
  };
}

export interface AuthMiddlewareOptions {
  requireAuth?: boolean;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: string;
  allowSelf?: boolean; // Allow users to access their own resources
}

/**
 * Authentication middleware for API routes
 */
export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  options: AuthMiddlewareOptions = {}
) {
  return async (req: NextRequest) => {
    try {
      const authReq = req as AuthenticatedRequest;
      
      // Extract token from Authorization header
      const authHeader = req.headers.get('authorization');
      const token = authHeader?.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : null;
      
      if (!token && options.requireAuth !== false) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authentication required',
            code: 'AUTH_REQUIRED'
          },
          { status: 401 }
        );
      }
      
      // Verify token and extract user info
      if (token) {
        try {
          const tokenPayload = await verifyAccessToken(token);
          authReq.user = tokenPayload;
        } catch (error) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Invalid or expired token',
              code: 'AUTH_INVALID'
            },
            { status: 401 }
          );
        }
      }
      
      // Check role requirements
      if (options.requiredRole && authReq.user) {
        const requiredRoles = Array.isArray(options.requiredRole) 
          ? options.requiredRole 
          : [options.requiredRole];
        
        if (!requiredRoles.includes(authReq.user.role)) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Insufficient permissions',
              code: 'AUTH_FORBIDDEN',
              required: requiredRoles,
              current: authReq.user.role
            },
            { status: 403 }
          );
        }
      }
      
      // Check permission requirements
      if (options.requiredPermission && authReq.user) {
        if (!authReq.user.permissions.includes(options.requiredPermission)) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Missing required permission',
              code: 'AUTH_PERMISSION_DENIED',
              required: options.requiredPermission,
              current: authReq.user.permissions
            },
            { status: 403 }
          );
        }
      }
      
      // Allow self-access check
      if (options.allowSelf && authReq.user) {
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/');
        
        // Check if the resource ID matches the user's ID or companyId
        const resourceId = pathSegments[pathSegments.length - 1];
        if (resourceId === authReq.user.id || resourceId === authReq.user.companyId) {
          // User accessing their own resource - allow
        }
      }
      
      return await handler(authReq);
      
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication system error',
          code: 'AUTH_SYSTEM_ERROR'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Rate limiting middleware
 */
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    windowMs?: number;
    max?: number;
    keyGenerator?: (req: NextRequest) => string;
  } = {}
) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes
  const max = options.max || 100; // requests per window
  const keyGenerator = options.keyGenerator || ((req: NextRequest) => {
    // Use IP address or user ID as key
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
    return ip;
  });
  
  return async (req: NextRequest) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up old entries
    for (const [k, v] of Object.entries(rateLimitStore)) {
      if (v.resetTime < windowStart) {
        delete rateLimitStore[k];
      }
    }
    
    // Check current request count
    const current = rateLimitStore[key];
    if (!current) {
      rateLimitStore[key] = { count: 1, resetTime: now + windowMs };
    } else {
      if (current.count >= max) {
        return NextResponse.json(
          {
            success: false,
            error: 'Rate limit exceeded',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.ceil((current.resetTime - now) / 1000)
          },
          { 
            status: 429,
            headers: {
              'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString(),
              'X-RateLimit-Limit': max.toString(),
              'X-RateLimit-Remaining': Math.max(0, max - current.count - 1).toString(),
              'X-RateLimit-Reset': Math.ceil(current.resetTime / 1000).toString()
            }
          }
        );
      }
      current.count++;
    }
    
    const response = await handler(req);
    
    // Add rate limit headers to response
    const current2 = rateLimitStore[key];
    if (current2) {
      response.headers.set('X-RateLimit-Limit', max.toString());
      response.headers.set('X-RateLimit-Remaining', Math.max(0, max - current2.count).toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(current2.resetTime / 1000).toString());
    }
    
    return response;
  };
}

/**
 * Input validation middleware
 */
export function withValidation<T>(
  handler: (req: NextRequest, validatedData: T) => Promise<NextResponse>,
  schema: z.ZodSchema<T>,
  options: {
    validateQuery?: boolean;
    validateBody?: boolean;
  } = { validateBody: true }
) {
  return async (req: NextRequest) => {
    try {
      let data: any = {};
      
      if (options.validateBody && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
        data = await req.json();
      }
      
      if (options.validateQuery) {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        data = { ...data, ...queryParams };
      }
      
      const validatedData = schema.parse(data);
      return await handler(req, validatedData);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message,
              received: e.received
            }))
          },
          { status: 400 }
        );
      }
      
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid JSON in request body',
            code: 'INVALID_JSON'
          },
          { status: 400 }
        );
      }
      
      console.error('Validation middleware error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation system error',
          code: 'VALIDATION_SYSTEM_ERROR'
        },
        { status: 500 }
      );
    }
  };
}

/**
 * CORS middleware with security
 */
export function withCors(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    origin?: string | string[];
    methods?: string[];
    allowedHeaders?: string[];
    credentials?: boolean;
  } = {}
) {
  const allowedOrigins = options.origin 
    ? Array.isArray(options.origin) ? options.origin : [options.origin]
    : [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'];
  
  const allowedMethods = options.methods || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  const allowedHeaders = options.allowedHeaders || ['Content-Type', 'Authorization'];
  const credentials = options.credentials || true;
  
  return async (req: NextRequest) => {
    const origin = req.headers.get('origin');
    const method = req.method;
    
    // Handle preflight requests
    if (method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      
      if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }
      
      response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(', '));
      response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));
      
      if (credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
      
      return response;
    }
    
    const response = await handler(req);
    
    // Add CORS headers to actual response
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    if (credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    return response;
  };
}

/**
 * Security headers middleware
 */
export function withSecurityHeaders(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const response = await handler(req);
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Consider removing unsafe-* in production
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
    
    // HSTS (only in production with HTTPS)
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    return response;
  };
}

/**
 * Combine multiple middlewares
 */
export function combineMiddleware(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  ...middlewares: ((h: any) => any)[]
) {
  return middlewares.reduce((acc, middleware) => middleware(acc), handler);
}