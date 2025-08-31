/**
 * Centralized logging system for contractor operations and system events
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogCategory = 
  | 'auth'
  | 'contractor'
  | 'api'
  | 'database'
  | 'payment'
  | 'clean-claims'
  | 'background-check'
  | 'security'
  | 'performance'
  | 'system';

interface LogContext {
  userId?: string;
  contractorId?: string;
  sessionId?: string;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  duration?: number;
  metadata?: Record<string, any>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';
  private logLevel = process.env.LOG_LEVEL || 'info';
  private buffer: LogEntry[] = [];
  private bufferSize = 100;
  private flushInterval = 5000; // 5 seconds
  private flushTimer: NodeJS.Timeout | null = null;

  constructor() {
    // Start flush timer in production
    if (this.isProduction) {
      this.startFlushTimer();
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
    const currentLevelIndex = levels.indexOf(this.logLevel as LogLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, category, message, context, error, duration, metadata } = entry;
    
    let logString = `[${timestamp}] [${level.toUpperCase()}] [${category}] ${message}`;
    
    if (duration) {
      logString += ` (${duration}ms)`;
    }
    
    if (context) {
      logString += `\n  Context: ${JSON.stringify(context, null, 2)}`;
    }
    
    if (metadata) {
      logString += `\n  Metadata: ${JSON.stringify(metadata, null, 2)}`;
    }
    
    if (error) {
      logString += `\n  Error: ${error.name}: ${error.message}`;
      if (error.stack && this.isDevelopment) {
        logString += `\n  Stack: ${error.stack}`;
      }
    }
    
    return logString;
  }

  private async sendToLoggingService(entries: LogEntry[]): Promise<void> {
    try {
      // In production, send to external logging service
      if (this.isProduction) {
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' },
          body: JSON.stringify({ entries }) });

        if (!response.ok) {
          console.error('Failed to send logs to service:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error sending logs:', error);
    }
  }

  private addToBuffer(entry: LogEntry): void {
    this.buffer.push(entry);
    
    if (this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;
    
    const entriesToFlush = [...this.buffer];
    this.buffer = [];
    
    await this.sendToLoggingService(entriesToFlush);
  }

  private log(
    level: LogLevel,
    category: LogCategory,
    message: string,
    context?: LogContext,
    metadata?: Record<string, any>
  ): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      context,
      metadata };

    // Console output
    const formattedLog = this.formatLogEntry(entry);
    
    switch (level) {
      case 'debug':
        console.debug(formattedLog);
        break;
      case 'info':
        console.info(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'error':
      case 'fatal':
        console.error(formattedLog);
        break;
    }

    // Add to buffer for external logging
    if (this.isProduction) {
      this.addToBuffer(entry);
    }
  }

  // Public logging methods
  debug(category: LogCategory, message: string, context?: LogContext, metadata?: Record<string, any>): void {
    this.log('debug', category, message, context, metadata);
  }

  info(category: LogCategory, message: string, context?: LogContext, metadata?: Record<string, any>): void {
    this.log('info', category, message, context, metadata);
  }

  warn(category: LogCategory, message: string, context?: LogContext, metadata?: Record<string, any>): void {
    this.log('warn', category, message, context, metadata);
  }

  error(category: LogCategory, message: string, error?: Error, context?: LogContext, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      category,
      message,
      context,
      metadata,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack } : undefined };

    const formattedLog = this.formatLogEntry(entry);
    console.error(formattedLog);

    if (this.isProduction) {
      this.addToBuffer(entry);
    }
  }

  fatal(category: LogCategory, message: string, error?: Error, context?: LogContext): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'fatal',
      category,
      message,
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack } : undefined };

    const formattedLog = this.formatLogEntry(entry);
    console.error(formattedLog);

    // Immediately flush fatal errors
    if (this.isProduction) {
      this.addToBuffer(entry);
      this.flush();
    }
  }

  // Performance logging
  startTimer(category: LogCategory, operation: string, context?: LogContext): () => void {
    const startTime = Date.now();
    
    return () => {
      const duration = Date.now() - startTime;
      this.info(category, `${operation} completed`, context, { duration });
    };
  }

  // Contractor-specific logging methods
  logContractorRegistration(contractorId: string, step: string, success: boolean, metadata?: Record<string, any>): void {
    this.info('contractor', `Registration ${step} ${success ? 'succeeded' : 'failed'}`, {
      contractorId }, metadata);
  }

  logContractorLogin(contractorId: string, success: boolean, ipAddress?: string, userAgent?: string): void {
    const level = success ? 'info' : 'warn';
    this.log(level as LogLevel, 'auth', `Contractor login ${success ? 'successful' : 'failed'}`, {
      contractorId,
      ipAddress,
      userAgent });
  }

  logBackgroundCheck(contractorId: string, checkType: string, result: string, metadata?: Record<string, any>): void {
    this.info('background-check', `Background check ${checkType} completed with result: ${result}`, {
      contractorId }, metadata);
  }

  logCleanClaimsSync(contractorId: string, operation: string, success: boolean, recordsAffected?: number): void {
    this.info('clean-claims', `Clean Claims ${operation} ${success ? 'succeeded' : 'failed'}`, {
      contractorId }, { recordsAffected });
  }

  logPayment(contractorId: string, amount: number, type: string, success: boolean, transactionId?: string): void {
    const level = success ? 'info' : 'error';
    this.log(level as LogLevel, 'payment', `Payment ${type} ${success ? 'processed' : 'failed'}`, {
      contractorId }, { amount, transactionId });
  }

  logSecurityEvent(event: string, userId?: string, ipAddress?: string, metadata?: Record<string, any>): void {
    this.warn('security', event, {
      userId,
      ipAddress }, metadata);
  }

  // API logging
  logAPIRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: string,
    error?: Error
  ): void {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    
    this.log(level as LogLevel, 'api', `${method} ${path} - ${statusCode}`, {
      userId }, { duration, statusCode });
    
    if (error) {
      this.error('api', `API Error: ${method} ${path}`, error, { userId });
    }
  }

  // Cleanup
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    
    // Flush remaining logs
    if (this.buffer.length > 0) {
      this.flush();
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Ensure logs are flushed on process exit
if (typeof process !== 'undefined') {
  process.on('exit', () => logger.destroy());
  process.on('SIGINT', () => logger.destroy());
  process.on('SIGTERM', () => logger.destroy());
}

export default logger;