import { createClient, RedisClientType } from 'redis';
import logger from '@/config/logger';

class CacheService {
  private client: RedisClientType;
  private isConnected: boolean = false;
  private readonly defaultTTL: number = 3600; // 1 hour
  private readonly keyPrefix: string;

  constructor() {
    this.keyPrefix = process.env.CACHE_PREFIX || 'nrp_crm_core:';
    
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD,
      database: parseInt(process.env.REDIS_DB || '0'),
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis reconnection failed after 10 attempts');
            return false;
          }
          return Math.min(retries * 100, 3000);
        },
        connectTimeout: 5000,
        lazyConnect: true,
      },
    });

    this.setupEventListeners();
    this.connect();
  }

  private setupEventListeners(): void {
    this.client.on('connect', () => {
      logger.info('Redis client connected');
    });

    this.client.on('ready', () => {
      logger.info('Redis client ready');
      this.isConnected = true;
    });

    this.client.on('error', (err) => {
      logger.error('Redis client error:', err);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      logger.info('Redis client connection ended');
      this.isConnected = false;
    });

    this.client.on('reconnecting', () => {
      logger.info('Redis client reconnecting...');
    });
  }

  private async connect(): Promise<void> {
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      this.isConnected = false;
    }
  }

  private getKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  public async get<T = any>(key: string): Promise<T | null> {
    if (!this.isConnected) {
      logger.warn('Redis not connected, cache miss for key:', key);
      return null;
    }

    try {
      const value = await this.client.get(this.getKey(key));
      if (value === null) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  public async set(
    key: string,
    value: any,
    ttl: number = this.defaultTTL
  ): Promise<boolean> {
    if (!this.isConnected) {
      logger.warn('Redis not connected, skipping cache set for key:', key);
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      await this.client.setEx(this.getKey(key), ttl, serialized);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  public async del(key: string | string[]): Promise<boolean> {
    if (!this.isConnected) {
      logger.warn('Redis not connected, skipping cache delete');
      return false;
    }

    try {
      const keys = Array.isArray(key) ? key.map(k => this.getKey(k)) : [this.getKey(key)];
      await this.client.del(keys);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }

  public async exists(key: string): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      const result = await this.client.exists(this.getKey(key));
      return result === 1;
    } catch (error) {
      logger.error('Cache exists error:', error);
      return false;
    }
  }

  public async increment(key: string, value: number = 1): Promise<number> {
    if (!this.isConnected) {
      throw new Error('Redis not connected');
    }

    try {
      return await this.client.incrBy(this.getKey(key), value);
    } catch (error) {
      logger.error('Cache increment error:', error);
      throw error;
    }
  }

  public async expire(key: string, ttl: number): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      await this.client.expire(this.getKey(key), ttl);
      return true;
    } catch (error) {
      logger.error('Cache expire error:', error);
      return false;
    }
  }

  public async flushByPattern(pattern: string): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    try {
      const keys = await this.client.keys(this.getKey(pattern));
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return true;
    } catch (error) {
      logger.error('Cache flush by pattern error:', error);
      return false;
    }
  }

  public async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.defaultTTL
  ): Promise<T> {
    try {
      // Try to get from cache first
      const cached = await this.get<T>(key);
      if (cached !== null) {
        return cached;
      }

      // If not in cache, fetch and set
      const value = await fetcher();
      await this.set(key, value, ttl);
      return value;
    } catch (error) {
      logger.error('Cache getOrSet error:', error);
      // If cache fails, still return the fetched value
      return await fetcher();
    }
  }

  public async mget<T>(keys: string[]): Promise<(T | null)[]> {
    if (!this.isConnected || keys.length === 0) {
      return keys.map(() => null);
    }

    try {
      const redisKeys = keys.map(key => this.getKey(key));
      const values = await this.client.mGet(redisKeys);
      
      return values.map(value => {
        if (value === null) return null;
        try {
          return JSON.parse(value) as T;
        } catch {
          return null;
        }
      });
    } catch (error) {
      logger.error('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  public async mset(entries: Array<[string, any]>, ttl?: number): Promise<boolean> {
    if (!this.isConnected || entries.length === 0) {
      return false;
    }

    try {
      const pipeline = this.client.multi();
      
      for (const [key, value] of entries) {
        const serialized = JSON.stringify(value);
        if (ttl) {
          pipeline.setEx(this.getKey(key), ttl, serialized);
        } else {
          pipeline.set(this.getKey(key), serialized);
        }
      }

      await pipeline.exec();
      return true;
    } catch (error) {
      logger.error('Cache mset error:', error);
      return false;
    }
  }

  public async getTTL(key: string): Promise<number> {
    if (!this.isConnected) {
      return -1;
    }

    try {
      return await this.client.ttl(this.getKey(key));
    } catch (error) {
      logger.error('Cache getTTL error:', error);
      return -1;
    }
  }

  public async health(): Promise<{ connected: boolean; latency?: number }> {
    if (!this.isConnected) {
      return { connected: false };
    }

    try {
      const start = Date.now();
      await this.client.ping();
      const latency = Date.now() - start;
      
      return { connected: true, latency };
    } catch (error) {
      logger.error('Cache health check error:', error);
      return { connected: false };
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.client.isOpen) {
        await this.client.quit();
      }
      this.isConnected = false;
      logger.info('Redis client disconnected');
    } catch (error) {
      logger.error('Error disconnecting Redis client:', error);
    }
  }

  // Utility method for cache invalidation by tags
  public async invalidateByTags(tags: string[]): Promise<boolean> {
    if (!this.isConnected || tags.length === 0) {
      return false;
    }

    try {
      const promises = tags.map(tag => this.flushByPattern(`*:tag:${tag}:*`));
      await Promise.all(promises);
      return true;
    } catch (error) {
      logger.error('Cache invalidate by tags error:', error);
      return false;
    }
  }

  // Method for distributed locking
  public async acquireLock(
    lockKey: string,
    ttl: number = 30,
    identifier?: string
  ): Promise<string | null> {
    if (!this.isConnected) {
      return null;
    }

    const lockIdentifier = identifier || `${Date.now()}-${Math.random()}`;
    const key = this.getKey(`lock:${lockKey}`);

    try {
      const result = await this.client.set(key, lockIdentifier, {
        PX: ttl * 1000,
        NX: true,
      });

      return result === 'OK' ? lockIdentifier : null;
    } catch (error) {
      logger.error('Lock acquisition error:', error);
      return null;
    }
  }

  public async releaseLock(lockKey: string, identifier: string): Promise<boolean> {
    if (!this.isConnected) {
      return false;
    }

    const key = this.getKey(`lock:${lockKey}`);
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    try {
      const result = await this.client.eval(script, {
        keys: [key],
        arguments: [identifier],
      });
      return result === 1;
    } catch (error) {
      logger.error('Lock release error:', error);
      return false;
    }
  }
}

// Export singleton instance
export const cache = new CacheService();
export default cache;