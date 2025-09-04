import { NextRequest, NextResponse } from 'next/server';
import { ResearchPlannerAgent } from '@/lib/agents/research-planner';
import type { ResearchTask } from '@/lib/agents/research-planner/types';

// Initialize the research planner agent
const researchPlanner = new ResearchPlannerAgent();

export async function POST(request: NextRequest) {
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

    return NextResponse.json({
      success: true,
      taskId: researchTask.id,
      result
    });
  } catch (error) {
    console.error('Research agent error:', error);
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
    console.error('Agent status error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get agent status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}