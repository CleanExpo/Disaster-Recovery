/**
 * Search Dominance Scheduler
 *
 * Schedules automated search intelligence jobs using Bull queue:
 * - Rank tracking: Every 6 hours
 * - Traffic sync: Every 1 hour
 * - Competitor snapshot: Daily at 3 AM
 * - Dominance aggregation: Daily at 1 AM
 * - Blue Ocean scan: Weekly on Monday at 1 AM
 * - Algorithm monitor: Every 6 hours
 *
 * Pattern: Follows src/lib/competitor-analysis/jobs/analysis-scheduler.ts
 */

import Bull from 'bull';
import { processRankTracking } from './rank-tracking-job';
import { processTrafficSync } from './traffic-sync-job';
import { processCompetitorSnapshot } from './competitor-snapshot-job';
import { processDominanceAggregation } from './dominance-aggregation-job';

// Create Bull queue
export const searchDominanceQueue = new Bull('search-dominance', {
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
    removeOnFail: 500, // Keep last 500 failed jobs
  },
});

// ============================================================================
// SCHEDULE JOBS
// ============================================================================

/**
 * Schedule rank tracking (every 6 hours)
 */
export async function scheduleRankTracking() {
  await searchDominanceQueue.add(
    'rank-tracking',
    { type: 'rank-tracking' },
    {
      repeat: {
        cron: '0 */6 * * *', // Every 6 hours at minute 0
        tz: 'Australia/Sydney',
      },
      jobId: 'rank-tracking-job',
      priority: 1, // High priority
    }
  );

  console.log('[Search Dominance] Rank tracking scheduled every 6 hours');
}

/**
 * Schedule traffic sync (every 1 hour)
 */
export async function scheduleTrafficSync() {
  await searchDominanceQueue.add(
    'traffic-sync',
    { type: 'traffic-sync' },
    {
      repeat: {
        cron: '0 * * * *', // Every hour at minute 0
        tz: 'Australia/Sydney',
      },
      jobId: 'traffic-sync-job',
      priority: 1, // High priority
    }
  );

  console.log('[Search Dominance] Traffic sync scheduled every 1 hour');
}

/**
 * Schedule competitor snapshot (daily at 3 AM)
 */
export async function scheduleCompetitorSnapshot() {
  await searchDominanceQueue.add(
    'competitor-snapshot',
    { type: 'competitor-snapshot' },
    {
      repeat: {
        cron: '0 3 * * *', // Daily at 3 AM
        tz: 'Australia/Sydney',
      },
      jobId: 'competitor-snapshot-job',
      priority: 2, // Medium priority
    }
  );

  console.log('[Search Dominance] Competitor snapshot scheduled for 3 AM daily');
}

/**
 * Schedule dominance aggregation (daily at 1 AM)
 */
export async function scheduleDominanceAggregation() {
  await searchDominanceQueue.add(
    'dominance-aggregation',
    { type: 'dominance-aggregation' },
    {
      repeat: {
        cron: '0 1 * * *', // Daily at 1 AM
        tz: 'Australia/Sydney',
      },
      jobId: 'dominance-aggregation-job',
      priority: 2, // Medium priority
    }
  );

  console.log('[Search Dominance] Dominance aggregation scheduled for 1 AM daily');
}

/**
 * Schedule Blue Ocean scan (weekly on Monday at 1 AM)
 */
export async function scheduleBlueOceanScan() {
  await searchDominanceQueue.add(
    'blue-ocean-scan',
    { type: 'blue-ocean-scan' },
    {
      repeat: {
        cron: '0 1 * * 1', // Monday at 1 AM
        tz: 'Australia/Sydney',
      },
      jobId: 'blue-ocean-scan-job',
      priority: 3, // Low priority
    }
  );

  console.log('[Search Dominance] Blue Ocean scan scheduled for Monday 1 AM');
}

/**
 * Schedule algorithm monitor (every 6 hours)
 */
export async function scheduleAlgorithmMonitor() {
  await searchDominanceQueue.add(
    'algorithm-monitor',
    { type: 'algorithm-monitor' },
    {
      repeat: {
        cron: '0 */6 * * *', // Every 6 hours at minute 0
        tz: 'Australia/Sydney',
      },
      jobId: 'algorithm-monitor-job',
      priority: 1, // High priority
    }
  );

  console.log('[Search Dominance] Algorithm monitor scheduled every 6 hours');
}

/**
 * Initialize all schedules
 */
export async function initializeSchedules() {
  console.log('[Search Dominance] Initializing job schedules...');

  await scheduleRankTracking();
  await scheduleTrafficSync();
  await scheduleCompetitorSnapshot();
  await scheduleDominanceAggregation();
  await scheduleBlueOceanScan();
  await scheduleAlgorithmMonitor();

  console.log('[Search Dominance] All schedules initialized');
}

// ============================================================================
// MANUAL JOB TRIGGERS
// ============================================================================

/**
 * Trigger rank tracking job manually
 */
export async function triggerRankTracking(priority: number = 1) {
  const job = await searchDominanceQueue.add(
    'rank-tracking',
    { type: 'rank-tracking', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Rank tracking job triggered (ID: ${job.id})`);
  return job.id;
}

/**
 * Trigger traffic sync job manually
 */
export async function triggerTrafficSync(priority: number = 1) {
  const job = await searchDominanceQueue.add(
    'traffic-sync',
    { type: 'traffic-sync', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Traffic sync job triggered (ID: ${job.id})`);
  return job.id;
}

/**
 * Trigger competitor snapshot job manually
 */
export async function triggerCompetitorSnapshot(priority: number = 2) {
  const job = await searchDominanceQueue.add(
    'competitor-snapshot',
    { type: 'competitor-snapshot', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Competitor snapshot job triggered (ID: ${job.id})`);
  return job.id;
}

/**
 * Trigger dominance aggregation job manually
 */
export async function triggerDominanceAggregation(priority: number = 2) {
  const job = await searchDominanceQueue.add(
    'dominance-aggregation',
    { type: 'dominance-aggregation', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Dominance aggregation job triggered (ID: ${job.id})`);
  return job.id;
}

/**
 * Trigger Blue Ocean scan manually
 */
export async function triggerBlueOceanScan(priority: number = 3) {
  const job = await searchDominanceQueue.add(
    'blue-ocean-scan',
    { type: 'blue-ocean-scan', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Blue Ocean scan job triggered (ID: ${job.id})`);
  return job.id;
}

/**
 * Trigger algorithm monitor manually
 */
export async function triggerAlgorithmMonitor(priority: number = 1) {
  const job = await searchDominanceQueue.add(
    'algorithm-monitor',
    { type: 'algorithm-monitor', manual: true },
    { priority }
  );

  console.log(`[Search Dominance] Algorithm monitor job triggered (ID: ${job.id})`);
  return job.id;
}

// ============================================================================
// QUEUE STATUS & HEALTH
// ============================================================================

/**
 * Get queue statistics
 */
export async function getQueueStats() {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    searchDominanceQueue.getWaitingCount(),
    searchDominanceQueue.getActiveCount(),
    searchDominanceQueue.getCompletedCount(),
    searchDominanceQueue.getFailedCount(),
    searchDominanceQueue.getDelayedCount(),
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

/**
 * Clean old jobs
 */
export async function cleanOldJobs() {
  const grace = 24 * 60 * 60 * 1000; // 24 hours
  await searchDominanceQueue.clean(grace, 'completed');
  await searchDominanceQueue.clean(grace * 7, 'failed'); // Keep failed for 7 days

  console.log('[Search Dominance] Old jobs cleaned');
}

/**
 * Pause queue
 */
export async function pauseQueue() {
  await searchDominanceQueue.pause();
  console.log('[Search Dominance] Queue paused');
}

/**
 * Resume queue
 */
export async function resumeQueue() {
  await searchDominanceQueue.resume();
  console.log('[Search Dominance] Queue resumed');
}

/**
 * Graceful shutdown
 */
export async function shutdown() {
  console.log('[Search Dominance] Shutting down queue...');
  await searchDominanceQueue.close();
  console.log('[Search Dominance] Queue shut down');
}

// ============================================================================
// JOB PROCESSORS
// ============================================================================

/**
 * Process jobs in the queue
 */
searchDominanceQueue.process('rank-tracking', 5, async (job) => {
  console.log(`[Search Dominance] Processing rank-tracking job ${job.id}`);

  const result = await processRankTracking((current, total, status) => {
    job.progress((current / total) * 100);
    job.log(status);
  });

  return result;
});

searchDominanceQueue.process('traffic-sync', 5, async (job) => {
  console.log(`[Search Dominance] Processing traffic-sync job ${job.id}`);

  const result = await processTrafficSync((current, total, status) => {
    job.progress((current / total) * 100);
    job.log(status);
  });

  return result;
});

searchDominanceQueue.process('competitor-snapshot', 1, async (job) => {
  console.log(`[Search Dominance] Processing competitor-snapshot job ${job.id}`);

  const result = await processCompetitorSnapshot((current, total, status) => {
    job.progress((current / total) * 100);
    job.log(status);
  });

  return result;
});

searchDominanceQueue.process('dominance-aggregation', 1, async (job) => {
  console.log(`[Search Dominance] Processing dominance-aggregation job ${job.id}`);

  const result = await processDominanceAggregation((current, total, status) => {
    job.progress((current / total) * 100);
    job.log(status);
  });

  return result;
});

searchDominanceQueue.process('blue-ocean-scan', 1, async (job) => {
  console.log(`[Search Dominance] Processing blue-ocean-scan job ${job.id}`);

  // TODO: Implement Blue Ocean scanner (Phase 3)
  job.log('Blue Ocean scanner not yet implemented');

  return {
    success: false,
    recordsProcessed: 0,
    recordsCreated: 0,
    errors: ['Not yet implemented'],
    warnings: [],
    duration: 0,
    completedAt: new Date(),
  };
});

searchDominanceQueue.process('algorithm-monitor', 5, async (job) => {
  console.log(`[Search Dominance] Processing algorithm-monitor job ${job.id}`);

  // TODO: Implement algorithm monitor (Phase 3)
  job.log('Algorithm monitor not yet implemented');

  return {
    success: false,
    recordsProcessed: 0,
    recordsCreated: 0,
    errors: ['Not yet implemented'],
    warnings: [],
    duration: 0,
    completedAt: new Date(),
  };
});

// ============================================================================
// EVENT HANDLERS
// ============================================================================

searchDominanceQueue.on('completed', (job, result) => {
  console.log(`[Search Dominance] Job ${job.id} (${job.name}) completed:`, result);
});

searchDominanceQueue.on('failed', (job, err) => {
  console.error(`[Search Dominance] Job ${job?.id} (${job?.name}) failed:`, err);
});

searchDominanceQueue.on('stalled', (job) => {
  console.warn(`[Search Dominance] Job ${job.id} (${job.name}) stalled`);
});

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize the Search Dominance scheduler
 * Call this on application startup
 */
export async function initializeSearchDominanceScheduler() {
  console.log('[Search Dominance] Initializing Search Dominance Scheduler...');

  try {
    // Initialize all scheduled jobs
    await initializeSchedules();

    // Clean old jobs on startup
    await cleanOldJobs();

    console.log('[Search Dominance] Scheduler initialized successfully');
  } catch (error) {
    console.error('[Search Dominance] Failed to initialize scheduler:', error);
    throw error;
  }
}

// Handle graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
