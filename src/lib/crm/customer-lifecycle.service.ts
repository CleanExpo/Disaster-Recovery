/**
 * Customer Lifecycle Service
 *
 * Manages customer journey stages, health scores, and churn prediction
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module CustomerLifecycleService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { PrismaClient, CustomerLifecycleStage, Prisma } from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';

export class CustomerLifecycleService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get or create customer lifecycle for a user
   * @param userId - User ID
   * @returns CustomerLifecycle record
   */
  async getOrCreateLifecycle(userId: string) {
    const correlationId = AdvancedLogger.setCorrelationId();

    try {
      // Try to find existing lifecycle
      let lifecycle = await this.prisma.customerLifecycle.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              email: true,
              name: true,
              australianState: true,
            },
          },
          opportunities: {
            select: {
              id: true,
              stage: true,
              estimatedValueAUD: true,
            },
          },
          activities: {
            take: 10,
            orderBy: { activityDate: 'desc' },
          },
        },
      });

      if (!lifecycle) {
        AdvancedLogger.info('Creating new customer lifecycle', { userId });

        // Create new lifecycle
        lifecycle = await this.prisma.customerLifecycle.create({
          data: {
            userId,
            currentStage: 'LEAD',
            healthScore: 50, // Default neutral score
            daysSinceLastContact: 0,
            totalInteractions: 0,
            lifetimeValueAUD: new Prisma.Decimal(0),
            averageJobValueAUD: new Prisma.Decimal(0),
            totalJobsCompleted: 0,
            churnRiskScore: 0,
            isAtRisk: false,
          },
          include: {
            user: {
              select: {
                email: true,
                name: true,
                australianState: true,
              },
            },
            opportunities: true,
            activities: true,
          },
        });
      }

      return lifecycle;
    } catch (error: any) {
      AdvancedLogger.error('Failed to get/create customer lifecycle', error, { userId });
      throw error;
    }
  }

  /**
   * Calculate health score (0-100) based on engagement and value metrics
   *
   * Score factors:
   * - Recent activity (+30 points)
   * - Total interactions (+20 points)
   * - Lifetime value (+20 points)
   * - Completed jobs (+15 points)
   * - Payment history (+15 points)
   *
   * @param lifecycleId - CustomerLifecycle ID
   * @returns Updated health score
   */
  async calculateHealthScore(lifecycleId: string): Promise<number> {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { id: lifecycleId },
      include: {
        user: {
          include: {
            bookings: {
              select: {
                status: true,
                completedAt: true,
                finalCostAUD: true,
              },
            },
            payments: {
              select: {
                status: true,
                processedAt: true,
              },
            },
          },
        },
        activities: {
          orderBy: { activityDate: 'desc' },
          take: 1,
        },
      },
    });

    if (!lifecycle) {
      throw new Error(`CustomerLifecycle not found: ${lifecycleId}`);
    }

    let score = 0;
    const reasons: string[] = [];

    // FACTOR 1: Recent Activity (0-30 points)
    if (lifecycle.lastInteractionDate) {
      const daysSince = Math.floor(
        (Date.now() - lifecycle.lastInteractionDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSince <= 7) {
        score += 30;
        reasons.push('Very recent activity (+30)');
      } else if (daysSince <= 30) {
        score += 20;
        reasons.push('Recent activity (+20)');
      } else if (daysSince <= 90) {
        score += 10;
        reasons.push('Moderate activity (+10)');
      } else {
        score += 0;
        reasons.push('Low recent activity (+0)');
      }
    }

    // FACTOR 2: Total Interactions (0-20 points)
    if (lifecycle.totalInteractions >= 20) {
      score += 20;
      reasons.push('High engagement (+20)');
    } else if (lifecycle.totalInteractions >= 10) {
      score += 15;
      reasons.push('Good engagement (+15)');
    } else if (lifecycle.totalInteractions >= 5) {
      score += 10;
      reasons.push('Moderate engagement (+10)');
    } else {
      score += 5;
      reasons.push('Low engagement (+5)');
    }

    // FACTOR 3: Lifetime Value (0-20 points)
    const lifetimeValue = Number(lifecycle.lifetimeValueAUD);
    if (lifetimeValue >= 50000) {
      score += 20;
      reasons.push('High value customer (+20)');
    } else if (lifetimeValue >= 20000) {
      score += 15;
      reasons.push('Good value customer (+15)');
    } else if (lifetimeValue >= 10000) {
      score += 10;
      reasons.push('Moderate value customer (+10)');
    } else if (lifetimeValue > 0) {
      score += 5;
      reasons.push('Some value (+5)');
    }

    // FACTOR 4: Completed Jobs (0-15 points)
    if (lifecycle.totalJobsCompleted >= 10) {
      score += 15;
      reasons.push('Many jobs completed (+15)');
    } else if (lifecycle.totalJobsCompleted >= 5) {
      score += 10;
      reasons.push('Several jobs completed (+10)');
    } else if (lifecycle.totalJobsCompleted >= 1) {
      score += 5;
      reasons.push('Some jobs completed (+5)');
    }

    // FACTOR 5: Payment History (0-15 points)
    const completedBookings = lifecycle.user.bookings.filter(
      (b) => b.status === 'COMPLETED'
    );
    const paidPayments = lifecycle.user.payments.filter(
      (p) => p.status === 'COMPLETED'
    );

    if (paidPayments.length === completedBookings.length && completedBookings.length > 0) {
      score += 15;
      reasons.push('Perfect payment history (+15)');
    } else if (paidPayments.length >= completedBookings.length * 0.8) {
      score += 10;
      reasons.push('Good payment history (+10)');
    } else if (paidPayments.length > 0) {
      score += 5;
      reasons.push('Some payment history (+5)');
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Update lifecycle
    await this.prisma.customerLifecycle.update({
      where: { id: lifecycleId },
      data: {
        healthScore: score,
        healthScoreReason: reasons.join('; '),
      },
    });

    AdvancedLogger.info('Health score calculated', {
      lifecycleId,
      score,
      factors: reasons.length,
    });

    return score;
  }

  /**
   * Calculate churn risk score (0-100) - higher means more likely to churn
   *
   * Risk factors:
   * - Long time since last contact
   * - Low engagement
   * - Payment issues
   * - Negative sentiment
   * - Low health score
   *
   * @param lifecycleId - CustomerLifecycle ID
   * @returns Churn risk score
   */
  async calculateChurnRisk(lifecycleId: string): Promise<number> {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { id: lifecycleId },
      include: {
        activities: {
          where: { sentiment: { not: null } },
          orderBy: { activityDate: 'desc' },
          take: 10,
        },
        user: {
          include: {
            payments: {
              where: { status: 'FAILED' },
              take: 5,
            },
          },
        },
      },
    });

    if (!lifecycle) {
      throw new Error(`CustomerLifecycle not found: ${lifecycleId}`);
    }

    let risk = 0;
    const reasons: string[] = [];

    // RISK 1: Time since last contact (0-30 points)
    if (lifecycle.daysSinceLastContact > 90) {
      risk += 30;
      reasons.push('no_contact_90_days');
    } else if (lifecycle.daysSinceLastContact > 60) {
      risk += 20;
      reasons.push('no_contact_60_days');
    } else if (lifecycle.daysSinceLastContact > 30) {
      risk += 10;
      reasons.push('no_contact_30_days');
    }

    // RISK 2: Low engagement (0-25 points)
    if (lifecycle.totalInteractions < 2) {
      risk += 25;
      reasons.push('very_low_engagement');
    } else if (lifecycle.totalInteractions < 5) {
      risk += 15;
      reasons.push('low_engagement');
    }

    // RISK 3: Payment issues (0-25 points)
    const failedPayments = lifecycle.user.payments.length;
    if (failedPayments >= 3) {
      risk += 25;
      reasons.push('multiple_payment_failures');
    } else if (failedPayments >= 1) {
      risk += 15;
      reasons.push('payment_issues');
    }

    // RISK 4: Negative sentiment (0-20 points)
    const negativeSentimentCount = lifecycle.activities.filter(
      (a) => a.sentiment === 'negative'
    ).length;

    if (negativeSentimentCount >= 3) {
      risk += 20;
      reasons.push('multiple_negative_interactions');
    } else if (negativeSentimentCount >= 1) {
      risk += 10;
      reasons.push('negative_sentiment');
    }

    // RISK 5: Low health score compounds risk
    if (lifecycle.healthScore < 30) {
      risk += 20;
      reasons.push('low_health_score');
    }

    // Cap at 100
    risk = Math.min(risk, 100);

    // Update lifecycle
    const isAtRisk = risk >= 50;

    await this.prisma.customerLifecycle.update({
      where: { id: lifecycleId },
      data: {
        churnRiskScore: risk,
        isAtRisk,
        atRiskReasons: reasons,
      },
    });

    AdvancedLogger.info('Churn risk calculated', {
      lifecycleId,
      risk,
      isAtRisk,
      reasons,
    });

    return risk;
  }

  /**
   * Update lifecycle stage with validation
   *
   * Stage transitions:
   * LEAD → QUALIFIED_LEAD → OPPORTUNITY → CUSTOMER
   * CUSTOMER → AT_RISK → CHURNED
   * CUSTOMER → ADVOCATE (positive path)
   *
   * @param lifecycleId - CustomerLifecycle ID
   * @param newStage - Target stage
   * @returns Updated lifecycle
   */
  async updateStage(
    lifecycleId: string,
    newStage: CustomerLifecycleStage
  ) {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { id: lifecycleId },
    });

    if (!lifecycle) {
      throw new Error(`CustomerLifecycle not found: ${lifecycleId}`);
    }

    // Validate transition
    const validTransitions: Record<CustomerLifecycleStage, CustomerLifecycleStage[]> = {
      LEAD: ['QUALIFIED_LEAD', 'CHURNED'],
      QUALIFIED_LEAD: ['OPPORTUNITY', 'CHURNED'],
      OPPORTUNITY: ['CUSTOMER', 'CHURNED'],
      CUSTOMER: ['AT_RISK', 'ADVOCATE', 'CHURNED'],
      AT_RISK: ['CUSTOMER', 'CHURNED'],
      CHURNED: ['LEAD'], // Re-engagement
      ADVOCATE: ['AT_RISK', 'CHURNED'],
    };

    const allowedTransitions = validTransitions[lifecycle.currentStage];
    if (!allowedTransitions.includes(newStage)) {
      throw new Error(
        `Invalid stage transition: ${lifecycle.currentStage} → ${newStage}`
      );
    }

    const updated = await this.prisma.customerLifecycle.update({
      where: { id: lifecycleId },
      data: {
        previousStage: lifecycle.currentStage,
        currentStage: newStage,
        stageChangedAt: new Date(),
      },
    });

    AdvancedLogger.info('Lifecycle stage updated', {
      lifecycleId,
      from: lifecycle.currentStage,
      to: newStage,
    });

    return updated;
  }

  /**
   * Get all at-risk customers requiring intervention
   * @returns List of at-risk customers
   */
  async getAtRiskCustomers() {
    return this.prisma.customerLifecycle.findMany({
      where: {
        isAtRisk: true,
        currentStage: { in: ['CUSTOMER', 'AT_RISK'] },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            australianState: true,
          },
        },
        opportunities: {
          where: { stage: { notIn: ['CLOSED_WON', 'CLOSED_LOST'] } },
        },
        tasks: {
          where: { status: { notIn: ['COMPLETED', 'CANCELLED'] } },
        },
      },
      orderBy: { churnRiskScore: 'desc' },
    });
  }

  /**
   * Get customer 360° view - single source of truth
   * @param userId - User ID
   * @returns Complete customer profile with all relationships
   */
  async getCustomer360(userId: string) {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { userId },
      include: {
        user: {
          include: {
            bookings: {
              include: {
                contractor: {
                  select: {
                    businessName: true,
                    averageRating: true,
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
            },
            auClaims: {
              orderBy: { createdAt: 'desc' },
            },
            ratings: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        opportunities: {
          orderBy: { createdAt: 'desc' },
        },
        activities: {
          orderBy: { activityDate: 'desc' },
          take: 50,
        },
        tasks: {
          where: { status: { notIn: ['COMPLETED', 'CANCELLED'] } },
          orderBy: { dueDate: 'asc' },
        },
      },
    });

    if (!lifecycle) {
      throw new Error(`Customer lifecycle not found for user: ${userId}`);
    }

    // Calculate metrics
    const metrics = {
      lifetimeValue: Number(lifecycle.lifetimeValueAUD),
      totalJobs: lifecycle.totalJobsCompleted,
      averageJobValue: Number(lifecycle.averageJobValueAUD),
      healthScore: lifecycle.healthScore,
      churnRisk: lifecycle.churnRiskScore,
      openOpportunities: lifecycle.opportunities.filter(
        (o) => !['CLOSED_WON', 'CLOSED_LOST'].includes(o.stage)
      ).length,
      openTasks: lifecycle.tasks.length,
      daysSinceLastContact: lifecycle.daysSinceLastContact,
    };

    return {
      lifecycle,
      user: lifecycle.user,
      opportunities: lifecycle.opportunities,
      activities: lifecycle.activities,
      tasks: lifecycle.tasks,
      metrics,
    };
  }

  /**
   * Update engagement metrics when customer interacts
   * @param lifecycleId - CustomerLifecycle ID
   */
  async recordInteraction(lifecycleId: string) {
    const updated = await this.prisma.customerLifecycle.update({
      where: { id: lifecycleId },
      data: {
        totalInteractions: { increment: 1 },
        lastInteractionDate: new Date(),
        daysSinceLastContact: 0,
      },
    });

    // Recalculate health score
    await this.calculateHealthScore(lifecycleId);

    return updated;
  }

  /**
   * Update lifetime value when payment received
   * @param lifecycleId - CustomerLifecycle ID
   * @param amountAUD - Payment amount
   */
  async recordRevenue(lifecycleId: string, amountAUD: number) {
    const lifecycle = await this.prisma.customerLifecycle.findUnique({
      where: { id: lifecycleId },
    });

    if (!lifecycle) {
      throw new Error(`CustomerLifecycle not found: ${lifecycleId}`);
    }

    const newLifetimeValue = Number(lifecycle.lifetimeValueAUD) + amountAUD;
    const newJobCount = lifecycle.totalJobsCompleted + 1;
    const newAverageValue = newLifetimeValue / newJobCount;

    const updated = await this.prisma.customerLifecycle.update({
      where: { id: lifecycleId },
      data: {
        lifetimeValueAUD: new Prisma.Decimal(newLifetimeValue),
        totalJobsCompleted: newJobCount,
        averageJobValueAUD: new Prisma.Decimal(newAverageValue),
      },
    });

    AdvancedLogger.info('Revenue recorded', {
      lifecycleId,
      amountAUD,
      newLifetimeValue,
    });

    // Recalculate health score
    await this.calculateHealthScore(lifecycleId);

    return updated;
  }

  /**
   * Run daily batch job to update all customer metrics
   * - Update daysSinceLastContact
   * - Recalculate health scores
   * - Identify new at-risk customers
   */
  async runDailyHealthCheck() {
    const correlationId = AdvancedLogger.setCorrelationId();
    AdvancedLogger.info('Starting daily health check for all customers');

    const allLifecycles = await this.prisma.customerLifecycle.findMany({
      where: {
        user: { isActive: true },
      },
    });

    let updated = 0;
    let newAtRisk = 0;

    for (const lifecycle of allLifecycles) {
      try {
        // Update days since last contact
        if (lifecycle.lastInteractionDate) {
          const daysSince = Math.floor(
            (Date.now() - lifecycle.lastInteractionDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          await this.prisma.customerLifecycle.update({
            where: { id: lifecycle.id },
            data: { daysSinceLastContact: daysSince },
          });
        }

        // Recalculate scores
        const newHealthScore = await this.calculateHealthScore(lifecycle.id);
        const newChurnRisk = await this.calculateChurnRisk(lifecycle.id);

        // Check if newly at-risk
        if (!lifecycle.isAtRisk && newChurnRisk >= 50) {
          newAtRisk++;
          AdvancedLogger.warn('Customer became at-risk', {
            userId: lifecycle.userId,
            churnRisk: newChurnRisk,
          });
        }

        updated++;
      } catch (error: any) {
        AdvancedLogger.error('Failed to update customer health', error, {
          lifecycleId: lifecycle.id,
        });
      }
    }

    AdvancedLogger.info('Daily health check completed', {
      totalCustomers: allLifecycles.length,
      updated,
      newAtRisk,
    });

    return { totalCustomers: allLifecycles.length, updated, newAtRisk };
  }

  /**
   * Get lifecycle metrics for dashboard
   */
  async getLifecycleMetrics() {
    const [
      totalCustomers,
      byStage,
      avgHealthScore,
      atRiskCount,
      advocateCount,
    ] = await Promise.all([
      this.prisma.customerLifecycle.count(),

      this.prisma.customerLifecycle.groupBy({
        by: ['currentStage'],
        _count: true,
      }),

      this.prisma.customerLifecycle.aggregate({
        _avg: { healthScore: true },
      }),

      this.prisma.customerLifecycle.count({
        where: { isAtRisk: true },
      }),

      this.prisma.customerLifecycle.count({
        where: { currentStage: 'ADVOCATE' },
      }),
    ]);

    return {
      totalCustomers,
      byStage: Object.fromEntries(
        byStage.map((s) => [s.currentStage, s._count])
      ),
      averageHealthScore: avgHealthScore._avg.healthScore || 0,
      atRiskCustomers: atRiskCount,
      advocates: advocateCount,
    };
  }
}

export const customerLifecycleService = new CustomerLifecycleService(
  new PrismaClient()
);
