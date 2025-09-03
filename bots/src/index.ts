#!/usr/bin/env node
/**
 * NRP Bot System - Simplified Production Server
 * Main entry point for the dual bot system
 */

import 'dotenv/config';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import winston from 'winston';

// ============================================
// CONFIGURATION
// ============================================

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001'),
  wsPort: parseInt(process.env.WS_PORT || '3002'),
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  }
};

// ============================================
// LOGGER SETUP
// ============================================

const logger = winston.createLogger({
  level: config.env === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'bot-system' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// ============================================
// ELYSIA APPLICATION
// ============================================

const app = new Elysia({
  name: 'nrp-bot-system'
})
  // Global error handler
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
  
  // Plugins
  .use(cors(config.cors))
  .use(swagger({
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
  
  // Health check endpoint
  .get('/health', () => ({
    status: 'healthy',
    timestamp: new Date(),
    uptime: process.uptime()
  }))
  
  // Root endpoint
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
  
  // Simple client bot endpoint
  .post('/api/client/message', ({ body }) => {
    logger.info('Client message received:', body);
    return {
      success: true,
      response: 'I can help you with emergency response and finding contractors. This is a simplified response for testing.',
      sessionId: (body as any).sessionId || 'test-session'
    };
  })
  
  // Simple contractor bot endpoint
  .post('/api/contractor/status', ({ body }) => {
    logger.info('Contractor status update:', body);
    return {
      success: true,
      message: 'Status updated',
      data: body
    };
  });

// ============================================
// STARTUP
// ============================================

async function start() {
  try {
    // Start HTTP server
    app.listen(config.port, () => {
      logger.info(`🚀 Bot API running at http://localhost:${config.port}`);
      logger.info(`📚 API Documentation at http://localhost:${config.port}/docs`);
    });
    
    logger.info('✅ Simplified bot system operational');
    
  } catch (error) {
    logger.error('❌ Startup failed:', error);
    process.exit(1);
  }
}

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down...');
  process.exit(0);
});

// Start the application
start();