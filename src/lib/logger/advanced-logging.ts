/**
 * Advanced Logging Service
 *
 * Structured logging with correlation IDs, performance timing,
 * and multiple output levels suitable for production monitoring
 */

import { randomUUID } from 'crypto';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  correlationId: string;
  userId?: string;
  requestId?: string;
  timestamp: Date;
  duration?: number; // milliseconds
  metadata?: Record<string, any>;
}

interface StructuredLog {
  level: LogLevel;
  message: string;
  context: LogContext;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

// Thread-local context (simplified version)
let currentContext: Partial<LogContext> = {};

export class AdvancedLogger {
  /**
   * Set correlation ID for logging context
   */
  static setCorrelationId(correlationId: string = randomUUID()): string {
    currentContext.correlationId = correlationId;
    return correlationId;
  }

  /**
   * Set user ID for logging context
   */
  static setUserId(userId: string): void {
    currentContext.userId = userId;
  }

  /**
   * Set request ID for logging context
   */
  static setRequestId(requestId: string): void {
    currentContext.requestId = requestId;
  }

  /**
   * Set additional metadata for logging context
   */
  static setMetadata(metadata: Record<string, any>): void {
    currentContext.metadata = {
      ...(currentContext.metadata || {}),
      ...metadata,
    };
  }

  /**
   * Clear current logging context
   */
  static clearContext(): void {
    currentContext = {};
  }

  /**
   * Get current context
   */
  static getContext(): Partial<LogContext> {
    return {
      ...currentContext,
      correlationId: currentContext.correlationId || randomUUID(),
      timestamp: new Date(),
    };
  }

  /**
   * Log debug message
   */
  static debug(
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ): void {
    this.log('debug', message, metadata, duration);
  }

  /**
   * Log info message
   */
  static info(
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ): void {
    this.log('info', message, metadata, duration);
  }

  /**
   * Log warning message
   */
  static warn(
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ): void {
    this.log('warn', message, metadata, duration);
  }

  /**
   * Log error message
   */
  static error(
    message: string,
    error?: Error | any,
    metadata?: Record<string, any>,
    duration?: number
  ): void {
    const context = this.getContext() as LogContext;
    context.duration = duration;
    context.metadata = metadata;

    const structuredLog: StructuredLog = {
      level: 'error',
      message,
      context,
      error: error
        ? {
            message: error.message,
            stack: error.stack,
            code: error.code,
          }
        : undefined,
    };

    this.outputLog(structuredLog);
  }

  /**
   * Time an operation and log it
   */
  static async timeAsync<T>(
    message: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - startTime;
      this.info(message, { ...metadata, status: 'success' }, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.error(message, error, { ...metadata, status: 'failed' }, duration);
      throw error;
    }
  }

  /**
   * Time a sync operation and log it
   */
  static timeSync<T>(
    message: string,
    fn: () => T,
    metadata?: Record<string, any>
  ): T {
    const startTime = Date.now();
    try {
      const result = fn();
      const duration = Date.now() - startTime;
      this.info(message, { ...metadata, status: 'success' }, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.error(message, error, { ...metadata, status: 'failed' }, duration);
      throw error;
    }
  }

  /**
   * Log database query
   */
  static logDatabaseQuery(
    query: string,
    duration: number,
    success: boolean,
    error?: Error
  ): void {
    this.log(
      success ? 'debug' : 'warn',
      'Database query executed',
      {
        query: query.substring(0, 100), // Truncate long queries
        duration,
        success,
      },
      duration
    );

    if (error) {
      this.error('Database query failed', error, { query });
    }
  }

  /**
   * Log API request
   */
  static logAPIRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    metadata?: Record<string, any>
  ): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    this.log(level, 'API request', {
      method,
      path,
      statusCode,
      ...metadata,
    });
  }

  /**
   * Log WebSocket event
   */
  static logWebSocketEvent(
    event: string,
    userId: string,
    metadata?: Record<string, any>
  ): void {
    this.info('WebSocket event', {
      event,
      userId,
      ...metadata,
    });
  }

  /**
   * Log cache hit/miss
   */
  static logCacheOperation(
    operation: 'hit' | 'miss' | 'set' | 'delete',
    key: string,
    metadata?: Record<string, any>
  ): void {
    this.debug('Cache operation', {
      operation,
      key: key.substring(0, 50),
      ...metadata,
    });
  }

  /**
   * Log performance metric
   */
  static logPerformanceMetric(
    metric: string,
    value: number,
    unit: string = 'ms',
    metadata?: Record<string, any>
  ): void {
    this.debug('Performance metric', {
      metric,
      value,
      unit,
      ...metadata,
    });
  }

  /**
   * Internal logging method
   */
  private static log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
    duration?: number
  ): void {
    const context = this.getContext() as LogContext;
    context.duration = duration;
    context.metadata = metadata;

    const structuredLog: StructuredLog = {
      level,
      message,
      context,
    };

    this.outputLog(structuredLog);
  }

  /**
   * Output log (to console, file, or external service)
   */
  private static outputLog(log: StructuredLog): void {
    const logOutput = {
      timestamp: log.context.timestamp.toISOString(),
      level: log.level.toUpperCase(),
      correlationId: log.context.correlationId,
      userId: log.context.userId,
      requestId: log.context.requestId,
      message: log.message,
      duration: log.context.duration,
      metadata: log.context.metadata,
      error: log.error,
    };

    // Console output (structured JSON)
    const consoleMethod = {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    }[log.level];

    consoleMethod(JSON.stringify(logOutput));

    // In production, send to logging service
    // Example: Sent to Datadog, CloudWatch, Elasticsearch, etc.
    if (process.env.NODE_ENV === 'production') {
      this.sendToRemote(logOutput);
    }
  }

  /**
   * Send log to remote logging service
   */
  private static sendToRemote(log: Record<string, any>): void {
    // TODO: Implement integration with logging service
    // Example integrations:
    // - Winston with Datadog transport
    // - Bunyan with Cloud Logging transport
    // - Custom HTTP endpoint
    // - Syslog
  }

  /**
   * Create a child logger with pre-set context
   */
  static createChild(context: Partial<LogContext>): typeof AdvancedLogger {
    const savedContext = { ...currentContext };

    return {
      ...AdvancedLogger,
      getContext: () => ({
        ...savedContext,
        ...context,
        timestamp: new Date(),
      }),
    };
  }
}

/**
 * Request logging middleware
 */
export function createRequestLogger() {
  return (req: any, res: any, next: any) => {
    const startTime = Date.now();
    const correlationId = AdvancedLogger.setCorrelationId(
      req.headers['x-correlation-id']
    );

    // Enhance request with correlation ID
    req.correlationId = correlationId;

    // Log request
    AdvancedLogger.info('Incoming request', {
      method: req.method,
      path: req.path,
      ip: req.ip,
    });

    // Log response
    const originalSend = res.send;
    res.send = function (data: any) {
      const duration = Date.now() - startTime;
      AdvancedLogger.logAPIRequest(
        req.method,
        req.path,
        res.statusCode,
        duration
      );

      return originalSend.call(this, data);
    };

    next();
  };
}

/**
 * Health check logging
 */
export class HealthCheckLogger {
  private static checks: Map<string, { lastCheck: Date; status: boolean }> =
    new Map();

  static logCheck(service: string, healthy: boolean, details?: Record<string, any>): void {
    const level = healthy ? 'info' : 'warn';
    AdvancedLogger.log(level, `Health check: ${service}`, {
      service,
      healthy,
      ...details,
    });

    this.checks.set(service, {
      lastCheck: new Date(),
      status: healthy,
    });
  }

  static getStatus(): Record<string, any> {
    const status: Record<string, any> = {};
    for (const [service, check] of this.checks) {
      status[service] = {
        healthy: check.status,
        lastCheck: check.lastCheck.toISOString(),
      };
    }
    return status;
  }
}
