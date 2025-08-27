/**
 * MCP Management Agent
 * Orchestrates Context7, Sequential Thinking, and Playwright MCPs
 */

import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import * as path from 'path';
import * as fs from 'fs/promises';

// MCP Types
interface MCPConfig {
  name: string;
  description: string;
  command: string;
  args: string[];
  capabilities: string[];
  status: string;
}

interface MCPRegistry {
  playwright: MCPConfig;
  context7: MCPConfig;
  'sequential-thinking': MCPConfig;
}

interface WorkflowStep {
  mcp: string;
  action: string;
  params: Record<string, any>;
}

interface Workflow {
  description: string;
  steps: WorkflowStep[];
}

interface MCPResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
  duration: number;
}

// Main MCP Management Agent Class
export class MCPManagementAgent extends EventEmitter {
  private mcpRegistry: MCPRegistry;
  private processes: Map<string, ChildProcess>;
  private configPath: string;
  private initialized: boolean = false;

  constructor(configPath: string = 'mcp-complete-config.json') {
    super();
    this.configPath = configPath;
    this.processes = new Map();
  }

  /**
   * Initialize the MCP Management Agent
   */
  async initialize(): Promise<void> {
    try {
      // Load configuration
      const configContent = await fs.readFile(this.configPath, 'utf-8');
      const config = JSON.parse(configContent);
      this.mcpRegistry = config.mcpServers;

      // Verify MCP installations
      await this.verifyInstallations();

      // Start health monitoring
      this.startHealthMonitoring();

      this.initialized = true;
      this.emit('initialized', { timestamp: new Date() });
      
      console.log('✅ MCP Management Agent initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize MCP Management Agent:', error);
      throw error;
    }
  }

  /**
   * Verify all MCPs are properly installed
   */
  private async verifyInstallations(): Promise<void> {
    const verifications = [];

    // Verify Playwright
    verifications.push(this.verifyMCP('playwright', 'npx @playwright/mcp@latest --version'));

    // Verify Context7
    verifications.push(this.verifyMCP('context7', 'D:\\Disaster Recovery\\context7\\dist\\index.js'));

    // Verify Sequential Thinking
    verifications.push(this.verifyMCP('sequential-thinking', 'D:\\Disaster Recovery\\WSL-Deployment-Sequential-Thinking\\dist\\cli.js'));

    await Promise.all(verifications);
  }

  /**
   * Verify individual MCP installation
   */
  private async verifyMCP(name: string, path: string): Promise<boolean> {
    try {
      if (name === 'playwright') {
        // Special handling for npm package
        return true; // Assume installed via npm
      } else {
        // Check if file exists
        await fs.access(path);
        console.log(`✅ ${name} MCP verified at ${path}`);
        return true;
      }
    } catch (error) {
      console.warn(`⚠️ ${name} MCP not found at ${path}`);
      return false;
    }
  }

  /**
   * Execute a command on a specific MCP
   */
  async executeMCP(mcpName: string, action: string, params?: any): Promise<MCPResponse> {
    const startTime = Date.now();
    
    try {
      if (!this.initialized) {
        throw new Error('MCP Management Agent not initialized');
      }

      const mcp = this.mcpRegistry[mcpName];
      if (!mcp) {
        throw new Error(`MCP ${mcpName} not found in registry`);
      }

      console.log(`🚀 Executing ${mcpName}.${action}...`);
      
      // Route to appropriate MCP handler
      let result;
      switch (mcpName) {
        case 'playwright':
          result = await this.executePlaywright(action, params);
          break;
        case 'context7':
          result = await this.executeContext7(action, params);
          break;
        case 'sequential-thinking':
          result = await this.executeSequentialThinking(action, params);
          break;
        default:
          throw new Error(`Unknown MCP: ${mcpName}`);
      }

      const duration = Date.now() - startTime;
      
      return {
        success: true,
        data: result,
        timestamp: new Date(),
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date(),
        duration
      };
    }
  }

  /**
   * Execute Playwright MCP commands
   */
  private async executePlaywright(action: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const args = ['@playwright/mcp@latest', action];
      
      // Add parameters
      if (params) {
        if (params.url) args.push(params.url);
        if (params.viewport) args.push(`--viewport-size=${params.viewport.join(',')}`);
        if (params.headless) args.push('--headless');
      }

      const process = spawn('npx', args, {
        shell: true,
        cwd: process.cwd()
      });

      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
        this.emit('mcp-output', { mcp: 'playwright', data: data.toString() });
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(errorOutput || `Process exited with code ${code}`));
        }
      });

      // Store process reference
      this.processes.set('playwright', process);
    });
  }

  /**
   * Execute Context7 MCP commands
   */
  private async executeContext7(action: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptPath = 'D:\\Disaster Recovery\\context7\\dist\\index.js';
      const args = [scriptPath, action];
      
      // Add parameters as JSON
      if (params) {
        args.push(JSON.stringify(params));
      }

      const process = spawn('node', args, {
        shell: true,
        cwd: 'D:\\Disaster Recovery\\context7'
      });

      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
        this.emit('mcp-output', { mcp: 'context7', data: data.toString() });
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          try {
            // Try to parse as JSON
            const result = JSON.parse(output);
            resolve(result);
          } catch {
            // Return raw output if not JSON
            resolve(output);
          }
        } else {
          reject(new Error(errorOutput || `Process exited with code ${code}`));
        }
      });

      // Store process reference
      this.processes.set('context7', process);
    });
  }

  /**
   * Execute Sequential Thinking MCP commands
   */
  private async executeSequentialThinking(action: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptPath = 'D:\\Disaster Recovery\\WSL-Deployment-Sequential-Thinking\\dist\\cli.js';
      const args = [scriptPath, action];
      
      // Add parameters
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          args.push(`--${key}=${value}`);
        });
      }

      const process = spawn('node', args, {
        shell: true,
        cwd: 'D:\\Disaster Recovery\\WSL-Deployment-Sequential-Thinking'
      });

      let output = '';
      let errorOutput = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
        this.emit('mcp-output', { mcp: 'sequential-thinking', data: data.toString() });
      });

      process.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(errorOutput || `Process exited with code ${code}`));
        }
      });

      // Store process reference
      this.processes.set('sequential-thinking', process);
    });
  }

  /**
   * Orchestrate a workflow
   */
  async orchestrate(workflowName: string, context?: any): Promise<any> {
    try {
      // Load workflow configuration
      const configContent = await fs.readFile(this.configPath, 'utf-8');
      const config = JSON.parse(configContent);
      const workflow = config.orchestration.workflows[workflowName];

      if (!workflow) {
        throw new Error(`Workflow ${workflowName} not found`);
      }

      console.log(`🎭 Starting orchestration: ${workflowName}`);
      console.log(`📝 ${workflow.description}`);

      const results = [];
      
      // Execute each step
      for (const [index, step] of workflow.steps.entries()) {
        console.log(`\n📍 Step ${index + 1}/${workflow.steps.length}: ${step.mcp}.${step.action}`);
        
        // Replace context variables in params
        const params = this.replaceContextVariables(step.params, context, results);
        
        // Execute step
        const result = await this.executeMCP(step.mcp, step.action, params);
        results.push(result);
        
        if (!result.success) {
          console.error(`❌ Step failed: ${result.error}`);
          throw new Error(`Workflow failed at step ${index + 1}: ${result.error}`);
        }
        
        console.log(`✅ Step completed in ${result.duration}ms`);
      }

      console.log(`\n🎉 Orchestration completed successfully!`);
      return results;
    } catch (error) {
      console.error(`❌ Orchestration failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Replace context variables in parameters
   */
  private replaceContextVariables(params: any, context: any, results: any[]): any {
    if (!params) return params;
    
    const stringified = JSON.stringify(params);
    let replaced = stringified;
    
    // Replace context variables
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        replaced = replaced.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value as string);
      });
    }
    
    // Replace step references
    results.forEach((result, index) => {
      if (result.data) {
        replaced = replaced.replace(
          new RegExp(`\\$\\{steps\\[${index}\\]\\.output\\}`, 'g'),
          JSON.stringify(result.data)
        );
      }
    });
    
    return JSON.parse(replaced);
  }

  /**
   * Get status of all MCPs
   */
  async getStatus(): Promise<Record<string, any>> {
    const status = {};
    
    for (const [name, config] of Object.entries(this.mcpRegistry)) {
      status[name] = {
        name: config.name,
        description: config.description,
        status: config.status,
        capabilities: config.capabilities,
        process: this.processes.has(name) ? 'running' : 'idle'
      };
    }
    
    return status;
  }

  /**
   * Start health monitoring
   */
  private startHealthMonitoring(): void {
    setInterval(async () => {
      const health = await this.checkHealth();
      this.emit('health-check', health);
    }, 60000); // Check every minute
  }

  /**
   * Check health of all MCPs
   */
  private async checkHealth(): Promise<any> {
    const health = {
      timestamp: new Date(),
      status: 'healthy',
      mcps: {}
    };
    
    for (const [name, config] of Object.entries(this.mcpRegistry)) {
      try {
        const startTime = Date.now();
        // Simple ping test
        await this.executeMCP(name, 'ping', {});
        const latency = Date.now() - startTime;
        
        health.mcps[name] = {
          status: 'online',
          latency,
          lastCheck: new Date()
        };
      } catch (error) {
        health.mcps[name] = {
          status: 'offline',
          error: error.message,
          lastCheck: new Date()
        };
        health.status = 'degraded';
      }
    }
    
    return health;
  }

  /**
   * Troubleshoot MCP issues
   */
  async troubleshoot(mcpName: string): Promise<any> {
    console.log(`🔧 Troubleshooting ${mcpName}...`);
    
    const diagnostics = {
      mcp: mcpName,
      timestamp: new Date(),
      checks: []
    };
    
    // Check configuration
    diagnostics.checks.push({
      test: 'configuration',
      passed: !!this.mcpRegistry[mcpName],
      details: this.mcpRegistry[mcpName] || 'Not found in registry'
    });
    
    // Check file existence (for local MCPs)
    if (mcpName !== 'playwright') {
      const path = this.mcpRegistry[mcpName]?.args[0];
      try {
        await fs.access(path);
        diagnostics.checks.push({
          test: 'file_exists',
          passed: true,
          details: `Found at ${path}`
        });
      } catch {
        diagnostics.checks.push({
          test: 'file_exists',
          passed: false,
          details: `Not found at ${path}`
        });
      }
    }
    
    // Check process status
    diagnostics.checks.push({
      test: 'process_status',
      passed: true,
      details: this.processes.has(mcpName) ? 'Process active' : 'No active process'
    });
    
    // Try to execute a simple command
    try {
      await this.executeMCP(mcpName, 'ping', {});
      diagnostics.checks.push({
        test: 'connectivity',
        passed: true,
        details: 'Successfully executed ping'
      });
    } catch (error) {
      diagnostics.checks.push({
        test: 'connectivity',
        passed: false,
        details: error.message
      });
    }
    
    return diagnostics;
  }

  /**
   * Cleanup and shutdown
   */
  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down MCP Management Agent...');
    
    // Kill all processes
    for (const [name, process] of this.processes.entries()) {
      console.log(`Terminating ${name} process...`);
      process.kill();
    }
    
    this.processes.clear();
    this.removeAllListeners();
    
    console.log('✅ MCP Management Agent shut down successfully');
  }
}

// Export singleton instance
export const mcpAgent = new MCPManagementAgent();

// CLI Interface
if (require.main === module) {
  const command = process.argv[2];
  const args = process.argv.slice(3);
  
  (async () => {
    try {
      await mcpAgent.initialize();
      
      switch (command) {
        case 'status':
          const status = await mcpAgent.getStatus();
          console.log(JSON.stringify(status, null, 2));
          break;
          
        case 'execute':
          const [mcp, action, ...params] = args;
          const result = await mcpAgent.executeMCP(mcp, action, params[0] ? JSON.parse(params[0]) : undefined);
          console.log(JSON.stringify(result, null, 2));
          break;
          
        case 'orchestrate':
          const [workflow, ...context] = args;
          const results = await mcpAgent.orchestrate(workflow, context[0] ? JSON.parse(context[0]) : undefined);
          console.log(JSON.stringify(results, null, 2));
          break;
          
        case 'troubleshoot':
          const diagnostics = await mcpAgent.troubleshoot(args[0]);
          console.log(JSON.stringify(diagnostics, null, 2));
          break;
          
        default:
          console.log('Usage: mcp-management-agent <command> [args]');
          console.log('Commands: status, execute, orchestrate, troubleshoot');
      }
      
      await mcpAgent.shutdown();
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
}