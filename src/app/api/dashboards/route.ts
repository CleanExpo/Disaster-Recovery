/**
 * Dashboards API
 *
 * Create and manage custom dashboards
 */

import { NextRequest, NextResponse } from 'next/server';
import { dashboardBuilder } from '@/lib/reporting/dashboard-builder';

/**
 * GET /api/dashboards
 *
 * Get dashboards
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'owned'; // owned | shared | public

    if (!userId && type !== 'public') {
      return NextResponse.json(
        { error: 'Missing required parameter: userId' },
        { status: 400 }
      );
    }

    let dashboards;

    switch (type) {
      case 'owned':
        dashboards = dashboardBuilder.getDashboardsByOwner(userId || '');
        break;

      case 'shared':
        dashboards = dashboardBuilder.getSharedDashboards(userId || '');
        break;

      case 'public':
        dashboards = dashboardBuilder.getPublicDashboards();
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      dashboards,
    });
  } catch (error) {
    console.error('Get dashboards error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get dashboards',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/dashboards
 *
 * Create dashboard
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, owner, layout } = body;

    if (!name || !owner) {
      return NextResponse.json(
        { error: 'Missing required fields: name, owner' },
        { status: 400 }
      );
    }

    const dashboard = dashboardBuilder.createDashboard(name, description || '', owner, layout || 'grid');

    return NextResponse.json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error('Create dashboard error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create dashboard',
      },
      { status: 500 }
    );
  }
}
