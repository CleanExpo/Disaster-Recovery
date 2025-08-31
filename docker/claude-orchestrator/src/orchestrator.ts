/**
 * Claude Code Orchestrator
 * Autonomous multi-agent system for enhanced command generation
 */

import express from 'express';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import Bull from 'bull';
import chalk from 'chalk';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

// Agent types
enum AgentType {
  CODEGEN = 'codegen',
  TESTER = 'tester',
  SEO = 'seo',
  DEVOPS = 'devops',
  ANALYZER = 'analyzer'
}

// Task interface
interface Task {
  id: string;
  type: 'generate' | 'test' | 'optimize' | 'deploy' | 'analyze';
  input: string;
  context: any;
  priority: number;
  requiredAgents: AgentType[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

// Agent interface
interface Agent {
  id: string;
  type: AgentType;
  status: 'idle' | 'busy' | 'error';
  currentTask?: string;
  capabilities: string[];
  performance: {
    tasksCompleted: number;
    avgTime: number;
    successRate: number;
  };
}

class ClaudeOrchestrator {
  private app: express.Application;
  private io: Server;
  private redis: Redis;
  private taskQueue: Bull.Queue;
  private agents: Map<string, Agent> = new Map();
  private activeTasks: Map<string, Task> = new Map();

  constructor() {
    this.app = express();
    this.redis = new Redis({
      host: 'redis',
      port: 6379
    });
    
    this.taskQueue = new Bull('claude-tasks', {
      redis: {
        host: 'redis',
        port: 6379
      }
    });

    this.setupExpress();
    this.setupSocketIO();
    this.setupTaskProcessing();
    this.initializeAgents();
  }

  private setupExpress() {
    this.app.use(express.json());
    
    // Health check endpoint
    this.app.get('/health', async (req, res) => {
      try {
        const jobCounts = await this.taskQueue.getJobCounts();
        res.json({
          status: 'healthy',
          agents: Array.from(this.agents.values()),
          activeTasks: this.activeTasks.size,
          queueSize: jobCounts
        });
      } catch (error) {
        res.status(500).json({
          status: 'error',
          error: error.message
        });
      }
    });

    // Submit task endpoint
    this.app.post('/task', async (req, res) => {
      const { type, input, context, priority = 5 } = req.body;
      
      const task: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        input,
        context,
        priority,
        requiredAgents: this.determineRequiredAgents(type, input),
        status: 'pending'
      };

      await this.taskQueue.add(task, {
        priority,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });

      res.json({ taskId: task.id, status: 'queued' });
    });

    // Get task status
    this.app.get('/task/:id', (req, res) => {
      const task = this.activeTasks.get(req.params.id);
      if (!task) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.json(task);
      }
    });
  }

  private setupSocketIO() {
    const server = this.app.listen(3000, () => {
      console.log(chalk.green('🚀 Claude Orchestrator running on port 3000'));
    });

    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', (socket) => {
      console.log(chalk.blue(`📡 Client connected: ${socket.id}`));
      
      // Send current state
      socket.emit('state', {
        agents: Array.from(this.agents.values()),
        tasks: Array.from(this.activeTasks.values())
      });

      // Handle agent registration
      socket.on('agent:register', (agentData) => {
        this.registerAgent(agentData);
        socket.emit('agent:registered', { id: agentData.id });
      });

      // Handle agent status updates
      socket.on('agent:status', (data) => {
        const agent = this.agents.get(data.id);
        if (agent) {
          agent.status = data.status;
          this.io.emit('agent:updated', agent);
        }
      });

      socket.on('disconnect', () => {
        console.log(chalk.yellow(`📡 Client disconnected: ${socket.id}`));
      });
    });
  }

  private setupTaskProcessing() {
    this.taskQueue.process(5, async (job) => {
      const task = job.data as Task;
      console.log(chalk.cyan(`📋 Processing task: ${task.id}`));
      
      this.activeTasks.set(task.id, { ...task, status: 'processing' });
      this.io.emit('task:started', task);

      try {
        // Determine optimal agent assignment
        const assignments = await this.assignAgentsToTask(task);
        
        // Execute task with assigned agents
        const results = await this.executeTask(task, assignments);
        
        // Aggregate results
        const finalResult = await this.aggregateResults(results);
        
        task.result = finalResult;
        task.status = 'completed';
        
        this.io.emit('task:completed', task);
        
        return finalResult;
      } catch (error) {
        task.error = error.message;
        task.status = 'failed';
        this.io.emit('task:failed', task);
        throw error;
      } finally {
        this.activeTasks.set(task.id, task);
      }
    });
  }

  private async initializeAgents() {
    // Initialize default agents
    const agentTypes = [
      AgentType.CODEGEN,
      AgentType.TESTER,
      AgentType.SEO,
      AgentType.DEVOPS,
      AgentType.ANALYZER
    ];

    for (const type of agentTypes) {
      const agent: Agent = {
        id: `agent-${type}-${Date.now()}`,
        type,
        status: 'idle',
        capabilities: this.getAgentCapabilities(type),
        performance: {
          tasksCompleted: 0,
          avgTime: 0,
          successRate: 100
        }
      };
      
      this.agents.set(agent.id, agent);
      console.log(chalk.green(`✅ Initialized agent: ${agent.id}`));
    }
  }

  private getAgentCapabilities(type: AgentType): string[] {
    const capabilities = {
      [AgentType.CODEGEN]: ['typescript', 'react', 'nextjs', 'python', 'api'],
      [AgentType.TESTER]: ['unit', 'integration', 'e2e', 'playwright', 'jest'],
      [AgentType.SEO]: ['content', 'keywords', 'schema', 'performance', 'australian-market'],
      [AgentType.DEVOPS]: ['docker', 'kubernetes', 'ci/cd', 'vercel', 'github'],
      [AgentType.ANALYZER]: ['code-review', 'security', 'performance', 'best-practices']
    };
    
    return capabilities[type] || [];
  }

  private determineRequiredAgents(type: string, input: string): AgentType[] {
    // Intelligent agent selection based on task type and content
    const agents: AgentType[] = [];
    
    if (type === 'generate' || input.includes('create') || input.includes('build')) {
      agents.push(AgentType.CODEGEN);
    }
    
    if (input.includes('test') || input.includes('validate')) {
      agents.push(AgentType.TESTER);
    }
    
    if (input.includes('seo') || input.includes('content') || input.includes('australia')) {
      agents.push(AgentType.SEO);
    }
    
    if (input.includes('deploy') || input.includes('docker') || input.includes('vercel')) {
      agents.push(AgentType.DEVOPS);
    }
    
    if (input.includes('review') || input.includes('analyze') || input.includes('optimize')) {
      agents.push(AgentType.ANALYZER);
    }
    
    // Default to codegen if no specific requirements
    if (agents.length === 0) {
      agents.push(AgentType.CODEGEN);
    }
    
    return agents;
  }

  private async assignAgentsToTask(task: Task): Promise<Map<AgentType, Agent>> {
    const assignments = new Map<AgentType, Agent>();
    
    for (const requiredType of task.requiredAgents) {
      // Find available agent of required type
      const availableAgent = Array.from(this.agents.values()).find(
        agent => agent.type === requiredType && agent.status === 'idle'
      );
      
      if (availableAgent) {
        availableAgent.status = 'busy';
        availableAgent.currentTask = task.id;
        assignments.set(requiredType, availableAgent);
        
        console.log(chalk.magenta(`🤖 Assigned ${availableAgent.id} to task ${task.id}`));
      } else {
        console.log(chalk.yellow(`⚠️ No available agent of type ${requiredType}`));
      }
    }
    
    return assignments;
  }

  private async executeTask(task: Task, assignments: Map<AgentType, Agent>): Promise<any[]> {
    const results = [];
    
    // Execute task with each assigned agent
    for (const [type, agent] of assignments) {
      console.log(chalk.blue(`🔧 Agent ${agent.id} executing task ${task.id}`));
      
      // Simulate agent execution (in real implementation, this would call actual Claude API)
      const result = await this.simulateAgentExecution(agent, task);
      results.push({
        agentId: agent.id,
        agentType: type,
        result
      });
      
      // Update agent status
      agent.status = 'idle';
      agent.currentTask = undefined;
      agent.performance.tasksCompleted++;
    }
    
    return results;
  }

  private async simulateAgentExecution(agent: Agent, task: Task): Promise<any> {
    // This is where you'd integrate with actual Claude API
    // For now, returning simulated results
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
    
    return {
      success: true,
      output: `Agent ${agent.id} completed task ${task.id}`,
      generatedCode: agent.type === AgentType.CODEGEN ? '// Generated code here' : null,
      testResults: agent.type === AgentType.TESTER ? { passed: 10, failed: 0 } : null,
      seoScore: agent.type === AgentType.SEO ? 95 : null,
      deploymentUrl: agent.type === AgentType.DEVOPS ? 'https://deployed-app.vercel.app' : null
    };
  }

  private async aggregateResults(results: any[]): Promise<any> {
    // Combine results from multiple agents
    return {
      timestamp: new Date().toISOString(),
      results,
      summary: 'Task completed successfully by multiple agents',
      combinedOutput: results.map(r => r.result.output).join('\n')
    };
  }

  private registerAgent(agentData: any) {
    const agent: Agent = {
      id: agentData.id || `agent-${Date.now()}`,
      type: agentData.type,
      status: 'idle',
      capabilities: agentData.capabilities || [],
      performance: {
        tasksCompleted: 0,
        avgTime: 0,
        successRate: 100
      }
    };
    
    this.agents.set(agent.id, agent);
    console.log(chalk.green(`✅ Registered new agent: ${agent.id}`));
  }

  public async start() {
    console.log(chalk.cyan('🚀 Starting Claude Orchestrator System...'));
    console.log(chalk.yellow('📊 Dashboard available at http://localhost:3000'));
    console.log(chalk.green('🤖 Agents initialized and ready'));
  }
}

// Start the orchestrator
const orchestrator = new ClaudeOrchestrator();
orchestrator.start();