/**
 * Fallback Manager for AI Orchestration
 * Handles failures, downgrades, and recovery strategies across different orchestration approaches
 */

import {
  OrchestrationError,
  FailureRecoveryStrategy,
  AgentPersona,
  SequentialThinkingChain,
  Discussion
} from '../core/types';
import { AIService } from '@/lib/ai-service';
import { AIProvider, AIMessage, AITaskContext, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';

export interface FallbackConfig {
  maxRetries: number;
  retryDelays: number[]; // milliseconds for each retry attempt
  enableCircuitBreaker: boolean;
  circuitBreakerThreshold: number; // failures before opening circuit
  circuitBreakerResetTime: number; // milliseconds
  gracefulDegradation: boolean;
  emergencyBypass: boolean; // Skip complex orchestration in emergencies
  fallbackProviderOrder: AIProvider[];
  fallbackApproachOrder: ('single-agent' | 'sequential-thinking' | 'multi-agent-discussion')[];
}

export interface CircuitBreakerState {
  isOpen: boolean;
  failures: number;
  lastFailure: Date;
  nextRetryTime: Date;
  totalRequests: number;
  successfulRequests: number;
}

export interface FallbackResult {
  success: boolean;
  result?: any;
  approach: string;
  provider?: AIProvider;
  fallbackLevel: number;
  processingTime: number;
  originalError?: string;
  fallbackReason: string;
}

export class FallbackManager extends EventEmitter {
  private aiService: AIService;
  private config: FallbackConfig;
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private recoveryStrategies: Map<string, FailureRecoveryStrategy> = new Map();
  private fallbackHistory: Array<{
    timestamp: Date;
    originalApproach: string;
    fallbackApproach: string;
    success: boolean;
    reason: string;
  }> = [];

  constructor(aiService: AIService, config: FallbackConfig) {
    super();
    this.aiService = aiService;
    this.config = config;
    this.initializeCircuitBreakers();
    this.initializeRecoveryStrategies();

    logger.info('Fallback manager initialized', {
      maxRetries: config.maxRetries,
      circuitBreakerEnabled: config.enableCircuitBreaker,
      gracefulDegradation: config.gracefulDegradation
    });
  }

  /**
   * Execute orchestration with comprehensive fallback support
   */
  async executeWithFallback(
    operation: 'sequential-thinking' | 'multi-agent-discussion' | 'single-agent',
    params: {
      task: string;
      context: AITaskContext;
      primaryAgent?: AgentPersona;
      participants?: AgentPersona[];
      options?: any;
    }
  ): Promise<FallbackResult> {
    const startTime = Date.now();
    const operationKey = `${operation}_${params.context.type}`;
    
    // Check circuit breaker
    if (this.isCircuitBreakerOpen(operationKey)) {
      logger.warn('Circuit breaker is open, using emergency fallback', {
        operation,
        circuitBreaker: operationKey
      });
      
      return this.executeEmergencyFallback(params, startTime);
    }

    // Attempt original operation with retries
    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        const result = await this.executeOperation(operation, params);
        
        // Success - reset circuit breaker
        this.recordSuccess(operationKey);
        
        return {
          success: true,
          result,
          approach: operation,
          fallbackLevel: 0,
          processingTime: Date.now() - startTime,
          fallbackReason: 'No fallback needed'
        };
        
      } catch (error) {
        this.recordFailure(operationKey, error);
        
        logger.warn('Operation failed, attempting recovery', {
          operation,
          attempt,
          error: error instanceof Error ? error.message : 'Unknown error',
          remainingAttempts: this.config.maxRetries - attempt
        });
        
        // Check if error is retryable
        if (!this.isRetryableError(error)) {
          logger.error('Non-retryable error encountered', { error });
          break;
        }
        
        // Wait before retry (exponential backoff)
        if (attempt < this.config.maxRetries) {
          const delay = this.config.retryDelays[Math.min(attempt - 1, this.config.retryDelays.length - 1)];
          await this.delay(delay);
        }
      }
    }

    // Original operation failed, try fallbacks
    return this.executeFallbackChain(operation, params, startTime);
  }

  /**
   * Execute fallback chain with progressive degradation
   */
  private async executeFallbackChain(
    originalOperation: string,
    params: any,
    startTime: number
  ): Promise<FallbackResult> {
    const fallbackChain = this.buildFallbackChain(originalOperation, params.context);
    
    for (let i = 0; i < fallbackChain.length; i++) {
      const fallbackApproach = fallbackChain[i];
      
      logger.info('Attempting fallback approach', {
        originalOperation,
        fallbackApproach,
        fallbackLevel: i + 1
      });

      try {
        const result = await this.executeFallbackApproach(fallbackApproach, params);
        
        // Record successful fallback
        this.recordFallbackSuccess(originalOperation, fallbackApproach);
        
        return {
          success: true,
          result,
          approach: fallbackApproach.type,
          provider: fallbackApproach.provider,
          fallbackLevel: i + 1,
          processingTime: Date.now() - startTime,
          fallbackReason: fallbackApproach.reason
        };
        
      } catch (error) {
        logger.warn('Fallback approach failed', {
          approach: fallbackApproach.type,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        // Continue to next fallback
      }
    }

    // All fallbacks failed - emergency response
    return this.executeEmergencyFallback(params, startTime);
  }

  /**
   * Build intelligent fallback chain based on original operation and context
   */
  private buildFallbackChain(
    originalOperation: string,
    context: AITaskContext
  ): Array<{
    type: string;
    provider?: AIProvider;
    reason: string;
    parameters?: any;
  }> {
    const fallbacks: Array<{
      type: string;
      provider?: AIProvider;
      reason: string;
      parameters?: any;
    }> = [];

    // Emergency bypass for critical situations
    if (context.userContext?.emergency || context.priority === 'critical') {
      fallbacks.push({
        type: 'single-agent-emergency',
        provider: AIProvider.ANTHROPIC_CLAUDE, // Fastest available
        reason: 'Emergency bypass - prioritizing speed'
      });
    }

    // Intelligent degradation based on original operation
    switch (originalOperation) {
      case 'sequential-thinking':
        // Try simpler sequential thinking first
        fallbacks.push({
          type: 'simplified-sequential-thinking',
          provider: AIProvider.OPENROUTER_GPT_OSS_120B,
          reason: 'Simplified sequential thinking with fewer steps',
          parameters: { maxSteps: 3, timeoutPerStep: 15000 }
        });
        
        // Then try multi-agent with fewer participants
        fallbacks.push({
          type: 'limited-multi-agent-discussion',
          provider: AIProvider.OPENROUTER_GPT_OSS_120B,
          reason: 'Limited multi-agent discussion with core agents only',
          parameters: { maxParticipants: 2, maxRounds: 2 }
        });
        
        // Finally single agent
        fallbacks.push({
          type: 'single-agent',
          provider: AIProvider.OPENROUTER_GPT_OSS_120B,
          reason: 'Single agent fallback'
        });
        break;

      case 'multi-agent-discussion':
        // Try sequential thinking as fallback
        fallbacks.push({
          type: 'sequential-thinking',
          provider: AIProvider.OPENROUTER_GPT_OSS_120B,
          reason: 'Sequential thinking as alternative to discussion'
        });
        
        // Then limited discussion
        fallbacks.push({
          type: 'limited-multi-agent-discussion',
          provider: AIProvider.ANTHROPIC_CLAUDE,
          reason: 'Limited discussion with faster provider',
          parameters: { maxParticipants: 2, maxRounds: 2 }
        });
        
        // Finally single agent
        fallbacks.push({
          type: 'single-agent',
          provider: AIProvider.ANTHROPIC_CLAUDE,
          reason: 'Single agent fallback'
        });
        break;

      case 'single-agent':
        // Try different providers
        for (const provider of this.config.fallbackProviderOrder) {
          fallbacks.push({
            type: 'single-agent',
            provider,
            reason: `Alternative provider: ${provider}`
          });
        }
        break;
    }

    // Add provider fallbacks for each approach
    if (fallbacks.length < 3) {
      for (const provider of this.config.fallbackProviderOrder) {
        fallbacks.push({
          type: 'single-agent',
          provider,
          reason: `Provider fallback: ${provider}`
        });
      }
    }

    return fallbacks.slice(0, 5); // Limit to 5 fallback attempts
  }

  /**
   * Execute specific fallback approach
   */
  private async executeFallbackApproach(
    fallback: {
      type: string;
      provider?: AIProvider;
      reason: string;
      parameters?: any;
    },
    params: any
  ): Promise<any> {
    switch (fallback.type) {
      case 'single-agent-emergency':
        return this.executeSingleAgentEmergency(params, fallback.provider!);
      
      case 'simplified-sequential-thinking':
        return this.executeSimplifiedSequentialThinking(params, fallback.parameters);
      
      case 'limited-multi-agent-discussion':
        return this.executeLimitedMultiAgentDiscussion(params, fallback.parameters);
      
      case 'single-agent':
        return this.executeSingleAgent(params, fallback.provider);
      
      case 'sequential-thinking':
        return this.executeOperation('sequential-thinking', params);
      
      default:
        throw new OrchestrationError(
          `Unknown fallback type: ${fallback.type}`,
          'UNKNOWN_FALLBACK',
          { fallbackType: fallback.type }
        );
    }
  }

  /**
   * Execute emergency single agent response
   */
  private async executeSingleAgentEmergency(
    params: any,
    provider: AIProvider
  ): Promise<any> {
    const emergencyPrompt = `EMERGENCY RESPONSE REQUIRED:

Task: ${params.task}

Context:
- Priority: ${params.context.priority}
- Emergency: ${params.context.userContext?.emergency ? 'Yes' : 'No'}
- Location: ${params.context.userContext?.location || 'Not specified'}

Please provide an immediate, practical response focusing on:
1. Immediate safety concerns
2. Critical next steps
3. Who to contact
4. What to avoid

Keep response concise but comprehensive. Lives may depend on this information.`;

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are an emergency disaster recovery expert providing critical guidance. Prioritize safety and immediate actionable steps.'
      },
      {
        role: 'user',
        content: emergencyPrompt
      }
    ];

    const response = await this.aiService.generateResponse(messages, params.context, {
      preferredProvider: provider,
      maxRetries: 1
    });

    return {
      content: response.content,
      approach: 'emergency-single-agent',
      confidence: 0.8, // High confidence for emergency responses
      emergencyResponse: true,
      provider: response.provider
    };
  }

  /**
   * Execute simplified sequential thinking
   */
  private async executeSimplifiedSequentialThinking(
    params: any,
    parameters: any
  ): Promise<any> {
    const maxSteps = parameters?.maxSteps || 3;
    const timeoutPerStep = parameters?.timeoutPerStep || 15000;

    const simplifiedPrompt = `Provide a step-by-step analysis of this problem in ${maxSteps} clear steps:

Problem: ${params.task}

For each step, provide:
1. What you're analysing
2. Your conclusion
3. Confidence level (0-1)

Keep each step concise but thorough.`;

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a disaster recovery expert providing structured, step-by-step analysis. Be clear and actionable.'
      },
      {
        role: 'user',
        content: simplifiedPrompt
      }
    ];

    const response = await this.aiService.generateResponse(messages, params.context, {
      preferredProvider: AIProvider.OPENROUTER_GPT_OSS_120B,
      maxRetries: 1
    });

    return {
      content: response.content,
      approach: 'simplified-sequential-thinking',
      confidence: 0.7,
      steps: maxSteps,
      provider: response.provider
    };
  }

  /**
   * Execute limited multi-agent discussion
   */
  private async executeLimitedMultiAgentDiscussion(
    params: any,
    parameters: any
  ): Promise<any> {
    const maxParticipants = parameters?.maxParticipants || 2;
    const maxRounds = parameters?.maxRounds || 2;

    // Select core agents based on context
    const coreAgents = this.selectCoreAgents(params.context, maxParticipants);
    
    const discussionPrompt = `Multi-expert consultation (limited format):

Problem: ${params.task}

Expert perspectives needed:
${coreAgents.map(agent => `- ${agent}: Provide your expert analysis`).join('\n')}

Each expert should provide:
1. Key concerns from your perspective
2. Recommended actions
3. Critical warnings or considerations

Keep responses focused and actionable.`;

    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `You are representing multiple disaster recovery experts in a rapid consultation. Provide perspectives from: ${coreAgents.join(', ')}`
      },
      {
        role: 'user',
        content: discussionPrompt
      }
    ];

    const response = await this.aiService.generateResponse(messages, params.context, {
      preferredProvider: AIProvider.ANTHROPIC_CLAUDE,
      maxRetries: 1
    });

    return {
      content: response.content,
      approach: 'limited-multi-agent-discussion',
      confidence: 0.75,
      participants: coreAgents,
      rounds: 1, // Single round for speed
      provider: response.provider
    };
  }

  /**
   * Execute single agent with specific provider
   */
  private async executeSingleAgent(
    params: any,
    provider?: AIProvider
  ): Promise<any> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a disaster recovery expert providing comprehensive analysis and recommendations.'
      },
      {
        role: 'user',
        content: params.task
      }
    ];

    const response = await this.aiService.generateResponse(messages, params.context, {
      preferredProvider: provider,
      maxRetries: 1
    });

    return {
      content: response.content,
      approach: 'single-agent',
      confidence: 0.6,
      provider: response.provider
    };
  }

  /**
   * Execute emergency fallback when all else fails
   */
  private async executeEmergencyFallback(
    params: any,
    startTime: number
  ): Promise<FallbackResult> {
    logger.error('All orchestration approaches failed, using emergency template response');

    // Generate basic emergency template response
    const emergencyResponse = this.generateEmergencyTemplate(params.context);

    return {
      success: true,
      result: emergencyResponse,
      approach: 'emergency-template',
      fallbackLevel: 99,
      processingTime: Date.now() - startTime,
      originalError: 'All AI services failed',
      fallbackReason: 'Emergency template response - all AI services unavailable'
    };
  }

  /**
   * Generate emergency template response
   */
  private generateEmergencyTemplate(context: AITaskContext): any {
    const templates = {
      [AITaskType.EMERGENCY_ROUTING]: {
        content: `EMERGENCY RESPONSE PROTOCOL:

1. IMMEDIATE SAFETY:
   - Ensure all persons are safe and accounted for
   - If anyone is injured, call 000 immediately
   - If property is unsafe, evacuate immediately

2. EMERGENCY CONTACTS:
   - Emergency Services: 000
   - SES (Storms/Floods): 132 500
   - Poison Information: 13 11 26

3. IMMEDIATE ACTIONS:
   - Document damage with photos if safe to do so
   - Contact insurance company
   - Do not enter damaged structures

4. NEXT STEPS:
   - Contact licensed contractors for assessment
   - Keep all receipts for emergency expenses
   - Contact local council if structural damage

This is an automated emergency response. Please contact emergency services if there is immediate danger.`,
        confidence: 0.9,
        emergencyTemplate: true
      },
      
      [AITaskType.DAMAGE_ASSESSMENT]: {
        content: `BASIC DAMAGE ASSESSMENT GUIDE:

1. SAFETY FIRST:
   - Do not enter if structural damage is visible
   - Check for gas leaks, electrical hazards
   - Wear protective equipment

2. DOCUMENTATION:
   - Take photos from multiple angles
   - Note date, time, and weather conditions
   - List all damaged items and areas

3. IMMEDIATE CONCERNS:
   - Water intrusion (potential mould risk)
   - Structural integrity
   - Electrical safety
   - Contamination risks

4. PROFESSIONAL ASSESSMENT NEEDED:
   A qualified professional assessment is required for accurate damage evaluation and safety clearance.

This is an automated assessment guide. Professional inspection is strongly recommended.`,
        confidence: 0.7,
        emergencyTemplate: true
      }
    };

    return templates[context.type] || {
      content: `AUTOMATED RESPONSE:

Due to technical issues, an automated response has been generated.

For immediate emergencies, call 000.

For disaster recovery assistance:
- Contact your insurance provider
- Seek professional assessment
- Document all damage with photos
- Keep receipts for emergency expenses

Professional consultation is recommended for specific guidance.`,
      confidence: 0.5,
      emergencyTemplate: true
    };
  }

  /**
   * Circuit breaker management
   */
  private isCircuitBreakerOpen(operationKey: string): boolean {
    if (!this.config.enableCircuitBreaker) return false;
    
    const breaker = this.circuitBreakers.get(operationKey);
    if (!breaker) return false;
    
    if (breaker.isOpen) {
      // Check if we should attempt to close the circuit
      if (Date.now() > breaker.nextRetryTime.getTime()) {
        breaker.isOpen = false;
        logger.info('Circuit breaker reset attempt', { operationKey });
      }
    }
    
    return breaker.isOpen;
  }

  private recordSuccess(operationKey: string): void {
    let breaker = this.circuitBreakers.get(operationKey);
    if (!breaker) {
      breaker = this.createCircuitBreaker();
      this.circuitBreakers.set(operationKey, breaker);
    }
    
    breaker.successfulRequests++;
    breaker.totalRequests++;
    breaker.failures = 0; // Reset failure count on success
    
    if (breaker.isOpen) {
      breaker.isOpen = false;
      logger.info('Circuit breaker closed after successful request', { operationKey });
    }
  }

  private recordFailure(operationKey: string, error: any): void {
    let breaker = this.circuitBreakers.get(operationKey);
    if (!breaker) {
      breaker = this.createCircuitBreaker();
      this.circuitBreakers.set(operationKey, breaker);
    }
    
    breaker.failures++;
    breaker.totalRequests++;
    breaker.lastFailure = new Date();
    
    if (breaker.failures >= this.config.circuitBreakerThreshold) {
      breaker.isOpen = true;
      breaker.nextRetryTime = new Date(Date.now() + this.config.circuitBreakerResetTime);
      
      logger.warn('Circuit breaker opened', {
        operationKey,
        failures: breaker.failures,
        nextRetryTime: breaker.nextRetryTime
      });
    }
  }

  private createCircuitBreaker(): CircuitBreakerState {
    return {
      isOpen: false,
      failures: 0,
      lastFailure: new Date(0),
      nextRetryTime: new Date(0),
      totalRequests: 0,
      successfulRequests: 0
    };
  }

  /**
   * Helper methods
   */
  private async executeOperation(
    operation: string,
    params: any
  ): Promise<any> {
    // This would integrate with the actual orchestration engines
    // For now, we'll simulate the operation
    throw new OrchestrationError(
      `Simulated failure for operation: ${operation}`,
      'SIMULATED_FAILURE',
      { operation, params }
    );
  }

  private isRetryableError(error: any): boolean {
    if (error instanceof OrchestrationError) {
      return error.retryable !== false;
    }
    
    // Default to retryable for unknown errors
    return true;
  }

  private selectCoreAgents(context: AITaskContext, maxAgents: number): string[] {
    const agentMap = {
      [AITaskType.DAMAGE_ASSESSMENT]: ['Technical Expert', 'Safety Inspector'],
      [AITaskType.EMERGENCY_ROUTING]: ['Emergency Coordinator', 'Safety Inspector'],
      [AITaskType.SAFETY_ANALYSIS]: ['Safety Inspector', 'Technical Expert'],
      [AITaskType.BUSINESS_ANALYTICS]: ['Cost Analyst', 'Technical Expert'],
      [AITaskType.COMPLIANCE_REVIEW]: ['Safety Inspector', 'Quality Auditor']
    };
    
    const defaultAgents = ['Lead Architect', 'Technical Expert'];
    const agents = agentMap[context.type] || defaultAgents;
    
    return agents.slice(0, maxAgents);
  }

  private recordFallbackSuccess(originalOperation: string, fallbackApproach: any): void {
    this.fallbackHistory.push({
      timestamp: new Date(),
      originalApproach: originalOperation,
      fallbackApproach: fallbackApproach.type,
      success: true,
      reason: fallbackApproach.reason
    });
    
    // Keep only last 100 entries
    if (this.fallbackHistory.length > 100) {
      this.fallbackHistory = this.fallbackHistory.slice(-100);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private initializeCircuitBreakers(): void {
    // Initialize circuit breakers for common operations
    const operations = [
      'sequential-thinking_damage-assessment',
      'sequential-thinking_safety-analysis',
      'multi-agent-discussion_damage-assessment',
      'multi-agent-discussion_business-analytics',
      'single-agent_emergency-routing'
    ];

    operations.forEach(op => {
      this.circuitBreakers.set(op, this.createCircuitBreaker());
    });
  }

  private initializeRecoveryStrategies(): void {
    const strategies: FailureRecoveryStrategy[] = [
      {
        scenario: 'sequential-thinking-timeout',
        maxRetries: 2,
        backoffStrategy: 'exponential',
        fallbackApproach: 'multi-agent-discussion',
        alertThreshold: 3,
        escalationProcedure: ['reduce-complexity', 'single-agent', 'emergency-template']
      },
      {
        scenario: 'multi-agent-discussion-deadlock',
        maxRetries: 1,
        backoffStrategy: 'fixed',
        fallbackApproach: 'sequential-thinking',
        alertThreshold: 2,
        escalationProcedure: ['reduce-participants', 'single-agent', 'emergency-template']
      },
      {
        scenario: 'provider-unavailable',
        maxRetries: 3,
        backoffStrategy: 'linear',
        fallbackApproach: 'single-agent',
        alertThreshold: 1,
        escalationProcedure: ['alternate-provider', 'emergency-template']
      }
    ];

    strategies.forEach(strategy => {
      this.recoveryStrategies.set(strategy.scenario, strategy);
    });
  }

  /**
   * Public API methods
   */
  getCircuitBreakerStatus(): Record<string, CircuitBreakerState> {
    const status: Record<string, CircuitBreakerState> = {};
    
    for (const [key, breaker] of this.circuitBreakers) {
      status[key] = { ...breaker };
    }
    
    return status;
  }

  getFallbackHistory(): Array<{
    timestamp: Date;
    originalApproach: string;
    fallbackApproach: string;
    success: boolean;
    reason: string;
  }> {
    return [...this.fallbackHistory];
  }

  getFailureStatistics(): {
    totalFallbacks: number;
    successfulFallbacks: number;
    fallbacksByApproach: Record<string, number>;
    averageFallbackLevel: number;
  } {
    const totalFallbacks = this.fallbackHistory.length;
    const successfulFallbacks = this.fallbackHistory.filter(h => h.success).length;
    
    const fallbacksByApproach: Record<string, number> = {};
    this.fallbackHistory.forEach(h => {
      fallbacksByApproach[h.fallbackApproach] = (fallbacksByApproach[h.fallbackApproach] || 0) + 1;
    });

    return {
      totalFallbacks,
      successfulFallbacks,
      fallbacksByApproach,
      averageFallbackLevel: 0 // Would calculate from actual fallback levels
    };
  }

  resetCircuitBreaker(operationKey: string): boolean {
    const breaker = this.circuitBreakers.get(operationKey);
    if (!breaker) return false;
    
    breaker.isOpen = false;
    breaker.failures = 0;
    breaker.nextRetryTime = new Date(0);
    
    logger.info('Circuit breaker manually reset', { operationKey });
    return true;
  }

  shutdown(): void {
    this.circuitBreakers.clear();
    this.recoveryStrategies.clear();
    this.fallbackHistory.length = 0;
    
    logger.info('Fallback manager shut down');
  }
}