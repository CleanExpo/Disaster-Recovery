import Queue from 'bull';
import { queueManager, AIJobData, AIJobResult } from '../config/queue.config';
import { aiService } from './ai.service';
import { logger } from '../logger';

/**
 * Autonomous Worker Service
 * Background job processor for AI tasks
 */

export interface WorkerConfig {
  concurrency?: number;
  queueName?: string;
  enableScheduledJobs?: boolean;
}

export interface JobProgress {
  percentage: number;
  status: string;
  currentStep?: string;
}

/**
 * Autonomous Worker for Processing AI Jobs
 */
class AutonomousWorker {
  private static instance: AutonomousWorker;
  private isRunning = false;
  private config: WorkerConfig;
  private processedJobs = 0;
  private failedJobs = 0;

  private constructor(config: WorkerConfig = {}) {
    this.config = {
      concurrency: config.concurrency || 5,
      queueName: config.queueName || 'ai-processing',
      enableScheduledJobs: config.enableScheduledJobs !== false,
    };
  }

  public static getInstance(config?: WorkerConfig): AutonomousWorker {
    if (!AutonomousWorker.instance) {
      AutonomousWorker.instance = new AutonomousWorker(config);
    }
    return AutonomousWorker.instance;
  }

  /**
   * Process a single AI job
   */
  private async processJob(job: Queue.Job<AIJobData>): Promise<AIJobResult> {
    const startTime = Date.now();

    try {
      logger.info(`Processing AI job ${job.id}`, {
        type: job.data.type,
        userId: job.data.userId,
        tenantId: job.data.tenantId,
      });

      // Update job progress
      await job.progress({ percentage: 10, status: 'Starting', currentStep: 'Initializing' } as JobProgress);

      let result: any;

      switch (job.data.type) {
        case 'process':
          await job.progress({ percentage: 30, status: 'Processing', currentStep: 'Text processing' } as JobProgress);
          result = await aiService.processText(
            job.data.input as string,
            job.data.options
          );
          break;

        case 'summarize':
          await job.progress({ percentage: 30, status: 'Processing', currentStep: 'Summarization' } as JobProgress);
          result = await aiService.summarizeText(
            job.data.input as string,
            job.data.options
          );
          break;

        case 'extract':
          await job.progress({ percentage: 30, status: 'Processing', currentStep: 'Information extraction' } as JobProgress);
          result = await aiService.extractInformation(
            job.data.input as string,
            job.data.options
          );
          break;

        case 'analyze':
          await job.progress({ percentage: 30, status: 'Processing', currentStep: 'Text analysis' } as JobProgress);
          result = await aiService.analyzeText(job.data.input as string);
          break;

        default:
          throw new Error(`Unknown job type: ${job.data.type}`);
      }

      await job.progress({ percentage: 90, status: 'Completing', currentStep: 'Finalizing' } as JobProgress);

      const processingTime = Date.now() - startTime;
      this.processedJobs++;

      logger.info(`AI job ${job.id} completed successfully`, {
        type: job.data.type,
        processingTime,
      });

      return {
        success: true,
        result,
        processingTime,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.failedJobs++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      logger.error(`AI job ${job.id} failed:`, {
        error: errorMessage,
        type: job.data.type,
      });

      return {
        success: false,
        error: errorMessage,
        processingTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Start the worker
   */
  public async start(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Worker is already running');
      return;
    }

    try {
      logger.info('Starting Autonomous Worker', {
        concurrency: this.config.concurrency,
        queueName: this.config.queueName,
      });

      await queueManager.processQueue(
        this.config.queueName!,
        this.processJob.bind(this),
        this.config.concurrency
      );

      this.isRunning = true;
      logger.info('Autonomous Worker started successfully');
    } catch (error) {
      logger.error('Failed to start worker:', error);
      throw error;
    }
  }

  /**
   * Stop the worker
   */
  public async stop(): Promise<void> {
    if (!this.isRunning) {
      logger.warn('Worker is not running');
      return;
    }

    try {
      logger.info('Stopping Autonomous Worker');
      await queueManager.closeAll();
      this.isRunning = false;
      logger.info('Autonomous Worker stopped');
    } catch (error) {
      logger.error('Error stopping worker:', error);
      throw error;
    }
  }

  /**
   * Get worker statistics
   */
  public async getStats(): Promise<{
    isRunning: boolean;
    processedJobs: number;
    failedJobs: number;
    successRate: number;
    queueStats: any;
  }> {
    const queueStats = await queueManager.getQueueStats(this.config.queueName!);
    const totalJobs = this.processedJobs + this.failedJobs;
    const successRate = totalJobs > 0 ? (this.processedJobs / totalJobs) * 100 : 0;

    return {
      isRunning: this.isRunning,
      processedJobs: this.processedJobs,
      failedJobs: this.failedJobs,
      successRate,
      queueStats,
    };
  }

  /**
   * Health check
   */
  public async healthCheck(): Promise<boolean> {
    try {
      // Check if worker is running
      if (!this.isRunning) {
        return false;
      }

      // Check queue health
      const queueHealth = await queueManager.healthCheck();
      if (!queueHealth) {
        return false;
      }

      // Check AI service health
      const aiHealth = await aiService.healthCheck();
      if (!aiHealth) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Worker health check failed:', error);
      return false;
    }
  }

  /**
   * Reset statistics
   */
  public resetStats(): void {
    this.processedJobs = 0;
    this.failedJobs = 0;
    logger.info('Worker statistics reset');
  }
}

// Export singleton instance
export const autonomousWorker = AutonomousWorker.getInstance();
export const startWorker = () => autonomousWorker.start();
export const stopWorker = () => autonomousWorker.stop();
export const getWorkerStats = () => autonomousWorker.getStats();
export const workerHealthCheck = () => autonomousWorker.healthCheck();

export default AutonomousWorker;
