/**
 * Opportunities API
 *
 * POST /api/crm/opportunities - Create opportunity
 * GET /api/crm/opportunities - List opportunities
 *
 * @route /api/crm/opportunities
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { OpportunityService } from '@/lib/crm/opportunity.service';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';

const prisma = new PrismaClient();
const opportunityService = new OpportunityService(prisma);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.serviceRequestId) {
      return NextResponse.json(
        {
          success: false,
          error: 'serviceRequestId is required',
        },
        { status: 400 }
      );
    }

    // Create opportunity from service request
    const opportunity = await opportunityService.createFromServiceRequest(
      body.serviceRequestId
    );

    AdvancedLogger.info('Opportunity created via API', {
      opportunityId: opportunity.id,
    });

    return NextResponse.json({
      success: true,
      data: opportunity,
    }, { status: 201 });
  } catch (error: any) {
    AdvancedLogger.error('Opportunity creation failed', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerLifecycleId = searchParams.get('customerLifecycleId');
    const stage = searchParams.get('stage');

    const where: any = {};
    if (customerLifecycleId) where.customerLifecycleId = customerLifecycleId;
    if (stage) where.stage = stage;

    const opportunities = await prisma.opportunity.findMany({
      where,
      include: {
        customerLifecycle: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        assignedContractor: {
          select: {
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: opportunities,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
