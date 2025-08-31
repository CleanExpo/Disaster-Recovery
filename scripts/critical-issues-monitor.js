#!/usr/bin/env node

/**
 * CRITICAL ISSUES MONITOR
 * Ensures critical issues STAY FIXED
 * Run this before EVERY deployment
 */

const fs = require('fs').promises;
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

// CRITICAL REQUIREMENTS THAT MUST ALWAYS BE TRUE
const CRITICAL_CHECKS = {
  crmAccess: {
    name: 'CRM Access Visibility',
    files: [
      {
        path: 'src/components/UltraModernHeader.tsx',
        mustContain: [
          'href="/crm"',
          'NRP CRM Portal',
          'CRM Portal Button'
        ],
        mustNotContain: [
          '/* Removed CTA Section',
          '// CRM disabled'
        ]
      },
      {
        path: 'src/components/Header.tsx',
        mustContain: [
          'href="/crm"',
          'NRP CRM'
        ]
      }
    ]
  },
  
  commercialPage: {
    name: 'Commercial Page Functionality',
    files: [
      {
        path: 'src/app/services/commercial/page.tsx',
        mustNotContain: [
          'ServicePageLayout', // This was causing freezing
          'import { ServicePageLayout'
        ],
        mustContain: [
          'export default function CommercialRestorationPage',
          'Commercial Restoration Services'
        ]
      }
    ],
    mustNotExist: [
      'src/app/commercial/page.tsx' // Duplicate that causes routing issues
    ]
  },
  
  investmentPitch: {
    name: 'Investment Pitch Completeness',
    files: [
      {
        path: 'src/app/pitch/page.tsx',
        mustContain: [
          'PITCH_SLIDES',
          'Series A Investment',
          '$909M',
          'Financial Projections'
        ],
        minimumLines: 500 // Must be substantial
      }
    ]
  },
  
  criticalPages: {
    name: 'Critical Pages Exist',
    mustExist: [
      'src/app/page.tsx',
      'src/app/pitch/page.tsx',
      'src/app/contact/page.tsx',
      'src/app/services/page.tsx',
      'src/app/crm/page.tsx',
      'src/app/about/page.tsx'
    ]
  },
  
  noSyntaxErrors: {
    name: 'No Syntax Errors',
    files: [
      {
        path: 'src',
        pattern: /export\s+default\s+function\s+[^a-zA-Z_$]/, // Invalid function names
        shouldNotMatch: true
      },
      {
        path: 'src',
        pattern: /FaUsersClass/, // Non-existent icon
        shouldNotMatch: true
      }
    ]
  }
};

async function checkFile(filePath, requirements) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const issues = [];
    
    // Check must contain
    if (requirements.mustContain) {
      for (const text of requirements.mustContain) {
        if (!content.includes(text)) {
          issues.push(`Missing required text: "${text}"`);
        }
      }
    }
    
    // Check must not contain
    if (requirements.mustNotContain) {
      for (const text of requirements.mustNotContain) {
        if (content.includes(text)) {
          issues.push(`Contains forbidden text: "${text}"`);
        }
      }
    }
    
    // Check minimum lines
    if (requirements.minimumLines) {
      const lines = content.split('\n').length;
      if (lines < requirements.minimumLines) {
        issues.push(`File too small: ${lines} lines (minimum: ${requirements.minimumLines})`);
      }
    }
    
    // Check pattern matching
    if (requirements.pattern && requirements.shouldNotMatch) {
      if (requirements.pattern.test(content)) {
        issues.push(`Contains forbidden pattern: ${requirements.pattern}`);
      }
    }
    
    return issues;
  } catch (error) {
    return [`File error: ${error.message}`];
  }
}

async function checkExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function runChecks() {
  console.log(`\n${colors.blue}╔══════════════════════════════════════════════════╗`);
  console.log(`║     CRITICAL ISSUES MONITOR - NEVER AGAIN!      ║`);
  console.log(`╚══════════════════════════════════════════════════╝${colors.reset}\n`);
  
  let totalIssues = 0;
  const results = {};
  
  for (const [key, check] of Object.entries(CRITICAL_CHECKS)) {
    console.log(`${colors.yellow}Checking: ${check.name}${colors.reset}`);
    const checkIssues = [];
    
    // Check files
    if (check.files) {
      for (const file of check.files) {
        const issues = await checkFile(file.path, file);
        if (issues.length > 0) {
          checkIssues.push({
            file: file.path,
            issues
          });
        }
      }
    }
    
    // Check must exist
    if (check.mustExist) {
      for (const filePath of check.mustExist) {
        if (!(await checkExists(filePath))) {
          checkIssues.push({
            file: filePath,
            issues: ['File does not exist']
          });
        }
      }
    }
    
    // Check must not exist
    if (check.mustNotExist) {
      for (const filePath of check.mustNotExist) {
        if (await checkExists(filePath)) {
          checkIssues.push({
            file: filePath,
            issues: ['File should not exist (causes conflicts)']
          });
        }
      }
    }
    
    if (checkIssues.length === 0) {
      console.log(`  ${colors.green}✓ PASSED${colors.reset}`);
      results[key] = 'PASSED';
    } else {
      console.log(`  ${colors.red}✗ FAILED${colors.reset}`);
      for (const issue of checkIssues) {
        console.log(`    ${colors.red}File: ${issue.file}${colors.reset}`);
        for (const detail of issue.issues) {
          console.log(`      - ${detail}`);
        }
      }
      results[key] = 'FAILED';
      totalIssues += checkIssues.length;
    }
    console.log();
  }
  
  // Summary
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
  
  if (totalIssues === 0) {
    console.log(`${colors.green}✅ ALL CRITICAL CHECKS PASSED!${colors.reset}`);
    console.log(`${colors.green}Safe to deploy!${colors.reset}\n`);
    
    // Save success state
    await fs.writeFile(
      'critical-checks-status.json',
      JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'PASSED',
        results
      }, null, 2)
    );
    
    return 0;
  } else {
    console.log(`${colors.red}❌ ${totalIssues} CRITICAL ISSUES FOUND!${colors.reset}`);
    console.log(`${colors.red}DO NOT DEPLOY until these are fixed!${colors.reset}\n`);
    
    console.log(`${colors.yellow}To fix:${colors.reset}`);
    console.log('1. Run: npm run fix');
    console.log('2. Run: node scripts/critical-issues-monitor.js');
    console.log('3. Repeat until all checks pass\n');
    
    // Save failure state
    await fs.writeFile(
      'critical-checks-status.json',
      JSON.stringify({
        timestamp: new Date().toISOString(),
        status: 'FAILED',
        results,
        issueCount: totalIssues
      }, null, 2)
    );
    
    return 1;
  }
}

// Add to package.json scripts
async function updatePackageJson() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8'));
    
    if (!packageJson.scripts['check:critical']) {
      packageJson.scripts['check:critical'] = 'node scripts/critical-issues-monitor.js';
      packageJson.scripts['prebuild'] = 'npm run check:critical && npm run fix';
      
      await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
      console.log(`${colors.green}Added critical check to package.json scripts${colors.reset}`);
    }
  } catch (error) {
    console.log(`${colors.yellow}Could not update package.json: ${error.message}${colors.reset}`);
  }
}

// Run
runChecks()
  .then(async (exitCode) => {
    await updatePackageJson();
    process.exit(exitCode);
  })
  .catch(error => {
    console.error(`${colors.red}Fatal error: ${error}${colors.reset}`);
    process.exit(1);
  });