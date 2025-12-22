'use server';

import NodeCache from 'node-cache';

/**
 * Fallback Cache Service
 *
 * Maintains local cache for critical data when primary sources fail
 * - Last known state caching
 * - Stale data serving during outages
 * - Cache invalidation strategies
 * - Automatic cleanup of expired entries
 */

export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  ttl: number; // milliseconds
  stale: boolean;
  accessCount: number;
  lastAccessed: Date;
}

export interface CacheStats {
  totalEntries: number;
  freshEntries: number;
  staleEntries: number;
  memoryUsage: number; // bytes
  hitRate: number;
  averageAge: number; // milliseconds
}

class FallbackCacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private accessCounts = new Map<string, number>();
  private hitCount = 0;
  private missCount = 0;

  // Maximum cache size: 100MB
  private MAX_CACHE_SIZE = 100 * 1024 * 1024;
  private currentSize = 0;

  // Cleanup interval: every 5 minutes
  private CLEANUP_INTERVAL = 300000;

  constructor() {
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  /**
   * Set cache entry with TTL
   */
  set<T>(key: string, data: T, ttlMs: number = 3600000): void {
    // Calculate approximate size
    const size = JSON.stringify(data).length;

    if (this.currentSize + size > this.MAX_CACHE_SIZE) {
      this.evictLRU();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: new Date(),
      ttl: ttlMs,
      stale: false,
      accessCount: 0,
      lastAccessed: new Date(),
    };

    this.cache.set(key, entry);
    this.currentSize += size;
  }

  /**
   * Get cache entry
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      this.missCount++;
      return null;
    }

    const age = Date.now() - entry.timestamp.getTime();

    // Check if expired
    if (age > entry.ttl && !entry.stale) {
      entry.stale = true;
    }

    entry.accessCount++;
    entry.lastAccessed = new Date();
    this.hitCount++;

    return entry.data;
  }

  /**
   * Get entry with freshness check
   */
  getIfFresh<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      this.missCount++;
      return null;
    }

    const age = Date.now() - entry.timestamp.getTime();

    if (age > entry.ttl) {
      this.missCount++;
      return null;
    }

    entry.accessCount++;
    entry.lastAccessed = new Date();
    this.hitCount++;

    return entry.data;
  }

  /**
   * Get stale data (for degraded mode)
   */
  getIfAvailable<T>(key: string): T | null {
    return this.get<T>(key); // Returns stale data too
  }

  /**
   * Invalidate cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate entries by pattern
   */
  invalidateByPattern(pattern: RegExp | string): number {
    let invalidated = 0;
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern);

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        invalidated++;
      }
    }

    return invalidated;
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let lruTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      const entryTime = entry.lastAccessed.getTime();

      if (entryTime < lruTime) {
        lruTime = entryTime;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
    }
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      const age = now - entry.timestamp.getTime();

      // Remove entries older than 2x TTL
      if (age > entry.ttl * 2) {
        this.cache.delete(key);
        removed++;
      }
    }

    if (removed > 0) {
      console.log(`Cleanup: Removed ${removed} expired cache entries`);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    let freshEntries = 0;
    let staleEntries = 0;
    const now = Date.now();

    for (const entry of this.cache.values()) {
      if (entry.stale) {
        staleEntries++;
      } else {
        freshEntries++;
      }
    }

    // Calculate average age
    let totalAge = 0;
    for (const entry of this.cache.values()) {
      totalAge += now - entry.timestamp.getTime();
    }

    const averageAge = this.cache.size > 0 ? totalAge / this.cache.size : 0;

    return {
      totalEntries: this.cache.size,
      freshEntries,
      staleEntries,
      memoryUsage: this.currentSize,
      hitRate: this.hitCount + this.missCount > 0 ? this.hitCount / (this.hitCount + this.missCount) : 0,
      averageAge,
    };
  }

  /**
   * Get entry info
   */
  getEntryInfo(key: string) {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const age = Date.now() - entry.timestamp.getTime();

    return {
      key,
      age,
      ttl: entry.ttl,
      isExpired: age > entry.ttl,
      isStale: entry.stale,
      accessCount: entry.accessCount,
      lastAccessed: entry.lastAccessed,
      timestamp: entry.timestamp,
    };
  }

  /**
   * List all cache keys
   */
  keys(pattern?: string): string[] {
    const allKeys = Array.from(this.cache.keys());

    if (!pattern) {
      return allKeys;
    }

    const regex = new RegExp(pattern);
    return allKeys.filter((k) => regex.test(k));
  }

  /**
   * Get hit rate percentage
   */
  getHitRate(): number {
    const total = this.hitCount + this.missCount;
    return total > 0 ? (this.hitCount / total) * 100 : 0;
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.hitCount = 0;
    this.missCount = 0;
  }
}

// Export singleton instance
export const fallbackCache = new FallbackCacheService();
