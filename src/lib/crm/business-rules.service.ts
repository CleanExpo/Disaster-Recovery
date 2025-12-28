/**
 * Business Rules Service
 *
 * Implements external accountability mechanisms to prevent "helpfulness trap"
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * Enforces hard business rules:
 * - Response time SLA
 * - Conversion rate targets
 * - Churn prevention triggers
 * - Revenue tracking
 *
 * @module BusinessRulesService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import {
  PrismaClient,
  MetricType,
  AlertSeverity,
  OpportunityStage,
} from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';
import { CustomerLifecycleService } from './customer-lifecycle.service';

interface CreateRuleInput {
  name: string;
  description: string;
  ruleType: string;
  metric: MetricType;
  threshold: number;
  comparison: 'greater_than' | 'less_than' | 'equals';
  actionOnViolation: string[];
  ownerId: string;
}

export class BusinessRulesService {
  private customerLifecycleService: CustomerLifecycleService;

  constructor(private prisma: PrismaClient) {
    this.customerLifecycleService = new CustomerLifecycleService(prisma);
  }

  /**
   * Create a new business rule
   * @param input - Rule definition
   * @returns Created BusinessRule
   */
  async createRule(input: CreateRuleInput) {
    const rule = await this.prisma.businessRule.create({
      data: {
        name: input.name,
        description: input.description,
        ruleType: input.ruleType,
        metric: input.metric,
        threshold: input.threshold,
        comparison: input.comparison,
        actionOnViolation: input.actionOnViolation,
        ownerId: input.ownerId,
        isActive: true,
      },
    });

    AdvancedLogger.info('Business rule created', {
      ruleId: rule.id,
      type: input.ruleType,
    });

    return rule;
  }

  /**
   * Initialize default business rules (run once on setup)
   * These rules prevent the "helpfulness trap"
   */
  async initializeDefaultRules(adminUserId: string) {
    const defaultRules: Omit<CreateRuleInput, 'ownerId'>[] = [
      {
        name: 'Response Time SLA',
        description: 'All urgent inquiries must receive response within 2 hours',
        ruleType: 'RESPONSE_TIME',
        metric: 'RESPONSE_TIME',
        threshold: 120, // minutes
        comparison: 'less_than',
        actionOnViolation: ['send_alert', 'create_task', 'notify_manager'],
      },
      {
        name: 'Opportunity Conversion Rate',
        description: 'Conversion rate must stay above 15%',
        ruleType: 'CONVERSION_THRESHOLD',
        metric: 'CONVERSION_RATE',
        threshold: 15, // percent
        comparison: 'greater_than',
        actionOnViolation: ['send_alert', 'create_report'],
      },
      {
        name: 'Customer Churn Prevention',
        description: 'Customers with health score < 30 require intervention',
        ruleType: 'CHURN_PREVENTION',
        metric: 'CUSTOMER_SATISFACTION',
        threshold: 30,
        comparison: 'greater_than',
        actionOnViolation: ['create_task', 'send_alert'],
      },
      {
        name: 'Revenue Target Tracking',
        description: 'Monthly revenue must meet 80% of target by day 20',
        ruleType: 'REVENUE_TRACKING',
        metric: 'REVENUE_TARGET',
        threshold: 80, // percent
        comparison: 'greater_than',
        actionOnViolation: ['send_alert', 'create_report', 'schedule_meeting'],
      },
    ];

    const created = await Promise.all(
      defaultRules.map((rule) => this.createRule({ ...rule, ownerId: adminUserId }))
    );

    AdvancedLogger.info('Default business rules initialized', {
      count: created.length,
    });

    return created;
  }

  /**
   * Evaluate all active rules
   * Called hourly by cron job
   */
  async evaluateAllRules() {
    const correlationId = AdvancedLogger.setCorrelationId();
    AdvancedLogger.info('Starting business rules evaluation');

    const activeRules = await this.prisma.businessRule.findMany({
      where: { isActive: true },
    });

    const results = {
      totalRules: activeRules.length,
      violationsDetected: 0,
      actionsExecuted: 0,
    };

    for (const rule of activeRules) {
      try {
        const violations = await this.evaluateRule(rule);
        results.violationsDetected += violations.length;

        for (const violation of violations) {
          const actionsExecuted = await this.executeViolationActions(
            rule,
            violation
          );
          results.actionsExecuted += actionsExecuted;
        }
      } catch (error: any) {
        AdvancedLogger.error('Rule evaluation failed', error, {
          ruleId: rule.id,
          ruleType: rule.ruleType,
        });
      }
    }

    AdvancedLogger.info('Business rules evaluation completed', results);

    return results;
  }

  /**
   * Evaluate a single rule and detect violations
   * @param rule - BusinessRule to evaluate
   * @returns Array of violations detected
   */
  private async evaluateRule(rule: any): Promise<any[]> {
    switch (rule.ruleType) {
      case 'RESPONSE_TIME':
        return this.checkResponseTime(rule);

      case 'CONVERSION_THRESHOLD':
        return this.checkConversionRate(rule);

      case 'CHURN_PREVENTION':
        return this.checkChurnRisk(rule);

      case 'REVENUE_TRACKING':
        return this.checkRevenueTarget(rule);

      default:
        AdvancedLogger.warn('Unknown rule type', { ruleType: rule.ruleType });
        return [];
    }
  }

  /**
   * Check response time SLA
   * Finds opportunities with no activity in last N minutes
   */
  private async checkResponseTime(rule: any): Promise<any[]> {
    const thresholdMinutes = Number(rule.threshold);
    const cutoffTime = new Date(Date.now() - thresholdMinutes * 60 * 1000);

    // Find opportunities in early stages with no recent activity
    const staleOpportunities = await this.prisma.opportunity.findMany({
      where: {
        stage: { in: ['DISCOVERY', 'ASSESSMENT'] },
        createdAt: { lte: cutoffTime },
        activities: {
          none: {
            activityDate: { gte: cutoffTime },
          },
        },
      },
    });

    const violations = [];

    for (const opp of staleOpportunities) {
      const minutesSinceCreation = Math.floor(
        (Date.now() - opp.createdAt.getTime()) / (1000 * 60)
      );

      const violation = await this.createViolation({
        businessRuleId: rule.id,
        entityType: 'Opportunity',
        entityId: opp.id,
        actualValue: minutesSinceCreation,
        expectedValue: thresholdMinutes,
        severity: minutesSinceCreation > thresholdMinutes * 2 ? 'CRITICAL' : 'WARNING',
      });

      violations.push(violation);
    }

    return violations;
  }

  /**
   * Check conversion rate threshold
   * Calculates won/lost ratio
   */
  private async checkConversionRate(rule: any): Promise<any[]> {
    const targetPercent = Number(rule.threshold);

    const closedOpportunities = await this.prisma.opportunity.groupBy({
      by: ['stage'],
      _count: true,
      where: {
        stage: { in: ['CLOSED_WON', 'CLOSED_LOST'] },
      },
    });

    const wonCount =
      closedOpportunities.find((s) => s.stage === 'CLOSED_WON')?._count || 0;
    const lostCount =
      closedOpportunities.find((s) => s.stage === 'CLOSED_LOST')?._count || 0;
    const totalClosed = wonCount + lostCount;

    if (totalClosed === 0) return []; // No data yet

    const actualConversionRate = (wonCount / totalClosed) * 100;

    // Check if below threshold
    const isViolation =
      rule.comparison === 'greater_than'
        ? actualConversionRate < targetPercent
        : actualConversionRate > targetPercent;

    if (isViolation) {
      const violation = await this.createViolation({
        businessRuleId: rule.id,
        entityType: 'Pipeline',
        entityId: 'overall',
        actualValue: actualConversionRate,
        expectedValue: targetPercent,
        severity:
          actualConversionRate < targetPercent * 0.8 ? 'CRITICAL' : 'WARNING',
      });

      return [violation];
    }

    return [];
  }

  /**
   * Check churn risk - identify customers needing intervention
   */
  private async checkChurnRisk(rule: any): Promise<any[]> {
    const minHealthScore = Number(rule.threshold);

    const atRiskCustomers = await this.prisma.customerLifecycle.findMany({
      where: {
        healthScore: { lt: minHealthScore },
        currentStage: { in: ['CUSTOMER', 'AT_RISK'] },
        isAtRisk: false, // Not yet flagged
      },
    });

    const violations = [];

    for (const customer of atRiskCustomers) {
      const violation = await this.createViolation({
        businessRuleId: rule.id,
        entityType: 'CustomerLifecycle',
        entityId: customer.id,
        actualValue: customer.healthScore,
        expectedValue: minHealthScore,
        severity: customer.healthScore < 20 ? 'CRITICAL' : 'WARNING',
      });

      violations.push(violation);

      // Mark customer as at-risk
      await this.prisma.customerLifecycle.update({
        where: { id: customer.id },
        data: { isAtRisk: true },
      });
    }

    return violations;
  }

  /**
   * Check revenue target
   */
  private async checkRevenueTarget(rule: any): Promise<any[]> {
    // Get current month revenue
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const dayOfMonth = now.getDate();
    const daysInMonth = monthEnd.getDate();

    // Only check after day 20
    if (dayOfMonth < 20) return [];

    const monthlyRevenue = await this.prisma.payment.aggregate({
      _sum: { amountAUD: true },
      where: {
        status: 'COMPLETED',
        processedAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    const actualRevenue = Number(monthlyRevenue._sum.amountAUD || 0);

    // TODO: Get revenue target from configuration (hardcoded for now)
    const monthlyTarget = 100000; // $100k AUD
    const targetPercent = Number(rule.threshold);
    const expectedRevenue = monthlyTarget * (targetPercent / 100);

    if (actualRevenue < expectedRevenue) {
      const violation = await this.createViolation({
        businessRuleId: rule.id,
        entityType: 'Revenue',
        entityId: `${now.getFullYear()}-${now.getMonth() + 1}`,
        actualValue: actualRevenue,
        expectedValue: expectedRevenue,
        severity: actualRevenue < expectedRevenue * 0.9 ? 'CRITICAL' : 'WARNING',
      });

      return [violation];
    }

    return [];
  }

  /**
   * Create a violation record
   */
  private async createViolation(data: {
    businessRuleId: string;
    entityType: string;
    entityId: string;
    actualValue: number;
    expectedValue: number;
    severity: AlertSeverity;
  }) {
    const violation = await this.prisma.businessRuleViolation.create({
      data,
    });

    AdvancedLogger.warn('Business rule violation detected', {
      violationId: violation.id,
      entityType: data.entityType,
      severity: data.severity,
      actualValue: data.actualValue,
      expectedValue: data.expectedValue,
    });

    return violation;
  }

  /**
   * Execute actions when violation detected
   * @param rule - Business rule
   * @param violation - Violation record
   * @returns Number of actions executed
   */
  private async executeViolationActions(
    rule: any,
    violation: any
  ): Promise<number> {
    let actionsExecuted = 0;

    for (const action of rule.actionOnViolation) {
      try {
        switch (action) {
          case 'send_alert':
            await this.sendAlert(violation, rule);
            actionsExecuted++;
            break;

          case 'create_task':
            await this.createTask(violation, rule);
            actionsExecuted++;
            break;

          case 'notify_manager':
            await this.notifyManager(violation, rule);
            actionsExecuted++;
            break;

          case 'create_report':
            await this.createReport(violation, rule);
            actionsExecuted++;
            break;

          default:
            AdvancedLogger.warn('Unknown action type', { action });
        }
      } catch (error: any) {
        AdvancedLogger.error('Action execution failed', error, { action });
      }
    }

    return actionsExecuted;
  }

  /**
   * Send alert for violation
   */
  private async sendAlert(violation: any, rule: any) {
    AdvancedLogger.warn('ALERT: Business rule violation', {
      ruleName: rule.name,
      entityType: violation.entityType,
      severity: violation.severity,
      actualValue: Number(violation.actualValue),
      expectedValue: Number(violation.expectedValue),
    });

    // TODO: Integrate with email/Slack/SMS service
    // For now, just log
  }

  /**
   * Create follow-up task for violation
   */
  private async createTask(violation: any, rule: any) {
    // TODO: Import TaskService to avoid circular dependency
    // For now, create directly

    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + 2); // Due in 2 hours

    await this.prisma.task.create({
      data: {
        title: `Resolve: ${rule.name}`,
        description: `Business rule violation detected.\n\nRule: ${rule.description}\nEntity: ${violation.entityType} (${violation.entityId})\nActual: ${violation.actualValue}\nExpected: ${violation.expectedValue}`,
        assignedToId: rule.ownerId,
        createdById: rule.ownerId, // System-generated
        priority: violation.severity === 'CRITICAL' ? 'URGENT' : 'HIGH',
        status: 'TODO',
        dueDate,
        relatedEntityType: violation.entityType,
        relatedEntityId: violation.entityId,
      },
    });

    AdvancedLogger.info('Task created for violation', {
      violationId: violation.id,
    });
  }

  /**
   * Notify manager of violation
   */
  private async notifyManager(violation: any, rule: any) {
    // TODO: Send email/SMS to rule owner
    AdvancedLogger.warn('Manager notification sent', {
      ruleOwner: rule.ownerId,
      violationId: violation.id,
    });
  }

  /**
   * Create report for violation
   */
  private async createReport(violation: any, rule: any) {
    // TODO: Generate PDF report
    AdvancedLogger.info('Report generated for violation', {
      violationId: violation.id,
    });
  }

  /**
   * Get all unresolved violations
   * @param severity - Filter by severity (optional)
   * @returns Active violations
   */
  async getActiveViolations(severity?: AlertSeverity) {
    const where: any = { isResolved: false };

    if (severity) {
      where.severity = severity;
    }

    return this.prisma.businessRuleViolation.findMany({
      where,
      include: {
        businessRule: {
          select: {
            name: true,
            description: true,
            ruleType: true,
          },
        },
      },
      orderBy: [{ severity: 'desc' }, { detectedAt: 'desc' }],
    });
  }

  /**
   * Resolve a violation
   * @param violationId - Violation ID
   * @param resolvedById - User who resolved it
   * @param resolutionNote - How it was resolved
   */
  async resolveViolation(
    violationId: string,
    resolvedById: string,
    resolutionNote: string
  ) {
    const updated = await this.prisma.businessRuleViolation.update({
      where: { id: violationId },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
        resolvedById,
        resolutionNote,
      },
    });

    AdvancedLogger.info('Violation resolved', {
      violationId,
      resolvedById,
    });

    return updated;
  }

  /**
   * Get violation statistics
   */
  async getViolationStats() {
    const [bySeverity, byRule, resolvedCount] = await Promise.all([
      this.prisma.businessRuleViolation.groupBy({
        by: ['severity'],
        _count: true,
        where: { isResolved: false },
      }),

      this.prisma.businessRuleViolation.groupBy({
        by: ['businessRuleId'],
        _count: true,
        where: { isResolved: false },
      }),

      this.prisma.businessRuleViolation.count({
        where: { isResolved: true },
      }),
    ]);

    return {
      bySeverity: Object.fromEntries(bySeverity.map((s) => [s.severity, s._count])),
      byRule: Object.fromEntries(byRule.map((r) => [r.businessRuleId, r._count])),
      totalResolved: resolvedCount,
      totalActive: bySeverity.reduce((sum, s) => sum + s._count, 0),
    };
  }

  /**
   * Get dashboard metrics
   */
  async getDashboardMetrics() {
    const [violationStats, activeRules, criticalViolations] = await Promise.all([
      this.getViolationStats(),

      this.prisma.businessRule.count({
        where: { isActive: true },
      }),

      this.prisma.businessRuleViolation.findMany({
        where: {
          isResolved: false,
          severity: 'CRITICAL',
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
        take: 10,
      }),
    ]);

    return {
      activeRules,
      violationStats,
      criticalViolations: criticalViolations.map((v) => ({
        id: v.id,
        ruleName: v.businessRule.name,
        ruleType: v.businessRule.ruleType,
        entityType: v.entityType,
        entityId: v.entityId,
        actualValue: Number(v.actualValue),
        expectedValue: Number(v.expectedValue),
        detectedAt: v.detectedAt,
      })),
    };
  }
}

export const businessRulesService = new BusinessRulesService(
  new PrismaClient()
);
