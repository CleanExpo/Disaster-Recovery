"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const elysia_1 = require("elysia");
exports.healthRouter = new elysia_1.Elysia({
    prefix: '/health'
})
    .get('/', async ({ store }) => {
    const checks = {
        database: false,
        redis: false,
        queue: false
    };
    try {
        await store.prisma.$queryRaw `SELECT 1`;
        checks.database = true;
    }
    catch (error) {
        store.logger.error('Database health check failed:', error);
    }
    try {
        await store.redis.ping();
        checks.redis = true;
    }
    catch (error) {
        store.logger.error('Redis health check failed:', error);
    }
    try {
        const queueHealth = await store.queue.isHealthy();
        checks.queue = queueHealth;
    }
    catch (error) {
        store.logger.error('Queue health check failed:', error);
    }
    const allHealthy = Object.values(checks).every(v => v === true);
    return {
        status: allHealthy ? 'healthy' : 'degraded',
        timestamp: new Date(),
        checks
    };
}, {
    tags: ['Health']
})
    .get('/ready', async ({ store }) => {
    const ready = await store.redis.get('system:ready');
    return {
        ready: ready === 'true',
        timestamp: new Date()
    };
}, {
    tags: ['Health']
})
    .get('/metrics', async ({ store }) => {
    const metrics = await store.metrics.getCurrentMetrics();
    return {
        success: true,
        data: metrics
    };
}, {
    tags: ['Health', 'Metrics']
});
//# sourceMappingURL=health.routes.js.map