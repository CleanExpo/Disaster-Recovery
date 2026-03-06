#!/usr/bin/env node

/**
 * Development server with automatic image optimization
 * Starts both Next.js dev server and image optimization worker
 */

const { spawn } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}🚀 Starting Development Environment with Image Optimization${colors.reset}`);
console.log('='.repeat(60));

// Start the image optimization worker
console.log(`${colors.cyan}📸 Starting image optimization worker...${colors.reset}`);
const workerProcess = spawn('node', [path.join(__dirname, 'image-optimization-worker.js')], {
  stdio: 'inherit',
  shell: true,
});

// Give the worker a moment to start
setTimeout(() => {
  console.log(`${colors.cyan}🌐 Starting Next.js development server...${colors.reset}`);
  
  // Start Next.js dev server
  const nextProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
  });
  
  // Handle process termination
  const cleanup = () => {
    console.log(`\n${colors.yellow}🛑 Shutting down...${colors.reset}`);
    
    if (workerProcess && !workerProcess.killed) {
      workerProcess.kill();
    }
    
    if (nextProcess && !nextProcess.killed) {
      nextProcess.kill();
    }
    
    process.exit(0);
  };
  
  // Listen for termination signals
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
  
  // Handle child process errors
  workerProcess.on('error', (error) => {
    console.error(`${colors.red}❌ Worker error: ${error}${colors.reset}`);
  });
  
  nextProcess.on('error', (error) => {
    console.error(`${colors.red}❌ Next.js error: ${error}${colors.reset}`);
  });
  
}, 2000);

console.log(`${colors.green}✅ Development environment is starting...${colors.reset}`);
console.log(`${colors.bright}💡 Image optimization is running in the background${colors.reset}`);
console.log('='.repeat(60));