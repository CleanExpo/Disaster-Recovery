/**
 * Context Manager for AI Orchestration
 * Manages conversation context, state, and memory across different orchestration approaches
 */

import {
  SequentialThinkingChain,
  Discussion,
  OrchestrationError
} from './types';
import { AIMessage, AITaskContext } from '@/types/ai-service';
import { logger } from '@/lib/logger';

export interface ConversationContext {
  id: string;
  userId?: string;
  sessionId?: string;
  startTime: Date;
  lastActivity: Date;
  
  // Core context
  originalTask: string;
  taskContext: AITaskContext;
  currentApproach: 'single-agent' | 'sequential-thinking' | 'multi-agent-discussion' | 'hybrid';
  
  // State tracking
  state: 'initializing' | 'processing' | 'waiting-for-input' | 'completed' | 'failed' | 'paused';
  progress: {
    stage: string;
    percentage: number;
    estimatedTimeRemaining?: number;
    currentActivity: string;
  };
  
  // Memory and history
  messageHistory: AIMessage[];
  keyInsights: string[];
  decisions: {
    timestamp: Date;
    decision: string;
    confidence: number;
    approach: string;
    reasoning: string;
  }[];
  
  // Orchestration-specific data
  sequentialThinking?: {
    chainId: string;
    currentStep: number;
    totalSteps: number;
    confidence: number;
    keyFindings: string[];
  };
  
  multiAgentDiscussion?: {
    discussionId: string;
    currentRound: number;
    totalRounds: number;
    participants: string[];
    convergenceScore: number;
    keyDebates: string[];
  };
  
  // Result and output
  finalResult?: {
    content: string;
    confidence: number;
    approach: string;
    processingTime: number;
    cost: number;
    metadata: any;
  };
  
  // Context metadata
  metadata: {
    complexity: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    emergencyContext: boolean;
    stakeholderCount: number;
    tags: string[];
  };
}

export interface ContextPersistenceConfig {
  enablePersistence: boolean;
  maxContextAge: number; // milliseconds
  maxContextSize: number; // number of contexts to keep
  persistToDisk: boolean;
  encryptSensitiveData: boolean;
}

export class ContextManager {
  private contexts: Map<string, ConversationContext> = new Map();
  private userContexts: Map<string, Set<string>> = new Map();
  private sessionContexts: Map<string, Set<string>> = new Map();
  private persistenceConfig: ContextPersistenceConfig;
  private cleanupInterval: NodeJS.Timeout;

  constructor(persistenceConfig: ContextPersistenceConfig) {
    this.persistenceConfig = persistenceConfig;
    this.startCleanup();
  }

  /**
   * Create new conversation context
   */
  createContext(
    originalTask: string,
    taskContext: AITaskContext,
    approach: 'single-agent' | 'sequential-thinking' | 'multi-agent-discussion' | 'hybrid',
    options?: {
      userId?: string;
      sessionId?: string;
      tags?: string[];
    }
  ): string {
    const contextId = this.generateContextId();
    
    const context: ConversationContext = {
      id: contextId,
      userId: options?.userId,
      sessionId: options?.sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      
      originalTask,
      taskContext,
      currentApproach: approach,
      
      state: 'initializing',
      progress: {
        stage: 'Initializing',
        percentage: 0,
        currentActivity: 'Setting up orchestration'
      },
      
      messageHistory: [],
      keyInsights: [],
      decisions: [],
      
      metadata: {
        complexity: this.assessComplexity(originalTask, taskContext),
        riskLevel: this.assessRiskLevel(taskContext),
        emergencyContext: taskContext.userContext?.emergency || false,
        stakeholderCount: this.countStakeholders(originalTask),
        tags: options?.tags || []
      }
    };

    this.contexts.set(contextId, context);
    
    // Track user and session associations
    if (options?.userId) {
      if (!this.userContexts.has(options.userId)) {
        this.userContexts.set(options.userId, new Set());
      }
      this.userContexts.get(options.userId)!.add(contextId);
    }
    
    if (options?.sessionId) {
      if (!this.sessionContexts.has(options.sessionId)) {
        this.sessionContexts.set(options.sessionId, new Set());
      }
      this.sessionContexts.get(options.sessionId)!.add(contextId);
    }

    logger.info('Created conversation context', {
      contextId,
      approach,
      complexity: context.metadata.complexity,
      riskLevel: context.metadata.riskLevel,
      userId: options?.userId,
      sessionId: options?.sessionId
    });

    return contextId;
  }

  /**
   * Get conversation context
   */
  getContext(contextId: string): ConversationContext | null {
    const context = this.contexts.get(contextId);
    
    if (context) {
      context.lastActivity = new Date();
      return context;
    }
    
    return null;
  }

  /**
   * Update context state
   */
  updateState(contextId: string, newState: ConversationContext['state']): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    const oldState = context.state;
    context.state = newState;
    context.lastActivity = new Date();

    logger.debug('Context state updated', {
      contextId,
      oldState,
      newState
    });

    return true;
  }

  /**
   * Update progress
   */
  updateProgress(
    contextId: string,
    progress: Partial<ConversationContext['progress']>
  ): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    context.progress = { ...context.progress, ...progress };
    context.lastActivity = new Date();

    logger.debug('Context progress updated', {
      contextId,
      stage: context.progress.stage,
      percentage: context.progress.percentage
    });

    return true;
  }

  /**
   * Add message to history
   */
  addMessage(contextId: string, message: AIMessage): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    context.messageHistory.push({
      ...message,
      timestamp: message.timestamp || new Date()
    });
    
    // Limit message history size
    if (context.messageHistory.length > 50) {
      context.messageHistory = context.messageHistory.slice(-50);
    }
    
    context.lastActivity = new Date();
    return true;
  }

  /**
   * Add key insight
   */
  addInsight(contextId: string, insight: string): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    // Avoid duplicates
    if (!context.keyInsights.includes(insight)) {
      context.keyInsights.push(insight);
      
      // Limit insights
      if (context.keyInsights.length > 20) {
        context.keyInsights = context.keyInsights.slice(-20);
      }
    }
    
    context.lastActivity = new Date();
    return true;
  }

  /**
   * Add decision
   */
  addDecision(
    contextId: string,
    decision: string,
    confidence: number,
    approach: string,
    reasoning: string
  ): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    context.decisions.push({
      timestamp: new Date(),
      decision,
      confidence,
      approach,
      reasoning
    });
    
    // Limit decisions
    if (context.decisions.length > 10) {
      context.decisions = context.decisions.slice(-10);
    }
    
    context.lastActivity = new Date();
    return true;
  }

  /**
   * Update sequential thinking progress
   */
  updateSequentialThinking(
    contextId: string,
    data: Partial<NonNullable<ConversationContext['sequentialThinking']>>
  ): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    if (!context.sequentialThinking) {
      context.sequentialThinking = {
        chainId: data.chainId || '',
        currentStep: data.currentStep || 0,
        totalSteps: data.totalSteps || 0,
        confidence: data.confidence || 0,
        keyFindings: data.keyFindings || []
      };
    } else {
      context.sequentialThinking = { ...context.sequentialThinking, ...data };
    }
    
    // Update progress
    if (context.sequentialThinking.totalSteps > 0) {
      const percentage = Math.round(
        (context.sequentialThinking.currentStep / context.sequentialThinking.totalSteps) * 100
      );
      this.updateProgress(contextId, {
        stage: 'Sequential Thinking',
        percentage,
        currentActivity: `Step ${context.sequentialThinking.currentStep} of ${context.sequentialThinking.totalSteps}`
      });
    }
    
    context.lastActivity = new Date();
    return true;
  }

  /**
   * Update multi-agent discussion progress
   */
  updateMultiAgentDiscussion(
    contextId: string,
    data: Partial<NonNullable<ConversationContext['multiAgentDiscussion']>>
  ): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    if (!context.multiAgentDiscussion) {
      context.multiAgentDiscussion = {
        discussionId: data.discussionId || '',
        currentRound: data.currentRound || 0,
        totalRounds: data.totalRounds || 0,
        participants: data.participants || [],
        convergenceScore: data.convergenceScore || 0,
        keyDebates: data.keyDebates || []
      };
    } else {
      context.multiAgentDiscussion = { ...context.multiAgentDiscussion, ...data };
    }
    
    // Update progress
    if (context.multiAgentDiscussion.totalRounds > 0) {
      const percentage = Math.round(
        (context.multiAgentDiscussion.currentRound / context.multiAgentDiscussion.totalRounds) * 100
      );
      this.updateProgress(contextId, {
        stage: 'Multi-Agent Discussion',
        percentage,
        currentActivity: `Round ${context.multiAgentDiscussion.currentRound} of ${context.multiAgentDiscussion.totalRounds}`
      });
    }
    
    context.lastActivity = new Date();
    return true;
  }

  /**
   * Set final result
   */
  setFinalResult(
    contextId: string,
    result: {
      content: string;
      confidence: number;
      approach: string;
      processingTime: number;
      cost: number;
      metadata?: any;
    }
  ): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    context.finalResult = result;
    context.state = 'completed';
    context.progress = {
      stage: 'Completed',
      percentage: 100,
      currentActivity: 'Analysis complete'
    };
    context.lastActivity = new Date();

    logger.info('Context completed', {
      contextId,
      approach: result.approach,
      confidence: result.confidence,
      processingTime: result.processingTime
    });

    return true;
  }

  /**
   * Get contexts for user
   */
  getUserContexts(userId: string): ConversationContext[] {
    const contextIds = this.userContexts.get(userId);
    if (!contextIds) return [];

    return Array.from(contextIds)
      .map(id => this.contexts.get(id))
      .filter((context): context is ConversationContext => context !== undefined)
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }

  /**
   * Get contexts for session
   */
  getSessionContexts(sessionId: string): ConversationContext[] {
    const contextIds = this.sessionContexts.get(sessionId);
    if (!contextIds) return [];

    return Array.from(contextIds)
      .map(id => this.contexts.get(id))
      .filter((context): context is ConversationContext => context !== undefined)
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }

  /**
   * Search contexts by criteria
   */
  searchContexts(criteria: {
    userId?: string;
    sessionId?: string;
    approach?: string;
    state?: string;
    riskLevel?: string;
    tags?: string[];
    dateRange?: {
      start: Date;
      end: Date;
    };
  }): ConversationContext[] {
    const results: ConversationContext[] = [];

    for (const context of this.contexts.values()) {
      let matches = true;

      if (criteria.userId && context.userId !== criteria.userId) {
        matches = false;
      }

      if (criteria.sessionId && context.sessionId !== criteria.sessionId) {
        matches = false;
      }

      if (criteria.approach && context.currentApproach !== criteria.approach) {
        matches = false;
      }

      if (criteria.state && context.state !== criteria.state) {
        matches = false;
      }

      if (criteria.riskLevel && context.metadata.riskLevel !== criteria.riskLevel) {
        matches = false;
      }

      if (criteria.tags && criteria.tags.length > 0) {
        const hasAllTags = criteria.tags.every(tag =>
          context.metadata.tags.includes(tag)
        );
        if (!hasAllTags) {
          matches = false;
        }
      }

      if (criteria.dateRange) {
        const contextTime = context.startTime.getTime();
        if (contextTime < criteria.dateRange.start.getTime() ||
            contextTime > criteria.dateRange.end.getTime()) {
          matches = false;
        }
      }

      if (matches) {
        results.push(context);
      }
    }

    return results.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
  }

  /**
   * Export context data for analysis
   */
  exportContext(contextId: string): any {
    const context = this.contexts.get(contextId);
    if (!context) return null;

    // Remove sensitive data if configured
    const exportData = { ...context };
    
    if (this.persistenceConfig.encryptSensitiveData) {
      // In a real implementation, you would encrypt sensitive fields
      exportData.originalTask = '[ENCRYPTED]';
      exportData.messageHistory = [];
    }

    return exportData;
  }

  /**
   * Delete context
   */
  deleteContext(contextId: string): boolean {
    const context = this.contexts.get(contextId);
    if (!context) return false;

    // Remove from user tracking
    if (context.userId) {
      const userContexts = this.userContexts.get(context.userId);
      if (userContexts) {
        userContexts.delete(contextId);
        if (userContexts.size === 0) {
          this.userContexts.delete(context.userId);
        }
      }
    }

    // Remove from session tracking
    if (context.sessionId) {
      const sessionContexts = this.sessionContexts.get(context.sessionId);
      if (sessionContexts) {
        sessionContexts.delete(contextId);
        if (sessionContexts.size === 0) {
          this.sessionContexts.delete(context.sessionId);
        }
      }
    }

    // Remove context
    this.contexts.delete(contextId);

    logger.info('Deleted context', { contextId });
    return true;
  }

  /**
   * Get context statistics
   */
  getStatistics(): {
    totalContexts: number;
    activeContexts: number;
    contextsByState: Record<string, number>;
    contextsByApproach: Record<string, number>;
    averageProcessingTime: number;
    averageConfidence: number;
  } {
    const contextsByState: Record<string, number> = {};
    const contextsByApproach: Record<string, number> = {};
    let totalProcessingTime = 0;
    let totalConfidence = 0;
    let completedContexts = 0;

    for (const context of this.contexts.values()) {
      // Count by state
      contextsByState[context.state] = (contextsByState[context.state] || 0) + 1;
      
      // Count by approach
      contextsByApproach[context.currentApproach] = (contextsByApproach[context.currentApproach] || 0) + 1;
      
      // Calculate averages for completed contexts
      if (context.finalResult) {
        totalProcessingTime += context.finalResult.processingTime;
        totalConfidence += context.finalResult.confidence;
        completedContexts++;
      }
    }

    const activeStates = ['initializing', 'processing', 'waiting-for-input'];
    const activeContexts = Array.from(this.contexts.values())
      .filter(context => activeStates.includes(context.state)).length;

    return {
      totalContexts: this.contexts.size,
      activeContexts,
      contextsByState,
      contextsByApproach,
      averageProcessingTime: completedContexts > 0 ? totalProcessingTime / completedContexts : 0,
      averageConfidence: completedContexts > 0 ? totalConfidence / completedContexts : 0
    };
  }

  /**
   * Private helper methods
   */
  private assessComplexity(task: string, context: AITaskContext): number {
    let complexity = 1;
    
    if (task.length > 500) complexity += 1;
    if (task.length > 1000) complexity += 1;
    
    if (context.accuracyRequired === 'critical') complexity += 2;
    if (context.priority === 'critical') complexity += 1;
    
    return Math.min(complexity, 10);
  }

  private assessRiskLevel(context: AITaskContext): 'low' | 'medium' | 'high' | 'critical' {
    if (context.userContext?.emergency || context.priority === 'critical') {
      return 'critical';
    }
    
    if (context.accuracyRequired === 'critical') {
      return 'high';
    }
    
    if (context.priority === 'high' || context.accuracyRequired === 'high') {
      return 'medium';
    }
    
    return 'low';
  }

  private countStakeholders(task: string): number {
    const stakeholders = [
      'homeowner', 'tenant', 'landlord', 'insurance', 'contractor',
      'emergency services', 'council', 'neighbour', 'business owner'
    ];

    return stakeholders.filter(stakeholder =>
      task.toLowerCase().includes(stakeholder)
    ).length;
  }

  private generateContextId(): string {
    return `ctx_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const maxAge = this.persistenceConfig.maxContextAge;
      const contextsToDelete: string[] = [];

      for (const [contextId, context] of this.contexts.entries()) {
        const age = now - context.lastActivity.getTime();
        
        // Delete old contexts that are completed or failed
        if (age > maxAge && (context.state === 'completed' || context.state === 'failed')) {
          contextsToDelete.push(contextId);
        }
      }

      // Keep only the most recent contexts if we exceed max size
      if (this.contexts.size > this.persistenceConfig.maxContextSize) {
        const sortedContexts = Array.from(this.contexts.entries())
          .sort(([,a], [,b]) => b.lastActivity.getTime() - a.lastActivity.getTime());
        
        const excessContexts = sortedContexts.slice(this.persistenceConfig.maxContextSize);
        excessContexts.forEach(([contextId]) => {
          contextsToDelete.push(contextId);
        });
      }

      contextsToDelete.forEach(contextId => {
        this.deleteContext(contextId);
      });

      if (contextsToDelete.length > 0) {
        logger.info('Cleaned up old contexts', { 
          deleted: contextsToDelete.length,
          remaining: this.contexts.size
        });
      }
    }, 300000); // 5 minutes
  }

  /**
   * Shutdown and cleanup
   */
  shutdown(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    this.contexts.clear();
    this.userContexts.clear();
    this.sessionContexts.clear();
    
    logger.info('Context manager shut down');
  }
}