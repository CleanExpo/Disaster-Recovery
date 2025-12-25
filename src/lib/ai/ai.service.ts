import { HfInference } from '@huggingface/inference';
import { LRUCache } from 'lru-cache';
import { logger } from '../logger';

/**
 * AI Service Layer with Hugging Face Integration
 * Production-Ready AI Processing with Caching
 */

export interface AIServiceConfig {
  apiKey?: string;
  modelName?: string;
  maxCacheSize?: number;
  cacheTTL?: number;
}

export interface TextProcessingOptions {
  maxLength?: number;
  temperature?: number;
  topP?: number;
  doSample?: boolean;
}

export interface SummarizationOptions extends TextProcessingOptions {
  minLength?: number;
  maxLength?: number;
}

export interface ExtractionOptions {
  extractTypes?: string[];
  confidence?: number;
}

export interface AnalysisResult {
  sentiment?: {
    label: string;
    score: number;
  };
  topics?: string[];
  entities?: Array<{
    text: string;
    type: string;
    confidence: number;
  }>;
  keyPhrases?: string[];
}

/**
 * AI Service with Caching and Rate Limiting
 */
class AIService {
  private static instance: AIService;
  private hf: HfInference;
  private cache: LRUCache<string, any>;
  private config: AIServiceConfig;
  private requestCount = 0;
  private lastResetTime = Date.now();

  private constructor(config: AIServiceConfig = {}) {
    this.config = {
      apiKey: config.apiKey || process.env.HUGGINGFACE_API_KEY,
      modelName: config.modelName || process.env.AI_MODEL_NAME || 'gpt2',
      maxCacheSize: config.maxCacheSize || 1000,
      cacheTTL: config.cacheTTL || 1000 * 60 * 60, // 1 hour
    };

    // Initialize Hugging Face client
    this.hf = new HfInference(this.config.apiKey);

    // Initialize LRU cache
    this.cache = new LRUCache<string, any>({
      max: this.config.maxCacheSize,
      ttl: this.config.cacheTTL,
    });

    logger.info('AI Service initialized', {
      modelName: this.config.modelName,
      cacheSize: this.config.maxCacheSize,
    });
  }

  public static getInstance(config?: AIServiceConfig): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService(config);
    }
    return AIService.instance;
  }

  /**
   * Generate cache key
   */
  private getCacheKey(method: string, input: string, options?: any): string {
    const optionsStr = options ? JSON.stringify(options) : '';
    return `${method}:${input}:${optionsStr}`;
  }

  /**
   * Check rate limit
   */
  private checkRateLimit(): boolean {
    const now = Date.now();
    const timeDiff = now - this.lastResetTime;

    // Reset counter every minute
    if (timeDiff >= 60000) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }

    // Allow 60 requests per minute
    if (this.requestCount >= 60) {
      logger.warn('Rate limit exceeded');
      return false;
    }

    this.requestCount++;
    return true;
  }

  /**
   * Process text with AI model
   */
  public async processText(
    input: string,
    options: TextProcessingOptions = {}
  ): Promise<string> {
    try {
      if (!this.checkRateLimit()) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      const cacheKey = this.getCacheKey('processText', input, options);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        logger.debug('Returning cached result for processText');
        return cached;
      }

      logger.info('Processing text with AI model');
      const response = await this.hf.textGeneration({
        model: this.config.modelName!,
        inputs: input,
        parameters: {
          max_new_tokens: options.maxLength || 150,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 0.9,
          do_sample: options.doSample !== false,
        },
      });

      const result = response.generated_text;
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error('Error processing text:', error);
      throw new Error(`AI processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Summarize text
   */
  public async summarizeText(
    input: string,
    options: SummarizationOptions = {}
  ): Promise<string> {
    try {
      if (!this.checkRateLimit()) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      const cacheKey = this.getCacheKey('summarize', input, options);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        logger.debug('Returning cached result for summarization');
        return cached;
      }

      logger.info('Summarizing text');
      const response = await this.hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: input,
        parameters: {
          min_length: options.minLength || 30,
          max_length: options.maxLength || 130,
        },
      });

      const result = response.summary_text;
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error('Error summarizing text:', error);
      throw new Error(`Summarization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract entities and information
   */
  public async extractInformation(
    input: string,
    options: ExtractionOptions = {}
  ): Promise<AnalysisResult> {
    try {
      if (!this.checkRateLimit()) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      const cacheKey = this.getCacheKey('extract', input, options);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        logger.debug('Returning cached result for extraction');
        return cached;
      }

      logger.info('Extracting information from text');

      // Perform named entity recognition
      const entities = await this.hf.tokenClassification({
        model: 'dbmdz/bert-large-cased-finetuned-conll03-english',
        inputs: input,
      });

      // Extract unique entities
      const extractedEntities = entities
        .filter((entity) => entity.score >= (options.confidence || 0.9))
        .map((entity) => ({
          text: entity.word,
          type: entity.entity_group || entity.entity,
          confidence: entity.score,
        }));

      const result: AnalysisResult = {
        entities: extractedEntities,
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error('Error extracting information:', error);
      throw new Error(`Extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Analyze text for sentiment, topics, and insights
   */
  public async analyzeText(input: string): Promise<AnalysisResult> {
    try {
      if (!this.checkRateLimit()) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      const cacheKey = this.getCacheKey('analyze', input);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        logger.debug('Returning cached result for analysis');
        return cached;
      }

      logger.info('Analyzing text');

      // Sentiment analysis
      const sentimentResponse = await this.hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: input,
      });

      const sentiment = sentimentResponse[0]
        ? {
            label: sentimentResponse[0].label,
            score: sentimentResponse[0].score,
          }
        : undefined;

      // Entity extraction
      const entities = await this.extractInformation(input);

      const result: AnalysisResult = {
        sentiment,
        entities: entities.entities,
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error('Error analyzing text:', error);
      throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get service statistics
   */
  public getStats(): {
    cacheSize: number;
    requestCount: number;
    cacheHitRate: number;
  } {
    return {
      cacheSize: this.cache.size,
      requestCount: this.requestCount,
      cacheHitRate: this.cache.size > 0 ? (this.cache.size / this.requestCount) * 100 : 0,
    };
  }

  /**
   * Clear cache
   */
  public clearCache(): void {
    this.cache.clear();
    logger.info('AI Service cache cleared');
  }

  /**
   * Health check
   */
  public async healthCheck(): Promise<boolean> {
    try {
      // Simple test to verify API connectivity
      await this.hf.textGeneration({
        model: 'gpt2',
        inputs: 'Hello',
        parameters: {
          max_new_tokens: 5,
        },
      });
      return true;
    } catch (error) {
      logger.error('AI Service health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
export const processText = (input: string, options?: TextProcessingOptions) =>
  aiService.processText(input, options);
export const summarizeText = (input: string, options?: SummarizationOptions) =>
  aiService.summarizeText(input, options);
export const extractInformation = (input: string, options?: ExtractionOptions) =>
  aiService.extractInformation(input, options);
export const analyzeText = (input: string) => aiService.analyzeText(input);
export const getAIStats = () => aiService.getStats();
export const clearAICache = () => aiService.clearCache();
export const aiHealthCheck = () => aiService.healthCheck();

export default AIService;
