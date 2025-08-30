/**
 * Sequential Thinking Pipeline Engine
 * Leverages GPT-OSS-120B's superior sequential reasoning capabilities
 */

import { 
  SequentialThinkingChain, 
  SequentialThinkingStep, 
  AgentPersona, 
  OrchestrationError,
  WebSocketEvent,
  ThinkingStepEvent
} from '../core/types';
import { AIService } from '@/lib/ai-service';
import { AIProvider, AIMessage, AITaskContext, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';

export class SequentialThinkingEngine extends EventEmitter {
  private aiService: AIService;
  private activeChains: Map<string, SequentialThinkingChain> = new Map();
  private chainCache: Map<string, SequentialThinkingChain> = new Map();

  constructor(aiService: AIService) {
    super();
    this.aiService = aiService;
  }

  /**
   * Start a new sequential thinking chain
   */
  async startThinkingChain(
    problemStatement: string,
    context: AITaskContext,
    options?: {
      maxSteps?: number;
      timeoutPerStep?: number;
      requirePeerReview?: boolean;
      primaryAgent?: AgentPersona;
    }
  ): Promise<SequentialThinkingChain> {
    const chainId = this.generateChainId();
    const maxSteps = options?.maxSteps || 10;
    const primaryAgent = options?.primaryAgent || this.selectPrimaryAgent(context);

    const chain: SequentialThinkingChain = {
      id: chainId,
      problemStatement,
      context,
      steps: [],
      currentStep: 0,
      status: 'planning',
      startTime: new Date(),
      totalConfidence: 0,
      metadata: {
        primaryAgent,
        consultingAgents: this.selectConsultingAgents(context, primaryAgent),
        complexity: this.assessComplexity(problemStatement, context),
        riskLevel: this.assessRiskLevel(context)
      }
    };

    this.activeChains.set(chainId, chain);

    logger.info('Started sequential thinking chain', {
      chainId,
      problemStatement: problemStatement.substring(0, 100),
      primaryAgent,
      complexity: chain.metadata.complexity
    });

    try {
      // Start the thinking process
      chain.status = 'executing';
      await this.executeThinkingChain(chain, maxSteps, options?.timeoutPerStep);
      
      chain.status = 'completed';
      chain.endTime = new Date();
      
      // Cache successful chains
      this.chainCache.set(chainId, chain);
      
      return chain;
      
    } catch (error) {
      chain.status = 'failed';
      chain.endTime = new Date();
      
      logger.error('Sequential thinking chain failed', {
        chainId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stepsCompleted: chain.steps.length
      });
      
      throw error;
    } finally {
      this.activeChains.delete(chainId);
    }
  }

  /**
   * Execute the sequential thinking chain
   */
  private async executeThinkingChain(
    chain: SequentialThinkingChain,
    maxSteps: number,
    timeoutPerStep: number = 30000
  ): Promise<void> {
    let currentProblem = chain.problemStatement;
    let previousSteps: SequentialThinkingStep[] = [];
    
    for (let stepNumber = 1; stepNumber <= maxSteps; stepNumber++) {
      chain.currentStep = stepNumber;
      
      const stepPrompt = this.buildStepPrompt(
        currentProblem,
        chain.context,
        previousSteps,
        stepNumber,
        maxSteps
      );

      const stepStartTime = Date.now();
      
      try {
        const step = await Promise.race([
          this.executeThinkingStep(stepPrompt, chain, stepNumber),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Step timeout')), timeoutPerStep)
          )
        ]);

        previousSteps.push(step);
        chain.steps.push(step);
        
        // Update total confidence (weighted average)
        chain.totalConfidence = this.calculateChainConfidence(chain.steps);
        
        // Emit progress event
        this.emitThinkingStepEvent(chain, step);
        
        logger.debug('Completed thinking step', {
          chainId: chain.id,
          stepNumber,
          confidence: step.confidence,
          processingTime: Date.now() - stepStartTime
        });

        // Check if we have a conclusive answer
        if (this.isThinkingComplete(step, chain)) {
          chain.finalConclusion = step.conclusion;
          logger.info('Sequential thinking reached conclusion', {
            chainId: chain.id,
            stepsUsed: stepNumber,
            finalConfidence: chain.totalConfidence
          });
          break;
        }

        // Prepare for next step
        currentProblem = this.formulateNextStepProblem(step, currentProblem);
        
      } catch (error) {
        logger.warn('Thinking step failed, attempting recovery', {
          chainId: chain.id,
          stepNumber,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        // Attempt step recovery
        const recoveryStep = await this.attemptStepRecovery(chain, stepNumber, error);
        if (recoveryStep) {
          previousSteps.push(recoveryStep);
          chain.steps.push(recoveryStep);
        } else {
          throw new OrchestrationError(
            `Sequential thinking failed at step ${stepNumber}`,
            'THINKING_STEP_FAILED',
            { chainId: chain.id, stepNumber, originalError: error },
            true
          );
        }
      }
    }

    // If we've reached max steps without conclusion, synthesize final answer
    if (!chain.finalConclusion) {
      chain.finalConclusion = await this.synthesizeFinalConclusion(chain);
    }
  }

  /**
   * Execute a single thinking step using GPT-OSS-120B
   */
  private async executeThinkingStep(
    prompt: string,
    chain: SequentialThinkingChain,
    stepNumber: number
  ): Promise<SequentialThinkingStep> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: this.getSystemPromptForAgent(chain.metadata.primaryAgent)
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    // Force use of GPT-OSS-120B for sequential thinking
    const response = await this.aiService.generateResponse(messages, {
      ...chain.context,
      type: AITaskType.BUSINESS_ANALYTICS // Use complex reasoning task type
    }, {
      preferredProvider: AIProvider.OPENROUTER_GPT_OSS_120B
    });

    // Parse the structured response
    const parsedResponse = this.parseThinkingStepResponse(response.content);

    return {
      id: `${chain.id}-step-${stepNumber}`,
      stepNumber,
      reasoning: parsedResponse.reasoning,
      conclusion: parsedResponse.conclusion,
      confidence: parsedResponse.confidence,
      nextSteps: parsedResponse.nextSteps,
      dependencies: parsedResponse.dependencies,
      estimatedTime: response.responseTime,
      provider: AIProvider.OPENROUTER_GPT_OSS_120B,
      timestamp: new Date()
    };
  }

  /**
   * Build the prompt for a thinking step
   */
  private buildStepPrompt(
    problem: string,
    context: AITaskContext,
    previousSteps: SequentialThinkingStep[],
    stepNumber: number,
    maxSteps: number
  ): string {
    const stepsContext = previousSteps.length > 0 
      ? `\n\nPrevious thinking steps:\n${previousSteps.map((step, i) => 
          `Step ${i + 1}: ${step.reasoning}\nConclusion: ${step.conclusion}\nConfidence: ${step.confidence}`
        ).join('\n\n')}`
      : '';

    return `You are conducting step-by-step sequential thinking to solve a complex problem. This is step ${stepNumber} of up to ${maxSteps} steps.

**Problem Statement:**
${problem}

**Context:**
- Task Type: ${context.type}
- Priority: ${context.priority}
- Accuracy Required: ${context.accuracyRequired}
- Emergency Context: ${context.userContext?.emergency ? 'Yes' : 'No'}
${context.userContext?.location ? `- Location: ${context.userContext.location}` : ''}

${stepsContext}

**Your Task for Step ${stepNumber}:**
Think through the next logical step in solving this problem. Consider:
1. What specific aspect should be analysed next?
2. What information do you need to gather or process?
3. What logical deductions can be made from previous steps?
4. How confident are you in your reasoning?
5. What are the possible next steps after this one?

**Response Format:**
Please structure your response as follows:

REASONING:
[Your detailed step-by-step reasoning for this specific step. Be thorough and logical.]

CONCLUSION:
[Your specific conclusion for this step. What have you determined?]

CONFIDENCE:
[Rate your confidence in this step from 0.0 to 1.0]

NEXT_STEPS:
[List 2-3 possible next steps that should be considered]

DEPENDENCIES:
[List any dependencies or requirements needed for next steps]

COMPLETION_STATUS:
[CONTINUE if more thinking needed, COMPLETE if problem is fully solved]

Remember: This is sequential thinking, not a final answer. Focus on making solid progress on one specific aspect of the problem.`;
  }

  /**
   * Parse the structured response from a thinking step
   */
  private parseThinkingStepResponse(content: string): {
    reasoning: string;
    conclusion: string;
    confidence: number;
    nextSteps: string[];
    dependencies: string[];
    isComplete: boolean;
  } {
    const sections = {
      reasoning: this.extractSection(content, 'REASONING:'),
      conclusion: this.extractSection(content, 'CONCLUSION:'),
      confidence: this.extractSection(content, 'CONFIDENCE:'),
      nextSteps: this.extractSection(content, 'NEXT_STEPS:'),
      dependencies: this.extractSection(content, 'DEPENDENCIES:'),
      completionStatus: this.extractSection(content, 'COMPLETION_STATUS:')
    };

    return {
      reasoning: sections.reasoning || 'No reasoning provided',
      conclusion: sections.conclusion || 'No conclusion reached',
      confidence: this.parseConfidence(sections.confidence),
      nextSteps: this.parseList(sections.nextSteps),
      dependencies: this.parseList(sections.dependencies),
      isComplete: sections.completionStatus?.toUpperCase().includes('COMPLETE') || false
    };
  }

  /**
   * Extract a section from structured text
   */
  private extractSection(content: string, sectionHeader: string): string {
    const regex = new RegExp(`${sectionHeader}\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  /**
   * Parse confidence value
   */
  private parseConfidence(confidenceText: string): number {
    const match = confidenceText.match(/(\d*\.?\d+)/);
    if (match) {
      const value = parseFloat(match[1]);
      // Handle both 0-1 and 0-100 scales
      return value > 1 ? value / 100 : value;
    }
    return 0.5; // Default confidence
  }

  /**
   * Parse list items
   */
  private parseList(listText: string): string[] {
    if (!listText) return [];
    
    return listText
      .split('\n')
      .map(line => line.replace(/^[-*•]\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5); // Limit to 5 items
  }

  /**
   * Check if thinking is complete
   */
  private isThinkingComplete(step: SequentialThinkingStep, chain: SequentialThinkingChain): boolean {
    // High confidence single step completion
    if (step.confidence >= 0.95 && step.nextSteps.length === 0) {
      return true;
    }

    // Multiple steps with consistent high confidence
    if (chain.steps.length >= 3) {
      const recentSteps = chain.steps.slice(-3);
      const avgConfidence = recentSteps.reduce((sum, s) => sum + s.confidence, 0) / recentSteps.length;
      
      if (avgConfidence >= 0.9 && step.nextSteps.length <= 1) {
        return true;
      }
    }

    return false;
  }

  /**
   * Select primary agent based on context
   */
  private selectPrimaryAgent(context: AITaskContext): AgentPersona {
    switch (context.type) {
      case AITaskType.DAMAGE_ASSESSMENT:
      case AITaskType.SAFETY_ANALYSIS:
        return AgentPersona.TECHNICAL_EXPERT;
      
      case AITaskType.COMPLIANCE_REVIEW:
        return AgentPersona.SAFETY_INSPECTOR;
      
      case AITaskType.BUSINESS_ANALYTICS:
      case AITaskType.MARKET_ANALYSIS:
        return AgentPersona.COST_ANALYST;
      
      default:
        return AgentPersona.LEAD_ARCHITECT;
    }
  }

  /**
   * Select consulting agents
   */
  private selectConsultingAgents(context: AITaskContext, primaryAgent: AgentPersona): AgentPersona[] {
    const consultants: AgentPersona[] = [];

    // Always include quality auditor for high-accuracy tasks
    if (context.accuracyRequired === 'critical') {
      consultants.push(AgentPersona.QUALITY_AUDITOR);
    }

    // Add domain-specific consultants
    switch (context.type) {
      case AITaskType.DAMAGE_ASSESSMENT:
        consultants.push(AgentPersona.SAFETY_INSPECTOR, AgentPersona.COST_ANALYST);
        break;
      
      case AITaskType.EMERGENCY_ROUTING:
        consultants.push(AgentPersona.EMERGENCY_COORDINATOR);
        break;
      
      case AITaskType.BUSINESS_ANALYTICS:
        if (primaryAgent !== AgentPersona.TECHNICAL_EXPERT) {
          consultants.push(AgentPersona.TECHNICAL_EXPERT);
        }
        break;
    }

    return consultants.filter(agent => agent !== primaryAgent).slice(0, 3);
  }

  /**
   * Assess problem complexity
   */
  private assessComplexity(problemStatement: string, context: AITaskContext): 'simple' | 'medium' | 'complex' | 'expert' {
    let score = 0;

    // Length and detail complexity
    if (problemStatement.length > 500) score += 1;
    if (problemStatement.length > 1000) score += 1;

    // Context complexity
    if (context.accuracyRequired === 'critical') score += 2;
    if (context.priority === 'critical') score += 1;

    // Task type complexity
    const complexTaskTypes = [
      AITaskType.DAMAGE_ASSESSMENT,
      AITaskType.SAFETY_ANALYSIS,
      AITaskType.BUSINESS_ANALYTICS,
      AITaskType.COMPLIANCE_REVIEW
    ];
    
    if (complexTaskTypes.includes(context.type)) score += 1;

    // Emergency context adds complexity
    if (context.userContext?.emergency) score += 1;

    if (score <= 1) return 'simple';
    if (score <= 3) return 'medium';
    if (score <= 5) return 'complex';
    return 'expert';
  }

  /**
   * Assess risk level
   */
  private assessRiskLevel(context: AITaskContext): 'low' | 'medium' | 'high' | 'critical' {
    if (context.userContext?.emergency || context.priority === 'critical') {
      return 'critical';
    }
    
    if (context.accuracyRequired === 'critical') {
      return 'high';
    }
    
    if (context.priority === 'high' || context.accuracyRequired === 'high') {
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Calculate overall chain confidence
   */
  private calculateChainConfidence(steps: SequentialThinkingStep[]): number {
    if (steps.length === 0) return 0;
    
    // Weighted average with more weight on recent steps
    let totalWeight = 0;
    let weightedSum = 0;
    
    steps.forEach((step, index) => {
      const weight = Math.pow(1.2, index); // Recent steps have more weight
      totalWeight += weight;
      weightedSum += step.confidence * weight;
    });
    
    return weightedSum / totalWeight;
  }

  /**
   * Formulate next step problem
   */
  private formulateNextStepProblem(currentStep: SequentialThinkingStep, originalProblem: string): string {
    if (currentStep.nextSteps.length === 0) {
      return originalProblem;
    }
    
    return `${originalProblem}\n\nBased on previous analysis: ${currentStep.conclusion}\n\nNext focus: ${currentStep.nextSteps[0]}`;
  }

  /**
   * Attempt to recover from a failed step
   */
  private async attemptStepRecovery(
    chain: SequentialThinkingChain, 
    stepNumber: number, 
    error: any
  ): Promise<SequentialThinkingStep | null> {
    try {
      logger.info('Attempting step recovery', { chainId: chain.id, stepNumber });
      
      // Simplify the problem and try again with lower complexity
      const recoveryPrompt = `The previous thinking step encountered an issue. Let's take a simpler approach.

Original problem: ${chain.problemStatement}

Previous steps completed: ${chain.steps.length}

Please provide a simplified analysis for step ${stepNumber}, focusing on the most critical aspects only.

Use the same response format as before, but aim for practical, actionable insights rather than complex analysis.`;

      const response = await this.aiService.generateResponse([
        {
          role: 'system',
          content: 'You are a disaster recovery expert providing simplified, practical analysis.'
        },
        {
          role: 'user',
          content: recoveryPrompt
        }
      ], chain.context, {
        preferredProvider: AIProvider.ANTHROPIC_CLAUDE // Use Claude as fallback
      });

      const parsedResponse = this.parseThinkingStepResponse(response.content);
      
      return {
        id: `${chain.id}-recovery-${stepNumber}`,
        stepNumber,
        reasoning: `[RECOVERY MODE] ${parsedResponse.reasoning}`,
        conclusion: parsedResponse.conclusion,
        confidence: Math.max(0.3, parsedResponse.confidence * 0.8), // Reduce confidence for recovery
        nextSteps: parsedResponse.nextSteps,
        dependencies: parsedResponse.dependencies,
        estimatedTime: response.responseTime,
        provider: AIProvider.ANTHROPIC_CLAUDE,
        timestamp: new Date()
      };
      
    } catch (recoveryError) {
      logger.error('Step recovery failed', { 
        chainId: chain.id, 
        stepNumber, 
        originalError: error, 
        recoveryError 
      });
      return null;
    }
  }

  /**
   * Synthesize final conclusion from all steps
   */
  private async synthesizeFinalConclusion(chain: SequentialThinkingChain): Promise<string> {
    const stepssummary = chain.steps.map(step => 
      `Step ${step.stepNumber}: ${step.conclusion} (Confidence: ${step.confidence.toFixed(2)})`
    ).join('\n');

    const synthesisPrompt = `Based on the following sequential thinking steps, provide a comprehensive final conclusion:

Original Problem: ${chain.problemStatement}

Thinking Steps:
${stepsummary}

Please synthesize these findings into a clear, actionable final conclusion that addresses the original problem comprehensively.`;

    const response = await this.aiService.generateResponse([
      {
        role: 'system',
        content: 'You are an expert at synthesizing complex analysis into clear, actionable conclusions.'
      },
      {
        role: 'user',
        content: synthesisPrompt
      }
    ], chain.context);

    return response.content;
  }

  /**
   * Get system prompt for specific agent persona
   */
  private getSystemPromptForAgent(persona: AgentPersona): string {
    const basePrompt = "You are an expert AI agent specialising in disaster recovery and emergency response for the Australian market.";
    
    switch (persona) {
      case AgentPersona.LEAD_ARCHITECT:
        return `${basePrompt} As the Lead Architect, you focus on strategic planning, system design, and coordinating complex multi-step solutions. You excel at breaking down complex problems into manageable components and orchestrating comprehensive response strategies.`;
      
      case AgentPersona.TECHNICAL_EXPERT:
        return `${basePrompt} As a Technical Expert, you specialise in detailed technical analysis, damage assessment, and understanding the engineering aspects of disaster recovery. You provide precise, technically accurate insights about structural damage, equipment needs, and restoration processes.`;
      
      case AgentPersona.SAFETY_INSPECTOR:
        return `${basePrompt} As a Safety Inspector, you prioritize safety protocols, compliance requirements, and risk assessment. You ensure all recommendations meet Australian safety standards and regulatory requirements.`;
      
      case AgentPersona.COST_ANALYST:
        return `${basePrompt} As a Cost Analyst, you focus on financial planning, resource optimisation, and cost-effective solutions. You provide detailed cost estimates, budget planning, and resource allocation strategies for disaster recovery projects.`;
      
      default:
        return basePrompt;
    }
  }

  /**
   * Emit thinking step event for real-time updates
   */
  private emitThinkingStepEvent(chain: SequentialThinkingChain, step: SequentialThinkingStep): void {
    const event: ThinkingStepEvent = {
      type: 'thinking-step',
      payload: {
        chainId: chain.id,
        step,
        progress: chain.currentStep / 10 // Assuming max 10 steps
      },
      timestamp: new Date(),
      sessionId: chain.context.userContext?.sessionId || 'unknown'
    };

    this.emit('thinking-step', event);
  }

  /**
   * Generate unique chain ID
   */
  private generateChainId(): string {
    return `chain_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get active chain by ID
   */
  getActiveChain(chainId: string): SequentialThinkingChain | undefined {
    return this.activeChains.get(chainId);
  }

  /**
   * Get cached chain by ID
   */
  getCachedChain(chainId: string): SequentialThinkingChain | undefined {
    return this.chainCache.get(chainId);
  }

  /**
   * Get all active chains
   */
  getActiveChains(): SequentialThinkingChain[] {
    return Array.from(this.activeChains.values());
  }

  /**
   * Clear chain cache
   */
  clearCache(): void {
    this.chainCache.clear();
    logger.info('Sequential thinking cache cleared');
  }
}