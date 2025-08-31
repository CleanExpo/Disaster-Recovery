/**
 * Anthropic Provider Integration
 * Handles communication with Claude models
 */

import Anthropic from '@anthropic-ai/sdk';
import { AIModel, AIRequest, AIResponse } from '../core/types';

export class AnthropicProvider {
  private client: Anthropic;
  
  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY || '';
    
    if (!apiKey) {
      console.warn('Anthropic API key not configured');
    }
    
    this.client = new Anthropic({
      apiKey });
  }
  
  /**
   * Send a request to Claude
   */
  async complete(
    prompt: string,
    model: AIModel = AIModel.CLAUDE_SONNET_LATEST,
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
        [AIModel.CLAUDE_3_OPUS]: 'claude-3-opus-20240229',
        [AIModel.CLAUDE_3_SONNET]: 'claude-3-5-sonnet-20241022',
        [AIModel.CLAUDE_3_HAIKU]: 'claude-3-5-haiku-20241022',
        [AIModel.CLAUDE_SONNET_LATEST]: 'claude-3-5-sonnet-latest',
        [AIModel.GPT_OSS_120B]: 'claude-3-5-sonnet-latest', // Fallback to latest
        [AIModel.GPT_4_TURBO]: 'claude-3-5-sonnet-latest', // Fallback to latest
      };
      
      const messages: Anthropic.MessageParam[] = [{
        role: 'user',
        content: prompt }];
      
      if (options.streamCallback) {
        // Handle streaming
        const stream = await this.client.messages.create({
          model: modelMapping[model],
          max_tokens: options.maxTokens || 4000,
          temperature: options.temperature || 0.7,
          system: options.systemPrompt,
          messages,
          stream: true });
        
        let fullResponse = '';
        let tokenCount = 0;
        
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            const text = chunk.delta.text;
            fullResponse += text;
            options.streamCallback(text);
          }
        }
        
        const latency = Date.now() - startTime;
        tokenCount = Math.ceil(fullResponse.length / 4); // Rough estimate
        
        return {
          response: fullResponse,
          tokensUsed: tokenCount,
          cost: this.calculateCost(tokenCount, model),
          latency };
      } else {
        // Regular request
        const response = await this.client.messages.create({
          model: modelMapping[model],
          max_tokens: options.maxTokens || 4000,
          temperature: options.temperature || 0.7,
          system: options.systemPrompt,
          messages });
        
        const latency = Date.now() - startTime;
        const content = response.content[0].type === 'text' ? response.content[0].text : '';
        
        return {
          response: content,
          tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens || 0,
          cost: this.calculateCost(response.usage?.input_tokens + response.usage?.output_tokens || 0, model),
          latency };
      }
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw new Error(`Anthropic request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Quick response for emergency situations
   */
  async quickResponse(
    prompt: string,
    context?: Record<string, any>
  ): Promise<{
    response: string;
    confidence: number;
    latency: number;
  }> {
    const startTime = Date.now();
    
    const systemPrompt = `You are an emergency response AI for Disaster Recovery.
    Provide immediate, actionable advice. Be concise but thorough.
    Context: ${context ? JSON.stringify(context) : 'General query'}`;
    
    const result = await this.complete(prompt, AIModel.CLAUDE_SONNET_LATEST, {
      systemPrompt,
      temperature: 0.3,
      maxTokens: 500 });
    
    return {
      response: result.response,
      confidence: 0.9, // Claude is highly reliable for direct responses
      latency: Date.now() - startTime };
  }
  
  /**
   * Generate code implementation
   */
  async generateCode(
    specification: string,
    language: string = 'typescript',
    context?: Record<string, any>
  ): Promise<{
    code: string;
    explanation: string;
    confidence: number;
  }> {
    const systemPrompt = `You are an expert ${language} developer.
    Generate clean, well-commented, production-ready code.
    Follow best practices and include error handling.
    Context: ${context ? JSON.stringify(context) : 'No additional context'}`;
    
    const prompt = `Generate ${language} code for: ${specification}
    
    Requirements:
    1. Include proper type definitions (if applicable)
    2. Add error handling
    3. Include comments
    4. Follow Australian English spelling in comments
    5. Provide a brief explanation of the implementation`;
    
    const result = await this.complete(prompt, AIModel.CLAUDE_SONNET_LATEST, {
      systemPrompt,
      temperature: 0.2,
      maxTokens: 2000 });
    
    // Parse code and explanation
    const codeMatch = result.response.match(/```[\w]*\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1] : result.response;
    
    const explanationMatch = result.response.match(/Explanation:([\s\S]*?)(?=```|$)/);
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'Code generated successfully.';
    
    return {
      code,
      explanation,
      confidence: 0.92, // Claude excels at code generation
    };
  }
  
  /**
   * Calculate cost based on tokens and model
   */
  private calculateCost(tokens: number, model: AIModel): number {
    // Cost per 1M tokens
    const pricing: Record<AIModel, number> = {
      [AIModel.CLAUDE_3_OPUS]: 75.0,
      [AIModel.CLAUDE_3_SONNET]: 15.0,
      [AIModel.CLAUDE_3_HAIKU]: 8.0,
      [AIModel.CLAUDE_SONNET_LATEST]: 15.0, // Latest Sonnet
      [AIModel.GPT_OSS_120B]: 15.0, // N/A for Anthropic
      [AIModel.GPT_4_TURBO]: 30.0, // N/A for Anthropic
    };
    
    const costPerMillion = pricing[model] || 15.0;
    return (tokens / 1000000) * costPerMillion;
  }
  
  /**
   * Test connection to Anthropic
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.complete('Test connection', AIModel.CLAUDE_SONNET_LATEST, {
        maxTokens: 10 });
      return true;
    } catch (error) {
      console.error('Anthropic connection test failed:', error);
      return false;
    }
  }
}