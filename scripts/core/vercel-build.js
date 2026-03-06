#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Detect if we're on Vercel
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

console.log('=====================================');
console.log('Build Environment Information:');
console.log('=====================================');
console.log('Platform:', process.platform);
console.log('Node Version:', process.version);
console.log('Is Vercel:', !!isVercel);
console.log('Vercel Environment:', process.env.VERCEL_ENV || 'Not on Vercel');
console.log('Build Directory:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('=====================================\n');

// Function to execute commands with better error handling
function executeCommand(command, options = {}) {
  console.log(`\n📦 Executing: ${command}`);
  try {
    const result = execSync(command, {
      stdio: 'inherit',
      ...options
    });
    console.log(`✅ Successfully executed: ${command}\n`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to execute: ${command}`);
    console.error('Error details:', error.message);
    throw error;
  }
}

// Setup build environment
console.log('🔧 Setting up build environment...\n');

// DATABASE_URL should be set via environment variables (Vercel Dashboard or .env.local)
if (!process.env.DATABASE_URL) {
  console.warn('⚠️ DATABASE_URL is not set. Prisma generate will still work (no DB connection needed), but db push will fail.');
}

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
    console.log('✅ Cleaned .next directory');
  }
} catch (error) {
  console.warn('⚠️ Could not clean .next directory:', error.message);
}

// Install dependencies if needed (Vercel usually handles this)
if (!isVercel && !fs.existsSync('node_modules')) {
  console.log('📥 Installing dependencies...');
  executeCommand('npm ci', {
    env: { ...process.env }
  });
}

// Generate Prisma client
console.log('\n🔨 Generating Prisma client...');
try {
  // Always use the main schema file which has all models
  const schemaFile = 'prisma/schema.prisma';
  
  console.log(`Using schema file: ${schemaFile}`);
  
  const prismaEnv = {
    ...process.env,
    PRISMA_SCHEMA_PATH: schemaFile
  };
  
  // Generate Prisma client
  executeCommand('npx prisma generate', {
    env: prismaEnv
  });
  
  console.log('✅ Prisma client generated successfully');
  
  // Push database schema if in development
  if (!isVercel && process.env.NODE_ENV !== 'production') {
    try {
      console.log('📊 Pushing database schema...');
      executeCommand('npx prisma db push --accept-data-loss', {
        env: prismaEnv
      });
    } catch (error) {
      console.warn('⚠️ Could not push database schema (this is okay for production builds)');
    }
  }
} catch (error) {
  console.error('❌ Prisma generation failed:', error.message);
  if (isVercel) {
    console.warn('⚠️ Continuing build despite Prisma error (Vercel environment)');
  } else {
    throw error;
  }
}

// Build Next.js application
console.log('\n🚀 Building Next.js application...');
try {
  const buildEnv = {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096',
    NEXT_TELEMETRY_DISABLED: '1',
    // Force production build on Vercel
    NODE_ENV: isVercel ? 'production' : (process.env.NODE_ENV || 'production')
  };
  
  // Log memory usage before build
  const memUsage = process.memoryUsage();
  console.log('Memory usage before build:');
  console.log(`  RSS: ${Math.round(memUsage.rss / 1024 / 1024)} MB`);
  console.log(`  Heap Used: ${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`);
  console.log(`  Heap Total: ${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`);
  
  executeCommand('npx next build', {
    env: buildEnv
  });
  
  // Log memory usage after build
  const memUsageAfter = process.memoryUsage();
  console.log('\nMemory usage after build:');
  console.log(`  RSS: ${Math.round(memUsageAfter.rss / 1024 / 1024)} MB`);
  console.log(`  Heap Used: ${Math.round(memUsageAfter.heapUsed / 1024 / 1024)} MB`);
  console.log(`  Heap Total: ${Math.round(memUsageAfter.heapTotal / 1024 / 1024)} MB`);
  
  console.log('\n✅ Build completed successfully!');
  
  // List build output
  if (fs.existsSync('.next')) {
    const stats = fs.statSync('.next');
    console.log(`\n📊 Build output size: ${Math.round(stats.size / 1024)} KB`);
  }
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  
  // Provide more detailed error information
  if (error.stdout) {
    console.error('Build stdout:', error.stdout.toString());
  }
  if (error.stderr) {
    console.error('Build stderr:', error.stderr.toString());
  }
  
  // Check for common issues
  console.log('\n🔍 Checking for common issues...');
  
  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.error('❌ node_modules directory not found. Run: npm install');
  }
  
  // Check if package-lock.json exists
  if (!fs.existsSync('package-lock.json')) {
    console.error('❌ package-lock.json not found. Run: npm install');
  }
  
  // Check TypeScript configuration
  if (fs.existsSync('tsconfig.json')) {
    console.log('✅ tsconfig.json found');
  } else {
    console.error('❌ tsconfig.json not found');
  }
  
  // Check for Next.js configuration
  if (fs.existsSync('next.config.mjs') || fs.existsSync('next.config.js')) {
    console.log('✅ Next.js configuration found');
  } else {
    console.error('❌ Next.js configuration not found');
  }
  
  process.exit(1);
}

console.log('\n=====================================');
console.log('✨ Build process completed successfully!');
console.log('=====================================\n');
