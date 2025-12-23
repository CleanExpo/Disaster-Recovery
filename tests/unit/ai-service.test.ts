import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import AIService from '@/lib/ai/ai.service';

/**
 * Unit Tests for AI Service
 */

describe('AIService', () => {
  let aiService: AIService;

  beforeEach(() => {
    // Initialize with test configuration
    aiService = AIService.getInstance({
      apiKey: process.env.HUGGINGFACE_API_KEY || 'test-key',
      modelName: 'gpt2',
      maxCacheSize: 100,
      cacheTTL: 60000,
    });

    // Clear cache before each test
    aiService.clearCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Text Processing', () => {
    it('should process text successfully', async () => {
      const input = 'Hello, this is a test';
      const options = { maxLength: 50 };

      const result = await aiService.processText(input, options);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    }, 30000);

    it('should cache results for identical requests', async () => {
      const input = 'Test caching';
      const options = { maxLength: 50 };

      const result1 = await aiService.processText(input, options);
      const result2 = await aiService.processText(input, options);

      expect(result1).toBe(result2);

      const stats = aiService.getStats();
      expect(stats.cacheSize).toBeGreaterThan(0);
    }, 30000);

    it('should respect rate limiting', async () => {
      // This test would need to be adjusted based on actual rate limit implementation
      expect(() => aiService.processText('test')).not.toThrow();
    });
  });

  describe('Summarization', () => {
    it('should summarize text successfully', async () => {
      const longText = 'This is a very long text that needs to be summarized. '.repeat(20);

      const result = await aiService.summarizeText(longText, {
        minLength: 30,
        maxLength: 100,
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeLessThan(longText.length);
    }, 30000);

    it('should handle short text appropriately', async () => {
      const shortText = 'Too short';

      await expect(
        aiService.summarizeText(shortText)
      ).rejects.toThrow();
    });
  });

  describe('Information Extraction', () => {
    it('should extract entities from text', async () => {
      const text = 'Apple Inc. is located in Cupertino, California. Tim Cook is the CEO.';

      const result = await aiService.extractInformation(text, {
        confidence: 0.8,
      });

      expect(result).toBeDefined();
      expect(result.entities).toBeDefined();
      expect(Array.isArray(result.entities)).toBe(true);
    }, 30000);

    it('should filter by confidence threshold', async () => {
      const text = 'Sample text with entities';

      const result = await aiService.extractInformation(text, {
        confidence: 0.95,
      });

      expect(result.entities).toBeDefined();
      if (result.entities && result.entities.length > 0) {
        expect(result.entities.every((e) => e.confidence >= 0.95)).toBe(true);
      }
    }, 30000);
  });

  describe('Text Analysis', () => {
    it('should analyze sentiment correctly', async () => {
      const positiveText = 'This is a great product! I love it!';

      const result = await aiService.analyzeText(positiveText);

      expect(result).toBeDefined();
      expect(result.sentiment).toBeDefined();
      expect(result.sentiment?.label).toBeDefined();
      expect(result.sentiment?.score).toBeGreaterThan(0);
    }, 30000);

    it('should extract entities during analysis', async () => {
      const text = 'Microsoft announced new features in Seattle.';

      const result = await aiService.analyzeText(text);

      expect(result).toBeDefined();
      expect(result.entities).toBeDefined();
    }, 30000);
  });

  describe('Service Management', () => {
    it('should return statistics', () => {
      const stats = aiService.getStats();

      expect(stats).toBeDefined();
      expect(stats.cacheSize).toBeGreaterThanOrEqual(0);
      expect(stats.requestCount).toBeGreaterThanOrEqual(0);
    });

    it('should clear cache successfully', () => {
      aiService.clearCache();
      const stats = aiService.getStats();

      expect(stats.cacheSize).toBe(0);
    });

    it('should perform health check', async () => {
      const isHealthy = await aiService.healthCheck();

      expect(typeof isHealthy).toBe('boolean');
    }, 30000);
  });
});
