#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

class DeploymentMonitor {
  constructor() {
    this.errorPatterns = this.getErrorPatterns();
  }

  getErrorPatterns() {
    return [
      {
        pattern: /Cannot find module ['"](.+)['"]/,
        type: 'dependency',
        message: 'Missing module',
        autoFixable: true,
        fix: 'npm install --force'
      },
      {
        pattern: /Module not found: Can't resolve ['"](.+)['"]/,
        type: 'dependency', 
        message: 'Module resolution failed',
        autoFixable: true,
        fix: 'Check import paths'
      },
      {
        pattern: /Type error: (.+)/,
        type: 'type',
        message: 'TypeScript error',
        autoFixable: false,
        fix: 'Fix type definitions'
      },
      {
        pattern: /Error: Cannot find module 'sharp'/,
        type: 'dependency',
        message: 'Sharp module issue',
        autoFixable: true,
        fix: 'npm uninstall sharp'
      },
      {
        pattern: /out of memory/i,
        type: 'runtime',
        message: 'Memory exceeded',
        autoFixable: true,
        fix: 'Increase NODE_OPTIONS memory'
      },
      {
        pattern: /ENOENT: no such file or directory/,
        type: 'config',
        message: 'File not found',
        autoFixable: false,
        fix: 'Create missing file'
      }
    ];
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async checkVercelDeployment() {
    try {
      // Try to get latest deployment using Vercel CLI
      this.log('\n🔍 Checking Vercel deployments...', 'cyan');
      
      const hasVercelCLI = this.checkVercelCLI();
      if (!hasVercelCLI) {
        this.log('⚠️ Vercel CLI not found. Install with: npm i -g vercel', 'yellow');
        return null;
      }

      // Get deployment list
      const output = execSync('vercel ls --yes 2>&1', { 
        encoding: 'utf8',
        cwd: process.cwd()
      });

      // Parse deployment info
      const lines = output.split('\n').filter(line => line.trim());
      const deploymentLine = lines.find(line => 
        line.includes('Ready') || 
        line.includes('Building') || 
        line.includes('Error')
      );

      if (deploymentLine) {
        const status = deploymentLine.includes('Ready') ? 'ready' :
                      deploymentLine.includes('Building') ? 'building' : 'error';
        
        // Extract URL if available
        const urlMatch = deploymentLine.match(/https?:\/\/[\w\-\.]+\.vercel\.app/);
        const url = urlMatch ? urlMatch[0] : null;

        return { status, url, raw: deploymentLine };
      }

      return null;
    } catch (error) {
      this.log('❌ Error checking Vercel deployment', 'red');
      return null;
    }
  }

  checkVercelCLI() {
    try {
      execSync('vercel --version', { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  async checkLocalBuild() {
    this.log('\n🔨 Checking local build...', 'cyan');
    
    try {
      const output = execSync('npm run build 2>&1', {
        encoding: 'utf8',
        cwd: process.cwd(),
        env: {
          ...process.env,
          SKIP_ENV_VALIDATION: 'true',
          CI: 'false'
        }
      });
      
      this.log('✅ Local build successful!', 'green');
      return { success: true, output };
    } catch (error) {
      this.log('❌ Local build failed!', 'red');
      
      const output = error.stdout || error.message || '';
      const errors = this.parseErrors(output);
      
      return { success: false, errors, output };
    }
  }

  parseErrors(output) {
    const errors = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      for (const errorPattern of this.errorPatterns) {
        if (errorPattern.pattern.test(line)) {
          const match = line.match(errorPattern.pattern);
          errors.push({
            type: errorPattern.type,
            message: errorPattern.message,
            detail: match ? match[0] : line,
            autoFixable: errorPattern.autoFixable,
            fix: errorPattern.fix
          });
        }
      }
    }
    
    return errors;
  }

  async checkGitStatus() {
    this.log('\n📋 Checking Git status...', 'cyan');
    
    try {
      // Get current branch
      const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      this.log(`   Branch: ${branch}`, 'blue');
      
      // Get latest commit
      const commit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
      this.log(`   Latest: ${commit}`, 'blue');
      
      // Check for uncommitted changes
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        this.log('   ⚠️ Uncommitted changes detected', 'yellow');
      } else {
        this.log('   ✅ Working directory clean', 'green');
      }
      
      return { branch, commit, hasChanges: !!status.trim() };
    } catch (error) {
      this.log('❌ Not a git repository', 'red');
      return null;
    }
  }

  async checkEnvironment() {
    this.log('\n🔍 Checking environment...', 'cyan');
    
    const issues = [];
    
    // Check .env files
    const envFiles = ['.env', '.env.local', '.env.production'];
    let hasEnvFile = false;
    
    for (const file of envFiles) {
      if (fs.existsSync(path.join(process.cwd(), file))) {
        this.log(`   ✅ Found ${file}`, 'green');
        hasEnvFile = true;
      }
    }
    
    if (!hasEnvFile) {
      issues.push('No environment files found');
      this.log('   ⚠️ No .env files found', 'yellow');
    }
    
    // Check node_modules
    if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
      issues.push('node_modules missing - run: npm install');
      this.log('   ❌ node_modules not found', 'red');
    } else {
      this.log('   ✅ node_modules exists', 'green');
    }
    
    // Check for problematic dependencies
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
      );
      
      if (packageJson.dependencies?.sharp || packageJson.devDependencies?.sharp) {
        issues.push('Sharp dependency found (causes Vercel issues)');
        this.log('   ⚠️ Sharp dependency detected', 'yellow');
      }
    } catch (error) {
      issues.push('Unable to read package.json');
    }
    
    return issues;
  }

  async autoFix(errors) {
    if (!errors || errors.length === 0) {
      this.log('\n✅ No errors to fix', 'green');
      return;
    }
    
    const fixable = errors.filter(e => e.autoFixable);
    if (fixable.length === 0) {
      this.log('\n⚠️ No auto-fixable errors found', 'yellow');
      this.log('Manual fixes required:', 'cyan');
      errors.forEach(e => {
        this.log(`  - ${e.fix}`, 'blue');
      });
      return;
    }
    
    this.log(`\n🔧 Attempting to fix ${fixable.length} error(s)...`, 'green');
    
    for (const error of fixable) {
      this.log(`\n  Fixing: ${error.message}`, 'yellow');
      
      try {
        switch (error.type) {
          case 'dependency':
            if (error.message.includes('Sharp')) {
              this.log('  Removing sharp...', 'cyan');
              execSync('npm uninstall sharp', { stdio: 'inherit' });
            } else {
              this.log('  Running npm install...', 'cyan');
              execSync('npm install --force --legacy-peer-deps', { stdio: 'inherit' });
            }
            break;
            
          case 'runtime':
            if (error.message.includes('memory')) {
              this.log('  💡 Add to vercel.json:', 'cyan');
              this.log('     "env": { "NODE_OPTIONS": "--max-old-space-size=8192" }', 'blue');
            }
            break;
        }
        
        this.log('  ✅ Fix applied', 'green');
      } catch (error) {
        this.log(`  ❌ Fix failed: ${error.message}`, 'red');
      }
    }
    
    this.log('\n🚀 Fixes applied. Test with: npm run build', 'green');
  }

  async runFullCheck() {
    console.log(`${colors.bright}${colors.cyan}
╔══════════════════════════════════════╗
║   Deployment Monitor Agent v1.0.0    ║
║   Disaster Recovery Platform         ║
╚══════════════════════════════════════╝
${colors.reset}`);

    // Check Git status
    const gitStatus = await this.checkGitStatus();
    
    // Check environment
    const envIssues = await this.checkEnvironment();
    
    // Check Vercel deployment
    const deployment = await this.checkVercelDeployment();
    
    if (deployment) {
      this.log('\n📦 Latest Deployment:', 'bright');
      
      switch (deployment.status) {
        case 'ready':
          this.log('   ✅ Status: Ready', 'green');
          if (deployment.url) {
            this.log(`   🌐 URL: ${deployment.url}`, 'blue');
          }
          break;
          
        case 'building':
          this.log('   🔨 Status: Building...', 'yellow');
          this.log('   Run with --watch flag to monitor', 'cyan');
          break;
          
        case 'error':
          this.log('   ❌ Status: Failed', 'red');
          this.log('   Checking build errors...', 'yellow');
          
          // Try local build to identify errors
          const buildResult = await this.checkLocalBuild();
          if (!buildResult.success && buildResult.errors) {
            this.displayErrors(buildResult.errors);
          }
          break;
      }
    } else {
      this.log('\n📭 No Vercel deployments found', 'yellow');
      this.log('Deploy with: npm run deploy', 'cyan');
    }
    
    // Summary
    this.log('\n📊 Summary:', 'bright');
    
    if (envIssues.length > 0) {
      this.log('   Issues to address:', 'yellow');
      envIssues.forEach(issue => {
        this.log(`     - ${issue}`, 'red');
      });
    } else {
      this.log('   ✅ Environment OK', 'green');
    }
    
    if (gitStatus?.hasChanges) {
      this.log('   ⚠️ Uncommitted changes present', 'yellow');
    }
    
    this.log('\n💡 Quick Actions:', 'cyan');
    this.log('   npm run deploy      - Deploy to Vercel', 'blue');
    this.log('   npm run monitor:fix - Auto-fix errors', 'blue');
    this.log('   npm run build       - Test build locally', 'blue');
  }

  displayErrors(errors) {
    this.log('\n❌ Build Errors Found:', 'red');
    
    errors.forEach((error, index) => {
      console.log(`\n  ${colors.bright}Error ${index + 1}:${colors.reset}`);
      console.log(`    Type: ${colors.yellow}${error.type}${colors.reset}`);
      console.log(`    Message: ${colors.red}${error.message}${colors.reset}`);
      console.log(`    Detail: ${error.detail}`);
      if (error.autoFixable) {
        console.log(`    🔧 Auto-fixable: ${colors.green}Yes${colors.reset}`);
      }
      console.log(`    💡 Fix: ${colors.cyan}${error.fix}${colors.reset}`);
    });
  }

  async watch() {
    this.log('👀 Starting deployment monitor...', 'green');
    this.log('Press Ctrl+C to stop\n', 'yellow');
    
    const checkInterval = 30000; // 30 seconds
    
    // Initial check
    await this.runFullCheck();
    
    // Set up interval
    const interval = setInterval(async () => {
      console.log('\n' + '='.repeat(40));
      await this.runFullCheck();
    }, checkInterval);
    
    // Handle exit
    process.on('SIGINT', () => {
      this.log('\n🛑 Stopping monitor...', 'yellow');
      clearInterval(interval);
      process.exit(0);
    });
  }
}

// CLI execution
const monitor = new DeploymentMonitor();
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case '--watch':
  case 'watch':
    monitor.watch();
    break;
    
  case '--fix':
  case 'fix':
    (async () => {
      const buildResult = await monitor.checkLocalBuild();
      if (!buildResult.success && buildResult.errors) {
        await monitor.autoFix(buildResult.errors);
      } else {
        monitor.log('\n✅ No errors to fix', 'green');
      }
    })();
    break;
    
  case '--help':
  case 'help':
    console.log(`
Usage: node scripts/deployment-monitor.js [command]

Commands:
  check      Full deployment check (default)
  watch      Continuously monitor deployments
  fix        Attempt to auto-fix errors
  help       Show this help message

Shortcuts:
  npm run monitor       - Quick check
  npm run monitor:watch - Watch mode
  npm run monitor:fix   - Auto-fix mode
`);
    break;
    
  default:
    monitor.runFullCheck();
}