import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/lib/notifications/notification-service';
import { ClaimStatusChangePayload } from '@/lib/websocket/events';

export type ClaimStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'paid';

/**
 * Valid status transitions for claims
 */
const validTransitions: Record<string, ClaimStatus[]> = {
  submitted: ['under_review'],
  under_review: ['approved', 'rejected'],
  approved: ['paid'],
  rejected: [],
  paid: [],
};

export class ClaimStatusHandler {
  /**
   * Update claim status and emit real-time event
   */
  static async updateStatus(
    claimId: string,
    newStatus: ClaimStatus,
    details?: string
  ): Promise<ClaimStatusChangePayload> {
    try {
      // Fetch current claim
      const claim = await prisma.claim.findUnique({
        where: { id: claimId },
        include: {
          booking: true,
          customer: true,
        },
      });

      if (!claim) {
        throw new Error(`Claim ${claimId} not found`);
      }

      const previousStatus = claim.status;

      // Validate status transition
      if (!this.isValidTransition(previousStatus, newStatus)) {
        throw new Error(
          `Invalid status transition from ${previousStatus} to ${newStatus}`
        );
      }

      // Update claim in database
      await prisma.claim.update({
        where: { id: claimId },
        data: {
          status: newStatus,
          updatedAt: new Date(),
        },
      });

      // Create status change payload
      const payload: ClaimStatusChangePayload = {
        claimId,
        previousStatus,
        newStatus,
        customerId: claim.customerId,
        amount: claim.claimAmount,
        timestamp: new Date(),
        details,
      };

      // Handle side effects based on status change
      await this.handleStatusChange(claimId, previousStatus, newStatus, claim);

      return payload;
    } catch (error) {
      console.error('Failed to update claim status:', error);
      throw error;
    }
  }

  /**
   * Handle side effects when status changes
   */
  private static async handleStatusChange(
    claimId: string,
    previousStatus: string,
    newStatus: ClaimStatus,
    claim: any
  ): Promise<void> {
    try {
      switch (newStatus) {
        case 'under_review':
          // Notify customer that claim is being reviewed
          await NotificationService.notifySystem(
            claim.customerId,
            'Claim Under Review',
            'Your insurance claim is being reviewed. You will be notified once a decision is made.'
          );
          break;

        case 'approved':
          // Notify customer of approval and set payment date
          const paymentDate = new Date();
          paymentDate.setDate(paymentDate.getDate() + 3); // Payment in 3 days

          await NotificationService.notifyClaimApproved(
            claimId,
            claim.customerId,
            claim.claimAmount,
            paymentDate
          );

          // Update claim with approval timestamp
          await prisma.claim.update({
            where: { id: claimId },
            data: { approvedAt: new Date() },
          });
          break;

        case 'rejected':
          // Calculate appeal deadline (30 days from rejection)
          const appealDeadline = new Date();
          appealDeadline.setDate(appealDeadline.getDate() + 30);

          await NotificationService.notifyClaimRejected(
            claimId,
            claim.customerId,
            'Claim does not meet coverage requirements',
            appealDeadline
          );

          // Update claim with rejection info
          await prisma.claim.update({
            where: { id: claimId },
            data: {
              rejectedAt: new Date(),
              rejectionReason: 'Claim does not meet coverage requirements',
            },
          });
          break;

        case 'paid':
          // Notify customer of payment
          await NotificationService.notifySystem(
            claim.customerId,
            'Claim Payment Processed',
            `Your approved claim of $${claim.claimAmount.toFixed(2)} AUD has been paid to your account.`
          );

          // Update claim with payment timestamp
          await prisma.claim.update({
            where: { id: claimId },
            data: { paidAt: new Date() },
          });
          break;
      }

      // Create audit log
      await this.createAuditLog(claimId, previousStatus, newStatus);
    } catch (error) {
      console.error('Error handling claim status change side effects:', error);
      // Don't throw - side effects shouldn't prevent status update
    }
  }

  /**
   * Check if status transition is valid
   */
  private static isValidTransition(
    currentStatus: string,
    newStatus: ClaimStatus
  ): boolean {
    const validNextStatuses = validTransitions[currentStatus];
    return validNextStatuses && validNextStatuses.includes(newStatus);
  }

  /**
   * Create audit log for status change
   */
  private static async createAuditLog(
    claimId: string,
    fromStatus: string,
    toStatus: string
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          action: 'claim_status_change',
          entityType: 'claim',
          entityId: claimId,
          changes: {
            from: fromStatus,
            to: toStatus,
          },
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to create audit log:', error);
    }
  }

  /**
   * Get claim status history
   */
  static async getStatusHistory(claimId: string) {
    try {
      const logs = await prisma.auditLog.findMany({
        where: {
          entityId: claimId,
          action: 'claim_status_change',
        },
        orderBy: {
          timestamp: 'asc',
        },
      });

      return logs.map((log) => ({
        status: (log.changes as any)?.to,
        timestamp: log.timestamp,
        changes: log.changes,
      }));
    } catch (error) {
      console.error('Failed to get claim status history:', error);
      throw error;
    }
  }

  /**
   * Get pending claims
   */
  static async getPendingClaims() {
    try {
      const claims = await prisma.claim.findMany({
        where: {
          status: { in: ['submitted', 'under_review'] },
        },
        include: {
          customer: { select: { id: true, firstName: true, lastName: true } },
          booking: { select: { id: true, serviceType: true } },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return claims;
    } catch (error) {
      console.error('Failed to get pending claims:', error);
      throw error;
    }
  }

  /**
   * Get processed claims
   */
  static async getProcessedClaims(customerId?: string) {
    try {
      const claims = await prisma.claim.findMany({
        where: {
          status: { in: ['approved', 'rejected', 'paid'] },
          ...(customerId && { customerId }),
        },
        include: {
          customer: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return claims;
    } catch (error) {
      console.error('Failed to get processed claims:', error);
      throw error;
    }
  }

  /**
   * Calculate claim metrics
   */
  static async getClaimMetrics(timeRange: 'day' | 'week' | 'month' = 'month') {
    try {
      const now = new Date();
      const startDate = this.getStartDate(now, timeRange);

      const statusMetrics = await prisma.claim.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        _count: true,
        _sum: { claimAmount: true },
      });

      const total = await prisma.claim.aggregate({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        _sum: { claimAmount: true },
      });

      return {
        byStatus: statusMetrics,
        totalAmount: total._sum.claimAmount || 0,
        count: statusMetrics.reduce((sum, m) => sum + m._count, 0),
      };
    } catch (error) {
      console.error('Failed to get claim metrics:', error);
      throw error;
    }
  }

  /**
   * Get average processing time
   */
  static async getAverageProcessingTime() {
    try {
      const claims = await prisma.claim.findMany({
        where: {
          status: { in: ['approved', 'rejected'] },
          submittedAt: { not: null },
        },
        select: {
          submittedAt: true,
          approvedAt: true,
          rejectedAt: true,
          updatedAt: true,
        },
      });

      if (claims.length === 0) {
        return 0;
      }

      const times = claims.map((claim) => {
        const startTime = claim.submittedAt?.getTime() || Date.now();
        const endTime =
          (claim.approvedAt || claim.rejectedAt || claim.updatedAt)?.getTime() ||
          Date.now();
        return (endTime - startTime) / (1000 * 60 * 60 * 24); // Convert to days
      });

      const average = times.reduce((sum, t) => sum + t, 0) / times.length;
      return Math.round(average * 10) / 10; // Round to 1 decimal place
    } catch (error) {
      console.error('Failed to calculate average processing time:', error);
      throw error;
    }
  }

  /**
   * Helper to get start date based on time range
   */
  private static getStartDate(date: Date, range: 'day' | 'week' | 'month'): Date {
    const d = new Date(date);
    switch (range) {
      case 'day':
        d.setHours(0, 0, 0, 0);
        return d;
      case 'week':
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
      case 'month':
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        return d;
      default:
        return d;
    }
  }
}
