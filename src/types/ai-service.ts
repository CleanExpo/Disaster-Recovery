/**
 * AI Service Types for Disaster Recovery
 * Production-ready AI abstraction layer supporting multiple providers
 */

// Base Types
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface AIUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost?: number;
}

export interface AIResponse {
  content: string;
  usage: AIUsageMetrics;
  model: string;
  provider: AIProvider;
  responseTime: number;
  cached?: boolean;
}

// Provider Configuration
export enum AIProvider {
  OPENROUTER_GPT_OSS_120B = 'openrouter-gpt-oss-120b',
  ANTHROPIC_CLAUDE = 'anthropic-claude',
  FALLBACK = 'fallback'
}

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  enabled: boolean;
  priority: number; // Lower number = higher priority
  costPerToken: number;
  rateLimit: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

// Task Classification
export enum AITaskType {
  // Emergency Response (High Accuracy Required)
  DAMAGE_ASSESSMENT = 'damage-assessment',
  EMERGENCY_ROUTING = 'emergency-routing',
  SAFETY_ANALYSIS = 'safety-analysis',
  
  // Business Operations (Balanced)
  LEAD_QUALIFICATION = 'lead-qualification',
  CONTRACTOR_MATCHING = 'contractor-matching',
  ESTIMATE_GENERATION = 'estimate-generation',
  
  // Content & Communication (Speed Optimised)
  CONTENT_GENERATION = 'content-generation',
  EMAIL_RESPONSES = 'email-responses',
  FAQ_ANSWERS = 'faq-answers',
  
  // Analytics & Reporting (Complex Reasoning)
  BUSINESS_ANALYTICS = 'business-analytics',
  MARKET_ANALYSIS = 'market-analysis',
  COMPLIANCE_REVIEW = 'compliance-review'
}

export interface AITaskContext {
  type: AITaskType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  maxResponseTime: number; // milliseconds
  accuracyRequired: 'standard' | 'high' | 'critical';
  costSensitive: boolean;
  userContext?: {
    userId?: string;
    sessionId?: string;
    location?: string;
    emergency?: boolean;
  };
}

// Routing Configuration
export interface AIRoutingRule {
  taskType: AITaskType;
  preferredProviders: AIProvider[];
  fallbackProviders: AIProvider[];
  conditions?: {
    minAccuracy?: number;
    maxCost?: number;
    maxResponseTime?: number;
  };
}

// Caching
export interface AICacheConfig {
  enabled: boolean;
  ttl: number; // seconds
  maxSize: number; // number of entries
  keyStrategy: 'full-hash' | 'content-hash' | 'semantic-similarity';
}

export interface AICacheEntry {
  key: string;
  response: AIResponse;
  createdAt: Date;
  expiresAt: Date;
  hitCount: number;
  lastAccessed: Date;
}

// Monitoring
export interface AIMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  totalCost: number;
  cacheHitRate: number;
  providerMetrics: Record<AIProvider, {
    requests: number;
    successes: number;
    failures: number;
    averageResponseTime: number;
    totalCost: number;
  }>;
}

export interface AIServiceError {
  code: string;
  message: string;
  provider?: AIProvider;
  retryable: boolean;
  context?: any;
}

// Service Interface
export interface IAIService {
  // Core Methods
  generateResponse(
    messages: AIMessage[],
    context: AITaskContext,
    options?: {
      stream?: boolean;
      preferredProvider?: AIProvider;
      maxRetries?: number;
    }
  ): Promise<AIResponse>;

  // Streaming
  generateStreamingResponse(
    messages: AIMessage[],
    context: AITaskContext,
    callback: (chunk: string) => void,
    options?: {
      preferredProvider?: AIProvider;
      maxRetries?: number;
    }
  ): Promise<AIResponse>;

  // Health & Monitoring
  getHealthStatus(): Promise<Record<AIProvider, boolean>>;
  getMetrics(): Promise<AIMetrics>;
  
  // Cache Management
  clearCache(pattern?: string): Promise<void>;
  getCacheStats(): Promise<{
    size: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  }>;
}

// Configuration
export interface AIServiceConfig {
  providers: AIProviderConfig[];
  routing: AIRoutingRule[];
  cache: AICacheConfig;
  monitoring: {
    enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    metricsRetention: number; // days
  };
  fallback: {
    maxRetries: number;
    backoffMultiplier: number;
    enableCircuitBreaker: boolean;
  };
}

// Specialised Types for Disaster Recovery Context
export interface DisasterAssessmentRequest {
  images?: string[]; // Base64 or URLs
  description: string;
  location: {
    address: string;
    coordinates?: [number, number];
  };
  urgency: 'low' | 'medium' | 'high' | 'critical';
  propertyType: 'residential' | 'commercial' | 'industrial';
}

export interface DisasterAssessmentResponse extends AIResponse {
  assessment: {
    damageLevel: 1 | 2 | 3 | 4 | 5;
    hazards: string[];
    estimatedCost: {
      min: number;
      max: number;
      currency: 'AUD';
    };
    requiredServices: string[];
    timeframe: {
      emergency: boolean;
      estimatedDays: number;
    };
    recommendations: string[];
  };
}

export interface ContractorMatchingRequest {
  services: string[];
  location: string;
  urgency: 'standard' | 'urgent' | 'emergency';
  budget?: {
    min: number;
    max: number;
  };
  requirements: {
    certifications?: string[];
    experience?: number;
    availability?: 'immediate' | 'within-24h' | 'within-week';
  };
}

export interface ContractorMatchingResponse extends AIResponse {
  matches: {
    contractorId: string;
    matchScore: number;
    reasons: string[];
    availability: string;
    estimatedCost: number;
    certifications: string[];
    experience: number;
    distance: number; // km
  }[];
}