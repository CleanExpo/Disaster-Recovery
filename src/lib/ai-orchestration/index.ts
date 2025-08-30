/**
 * Main AI Orchestration Service
 * Comprehensive orchestration system leveraging GPT-OSS-120B and Claude
 */

import { AIService } from '@/lib/ai-service';
import { SequentialThinkingEngine } from './pipelines/sequential-thinking-engine';
import { MultiAgentDiscussionEngine } from './agents/multi-agent-discussion';
import { IntelligentRouter } from './core/intelligent-router';
import { ContextManager } from './core/context-manager';
import { AdvancedOrchestrationCache } from './core/advanced-cache';
import { FallbackManager } from './fallbacks/fallback-manager';
import { RealTimeOrchestrationManager } from './websocket/real-time-orchestration';
import { PerformanceMonitor } from './monitoring/performance-monitor';
import { DisasterRecoveryOrchestrator } from './templates/disaster-recovery-orchestrator';

import {
  OrchestrationConfig,
  EmergencyOrchestrationRequest,
  EmergencyOrchestrationResponse,
  AgentPersona,
  OrchestrationError
} from './core/types';

import { AIProvider, AITaskContext, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';

export interface OrchestrationServiceConfig {
  orchestration: OrchestrationConfig;
  cache: {
    maxMemorySize: number;
    maxEntries: number;
    defaultTTL: number;
    enableCompression: boolean;
    enablePersistence: boolean;
    cleanupInterval: number;
  };
  fallback: {
    maxRetries: number;
    retryDelays: number[];
    enableCircuitBreaker: boolean;
    circuitBreakerThreshold: number;
    circuitBreakerResetTime: number;
    gracefulDegradation: boolean;
    emergencyBypass: boolean;
    fallbackProviderOrder: AIProvider[];
    fallbackApproachOrder: ('single-agent' | 'sequential-thinking' | 'multi-agent-discussion')[];
  };
  context: {
    enablePersistence: boolean;
    maxContextAge: number;
    maxContextSize: number;
    persistToDisk: boolean;
    encryptSensitiveData: boolean;
  };
  monitoring: {
    metricsRetentionDays: number;
    alertThresholds: {
      responseTime: number;
      errorRate: number;
      accuracy: number;
      costPerTask: number;
      cacheHitRate: number;
    };
    enableRealTimeMonitoring: boolean;
    enablePredictiveAnalytics: boolean;
    aggregationIntervals: {
      realTime: number;
      hourly: number;
      daily: number;
    };
  };
}

export interface OrchestrationResult {
  success: boolean;
  result: any;
  metadata: {
    approach: string;
    processingTime: number;
    confidence: number;
    cost: number;
    contextId: string;
    fallbackLevel: number;
    cacheHit?: boolean;
  };
  error?: string;
}

export class AIOrchestrationService {
  private aiService: AIService;
  private config: OrchestrationServiceConfig;

  // Core engines
  private sequentialEngine: SequentialThinkingEngine;
  private discussionEngine: MultiAgentDiscussionEngine;
  private router: IntelligentRouter;
  private contextManager: ContextManager;
  private cache: AdvancedOrchestrationCache;
  private fallbackManager: FallbackManager;
  private realTimeManager: RealTimeOrchestrationManager;
  private performanceMonitor: PerformanceMonitor;

  // Specialised orchestrators
  private disasterRecoveryOrchestrator: DisasterRecoveryOrchestrator;

  private isInitialized = false;

  constructor(aiService: AIService, config: OrchestrationServiceConfig) {
    this.aiService = aiService;
    this.config = config;

    logger.info('AI Orchestration Service initializing...', {
      cacheEnabled: config.cache.enablePersistence,
      fallbackEnabled: config.fallback.enableCircuitBreaker,
      monitoringEnabled: config.monitoring.enableRealTimeMonitoring
    });
  }

  /**
   * Initialize all orchestration components
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.warn('Orchestration service already initialized');
      return;
    }

    try {
      // Initialize core components
      this.contextManager = new ContextManager(this.config.context);
      this.cache = new AdvancedOrchestrationCache(this.config.cache);
      this.performanceMonitor = new PerformanceMonitor(this.config.monitoring);
      this.realTimeManager = new RealTimeOrchestrationManager();

      // Initialize engines
      this.sequentialEngine = new SequentialThinkingEngine(this.aiService);
      this.discussionEngine = new MultiAgentDiscussionEngine(this.aiService);
      this.router = new IntelligentRouter(this.config.orchestration);
      this.fallbackManager = new FallbackManager(this.aiService, this.config.fallback);

      // Initialize specialised orchestrators
      this.disasterRecoveryOrchestrator = new DisasterRecoveryOrchestrator(
        this.aiService,
        {
          sequential: this.sequentialEngine,
          discussion: this.discussionEngine,
          router: this.router,
          fallback: this.fallbackManager,
          context: this.contextManager,
          realTime: this.realTimeManager
        }
      );

      // Setup event handlers for performance monitoring
      this.setupEventHandlers();

      this.isInitialized = true;
      logger.info('AI Orchestration Service initialized successfully');

    } catch (error) {
      logger.error('Failed to initialize AI Orchestration Service', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new OrchestrationError(
        'Initialization failed',
        'INIT_FAILED',
        { originalError: error },
        false
      );
    }
  }

  /**
   * Main orchestration method - automatically routes to optimal approach
   */
  async orchestrate(
    task: string,
    context: AITaskContext,
    options?: {
      forceApproach?: 'single-agent' | 'sequential-thinking' | 'multi-agent-discussion';
      preferredAgent?: AgentPersona;
      enableRealTime?: boolean;
      maxTime?: number;
      maxCost?: number;
      sessionId?: string;
      userId?: string;
    }
  ): Promise<OrchestrationResult> {
    this.ensureInitialized();
    const startTime = Date.now();

    try {
      // Create context for this orchestration
      const contextId = this.contextManager.createContext(
        task,
        context,
        options?.forceApproach || 'auto-route',
        {
          userId: options?.userId,
          sessionId: options?.sessionId,
          tags: [context.type, context.priority]
        }
      );

      // Check cache first
      const cacheResult = await this.checkCache(task, context);
      if (cacheResult) {
        this.performanceMonitor.recordOrchestrationExecution(
          cacheResult.approach,
          true,
          Date.now() - startTime,
          0.01, // Minimal cache cost
          cacheResult.confidence,
          context.type,
          { cached: true }
        );

        return {
          success: true,
          result: cacheResult.result,
          metadata: {
            approach: 'cached',
            processingTime: Date.now() - startTime,
            confidence: cacheResult.confidence,
            cost: 0.01,
            contextId,
            fallbackLevel: 0,
            cacheHit: true
          }
        };
      }

      // Route to optimal approach
      const routingDecision = await this.router.makeRoutingDecision(
        task,
        context,
        {
          forceApproach: options?.forceApproach,
          preferredPrimaryAgent: options?.preferredAgent,
          maxTime: options?.maxTime,
          maxCost: options?.maxCost
        }
      );

      this.performanceMonitor.recordRoutingDecision(
        routingDecision,
        Date.now() - startTime
      );

      // Execute with fallback protection
      const fallbackResult = await this.fallbackManager.executeWithFallback(
        routingDecision.recommendedApproach,
        {
          task,
          context,
          primaryAgent: routingDecision.primaryAgent,
          participants: routingDecision.supportingAgents,
          options: {
            ...options,
            contextId,
            estimatedTime: routingDecision.estimatedTime,
            estimatedCost: routingDecision.estimatedCost
          }
        }
      );

      if (!fallbackResult.success) {
        throw new OrchestrationError(
          'Orchestration failed after all fallbacks',
          'ORCHESTRATION_FAILED',
          { fallbackResult },
          false
        );
      }

      // Cache successful results
      await this.cacheResult(task, context, fallbackResult);

      // Update context with final result
      this.contextManager.setFinalResult(contextId, {
        content: JSON.stringify(fallbackResult.result),
        confidence: this.extractConfidence(fallbackResult.result),
        approach: fallbackResult.approach,
        processingTime: fallbackResult.processingTime,
        cost: this.estimateCost(fallbackResult),
        metadata: { routingDecision, fallbackLevel: fallbackResult.fallbackLevel }
      });

      // Record performance metrics
      this.performanceMonitor.recordOrchestrationExecution(
        fallbackResult.approach as any,
        true,
        fallbackResult.processingTime,
        this.estimateCost(fallbackResult),
        this.extractConfidence(fallbackResult.result),
        context.type,
        {
          fallbackLevel: fallbackResult.fallbackLevel,
          routingConfidence: routingDecision.confidenceInRouting
        }
      );

      logger.info('Orchestration completed successfully', {
        approach: fallbackResult.approach,
        processingTime: fallbackResult.processingTime,
        confidence: this.extractConfidence(fallbackResult.result),
        fallbackLevel: fallbackResult.fallbackLevel,
        contextId
      });

      return {
        success: true,
        result: fallbackResult.result,
        metadata: {
          approach: fallbackResult.approach,
          processingTime: fallbackResult.processingTime,
          confidence: this.extractConfidence(fallbackResult.result),
          cost: this.estimateCost(fallbackResult),
          contextId,
          fallbackLevel: fallbackResult.fallbackLevel,
          cacheHit: false
        }
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;

      this.performanceMonitor.recordOrchestrationExecution(
        'unknown',
        false,
        processingTime,
        0,
        0,
        context.type,
        { error: error instanceof Error ? error.message : 'Unknown error' }
      );

      logger.error('Orchestration failed', {
        task: task.substring(0, 100),
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime
      });

      return {
        success: false,
        result: null,
        metadata: {
          approach: 'failed',
          processingTime,
          confidence: 0,
          cost: 0,
          contextId: 'unknown',
          fallbackLevel: -1
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Specialised disaster recovery orchestration
   */
  async orchestrateEmergencyResponse(
    request: EmergencyOrchestrationRequest,
    options?: {
      sessionId?: string;
      userId?: string;
      forceApproach?: 'single-agent' | 'sequential-thinking' | 'multi-agent-discussion';
      enableRealTime?: boolean;
    }
  ): Promise<EmergencyOrchestrationResponse> {
    this.ensureInitialized();

    logger.info('Emergency orchestration requested', {
      disasterType: request.scenario.type,
      severity: request.scenario.severity,
      urgency: request.urgency,
      location: request.scenario.location.address
    });

    try {
      const response = await this.disasterRecoveryOrchestrator.orchestrateEmergencyResponse(
        request,
        options
      );

      // Update specialised metrics
      this.disasterRecoveryOrchestrator.updateMetrics(
        request.scenario,
        response,
        Date.now() - new Date(request.scenario.timeOfIncident).getTime()
      );

      return response;

    } catch (error) {
      logger.error('Emergency orchestration failed', {
        disasterType: request.scenario.type,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      // Return emergency fallback response
      return {
        assessmentId: `emergency_${Date.now()}`,
        approach: 'emergency-template',
        timeline: {
          estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000),
          milestones: [
            {
              name: 'Emergency Response',
              expectedTime: new Date(Date.now() + 60 * 60 * 1000),
              dependencies: []
            }
          ]
        },
        safety: {
          immediateHazards: ['Seek professional assessment'],
          requiredPPE: ['Basic safety equipment'],
          evacuationRecommended: request.scenario.severity >= 4,
          emergencyServices: request.urgency === 'immediate'
        },
        damage: {
          categories: {
            structural: request.scenario.severity,
            water: 1,
            fire: 1,
            mould: 1,
            contamination: 1
          },
          totalScore: request.scenario.severity,
          description: 'Professional assessment required'
        },
        resources: {
          contractors: [],
          equipment: [],
          materials: []
        },
        cost: {
          emergency: { min: 1000, max: 5000 },
          restoration: { min: 10000, max: 50000 },
          temporary: { min: 500, max: 2000 },
          total: { min: 11500, max: 57000 },
          currency: 'AUD',
          confidence: 0.5
        },
        recommendations: {
          immediate: ['Contact emergency services if immediate danger', 'Ensure personal safety'],
          shortTerm: ['Professional damage assessment', 'Contact insurance'],
          longTerm: ['Complete restoration', 'Prevent future damage']
        },
        confidence: 0.3,
        reasoning: {
          keyFactors: ['Emergency fallback response'],
          assumptions: ['Professional assessment needed'],
          uncertainties: ['All aspects require professional evaluation']
        }
      };
    }
  }

  /**
   * Sequential thinking orchestration
   */
  async orchestrateSequentialThinking(
    problemStatement: string,
    context: AITaskContext,
    options?: {
      maxSteps?: number;
      timeoutPerStep?: number;
      primaryAgent?: AgentPersona;
      requirePeerReview?: boolean;
    }
  ): Promise<{
    chain: any;
    confidence: number;
    processingTime: number;
    cost: number;
  }> {
    this.ensureInitialized();

    const startTime = Date.now();

    try {
      const chain = await this.sequentialEngine.startThinkingChain(
        problemStatement,
        context,
        options
      );

      this.performanceMonitor.recordSequentialThinking(chain);

      return {
        chain,
        confidence: chain.totalConfidence,
        processingTime: Date.now() - startTime,
        cost: this.estimateSequentialThinkingCost(chain)
      };

    } catch (error) {
      logger.error('Sequential thinking failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Multi-agent discussion orchestration
   */
  async orchestrateMultiAgentDiscussion(
    topic: string,
    context: AITaskContext,
    options?: {
      participants?: AgentPersona[];
      moderator?: AgentPersona;
      maxRounds?: number;
      consensusThreshold?: number;
      enableDebate?: boolean;
    }
  ): Promise<{
    discussion: any;
    confidence: number;
    processingTime: number;
    cost: number;
  }> {
    this.ensureInitialized();

    const startTime = Date.now();

    try {
      const discussion = await this.discussionEngine.startDiscussion(
        topic,
        context,
        options
      );

      this.performanceMonitor.recordMultiAgentDiscussion(discussion);

      return {
        discussion,
        confidence: discussion.confidenceLevel,
        processingTime: Date.now() - startTime,
        cost: this.estimateDiscussionCost(discussion)
      };

    } catch (error) {
      logger.error('Multi-agent discussion failed', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Cache management
   */
  private async checkCache(task: string, context: AITaskContext): Promise<any | null> {
    // Check for sequential thinking cache
    const sequentialResult = this.cache.getSequentialThinking(task, context);
    if (sequentialResult) {
      this.performanceMonitor.recordCachePerformance(true, 10, this.cache.getStats().memoryUsage);
      return {
        result: sequentialResult,
        approach: 'sequential-thinking',
        confidence: sequentialResult.totalConfidence
      };
    }

    // Check for routing decision cache
    const routingResult = this.cache.getRoutingDecision(task, context);
    if (routingResult) {
      this.performanceMonitor.recordCachePerformance(true, 5, this.cache.getStats().memoryUsage);
      return {
        result: routingResult,
        approach: 'routing',
        confidence: routingResult.confidenceInRouting
      };
    }

    this.performanceMonitor.recordCachePerformance(false, 0, this.cache.getStats().memoryUsage);
    return null;
  }

  private async cacheResult(task: string, context: AITaskContext, result: any): Promise<void> {
    if (result.approach === 'sequential-thinking' && result.result) {
      this.cache.cacheSequentialThinking(result.result);
    } else if (result.approach === 'multi-agent-discussion' && result.result) {
      this.cache.cacheDiscussion(result.result);
    }
  }

  /**
   * Event handlers for monitoring
   */
  private setupEventHandlers(): void {
    // Sequential thinking events
    this.sequentialEngine.on('thinking-step', (event) => {
      this.realTimeManager.emit('thinking-step', event);
    });

    // Multi-agent discussion events
    this.discussionEngine.on('agent-response', (event) => {
      this.realTimeManager.emit('agent-response', event);
    });

    // Performance alerts
    this.performanceMonitor.on('alert', (alert) => {
      logger.warn('Performance alert', alert);
      // Could trigger notifications, auto-scaling, etc.
    });

    // Real-time metrics
    this.performanceMonitor.on('real-time-metrics', (metrics) => {
      // Could stream to dashboards
    });
  }

  /**
   * Utility methods
   */
  private extractConfidence(result: any): number {
    if (typeof result === 'object' && result?.confidence !== undefined) {
      return result.confidence;
    }
    if (typeof result === 'object' && result?.totalConfidence !== undefined) {
      return result.totalConfidence;
    }
    if (typeof result === 'object' && result?.confidenceLevel !== undefined) {
      return result.confidenceLevel;
    }
    return 0.7; // Default confidence
  }

  private estimateCost(result: any): number {
    // Simple cost estimation based on approach and complexity
    const baseCost = 0.10;
    const fallbackPenalty = result.fallbackLevel * 0.05;
    const approachMultiplier = {
      'single-agent': 1,
      'sequential-thinking': 2.5,
      'multi-agent-discussion': 3,
      'emergency-template': 0.01
    }[result.approach] || 1;

    return baseCost * approachMultiplier + fallbackPenalty;
  }

  private estimateSequentialThinkingCost(chain: any): number {
    return 0.10 * chain.steps.length;
  }

  private estimateDiscussionCost(discussion: any): number {
    return 0.15 * discussion.rounds.length * discussion.participants.length;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new OrchestrationError(
        'Orchestration service not initialized',
        'NOT_INITIALIZED',
        {},
        false
      );
    }
  }

  /**
   * Public API methods
   */
  
  /**
   * Get comprehensive service status
   */
  getStatus(): {
    initialized: boolean;
    health: 'healthy' | 'degraded' | 'unhealthy';
    components: {
      sequential: boolean;
      discussion: boolean;
      routing: boolean;
      cache: boolean;
      fallback: boolean;
      realTime: boolean;
      monitoring: boolean;
    };
    metrics: any;
    alerts: number;
  } {
    if (!this.isInitialized) {
      return {
        initialized: false,
        health: 'unhealthy',
        components: {
          sequential: false,
          discussion: false,
          routing: false,
          cache: false,
          fallback: false,
          realTime: false,
          monitoring: false
        },
        metrics: {},
        alerts: 0
      };
    }

    const metrics = this.performanceMonitor.getMetrics();
    const alerts = this.performanceMonitor.getAlerts('high').length + 
                   this.performanceMonitor.getAlerts('critical').length;
    
    const successRate = metrics.orchestration.totalExecutions > 0 ? 
      metrics.orchestration.successfulExecutions / metrics.orchestration.totalExecutions : 1;

    const health = alerts > 5 ? 'unhealthy' : 
                   alerts > 2 || successRate < 0.9 ? 'degraded' : 'healthy';

    return {
      initialized: this.isInitialized,
      health,
      components: {
        sequential: !!this.sequentialEngine,
        discussion: !!this.discussionEngine,
        routing: !!this.router,
        cache: !!this.cache,
        fallback: !!this.fallbackManager,
        realTime: !!this.realTimeManager,
        monitoring: !!this.performanceMonitor
      },
      metrics: {
        totalExecutions: metrics.orchestration.totalExecutions,
        successRate: successRate.toFixed(3),
        avgResponseTime: Math.round(metrics.orchestration.averageExecutionTime),
        cacheHitRate: (metrics.caching.hitRate * 100).toFixed(1)
      },
      alerts
    };
  }

  /**
   * Get detailed performance metrics
   */
  getMetrics(): any {
    if (!this.isInitialized) return {};
    return this.performanceMonitor.getMetrics();
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): any {
    if (!this.isInitialized) return {};
    return this.performanceMonitor.generatePerformanceReport();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    if (!this.isInitialized) return {};
    return this.cache.getStats();
  }

  /**
   * Clear all caches
   */
  clearCaches(): void {
    if (this.cache) {
      this.cache.clear();
    }
    if (this.router) {
      this.router.clearHistory();
    }
  }

  /**
   * Shutdown the service gracefully
   */
  async shutdown(): Promise<void> {
    if (!this.isInitialized) return;

    logger.info('Shutting down AI Orchestration Service...');

    // Shutdown components in reverse order
    if (this.performanceMonitor) {
      this.performanceMonitor.shutdown();
    }
    if (this.realTimeManager) {
      this.realTimeManager.shutdown();
    }
    if (this.fallbackManager) {
      this.fallbackManager.shutdown();
    }
    if (this.cache) {
      this.cache.shutdown();
    }
    if (this.contextManager) {
      this.contextManager.shutdown();
    }

    this.isInitialized = false;
    logger.info('AI Orchestration Service shut down complete');
  }
}

// Factory function for easy initialization
export async function createOrchestrationService(
  aiService: AIService,
  config?: Partial<OrchestrationServiceConfig>
): Promise<AIOrchestrationService> {
  const defaultConfig: OrchestrationServiceConfig = {
    orchestration: {
      agents: [],
      routing: {
        defaultApproach: 'single-agent',
        complexityThreshold: 7,
        urgencyThreshold: 8,
        accuracyThreshold: 8,
        consensusThreshold: 0.8
      },
      sequentialThinking: {
        maxSteps: 10,
        confidenceThreshold: 0.8,
        timeoutPerStep: 30000,
        enablePeerReview: true
      },
      multiAgentDiscussion: {
        maxRounds: 5,
        convergenceThreshold: 0.8,
        enableDebate: true,
        requireUnanimous: false
      },
      caching: {
        cacheSequentialChains: true,
        cacheDiscussions: true,
        ttl: 3600
      },
      monitoring: {
        trackPerformance: true,
        logDecisions: true,
        alertOnDisagreements: true
      }
    },
    cache: {
      maxMemorySize: 100 * 1024 * 1024, // 100MB
      maxEntries: 10000,
      defaultTTL: 3600,
      enableCompression: false,
      enablePersistence: false,
      cleanupInterval: 300
    },
    fallback: {
      maxRetries: 3,
      retryDelays: [1000, 2000, 4000],
      enableCircuitBreaker: true,
      circuitBreakerThreshold: 5,
      circuitBreakerResetTime: 60000,
      gracefulDegradation: true,
      emergencyBypass: true,
      fallbackProviderOrder: [AIProvider.ANTHROPIC_CLAUDE, AIProvider.OPENROUTER_GPT_OSS_120B],
      fallbackApproachOrder: ['single-agent', 'sequential-thinking', 'multi-agent-discussion']
    },
    context: {
      enablePersistence: false,
      maxContextAge: 24 * 60 * 60 * 1000, // 24 hours
      maxContextSize: 1000,
      persistToDisk: false,
      encryptSensitiveData: true
    },
    monitoring: {
      metricsRetentionDays: 7,
      alertThresholds: {
        responseTime: 10000, // 10 seconds
        errorRate: 10, // 10%
        accuracy: 0.7, // 70%
        costPerTask: 5.0, // $5 AUD
        cacheHitRate: 50 // 50%
      },
      enableRealTimeMonitoring: true,
      enablePredictiveAnalytics: true,
      aggregationIntervals: {
        realTime: 30, // 30 seconds
        hourly: 3600, // 1 hour
        daily: 86400 // 24 hours
      }
    }
  };

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    orchestration: { ...defaultConfig.orchestration, ...config?.orchestration },
    cache: { ...defaultConfig.cache, ...config?.cache },
    fallback: { ...defaultConfig.fallback, ...config?.fallback },
    context: { ...defaultConfig.context, ...config?.context },
    monitoring: { ...defaultConfig.monitoring, ...config?.monitoring }
  };

  const service = new AIOrchestrationService(aiService, mergedConfig);
  await service.initialize();

  return service;
}

// Export types and classes
export * from './core/types';
export * from './pipelines/sequential-thinking-engine';
export * from './agents/multi-agent-discussion';
export * from './core/intelligent-router';
export * from './fallbacks/fallback-manager';
export * from './templates/disaster-recovery-orchestrator';
export { AIOrchestrationService };