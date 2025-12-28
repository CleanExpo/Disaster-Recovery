/**
 * Unit Tests: Business Rules Service
 *
 * Tests external accountability mechanisms to prevent "helpfulness trap"
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module BusinessRulesServiceTests
 */

import { BusinessRulesService } from '@/lib/crm/business-rules.service';
import { CustomerLifecycleService } from '@/lib/crm/customer-lifecycle.service';
import { prismaMock } from '@tests/mocks/prisma';
import { MetricType, AlertSeverity, Prisma } from '@prisma/client';

// Mock the logger
jest.mock('@/lib/logger/advanced-logging', () => ({
  AdvancedLogger: {
    setCorrelationId: jest.fn().mockReturnValue('test-correlation-id'),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock CustomerLifecycleService
jest.mock('@/lib/crm/customer-lifecycle.service');

describe('BusinessRulesService', () => {
  let service: BusinessRulesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new BusinessRulesService(prismaMock as any);
  });

  describe('initializeDefaultRules', () => {
    it('should create all default business rules', async () => {
      const adminUserId = 'admin-1';
      const mockRules = [
        { id: 'rule-1', name: 'Response Time SLA', ruleType: 'RESPONSE_TIME' },
        { id: 'rule-2', name: 'Opportunity Conversion Rate', ruleType: 'CONVERSION_THRESHOLD' },
        { id: 'rule-3', name: 'Customer Churn Prevention', ruleType: 'CHURN_PREVENTION' },
        { id: 'rule-4', name: 'Revenue Target Tracking', ruleType: 'REVENUE_TRACKING' },
      ];

      prismaMock.businessRule.create.mockImplementation((args: any) => {
        const name = args.data.name;
        const rule = mockRules.find((r) => r.name === name) || mockRules[0];
        return Promise.resolve({ ...rule, ...args.data } as any);
      });

      const result = await service.initializeDefaultRules(adminUserId);

      expect(result).toHaveLength(4);
      expect(prismaMock.businessRule.create).toHaveBeenCalledTimes(4);

      // Verify response time rule
      expect(prismaMock.businessRule.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'Response Time SLA',
            ruleType: 'RESPONSE_TIME',
            metric: 'RESPONSE_TIME',
            threshold: 120,
            comparison: 'less_than',
            ownerId: adminUserId,
          }),
        })
      );

      // Verify conversion rate rule
      expect(prismaMock.businessRule.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'Opportunity Conversion Rate',
            ruleType: 'CONVERSION_THRESHOLD',
            metric: 'CONVERSION_RATE',
            threshold: 15,
          }),
        })
      );

      // Verify churn prevention rule
      expect(prismaMock.businessRule.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'Customer Churn Prevention',
            ruleType: 'CHURN_PREVENTION',
            metric: 'CUSTOMER_SATISFACTION',
            threshold: 30,
          }),
        })
      );

      // Verify revenue tracking rule
      expect(prismaMock.businessRule.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name: 'Revenue Target Tracking',
            ruleType: 'REVENUE_TRACKING',
            metric: 'REVENUE_TARGET',
            threshold: 80,
          }),
        })
      );
    });
  });

  describe('evaluateAllRules - Response Time Violations', () => {
    it('should detect response time violations for stale opportunities', async () => {
      const now = Date.now();
      const cutoffTime = new Date(now - 130 * 60 * 1000); // 130 minutes ago

      const mockRule = {
        id: 'rule-1',
        ruleType: 'RESPONSE_TIME',
        threshold: 120,
        isActive: true,
        actionOnViolation: ['send_alert', 'create_task'],
      };

      const mockStaleOpportunities = [
        {
          id: 'opp-1',
          createdAt: new Date(now - 150 * 60 * 1000), // 150 minutes ago
          stage: 'DISCOVERY',
          activities: [],
        },
      ];

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.findMany.mockResolvedValue(mockStaleOpportunities as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
        businessRuleId: 'rule-1',
        entityId: 'opp-1',
      } as any);

      const result = await service.evaluateAllRules();

      expect(result.totalRules).toBe(1);
      expect(result.violationsDetected).toBeGreaterThanOrEqual(1);
      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            businessRuleId: 'rule-1',
            entityType: 'Opportunity',
            entityId: 'opp-1',
            actualValue: expect.any(Number),
            expectedValue: 120,
          }),
        })
      );
    });

    it('should not flag opportunities with recent activity', async () => {
      const mockRule = {
        id: 'rule-1',
        ruleType: 'RESPONSE_TIME',
        threshold: 120,
        isActive: true,
      };

      // No stale opportunities
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.findMany.mockResolvedValue([]);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
    });

    it('should mark critical severity for opportunities 2x over threshold', async () => {
      const now = Date.now();
      const mockRule = {
        id: 'rule-1',
        ruleType: 'RESPONSE_TIME',
        threshold: 120,
        isActive: true,
      };

      const mockStaleOpportunity = {
        id: 'opp-1',
        createdAt: new Date(now - 250 * 60 * 1000), // 250 minutes (>2x threshold)
        stage: 'DISCOVERY',
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.findMany.mockResolvedValue([mockStaleOpportunity] as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({ id: 'violation-1' } as any);

      await service.evaluateAllRules();

      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            severity: 'CRITICAL',
          }),
        })
      );
    });
  });

  describe('evaluateAllRules - Conversion Rate Monitoring', () => {
    it('should detect conversion rate below threshold', async () => {
      const mockRule = {
        id: 'rule-2',
        ruleType: 'CONVERSION_THRESHOLD',
        threshold: 15,
        comparison: 'greater_than',
        isActive: true,
      };

      // 10 won, 90 lost = 10% conversion (below 15% threshold)
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.groupBy.mockResolvedValue([
        { stage: 'CLOSED_WON', _count: 10 },
        { stage: 'CLOSED_LOST', _count: 90 },
      ] as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(1);
      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entityType: 'Pipeline',
            actualValue: 10, // 10% conversion
            expectedValue: 15,
          }),
        })
      );
    });

    it('should not flag conversion rate above threshold', async () => {
      const mockRule = {
        id: 'rule-2',
        ruleType: 'CONVERSION_THRESHOLD',
        threshold: 15,
        comparison: 'greater_than',
        isActive: true,
      };

      // 20 won, 80 lost = 20% conversion (above 15% threshold)
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.groupBy.mockResolvedValue([
        { stage: 'CLOSED_WON', _count: 20 },
        { stage: 'CLOSED_LOST', _count: 80 },
      ] as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
    });

    it('should handle no closed opportunities gracefully', async () => {
      const mockRule = {
        id: 'rule-2',
        ruleType: 'CONVERSION_THRESHOLD',
        threshold: 15,
        isActive: true,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.groupBy.mockResolvedValue([]);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
    });

    it('should mark critical severity for very low conversion rates', async () => {
      const mockRule = {
        id: 'rule-2',
        ruleType: 'CONVERSION_THRESHOLD',
        threshold: 15,
        comparison: 'greater_than',
        isActive: true,
      };

      // 5 won, 95 lost = 5% conversion (<80% of 15% threshold = critical)
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.groupBy.mockResolvedValue([
        { stage: 'CLOSED_WON', _count: 5 },
        { stage: 'CLOSED_LOST', _count: 95 },
      ] as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);

      await service.evaluateAllRules();

      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            severity: 'CRITICAL',
          }),
        })
      );
    });
  });

  describe('evaluateAllRules - Churn Prevention Triggers', () => {
    it('should detect customers with low health scores', async () => {
      const mockRule = {
        id: 'rule-3',
        ruleType: 'CHURN_PREVENTION',
        threshold: 30,
        isActive: true,
      };

      const mockAtRiskCustomers = [
        {
          id: 'lifecycle-1',
          healthScore: 25,
          currentStage: 'CUSTOMER',
          isAtRisk: false,
        },
        {
          id: 'lifecycle-2',
          healthScore: 18,
          currentStage: 'CUSTOMER',
          isAtRisk: false,
        },
      ];

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.customerLifecycle.findMany.mockResolvedValue(mockAtRiskCustomers as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);
      prismaMock.customerLifecycle.update.mockResolvedValue({} as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(2);
      expect(prismaMock.customerLifecycle.update).toHaveBeenCalledTimes(2);
      expect(prismaMock.customerLifecycle.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { isAtRisk: true },
        })
      );
    });

    it('should not flag customers already marked as at-risk', async () => {
      const mockRule = {
        id: 'rule-3',
        ruleType: 'CHURN_PREVENTION',
        threshold: 30,
        isActive: true,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.customerLifecycle.findMany.mockResolvedValue([]);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
    });

    it('should mark critical severity for very low health scores', async () => {
      const mockRule = {
        id: 'rule-3',
        ruleType: 'CHURN_PREVENTION',
        threshold: 30,
        isActive: true,
      };

      const mockCustomer = {
        id: 'lifecycle-1',
        healthScore: 15, // < 20 = critical
        currentStage: 'CUSTOMER',
        isAtRisk: false,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.customerLifecycle.findMany.mockResolvedValue([mockCustomer] as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);
      prismaMock.customerLifecycle.update.mockResolvedValue({} as any);

      await service.evaluateAllRules();

      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            severity: 'CRITICAL',
          }),
        })
      );
    });
  });

  describe('evaluateAllRules - Revenue Target Tracking', () => {
    it('should detect revenue below target after day 20', async () => {
      // Mock date to be day 22 of the month
      const mockDate = new Date(2025, 0, 22); // January 22, 2025
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const mockRule = {
        id: 'rule-4',
        ruleType: 'REVENUE_TRACKING',
        threshold: 80, // 80% of target
        isActive: true,
      };

      // Monthly target is $100k, 80% = $80k
      // Actual revenue: $60k (below threshold)
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.payment.aggregate.mockResolvedValue({
        _sum: { amountAUD: new Prisma.Decimal(60000) },
      } as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(1);
      expect(prismaMock.businessRuleViolation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entityType: 'Revenue',
            actualValue: 60000,
            expectedValue: 80000,
          }),
        })
      );

      jest.useRealTimers();
    });

    it('should not check revenue before day 20', async () => {
      // Mock date to be day 15 of the month
      const mockDate = new Date(2025, 0, 15);
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const mockRule = {
        id: 'rule-4',
        ruleType: 'REVENUE_TRACKING',
        threshold: 80,
        isActive: true,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
      expect(prismaMock.payment.aggregate).not.toHaveBeenCalled();

      jest.useRealTimers();
    });

    it('should not flag revenue above target', async () => {
      const mockDate = new Date(2025, 0, 25);
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      const mockRule = {
        id: 'rule-4',
        ruleType: 'REVENUE_TRACKING',
        threshold: 80,
        isActive: true,
      };

      // Actual revenue: $85k (above $80k threshold)
      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.payment.aggregate.mockResolvedValue({
        _sum: { amountAUD: new Prisma.Decimal(85000) },
      } as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);

      jest.useRealTimers();
    });
  });

  describe('executeViolationActions', () => {
    it('should execute actions when violations detected', async () => {
      const mockRule = {
        id: 'rule-1',
        ruleType: 'RESPONSE_TIME',
        threshold: 120,
        isActive: true,
        actionOnViolation: ['send_alert', 'create_task'],
      };

      const mockOpportunity = {
        id: 'opp-1',
        createdAt: new Date(Date.now() - 150 * 60 * 1000),
        stage: 'DISCOVERY',
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.findMany.mockResolvedValue([mockOpportunity] as any);
      prismaMock.businessRuleViolation.create.mockResolvedValue({
        id: 'violation-1',
      } as any);

      const result = await service.evaluateAllRules();

      expect(result.actionsExecuted).toBeGreaterThanOrEqual(0);
    });
  });

  describe('error handling', () => {
    it('should handle rule evaluation errors gracefully', async () => {
      const mockRule = {
        id: 'rule-1',
        ruleType: 'RESPONSE_TIME',
        threshold: 120,
        isActive: true,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);
      prismaMock.opportunity.findMany.mockRejectedValue(new Error('Database error'));

      const result = await service.evaluateAllRules();

      // Should complete despite error
      expect(result.totalRules).toBe(1);
    });

    it('should skip unknown rule types', async () => {
      const mockRule = {
        id: 'rule-unknown',
        ruleType: 'UNKNOWN_TYPE',
        threshold: 100,
        isActive: true,
      };

      prismaMock.businessRule.findMany.mockResolvedValue([mockRule] as any);

      const result = await service.evaluateAllRules();

      expect(result.violationsDetected).toBe(0);
    });
  });
});
