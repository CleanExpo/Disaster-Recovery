/**
 * Rate Limiter - Token Bucket Algorithm
 *
 * Ensures API rate limits are respected across SEMRUSH and DataForSEO
 * - SEMRUSH: 10 requests/second, 10,000 requests/day
 * - DataForSEO: 2,000 units/day, task-based polling
 */

interface RateLimitConfig {
  maxRequests: number;      // Max requests per interval
  intervalMs: number;        // Time window in milliseconds
  maxDailyRequests?: number; // Daily limit
  maxConcurrent?: number;    // Max concurrent requests
}

interface QueuedRequest {
  id: string;
  priority: number;
  execute: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  createdAt: number;
}

export class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number;
  private lastRefill: number;
  private queue: QueuedRequest[] = [];
  private activeRequests = 0;
  private dailyRequests = 0;
  private dailyResetTime: number;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.maxTokens = config.maxRequests;
    this.tokens = config.maxRequests;
    this.refillRate = config.maxRequests / (config.intervalMs / 1000);
    this.lastRefill = Date.now();
    this.dailyResetTime = this.getNextDayResetTime();

    // Start queue processor
    this.processQueue();

    // Start token refill interval
    setInterval(() => this.refillTokens(), 100);
  }

  /**
   * Execute a request with rate limiting
   */
  async execute<T>(
    fn: () => Promise<T>,
    priority: number = 5
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const request: QueuedRequest = {
        id: Math.random().toString(36).substring(7),
        priority,
        execute: fn,
        resolve,
        reject,
        createdAt: Date.now(),
      };

      this.queue.push(request);
      this.sortQueue();
    });
  }

  /**
   * Refill tokens based on time elapsed
   */
  private refillTokens(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
    this.lastRefill = now;

    // Reset daily counter if needed
    if (now > this.dailyResetTime) {
      this.dailyRequests = 0;
      this.dailyResetTime = this.getNextDayResetTime();
    }
  }

  /**
   * Process queued requests
   */
  private async processQueue(): Promise<void> {
    setInterval(async () => {
      // Check daily limit
      if (
        this.config.maxDailyRequests &&
        this.dailyRequests >= this.config.maxDailyRequests
      ) {
        return;
      }

      // Check concurrent limit
      if (
        this.config.maxConcurrent &&
        this.activeRequests >= this.config.maxConcurrent
      ) {
        return;
      }

      // Check if we have tokens and queued requests
      if (this.tokens >= 1 && this.queue.length > 0) {
        const request = this.queue.shift()!;
        this.tokens -= 1;
        this.dailyRequests += 1;
        this.activeRequests += 1;

        try {
          const result = await request.execute();
          request.resolve(result);
        } catch (error) {
          request.reject(error);
        } finally {
          this.activeRequests -= 1;
        }
      }
    }, 100);
  }

  /**
   * Sort queue by priority (higher priority first)
   */
  private sortQueue(): void {
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Get next day reset time (midnight)
   */
  private getNextDayResetTime(): number {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.getTime();
  }

  /**
   * Get current stats
   */
  getStats() {
    return {
      availableTokens: Math.floor(this.tokens),
      maxTokens: this.maxTokens,
      queueLength: this.queue.length,
      activeRequests: this.activeRequests,
      dailyRequests: this.dailyRequests,
      dailyLimit: this.config.maxDailyRequests,
      timeUntilDailyReset: this.dailyResetTime - Date.now(),
    };
  }

  /**
   * Wait for available capacity
   */
  async waitForCapacity(timeout: number = 30000): Promise<boolean> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.tokens >= 1) {
          clearInterval(checkInterval);
          resolve(true);
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          resolve(false);
        }
      }, 100);
    });
  }
}

// Pre-configured rate limiters
export const semrushRateLimiter = new RateLimiter({
  maxRequests: 10,           // 10 requests per second
  intervalMs: 1000,          // 1 second window
  maxDailyRequests: 10000,   // 10k requests per day
  maxConcurrent: 5,          // Max 5 concurrent requests
});

export const dataForSeoRateLimiter = new RateLimiter({
  maxRequests: 2,            // Conservative: 2 requests per second
  intervalMs: 1000,          // 1 second window
  maxDailyRequests: 2000,    // 2k units per day
  maxConcurrent: 3,          // Max 3 concurrent requests
});
