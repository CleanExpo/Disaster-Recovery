/**
 * Advanced Caching Layer for AI Orchestration
 * Intelligent caching for sequential thinking chains, discussions, and routing decisions
 */

import {
  SequentialThinkingChain,
  SequentialThinkingStep,
  Discussion,
  RoutingDecision
} from './types';
import { AITaskContext } from '@/types/ai-service';
import { logger } from '@/lib/logger';

export interface CacheEntry<T> {
  key: string;
  value: T;
  createdAt: Date;
  expiresAt: Date;
  hitCount: number;
  lastAccessed: Date;
  metadata: {
    size: number; // Estimated size in bytes
    complexity: number;
    accuracy: number;
    tags: string[];
  };
}

export interface CacheConfig {
  maxMemorySize: number; // bytes
  maxEntries: number;
  defaultTTL: number; // seconds
  enableCompression: boolean;
  enablePersistence: boolean;
  persistenceFile?: string;
  cleanupInterval: number; // seconds
}

export interface CacheStats {
  totalEntries: number;
  memoryUsage: number;
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  avgResponseTime: number;
  entriesBy: {
    type: Record<string, number>;
    complexity: Record<string, number>;
    age: Record<string, number>;
  };
}

export class AdvancedOrchestrationCache {
  private sequentialThinkingCache: Map<string, CacheEntry<SequentialThinkingChain>> = new Map();
  private discussionCache: Map<string, CacheEntry<Discussion>> = new Map();
  private routingCache: Map<string, CacheEntry<RoutingDecision>> = new Map();
  private stepCache: Map<string, CacheEntry<SequentialThinkingStep>> = new Map();
  
  private config: CacheConfig;
  private stats: {
    hits: number;
    misses: number;
    totalResponseTime: number;
    totalRequests: number;
  } = {
    hits: 0,
    misses: 0,
    totalResponseTime: 0,
    totalRequests: 0
  };
  
  private cleanupInterval: NodeJS.Timeout;

  constructor(config: CacheConfig) {
    this.config = config;
    this.startCleanupProcess();
    
    // Load persisted cache if enabled
    if (config.enablePersistence) {
      this.loadFromDisk();
    }

    logger.info('Advanced orchestration cache initialized', {
      maxMemorySize: config.maxMemorySize,
      maxEntries: config.maxEntries,
      enablePersistence: config.enablePersistence
    });
  }

  /**
   * Cache sequential thinking chain
   */
  cacheSequentialThinking(
    chain: SequentialThinkingChain,
    customTTL?: number
  ): boolean {
    const key = this.generateChainCacheKey(chain);
    const ttl = customTTL || this.calculateDynamicTTL(chain);
    
    const entry: CacheEntry<SequentialThinkingChain> = {
      key,
      value: this.deepClone(chain),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ttl * 1000),
      hitCount: 0,
      lastAccessed: new Date(),
      metadata: {
        size: this.estimateSize(chain),
        complexity: this.assessChainComplexity(chain),
        accuracy: chain.totalConfidence,
        tags: this.extractChainTags(chain)
      }
    };

    // Check memory constraints
    if (!this.canAddEntry(entry)) {
      this.evictEntries('sequential-thinking');
    }

    this.sequentialThinkingCache.set(key, entry);
    
    logger.debug('Cached sequential thinking chain', {
      chainId: chain.id,
      key,
      complexity: entry.metadata.complexity,
      ttl,
      size: entry.metadata.size
    });

    return true;
  }

  /**
   * Retrieve sequential thinking chain from cache
   */
  getSequentialThinking(
    problemStatement: string,
    context: AITaskContext,
    similarityThreshold: number = 0.8
  ): SequentialThinkingChain | null {
    const startTime = Date.now();
    
    // Try exact match first
    const exactKey = this.generateCacheKeyFromInput(problemStatement, context, 'chain');
    const exactEntry = this.sequentialThinkingCache.get(exactKey);
    
    if (exactEntry && !this.isExpired(exactEntry)) {
      this.updateHitStats(exactEntry, Date.now() - startTime);
      return this.deepClone(exactEntry.value);
    }

    // Try semantic similarity matching
    const similarEntry = this.findSimilarChain(problemStatement, context, similarityThreshold);
    if (similarEntry) {
      this.updateHitStats(similarEntry, Date.now() - startTime);
      return this.deepClone(similarEntry.value);
    }

    this.stats.misses++;
    this.stats.totalRequests++;
    this.stats.totalResponseTime += Date.now() - startTime;

    return null;
  }

  /**
   * Cache discussion result
   */
  cacheDiscussion(
    discussion: Discussion,
    customTTL?: number
  ): boolean {
    const key = this.generateDiscussionCacheKey(discussion);
    const ttl = customTTL || this.calculateDynamicTTL(discussion);
    
    const entry: CacheEntry<Discussion> = {
      key,
      value: this.deepClone(discussion),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ttl * 1000),
      hitCount: 0,
      lastAccessed: new Date(),
      metadata: {
        size: this.estimateSize(discussion),
        complexity: this.assessDiscussionComplexity(discussion),
        accuracy: discussion.confidenceLevel,
        tags: this.extractDiscussionTags(discussion)
      }
    };

    if (!this.canAddEntry(entry)) {
      this.evictEntries('discussion');
    }

    this.discussionCache.set(key, entry);
    
    logger.debug('Cached discussion', {
      discussionId: discussion.id,
      key,
      participants: discussion.participants.length,
      rounds: discussion.rounds.length,
      ttl
    });

    return true;
  }

  /**
   * Retrieve discussion from cache
   */
  getDiscussion(
    topic: string,
    context: AITaskContext,
    participants: string[],
    similarityThreshold: number = 0.8
  ): Discussion | null {
    const startTime = Date.now();
    
    // Try exact match
    const exactKey = this.generateCacheKeyFromInput(
      `${topic}_${participants.sort().join('_')}`,
      context,
      'discussion'
    );
    const exactEntry = this.discussionCache.get(exactKey);
    
    if (exactEntry && !this.isExpired(exactEntry)) {
      this.updateHitStats(exactEntry, Date.now() - startTime);
      return this.deepClone(exactEntry.value);
    }

    // Try similarity matching
    const similarEntry = this.findSimilarDiscussion(topic, context, participants, similarityThreshold);
    if (similarEntry) {
      this.updateHitStats(similarEntry, Date.now() - startTime);
      return this.deepClone(similarEntry.value);
    }

    this.stats.misses++;
    this.stats.totalRequests++;
    this.stats.totalResponseTime += Date.now() - startTime;

    return null;
  }

  /**
   * Cache routing decision
   */
  cacheRoutingDecision(
    taskDescription: string,
    context: AITaskContext,
    decision: RoutingDecision,
    customTTL?: number
  ): boolean {
    const key = this.generateCacheKeyFromInput(taskDescription, context, 'routing');
    const ttl = customTTL || this.config.defaultTTL;
    
    const entry: CacheEntry<RoutingDecision> = {
      key,
      value: { ...decision },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ttl * 1000),
      hitCount: 0,
      lastAccessed: new Date(),
      metadata: {
        size: this.estimateSize(decision),
        complexity: decision.complexity,
        accuracy: decision.confidenceInRouting,
        tags: [decision.taskType, decision.recommendedApproach]
      }
    };

    if (!this.canAddEntry(entry)) {
      this.evictEntries('routing');
    }

    this.routingCache.set(key, entry);
    
    logger.debug('Cached routing decision', {
      key,
      approach: decision.recommendedApproach,
      confidence: decision.confidenceInRouting,
      ttl
    });

    return true;
  }

  /**
   * Retrieve routing decision from cache
   */
  getRoutingDecision(
    taskDescription: string,
    context: AITaskContext
  ): RoutingDecision | null {
    const startTime = Date.now();
    const key = this.generateCacheKeyFromInput(taskDescription, context, 'routing');
    const entry = this.routingCache.get(key);
    
    if (entry && !this.isExpired(entry)) {
      this.updateHitStats(entry, Date.now() - startTime);
      return { ...entry.value };
    }

    this.stats.misses++;
    this.stats.totalRequests++;
    this.stats.totalResponseTime += Date.now() - startTime;

    return null;
  }

  /**
   * Cache individual thinking step
   */
  cacheThinkingStep(
    step: SequentialThinkingStep,
    contextHash: string
  ): boolean {
    const key = `${contextHash}_step_${step.stepNumber}`;
    
    const entry: CacheEntry<SequentialThinkingStep> = {
      key,
      value: { ...step },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.config.defaultTTL * 1000),
      hitCount: 0,
      lastAccessed: new Date(),
      metadata: {
        size: this.estimateSize(step),
        complexity: step.confidence < 0.5 ? 8 : 5, // Higher complexity for uncertain steps
        accuracy: step.confidence,
        tags: [step.provider]
      }
    };

    this.stepCache.set(key, entry);
    return true;
  }

  /**
   * Generate cache keys
   */
  private generateChainCacheKey(chain: SequentialThinkingChain): string {
    const contextKey = this.generateContextKey(chain.context);
    const problemHash = this.hashString(chain.problemStatement);
    return `chain_${problemHash}_${contextKey}`;
  }

  private generateDiscussionCacheKey(discussion: Discussion): string {
    const contextKey = this.generateContextKey(discussion.context);
    const topicHash = this.hashString(discussion.topic);
    const participantsHash = this.hashString(
      discussion.participants.map(p => p.persona).sort().join('_')
    );
    return `discussion_${topicHash}_${participantsHash}_${contextKey}`;
  }

  private generateCacheKeyFromInput(
    input: string,
    context: AITaskContext,
    type: string
  ): string {
    const contextKey = this.generateContextKey(context);
    const inputHash = this.hashString(input);
    return `${type}_${inputHash}_${contextKey}`;
  }

  private generateContextKey(context: AITaskContext): string {
    const keyData = {
      type: context.type,
      priority: context.priority,
      accuracy: context.accuracyRequired,
      emergency: context.userContext?.emergency || false,
      location: context.userContext?.location || 'unknown'
    };
    return this.hashString(JSON.stringify(keyData));
  }

  /**
   * Similarity matching for intelligent cache retrieval
   */
  private findSimilarChain(
    problemStatement: string,
    context: AITaskContext,
    threshold: number
  ): CacheEntry<SequentialThinkingChain> | null {
    let bestMatch: CacheEntry<SequentialThinkingChain> | null = null;
    let bestSimilarity = 0;

    for (const entry of this.sequentialThinkingCache.values()) {
      if (this.isExpired(entry)) continue;

      // Context similarity
      const contextSimilarity = this.calculateContextSimilarity(
        context,
        entry.value.context
      );

      if (contextSimilarity < 0.7) continue; // Must have similar context

      // Problem statement similarity
      const problemSimilarity = this.calculateTextSimilarity(
        problemStatement,
        entry.value.problemStatement
      );

      const totalSimilarity = (contextSimilarity + problemSimilarity) / 2;

      if (totalSimilarity > bestSimilarity && totalSimilarity >= threshold) {
        bestSimilarity = totalSimilarity;
        bestMatch = entry;
      }
    }

    return bestMatch;
  }

  private findSimilarDiscussion(
    topic: string,
    context: AITaskContext,
    participants: string[],
    threshold: number
  ): CacheEntry<Discussion> | null {
    let bestMatch: CacheEntry<Discussion> | null = null;
    let bestSimilarity = 0;

    for (const entry of this.discussionCache.values()) {
      if (this.isExpired(entry)) continue;

      const contextSimilarity = this.calculateContextSimilarity(
        context,
        entry.value.context
      );

      if (contextSimilarity < 0.7) continue;

      const topicSimilarity = this.calculateTextSimilarity(topic, entry.value.topic);
      
      const participantsSimilarity = this.calculateParticipantSimilarity(
        participants,
        entry.value.participants.map(p => p.persona)
      );

      const totalSimilarity = (contextSimilarity + topicSimilarity + participantsSimilarity) / 3;

      if (totalSimilarity > bestSimilarity && totalSimilarity >= threshold) {
        bestSimilarity = totalSimilarity;
        bestMatch = entry;
      }
    }

    return bestMatch;
  }

  /**
   * Similarity calculation methods
   */
  private calculateContextSimilarity(context1: AITaskContext, context2: AITaskContext): number {
    let similarity = 0;
    let factors = 0;

    // Task type
    if (context1.type === context2.type) similarity += 0.4;
    factors += 0.4;

    // Priority
    if (context1.priority === context2.priority) similarity += 0.2;
    factors += 0.2;

    // Accuracy requirement
    if (context1.accuracyRequired === context2.accuracyRequired) similarity += 0.2;
    factors += 0.2;

    // Emergency status
    const emergency1 = context1.userContext?.emergency || false;
    const emergency2 = context2.userContext?.emergency || false;
    if (emergency1 === emergency2) similarity += 0.1;
    factors += 0.1;

    // Location
    const location1 = context1.userContext?.location;
    const location2 = context2.userContext?.location;
    if (location1 && location2 && location1 === location2) similarity += 0.1;
    factors += 0.1;

    return factors > 0 ? similarity / factors : 0;
  }

  private calculateTextSimilarity(text1: string, text2: string): number {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private calculateParticipantSimilarity(participants1: string[], participants2: string[]): number {
    const set1 = new Set(participants1);
    const set2 = new Set(participants2);
    
    const intersection = new Set([...set1].filter(p => set2.has(p)));
    const union = new Set([...set1, ...set2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  /**
   * TTL calculation based on complexity and accuracy
   */
  private calculateDynamicTTL(item: SequentialThinkingChain | Discussion): number {
    let baseTTL = this.config.defaultTTL;
    
    if ('totalConfidence' in item) {
      // Sequential thinking chain
      const confidence = item.totalConfidence;
      const complexity = this.assessChainComplexity(item);
      
      // Higher confidence = longer TTL
      baseTTL *= (0.5 + confidence);
      
      // Higher complexity = longer TTL (more expensive to recreate)
      baseTTL *= (1 + complexity / 10);
      
    } else {
      // Discussion
      const confidence = item.confidenceLevel;
      const complexity = this.assessDiscussionComplexity(item);
      
      baseTTL *= (0.5 + confidence);
      baseTTL *= (1 + complexity / 10);
    }
    
    return Math.min(baseTTL, this.config.defaultTTL * 3); // Cap at 3x default TTL
  }

  /**
   * Memory management
   */
  private canAddEntry(entry: CacheEntry<any>): boolean {
    const currentMemory = this.getCurrentMemoryUsage();
    const totalEntries = this.getTotalEntries();
    
    return (currentMemory + entry.metadata.size <= this.config.maxMemorySize) &&
           (totalEntries < this.config.maxEntries);
  }

  private evictEntries(cacheType?: string): void {
    const allEntries: Array<{
      entry: CacheEntry<any>;
      cache: Map<string, any>;
      type: string;
    }> = [];

    // Collect all entries with their cache references
    for (const [key, entry] of this.sequentialThinkingCache) {
      allEntries.push({ entry, cache: this.sequentialThinkingCache, type: 'sequential-thinking' });
    }
    for (const [key, entry] of this.discussionCache) {
      allEntries.push({ entry, cache: this.discussionCache, type: 'discussion' });
    }
    for (const [key, entry] of this.routingCache) {
      allEntries.push({ entry, cache: this.routingCache, type: 'routing' });
    }
    for (const [key, entry] of this.stepCache) {
      allEntries.push({ entry, cache: this.stepCache, type: 'step' });
    }

    // Filter by type if specified
    const entriesToConsider = cacheType
      ? allEntries.filter(item => item.type === cacheType)
      : allEntries;

    // Sort by eviction priority (LRU + other factors)
    entriesToConsider.sort((a, b) => {
      const scoreA = this.calculateEvictionScore(a.entry);
      const scoreB = this.calculateEvictionScore(b.entry);
      return scoreA - scoreB;
    });

    // Evict lowest priority entries
    const evictCount = Math.max(1, Math.floor(entriesToConsider.length * 0.1));
    
    for (let i = 0; i < evictCount && i < entriesToConsider.length; i++) {
      const { entry, cache } = entriesToConsider[i];
      cache.delete(entry.key);
    }

    logger.debug('Evicted cache entries', {
      evicted: evictCount,
      type: cacheType || 'all',
      remainingEntries: this.getTotalEntries()
    });
  }

  private calculateEvictionScore(entry: CacheEntry<any>): number {
    const now = Date.now();
    const age = now - entry.lastAccessed.getTime();
    const hitRate = entry.hitCount / Math.max(1, (now - entry.createdAt.getTime()) / 60000); // hits per minute
    
    // Lower score = higher eviction priority
    let score = age / 1000; // Base on age in seconds
    score -= hitRate * 100; // Reduce score for frequently accessed items
    score -= entry.metadata.accuracy * 50; // Keep high-accuracy items longer
    score += entry.metadata.size / 1000; // Prefer evicting larger items
    
    return score;
  }

  /**
   * Utility methods
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return entry.expiresAt < new Date();
  }

  private updateHitStats(entry: CacheEntry<any>, responseTime: number): void {
    entry.hitCount++;
    entry.lastAccessed = new Date();
    
    this.stats.hits++;
    this.stats.totalRequests++;
    this.stats.totalResponseTime += responseTime;
  }

  private getCurrentMemoryUsage(): number {
    let total = 0;
    
    for (const entry of this.sequentialThinkingCache.values()) {
      total += entry.metadata.size;
    }
    for (const entry of this.discussionCache.values()) {
      total += entry.metadata.size;
    }
    for (const entry of this.routingCache.values()) {
      total += entry.metadata.size;
    }
    for (const entry of this.stepCache.values()) {
      total += entry.metadata.size;
    }
    
    return total;
  }

  private getTotalEntries(): number {
    return this.sequentialThinkingCache.size +
           this.discussionCache.size +
           this.routingCache.size +
           this.stepCache.size;
  }

  private estimateSize(obj: any): number {
    // Simple size estimation
    return JSON.stringify(obj).length * 2; // Rough estimate including object overhead
  }

  private assessChainComplexity(chain: SequentialThinkingChain): number {
    return Math.min(10, chain.steps.length + (chain.metadata.complexity === 'expert' ? 3 : 0));
  }

  private assessDiscussionComplexity(discussion: Discussion): number {
    return Math.min(10, discussion.rounds.length + discussion.participants.length);
  }

  private extractChainTags(chain: SequentialThinkingChain): string[] {
    return [
      chain.context.type,
      chain.metadata.complexity,
      chain.metadata.riskLevel,
      chain.metadata.primaryAgent
    ];
  }

  private extractDiscussionTags(discussion: Discussion): string[] {
    return [
      discussion.context.type,
      discussion.moderator,
      ...discussion.participants.map(p => p.persona)
    ];
  }

  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Cleanup process
   */
  private startCleanupProcess(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval * 1000);
  }

  private cleanup(): void {
    let removedCount = 0;
    const now = new Date();

    // Clean expired entries from all caches
    for (const [key, entry] of this.sequentialThinkingCache) {
      if (entry.expiresAt < now) {
        this.sequentialThinkingCache.delete(key);
        removedCount++;
      }
    }

    for (const [key, entry] of this.discussionCache) {
      if (entry.expiresAt < now) {
        this.discussionCache.delete(key);
        removedCount++;
      }
    }

    for (const [key, entry] of this.routingCache) {
      if (entry.expiresAt < now) {
        this.routingCache.delete(key);
        removedCount++;
      }
    }

    for (const [key, entry] of this.stepCache) {
      if (entry.expiresAt < now) {
        this.stepCache.delete(key);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      logger.debug('Cache cleanup completed', {
        removedEntries: removedCount,
        remainingEntries: this.getTotalEntries(),
        memoryUsage: this.getCurrentMemoryUsage()
      });
    }

    // Persist cache if enabled
    if (this.config.enablePersistence) {
      this.saveToDisk();
    }
  }

  /**
   * Persistence methods (placeholder - would need actual file I/O)
   */
  private loadFromDisk(): void {
    // Implementation would depend on the specific storage mechanism
    logger.debug('Cache persistence loading not implemented in this demo');
  }

  private saveToDisk(): void {
    // Implementation would depend on the specific storage mechanism
    logger.debug('Cache persistence saving not implemented in this demo');
  }

  /**
   * Public API methods
   */
  getStats(): CacheStats {
    const totalEntries = this.getTotalEntries();
    const hitRate = this.stats.totalRequests > 0 
      ? this.stats.hits / this.stats.totalRequests 
      : 0;
    const avgResponseTime = this.stats.totalRequests > 0
      ? this.stats.totalResponseTime / this.stats.totalRequests
      : 0;

    return {
      totalEntries,
      memoryUsage: this.getCurrentMemoryUsage(),
      hitRate,
      totalHits: this.stats.hits,
      totalMisses: this.stats.misses,
      avgResponseTime,
      entriesBy: {
        type: {
          'sequential-thinking': this.sequentialThinkingCache.size,
          'discussion': this.discussionCache.size,
          'routing': this.routingCache.size,
          'step': this.stepCache.size
        },
        complexity: this.getComplexityDistribution(),
        age: this.getAgeDistribution()
      }
    };
  }

  private getComplexityDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    const allEntries = [
      ...this.sequentialThinkingCache.values(),
      ...this.discussionCache.values(),
      ...this.routingCache.values(),
      ...this.stepCache.values()
    ];

    allEntries.forEach(entry => {
      const complexity = Math.floor(entry.metadata.complexity);
      distribution[complexity] = (distribution[complexity] || 0) + 1;
    });

    return distribution;
  }

  private getAgeDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {
      'recent': 0,    // < 1 hour
      'moderate': 0,  // 1-6 hours  
      'old': 0        // > 6 hours
    };

    const now = Date.now();
    const allEntries = [
      ...this.sequentialThinkingCache.values(),
      ...this.discussionCache.values(),
      ...this.routingCache.values(),
      ...this.stepCache.values()
    ];

    allEntries.forEach(entry => {
      const age = now - entry.createdAt.getTime();
      const hours = age / (1000 * 60 * 60);
      
      if (hours < 1) distribution.recent++;
      else if (hours < 6) distribution.moderate++;
      else distribution.old++;
    });

    return distribution;
  }

  clear(cacheType?: 'sequential-thinking' | 'discussion' | 'routing' | 'step'): void {
    if (!cacheType) {
      this.sequentialThinkingCache.clear();
      this.discussionCache.clear();
      this.routingCache.clear();
      this.stepCache.clear();
      this.stats = { hits: 0, misses: 0, totalResponseTime: 0, totalRequests: 0 };
    } else {
      switch (cacheType) {
        case 'sequential-thinking':
          this.sequentialThinkingCache.clear();
          break;
        case 'discussion':
          this.discussionCache.clear();
          break;
        case 'routing':
          this.routingCache.clear();
          break;
        case 'step':
          this.stepCache.clear();
          break;
      }
    }

    logger.info('Cache cleared', { type: cacheType || 'all' });
  }

  shutdown(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    if (this.config.enablePersistence) {
      this.saveToDisk();
    }

    this.clear();
    logger.info('Advanced orchestration cache shut down');
  }
}