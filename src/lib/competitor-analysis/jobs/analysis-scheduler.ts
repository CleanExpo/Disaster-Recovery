/**
 * Analysis Scheduler
 *
 * Schedules automated competitor analysis jobs:
 * - Daily analysis: 2 AM
 * - Weekly deep analysis: Sunday 3 AM
 * - Real-time rank tracking: Every 6 hours for top 20 keywords
 * - Monthly trend reports: 1st of each month
 */

import Bull from 'bull';
import { competitorAnalysisService } from '../services/competitor-analysis-service';
import { keywordGapService } from '../services/keyword-gap-service';
import { swotAnalysisService } from '../services/swot-analysis-service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Bull queues
export const analysisQueue = new Bull('competitor-analysis', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100, // Keep last 100 completed jobs
    removeOnFail: 500,     // Keep last 500 failed jobs
  },
});

// Schedule daily analysis (2 AM)
export async function scheduleDailyAnalysis() {
  await analysisQueue.add(
    'daily-analysis',
    { type: 'daily' },
    {
      repeat: {
        cron: '0 2 * * *', // 2 AM daily
        tz: 'Australia/Sydney',
      },
      jobId: 'daily-analysis-job',
    }
  );

  console.log('[Scheduler] Daily analysis scheduled for 2 AM');
}

// Schedule weekly deep analysis (Sunday 3 AM)
export async function scheduleWeeklyAnalysis() {
  await analysisQueue.add(
    'weekly-deep-analysis',
    { type: 'weekly' },
    {
      repeat: {
        cron: '0 3 * * 0', // Sunday 3 AM
        tz: 'Australia/Sydney',
      },
      jobId: 'weekly-deep-analysis-job',
    }
  );

  console.log('[Scheduler] Weekly deep analysis scheduled for Sunday 3 AM');
}

// Schedule rank tracking (every 6 hours)
export async function scheduleRankTracking() {
  await analysisQueue.add(
    'rank-tracking',
    { type: 'rank-tracking' },
    {
      repeat: {
        cron: '0 */6 * * *', // Every 6 hours
        tz: 'Australia/Sydney',
      },
      jobId: 'rank-tracking-job',
    }
  );

  console.log('[Scheduler] Rank tracking scheduled every 6 hours');
}

// Schedule monthly trend report (1st of month, 4 AM)
export async function scheduleMonthlyReport() {
  await analysisQueue.add(
    'monthly-trend-report',
    { type: 'monthly' },
    {
      repeat: {
        cron: '0 4 1 * *', // 1st of month, 4 AM
        tz: 'Australia/Sydney',
      },
      jobId: 'monthly-trend-report-job',
    }
  );

  console.log('[Scheduler] Monthly trend report scheduled for 1st of month at 4 AM');
}

// Initialize all schedules
export async function initializeSchedules() {
  console.log('[Scheduler] Initializing competitor analysis schedules...');

  try {
    await scheduleDailyAnalysis();
    await scheduleWeeklyAnalysis();
    await scheduleRankTracking();
    await scheduleMonthlyReport();

    console.log('[Scheduler] All schedules initialized successfully');
  } catch (error: any) {
    console.error('[Scheduler] Error initializing schedules:', error.message);
    throw error;
  }
}

// Trigger immediate analysis for specific competitor
export async function triggerAnalysis(
  competitorId: string,
  priority: number = 5
): Promise<string> {
  const job = await analysisQueue.add(
    'single-competitor-analysis',
    { competitorId },
    { priority }
  );

  console.log(`[Scheduler] Triggered immediate analysis for ${competitorId}, job ID: ${job.id}`);

  return job.id as string;
}

// Trigger batch analysis for category
export async function triggerBatchAnalysis(
  category?: string,
  priority: number = 5
): Promise<string> {
  const job = await analysisQueue.add(
    'batch-competitor-analysis',
    { category },
    { priority }
  );

  console.log(`[Scheduler] Triggered batch analysis${category ? ` for category: ${category}` : ''}, job ID: ${job.id}`);

  return job.id as string;
}

// Trigger keyword gap analysis
export async function triggerKeywordGapAnalysis(
  targetDomain: string,
  competitorCategory?: string,
  priority: number = 5
): Promise<string> {
  const job = await analysisQueue.add(
    'keyword-gap-analysis',
    { targetDomain, competitorCategory },
    { priority }
  );

  console.log(`[Scheduler] Triggered keyword gap analysis for ${targetDomain}, job ID: ${job.id}`);

  return job.id as string;
}

// Trigger SWOT analysis
export async function triggerSWOTAnalysis(
  competitorId: string,
  priority: number = 5
): Promise<string> {
  const job = await analysisQueue.add(
    'swot-analysis',
    { competitorId },
    { priority }
  );

  console.log(`[Scheduler] Triggered SWOT analysis for ${competitorId}, job ID: ${job.id}`);

  return job.id as string;
}

// Get job status
export async function getJobStatus(jobId: string) {
  const job = await analysisQueue.getJob(jobId);

  if (!job) {
    return null;
  }

  const state = await job.getState();
  const progress = job.progress();
  const failedReason = job.failedReason;

  return {
    id: job.id,
    status: state,
    progress,
    failedReason,
    data: job.data,
    result: await job.finished().catch(() => null),
    createdAt: new Date(job.timestamp),
  };
}

// Clear all scheduled jobs
export async function clearSchedules() {
  await analysisQueue.removeRepeatable('daily-analysis', {
    cron: '0 2 * * *',
    tz: 'Australia/Sydney',
  });

  await analysisQueue.removeRepeatable('weekly-deep-analysis', {
    cron: '0 3 * * 0',
    tz: 'Australia/Sydney',
  });

  await analysisQueue.removeRepeatable('rank-tracking', {
    cron: '0 */6 * * *',
    tz: 'Australia/Sydney',
  });

  await analysisQueue.removeRepeatable('monthly-trend-report', {
    cron: '0 4 1 * *',
    tz: 'Australia/Sydney',
  });

  console.log('[Scheduler] All schedules cleared');
}

// Get queue stats
export async function getQueueStats() {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    analysisQueue.getWaitingCount(),
    analysisQueue.getActiveCount(),
    analysisQueue.getCompletedCount(),
    analysisQueue.getFailedCount(),
    analysisQueue.getDelayedCount(),
  ]);

  return {
    waiting,
    active,
    completed,
    failed,
    delayed,
    total: waiting + active + completed + failed + delayed,
  };
}

// Clean old jobs
export async function cleanOldJobs(olderThanDays: number = 30) {
  const timestamp = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;

  await analysisQueue.clean(timestamp, 'completed');
  await analysisQueue.clean(timestamp, 'failed');

  console.log(`[Scheduler] Cleaned jobs older than ${olderThanDays} days`);
}
