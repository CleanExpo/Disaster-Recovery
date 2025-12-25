import { NextRequest, NextResponse } from 'next/server';

/**
 * Report Execution History API
 *
 * GET /api/reports/executions - Get execution history
 */

interface ReportExecution {
  id: string;
  scheduleId: string;
  dashboardId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
  fileSize?: number;
  recipients: string[];
  format: string;
  deliveryStatus?: Record<string, 'sent' | 'failed'>;
}

// In-memory execution history (would be database in production)
const executionHistory: Map<string, ReportExecution> = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dashboardId = searchParams.get('dashboardId');
    const scheduleId = searchParams.get('scheduleId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Filter executions
    let executions = Array.from(executionHistory.values());

    if (dashboardId) {
      executions = executions.filter((e) => e.dashboardId === dashboardId);
    }

    if (scheduleId) {
      executions = executions.filter((e) => e.scheduleId === scheduleId);
    }

    if (status) {
      executions = executions.filter((e) => e.status === status);
    }

    // Sort by started time (newest first)
    executions.sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );

    // Paginate
    const total = executions.length;
    const paginatedExecutions = executions.slice(offset, offset + limit);

    return NextResponse.json(
      {
        executions: paginatedExecutions,
        total,
        limit,
        offset,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching executions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch execution history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      scheduleId,
      dashboardId,
      recipients,
      format,
    } = body;

    if (!scheduleId || !dashboardId || !recipients || !format) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const execution: ReportExecution = {
      id: executionId,
      scheduleId,
      dashboardId,
      status: 'pending',
      startedAt: new Date().toISOString(),
      recipients: Array.isArray(recipients) ? recipients : [recipients],
      format,
      deliveryStatus: {},
    };

    // Initialize delivery status for each recipient
    execution.recipients.forEach((recipient) => {
      execution.deliveryStatus![recipient] = 'sent';
    });

    executionHistory.set(executionId, execution);

    // Simulate execution completion after a delay
    setTimeout(() => {
      const exec = executionHistory.get(executionId);
      if (exec) {
        exec.status = 'completed';
        exec.completedAt = new Date().toISOString();
        exec.fileSize = Math.floor(Math.random() * 5000000) + 100000; // 100KB - 5MB
        executionHistory.set(executionId, exec);
      }
    }, 2000);

    return NextResponse.json(
      {
        execution,
        message: 'Report execution queued',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating execution:', error);
    return NextResponse.json(
      { error: 'Failed to create execution' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { executionId, status, errorMessage, fileSize, deliveryStatus } = body;

    if (!executionId) {
      return NextResponse.json(
        { error: 'Execution ID is required' },
        { status: 400 }
      );
    }

    const execution = executionHistory.get(executionId);
    if (!execution) {
      return NextResponse.json(
        { error: 'Execution not found' },
        { status: 404 }
      );
    }

    if (status) execution.status = status;
    if (errorMessage) execution.errorMessage = errorMessage;
    if (fileSize) execution.fileSize = fileSize;
    if (deliveryStatus) execution.deliveryStatus = deliveryStatus;

    if (!execution.completedAt && (status === 'completed' || status === 'failed')) {
      execution.completedAt = new Date().toISOString();
    }

    executionHistory.set(executionId, execution);

    return NextResponse.json(
      {
        execution,
        message: 'Execution updated',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating execution:', error);
    return NextResponse.json(
      { error: 'Failed to update execution' },
      { status: 500 }
    );
  }
}
