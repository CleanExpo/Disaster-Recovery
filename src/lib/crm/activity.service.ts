/**
 * Activity Service
 *
 * Manages customer interaction logging and timeline generation
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module ActivityService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { PrismaClient, ActivityType, Prisma } from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';
import { CustomerLifecycleService } from './customer-lifecycle.service';

interface CreateActivityInput {
  type: ActivityType;
  subject: string;
  description?: string;
  outcome?: string;
  performedById: string;
  customerId?: string;
  customerLifecycleId?: string;
  opportunityId?: string;
  bookingId?: string;
  claimId?: string;
  contractorId?: string;
  activityDate?: Date;
  durationMinutes?: number;
  attachments?: string[];
  requiresFollowUp?: boolean;
  followUpDate?: Date;
}

export class ActivityService {
  private customerLifecycleService: CustomerLifecycleService;

  constructor(private prisma: PrismaClient) {
    this.customerLifecycleService = new CustomerLifecycleService(prisma);
  }

  /**
   * Create activity and auto-update customer lifecycle metrics
   * @param input - Activity creation data
   * @returns Created Activity
   */
  async createActivity(input: CreateActivityInput) {
    // If customerId provided but not lifecycleId, get lifecycle
    let lifecycleId = input.customerLifecycleId;

    if (input.customerId && !lifecycleId) {
      const lifecycle = await this.customerLifecycleService.getOrCreateLifecycle(
        input.customerId
      );
      lifecycleId = lifecycle.id;
    }

    const activity = await this.prisma.activity.create({
      data: {
        type: input.type,
        subject: input.subject,
        description: input.description,
        outcome: input.outcome,
        performedById: input.performedById,
        customerId: input.customerId,
        customerLifecycleId: lifecycleId,
        opportunityId: input.opportunityId,
        bookingId: input.bookingId,
        claimId: input.claimId,
        contractorId: input.contractorId,
        activityDate: input.activityDate || new Date(),
        durationMinutes: input.durationMinutes,
        attachments: input.attachments || [],
        requiresFollowUp: input.requiresFollowUp || false,
        followUpDate: input.followUpDate,
      },
    });

    AdvancedLogger.info('Activity created', {
      activityId: activity.id,
      type: input.type,
      customerId: input.customerId,
    });

    // Auto-update customer lifecycle interaction metrics
    if (lifecycleId) {
      await this.customerLifecycleService.recordInteraction(lifecycleId);
    }

    return activity;
  }

  /**
   * Log booking created activity (auto-called from booking API)
   */
  async logBookingCreated(booking: any) {
    // Get customer lifecycle
    const lifecycle = await this.customerLifecycleService.getOrCreateLifecycle(
      booking.clientId
    );

    return this.createActivity({
      type: 'BOOKING_CREATED',
      subject: `Booking created: ${booking.description}`,
      description: `Service: ${booking.australianServiceType}, Cost: $${booking.estimatedCostAUD}`,
      performedById: booking.clientId,
      customerId: booking.clientId,
      customerLifecycleId: lifecycle.id,
      bookingId: booking.id,
      activityDate: booking.createdAt,
    });
  }

  /**
   * Log payment received activity (auto-called from payment API)
   */
  async logPaymentReceived(payment: any) {
    const lifecycle = await this.customerLifecycleService.getOrCreateLifecycle(
      payment.clientId
    );

    return this.createActivity({
      type: 'PAYMENT_RECEIVED',
      subject: `Payment received: $${payment.amountAUD} AUD`,
      description: `Payment processed for booking ${payment.bookingId}`,
      outcome: `Status: ${payment.status}`,
      performedById: payment.clientId,
      customerId: payment.clientId,
      customerLifecycleId: lifecycle.id,
      bookingId: payment.bookingId,
      activityDate: payment.processedAt || payment.createdAt,
    });
  }

  /**
   * Log insurance claim activity (auto-called from claims API)
   */
  async logClaimSubmitted(claim: any) {
    const lifecycle = await this.customerLifecycleService.getOrCreateLifecycle(
      claim.clientId
    );

    return this.createActivity({
      type: 'CLAIM_SUBMITTED',
      subject: `Insurance claim submitted: ${claim.claimNumber || 'Pending'}`,
      description: `Amount: $${claim.totalClaimAmountAUD} AUD to ${claim.insuranceProvider}`,
      performedById: claim.clientId,
      customerId: claim.clientId,
      customerLifecycleId: lifecycle.id,
      claimId: claim.id,
      bookingId: claim.bookingId,
      activityDate: claim.submittedAt || claim.createdAt,
    });
  }

  /**
   * Get activity timeline for a customer
   * @param userId - User ID
   * @param limit - Number of activities to return
   * @returns Activity timeline
   */
  async getTimeline(userId: string, limit = 50) {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { userId },
    });

    if (!lifecycle) {
      throw new Error(`Customer lifecycle not found for user: ${userId}`);
    }

    return this.prisma.activity.findMany({
      where: {
        OR: [
          { customerLifecycleId: lifecycle.id },
          { customerId: userId },
        ],
      },
      include: {
        performedBy: {
          select: {
            name: true,
            email: true,
          },
        },
        contractor: {
          select: {
            businessName: true,
          },
        },
      },
      orderBy: { activityDate: 'desc' },
      take: limit,
    });
  }

  /**
   * Analyze sentiment for activities
   * Uses basic keyword analysis (can be enhanced with AI)
   *
   * @param activityId - Activity ID
   */
  async analyzeSentiment(activityId: string) {
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!activity) {
      throw new Error(`Activity not found: ${activityId}`);
    }

    // Basic sentiment analysis
    const text = `${activity.subject} ${activity.description || ''} ${activity.outcome || ''}`.toLowerCase();

    const positiveWords = [
      'excellent',
      'great',
      'satisfied',
      'happy',
      'pleased',
      'thank',
      'appreciate',
      'good',
      'wonderful',
    ];
    const negativeWords = [
      'unhappy',
      'dissatisfied',
      'poor',
      'bad',
      'terrible',
      'complaint',
      'issue',
      'problem',
      'delay',
      'mistake',
    ];

    const positiveCount = positiveWords.filter((word) => text.includes(word)).length;
    const negativeCount = negativeWords.filter((word) => text.includes(word)).length;

    let sentiment = 'neutral';
    let sentimentScore = 0;

    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      sentimentScore = Math.min(positiveCount / 5, 1.0);
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      sentimentScore = -Math.min(negativeCount / 5, 1.0);
    }

    // Update activity
    await this.prisma.activity.update({
      where: { id: activityId },
      data: { sentiment, sentimentScore },
    });

    return { sentiment, sentimentScore };
  }

  /**
   * Get activity statistics
   */
  async getActivityStats(startDate?: Date, endDate?: Date) {
    const where: any = {};

    if (startDate || endDate) {
      where.activityDate = {};
      if (startDate) where.activityDate.gte = startDate;
      if (endDate) where.activityDate.lte = endDate;
    }

    const [totalActivities, byType, sentimentStats] = await Promise.all([
      this.prisma.activity.count({ where }),

      this.prisma.activity.groupBy({
        by: ['type'],
        _count: true,
        where,
      }),

      this.prisma.activity.groupBy({
        by: ['sentiment'],
        _count: true,
        _avg: { sentimentScore: true },
        where: {
          ...where,
          sentiment: { not: null },
        },
      }),
    ]);

    return {
      totalActivities,
      byType: Object.fromEntries(byType.map((t) => [t.type, t._count])),
      sentiment: Object.fromEntries(
        sentimentStats.map((s) => [
          s.sentiment,
          {
            count: s._count,
            avgScore: s._avg.sentimentScore || 0,
          },
        ])
      ),
    };
  }
}

export const activityService = new ActivityService(new PrismaClient());
