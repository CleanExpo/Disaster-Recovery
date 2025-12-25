import { prisma } from '@/lib/prisma';
import { NotificationService } from '@/lib/notifications/notification-service';
import { BookingStatusChangePayload } from '@/lib/websocket/events';

export type BookingStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Valid status transitions for bookings
 */
const validTransitions: Record<string, BookingStatus[]> = {
  pending: ['assigned', 'cancelled'],
  assigned: ['in_progress', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export class BookingStatusHandler {
  /**
   * Update booking status and emit real-time event
   */
  static async updateStatus(
    bookingId: string,
    newStatus: BookingStatus,
    details?: string
  ): Promise<BookingStatusChangePayload> {
    try {
      // Fetch current booking
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          customer: true,
          contractor: true,
        },
      });

      if (!booking) {
        throw new Error(`Booking ${bookingId} not found`);
      }

      const previousStatus = booking.status;

      // Validate status transition
      if (!this.isValidTransition(previousStatus, newStatus)) {
        throw new Error(
          `Invalid status transition from ${previousStatus} to ${newStatus}`
        );
      }

      // Update booking in database
      const updated = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: newStatus,
          updatedAt: new Date(),
        },
      });

      // Create status change payload
      const payload: BookingStatusChangePayload = {
        bookingId,
        previousStatus,
        newStatus,
        customerId: booking.customerId,
        contractorId: booking.contractorId || undefined,
        timestamp: new Date(),
        details,
      };

      // Handle side effects based on status change
      await this.handleStatusChange(booking.id, previousStatus, newStatus, booking);

      return payload;
    } catch (error) {
      console.error('Failed to update booking status:', error);
      throw error;
    }
  }

  /**
   * Handle side effects when status changes
   */
  private static async handleStatusChange(
    bookingId: string,
    previousStatus: string,
    newStatus: BookingStatus,
    booking: any
  ): Promise<void> {
    try {
      switch (newStatus) {
        case 'assigned':
          if (booking.contractorId) {
            await NotificationService.notifyBookingAssigned(
              bookingId,
              booking.customerId,
              booking.contractorId,
              booking.contractor?.firstName + ' ' + booking.contractor?.lastName
            );
          }
          break;

        case 'in_progress':
          // Notify customer that work has started
          await NotificationService.notifySystem(
            booking.customerId,
            'Work Started',
            'The contractor has started work on your booking.'
          );
          break;

        case 'completed':
          // Create audit log
          await this.createAuditLog(bookingId, previousStatus, newStatus);
          // Notify customer for review
          await NotificationService.notifySystem(
            booking.customerId,
            'Work Completed',
            'The contractor has completed your booking. Please review and provide feedback.'
          );
          break;

        case 'cancelled':
          // Notify both parties
          await NotificationService.notifySystem(
            booking.customerId,
            'Booking Cancelled',
            'Your booking has been cancelled.'
          );
          if (booking.contractorId) {
            await NotificationService.notifySystem(
              booking.contractorId,
              'Booking Cancelled',
              'Your assigned booking has been cancelled.'
            );
          }
          break;
      }
    } catch (error) {
      console.error('Error handling status change side effects:', error);
      // Don't throw - side effects shouldn't prevent status update
    }
  }

  /**
   * Check if status transition is valid
   */
  private static isValidTransition(
    currentStatus: string,
    newStatus: BookingStatus
  ): boolean {
    const validNextStatuses = validTransitions[currentStatus];
    return validNextStatuses && validNextStatuses.includes(newStatus);
  }

  /**
   * Create audit log for status change
   */
  private static async createAuditLog(
    bookingId: string,
    fromStatus: string,
    toStatus: string
  ): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          action: 'booking_status_change',
          entityType: 'booking',
          entityId: bookingId,
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
   * Get booking status history
   */
  static async getStatusHistory(bookingId: string) {
    try {
      const logs = await prisma.auditLog.findMany({
        where: {
          entityId: bookingId,
          action: 'booking_status_change',
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
      console.error('Failed to get status history:', error);
      throw error;
    }
  }

  /**
   * Get all active bookings
   */
  static async getActiveBookings() {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          status: { in: ['pending', 'assigned', 'in_progress'] },
        },
        include: {
          customer: { select: { id: true, firstName: true, lastName: true } },
          contractor: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return bookings;
    } catch (error) {
      console.error('Failed to get active bookings:', error);
      throw error;
    }
  }

  /**
   * Get completed bookings for a contractor
   */
  static async getCompletedBookings(contractorId: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          contractorId,
          status: 'completed',
        },
        include: {
          customer: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return bookings;
    } catch (error) {
      console.error('Failed to get completed bookings:', error);
      throw error;
    }
  }

  /**
   * Get pending bookings for a contractor
   */
  static async getPendingBookings(contractorId: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned'] },
        },
        include: {
          customer: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return bookings;
    } catch (error) {
      console.error('Failed to get pending bookings:', error);
      throw error;
    }
  }

  /**
   * Calculate booking metrics
   */
  static async getBookingMetrics(timeRange: 'day' | 'week' | 'month' = 'month') {
    try {
      const now = new Date();
      const startDate = this.getStartDate(now, timeRange);

      const metrics = await prisma.booking.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gte: startDate,
          },
        },
        _count: true,
      });

      return metrics.reduce(
        (acc, m) => {
          acc[m.status] = m._count;
          return acc;
        },
        {} as Record<string, number>
      );
    } catch (error) {
      console.error('Failed to get booking metrics:', error);
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
