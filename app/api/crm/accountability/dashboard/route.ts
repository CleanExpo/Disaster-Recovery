/**
 * Accountability Dashboard API
 *
 * GET /api/crm/accountability/dashboard - Get complete dashboard data
 *
 * @route /api/crm/accountability/dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { BusinessRulesMonitorService } from '@/lib/crm/business-rules-monitor.service';

const prisma = new PrismaClient();
const monitorService = new BusinessRulesMonitorService(prisma);

export async function GET(request: NextRequest) {
  try {
    const dashboardData = await monitorService.getDashboardData();

    return NextResponse.json({
      success: true,
      data: dashboardData,
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

/**
 * POST /api/crm/accountability/dashboard - Trigger manual rule evaluation
 */
export async function POST(request: NextRequest) {
  try {
    const results = await monitorService.runMonitoring();

    return NextResponse.json({
      success: true,
      data: results,
      message: 'Business rules evaluation completed',
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
