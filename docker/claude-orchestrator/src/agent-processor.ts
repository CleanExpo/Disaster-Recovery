/**
 * Agent Processor - Handles real task processing with Claude API
 */

import { ClaudeAPIClient } from './api-client';
import { EventEmitter } from 'events';
import chalk from 'chalk';

export enum TaskType {
  GENERATE = 'generate',
  TEST = 'test',
  OPTIMIZE = 'optimize',
  DEPLOY = 'deploy',
  ANALYZE = 'analyze',
  SEO = 'seo'
}

interface Task {
  id: string;
  type: TaskType;
  input: string;
  context: any;
  priority: number;
}

interface ProcessedTask {
  taskId: string;
  result: any;
  duration: number;
  tokensUsed: number;
  cost: number;
}

export class AgentProcessor extends EventEmitter {
  private apiClient: ClaudeAPIClient;
  private activeProcessing: Map<string, Promise<any>> = new Map();

  constructor(apiConfig: any) {
    super();
    this.apiClient = new ClaudeAPIClient({
      provider: process.env.ENABLE_REAL_API === 'true' ? 'anthropic' : 'openrouter',
      apiKey: process.env.ANTHROPIC_API_KEY || process.env.OPENROUTER_API_KEY || '',
      model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-20241022',
      maxTokens: parseInt(process.env.MAX_TOKENS || '8192'),
      temperature: parseFloat(process.env.TEMPERATURE || '0.7')
    });

    // Listen to API events
    this.apiClient.on('request:start', (data) => {
      console.log(chalk.blue(`🚀 API Request #${data.requestId} started`));
    });

    this.apiClient.on('request:complete', (data) => {
      console.log(chalk.green(`✅ API Request #${data.requestId} completed`));
      console.log(chalk.gray(`   Tokens used: ${data.response.usage.totalTokens}`));
    });

    this.apiClient.on('request:error', (data) => {
      console.error(chalk.red(`❌ API Request #${data.requestId} failed:`, data.error));
    });
  }

  /**
   * Process a task with the appropriate agent
   */
  async processTask(task: Task): Promise<ProcessedTask> {
    const startTime = Date.now();
    console.log(chalk.cyan(`🔧 Processing task ${task.id} of type ${task.type}`));

    try {
      // Check if already processing
      if (this.activeProcessing.has(task.id)) {
        return await this.activeProcessing.get(task.id);
      }

      // Create processing promise
      const processingPromise = this.executeTask(task);
      this.activeProcessing.set(task.id, processingPromise);

      // Execute and clean up
      const result = await processingPromise;
      this.activeProcessing.delete(task.id);

      const duration = Date.now() - startTime;
      const stats = this.apiClient.getStats();

      const processedTask: ProcessedTask = {
        taskId: task.id,
        result,
        duration,
        tokensUsed: stats.tokenUsage,
        cost: stats.estimatedCost
      };

      this.emit('task:complete', processedTask);
      return processedTask;

    } catch (error) {
      this.activeProcessing.delete(task.id);
      this.emit('task:error', { taskId: task.id, error });
      throw error;
    }
  }

  /**
   * Execute specific task type
   */
  private async executeTask(task: Task): Promise<any> {
    const systemPrompts = {
      [TaskType.GENERATE]: `You are a code generation expert. Generate high-quality, production-ready code based on the requirements. Include error handling, documentation, and best practices.`,
      
      [TaskType.TEST]: `You are a testing expert. Create comprehensive test cases, identify edge cases, and ensure code quality. Use appropriate testing frameworks and methodologies.`,
      
      [TaskType.OPTIMIZE]: `You are an optimization expert. Analyze code for performance, identify bottlenecks, and suggest improvements. Focus on efficiency, scalability, and best practices.`,
      
      [TaskType.DEPLOY]: `You are a DevOps expert. Handle deployment configurations, CI/CD pipelines, and infrastructure as code. Ensure security and scalability.`,
      
      [TaskType.ANALYZE]: `You are a code analysis expert. Review code for security vulnerabilities, code smells, and architectural issues. Provide actionable recommendations.`,
      
      [TaskType.SEO]: `You are an SEO expert specializing in disaster recovery services in Australia. Create location-specific, keyword-optimized content that ranks well and converts visitors.`
    };

    const systemPrompt = systemPrompts[task.type] || systemPrompts[TaskType.GENERATE];
    
    // Build context-aware prompt
    const prompt = this.buildPrompt(task);

    // Make real API call
    const response = await this.apiClient.complete({
      prompt,
      systemPrompt,
      maxTokens: this.getMaxTokensForTask(task.type),
      temperature: this.getTemperatureForTask(task.type)
    });

    // Process response based on task type
    return this.processResponse(response, task);
  }

  /**
   * Build prompt from task
   */
  private buildPrompt(task: Task): string {
    let prompt = task.input;

    // Add context if available
    if (task.context) {
      prompt += '\n\nContext:\n';
      prompt += JSON.stringify(task.context, null, 2);
    }

    // Add specific instructions based on task type
    switch (task.type) {
      case TaskType.GENERATE:
        prompt += '\n\nPlease generate the requested code with full implementation.';
        break;
      case TaskType.TEST:
        prompt += '\n\nPlease create comprehensive tests including edge cases.';
        break;
      case TaskType.OPTIMIZE:
        prompt += '\n\nPlease analyze and provide optimization recommendations.';
        break;
      case TaskType.DEPLOY:
        prompt += '\n\nPlease provide deployment configuration and scripts.';
        break;
      case TaskType.ANALYZE:
        prompt += '\n\nPlease perform thorough analysis and provide recommendations.';
        break;
      case TaskType.SEO:
        prompt += '\n\nPlease create SEO-optimized content for Australian disaster recovery market.';
        break;
    }

    return prompt;
  }

  /**
   * Process API response based on task type
   */
  private processResponse(response: any, task: Task): any {
    const content = response.content;

    // Parse response based on task type
    switch (task.type) {
      case TaskType.GENERATE:
        // Extract code blocks
        const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
        return {
          code: codeBlocks.map((block: string) => 
            block.replace(/```\w*\n?/, '').replace(/```$/, '')
          ),
          explanation: content.replace(/```[\s\S]*?```/g, '').trim(),
          language: this.detectLanguage(content)
        };

      case TaskType.TEST:
        return {
          tests: content,
          framework: this.detectTestFramework(content),
          coverage: this.estimateCoverage(content)
        };

      case TaskType.OPTIMIZE:
        return {
          recommendations: content,
          improvements: this.extractImprovements(content),
          metrics: this.extractMetrics(content)
        };

      case TaskType.DEPLOY:
        return {
          configuration: content,
          scripts: this.extractScripts(content),
          infrastructure: this.extractInfrastructure(content)
        };

      case TaskType.ANALYZE:
        return {
          analysis: content,
          issues: this.extractIssues(content),
          recommendations: this.extractRecommendations(content)
        };

      case TaskType.SEO:
        return {
          content: content,
          keywords: this.extractKeywords(content),
          metadata: this.extractMetadata(content)
        };

      default:
        return { content };
    }
  }

  /**
   * Get optimal max tokens for task type
   */
  private getMaxTokensForTask(type: TaskType): number {
    const tokenMap = {
      [TaskType.GENERATE]: 4096,
      [TaskType.TEST]: 3000,
      [TaskType.OPTIMIZE]: 2000,
      [TaskType.DEPLOY]: 2500,
      [TaskType.ANALYZE]: 3000,
      [TaskType.SEO]: 2000
    };
    return tokenMap[type] || 2000;
  }

  /**
   * Get optimal temperature for task type
   */
  private getTemperatureForTask(type: TaskType): number {
    const tempMap = {
      [TaskType.GENERATE]: 0.7,  // Creative but controlled
      [TaskType.TEST]: 0.3,       // More deterministic
      [TaskType.OPTIMIZE]: 0.5,   // Balanced
      [TaskType.DEPLOY]: 0.2,     // Very deterministic
      [TaskType.ANALYZE]: 0.4,    // Structured
      [TaskType.SEO]: 0.8         // Creative content
    };
    return tempMap[type] || 0.5;
  }

  // Helper methods for parsing responses
  private detectLanguage(content: string): string {
    if (content.includes('```typescript')) return 'typescript';
    if (content.includes('```javascript')) return 'javascript';
    if (content.includes('```python')) return 'python';
    if (content.includes('```java')) return 'java';
    return 'unknown';
  }

  private detectTestFramework(content: string): string {
    if (content.includes('jest')) return 'jest';
    if (content.includes('mocha')) return 'mocha';
    if (content.includes('pytest')) return 'pytest';
    if (content.includes('junit')) return 'junit';
    return 'unknown';
  }

  private estimateCoverage(content: string): number {
    const testCount = (content.match(/test\(|it\(|describe\(/g) || []).length;
    return Math.min(testCount * 10, 100);
  }

  private extractImprovements(content: string): string[] {
    const improvements = content.match(/- .+/g) || [];
    return improvements.map(i => i.replace('- ', ''));
  }

  private extractMetrics(content: string): any {
    return {
      performance: content.includes('performance') ? 'analyzed' : 'pending',
      security: content.includes('security') ? 'analyzed' : 'pending',
      maintainability: content.includes('maintainability') ? 'analyzed' : 'pending'
    };
  }

  private extractScripts(content: string): string[] {
    const scripts = content.match(/```bash[\s\S]*?```/g) || [];
    return scripts.map(s => s.replace(/```bash\n?/, '').replace(/```$/, ''));
  }

  private extractInfrastructure(content: string): any {
    return {
      docker: content.includes('docker'),
      kubernetes: content.includes('kubernetes'),
      terraform: content.includes('terraform'),
      aws: content.includes('aws'),
      vercel: content.includes('vercel')
    };
  }

  private extractIssues(content: string): string[] {
    const issues = content.match(/Issue: .+/g) || [];
    return issues.map(i => i.replace('Issue: ', ''));
  }

  private extractRecommendations(content: string): string[] {
    const recommendations = content.match(/Recommendation: .+/g) || [];
    return recommendations.map(r => r.replace('Recommendation: ', ''));
  }

  private extractKeywords(content: string): string[] {
    const keywords = content.match(/Keywords?: .+/gi) || [];
    if (keywords.length > 0) {
      return keywords[0].replace(/Keywords?: /i, '').split(',').map(k => k.trim());
    }
    return [];
  }

  private extractMetadata(content: string): any {
    return {
      title: content.match(/Title: (.+)/)?.[1] || '',
      description: content.match(/Description: (.+)/)?.[1] || '',
      canonical: content.match(/Canonical: (.+)/)?.[1] || ''
    };
  }

  /**
   * Get processing statistics
   */
  getStatistics() {
    return {
      ...this.apiClient.getStats(),
      activeProcessing: this.activeProcessing.size,
      processingTasks: Array.from(this.activeProcessing.keys())
    };
  }
}