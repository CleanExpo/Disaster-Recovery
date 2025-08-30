import { EventEmitter } from 'events';
import { execSync } from 'child_process';
import axios from 'axios';

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
      console.log('🔍 Already monitoring deployments');
      return;
    }

    this.isMonitoring = true;
    console.log('🚀 Deployment Monitor Agent Started');
    
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
    console.log('🛑 Deployment monitoring stopped');
  }

  private async checkDeployment() {
    try {
      // Check using Vercel CLI
      const deployment = await this.getLatestDeployment();
      
      if (!deployment) {
        console.log('📭 No deployments found');
        return;
      }

      // Check if this is a new deployment
      if (deployment.id !== this.lastDeploymentId) {
        this.lastDeploymentId = deployment.id;
        console.log(`\n🔄 New deployment detected: ${deployment.id}`);
        this.emit('new-deployment', deployment);
      }

      // Analyze deployment status
      await this.analyzeDeployment(deployment);
      
    } catch (error) {
      console.error('❌ Error checking deployment:', error);
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
    console.log(`📊 Analyzing deployment ${deployment.id}`);
    console.log(`   State: ${deployment.state}`);
    
    switch (deployment.state) {
      case 'BUILDING':
        console.log('   🔨 Build in progress...');
        this.emit('building', deployment);
        break;
        
      case 'READY':
        console.log('   ✅ Deployment successful!');
        if (deployment.url) {
          console.log(`   🌐 URL: https://${deployment.url}`);
        }
        this.emit('success', deployment);
        break;
        
      case 'ERROR':
        console.log('   ❌ Deployment failed!');
        await this.handleBuildError(deployment);
        break;
        
      case 'CANCELED':
        console.log('   ⚠️ Deployment canceled');
        this.emit('canceled', deployment);
        break;
    }
  }

  private async handleBuildError(deployment: DeploymentStatus) {
    console.log('\n🔍 Analyzing build errors...');
    
    // Get build logs
    const logs = await this.getBuildLogs(deployment.id);
    
    if (!logs) {
      console.log('   Unable to retrieve build logs');
      return;
    }
    
    // Analyze errors
    const errors = this.parseErrors(logs);
    
    if (errors.length === 0) {
      console.log('   No specific errors identified');
      return;
    }
    
    console.log(`\n📋 Found ${errors.length} error(s):`);
    
    for (const error of errors) {
      console.log(`\n   Type: ${error.type}`);
      console.log(`   Message: ${error.message}`);
      if (error.file) console.log(`   File: ${error.file}`);
      if (error.suggestion) console.log(`   💡 Suggestion: ${error.suggestion}`);
      
      if (error.autoFixable) {
        console.log('   🔧 Attempting auto-fix...');
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
          console.log('   ⚠️ Auto-fix not available for this error type');
          return false;
      }
    } catch (fixError) {
      console.error('   ❌ Auto-fix failed:', fixError);
      return false;
    }
  }

  private async fixDependencyError(error: BuildError): Promise<boolean> {
    console.log('   📦 Fixing dependency error...');
    
    // Extract module name from error message
    const moduleMatch = error.message.match(/['"](.+)['"]/);
    if (moduleMatch) {
      const moduleName = moduleMatch[1];
      
      // Special handling for known problematic modules
      if (moduleName.includes('sharp')) {
        console.log('   🔄 Removing sharp dependency...');
        execSync('npm uninstall sharp', { stdio: 'inherit' });
        return true;
      }
      
      // Try to install missing module
      console.log(`   📥 Installing ${moduleName}...`);
      execSync(`npm install ${moduleName} --force`, { stdio: 'inherit' });
      return true;
    }
    
    // General dependency fix
    console.log('   🔄 Running npm install --force...');
    execSync('npm install --force --legacy-peer-deps', { stdio: 'inherit' });
    return true;
  }

  private async fixConfigError(error: BuildError): Promise<boolean> {
    console.log('   ⚙️ Fixing configuration error...');
    
    if (error.message.includes('ENOENT')) {
      // Create missing directories
      const dirMatch = error.message.match(/no such file or directory, (?:open|scandir) '(.+)'/);
      if (dirMatch) {
        const missingPath = dirMatch[1];
        console.log(`   📁 Creating missing path: ${missingPath}`);
        execSync(`mkdir -p "${missingPath}"`, { stdio: 'inherit' });
        return true;
      }
    }
    
    return false;
  }

  private async fixRuntimeError(error: BuildError): Promise<boolean> {
    console.log('   🔧 Fixing runtime error...');
    
    if (error.message.toLowerCase().includes('memory')) {
      console.log('   💾 Increasing memory limit...');
      
      // Update vercel.json
      const vercelConfig = {
        env: {
          NODE_OPTIONS: '--max-old-space-size=8192'
        }
      };
      
      // This would update vercel.json
      // For now, just log the suggestion
      console.log('   💡 Add NODE_OPTIONS to vercel.json with --max-old-space-size=8192');
      return false;
    }
    
    return false;
  }

  private async cancelDeployment(deploymentId: string): Promise<boolean> {
    console.log(`\n🛑 Attempting to cancel deployment ${deploymentId}...`);
    
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
          console.log('   ✅ Deployment canceled successfully');
          return true;
        }
      } else {
        // Try using CLI
        execSync(`vercel rm ${deploymentId} -y`, { stdio: 'inherit' });
        console.log('   ✅ Deployment canceled via CLI');
        return true;
      }
    } catch (error) {
      console.log('   ⚠️ Unable to cancel deployment (may have already completed)');
      return false;
    }
    
    return false;
  }

  public async quickCheck(): Promise<any> {
    console.log('\n🔍 Running quick deployment check...\n');
    
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