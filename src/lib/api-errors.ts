import { NextResponse } from 'next/server';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class BadRequestError extends APIError {
  constructor(message: string = 'Bad request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_FIELDS = 'MISSING_FIELDS',
}

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
    { status: 500 }
  );
}

export function createErrorResponse(code: ErrorCode | string, message: string, statusCode: number) {
  return NextResponse.json(
    { error: message, code: code },
    { status: statusCode }
  );
}

export function handleValidationError(error: any) {
  // Handle ZodError
  if (error?.issues) {
    const message = error.issues.map((issue: any) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
    return NextResponse.json(
      { error: message, code: ErrorCode.VALIDATION_ERROR, issues: error.issues },
      { status: 400 }
    );
  }

  // Handle string message
  const message = typeof error === 'string' ? error : 'Validation error';
  return NextResponse.json(
    { error: message, code: ErrorCode.VALIDATION_ERROR },
    { status: 400 }
  );
}

export function handleUnexpectedError(error: unknown) {
  console.error('Unexpected error:', error);
  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: ErrorCode.INTERNAL_ERROR,
    },
    { status: 500 }
  );
}
