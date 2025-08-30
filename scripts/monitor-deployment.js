#!/usr/bin/env node

const { DeploymentMonitorAgent } = require('../src/lib/agents/deployment-monitor');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class DeploymentMonitorCLI {
  constructor() {
    this.monitor = new DeploymentMonitorAgent();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.monitor.on('monitoring-started', () => {
      this.log('🚀 Monitoring started', 'green');
    });

    this.monitor.on('new-deployment', (deployment) => {
      this.log(`\n📦 New deployment detected: ${deployment.id}`, 'cyan');
    });

    this.monitor.on('building', (deployment) => {
      this.log('🔨 Build in progress...', 'yellow');
    });

    this.monitor.on('success', (deployment) => {
      this.log('✅ Deployment successful!', 'green');
      if (deployment.url) {
        this.log(`🌐 URL: https://${deployment.url}`, 'blue');
      }
    });

    this.monitor.on('errors-found', (errors) => {
      this.log(`\n❌ ${errors.length} error(s) found:`, 'red');
      this.displayErrors(errors);
      this.suggestFixes(errors);
    });

    this.monitor.on('canceled', () => {
      this.log('⚠️ Deployment canceled', 'yellow');
    });
  }

  log(message, color = 'reset') {
    const colorCode = colors[color] || colors.reset;
    console.log(`${colorCode}${message}${colors.reset}`);
  }

  displayErrors(errors) {
    errors.forEach((error, index) => {
      console.log(`\n${colors.bright}Error ${index + 1}:${colors.reset}`);
      console.log(`  Type: ${colors.yellow}${error.type}${colors.reset}`);
      console.log(`  Message: ${colors.red}${error.message}${colors.reset}`);
      if (error.file) {
        console.log(`  File: ${colors.cyan}${error.file}${colors.reset}`);
      }
      if (error.line) {
        console.log(`  Line: ${error.line}`);
      }
    });
  }

  suggestFixes(errors) {
    const autoFixable = errors.filter(e => e.autoFixable);
    
    if (autoFixable.length > 0) {
      this.log('\n🔧 Auto-fixable issues detected', 'green');
      console.log('Run with --auto-fix flag to attempt automatic fixes\n');
    }

    console.log(`\n${colors.bright}Suggested fixes:${colors.reset}`);
    errors.forEach((error, index) => {
      if (error.suggestion) {
        console.log(`  ${index + 1}. ${error.suggestion}`);
      }
    });
  }

  async runQuickCheck() {
    this.log('\n🔍 Running deployment check...\n', 'cyan');
    
    try {
      // First, check if we're in a git repository
      const isGitRepo = this.checkGitRepo();
      if (!isGitRepo) {
        this.log('❌ Not in a git repository', 'red');
        return;
      }

      // Check latest commit
      const latestCommit = this.getLatestCommit();
      this.log(`📝 Latest commit: ${latestCommit}`, 'blue');

      // Check Vercel deployment
      const result = await this.monitor.quickCheck();
      
      switch (result.status) {
        case 'no-deployments':
          this.log('📭 No deployments found', 'yellow');
          this.suggestInitialSetup();
          break;
          
        case 'ready':
          this.log('✅ Latest deployment is ready!', 'green');
          if (result.deployment.url) {
            this.log(`🌐 URL: https://${result.deployment.url}`, 'blue');
          }
          break;
          
        case 'building':
          this.log('🔨 Deployment is currently building...', 'yellow');
          this.log('Run monitor with --watch flag to track progress', 'cyan');
          break;
          
        case 'error':
          this.log('❌ Deployment failed!', 'red');
          if (result.errors && result.errors.length > 0) {
            this.displayErrors(result.errors);
            this.suggestFixes(result.errors);
            
            if (result.autoFixAttempted) {
              this.log('\n🔧 Auto-fixes were attempted', 'yellow');
              this.log('Review the changes and redeploy', 'cyan');
            }
          }
          break;
      }

      // Check for common issues
      await this.checkCommonIssues();
      
    } catch (error) {
      this.log(`\n❌ Error: ${error.message}`, 'red');
    }
  }

  checkGitRepo() {
    try {
      execSync('git status', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  getLatestCommit() {
    try {
      const commit = execSync('git log -1 --oneline', { encoding: 'utf8' });
      return commit.trim();
    } catch {
      return 'Unable to get commit info';
    }
  }

  async checkCommonIssues() {
    this.log('\n🔍 Checking for common issues...', 'cyan');
    
    const issues = [];
    
    // Check if .env.local exists
    if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
      issues.push({
        type: 'warning',
        message: '.env.local file not found',
        fix: 'Create .env.local with required environment variables'
      });
    }
    
    // Check if node_modules exists
    if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
      issues.push({
        type: 'error',
        message: 'node_modules not found',
        fix: 'Run: npm install --force'
      });
    }
    
    // Check if .next exists (for local testing)
    if (!fs.existsSync(path.join(process.cwd(), '.next'))) {
      issues.push({
        type: 'info',
        message: 'No local build found',
        fix: 'Run: npm run build (for local testing)'
      });
    }
    
    // Check package.json for sharp
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
    );
    
    if (packageJson.dependencies?.sharp || packageJson.devDependencies?.sharp) {
      issues.push({
        type: 'warning',
        message: 'Sharp dependency detected (causes Vercel build issues)',
        fix: 'Consider removing sharp or using alternative image processing'
      });
    }
    
    // Display issues
    if (issues.length > 0) {
      console.log('');
      issues.forEach(issue => {
        const icon = issue.type === 'error' ? '❌' : 
                     issue.type === 'warning' ? '⚠️' : 'ℹ️';
        const color = issue.type === 'error' ? 'red' : 
                      issue.type === 'warning' ? 'yellow' : 'blue';
        
        this.log(`${icon} ${issue.message}`, color);
        console.log(`   Fix: ${issue.fix}`);
      });
    } else {
      this.log('✅ No common issues detected', 'green');
    }
  }

  suggestInitialSetup() {
    console.log(`
${colors.bright}Initial Setup Required:${colors.reset}

1. Link your project to Vercel:
   ${colors.cyan}vercel link${colors.reset}

2. Deploy to Vercel:
   ${colors.cyan}vercel --prod${colors.reset}

3. Or use auto-deploy:
   ${colors.cyan}npm run deploy${colors.reset}
`);
  }

  async startWatching() {
    this.log('👀 Starting deployment monitor...', 'green');
    this.log('Press Ctrl+C to stop\n', 'yellow');
    
    await this.monitor.startMonitoring();
    
    // Keep the process running
    process.on('SIGINT', () => {
      this.log('\n🛑 Stopping monitor...', 'yellow');
      this.monitor.stopMonitoring();
      process.exit(0);
    });
  }

  async autoFix() {
    this.log('🔧 Running auto-fix mode...', 'green');
    
    const result = await this.monitor.quickCheck();
    
    if (result.status === 'error' && result.errors) {
      const fixableErrors = result.errors.filter(e => e.autoFixable);
      
      if (fixableErrors.length === 0) {
        this.log('No auto-fixable errors found', 'yellow');
        return;
      }
      
      this.log(`Found ${fixableErrors.length} auto-fixable error(s)`, 'cyan');
      
      for (const error of fixableErrors) {
        this.log(`\nFixing: ${error.message}`, 'yellow');
        
        try {
          // Attempt fixes based on error type
          if (error.type === 'dependency') {
            this.log('Running: npm install --force', 'cyan');
            execSync('npm install --force --legacy-peer-deps', { stdio: 'inherit' });
          }
          
          if (error.message.includes('sharp')) {
            this.log('Removing sharp dependency...', 'cyan');
            execSync('npm uninstall sharp', { stdio: 'inherit' });
          }
          
          this.log('✅ Fix applied', 'green');
        } catch (error) {
          this.log(`❌ Fix failed: ${error.message}`, 'red');
        }
      }
      
      this.log('\n🚀 Fixes applied. Run deployment again:', 'green');
      this.log('npm run deploy', 'cyan');
    } else {
      this.log('No errors to fix', 'green');
    }
  }
}

// CLI execution
const cli = new DeploymentMonitorCLI();
const args = process.argv.slice(2);
const command = args[0];

console.log(`${colors.bright}${colors.cyan}
╔══════════════════════════════════════╗
║   Deployment Monitor Agent v1.0.0    ║
║   Disaster Recovery Platform         ║
╚══════════════════════════════════════╝
${colors.reset}`);

switch (command) {
  case '--watch':
  case 'watch':
    cli.startWatching();
    break;
    
  case '--auto-fix':
  case 'fix':
    cli.autoFix();
    break;
    
  case '--help':
  case 'help':
    console.log(`
Usage: node scripts/monitor-deployment.js [command]

Commands:
  check      Quick deployment check (default)
  watch      Continuously monitor deployments
  fix        Attempt to auto-fix errors
  help       Show this help message

Examples:
  npm run monitor           # Quick check
  npm run monitor:watch     # Watch mode
  npm run monitor:fix       # Auto-fix mode
`);
    break;
    
  default:
    cli.runQuickCheck();
}

module.exports = DeploymentMonitorCLI;