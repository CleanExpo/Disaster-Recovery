/**
 * Reports API
 *
 * Generate and manage analytics reports
 */

import { NextRequest, NextResponse } from 'next/server';
import { reportingService } from '@/lib/analytics/reporting-service';

/**
 * GET /api/analytics/reports
 *
 * Get reports or generate new ones
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reportType = searchParams.get('type'); // executive | user | room | performance | detailed
    const period = (searchParams.get('period') as 'day' | 'week' | 'month' | 'year') || 'week';
    const userId = searchParams.get('userId');
    const roomId = searchParams.get('roomId');

    if (reportType === 'executive') {
      const report = reportingService.generateExecutiveSummary(period);
      return NextResponse.json({
        success: true,
        report,
      });
    }

    if (reportType === 'user' && userId) {
      const report = reportingService.generateUserReport(userId);
      return NextResponse.json({
        success: true,
        report,
      });
    }

    if (reportType === 'room' && roomId) {
      const report = reportingService.generateRoomReport(roomId);
      return NextResponse.json({
        success: true,
        report,
      });
    }

    if (reportType === 'performance') {
      const report = reportingService.generatePerformanceReport();
      return NextResponse.json({
        success: true,
        report,
      });
    }

    if (reportType === 'detailed') {
      const report = reportingService.generateDetailedReport(period);
      return NextResponse.json({
        success: true,
        report,
      });
    }

    // Return all saved reports if no specific type
    const allReports = reportingService.getAllReports();
    return NextResponse.json({
      success: true,
      reports: allReports,
    });
  } catch (error) {
    console.error('Reports error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get reports',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/reports
 *
 * Create new report
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportType, period = 'week' } = body;

    if (!reportType) {
      return NextResponse.json(
        { error: 'Missing required field: reportType' },
        { status: 400 }
      );
    }

    let report;

    switch (reportType) {
      case 'executive':
        report = reportingService.generateExecutiveSummary(period);
        break;
      case 'detailed':
        report = reportingService.generateDetailedReport(period);
        break;
      case 'performance':
        report = reportingService.generatePerformanceReport();
        break;
      default:
        return NextResponse.json(
          { error: 'Unknown report type' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error('Create report error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create report',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/analytics/reports
 *
 * Delete a report
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reportId = searchParams.get('id');

    if (!reportId) {
      return NextResponse.json(
        { error: 'Missing required parameter: id' },
        { status: 400 }
      );
    }

    const deleted = reportingService.deleteReport(reportId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Report deleted',
    });
  } catch (error) {
    console.error('Delete report error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete report',
      },
      { status: 500 }
    );
  }
}
