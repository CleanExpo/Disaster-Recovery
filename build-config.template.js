/**
 * BUILD CONFIGURATION TEMPLATE
 * Prevents common build errors and optimizes deployment
 */

module.exports = {
  // ============================================
  // COMMON BUILD ERROR PREVENTIONS
  // ============================================
  
  buildErrorPrevention: {
    // 1. Function Name Errors
    functionNaming: {
      pattern: /^[A-Z][a-zA-Z0-9]*Page$/,
      example: 'HomePage, AboutPage, CaseStudiesPage',
      avoid: ['hyphen-names', '/slashNames', '123Numbers'],
      autoFix: true
    },
    
    // 2. Import Errors
    imports: {
      noDuplicates: true,
      checkPaths: true,
      cssLocation: '@/styles/',
      allowedAliases: ['@/', '~/', '../', './'],
      autoFix: true
    },
    
    // 3. Export Errors
    exports: {
      requireDefaultForPages: true,
      pattern: 'export default function ComponentName',
      autoFix: true
    },
    
    // 4. TypeScript Errors
    typescript: {
      strict: true,
      noImplicitAny: false, // Allow during migration
      skipLibCheck: true,
      esModuleInterop: true
    }
  },
  
  // ============================================
  // PRE-BUILD CHECKLIST
  // ============================================
  
  preBuildChecklist: [
    {
      name: 'Fix function names',
      command: 'node scripts/pre-build-fix.js',
      required: true
    },
    {
      name: 'Check TypeScript',
      command: 'npx tsc --noEmit',
      required: false
    },
    {
      name: 'Validate imports',
      command: 'node scripts/pre-build-validator.js',
      required: true
    },
    {
      name: 'Check dependencies',
      command: 'npm ls',
      required: false
    },
    {
      name: 'Clean cache',
      command: 'rm -rf .next',
      required: false
    }
  ],
  
  // ============================================
  // VERCEL DEPLOYMENT SETTINGS
  // ============================================
  
  vercelSettings: {
    buildCommand: 'npm run build:production',
    outputDirectory: '.next',
    installCommand: 'npm install --force --legacy-peer-deps',
    
    // Environment variables required
    envVars: [
      'NEXT_PUBLIC_APP_URL',
      'DATABASE_URL',
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL'
    ],
    
    // Build & Development Settings
    nodeVersion: '18.x',
    framework: 'nextjs',
    
    // Ignored build step (if build succeeds locally)
    ignoreBuildErrors: false
  },
  
  // ============================================
  // PACKAGE.JSON SCRIPTS
  // ============================================
  
  scripts: {
    'prebuild': 'node scripts/pre-build-fix.js',
    'build': 'next build',
    'build:production': 'npm run prebuild && next build',
    'build:local': 'SKIP_ENV_VALIDATION=true next build',
    'validate': 'node scripts/pre-build-validator.js',
    'fix': 'node scripts/pre-build-fix.js',
    'fix:all': 'npm run fix && npm run lint:fix'
  },
  
  // ============================================
  // NEXT.CONFIG.JS ESSENTIALS
  // ============================================
  
  nextConfig: {
    // Suppress specific warnings
    typescript: {
      ignoreBuildErrors: false // Set to true only if necessary
    },
    eslint: {
      ignoreDuringBuilds: false // Set to true only if necessary
    },
    
    // Optimize build
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    
    // Image optimization
    images: {
      domains: ['disaster-recovery.vercel.app'],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60 * 60 * 24 * 365
    },
    
    // Redirects for old routes
    async redirects() {
      return [
        {
          source: '/case-studies',
          destination: '/casestudies',
          permanent: true
        }
      ];
    }
  },
  
  // ============================================
  // COMMON BUILD ERROR FIXES
  // ============================================
  
  commonFixes: {
    'Module not found': {
      issue: 'Missing dependency or incorrect import path',
      fix: [
        'Check if module is installed: npm ls <module-name>',
        'Install if missing: npm install <module-name>',
        'Check import path uses correct alias (@/)',
        'Ensure file extension is included if needed'
      ]
    },
    
    'Syntax Error - Invalid function name': {
      issue: 'Function names with special characters',
      fix: [
        'Run: node scripts/pre-build-fix.js',
        'Manually rename functions to PascalCase',
        'Remove hyphens, slashes, and numbers from start'
      ]
    },
    
    'Duplicate import': {
      issue: 'Same module imported twice in import statement',
      fix: [
        'Run: node scripts/pre-build-fix.js',
        'Manually remove duplicate from import statement'
      ]
    },
    
    'Type error': {
      issue: 'TypeScript type checking failed',
      fix: [
        'Add proper types to functions and variables',
        'Use "any" type temporarily if needed',
        'Set typescript.ignoreBuildErrors: true in next.config.js'
      ]
    },
    
    'CSS module not found': {
      issue: 'CSS file not in correct location',
      fix: [
        'Move CSS files to src/styles/',
        'Update import to @/styles/filename.css',
        'Ensure CSS file exists'
      ]
    },
    
    'Export default not found': {
      issue: 'Page component missing default export',
      fix: [
        'Add: export default function PageName() { ... }',
        'Ensure only one default export per file'
      ]
    }
  },
  
  // ============================================
  // AUTO-FIX SCRIPT TEMPLATE
  // ============================================
  
  autoFixTemplate: `
// Add to scripts/auto-fix-build.js
const fs = require('fs').promises;
const path = require('path');

async function autoFix() {
  // 1. Fix all page function names
  const pageFiles = await findFiles('src/app', 'page.tsx');
  for (const file of pageFiles) {
    await fixFunctionName(file);
  }
  
  // 2. Remove duplicate imports
  const allFiles = await findFiles('src', '.tsx');
  for (const file of allFiles) {
    await fixDuplicateImports(file);
  }
  
  // 3. Fix CSS imports
  await moveCssToStyles();
  
  console.log('✅ Auto-fix complete!');
}

autoFix().catch(console.error);
  `,
  
  // ============================================
  // DEPLOYMENT WORKFLOW
  // ============================================
  
  deploymentWorkflow: [
    '1. Run locally: npm run validate',
    '2. Fix issues: npm run fix:all',
    '3. Test build: npm run build:local',
    '4. Commit fixes: git add -A && git commit -m "fix: build errors"',
    '5. Push to GitHub: git push',
    '6. Monitor Vercel deployment',
    '7. If fails, check build logs and repeat'
  ]
};