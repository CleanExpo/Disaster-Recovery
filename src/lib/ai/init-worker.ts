#!/usr/bin/env node
import { autonomousWorker, startWorker, stopWorker } from './autonomous-worker.service';
import { redisManager } from '../config/redis.config';
import { logger } from '../logger';

/**
 * AI Worker Initialization Script
 * Starts the autonomous worker for background AI processing
 */

async function initializeWorker() {
  logger.info('=================================');
  logger.info('AI Worker Initialization Started');
  logger.info('=================================');

  try {
    // Step 1: Connect to Redis
    logger.info('Step 1: Connecting to Redis...');
    await redisManager.getClient();
    logger.info('✓ Redis connected successfully');

    // Step 2: Health check
    logger.info('Step 2: Performing health checks...');
    const redisHealth = await redisManager.healthCheck();
    if (!redisHealth) {
      throw new Error('Redis health check failed');
    }
    logger.info('✓ Health checks passed');

    // Step 3: Start worker
    logger.info('Step 3: Starting autonomous worker...');
    await startWorker();
    logger.info('✓ Autonomous worker started');

    // Step 4: Display statistics
    logger.info('Step 4: Worker initialized successfully');
    const stats = await autonomousWorker.getStats();
    logger.info('Worker Statistics:', stats);

    logger.info('=================================');
    logger.info('AI Worker Running');
    logger.info('Press Ctrl+C to stop');
    logger.info('=================================');
  } catch (error) {
    logger.error('Failed to initialize worker:', error);
    process.exit(1);
  }
}

/**
 * Graceful shutdown handler
 */
async function shutdown() {
  logger.info('Shutting down AI worker...');

  try {
    await stopWorker();
    await redisManager.closeAll();
    logger.info('AI worker shut down successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown();
});

// Start the worker
if (require.main === module) {
  initializeWorker();
}

export { initializeWorker, shutdown };
