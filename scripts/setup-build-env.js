#!/usr/bin/env node

// This script sets up environment variables for Vercel build
const fs = require('fs');
const path = require('path');

// Create a temporary .env file for build if DATABASE_URL is not set
if (!process.env.DATABASE_URL) {
  const envContent = 'DATABASE_URL="file:./build.db"\n';
  const envPath = path.join(process.cwd(), '.env');
  
  // Only create if it doesn't exist
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envContent);
    console.log('Created temporary .env file for build');
  }
}

console.log('Build environment ready');