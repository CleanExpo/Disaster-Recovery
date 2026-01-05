/**
 * Logger Helper Utilities
 *
 * Convenience functions for replacing console.log with structured logging
 */

import { logger } from '../logger';

/**
 * Log informational message (replaces console.log)
 * Use for general information, status updates, and non-critical events
 *
 * @example
 * logInfo('User logged in', { userId: '123', email: 'user@example.com' })
 */
export const logInfo = (message: string, metadata?: any): void => {
  logger.info(message, metadata);
};

/**
 * Log error with full context (replaces console.error)
 * Automatically extracts error details and preserves stack trace
 *
 * @example
 * logError(error, { context: 'payment_processing', orderId: '456' })
 */
export const logError = (error: Error | unknown, context?: any): void => {
  const errorData =
    error instanceof Error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : { error: String(error) };

  logger.error('Error occurred', { ...errorData, ...context });
};

/**
 * Log debug information (replaces console.log for debugging)
 * Only outputs in development mode (NODE_ENV=development)
 *
 * @example
 * logDebug('API response received', { endpoint: '/api/users', statusCode: 200 })
 */
export const logDebug = (message: string, data?: any): void => {
  logger.debug(message, data);
};

/**
 * Log warning message (replaces console.warn)
 * Use for concerning but non-critical issues
 *
 * @example
 * logWarn('API rate limit approaching', { remaining: 10, limit: 100 })
 */
export const logWarn = (message: string, metadata?: any): void => {
  logger.warn(message, metadata);
};

/**
 * Log WebSocket/connection events
 * Specialized helper for connection-related logging
 *
 * @example
 * logConnection('user_connected', { socketId: 'abc123', userId: '456' })
 */
export const logConnection = (event: string, details: any): void => {
  logger.info(`Connection: ${event}`, details);
};

/**
 * Log database query execution
 * Specialized helper for database operations
 *
 * @example
 * logQuery('SELECT * FROM users', 45, true)
 */
export const logQuery = (
  query: string,
  duration: number,
  success: boolean,
  error?: Error
): void => {
  const level = success ? 'debug' : 'warn';
  logger.log(level, 'Database query executed', {
    query: query.substring(0, 100), // Truncate long queries
    duration,
    success,
  });

  if (error) {
    logError(error, { query: query.substring(0, 100) });
  }
};

/**
 * Log API request/response
 * Specialized helper for HTTP requests
 *
 * @example
 * logAPIRequest('POST', '/api/users', 201, 150)
 */
export const logAPIRequest = (
  method: string,
  path: string,
  statusCode: number,
  duration?: number,
  metadata?: any
): void => {
  const level = statusCode >= 400 ? 'warn' : 'info';
  logger.log(level, 'API request', {
    method,
    path,
    statusCode,
    duration,
    ...metadata,
  });
};

/**
 * Log performance metric
 * Specialized helper for performance monitoring
 *
 * @example
 * logPerformance('page_load', 1250, 'ms', { page: '/dashboard' })
 */
export const logPerformance = (
  metric: string,
  value: number,
  unit: string = 'ms',
  metadata?: any
): void => {
  logger.debug('Performance metric', {
    metric,
    value,
    unit,
    ...metadata,
  });
};

/**
 * Time an async operation and log it
 * Wraps an async function, measures execution time, and logs result
 *
 * @example
 * const result = await logTimed('Fetch user data', async () => {
 *   return await fetchUser(userId);
 * }, { userId });
 */
export const logTimed = async <T>(
  operation: string,
  fn: () => Promise<T>,
  metadata?: any
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;

    logDebug(`${operation} completed`, {
      ...metadata,
      duration: Math.round(duration),
      status: 'success',
    });

    return result;
  } catch (error) {
    const duration = performance.now() - start;

    logError(error, {
      operation,
      ...metadata,
      duration: Math.round(duration),
      status: 'failed',
    });

    throw error;
  }
};

/**
 * Log cache operation
 * Specialized helper for cache hit/miss tracking
 *
 * @example
 * logCache('hit', 'user:123', { ttl: 3600 })
 */
export const logCache = (
  operation: 'hit' | 'miss' | 'set' | 'delete',
  key: string,
  metadata?: any
): void => {
  logDebug('Cache operation', {
    operation,
    key: key.substring(0, 50),
    ...metadata,
  });
};

/**
 * Log authentication event
 * Specialized helper for auth-related logging
 *
 * @example
 * logAuth('login_success', { userId: '123', method: 'password' })
 */
export const logAuth = (event: string, metadata?: any): void => {
  logger.info(`Auth: ${event}`, metadata);
};

/**
 * Log payment event
 * Specialized helper for payment-related logging
 *
 * @example
 * logPayment('charge_success', { amount: 5000, currency: 'AUD', orderId: '789' })
 */
export const logPayment = (event: string, metadata?: any): void => {
  logger.info(`Payment: ${event}`, metadata);
};

// Re-export logger for advanced usage
export { logger } from '../logger';
