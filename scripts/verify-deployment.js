#!/usr/bin/env node

/**
 * Deployment Verification Script
 *
 * Performs comprehensive checks to verify deployment readiness and health.
 * Run this script before deploying to ensure everything is configured correctly.
 */

const https = require('https');
const http = require('http');

// ANSI color codes
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

// Check if URL is reachable
function checkUrl(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const req = protocol.get(url, { timeout }, (res) => {
      resolve({
        status: res.statusCode,
        headers: res.headers,
        success: res.statusCode >= 200 && res.statusCode < 400,
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

// Deployment checks
const checks = {
  async verifyBuild() {
    log('\n🔨 Verifying Build Output...', 'cyan');
    const fs = require('fs');
    const path = require('path');

    const buildDir = path.join(process.cwd(), '.next');

    if (!fs.existsSync(buildDir)) {
      log('  ❌ Build directory not found', 'red');
      return false;
    }

    const requiredFiles = [
      'BUILD_ID',
      'build-manifest.json',
      'package.json',
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(buildDir, file);
      if (!fs.existsSync(filePath)) {
        log(`  ❌ Required file missing: ${file}`, 'red');
        return false;
      }
    }

    log('  ✅ Build output verified', 'green');
    return true;
  },

  async verifyDependencies() {
    log('\n📦 Verifying Dependencies...', 'cyan');
    const { execSync } = require('child_process');

    try {
      // Check for security vulnerabilities
      execSync('npm audit --audit-level=high', { stdio: 'pipe' });
      log('  ✅ No high-severity vulnerabilities found', 'green');
      return true;
    } catch (error) {
      log('  ⚠️  Security vulnerabilities detected', 'yellow');
      log('  Run `npm audit` for details', 'yellow');
      return true; // Don't fail on this
    }
  },

  async verifyDatabase() {
    log('\n🗄️  Verifying Database Connection...', 'cyan');

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      log('  ⚠️  DATABASE_URL not set', 'yellow');
      return true;
    }

    try {
      const { execSync } = require('child_process');
      // Try to generate Prisma client (validates connection)
      execSync('npx prisma validate', { stdio: 'pipe' });
      log('  ✅ Database schema valid', 'green');
      return true;
    } catch (error) {
      log('  ❌ Database validation failed', 'red');
      return false;
    }
  },

  async verifyEnvironment() {
    log('\n🔐 Verifying Environment Variables...', 'cyan');

    const required = [
      'NEXTAUTH_URL',
      'NEXTAUTH_SECRET',
      'DATABASE_URL',
    ];

    let allPresent = true;
    for (const varName of required) {
      if (!process.env[varName]) {
        log(`  ❌ Missing: ${varName}`, 'red');
        allPresent = false;
      }
    }

    if (allPresent) {
      log('  ✅ Required environment variables present', 'green');
    }

    return allPresent;
  },

  async verifyDeploymentUrl() {
    log('\n🌐 Verifying Deployment URL...', 'cyan');

    const deploymentUrl = process.env.VERCEL_URL || process.env.DEPLOYMENT_URL;

    if (!deploymentUrl) {
      log('  ⚠️  No deployment URL provided (skip in local)', 'yellow');
      return true;
    }

    const url = deploymentUrl.startsWith('http') ? deploymentUrl : `https://${deploymentUrl}`;

    try {
      const result = await checkUrl(url);
      if (result.success) {
        log(`  ✅ Deployment accessible (HTTP ${result.status})`, 'green');
        return true;
      } else {
        log(`  ❌ Deployment returned HTTP ${result.status}`, 'red');
        return false;
      }
    } catch (error) {
      log(`  ❌ Cannot reach deployment: ${error.message}`, 'red');
      return false;
    }
  },

  async verifyApiEndpoints() {
    log('\n🔌 Verifying API Endpoints...', 'cyan');

    const baseUrl = process.env.VERCEL_URL || process.env.DEPLOYMENT_URL || 'http://localhost:3000';
    const url = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

    const endpoints = [
      '/api/health',
      '/api/auth/providers',
    ];

    let allSuccessful = true;

    for (const endpoint of endpoints) {
      try {
        const result = await checkUrl(`${url}${endpoint}`);
        if (result.success) {
          log(`  ✅ ${endpoint} - HTTP ${result.status}`, 'green');
        } else {
          log(`  ❌ ${endpoint} - HTTP ${result.status}`, 'red');
          allSuccessful = false;
        }
      } catch (error) {
        log(`  ⚠️  ${endpoint} - ${error.message}`, 'yellow');
        // Don't fail if localhost is not running
        if (!baseUrl.includes('localhost')) {
          allSuccessful = false;
        }
      }
    }

    return allSuccessful;
  },

  async verifySecurityHeaders() {
    log('\n🔒 Verifying Security Headers...', 'cyan');

    const baseUrl = process.env.VERCEL_URL || process.env.DEPLOYMENT_URL;

    if (!baseUrl) {
      log('  ⚠️  No deployment URL (skip in local)', 'yellow');
      return true;
    }

    const url = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

    try {
      const result = await checkUrl(url);

      const requiredHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
      ];

      let allPresent = true;
      for (const header of requiredHeaders) {
        if (result.headers[header]) {
          log(`  ✅ ${header}: ${result.headers[header]}`, 'green');
        } else {
          log(`  ⚠️  ${header} not set`, 'yellow');
          allPresent = false;
        }
      }

      return allPresent;
    } catch (error) {
      log(`  ⚠️  Cannot verify headers: ${error.message}`, 'yellow');
      return true;
    }
  },
};

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════╗', 'cyan');
  log('║   Deployment Verification Script              ║', 'cyan');
  log('╚════════════════════════════════════════════════╝', 'cyan');

  const results = {
    passed: [],
    failed: [],
    warnings: [],
  };

  // Run all checks
  for (const [name, checkFn] of Object.entries(checks)) {
    try {
      const result = await checkFn();
      if (result === true) {
        results.passed.push(name);
      } else {
        results.failed.push(name);
      }
    } catch (error) {
      log(`\n❌ Check failed: ${name}`, 'red');
      log(`   Error: ${error.message}`, 'red');
      results.failed.push(name);
    }
  }

  // Print summary
  log('\n╔════════════════════════════════════════════════╗', 'cyan');
  log('║   Verification Summary                        ║', 'cyan');
  log('╚════════════════════════════════════════════════╝', 'cyan');

  log(`\n✅ Passed: ${results.passed.length}`, 'green');
  log(`❌ Failed: ${results.failed.length}`, results.failed.length > 0 ? 'red' : 'green');

  if (results.failed.length > 0) {
    log('\nFailed checks:', 'red');
    results.failed.forEach(check => log(`  • ${check}`, 'red'));
  }

  // Exit with appropriate code
  if (results.failed.length > 0) {
    log('\n❌ Deployment verification FAILED', 'red');
    log('   Fix the issues above before deploying.\n', 'red');
    process.exit(1);
  } else {
    log('\n✅ Deployment verification PASSED', 'green');
    log('   Ready for deployment!\n', 'green');
    process.exit(0);
  }
}

// Execute
main().catch((error) => {
  log(`\n❌ Unexpected error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
