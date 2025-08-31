/**
 * Health Check Runner for Disaster Recovery Platform
 * Comprehensive testing of all application components
 * Runs inside Docker container for accurate testing
 */

const http = require('http');
const https = require('https');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Health check configuration
const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3002',
  timeout: 5000,
  retryAttempts: 3,
  outputDir: path.join(__dirname, '..', 'health-reports')
};

// Health check results
const results = {
  timestamp: new Date().toISOString(),
  environment: {
    nodeVersion: process.version,
    platform: process.platform,
    baseUrl: config.baseUrl
  },
  tests: {
    routes: { total: 0, passed: 0, failed: 0, details: [] },
    assets: { total: 0, passed: 0, failed: 0, details: [] },
    api: { total: 0, passed: 0, failed: 0, details: [] },
    links: { total: 0, passed: 0, failed: 0, broken: [] },
    seo: { passed: 0, failed: 0, details: [] },
    performance: { metrics: {} }
  },
  errors: [],
  warnings: [],
  summary: {}
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  console.log('\n' + '='.repeat(50));
  log(title, 'magenta');
  console.log('='.repeat(50));
}

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      timeout: config.timeout,
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Test Functions
async function testRoutes() {
  logHeader('TESTING APPLICATION ROUTES');
  
  const routes = [
    // Main pages
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/services/water-damage', name: 'Water Damage' },
    { path: '/services/fire-damage', name: 'Fire Damage' },
    { path: '/services/mould-remediation', name: 'Mould Remediation' },
    { path: '/services/commercial', name: 'Commercial Services' },
    
    // Technology pages
    { path: '/technology', name: 'Technology' },
    { path: '/technology/ai', name: 'AI Detection' },
    { path: '/technology/thermal', name: 'Thermal Imaging' },
    { path: '/technology/hepa', name: 'HEPA Systems' },
    
    // Legal pages
    { path: '/legal', name: 'Legal' },
    { path: '/legal/core-business', name: 'Core Business Documents' },
    { path: '/legal/contractor-network', name: 'Contractor Documents' },
    { path: '/legal/client-facing', name: 'Client Documents' },
    { path: '/legal/financial-payment', name: 'Financial Documents' },
    { path: '/legal/affiliate-marketing', name: 'Marketing Documents' },
    { path: '/legal/platform-technology', name: 'Technology Documents' },
    { path: '/legal/compliance-industry', name: 'Compliance Documents' },
    { path: '/legal/governance', name: 'Governance Documents' },
    
    // Other pages
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
    { path: '/pitch', name: 'Pitch Deck' },
    { path: '/contractor', name: 'Contractor Portal' },
    { path: '/contractor/apply', name: 'Contractor Application' },
    { path: '/partners/clean-claims', name: 'Clean Claims Partner' },
    { path: '/emergency-guide', name: 'Emergency Guide' },
    { path: '/insurance', name: 'Insurance' },
    { path: '/faq', name: 'FAQ' }
  ];
  
  results.tests.routes.total = routes.length;
  
  for (const route of routes) {
    try {
      const response = await makeRequest(`${config.baseUrl}${route.path}`);
      
      if (response.statusCode === 200) {
        log(`✓ ${route.name} (${route.path}) - OK`, 'green');
        results.tests.routes.passed++;
        results.tests.routes.details.push({
          path: route.path,
          name: route.name,
          status: 'passed',
          statusCode: response.statusCode
        });
      } else if (response.statusCode === 404) {
        log(`✗ ${route.name} (${route.path}) - 404 Not Found`, 'red');
        results.tests.routes.failed++;
        results.errors.push(`404 Not Found: ${route.path}`);
        results.tests.routes.details.push({
          path: route.path,
          name: route.name,
          status: 'failed',
          statusCode: response.statusCode,
          error: '404 Not Found'
        });
      } else {
        log(`⚠ ${route.name} (${route.path}) - Status ${response.statusCode}`, 'yellow');
        results.warnings.push(`Unexpected status ${response.statusCode}: ${route.path}`);
      }
    } catch (error) {
      log(`✗ ${route.name} (${route.path}) - Error: ${error.message}`, 'red');
      results.tests.routes.failed++;
      results.errors.push(`Failed to test ${route.path}: ${error.message}`);
    }
  }
  
  log(`\nRoutes Summary: ${results.tests.routes.passed}/${results.tests.routes.total} passed`, 'cyan');
}

async function testAssets() {
  logHeader('TESTING STATIC ASSETS');
  
  const assets = [
    // Logos
    { path: '/logos/3D Disaster Recovery Logo Image.png', name: 'Main Logo' },
    { path: '/logos/3D NRP Logo.png', name: 'NRP Logo' },
    { path: '/logos/3D Clean Claims.png', name: 'Clean Claims Logo' },
    
    // Social media icons
    { path: '/images/logos/3D Facebook.png', name: 'Facebook Icon' },
    { path: '/images/logos/3D Instagram.png', name: 'Instagram Icon' },
    { path: '/images/logos/3D LinkedIn.png', name: 'LinkedIn Icon' },
    { path: '/images/logos/3D YouTube.png', name: 'YouTube Icon' },
    
    // Other assets
    { path: '/favicon.ico', name: 'Favicon' },
    { path: '/manifest.json', name: 'Web Manifest' },
    { path: '/robots.txt', name: 'Robots.txt' }
  ];
  
  results.tests.assets.total = assets.length;
  
  for (const asset of assets) {
    try {
      const response = await makeRequest(`${config.baseUrl}${asset.path}`, {
        method: 'HEAD'
      });
      
      if (response.statusCode === 200) {
        log(`✓ ${asset.name} - OK`, 'green');
        results.tests.assets.passed++;
      } else if (response.statusCode === 404) {
        log(`✗ ${asset.name} - Missing`, 'red');
        results.tests.assets.failed++;
        results.errors.push(`Missing asset: ${asset.path}`);
      } else {
        log(`⚠ ${asset.name} - Status ${response.statusCode}`, 'yellow');
        results.warnings.push(`Asset issue ${response.statusCode}: ${asset.path}`);
      }
    } catch (error) {
      log(`✗ ${asset.name} - Error: ${error.message}`, 'red');
      results.tests.assets.failed++;
    }
  }
  
  log(`\nAssets Summary: ${results.tests.assets.passed}/${results.tests.assets.total} passed`, 'cyan');
}

async function testAPIEndpoints() {
  logHeader('TESTING API ENDPOINTS');
  
  const endpoints = [
    { path: '/api/health', method: 'GET', name: 'Health Check' },
    { path: '/api/contractor/validate', method: 'POST', name: 'Contractor Validation' }
  ];
  
  results.tests.api.total = endpoints.length;
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${config.baseUrl}${endpoint.path}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.statusCode === 200 || response.statusCode === 201) {
        log(`✓ ${endpoint.name} - OK`, 'green');
        results.tests.api.passed++;
      } else if (response.statusCode === 404) {
        log(`⚠ ${endpoint.name} - Not Implemented`, 'yellow');
        results.warnings.push(`API endpoint not implemented: ${endpoint.path}`);
      } else {
        log(`✗ ${endpoint.name} - Status ${response.statusCode}`, 'red');
        results.tests.api.failed++;
      }
    } catch (error) {
      log(`✗ ${endpoint.name} - Error: ${error.message}`, 'red');
      results.tests.api.failed++;
    }
  }
  
  log(`\nAPI Summary: ${results.tests.api.passed}/${results.tests.api.total} passed`, 'cyan');
}

async function testSEO() {
  logHeader('TESTING SEO ELEMENTS');
  
  try {
    const response = await makeRequest(config.baseUrl);
    const html = response.body;
    
    const seoChecks = [
      { name: 'Title Tag', pattern: /<title>.*<\/title>/ },
      { name: 'Meta Description', pattern: /<meta name="description"/ },
      { name: 'Meta Keywords', pattern: /<meta name="keywords"/ },
      { name: 'Open Graph Title', pattern: /<meta property="og:title"/ },
      { name: 'Open Graph Description', pattern: /<meta property="og:description"/ },
      { name: 'Open Graph Image', pattern: /<meta property="og:image"/ },
      { name: 'Twitter Card', pattern: /<meta name="twitter:card"/ },
      { name: 'Viewport Meta', pattern: /<meta name="viewport"/ },
      { name: 'Canonical Link', pattern: /<link rel="canonical"/ },
      { name: 'Structured Data', pattern: /<script type="application\/ld\+json">/ }
    ];
    
    for (const check of seoChecks) {
      if (check.pattern.test(html)) {
        log(`✓ ${check.name} - Found`, 'green');
        results.tests.seo.passed++;
      } else {
        log(`✗ ${check.name} - Missing`, 'red');
        results.tests.seo.failed++;
        results.errors.push(`Missing SEO element: ${check.name}`);
      }
    }
    
    // Check for H1 tag
    const h1Match = html.match(/<h1/g);
    if (h1Match && h1Match.length === 1) {
      log(`✓ Single H1 Tag - OK`, 'green');
      results.tests.seo.passed++;
    } else if (h1Match && h1Match.length > 1) {
      log(`⚠ Multiple H1 Tags - ${h1Match.length} found`, 'yellow');
      results.warnings.push(`Multiple H1 tags found: ${h1Match.length}`);
    } else {
      log(`✗ No H1 Tag`, 'red');
      results.tests.seo.failed++;
    }
    
  } catch (error) {
    log(`✗ Failed to test SEO: ${error.message}`, 'red');
  }
  
  log(`\nSEO Summary: ${results.tests.seo.passed} passed, ${results.tests.seo.failed} failed`, 'cyan');
}

async function testPerformance() {
  logHeader('TESTING PERFORMANCE');
  
  const measurements = [];
  const testRuns = 3;
  
  log(`Running ${testRuns} performance tests...`, 'cyan');
  
  for (let i = 1; i <= testRuns; i++) {
    const startTime = Date.now();
    
    try {
      await makeRequest(config.baseUrl);
      const loadTime = Date.now() - startTime;
      measurements.push(loadTime);
      
      if (loadTime < 1000) {
        log(`  Run ${i}: ${loadTime}ms - Excellent`, 'green');
      } else if (loadTime < 3000) {
        log(`  Run ${i}: ${loadTime}ms - Good`, 'yellow');
      } else {
        log(`  Run ${i}: ${loadTime}ms - Slow`, 'red');
        results.warnings.push(`Slow load time: ${loadTime}ms`);
      }
    } catch (error) {
      log(`  Run ${i}: Failed - ${error.message}`, 'red');
    }
  }
  
  if (measurements.length > 0) {
    const avgLoadTime = Math.round(measurements.reduce((a, b) => a + b) / measurements.length);
    const minLoadTime = Math.min(...measurements);
    const maxLoadTime = Math.max(...measurements);
    
    results.tests.performance.metrics = {
      average: avgLoadTime,
      min: minLoadTime,
      max: maxLoadTime,
      measurements: measurements
    };
    
    log(`\nPerformance Summary:`, 'cyan');
    log(`  Average: ${avgLoadTime}ms`);
    log(`  Min: ${minLoadTime}ms`);
    log(`  Max: ${maxLoadTime}ms`);
  }
}

async function findBrokenLinks() {
  logHeader('SCANNING FOR BROKEN LINKS');
  
  try {
    const response = await makeRequest(config.baseUrl);
    const html = response.body;
    
    // Extract all links
    const linkPattern = /href=["']([^"']+)["']/g;
    const links = [];
    let match;
    
    while ((match = linkPattern.exec(html)) !== null) {
      const link = match[1];
      if (!link.startsWith('#') && !link.startsWith('mailto:') && !link.startsWith('tel:')) {
        links.push(link);
      }
    }
    
    // Remove duplicates
    const uniqueLinks = [...new Set(links)];
    results.tests.links.total = uniqueLinks.length;
    
    log(`Found ${uniqueLinks.length} unique links to check...`, 'cyan');
    
    // Test internal links only
    for (const link of uniqueLinks) {
      if (link.startsWith('/') || link.startsWith(config.baseUrl)) {
        const fullUrl = link.startsWith('http') ? link : `${config.baseUrl}${link}`;
        
        try {
          const response = await makeRequest(fullUrl, { method: 'HEAD' });
          
          if (response.statusCode === 200) {
            results.tests.links.passed++;
          } else if (response.statusCode === 404) {
            log(`  ✗ Broken link: ${link}`, 'red');
            results.tests.links.failed++;
            results.tests.links.broken.push(link);
          }
        } catch (error) {
          // Skip external links that might fail
        }
      }
    }
    
    if (results.tests.links.broken.length > 0) {
      log(`\n${results.tests.links.broken.length} broken links found`, 'red');
    } else {
      log(`\n✓ No broken links found`, 'green');
    }
    
  } catch (error) {
    log(`✗ Failed to scan links: ${error.message}`, 'red');
  }
}

async function generateReport() {
  logHeader('GENERATING HEALTH CHECK REPORT');
  
  // Calculate summary
  results.summary = {
    totalTests: 
      results.tests.routes.total + 
      results.tests.assets.total + 
      results.tests.api.total +
      results.tests.seo.passed + results.tests.seo.failed,
    totalPassed: 
      results.tests.routes.passed + 
      results.tests.assets.passed + 
      results.tests.api.passed +
      results.tests.seo.passed,
    totalFailed: 
      results.tests.routes.failed + 
      results.tests.assets.failed + 
      results.tests.api.failed +
      results.tests.seo.failed,
    totalErrors: results.errors.length,
    totalWarnings: results.warnings.length,
    overallStatus: 'UNKNOWN'
  };
  
  // Determine overall status
  if (results.summary.totalErrors === 0 && results.summary.totalWarnings === 0) {
    results.summary.overallStatus = 'HEALTHY';
  } else if (results.summary.totalErrors < 5) {
    results.summary.overallStatus = 'NEEDS_ATTENTION';
  } else {
    results.summary.overallStatus = 'CRITICAL';
  }
  
  // Create output directory
  try {
    await fs.mkdir(config.outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  // Save JSON report
  const jsonPath = path.join(config.outputDir, `health-check-${Date.now()}.json`);
  await fs.writeFile(jsonPath, JSON.stringify(results, null, 2));
  log(`\n✓ JSON report saved to: ${jsonPath}`, 'green');
  
  // Generate text report
  const textReport = `
DISASTER RECOVERY HEALTH CHECK REPORT
=====================================
Generated: ${results.timestamp}
Environment: Node ${results.environment.nodeVersion} on ${results.environment.platform}
Base URL: ${results.environment.baseUrl}

TEST RESULTS
============
Routes: ${results.tests.routes.passed}/${results.tests.routes.total} passed
Assets: ${results.tests.assets.passed}/${results.tests.assets.total} passed
API Endpoints: ${results.tests.api.passed}/${results.tests.api.total} passed
SEO Elements: ${results.tests.seo.passed} passed, ${results.tests.seo.failed} failed
Broken Links: ${results.tests.links.broken.length} found

PERFORMANCE
===========
Average Load Time: ${results.tests.performance.metrics.average || 'N/A'}ms
Min Load Time: ${results.tests.performance.metrics.min || 'N/A'}ms
Max Load Time: ${results.tests.performance.metrics.max || 'N/A'}ms

ISSUES
======
Errors (${results.errors.length}):
${results.errors.map(e => `- ${e}`).join('\n') || 'None'}

Warnings (${results.warnings.length}):
${results.warnings.map(w => `- ${w}`).join('\n') || 'None'}

OVERALL STATUS: ${results.summary.overallStatus}
=====================================
`;
  
  const textPath = path.join(config.outputDir, `health-check-${Date.now()}.txt`);
  await fs.writeFile(textPath, textReport);
  log(`✓ Text report saved to: ${textPath}`, 'green');
  
  // Display summary
  console.log(textReport);
  
  // Return status code
  if (results.summary.overallStatus === 'HEALTHY') {
    log('\n✓ Health check completed successfully!', 'green');
    process.exit(0);
  } else if (results.summary.overallStatus === 'NEEDS_ATTENTION') {
    log('\n⚠ Health check completed with warnings', 'yellow');
    process.exit(1);
  } else {
    log('\n✗ Health check failed with critical issues', 'red');
    process.exit(2);
  }
}

// Main execution
async function runHealthCheck() {
  console.log(colors.bright + '\n🏥 DISASTER RECOVERY HEALTH CHECK SYSTEM 🏥' + colors.reset);
  console.log('Starting comprehensive health check...\n');
  
  try {
    await testRoutes();
    await testAssets();
    await testAPIEndpoints();
    await testSEO();
    await testPerformance();
    await findBrokenLinks();
    await generateReport();
  } catch (error) {
    log(`\n✗ Health check failed: ${error.message}`, 'red');
    results.errors.push(`Fatal error: ${error.message}`);
    await generateReport();
  }
}

// Run if executed directly
if (require.main === module) {
  runHealthCheck();
}

module.exports = { runHealthCheck, results };