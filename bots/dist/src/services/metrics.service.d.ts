import { PrismaClient } from '@prisma/client';
export declare class MetricsService {
    private prisma;
    private metrics;
    private intervals;
    constructor(prisma: PrismaClient);
    startCollection(): void;
    stopCollection(): void;
    recordRequest(method: string, path: string, duration: number): void;
    recordError(type: string, message?: string): void;
    recordWebSocketEvent(event: string): void;
    recordQueueEvent(queue: string, event: string): void;
    recordCacheEvent(hit: boolean): void;
    getCurrentMetrics(): any;
    private collectAndStore;
    private resetMetrics;
    getSystemHealth(): Promise<{
        status: 'healthy' | 'degraded' | 'unhealthy';
        metrics: any;
        alerts: string[];
    }>;
    private calculateErrorRate;
    private calculateAvgResponseTime;
}
//# sourceMappingURL=metrics.service.d.ts.map