/**
 * Dashboard Details API
 *
 * Get, update, and manage specific dashboards
 */

import { NextRequest, NextResponse } from 'next/server';
import { dashboardBuilder } from '@/lib/reporting/dashboard-builder';

/**
 * GET /api/dashboards/[dashboardId]
 *
 * Get dashboard details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { dashboardId: string } }
) {
  try {
    const { dashboardId } = params;

    const dashboard = dashboardBuilder.getDashboard(dashboardId);

    if (!dashboard) {
      return NextResponse.json(
        { error: 'Dashboard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error('Get dashboard error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get dashboard',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/dashboards/[dashboardId]
 *
 * Update dashboard
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { dashboardId: string } }
) {
  try {
    const { dashboardId } = params;
    const body = await request.json();
    const { name, description, theme, isPublic, sharedWith, tags } = body;

    const dashboard = dashboardBuilder.getDashboard(dashboardId);

    if (!dashboard) {
      return NextResponse.json(
        { error: 'Dashboard not found' },
        { status: 404 }
      );
    }

    if (name) dashboard.name = name;
    if (description !== undefined) dashboard.description = description;
    if (theme) dashboard.theme = theme;
    if (isPublic !== undefined) dashboard.isPublic = isPublic;
    if (sharedWith) dashboard.sharedWith = sharedWith;
    if (tags) dashboard.tags = tags;

    dashboard.metadata.updatedAt = new Date();

    return NextResponse.json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error('Update dashboard error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update dashboard',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/dashboards/[dashboardId]
 *
 * Delete dashboard
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { dashboardId: string } }
) {
  try {
    const { dashboardId } = params;

    const deleted = dashboardBuilder.deleteDashboard(dashboardId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Dashboard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Dashboard deleted',
    });
  } catch (error) {
    console.error('Delete dashboard error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete dashboard',
      },
      { status: 500 }
    );
  }
}
