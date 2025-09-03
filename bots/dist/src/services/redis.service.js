"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisService {
    client;
    subscriber;
    publisher;
    constructor(config) {
        this.client = new ioredis_1.default(config);
        this.subscriber = new ioredis_1.default(config);
        this.publisher = new ioredis_1.default(config);
    }
    async connect() {
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
    async disconnect() {
        await this.client.quit();
        await this.subscriber.quit();
        await this.publisher.quit();
    }
    async get(key) {
        return this.client.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.set(key, value, 'EX', ttl);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async delete(key) {
        await this.client.del(key);
    }
    async exists(key) {
        const result = await this.client.exists(key);
        return result === 1;
    }
    async ping() {
        return this.client.ping();
    }
    async setSession(sessionId, data, ttl = 3600) {
        await this.set(`session:${sessionId}`, JSON.stringify(data), ttl);
    }
    async getSession(sessionId) {
        const data = await this.get(`session:${sessionId}`);
        return data ? JSON.parse(data) : null;
    }
    async deleteSession(sessionId) {
        await this.delete(`session:${sessionId}`);
    }
    async cache(key, data, ttl = 300) {
        await this.set(`cache:${key}`, JSON.stringify(data), ttl);
    }
    async getCache(key) {
        const data = await this.get(`cache:${key}`);
        return data ? JSON.parse(data) : null;
    }
    async invalidateCache(pattern) {
        const keys = await this.client.keys(`cache:${pattern}*`);
        if (keys.length > 0) {
            await this.client.del(...keys);
        }
    }
    async publish(channel, message) {
        await this.publisher.publish(channel, JSON.stringify(message));
    }
    async subscribe(channel, callback) {
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (receivedChannel, message) => {
            if (receivedChannel === channel) {
                callback(JSON.parse(message));
            }
        });
    }
    async unsubscribe(channel) {
        await this.subscriber.unsubscribe(channel);
    }
    async checkRateLimit(key, limit, window) {
        const current = await this.client.incr(`rate:${key}`);
        if (current === 1) {
            await this.client.expire(`rate:${key}`, window);
        }
        return current <= limit;
    }
    async acquireLock(key, ttl = 10) {
        const result = await this.client.set(`lock:${key}`, '1', 'NX', 'EX', ttl);
        return result === 'OK';
    }
    async releaseLock(key) {
        await this.delete(`lock:${key}`);
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map