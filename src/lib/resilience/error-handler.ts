'use server';

import { NextResponse, NextRequest } from 'next/server';
import { requestContext } from './request-context';
import { gracefulDegradation } from './graceful-degradation';

/**
 * Custom Error Classes
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends Error {
  constructor(retryAfter: number) {
    super(`Rate limited. Retry after ${retryAfter}ms`);
    this.name = 'RateLimitError';
    (this as any).retryAfter = retryAfter;
  }
}

export class ServiceUnavailableError extends Error {
  constructor(service: string) {
    super(`Service unavailable: ${service}`);
    this.name = 'ServiceUnavailableError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Error Handler Middleware
 *
 * Handles errors with proper HTTP status codes and recovery strategies
 */

class ErrorHandler {
  /**
   * Handle error and return appropriate HTTP response
   */
  handle(error: unknown, context?: any): NextResponse {
    const contextSummary = requestContext.getContextSummary();

    console.error('Error handler caught exception:', {
      error: error instanceof Error ? error.message : error,
      name: error instanceof Error ? error.name : 'Unknown',
      context: contextSummary,
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 400 }
      );
    }

    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        {
          error: 'Authentication Error',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 401 }
      );
    }

    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        {
          error: 'Authorization Error',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 403 }
      );
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 404 }
      );
    }

    if (error instanceof ConflictError) {
      return NextResponse.json(
        {
          error: 'Conflict',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 409 }
      );
    }

    if (error instanceof RateLimitError) {
      const rateLimitErr = error as any;
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimitErr.retryAfter / 1000),
          },
        }
      );
    }

    if (error instanceof TimeoutError) {
      return NextResponse.json(
        {
          error: 'Request Timeout',
          message: error.message,
          correlationId: contextSummary?.correlationId,
        },
        { status: 408 }
      );
    }

    if (error instanceof ServiceUnavailableError) {
      const degradation = gracefulDegradation.getDegradationLevel();

      return NextResponse.json(
        {
          error: 'Service Unavailable',
          message: error.message,
          correlationId: contextSummary?.correlationId,
          degradationLevel: degradation.level,
          disabledFeatures: degradation.disabledFeatures,
        },
        { status: 503 }
      );
    }

    // Database errors
    if (error instanceof Error && error.message.includes('PrismaError')) {
      return NextResponse.json(
        {
          error: 'Database Error',
          message: 'An error occurred while processing your request',
          correlationId: contextSummary?.correlationId,
        },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : 'An unexpected error occurred',
        correlationId: contextSummary?.correlationId,
      },
      { status: 500 }
    );
  }

  /**
   * Wrap route handler with error handling
   */
  wrap(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest) => {
      try {
        return await handler(req);
      } catch (error) {
        return this.handle(error);
      }
    };
  }

  /**
   * Wrap API operation with error handling
   */
  async wrapOperation<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get error status code
   */
  getStatusCode(error: unknown): number {
    if (error instanceof ValidationError) return 400;
    if (error instanceof AuthenticationError) return 401;
    if (error instanceof AuthorizationError) return 403;
    if (error instanceof NotFoundError) return 404;
    if (error instanceof ConflictError) return 409;
    if (error instanceof RateLimitError) return 429;
    if (error instanceof TimeoutError) return 408;
    if (error instanceof ServiceUnavailableError) return 503;

    return 500;
  }

  /**
   * Check if error is retriable
   */
  isRetriable(error: unknown): boolean {
    if (error instanceof ValidationError) return false;
    if (error instanceof AuthenticationError) return false;
    if (error instanceof AuthorizationError) return false;
    if (error instanceof NotFoundError) return false;
    if (error instanceof ConflictError) return false;
    if (error instanceof RateLimitError) return true;
    if (error instanceof TimeoutError) return true;
    if (error instanceof ServiceUnavailableError) return true;

    // Generic errors might be retriable
    return true;
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
