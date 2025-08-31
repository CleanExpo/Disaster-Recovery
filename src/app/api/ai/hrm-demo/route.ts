/**
 * HRM Demo API Endpoint
 * Demonstrates the Hierarchical Reasoning Model's capabilities
 */

import { NextRequest, NextResponse } from 'next/server';
import { HRMProvider } from '@/lib/ai-orchestration/providers/hrm-provider';
import { createOrchestrationService } from '@/lib/ai-orchestration/orchestration-service';
import { AIService } from '@/lib/ai-service';
import { AITaskType } from '@/types/ai-service';

// Initialize services
let hrmProvider: HRMProvider | null = null;
let orchestrationService: any = null;

async function initializeServices() {
  if (!hrmProvider) {
    hrmProvider = new HRMProvider({
      apiEndpoint: process.env.HRM_API_ENDPOINT || 'http://localhost:8080/hrm',
      apiKey: process.env.HRM_API_KEY,
      maxCycles: parseInt(process.env.HRM_MAX_CYCLES || '16'),
      temperature: parseFloat(process.env.HRM_TEMPERATURE || '0.1'),
      enableCache: true,
      device: (process.env.HRM_DEVICE as 'cuda' | 'cpu') || 'cuda'
    });
    
    await hrmProvider.initialize();
  }

  if (!orchestrationService) {
    // Mock AI service for demo
    const aiService = new AIService({
      providers: [],
      routing: { rules: [] },
      cache: { enabled: true }
    } as any);

    orchestrationService = await createOrchestrationService(aiService, {
      enableHRM: true,
      hrmConfig: {
        apiEndpoint: process.env.HRM_API_ENDPOINT || 'http://localhost:8080/hrm',
        apiKey: process.env.HRM_API_KEY
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeServices();
    
    const body = await request.json();
    const { scenario, type = 'disaster-assessment' } = body;

    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario is required' },
        { status: 400 }
      );
    }

    let result;
    const startTime = Date.now();

    switch (type) {
      case 'disaster-assessment': {
        // Complex disaster scenario
        const disasterScenario = {
          type: scenario.disasterType || 'flood',
          urgency: scenario.urgency || 'immediate',
          criticalityLevel: scenario.severity || 8,
          affectedArea: {
            width: scenario.areaWidth || 100,
            height: scenario.areaHeight || 100
          },
          availableResources: scenario.resources || [
            { type: 'restoration-crew', quantity: 5 },
            { type: 'equipment', quantity: 20 }
          ],
          hazards: scenario.hazards || ['structural', 'electrical', 'contamination'],
          priorities: scenario.priorities || ['safety', 'containment', 'restoration']
        };

        result = await hrmProvider!.solveDisasterPuzzle(disasterScenario);
        break;
      }

      case 'path-finding': {
        // Resource routing optimization
        const pathScenario = scenario.pathData || {
          start: { x: 0, y: 0 },
          endpoints: [
            { x: 10, y: 10 },
            { x: 20, y: 5 },
            { x: 15, y: 20 }
          ],
          obstacles: [
            { position: { x: 5, y: 5 }, type: 'road-closure' }
          ],
          constraints: {
            maxDistance: 100,
            avoidHazards: true
          }
        };

        result = await hrmProvider!.findOptimalPath(
          pathScenario.start,
          pathScenario.endpoints,
          pathScenario.obstacles,
          pathScenario.constraints
        );
        break;
      }

      case 'pattern-recognition': {
        // Damage pattern analysis
        const damageGrid = scenario.damageGrid || [
          [8, 7, 6, 5, 4],
          [7, 9, 8, 6, 5],
          [6, 8, 10, 8, 6],
          [5, 6, 8, 7, 5],
          [4, 5, 6, 5, 4]
        ];

        const patterns = scenario.patterns || [
          { signature: [[10, 9], [9, 10]], type: 'burst-pipe' },
          { signature: [[8, 8], [8, 8]], type: 'flood' }
        ];

        result = await hrmProvider!.recognizeDamagePattern(damageGrid, patterns);
        break;
      }

      case 'resource-allocation': {
        // Multi-site resource optimization
        const resources = scenario.resources || [
          { id: 'team-1', type: 'crew', quantity: 10, location: { x: 0, y: 0 } },
          { id: 'equip-1', type: 'pumps', quantity: 20, location: { x: 10, y: 10 } }
        ];

        const demands = scenario.demands || [
          { id: 'site-1', type: 'crew', quantity: 5, priority: 10, location: { x: 5, y: 5 } },
          { id: 'site-2', type: 'pumps', quantity: 10, priority: 8, location: { x: 15, y: 15 } }
        ];

        const constraints = scenario.constraints || {
          maxDistance: 50,
          timeLimit: 240,
          budgetLimit: 100000
        };

        result = await hrmProvider!.optimizeResourceAllocation(
          resources,
          demands,
          constraints
        );
        break;
      }

      case 'orchestration': {
        // Full orchestration with HRM
        const task = scenario.task || 
          'Analyze and create recovery plan for 30-floor building with water damage on floors 10-20';
        
        const context = {
          type: scenario.taskType || AITaskType.DAMAGE_ASSESSMENT,
          priority: scenario.priority || 'high',
          accuracyRequired: scenario.accuracy || 'high',
          maxResponseTime: 30000,
          costSensitive: false
        };

        result = await orchestrationService.orchestrate(task, context, {
          forceApproach: 'hrm'
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: disaster-assessment, path-finding, pattern-recognition, resource-allocation, or orchestration' },
          { status: 400 }
        );
    }

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      type,
      result,
      metadata: {
        processingTime,
        model: 'HRM-27M',
        provider: 'Sapient-HRM',
        capabilities: {
          parameters: '27M',
          architecture: 'Hierarchical Dual-Module',
          strengths: [
            'Complex reasoning without pre-training',
            'Single forward pass efficiency',
            'Superior performance on puzzles and planning',
            'No Chain-of-Thought data required'
          ]
        }
      }
    });

  } catch (error) {
    console.error('HRM Demo Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Ensure HRM service is running at the configured endpoint'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'HRM Demo API',
    description: 'Hierarchical Reasoning Model for complex disaster recovery scenarios',
    endpoints: {
      POST: {
        description: 'Process a scenario with HRM',
        body: {
          type: 'disaster-assessment | path-finding | pattern-recognition | resource-allocation | orchestration',
          scenario: 'Scenario-specific data based on type'
        },
        examples: [
          {
            type: 'disaster-assessment',
            scenario: {
              disasterType: 'flood',
              urgency: 'immediate',
              severity: 8,
              areaWidth: 100,
              areaHeight: 100,
              hazards: ['electrical', 'structural'],
              priorities: ['safety', 'restoration']
            }
          },
          {
            type: 'orchestration',
            scenario: {
              task: 'Create recovery plan for shopping center with water and fire damage',
              taskType: 'DAMAGE_ASSESSMENT',
              priority: 'critical',
              accuracy: 'critical'
            }
          }
        ]
      }
    },
    capabilities: {
      model: 'HRM-27M (Sapient)',
      features: [
        'Brain-inspired hierarchical processing',
        'Complex reasoning without pre-training',
        'Exceptional puzzle-solving abilities',
        'Efficient resource allocation',
        'Pattern recognition and analysis'
      ],
      performance: {
        parameters: '27M (extremely efficient)',
        speed: 'Single forward pass',
        accuracy: 'State-of-the-art on reasoning tasks'
      }
    }
  });
}