/**
 * Centralized API Error Handling System
 * Provides consistent error handling across all API routes
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class APIError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: any;

  constructor(message: string, statusCode: number, isOperational = true, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * Standard API response format
 */
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version?: string;
  };
}

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, meta?: any): NextResponse {
  const response: APIResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
  return NextResponse.json(response);
}

/**
 * Create an error API response
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): NextResponse {
  const response: APIResponse = {
    success: false,
    error: {
      message,
      code,
      details
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  };
  
  // Log error for monitoring
  if (statusCode >= 500) {
    console.error('[API Error]', {
      message,
      statusCode,
      code,
      details,
      timestamp: new Date().toISOString()
    });
  }
  
  return NextResponse.json(response, { status: statusCode });
}

/**
 * Global error handler for API routes
 */
export function handleAPIError(error: any): NextResponse {
  // API Error (known operational errors)
  if (error instanceof APIError) {
    return errorResponse(
      error.message,
      error.statusCode,
      'API_ERROR',
      error.details
    );
  }
  
  // Zod Validation Error
  if (error instanceof ZodError) {
    return errorResponse(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    );
  }
  
  // Prisma Database Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return errorResponse(
          'A unique constraint would be violated.',
          409,
          'DUPLICATE_ERROR',
          { field: error.meta?.target }
        );
      case 'P2025':
        return errorResponse(
          'Record not found.',
          404,
          'NOT_FOUND'
        );
      case 'P2003':
        return errorResponse(
          'Foreign key constraint failed.',
          400,
          'FOREIGN_KEY_ERROR'
        );
      default:
        return errorResponse(
          'Database operation failed.',
          500,
          'DATABASE_ERROR',
          { code: error.code }
        );
    }
  }
  
  // Prisma Validation Error
  if (error instanceof Prisma.PrismaClientValidationError) {
    return errorResponse(
      'Invalid data provided.',
      400,
      'VALIDATION_ERROR'
    );
  }
  
  // Network/Fetch Errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return errorResponse(
      'External service unavailable.',
      503,
      'SERVICE_UNAVAILABLE'
    );
  }
  
  // JWT/Auth Errors
  if (error.name === 'JsonWebTokenError') {
    return errorResponse(
      'Invalid authentication token.',
      401,
      'INVALID_TOKEN'
    );
  }
  
  if (error.name === 'TokenExpiredError') {
    return errorResponse(
      'Authentication token expired.',
      401,
      'TOKEN_EXPIRED'
    );
  }
  
  // Rate Limiting
  if (error.message?.includes('rate limit')) {
    return errorResponse(
      'Too many requests. Please try again later.',
      429,
      'RATE_LIMITED'
    );
  }
  
  // Generic Error
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return errorResponse(
    isDevelopment ? error.message : 'An unexpected error occurred.',
    500,
    'INTERNAL_ERROR',
    isDevelopment ? { stack: error.stack } : undefined
  );
}

/**
 * Async handler wrapper for API routes
 */
export function asyncHandler<T = any>(
  handler: (req: any, params?: any) => Promise<NextResponse>
) {
  return async (req: any, params?: any): Promise<NextResponse> => {
    try {
      return await handler(req, params);
    } catch (error) {
      return handleAPIError(error);
    }
  };
}

/**
 * Validate required fields
 */
export function validateRequired(data: any, fields: string[]): void {
  const missing = fields.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new APIError(
      `Missing required fields: ${missing.join(', ')}`,
      400,
      true,
      { fields: missing }
    );
  }
}

/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): void {
  const now = Date.now();
  const requests = rateLimitMap.get(identifier) || [];
  
  // Clean old requests outside window
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    throw new APIError(
      'Rate limit exceeded',
      429,
      true,
      { retryAfter: windowMs / 1000 }
    );
  }
  
  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);
}

/**
 * Log API requests for monitoring
 */
export async function logAPIRequest(
  method: string,
  path: string,
  userId?: string,
  status?: number,
  error?: any
): Promise<void> {
  try {
    // In production, this would write to a database or logging service
    const logEntry = {
      timestamp: new Date().toISOString(),
      method,
      path,
      userId,
      status,
      error: error?.message,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Request]', logEntry);
    }
    
    // Store in database if available
    if (global.prisma?.auditLog) {
      await global.prisma.auditLog.create({
        data: {
          action: `${method} ${path}`,
          resource: 'API',
          userId,
          success: !error,
          details: JSON.stringify(logEntry)
        }
      }).catch(console.error);
    }
  } catch (err) {
    console.error('Failed to log API request:', err);
  }
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove potential XSS attempts
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitized[key] = sanitizeInput(input[key]);
      }
    }
    return sanitized;
  }
  
  return input;
}

/**
 * Pagination helper
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
  return {
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20'))),
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc'
  };
}

export function getPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}