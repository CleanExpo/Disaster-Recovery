/**
 * Business Rules Monitor Service
 *
 * Hourly cron job that evaluates all business rules and detects violations
 * Implements external accountability to prevent "helpfulness trap"
 *
 * Part of Phase 4 - External Accountability Mechanisms
 *
 * @module BusinessRulesMonitorService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { PrismaClient } from '@prisma/client';
import { BusinessRulesService } from './business-rules.service';
import { AdvancedLogger } from '../logger/advanced-logging';

export class BusinessRulesMonitorService {
  private businessRulesService: BusinessRulesService;

  constructor(private prisma: PrismaClient) {
    this.businessRulesService = new BusinessRulesService(prisma);
  }

  /**
   * Main monitoring function - runs every hour via cron
   * Evaluates all active business rules and executes actions on violations
   */
  async runMonitoring() {
    const correlationId = AdvancedLogger.setCorrelationId();
    const startTime = Date.now();

    AdvancedLogger.info('Business rules monitoring started');

    try {
      const results = await this.businessRulesService.evaluateAllRules();

      const duration = Date.now() - startTime;

      AdvancedLogger.info(
        'Business rules monitoring completed',
        {
          totalRules: results.totalRules,
          violationsDetected: results.violationsDetected,
          actionsExecuted: results.actionsExecuted,
        },
        duration
      );

      return results;
    } catch (error: any) {
      AdvancedLogger.error('Business rules monitoring failed', error);
      throw error;
    }
  }

  /**
   * Get monitoring dashboard data
   */
  async getDashboardData() {
    const [metrics, violations, recentActivity] = await Promise.all([
      this.businessRulesService.getDashboardMetrics(),

      this.businessRulesService.getActiveViolations(),

      this.getRecentMonitoringActivity(),
    ]);

    return {
      metrics,
      violations,
      recentActivity,
    };
  }

  /**
   * Get recent monitoring activity (last 24 hours)
   */
  private async getRecentMonitoringActivity() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const recentViolations = await this.prisma.businessRuleViolation.findMany({
      where: {
        detectedAt: { gte: oneDayAgo },
      },
      include: {
        businessRule: {
          select: {
            name: true,
            ruleType: true,
          },
        },
      },
      orderBy: { detectedAt: 'desc' },
      take: 20,
    });

    return recentViolations.map((v) => ({
      id: v.id,
      ruleName: v.businessRule.name,
      ruleType: v.businessRule.ruleType,
      severity: v.severity,
      entityType: v.entityType,
      detectedAt: v.detectedAt,
      isResolved: v.isResolved,
    }));
  }
}

export const businessRulesMonitorService = new BusinessRulesMonitorService(
  new PrismaClient()
);
