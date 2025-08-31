/**
 * Real API Client for Claude Integration
 * Handles actual API calls to Anthropic or OpenRouter
 */

import axios from 'axios';
import { EventEmitter } from 'events';

interface APIConfig {
  provider: 'anthropic' | 'openrouter';
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

interface APIRequest {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  stopSequences?: string[];
}

interface APIResponse {
  content: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  model: string;
  finishReason: string;
}

export class ClaudeAPIClient extends EventEmitter {
  private config: APIConfig;
  private requestCount: number = 0;
  private tokenUsage: number = 0;

  constructor(config: APIConfig) {
    super();
    this.config = config;
  }

  /**
   * Make a real API call to Claude
   */
  async complete(request: APIRequest): Promise<APIResponse> {
    this.requestCount++;
    this.emit('request:start', { requestId: this.requestCount, request });

    try {
      if (this.config.provider === 'anthropic') {
        return await this.callAnthropic(request);
      } else if (this.config.provider === 'openrouter') {
        return await this.callOpenRouter(request);
      } else {
        throw new Error(`Unsupported provider: ${this.config.provider}`);
      }
    } catch (error) {
      this.emit('request:error', { requestId: this.requestCount, error });
      throw error;
    }
  }

  /**
   * Call Anthropic API directly
   */
  private async callAnthropic(request: APIRequest): Promise<APIResponse> {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: this.config.model,
          max_tokens: request.maxTokens || this.config.maxTokens,
          temperature: request.temperature || this.config.temperature,
          system: request.systemPrompt,
          messages: [
            {
              role: 'user',
              content: request.prompt
            }
          ],
          stop_sequences: request.stopSequences
        },
        {
          headers: {
            'x-api-key': this.config.apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
          },
          timeout: 120000 // 2 minute timeout for Opus 4.1
        }
      );

    const result = response.data;
    const apiResponse: APIResponse = {
      content: result.content[0].text,
      usage: {
        inputTokens: result.usage.input_tokens,
        outputTokens: result.usage.output_tokens,
        totalTokens: result.usage.input_tokens + result.usage.output_tokens
      },
      model: result.model,
      finishReason: result.stop_reason
    };

    this.tokenUsage += apiResponse.usage.totalTokens;
    this.emit('request:complete', { 
      requestId: this.requestCount, 
      response: apiResponse 
    });

    return apiResponse;
    } catch (error: any) {
      console.error('API Error Details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        model: this.config.model
      });
      throw error;
    }
  }

  /**
   * Call OpenRouter API (alternative provider)
   */
  private async callOpenRouter(request: APIRequest): Promise<APIResponse> {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: this.config.model,
        max_tokens: request.maxTokens || this.config.maxTokens,
        temperature: request.temperature || this.config.temperature,
        messages: [
          ...(request.systemPrompt ? [{
            role: 'system',
            content: request.systemPrompt
          }] : []),
          {
            role: 'user',
            content: request.prompt
          }
        ],
        stop: request.stopSequences
      },
      {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'HTTP-Referer': 'https://disasterrecovery.com.au',
          'X-Title': 'Disaster Recovery Orchestrator',
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data;
    const apiResponse: APIResponse = {
      content: result.choices[0].message.content,
      usage: {
        inputTokens: result.usage.prompt_tokens,
        outputTokens: result.usage.completion_tokens,
        totalTokens: result.usage.total_tokens
      },
      model: result.model,
      finishReason: result.choices[0].finish_reason
    };

    this.tokenUsage += apiResponse.usage.totalTokens;
    this.emit('request:complete', { 
      requestId: this.requestCount, 
      response: apiResponse 
    });

    return apiResponse;
  }

  /**
   * Get usage statistics
   */
  getStats() {
    return {
      requestCount: this.requestCount,
      tokenUsage: this.tokenUsage,
      estimatedCost: this.calculateCost()
    };
  }

  /**
   * Calculate estimated cost based on token usage
   */
  private calculateCost(): number {
    // Claude 3 Sonnet pricing (approximate)
    const inputCostPer1K = 0.003;
    const outputCostPer1K = 0.015;
    
    // Rough estimate (would need to track input/output separately for accuracy)
    return (this.tokenUsage / 1000) * ((inputCostPer1K + outputCostPer1K) / 2);
  }

  /**
   * Stream completion (for real-time responses)
   */
  async *streamComplete(request: APIRequest): AsyncGenerator<string> {
    // Implementation for streaming responses
    // This would use SSE or WebSocket for real-time streaming
    
    const response = await this.complete(request);
    
    // Simulate streaming by yielding chunks
    const chunks = response.content.match(/.{1,100}/g) || [];
    for (const chunk of chunks) {
      yield chunk;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}