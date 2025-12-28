/**
 * Sales Pipeline API
 *
 * GET /api/crm/pipeline - List all opportunities with filtering
 *
 * @route GET /api/crm/pipeline
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient,  OpportunityStage } from '@prisma/client';
import { OpportunityService } from '@/lib/crm/opportunity.service';

const prisma = new PrismaClient();
const opportunityService = new OpportunityService(prisma);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get pipeline metrics
    const metrics = await opportunityService.getPipelineMetrics();

    // Get individual opportunities if requested
    const stage = searchParams.get('stage') as OpportunityStage | null;
    const state = searchParams.get('state');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (stage) where.stage = stage;
    if (state) where.serviceState = state;

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        include: {
          customerLifecycle: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  australianState: true,
                },
              },
            },
          },
          assignedContractor: {
            select: {
              businessName: true,
              averageRating: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.opportunity.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        metrics,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
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
