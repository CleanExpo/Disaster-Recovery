/**
 * Super-Orchestrator API Endpoint
 *
 * POST /api/super-orchestrator - Execute manual workflows
 * GET /api/super-orchestrator/daily-report - Get daily report
 * GET /api/super-orchestrator/weekly-report - Get weekly report
 * POST /api/super-orchestrator/self-improve - Run self-improvement analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  executeManualWorkflow,
  getDailyReport,
  getWeeklyReport,
  runSelfImprovement,
  type AgentEvent
} from '@/lib/agents';
import { logger } from '@/lib/logger';

/**
 * POST /api/super-orchestrator
 * Execute manual workflow
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowType, data } = body;

    if (!workflowType) {
      return NextResponse.json(
        { error: 'workflowType is required' },
        { status: 400 }
      );
    }

    const validTypes = ['mergance', 'phase23', 'feature', 'refactor'];
    if (!validTypes.includes(workflowType)) {
      return NextResponse.json(
        { error: `Invalid workflowType. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    logger.info('Super-Orchestrator API: Executing manual workflow', {
      workflowType,
      data
    });

    const result = await executeManualWorkflow(workflowType, data);

    return NextResponse.json({
      success: true,
      workflow: result
    }, { status: 200 });

  } catch (error) {
    logger.error('Super-Orchestrator API: Execution failed', { error });

    return NextResponse.json(
      {
        error: 'Workflow execution failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/super-orchestrator
 * Get API documentation
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    // Daily report
    if (action === 'daily-report') {
      const report = await getDailyReport();
      return NextResponse.json({ report }, { status: 200 });
    }

    // Weekly report
    if (action === 'weekly-report') {
      const report = await getWeeklyReport();
      return NextResponse.json({ report }, { status: 200 });
    }

    // Self-improvement report
    if (action === 'self-improve') {
      const report = await runSelfImprovement();
      return NextResponse.json({ report }, { status: 200 });
    }

    // API documentation
    return NextResponse.json({
      name: 'Super-Orchestrator API',
      version: '1.0.0',
      description: 'Meta-agent that coordinates all 24 agents for autonomous codebase operations',
      endpoints: {
        'POST /api/super-orchestrator': {
          description: 'Execute manual workflow',
          body: {
            workflowType: 'mergance | phase23 | feature | refactor',
            data: 'Workflow-specific data object'
          },
          example: {
            workflowType: 'mergance',
            data: {
              sourceRepo: 'DR-New',
              targetRepo: 'NRPG',
              factsToApply: 202,
              imagesToTransfer: 24
            }
          }
        },
        'GET /api/super-orchestrator?action=daily-report': {
          description: 'Get daily activity report',
          response: 'Daily metrics and completed workflows'
        },
        'GET /api/super-orchestrator?action=weekly-report': {
          description: 'Get weekly performance report',
          response: 'Weekly metrics, agent performance, improvements'
        },
        'GET /api/super-orchestrator?action=self-improve': {
          description: 'Run self-improvement analysis',
          response: 'Self-improvement report with pattern analysis and updates'
        }
      },
      workflows: {
        feature_development: 'Autonomous feature development from GitHub issue',
        bug_fix: 'Autonomous bug fixing from error alerts or issues',
        security_fix: 'Autonomous security vulnerability remediation',
        performance_investigation: 'Autonomous performance optimization',
        refactoring: 'Scheduled code quality improvements',
        deployment: 'Automated deployment workflows',
        mergance_integration: 'Merge DR-New + NRPG platforms (4-7 hours)',
        phase23_infrastructure: 'Deploy cloud infrastructure (8-12 weeks)'
      },
      agents: {
        total: 24,
        development_lifecycle: 7,
        mergance_integration: 4,
        phase23_infrastructure: 8,
        meta: 1
      },
      status: 'Class 3 Autonomous Codebase - Codebase Singularity Achieved'
    }, { status: 200 });

  } catch (error) {
    logger.error('Super-Orchestrator API: Request failed', { error });

    return NextResponse.json(
      {
        error: 'Request failed',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
