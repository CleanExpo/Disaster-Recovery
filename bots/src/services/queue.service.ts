/**
 * Queue Service - Job Processing with Bull
 */

import Bull, { Queue, Job, JobOptions } from 'bull';
import { RedisService } from './redis.service';

export interface JobData {
  id?: string;
  type: string;
  data: any;
  priority?: number;
  timestamp?: Date;
}

export class QueueService {
  private queues: Map<string, Queue> = new Map();
  private processors: Map<string, (job: Job) => Promise<any>> = new Map();
  
  constructor(private redis: RedisService) {}
  
  // Create or get queue
  private getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const queue = new Bull(name, {
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD
        }
      });
      
      // Set up event listeners
      queue.on('completed', (job) => {
        console.log(`✅ Job ${job.id} completed in queue ${name}`);
      });
      
      queue.on('failed', (job, error) => {
        console.error(`❌ Job ${job.id} failed in queue ${name}:`, error);
      });
      
      queue.on('stalled', (job) => {
        console.warn(`⚠️ Job ${job.id} stalled in queue ${name}`);
      });
      
      this.queues.set(name, queue);
    }
    
    return this.queues.get(name)!;
  }
  
  // Add job to queue
  async add(
    queueName: string,
    data: any,
    options?: JobOptions
  ): Promise<Job> {
    const queue = this.getQueue(queueName);
    
    const jobOptions: JobOptions = {
      removeOnComplete: true,
      removeOnFail: false,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      ...options
    };
    
    return queue.add(data, jobOptions);
  }
  
  // Process jobs
  process(
    queueName: string,
    processor: (job: Job) => Promise<any>,
    concurrency = 1
  ): void {
    const queue = this.getQueue(queueName);
    this.processors.set(queueName, processor);
    
    queue.process(concurrency, async (job) => {
      console.log(`Processing job ${job.id} in queue ${queueName}`);
      return processor(job);
    });
  }
  
  // Get queue status
  async getQueueStatus(queueName: string): Promise<{
    waiting: number;
    active: number;
    completed: number;
    failed: number;
    delayed: number;
  }> {
    const queue = this.getQueue(queueName);
    
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      queue.getWaitingCount(),
      queue.getActiveCount(),
      queue.getCompletedCount(),
      queue.getFailedCount(),
      queue.getDelayedCount()
    ]);
    
    return {
      waiting,
      active,
      completed,
      failed,
      delayed
    };
  }
  
  // Get specific job
  async getJob(queueName: string, jobId: string): Promise<Job | null> {
    const queue = this.getQueue(queueName);
    return queue.getJob(jobId);
  }
  
  // Retry failed jobs
  async retryFailedJobs(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    const failedJobs = await queue.getFailed();
    
    for (const job of failedJobs) {
      await job.retry();
    }
  }
  
  // Clean queue
  async clean(
    queueName: string,
    grace = 0,
    status: 'completed' | 'failed' = 'completed'
  ): Promise<Job[]> {
    const queue = this.getQueue(queueName);
    return queue.clean(grace, status);
  }
  
  // Pause/Resume queue
  async pause(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.pause();
  }
  
  async resume(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.resume();
  }
  
  // Empty queue
  async empty(queueName: string): Promise<void> {
    const queue = this.getQueue(queueName);
    await queue.empty();
  }
  
  // Close all queues
  async close(): Promise<void> {
    for (const [name, queue] of this.queues) {
      console.log(`Closing queue: ${name}`);
      await queue.close();
    }
    this.queues.clear();
    this.processors.clear();
  }
  
  // Health check
  async isHealthy(): Promise<boolean> {
    try {
      // Check if we can access Redis through any queue
      if (this.queues.size > 0) {
        const queue = this.queues.values().next().value;
        await queue.getJobCounts();
        return true;
      }
      
      // Create temporary queue to test connection
      const testQueue = this.getQueue('health-check');
      await testQueue.getJobCounts();
      await testQueue.close();
      this.queues.delete('health-check');
      
      return true;
    } catch (error) {
      console.error('Queue health check failed:', error);
      return false;
    }
  }
  
  // Priority queue helpers
  async addEmergencyJob(data: any): Promise<Job> {
    return this.add('emergency', data, {
      priority: 1,
      delay: 0,
      attempts: 5
    });
  }
  
  async addStandardJob(data: any): Promise<Job> {
    return this.add('standard', data, {
      priority: 10,
      delay: 0,
      attempts: 3
    });
  }
  
  async addScheduledJob(data: any, delay: number): Promise<Job> {
    return this.add('scheduled', data, {
      delay,
      attempts: 3
    });
  }
}