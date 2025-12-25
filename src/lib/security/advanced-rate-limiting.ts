import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

/**
 * Advanced Rate Limiting Service
 *
 * Multi-level rate limiting based on user, IP, and action type
 * with graduated penalties and DDoS protection
 */

interface RateLimitConfig {
  points: number; // Consumed points per action
  duration: number; // Window duration in seconds
  blockDuration?: number; // Block duration after limit exceeded
  keyPrefix: string; // Redis key prefix
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAfter: number; // Seconds
  retryAfter?: number; // For rate limited responses
}

// Rate limit configurations for different actions
const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  // Message actions
  'message:send': {
    points: 1,
    duration: 1, // 1 second
    keyPrefix: 'msg_send',
  },
  'message:edit': {
    points: 1,
    duration: 5,
    keyPrefix: 'msg_edit',
  },
  'message:delete': {
    points: 1,
    duration: 5,
    keyPrefix: 'msg_delete',
  },

  // Reaction actions
  'reaction:add': {
    points: 1,
    duration: 1,
    keyPrefix: 'reaction',
  },

  // File actions
  'file:upload': {
    points: 5,
    duration: 60, // 5 uploads per minute
    blockDuration: 300,
    keyPrefix: 'file_upload',
  },

  // Authentication
  'auth:login': {
    points: 1,
    duration: 60,
    blockDuration: 900, // 15 minute block after 5 failed attempts
    keyPrefix: 'auth_login',
  },
  'auth:register': {
    points: 1,
    duration: 3600, // 1 per hour per IP
    blockDuration: 86400,
    keyPrefix: 'auth_register',
  },

  // API actions
  'api:call': {
    points: 1,
    duration: 60,
    keyPrefix: 'api_call',
  },

  // Global IP-based limits
  'ip:global': {
    points: 1,
    duration: 1,
    keyPrefix: 'ip_global',
  },
};

// Per-action limits
const ACTION_LIMITS: Record<string, number> = {
  'message:send': 5, // 5 per second
  'message:edit': 10, // 10 per 5 seconds
  'message:delete': 10, // 10 per 5 seconds
  'reaction:add': 10, // 10 per second
  'file:upload': 5, // 5 per minute
  'auth:login': 5, // 5 per minute
  'auth:register': 1, // 1 per hour per IP
  'api:call': 100, // 100 per minute
  'ip:global': 1000, // 1000 per second globally
};

// Rate limiters by action
const rateLimiters = new Map<string, RateLimiterMemory>();

// Whitelist - IPs or user IDs that bypass rate limiting
const whitelist = new Set<string>([
  // Add trusted IPs/users here
]);

// Blacklist - IPs that are blocked
const blacklist = new Set<string>([
  // Add malicious IPs here
]);

export class AdvancedRateLimiter {
  /**
   * Initialize rate limiters
   */
  static initialize(): void {
    for (const [action, config] of Object.entries(RATE_LIMIT_CONFIGS)) {
      const limiter = new RateLimiterMemory({
        points: ACTION_LIMITS[action] || config.points * config.duration,
        duration: config.duration,
        blockDuration: config.blockDuration,
      });
      rateLimiters.set(action, limiter);
    }
    console.log('Rate limiters initialized');
  }

  /**
   * Check rate limit for an action
   */
  static async checkLimit(
    action: string,
    userId: string,
    ipAddress: string
  ): Promise<RateLimitResult> {
    try {
      // Check blacklist
      if (blacklist.has(ipAddress) || blacklist.has(userId)) {
        return {
          success: false,
          remaining: 0,
          resetAfter: 3600,
          retryAfter: 3600,
        };
      }

      // Check whitelist
      if (whitelist.has(ipAddress) || whitelist.has(userId)) {
        return {
          success: true,
          remaining: 999,
          resetAfter: 0,
        };
      }

      const limiter = rateLimiters.get(action);
      if (!limiter) {
        return {
          success: true,
          remaining: 999,
          resetAfter: 0,
        };
      }

      // Create composite key: action:userId:ipAddress
      const key = `${action}:${userId}:${ipAddress}`;

      try {
        const result = await limiter.consume(key, 1);
        return {
          success: true,
          remaining: result.remainingPoints,
          resetAfter: result.msBeforeNext / 1000,
        };
      } catch (rejectedRes: any) {
        // Rate limit exceeded
        return {
          success: false,
          remaining: rejectedRes.remainingPoints || 0,
          resetAfter: rejectedRes.msBeforeNext / 1000 || 60,
          retryAfter: rejectedRes.msBeforeNext / 1000 || 60,
        };
      }
    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Allow on error (fail open)
      return {
        success: true,
        remaining: 999,
        resetAfter: 0,
      };
    }
  }

  /**
   * Check IP-based global limit
   */
  static async checkIPGlobalLimit(ipAddress: string): Promise<RateLimitResult> {
    return this.checkLimit('ip:global', 'global', ipAddress);
  }

  /**
   * Check per-user daily limit
   */
  static async checkUserDailyLimit(userId: string): Promise<RateLimitResult> {
    try {
      // This would check total API calls per user per day
      // For now, using message send as proxy
      const limiter = rateLimiters.get('message:send');
      if (!limiter) {
        return {
          success: true,
          remaining: 999,
          resetAfter: 0,
        };
      }

      const key = `daily:${userId}`;
      try {
        const result = await limiter.consume(key, 1);
        return {
          success: true,
          remaining: result.remainingPoints,
          resetAfter: result.msBeforeNext / 1000,
        };
      } catch (rejectedRes: any) {
        return {
          success: false,
          remaining: rejectedRes.remainingPoints || 0,
          resetAfter: rejectedRes.msBeforeNext / 1000,
          retryAfter: rejectedRes.msBeforeNext / 1000,
        };
      }
    } catch (error) {
      console.error('Daily limit check failed:', error);
      return {
        success: true,
        remaining: 999,
        resetAfter: 0,
      };
    }
  }

  /**
   * Add IP to blacklist
   */
  static blacklistIP(ipAddress: string, duration: number = 3600): void {
    blacklist.add(ipAddress);
    // Auto-remove after duration
    setTimeout(() => {
      blacklist.delete(ipAddress);
    }, duration * 1000);
  }

  /**
   * Add IP to whitelist
   */
  static whitelistIP(ipAddress: string): void {
    whitelist.add(ipAddress);
  }

  /**
   * Remove IP from blacklist
   */
  static unblacklistIP(ipAddress: string): void {
    blacklist.delete(ipAddress);
  }

  /**
   * Remove IP from whitelist
   */
  static unwhitelistIP(ipAddress: string): void {
    whitelist.delete(ipAddress);
  }

  /**
   * Get rate limit status
   */
  static async getStatus(
    action: string,
    userId: string,
    ipAddress: string
  ): Promise<{
    action: string;
    isBlacklisted: boolean;
    isWhitelisted: boolean;
    limit: RateLimitResult;
  }> {
    const limit = await this.checkLimit(action, userId, ipAddress);

    return {
      action,
      isBlacklisted: blacklist.has(ipAddress) || blacklist.has(userId),
      isWhitelisted: whitelist.has(ipAddress) || whitelist.has(userId),
      limit,
    };
  }

  /**
   * Reset rate limit for a user
   */
  static resetUserLimit(action: string, userId: string, ipAddress: string): void {
    try {
      const limiter = rateLimiters.get(action);
      if (limiter) {
        const key = `${action}:${userId}:${ipAddress}`;
        // Note: RateLimiterMemory doesn't have a direct reset method
        // This would need to be implemented with Redis backend
      }
    } catch (error) {
      console.error('Failed to reset rate limit:', error);
    }
  }

  /**
   * Get all rate limiters configuration
   */
  static getConfiguration() {
    return {
      limiters: Array.from(rateLimiters.keys()),
      configs: RATE_LIMIT_CONFIGS,
      limits: ACTION_LIMITS,
      blacklist: Array.from(blacklist),
      whitelist: Array.from(whitelist),
    };
  }

  /**
   * Progressive penalty for repeated violations
   */
  static async applyProgressivePenalty(
    ipAddress: string,
    violationCount: number
  ): Promise<void> {
    if (violationCount >= 5) {
      // First level: 1 hour block
      this.blacklistIP(ipAddress, 3600);
    } else if (violationCount >= 10) {
      // Second level: 24 hour block
      this.blacklistIP(ipAddress, 86400);
    } else if (violationCount >= 20) {
      // Third level: 1 week block
      this.blacklistIP(ipAddress, 604800);
      console.warn(`IP ${ipAddress} blocked for 1 week due to repeated violations`);
    }
  }

  /**
   * Check distributed rate limit (for multiple servers)
   * In production, use Redis backend
   */
  static async checkDistributedLimit(
    action: string,
    userId: string,
    ipAddress: string
  ): Promise<RateLimitResult> {
    // For now, use the same logic
    // In production with Redis:
    // const redis = new Redis(process.env.REDIS_URL);
    // const key = `ratelimit:${action}:${userId}:${ipAddress}`;
    // const count = await redis.incr(key);
    // await redis.expire(key, RATE_LIMIT_CONFIGS[action].duration);
    // return { success: count <= limit, ... };

    return this.checkLimit(action, userId, ipAddress);
  }
}

// Initialize on import
AdvancedRateLimiter.initialize();
