import Redis from 'ioredis';
import { logger } from '../logger';

/**
 * Redis Configuration for AI Worker Queue System
 * Production-Ready Configuration with Connection Pooling
 */

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  maxRetriesPerRequest: number | null;
  enableReadyCheck: boolean;
  retryStrategy?: (times: number) => number | void;
  lazyConnect?: boolean;
}

const getRedisConfig = (): RedisConfig => {
  const config: RedisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
    retryStrategy: (times: number) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  };

  return config;
};

/**
 * Redis Connection Manager
 * Singleton pattern for connection pooling
 */
class RedisConnectionManager {
  private static instance: RedisConnectionManager;
  private client: Redis | null = null;
  private subscriber: Redis | null = null;
  private publisher: Redis | null = null;
  private isConnecting = false;

  private constructor() {}

  public static getInstance(): RedisConnectionManager {
    if (!RedisConnectionManager.instance) {
      RedisConnectionManager.instance = new RedisConnectionManager();
    }
    return RedisConnectionManager.instance;
  }

  /**
   * Get or create main Redis client
   */
  public async getClient(): Promise<Redis> {
    if (this.client && this.client.status === 'ready') {
      return this.client;
    }

    if (this.isConnecting) {
      await this.waitForConnection();
      return this.client!;
    }

    this.isConnecting = true;

    try {
      const config = getRedisConfig();
      this.client = new Redis(config);

      this.client.on('error', (error) => {
        logger.error('Redis Client Error:', error);
      });

      this.client.on('connect', () => {
        logger.info('Redis Client Connected');
      });

      this.client.on('ready', () => {
        logger.info('Redis Client Ready');
        this.isConnecting = false;
      });

      this.client.on('close', () => {
        logger.warn('Redis Client Connection Closed');
      });

      await this.client.connect();
      return this.client;
    } catch (error) {
      this.isConnecting = false;
      logger.error('Failed to connect Redis client:', error);
      throw error;
    }
  }

  /**
   * Get or create subscriber client for pub/sub
   */
  public async getSubscriber(): Promise<Redis> {
    if (this.subscriber && this.subscriber.status === 'ready') {
      return this.subscriber;
    }

    try {
      const config = getRedisConfig();
      this.subscriber = new Redis(config);

      this.subscriber.on('error', (error) => {
        logger.error('Redis Subscriber Error:', error);
      });

      this.subscriber.on('connect', () => {
        logger.info('Redis Subscriber Connected');
      });

      await this.subscriber.connect();
      return this.subscriber;
    } catch (error) {
      logger.error('Failed to connect Redis subscriber:', error);
      throw error;
    }
  }

  /**
   * Get or create publisher client for pub/sub
   */
  public async getPublisher(): Promise<Redis> {
    if (this.publisher && this.publisher.status === 'ready') {
      return this.publisher;
    }

    try {
      const config = getRedisConfig();
      this.publisher = new Redis(config);

      this.publisher.on('error', (error) => {
        logger.error('Redis Publisher Error:', error);
      });

      this.publisher.on('connect', () => {
        logger.info('Redis Publisher Connected');
      });

      await this.publisher.connect();
      return this.publisher;
    } catch (error) {
      logger.error('Failed to connect Redis publisher:', error);
      throw error;
    }
  }

  /**
   * Wait for connection to be established
   */
  private async waitForConnection(timeout = 10000): Promise<void> {
    const start = Date.now();
    while (this.isConnecting && Date.now() - start < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (this.isConnecting) {
      throw new Error('Redis connection timeout');
    }
  }

  /**
   * Health check for Redis connection
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.ping();
      return true;
    } catch (error) {
      logger.error('Redis health check failed:', error);
      return false;
    }
  }

  /**
   * Close all Redis connections
   */
  public async closeAll(): Promise<void> {
    const promises: Promise<void>[] = [];

    if (this.client) {
      promises.push(
        this.client.quit().catch((error) => {
          logger.error('Error closing Redis client:', error);
        })
      );
      this.client = null;
    }

    if (this.subscriber) {
      promises.push(
        this.subscriber.quit().catch((error) => {
          logger.error('Error closing Redis subscriber:', error);
        })
      );
      this.subscriber = null;
    }

    if (this.publisher) {
      promises.push(
        this.publisher.quit().catch((error) => {
          logger.error('Error closing Redis publisher:', error);
        })
      );
      this.publisher = null;
    }

    await Promise.all(promises);
    logger.info('All Redis connections closed');
  }
}

// Export singleton instance methods
export const redisManager = RedisConnectionManager.getInstance();
export const getRedisClient = () => redisManager.getClient();
export const getRedisSubscriber = () => redisManager.getSubscriber();
export const getRedisPublisher = () => redisManager.getPublisher();
export const redisHealthCheck = () => redisManager.healthCheck();
export const closeRedisConnections = () => redisManager.closeAll();
