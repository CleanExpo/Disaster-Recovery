#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates domain references in environment variables
 * Production domain: disasterrecovery.com.au
 */

const fs = require('fs');
const path = require('path');

const ALLOWED_DOMAINS = [
  'disasterrecovery.com.au',
  'www.disasterrecovery.com.au',
  'disaster-recovery-unite-group.vercel.app',
  'disaster-recovery-git-main-unite-group.vercel.app',
  'localhost',
];

const FORBIDDEN_OLD_DOMAINS = [
  'disaster-recovery-seven.vercel.app',
  'disaster-recovery-seven-virid.vercel.app',
];

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

    // Check for stale old Vercel preview URLs
    FORBIDDEN_OLD_DOMAINS.forEach(domain => {
      if (line.includes(domain)) {
        errors.push({
          file: filePath,
          line: index + 1,
          error: `STALE DOMAIN: Found reference to old domain ${domain}. Update to disasterrecovery.com.au`,
          content: line
        });
      }
    });
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
    console.error('  Production: https://www.disasterrecovery.com.au');
    console.error('  Vercel preview: https://disaster-recovery-unite-group.vercel.app');
    console.error('  Local: http://localhost:3000\n');
    process.exit(1);
  } else {
    console.log('\n✅ All environment variables are valid!\n');
  }
}

// Run validation
validateAllEnvFiles();
