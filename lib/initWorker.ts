import { getWorkerService } from './services/autonomousWorker.service';
import { getT5GemmaService } from './services/t5gemma.service';
import pino from 'pino';

const logger = pino();

let initialized = false;

export async function initializeAISystem(): Promise<void> {
    if (initialized) {
          logger.info('AI system already initialized');
          return;
    }

  try {
        logger.info('🚀 Initializing AI system...');

      // Initialize T5Gemma
      logger.info('Initializing T5Gemma model...');
        const t5Service = getT5GemmaService();
        await t5Service.initialize();
        logger.info('✅ T5Gemma initialized');

      // Start worker service
      logger.info('Starting autonomous worker service...');
        const workerService = getWorkerService();
        await workerService.start();
        logger.info('✅ Worker service started');

      initialized = true;
        logger.info('🎉 AI system initialized successfully');
  } catch (error) {
        logger.error('❌ Failed to initialize AI system:', error);
        throw error;
  }
}

export async function shutdownAISystem(): Promise<void> {
    if (!initialized) return;

  try {
        logger.info('Shutting down AI system...');
        const workerService = getWorkerService();
        await workerService.stop();
        logger.info('AI system shutdown complete');
        initialized = false;
  } catch (error) {
        logger.error('Error during AI system shutdown:', error);
  }
}

export function isAISystemInitialized(): boolean {
    return initialized;
}
