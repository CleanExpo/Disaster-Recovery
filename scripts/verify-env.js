#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 *
 * Verifies that all required environment variables are set before deployment.
 * This helps catch configuration issues early in the CI/CD pipeline.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Define required environment variables by category
const requiredEnvVars = {
  database: {
    description: 'Database Configuration',
    required: ['DATABASE_URL'],
    optional: ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'],
  },
  redis: {
    description: 'Redis Configuration',
    required: ['REDIS_URL'],
    optional: ['REDIS_PORT', 'REDIS_PASSWORD'],
  },
  auth: {
    description: 'Authentication',
    required: ['NEXTAUTH_URL', 'NEXTAUTH_SECRET'],
    optional: ['GITHUB_ID', 'GITHUB_SECRET', 'GOOGLE_ID', 'GOOGLE_SECRET'],
  },
  stripe: {
    description: 'Payment Processing',
    required: ['STRIPE_PUBLISHABLE_KEY', 'STRIPE_SECRET_KEY'],
    optional: ['STRIPE_WEBHOOK_SECRET'],
  },
  email: {
    description: 'Email Service',
    optional: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM'],
  },
  monitoring: {
    description: 'Monitoring & Observability',
    optional: ['SENTRY_DSN', 'ENABLE_METRICS', 'ENABLE_TRACING'],
  },
  ai: {
    description: 'AI/ML Services',
    optional: ['HUGGINGFACE_API_KEY', 'OPENAI_API_KEY', 'GEMINI_API_KEY'],
  },
  sanity: {
    description: 'Sanity CMS',
    optional: ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET', 'SANITY_API_TOKEN'],
  },
  algolia: {
    description: 'Algolia Search',
    optional: ['NEXT_PUBLIC_ALGOLIA_APP_ID', 'NEXT_PUBLIC_ALGOLIA_API_KEY', 'ALGOLIA_ADMIN_KEY'],
  },
};

// Verify environment variables
function verifyEnvironment() {
  log('\n🔍 Verifying Environment Variables...\n', 'cyan');

  let hasErrors = false;
  let hasWarnings = false;
  const summary = {
    required: { total: 0, present: 0, missing: 0 },
    optional: { total: 0, present: 0, missing: 0 },
  };

  for (const [category, config] of Object.entries(requiredEnvVars)) {
    log(`\n📦 ${config.description}`, 'blue');
    log('━'.repeat(50), 'blue');

    // Check required variables
    if (config.required) {
      for (const varName of config.required) {
        summary.required.total++;
        const value = process.env[varName];

        if (!value || value.trim() === '') {
          log(`  ❌ ${varName} - MISSING (REQUIRED)`, 'red');
          summary.required.missing++;
          hasErrors = true;
        } else {
          log(`  ✅ ${varName} - Set`, 'green');
          summary.required.present++;
        }
      }
    }

    // Check optional variables
    if (config.optional) {
      for (const varName of config.optional) {
        summary.optional.total++;
        const value = process.env[varName];

        if (!value || value.trim() === '') {
          log(`  ⚠️  ${varName} - Not set (optional)`, 'yellow');
          summary.optional.missing++;
          hasWarnings = true;
        } else {
          log(`  ✅ ${varName} - Set`, 'green');
          summary.optional.present++;
        }
      }
    }
  }

  // Print summary
  log('\n📊 Summary', 'cyan');
  log('━'.repeat(50), 'cyan');
  log(`  Required: ${summary.required.present}/${summary.required.total} set`,
    summary.required.missing > 0 ? 'red' : 'green');
  log(`  Optional: ${summary.optional.present}/${summary.optional.total} set`,
    summary.optional.missing > 0 ? 'yellow' : 'green');

  // Final result
  log('\n━'.repeat(50), 'cyan');
  if (hasErrors) {
    log('\n❌ Environment verification FAILED', 'red');
    log('   Missing required environment variables.', 'red');
    log('   Please check your .env file or deployment configuration.\n', 'red');
    process.exit(1);
  } else if (hasWarnings) {
    log('\n⚠️  Environment verification PASSED with warnings', 'yellow');
    log('   Some optional variables are not set.', 'yellow');
    log('   This may limit functionality.\n', 'yellow');
    process.exit(0);
  } else {
    log('\n✅ Environment verification PASSED', 'green');
    log('   All required variables are set!\n', 'green');
    process.exit(0);
  }
}

// Validate specific environment configurations
function validateConfigurations() {
  const warnings = [];

  // Validate URLs
  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('http')) {
    warnings.push('NEXTAUTH_URL should start with http:// or https://');
  }

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgresql://')) {
    warnings.push('DATABASE_URL should start with postgresql://');
  }

  if (process.env.REDIS_URL && !process.env.REDIS_URL.startsWith('redis://')) {
    warnings.push('REDIS_URL should start with redis://');
  }

  // Validate security
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    warnings.push('NEXTAUTH_SECRET should be at least 32 characters long');
  }

  // Print validation warnings
  if (warnings.length > 0) {
    log('\n⚠️  Configuration Warnings:', 'yellow');
    warnings.forEach(warning => log(`   • ${warning}`, 'yellow'));
  }
}

// Main execution
try {
  verifyEnvironment();
  validateConfigurations();
} catch (error) {
  log(`\n❌ Error during verification: ${error.message}`, 'red');
  process.exit(1);
}
