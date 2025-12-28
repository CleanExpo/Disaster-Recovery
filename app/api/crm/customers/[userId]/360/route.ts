/**
 * Customer 360° View API
 *
 * Returns complete customer profile - single source of truth
 * Includes: lifecycle, opportunities, activities, tasks, bookings, claims, metrics
 *
 * Part of CRM Foundation - Project Vend Phase 2 Integration
 *
 * @route GET /api/crm/customers/[userId]/360
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CustomerLifecycleService } from '@/lib/crm/customer-lifecycle.service';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';

const prisma = new PrismaClient();
const customerLifecycleService = new CustomerLifecycleService(prisma);

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const correlationId = AdvancedLogger.setCorrelationId();

  try {
    const { userId } = params;

    AdvancedLogger.info('Fetching customer 360° view', { userId });

    // Get complete customer 360° view
    const customer360 = await customerLifecycleService.getCustomer360(userId);

    AdvancedLogger.info('Customer 360° view retrieved', {
      userId,
      opportunityCount: customer360.opportunities.length,
      activityCount: customer360.activities.length,
      taskCount: customer360.tasks.length,
      healthScore: customer360.metrics.healthScore,
    }, Date.now() - parseInt(correlationId.split('-')[0] || '0'));

    return NextResponse.json({
      success: true,
      data: customer360,
    });
  } catch (error: any) {
    AdvancedLogger.error('Failed to fetch customer 360°', error, {
      userId: params.userId,
    });

    if (error.message.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Customer not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Update customer lifecycle manually
 * POST /api/crm/customers/[userId]/360
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (action === 'recalculate_scores') {
      const lifecycle = await customerLifecycleService.getOrCreateLifecycle(
        params.userId
      );

      await customerLifecycleService.calculateHealthScore(lifecycle.id);
      await customerLifecycleService.calculateChurnRisk(lifecycle.id);

      return NextResponse.json({
        success: true,
        message: 'Scores recalculated',
      });
    }

    if (action === 'update_stage') {
      const lifecycle = await customerLifecycleService.getOrCreateLifecycle(
        params.userId
      );

      const updated = await customerLifecycleService.updateStage(
        lifecycle.id,
        data.newStage
      );

      return NextResponse.json({
        success: true,
        data: updated,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      },
      { status: 400 }
    );
  } catch (error: any) {
    AdvancedLogger.error('Customer 360° update failed', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
