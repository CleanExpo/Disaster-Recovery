/**
 * Advanced Performance Monitoring for AI Orchestration
 * Comprehensive metrics, analytics, and performance optimization
 */

import {
  OrchestrationMetrics,
  AgentPersona,
  SequentialThinkingChain,
  Discussion,
  RoutingDecision
} from '../core/types';
import { AIProvider, AITaskType } from '@/types/ai-service';
import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';

export interface PerformanceMetrics {
  orchestration: {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    averageExecutionTime: number;
    executionsByApproach: Record<string, {
      count: number;
      successRate: number;
      avgTime: number;
      avgCost: number;
      avgAccuracy: number;
    }>;
  };
  
  sequential: {
    totalChains: number;
    avgStepsPerChain: number;
    avgConfidence: number;
    avgProcessingTime: number;
    stepDistribution: Record<number, number>;
    timeoutRate: number;
  };
  
  multiAgent: {
    totalDiscussions: number;
    avgRoundsToConsensus: number;
    avgParticipants: number;
    consensusRate: number;
    deadlockRate: number;
    avgConfidenceLevel: number;
  };
  
  routing: {
    totalDecisions: number;
    routingAccuracy: number;
    avgDecisionTime: number;
    routingDistribution: Record<string, number>;
    overrideRate: number;
  };
  
  providers: {
    [key in AIProvider]: {
      requests: number;
      successes: number;
      failures: number;
      avgResponseTime: number;
      totalCost: number;
      avgAccuracy: number;
      reliabilityScore: number;
    };
  };
  
  caching: {
    totalRequests: number;
    hits: number;
    misses: number;
    hitRate: number;
    avgResponseTime: {
      hit: number;
      miss: number;
    };
    memoryUsage: number;
    evictions: number;
  };
  
  fallbacks: {
    totalFallbacks: number;
    fallbacksByLevel: Record<number, number>;
    recoveryRate: number;
    avgFallbackTime: number;
    emergencyResponseCount: number;
  };
  
  business: {
    userSatisfaction: {
      avgRating: number;
      totalRatings: number;
      ratingDistribution: Record<number, number>;
    };
    costEfficiency: {
      avgCostPerTask: number;
      costTrends: Array<{ timestamp: Date; cost: number; }>;
      budgetUtilization: number;
    };
    throughput: {
      tasksPerHour: number;
      peakHour: number;
      trends: Array<{ hour: number; count: number; }>;
    };
  };
}

export interface PerformanceAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'accuracy' | 'cost' | 'reliability' | 'business';
  title: string;
  message: string;
  timestamp: Date;
  metrics: Record<string, number>;
  threshold: number;
  currentValue: number;
  recommendations: string[];
}

export interface PerformanceConfig {
  metricsRetentionDays: number;
  alertThresholds: {
    responseTime: number; // milliseconds
    errorRate: number; // percentage
    accuracy: number; // minimum accuracy
    costPerTask: number; // maximum cost
    cacheHitRate: number; // minimum hit rate
  };
  enableRealTimeMonitoring: boolean;
  enablePredictiveAnalytics: boolean;
  aggregationIntervals: {
    realTime: number; // seconds
    hourly: number;
    daily: number;
  };
}

export class PerformanceMonitor extends EventEmitter {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics;
  private alerts: PerformanceAlert[] = [];
  private rawData: Array<{
    timestamp: Date;
    type: string;
    data: any;
  }> = [];
  
  private aggregationTimers: {
    realTime?: NodeJS.Timeout;
    hourly?: NodeJS.Timeout;
    daily?: NodeJS.Timeout;
  } = {};

  constructor(config: PerformanceConfig) {
    super();
    this.config = config;
    this.initializeMetrics();
    this.startAggregation();

    logger.info('Performance monitor initialized', {
      retention: config.metricsRetentionDays,
      realTimeMonitoring: config.enableRealTimeMonitoring,
      predictiveAnalytics: config.enablePredictiveAnalytics
    });
  }

  /**
   * Record orchestration execution
   */
  recordOrchestrationExecution(
    approach: 'single-agent' | 'sequential-thinking' | 'multi-agent-discussion',
    success: boolean,
    executionTime: number,
    cost: number,
    accuracy: number,
    taskType: AITaskType,
    metadata?: any
  ): void {
    const timestamp = new Date();
    
    // Update orchestration metrics
    this.metrics.orchestration.totalExecutions++;
    if (success) {
      this.metrics.orchestration.successfulExecutions++;
    } else {
      this.metrics.orchestration.failedExecutions++;
    }
    
    // Update average execution time
    this.metrics.orchestration.averageExecutionTime = 
      (this.metrics.orchestration.averageExecutionTime * 
       (this.metrics.orchestration.totalExecutions - 1) + executionTime) / 
       this.metrics.orchestration.totalExecutions;

    // Update approach-specific metrics
    if (!this.metrics.orchestration.executionsByApproach[approach]) {
      this.metrics.orchestration.executionsByApproach[approach] = {
        count: 0,
        successRate: 0,
        avgTime: 0,
        avgCost: 0,
        avgAccuracy: 0
      };
    }

    const approachMetrics = this.metrics.orchestration.executionsByApproach[approach];
    approachMetrics.count++;
    approachMetrics.successRate = success ? 
      ((approachMetrics.successRate * (approachMetrics.count - 1)) + 1) / approachMetrics.count :
      (approachMetrics.successRate * (approachMetrics.count - 1)) / approachMetrics.count;
    
    approachMetrics.avgTime = 
      (approachMetrics.avgTime * (approachMetrics.count - 1) + executionTime) / approachMetrics.count;
    approachMetrics.avgCost = 
      (approachMetrics.avgCost * (approachMetrics.count - 1) + cost) / approachMetrics.count;
    approachMetrics.avgAccuracy = 
      (approachMetrics.avgAccuracy * (approachMetrics.count - 1) + accuracy) / approachMetrics.count;

    // Store raw data
    this.rawData.push({
      timestamp,
      type: 'orchestration',
      data: {
        approach,
        success,
        executionTime,
        cost,
        accuracy,
        taskType,
        metadata
      }
    });

    // Check for alerts
    this.checkPerformanceAlerts(timestamp);

    logger.debug('Recorded orchestration execution', {
      approach,
      success,
      executionTime,
      accuracy,
      taskType
    });
  }

  /**
   * Record sequential thinking chain
   */
  recordSequentialThinking(chain: SequentialThinkingChain): void {
    const timestamp = new Date();
    const processingTime = chain.endTime ? 
      chain.endTime.getTime() - chain.startTime.getTime() : 0;

    this.metrics.sequential.totalChains++;
    this.metrics.sequential.avgStepsPerChain = 
      (this.metrics.sequential.avgStepsPerChain * (this.metrics.sequential.totalChains - 1) + 
       chain.steps.length) / this.metrics.sequential.totalChains;
    
    this.metrics.sequential.avgConfidence = 
      (this.metrics.sequential.avgConfidence * (this.metrics.sequential.totalChains - 1) + 
       chain.totalConfidence) / this.metrics.sequential.totalChains;
    
    this.metrics.sequential.avgProcessingTime = 
      (this.metrics.sequential.avgProcessingTime * (this.metrics.sequential.totalChains - 1) + 
       processingTime) / this.metrics.sequential.totalChains;

    // Update step distribution
    this.metrics.sequential.stepDistribution[chain.steps.length] = 
      (this.metrics.sequential.stepDistribution[chain.steps.length] || 0) + 1;

    // Check for timeout
    if (chain.status === 'failed' && chain.metadata.riskLevel === 'critical') {
      this.metrics.sequential.timeoutRate = 
        (this.metrics.sequential.timeoutRate * (this.metrics.sequential.totalChains - 1) + 1) / 
        this.metrics.sequential.totalChains;
    }

    this.rawData.push({
      timestamp,
      type: 'sequential-thinking',
      data: {
        chainId: chain.id,
        steps: chain.steps.length,
        confidence: chain.totalConfidence,
        processingTime,
        status: chain.status,
        complexity: chain.metadata.complexity
      }
    });
  }

  /**
   * Record multi-agent discussion
   */
  recordMultiAgentDiscussion(discussion: Discussion): void {
    const timestamp = new Date();
    const processingTime = discussion.endTime ? 
      discussion.endTime.getTime() - discussion.startTime.getTime() : 0;

    this.metrics.multiAgent.totalDiscussions++;
    
    if (discussion.status === 'completed') {
      this.metrics.multiAgent.avgRoundsToConsensus = 
        (this.metrics.multiAgent.avgRoundsToConsensus * (this.metrics.multiAgent.totalDiscussions - 1) + 
         discussion.rounds.length) / this.metrics.multiAgent.totalDiscussions;
      
      this.metrics.multiAgent.consensusRate = 
        ((this.metrics.multiAgent.consensusRate * (this.metrics.multiAgent.totalDiscussions - 1)) + 1) / 
        this.metrics.multiAgent.totalDiscussions;
    }

    if (discussion.status === 'deadlocked') {
      this.metrics.multiAgent.deadlockRate = 
        ((this.metrics.multiAgent.deadlockRate * (this.metrics.multiAgent.totalDiscussions - 1)) + 1) / 
        this.metrics.multiAgent.totalDiscussions;
    }

    this.metrics.multiAgent.avgParticipants = 
      (this.metrics.multiAgent.avgParticipants * (this.metrics.multiAgent.totalDiscussions - 1) + 
       discussion.participants.length) / this.metrics.multiAgent.totalDiscussions;
    
    this.metrics.multiAgent.avgConfidenceLevel = 
      (this.metrics.multiAgent.avgConfidenceLevel * (this.metrics.multiAgent.totalDiscussions - 1) + 
       discussion.confidenceLevel) / this.metrics.multiAgent.totalDiscussions;

    this.rawData.push({
      timestamp,
      type: 'multi-agent-discussion',
      data: {
        discussionId: discussion.id,
        rounds: discussion.rounds.length,
        participants: discussion.participants.length,
        confidence: discussion.confidenceLevel,
        processingTime,
        status: discussion.status
      }
    });
  }

  /**
   * Record routing decision
   */
  recordRoutingDecision(
    decision: RoutingDecision,
    decisionTime: number,
    wasOverridden: boolean = false
  ): void {
    const timestamp = new Date();
    
    this.metrics.routing.totalDecisions++;
    this.metrics.routing.avgDecisionTime = 
      (this.metrics.routing.avgDecisionTime * (this.metrics.routing.totalDecisions - 1) + 
       decisionTime) / this.metrics.routing.totalDecisions;

    // Update routing distribution
    this.metrics.routing.routingDistribution[decision.recommendedApproach] = 
      (this.metrics.routing.routingDistribution[decision.recommendedApproach] || 0) + 1;

    if (wasOverridden) {
      this.metrics.routing.overrideRate = 
        ((this.metrics.routing.overrideRate * (this.metrics.routing.totalDecisions - 1)) + 1) / 
        this.metrics.routing.totalDecisions;
    }

    this.rawData.push({
      timestamp,
      type: 'routing',
      data: {
        approach: decision.recommendedApproach,
        confidence: decision.confidenceInRouting,
        decisionTime,
        wasOverridden,
        complexity: decision.complexity
      }
    });
  }

  /**
   * Record provider performance
   */
  recordProviderPerformance(
    provider: AIProvider,
    success: boolean,
    responseTime: number,
    cost: number,
    accuracy?: number
  ): void {
    if (!this.metrics.providers[provider]) {
      this.metrics.providers[provider] = {
        requests: 0,
        successes: 0,
        failures: 0,
        avgResponseTime: 0,
        totalCost: 0,
        avgAccuracy: 0,
        reliabilityScore: 1.0
      };
    }

    const providerMetrics = this.metrics.providers[provider];
    providerMetrics.requests++;
    
    if (success) {
      providerMetrics.successes++;
    } else {
      providerMetrics.failures++;
    }

    providerMetrics.avgResponseTime = 
      (providerMetrics.avgResponseTime * (providerMetrics.requests - 1) + responseTime) / 
      providerMetrics.requests;
    
    providerMetrics.totalCost += cost;

    if (accuracy !== undefined) {
      providerMetrics.avgAccuracy = 
        (providerMetrics.avgAccuracy * (providerMetrics.requests - 1) + accuracy) / 
        providerMetrics.requests;
    }

    // Calculate reliability score
    const successRate = providerMetrics.successes / providerMetrics.requests;
    const timeReliability = Math.max(0, 1 - (providerMetrics.avgResponseTime / 10000)); // Penalize slow responses
    providerMetrics.reliabilityScore = (successRate + timeReliability) / 2;

    this.rawData.push({
      timestamp: new Date(),
      type: 'provider-performance',
      data: {
        provider,
        success,
        responseTime,
        cost,
        accuracy
      }
    });
  }

  /**
   * Record cache performance
   */
  recordCachePerformance(
    hit: boolean,
    responseTime: number,
    memoryUsage: number,
    evicted: boolean = false
  ): void {
    this.metrics.caching.totalRequests++;
    
    if (hit) {
      this.metrics.caching.hits++;
      this.metrics.caching.avgResponseTime.hit = 
        (this.metrics.caching.avgResponseTime.hit * (this.metrics.caching.hits - 1) + responseTime) / 
        this.metrics.caching.hits;
    } else {
      this.metrics.caching.misses++;
      this.metrics.caching.avgResponseTime.miss = 
        (this.metrics.caching.avgResponseTime.miss * (this.metrics.caching.misses - 1) + responseTime) / 
        this.metrics.caching.misses;
    }

    this.metrics.caching.hitRate = this.metrics.caching.hits / this.metrics.caching.totalRequests;
    this.metrics.caching.memoryUsage = memoryUsage;

    if (evicted) {
      this.metrics.caching.evictions++;
    }

    this.rawData.push({
      timestamp: new Date(),
      type: 'cache-performance',
      data: { hit, responseTime, memoryUsage, evicted }
    });
  }

  /**
   * Record fallback usage
   */
  recordFallback(
    level: number,
    success: boolean,
    fallbackTime: number,
    isEmergency: boolean = false
  ): void {
    this.metrics.fallbacks.totalFallbacks++;
    this.metrics.fallbacks.fallbacksByLevel[level] = 
      (this.metrics.fallbacks.fallbacksByLevel[level] || 0) + 1;

    if (success) {
      this.metrics.fallbacks.recoveryRate = 
        ((this.metrics.fallbacks.recoveryRate * (this.metrics.fallbacks.totalFallbacks - 1)) + 1) / 
        this.metrics.fallbacks.totalFallbacks;
    }

    this.metrics.fallbacks.avgFallbackTime = 
      (this.metrics.fallbacks.avgFallbackTime * (this.metrics.fallbacks.totalFallbacks - 1) + 
       fallbackTime) / this.metrics.fallbacks.totalFallbacks;

    if (isEmergency) {
      this.metrics.fallbacks.emergencyResponseCount++;
    }

    this.rawData.push({
      timestamp: new Date(),
      type: 'fallback',
      data: { level, success, fallbackTime, isEmergency }
    });
  }

  /**
   * Record business metrics
   */
  recordUserSatisfaction(rating: number): void {
    this.metrics.business.userSatisfaction.totalRatings++;
    this.metrics.business.userSatisfaction.avgRating = 
      (this.metrics.business.userSatisfaction.avgRating * 
       (this.metrics.business.userSatisfaction.totalRatings - 1) + rating) / 
       this.metrics.business.userSatisfaction.totalRatings;

    this.metrics.business.userSatisfaction.ratingDistribution[rating] = 
      (this.metrics.business.userSatisfaction.ratingDistribution[rating] || 0) + 1;
  }

  recordTaskCost(cost: number): void {
    const totalTasks = this.metrics.orchestration.totalExecutions;
    this.metrics.business.costEfficiency.avgCostPerTask = 
      (this.metrics.business.costEfficiency.avgCostPerTask * (totalTasks - 1) + cost) / totalTasks;

    this.metrics.business.costEfficiency.costTrends.push({
      timestamp: new Date(),
      cost
    });

    // Keep only last 100 cost entries
    if (this.metrics.business.costEfficiency.costTrends.length > 100) {
      this.metrics.business.costEfficiency.costTrends = 
        this.metrics.business.costEfficiency.costTrends.slice(-100);
    }
  }

  /**
   * Alert system
   */
  private checkPerformanceAlerts(timestamp: Date): void {
    const alerts: PerformanceAlert[] = [];

    // Response time alert
    if (this.metrics.orchestration.averageExecutionTime > this.config.alertThresholds.responseTime) {
      alerts.push({
        id: `rt_${timestamp.getTime()}`,
        severity: 'medium',
        category: 'performance',
        title: 'High Average Response Time',
        message: `Average execution time (${Math.round(this.metrics.orchestration.averageExecutionTime)}ms) exceeds threshold (${this.config.alertThresholds.responseTime}ms)`,
        timestamp,
        metrics: { avgTime: this.metrics.orchestration.averageExecutionTime },
        threshold: this.config.alertThresholds.responseTime,
        currentValue: this.metrics.orchestration.averageExecutionTime,
        recommendations: [
          'Check provider performance',
          'Review task complexity',
          'Consider caching optimization',
          'Scale up resources if needed'
        ]
      });
    }

    // Error rate alert
    const errorRate = (this.metrics.orchestration.failedExecutions / 
      Math.max(1, this.metrics.orchestration.totalExecutions)) * 100;
    
    if (errorRate > this.config.alertThresholds.errorRate) {
      alerts.push({
        id: `er_${timestamp.getTime()}`,
        severity: errorRate > 20 ? 'critical' : 'high',
        category: 'reliability',
        title: 'High Error Rate',
        message: `Error rate (${errorRate.toFixed(1)}%) exceeds threshold (${this.config.alertThresholds.errorRate}%)`,
        timestamp,
        metrics: { errorRate },
        threshold: this.config.alertThresholds.errorRate,
        currentValue: errorRate,
        recommendations: [
          'Investigate failure patterns',
          'Check provider availability',
          'Review fallback mechanisms',
          'Update error handling logic'
        ]
      });
    }

    // Cache hit rate alert
    if (this.metrics.caching.hitRate < this.config.alertThresholds.cacheHitRate / 100) {
      alerts.push({
        id: `chr_${timestamp.getTime()}`,
        severity: 'medium',
        category: 'performance',
        title: 'Low Cache Hit Rate',
        message: `Cache hit rate (${(this.metrics.caching.hitRate * 100).toFixed(1)}%) below threshold (${this.config.alertThresholds.cacheHitRate}%)`,
        timestamp,
        metrics: { hitRate: this.metrics.caching.hitRate },
        threshold: this.config.alertThresholds.cacheHitRate / 100,
        currentValue: this.metrics.caching.hitRate,
        recommendations: [
          'Review cache TTL settings',
          'Analyze cache eviction patterns',
          'Consider increasing cache size',
          'Optimize cache key strategy'
        ]
      });
    }

    // Cost per task alert
    if (this.metrics.business.costEfficiency.avgCostPerTask > this.config.alertThresholds.costPerTask) {
      alerts.push({
        id: `cost_${timestamp.getTime()}`,
        severity: 'medium',
        category: 'cost',
        title: 'High Cost Per Task',
        message: `Average cost per task ($${this.metrics.business.costEfficiency.avgCostPerTask.toFixed(2)}) exceeds budget threshold ($${this.config.alertThresholds.costPerTask})`,
        timestamp,
        metrics: { avgCost: this.metrics.business.costEfficiency.avgCostPerTask },
        threshold: this.config.alertThresholds.costPerTask,
        currentValue: this.metrics.business.costEfficiency.avgCostPerTask,
        recommendations: [
          'Optimize provider selection',
          'Review task routing efficiency',
          'Consider batch processing',
          'Evaluate cheaper alternatives'
        ]
      });
    }

    // Add new alerts
    alerts.forEach(alert => {
      this.alerts.push(alert);
      this.emit('alert', alert);
      
      logger.warn('Performance alert generated', {
        id: alert.id,
        severity: alert.severity,
        category: alert.category,
        title: alert.title
      });
    });

    // Keep only recent alerts (last 24 hours)
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.alerts = this.alerts.filter(alert => alert.timestamp > dayAgo);
  }

  /**
   * Analytics and insights
   */
  generatePerformanceReport(): {
    summary: any;
    insights: string[];
    recommendations: string[];
    trends: any;
  } {
    const summary = {
      totalExecutions: this.metrics.orchestration.totalExecutions,
      successRate: (this.metrics.orchestration.successfulExecutions / 
        Math.max(1, this.metrics.orchestration.totalExecutions) * 100).toFixed(1),
      avgExecutionTime: Math.round(this.metrics.orchestration.averageExecutionTime),
      avgCostPerTask: this.metrics.business.costEfficiency.avgCostPerTask.toFixed(2),
      cacheHitRate: (this.metrics.caching.hitRate * 100).toFixed(1),
      userSatisfaction: this.metrics.business.userSatisfaction.avgRating.toFixed(1),
      activeAlerts: this.alerts.filter(a => a.timestamp > new Date(Date.now() - 60 * 60 * 1000)).length
    };

    const insights: string[] = [];
    const recommendations: string[] = [];

    // Performance insights
    const bestApproach = Object.entries(this.metrics.orchestration.executionsByApproach)
      .reduce((best, [approach, metrics]) => 
        metrics.successRate > best.metrics.successRate ? { approach, metrics } : best, 
        { approach: '', metrics: { successRate: 0 } });

    if (bestApproach.approach) {
      insights.push(`${bestApproach.approach} shows the best success rate at ${(bestApproach.metrics.successRate * 100).toFixed(1)}%`);
    }

    // Cost insights
    if (this.metrics.business.costEfficiency.avgCostPerTask > 1.0) {
      insights.push(`Average task cost of $${this.metrics.business.costEfficiency.avgCostPerTask.toFixed(2)} may benefit from optimization`);
      recommendations.push('Consider implementing more aggressive caching strategies');
    }

    // Cache insights
    if (this.metrics.caching.hitRate < 0.6) {
      insights.push(`Low cache hit rate of ${(this.metrics.caching.hitRate * 100).toFixed(1)}% indicates optimization opportunities`);
      recommendations.push('Review cache key strategies and TTL settings');
    }

    // Fallback insights
    if (this.metrics.fallbacks.totalFallbacks > this.metrics.orchestration.totalExecutions * 0.1) {
      insights.push(`High fallback usage (${((this.metrics.fallbacks.totalFallbacks / this.metrics.orchestration.totalExecutions) * 100).toFixed(1)}%) suggests reliability issues`);
      recommendations.push('Investigate primary orchestration failures');
    }

    // Provider insights
    const providerPerformance = Object.entries(this.metrics.providers)
      .map(([provider, metrics]) => ({ provider, reliability: metrics.reliabilityScore }))
      .sort((a, b) => b.reliability - a.reliability);

    if (providerPerformance.length > 0) {
      insights.push(`${providerPerformance[0].provider} shows the highest reliability at ${(providerPerformance[0].reliability * 100).toFixed(1)}%`);
    }

    const trends = {
      executionTrends: this.calculateExecutionTrends(),
      costTrends: this.metrics.business.costEfficiency.costTrends.slice(-24),
      accuracyTrends: this.calculateAccuracyTrends()
    };

    return { summary, insights, recommendations, trends };
  }

  private calculateExecutionTrends(): Array<{ hour: number; count: number; }> {
    const trends: Record<number, number> = {};
    const now = new Date();
    const startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    this.rawData
      .filter(entry => entry.timestamp > startTime && entry.type === 'orchestration')
      .forEach(entry => {
        const hour = entry.timestamp.getHours();
        trends[hour] = (trends[hour] || 0) + 1;
      });

    return Object.entries(trends)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => a.hour - b.hour);
  }

  private calculateAccuracyTrends(): Array<{ timestamp: Date; accuracy: number; }> {
    return this.rawData
      .filter(entry => entry.type === 'orchestration' && entry.data.accuracy)
      .slice(-20)
      .map(entry => ({
        timestamp: entry.timestamp,
        accuracy: entry.data.accuracy
      }));
  }

  /**
   * Predictive analytics
   */
  predictPerformance(hoursAhead: number = 24): {
    expectedLoad: number;
    predictedBottlenecks: string[];
    recommendations: string[];
  } {
    if (!this.config.enablePredictiveAnalytics) {
      return {
        expectedLoad: 0,
        predictedBottlenecks: [],
        recommendations: ['Predictive analytics disabled']
      };
    }

    // Simple linear prediction based on recent trends
    const recentHours = this.calculateExecutionTrends();
    const avgLoad = recentHours.reduce((sum, trend) => sum + trend.count, 0) / Math.max(1, recentHours.length);
    const expectedLoad = Math.round(avgLoad * hoursAhead);

    const predictedBottlenecks: string[] = [];
    const recommendations: string[] = [];

    // Predict cache pressure
    if (this.metrics.caching.hitRate < 0.7 && expectedLoad > avgLoad * 1.5) {
      predictedBottlenecks.push('Cache performance degradation under increased load');
      recommendations.push('Consider preemptive cache warm-up');
    }

    // Predict provider overload
    Object.entries(this.metrics.providers).forEach(([provider, metrics]) => {
      if (metrics.avgResponseTime > 5000 && expectedLoad > avgLoad * 2) {
        predictedBottlenecks.push(`${provider} may experience response delays`);
        recommendations.push(`Consider load balancing away from ${provider}`);
      }
    });

    // Predict cost overruns
    const predictedCost = this.metrics.business.costEfficiency.avgCostPerTask * expectedLoad;
    if (predictedCost > 1000) {
      predictedBottlenecks.push('High cost projection for predicted load');
      recommendations.push('Review cost optimization strategies');
    }

    return { expectedLoad, predictedBottlenecks, recommendations };
  }

  /**
   * Data management
   */
  private startAggregation(): void {
    if (this.config.enableRealTimeMonitoring) {
      this.aggregationTimers.realTime = setInterval(() => {
        this.aggregateRealTimeMetrics();
      }, this.config.aggregationIntervals.realTime * 1000);
    }

    this.aggregationTimers.hourly = setInterval(() => {
      this.aggregateHourlyMetrics();
    }, this.config.aggregationIntervals.hourly * 1000);

    this.aggregationTimers.daily = setInterval(() => {
      this.aggregateDailyMetrics();
      this.cleanupOldData();
    }, this.config.aggregationIntervals.daily * 1000);
  }

  private aggregateRealTimeMetrics(): void {
    // Emit real-time metrics for dashboards
    this.emit('real-time-metrics', {
      timestamp: new Date(),
      activeExecutions: this.getActiveExecutions(),
      currentThroughput: this.getCurrentThroughput(),
      recentErrors: this.getRecentErrors(),
      cacheHitRate: this.metrics.caching.hitRate
    });
  }

  private aggregateHourlyMetrics(): void {
    // Store hourly aggregated data
    const hourlyData = {
      timestamp: new Date(),
      executions: this.metrics.orchestration.totalExecutions,
      avgResponseTime: this.metrics.orchestration.averageExecutionTime,
      successRate: this.metrics.orchestration.successfulExecutions / 
        Math.max(1, this.metrics.orchestration.totalExecutions),
      avgCost: this.metrics.business.costEfficiency.avgCostPerTask
    };

    this.emit('hourly-metrics', hourlyData);
  }

  private aggregateDailyMetrics(): void {
    // Store daily aggregated data and generate summary
    const dailyReport = this.generatePerformanceReport();
    this.emit('daily-report', dailyReport);
    
    logger.info('Daily performance summary', {
      totalExecutions: dailyReport.summary.totalExecutions,
      successRate: dailyReport.summary.successRate,
      avgExecutionTime: dailyReport.summary.avgExecutionTime,
      activeAlerts: dailyReport.summary.activeAlerts
    });
  }

  private cleanupOldData(): void {
    const retentionTime = this.config.metricsRetentionDays * 24 * 60 * 60 * 1000;
    const cutoffTime = new Date(Date.now() - retentionTime);
    
    const originalSize = this.rawData.length;
    this.rawData = this.rawData.filter(entry => entry.timestamp > cutoffTime);
    
    const removedCount = originalSize - this.rawData.length;
    if (removedCount > 0) {
      logger.info('Cleaned up old performance data', {
        removed: removedCount,
        remaining: this.rawData.length
      });
    }
  }

  /**
   * Utility methods
   */
  private getActiveExecutions(): number {
    // Would track actual active executions in a real implementation
    return 0;
  }

  private getCurrentThroughput(): number {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    return this.rawData.filter(entry => 
      entry.timestamp > lastHour && entry.type === 'orchestration'
    ).length;
  }

  private getRecentErrors(): number {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    return this.rawData.filter(entry => 
      entry.timestamp > lastHour && 
      entry.type === 'orchestration' && 
      !entry.data.success
    ).length;
  }

  private initializeMetrics(): void {
    this.metrics = {
      orchestration: {
        totalExecutions: 0,
        successfulExecutions: 0,
        failedExecutions: 0,
        averageExecutionTime: 0,
        executionsByApproach: {}
      },
      sequential: {
        totalChains: 0,
        avgStepsPerChain: 0,
        avgConfidence: 0,
        avgProcessingTime: 0,
        stepDistribution: {},
        timeoutRate: 0
      },
      multiAgent: {
        totalDiscussions: 0,
        avgRoundsToConsensus: 0,
        avgParticipants: 0,
        consensusRate: 0,
        deadlockRate: 0,
        avgConfidenceLevel: 0
      },
      routing: {
        totalDecisions: 0,
        routingAccuracy: 0,
        avgDecisionTime: 0,
        routingDistribution: {},
        overrideRate: 0
      },
      providers: {} as any,
      caching: {
        totalRequests: 0,
        hits: 0,
        misses: 0,
        hitRate: 0,
        avgResponseTime: { hit: 0, miss: 0 },
        memoryUsage: 0,
        evictions: 0
      },
      fallbacks: {
        totalFallbacks: 0,
        fallbacksByLevel: {},
        recoveryRate: 0,
        avgFallbackTime: 0,
        emergencyResponseCount: 0
      },
      business: {
        userSatisfaction: {
          avgRating: 0,
          totalRatings: 0,
          ratingDistribution: {}
        },
        costEfficiency: {
          avgCostPerTask: 0,
          costTrends: [],
          budgetUtilization: 0
        },
        throughput: {
          tasksPerHour: 0,
          peakHour: 0,
          trends: []
        }
      }
    };

    // Initialize provider metrics
    Object.values(AIProvider).forEach(provider => {
      this.metrics.providers[provider] = {
        requests: 0,
        successes: 0,
        failures: 0,
        avgResponseTime: 0,
        totalCost: 0,
        avgAccuracy: 0,
        reliabilityScore: 1.0
      };
    });
  }

  /**
   * Public API
   */
  getMetrics(): PerformanceMetrics {
    return JSON.parse(JSON.stringify(this.metrics));
  }

  getAlerts(severity?: string): PerformanceAlert[] {
    return this.alerts.filter(alert => !severity || alert.severity === severity);
  }

  clearAlerts(olderThan?: Date): number {
    const cutoff = olderThan || new Date();
    const originalCount = this.alerts.length;
    this.alerts = this.alerts.filter(alert => alert.timestamp > cutoff);
    return originalCount - this.alerts.length;
  }

  exportMetrics(): any {
    return {
      metrics: this.getMetrics(),
      alerts: this.getAlerts(),
      rawDataSample: this.rawData.slice(-100), // Last 100 entries
      generatedAt: new Date()
    };
  }

  shutdown(): void {
    // Clear all timers
    Object.values(this.aggregationTimers).forEach(timer => {
      if (timer) clearInterval(timer);
    });

    // Clear data
    this.rawData.length = 0;
    this.alerts.length = 0;

    logger.info('Performance monitor shut down');
  }
}