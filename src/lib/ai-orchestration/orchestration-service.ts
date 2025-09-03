/**
 * Main Orchestration Service for Disaster Recovery
 * Integrates multiple AI providers including HRM for enhanced reasoning
 */

import { EventEmitter } from 'events';
import { AIService } from '@/lib/ai-service';
import { HRMProvider, HRMConfig, HRMReasoningRequest } from './providers/hrm-provider';
import { 
  AITaskContext, 
  AITaskType, 
  AIMessage,
  AIProvider 
} from '@/types/ai-service';
import logger from '@/lib/logger';

export interface OrchestrationConfig {
  enableHRM?: boolean;
  hrmConfig?: HRMConfig;
  enableSequentialThinking?: boolean;
  enableMultiAgentDiscussion?: boolean;
  routing?: {
    defaultApproach: 'hrm' | 'sequential-thinking' | 'multi-agent' | 'direct';
    complexityThreshold: number;
    urgencyThreshold: number;
    accuracyThreshold: number;
  };
  cache?: {
    maxMemorySize: number;
    defaultTTL: number;
    enablePersistence: boolean;
  };
}

export interface OrchestrationResult {
  success: boolean;
  result?: any;
  reasoning?: {
    approach: string;
    steps?: string[];
    confidence?: number;
    cyclesUsed?: number;
  };
  metadata?: {
    processingTime: number;
    provider: string;
    cost?: number;
  };
  error?: string;
}

export interface EmergencyOrchestrationRequest {
  scenario: {
    type: string;
    severity: number;
    location: any;
    propertyType: string;
    affectedArea: number;
    timeOfIncident: Date;
    occupancyStatus: string;
    utilitiesStatus: any;
  };
  urgency: 'immediate' | 'urgent' | 'moderate';
  requiredAnalysis: string[];
  constraints?: {
    maxTime?: number;
    maxCost?: number;
    minConfidence?: number;
  };
  stakeholders?: string[];
}

export class OrchestrationService extends EventEmitter {
  private aiService: AIService;
  private hrmProvider?: HRMProvider;
  private config: OrchestrationConfig;
  private isInitialized: boolean = false;
  private cache: Map<string, OrchestrationResult> = new Map();

  constructor(aiService: AIService, config?: OrchestrationConfig) {
    super();
    this.aiService = aiService;
    this.config = {
      enableHRM: config?.enableHRM ?? true,
      enableSequentialThinking: config?.enableSequentialThinking ?? true,
      enableMultiAgentDiscussion: config?.enableMultiAgentDiscussion ?? true,
      routing: {
        defaultApproach: config?.routing?.defaultApproach || 'hrm',
        complexityThreshold: config?.routing?.complexityThreshold || 7,
        urgencyThreshold: config?.routing?.urgencyThreshold || 8,
        accuracyThreshold: config?.routing?.accuracyThreshold || 8,
        ...config?.routing
      },
      cache: {
        maxMemorySize: config?.cache?.maxMemorySize || 100 * 1024 * 1024,
        defaultTTL: config?.cache?.defaultTTL || 3600,
        enablePersistence: config?.cache?.enablePersistence ?? false,
        ...config?.cache
      },
      hrmConfig: config?.hrmConfig
    };

    if (this.config.enableHRM) {
      this.initializeHRM();
    }
  }

  private async initializeHRM(): Promise<void> {
    try {
      this.hrmProvider = new HRMProvider(this.config.hrmConfig);
      await this.hrmProvider.initialize();
      
      this.hrmProvider.on('initialized', () => {
        logger.info('HRM Provider initialized successfully');
      });

      this.hrmProvider.on('reasoning-complete', ({ request, response }) => {
        logger.info('HRM reasoning completed', { 
          problemType: request.problemType,
          confidence: response.reasoning.confidence,
          cyclesUsed: response.reasoning.cyclesUsed
        });
      });

      this.hrmProvider.on('reasoning-error', ({ request, error }) => {
        logger.error('HRM reasoning failed', { 
          problemType: request.problemType,
          error 
        });
      });

      this.isInitialized = true;
    } catch (error) {
      logger.error('Failed to initialize HRM provider', error);
      // Continue without HRM if initialization fails
      this.config.enableHRM = false;
    }
  }

  /**
   * Main orchestration method that routes to the optimal approach
   */
  async orchestrate(
    task: string,
    context: AITaskContext,
    options?: { forceApproach?: string; enableCache?: boolean }
  ): Promise<OrchestrationResult> {
    const startTime = Date.now();

    // Check cache
    const cacheKey = this.getCacheKey(task, context);
    if (options?.enableCache !== false && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      this.emit('cache-hit', { task, context, result: cached });
      return cached;
    }

    try {
      // Determine the best approach
      const approach = options?.forceApproach || this.determineApproach(task, context);
      
      logger.info('Orchestrating task', { approach, taskType: context.type });

      let result: OrchestrationResult;

      switch (approach) {
        case 'hrm':
          result = await this.orchestrateWithHRM(task, context);
          break;
        case 'sequential-thinking':
          result = await this.orchestrateSequentialThinking(task, context);
          break;
        case 'multi-agent':
          result = await this.orchestrateMultiAgentDiscussion(task, context);
          break;
        default:
          result = await this.orchestrateDirect(task, context);
      }

      // Add metadata
      result.metadata = {
        ...result.metadata,
        processingTime: Date.now() - startTime
      };

      // Cache successful results
      if (result.success && options?.enableCache !== false) {
        this.cache.set(cacheKey, result);
      }

      this.emit('orchestration-complete', { task, context, result });
      return result;

    } catch (error) {
      logger.error('Orchestration failed', { error, task, context });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Orchestrate using HRM for complex reasoning tasks
   */
  private async orchestrateWithHRM(
    task: string,
    context: AITaskContext
  ): Promise<OrchestrationResult> {
    if (!this.hrmProvider || !this.config.enableHRM) {
      logger.warn('HRM not available, falling back to direct approach');
      return this.orchestrateDirect(task, context);
    }

    try {
      const hrmRequest: HRMReasoningRequest = {
        problem: task,
        problemType: this.mapTaskTypeToHRMType(context.type),
        constraints: {
          maxTime: context.maxResponseTime,
          requiredAccuracy: this.mapAccuracyToNumber(context.accuracyRequired)
        },
        context: {
          variables: context.userContext || {}
        }
      };

      const hrmResponse = await this.hrmProvider.reason(hrmRequest);

      return {
        success: true,
        result: hrmResponse.solution,
        reasoning: {
          approach: 'hrm',
          steps: [
            ...hrmResponse.reasoning.highLevelPlan,
            ...hrmResponse.reasoning.lowLevelSteps
          ],
          confidence: hrmResponse.reasoning.confidence,
          cyclesUsed: hrmResponse.reasoning.cyclesUsed
        },
        metadata: {
          processingTime: hrmResponse.metadata.processingTime,
          provider: 'HRM',
          cost: this.calculateHRMCost(hrmResponse.reasoning.cyclesUsed)
        }
      };
    } catch (error) {
      logger.error('HRM orchestration failed', error);
      // Fallback to direct approach
      return this.orchestrateDirect(task, context);
    }
  }

  /**
   * Orchestrate emergency response scenarios
   */
  async orchestrateEmergencyResponse(
    request: EmergencyOrchestrationRequest,
    options?: { enableRealTime?: boolean; userId?: string }
  ): Promise<OrchestrationResult> {
    // Use HRM for emergency scenarios if available
    if (this.hrmProvider && this.config.enableHRM) {
      try {
        const disasterSolution = await this.hrmProvider.solveDisasterPuzzle({
          type: request.scenario.type,
          urgency: request.urgency,
          criticalityLevel: request.scenario.severity * 2,
          affectedArea: {
            width: Math.sqrt(request.scenario.affectedArea),
            height: Math.sqrt(request.scenario.affectedArea)
          },
          availableResources: [],
          hazards: [],
          priorities: request.requiredAnalysis
        });

        return {
          success: true,
          result: disasterSolution,
          reasoning: {
            approach: 'hrm-emergency',
            confidence: 0.95
          }
        };
      } catch (error) {
        logger.error('HRM emergency response failed', error);
      }
    }

    // Fallback to standard emergency processing
    const context: AITaskContext = {
      type: AITaskType.EMERGENCY_RESPONSE,
      priority: 'critical',
      accuracyRequired: 'critical',
      maxResponseTime: request.constraints?.maxTime || 5000,
      costSensitive: false,
      userContext: request
    };

    return this.orchestrate(
      `Emergency ${request.scenario.type} response for ${request.scenario.propertyType} at ${request.scenario.location.address}`,
      context
    );
  }

  /**
   * Sequential thinking approach (can integrate with HRM)
   */
  private async orchestrateSequentialThinking(
    task: string,
    context: AITaskContext
  ): Promise<OrchestrationResult> {
    // If HRM is available, use it for sequential reasoning
    if (this.hrmProvider && this.config.enableHRM) {
      return this.orchestrateWithHRM(task, context);
    }

    // Fallback to GPT-OSS-120B or other sequential thinking provider
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are an expert in sequential reasoning. Break down the problem step by step.'
      },
      {
        role: 'user',
        content: task
      }
    ];

    const response = await this.aiService.generateResponse(messages, context);
    
    return {
      success: response.success,
      result: response.content,
      reasoning: {
        approach: 'sequential-thinking',
        confidence: response.confidence
      },
      metadata: response.metadata
    };
  }

  /**
   * Multi-agent discussion approach
   */
  private async orchestrateMultiAgentDiscussion(
    task: string,
    context: AITaskContext
  ): Promise<OrchestrationResult> {
    // Implementation for multi-agent discussion
    // This could integrate HRM for individual agent reasoning
    const agents = ['Technical Expert', 'Safety Inspector', 'Cost Analyst'];
    const responses = [];

    for (const agent of agents) {
      const messages: AIMessage[] = [
        {
          role: 'system',
          content: `You are a ${agent} analyzing a disaster recovery scenario.`
        },
        {
          role: 'user',
          content: task
        }
      ];

      const response = await this.aiService.generateResponse(messages, context);
      responses.push({
        agent,
        response: response.content,
        confidence: response.confidence
      });
    }

    // Synthesize responses
    const synthesis = await this.synthesizeAgentResponses(responses, task, context);

    return {
      success: true,
      result: synthesis,
      reasoning: {
        approach: 'multi-agent',
        steps: responses.map(r => `${r.agent}: ${r.response.substring(0, 100)}...`),
        confidence: Math.min(...responses.map(r => r.confidence || 0.5))
      }
    };
  }

  /**
   * Direct approach without orchestration
   */
  private async orchestrateDirect(
    task: string,
    context: AITaskContext
  ): Promise<OrchestrationResult> {
    const messages: AIMessage[] = [
      {
        role: 'user',
        content: task
      }
    ];

    const response = await this.aiService.generateResponse(messages, context);

    return {
      success: response.success,
      result: response.content,
      reasoning: {
        approach: 'direct',
        confidence: response.confidence
      },
      metadata: response.metadata
    };
  }

  /**
   * Determine the best orchestration approach based on task characteristics
   */
  private determineApproach(task: string, context: AITaskContext): string {
    // Prioritize HRM for complex reasoning tasks
    if (this.config.enableHRM && this.hrmProvider) {
      const complexity = this.estimateComplexity(task, context);
      const accuracy = this.mapAccuracyToNumber(context.accuracyRequired);
      
      if (complexity >= this.config.routing!.complexityThreshold) {
        return 'hrm';
      }
      
      if (accuracy >= this.config.routing!.accuracyThreshold) {
        return 'hrm';
      }

      // Use HRM for specific task types
      if ([
        AITaskType.DAMAGE_ASSESSMENT,
        AITaskType.SAFETY_ANALYSIS,
        AITaskType.TECHNICAL_ANALYSIS
      ].includes(context.type)) {
        return 'hrm';
      }
    }

    // Emergency tasks
    if (context.type === AITaskType.EMERGENCY_RESPONSE) {
      return this.config.enableHRM ? 'hrm' : 'direct';
    }

    // High complexity tasks
    if (this.estimateComplexity(task, context) >= 8) {
      return 'sequential-thinking';
    }

    // Multi-stakeholder scenarios
    if (task.toLowerCase().includes('stakeholder') || 
        task.toLowerCase().includes('multiple perspectives')) {
      return 'multi-agent';
    }

    return this.config.routing!.defaultApproach;
  }

  /**
   * Helper methods
   */
  private mapTaskTypeToHRMType(taskType: AITaskType): string {
    const mapping: Record<AITaskType, string> = {
      [AITaskType.DAMAGE_ASSESSMENT]: 'disaster-assessment',
      [AITaskType.COST_ESTIMATION]: 'resource-allocation',
      [AITaskType.SAFETY_ANALYSIS]: 'pattern-recognition',
      [AITaskType.EMERGENCY_RESPONSE]: 'disaster-assessment',
      [AITaskType.TECHNICAL_ANALYSIS]: 'general',
      [AITaskType.DOCUMENTATION]: 'general',
      [AITaskType.CLAIM_ANALYSIS]: 'resource-allocation',
      [AITaskType.SCHEDULING]: 'resource-allocation',
      [AITaskType.BUSINESS_ANALYTICS]: 'general',
      [AITaskType.GENERAL]: 'general'
    };
    
    return mapping[taskType] || 'general';
  }

  private mapAccuracyToNumber(accuracy: string): number {
    const mapping: Record<string, number> = {
      'critical': 0.95,
      'high': 0.85,
      'medium': 0.75,
      'low': 0.65
    };
    
    return mapping[accuracy] || 0.75;
  }

  private estimateComplexity(task: string, context: AITaskContext): number {
    let complexity = 5; // Base complexity

    // Increase for longer tasks
    complexity += Math.min(task.length / 100, 3);

    // Increase for critical accuracy
    if (context.accuracyRequired === 'critical') complexity += 2;
    if (context.accuracyRequired === 'high') complexity += 1;

    // Increase for specific task types
    if (context.type === AITaskType.TECHNICAL_ANALYSIS) complexity += 2;
    if (context.type === AITaskType.SAFETY_ANALYSIS) complexity += 2;

    // Increase for emergency
    if (context.priority === 'critical') complexity += 1;

    return Math.min(complexity, 10);
  }

  private calculateHRMCost(cyclesUsed: number): number {
    // HRM is extremely efficient - 27M parameters
    // Estimate cost based on cycles
    const baseCost = 0.001; // $0.001 per cycle
    return cyclesUsed * baseCost;
  }

  private async synthesizeAgentResponses(
    responses: any[],
    task: string,
    context: AITaskContext
  ): Promise<any> {
    // Synthesize multiple agent responses into a coherent solution
    const synthesis = {
      consensus: [],
      disagreements: [],
      recommendations: [],
      confidence: 0
    };

    // Basic synthesis logic
    responses.forEach(r => {
      synthesis.recommendations.push({
        source: r.agent,
        recommendation: r.response
      });
    });

    synthesis.confidence = Math.min(...responses.map(r => r.confidence || 0.5));

    return synthesis;
  }

  private getCacheKey(task: string, context: AITaskContext): string {
    return `${context.type}:${task.substring(0, 50)}:${context.accuracyRequired}`;
  }

  /**
   * Public API methods
   */
  async getStatus(): Promise<{
    health: 'healthy' | 'degraded' | 'unhealthy';
    components: Record<string, boolean>;
  }> {
    return {
      health: this.isInitialized ? 'healthy' : 'degraded',
      components: {
        aiService: true,
        hrm: this.config.enableHRM && !!this.hrmProvider,
        sequentialThinking: this.config.enableSequentialThinking || false,
        multiAgent: this.config.enableMultiAgentDiscussion || false
      }
    };
  }

  async getMetrics(): Promise<any> {
    return {
      cacheSize: this.cache.size,
      hrmEnabled: this.config.enableHRM,
      defaultApproach: this.config.routing?.defaultApproach
    };
  }

  clearCache(): void {
    this.cache.clear();
    this.emit('cache-cleared');
  }
}

/**
 * Factory function to create orchestration service
 */
export async function createOrchestrationService(
  aiService: AIService,
  config?: OrchestrationConfig
): Promise<OrchestrationService> {
  const service = new OrchestrationService(aiService, config);
  
  // Wait for HRM initialization if enabled
  if (config?.enableHRM) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return service;
}