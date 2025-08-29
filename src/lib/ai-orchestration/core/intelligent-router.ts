/**
 * Intelligent Router for AI Model Selection
 * Routes tasks to optimal models based on complexity, urgency, and requirements
 */

import {
  AIRequest,
  AIModel,
  AITaskType,
  TaskComplexity,
  OrchestrationDecision,
  DisasterContext,
} from './types';

export class IntelligentRouter {
  private performanceHistory: Map<string, number[]> = new Map();
  private costHistory: Map<AIModel, number> = new Map();
  
  constructor(
    private complexityThreshold: number = 7,
    private urgencyThreshold: number = 8
  ) {
    this.initializeCostEstimates();
  }
  
  private initializeCostEstimates() {
    // Cost per 1M tokens (approximate)
    this.costHistory.set(AIModel.GPT_OSS_120B, 15.0);
    this.costHistory.set(AIModel.CLAUDE_3_OPUS, 75.0);
    this.costHistory.set(AIModel.CLAUDE_3_SONNET, 15.0);
    this.costHistory.set(AIModel.CLAUDE_3_HAIKU, 8.0);
    this.costHistory.set(AIModel.CLAUDE_SONNET_LATEST, 15.0);
    this.costHistory.set(AIModel.GPT_4_TURBO, 30.0);
  }
  
  /**
   * Determine the optimal orchestration approach and model selection
   */
  async route(request: AIRequest): Promise<OrchestrationDecision> {
    const complexity = this.assessComplexity(request);
    const urgencyScore = this.calculateUrgencyScore(request);
    const accuracyWeight = this.getAccuracyWeight(request.accuracyRequired);
    
    // Decision logic based on task characteristics
    let approach: OrchestrationDecision['approach'];
    let primaryModel: AIModel;
    let reasoning: string;
    
    // Emergency situations - speed is critical
    if (request.priority === 'emergency' || urgencyScore >= this.urgencyThreshold) {
      approach = 'direct';
      primaryModel = AIModel.CLAUDE_SONNET_LATEST; // Latest and fastest
      reasoning = 'Emergency response requires immediate action with reliable model';
    }
    // Complex sequential thinking tasks - leverage GPT-OSS-120B
    else if (
      complexity >= this.complexityThreshold ||
      request.type === AITaskType.SEQUENTIAL_THINKING ||
      this.requiresAdvancedReasoning(request)
    ) {
      approach = 'sequential';
      primaryModel = AIModel.GPT_OSS_120B;
      reasoning = 'Complex task requires GPT-OSS-120B sequential thinking capabilities';
    }
    // Multi-stakeholder or controversial decisions
    else if (
      this.requiresConsensus(request) ||
      request.type === AITaskType.MULTI_AGENT_DISCUSSION
    ) {
      approach = 'multi-agent';
      primaryModel = AIModel.GPT_OSS_120B; // Lead orchestrator
      reasoning = 'Multi-agent discussion needed for comprehensive analysis';
    }
    // Code generation and implementation
    else if (request.type === AITaskType.CODE_GENERATION) {
      approach = 'direct';
      primaryModel = AIModel.CLAUDE_SONNET_LATEST; // Latest model for best code generation
      reasoning = 'Claude 4.1 Sonnet excels at code generation and implementation';
    }
    // Hybrid approach for damage assessment
    else if (request.type === AITaskType.DAMAGE_ASSESSMENT) {
      approach = 'hybrid';
      primaryModel = AIModel.GPT_OSS_120B; // For analysis
      reasoning = 'Damage assessment benefits from sequential analysis with quick implementation';
    }
    // Standard tasks
    else {
      approach = 'direct';
      primaryModel = AIModel.CLAUDE_SONNET_LATEST; // Use latest model as default
      reasoning = 'Standard task can be handled efficiently by Claude 4.1 Sonnet';
    }
    
    // Determine fallback models
    const fallbackModels = this.determineFallbacks(primaryModel, request);
    
    // Estimate duration and cost
    const estimatedDuration = this.estimateDuration(approach, complexity);
    const estimatedCost = this.estimateCost(primaryModel, approach, complexity);
    
    // Calculate confidence based on historical performance
    const confidence = this.calculateConfidence(primaryModel, request.type, complexity);
    
    return {
      approach,
      primaryModel,
      fallbackModels,
      reasoning,
      estimatedDuration,
      estimatedCost,
      confidence,
    };
  }
  
  /**
   * Assess task complexity based on multiple factors
   */
  private assessComplexity(request: AIRequest): TaskComplexity {
    let score = 0;
    
    // Base complexity from task type
    const typeComplexity: Record<AITaskType, number> = {
      [AITaskType.SEQUENTIAL_THINKING]: 8,
      [AITaskType.MULTI_AGENT_DISCUSSION]: 9,
      [AITaskType.DAMAGE_ASSESSMENT]: 7,
      [AITaskType.INSURANCE_ANALYSIS]: 7,
      [AITaskType.COST_ESTIMATION]: 6,
      [AITaskType.EMERGENCY_RESPONSE]: 5,
      [AITaskType.CODE_GENERATION]: 5,
      [AITaskType.QUICK_RESPONSE]: 2,
    };
    
    score += typeComplexity[request.type] || 5;
    
    // Context complexity
    if (request.context) {
      const contextKeys = Object.keys(request.context);
      score += Math.min(contextKeys.length / 5, 2); // Max 2 points for context
      
      // Disaster-specific complexity
      const disaster = request.context as DisasterContext;
      if (disaster.type) {
        if (disaster.severity >= 4) score += 2;
        if (disaster.hazards && disaster.hazards.length > 3) score += 1;
        if (disaster.estimatedDamage && disaster.estimatedDamage > 100000) score += 1;
      }
    }
    
    // Accuracy requirements
    if (request.accuracyRequired === 'critical') score += 2;
    else if (request.accuracyRequired === 'high') score += 1;
    
    // Normalize to TaskComplexity scale
    if (score <= 2) return TaskComplexity.TRIVIAL;
    if (score <= 4) return TaskComplexity.SIMPLE;
    if (score <= 6) return TaskComplexity.MODERATE;
    if (score <= 8) return TaskComplexity.COMPLEX;
    if (score <= 9) return TaskComplexity.VERY_COMPLEX;
    return TaskComplexity.EXTREME;
  }
  
  /**
   * Calculate urgency score
   */
  private calculateUrgencyScore(request: AIRequest): number {
    let score = 0;
    
    // Priority scoring
    const priorityScores = {
      emergency: 10,
      critical: 8,
      high: 6,
      normal: 3,
      low: 1,
    };
    score += priorityScores[request.priority];
    
    // Response time requirements
    if (request.maxResponseTime) {
      if (request.maxResponseTime < 1000) score += 3; // Under 1 second
      else if (request.maxResponseTime < 5000) score += 2; // Under 5 seconds
      else if (request.maxResponseTime < 10000) score += 1; // Under 10 seconds
    }
    
    // Disaster urgency
    if (request.context && (request.context as DisasterContext).urgency) {
      const urgency = (request.context as DisasterContext).urgency;
      if (urgency === 'immediate') score += 3;
      else if (urgency === 'urgent') score += 2;
    }
    
    return Math.min(score, 10);
  }
  
  /**
   * Determine if task requires advanced reasoning
   */
  private requiresAdvancedReasoning(request: AIRequest): boolean {
    const advancedTypes = [
      AITaskType.SEQUENTIAL_THINKING,
      AITaskType.INSURANCE_ANALYSIS,
      AITaskType.COST_ESTIMATION,
    ];
    
    if (advancedTypes.includes(request.type)) return true;
    
    // Check for mathematical or analytical keywords
    const analyticalKeywords = [
      'calculate', 'analyze', 'analyse', 'estimate', 'predict',
      'optimize', 'optimise', 'evaluate', 'assess', 'determine',
      'compare', 'sequence', 'plan', 'strategy', 'algorithm',
    ];
    
    const prompt = request.prompt.toLowerCase();
    return analyticalKeywords.some(keyword => prompt.includes(keyword));
  }
  
  /**
   * Determine if task requires consensus building
   */
  private requiresConsensus(request: AIRequest): boolean {
    if (request.type === AITaskType.MULTI_AGENT_DISCUSSION) return true;
    
    // Check for multi-stakeholder scenarios
    const consensusKeywords = [
      'stakeholder', 'consensus', 'agreement', 'negotiate',
      'dispute', 'conflicting', 'perspectives', 'opinions',
      'committee', 'board', 'team decision',
    ];
    
    const prompt = request.prompt.toLowerCase();
    return consensusKeywords.some(keyword => prompt.includes(keyword));
  }
  
  /**
   * Determine fallback models
   */
  private determineFallbacks(primary: AIModel, request: AIRequest): AIModel[] {
    const fallbacks: AIModel[] = [];
    
    // Primary fallback logic
    if (primary === AIModel.GPT_OSS_120B) {
      fallbacks.push(AIModel.CLAUDE_3_OPUS);
      fallbacks.push(AIModel.GPT_4_TURBO);
    } else if (primary === AIModel.CLAUDE_3_OPUS) {
      fallbacks.push(AIModel.GPT_OSS_120B);
      fallbacks.push(AIModel.CLAUDE_3_SONNET);
    } else if (primary === AIModel.CLAUDE_3_SONNET) {
      fallbacks.push(AIModel.CLAUDE_3_OPUS);
      fallbacks.push(AIModel.GPT_4_TURBO);
    }
    
    // Emergency fallback - always have a fast option
    if (request.priority === 'emergency' && !fallbacks.includes(AIModel.CLAUDE_3_SONNET)) {
      fallbacks.push(AIModel.CLAUDE_3_SONNET);
    }
    
    return fallbacks;
  }
  
  /**
   * Estimate task duration
   */
  private estimateDuration(approach: OrchestrationDecision['approach'], complexity: TaskComplexity): number {
    const baseDurations = {
      direct: 2000,
      sequential: 10000,
      'multi-agent': 15000,
      hybrid: 8000,
    };
    
    const complexityMultiplier = complexity / 5;
    return Math.round(baseDurations[approach] * complexityMultiplier);
  }
  
  /**
   * Estimate task cost
   */
  private estimateCost(model: AIModel, approach: OrchestrationDecision['approach'], complexity: TaskComplexity): number {
    const baseCost = this.costHistory.get(model) || 10;
    
    const approachMultiplier = {
      direct: 1,
      sequential: 3,
      'multi-agent': 5,
      hybrid: 2.5,
    };
    
    const complexityMultiplier = 1 + (complexity / 10);
    
    return Number((baseCost * approachMultiplier[approach] * complexityMultiplier / 1000).toFixed(4));
  }
  
  /**
   * Calculate confidence based on historical performance
   */
  private calculateConfidence(model: AIModel, taskType: AITaskType, complexity: TaskComplexity): number {
    const key = `${model}-${taskType}`;
    const history = this.performanceHistory.get(key) || [];
    
    if (history.length === 0) {
      // Default confidence based on model strengths
      if (model === AIModel.GPT_OSS_120B && complexity >= TaskComplexity.COMPLEX) {
        return 0.95;
      } else if (model === AIModel.CLAUDE_3_OPUS && taskType === AITaskType.CODE_GENERATION) {
        return 0.92;
      }
      return 0.85;
    }
    
    // Calculate average performance
    const avgPerformance = history.reduce((a, b) => a + b, 0) / history.length;
    
    // Adjust for complexity
    const complexityPenalty = complexity >= TaskComplexity.VERY_COMPLEX ? 0.1 : 0;
    
    return Math.max(0.5, Math.min(1.0, avgPerformance - complexityPenalty));
  }
  
  /**
   * Update performance history
   */
  updatePerformance(model: AIModel, taskType: AITaskType, success: boolean, confidence: number) {
    const key = `${model}-${taskType}`;
    const history = this.performanceHistory.get(key) || [];
    
    // Weight recent performance more heavily
    const score = success ? confidence : confidence * 0.5;
    history.push(score);
    
    // Keep only last 100 entries
    if (history.length > 100) {
      history.shift();
    }
    
    this.performanceHistory.set(key, history);
  }
  
  /**
   * Get accuracy weight for scoring
   */
  private getAccuracyWeight(accuracy: string): number {
    const weights = {
      standard: 1.0,
      high: 1.5,
      critical: 2.0,
    };
    return weights[accuracy as keyof typeof weights] || 1.0;
  }
}