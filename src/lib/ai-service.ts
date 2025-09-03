/**
 * AI Service Implementation for Disaster Recovery
 * Production-ready AI abstraction layer with intelligent routing
 */

import {
  AIMessage,
  AIResponse,
  AIProvider,
  AIProviderConfig,
  AITaskContext,
  AITaskType,
  AIRoutingRule,
  AIServiceConfig,
  AIMetrics,
  IAIService,
  AICacheEntry
} from '@/types/ai-service';
import logger from '@/lib/logger';

// Define AIServiceError class since it's not exported from types
class AIServiceError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export class AIService implements IAIService {
  private config: AIServiceConfig;
  private cache: Map<string, AICacheEntry> = new Map();
  private metrics: AIMetrics;
  private circuitBreakers: Map<AIProvider, {
    failures: number;
    lastFailure: Date;
    isOpen: boolean;
  }> = new Map();

  constructor(config: AIServiceConfig) {
    this.config = config;
    this.initializeMetrics();
    this.initializeCircuitBreakers();
    this.startCacheCleanup();
  }

  private initializeMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      totalCost: 0,
      cacheHitRate: 0,
      providerMetrics: {}
    };

    // Initialize provider metrics
    this.config.providers.forEach(provider => {
      this.metrics.providerMetrics[provider.provider] = {
        requests: 0,
        successes: 0,
        failures: 0,
        averageResponseTime: 0,
        totalCost: 0
      };
    });
  }

  private initializeCircuitBreakers(): void {
    this.config.providers.forEach(provider => {
      this.circuitBreakers.set(provider.provider, {
        failures: 0,
        lastFailure: new Date(0),
        isOpen: false
      });
    });
  }

  private startCacheCleanup(): void {
    setInterval(() => {
      this.cleanExpiredCache();
    }, 60000); // Clean every minute
  }

  private cleanExpiredCache(): void {
    const now = new Date();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt < now) {
        this.cache.delete(key);
      }
    }
  }

  private generateCacheKey(messages: AIMessage[], context: AITaskContext): string {
    const messageContent = messages.map(m => `${m.role}:${m.content}`).join('|');
    const contextKey = `${context.type}:${context.priority}:${context.accuracyRequired}`;
    
    if (this.config.cache.keyStrategy === 'content-hash') {
      return this.hashString(messageContent + contextKey);
    }
    
    return this.hashString(JSON.stringify({ messages, context }));
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  private getFromCache(key: string): AICacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (entry.expiresAt < new Date()) {
      this.cache.delete(key);
      return null;
    }
    
    entry.hitCount++;
    entry.lastAccessed = new Date();
    return entry;
  }

  private setCache(key: string, response: AIResponse): void {
    if (!this.config.cache.enabled) return;
    
    const entry: AICacheEntry = {
      key,
      response,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.config.cache.ttl * 1000),
      hitCount: 0,
      lastAccessed: new Date()
    };
    
    this.cache.set(key, entry);
    
    // Remove oldest entries if cache is full
    if (this.cache.size > this.config.cache.maxSize) {
      const oldest = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.lastAccessed.getTime() - b.lastAccessed.getTime())[0];
      this.cache.delete(oldest[0]);
    }
  }

  private selectProvider(context: AITaskContext, preferredProvider?: AIProvider): AIProvider[] {
    const routing = this.config.routing.find(r => r.taskType === context.type);
    if (!routing) {
      // Default routing based on task characteristics
      return this.getDefaultProvidersForTask(context);
    }

    let providers: AIProvider[] = [];
    
    // Add preferred provider first if specified and available
    if (preferredProvider && this.isProviderAvailable(preferredProvider)) {
      providers.push(preferredProvider);
    }
    
    // Add providers from routing rules
    providers.push(...routing.preferredProviders.filter(p => 
      this.isProviderAvailable(p) && !providers.includes(p)
    ));
    
    // Add fallback providers
    providers.push(...routing.fallbackProviders.filter(p => 
      this.isProviderAvailable(p) && !providers.includes(p)
    ));
    
    return providers;
  }

  private getDefaultProvidersForTask(context: AITaskContext): AIProvider[] {
    switch (context.type) {
      case AITaskType.DAMAGE_ASSESSMENT:
      case AITaskType.SAFETY_ANALYSIS:
      case AITaskType.COMPLIANCE_REVIEW:
        // Use GPT-OSS-120B for high accuracy tasks
        return [AIProvider.OPENROUTER_GPT_OSS_120B, AIProvider.ANTHROPIC_CLAUDE];
        
      case AITaskType.BUSINESS_ANALYTICS:
      case AITaskType.MARKET_ANALYSIS:
        // Complex reasoning tasks - prefer Claude
        return [AIProvider.ANTHROPIC_CLAUDE, AIProvider.OPENROUTER_GPT_OSS_120B];
        
      case AITaskType.CONTENT_GENERATION:
      case AITaskType.EMAIL_RESPONSES:
      case AITaskType.FAQ_ANSWERS:
        // Speed-optimised tasks - prefer faster/cheaper option
        return [AIProvider.OPENROUTER_GPT_OSS_120B, AIProvider.ANTHROPIC_CLAUDE];
        
      default:
        return [AIProvider.ANTHROPIC_CLAUDE, AIProvider.OPENROUTER_GPT_OSS_120B];
    }
  }

  private isProviderAvailable(provider: AIProvider): boolean {
    const config = this.config.providers.find(p => p.provider === provider);
    if (!config || !config.enabled) return false;
    
    const breaker = this.circuitBreakers.get(provider);
    if (!breaker) return true;
    
    // Check if circuit breaker is open
    if (breaker.isOpen) {
      const timeSinceLastFailure = Date.now() - breaker.lastFailure.getTime();
      const resetTimeout = 60000; // 1 minute
      
      if (timeSinceLastFailure > resetTimeout) {
        breaker.isOpen = false;
        breaker.failures = 0;
      } else {
        return false;
      }
    }
    
    return true;
  }

  private async makeProviderRequest(
    provider: AIProvider,
    messages: AIMessage[],
    context: AITaskContext
  ): Promise<AIResponse> {
    const startTime = Date.now();
    const config = this.config.providers.find(p => p.provider === provider);
    
    if (!config) {
      throw new AIServiceError({
        code: 'PROVIDER_NOT_CONFIGURED',
        message: `Provider ${provider} is not configured`,
        provider,
        retryable: false
      });
    }
    
    try {
      let response: AIResponse;
      
      switch (provider) {
        case AIProvider.OPENROUTER_GPT_OSS_120B:
          response = await this.callOpenRouter(config, messages, context);
          break;
          
        case AIProvider.ANTHROPIC_CLAUDE:
          response = await this.callAnthropic(config, messages, context);
          break;
          
        default:
          throw new AIServiceError({
            code: 'UNSUPPORTED_PROVIDER',
            message: `Provider ${provider} is not supported`,
            provider,
            retryable: false
          });
      }
      
      response.responseTime = Date.now() - startTime;
      
      // Update metrics
      this.updateMetrics(provider, true, response);
      
      // Reset circuit breaker on success
      const breaker = this.circuitBreakers.get(provider);
      if (breaker) {
        breaker.failures = 0;
        breaker.isOpen = false;
      }
      
      return response;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Update circuit breaker
      this.updateCircuitBreaker(provider, error);
      
      // Update metrics
      this.updateMetrics(provider, false, null, responseTime);
      
      throw error;
    }
  }

  private async callOpenRouter(
    config: AIProviderConfig,
    messages: AIMessage[],
    context: AITaskContext
  ): Promise<AIResponse> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorisation': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': 'Disaster Recovery AI Service'
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content
        })),
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        stream: false
      })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new AIServiceError({
        code: 'OPENROUTER_API_ERROR',
        message: error.error?.message || `HTTP ${response.status}`,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        retryable: response.status >= 500,
        context: error
      });
    }
    
    const data = await response.json();
    
    return {
      content: data.choices[0]?.message?.content || '',
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
        cost: (data.usage?.total_tokens || 0) * config.costPerToken
      },
      model: data.model || config.model,
      provider: AIProvider.OPENROUTER_GPT_OSS_120B,
      responseTime: 0 // Will be set by caller
    };
  }

  private async callAnthropic(
    config: AIProviderConfig,
    messages: AIMessage[],
    context: AITaskContext
  ): Promise<AIResponse> {
    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        system: systemMessage?.content,
        messages: conversationMessages.map(m => ({
          role: m.role,
          content: m.content
        }))
      })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new AIServiceError({
        code: 'ANTHROPIC_API_ERROR',
        message: error.error?.message || `HTTP ${response.status}`,
        provider: AIProvider.ANTHROPIC_CLAUDE,
        retryable: response.status >= 500,
        context: error
      });
    }
    
    const data = await response.json();
    
    return {
      content: data.content[0]?.text || '',
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
        cost: ((data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)) * config.costPerToken
      },
      model: data.model || config.model,
      provider: AIProvider.ANTHROPIC_CLAUDE,
      responseTime: 0 // Will be set by caller
    };
  }

  private updateCircuitBreaker(provider: AIProvider, error: any): void {
    const breaker = this.circuitBreakers.get(provider);
    if (!breaker) return;
    
    breaker.failures++;
    breaker.lastFailure = new Date();
    
    // Open circuit breaker after 3 failures
    if (breaker.failures >= 3) {
      breaker.isOpen = true;
      logger.warn(`Circuit breaker opened for provider: ${provider}`, { failures: breaker.failures });
    }
  }

  private updateMetrics(
    provider: AIProvider,
    success: boolean,
    response: AIResponse | null,
    responseTime?: number
  ): void {
    this.metrics.totalRequests++;
    
    if (success) {
      this.metrics.successfulRequests++;
      if (response) {
        this.metrics.totalCost += response.usage.cost || 0;
      }
    } else {
      this.metrics.failedRequests++;
    }
    
    // Update provider metrics
    const providerMetrics = this.metrics.providerMetrics[provider];
    if (providerMetrics) {
      providerMetrics.requests++;
      
      if (success) {
        providerMetrics.successes++;
        if (response) {
          providerMetrics.totalCost += response.usage.cost || 0;
          providerMetrics.averageResponseTime = 
            (providerMetrics.averageResponseTime * (providerMetrics.successes - 1) + response.responseTime) / 
            providerMetrics.successes;
        }
      } else {
        providerMetrics.failures++;
      }
    }
    
    // Update cache hit rate
    const totalCacheAttempts = this.metrics.totalRequests;
    const cacheHits = Array.from(this.cache.values()).reduce((sum, entry) => sum + entry.hitCount, 0);
    this.metrics.cacheHitRate = totalCacheAttempts > 0 ? cacheHits / totalCacheAttempts : 0;
  }

  // Public API Methods
  async generateResponse(
    messages: AIMessage[],
    context: AITaskContext,
    options?: {
      stream?: boolean;
      preferredProvider?: AIProvider;
      maxRetries?: number;
    }
  ): Promise<AIResponse> {
    const startTime = Date.now();
    const maxRetries = options?.maxRetries || this.config.fallback.maxRetries;
    
    // Check cache first
    if (this.config.cache.enabled) {
      const cacheKey = this.generateCacheKey(messages, context);
      const cached = this.getFromCache(cacheKey);
      
      if (cached) {
        logger.info('AI response served from cache', { taskType: context.type });
        return { ...cached.response, cached: true };
      }
    }
    
    const providers = this.selectProvider(context, options?.preferredProvider);
    let lastError: AIServiceError | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      for (const provider of providers) {
        try {
          const response = await this.makeProviderRequest(provider, messages, context);
          
          // Cache the response
          if (this.config.cache.enabled) {
            const cacheKey = this.generateCacheKey(messages, context);
            this.setCache(cacheKey, response);
          }
          
          logger.info('AI response generated successfully', {
            provider,
            taskType: context.type,
            responseTime: Date.now() - startTime,
            attempt: attempt + 1
          });
          
          return response;
          
        } catch (error) {
          lastError = error instanceof AIServiceError ? error : new AIServiceError({
            code: 'UNKNOWN_ERROR',
            message: error instanceof Error ? error.message : 'Unknown error',
            provider,
            retryable: true,
            context: error
          });
          
          logger.warn('AI provider failed, trying next provider', {
            provider,
            error: lastError.message,
            attempt: attempt + 1,
            retriesLeft: maxRetries - attempt - 1
          });
          
          if (!lastError.retryable) break;
        }
      }
      
      // Wait before retry with exponential backoff
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(this.config.fallback.backoffMultiplier, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // All providers failed
    logger.error('All AI providers failed', {
      taskType: context.type,
      attempts: maxRetries,
      totalTime: Date.now() - startTime,
      lastError: lastError?.message
    });
    
    throw lastError || new AIServiceError({
      code: 'ALL_PROVIDERS_FAILED',
      message: 'All AI providers failed to respond',
      retryable: false
    });
  }

  async generateStreamingResponse(
    messages: AIMessage[],
    context: AITaskContext,
    callback: (chunk: string) => void,
    options?: {
      preferredProvider?: AIProvider;
      maxRetries?: number;
    }
  ): Promise<AIResponse> {
    // For now, fall back to regular response
    // Streaming can be implemented later
    const response = await this.generateResponse(messages, context, {
      ...options,
      stream: false
    });
    
    callback(response.content);
    return response;
  }

  async getHealthStatus(): Promise<Record<AIProvider, boolean>> {
    const status: Record<AIProvider, boolean> = {} as any;
    
    for (const providerConfig of this.config.providers) {
      try {
        // Simple health check - try a minimal request
        await this.makeProviderRequest(
          providerConfig.provider,
          [{ role: 'user', content: 'ping' }],
          {
            type: AITaskType.FAQ_ANSWERS,
            priority: 'low',
            maxResponseTime: 5000,
            accuracyRequired: 'standard',
            costSensitive: true
          }
        );
        status[providerConfig.provider] = true;
      } catch {
        status[providerConfig.provider] = false;
      }
    }
    
    return status;
  }

  async getMetrics(): Promise<AIMetrics> {
    return { ...this.metrics };
  }

  async clearCache(pattern?: string): Promise<void> {
    if (pattern) {
      const regex = new RegExp(pattern);
      for (const [key] of this.cache.entries()) {
        if (regex.test(key)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  async getCacheStats(): Promise<{
    size: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  }> {
    const totalHits = Array.from(this.cache.values()).reduce((sum, entry) => sum + entry.hitCount, 0);
    const totalAttempts = this.metrics.totalRequests;
    const totalMisses = totalAttempts - totalHits;
    
    return {
      size: this.cache.size,
      hitRate: totalAttempts > 0 ? totalHits / totalAttempts : 0,
      totalHits,
      totalMisses
    };
  }
}