#!/usr/bin/env node

/**
 * Performance Budget Checker
 *
 * Validates that the build meets performance budgets:
 * - Bundle sizes
 * - Asset counts
 * - Total page weight
 */

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

// Performance budgets (in KB)
const BUDGETS = {
  javascript: 300,
  css: 100,
  images: 500,
  fonts: 100,
  total: 2000,
}

// Asset count limits
const COUNT_LIMITS = {
  javascript: 20,
  css: 5,
  images: 30,
  fonts: 4,
}

async function getDirectorySize(dirPath) {
  let totalSize = 0
  let fileCount = 0

  try {
    const files = await readdir(dirPath, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(dirPath, file.name)

      if (file.isDirectory()) {
        const { size, count } = await getDirectorySize(filePath)
        totalSize += size
        fileCount += count
      } else {
        const stats = await stat(filePath)
        totalSize += stats.size
        fileCount++
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dirPath}`)
  }

  return { size: totalSize, count: fileCount }
}

async function analyzeBuild() {
  const buildDir = path.join(process.cwd(), '.next')

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run `npm run build` first.')
    process.exit(1)
  }

  console.log('📊 Analyzing build performance...\n')

  const results = {
    javascript: { size: 0, count: 0 },
    css: { size: 0, count: 0 },
    images: { size: 0, count: 0 },
    fonts: { size: 0, count: 0 },
    total: { size: 0, count: 0 },
  }

  // Analyze static assets
  const staticDir = path.join(buildDir, 'static')
  if (fs.existsSync(staticDir)) {
    const { size, count } = await getDirectorySize(staticDir)
    results.total.size += size
    results.total.count += count

    // Analyze JS
    const jsDir = path.join(staticDir, 'chunks')
    if (fs.existsSync(jsDir)) {
      const { size, count } = await getDirectorySize(jsDir)
      results.javascript.size = size
      results.javascript.count = count
    }

    // Analyze CSS
    const cssDir = path.join(staticDir, 'css')
    if (fs.existsSync(cssDir)) {
      const { size, count } = await getDirectorySize(cssDir)
      results.css.size = size
      results.css.count = count
    }

    // Analyze media
    const mediaDir = path.join(staticDir, 'media')
    if (fs.existsSync(mediaDir)) {
      const { size, count } = await getDirectorySize(mediaDir)
      results.images.size = size
      results.images.count = count
    }
  }

  // Display results
  console.log('📦 Bundle Sizes:\n')

  const formatSize = (bytes) => {
    const kb = bytes / 1024
    return kb.toFixed(2) + ' KB'
  }

  const checkBudget = (type, size, budget) => {
    const sizeKB = size / 1024
    const percentage = (sizeKB / budget) * 100
    const status = sizeKB <= budget ? '✅' : '❌'
    const color = sizeKB <= budget ? '\x1b[32m' : '\x1b[31m'
    const reset = '\x1b[0m'

    console.log(
      `${status} ${type.padEnd(15)} ${color}${formatSize(size).padEnd(
        12
      )}${reset} / ${budget} KB (${percentage.toFixed(1)}%)`
    )

    return sizeKB <= budget
  }

  let passed = true

  passed &= checkBudget('JavaScript', results.javascript.size, BUDGETS.javascript)
  passed &= checkBudget('CSS', results.css.size, BUDGETS.css)
  passed &= checkBudget('Images', results.images.size, BUDGETS.images)
  passed &= checkBudget('Fonts', results.fonts.size, BUDGETS.fonts)
  passed &= checkBudget('Total', results.total.size, BUDGETS.total)

  console.log('\n📝 Asset Counts:\n')

  const checkCount = (type, count, limit) => {
    const status = count <= limit ? '✅' : '❌'
    const color = count <= limit ? '\x1b[32m' : '\x1b[31m'
    const reset = '\x1b[0m'

    console.log(
      `${status} ${type.padEnd(15)} ${color}${count
        .toString()
        .padEnd(5)}${reset} / ${limit} files`
    )

    return count <= limit
  }

  passed &= checkCount('JavaScript', results.javascript.count, COUNT_LIMITS.javascript)
  passed &= checkCount('CSS', results.css.count, COUNT_LIMITS.css)
  passed &= checkCount('Images', results.images.count, COUNT_LIMITS.images)
  passed &= checkCount('Fonts', results.fonts.count, COUNT_LIMITS.fonts)

  console.log('\n' + '='.repeat(50))

  if (passed) {
    console.log('\n✅ Performance budget check PASSED!\n')
    process.exit(0)
  } else {
    console.log('\n❌ Performance budget check FAILED!\n')
    console.log('Please optimize your bundle to meet the performance budgets.')
    console.log('\nTips:')
    console.log('- Use dynamic imports for heavy components')
    console.log('- Optimize images (WebP, AVIF formats)')
    console.log('- Remove unused dependencies')
    console.log('- Split large chunks')
    console.log('- Use next/font for font optimization')
    console.log('\nRun `npm run build:analyze` to see bundle composition.\n')
    process.exit(1)
  }
}

analyzeBuild().catch((error) => {
  console.error('Error analyzing build:', error)
  process.exit(1)
})
