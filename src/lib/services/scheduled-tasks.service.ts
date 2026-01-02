/**
 * Scheduled Tasks Service
 *
 * Background jobs and recurring tasks:
 * - Reset monthly job counters (1st of each month)
 * - Process dunning cycle (payment retries)
 * - Calculate leaderboard rankings (daily)
 * - Send reminder emails (various triggers)
 *
 * Can be triggered by:
 * - Cron job (Vercel Cron, AWS EventBridge)
 * - API endpoint (manual trigger)
 * - Background worker (Bull, BullMQ)
 */

import { prisma } from '@/lib/prisma';
import { resetMonthlyCounters } from './workspace.service';

// ============================================================================
// MONTHLY TASKS
// ============================================================================

/**
 * Reset monthly job counters (run on 1st of each month at 00:00 UTC)
 *
 * Strategic decision: Job limits reset monthly
 */
export async function resetMonthlyJobCounters(): Promise<{
  success: boolean;
  workspacesReset: number;
}> {
  try {
    console.log('[CRON] Resetting monthly job counters...');

    const count = await resetMonthlyCounters();

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: 'monthly_counters_reset',
        entityType: 'system',
        metadata: {
          workspacesAffected: count,
          resetDate: new Date().toISOString(),
        },
      },
    });

    console.log(`[CRON] Reset ${count} workspace job counters`);

    return {
      success: true,
      workspacesReset: count,
    };
  } catch (error) {
    console.error('[CRON] Failed to reset monthly counters:', error);
    return {
      success: false,
      workspacesReset: 0,
    };
  }
}

// ============================================================================
// DAILY TASKS
// ============================================================================

/**
 * Process subscription dunning cycle (run daily)
 *
 * Strategic decision: Smart retry + 3-day grace
 * - Check for PAST_DUE subscriptions
 * - Suspend after 3 days of failed payment
 * - Cancel after 30 days
 */
export async function processDunningCycle(): Promise<{
  suspended: number;
  cancelled: number;
}> {
  try {
    console.log('[CRON] Processing dunning cycle...');

    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Suspend: PAST_DUE for 3+ days
    const suspended = await prisma.workspace.updateMany({
      where: {
        subscriptionStatus: 'PAST_DUE',
        currentPeriodEnd: { lt: threeDaysAgo },
        suspendedAt: null,
      },
      data: {
        subscriptionStatus: 'SUSPENDED',
        suspendedAt: now,
      },
    });

    // Cancel: SUSPENDED for 30+ days
    const cancelled = await prisma.workspace.updateMany({
      where: {
        subscriptionStatus: 'SUSPENDED',
        suspendedAt: { lt: thirtyDaysAgo },
        cancelledAt: null,
      },
      data: {
        subscriptionStatus: 'CANCELLED',
        cancelledAt: now,
        isActive: false,
      },
    });

    console.log(`[CRON] Suspended ${suspended.count}, Cancelled ${cancelled.count}`);

    return {
      suspended: suspended.count,
      cancelled: cancelled.count,
    };
  } catch (error) {
    console.error('[CRON] Dunning cycle failed:', error);
    return {
      suspended: 0,
      cancelled: 0,
    };
  }
}

/**
 * Clean up churned workspace data (run daily)
 *
 * Strategic decision: 30-day retention after cancellation
 * - Anonymize data after 30 days
 * - Full deletion after 60 days
 */
export async function cleanupChurnedWorkspaces(): Promise<{
  anonymized: number;
  deleted: number;
}> {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Anonymize: Cancelled 30+ days ago
    const toAnonymize = await prisma.workspace.findMany({
      where: {
        subscriptionStatus: 'CANCELLED',
        cancelledAt: { lt: thirtyDaysAgo, gte: sixtyDaysAgo },
      },
    });

    for (const workspace of toAnonymize) {
      await prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          businessName: `ANONYMIZED_${workspace.id.substring(0, 8)}`,
          abnNumber: null,
          acnNumber: null,
          crmApiKey: null,
          crmWebhookSecret: null,
        },
      });
    }

    // Delete: Cancelled 60+ days ago (already anonymized)
    const deleted = await prisma.workspace.deleteMany({
      where: {
        subscriptionStatus: 'CANCELLED',
        cancelledAt: { lt: sixtyDaysAgo },
      },
    });

    console.log(`[CRON] Anonymized ${toAnonymize.length}, Deleted ${deleted.count}`);

    return {
      anonymized: toAnonymize.length,
      deleted: deleted.count,
    };
  } catch (error) {
    console.error('[CRON] Cleanup failed:', error);
    return {
      anonymized: 0,
      deleted: 0,
    };
  }
}

// ============================================================================
// TASK ORCHESTRATOR
// ============================================================================

/**
 * Run all scheduled tasks (can be called by cron endpoint)
 */
export async function runScheduledTasks(taskType: 'monthly' | 'daily' | 'all'): Promise<{
  success: boolean;
  results: Record<string, any>;
}> {
  const results: Record<string, any> = {};

  try {
    if (taskType === 'monthly' || taskType === 'all') {
      results.monthlyReset = await resetMonthlyJobCounters();
    }

    if (taskType === 'daily' || taskType === 'all') {
      results.dunning = await processDunningCycle();
      results.cleanup = await cleanupChurnedWorkspaces();
    }

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error('[CRON] Scheduled tasks failed:', error);
    return {
      success: false,
      results,
    };
  }
}
