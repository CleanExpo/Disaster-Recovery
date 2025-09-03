/**
 * Redis Service - Caching and Session Management
 */

import Redis from 'ioredis';

export class RedisService {
  private client: Redis;
  private subscriber: Redis;
  private publisher: Redis;
  
  constructor(config: {
    host: string;
    port: number;
    password?: string;
  }) {
    this.client = new Redis(config);
    this.subscriber = new Redis(config);
    this.publisher = new Redis(config);
  }
  
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('✅ Redis connected');
        resolve();
      });
      
      this.client.on('error', (error) => {
        console.error('❌ Redis connection error:', error);
        reject(error);
      });
    });
  }
  
  async disconnect(): Promise<void> {
    await this.client.quit();
    await this.subscriber.quit();
    await this.publisher.quit();
  }
  
  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
  
  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }
  
  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
  
  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }
  
  async ping(): Promise<string> {
    return this.client.ping();
  }
  
  // Session management
  async setSession(sessionId: string, data: any, ttl = 3600): Promise<void> {
    await this.set(`session:${sessionId}`, JSON.stringify(data), ttl);
  }
  
  async getSession(sessionId: string): Promise<any> {
    const data = await this.get(`session:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }
  
  async deleteSession(sessionId: string): Promise<void> {
    await this.delete(`session:${sessionId}`);
  }
  
  // Cache management
  async cache(key: string, data: any, ttl = 300): Promise<void> {
    await this.set(`cache:${key}`, JSON.stringify(data), ttl);
  }
  
  async getCache(key: string): Promise<any> {
    const data = await this.get(`cache:${key}`);
    return data ? JSON.parse(data) : null;
  }
  
  async invalidateCache(pattern: string): Promise<void> {
    const keys = await this.client.keys(`cache:${pattern}*`);
    if (keys.length > 0) {
      await this.client.del(...keys);
    }
  }
  
  // Pub/Sub
  async publish(channel: string, message: any): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(message));
  }
  
  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        callback(JSON.parse(message));
      }
    });
  }
  
  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }
  
  // Rate limiting
  async checkRateLimit(key: string, limit: number, window: number): Promise<boolean> {
    const current = await this.client.incr(`rate:${key}`);
    
    if (current === 1) {
      await this.client.expire(`rate:${key}`, window);
    }
    
    return current <= limit;
  }
  
  // Distributed locking
  async acquireLock(key: string, ttl = 10): Promise<boolean> {
    const result = await this.client.set(`lock:${key}`, '1', 'NX', 'EX', ttl);
    return result === 'OK';
  }
  
  async releaseLock(key: string): Promise<void> {
    await this.delete(`lock:${key}`);
  }
}