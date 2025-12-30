/**
 * Unit Tests: Opportunity Service
 *
 * Tests sales pipeline, opportunity conversion, and stage transitions
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module OpportunityServiceTests
 */

import { OpportunityService } from '@/lib/crm/opportunity.service';
import { CustomerLifecycleService } from '@/lib/crm/customer-lifecycle.service';
import { prismaMock } from '@tests/mocks/prisma';
import { OpportunityStage, Prisma } from '@prisma/client';

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

describe('OpportunityService', () => {
  let service: OpportunityService;
  let mockLifecycleService: jest.Mocked<CustomerLifecycleService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OpportunityService(prismaMock as any);
    mockLifecycleService = (service as any)
      .customerLifecycleService as jest.Mocked<CustomerLifecycleService>;
  });

  describe('createFromServiceRequest', () => {
    it('should create opportunity from service request', async () => {
      const mockServiceRequest = {
        id: 'sr-1',
        userId: 'user-1',
        serviceCategory: 'WATER_DAMAGE',
        urgency: 'URGENT',
        location: 'Brisbane, QLD 4000',
        budget: '$5000-$10000',
        user: { id: 'user-1', email: 'user@example.com' },
      };

      const mockLifecycle = {
        id: 'lifecycle-1',
        userId: 'user-1',
        currentStage: 'LEAD',
      };

      const mockOpportunity = {
        id: 'opp-1',
        customerLifecycleId: 'lifecycle-1',
        serviceRequestId: 'sr-1',
        name: 'WATER_DAMAGE - Brisbane, QLD 4000',
        stage: 'DISCOVERY',
        estimatedValueAUD: new Prisma.Decimal(5000),
        probabilityPercent: 30,
      };

      prismaMock.serviceRequest.findUnique.mockResolvedValue(mockServiceRequest as any);
      mockLifecycleService.getOrCreateLifecycle.mockResolvedValue(mockLifecycle as any);
      prismaMock.opportunity.create.mockResolvedValue(mockOpportunity as any);
      mockLifecycleService.updateStage.mockResolvedValue(mockLifecycle as any);

      const result = await service.createFromServiceRequest('sr-1');

      expect(result.stage).toBe('DISCOVERY');
      expect(result.probabilityPercent).toBe(30);
      expect(prismaMock.opportunity.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            customerLifecycleId: 'lifecycle-1',
            serviceRequestId: 'sr-1',
            stage: 'DISCOVERY',
            probabilityPercent: 30,
          }),
        })
      );
    });

    it('should update lifecycle stage to QUALIFIED_LEAD if still LEAD', async () => {
      const mockServiceRequest = {
        id: 'sr-1',
        userId: 'user-1',
        serviceCategory: 'FIRE_DAMAGE',
        urgency: 'STANDARD',
        location: 'Sydney, NSW 2000',
        budget: '$3000',
        user: { id: 'user-1' },
      };

      const mockLifecycle = {
        id: 'lifecycle-1',
        userId: 'user-1',
        currentStage: 'LEAD',
      };

      prismaMock.serviceRequest.findUnique.mockResolvedValue(mockServiceRequest as any);
      mockLifecycleService.getOrCreateLifecycle.mockResolvedValue(mockLifecycle as any);
      prismaMock.opportunity.create.mockResolvedValue({ id: 'opp-1' } as any);

      await service.createFromServiceRequest('sr-1');

      expect(mockLifecycleService.updateStage).toHaveBeenCalledWith(
        'lifecycle-1',
        'QUALIFIED_LEAD'
      );
    });

    it('should not update lifecycle stage if already QUALIFIED_LEAD or higher', async () => {
      const mockServiceRequest = {
        id: 'sr-1',
        userId: 'user-1',
        serviceCategory: 'MOLD_REMEDIATION',
        urgency: 'STANDARD',
        location: 'Melbourne, VIC 3000',
        budget: '$2000',
        user: { id: 'user-1' },
      };

      const mockLifecycle = {
        id: 'lifecycle-1',
        userId: 'user-1',
        currentStage: 'CUSTOMER',
      };

      prismaMock.serviceRequest.findUnique.mockResolvedValue(mockServiceRequest as any);
      mockLifecycleService.getOrCreateLifecycle.mockResolvedValue(mockLifecycle as any);
      prismaMock.opportunity.create.mockResolvedValue({ id: 'opp-1' } as any);

      await service.createFromServiceRequest('sr-1');

      expect(mockLifecycleService.updateStage).not.toHaveBeenCalled();
    });

    it('should throw error if service request not found', async () => {
      prismaMock.serviceRequest.findUnique.mockResolvedValue(null);

      await expect(service.createFromServiceRequest('nonexistent')).rejects.toThrow(
        'ServiceRequest not found: nonexistent'
      );
    });

    it('should parse budget and use as estimated value', async () => {
      const mockServiceRequest = {
        id: 'sr-1',
        userId: 'user-1',
        serviceCategory: 'WATER_DAMAGE',
        urgency: 'URGENT',
        location: 'Brisbane, QLD 4000',
        budget: '$15000',
        user: { id: 'user-1' },
      };

      prismaMock.serviceRequest.findUnique.mockResolvedValue(mockServiceRequest as any);
      mockLifecycleService.getOrCreateLifecycle.mockResolvedValue({
        id: 'lifecycle-1',
        currentStage: 'LEAD',
      } as any);
      prismaMock.opportunity.create.mockResolvedValue({ id: 'opp-1' } as any);

      await service.createFromServiceRequest('sr-1');

      expect(prismaMock.opportunity.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            estimatedValueAUD: expect.any(Prisma.Decimal),
          }),
        })
      );
    });
  });

  describe('updateStage', () => {
    it('should update stage and probability percentage', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'DISCOVERY' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1', currentStage: 'QUALIFIED_LEAD' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        stage: 'ASSESSMENT',
        probabilityPercent: 30,
      } as any);

      const result = await service.updateStage('opp-1', 'ASSESSMENT');

      expect(result.stage).toBe('ASSESSMENT');
      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'opp-1' },
          data: expect.objectContaining({
            stage: 'ASSESSMENT',
            probabilityPercent: 30,
          }),
        })
      );
    });

    it('should set correct probability for each stage', async () => {
      const stages: Array<[OpportunityStage, number, string?]> = [
        ['DISCOVERY', 10],
        ['ASSESSMENT', 30],
        ['PROPOSAL', 50],
        ['NEGOTIATION', 70],
        ['CLOSED_WON', 100],
        ['CLOSED_LOST', 0, 'Customer chose competitor'], // Reason required for CLOSED_LOST
      ];

      for (const [stage, expectedProb, reason] of stages) {
        prismaMock.opportunity.findUnique.mockResolvedValue({
          id: 'opp-1',
          stage: 'DISCOVERY',
          customerLifecycle: { id: 'lifecycle-1', currentStage: 'OPPORTUNITY' },
        } as any);

        prismaMock.opportunity.update.mockResolvedValue({
          id: 'opp-1',
          stage,
          probabilityPercent: expectedProb,
        } as any);

        const result = await service.updateStage('opp-1', stage, reason);

        expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              probabilityPercent: expectedProb,
            }),
          })
        );
      }
    });

    it('should set actualCloseDate for CLOSED_WON', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'NEGOTIATION' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1', currentStage: 'OPPORTUNITY' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        stage: 'CLOSED_WON',
        actualCloseDate: new Date(),
      } as any);
      mockLifecycleService.updateStage.mockResolvedValue({} as any);

      await service.updateStage('opp-1', 'CLOSED_WON');

      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            actualCloseDate: expect.any(Date),
          }),
        })
      );
    });

    it('should require close reason for CLOSED_LOST', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'PROPOSAL' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);

      await expect(service.updateStage('opp-1', 'CLOSED_LOST')).rejects.toThrow(
        'Close reason required for CLOSED_LOST'
      );
    });

    it('should accept close reason for CLOSED_LOST', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'PROPOSAL' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        stage: 'CLOSED_LOST',
        closeReason: 'Price too high',
      } as any);

      await service.updateStage('opp-1', 'CLOSED_LOST', 'Price too high');

      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            closeReason: 'Price too high',
            actualCloseDate: expect.any(Date),
          }),
        })
      );
    });

    it('should update customer lifecycle to CUSTOMER on CLOSED_WON', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'NEGOTIATION' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1', currentStage: 'OPPORTUNITY' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        stage: 'CLOSED_WON',
      } as any);

      await service.updateStage('opp-1', 'CLOSED_WON');

      expect(mockLifecycleService.updateStage).toHaveBeenCalledWith('lifecycle-1', 'CUSTOMER');
    });

    it('should not update lifecycle if already CUSTOMER', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'NEGOTIATION' as OpportunityStage,
        customerLifecycle: { id: 'lifecycle-1', currentStage: 'CUSTOMER' },
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        stage: 'CLOSED_WON',
      } as any);

      await service.updateStage('opp-1', 'CLOSED_WON');

      expect(mockLifecycleService.updateStage).not.toHaveBeenCalled();
    });

    it('should throw error if opportunity not found', async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(null);

      await expect(service.updateStage('nonexistent', 'ASSESSMENT')).rejects.toThrow(
        'Opportunity not found: nonexistent'
      );
    });
  });

  describe('convertToBooking', () => {
    it('should create booking and update opportunity to CLOSED_WON', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        customerLifecycleId: 'lifecycle-1',
        name: 'Water Damage - Brisbane',
        australianServiceType: 'WATER_DAMAGE',
        servicePostcode: '4000',
        serviceState: 'QLD',
        estimatedValueAUD: new Prisma.Decimal(5000),
        urgencyLevel: 'EMERGENCY',
        assignedContractorId: 'contractor-1',
        customerLifecycle: {
          userId: 'user-1',
          user: { streetAddress: '123 Main St' },
        },
        assignedContractor: { id: 'contractor-1' },
      };

      const mockBooking = {
        id: 'booking-1',
        clientId: 'user-1',
        contractorId: 'contractor-1',
        status: 'PENDING',
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);
      prismaMock.booking.create.mockResolvedValue(mockBooking as any);
      prismaMock.opportunity.update.mockResolvedValue({
        ...mockOpportunity,
        bookingId: 'booking-1',
        stage: 'CLOSED_WON',
      } as any);

      const result = await service.convertToBooking('opp-1');

      expect(result.id).toBe('booking-1');
      expect(prismaMock.booking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            clientId: 'user-1',
            contractorId: 'contractor-1',
            status: 'PENDING',
          }),
        })
      );
      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            bookingId: 'booking-1',
            stage: 'CLOSED_WON',
          }),
        })
      );
    });

    it('should throw error if contractor not assigned', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        assignedContractor: null,
        assignedContractorId: null,
      };

      prismaMock.opportunity.findUnique.mockResolvedValue(mockOpportunity as any);

      await expect(service.convertToBooking('opp-1')).rejects.toThrow(
        'Contractor must be assigned before converting to booking'
      );
    });

    it('should throw error if opportunity not found', async () => {
      prismaMock.opportunity.findUnique.mockResolvedValue(null);

      await expect(service.convertToBooking('nonexistent')).rejects.toThrow(
        'Opportunity not found: nonexistent'
      );
    });
  });

  describe('markAsLost', () => {
    it('should mark opportunity as lost with reason', async () => {
      const mockOpportunity = {
        id: 'opp-1',
        stage: 'CLOSED_LOST',
        closeReason: 'Chose competitor',
        competitorChosen: 'ABC Restoration',
        probabilityPercent: 0,
      };

      prismaMock.opportunity.update.mockResolvedValue(mockOpportunity as any);

      const result = await service.markAsLost('opp-1', 'Chose competitor', 'ABC Restoration');

      expect(result.stage).toBe('CLOSED_LOST');
      expect(result.closeReason).toBe('Chose competitor');
      expect(result.competitorChosen).toBe('ABC Restoration');
      expect(result.probabilityPercent).toBe(0);
      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'opp-1' },
          data: expect.objectContaining({
            stage: 'CLOSED_LOST',
            closeReason: 'Chose competitor',
            competitorChosen: 'ABC Restoration',
            probabilityPercent: 0,
            actualCloseDate: expect.any(Date),
          }),
        })
      );
    });

    it('should mark as lost without competitor if not applicable', async () => {
      prismaMock.opportunity.update.mockResolvedValue({
        id: 'opp-1',
        stage: 'CLOSED_LOST',
        closeReason: 'Budget constraints',
      } as any);

      const result = await service.markAsLost('opp-1', 'Budget constraints');

      expect(result.closeReason).toBe('Budget constraints');
      expect(prismaMock.opportunity.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.not.objectContaining({
            competitorChosen: expect.anything(),
          }),
        })
      );
    });
  });

  describe('getPipelineMetrics', () => {
    it('should calculate comprehensive pipeline metrics', async () => {
      prismaMock.opportunity.count.mockResolvedValue(25);

      prismaMock.opportunity.groupBy.mockResolvedValueOnce([
        { stage: 'DISCOVERY', _count: 5, _sum: { estimatedValueAUD: new Prisma.Decimal(10000) } },
        { stage: 'ASSESSMENT', _count: 8, _sum: { estimatedValueAUD: new Prisma.Decimal(20000) } },
        { stage: 'PROPOSAL', _count: 6, _sum: { estimatedValueAUD: new Prisma.Decimal(15000) } },
        { stage: 'NEGOTIATION', _count: 4, _sum: { estimatedValueAUD: new Prisma.Decimal(12000) } },
      ] as any);

      prismaMock.opportunity.aggregate.mockResolvedValueOnce({
        _sum: { estimatedValueAUD: new Prisma.Decimal(57000) },
      } as any);

      prismaMock.opportunity.findMany.mockResolvedValue([
        { estimatedValueAUD: new Prisma.Decimal(10000), probabilityPercent: 10 },
        { estimatedValueAUD: new Prisma.Decimal(20000), probabilityPercent: 30 },
        { estimatedValueAUD: new Prisma.Decimal(15000), probabilityPercent: 50 },
      ] as any);

      prismaMock.opportunity.aggregate.mockResolvedValueOnce({
        _avg: { estimatedValueAUD: new Prisma.Decimal(2500) },
      } as any);

      prismaMock.opportunity.groupBy.mockResolvedValueOnce([
        { stage: 'CLOSED_WON', _count: 15 },
        { stage: 'CLOSED_LOST', _count: 10 },
      ] as any);

      const result = await service.getPipelineMetrics();

      expect(result.totalOpportunities).toBe(25);
      expect(result.byStage).toBeDefined();
      expect(result.totalValue).toBeDefined();
      expect(result.weightedPipelineValue).toBeDefined();
      expect(result.conversionRate).toBe(60); // 15 won / (15 won + 10 lost) * 100
    });

    it('should handle empty pipeline gracefully', async () => {
      prismaMock.opportunity.count.mockResolvedValue(0);
      prismaMock.opportunity.groupBy.mockResolvedValue([]);
      prismaMock.opportunity.aggregate.mockResolvedValue({
        _sum: { estimatedValueAUD: null },
        _avg: { estimatedValueAUD: null },
      } as any);
      prismaMock.opportunity.findMany.mockResolvedValue([]);

      const result = await service.getPipelineMetrics();

      expect(result.totalOpportunities).toBe(0);
      expect(result.conversionRate).toBe(0);
    });

    it('should calculate weighted pipeline value correctly', async () => {
      prismaMock.opportunity.count.mockResolvedValue(3);
      prismaMock.opportunity.groupBy.mockResolvedValue([]);
      prismaMock.opportunity.aggregate.mockResolvedValue({
        _sum: { estimatedValueAUD: new Prisma.Decimal(30000) },
        _avg: { estimatedValueAUD: new Prisma.Decimal(10000) },
      } as any);

      prismaMock.opportunity.findMany.mockResolvedValue([
        { estimatedValueAUD: new Prisma.Decimal(10000), probabilityPercent: 50 }, // 5000 weighted
        { estimatedValueAUD: new Prisma.Decimal(20000), probabilityPercent: 70 }, // 14000 weighted
      ] as any);

      const result = await service.getPipelineMetrics();

      // 5000 + 14000 = 19000 weighted
      expect(result.weightedPipelineValue).toBe(19000);
    });
  });
});
