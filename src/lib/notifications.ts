/**
 * DR-389: Claim status notification dispatch utility.
 *
 * Strategy:
 *  - No firebase-admin or web-push in this project, so notifications are
 *    persisted to the `ClaimNotification` table and clients poll
 *    GET /api/notifications/[claimId] every 30 seconds.
 *  - If the browser supports the Notifications API + Service Worker push,
 *    the ClaimStatusNotifier component additionally registers a push token
 *    via POST /api/notifications/register and shows native toasts.
 */

import { prisma } from '@/lib/prisma';

export interface ClaimStatusChangePayload {
  claimId: string;
  newStatus: string;
  /** Optional human-readable override for the notification title */
  title?: string;
  /** Optional human-readable override for the notification body */
  message?: string;
}
import { clientLogger } from '@/lib/observability/client-logger';

/** Maps internal status codes to user-facing copy. */
const STATUS_COPY: Record<string, { title: string; message: string }> = {
  SUBMITTED: {
    title: 'Claim Received',
    message: 'Your claim has been submitted and is being matched with a certified contractor.',
  },
  ASSIGNED: {
    title: 'Contractor Assigned',
    message: 'A certified NRPG contractor has been assigned to your claim.',
  },
  CONTRACTOR_ASSIGNED: {
    title: 'Contractor Assigned',
    message: 'A certified NRPG contractor has been assigned to your claim.',
  },
  ACCEPTED: {
    title: 'Job Accepted',
    message: 'Your assigned contractor has accepted the job and will contact you shortly.',
  },
  CONTACTED: {
    title: 'Contractor Made Contact',
    message: 'Your contractor has made initial contact regarding your claim.',
  },
  IN_PROGRESS: {
    title: 'Work In Progress',
    message: 'Restoration work is now underway at your property.',
  },
  SCHEDULED: {
    title: 'Job Scheduled',
    message: 'Your restoration job has been scheduled.',
  },
  MAKE_SAFE_COMPLETED: {
    title: 'Make-Safe Complete',
    message: 'Make-safe works have been completed at your property.',
  },
  DOCUMENTED: {
    title: 'Documentation Complete',
    message: 'All required documentation has been provided for your claim.',
  },
  COMPLETED: {
    title: 'Claim Finalised',
    message: 'Your claim has been finalised. Work is complete.',
  },
  FINALIZED: {
    title: 'Claim Finalised',
    message: 'Your claim has been finalised. Work is complete.',
  },
};

/** Returns false — no external push provider configured. Kept for future use. */
export function isConfigured(): boolean {
  return false;
}

/**
 * Dispatch a notification for a claim status change.
 * Writes one row to `ClaimNotification` so the polling endpoint can serve it.
 * Safe to call fire-and-forget (errors are caught and logged).
 */
export async function dispatchClaimStatusNotification(
  payload: ClaimStatusChangePayload,
): Promise<void> {
  const { claimId, newStatus, title: overrideTitle, message: overrideMessage } = payload;

  const copy = STATUS_COPY[newStatus.toUpperCase()] ?? {
    title: 'Claim Update',
    message: `Your claim status has been updated to ${newStatus}.`,
  };

  const title = overrideTitle ?? copy.title;
  const message = overrideMessage ?? copy.message;

  try {
    await prisma.claimNotification.create({
      data: {
        claimId,
        status: newStatus,
        title,
        message,
        read: false,
      },
    });
  } catch (err) {
    // Non-fatal — a notification failure must never block a claim status update.
    clientLogger.error('[DR-389] Failed to write ClaimNotification:', { source: 'lib/notifications' }, err);
  }
}
