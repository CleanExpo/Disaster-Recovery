"use strict";
/**
 * Advanced Logging Service
 *
 * Structured logging with correlation IDs, performance timing,
 * and multiple output levels suitable for production monitoring
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckLogger = exports.AdvancedLogger = void 0;
exports.createRequestLogger = createRequestLogger;
const crypto_1 = require("crypto");
// Thread-local context (simplified version)
let currentContext = {};
class AdvancedLogger {
    /**
     * Set correlation ID for logging context
     */
    static setCorrelationId(correlationId = (0, crypto_1.randomUUID)()) {
        currentContext.correlationId = correlationId;
        return correlationId;
    }
    /**
     * Set user ID for logging context
     */
    static setUserId(userId) {
        currentContext.userId = userId;
    }
    /**
     * Set request ID for logging context
     */
    static setRequestId(requestId) {
        currentContext.requestId = requestId;
    }
    /**
     * Set additional metadata for logging context
     */
    static setMetadata(metadata) {
        currentContext.metadata = {
            ...(currentContext.metadata || {}),
            ...metadata,
        };
    }
    /**
     * Clear current logging context
     */
    static clearContext() {
        currentContext = {};
    }
    /**
     * Get current context
     */
    static getContext() {
        return {
            ...currentContext,
            correlationId: currentContext.correlationId || (0, crypto_1.randomUUID)(),
            timestamp: new Date(),
        };
    }
    /**
     * Log debug message
     */
    static debug(message, metadata, duration) {
        this.log('debug', message, metadata, duration);
    }
    /**
     * Log info message
     */
    static info(message, metadata, duration) {
        this.log('info', message, metadata, duration);
    }
    /**
     * Log warning message
     */
    static warn(message, metadata, duration) {
        this.log('warn', message, metadata, duration);
    }
    /**
     * Log error message
     */
    static error(message, error, metadata, duration) {
        const context = this.getContext();
        context.duration = duration;
        context.metadata = metadata;
        const structuredLog = {
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
    static async timeAsync(message, fn, metadata) {
        const startTime = Date.now();
        try {
            const result = await fn();
            const duration = Date.now() - startTime;
            this.info(message, { ...metadata, status: 'success' }, duration);
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            this.error(message, error, { ...metadata, status: 'failed' }, duration);
            throw error;
        }
    }
    /**
     * Time a sync operation and log it
     */
    static timeSync(message, fn, metadata) {
        const startTime = Date.now();
        try {
            const result = fn();
            const duration = Date.now() - startTime;
            this.info(message, { ...metadata, status: 'success' }, duration);
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            this.error(message, error, { ...metadata, status: 'failed' }, duration);
            throw error;
        }
    }
    /**
     * Log database query
     */
    static logDatabaseQuery(query, duration, success, error) {
        this.log(success ? 'debug' : 'warn', 'Database query executed', {
            query: query.substring(0, 100), // Truncate long queries
            duration,
            success,
        }, duration);
        if (error) {
            this.error('Database query failed', error, { query });
        }
    }
    /**
     * Log API request
     */
    static logAPIRequest(method, path, statusCode, duration, metadata) {
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
    static logWebSocketEvent(event, userId, metadata) {
        this.info('WebSocket event', {
            event,
            userId,
            ...metadata,
        });
    }
    /**
     * Log cache hit/miss
     */
    static logCacheOperation(operation, key, metadata) {
        this.debug('Cache operation', {
            operation,
            key: key.substring(0, 50),
            ...metadata,
        });
    }
    /**
     * Log performance metric
     */
    static logPerformanceMetric(metric, value, unit = 'ms', metadata) {
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
    static log(level, message, metadata, duration) {
        const context = this.getContext();
        context.duration = duration;
        context.metadata = metadata;
        const structuredLog = {
            level,
            message,
            context,
        };
        this.outputLog(structuredLog);
    }
    /**
     * Output log (to console, file, or external service)
     */
    static outputLog(log) {
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
    static sendToRemote(log) {
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
    static createChild(context) {
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
exports.AdvancedLogger = AdvancedLogger;
/**
 * Request logging middleware
 */
function createRequestLogger() {
    return (req, res, next) => {
        const startTime = Date.now();
        const correlationId = AdvancedLogger.setCorrelationId(req.headers['x-correlation-id']);
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
        res.send = function (data) {
            const duration = Date.now() - startTime;
            AdvancedLogger.logAPIRequest(req.method, req.path, res.statusCode, duration);
            return originalSend.call(this, data);
        };
        next();
    };
}
/**
 * Health check logging
 */
class HealthCheckLogger {
    static logCheck(service, healthy, details) {
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
    static getStatus() {
        const status = {};
        for (const [service, check] of this.checks) {
            status[service] = {
                healthy: check.status,
                lastCheck: check.lastCheck.toISOString(),
            };
        }
        return status;
    }
}
exports.HealthCheckLogger = HealthCheckLogger;
HealthCheckLogger.checks = new Map();
