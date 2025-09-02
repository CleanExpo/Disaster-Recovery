import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import logger from '@/config/logger';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class AppError extends Error implements ApiError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
  }
}

/**
 * Handle Prisma database errors
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): AppError {
  switch (error.code) {
    case 'P2000':
      return new ValidationError('The provided value is too long');
    
    case 'P2001':
      return new NotFoundError('Record');
    
    case 'P2002':
      const field = (error.meta?.target as string[])?.join(', ') || 'field';
      return new ConflictError(`Duplicate value for ${field}`);
    
    case 'P2003':
      return new ValidationError('Invalid foreign key constraint');
    
    case 'P2004':
      return new ValidationError('Database constraint failed');
    
    case 'P2005':
      return new ValidationError('Invalid field value');
    
    case 'P2006':
      return new ValidationError('Invalid field value');
    
    case 'P2007':
      return new ValidationError('Data validation error');
    
    case 'P2008':
      return new AppError('Failed to parse the query', 400);
    
    case 'P2009':
      return new AppError('Failed to validate the query', 400);
    
    case 'P2010':
      return new AppError('Raw query failed', 400);
    
    case 'P2011':
      return new ValidationError('Null constraint violation');
    
    case 'P2012':
      return new ValidationError('Missing required field');
    
    case 'P2013':
      return new ValidationError('Missing required argument');
    
    case 'P2014':
      return new ValidationError('Required relation is missing');
    
    case 'P2015':
      return new NotFoundError('Related record');
    
    case 'P2016':
      return new ValidationError('Query interpretation error');
    
    case 'P2017':
      return new ValidationError('Invalid relation connection');
    
    case 'P2018':
      return new NotFoundError('Connected record');
    
    case 'P2019':
      return new ValidationError('Input error');
    
    case 'P2020':
      return new ValidationError('Value out of range');
    
    case 'P2021':
      return new NotFoundError('Table');
    
    case 'P2022':
      return new NotFoundError('Column');
    
    case 'P2023':
      return new ValidationError('Inconsistent column data');
    
    case 'P2024':
      return new AppError('Connection timeout', 408);
    
    case 'P2025':
      return new NotFoundError('Record to delete');
    
    case 'P2026':
      return new AppError('Database server error', 500);
    
    case 'P2027':
      return new AppError('Database connection error', 503);
    
    case 'P2028':
      return new AppError('Transaction API error', 500);
    
    case 'P2030':
      return new NotFoundError('Fulltext index');
    
    case 'P2031':
      return new AppError('MongoDB replica set error', 500);
    
    case 'P2033':
      return new ValidationError('Number out of range');
    
    case 'P2034':
      return new AppError('Transaction conflict', 409);
    
    default:
      logger.error('Unhandled Prisma error:', { code: error.code, message: error.message });
      return new AppError('Database operation failed', 500);
  }
}

/**
 * Handle different types of errors
 */
function handleError(error: any): AppError {
  // If it's already an AppError, return as is
  if (error instanceof AppError) {
    return error;
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    logger.error('Prisma unknown error:', error);
    return new AppError('Database error occurred', 500);
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    logger.error('Prisma panic error:', error);
    return new AppError('Database error occurred', 500);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    logger.error('Prisma initialization error:', error);
    return new AppError('Database connection failed', 503);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ValidationError('Invalid query parameters');
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return new UnauthorizedError('Invalid token');
  }

  if (error.name === 'TokenExpiredError') {
    return new UnauthorizedError('Token expired');
  }

  if (error.name === 'NotBeforeError') {
    return new UnauthorizedError('Token not active');
  }

  // Handle validation errors from express-validator
  if (error.array && typeof error.array === 'function') {
    const messages = error.array().map((err: any) => err.msg);
    return new ValidationError(`Validation failed: ${messages.join(', ')}`);
  }

  // Handle multer file upload errors
  if (error.code === 'LIMIT_FILE_SIZE') {
    return new ValidationError('File size exceeds limit');
  }

  if (error.code === 'LIMIT_FILE_COUNT') {
    return new ValidationError('Too many files uploaded');
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return new ValidationError('Unexpected file field');
  }

  // Handle syntax errors
  if (error instanceof SyntaxError) {
    return new ValidationError('Invalid JSON format');
  }

  // Handle type errors
  if (error instanceof TypeError) {
    logger.error('Type error:', error);
    return new AppError('Invalid data type', 400);
  }

  // Handle reference errors
  if (error instanceof ReferenceError) {
    logger.error('Reference error:', error);
    return new AppError('Internal server error', 500);
  }

  // Log unknown errors
  logger.error('Unknown error:', error);
  
  return new AppError('Internal server error', 500);
}

/**
 * Send error response in development
 */
function sendErrorDev(error: AppError, res: Response): void {
  res.status(error.statusCode).json({
    success: false,
    error: {
      status: error.statusCode,
      message: error.message,
      stack: error.stack,
      ...(error instanceof Prisma.PrismaClientKnownRequestError && {
        code: error.code,
        meta: error.meta,
      }),
    },
  });
}

/**
 * Send error response in production
 */
function sendErrorProd(error: AppError, res: Response): void {
  // Only send error details for operational errors
  if (error.isOperational) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else {
    // Don't leak error details in production
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
}

/**
 * Global error handler middleware
 */
export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Convert all errors to AppError
  const appError = handleError(error);

  // Log the error
  logger.error('Global error handler:', {
    error: {
      message: appError.message,
      stack: appError.stack,
      statusCode: appError.statusCode,
      isOperational: appError.isOperational,
    },
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined,
    },
  });

  // Send error response based on environment
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(appError, res);
  } else {
    sendErrorProd(appError, res);
  }
}

/**
 * Async error handler wrapper
 */
export function asyncHandler<T extends Request, U extends Response>(
  fn: (req: T, res: U, next: NextFunction) => Promise<any>
) {
  return (req: T, res: U, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
}

/**
 * Unhandled rejection handler
 */
export function handleUnhandledRejection(): void {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error('Unhandled Rejection at:', { promise, reason });
    // Close server gracefully
    process.exit(1);
  });
}

/**
 * Uncaught exception handler
 */
export function handleUncaughtException(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);
    // Close server gracefully
    process.exit(1);
  });
}

export default {
  globalErrorHandler,
  asyncHandler,
  notFoundHandler,
  handleUnhandledRejection,
  handleUncaughtException,
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  RateLimitError,
};