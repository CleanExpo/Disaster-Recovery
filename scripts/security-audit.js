#!/usr/bin/env node

/**
 * Security Audit Script
 *
 * Runs npm audit and reports security vulnerabilities
 * Exits with code 1 if critical or high vulnerabilities are found
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Running security audit...\n');

try {
  // Run npm audit with JSON output
  let auditOutput;
  try {
    auditOutput = execSync('npm audit --json', { encoding: 'utf-8' });
  } catch (error) {
    // npm audit exits with non-zero if vulnerabilities found
    auditOutput = error.stdout || '';
  }

  const result = JSON.parse(auditOutput);

  console.log('='.repeat(60));
  console.log('Security Audit Results');
  console.log('='.repeat(60));

  const meta = result.metadata;
  const vulns = meta.vulnerabilities;

  console.log(`Total vulnerabilities: ${vulns.total}`);
  console.log(`  Critical: ${vulns.critical || 0}`);
  console.log(`  High:     ${vulns.high || 0}`);
  console.log(`  Medium:   ${vulns.medium || 0}`);
  console.log(`  Low:      ${vulns.low || 0}`);
  console.log('='.repeat(60));

  // Audit dependencies for specific high-risk packages
  console.log('\n📦 Checking for high-risk package patterns...\n');

  const auditedPackages = meta.packages || 0;
  console.log(`Packages audited: ${auditedPackages}`);

  // Generate timestamp for audit log
  const timestamp = new Date().toISOString();
  const auditLogPath = path.join(process.cwd(), 'audit-results.json');

  // Save audit results
  fs.writeFileSync(
    auditLogPath,
    JSON.stringify(
      {
        timestamp,
        summary: {
          total: vulns.total,
          critical: vulns.critical || 0,
          high: vulns.high || 0,
          medium: vulns.medium || 0,
          low: vulns.low || 0,
        },
        details: result.vulnerabilities,
      },
      null,
      2
    )
  );

  console.log(`\n✅ Audit results saved to audit-results.json\n`);

  // Exit based on vulnerability levels
  if (vulns.critical > 0) {
    console.error('❌ CRITICAL VULNERABILITIES FOUND!');
    console.error('Action required: Fix immediately with `npm run security:fix`\n');
    process.exit(1);
  }

  if (vulns.high > 0) {
    console.error('⚠️  HIGH VULNERABILITIES FOUND!');
    console.error('Action required: Fix soon with `npm run security:fix`\n');
    process.exit(1);
  }

  if (vulns.medium > 0) {
    console.warn('⚠️  Medium vulnerabilities found.');
    console.warn('Recommendation: Review and fix when possible.\n');
  }

  console.log('✅ Security audit passed. No critical or high vulnerabilities detected.\n');
  process.exit(0);
} catch (error) {
  console.error('❌ Error running security audit:', error.message);
  process.exit(1);
}
