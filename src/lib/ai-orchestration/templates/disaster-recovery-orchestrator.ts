/**
 * Disaster Recovery Specific AI Orchestrator
 * Specialised orchestration for Australian disaster recovery scenarios
 */

import {
  DisasterScenario,
  EmergencyOrchestrationRequest,
  EmergencyOrchestrationResponse,
  AgentPersona,
  OrchestrationError
} from '../core/types';
import { SequentialThinkingEngine } from '../pipelines/sequential-thinking-engine';
import { MultiAgentDiscussionEngine } from '../agents/multi-agent-discussion';
import { IntelligentRouter } from '../core/intelligent-router';
import { FallbackManager } from '../fallbacks/fallback-manager';
import { ContextManager } from '../core/context-manager';
import { RealTimeOrchestrationManager } from '../websocket/real-time-orchestration';
import { AIService } from '@/lib/ai-service';
import { AIProvider, AITaskContext, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';

export interface DisasterRecoveryTemplates {
  emergencyAssessment: {
    sequential: string;
    multiAgent: string;
    singleAgent: string;
  };
  safetyAnalysis: {
    checklist: string[];
    protocols: string[];
    escalationMatrix: string[];
  };
  resourceAllocation: {
    contractors: string;
    equipment: string;
    materials: string;
  };
  insuranceClaims: {
    documentation: string;
    assessment: string;
    negotiation: string;
  };
  stakeholderCommunication: {
    homeowner: string;
    insurance: string;
    contractor: string;
    emergency: string;
  };
}

export interface DisasterSpecificMetrics {
  responseTime: {
    emergency: number;
    urgent: number;
    standard: number;
  };
  accuracyByDisasterType: Record<string, number>;
  successRateByComplexity: Record<string, number>;
  stakeholderSatisfaction: Record<string, number>;
  costEffectiveness: {
    averageCostPerAssessment: number;
    timeToValue: number;
    accuracyVsCost: number;
  };
}

export class DisasterRecoveryOrchestrator {
  private aiService: AIService;
  private sequentialEngine: SequentialThinkingEngine;
  private discussionEngine: MultiAgentDiscussionEngine;
  private router: IntelligentRouter;
  private fallbackManager: FallbackManager;
  private contextManager: ContextManager;
  private realTimeManager: RealTimeOrchestrationManager;
  
  private templates: DisasterRecoveryTemplates;
  private metrics: DisasterSpecificMetrics;

  constructor(
    aiService: AIService,
    engines: {
      sequential: SequentialThinkingEngine;
      discussion: MultiAgentDiscussionEngine;
      router: IntelligentRouter;
      fallback: FallbackManager;
      context: ContextManager;
      realTime: RealTimeOrchestrationManager;
    }
  ) {
    this.aiService = aiService;
    this.sequentialEngine = engines.sequential;
    this.discussionEngine = engines.discussion;
    this.router = engines.router;
    this.fallbackManager = engines.fallback;
    this.contextManager = engines.context;
    this.realTimeManager = engines.realTime;
    
    this.initializeTemplates();
    this.initializeMetrics();

    logger.info('Disaster Recovery Orchestrator initialized');
  }

  /**
   * Main orchestration method for emergency scenarios
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
    const startTime = Date.now();
    const contextId = this.contextManager.createContext(
      `Emergency Response: ${request.scenario.type} at ${request.scenario.location.address}`,
      this.buildTaskContext(request),
      options?.forceApproach || 'auto-route',
      {
        userId: options?.userId,
        sessionId: options?.sessionId,
        tags: [request.scenario.type, `severity-${request.scenario.severity}`, request.urgency]
      }
    );

    // Create real-time session if requested
    let realTimeSessionId: string | undefined;
    if (options?.enableRealTime) {
      realTimeSessionId = this.realTimeManager.createSession(
        'hybrid',
        {
          taskType: 'disaster-response',
          priority: this.mapUrgencyToPriority(request.urgency),
          emergency: request.urgency === 'immediate',
          userId: options.userId
        }
      );
    }

    try {
      // Update context with real-time session
      if (realTimeSessionId) {
        this.contextManager.updateProgress(contextId, {
          stage: 'Initializing Real-time Monitoring',
          percentage: 5,
          currentActivity: 'Setting up real-time updates'
        });
      }

      // Route the request to optimal approach
      const routingDecision = await this.router.makeRoutingDecision(
        this.buildTaskDescription(request),
        this.buildTaskContext(request),
        {
          forceApproach: options?.forceApproach,
          maxTime: request.constraints.maxTime * 60 * 1000, // Convert to milliseconds
          maxCost: request.constraints.maxCost
        }
      );

      logger.info('Emergency routing decision made', {
        approach: routingDecision.recommendedApproach,
        confidence: routingDecision.confidenceInRouting,
        estimatedTime: routingDecision.estimatedTime,
        scenario: request.scenario.type
      });

      // Execute orchestrated response with fallback protection
      const orchestrationResult = await this.fallbackManager.executeWithFallback(
        routingDecision.recommendedApproach,
        {
          task: this.buildTaskDescription(request),
          context: this.buildTaskContext(request),
          primaryAgent: routingDecision.primaryAgent,
          participants: routingDecision.supportingAgents,
          options: {
            maxTime: request.constraints.maxTime * 60 * 1000,
            realTimeSessionId,
            contextId
          }
        }
      );

      if (!orchestrationResult.success) {
        throw new OrchestrationError(
          'Emergency orchestration failed',
          'EMERGENCY_ORCHESTRATION_FAILED',
          { request, result: orchestrationResult }
        );
      }

      // Process and structure the response
      const response = await this.buildEmergencyResponse(
        request,
        orchestrationResult.result,
        {
          approach: orchestrationResult.approach,
          processingTime: Date.now() - startTime,
          confidence: this.calculateResponseConfidence(orchestrationResult.result),
          fallbackLevel: orchestrationResult.fallbackLevel,
          contextId
        }
      );

      // Update context with final result
      this.contextManager.setFinalResult(contextId, {
        content: JSON.stringify(response),
        confidence: response.confidence,
        approach: orchestrationResult.approach,
        processingTime: Date.now() - startTime,
        cost: this.estimateCost(orchestrationResult),
        metadata: { scenario: request.scenario, urgency: request.urgency }
      });

      // Close real-time session
      if (realTimeSessionId) {
        this.realTimeManager.closeSession(realTimeSessionId);
      }

      logger.info('Emergency orchestration completed', {
        scenario: request.scenario.type,
        approach: orchestrationResult.approach,
        processingTime: Date.now() - startTime,
        confidence: response.confidence
      });

      return response;

    } catch (error) {
      logger.error('Emergency orchestration failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        contextId,
        scenario: request.scenario.type
      });

      // Close real-time session on error
      if (realTimeSessionId) {
        this.realTimeManager.closeSession(realTimeSessionId);
      }

      throw error;
    }
  }

  /**
   * Specialised damage assessment orchestration
   */
  async orchestrateDamageAssessment(
    scenario: DisasterScenario,
    images?: string[],
    options?: {
      includeStructuralAnalysis?: boolean;
      includeCostEstimation?: boolean;
      includeTimelineProjection?: boolean;
      accuracyLevel?: 'standard' | 'high' | 'critical';
    }
  ): Promise<{
    assessment: any;
    confidence: number;
    methodology: string;
    recommendations: string[];
    nextSteps: string[];
  }> {
    const taskDescription = this.buildDamageAssessmentTask(scenario, images, options);
    const context = this.buildDamageAssessmentContext(scenario, options?.accuracyLevel);

    // Use sequential thinking for complex damage assessments
    if (scenario.severity >= 3 || options?.includeStructuralAnalysis) {
      const chain = await this.sequentialEngine.startThinkingChain(
        taskDescription,
        context,
        {
          maxSteps: 8,
          primaryAgent: AgentPersona.TECHNICAL_EXPERT,
          requirePeerReview: options?.accuracyLevel === 'critical'
        }
      );

      return this.processDamageAssessmentChain(chain, scenario);
    }

    // Use multi-agent discussion for complex stakeholder scenarios
    if (this.hasMultipleStakeholders(scenario)) {
      const discussion = await this.discussionEngine.startDiscussion(
        taskDescription,
        context,
        {
          participants: [
            AgentPersona.TECHNICAL_EXPERT,
            AgentPersona.SAFETY_INSPECTOR,
            AgentPersona.COST_ANALYST
          ],
          maxRounds: 3,
          consensusThreshold: 0.8
        }
      );

      return this.processDamageAssessmentDiscussion(discussion, scenario);
    }

    // Single agent for simpler assessments
    const singleAgentResponse = await this.aiService.generateResponse(
      [
        {
          role: 'system',
          content: this.templates.emergencyAssessment.singleAgent
        },
        {
          role: 'user',
          content: taskDescription
        }
      ],
      context,
      {
        preferredProvider: AIProvider.OPENROUTER_GPT_OSS_120B
      }
    );

    return this.processSingleAgentDamageAssessment(singleAgentResponse, scenario);
  }

  /**
   * Insurance claim analysis orchestration
   */
  async orchestrateInsuranceClaimAnalysis(
    scenario: DisasterScenario,
    claimDetails: {
      policyNumber: string;
      coverageTypes: string[];
      deductible: number;
      claimAmount: number;
      documentation: string[];
    },
    options?: {
      includeNegotiationStrategy?: boolean;
      prioritizeSpeed?: boolean;
      maximizeSettlement?: boolean;
    }
  ): Promise<{
    analysis: {
      coverageAssessment: any;
      documentationGaps: string[];
      estimatedSettlement: { min: number; max: number; };
      negotiationPoints: string[];
      timeline: any;
    };
    strategy: {
      approach: string;
      keyArguments: string[];
      supportingEvidence: string[];
      fallbackOptions: string[];
    };
    confidence: number;
  }> {
    const taskDescription = this.buildInsuranceClaimTask(scenario, claimDetails, options);
    const context: AITaskContext = {
      type: AITaskType.BUSINESS_ANALYTICS,
      priority: options?.prioritizeSpeed ? 'high' : 'medium',
      maxResponseTime: options?.prioritizeSpeed ? 60000 : 300000,
      accuracyRequired: options?.maximizeSettlement ? 'critical' : 'high',
      costSensitive: false,
      userContext: {
        sessionId: `insurance-${Date.now()}`,
        emergency: false
      }
    };

    // Use multi-agent discussion for insurance claims (multiple perspectives needed)
    const discussion = await this.discussionEngine.startDiscussion(
      taskDescription,
      context,
      {
        participants: [
          AgentPersona.COST_ANALYST,
          AgentPersona.TECHNICAL_EXPERT,
          AgentPersona.QUALITY_AUDITOR
        ],
        maxRounds: 4,
        consensusThreshold: 0.75,
        enableDebate: true
      }
    );

    return this.processInsuranceClaimDiscussion(discussion, claimDetails);
  }

  /**
   * Resource allocation optimisation
   */
  async orchestrateResourceAllocation(
    scenario: DisasterScenario,
    availableResources: {
      contractors: Array<{
        id: string;
        specializations: string[];
        availability: string;
        location: string;
        capacity: number;
        rating: number;
      }>;
      equipment: Array<{
        type: string;
        availability: string;
        location: string;
        dailyCost: number;
      }>;
      timeline: {
        startDate: Date;
        urgency: 'immediate' | 'urgent' | 'standard';
        constraints: string[];
      };
    }
  ): Promise<{
    allocation: {
      contractors: any[];
      equipment: any[];
      timeline: any;
      totalCost: { min: number; max: number; };
    };
    optimisation: {
      efficiency: number;
      costEffectiveness: number;
      timeToCompletion: number;
      riskMitigation: number;
    };
    alternatives: any[];
    confidence: number;
  }> {
    const taskDescription = this.buildResourceAllocationTask(scenario, availableResources);
    const context: AITaskContext = {
      type: AITaskType.CONTRACTOR_MATCHING,
      priority: this.mapTimelineToPriority(availableResources.timeline.urgency),
      maxResponseTime: 180000,
      accuracyRequired: 'high',
      costSensitive: true
    };

    // Use sequential thinking for complex resource optimisation
    const chain = await this.sequentialEngine.startThinkingChain(
      taskDescription,
      context,
      {
        maxSteps: 6,
        primaryAgent: AgentPersona.COST_ANALYST,
        requirePeerReview: true
      }
    );

    return this.processResourceAllocationChain(chain, availableResources);
  }

  /**
   * Template builders and processors
   */
  private buildTaskDescription(request: EmergencyOrchestrationRequest): string {
    return `EMERGENCY DISASTER RESPONSE REQUIRED

Disaster Type: ${request.scenario.type.toUpperCase()}
Severity Level: ${request.scenario.severity}/5
Location: ${request.scenario.location.address}
Property Type: ${request.scenario.propertyType}

Incident Details:
- Affected Area: ${request.scenario.affectedArea} sqm
- Time of Incident: ${request.scenario.timeOfIncident.toISOString()}
- Occupancy Status: ${request.scenario.occupancyStatus}
- Weather Conditions: ${request.scenario.weatherConditions || 'Not specified'}

Utilities Status:
- Power: ${request.scenario.utilitiesStatus.power ? 'ON' : 'OFF'}
- Water: ${request.scenario.utilitiesStatus.water ? 'ON' : 'OFF'}
- Gas: ${request.scenario.utilitiesStatus.gas ? 'ON' : 'OFF'}
- Internet: ${request.scenario.utilitiesStatus.internet ? 'ON' : 'OFF'}

Required Analysis: ${request.requiredAnalysis.join(', ')}
Urgency Level: ${request.urgency.toUpperCase()}
Stakeholders: ${request.stakeholders.join(', ')}

Constraints:
- Maximum Response Time: ${request.constraints.maxTime} minutes
- Maximum Cost: $${request.constraints.maxCost} AUD
- Minimum Confidence: ${request.constraints.minConfidence * 100}%

Please provide comprehensive disaster recovery guidance addressing all required analysis areas while respecting the constraints and urgency level.`;
  }

  private buildTaskContext(request: EmergencyOrchestrationRequest): AITaskContext {
    const taskTypeMap = {
      safety: AITaskType.SAFETY_ANALYSIS,
      damage: AITaskType.DAMAGE_ASSESSMENT,
      cost: AITaskType.BUSINESS_ANALYTICS,
      timeline: AITaskType.ESTIMATE_GENERATION,
      resources: AITaskType.CONTRACTOR_MATCHING
    };

    // Primary task type based on most critical analysis needed
    const primaryAnalysis = request.requiredAnalysis[0];
    const taskType = taskTypeMap[primaryAnalysis] || AITaskType.DAMAGE_ASSESSMENT;

    return {
      type: taskType,
      priority: this.mapUrgencyToPriority(request.urgency),
      maxResponseTime: request.constraints.maxTime * 60 * 1000,
      accuracyRequired: request.constraints.minConfidence >= 0.9 ? 'critical' : 
                        request.constraints.minConfidence >= 0.7 ? 'high' : 'standard',
      costSensitive: request.constraints.maxCost < 1000,
      userContext: {
        emergency: request.urgency === 'immediate',
        location: request.scenario.location.address,
        sessionId: `disaster-${Date.now()}`
      }
    };
  }

  private async buildEmergencyResponse(
    request: EmergencyOrchestrationRequest,
    orchestrationResult: any,
    metadata: {
      approach: string;
      processingTime: number;
      confidence: number;
      fallbackLevel: number;
      contextId: string;
    }
  ): Promise<EmergencyOrchestrationResponse> {
    // Parse and structure the orchestration result
    const parsedResult = this.parseOrchestrationResult(orchestrationResult, request);

    return {
      assessmentId: metadata.contextId,
      approach: metadata.approach as any,
      timeline: {
        estimatedCompletion: new Date(Date.now() + this.estimateCompletionTime(request)),
        milestones: this.generateMilestones(request, parsedResult)
      },
      safety: this.extractSafetyInfo(parsedResult, request),
      damage: this.extractDamageInfo(parsedResult, request),
      resources: this.extractResourceInfo(parsedResult, request),
      cost: this.extractCostInfo(parsedResult, request),
      recommendations: this.extractRecommendations(parsedResult),
      confidence: metadata.confidence,
      reasoning: {
        chainId: metadata.approach === 'sequential-thinking' ? orchestrationResult.chainId : undefined,
        discussionId: metadata.approach === 'multi-agent-discussion' ? orchestrationResult.discussionId : undefined,
        keyFactors: this.extractKeyFactors(parsedResult),
        assumptions: this.extractAssumptions(parsedResult),
        uncertainties: this.extractUncertainties(parsedResult)
      }
    };
  }

  /**
   * Helper methods for processing results
   */
  private parseOrchestrationResult(result: any, request: EmergencyOrchestrationRequest): any {
    // Implementation would parse different result formats based on orchestration approach
    if (typeof result === 'string') {
      return { content: result, metadata: {} };
    }
    
    return result;
  }

  private extractSafetyInfo(result: any, request: EmergencyOrchestrationRequest): any {
    // Extract safety-related information from the result
    const defaultSafety = {
      immediateHazards: this.getDefaultHazards(request.scenario),
      requiredPPE: this.getDefaultPPE(request.scenario),
      evacuationRecommended: request.scenario.severity >= 4,
      emergencyServices: request.urgency === 'immediate'
    };

    // Parse safety info from result content if available
    if (result.content) {
      const safetyMatch = result.content.match(/SAFETY[:\s]*([\s\S]*?)(?=\n[A-Z]+:|$)/i);
      if (safetyMatch) {
        return this.parseSafetyContent(safetyMatch[1], defaultSafety);
      }
    }

    return defaultSafety;
  }

  private extractDamageInfo(result: any, request: EmergencyOrchestrationRequest): any {
    return {
      categories: {
        structural: Math.min(request.scenario.severity, 5),
        water: request.scenario.type === 'flood' ? Math.min(request.scenario.severity, 5) : 1,
        fire: request.scenario.type === 'fire' ? Math.min(request.scenario.severity, 5) : 1,
        mould: request.scenario.type === 'flood' ? Math.min(request.scenario.severity - 1, 5) : 1,
        contamination: request.scenario.type === 'sewage' ? Math.min(request.scenario.severity, 5) : 1
      },
      totalScore: request.scenario.severity,
      description: `${request.scenario.type} damage to ${request.scenario.propertyType} property`
    };
  }

  private extractResourceInfo(result: any, request: EmergencyOrchestrationRequest): any {
    return {
      contractors: this.generateContractorRequirements(request.scenario),
      equipment: this.generateEquipmentRequirements(request.scenario),
      materials: this.generateMaterialRequirements(request.scenario)
    };
  }

  private extractCostInfo(result: any, request: EmergencyOrchestrationRequest): any {
    const baseCost = this.calculateBaseCost(request.scenario);
    const multiplier = 1 + (request.scenario.severity - 1) * 0.5;
    
    return {
      emergency: { 
        min: Math.round(baseCost * 0.2 * multiplier), 
        max: Math.round(baseCost * 0.4 * multiplier) 
      },
      restoration: { 
        min: Math.round(baseCost * 0.8 * multiplier), 
        max: Math.round(baseCost * 1.5 * multiplier) 
      },
      temporary: { 
        min: Math.round(baseCost * 0.1 * multiplier), 
        max: Math.round(baseCost * 0.3 * multiplier) 
      },
      total: { 
        min: Math.round(baseCost * multiplier), 
        max: Math.round(baseCost * 2 * multiplier) 
      },
      currency: 'AUD' as const,
      confidence: 0.7
    };
  }

  private extractRecommendations(result: any): {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  } {
    return {
      immediate: [
        'Ensure immediate safety of all occupants',
        'Document damage with photographs',
        'Contact insurance provider',
        'Secure property if safe to do so'
      ],
      shortTerm: [
        'Obtain professional damage assessment',
        'Begin emergency repairs if necessary',
        'Coordinate with contractors',
        'Set up temporary accommodations if needed'
      ],
      longTerm: [
        'Complete full restoration work',
        'Implement prevention measures',
        'Review and update insurance coverage',
        'Document lessons learned'
      ]
    };
  }

  private extractKeyFactors(result: any): string[] {
    return [
      'Severity of disaster',
      'Property type and construction',
      'Time elapsed since incident',
      'Weather conditions',
      'Availability of utilities'
    ];
  }

  private extractAssumptions(result: any): string[] {
    return [
      'Property structure is salvageable',
      'Standard repair methods are applicable',
      'Contractors are available within reasonable timeframe',
      'Insurance coverage is adequate'
    ];
  }

  private extractUncertainties(result: any): string[] {
    return [
      'Hidden structural damage',
      'Long-term effects of water damage',
      'Availability of specialised contractors',
      'Final insurance settlement amount'
    ];
  }

  /**
   * Utility methods
   */
  private mapUrgencyToPriority(urgency: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (urgency) {
      case 'immediate': return 'critical';
      case 'urgent': return 'high';
      case 'standard': return 'medium';
      default: return 'medium';
    }
  }

  private mapTimelineToPriority(timeline: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (timeline) {
      case 'immediate': return 'critical';
      case 'urgent': return 'high';
      case 'standard': return 'medium';
      default: return 'medium';
    }
  }

  private calculateResponseConfidence(result: any): number {
    // Calculate confidence based on result characteristics
    if (result.confidence !== undefined) {
      return result.confidence;
    }
    
    // Default confidence calculation
    let confidence = 0.7;
    
    if (result.approach === 'sequential-thinking') confidence += 0.1;
    if (result.approach === 'multi-agent-discussion') confidence += 0.05;
    if (result.fallbackLevel === 0) confidence += 0.1;
    
    return Math.min(confidence, 0.95);
  }

  private estimateCompletionTime(request: EmergencyOrchestrationRequest): number {
    const baseTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const severityMultiplier = request.scenario.severity;
    const urgencyMultiplier = request.urgency === 'immediate' ? 0.5 : 1;
    
    return baseTime * severityMultiplier * urgencyMultiplier;
  }

  private generateMilestones(request: EmergencyOrchestrationRequest, result: any): any[] {
    return [
      {
        name: 'Safety Assessment Complete',
        expectedTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        dependencies: []
      },
      {
        name: 'Emergency Stabilization',
        expectedTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        dependencies: ['Safety Assessment Complete']
      },
      {
        name: 'Full Damage Assessment',
        expectedTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        dependencies: ['Emergency Stabilization']
      },
      {
        name: 'Restoration Planning',
        expectedTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
        dependencies: ['Full Damage Assessment']
      }
    ];
  }

  private getDefaultHazards(scenario: DisasterScenario): string[] {
    const hazardMap = {
      flood: ['Water contamination', 'Electrical hazards', 'Structural instability', 'Mould growth'],
      fire: ['Smoke inhalation', 'Structural weakness', 'Toxic residues', 'Heat damage'],
      storm: ['Falling debris', 'Electrical hazards', 'Structural damage', 'Glass fragments'],
      earthquake: ['Structural collapse', 'Gas leaks', 'Electrical hazards', 'Aftershocks'],
      mould: ['Respiratory hazards', 'Toxic exposure', 'Structural deterioration'],
      sewage: ['Biological contamination', 'Chemical hazards', 'Disease vectors'],
      biohazard: ['Biological contamination', 'Chemical exposure', 'Infectious agents']
    };
    
    return hazardMap[scenario.type] || ['General property damage', 'Potential safety hazards'];
  }

  private getDefaultPPE(scenario: DisasterScenario): string[] {
    const ppeMap = {
      flood: ['Waterproof boots', 'Rubber gloves', 'N95 masks', 'Eye protection'],
      fire: ['Hard hat', 'Safety glasses', 'Respirator', 'Heat-resistant gloves'],
      storm: ['Hard hat', 'Safety boots', 'Eye protection', 'High-visibility clothing'],
      earthquake: ['Hard hat', 'Safety boots', 'First aid kit'],
      mould: ['N95 respirator', 'Protective clothing', 'Rubber gloves', 'Eye protection'],
      sewage: ['Full body protection', 'Respirator', 'Chemical-resistant gloves', 'Waterproof boots'],
      biohazard: ['Full hazmat suit', 'Respirator', 'Chemical-resistant gloves', 'Decontamination supplies']
    };
    
    return ppeMap[scenario.type] || ['Basic safety equipment', 'Protective clothing'];
  }

  private calculateBaseCost(scenario: DisasterScenario): number {
    const baseCosts = {
      flood: 15000,
      fire: 25000,
      storm: 12000,
      earthquake: 35000,
      mould: 8000,
      sewage: 18000,
      biohazard: 30000
    };
    
    const baseCost = baseCosts[scenario.type] || 15000;
    const areaMultiplier = Math.max(1, scenario.affectedArea / 100);
    const propertyMultiplier = scenario.propertyType === 'commercial' ? 1.5 : 1;
    
    return baseCost * areaMultiplier * propertyMultiplier;
  }

  private generateContractorRequirements(scenario: DisasterScenario): any[] {
    return [
      {
        type: 'Water Damage Specialist',
        quantity: 1,
        urgency: 'immediate' as const
      },
      {
        type: 'Structural Engineer',
        quantity: 1,
        urgency: '24h' as const
      },
      {
        type: 'General Restoration Contractor',
        quantity: 1,
        urgency: 'week' as const
      }
    ];
  }

  private generateEquipmentRequirements(scenario: DisasterScenario): any[] {
    return [
      {
        type: 'Dehumidifier',
        quantity: 2,
        duration: 7
      },
      {
        type: 'Air Scrubber',
        quantity: 1,
        duration: 5
      },
      {
        type: 'Generator',
        quantity: 1,
        duration: 3
      }
    ];
  }

  private generateMaterialRequirements(scenario: DisasterScenario): any[] {
    return [
      {
        type: 'Drywall',
        quantity: '20 sheets',
        supplier: 'Local building supply'
      },
      {
        type: 'Insulation',
        quantity: '500 sq ft',
        supplier: 'Insulation contractor'
      },
      {
        type: 'Flooring',
        quantity: '300 sq ft',
        supplier: 'Flooring specialist'
      }
    ];
  }

  // Additional helper methods would be implemented here...
  private hasMultipleStakeholders(scenario: DisasterScenario): boolean {
    return scenario.propertyType === 'commercial' || scenario.severity >= 4;
  }

  private estimateCost(result: any): number {
    return result.fallbackLevel * 0.10 + 0.50; // Base cost with fallback penalty
  }

  private initializeTemplates(): void {
    this.templates = {
      emergencyAssessment: {
        sequential: "You are conducting a step-by-step emergency assessment...",
        multiAgent: "You are participating in an emergency consultation...",
        singleAgent: "You are providing emergency disaster recovery guidance..."
      },
      safetyAnalysis: {
        checklist: ["Structural integrity", "Electrical safety", "Water contamination"],
        protocols: ["Evacuation procedures", "PPE requirements", "Emergency contacts"],
        escalationMatrix: ["Minor hazards", "Moderate risks", "Severe dangers", "Life-threatening situations"]
      },
      resourceAllocation: {
        contractors: "Optimise contractor assignment based on specialisation, availability, and location...",
        equipment: "Allocate equipment based on priority, efficiency, and cost-effectiveness...",
        materials: "Prioritize material procurement based on timeline and availability..."
      },
      insuranceClaims: {
        documentation: "Ensure comprehensive documentation for insurance claims...",
        assessment: "Provide detailed damage assessment for insurance purposes...",
        negotiation: "Develop negotiation strategy for optimal insurance settlement..."
      },
      stakeholderCommunication: {
        homeowner: "Clear, empathetic communication focusing on immediate actions...",
        insurance: "Professional, detailed communication with supporting evidence...",
        contractor: "Technical specifications and timeline expectations...",
        emergency: "Urgent, concise communication prioritizing immediate safety..."
      }
    };
  }

  private initializeMetrics(): void {
    this.metrics = {
      responseTime: {
        emergency: 0,
        urgent: 0,
        standard: 0
      },
      accuracyByDisasterType: {},
      successRateByComplexity: {},
      stakeholderSatisfaction: {},
      costEffectiveness: {
        averageCostPerAssessment: 0,
        timeToValue: 0,
        accuracyVsCost: 0
      }
    };
  }

  // Placeholder methods for complex processing
  private buildDamageAssessmentTask(scenario: DisasterScenario, images?: string[], options?: any): string {
    return `Damage assessment for ${scenario.type} at ${scenario.location.address}`;
  }

  private buildDamageAssessmentContext(scenario: DisasterScenario, accuracy?: string): AITaskContext {
    return {
      type: AITaskType.DAMAGE_ASSESSMENT,
      priority: 'high',
      maxResponseTime: 300000,
      accuracyRequired: accuracy as any || 'high',
      costSensitive: false
    };
  }

  private buildInsuranceClaimTask(scenario: DisasterScenario, details: any, options?: any): string {
    return `Insurance claim analysis for ${scenario.type} damage`;
  }

  private buildResourceAllocationTask(scenario: DisasterScenario, resources: any): string {
    return `Resource allocation optimisation for ${scenario.type} recovery`;
  }

  private parseSafetyContent(content: string, defaultSafety: any): any {
    // Parse safety information from content
    return defaultSafety;
  }

  // Placeholder processing methods
  private processDamageAssessmentChain(chain: any, scenario: DisasterScenario): any {
    return {
      assessment: {},
      confidence: chain.totalConfidence,
      methodology: 'sequential-thinking',
      recommendations: [],
      nextSteps: []
    };
  }

  private processDamageAssessmentDiscussion(discussion: any, scenario: DisasterScenario): any {
    return {
      assessment: {},
      confidence: discussion.confidenceLevel,
      methodology: 'multi-agent-discussion',
      recommendations: [],
      nextSteps: []
    };
  }

  private processSingleAgentDamageAssessment(response: any, scenario: DisasterScenario): any {
    return {
      assessment: {},
      confidence: 0.8,
      methodology: 'single-agent',
      recommendations: [],
      nextSteps: []
    };
  }

  private processInsuranceClaimDiscussion(discussion: any, details: any): any {
    return {
      analysis: {
        coverageAssessment: {},
        documentationGaps: [],
        estimatedSettlement: { min: 0, max: 0 },
        negotiationPoints: [],
        timeline: {}
      },
      strategy: {
        approach: '',
        keyArguments: [],
        supportingEvidence: [],
        fallbackOptions: []
      },
      confidence: discussion.confidenceLevel
    };
  }

  private processResourceAllocationChain(chain: any, resources: any): any {
    return {
      allocation: {
        contractors: [],
        equipment: [],
        timeline: {},
        totalCost: { min: 0, max: 0 }
      },
      optimisation: {
        efficiency: 0,
        costEffectiveness: 0,
        timeToCompletion: 0,
        riskMitigation: 0
      },
      alternatives: [],
      confidence: chain.totalConfidence
    };
  }

  /**
   * Public metrics and monitoring
   */
  getMetrics(): DisasterSpecificMetrics {
    return { ...this.metrics };
  }

  updateMetrics(scenario: DisasterScenario, response: any, processingTime: number): void {
    // Update response time metrics
    if (scenario.severity >= 4) {
      this.metrics.responseTime.emergency = 
        (this.metrics.responseTime.emergency + processingTime) / 2;
    } else if (scenario.severity >= 3) {
      this.metrics.responseTime.urgent = 
        (this.metrics.responseTime.urgent + processingTime) / 2;
    } else {
      this.metrics.responseTime.standard = 
        (this.metrics.responseTime.standard + processingTime) / 2;
    }

    // Update accuracy by disaster type
    this.metrics.accuracyByDisasterType[scenario.type] = 
      ((this.metrics.accuracyByDisasterType[scenario.type] || 0) + response.confidence) / 2;
  }
}