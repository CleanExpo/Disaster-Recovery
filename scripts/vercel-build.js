#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Detect if we're on Vercel
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

console.log('Build Environment:', {
  platform: process.platform,
  isVercel: !!isVercel,
  nodeVersion: process.version
});

// Setup build environment
console.log('Setting up build environment...');

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./build.db';
  console.log('Using temporary database URL for build');
}

// On Vercel, generate Prisma client
if (isVercel) {
  console.log('Generating Prisma client for Vercel...');
  try {
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      }
    });
    console.log('Prisma client generated successfully');
  } catch (error) {
    console.error('Prisma generation warning:', error.message);
    // Continue anyway for build
  }
} else {
  console.log('Skipping Prisma generation for local build');
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
