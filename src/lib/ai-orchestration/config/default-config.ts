/**
 * Default Configuration for AI Orchestration Service
 * Production-ready configuration with sensible defaults
 */

import { AIProvider } from '@/types/ai-service';
import { OrchestrationServiceConfig } from '../index';
import { AgentPersona } from '../core/types';

export const defaultOrchestrationConfig: OrchestrationServiceConfig = {
  orchestration: {
    agents: [
      {
        id: 'lead-architect-001',
        persona: AgentPersona.LEAD_ARCHITECT,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: 'You are a lead architect specializing in disaster recovery coordination and strategic planning.',
        specializations: ['strategic-planning', 'system-architecture', 'coordination'],
        preferredTaskTypes: ['complex-analysis', 'multi-stakeholder', 'strategic-planning'],
        trustScore: 0.95,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 3
      },
      {
        id: 'technical-expert-001',
        persona: AgentPersona.TECHNICAL_EXPERT,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: 'You are a technical expert specializing in structural analysis and damage assessment.',
        specializations: ['damage-assessment', 'structural-analysis', 'technical-specifications'],
        preferredTaskTypes: ['damage-assessment', 'safety-analysis', 'technical-review'],
        trustScore: 0.93,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 2
      },
      {
        id: 'safety-inspector-001',
        persona: AgentPersona.SAFETY_INSPECTOR,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: 'You are a safety inspector focused on compliance, risk assessment, and safety protocols.',
        specializations: ['safety-protocols', 'compliance', 'risk-assessment'],
        preferredTaskTypes: ['safety-analysis', 'compliance-review', 'risk-assessment'],
        trustScore: 0.97,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 2
      },
      {
        id: 'cost-analyst-001',
        persona: AgentPersona.COST_ANALYST,
        provider: AIProvider.OPENROUTER_GPT_OSS_120B,
        model: 'gpt-oss-120b',
        systemPrompt: 'You are a cost analyst specializing in financial planning and resource optimization.',
        specializations: ['cost-estimation', 'resource-planning', 'budget-optimization'],
        preferredTaskTypes: ['cost-analysis', 'resource-planning', 'budget-estimation'],
        trustScore: 0.91,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 3
      },
      {
        id: 'emergency-coordinator-001',
        persona: AgentPersona.EMERGENCY_COORDINATOR,
        provider: AIProvider.ANTHROPIC_CLAUDE,
        model: 'claude-3-sonnet',
        systemPrompt: 'You are an emergency coordinator focused on rapid response and crisis management.',
        specializations: ['emergency-response', 'rapid-coordination', 'crisis-management'],
        preferredTaskTypes: ['emergency-routing', 'crisis-response', 'urgent-coordination'],
        trustScore: 0.88,
        responseHistory: [],
        currentLoad: 0,
        maxConcurrentTasks: 5
      }
    ],
    routing: {
      defaultApproach: 'sequential-thinking',
      complexityThreshold: 7,
      urgencyThreshold: 8,
      accuracyThreshold: 8,
      consensusThreshold: 0.8
    },
    sequentialThinking: {
      maxSteps: 10,
      confidenceThreshold: 0.8,
      timeoutPerStep: 30000,
      enablePeerReview: true
    },
    multiAgentDiscussion: {
      maxRounds: 5,
      convergenceThreshold: 0.8,
      enableDebate: true,
      requireUnanimous: false
    },
    caching: {
      cacheSequentialChains: true,
      cacheDiscussions: true,
      ttl: 3600
    },
    monitoring: {
      trackPerformance: true,
      logDecisions: true,
      alertOnDisagreements: true
    }
  },

  cache: {
    maxMemorySize: 100 * 1024 * 1024, // 100MB
    maxEntries: 10000,
    defaultTTL: 3600, // 1 hour
    enableCompression: false,
    enablePersistence: false,
    cleanupInterval: 300 // 5 minutes
  },

  fallback: {
    maxRetries: 3,
    retryDelays: [1000, 2000, 4000], // 1s, 2s, 4s
    enableCircuitBreaker: true,
    circuitBreakerThreshold: 5,
    circuitBreakerResetTime: 60000, // 1 minute
    gracefulDegradation: true,
    emergencyBypass: true,
    fallbackProviderOrder: [
      AIProvider.ANTHROPIC_CLAUDE,
      AIProvider.OPENROUTER_GPT_OSS_120B
    ],
    fallbackApproachOrder: [
      'single-agent',
      'sequential-thinking', 
      'multi-agent-discussion'
    ]
  },

  context: {
    enablePersistence: false,
    maxContextAge: 24 * 60 * 60 * 1000, // 24 hours
    maxContextSize: 1000,
    persistToDisk: false,
    encryptSensitiveData: true
  },

  monitoring: {
    metricsRetentionDays: 7,
    alertThresholds: {
      responseTime: 10000, // 10 seconds
      errorRate: 10, // 10%
      accuracy: 0.7, // 70%
      costPerTask: 5.0, // $5 AUD
      cacheHitRate: 50 // 50%
    },
    enableRealTimeMonitoring: true,
    enablePredictiveAnalytics: true,
    aggregationIntervals: {
      realTime: 30, // 30 seconds
      hourly: 3600, // 1 hour  
      daily: 86400 // 24 hours
    }
  }
};

/**
 * Development Configuration
 * Optimized for development with faster timeouts and verbose logging
 */
export const developmentConfig: Partial<OrchestrationServiceConfig> = {
  orchestration: {
    sequentialThinking: {
      maxSteps: 5,
      timeoutPerStep: 15000 // 15 seconds
    },
    multiAgentDiscussion: {
      maxRounds: 3
    }
  },
  cache: {
    maxMemorySize: 50 * 1024 * 1024, // 50MB
    maxEntries: 1000,
    defaultTTL: 1800 // 30 minutes
  },
  fallback: {
    maxRetries: 2,
    retryDelays: [500, 1000]
  },
  monitoring: {
    metricsRetentionDays: 1,
    alertThresholds: {
      responseTime: 15000, // More lenient for development
      errorRate: 20
    }
  }
};

/**
 * Production Configuration
 * Optimized for production with enhanced reliability and monitoring
 */
export const productionConfig: Partial<OrchestrationServiceConfig> = {
  orchestration: {
    routing: {
      complexityThreshold: 6, // More aggressive routing to complex approaches
      accuracyThreshold: 9
    },
    sequentialThinking: {
      maxSteps: 12,
      timeoutPerStep: 45000, // 45 seconds
      enablePeerReview: true
    },
    multiAgentDiscussion: {
      maxRounds: 6,
      convergenceThreshold: 0.85 // Higher consensus threshold
    }
  },
  cache: {
    maxMemorySize: 500 * 1024 * 1024, // 500MB
    maxEntries: 50000,
    defaultTTL: 7200, // 2 hours
    enablePersistence: true,
    enableCompression: true
  },
  fallback: {
    maxRetries: 5,
    retryDelays: [1000, 2000, 4000, 8000, 16000],
    circuitBreakerThreshold: 3 // More sensitive in production
  },
  context: {
    enablePersistence: true,
    maxContextAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    persistToDisk: true
  },
  monitoring: {
    metricsRetentionDays: 30,
    alertThresholds: {
      responseTime: 8000, // Stricter requirements
      errorRate: 5,
      accuracy: 0.8,
      costPerTask: 3.0
    }
  }
};

/**
 * Emergency Configuration
 * Optimized for emergency scenarios with speed prioritization
 */
export const emergencyConfig: Partial<OrchestrationServiceConfig> = {
  orchestration: {
    routing: {
      defaultApproach: 'single-agent',
      urgencyThreshold: 6, // Lower threshold for emergency routing
      complexityThreshold: 9 // Higher threshold to avoid complex approaches
    },
    sequentialThinking: {
      maxSteps: 3, // Reduced steps for speed
      timeoutPerStep: 10000 // 10 seconds
    },
    multiAgentDiscussion: {
      maxRounds: 2 // Quick consensus
    }
  },
  fallback: {
    maxRetries: 2,
    retryDelays: [500, 1000], // Faster retries
    emergencyBypass: true
  },
  monitoring: {
    alertThresholds: {
      responseTime: 5000, // 5 seconds for emergency
      errorRate: 15 // More tolerant during emergencies
    }
  }
};

/**
 * High-Accuracy Configuration
 * Optimized for scenarios requiring maximum accuracy
 */
export const highAccuracyConfig: Partial<OrchestrationServiceConfig> = {
  orchestration: {
    routing: {
      defaultApproach: 'multi-agent-discussion',
      accuracyThreshold: 7, // Lower threshold to trigger high-accuracy approaches
      consensusThreshold: 0.9
    },
    sequentialThinking: {
      maxSteps: 15,
      confidenceThreshold: 0.9,
      enablePeerReview: true
    },
    multiAgentDiscussion: {
      maxRounds: 8,
      convergenceThreshold: 0.9,
      requireUnanimous: true // Require unanimous agreement
    }
  },
  fallback: {
    gracefulDegradation: false, // Don't compromise on accuracy
    emergencyBypass: false
  },
  monitoring: {
    alertThresholds: {
      accuracy: 0.9,
      errorRate: 2 // Very low tolerance for errors
    }
  }
};

/**
 * Cost-Optimized Configuration
 * Optimized for cost-effective operations
 */
export const costOptimizedConfig: Partial<OrchestrationServiceConfig> = {
  orchestration: {
    routing: {
      defaultApproach: 'single-agent',
      complexityThreshold: 8, // Higher threshold to avoid expensive approaches
      consensusThreshold: 0.7 // Lower consensus requirement
    },
    sequentialThinking: {
      maxSteps: 6, // Reduced steps
      timeoutPerStep: 20000
    },
    multiAgentDiscussion: {
      maxRounds: 3 // Fewer rounds
    },
    caching: {
      ttl: 7200 // Longer cache retention
    }
  },
  cache: {
    defaultTTL: 7200, // 2 hours
    maxMemorySize: 200 * 1024 * 1024 // Larger cache
  },
  fallback: {
    fallbackProviderOrder: [
      AIProvider.ANTHROPIC_CLAUDE // Prefer cheaper option
    ]
  },
  monitoring: {
    alertThresholds: {
      costPerTask: 2.0, // Strict cost limits
      cacheHitRate: 70 // Higher cache hit rate target
    }
  }
};

/**
 * Configuration Factory
 * Creates configuration based on environment and requirements
 */
export function createConfiguration(
  environment: 'development' | 'staging' | 'production',
  optimization?: 'speed' | 'accuracy' | 'cost' | 'emergency'
): OrchestrationServiceConfig {
  let baseConfig = { ...defaultOrchestrationConfig };

  // Apply environment-specific config
  switch (environment) {
    case 'development':
      baseConfig = mergeConfig(baseConfig, developmentConfig);
      break;
    case 'production':
      baseConfig = mergeConfig(baseConfig, productionConfig);
      break;
    case 'staging':
      // Staging uses production config with development monitoring
      baseConfig = mergeConfig(baseConfig, productionConfig);
      baseConfig = mergeConfig(baseConfig, {
        monitoring: developmentConfig.monitoring
      });
      break;
  }

  // Apply optimization-specific config
  if (optimization) {
    switch (optimization) {
      case 'speed':
      case 'emergency':
        baseConfig = mergeConfig(baseConfig, emergencyConfig);
        break;
      case 'accuracy':
        baseConfig = mergeConfig(baseConfig, highAccuracyConfig);
        break;
      case 'cost':
        baseConfig = mergeConfig(baseConfig, costOptimizedConfig);
        break;
    }
  }

  return baseConfig;
}

/**
 * Deep merge configuration objects
 */
function mergeConfig(
  base: OrchestrationServiceConfig, 
  override: Partial<OrchestrationServiceConfig>
): OrchestrationServiceConfig {
  const result = { ...base };

  for (const key in override) {
    if (override.hasOwnProperty(key)) {
      const value = override[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = { ...result[key], ...value };
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}

/**
 * Environment-based configuration loader
 */
export function loadConfigFromEnvironment(): Partial<OrchestrationServiceConfig> {
  const env = process.env;
  
  return {
    orchestration: {
      routing: {
        defaultApproach: (env.ORCHESTRATION_DEFAULT_APPROACH as any) || 'sequential-thinking',
        complexityThreshold: parseInt(env.ORCHESTRATION_COMPLEXITY_THRESHOLD || '7'),
        urgencyThreshold: parseInt(env.ORCHESTRATION_URGENCY_THRESHOLD || '8')
      },
      sequentialThinking: {
        maxSteps: parseInt(env.SEQUENTIAL_MAX_STEPS || '10'),
        timeoutPerStep: parseInt(env.SEQUENTIAL_TIMEOUT_PER_STEP || '30000')
      }
    },
    cache: {
      maxMemorySize: parseInt(env.CACHE_MAX_MEMORY || '104857600'), // 100MB
      maxEntries: parseInt(env.CACHE_MAX_ENTRIES || '10000'),
      defaultTTL: parseInt(env.CACHE_DEFAULT_TTL || '3600'),
      enablePersistence: env.CACHE_ENABLE_PERSISTENCE === 'true'
    },
    fallback: {
      maxRetries: parseInt(env.FALLBACK_MAX_RETRIES || '3'),
      enableCircuitBreaker: env.FALLBACK_ENABLE_CIRCUIT_BREAKER !== 'false'
    },
    monitoring: {
      enableRealTimeMonitoring: env.MONITORING_ENABLE_REALTIME !== 'false',
      enablePredictiveAnalytics: env.MONITORING_ENABLE_PREDICTIVE === 'true',
      metricsRetentionDays: parseInt(env.MONITORING_RETENTION_DAYS || '7'),
      alertThresholds: {
        responseTime: parseInt(env.ALERT_RESPONSE_TIME_MS || '10000'),
        errorRate: parseFloat(env.ALERT_ERROR_RATE || '10'),
        accuracy: parseFloat(env.ALERT_MIN_ACCURACY || '0.7'),
        costPerTask: parseFloat(env.ALERT_MAX_COST_PER_TASK || '5.0'),
        cacheHitRate: parseFloat(env.ALERT_MIN_CACHE_HIT_RATE || '50')
      }
    }
  };
}