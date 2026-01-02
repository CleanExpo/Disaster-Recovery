/**
 * Error Handling and Logging Utilities for API Routes
 * Provides consistent error responses and structured logging
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { formatValidationErrors } from './validation-schemas';

// ============================================================================
// ERROR TYPES
// ============================================================================

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends APIError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends APIError {
  constructor(message: string = 'Too many requests', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends APIError {
  constructor(message: string, service: string) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', { service });
    this.name = 'ExternalServiceError';
  }
}

// ============================================================================
// ERROR RESPONSE INTERFACE
// ============================================================================

interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    details?: Record<string, unknown>;
    timestamp: string;
    requestId?: string;
  };
}

// ============================================================================
// LOGGING
// ============================================================================

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogContext {
  requestId?: string;
  userId?: string;
  endpoint?: string;
  method?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: unknown;
}

/**
 * Structured logger for API routes
 * Production: Replace with Winston, Pino, or cloud logging service
 */
export class Logger {
  private context: LogContext;

  constructor(context: LogContext = {}) {
    this.context = context;
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...this.context,
      ...data,
    };

    // In production, send to logging service (e.g., CloudWatch, Datadog)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to logging service
      console.log(JSON.stringify(logEntry));
    } else {
      // Development: Pretty print
      const color = {
        DEBUG: '\x1b[36m', // Cyan
        INFO: '\x1b[32m', // Green
        WARN: '\x1b[33m', // Yellow
        ERROR: '\x1b[31m', // Red
      }[level];

      console.log(
        `${color}[${level}]\x1b[0m ${message}`,
        data ? JSON.stringify(data, null, 2) : ''
      );
    }
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | unknown, data?: Record<string, unknown>) {
    const errorData = error instanceof Error
      ? {
          errorName: error.name,
          errorMessage: error.message,
          stack: error.stack,
          ...data,
        }
      : { error, ...data };

    this.log(LogLevel.ERROR, message, errorData);
  }
}

// ============================================================================
// ERROR HANDLER
// ============================================================================

/**
 * Handle errors and return appropriate NextResponse
 */
export function handleAPIError(
  error: unknown,
  logger?: Logger,
  requestId?: string
): NextResponse<ErrorResponse> {
  // Log the error
  if (logger) {
    logger.error('API error occurred', error);
  } else {
    console.error('API error:', error);
  }

  // Zod validation error
  if (error instanceof ZodError) {
    const validationErrors = formatValidationErrors(error);
    return NextResponse.json(
      {
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          statusCode: 400,
          details: { validationErrors },
          timestamp: new Date().toISOString(),
          requestId,
        },
      },
      { status: 400 }
    );
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          error: {
            message: 'A record with this data already exists',
            code: 'DUPLICATE_ENTRY',
            statusCode: 409,
            details: { fields: error.meta?.target },
            timestamp: new Date().toISOString(),
            requestId,
          },
        },
        { status: 409 }
      );
    }

    // Record not found
    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          error: {
            message: 'Record not found',
            code: 'NOT_FOUND',
            statusCode: 404,
            timestamp: new Date().toISOString(),
            requestId,
          },
        },
        { status: 404 }
      );
    }

    // Generic database error
    return NextResponse.json(
      {
        error: {
          message: 'Database error occurred',
          code: 'DATABASE_ERROR',
          statusCode: 500,
          details:
            process.env.NODE_ENV === 'development'
              ? { prismaCode: error.code, meta: error.meta }
              : undefined,
          timestamp: new Date().toISOString(),
          requestId,
        },
      },
      { status: 500 }
    );
  }

  // Custom API errors
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          details: error.details,
          timestamp: new Date().toISOString(),
          requestId,
        },
      },
      { status: error.statusCode }
    );
  }

  // Unknown errors
  const errorMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  return NextResponse.json(
    {
      error: {
        message: errorMessage,
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        details:
          process.env.NODE_ENV === 'development' && error instanceof Error
            ? { stack: error.stack }
            : undefined,
        timestamp: new Date().toISOString(),
        requestId,
      },
    },
    { status: 500 }
  );
}

// ============================================================================
// SUCCESS RESPONSE
// ============================================================================

interface SuccessResponseOptions {
  message?: string;
  statusCode?: number;
  headers?: Record<string, string>;
}

/**
 * Create standardized success response
 */
export function successResponse<T>(
  data: T,
  options: SuccessResponseOptions = {}
): NextResponse {
  const {
    message = 'Success',
    statusCode = 200,
    headers = {},
  } = options;

  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    {
      status: statusCode,
      headers,
    }
  );
}

// ============================================================================
// REQUEST ID GENERATION
// ============================================================================

/**
 * Generate unique request ID for tracking
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// ============================================================================
// METRICS TRACKING (for monitoring)
// ============================================================================

export interface APIMetrics {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  requestId: string;
  userId?: string;
  ip?: string;
}

/**
 * Track API metrics
 * Production: Send to monitoring service (Prometheus, Datadog, etc.)
 */
export function trackMetrics(metrics: APIMetrics): void {
  // In production, send to metrics service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to metrics service
    console.log('[METRICS]', JSON.stringify(metrics));
  } else {
    console.log('[METRICS]', metrics);
  }
}

// ============================================================================
// ERROR BOUNDARY FOR API ROUTES
// ============================================================================

/**
 * Wrap API route handler with error handling
 *
 * @example
 * ```ts
 * export const POST = withErrorHandler(async (req) => {
 *   // Your handler code
 *   return successResponse({ message: 'OK' });
 * });
 * ```
 */
export function withErrorHandler(
  handler: (req: Request) => Promise<NextResponse>,
  context?: LogContext
) {
  return async (req: Request): Promise<NextResponse> => {
    const requestId = generateRequestId();
    const startTime = Date.now();

    const logger = new Logger({
      requestId,
      endpoint: new URL(req.url).pathname,
      method: req.method,
      ...context,
    });

    try {
      logger.info('Request received');

      const response = await handler(req);

      const responseTime = Date.now() - startTime;

      // Track metrics
      trackMetrics({
        endpoint: new URL(req.url).pathname,
        method: req.method,
        statusCode: response.status,
        responseTime,
        requestId,
      });

      logger.info('Request completed', { statusCode: response.status, responseTime });

      // Add request ID to response headers
      response.headers.set('X-Request-Id', requestId);

      return response;
    } catch (error) {
      const responseTime = Date.now() - startTime;

      // Track error metrics
      trackMetrics({
        endpoint: new URL(req.url).pathname,
        method: req.method,
        statusCode: error instanceof APIError ? error.statusCode : 500,
        responseTime,
        requestId,
      });

      const errorResponse = handleAPIError(error, logger, requestId);

      // Add request ID to error response headers
      errorResponse.headers.set('X-Request-Id', requestId);

      return errorResponse;
    }
  };
}
