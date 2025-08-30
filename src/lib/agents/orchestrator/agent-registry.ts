interface Agent {
  name: string;
  capabilities: string[];
  execute: (task: any) => Promise<any>;
  isReady?: () => boolean;
}

interface AgentMetrics {
  tasksProcessed: number;
  successRate: number;
  avgResponseTime: number;
  lastActive: Date;
  errors: number;
}

export class AgentRegistry {
  private agents: Map<string, Agent>;
  private metrics: Map<string, AgentMetrics>;
  private capabilities: Map<string, string[]>; // capability -> agents

  constructor() {
    this.agents = new Map();
    this.metrics = new Map();
    this.capabilities = new Map();
  }

  public register(name: string, agent: Agent): void {
    this.agents.set(name, agent);
    
    // Initialize metrics
    this.metrics.set(name, {
      tasksProcessed: 0,
      successRate: 100,
      avgResponseTime: 0,
      lastActive: new Date(),
      errors: 0
    });
    
    // Index capabilities
    if (agent.capabilities) {
      for (const capability of agent.capabilities) {
        const agents = this.capabilities.get(capability) || [];
        agents.push(name);
        this.capabilities.set(capability, agents);
      }
    }
  }

  public unregister(name: string): boolean {
    const agent = this.agents.get(name);
    
    if (agent) {
      // Remove from capabilities index
      if (agent.capabilities) {
        for (const capability of agent.capabilities) {
          const agents = this.capabilities.get(capability);
          if (agents) {
            const index = agents.indexOf(name);
            if (index > -1) {
              agents.splice(index, 1);
            }
          }
        }
      }
      
      this.agents.delete(name);
      this.metrics.delete(name);
      return true;
    }
    
    return false;
  }

  public get(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  public getByCapability(capability: string): Agent[] {
    const agentNames = this.capabilities.get(capability) || [];
    const agents: Agent[] = [];
    
    for (const name of agentNames) {
      const agent = this.agents.get(name);
      if (agent) {
        agents.push(agent);
      }
    }
    
    return agents;
  }

  public async restart(name: string): Promise<void> {
    const agent = this.agents.get(name);
    
    if (agent) {
      // Simulate agent restart
      // In production, this would properly restart the agent
      this.metrics.set(name, {
        tasksProcessed: 0,
        successRate: 100,
        avgResponseTime: 0,
        lastActive: new Date(),
        errors: 0
      });
    } else {
      throw new Error(`Agent ${name} not found`);
    }
  }

  public updateMetrics(name: string, success: boolean, responseTime: number): void {
    const metrics = this.metrics.get(name);
    
    if (metrics) {
      metrics.tasksProcessed++;
      metrics.lastActive = new Date();
      
      if (!success) {
        metrics.errors++;
      }
      
      // Update success rate
      const successCount = metrics.tasksProcessed - metrics.errors;
      metrics.successRate = (successCount / metrics.tasksProcessed) * 100;
      
      // Update average response time
      const prevAvg = metrics.avgResponseTime;
      const prevCount = metrics.tasksProcessed - 1;
      metrics.avgResponseTime = (prevAvg * prevCount + responseTime) / metrics.tasksProcessed;
    }
  }

  public getStatus(): Map<string, boolean> {
    const status = new Map<string, boolean>();
    
    for (const [name, agent] of this.agents) {
      const isReady = agent.isReady ? agent.isReady() : true;
      const metrics = this.metrics.get(name);
      const isHealthy = metrics ? metrics.successRate > 80 : true;
      
      status.set(name, isReady && isHealthy);
    }
    
    return status;
  }

  public getMetrics(): Map<string, AgentMetrics> {
    return new Map(this.metrics);
  }

  public getAllAgents(): string[] {
    return Array.from(this.agents.keys());
  }

  public getAllCapabilities(): string[] {
    return Array.from(this.capabilities.keys());
  }

  public findBestAgent(capability: string): string | null {
    const agents = this.getByCapability(capability);
    
    if (agents.length === 0) {
      return null;
    }
    
    // Find agent with best metrics
    let bestAgent = agents[0];
    let bestScore = 0;
    
    for (const agent of agents) {
      const name = this.getAgentName(agent);
      const metrics = this.metrics.get(name);
      
      if (metrics) {
        // Calculate score based on success rate and response time
        const score = metrics.successRate - (metrics.avgResponseTime / 1000);
        
        if (score > bestScore) {
          bestScore = score;
          bestAgent = agent;
        }
      }
    }
    
    return this.getAgentName(bestAgent);
  }

  private getAgentName(agent: Agent): string {
    for (const [name, a] of this.agents) {
      if (a === agent) {
        return name;
      }
    }
    return 'unknown';
  }

  public getHealthReport(): any {
    const report = {
      totalAgents: this.agents.size,
      healthyAgents: 0,
      degradedAgents: 0,
      failedAgents: 0,
      agents: [] as any[]
    };
    
    for (const [name, metrics] of this.metrics) {
      const agent = this.agents.get(name);
      const isReady = agent && agent.isReady ? agent.isReady() : true;
      
      let status = 'healthy';
      if (!isReady || metrics.errors > 10) {
        status = 'failed';
        report.failedAgents++;
      } else if (metrics.successRate < 90 || metrics.avgResponseTime > 5000) {
        status = 'degraded';
        report.degradedAgents++;
      } else {
        report.healthyAgents++;
      }
      
      report.agents.push({
        name,
        status,
        metrics
      });
    }
    
    return report;
  }
}

export default AgentRegistry;