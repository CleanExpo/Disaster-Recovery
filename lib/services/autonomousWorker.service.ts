// import Bull, { Queue } from 'bull';
import { getT5GemmaService } from './t5gemma.service';
import { prisma } from '@/lib/prisma';
// import pino from 'pino';

// const logger = pino();

interface WorkerTask {
    id: string;
    type: string;
    userId: string;
    payload: any;
    priority: number;
    createdAt: Date;
}

class AutonomousWorkerService {
    private processingQueue: Queue<WorkerTask>;
    private isRunning: boolean = false;

  constructor() {
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

      this.processingQueue = new Bull('t5-processing', redisUrl, {
              settings: {
                        maxStalledCount: 3,
                        maxStalledInterval: 5000,
                        lockDuration: 30000,
              },
      });

      this.setupProcessors();
  }

  private setupProcessors(): void {
        this.processingQueue.process(
                '*',
                5,
                async (job) => await this.processJob(job)
              );

      this.processingQueue.on('completed', (job) => {
              logger.info(`Job ${job.id} completed successfully`);
      });

      this.processingQueue.on('failed', (job, error) => {
              logger.error(`Job ${job.id} failed: ${error.message}`);
      });

      this.processingQueue.on('stalled', (job) => {
              logger.warn(`Job ${job.id} stalled, will retry`);
      });
  }

  private async processJob(job: any): Promise<any> {
        const { type, userId, payload } = job.data;

      logger.info(`Processing job ${job.id}: ${type}`);

      try {
              await prisma.aIJob.update({
                        where: { id: job.id.toString() },
                        data: {
                                    status: 'PROCESSING',
                                    startedAt: new Date(),
                        },
              });

          const service = getT5GemmaService();
              const response = await service.process({
                        type: payload.taskType || type,
                        input: payload.input,
                        context: payload.context,
              });

          if (!response.success) {
                    throw new Error(response.error);
          }

          await prisma.aIJob.update({
                    where: { id: job.id.toString() },
                    data: {
                                status: 'COMPLETED',
                                result: response.result,
                                processingTime: response.processingTime,
                                completedAt: new Date(),
                    },
          });

          return response;
      } catch (error) {
              logger.error(`Job processing failed: ${error}`);

          await prisma.aIJob.update({
                    where: { id: job.id.toString() },
                    data: {
                                status: 'FAILED',
                                error: error instanceof Error ? error.message : 'Unknown error',
                    },
          });

          throw error;
      }
  }

  async enqueueTask(
        userId: string,
        taskType: string,
        payload: any,
        priority: number = 5
      ): Promise<string> {
        const job = await this.processingQueue.add(
          {
                    type: taskType,
                    userId,
                    payload,
          },
          {
                    priority,
                    attempts: 3,
                    backoff: {
                                type: 'exponential',
                                delay: 2000,
                    },
                    removeOnComplete: false,
          }
              );

      await prisma.aIJob.create({
              data: {
                        id: job.id.toString(),
                        userId,
                        taskType,
                        status: 'QUEUED',
                        priority,
              },
      });

      return job.id.toString();
  }

  async getJobStatus(jobId: string): Promise<any> {
        const dbJob = await prisma.aIJob.findUnique({
                where: { id: jobId },
        });

      const queueJob = await this.processingQueue.getJob(parseInt(jobId));

      return {
              id: jobId,
              dbStatus: dbJob?.status || 'NOT_FOUND',
              queueStatus: queueJob ? 'QUEUED' : 'COMPLETED',
              result: dbJob?.result,
              error: dbJob?.error,
              processingTime: dbJob?.processingTime,
      };
  }

  async start(): Promise<void> {
        if (this.isRunning) return;
        this.isRunning = true;
        logger.info('Autonomous worker service started');
  }

  async stop(): Promise<void> {
        if (!this.isRunning) return;
        await this.processingQueue.close();
        this.isRunning = false;
        logger.info('Autonomous worker service stopped');
  }

  isActive(): boolean {
        return this.isRunning;
  }
}

let instance: AutonomousWorkerService | null = null;

export function getWorkerService(): AutonomousWorkerService {
    if (!instance) {
          instance = new AutonomousWorkerService();
    }
    return instance;
}

export default AutonomousWorkerService;
