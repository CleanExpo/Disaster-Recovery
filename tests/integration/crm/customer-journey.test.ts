/**
 * Integration Tests: CRM Customer Journey
 *
 * Tests complete flow from initial contact through lifecycle stages:
 * User → ServiceRequest → Opportunity → Booking → Customer
 *
 * Verifies:
 * - CustomerLifecycle stage transitions
 * - Activity logging at each step
 * - Metrics updating (lifetime value, job count)
 * - Health score calculations
 * - Opportunity progression
 *
 * @module CRMCustomerJourneyTests
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { CustomerLifecycleStage, OpportunityStage, Prisma } from '@prisma/client';
import { CustomerLifecycleService } from '@/lib/crm/customer-lifecycle.service';
import prisma from '@/lib/prisma';
import { prismaMock } from '../../setup';

const customerLifecycleService = new CustomerLifecycleService(prismaMock as any);

// Skip database integration tests if DB_INTEGRATION_TESTS environment variable is not set
// These tests require a properly configured PostgreSQL database
const describeIfDatabase = process.env.DB_INTEGRATION_TESTS === 'true' ? describe : describe.skip;

describeIfDatabase('CRM Customer Journey Integration', () => {
  const testUserId = `test-user-${Date.now()}`;
  const testEmail = `test-${Date.now()}@example.com`;

  beforeEach(async () => {
    // Mock user creation
    prismaMock.user.create.mockResolvedValue({
      id: testUserId,
      email: testEmail,
      name: 'Test Customer',
      australianState: 'VIC' as any,
      phone: '+61400000000',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'hashed',
      userType: 'CLIENT' as any,
      emailVerified: false,
      phoneVerified: false,
      isActive: true,
      lastLoginAt: null,
      timezone: 'Australia/Melbourne',
      preferences: null,
      metadata: null,
      tenantId: null,
    });
  });

  afterEach(async () => {
    // Reset mocks - handled by setup.ts
    jest.clearAllMocks();
  });

  it('should complete full customer journey from LEAD to CUSTOMER', async () => {
    // ========================================
    // STEP 1: Initial Contact - Create Lifecycle as LEAD
    // ========================================
    let lifecycle = await customerLifecycleService.getOrCreateLifecycle(testUserId);

    expect(lifecycle).toBeDefined();
    expect(lifecycle.currentStage).toBe('LEAD');
    expect(lifecycle.healthScore).toBe(50); // Default neutral score
    expect(lifecycle.totalInteractions).toBe(0);

    // Log initial contact activity
    const initialActivity = await prisma.activity.create({
      data: {
        userId: testUserId,
        activityType: 'CONTACT',
        title: 'Initial Contact - Website Inquiry',
        description: 'Customer submitted inquiry form for water damage assessment',
        activityDate: new Date(),
        priority: 'MEDIUM',
        status: 'COMPLETED',
      },
    });

    expect(initialActivity).toBeDefined();
    expect(initialActivity.activityType).toBe('CONTACT');

    // ========================================
    // STEP 2: Create Opportunity - Transition to PROSPECT
    // ========================================
    const opportunity = await prisma.opportunity.create({
      data: {
        userId: testUserId,
        title: 'Water Damage Restoration - Melbourne CBD',
        description: 'Burst pipe affecting 3 rooms, requires immediate assessment',
        stage: 'QUALIFICATION',
        estimatedValueAUD: new Prisma.Decimal(8500.00),
        probabilityPercent: 60,
        expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        source: 'WEBSITE',
        australianState: 'VIC',
      },
    });

    expect(opportunity).toBeDefined();
    expect(opportunity.stage).toBe('QUALIFICATION');

    // Update lifecycle to PROSPECT
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        currentStage: 'PROSPECT',
        totalInteractions: { increment: 1 },
        lastContactDate: new Date(),
        daysSinceLastContact: 0,
      },
    });

    expect(lifecycle.currentStage).toBe('PROSPECT');
    expect(lifecycle.totalInteractions).toBe(1);

    // Log opportunity creation activity
    await prisma.activity.create({
      data: {
        userId: testUserId,
        activityType: 'MEETING',
        title: 'Phone Assessment - Water Damage Inquiry',
        description: 'Qualified opportunity, scheduled on-site inspection',
        activityDate: new Date(),
        priority: 'HIGH',
        status: 'COMPLETED',
        opportunityId: opportunity.id,
      },
    });

    // ========================================
    // STEP 3: Advance Opportunity to PROPOSAL
    // ========================================
    const updatedOpportunity = await prisma.opportunity.update({
      where: { id: opportunity.id },
      data: {
        stage: 'PROPOSAL',
        probabilityPercent: 80,
      },
    });

    expect(updatedOpportunity.stage).toBe('PROPOSAL');

    // Log proposal sent activity
    await prisma.activity.create({
      data: {
        userId: testUserId,
        activityType: 'EMAIL',
        title: 'Proposal Sent - Water Damage Restoration',
        description: 'Sent detailed proposal with scope of work and pricing',
        activityDate: new Date(),
        priority: 'HIGH',
        status: 'COMPLETED',
        opportunityId: opportunity.id,
      },
    });

    // Update lifecycle metrics
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        totalInteractions: { increment: 1 },
        lastContactDate: new Date(),
      },
    });

    expect(lifecycle.totalInteractions).toBe(2);

    // ========================================
    // STEP 4: Win Opportunity - Create Booking
    // ========================================
    const wonOpportunity = await prisma.opportunity.update({
      where: { id: opportunity.id },
      data: {
        stage: 'CLOSED_WON',
        probabilityPercent: 100,
        actualValueAUD: new Prisma.Decimal(9200.00), // Slightly higher than estimate
        closedDate: new Date(),
      },
    });

    expect(wonOpportunity.stage).toBe('CLOSED_WON');
    expect(wonOpportunity.actualValueAUD).toBeDefined();

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: testUserId,
        opportunityId: opportunity.id,
        serviceDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        status: 'CONFIRMED',
        serviceType: 'WATER_DAMAGE_RESTORATION',
        estimatedDuration: 480, // 8 hours
        australianState: 'VIC',
        propertyAddress: '123 Collins St, Melbourne VIC 3000',
        emergencyService: true,
        specialRequirements: 'Access via loading dock, building manager contact required',
        estimatedCostAUD: new Prisma.Decimal(9200.00),
      },
    });

    expect(booking).toBeDefined();
    expect(booking.status).toBe('CONFIRMED');

    // Transition to CUSTOMER
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        currentStage: 'CUSTOMER',
        totalInteractions: { increment: 1 },
        lastContactDate: new Date(),
        totalJobsCompleted: { increment: 1 },
        lifetimeValueAUD: { increment: wonOpportunity.actualValueAUD || 0 },
        averageJobValueAUD: wonOpportunity.actualValueAUD,
      },
    });

    expect(lifecycle.currentStage).toBe('CUSTOMER');
    expect(lifecycle.totalJobsCompleted).toBe(1);
    expect(lifecycle.lifetimeValueAUD.toNumber()).toBe(9200.00);

    // Log booking confirmation activity
    await prisma.activity.create({
      data: {
        userId: testUserId,
        activityType: 'TASK',
        title: 'Booking Confirmed - Water Damage Restoration',
        description: 'Service scheduled for 2 days from now',
        activityDate: new Date(),
        priority: 'HIGH',
        status: 'COMPLETED',
        opportunityId: opportunity.id,
      },
    });

    // ========================================
    // STEP 5: Complete Service - Update Metrics
    // ========================================
    const completedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'COMPLETED',
        completedDate: new Date(),
        actualDuration: 510, // Slightly longer than estimated
        actualCostAUD: new Prisma.Decimal(9450.00), // Additional work discovered
      },
    });

    expect(completedBooking.status).toBe('COMPLETED');
    expect(completedBooking.actualCostAUD).toBeDefined();

    // Update lifecycle with completion
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        totalInteractions: { increment: 1 },
        lastContactDate: new Date(),
        lifetimeValueAUD: { increment: 250.00 }, // Additional $250 for extra work
      },
    });

    expect(lifecycle.lifetimeValueAUD.toNumber()).toBe(9450.00);

    // ========================================
    // STEP 6: Verify Complete Journey
    // ========================================
    const finalLifecycle = await prisma.customerLifecycle.findUnique({
      where: { userId: testUserId },
      include: {
        opportunities: true,
        activities: {
          orderBy: { activityDate: 'desc' },
        },
      },
    });

    // Verify lifecycle progression
    expect(finalLifecycle).toBeDefined();
    expect(finalLifecycle!.currentStage).toBe('CUSTOMER');
    expect(finalLifecycle!.totalInteractions).toBeGreaterThanOrEqual(4);
    expect(finalLifecycle!.totalJobsCompleted).toBe(1);
    expect(finalLifecycle!.lifetimeValueAUD.toNumber()).toBe(9450.00);

    // Verify opportunity exists
    expect(finalLifecycle!.opportunities.length).toBe(1);
    expect(finalLifecycle!.opportunities[0].stage).toBe('CLOSED_WON');

    // Verify activities logged
    expect(finalLifecycle!.activities.length).toBeGreaterThanOrEqual(4);
    expect(finalLifecycle!.activities.some(a => a.activityType === 'CONTACT')).toBe(true);
    expect(finalLifecycle!.activities.some(a => a.activityType === 'MEETING')).toBe(true);
    expect(finalLifecycle!.activities.some(a => a.activityType === 'EMAIL')).toBe(true);
  });

  it('should handle stage transitions with health score updates', async () => {
    // Create lifecycle
    let lifecycle = await customerLifecycleService.getOrCreateLifecycle(testUserId);
    expect(lifecycle.healthScore).toBe(50);

    // Create high-value opportunity (should improve health score)
    await prisma.opportunity.create({
      data: {
        userId: testUserId,
        title: 'Large Commercial Restoration',
        description: 'Major fire damage restoration project',
        stage: 'PROPOSAL',
        estimatedValueAUD: new Prisma.Decimal(150000.00),
        probabilityPercent: 75,
        expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        source: 'REFERRAL',
        australianState: 'VIC',
      },
    });

    // Update lifecycle with recent activity
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        currentStage: 'PROSPECT',
        totalInteractions: { increment: 3 },
        lastContactDate: new Date(),
        daysSinceLastContact: 0,
      },
    });

    expect(lifecycle.currentStage).toBe('PROSPECT');
    expect(lifecycle.totalInteractions).toBe(3);

    // Verify health score can be recalculated
    // Note: In production, this would trigger automatic health score calculation
    expect(lifecycle.healthScore).toBeDefined();
  });

  it('should track multiple opportunities for a single customer', async () => {
    // Create lifecycle
    const lifecycle = await customerLifecycleService.getOrCreateLifecycle(testUserId);

    // Create multiple opportunities
    const opp1 = await prisma.opportunity.create({
      data: {
        userId: testUserId,
        title: 'Water Damage - Office Building',
        stage: 'CLOSED_WON',
        estimatedValueAUD: new Prisma.Decimal(5000.00),
        actualValueAUD: new Prisma.Decimal(5200.00),
        probabilityPercent: 100,
        expectedCloseDate: new Date(),
        closedDate: new Date(),
        source: 'WEBSITE',
        australianState: 'VIC',
      },
    });

    const opp2 = await prisma.opportunity.create({
      data: {
        userId: testUserId,
        title: 'Mold Remediation - Residential',
        stage: 'PROPOSAL',
        estimatedValueAUD: new Prisma.Decimal(3000.00),
        probabilityPercent: 60,
        expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        source: 'REFERRAL',
        australianState: 'VIC',
      },
    });

    const opp3 = await prisma.opportunity.create({
      data: {
        userId: testUserId,
        title: 'Fire Damage - Warehouse',
        stage: 'QUALIFICATION',
        estimatedValueAUD: new Prisma.Decimal(85000.00),
        probabilityPercent: 40,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        source: 'DIRECT_OUTREACH',
        australianState: 'VIC',
      },
    });

    // Verify all opportunities created
    const allOpportunities = await prisma.opportunity.findMany({
      where: { userId: testUserId },
      orderBy: { createdAt: 'desc' },
    });

    expect(allOpportunities.length).toBe(3);
    expect(allOpportunities.some(o => o.stage === 'CLOSED_WON')).toBe(true);
    expect(allOpportunities.some(o => o.stage === 'PROPOSAL')).toBe(true);
    expect(allOpportunities.some(o => o.stage === 'QUALIFICATION')).toBe(true);

    // Update lifecycle with completed job
    await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        currentStage: 'CUSTOMER',
        totalJobsCompleted: 1,
        lifetimeValueAUD: new Prisma.Decimal(5200.00),
        averageJobValueAUD: new Prisma.Decimal(5200.00),
      },
    });

    const updatedLifecycle = await prisma.customerLifecycle.findUnique({
      where: { userId: testUserId },
      include: { opportunities: true },
    });

    expect(updatedLifecycle!.opportunities.length).toBe(3);
    expect(updatedLifecycle!.totalJobsCompleted).toBe(1);
  });

  it('should maintain activity timeline throughout journey', async () => {
    // Create lifecycle
    await customerLifecycleService.getOrCreateLifecycle(testUserId);

    // Create timeline of activities
    const activities = [
      {
        activityType: 'CONTACT' as const,
        title: 'Initial Contact',
        description: 'Customer called emergency hotline',
        activityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        priority: 'HIGH' as const,
        status: 'COMPLETED' as const,
      },
      {
        activityType: 'MEETING' as const,
        title: 'On-site Assessment',
        description: 'Conducted property inspection',
        activityDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        priority: 'HIGH' as const,
        status: 'COMPLETED' as const,
      },
      {
        activityType: 'EMAIL' as const,
        title: 'Proposal Sent',
        description: 'Emailed detailed proposal and scope of work',
        activityDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        priority: 'MEDIUM' as const,
        status: 'COMPLETED' as const,
      },
      {
        activityType: 'CALL' as const,
        title: 'Follow-up Call',
        description: 'Discussed proposal questions',
        activityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        priority: 'MEDIUM' as const,
        status: 'COMPLETED' as const,
      },
      {
        activityType: 'TASK' as const,
        title: 'Contract Signed',
        description: 'Customer signed service agreement',
        activityDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        priority: 'HIGH' as const,
        status: 'COMPLETED' as const,
      },
    ];

    // Create all activities
    for (const activity of activities) {
      await prisma.activity.create({
        data: {
          ...activity,
          userId: testUserId,
        },
      });
    }

    // Retrieve activity timeline
    const timeline = await prisma.activity.findMany({
      where: { userId: testUserId },
      orderBy: { activityDate: 'asc' },
    });

    expect(timeline.length).toBe(5);
    expect(timeline[0].title).toBe('Initial Contact');
    expect(timeline[4].title).toBe('Contract Signed');

    // Verify activity types
    const activityTypes = timeline.map(a => a.activityType);
    expect(activityTypes).toContain('CONTACT');
    expect(activityTypes).toContain('MEETING');
    expect(activityTypes).toContain('EMAIL');
    expect(activityTypes).toContain('CALL');
    expect(activityTypes).toContain('TASK');
  });

  it('should calculate metrics correctly after multiple jobs', async () => {
    // Create lifecycle
    let lifecycle = await customerLifecycleService.getOrCreateLifecycle(testUserId);

    // Complete 3 jobs
    const jobValues = [
      new Prisma.Decimal(5000.00),
      new Prisma.Decimal(8000.00),
      new Prisma.Decimal(12000.00),
    ];

    let totalValue = new Prisma.Decimal(0);
    for (const value of jobValues) {
      totalValue = totalValue.add(value);

      lifecycle = await prisma.customerLifecycle.update({
        where: { userId: testUserId },
        data: {
          totalJobsCompleted: { increment: 1 },
          lifetimeValueAUD: { increment: value },
        },
      });
    }

    // Calculate average
    const averageValue = totalValue.div(jobValues.length);
    lifecycle = await prisma.customerLifecycle.update({
      where: { userId: testUserId },
      data: {
        averageJobValueAUD: averageValue,
      },
    });

    // Verify metrics
    expect(lifecycle.totalJobsCompleted).toBe(3);
    expect(lifecycle.lifetimeValueAUD.toNumber()).toBe(25000.00);
    expect(lifecycle.averageJobValueAUD.toNumber()).toBeCloseTo(8333.33, 2);
  });
});
