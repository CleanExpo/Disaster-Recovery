import { EventEmitter } from 'events';
import { execSync } from 'child_process';
import axios from 'axios';
import { clientLogger } from '@/lib/observability/client-logger';

interface DeploymentStatus {
  id: string;
  state: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  url?: string;
  error?: string;
  createdAt: Date;
  buildLogs?: string[];
}

interface BuildError {
  type: 'dependency' | 'syntax' | 'type' | 'runtime' | 'config';
  message: string;
  file?: string;
  line?: number;
  suggestion?: string;
  autoFixable: boolean;
}

export class DeploymentMonitorAgent extends EventEmitter {
  private vercelToken: string | undefined;
  private projectId: string | undefined;
  private checkInterval: number = 30000; // 30 seconds
  private isMonitoring: boolean = false;
  private lastDeploymentId: string | null = null;
  private errorPatterns: Map<RegExp, BuildError>;

  constructor() {
    super();
    this.vercelToken = process.env.VERCEL_TOKEN;
    this.projectId = process.env.VERCEL_PROJECT_ID;
    this.errorPatterns = new Map();
    this.initializeErrorPatterns();
  }

  private initializeErrorPatterns() {
    // Common build error patterns
    this.errorPatterns.set(
      /Cannot find module '(.+)'/,
      {
        type: 'dependency',
        message: 'Missing module',
        autoFixable: true,
        suggestion: 'Install missing dependency'
      } as BuildError
    );

    this.errorPatterns.set(
      /Module not found: Can't resolve '(.+)'/,
      {
        type: 'dependency',
        message: 'Module resolution failed',
        autoFixable: true,
        suggestion: 'Check import paths and install dependencies'
      } as BuildError
    );

    this.errorPatterns.set(
      /Type error: (.+)/,
      {
        type: 'type',
        message: 'TypeScript type error',
        autoFixable: false,
        suggestion: 'Fix type definitions'
      } as BuildError
    );

    this.errorPatterns.set(
      /SyntaxError: (.+)/,
      {
        type: 'syntax',
        message: 'Syntax error',
        autoFixable: false,
        suggestion: 'Fix syntax in source file'
      } as BuildError
    );

    this.errorPatterns.set(
      /Error: Cannot find module 'sharp'/,
      {
        type: 'dependency',
        message: 'Sharp module issue',
        autoFixable: true,
        suggestion: 'Remove sharp dependency or use alternative'
      } as BuildError
    );

    this.errorPatterns.set(
      /ENOENT: no such file or directory/,
      {
        type: 'config',
        message: 'File not found',
        autoFixable: true,
        suggestion: 'Create missing file or update path'
      } as BuildError
    );

    this.errorPatterns.set(
      /out of memory/i,
      {
        type: 'runtime',
        message: 'Memory limit exceeded',
        autoFixable: true,
        suggestion: 'Increase NODE_OPTIONS memory limit'
      } as BuildError
    );
  }

  public async startMonitoring() {
    if (this.isMonitoring) {
      clientLogger.info('🔍 Already monitoring deployments', { source: 'deployment-monitor/index' });
      return;
    }

    this.isMonitoring = true;
    clientLogger.info('🚀 Deployment Monitor Agent Started', { source: 'deployment-monitor/index' });
    
    // Initial check
    await this.checkDeployment();
    
    // Set up interval
    const interval = setInterval(async () => {
      if (!this.isMonitoring) {
        clearInterval(interval);
        return;
      }
      await this.checkDeployment();
    }, this.checkInterval);

    this.emit('monitoring-started');
  }

  public stopMonitoring() {
    this.isMonitoring = false;
    this.emit('monitoring-stopped');
    clientLogger.info('🛑 Deployment monitoring stopped', { source: 'deployment-monitor/index' });
  }

  private async checkDeployment() {
    try {
      // Check using Vercel CLI
      const deployment = await this.getLatestDeployment();
      
      if (!deployment) {
        clientLogger.info('📭 No deployments found', { source: 'deployment-monitor/index' });
        return;
      }

      // Check if this is a new deployment
      if (deployment.id !== this.lastDeploymentId) {
        this.lastDeploymentId = deployment.id;
        clientLogger.info(`\n🔄 New deployment detected: ${deployment.id}`, { source: 'deployment-monitor/index' });
        this.emit('new-deployment', deployment);
      }

      // Analyze deployment status
      await this.analyzeDeployment(deployment);
      
    } catch (error) {
      clientLogger.error('❌ Error checking deployment:', { source: 'deployment-monitor/index' }, error);
      this.emit('error', error);
    }
  }

  private async getLatestDeployment(): Promise<DeploymentStatus | null> {
    try {
      // Try to get deployment info using Vercel CLI
      const output = execSync('vercel ls --json 2>&1', { 
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      const deployments = JSON.parse(output);
      if (deployments && deployments.length > 0) {
        const latest = deployments[0];
        return {
          id: latest.uid,
          state: latest.state,
          url: latest.url,
          createdAt: new Date(latest.created)
        };
      }
    } catch (error) {
      // Fallback: Check git for recent commits
      return this.getDeploymentFromGit();
    }
    
    return null;
  }

  private async getDeploymentFromGit(): Promise<DeploymentStatus | null> {
    try {
      const lastCommit = execSync('git log -1 --format=%H', { encoding: 'utf8' }).trim();
      const commitTime = execSync('git log -1 --format=%at', { encoding: 'utf8' }).trim();
      
      return {
        id: lastCommit.substring(0, 7),
        state: 'BUILDING',
        createdAt: new Date(parseInt(commitTime) * 1000)
      };
    } catch (error) {
      return null;
    }
  }

  private async analyzeDeployment(deployment: DeploymentStatus) {
    clientLogger.info(`📊 Analyzing deployment ${deployment.id}`, { source: 'deployment-monitor/index' });
    clientLogger.info(`   State: ${deployment.state}`, { source: 'deployment-monitor/index' });
    
    switch (deployment.state) {
      case 'BUILDING':
        clientLogger.info('   🔨 Build in progress...', { source: 'deployment-monitor/index' });
        this.emit('building', deployment);
        break;
        
      case 'READY':
        clientLogger.info('   ✅ Deployment successful!', { source: 'deployment-monitor/index' });
        if (deployment.url) {
          clientLogger.info(`   🌐 URL: https://${deployment.url}`, { source: 'deployment-monitor/index' });
        }
        this.emit('success', deployment);
        break;
        
      case 'ERROR':
        clientLogger.info('   ❌ Deployment failed!', { source: 'deployment-monitor/index' });
        await this.handleBuildError(deployment);
        break;
        
      case 'CANCELED':
        clientLogger.info('   ⚠️ Deployment canceled', { source: 'deployment-monitor/index' });
        this.emit('canceled', deployment);
        break;
    }
  }

  private async handleBuildError(deployment: DeploymentStatus) {
    clientLogger.info('\n🔍 Analyzing build errors...', { source: 'deployment-monitor/index' });
    
    // Get build logs
    const logs = await this.getBuildLogs(deployment.id);
    
    if (!logs) {
      clientLogger.info('   Unable to retrieve build logs', { source: 'deployment-monitor/index' });
      return;
    }
    
    // Analyze errors
    const errors = this.parseErrors(logs);
    
    if (errors.length === 0) {
      clientLogger.info('   No specific errors identified', { source: 'deployment-monitor/index' });
      return;
    }
    
    clientLogger.info(`\n📋 Found ${errors.length} error(s):`, { source: 'deployment-monitor/index' });
    
    for (const error of errors) {
      clientLogger.info(`\n   Type: ${error.type}`, { source: 'deployment-monitor/index' });
      clientLogger.info(`   Message: ${error.message}`, { source: 'deployment-monitor/index' });
      if (error.file) clientLogger.info(`   File: ${error.file}`, { source: 'deployment-monitor/index' });
      if (error.suggestion) clientLogger.info(`   💡 Suggestion: ${error.suggestion}`, { source: 'deployment-monitor/index' });
      
      if (error.autoFixable) {
        clientLogger.info('   🔧 Attempting auto-fix...', { source: 'deployment-monitor/index' });
        await this.attemptAutoFix(error);
      }
    }
    
    this.emit('errors-found', errors);
    
    // Cancel the failed deployment if possible
    if (this.vercelToken && deployment.state === 'ERROR') {
      await this.cancelDeployment(deployment.id);
    }
  }

  private async getBuildLogs(deploymentId: string): Promise<string | null> {
    try {
      // Try to get logs using Vercel CLI
      const logs = execSync(`vercel logs ${deploymentId} 2>&1`, {
        encoding: 'utf8',
        cwd: process.cwd()
      });
      return logs;
    } catch (error) {
      // Fallback: Check local build output
      try {
        const buildOutput = execSync('npm run build 2>&1', {
          encoding: 'utf8',
          cwd: process.cwd()
        });
        return buildOutput;
      } catch (buildError: any) {
        return buildError.stdout || buildError.message;
      }
    }
  }

  private parseErrors(logs: string): BuildError[] {
    const errors: BuildError[] = [];
    const lines = logs.split('\n');
    
    for (const line of lines) {
      for (const [pattern, errorTemplate] of this.errorPatterns) {
        const match = line.match(pattern);
        if (match) {
          const error: BuildError = {
            ...errorTemplate,
            message: match[0]
          };
          
          // Try to extract file and line information
          const fileMatch = line.match(/(?:in|at) (.+):(\d+):(\d+)/);
          if (fileMatch) {
            error.file = fileMatch[1];
            error.line = parseInt(fileMatch[2]);
          }
          
          errors.push(error);
        }
      }
    }
    
    // Also check for generic error indicators
    if (errors.length === 0) {
      if (logs.includes('npm ERR!')) {
        errors.push({
          type: 'dependency',
          message: 'NPM installation error',
          autoFixable: true,
          suggestion: 'Run npm install --force'
        });
      }
      
      if (logs.includes('Build failed')) {
        errors.push({
          type: 'runtime',
          message: 'Generic build failure',
          autoFixable: false,
          suggestion: 'Check build logs for details'
        });
      }
    }
    
    return errors;
  }

  private async attemptAutoFix(error: BuildError): Promise<boolean> {
    try {
      switch (error.type) {
        case 'dependency':
          return await this.fixDependencyError(error);
        case 'config':
          return await this.fixConfigError(error);
        case 'runtime':
          return await this.fixRuntimeError(error);
        default:
          clientLogger.info('   ⚠️ Auto-fix not available for this error type', { source: 'deployment-monitor/index' });
          return false;
      }
    } catch (fixError) {
      clientLogger.error('   ❌ Auto-fix failed:', { source: 'deployment-monitor/index' }, fixError);
      return false;
    }
  }

  private async fixDependencyError(error: BuildError): Promise<boolean> {
    clientLogger.info('   📦 Fixing dependency error...', { source: 'deployment-monitor/index' });
    
    // Extract module name from error message
    const moduleMatch = error.message.match(/['"](.+)['"]/);
    if (moduleMatch) {
      const moduleName = moduleMatch[1];
      
      // Special handling for known problematic modules
      if (moduleName.includes('sharp')) {
        clientLogger.info('   🔄 Removing sharp dependency...', { source: 'deployment-monitor/index' });
        execSync('npm uninstall sharp', { stdio: 'inherit' });
        return true;
      }
      
      // Try to install missing module
      clientLogger.info(`   📥 Installing ${moduleName}...`, { source: 'deployment-monitor/index' });
      execSync(`npm install ${moduleName} --force`, { stdio: 'inherit' });
      return true;
    }
    
    // General dependency fix
    clientLogger.info('   🔄 Running npm install --force...', { source: 'deployment-monitor/index' });
    execSync('npm install --force --legacy-peer-deps', { stdio: 'inherit' });
    return true;
  }

  private async fixConfigError(error: BuildError): Promise<boolean> {
    clientLogger.info('   ⚙️ Fixing configuration error...', { source: 'deployment-monitor/index' });
    
    if (error.message.includes('ENOENT')) {
      // Create missing directories
      const dirMatch = error.message.match(/no such file or directory, (?:open|scandir) '(.+)'/);
      if (dirMatch) {
        const missingPath = dirMatch[1];
        clientLogger.info(`   📁 Creating missing path: ${missingPath}`, { source: 'deployment-monitor/index' });
        execSync(`mkdir -p "${missingPath}"`, { stdio: 'inherit' });
        return true;
      }
    }
    
    return false;
  }

  private async fixRuntimeError(error: BuildError): Promise<boolean> {
    clientLogger.info('   🔧 Fixing runtime error...', { source: 'deployment-monitor/index' });
    
    if (error.message.toLowerCase().includes('memory')) {
      clientLogger.info('   💾 Increasing memory limit...', { source: 'deployment-monitor/index' });
      
      // Update vercel.json
      const vercelConfig = {
        env: {
          NODE_OPTIONS: '--max-old-space-size=8192'
        }
      };
      
      // This would update vercel.json
      // For now, just log the suggestion
      clientLogger.info('   💡 Add NODE_OPTIONS to vercel.json with --max-old-space-size=8192', { source: 'deployment-monitor/index' });
      return false;
    }
    
    return false;
  }

  private async cancelDeployment(deploymentId: string): Promise<boolean> {
    clientLogger.info(`\n🛑 Attempting to cancel deployment ${deploymentId}...`, { source: 'deployment-monitor/index' });
    
    try {
      if (this.vercelToken) {
        // Use Vercel API to cancel
        const response = await axios.delete(
          `https://api.vercel.com/v13/deployments/${deploymentId}`,
          {
            headers: {
              Authorization: `Bearer ${this.vercelToken}`
            }
          }
        );
        
        if (response.status === 200) {
          clientLogger.info('   ✅ Deployment canceled successfully', { source: 'deployment-monitor/index' });
          return true;
        }
      } else {
        // Try using CLI
        execSync(`vercel rm ${deploymentId} -y`, { stdio: 'inherit' });
        clientLogger.info('   ✅ Deployment canceled via CLI', { source: 'deployment-monitor/index' });
        return true;
      }
    } catch (error) {
      clientLogger.info('   ⚠️ Unable to cancel deployment (may have already completed)', { source: 'deployment-monitor/index' });
      return false;
    }
    
    return false;
  }

  public async quickCheck(): Promise<any> {
    clientLogger.info('\n🔍 Running quick deployment check...\n', { source: 'deployment-monitor/index' });
    
    const deployment = await this.getLatestDeployment();
    
    if (!deployment) {
      return { status: 'no-deployments' };
    }
    
    await this.analyzeDeployment(deployment);
    
    if (deployment.state === 'ERROR') {
      const logs = await this.getBuildLogs(deployment.id);
      const errors = logs ? this.parseErrors(logs) : [];
      
      return {
        status: 'error',
        deployment,
        errors,
        autoFixAttempted: errors.filter(e => e.autoFixable).length > 0
      };
    }
    
    return {
      status: deployment.state.toLowerCase(),
      deployment
    };
  }
}

export default DeploymentMonitorAgent;