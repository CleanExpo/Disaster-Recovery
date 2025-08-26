#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Detect if we're on Vercel
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

console.log('Build Environment:', {
  platform: process.platform,
  isVercel: !!isVercel,
  nodeVersion: process.version,
  databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
});

// Setup build environment
console.log('Setting up build environment...');

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./build.db';
  console.log('Using temporary database URL for build');
}

// Always generate Prisma client for build
console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL || 'file:./build.db'
    }
  });
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Prisma generation warning:', error.message);
  // Don't fail the build on Vercel
  if (!isVercel) {
    console.error('Prisma generation failed locally, continuing anyway...');
  }
}

// Build Next.js
console.log('Building Next.js application...');
try {
  const buildEnv = {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096',
    DATABASE_URL: process.env.DATABASE_URL || 'file:./build.db',
    NEXT_TELEMETRY_DISABLED: '1'
  };
  
  execSync('npx next build', { 
    stdio: 'inherit',
    env: buildEnv
  });
  
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
