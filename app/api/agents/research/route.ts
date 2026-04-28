import { NextRequest, NextResponse } from 'next/server';
import { ResearchPlannerAgent } from '@/lib/agents/research-planner';
import type { ResearchTask } from '@/lib/agents/research-planner/types';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

// Initialize the research planner agent
const researchPlanner = new ResearchPlannerAgent();

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/agents/research' });
  try {
    const body = await request.json();
    const { task, type = 'analysis', priority = 'medium' } = body;

    if (!task) {
      return NextResponse.json(
        { error: 'Task description is required' },
        { status: 400 }
      );
    }

    // Create research task
    const researchTask: ResearchTask = {
      id: `task-${Date.now()}`,
      type: type as ResearchTask['type'],
      description: task,
      priority: priority as ResearchTask['priority'],
      context: body.context || {},
      requirements: body.requirements || [],
      constraints: body.constraints || [],
      timeout: body.timeout || 30000,
      parallel: body.parallel !== false
    };

    // Execute research
    const result = await researchPlanner.planResearch(researchTask);

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/agents/research',
        request_id: log.requestId,
        task_id: researchTask.id,
        task_type: researchTask.type,
      },
    });

    return NextResponse.json({
      success: true,
      taskId: researchTask.id,
      result
    });
  } catch (error) {
    log.error('research agent error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/agents/research' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        error: 'Failed to execute research task',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/agents/research' });
  try {
    // Get agent capabilities
    const capabilities = researchPlanner.getCapabilities();
    const status = researchPlanner.getAgentStatus();

    return NextResponse.json({
      success: true,
      capabilities,
      status: Array.from(status.entries()).map(([name, ready]) => ({
        agent: name,
        ready
      })),
      agents: [
        'shadcn-expert',
        'ui-designer',
        'browser-automation',
        'documentation',
        'code-analysis'
      ]
    });
  } catch (error) {
    log.error('agent status error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/agents/research' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      {
        error: 'Failed to get agent status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}