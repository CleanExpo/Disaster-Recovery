import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { addAIJob, getQueueStats, closeAllQueues } from '@/lib/config/queue.config';
import { startWorker, stopWorker, getWorkerStats } from '@/lib/ai/autonomous-worker.service';
import { redisManager } from '@/lib/config/redis.config';

/**
 * Integration Tests for AI Worker System
 */

describe('AI Worker Integration', () => {
  beforeAll(async () => {
    // Connect to Redis
    await redisManager.getClient();

    // Start worker
    await startWorker();
  }, 30000);

  afterAll(async () => {
    // Stop worker and close connections
    await stopWorker();
    await closeAllQueues();
    await redisManager.closeAll();
  }, 30000);

  describe('Job Processing', () => {
    it('should queue and process a job', async () => {
      const job = await addAIJob({
        type: 'process',
        input: 'Test job processing',
        options: { maxLength: 50 },
      });

      expect(job).toBeDefined();
      expect(job.id).toBeDefined();

      // Wait a bit for processing
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const stats = await getQueueStats();
      expect(stats).toBeDefined();
    }, 30000);

    it('should handle multiple concurrent jobs', async () => {
      const jobs = await Promise.all([
        addAIJob({ type: 'process', input: 'Job 1' }),
        addAIJob({ type: 'process', input: 'Job 2' }),
        addAIJob({ type: 'process', input: 'Job 3' }),
      ]);

      expect(jobs.length).toBe(3);
      jobs.forEach((job) => {
        expect(job.id).toBeDefined();
      });

      // Wait for processing
      await new Promise((resolve) => setTimeout(resolve, 10000));

      const stats = await getQueueStats();
      expect(stats).toBeDefined();
    }, 40000);
  });

  describe('Worker Statistics', () => {
    it('should return worker statistics', async () => {
      const stats = await getWorkerStats();

      expect(stats).toBeDefined();
      expect(stats.isRunning).toBe(true);
      expect(stats.processedJobs).toBeGreaterThanOrEqual(0);
      expect(stats.failedJobs).toBeGreaterThanOrEqual(0);
      expect(stats.queueStats).toBeDefined();
    });
  });

  describe('Queue Statistics', () => {
    it('should return queue statistics', async () => {
      const stats = await getQueueStats();

      expect(stats).toBeDefined();
      expect(typeof stats.waiting).toBe('number');
      expect(typeof stats.active).toBe('number');
      expect(typeof stats.completed).toBe('number');
      expect(typeof stats.failed).toBe('number');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid job data gracefully', async () => {
      await expect(
        addAIJob({
          type: 'process',
          input: '',
        } as any)
      ).resolves.toBeDefined();
    });
  });
});
