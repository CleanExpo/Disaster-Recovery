"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsService = void 0;
class MetricsService {
    prisma;
    metrics = new Map();
    intervals = [];
    constructor(prisma) {
        this.prisma = prisma;
    }
    startCollection() {
        const interval = setInterval(() => {
            this.collectAndStore();
        }, 60000);
        this.intervals.push(interval);
        console.log('✅ Metrics collection started');
    }
    stopCollection() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
        console.log('Metrics collection stopped');
    }
    recordRequest(method, path, duration) {
        const key = `request:${method}:${path}`;
        if (!this.metrics.has(key)) {
            this.metrics.set(key, {
                count: 0,
                totalDuration: 0,
                avgDuration: 0,
                minDuration: Infinity,
                maxDuration: 0
            });
        }
        const metric = this.metrics.get(key);
        metric.count++;
        metric.totalDuration += duration;
        metric.avgDuration = metric.totalDuration / metric.count;
        metric.minDuration = Math.min(metric.minDuration, duration);
        metric.maxDuration = Math.max(metric.maxDuration, duration);
    }
    recordError(type, message) {
        const key = `error:${type}`;
        if (!this.metrics.has(key)) {
            this.metrics.set(key, {
                count: 0,
                messages: []
            });
        }
        const metric = this.metrics.get(key);
        metric.count++;
        if (message && metric.messages.length < 100) {
            metric.messages.push({
                message,
                timestamp: new Date()
            });
        }
    }
    recordWebSocketEvent(event) {
        const key = `ws:${event}`;
        if (!this.metrics.has(key)) {
            this.metrics.set(key, 0);
        }
        this.metrics.set(key, this.metrics.get(key) + 1);
    }
    recordQueueEvent(queue, event) {
        const key = `queue:${queue}:${event}`;
        if (!this.metrics.has(key)) {
            this.metrics.set(key, 0);
        }
        this.metrics.set(key, this.metrics.get(key) + 1);
    }
    recordCacheEvent(hit) {
        const key = hit ? 'cache:hit' : 'cache:miss';
        if (!this.metrics.has(key)) {
            this.metrics.set(key, 0);
        }
        this.metrics.set(key, this.metrics.get(key) + 1);
    }
    getCurrentMetrics() {
        const metrics = {
            requests: {},
            errors: {},
            websocket: {},
            queue: {},
            cache: {},
            timestamp: new Date()
        };
        this.metrics.forEach((value, key) => {
            const [category, ...parts] = key.split(':');
            switch (category) {
                case 'request':
                    const [method, ...pathParts] = parts;
                    const path = pathParts.join(':');
                    if (!metrics.requests[method]) {
                        metrics.requests[method] = {};
                    }
                    metrics.requests[method][path] = value;
                    break;
                case 'error':
                    metrics.errors[parts.join(':')] = value;
                    break;
                case 'ws':
                    metrics.websocket[parts.join(':')] = value;
                    break;
                case 'queue':
                    const [queueName, event] = parts;
                    if (!metrics.queue[queueName]) {
                        metrics.queue[queueName] = {};
                    }
                    metrics.queue[queueName][event] = value;
                    break;
                case 'cache':
                    metrics.cache[parts.join(':')] = value;
                    break;
            }
        });
        const cacheHits = this.metrics.get('cache:hit') || 0;
        const cacheMisses = this.metrics.get('cache:miss') || 0;
        const totalCache = cacheHits + cacheMisses;
        if (totalCache > 0) {
            metrics.cache.hitRate = (cacheHits / totalCache) * 100;
        }
        return metrics;
    }
    async collectAndStore() {
        try {
            const current = this.getCurrentMetrics();
            let totalRequests = 0;
            let totalResponseTime = 0;
            let requestCount = 0;
            Object.values(current.requests).forEach((methods) => {
                Object.values(methods).forEach((metric) => {
                    totalRequests += metric.count;
                    totalResponseTime += metric.totalDuration;
                    requestCount += metric.count;
                });
            });
            const avgResponseTime = requestCount > 0 ? totalResponseTime / requestCount : 0;
            let totalErrors = 0;
            let validationErrors = 0;
            let systemErrors = 0;
            Object.entries(current.errors).forEach(([type, data]) => {
                totalErrors += data.count;
                if (type.includes('validation')) {
                    validationErrors += data.count;
                }
                else {
                    systemErrors += data.count;
                }
            });
            const messagesProcessed = (current.websocket.client_message || 0) +
                (current.websocket.contractor_update || 0);
            await this.prisma.botMetrics.create({
                data: {
                    date: new Date(),
                    totalRequests,
                    avgResponseTime,
                    successRate: totalErrors > 0 ? ((totalRequests - totalErrors) / totalRequests) * 100 : 100,
                    messagesProcessed,
                    totalErrors,
                    validationErrors,
                    systemErrors,
                    webRequests: current.websocket.web || 0,
                    smsRequests: current.websocket.sms || 0,
                    whatsappRequests: current.websocket.whatsapp || 0,
                    emailRequests: current.websocket.email || 0
                }
            });
            this.resetMetrics();
        }
        catch (error) {
            console.error('Failed to store metrics:', error);
        }
    }
    resetMetrics() {
        const essentialKeys = ['cache:hit', 'cache:miss'];
        this.metrics.forEach((value, key) => {
            if (!essentialKeys.includes(key)) {
                this.metrics.delete(key);
            }
            else {
                this.metrics.set(key, 0);
            }
        });
    }
    async getSystemHealth() {
        const metrics = this.getCurrentMetrics();
        const alerts = [];
        let status = 'healthy';
        const errorRate = this.calculateErrorRate();
        if (errorRate > 5) {
            alerts.push(`High error rate: ${errorRate.toFixed(2)}%`);
            status = 'degraded';
        }
        if (errorRate > 10) {
            status = 'unhealthy';
        }
        const avgResponseTime = this.calculateAvgResponseTime();
        if (avgResponseTime > 1000) {
            alerts.push(`Slow response times: ${avgResponseTime.toFixed(0)}ms`);
            status = status === 'unhealthy' ? 'unhealthy' : 'degraded';
        }
        const cacheHitRate = metrics.cache.hitRate || 0;
        if (cacheHitRate < 50) {
            alerts.push(`Low cache hit rate: ${cacheHitRate.toFixed(2)}%`);
        }
        return {
            status,
            metrics: {
                errorRate,
                avgResponseTime,
                cacheHitRate
            },
            alerts
        };
    }
    calculateErrorRate() {
        let totalRequests = 0;
        let totalErrors = 0;
        this.metrics.forEach((value, key) => {
            if (key.startsWith('request:')) {
                totalRequests += value.count;
            }
            else if (key.startsWith('error:')) {
                totalErrors += value.count;
            }
        });
        return totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
    }
    calculateAvgResponseTime() {
        let totalDuration = 0;
        let totalCount = 0;
        this.metrics.forEach((value, key) => {
            if (key.startsWith('request:')) {
                totalDuration += value.totalDuration;
                totalCount += value.count;
            }
        });
        return totalCount > 0 ? totalDuration / totalCount : 0;
    }
}
exports.MetricsService = MetricsService;
//# sourceMappingURL=metrics.service.js.map