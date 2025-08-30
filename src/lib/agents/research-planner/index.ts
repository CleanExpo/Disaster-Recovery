import { EventEmitter } from 'events';
import { ShadcnExpertAgent } from './shadcn-expert';
import { UIDesignerAgent } from './ui-designer';
import { BrowserAutomationAgent } from './browser-automation';
import { DocumentationAgent } from './documentation';
import { CodeAnalysisAgent } from './code-analysis';
import type { ResearchTask, ResearchResult, AgentCapability } from './types';

export class ResearchPlannerAgent extends EventEmitter {
  private agents: Map<string, any>;
  private capabilities: Map<string, AgentCapability>;
  private taskQueue: ResearchTask[] = [];
  private isProcessing = false;

  constructor() {
    super();
    this.agents = new Map();
    this.capabilities = new Map();
    this.initializeAgents();
  }

  private initializeAgents() {
    // Initialize specialized sub-agents
    this.registerAgent('shadcn-expert', new ShadcnExpertAgent());
    this.registerAgent('ui-designer', new UIDesignerAgent());
    this.registerAgent('browser-automation', new BrowserAutomationAgent());
    this.registerAgent('documentation', new DocumentationAgent());
    this.registerAgent('code-analysis', new CodeAnalysisAgent());

    // Define agent capabilities
    this.capabilities.set('shadcn-expert', {
      name: 'ShadCN/UI Expert',
      description: 'Specializes in shadcn/ui component patterns and implementation',
      skills: [
        'component-selection',
        'theme-customization',
        'accessibility-compliance',
        'responsive-design',
        'animation-patterns'
      ],
      confidence: 0.95
    });

    this.capabilities.set('ui-designer', {
      name: 'UI Designer',
      description: 'Creates and optimizes user interface designs',
      skills: [
        'layout-design',
        'color-theory',
        'typography',
        'user-experience',
        'design-systems'
      ],
      confidence: 0.92
    });

    this.capabilities.set('browser-automation', {
      name: 'Browser Automation',
      description: 'Handles browser testing and automation via Browserbase MCP',
      skills: [
        'web-scraping',
        'ui-testing',
        'performance-monitoring',
        'cross-browser-testing',
        'screenshot-capture'
      ],
      confidence: 0.90
    });

    this.capabilities.set('documentation', {
      name: 'Documentation Specialist',
      description: 'Retrieves and analyzes documentation from multiple sources',
      skills: [
        'api-documentation',
        'code-examples',
        'best-practices',
        'migration-guides',
        'troubleshooting'
      ],
      confidence: 0.88
    });

    this.capabilities.set('code-analysis', {
      name: 'Code Analysis',
      description: 'Analyzes codebase structure and patterns',
      skills: [
        'dependency-analysis',
        'pattern-recognition',
        'performance-analysis',
        'security-scanning',
        'refactoring-suggestions'
      ],
      confidence: 0.91
    });
  }

  private registerAgent(name: string, agent: any) {
    this.agents.set(name, agent);
    agent.on('progress', (data: any) => {
      this.emit('agent-progress', { agent: name, ...data });
    });
  }

  public async planResearch(task: ResearchTask): Promise<ResearchResult> {
    this.emit('planning-started', task);

    // Analyze task to determine required agents
    const requiredAgents = this.determineRequiredAgents(task);
    
    // Create execution plan
    const executionPlan = this.createExecutionPlan(task, requiredAgents);
    
    // Execute plan with appropriate agents
    const results = await this.executeResearchPlan(executionPlan);
    
    // Synthesize results
    const synthesizedResult = this.synthesizeResults(results);
    
    this.emit('planning-completed', synthesizedResult);
    return synthesizedResult;
  }

  private determineRequiredAgents(task: ResearchTask): string[] {
    const requiredAgents: string[] = [];
    const taskDescription = task.description.toLowerCase();
    const taskType = task.type;

    // Determine agents based on task content
    if (taskDescription.includes('shadcn') || 
        taskDescription.includes('component') || 
        taskDescription.includes('ui library')) {
      requiredAgents.push('shadcn-expert');
    }

    if (taskDescription.includes('design') || 
        taskDescription.includes('layout') || 
        taskDescription.includes('user interface') ||
        taskDescription.includes('ux')) {
      requiredAgents.push('ui-designer');
    }

    if (taskDescription.includes('test') || 
        taskDescription.includes('browser') || 
        taskDescription.includes('automation') ||
        taskDescription.includes('scrape')) {
      requiredAgents.push('browser-automation');
    }

    if (taskDescription.includes('documentation') || 
        taskDescription.includes('api') || 
        taskDescription.includes('guide') ||
        taskType === 'documentation') {
      requiredAgents.push('documentation');
    }

    if (taskDescription.includes('analyze') || 
        taskDescription.includes('codebase') || 
        taskDescription.includes('refactor') ||
        taskType === 'analysis') {
      requiredAgents.push('code-analysis');
    }

    // Default to documentation and code analysis if no specific agents identified
    if (requiredAgents.length === 0) {
      requiredAgents.push('documentation', 'code-analysis');
    }

    return requiredAgents;
  }

  private createExecutionPlan(task: ResearchTask, agentNames: string[]): any {
    const plan = {
      task,
      steps: [] as any[],
      parallel: task.parallel !== false,
      timeout: task.timeout || 30000
    };

    // Create execution steps for each agent
    for (const agentName of agentNames) {
      const agent = this.agents.get(agentName);
      const capability = this.capabilities.get(agentName);

      if (agent && capability) {
        plan.steps.push({
          agentName,
          agent,
          capability,
          priority: this.calculatePriority(task, capability),
          dependencies: this.identifyDependencies(agentName, agentNames)
        });
      }
    }

    // Sort steps by priority and dependencies
    plan.steps.sort((a, b) => {
      if (a.dependencies.includes(b.agentName)) return 1;
      if (b.dependencies.includes(a.agentName)) return -1;
      return b.priority - a.priority;
    });

    return plan;
  }

  private calculatePriority(task: ResearchTask, capability: AgentCapability): number {
    let priority = capability.confidence * 100;

    // Boost priority for specific task types
    if (task.priority === 'high') {
      priority *= 1.5;
    } else if (task.priority === 'low') {
      priority *= 0.7;
    }

    // Boost priority for matching skills
    const taskKeywords = task.description.toLowerCase().split(' ');
    const matchingSkills = capability.skills.filter(skill => 
      taskKeywords.some(keyword => skill.includes(keyword))
    );
    priority += matchingSkills.length * 10;

    return priority;
  }

  private identifyDependencies(agentName: string, allAgents: string[]): string[] {
    const dependencies: string[] = [];

    // Documentation agent typically runs first
    if (agentName !== 'documentation' && allAgents.includes('documentation')) {
      dependencies.push('documentation');
    }

    // Code analysis provides context for other agents
    if (agentName !== 'code-analysis' && 
        agentName !== 'documentation' && 
        allAgents.includes('code-analysis')) {
      dependencies.push('code-analysis');
    }

    // UI designer depends on shadcn expert for component knowledge
    if (agentName === 'ui-designer' && allAgents.includes('shadcn-expert')) {
      dependencies.push('shadcn-expert');
    }

    // Browser automation typically runs last
    if (agentName === 'browser-automation') {
      allAgents.forEach(agent => {
        if (agent !== 'browser-automation' && !dependencies.includes(agent)) {
          dependencies.push(agent);
        }
      });
    }

    return dependencies;
  }

  private async executeResearchPlan(plan: any): Promise<any[]> {
    const results: any[] = [];
    const executedAgents = new Set<string>();

    for (const step of plan.steps) {
      // Wait for dependencies
      await this.waitForDependencies(step.dependencies, executedAgents);

      // Execute agent task
      this.emit('agent-executing', {
        agent: step.agentName,
        task: plan.task
      });

      try {
        const result = await step.agent.execute(plan.task);
        results.push({
          agent: step.agentName,
          capability: step.capability,
          result,
          success: true
        });
      } catch (error) {
        results.push({
          agent: step.agentName,
          capability: step.capability,
          error: error instanceof Error ? error.message : String(error),
          success: false
        });
      }

      executedAgents.add(step.agentName);

      this.emit('agent-completed', {
        agent: step.agentName,
        success: results[results.length - 1].success
      });
    }

    return results;
  }

  private async waitForDependencies(
    dependencies: string[], 
    executedAgents: Set<string>
  ): Promise<void> {
    for (const dep of dependencies) {
      while (!executedAgents.has(dep)) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }

  private synthesizeResults(results: any[]): ResearchResult {
    const successfulResults = results.filter(r => r.success);
    const failedResults = results.filter(r => !r.success);

    const synthesis: ResearchResult = {
      success: successfulResults.length > 0,
      summary: this.generateSummary(successfulResults),
      details: {},
      recommendations: [],
      confidence: this.calculateOverallConfidence(results),
      metadata: {
        totalAgents: results.length,
        successfulAgents: successfulResults.length,
        failedAgents: failedResults.length,
        timestamp: new Date().toISOString()
      }
    };

    // Aggregate details from all agents
    for (const result of successfulResults) {
      synthesis.details[result.agent] = result.result;
      
      // Extract recommendations if available
      if (result.result.recommendations) {
        synthesis.recommendations.push(...result.result.recommendations);
      }
    }

    // Add error information
    if (failedResults.length > 0) {
      synthesis.errors = failedResults.map(r => ({
        agent: r.agent,
        error: r.error
      }));
    }

    return synthesis;
  }

  private generateSummary(results: any[]): string {
    const summaries: string[] = [];

    for (const result of results) {
      if (result.result.summary) {
        summaries.push(`${result.capability.name}: ${result.result.summary}`);
      }
    }

    return summaries.join('\n\n');
  }

  private calculateOverallConfidence(results: any[]): number {
    if (results.length === 0) return 0;

    const successfulResults = results.filter(r => r.success);
    const totalConfidence = successfulResults.reduce(
      (sum, r) => sum + (r.capability.confidence * (r.result.confidence || 1)),
      0
    );

    return totalConfidence / results.length;
  }

  public async queueTask(task: ResearchTask): Promise<void> {
    this.taskQueue.push(task);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    this.isProcessing = true;

    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      if (task) {
        await this.planResearch(task);
      }
    }

    this.isProcessing = false;
  }

  public getCapabilities(): AgentCapability[] {
    return Array.from(this.capabilities.values());
  }

  public getAgentStatus(): Map<string, boolean> {
    const status = new Map<string, boolean>();
    
    for (const [name, agent] of this.agents) {
      status.set(name, agent.isReady ? agent.isReady() : true);
    }
    
    return status;
  }
}

export * from './types';
export { ShadcnExpertAgent } from './shadcn-expert';
export { UIDesignerAgent } from './ui-designer';
export { BrowserAutomationAgent } from './browser-automation';
export { DocumentationAgent } from './documentation';
export { CodeAnalysisAgent } from './code-analysis';