#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const elysia_1 = require("elysia");
const cors_1 = require("@elysiajs/cors");
const swagger_1 = require("@elysiajs/swagger");
const winston_1 = __importDefault(require("winston"));
const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3001'),
    wsPort: parseInt(process.env.WS_PORT || '3002'),
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true
    }
};
const logger = winston_1.default.createLogger({
    level: config.env === 'production' ? 'info' : 'debug',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    defaultMeta: { service: 'bot-system' },
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ]
});
const app = new elysia_1.Elysia({
    name: 'nrp-bot-system'
})
    .onError(({ code, error, set }) => {
    logger.error(`Error ${code}:`, error);
    if (code === 'VALIDATION') {
        set.status = 400;
        return {
            success: false,
            error: 'Validation failed',
            message: 'Invalid request data'
        };
    }
    if (code === 'NOT_FOUND') {
        set.status = 404;
        return {
            success: false,
            error: 'Not found'
        };
    }
    set.status = 500;
    return {
        success: false,
        error: 'Internal server error',
        message: config.env === 'development' ? error.toString() : 'An error occurred'
    };
})
    .use((0, cors_1.cors)(config.cors))
    .use((0, swagger_1.swagger)({
    documentation: {
        info: {
            title: 'NRP Bot System API',
            version: '1.0.0',
            description: 'Production API for Client and Contractor Bots'
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        tags: [
            { name: 'Client Bot', description: 'Client bot endpoints' },
            { name: 'Contractor Bot', description: 'Contractor bot endpoints' },
            { name: 'Health', description: 'Health and monitoring' }
        ]
    },
    path: '/docs'
}))
    .get('/health', () => ({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
}))
    .get('/', () => ({
    name: 'NRP Bot System',
    version: '1.0.0',
    status: 'operational',
    endpoints: {
        docs: '/docs',
        health: '/health',
        clientBot: '/api/client',
        contractorBot: '/api/contractor'
    }
}))
    .post('/api/client/message', ({ body }) => {
    logger.info('Client message received:', body);
    return {
        success: true,
        response: 'I can help you with emergency response and finding contractors. This is a simplified response for testing.',
        sessionId: body.sessionId || 'test-session'
    };
})
    .post('/api/contractor/status', ({ body }) => {
    logger.info('Contractor status update:', body);
    return {
        success: true,
        message: 'Status updated',
        data: body
    };
});
async function start() {
    try {
        app.listen(config.port, () => {
            logger.info(`🚀 Bot API running at http://localhost:${config.port}`);
            logger.info(`📚 API Documentation at http://localhost:${config.port}/docs`);
        });
        logger.info('✅ Simplified bot system operational');
    }
    catch (error) {
        logger.error('❌ Startup failed:', error);
        process.exit(1);
    }
}
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});
process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down...');
    process.exit(0);
});
start();
//# sourceMappingURL=index.js.map