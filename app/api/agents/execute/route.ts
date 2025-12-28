/**
 * Agent Workflow Execution API
 *
 * POST /api/agents/execute
 *
 * Triggers the 4-agent inspection workflow orchestration:
 * 1. Data Intake Agent
 * 2. Report Generation Agent
 * 3. Quality Assurance Agent
 * 4. Operations Agent
 *
 * Request Body:
 * {
 *   "inspectionData": {
 *     "propertyAddress": string,
 *     "inspectorId": string,
 *     "customerId": string,
 *     "inspectionType": string,
 *     "scheduledDate": string,
 *     "findings": InspectionFinding[],
 *     "photos": Photo[],
 *     "metadata": {}
 *   }
 * }
 *
 * Response:
 * {
 *   "success": boolean,
 *   "workflowId": string,
 *   "status": "RUNNING" | "REVISION_REQUIRED" | "COMPLETED" | "FAILED",
 *   "currentStep": string,
 *   "results": {},
 *   "error": string | null
 * }
 *
 * @module AgentExecutionAPI
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { NextRequest, NextResponse } from 'next/server';
import { orchestrateInspectionWorkflow, InspectionData } from '@/lib/agents/agent-orchestrator';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';

/**
 * POST /api/agents/execute
 *
 * Execute the complete inspection workflow with all 4 agents
 */
export async function POST(request: NextRequest) {
  const correlationId = AdvancedLogger.setCorrelationId();
  const startTime = Date.now();

  try {
    // Parse request body
    const body = await request.json();
    const { inspectionData } = body;

    // Validate request
    if (!inspectionData) {
      AdvancedLogger.warn('Agent execution request missing inspection data', {
        correlationId
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: inspectionData'
        },
        { status: 400 }
      );
    }

    // Validate inspection data structure
    const validationError = validateInspectionData(inspectionData);
    if (validationError) {
      AdvancedLogger.warn('Agent execution request validation failed', {
        correlationId,
        error: validationError
      });

      return NextResponse.json(
        {
          success: false,
          error: validationError
        },
        { status: 400 }
      );
    }

    AdvancedLogger.info('Agent workflow execution requested', {
      correlationId,
      inspectionType: inspectionData.inspectionType,
      propertyAddress: inspectionData.propertyAddress
    });

    // Execute orchestrated workflow
    const workflow = await orchestrateInspectionWorkflow(inspectionData);

    const duration = Date.now() - startTime;

    AdvancedLogger.info('Agent workflow execution completed', {
      correlationId,
      workflowId: workflow.workflowId,
      status: workflow.status,
      currentStep: workflow.currentStep,
      duration
    }, duration);

    // Return workflow state
    return NextResponse.json(
      {
        success: true,
        workflowId: workflow.workflowId,
        status: workflow.status,
        currentStep: workflow.currentStep,
        sessions: workflow.sessions,
        results: workflow.results,
        startedAt: workflow.startedAt,
        completedAt: workflow.completedAt,
        error: workflow.error || null
      },
      { status: 200 }
    );

  } catch (error: any) {
    const duration = Date.now() - startTime;

    AdvancedLogger.error('Agent workflow execution failed', error, duration, {
      correlationId
    });

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Agent workflow execution failed',
        correlationId
      },
      { status: 500 }
    );
  }
}

/**
 * Validate inspection data structure
 */
function validateInspectionData(data: any): string | null {
  // Required fields
  const requiredFields = [
    'propertyAddress',
    'inspectorId',
    'customerId',
    'inspectionType',
    'scheduledDate'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing required field: ${field}`;
    }
  }

  // Validate findings array
  if (!Array.isArray(data.findings)) {
    return 'findings must be an array';
  }

  // Validate each finding
  for (let i = 0; i < data.findings.length; i++) {
    const finding = data.findings[i];

    if (!finding.category || !finding.severity || !finding.description) {
      return `Invalid finding at index ${i}: missing required fields`;
    }

    const validSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    if (!validSeverities.includes(finding.severity)) {
      return `Invalid severity at finding index ${i}: must be one of ${validSeverities.join(', ')}`;
    }
  }

  // Validate photos array
  if (!Array.isArray(data.photos)) {
    return 'photos must be an array';
  }

  // Validate each photo
  for (let i = 0; i < data.photos.length; i++) {
    const photo = data.photos[i];

    if (!photo.url || !photo.caption) {
      return `Invalid photo at index ${i}: missing required fields`;
    }
  }

  return null;
}

/**
 * GET /api/agents/execute
 *
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json(
    {
      name: 'Agent Workflow Execution API',
      version: '1.0.0',
      description: 'Orchestrates the 4-agent inspection workflow',
      endpoints: {
        POST: {
          description: 'Execute inspection workflow',
          body: {
            inspectionData: {
              propertyAddress: 'string (required)',
              inspectorId: 'string (required)',
              customerId: 'string (required)',
              inspectionType: 'string (required)',
              scheduledDate: 'string (required)',
              findings: 'InspectionFinding[] (required)',
              photos: 'Photo[] (required)',
              metadata: 'object (optional)'
            }
          },
          response: {
            success: 'boolean',
            workflowId: 'string',
            status: '"RUNNING" | "REVISION_REQUIRED" | "COMPLETED" | "FAILED"',
            currentStep: 'string',
            sessions: 'object',
            results: 'object',
            error: 'string | null'
          }
        }
      },
      workflow: {
        agents: [
          {
            name: 'Data Intake Agent',
            description: 'Validates and structures inspection data',
            subagents: ['compliance-checker', 'historical-analyzer', 'insurance-validator']
          },
          {
            name: 'Report Generation Agent',
            description: 'Creates comprehensive inspection report',
            subagents: ['content-generator', 'photo-organizer', 'cost-estimator']
          },
          {
            name: 'Quality Assurance Agent',
            description: 'Reviews and approves/rejects report',
            subagents: ['completeness-checker', 'accuracy-validator', 'compliance-reviewer']
          },
          {
            name: 'Operations Agent',
            description: 'Finalizes and distributes approved report',
            subagents: ['report-finalizer', 'distribution-manager', 'invoice-generator']
          }
        ],
        features: [
          'Sequential execution with state persistence',
          'Error handling and retry logic',
          'Compensation/rollback on failure',
          'QA rejection handling (revision required)',
          'Session management for context preservation'
        ]
      },
      examples: {
        request: {
          inspectionData: {
            propertyAddress: '123 Main St, Anytown, ST 12345',
            inspectorId: 'inspector_123',
            customerId: 'customer_456',
            inspectionType: 'ROOF_DAMAGE',
            scheduledDate: '2025-12-30T10:00:00Z',
            findings: [
              {
                category: 'Roof',
                severity: 'HIGH',
                description: 'Missing shingles on north side',
                location: 'North roof section',
                recommendation: 'Replace missing shingles immediately',
                estimatedCost: 1500
              }
            ],
            photos: [
              {
                url: 'https://example.com/photo1.jpg',
                caption: 'Missing shingles on north roof',
                category: 'Roof',
                timestamp: '2025-12-30T10:15:00Z'
              }
            ],
            metadata: {
              weatherConditions: 'Clear',
              temperature: '72F'
            }
          }
        },
        response: {
          success: true,
          workflowId: 'workflow_1735497600000_abc123',
          status: 'COMPLETED',
          currentStep: 'FINISHED',
          sessions: {
            intake: 'intake_1735497600000_def456',
            reportGen: 'report-gen_1735497620000_ghi789',
            qa: 'qa_1735497640000_jkl012',
            operations: 'operations_1735497660000_mno345'
          },
          results: {
            intake: {
              status: 'SUCCESS',
              validatedData: '...'
            },
            report: {
              status: 'COMPLETED',
              reportId: 'report_1735497620000_xyz'
            },
            qa: {
              status: 'APPROVED',
              qualityScore: 92
            },
            operations: {
              status: 'SUCCESS',
              finalizedReportId: 'report_final_xyz'
            }
          },
          error: null
        }
      }
    },
    { status: 200 }
  );
}
