export interface ResearchTask {
  id?: string;
  type: 'documentation' | 'analysis' | 'design' | 'implementation' | 'testing';
  description: string;
  context?: any;
  priority?: 'low' | 'medium' | 'high';
  timeout?: number;
  parallel?: boolean;
  requirements?: string[];
  constraints?: string[];
}

export interface ResearchResult {
  success: boolean;
  summary: string;
  details: Record<string, any>;
  recommendations: string[];
  confidence: number;
  metadata?: {
    totalAgents: number;
    successfulAgents: number;
    failedAgents: number;
    timestamp: string;
  };
  errors?: Array<{
    agent: string;
    error: string;
  }>;
}

export interface AgentCapability {
  name: string;
  description: string;
  skills: string[];
  confidence: number;
}

export interface ComponentPattern {
  name: string;
  category: string;
  description: string;
  usage: string;
  props?: Record<string, any>;
  examples?: string[];
  dependencies?: string[];
  accessibility?: string[];
  variants?: string[];
}

export interface UIDesignPattern {
  name: string;
  type: 'layout' | 'navigation' | 'form' | 'data-display' | 'feedback';
  description: string;
  implementation: string;
  bestPractices: string[];
  antiPatterns: string[];
  examples: string[];
}

export interface BrowserTestCase {
  name: string;
  description: string;
  steps: Array<{
    action: string;
    selector?: string;
    value?: any;
    assertion?: string;
  }>;
  expectedResult: string;
}

export interface DocumentationSource {
  name: string;
  url?: string;
  type: 'official' | 'community' | 'tutorial' | 'api';
  relevance: number;
  lastUpdated?: string;
}

export interface CodeAnalysisResult {
  files: Array<{
    path: string;
    type: string;
    size: number;
    complexity?: number;
  }>;
  patterns: string[];
  dependencies: Record<string, string>;
  suggestions: string[];
  issues?: Array<{
    severity: 'low' | 'medium' | 'high';
    type: string;
    message: string;
    file?: string;
    line?: number;
  }>;
}