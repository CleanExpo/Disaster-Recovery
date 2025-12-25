'use server';

/**
 * Retry Strategy Service
 *
 * Implements exponential backoff and circuit breaker patterns
 * - Automatic retry with exponential backoff
 * - Circuit breaker to prevent cascading failures
 * - Jitter to prevent thundering herd
 * - Configurable retry policies per operation type
 */

export interface RetryPolicy {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  jitterFactor: number; // 0-1, adds randomness to delay
}

export interface CircuitBreakerConfig {
  failureThreshold: number; // Number of failures before opening
  successThreshold: number; // Number of successes before closing
  timeout: number; // Time to wait before half-open (ms)
}

export interface CircuitBreakerState {
  state: 'closed' | 'open' | 'half-open';
  failureCount: number;
  successCount: number;
  lastFailureTime?: Date;
}

const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxRetries: 3,
  initialDelayMs: 100,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
  jitterFactor: 0.1,
};

const DEFAULT_CIRCUIT_CONFIG: CircuitBreakerConfig = {
  failureThreshold: 5,
  successThreshold: 2,
  timeout: 60000,
};

class RetryStrategyService {
  private circuitBreakers = new Map<string, CircuitBreakerState>();
  private retryPolicies = new Map<string, RetryPolicy>();
  private operationHistories = new Map<string, { timestamp: Date; success: boolean }[]>();

  /**
   * Register custom retry policy for operation
   */
  registerRetryPolicy(operationType: string, policy: Partial<RetryPolicy>): void {
    this.retryPolicies.set(operationType, {
      ...DEFAULT_RETRY_POLICY,
      ...policy,
    });
  }

  /**
   * Register circuit breaker for operation
   */
  registerCircuitBreaker(operationType: string, config?: Partial<CircuitBreakerConfig>): void {
    const finalConfig = { ...DEFAULT_CIRCUIT_CONFIG, ...config };

    this.circuitBreakers.set(operationType, {
      state: 'closed',
      failureCount: 0,
      successCount: 0,
    });
  }

  /**
   * Execute operation with retry logic
   */
  async executeWithRetry<T>(
    operationType: string,
    operation: () => Promise<T>,
    policyOverride?: Partial<RetryPolicy>
  ): Promise<T> {
    const policy = {
      ...this.retryPolicies.get(operationType),
      ...DEFAULT_RETRY_POLICY,
      ...policyOverride,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= policy.maxRetries; attempt++) {
      try {
        // Check circuit breaker before attempting
        if (!this.canExecute(operationType)) {
          throw new Error(`Circuit breaker open for ${operationType}`);
        }

        const result = await operation();
        this.recordSuccess(operationType);
        return result;
      } catch (error) {
        lastError = error as Error;
        this.recordFailure(operationType);

        if (attempt < policy.maxRetries) {
          const delay = this.calculateDelay(attempt, policy);
          await this.sleep(delay);
        }
      }
    }

    throw lastError || new Error('Operation failed after all retries');
  }

  /**
   * Check if operation can execute (circuit breaker check)
   */
  private canExecute(operationType: string): boolean {
    const breaker = this.circuitBreakers.get(operationType);

    if (!breaker) {
      return true; // No circuit breaker configured
    }

    if (breaker.state === 'closed') {
      return true;
    }

    if (breaker.state === 'open') {
      // Check if timeout expired to transition to half-open
      const config = DEFAULT_CIRCUIT_CONFIG;
      if (breaker.lastFailureTime && Date.now() - breaker.lastFailureTime.getTime() >= config.timeout) {
        breaker.state = 'half-open';
        breaker.successCount = 0;
        return true;
      }

      return false;
    }

    // Half-open state allows attempts
    return true;
  }

  /**
   * Record successful operation
   */
  private recordSuccess(operationType: string): void {
    const breaker = this.circuitBreakers.get(operationType);

    if (breaker) {
      breaker.failureCount = 0;

      if (breaker.state === 'half-open') {
        breaker.successCount++;

        const config = DEFAULT_CIRCUIT_CONFIG;
        if (breaker.successCount >= config.successThreshold) {
          breaker.state = 'closed';
          breaker.successCount = 0;
        }
      }
    }

    this.recordHistory(operationType, true);
  }

  /**
   * Record failed operation
   */
  private recordFailure(operationType: string): void {
    const breaker = this.circuitBreakers.get(operationType);

    if (breaker) {
      breaker.failureCount++;
      breaker.lastFailureTime = new Date();

      const config = DEFAULT_CIRCUIT_CONFIG;
      if (breaker.failureCount >= config.failureThreshold) {
        breaker.state = 'open';
      }

      if (breaker.state === 'half-open') {
        // Any failure in half-open resets to open
        breaker.state = 'open';
        breaker.failureCount = config.failureThreshold;
      }
    }

    this.recordHistory(operationType, false);
  }

  /**
   * Calculate delay with exponential backoff and jitter
   */
  private calculateDelay(attempt: number, policy: RetryPolicy): number {
    const exponentialDelay = Math.min(
      policy.initialDelayMs * Math.pow(policy.backoffMultiplier, attempt),
      policy.maxDelayMs
    );

    // Add jitter
    const jitter = exponentialDelay * policy.jitterFactor * Math.random();

    return Math.floor(exponentialDelay + jitter);
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Record operation history for analytics
   */
  private recordHistory(operationType: string, success: boolean): void {
    if (!this.operationHistories.has(operationType)) {
      this.operationHistories.set(operationType, []);
    }

    const history = this.operationHistories.get(operationType)!;
    history.push({ timestamp: new Date(), success });

    // Keep only last 1000 records per operation
    if (history.length > 1000) {
      history.shift();
    }
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(operationType: string): CircuitBreakerState | null {
    return this.circuitBreakers.get(operationType) || null;
  }

  /**
   * Get all circuit breaker statuses
   */
  getAllCircuitBreakerStatuses(): Map<string, CircuitBreakerState> {
    return new Map(this.circuitBreakers);
  }

  /**
   * Get operation success rate
   */
  getSuccessRate(operationType: string, windowMs: number = 300000): number {
    const history = this.operationHistories.get(operationType);

    if (!history || history.length === 0) {
      return 1.0; // No history = assume healthy
    }

    const now = Date.now();
    const recentOps = history.filter((h) => now - h.timestamp.getTime() <= windowMs);

    if (recentOps.length === 0) {
      return 1.0;
    }

    const successes = recentOps.filter((h) => h.success).length;

    return successes / recentOps.length;
  }

  /**
   * Get operation statistics
   */
  getOperationStats(operationType: string) {
    const history = this.operationHistories.get(operationType) || [];
    const breaker = this.circuitBreakers.get(operationType);

    const total = history.length;
    const successes = history.filter((h) => h.success).length;
    const failures = total - successes;

    return {
      operationType,
      total,
      successes,
      failures,
      successRate: total > 0 ? successes / total : 0,
      circuitBreakerState: breaker?.state || 'not-configured',
      lastAttemptTime: history[history.length - 1]?.timestamp || null,
    };
  }

  /**
   * Reset circuit breaker
   */
  resetCircuitBreaker(operationType: string): void {
    const breaker = this.circuitBreakers.get(operationType);

    if (breaker) {
      breaker.state = 'closed';
      breaker.failureCount = 0;
      breaker.successCount = 0;
      breaker.lastFailureTime = undefined;
    }
  }

  /**
   * Reset all circuit breakers
   */
  resetAllCircuitBreakers(): void {
    for (const breaker of this.circuitBreakers.values()) {
      breaker.state = 'closed';
      breaker.failureCount = 0;
      breaker.successCount = 0;
      breaker.lastFailureTime = undefined;
    }
  }
}

// Export singleton instance
export const retryStrategy = new RetryStrategyService();

// Register default retry policies
retryStrategy.registerRetryPolicy('database-query', {
  maxRetries: 3,
  initialDelayMs: 100,
  maxDelayMs: 5000,
});

retryStrategy.registerRetryPolicy('external-api', {
  maxRetries: 4,
  initialDelayMs: 200,
  maxDelayMs: 15000,
});

retryStrategy.registerRetryPolicy('cache-operation', {
  maxRetries: 2,
  initialDelayMs: 50,
  maxDelayMs: 2000,
});

// Register circuit breakers
retryStrategy.registerCircuitBreaker('database-query');
retryStrategy.registerCircuitBreaker('external-api');
retryStrategy.registerCircuitBreaker('cache-operation');
