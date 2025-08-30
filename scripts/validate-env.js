#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Prevents incorrect domain references in environment variables
 * CRITICAL: Ensures we NEVER reference disasterrecovery.com.au
 */

const fs = require('fs');
const path = require('path');

const FORBIDDEN_DOMAINS = [
  'disasterrecovery.com.au',
  'www.disasterrecovery.com.au',
  'https://disasterrecovery.com.au',
  'https://www.disasterrecovery.com.au',
  'http://disasterrecovery.com.au',
  'http://www.disasterrecovery.com.au'
];

const REQUIRED_DOMAINS = {
  production: 'disaster-recovery.vercel.app',
  staging: 'disaster-recovery-staging.vercel.app'
};

const ENV_FILES = [
  '.env',
  '.env.local',
  '.env.production',
  '.env.staging',
  '.env.development'
];

function validateEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: true, errors: [] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) return;

    // Check for forbidden domains
    FORBIDDEN_DOMAINS.forEach(domain => {
      if (line.includes(domain)) {
        errors.push({
          file: filePath,
          line: index + 1,
          error: `FORBIDDEN DOMAIN: Found reference to ${domain}. Use ${REQUIRED_DOMAINS.production} instead.`,
          content: line
        });
      }
    });

    // Check for correct URL structure (skip database URLs and API endpoints)
    if ((line.includes('NEXT_PUBLIC_APP_URL=') || line.includes('NEXTAUTH_URL=')) && 
        !line.includes('disaster-recovery') && 
        !line.includes('localhost')) {
      errors.push({
        file: filePath,
        line: index + 1,
        error: `INVALID URL: App URLs must use disaster-recovery.vercel.app domain`,
        content: line
      });
    }
  });

  return { valid: errors.length === 0, errors };
}

function validateAllEnvFiles() {
  console.log('🔍 Validating environment variables...\n');
  
  let hasErrors = false;
  
  ENV_FILES.forEach(envFile => {
    const filePath = path.join(process.cwd(), envFile);
    const result = validateEnvFile(filePath);
    
    if (!result.valid) {
      hasErrors = true;
      console.error(`❌ Errors in ${envFile}:`);
      result.errors.forEach(error => {
        console.error(`   Line ${error.line}: ${error.error}`);
        console.error(`   > ${error.content}\n`);
      });
    } else if (fs.existsSync(filePath)) {
      console.log(`✅ ${envFile} is valid`);
    }
  });

  if (hasErrors) {
    console.error('\n⚠️  ENVIRONMENT VALIDATION FAILED');
    console.error('Fix the above errors before deploying.');
    console.error('\nCorrect domain usage:');
    console.error('  Production: https://disaster-recovery.vercel.app');
    console.error('  Staging: https://disaster-recovery-staging.vercel.app');
    console.error('  NEVER use: disasterrecovery.com.au\n');
    process.exit(1);
  } else {
    console.log('\n✅ All environment variables are valid!\n');
  }
}

// Run validation
validateAllEnvFiles();