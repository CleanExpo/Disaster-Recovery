import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * Structured error codes following Anthropic best practices
 * Provides consistent error handling across API routes
 */
export enum ErrorCode {
  // Auth errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Authorization errors (403)
  FORBIDDEN = 'FORBIDDEN',

  // Client errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_FIELDS = 'MISSING_FIELDS',
  INVALID_INPUT = 'INVALID_INPUT',

  // Resource errors (404)
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // Server errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

export interface ApiErrorResponse {
  error: ErrorCode;
  message: string;
  details?: unknown;
  timestamp?: string;
}

/**
 * Creates structured error response
 */
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  status: number,
  details?: unknown
): NextResponse {
  const response: ApiErrorResponse = {
    error: code,
    message,
    timestamp: new Date().toISOString(),
  };

  if (details !== undefined) {
    response.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * Handles Zod validation errors with detailed field information
 */
export function handleValidationError(error: ZodError): NextResponse {
  const fieldErrors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return createErrorResponse(
    ErrorCode.VALIDATION_ERROR,
    'Validation failed',
    400,
    { fields: fieldErrors }
  );
}

/**
 * Handles unexpected errors safely without leaking sensitive info
 */
export function handleUnexpectedError(error: unknown): NextResponse {
  // Log full error for debugging
  console.error('[API_ERROR]', {
    error,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  // Return safe generic message to client
  return createErrorResponse(
    ErrorCode.INTERNAL_ERROR,
    'An unexpected error occurred',
    500,
    process.env.NODE_ENV === 'development' && error instanceof Error
      ? { message: error.message }
      : undefined
  );
}

/**
 * Database error handler
 */
export function handleDatabaseError(error: unknown): NextResponse {
  console.error('[DATABASE_ERROR]', error);

  return createErrorResponse(
    ErrorCode.DATABASE_ERROR,
    'Database operation failed',
    500
  );
}

/**
 * Custom API error class for explicit error throwing
 */
export class ApiError extends Error {
  constructor(
    public code: ErrorCode,
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  toResponse(): NextResponse {
    return createErrorResponse(this.code, this.message, this.statusCode, this.details);
  }
}
