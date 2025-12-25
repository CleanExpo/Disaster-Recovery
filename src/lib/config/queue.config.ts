import Queue from 'bull';
import { getRedisClient } from './redis.config';
import { logger } from '../logger';

/**
 * Bull Queue Configuration for AI Worker System
 * Production-Ready Job Queue Management
 */

export interface QueueConfig {
  redis: any;
  defaultJobOptions?: {
    attempts?: number;
    backoff?: {
      type: string;
      delay: number;
    };
    removeOnComplete?: boolean | number;
    removeOnFail?: boolean | number;
  };
}

export interface AIJobData {
  type: 'process' | 'summarize' | 'extract' | 'analyze';
  input: string | object;
  options?: Record<string, any>;
  userId?: string;
  tenantId?: string;
  metadata?: Record<string, any>;
}

export interface AIJobResult {
  success: boolean;
  result?: any;
  error?: string;
  processingTime?: number;
  timestamp: string;
}

/**
 * Create Bull Queue with Redis connection
 */
export const createQueue = async (queueName: string): Promise<Queue.Queue> => {
  try {
    const redisClient = await getRedisClient();

    const queueConfig: QueueConfig = {
      redis: {
        client: redisClient,
        subscriber: redisClient.duplicate(),
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: 100, // Keep last 100 completed jobs
        removeOnFail: 50, // Keep last 50 failed jobs
      },
    };

    const queue = new Queue(queueName, queueConfig);

    // Queue event handlers
    queue.on('error', (error) => {
      logger.error(`Queue ${queueName} error:`, error);
    });

    queue.on('waiting', (jobId) => {
      logger.debug(`Job ${jobId} is waiting in queue ${queueName}`);
    });

    queue.on('active', (job) => {
      logger.info(`Job ${job.id} started processing in queue ${queueName}`);
    });

    queue.on('completed', (job, result) => {
      logger.info(`Job ${job.id} completed in queue ${queueName}`, {
        processingTime: result.processingTime,
      });
    });

    queue.on('failed', (job, error) => {
      logger.error(`Job ${job.id} failed in queue ${queueName}:`, error);
    });

    queue.on('stalled', (job) => {
      logger.warn(`Job ${job.id} stalled in queue ${queueName}`);
    });

    logger.info(`Queue ${queueName} created successfully`);
    return queue;
  } catch (error) {
    logger.error(`Failed to create queue ${queueName}:`, error);
    throw error;
  }
};

/**
 * Queue Manager for AI Processing
 */
class QueueManager {
  private static instance: QueueManager;
  private queues: Map<string, Queue.Queue> = new Map();

  private constructor() {}

  public static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  /**
   * Get or create a queue
   */
  public async getQueue(queueName: string): Promise<Queue.Queue> {
    if (this.queues.has(queueName)) {
      return this.queues.get(queueName)!;
    }

    const queue = await createQueue(queueName);
    this.queues.set(queueName, queue);
    return queue;
  }

  /**
   * Add job to queue
   */
  public async addJob(
    queueName: string,
    jobData: AIJobData,
    options?: Queue.JobOptions
  ): Promise<Queue.Job> {
    const queue = await this.getQueue(queueName);
    const job = await queue.add(jobData, options);
    logger.info(`Added job ${job.id} to queue ${queueName}`);
    return job;
  }

  /**
   * Process jobs in queue
   */
  public async processQueue(
    queueName: string,
    processor: (job: Queue.Job<AIJobData>) => Promise<AIJobResult>,
    concurrency = 1
  ): Promise<void> {
    const queue = await this.getQueue(queueName);

    queue.process(concurrency, async (job: Queue.Job<AIJobData>) => {
      const startTime = Date.now();

      try {
        logger.info(`Processing job ${job.id} of type ${job.data.type}`);
        const result = await processor(job);

        return {
          ...result,
          processingTime: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        };
      } catch (error) {
        logger.error(`Error processing job ${job.id}:`, error);
        throw error;
      }
    });

    logger.info(`Queue ${queueName} processor registered with concurrency ${concurrency}`);
  }

  /**
   * Get queue statistics
   */
  public async getQueueStats(queueName: string): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  }> {
    const queue = await this.getQueue(queueName);

    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount(),
    ]);

    return { waiting, active, completed, failed, delayed };
  }

  /**
   * Close all queues
   */
  public async closeAll(): Promise<void> {
    const closePromises = Array.from(this.queues.entries()).map(
      async ([name, queue]) => {
        try {
          await queue.close();
          logger.info(`Queue ${name} closed`);
        } catch (error) {
          logger.error(`Error closing queue ${name}:`, error);
        }
      }
    );

    await Promise.all(closePromises);
    this.queues.clear();
    logger.info('All queues closed');
  }

  /**
   * Health check for all queues
   */
  public async healthCheck(): Promise<boolean> {
    try {
      for (const [name, queue] of this.queues.entries()) {
        const isReady = await queue.isReady();
        if (!isReady) {
          logger.error(`Queue ${name} is not ready`);
          return false;
        }
      }
      return true;
    } catch (error) {
      logger.error('Queue health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const queueManager = QueueManager.getInstance();
export const getAIQueue = (queueName = 'ai-processing') => queueManager.getQueue(queueName);
export const addAIJob = (jobData: AIJobData, options?: Queue.JobOptions) =>
  queueManager.addJob('ai-processing', jobData, options);
export const getQueueStats = (queueName = 'ai-processing') =>
  queueManager.getQueueStats(queueName);
export const closeAllQueues = () => queueManager.closeAll();
