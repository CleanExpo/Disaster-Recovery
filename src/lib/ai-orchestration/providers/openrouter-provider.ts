/**
 * OpenRouter Provider Integration
 * Handles communication with GPT-OSS-120B and other OpenRouter models
 */

import axios, { AxiosInstance } from 'axios';
import { AIModel, AIProvider, AIRequest, AIResponse, ThinkingStep } from '../core/types';

export class OpenRouterProvider {
  private client: AxiosInstance;
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenRouter API key not configured');
    }
    
    this.client = axios.create({
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        'Authorisation': `Bearer ${this.apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au',
        'X-Title': 'Disaster Recovery',
        'Content-Type': 'application/json',
      },
      timeout: 60000, // 60 second timeout for complex reasoning
    });
  }
  
  /**
   * Send a request to OpenRouter
   */
  async complete(
    prompt: string,
    model: AIModel = AIModel.GPT_OSS_120B,
    options: {
      maxTokens?: number;
      temperature?: number;
      systemPrompt?: string;
      streamCallback?: (chunk: string) => void;
    } = {}
  ): Promise<{
    response: string;
    tokensUsed: number;
    cost: number;
    latency: number;
  }> {
    const startTime = Date.now();
    
    try {
      const modelMapping: Record<AIModel, string> = {
        [AIModel.GPT_OSS_120B]: 'gpt-oss-120b',
        [AIModel.GPT_4_TURBO]: 'openai/gpt-4-turbo-preview',
        [AIModel.CLAUDE_3_OPUS]: 'anthropic/claude-3-opus',
        [AIModel.CLAUDE_3_SONNET]: 'anthropic/claude-3-sonnet',
      };
      
      const messages = [];
      
      if (options.systemPrompt) {
        messages.push({
          role: 'system',
          content: options.systemPrompt,
        });
      }
      
      messages.push({
        role: 'user',
        content: prompt,
      });
      
      const response = await this.client.post('/chat/completions', {
        model: modelMapping[model] || 'gpt-oss-120b',
        messages,
        max_tokens: options.maxTokens || 4000,
        temperature: options.temperature || 0.7,
        stream: !!options.streamCallback,
      });
      
      const latency = Date.now() - startTime;
      
      if (options.streamCallback) {
        // Handle streaming response
        return this.handleStreamResponse(response.data, options.streamCallback, latency);
      }
      
      // Handle regular response
      const content = response.data.choices[0]?.message?.content || '';
      const usage = response.data.usage || {};
      
      return {
        response: content,
        tokensUsed: usage.total_tokens || 0,
        cost: this.calculateCost(usage.total_tokens || 0, model),
        latency,
      };
      
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error(`OpenRouter request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Execute sequential thinking with GPT-OSS-120B
   */
  async sequentialThinking(
    prompt: string,
    context: Record<string, any>,
    maxSteps: number = 10,
    onStepComplete?: (step: ThinkingStep) => void
  ): Promise<{
    finalAnswer: string;
    steps: ThinkingStep[];
    confidence: number;
    tokensUsed: number;
    cost: number;
  }> {
    const steps: ThinkingStep[] = [];
    let currentThought = '';
    let totalTokens = 0;
    let totalCost = 0;
    
    const systemPrompt = `You are an expert AI using sequential thinking to solve complex problems.
    Break down the problem into logical steps and think through each step carefully.
    For each step:
    1. State what you're analysing
    2. Provide your reasoning
    3. Rate your confidence (0-1)
    4. Determine if you need to revise any previous steps
    
    Context: ${JSON.stringify(context)}
    
    Use this format for each step:
    STEP [number]: [description]
    THOUGHT: [your detailed reasoning]
    CONFIDENCE: [0-1]
    REVISION: [yes/no, if yes explain what step to revise]
    CONTINUE: [yes/no]`;
    
    let stepCount = 0;
    let shouldContinue = true;
    
    while (shouldContinue && stepCount < maxSteps) {
      stepCount++;
      const stepStartTime = Date.now();
      
      const stepPrompt = stepCount === 1 
        ? `${prompt}\n\nBegin your sequential analysis.`
        : `Continue from step ${stepCount - 1}. Previous thought: ${currentThought}`;
      
      const result = await this.complete(stepPrompt, AIModel.GPT_OSS_120B, {
        systemPrompt,
        temperature: 0.3, // Lower temperature for consistent reasoning
        maxTokens: 1000,
      });
      
      // Parse the step response
      const stepData = this.parseThinkingStep(result.response, stepCount);
      stepData.duration = Date.now() - stepStartTime;
      
      steps.push(stepData);
      currentThought = stepData.thought;
      totalTokens += result.tokensUsed;
      totalCost += result.cost;
      
      // Callback for real-time updates
      if (onStepComplete) {
        onStepComplete(stepData);
      }
      
      // Check if we should continue
      shouldContinue = result.response.includes('CONTINUE: yes') && stepData.confidence < 0.95;
      
      // Handle revisions
      if (stepData.revision && stepData.revisedFrom) {
        // Re-evaluate from the revised step
        stepCount = stepData.revisedFrom;
      }
    }
    
    // Generate final answer
    const finalPrompt = `Based on the sequential thinking process with ${steps.length} steps, provide a final, concise answer to: ${prompt}`;
    
    const finalResult = await this.complete(finalPrompt, AIModel.GPT_OSS_120B, {
      systemPrompt: 'Provide a clear, actionable answer based on the analysis.',
      temperature: 0.2,
      maxTokens: 500,
    });
    
    totalTokens += finalResult.tokensUsed;
    totalCost += finalResult.cost;
    
    // Calculate overall confidence
    const avgConfidence = steps.reduce((sum, step) => sum + step.confidence, 0) / steps.length;
    
    return {
      finalAnswer: finalResult.response,
      steps,
      confidence: avgConfidence,
      tokensUsed: totalTokens,
      cost: totalCost,
    };
  }
  
  /**
   * Parse thinking step from response
   */
  private parseThinkingStep(response: string, stepNumber: number): ThinkingStep {
    const confidenceMatch = response.match(/CONFIDENCE:\s*([\d.]+)/);
    const revisionMatch = response.match(/REVISION:\s*yes.*step\s*(\d+)/i);
    const thoughtMatch = response.match(/THOUGHT:\s*(.+?)(?=CONFIDENCE:|REVISION:|$)/s);
    
    return {
      step: stepNumber,
      thought: thoughtMatch ? thoughtMatch[1].trim() : response,
      confidence: confidenceMatch ? parseFloat(confidenceMatch[1]) : 0.5,
      duration: 0,
      revision: !!revisionMatch,
      revisedFrom: revisionMatch ? parseInt(revisionMatch[1]) : undefined,
    };
  }
  
  /**
   * Handle streaming response
   */
  private async handleStreamResponse(
    stream: any,
    callback: (chunk: string) => void,
    latency: number
  ): Promise<{
    response: string;
    tokensUsed: number;
    cost: number;
    latency: number;
  }> {
    let fullResponse = '';
    let tokenCount = 0;
    
    // In production, implement proper SSE parsing
    // For now, return accumulated response
    stream.on('data', (chunk: any) => {
      const text = chunk.toString();
      fullResponse += text;
      callback(text);
    });
    
    await new Promise((resolve) => stream.on('end', resolve));
    
    // Estimate tokens (rough approximation)
    tokenCount = Math.ceil(fullResponse.length / 4);
    
    return {
      response: fullResponse,
      tokensUsed: tokenCount,
      cost: this.calculateCost(tokenCount, AIModel.GPT_OSS_120B),
      latency,
    };
  }
  
  /**
   * Calculate cost based on tokens and model
   */
  private calculateCost(tokens: number, model: AIModel): number {
    // Cost per 1M tokens
    const pricing: Record<AIModel, number> = {
      [AIModel.GPT_OSS_120B]: 15.0,
      [AIModel.GPT_4_TURBO]: 30.0,
      [AIModel.CLAUDE_3_OPUS]: 75.0,
      [AIModel.CLAUDE_3_SONNET]: 15.0,
    };
    
    const costPerMillion = pricing[model] || 15.0;
    return (tokens / 1000000) * costPerMillion;
  }
  
  /**
   * Test connection to OpenRouter
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get('/models');
      return response.status === 200;
    } catch (error) {
      console.error('OpenRouter connection test failed:', error);
      return false;
    }
  }
  
  /**
   * Get available models
   */
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await this.client.get('/models');
      return response.data.data.map((model: any) => model.id);
    } catch (error) {
      console.error('Failed to fetch OpenRouter models:', error);
      return [];
    }
  }
}