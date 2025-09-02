import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cache from '@/utils/cache';
import logger from '@/config/logger';

/**
 * Security configuration
 */
export const securityConfig = {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
    ],
    exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining', 'X-Rate-Limit-Reset'],
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    frameguard: { action: 'deny' },
    xssFilter: true,
    referrerPolicy: { policy: 'same-origin' },
  },
  compression: {
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024,
  },
};

/**
 * Rate limiting configuration
 */
const rateLimitConfig = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request): string => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  },
  handler: (req: Request, res: Response) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl,
    });
    
    res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.round(rateLimitConfig.windowMs / 1000),
    });
  },
};

/**
 * Redis-based rate limiter for authenticated users
 */
let redisRateLimiter: RateLimiterRedis | null = null;

try {
  if (process.env.REDIS_URL) {
    redisRateLimiter = new RateLimiterRedis({
      storeClient: cache as any,
      keyPrefix: 'rate_limit',
      points: 100, // Number of requests
      duration: 900, // Per 15 minutes
      blockDuration: 900, // Block for 15 minutes
    });
  }
} catch (error) {
  logger.warn('Redis rate limiter not available, falling back to memory');
}

/**
 * Basic rate limiter using express-rate-limit
 */
export const basicRateLimit = rateLimit(rateLimitConfig);

/**
 * Strict rate limiter for sensitive endpoints
 */
export const strictRateLimit = rateLimit({
  ...rateLimitConfig,
  windowMs: 600000, // 10 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many sensitive requests. Please wait before trying again.',
  },
});

/**
 * Auth-specific rate limiter
 */
export const authRateLimit = rateLimit({
  ...rateLimitConfig,
  windowMs: 900000, // 15 minutes
  max: 10, // 10 login attempts per window
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
});

/**
 * Redis-based rate limiter middleware
 */
export const redisRateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!redisRateLimiter) {
    return next();
  }

  try {
    const key = req.ip || req.connection.remoteAddress || 'unknown';
    const result = await redisRateLimiter.consume(key);
    
    // Add rate limit headers
    res.set({
      'X-RateLimit-Limit': '100',
      'X-RateLimit-Remaining': result.remainingPoints?.toString() || '0',
      'X-RateLimit-Reset': new Date(Date.now() + result.msBeforeNext).toISOString(),
    });

    next();
  } catch (rejRes: any) {
    logger.warn('Redis rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl,
    });

    res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.round(rejRes.msBeforeNext / 1000) || 900,
    });
  }
};

/**
 * Request size limiter
 */
export const requestSizeLimit = (maxSize: string = '10mb') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const contentLength = parseInt(req.get('content-length') || '0');
    const maxSizeBytes = parseSize(maxSize);

    if (contentLength > maxSizeBytes) {
      logger.warn('Request size exceeded', {
        ip: req.ip,
        contentLength,
        maxSize: maxSizeBytes,
        url: req.originalUrl,
      });

      res.status(413).json({
        success: false,
        message: 'Request entity too large',
      });
      return;
    }

    next();
  };
};

/**
 * IP whitelist middleware
 */
export const ipWhitelist = (allowedIPs: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (allowedIPs.length === 0) {
      return next();
    }

    const clientIP = req.ip || req.connection.remoteAddress;
    
    if (!clientIP || !allowedIPs.includes(clientIP)) {
      logger.warn('IP not whitelisted', {
        ip: clientIP,
        allowedIPs,
        url: req.originalUrl,
      });

      res.status(403).json({
        success: false,
        message: 'Access denied',
      });
      return;
    }

    next();
  };
};

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Log request
  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    referrer: req.get('Referrer'),
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(obj: any) {
    const duration = Date.now() - startTime;
    
    logger.info('Outgoing response', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      ip: req.ip,
    });

    return originalJson.call(this, obj);
  };

  next();
};

/**
 * API key validation middleware
 */
export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.get('X-API-Key');
  const validApiKeys = process.env.API_KEYS?.split(',') || [];

  if (validApiKeys.length === 0) {
    return next(); // No API key validation if not configured
  }

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    logger.warn('Invalid API key', {
      ip: req.ip,
      apiKey: apiKey ? 'provided' : 'missing',
      url: req.originalUrl,
    });

    res.status(401).json({
      success: false,
      message: 'Valid API key required',
    });
    return;
  }

  next();
};

/**
 * Security headers middleware
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  // Remove potentially sensitive headers
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');

  // Add security headers
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'same-origin',
    'Feature-Policy': "geolocation 'none'; microphone 'none'; camera 'none'",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  });

  next();
};

/**
 * Request ID middleware
 */
export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const id = req.get('X-Request-ID') || generateRequestId();
  
  req.headers['x-request-id'] = id;
  res.set('X-Request-ID', id);
  
  next();
};

/**
 * User agent validation middleware
 */
export const validateUserAgent = (req: Request, res: Response, next: NextFunction): void => {
  const userAgent = req.get('User-Agent');
  
  if (!userAgent) {
    logger.warn('Missing user agent', {
      ip: req.ip,
      url: req.originalUrl,
    });
  }

  // Block known bad user agents
  const blockedUserAgents = [
    'curl',
    'wget',
    'python-requests',
    'bot',
    'crawler',
    'spider',
  ];

  if (userAgent && blockedUserAgents.some(blocked => 
    userAgent.toLowerCase().includes(blocked.toLowerCase())
  )) {
    logger.warn('Blocked user agent', {
      ip: req.ip,
      userAgent,
      url: req.originalUrl,
    });

    res.status(403).json({
      success: false,
      message: 'Access denied',
    });
    return;
  }

  next();
};

/**
 * Helper functions
 */
function parseSize(size: string): number {
  const units: Record<string, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
  };

  const match = size.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*([kmg]?b)$/);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2] as keyof typeof units;

  return Math.round(value * units[unit]);
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Initialize security middleware
 */
export function initializeSecurity() {
  return [
    helmet(securityConfig.helmet),
    cors(securityConfig.cors),
    compression(securityConfig.compression),
    securityHeaders,
    requestId,
    requestLogger,
    requestSizeLimit(),
    basicRateLimit,
  ];
}

export default {
  initializeSecurity,
  basicRateLimit,
  strictRateLimit,
  authRateLimit,
  redisRateLimit,
  requestSizeLimit,
  ipWhitelist,
  requestLogger,
  validateApiKey,
  securityHeaders,
  requestId,
  validateUserAgent,
  securityConfig,
};