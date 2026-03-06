#!/usr/bin/env node

/**
 * Postinstall script for Vercel deployments
 * Runs after npm install to prepare the build environment
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Running postinstall script...');

// Detect if we're on Vercel
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

if (isVercel) {
  console.log('🚀 Detected Vercel environment');
  console.log('✅ Postinstall complete (Vercel)');
} else {
  console.log('💻 Local development environment');
  
  // Only run optimizations in local dev, never on Vercel
  if (process.env.RUN_IMAGE_OPTIMIZATION === 'true') {
    console.log('🖼️ Image optimization enabled for local dev');
    // Don't run the worker here - it should be run separately
  }
  
  console.log('✅ Postinstall complete (Local)');
}

// Ensure required directories exist
const requiredDirs = [
  'public/uploads',
  'public/images',
  'uploads'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

console.log('✨ Postinstall script completed successfully');