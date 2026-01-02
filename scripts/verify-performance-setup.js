#!/usr/bin/env node

/**
 * Performance Setup Verification Script
 *
 * Verifies that all performance optimization components are properly configured
 */

const fs = require('fs')
const path = require('path')

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const RESET = '\x1b[0m'

let errors = 0
let warnings = 0
let passed = 0

function check(description, test) {
  try {
    if (test()) {
      console.log(`${GREEN}✓${RESET} ${description}`)
      passed++
      return true
    } else {
      console.log(`${RED}✗${RESET} ${description}`)
      errors++
      return false
    }
  } catch (error) {
    console.log(`${RED}✗${RESET} ${description} - ${error.message}`)
    errors++
    return false
  }
}

function warn(description) {
  console.log(`${YELLOW}⚠${RESET} ${description}`)
  warnings++
}

console.log('\n🔍 Performance Setup Verification\n')
console.log('=' .repeat(50))
console.log('\n1. Configuration Files\n')

// Check next.config.mjs
check('next.config.mjs exists', () => {
  return fs.existsSync(path.join(process.cwd(), 'next.config.mjs'))
})

check('next.config.mjs has image optimization', () => {
  const config = fs.readFileSync(
    path.join(process.cwd(), 'next.config.mjs'),
    'utf8'
  )
  return config.includes('formats') && config.includes('image/avif')
})

check('next.config.mjs has code splitting', () => {
  const config = fs.readFileSync(
    path.join(process.cwd(), 'next.config.mjs'),
    'utf8'
  )
  return config.includes('splitChunks')
})

check('next.config.mjs has bundle analyzer', () => {
  const config = fs.readFileSync(
    path.join(process.cwd(), 'next.config.mjs'),
    'utf8'
  )
  return config.includes('BundleAnalyzerPlugin')
})

// Check vercel.json
check('vercel.json exists', () => {
  return fs.existsSync(path.join(process.cwd(), 'vercel.json'))
})

check('vercel.json has cache headers', () => {
  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')
  )
  return config.headers && config.headers.length > 0
})

// Check lighthouserc.json
check('lighthouserc.json exists', () => {
  return fs.existsSync(path.join(process.cwd(), 'lighthouserc.json'))
})

check('lighthouserc.json has performance assertions', () => {
  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'lighthouserc.json'), 'utf8')
  )
  return (
    config.ci &&
    config.ci.assert &&
    config.ci.assert.assertions &&
    config.ci.assert.assertions['largest-contentful-paint']
  )
})

// Check performance-budget.json
check('performance-budget.json exists', () => {
  return fs.existsSync(path.join(process.cwd(), 'performance-budget.json'))
})

console.log('\n2. Library Files\n')

// Check web-vitals.ts
check('web-vitals.ts exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'src/lib/performance/web-vitals.ts')
  )
})

check('web-vitals.ts exports initWebVitals', () => {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/performance/web-vitals.ts'),
    'utf8'
  )
  return content.includes('export function initWebVitals')
})

// Check image-optimizer.tsx
check('image-optimizer.tsx exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'src/lib/performance/image-optimizer.tsx')
  )
})

check('image-optimizer.tsx exports OptimizedImage', () => {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/performance/image-optimizer.tsx'),
    'utf8'
  )
  return content.includes('export function OptimizedImage')
})

// Check code-splitting.tsx
check('code-splitting.tsx exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'src/lib/performance/code-splitting.tsx')
  )
})

check('code-splitting.tsx exports createDynamicComponent', () => {
  const content = fs.readFileSync(
    path.join(process.cwd(), 'src/lib/performance/code-splitting.tsx'),
    'utf8'
  )
  return content.includes('export function createDynamicComponent')
})

console.log('\n3. Components\n')

// Check PerformanceMonitor.tsx
check('PerformanceMonitor.tsx exists', () => {
  return fs.existsSync(
    path.join(
      process.cwd(),
      'src/components/performance/PerformanceMonitor.tsx'
    )
  )
})

console.log('\n4. API Routes\n')

// Check web-vitals API route
check('web-vitals API route exists', () => {
  return fs.existsSync(
    path.join(
      process.cwd(),
      'src/app/api/analytics/web-vitals/route.ts'
    )
  )
})

check('web-vitals API route exports POST', () => {
  const content = fs.readFileSync(
    path.join(
      process.cwd(),
      'src/app/api/analytics/web-vitals/route.ts'
    ),
    'utf8'
  )
  return content.includes('export async function POST')
})

console.log('\n5. Scripts\n')

// Check performance budget script
check('check-performance-budget.js exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'scripts/check-performance-budget.js')
  )
})

console.log('\n6. GitHub Workflows\n')

// Check Lighthouse CI workflow
check('lighthouse-ci.yml exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), '.github/workflows/lighthouse-ci.yml')
  )
})

check('lighthouse-ci.yml has performance job', () => {
  const content = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/lighthouse-ci.yml'),
    'utf8'
  )
  return content.includes('lighthouse:') && content.includes('lhci autorun')
})

console.log('\n7. Dependencies\n')

// Check package.json
check('package.json has @lhci/cli', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return (
    pkg.devDependencies && pkg.devDependencies['@lhci/cli']
  )
})

check('package.json has @next/bundle-analyzer', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return (
    pkg.devDependencies && pkg.devDependencies['@next/bundle-analyzer']
  )
})

check('package.json has web-vitals', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return (
    pkg.devDependencies && pkg.devDependencies['web-vitals']
  )
})

console.log('\n8. NPM Scripts\n')

check('package.json has perf:lighthouse script', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return pkg.scripts && pkg.scripts['perf:lighthouse']
})

check('package.json has perf:budget script', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return pkg.scripts && pkg.scripts['perf:budget']
})

check('package.json has build:analyze script', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  )
  return pkg.scripts && pkg.scripts['build:analyze']
})

console.log('\n9. Documentation\n')

// Check documentation
check('PERFORMANCE_OPTIMIZATION.md exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'docs/PERFORMANCE_OPTIMIZATION.md')
  )
})

check('PERFORMANCE.md exists', () => {
  return fs.existsSync(path.join(process.cwd(), 'PERFORMANCE.md'))
})

check('PERFORMANCE_IMPLEMENTATION_SUMMARY.md exists', () => {
  return fs.existsSync(
    path.join(process.cwd(), 'PERFORMANCE_IMPLEMENTATION_SUMMARY.md')
  )
})

// Summary
console.log('\n' + '='.repeat(50))
console.log('\n📊 Verification Summary\n')
console.log(`${GREEN}✓ Passed:${RESET}   ${passed}`)
console.log(`${RED}✗ Failed:${RESET}   ${errors}`)
console.log(`${YELLOW}⚠ Warnings:${RESET} ${warnings}`)

if (errors === 0) {
  console.log(`\n${GREEN}✅ Performance setup is complete and ready!${RESET}\n`)
  console.log('Next steps:')
  console.log('1. Run `npm install` to install dependencies')
  console.log('2. Run `npm run build` to test the build')
  console.log('3. Run `npm run perf:budget` to check budgets')
  console.log('4. Run `npm run perf:lighthouse` for full audit')
  console.log('')
  process.exit(0)
} else {
  console.log(`\n${RED}❌ Performance setup has issues!${RESET}\n`)
  console.log('Please fix the errors above and try again.')
  console.log('')
  process.exit(1)
}
