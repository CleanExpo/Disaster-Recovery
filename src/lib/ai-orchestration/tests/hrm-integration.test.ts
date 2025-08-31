/**
 * HRM Integration Tests for Disaster Recovery Scenarios
 * Tests the Hierarchical Reasoning Model's capabilities on complex disaster scenarios
 */

import { HRMProvider } from '../providers/hrm-provider';
import { OrchestrationService, createOrchestrationService } from '../orchestration-service';
import { AIService } from '@/lib/ai-service';
import { AITaskType, AITaskContext } from '@/types/ai-service';

describe('HRM Integration Tests', () => {
  let hrmProvider: HRMProvider;
  let orchestrationService: OrchestrationService;

  beforeAll(async () => {
    // Initialize HRM provider
    hrmProvider = new HRMProvider({
      apiEndpoint: process.env.HRM_API_ENDPOINT || 'http://localhost:8080/hrm',
      maxCycles: 16,
      temperature: 0.1,
      enableCache: true
    });

    // Create orchestration service with HRM enabled
    const aiService = new AIService({
      providers: [],
      routing: { rules: [] },
      cache: { enabled: true }
    } as any);

    orchestrationService = await createOrchestrationService(aiService, {
      enableHRM: true,
      hrmConfig: {
        apiEndpoint: process.env.HRM_API_ENDPOINT || 'http://localhost:8080/hrm'
      }
    });
  });

  describe('Disaster Assessment Scenarios', () => {
    test('Complex flood damage assessment with multiple factors', async () => {
      const scenario = {
        type: 'flood',
        urgency: 'immediate' as const,
        criticalityLevel: 9,
        affectedArea: { width: 100, height: 50 },
        availableResources: [
          { type: 'pumps', quantity: 5 },
          { type: 'dehumidifiers', quantity: 10 },
          { type: 'technicians', quantity: 8 }
        ],
        hazards: ['electrical', 'structural', 'contamination'],
        priorities: ['safety', 'water-extraction', 'drying'],
        constraints: [
          'power outage in 40% of building',
          'basement completely submerged',
          'structural damage to load-bearing walls'
        ],
        objectives: [
          'ensure occupant safety',
          'prevent mould growth',
          'restore habitability within 72 hours'
        ]
      };

      const solution = await hrmProvider.solveDisasterPuzzle(scenario);

      expect(solution).toBeDefined();
      expect(solution.immediateActions).toBeInstanceOf(Array);
      expect(solution.immediateActions.length).toBeGreaterThan(0);
      expect(solution.resourceDeployment).toBeDefined();
      expect(solution.evacuationPlan).toBeDefined();
      expect(solution.timeline).toBeInstanceOf(Array);
      expect(solution.estimatedImpact).toBeDefined();
    });

    test('Multi-hazard scenario: Fire followed by water damage', async () => {
      const complexScenario = {
        type: 'multi-hazard',
        urgency: 'immediate' as const,
        criticalityLevel: 10,
        affectedArea: { width: 200, height: 100 },
        availableResources: [
          { type: 'fire-restoration', quantity: 3 },
          { type: 'water-extraction', quantity: 5 },
          { type: 'air-scrubbers', quantity: 15 }
        ],
        hazards: ['smoke', 'water', 'structural', 'toxic-fumes'],
        priorities: ['life-safety', 'containment', 'restoration'],
        constraints: [
          'fire damage on floors 3-5',
          'water damage from sprinkler system floors 1-5',
          'smoke damage throughout building',
          'HVAC system compromised'
        ],
        objectives: [
          'ensure air quality safety',
          'prevent secondary damage',
          'coordinate insurance assessment',
          'minimize business interruption'
        ]
      };

      const solution = await hrmProvider.solveDisasterPuzzle(complexScenario);

      expect(solution.immediateActions).toContain(expect.stringMatching(/air quality|ventilation|safety/i));
      expect(solution.resourceDeployment).toHaveProperty('fire-restoration');
      expect(solution.resourceDeployment).toHaveProperty('water-extraction');
    });
  });

  describe('Path Finding for Resource Allocation', () => {
    test('Optimal route planning for emergency response teams', async () => {
      const startPoint = { x: 0, y: 0 };
      const endpoints = [
        { x: 10, y: 10 }, // Site A: Major flood
        { x: 5, y: 15 },  // Site B: Mould outbreak
        { x: 20, y: 5 }   // Site C: Fire damage
      ];
      const obstacles = [
        { position: { x: 5, y: 5 }, type: 'road-closure' },
        { position: { x: 12, y: 8 }, type: 'flooding' }
      ];
      const constraints = {
        maxDistance: 100,
        avoidHazards: true
      };

      const paths = await hrmProvider.findOptimalPath(
        startPoint,
        endpoints,
        obstacles,
        constraints
      );

      expect(paths).toBeInstanceOf(Array);
      expect(paths.length).toBeGreaterThan(0);
      paths.forEach(path => {
        expect(path.path).toBeInstanceOf(Array);
        expect(path.distance).toBeGreaterThan(0);
        expect(path.safety).toBeGreaterThanOrEqual(0);
        expect(path.safety).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Pattern Recognition for Damage Assessment', () => {
    test('Identify water damage spread patterns', async () => {
      // Create a damage grid representing water damage levels (0-10)
      const damageGrid = [
        [10, 9, 8, 7, 6],
        [9, 10, 9, 8, 7],
        [8, 9, 10, 9, 8],
        [7, 8, 9, 8, 7],
        [6, 7, 8, 7, 6]
      ];

      const historicalPatterns = [
        { signature: [[10, 9], [9, 10]], type: 'burst-pipe' },
        { signature: [[10, 10], [10, 10]], type: 'flood' },
        { signature: [[5, 5], [5, 5]], type: 'slow-leak' }
      ];

      const assessment = await hrmProvider.recognizeDamagePattern(
        damageGrid,
        historicalPatterns
      );

      expect(assessment).toBeDefined();
      expect(assessment.pattern).toBeTruthy();
      expect(assessment.severity).toBeGreaterThan(0);
      expect(assessment.spreadRisk).toBeGreaterThanOrEqual(0);
      expect(assessment.recommendations).toBeInstanceOf(Array);
    });
  });

  describe('Resource Allocation Optimization', () => {
    test('Multi-level resource allocation for city-wide disaster', async () => {
      const resources = [
        { id: 'team-1', type: 'restoration-crew', quantity: 10, location: { x: 0, y: 0 } },
        { id: 'team-2', type: 'restoration-crew', quantity: 8, location: { x: 20, y: 20 } },
        { id: 'equip-1', type: 'pumps', quantity: 20, location: { x: 10, y: 10 } },
        { id: 'equip-2', type: 'dehumidifiers', quantity: 30, location: { x: 15, y: 15 } }
      ];

      const demands = [
        { id: 'site-1', type: 'restoration-crew', quantity: 5, priority: 10, location: { x: 5, y: 5 } },
        { id: 'site-2', type: 'restoration-crew', quantity: 3, priority: 8, location: { x: 25, y: 25 } },
        { id: 'site-3', type: 'pumps', quantity: 10, priority: 9, location: { x: 8, y: 12 } },
        { id: 'site-4', type: 'dehumidifiers', quantity: 15, priority: 7, location: { x: 18, y: 20 } }
      ];

      const constraints = {
        maxDistance: 50,
        timeLimit: 240, // 4 hours
        budgetLimit: 100000
      };

      const allocationPlan = await hrmProvider.optimizeResourceAllocation(
        resources,
        demands,
        constraints
      );

      expect(allocationPlan).toBeDefined();
      expect(allocationPlan.strategy).toBeDefined();
      expect(allocationPlan.allocations).toBeDefined();
      expect(allocationPlan.efficiency).toBeGreaterThan(0);
      expect(allocationPlan.efficiency).toBeLessThanOrEqual(1);
    });
  });

  describe('Orchestration Service with HRM', () => {
    test('Emergency response orchestration using HRM', async () => {
      const emergencyRequest = {
        scenario: {
          type: 'flood',
          severity: 8,
          location: {
            address: '123 Main St, Brisbane QLD',
            coordinates: { lat: -27.4698, lng: 153.0251 }
          },
          propertyType: 'commercial',
          affectedArea: 500,
          timeOfIncident: new Date(),
          occupancyStatus: 'occupied',
          utilitiesStatus: {
            power: false,
            water: false,
            gas: true,
            internet: false
          }
        },
        urgency: 'immediate' as const,
        requiredAnalysis: ['safety', 'damage', 'restoration-plan'],
        constraints: {
          maxTime: 10000,
          minConfidence: 0.8
        },
        stakeholders: ['property-owner', 'insurance', 'tenants']
      };

      const result = await orchestrationService.orchestrateEmergencyResponse(
        emergencyRequest
      );

      expect(result.success).toBe(true);
      expect(result.result).toBeDefined();
      expect(result.reasoning).toBeDefined();
      expect(result.reasoning?.approach).toContain('hrm');
      expect(result.reasoning?.confidence).toBeGreaterThanOrEqual(0.8);
    });

    test('Complex reasoning task routed to HRM', async () => {
      const task = `Analyze a 50-floor high-rise building with water damage on floors 
                    15-25, determine structural integrity risks, create evacuation plan, 
                    and optimize resource deployment for fastest restoration while 
                    ensuring safety compliance with Australian building codes`;

      const context: AITaskContext = {
        type: AITaskType.TECHNICAL_ANALYSIS,
        priority: 'critical',
        accuracyRequired: 'critical',
        maxResponseTime: 30000,
        costSensitive: false
      };

      const result = await orchestrationService.orchestrate(task, context);

      expect(result.success).toBe(true);
      expect(result.reasoning?.approach).toBe('hrm');
      expect(result.reasoning?.steps).toBeDefined();
      expect(result.reasoning?.steps?.length).toBeGreaterThan(0);
      expect(result.metadata?.provider).toBe('HRM');
    });

    test('Performance comparison: HRM vs traditional approaches', async () => {
      const complexTask = `Coordinate disaster recovery for shopping center with:
                           - 200 retail stores affected
                           - Mixed damage types (water, smoke, structural)
                           - 48-hour restoration deadline
                           - $5M insurance claim
                           - Multiple stakeholder coordination required`;

      const context: AITaskContext = {
        type: AITaskType.DAMAGE_ASSESSMENT,
        priority: 'high',
        accuracyRequired: 'high',
        maxResponseTime: 20000,
        costSensitive: true
      };

      // Test with HRM
      const hrmStart = Date.now();
      const hrmResult = await orchestrationService.orchestrate(
        complexTask,
        context,
        { forceApproach: 'hrm' }
      );
      const hrmTime = Date.now() - hrmStart;

      // Test with direct approach
      const directStart = Date.now();
      const directResult = await orchestrationService.orchestrate(
        complexTask,
        context,
        { forceApproach: 'direct' }
      );
      const directTime = Date.now() - directStart;

      console.log('Performance Comparison:');
      console.log(`HRM: ${hrmTime}ms, confidence: ${hrmResult.reasoning?.confidence}`);
      console.log(`Direct: ${directTime}ms, confidence: ${directResult.reasoning?.confidence}`);

      // HRM should provide higher confidence for complex reasoning
      expect(hrmResult.reasoning?.confidence).toBeGreaterThanOrEqual(
        directResult.reasoning?.confidence || 0
      );

      // HRM should be efficient despite complex reasoning
      expect(hrmTime).toBeLessThan(30000);
    });
  });

  describe('Cache and Performance', () => {
    test('HRM caching for repeated scenarios', async () => {
      const scenario = {
        type: 'mould',
        urgency: 'moderate' as const,
        criticalityLevel: 6,
        affectedArea: { width: 20, height: 15 },
        availableResources: [],
        hazards: ['health-risk'],
        priorities: ['containment', 'removal']
      };

      // First call - should hit HRM
      const start1 = Date.now();
      const result1 = await hrmProvider.solveDisasterPuzzle(scenario);
      const time1 = Date.now() - start1;

      // Second call - should hit cache
      const start2 = Date.now();
      const result2 = await hrmProvider.solveDisasterPuzzle(scenario);
      const time2 = Date.now() - start2;

      expect(result1).toEqual(result2);
      expect(time2).toBeLessThan(time1 * 0.1); // Cache should be >10x faster
    });
  });
});

// Export test utilities for other tests
export const createTestScenario = (type: string, severity: number) => ({
  type,
  urgency: severity > 7 ? 'immediate' : 'moderate',
  criticalityLevel: severity,
  affectedArea: { width: severity * 10, height: severity * 10 },
  availableResources: [],
  hazards: [],
  priorities: []
});

export const createTestOrchestrationService = async () => {
  const aiService = new AIService({
    providers: [],
    routing: { rules: [] },
    cache: { enabled: true }
  } as any);

  return createOrchestrationService(aiService, {
    enableHRM: true,
    hrmConfig: {
      apiEndpoint: process.env.HRM_API_ENDPOINT || 'http://localhost:8080/hrm',
      enableCache: true
    }
  });
};