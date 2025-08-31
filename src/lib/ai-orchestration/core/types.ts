/**
 * Core Types for AI Orchestration System
 * Supports multi-model integration with GPT-OSS-120B and Claude
 */

export enum AIProvider {
  ANTHROPIC = 'anthropic',
  OPENROUTER = 'openrouter',
  OPENAI = 'openai',
  FALLBACK = 'fallback' }

export enum AIModel {
  CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  CLAUDE_3_SONNET = 'claude-3-5-sonnet-20241022',
  CLAUDE_3_HAIKU = 'claude-3-5-haiku-20241022',
  CLAUDE_SONNET_LATEST = 'claude-3-5-sonnet-latest',
  GPT_OSS_120B = 'gpt-oss-120b',
  GPT_4_TURBO = 'gpt-4-turbo' }

export enum AITaskType {
  SEQUENTIAL_THINKING = 'sequential_thinking',
  MULTI_AGENT_DISCUSSION = 'multi_agent_discussion',
  QUICK_RESPONSE = 'quick_response',
  CODE_GENERATION = 'code_generation',
  DAMAGE_ASSESSMENT = 'damage_assessment',
  COST_ESTIMATION = 'cost_estimation',
  EMERGENCY_RESPONSE = 'emergency_response',
  INSURANCE_ANALYSIS = 'insurance_analysis' }

export enum TaskComplexity {
  TRIVIAL = 1,
  SIMPLE = 3,
  MODERATE = 5,
  COMPLEX = 7,
  VERY_COMPLEX = 9,
  EXTREME = 10 }

export interface AIRequest {
  id: string;
  type: AITaskType;
  prompt: string;
  context?: Record<string, any>;
  priority: 'low' | 'normal' | 'high' | 'critical' | 'emergency';
  accuracyRequired: 'standard' | 'high' | 'critical';
  maxResponseTime?: number;
  preferredModel?: AIModel;
  allowFallback?: boolean;
  sessionId?: string;
}

export interface AIResponse {
  id: string;
  requestId: string;
  model: AIModel;
  provider: AIProvider;
  response: string;
  confidence: number;
  metadata: {
    tokensUsed: number;
    latency: number;
    cost: number;
    steps?: ThinkingStep[];
    agents?: AgentResponse[];
    cacheHit?: boolean;
  };
  timestamp: Date;
}

export interface ThinkingStep {
  step: number;
  thought: string;
  confidence: number;
  duration: number;
  revision?: boolean;
  revisedFrom?: number;
}

export interface AgentResponse {
  agentId: string;
  role: string;
  response: string;
  confidence: number;
  agreement: number;
  reasoning: string;
}

export interface OrchestrationDecision {
  approach: 'direct' | 'sequential' | 'multi-agent' | 'hybrid';
  primaryModel: AIModel;
  fallbackModels: AIModel[];
  reasoning: string;
  estimatedDuration: number;
  estimatedCost: number;
  confidence: number;
}

export interface ProviderConfig {
  provider: AIProvider;
  apiKey: string;
  baseUrl?: string;
  models: AIModel[];
  maxRetries: number;
  timeout: number;
  rateLimit?: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

export interface CacheEntry {
  key: string;
  value: AIResponse;
  embedding?: number[];
  metadata: {
    hits: number;
    lastAccessed: Date;
    confidence: number;
    complexity: TaskComplexity;
  };
  ttl: number;
  expires: Date;
}

export interface PerformanceMetrics {
  requestId: string;
  totalDuration: number;
  modelLatency: number;
  orchestrationOverhead: number;
  cacheCheckDuration: number;
  tokensPerSecond: number;
  costPerToken: number;
  successRate: number;
  fallbackTriggered: boolean;
}

export interface DisasterContext {
  type: 'flood' | 'fire' | 'storm' | 'earthquake' | 'biohazard' | 'other';
  severity: number; // 1-5 scale
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
    state: string;
    postcode: string;
  };
  affectedArea: number; // square meters
  estimatedDamage?: number; // AUD
  urgency: 'immediate' | 'urgent' | 'standard';
  hasInsurance: boolean;
  insuranceProvider?: string;
  claimNumber?: string;
  photos?: string[];
  hazards?: string[];
  utilitiesStatus?: {
    power: boolean;
    water: boolean;
    gas: boolean;
  };
}

export enum AgentPersona {
  LEAD_ARCHITECT = 'lead-architect',
  TECHNICAL_EXPERT = 'technical-expert',
  SAFETY_INSPECTOR = 'safety-inspector',
  COST_ANALYST = 'cost-analyst',
  EMERGENCY_COORDINATOR = 'emergency-coordinator',
  QUALITY_AUDITOR = 'quality-auditor',
  INSURANCE_SPECIALIST = 'insurance-specialist',
  CUSTOMER_LIAISON = 'customer-liaison',
  IMPLEMENTATION_SPECIALIST = 'implementation-specialist' }

export interface AgentPersonaConfig {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  personality: string;
  decisionWeight: number;
  promptTemplate: string;
}

export interface ConsensusResult {
  decision: string;
  confidence: number;
  agreement: number;
  dissenters: string[];
  reasoning: string;
  recommendations: string[];
}

export interface OrchestrationConfig {
  providers: ProviderConfig[];
  routing: {
    complexityThreshold: number;
    urgencyThreshold: number;
    costThreshold: number;
  };
  sequentialThinking: {
    maxSteps: number;
    minConfidence: number;
    timeoutPerStep: number;
    enablePeerReview: boolean;
  };
  multiAgentDiscussion: {
    maxRounds: number;
    minAgents: number;
    maxAgents: number;
    consensusThreshold: number;
    timeoutPerRound: number;
  };
  cache: {
    enabled: boolean;
    maxSize: number;
    ttl: number;
    similarityThreshold: number;
  };
  monitoring: {
    enabled: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    metricsInterval: number;
    alertThresholds: {
      errorRate: number;
      latency: number;
      cost: number;
    };
  };
  fallback: {
    enabled: boolean;
    maxRetries: number;
    backoffMultiplier: number;
    circuitBreakerThreshold: number;
  };
}