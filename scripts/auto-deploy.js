#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const AUTO_DEPLOY_CONFIG = {
  branch: 'main',
  commitPrefix: 'auto-deploy:',
  checkInterval: 60000, // Check every minute
  autoPush: true,
  vercelDeploy: true
};

class AutoDeployManager {
  constructor() {
    this.isRunning = false;
    this.lastCommitHash = null;
  }

  // Check if there are uncommitted changes
  hasChanges() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch (error) {
      console.error('Error checking git status:', error.message);
      return false;
    }
  }

  // Get current branch
  getCurrentBranch() {
    try {
      const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
      return branch.trim();
    } catch (error) {
      console.error('Error getting current branch:', error.message);
      return null;
    }
  }

  // Generate commit message based on changes
  generateCommitMessage() {
    try {
      const status = execSync('git status --short', { encoding: 'utf8' });
      const lines = status.trim().split('\n');
      
      const added = lines.filter(l => l.startsWith('A ') || l.startsWith('?? ')).length;
      const modified = lines.filter(l => l.startsWith('M ')).length;
      const deleted = lines.filter(l => l.startsWith('D ')).length;
      
      const parts = [];
      if (added > 0) parts.push(`${added} added`);
      if (modified > 0) parts.push(`${modified} modified`);
      if (deleted > 0) parts.push(`${deleted} deleted`);
      
      const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
      return `${AUTO_DEPLOY_CONFIG.commitPrefix} ${parts.join(', ')} - ${timestamp}`;
    } catch (error) {
      return `${AUTO_DEPLOY_CONFIG.commitPrefix} Auto-commit at ${new Date().toISOString()}`;
    }
  }

  // Stage all changes
  stageChanges() {
    try {
      execSync('git add -A', { stdio: 'inherit' });
      console.log('✅ Staged all changes');
      return true;
    } catch (error) {
      console.error('❌ Error staging changes:', error.message);
      return false;
    }
  }

  // Commit changes
  commitChanges(message) {
    try {
      const fullMessage = `${message}

🤖 Auto-deployed by Disaster Recovery Auto-Deploy System
Timestamp: ${new Date().toISOString()}`;
      
      execSync(`git commit -m "${fullMessage}"`, { stdio: 'inherit' });
      console.log('✅ Committed changes');
      return true;
    } catch (error) {
      console.error('❌ Error committing changes:', error.message);
      return false;
    }
  }

  // Push to remote
  pushChanges() {
    try {
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('✅ Pushed to GitHub');
      return true;
    } catch (error) {
      console.error('❌ Error pushing changes:', error.message);
      return false;
    }
  }

  // Trigger Vercel deployment
  triggerVercelDeploy() {
    try {
      // Vercel will auto-deploy on push to main
      console.log('🚀 Vercel deployment triggered automatically via GitHub integration');
      return true;
    } catch (error) {
      console.error('❌ Error with Vercel deployment:', error.message);
      return false;
    }
  }

  // Main deployment cycle
  async deploy() {
    console.log('\n🔄 Checking for changes...');
    
    // Check if we're on the main branch
    const currentBranch = this.getCurrentBranch();
    if (currentBranch !== AUTO_DEPLOY_CONFIG.branch) {
      console.log(`⚠️ Not on ${AUTO_DEPLOY_CONFIG.branch} branch (current: ${currentBranch})`);
      return;
    }
    
    // Check for changes
    if (!this.hasChanges()) {
      console.log('✨ No changes detected');
      return;
    }
    
    console.log('📝 Found changes, starting auto-deploy...');
    
    // Stage changes
    if (!this.stageChanges()) {
      console.error('Failed to stage changes');
      return;
    }
    
    // Generate and create commit
    const commitMessage = this.generateCommitMessage();
    console.log(`📋 Commit message: ${commitMessage}`);
    
    if (!this.commitChanges(commitMessage)) {
      console.error('Failed to commit changes');
      return;
    }
    
    // Push if enabled
    if (AUTO_DEPLOY_CONFIG.autoPush) {
      if (!this.pushChanges()) {
        console.error('Failed to push changes');
        return;
      }
      
      // Trigger Vercel deployment
      if (AUTO_DEPLOY_CONFIG.vercelDeploy) {
        this.triggerVercelDeploy();
      }
    }
    
    console.log('✅ Auto-deploy completed successfully!\n');
  }

  // Start watching for changes
  startWatching() {
    if (this.isRunning) {
      console.log('Auto-deploy is already running');
      return;
    }
    
    this.isRunning = true;
    console.log(`🤖 Auto-Deploy Manager Started
📍 Branch: ${AUTO_DEPLOY_CONFIG.branch}
⏱️ Check Interval: ${AUTO_DEPLOY_CONFIG.checkInterval / 1000}s
🚀 Auto Push: ${AUTO_DEPLOY_CONFIG.autoPush}
📦 Vercel Deploy: ${AUTO_DEPLOY_CONFIG.vercelDeploy}
`);
    
    // Initial check
    this.deploy();
    
    // Set up interval
    this.interval = setInterval(() => {
      this.deploy();
    }, AUTO_DEPLOY_CONFIG.checkInterval);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping auto-deploy...');
      this.stop();
      process.exit(0);
    });
  }

  // Stop watching
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
    console.log('Auto-deploy stopped');
  }
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];

const manager = new AutoDeployManager();

if (command === 'once') {
  // Run once and exit
  console.log('🚀 Running auto-deploy once...');
  manager.deploy().then(() => {
    process.exit(0);
  });
} else if (command === 'watch' || !command) {
  // Start watching (default)
  manager.startWatching();
} else if (command === 'help') {
  console.log(`
Disaster Recovery Auto-Deploy System

Usage:
  node scripts/auto-deploy.js [command]

Commands:
  watch    Start watching for changes and auto-deploy (default)
  once     Run auto-deploy once and exit
  help     Show this help message

Configuration:
  Edit AUTO_DEPLOY_CONFIG in this script to customize behavior
  `);
  process.exit(0);
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run "node scripts/auto-deploy.js help" for usage information');
  process.exit(1);
}

module.exports = AutoDeployManager;