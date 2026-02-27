/**
 * Standardised API Response Helpers
 * ==================================
 * Consistent response shapes across all API routes.
 *
 * Success: { success: true, data: T }
 * Error:   { success: false, error: { code: string, message: string, details?: unknown } }
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

interface ApiSuccessBody<T = unknown> {
  success: true;
  data: T;
}

// ---------------------------------------------------------------------------
// Success
// ---------------------------------------------------------------------------

export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiSuccessBody<T>> {
  return NextResponse.json({ success: true, data } as ApiSuccessBody<T>, { status });
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export function apiError(
  code: string,
  message: string,
  status = 500,
  details?: unknown,
): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, ...(details !== undefined && { details }) },
    } satisfies ApiErrorBody,
    { status },
  );
}

/**
 * Format a ZodError into a 400 response with per-field detail.
 */
export function apiValidationError(err: ZodError): NextResponse<ApiErrorBody> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    } satisfies ApiErrorBody,
    { status: 400 },
  );
}

// ---------------------------------------------------------------------------
// Convenience aliases for common HTTP codes
// ---------------------------------------------------------------------------

export const apiBadRequest = (message: string, details?: unknown) =>
  apiError('BAD_REQUEST', message, 400, details);

export const apiUnauthorised = (message = 'Authentication required') =>
  apiError('UNAUTHORISED', message, 401);

export const apiForbidden = (message = 'Insufficient permissions') =>
  apiError('FORBIDDEN', message, 403);

export const apiNotFound = (message = 'Resource not found') =>
  apiError('NOT_FOUND', message, 404);

export const apiPaymentRequired = (message: string, details?: unknown) =>
  apiError('PAYMENT_REQUIRED', message, 402, details);

export const apiTooManyRequests = (retryAfterSeconds: number) =>
  apiError('RATE_LIMIT_EXCEEDED', 'Too many requests. Please try again later.', 429, {
    retryAfter: retryAfterSeconds,
  });

/**
 * Catch-all for unexpected errors. Logs the real error server-side,
 * returns a safe generic message to the client.
 */
export function apiInternalError(error: unknown, context?: string): NextResponse<ApiErrorBody> {
  const prefix = context ? `[${context}]` : '[API]';
  console.error(`${prefix} Unhandled error:`, error);

  return apiError(
    'INTERNAL_ERROR',
    'An unexpected error occurred. Please try again or contact support.',
    500,
  );
}
