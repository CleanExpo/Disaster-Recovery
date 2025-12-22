/**
 * Unit tests for resilience services
 *
 * Tests for:
 * - Graceful degradation
 * - Retry strategy with circuit breaker
 * - Fallback cache
 * - Error handling
 */

import { gracefulDegradation } from '@/lib/resilience/graceful-degradation'
import { retryStrategy } from '@/lib/resilience/retry-strategy'
import { fallbackCache } from '@/lib/resilience/fallback-cache'
import { errorHandler, ValidationError, TimeoutError } from '@/lib/resilience/error-handler'

describe('Graceful Degradation Service', () => {
  beforeEach(() => {
    gracefulDegradation.initializeServices(['database', 'redis', 'socket-io'])
  })

  it('should mark service as down', () => {
    gracefulDegradation.markServiceDown('database')
    const statuses = gracefulDegradation.getServiceStatuses()

    expect(statuses).toContainEqual(
      expect.objectContaining({
        name: 'database',
        healthy: false,
      })
    )
  })

  it('should update degradation level', () => {
    gracefulDegradation.markServiceDown('database')
    gracefulDegradation.markServiceDown('redis')

    const level = gracefulDegradation.getDegradationLevel()

    expect(level.level).toBe('degraded')
    expect(level.cacheEnabled).toBe(true)
  })

  it('should check feature availability', () => {
    gracefulDegradation.markServiceDown('database')
    const available = gracefulDegradation.isFeatureAvailable('persistence')

    expect(available).toBe(false)
  })

  it('should queue operations when service is down', () => {
    const success = gracefulDegradation.queueOperation({
      type: 'send-email',
      payload: { to: 'user@example.com', subject: 'Test' },
      priority: 'normal',
      createdAt: new Date(),
      retries: 0,
    })

    expect(success).toBe(true)
  })
})

describe('Retry Strategy Service', () => {
  beforeEach(() => {
    retryStrategy.resetAllCircuitBreakers()
  })

  it('should execute operation with retry', async () => {
    let attempts = 0
    const operation = jest.fn(async () => {
      attempts++
      if (attempts < 2) {
        throw new Error('Temporary failure')
      }
      return 'success'
    })

    const result = await retryStrategy.executeWithRetry('test-op', operation)

    expect(result).toBe('success')
    expect(attempts).toBe(2)
  })

  it('should fail after max retries', async () => {
    const operation = jest.fn(async () => {
      throw new Error('Permanent failure')
    })

    await expect(
      retryStrategy.executeWithRetry('test-op', operation, { maxRetries: 2 })
    ).rejects.toThrow()
  })

  it('should track circuit breaker state', () => {
    retryStrategy.registerCircuitBreaker('test-service')

    const status = retryStrategy.getCircuitBreakerStatus('test-service')

    expect(status).toBeDefined()
    expect(status?.state).toBe('closed')
  })

  it('should get operation success rate', () => {
    const rate = retryStrategy.getSuccessRate('non-existent')

    // No history = assume healthy
    expect(rate).toBe(1.0)
  })
})

describe('Fallback Cache Service', () => {
  beforeEach(() => {
    fallbackCache.clear()
  })

  it('should cache data with TTL', () => {
    const key = 'test-key'
    const data = { name: 'Test Data' }

    fallbackCache.set(key, data, 5000)
    const cached = fallbackCache.get(key)

    expect(cached).toEqual(data)
  })

  it('should return null for expired cache', async () => {
    const key = 'expired-key'
    fallbackCache.set(key, { value: 'test' }, 100) // 100ms TTL

    await new Promise((resolve) => setTimeout(resolve, 150))

    const cached = fallbackCache.getIfFresh(key)

    expect(cached).toBeNull()
  })

  it('should invalidate by pattern', () => {
    fallbackCache.set('user:1', { id: 1 })
    fallbackCache.set('user:2', { id: 2 })
    fallbackCache.set('room:1', { id: 1 })

    const removed = fallbackCache.invalidateByPattern('user:.*')

    expect(removed).toBe(2)
    expect(fallbackCache.get('room:1')).toBeDefined()
  })

  it('should track hit rate', () => {
    fallbackCache.set('key', { data: 'test' })

    fallbackCache.get('key') // Hit
    fallbackCache.get('missing') // Miss

    const hitRate = fallbackCache.getHitRate()

    expect(hitRate).toBe(50) // 1 hit out of 2 attempts
  })

  it('should get cache statistics', () => {
    fallbackCache.set('key1', { a: 1 })
    fallbackCache.set('key2', { b: 2 })

    const stats = fallbackCache.getStats()

    expect(stats.totalEntries).toBe(2)
    expect(stats.freshEntries).toBe(2)
    expect(stats.staleEntries).toBe(0)
  })
})

describe('Error Handler', () => {
  it('should handle validation errors', () => {
    const error = new ValidationError('Invalid input')
    const response = errorHandler.handle(error)

    expect(response.status).toBe(400)
  })

  it('should handle timeout errors', () => {
    const error = new TimeoutError('Operation timeout')
    const response = errorHandler.handle(error)

    expect(response.status).toBe(408)
  })

  it('should get correct status code for error', () => {
    const validationError = new ValidationError('Test')
    const status = errorHandler.getStatusCode(validationError)

    expect(status).toBe(400)
  })

  it('should identify retriable errors', () => {
    const retriableError = new TimeoutError()
    const nonRetriableError = new ValidationError('Test')

    expect(errorHandler.isRetriable(retriableError)).toBe(true)
    expect(errorHandler.isRetriable(nonRetriableError)).toBe(false)
  })
})
