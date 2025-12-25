/**
 * Report Schedules API
 *
 * Create and manage scheduled reports
 */

import { NextRequest, NextResponse } from 'next/server';
import { reportScheduler } from '@/lib/reporting/report-scheduler';

/**
 * GET /api/reports/schedules
 *
 * Get report schedules
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dashboardId = searchParams.get('dashboardId');
    const type = searchParams.get('type') || 'all'; // all | active

    let schedules;

    if (dashboardId) {
      schedules = reportScheduler.getSchedulesByDashboard(dashboardId);
    } else if (type === 'active') {
      schedules = reportScheduler.getActiveSchedules();
    } else {
      schedules = [];
    }

    return NextResponse.json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error('Get schedules error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get schedules',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reports/schedules
 *
 * Create report schedule
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dashboardId, name, frequency, recipients, format, createdBy, config } = body;

    if (!dashboardId || !name || !recipients || !format) {
      return NextResponse.json(
        { error: 'Missing required fields: dashboardId, name, recipients, format' },
        { status: 400 }
      );
    }

    const schedule = reportScheduler.createSchedule(
      dashboardId,
      name,
      frequency || 'daily',
      recipients,
      format,
      createdBy || 'system'
    );

    if (config) {
      schedule.config = { ...schedule.config, ...config };
    }

    return NextResponse.json({
      success: true,
      schedule,
    });
  } catch (error) {
    console.error('Create schedule error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create schedule',
      },
      { status: 500 }
    );
  }
}
