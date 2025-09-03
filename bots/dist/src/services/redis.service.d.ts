export declare class RedisService {
    private client;
    private subscriber;
    private publisher;
    constructor(config: {
        host: string;
        port: number;
        password?: string;
    });
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    ping(): Promise<string>;
    setSession(sessionId: string, data: any, ttl?: number): Promise<void>;
    getSession(sessionId: string): Promise<any>;
    deleteSession(sessionId: string): Promise<void>;
    cache(key: string, data: any, ttl?: number): Promise<void>;
    getCache(key: string): Promise<any>;
    invalidateCache(pattern: string): Promise<void>;
    publish(channel: string, message: any): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
    unsubscribe(channel: string): Promise<void>;
    checkRateLimit(key: string, limit: number, window: number): Promise<boolean>;
    acquireLock(key: string, ttl?: number): Promise<boolean>;
    releaseLock(key: string): Promise<void>;
}
//# sourceMappingURL=redis.service.d.ts.map