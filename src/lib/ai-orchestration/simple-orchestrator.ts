/**
 * Simple Orchestrator - Main coordination service
 * Integrates GPT-OSS-120B and Claude for optimal task handling
 */

import { 
  AIRequest, 
  AIResponse, 
  AIModel, 
  AIProvider,
  AITaskType,
  OrchestrationDecision 
} from './core/types';
import { IntelligentRouter } from './core/intelligent-router';
import { OpenRouterProvider } from './providers/openrouter-provider';
import { AnthropicProvider } from './providers/anthropic-provider';

export class SimpleOrchestrator {
  private router: IntelligentRouter;
  private openrouter: OpenRouterProvider;
  private anthropic: AnthropicProvider;
  private requestCount = 0;
  
  constructor() {
    this.router = new IntelligentRouter();
    this.openrouter = new OpenRouterProvider();
    this.anthropic = new AnthropicProvider();
  }
  
  /**
   * Main orchestration method
   */
  async orchestrate(
    prompt: string,
    options: {
      type?: AITaskType;
      priority?: 'low' | 'normal' | 'high' | 'critical' | 'emergency';
      accuracyRequired?: 'standard' | 'high' | 'critical';
      context?: Record<string, any>;
      useSequentialThinking?: boolean;
    } = {}
  ): Promise<AIResponse> {
    const startTime = Date.now();
    this.requestCount++;
    
    // Create request object
    const request: AIRequest = {
      id: `REQ-${Date.now()}-${this.requestCount}`,
      type: options.type || AITaskType.QUICK_RESPONSE,
      prompt,
      context: options.context,
      priority: options.priority || 'normal',
      accuracyRequired: options.accuracyRequired || 'standard',
      allowFallback: true,
    };
    
    // Get routing decision
    const decision = await this.router.route(request);
    
    console.log('🧠 Orchestration Decision:', {
      approach: decision.approach,
      model: decision.primaryModel,
      reasoning: decision.reasoning,
      estimatedCost: `$${decision.estimatedCost.toFixed(4)}`,
    });
    
    try {
      let response: AIResponse;
      
      // Force sequential thinking if requested or if router decides
      if (options.useSequentialThinking || decision.approach === 'sequential') {
        response = await this.executeSequentialThinking(request, decision);
      } else if (decision.approach === 'multi-agent') {
        response = await this.executeMultiAgentDiscussion(request, decision);
      } else {
        response = await this.executeDirect(request, decision);
      }
      
      // Update router performance metrics
      this.router.updatePerformance(
        decision.primaryModel,
        request.type,
        true,
        response.confidence
      );
      
      return response;
      
    } catch (error) {
      console.error('Primary execution failed, attempting fallback:', error);
      
      // Try fallback models
      for (const fallbackModel of decision.fallbackModels) {
        try {
          const fallbackResponse = await this.executeWithModel(request, fallbackModel);
          
          this.router.updatePerformance(
            fallbackModel,
            request.type,
            true,
            fallbackResponse.confidence
          );
          
          return fallbackResponse;
        } catch (fallbackError) {
          console.error(`Fallback ${fallbackModel} failed:`, fallbackError);
        }
      }
      
      // All attempts failed
      throw new Error('All AI providers failed. Please try again later.');
    }
  }
  
  /**
   * Execute sequential thinking approach
   */
  private async executeSequentialThinking(
    request: AIRequest,
    decision: OrchestrationDecision
  ): Promise<AIResponse> {
    console.log('🔄 Executing Sequential Thinking with GPT-OSS-120B...');
    
    const result = await this.openrouter.sequentialThinking(
      request.prompt,
      request.context || {},
      10, // max steps
      (step) => {
        console.log(`  Step ${step.step}: ${step.thought.substring(0, 100)}... (confidence: ${step.confidence})`);
      }
    );
    
    return {
      id: `RESP-${Date.now()}`,
      requestId: request.id,
      model: AIModel.GPT_OSS_120B,
      provider: AIProvider.OPENROUTER,
      response: result.finalAnswer,
      confidence: result.confidence,
      metadata: {
        tokensUsed: result.tokensUsed,
        latency: Date.now() - Date.now(),
        cost: result.cost,
        steps: result.steps,
        cacheHit: false,
      },
      timestamp: new Date(),
    };
  }
  
  /**
   * Execute multi-agent discussion (simplified for now)
   */
  private async executeMultiAgentDiscussion(
    request: AIRequest,
    decision: OrchestrationDecision
  ): Promise<AIResponse> {
    console.log('👥 Executing Multi-Agent Discussion...');
    
    // For now, use sequential thinking as a placeholder
    // In production, implement full multi-agent system
    return this.executeSequentialThinking(request, decision);
  }
  
  /**
   * Execute direct approach
   */
  private async executeDirect(
    request: AIRequest,
    decision: OrchestrationDecision
  ): Promise<AIResponse> {
    console.log(`⚡ Executing Direct with ${decision.primaryModel}...`);
    
    return this.executeWithModel(request, decision.primaryModel);
  }
  
  /**
   * Execute with specific model
   */
  private async executeWithModel(
    request: AIRequest,
    model: AIModel
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    // Determine which provider to use
    const useOpenRouter = [AIModel.GPT_OSS_120B, AIModel.GPT_4_TURBO].includes(model);
    const provider = useOpenRouter ? this.openrouter : this.anthropic;
    
    // Create system prompt based on context
    const systemPrompt = this.createSystemPrompt(request);
    
    // Execute request
    const result = await provider.complete(
      request.prompt,
      model,
      {
        systemPrompt,
        temperature: request.accuracyRequired === 'critical' ? 0.2 : 0.7,
        maxTokens: 2000,
      }
    );
    
    return {
      id: `RESP-${Date.now()}`,
      requestId: request.id,
      model,
      provider: useOpenRouter ? AIProvider.OPENROUTER : AIProvider.ANTHROPIC,
      response: result.response,
      confidence: 0.85, // Default confidence for direct responses
      metadata: {
        tokensUsed: result.tokensUsed,
        latency: Date.now() - startTime,
        cost: result.cost,
        cacheHit: false,
      },
      timestamp: new Date(),
    };
  }
  
  /**
   * Create system prompt based on request context
   */
  private createSystemPrompt(request: AIRequest): string {
    let prompt = `You are an AI assistant for Disaster Recovery Australia, specialising in emergency response and restoration services.
    Use Australian English spelling and terminology.
    Provide practical, actionable advice.`;
    
    if (request.priority === 'emergency') {
      prompt += '\nThis is an EMERGENCY situation. Prioritize immediate safety and provide clear, urgent guidance.';
    }
    
    if (request.context) {
      prompt += `\nContext: ${JSON.stringify(request.context)}`;
    }
    
    if (request.accuracyRequired === 'critical') {
      prompt += '\nAccuracy is CRITICAL. Double-check all information and be conservative in recommendations.';
    }
    
    return prompt;
  }
  
  /**
   * Test provider connections
   */
  async testConnections(): Promise<{
    openrouter: boolean;
    anthropic: boolean;
  }> {
    const [openrouterOk, anthropicOk] = await Promise.all([
      this.openrouter.testConnection(),
      this.anthropic.testConnection(),
    ]);
    
    return {
      openrouter: openrouterOk,
      anthropic: anthropicOk,
    };
  }
  
  /**
   * Get system health status
   */
  async getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    providers: Record<string, boolean>;
    requestsProcessed: number;
  }> {
    const connections = await this.testConnections();
    const allHealthy = connections.openrouter && connections.anthropic;
    const someHealthy = connections.openrouter || connections.anthropic;
    
    return {
      status: allHealthy ? 'healthy' : someHealthy ? 'degraded' : 'unhealthy',
      providers: connections,
      requestsProcessed: this.requestCount,
    };
  }
}

// Export singleton instance
export const orchestrationService = new SimpleOrchestrator();