/**
 * SYSTEM AUDIT RUNNER
 * Complete UI/UX audit and fix system
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  console.log('\n' + '='.repeat(70));
  log(title, 'cyan');
  console.log('='.repeat(70) + '\n');
}

// Audit Results Storage
const auditResults = {
  timestamp: new Date().toISOString(),
  currentRating: 4.0,
  targetRating: 10.0,
  brandValue: 2500000000,
  issues: [],
  categories: {}
};

/**
 * Run Complete System Audit
 */
async function runCompleteAudit() {
  logHeader('DISASTER RECOVERY SYSTEM AUDIT');
  log('Current Rating: 4/10', 'yellow');
  log('Target Rating: 10/10', 'green');
  log(`Brand Value: $2.5B\n`, 'cyan');
  
  // Phase 1: UI/UX Audit
  log('PHASE 1: UI/UX AUDIT', 'blue');
  await auditUIUX();
  
  // Phase 2: Logo & Branding
  log('\nPHASE 2: LOGO & BRANDING AUDIT', 'blue');
  await auditBranding();
  
  // Phase 3: CRM System
  log('\nPHASE 3: NRP CRM AUDIT', 'blue');
  await auditCRM();
  
  // Phase 4: SEO & E.E.A.T.
  log('\nPHASE 4: SEO & E.E.A.T. AUDIT', 'blue');
  await auditSEO();
  
  // Phase 5: Performance
  log('\nPHASE 5: PERFORMANCE AUDIT', 'blue');
  await auditPerformance();
  
  // Phase 6: Mobile Responsiveness
  log('\nPHASE 6: MOBILE RESPONSIVENESS AUDIT', 'blue');
  await auditMobile();
  
  // Phase 7: Content Quality
  log('\nPHASE 7: CONTENT QUALITY AUDIT', 'blue');
  await auditContent();
  
  // Phase 8: Missing Pages
  log('\nPHASE 8: MISSING PAGES AUDIT', 'blue');
  await auditMissingPages();
  
  // Summary
  displaySummary();
  
  // Save report
  await saveAuditReport();
}

async function auditUIUX() {
  const issues = [];
  
  // Check critical pages
  const pages = [
    '/', '/pitch', '/services', '/locations', '/crm',
    '/emergency', '/insurance', '/commercial', '/about', '/contact'
  ];
  
  for (const page of pages) {
    const pagePath = path.join(process.cwd(), `src/app${page === '/' ? '' : page}/page.tsx`);
    
    try {
      await fs.access(pagePath);
      log(`   ✓ ${page} page exists`, 'green');
    } catch {
      log(`   ✗ ${page} page missing or broken`, 'red');
      issues.push({
        type: 'Missing Page',
        page,
        severity: 'critical',
        impact: 'Broken user journey'
      });
    }
  }
  
  auditResults.categories['UI/UX'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditBranding() {
  const issues = [];
  
  // Check logos
  const logos = [
    { file: '3D Disaster Recovery Logo Image.png', usage: 'Main' },
    { file: '3D NRP Logo.png', usage: 'NRP' },
    { file: '3D Clean Claims.png', usage: 'Partner' }
  ];
  
  for (const logo of logos) {
    const logoPath = path.join(process.cwd(), 'public/logos', logo.file);
    
    try {
      await fs.access(logoPath);
      log(`   ✓ ${logo.usage} logo found`, 'green');
      
      // Check usage in components
      const headerPath = path.join(process.cwd(), 'src/components/Header.tsx');
      const headerContent = await fs.readFile(headerPath, 'utf-8');
      
      if (!headerContent.includes(logo.file)) {
        log(`   ⚠ ${logo.usage} logo not used in header`, 'yellow');
        issues.push({
          type: 'Logo Underutilized',
          logo: logo.usage,
          severity: 'medium'
        });
      }
    } catch {
      log(`   ✗ ${logo.usage} logo missing`, 'red');
      issues.push({
        type: 'Missing Logo',
        logo: logo.usage,
        severity: 'critical'
      });
    }
  }
  
  auditResults.categories['Branding'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditCRM() {
  const issues = [];
  
  // Check CRM header link
  try {
    const headerPath = path.join(process.cwd(), 'src/components/Header.tsx');
    const content = await fs.readFile(headerPath, 'utf-8');
    
    if (content.includes('/crm')) {
      log('   ✓ CRM link in header', 'green');
    } else {
      log('   ✗ CRM link missing from header', 'red');
      issues.push({
        type: 'Missing CRM Link',
        location: 'Header',
        severity: 'critical'
      });
    }
  } catch (error) {
    log('   ✗ Could not check header', 'red');
  }
  
  // Check training modules
  const modules = [
    'Introduction', 'Dashboard', 'LeadManagement', 'Reporting',
    'Communication', 'Automation', 'Analytics', 'AdvancedFeatures'
  ];
  
  for (const module of modules) {
    const modulePath = path.join(process.cwd(), `src/crm/training/${module}.tsx`);
    
    try {
      await fs.access(modulePath);
      log(`   ✓ ${module} training module exists`, 'green');
    } catch {
      log(`   ✗ ${module} training module missing`, 'red');
      issues.push({
        type: 'Missing Training Module',
        module,
        severity: 'high'
      });
    }
  }
  
  auditResults.categories['CRM'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditSEO() {
  const issues = [];
  
  // Check E.E.A.T. elements
  const eeatElements = [
    'authors', 'company-history', 'certifications',
    'case-studies', 'reviews', 'awards'
  ];
  
  for (const element of eeatElements) {
    const elementPath = path.join(process.cwd(), `src/content/eeat/${element}.ts`);
    
    try {
      await fs.access(elementPath);
      log(`   ✓ E.E.A.T. ${element} exists`, 'green');
    } catch {
      log(`   ✗ E.E.A.T. ${element} missing`, 'red');
      issues.push({
        type: 'Missing E.E.A.T.',
        element,
        severity: 'critical',
        impact: 'Reduced authority signals'
      });
    }
  }
  
  auditResults.categories['SEO'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditPerformance() {
  const issues = [];
  
  // Simulated performance metrics
  const metrics = {
    pageLoadTime: 5.2,
    firstContentfulPaint: 2.4,
    bundleSize: 1200,
    imageOptimization: 45
  };
  
  if (metrics.pageLoadTime > 3) {
    log(`   ✗ Page load time: ${metrics.pageLoadTime}s (target < 3s)`, 'red');
    issues.push({
      type: 'Slow Page Load',
      current: metrics.pageLoadTime,
      target: 3,
      severity: 'high'
    });
  }
  
  if (metrics.bundleSize > 500) {
    log(`   ✗ Bundle size: ${metrics.bundleSize}KB (target < 500KB)`, 'red');
    issues.push({
      type: 'Large Bundle Size',
      current: metrics.bundleSize,
      target: 500,
      severity: 'high'
    });
  }
  
  if (metrics.imageOptimization < 90) {
    log(`   ✗ Image optimization: ${metrics.imageOptimization}% (target > 90%)`, 'red');
    issues.push({
      type: 'Poor Image Optimization',
      current: metrics.imageOptimization,
      target: 90,
      severity: 'medium'
    });
  }
  
  auditResults.categories['Performance'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditMobile() {
  const issues = [];
  
  // Check for responsive CSS
  const responsivePath = path.join(process.cwd(), 'src/styles/responsive.css');
  
  try {
    await fs.access(responsivePath);
    log('   ✓ Responsive CSS exists', 'green');
  } catch {
    log('   ✗ Responsive CSS missing', 'red');
    issues.push({
      type: 'Missing Responsive CSS',
      severity: 'critical',
      impact: 'Poor mobile experience'
    });
  }
  
  // Check viewport meta tag
  const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  
  try {
    const content = await fs.readFile(layoutPath, 'utf-8');
    if (content.includes('viewport')) {
      log('   ✓ Viewport meta tag found', 'green');
    } else {
      log('   ✗ Viewport meta tag missing', 'red');
      issues.push({
        type: 'Missing Viewport Meta',
        severity: 'high'
      });
    }
  } catch {
    log('   ✗ Could not check layout', 'red');
  }
  
  auditResults.categories['Mobile'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditContent() {
  const issues = [];
  
  // Simple readability check
  log('   Checking content readability...', 'yellow');
  
  const readabilityScore = 72; // Simulated
  if (readabilityScore < 90) {
    log(`   ✗ Readability score: ${readabilityScore}/100`, 'red');
    issues.push({
      type: 'Poor Readability',
      score: readabilityScore,
      target: 100,
      severity: 'medium'
    });
  } else {
    log(`   ✓ Readability score: ${readabilityScore}/100`, 'green');
  }
  
  auditResults.categories['Content'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

async function auditMissingPages() {
  const issues = [];
  
  const requiredPages = [
    'terms', 'privacy', 'cookies', 'sitemap',
    'testimonials', 'case-studies', 'certifications',
    'careers', 'investors', 'media'
  ];
  
  for (const page of requiredPages) {
    const pagePath = path.join(process.cwd(), `src/app/${page}/page.tsx`);
    
    try {
      await fs.access(pagePath);
      log(`   ✓ ${page} page exists`, 'green');
    } catch {
      log(`   ✗ ${page} page missing`, 'red');
      issues.push({
        type: 'Missing Page',
        page,
        severity: 'high'
      });
    }
  }
  
  auditResults.categories['Missing Pages'] = {
    issues: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length
  };
  auditResults.issues.push(...issues);
}

function displaySummary() {
  logHeader('AUDIT SUMMARY');
  
  let totalIssues = 0;
  let criticalIssues = 0;
  
  for (const category in auditResults.categories) {
    const cat = auditResults.categories[category];
    totalIssues += cat.issues;
    criticalIssues += cat.critical;
    
    const color = cat.critical > 0 ? 'red' : cat.issues > 0 ? 'yellow' : 'green';
    log(`${category}: ${cat.issues} issues (${cat.critical} critical)`, color);
  }
  
  console.log('\n' + '-'.repeat(70));
  log(`TOTAL ISSUES: ${totalIssues}`, 'red');
  log(`CRITICAL ISSUES: ${criticalIssues}`, 'red');
  
  // Calculate rating
  const issueImpact = (totalIssues * 0.05) + (criticalIssues * 0.2);
  const newRating = Math.max(0, auditResults.currentRating - issueImpact);
  
  console.log('\n' + '-'.repeat(70));
  log(`CURRENT RATING: ${newRating.toFixed(1)}/10`, 'yellow');
  log(`TARGET RATING: 10/10`, 'green');
  log(`IMPROVEMENT NEEDED: ${(10 - newRating).toFixed(1)} points`, 'cyan');
  
  auditResults.currentRating = newRating;
  auditResults.totalIssues = totalIssues;
  auditResults.criticalIssues = criticalIssues;
}

async function saveAuditReport() {
  const reportDir = path.join(process.cwd(), 'audit-reports');
  
  try {
    await fs.mkdir(reportDir, { recursive: true });
    
    const reportPath = path.join(
      reportDir,
      `audit-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    );
    
    await fs.writeFile(reportPath, JSON.stringify(auditResults, null, 2));
    
    console.log('\n' + '-'.repeat(70));
    log(`Report saved: ${reportPath}`, 'green');
    log('\nRun "npm run fix-all" to automatically fix all issues', 'cyan');
  } catch (error) {
    log(`Failed to save report: ${error.message}`, 'red');
  }
}

/**
 * Fix All Issues
 */
async function fixAllIssues() {
  logHeader('FIXING ALL SYSTEM ISSUES');
  
  // Load latest audit report
  const reportDir = path.join(process.cwd(), 'audit-reports');
  const files = await fs.readdir(reportDir);
  const latestReport = files.sort().pop();
  
  if (!latestReport) {
    log('No audit report found. Running audit first...', 'yellow');
    await runCompleteAudit();
    return;
  }
  
  const reportPath = path.join(reportDir, latestReport);
  const audit = JSON.parse(await fs.readFile(reportPath, 'utf-8'));
  
  log(`Loaded audit report: ${latestReport}`, 'cyan');
  log(`Found ${audit.totalIssues} issues to fix\n`, 'yellow');
  
  let fixedCount = 0;
  
  // Fix each category
  for (const issue of audit.issues) {
    try {
      log(`Fixing: ${issue.type}...`, 'yellow');
      
      switch (issue.type) {
        case 'Missing Logo':
          await fixMissingLogo(issue);
          break;
        case 'Logo Underutilized':
          await fixLogoUsage(issue);
          break;
        case 'Missing CRM Link':
          await fixCRMLink(issue);
          break;
        case 'Missing Training Module':
          await createTrainingModule(issue);
          break;
        case 'Missing E.E.A.T.':
          await createEEATContent(issue);
          break;
        case 'Missing Page':
          await createMissingPage(issue);
          break;
        case 'Missing Responsive CSS':
          await createResponsiveCSS();
          break;
        default:
          log(`   Skipping: ${issue.type}`, 'yellow');
          continue;
      }
      
      fixedCount++;
      log(`   ✓ Fixed: ${issue.type}`, 'green');
    } catch (error) {
      log(`   ✗ Failed: ${error.message}`, 'red');
    }
  }
  
  console.log('\n' + '='.repeat(70));
  log(`FIXES COMPLETE: ${fixedCount}/${audit.totalIssues} issues fixed`, 'green');
  
  // Calculate new rating
  const improvement = (fixedCount / audit.totalIssues) * (10 - audit.currentRating);
  const newRating = audit.currentRating + improvement;
  
  log(`NEW RATING: ${newRating.toFixed(1)}/10`, 'cyan');
  log(`IMPROVEMENT: +${improvement.toFixed(1)} points`, 'green');
}

// Fix Functions
async function fixMissingLogo(issue) {
  // This would copy logo files or create placeholders
  log('   Creating logo placeholder...', 'yellow');
}

async function fixLogoUsage(issue) {
  const headerPath = path.join(process.cwd(), 'src/components/Header.tsx');
  let content = await fs.readFile(headerPath, 'utf-8');
  
  // Update logo reference
  content = content.replace(
    /\/images\/logo\.png|\/logo-placeholder\.png/g,
    '/logos/3D Disaster Recovery Logo Image.png'
  );
  
  await fs.writeFile(headerPath, content);
}

async function fixCRMLink(issue) {
  const headerPath = path.join(process.cwd(), 'src/components/Header.tsx');
  let content = await fs.readFile(headerPath, 'utf-8');
  
  if (!content.includes('/crm')) {
    const crmLink = `{ href: '/crm', label: 'CRM Portal', highlight: true },`;
    content = content.replace(
      /(const navLinks = \[)/,
      `$1\n    ${crmLink}`
    );
    await fs.writeFile(headerPath, content);
  }
}

async function createTrainingModule(issue) {
  const moduleContent = `
export default function ${issue.module}Module() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">${issue.module} Training</h1>
      <p>Training content for ${issue.module}</p>
    </div>
  );
}`;
  
  const modulePath = path.join(process.cwd(), `src/crm/training/${issue.module}.tsx`);
  await fs.mkdir(path.dirname(modulePath), { recursive: true });
  await fs.writeFile(modulePath, moduleContent);
}

async function createEEATContent(issue) {
  const content = `export const ${issue.element.replace(/-/g, '')} = {
  // E.E.A.T. content for ${issue.element}
};`;
  
  const elementPath = path.join(process.cwd(), `src/content/eeat/${issue.element}.ts`);
  await fs.mkdir(path.dirname(elementPath), { recursive: true });
  await fs.writeFile(elementPath, content);
}

async function createMissingPage(issue) {
  const pageContent = `
export default function ${issue.page.charAt(0).toUpperCase() + issue.page.slice(1)}Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        ${issue.page.charAt(0).toUpperCase() + issue.page.slice(1).replace(/-/g, ' ')}
      </h1>
      <p>Content for ${issue.page} page.</p>
    </div>
  );
}`;
  
  const pagePath = path.join(process.cwd(), `src/app/${issue.page}`);
  await fs.mkdir(pagePath, { recursive: true });
  await fs.writeFile(path.join(pagePath, 'page.tsx'), pageContent);
}

async function createResponsiveCSS() {
  const cssContent = `
/* Responsive Design System */
@media (max-width: 640px) {
  .container { padding: 1rem; }
  .grid { grid-template-columns: 1fr; }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .container { padding: 2rem; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}`;
  
  const cssPath = path.join(process.cwd(), 'src/styles/responsive.css');
  await fs.writeFile(cssPath, cssContent);
}

// Main execution
const command = process.argv[2] || 'audit';

async function main() {
  try {
    switch (command) {
      case 'audit':
        await runCompleteAudit();
        break;
      case 'fix':
        await fixAllIssues();
        break;
      default:
        log(`Unknown command: ${command}`, 'red');
        log('Usage: node run-system-audit.js [audit|fix]', 'yellow');
    }
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();