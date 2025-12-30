/**
 * Opportunity Service
 *
 * Manages sales pipeline, opportunity conversion, and stage transitions
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @module OpportunityService
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import {
  PrismaClient,
  OpportunityStage,
  AustralianServiceType,
  EmergencyResponseLevel,
  AustralianState,
  Prisma,
} from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';
import { CustomerLifecycleService } from './customer-lifecycle.service';

export class OpportunityService {
  private customerLifecycleService: CustomerLifecycleService;

  constructor(private prisma: PrismaClient) {
    this.customerLifecycleService = new CustomerLifecycleService(prisma);
  }

  /**
   * Create opportunity from existing ServiceRequest
   * Auto-links to customer lifecycle
   *
   * @param serviceRequestId - ServiceRequest ID
   * @returns Created Opportunity
   */
  async createFromServiceRequest(serviceRequestId: string) {
    const serviceRequest = await this.prisma.serviceRequest.findUnique({
      where: { id: serviceRequestId },
      include: {
        user: true,
      },
    });

    if (!serviceRequest) {
      throw new Error(`ServiceRequest not found: ${serviceRequestId}`);
    }

    // Get or create customer lifecycle
    const lifecycle = await this.customerLifecycleService.getOrCreateLifecycle(
      serviceRequest.userId
    );

    // Parse service details
    const serviceType = this.mapServiceCategoryToType(
      serviceRequest.serviceCategory
    );
    const urgencyLevel = this.mapUrgencyToLevel(serviceRequest.urgency);
    const state = this.extractState(serviceRequest.location);
    const postcode = this.extractPostcode(serviceRequest.location);

    // Estimate value from budget or use default
    const estimatedValue = this.parseBudget(serviceRequest.budget) || 5000;

    const opportunity = await this.prisma.opportunity.create({
      data: {
        customerLifecycleId: lifecycle.id,
        serviceRequestId,
        name: `${serviceRequest.serviceCategory} - ${serviceRequest.location}`,
        stage: 'DISCOVERY',
        estimatedValueAUD: new Prisma.Decimal(estimatedValue),
        probabilityPercent: 30, // Initial probability
        australianServiceType: serviceType,
        urgencyLevel,
        serviceState: state,
        servicePostcode: postcode,
        expectedCloseDate: this.calculateExpectedCloseDate(urgencyLevel),
      },
    });

    AdvancedLogger.info('Opportunity created from ServiceRequest', {
      opportunityId: opportunity.id,
      serviceRequestId,
      stage: opportunity.stage,
    });

    // Update lifecycle stage to QUALIFIED_LEAD if still LEAD
    if (lifecycle.currentStage === 'LEAD') {
      await this.customerLifecycleService.updateStage(
        lifecycle.id,
        'QUALIFIED_LEAD'
      );
    }

    return opportunity;
  }

  /**
   * Update opportunity stage with business logic
   *
   * Stage transitions update:
   * - Probability percentage
   * - Expected close date
   * - Customer lifecycle stage
   *
   * @param opportunityId - Opportunity ID
   * @param newStage - Target stage
   * @param reason - Reason for transition (required for CLOSED_LOST)
   * @returns Updated opportunity
   */
  async updateStage(
    opportunityId: string,
    newStage: OpportunityStage,
    reason?: string
  ) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: {
        customerLifecycle: true,
      },
    });

    if (!opportunity) {
      throw new Error(`Opportunity not found: ${opportunityId}`);
    }

    // Update probability based on stage
    const stageProbabilities: Record<OpportunityStage, number> = {
      DISCOVERY: 10,
      ASSESSMENT: 30,
      PROPOSAL: 50,
      NEGOTIATION: 70,
      CLOSED_WON: 100,
      CLOSED_LOST: 0,
    };

    const updateData: any = {
      stage: newStage,
      probabilityPercent: stageProbabilities[newStage],
    };

    // Handle closed stages
    if (newStage === 'CLOSED_WON' || newStage === 'CLOSED_LOST') {
      updateData.actualCloseDate = new Date();

      if (newStage === 'CLOSED_LOST') {
        if (!reason) {
          throw new Error('Close reason required for CLOSED_LOST');
        }
        updateData.closeReason = reason;
      }
    }

    const updated = await this.prisma.opportunity.update({
      where: { id: opportunityId },
      data: updateData,
    });

    AdvancedLogger.info('Opportunity stage updated', {
      opportunityId,
      from: opportunity.stage,
      to: newStage,
      probability: stageProbabilities[newStage],
    });

    // Update customer lifecycle stage
    if (newStage === 'CLOSED_WON') {
      const lifecycle = opportunity.customerLifecycle;
      if (lifecycle.currentStage !== 'CUSTOMER') {
        await this.customerLifecycleService.updateStage(lifecycle.id, 'CUSTOMER');
      }
    }

    return updated;
  }

  /**
   * Convert opportunity to booking
   * Creates Booking record and updates opportunity to CLOSED_WON
   *
   * @param opportunityId - Opportunity ID
   * @returns Created Booking
   */
  async convertToBooking(opportunityId: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: {
        customerLifecycle: {
          include: {
            user: true,
          },
        },
        assignedContractor: true,
      },
    });

    if (!opportunity) {
      throw new Error(`Opportunity not found: ${opportunityId}`);
    }

    if (!opportunity.assignedContractor) {
      throw new Error('Contractor must be assigned before converting to booking');
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        clientId: opportunity.customerLifecycle.userId,
        contractorId: opportunity.assignedContractorId,
        australianServiceType: opportunity.australianServiceType,
        description: opportunity.name,
        servicePostcode: opportunity.servicePostcode,
        serviceState: opportunity.serviceState,
        serviceSuburb: '', // TODO: Extract from address
        streetAddress: opportunity.customerLifecycle.user.streetAddress || '',
        status: 'PENDING',
        emergencyResponseLevel: opportunity.urgencyLevel,
        estimatedCostAUD: opportunity.estimatedValueAUD,
      },
    });

    // Update opportunity
    await this.prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        bookingId: booking.id,
        stage: 'CLOSED_WON',
        actualCloseDate: new Date(),
      },
    });

    AdvancedLogger.info('Opportunity converted to booking', {
      opportunityId,
      bookingId: booking.id,
    });

    return booking;
  }

  /**
   * Mark opportunity as lost with reason
   * @param opportunityId - Opportunity ID
   * @param closeReason - Why opportunity was lost
   * @param competitorChosen - Competitor name if applicable
   */
  async markAsLost(
    opportunityId: string,
    closeReason: string,
    competitorChosen?: string
  ) {
    const updated = await this.prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        stage: 'CLOSED_LOST',
        actualCloseDate: new Date(),
        closeReason,
        competitorChosen,
        probabilityPercent: 0,
      },
    });

    AdvancedLogger.warn('Opportunity lost', {
      opportunityId,
      closeReason,
      competitorChosen,
    });

    return updated;
  }

  /**
   * Get pipeline metrics for dashboard
   */
  async getPipelineMetrics() {
    const [
      totalOpportunities,
      byStage,
      totalValue,
      weightedValue,
      avgDealSize,
      conversionStats,
    ] = await Promise.all([
      // Total count
      this.prisma.opportunity.count(),

      // Count by stage
      this.prisma.opportunity.groupBy({
        by: ['stage'],
        _count: true,
        _sum: { estimatedValueAUD: true },
      }),

      // Total value
      this.prisma.opportunity.aggregate({
        _sum: { estimatedValueAUD: true },
        where: {
          stage: { notIn: ['CLOSED_LOST'] },
        },
      }),

      // Weighted value (probability * value)
      this.prisma.opportunity.findMany({
        select: {
          estimatedValueAUD: true,
          probabilityPercent: true,
        },
        where: {
          stage: { notIn: ['CLOSED_LOST'] },
        },
      }),

      // Average deal size
      this.prisma.opportunity.aggregate({
        _avg: { estimatedValueAUD: true },
      }),

      // Conversion stats
      this.prisma.opportunity.groupBy({
        by: ['stage'],
        _count: true,
        where: {
          stage: { in: ['CLOSED_WON', 'CLOSED_LOST'] },
        },
      }),
    ]);

    // Calculate weighted pipeline value
    const weighted = weightedValue.reduce((sum, opp) => {
      const value = Number(opp.estimatedValueAUD);
      const probability = opp.probabilityPercent / 100;
      return sum + value * probability;
    }, 0);

    // Calculate conversion rate
    const wonCount =
      conversionStats.find((s) => s.stage === 'CLOSED_WON')?._count || 0;
    const lostCount =
      conversionStats.find((s) => s.stage === 'CLOSED_LOST')?._count || 0;
    const conversionRate =
      wonCount + lostCount > 0 ? (wonCount / (wonCount + lostCount)) * 100 : 0;

    return {
      totalOpportunities,
      byStage: Object.fromEntries(
        byStage.map((s) => [
          s.stage,
          {
            count: s._count,
            value: Number(s._sum.estimatedValueAUD || 0),
          },
        ])
      ),
      totalValue: Number(totalValue._sum.estimatedValueAUD || 0),
      weightedValue: weighted,
      weightedPipelineValue: weighted, // Alias for compatibility with tests
      averageDealSize: Number(avgDealSize._avg.estimatedValueAUD || 0),
      conversionRate,
      wonDeals: wonCount,
      lostDeals: lostCount,
    };
  }

  // Helper methods
  private mapServiceCategoryToType(
    category: string
  ): AustralianServiceType {
    const mapping: Record<string, AustralianServiceType> = {
      'water damage': 'WATER_DAMAGE',
      'fire damage': 'FIRE_DAMAGE',
      'mould remediation': 'MOULD_REMEDIATION',
      'smoke damage': 'SMOKE_DAMAGE',
      carpet: 'CARPET_CLEANING',
      commercial: 'COMMERCIAL_WATER_DAMAGE',
    };

    const categoryLower = category.toLowerCase();
    for (const [key, value] of Object.entries(mapping)) {
      if (categoryLower.includes(key)) {
        return value;
      }
    }

    return 'GENERAL_RESTORATION';
  }

  private mapUrgencyToLevel(urgency: string): EmergencyResponseLevel {
    const urgencyLower = urgency.toLowerCase();

    if (urgencyLower.includes('urgent') || urgencyLower.includes('emergency')) {
      return 'URGENT';
    } else if (urgencyLower.includes('high') || urgencyLower.includes('today')) {
      return 'HIGH';
    } else if (urgencyLower.includes('scheduled') || urgencyLower.includes('appointment')) {
      return 'SCHEDULED';
    }

    return 'STANDARD';
  }

  private extractState(location: string): AustralianState {
    const states: AustralianState[] = [
      'NSW',
      'VIC',
      'QLD',
      'WA',
      'SA',
      'TAS',
      'ACT',
      'NT',
    ];

    for (const state of states) {
      if (location.toUpperCase().includes(state)) {
        return state;
      }
    }

    return 'NSW'; // Default
  }

  private extractPostcode(location: string): string {
    const postcodeMatch = location.match(/\b\d{4}\b/);
    return postcodeMatch ? postcodeMatch[0] : '2000';
  }

  private parseBudget(budget: string | null | undefined): number | null {
    if (!budget) return null;

    // Remove $ and commas, extract number
    const cleaned = budget.replace(/[$,]/g, '');
    const num = parseFloat(cleaned);

    return isNaN(num) ? null : num;
  }

  private calculateExpectedCloseDate(urgency: EmergencyResponseLevel): Date {
    const now = new Date();
    const daysToAdd = {
      URGENT: 3,
      HIGH: 7,
      STANDARD: 14,
      SCHEDULED: 30,
    }[urgency];

    now.setDate(now.getDate() + daysToAdd);
    return now;
  }
}

export const opportunityService = new OpportunityService(new PrismaClient());
