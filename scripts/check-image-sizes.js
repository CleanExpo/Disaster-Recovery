#!/usr/bin/env node

/**
 * IMAGE SIZE AND PERFORMANCE CHECKER
 * ===================================
 * 
 * Analyzes all images and provides performance recommendations
 * Ensures images meet mobile performance requirements
 */

const fs = require('fs').promises;
const path = require('path');

const PERFORMANCE_BUDGETS = {
  mobile: {
    maxSizeKB: 100,
    criticalMaxKB: 150,
    warningThresholdKB: 75
  },
  tablet: {
    maxSizeKB: 200,
    criticalMaxKB: 300,
    warningThresholdKB: 150
  },
  desktop: {
    maxSizeKB: 500,
    criticalMaxKB: 750,
    warningThresholdKB: 400
  }
};

const RECOMMENDATIONS = {
  tooLarge: 'Consider further compression or using WebP format',
  noWebP: 'Generate WebP version for better compression',
  noResponsive: 'Create responsive variants for different screen sizes',
  missingWatermark: 'Add NRP watermark to maintain brand consistency',
  poorAspectRatio: 'Consider cropping to standard aspect ratios (16:9, 4:3, 1:1)'
};

/**
 * Get all image files
 */
async function getAllImages(dir) {
  const images = [];
  
  async function scan(currentDir) {
    try {
      const items = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item.name);
        
        if (item.isDirectory() && !item.name.includes('node_modules')) {
          await scan(fullPath);
        } else if (item.isFile()) {
          const ext = path.extname(item.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
            const stats = await fs.stat(fullPath);
            images.push({
              path: fullPath,
              name: item.name,
              sizeKB: Math.round(stats.size / 1024),
              format: ext.replace('.', '')
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Could not access ${currentDir}: ${error.message}`);
    }
  }
  
  await scan(dir);
  return images;
}

/**
 * Categorize images
 */
function categorizeImage(imagePath) {
  const pathLower = imagePath.toLowerCase();
  
  if (pathLower.includes('hero') || pathLower.includes('banner')) {
    return { category: 'hero', device: 'desktop', critical: true };
  }
  if (pathLower.includes('training')) {
    return { category: 'training', device: 'mobile', critical: false };
  }
  if (pathLower.includes('icon') || pathLower.includes('badge')) {
    return { category: 'icon', device: 'mobile', critical: false };
  }
  if (pathLower.includes('thumb')) {
    return { category: 'thumbnail', device: 'mobile', critical: false };
  }
  if (pathLower.includes('logo')) {
    return { category: 'branding', device: 'all', critical: true };
  }
  
  return { category: 'general', device: 'desktop', critical: false };
}

/**
 * Check if image has responsive variants
 */
function hasResponsiveVariants(images, baseName) {
  const variants = ['-640w', '-1024w', '-1920w', '-3840w'];
  return variants.some(suffix => 
    images.some(img => img.name.includes(baseName.replace(/\.[^.]+$/, '') + suffix))
  );
}

/**
 * Check if image has WebP version
 */
function hasWebPVersion(images, baseName) {
  const nameWithoutExt = baseName.replace(/\.[^.]+$/, '');
  return images.some(img => img.name.startsWith(nameWithoutExt) && img.format === 'webp');
}

/**
 * Analyze images and generate report
 */
async function analyzeImages() {
  console.log('🔍 Analyzing image performance...\n');
  
  const publicDir = path.join(__dirname, '../public');
  const images = await getAllImages(publicDir);
  
  if (images.length === 0) {
    console.log('No images found in public directory.');
    return;
  }
  
  console.log(`Found ${images.length} images\n`);
  
  const issues = {
    tooLarge: [],
    noWebP: [],
    noResponsive: [],
    critical: []
  };
  
  const stats = {
    totalSizeKB: 0,
    largestImage: null,
    formatCounts: {},
    categoryBreakdown: {}
  };
  
  // Analyze each image
  for (const image of images) {
    const { category, device, critical } = categorizeImage(image.path);
    const budget = PERFORMANCE_BUDGETS[device];
    
    // Update stats
    stats.totalSizeKB += image.sizeKB;
    stats.formatCounts[image.format] = (stats.formatCounts[image.format] || 0) + 1;
    stats.categoryBreakdown[category] = (stats.categoryBreakdown[category] || 0) + 1;
    
    if (!stats.largestImage || image.sizeKB > stats.largestImage.sizeKB) {
      stats.largestImage = image;
    }
    
    // Check size against budget
    if (image.sizeKB > budget.maxSizeKB) {
      issues.tooLarge.push({
        ...image,
        category,
        device,
        budget: budget.maxSizeKB,
        overBy: image.sizeKB - budget.maxSizeKB
      });
      
      if (critical && image.sizeKB > budget.criticalMaxKB) {
        issues.critical.push({
          ...image,
          reason: `Critical image exceeds ${budget.criticalMaxKB}KB limit`
        });
      }
    }
    
    // Check for WebP version
    if (image.format !== 'webp' && !hasWebPVersion(images, image.name)) {
      issues.noWebP.push(image);
    }
    
    // Check for responsive variants (skip icons and small images)
    if (category !== 'icon' && image.sizeKB > 50 && !hasResponsiveVariants(images, image.name)) {
      issues.noResponsive.push(image);
    }
  }
  
  // Generate report
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                    PERFORMANCE REPORT                      ');
  console.log('═══════════════════════════════════════════════════════════');
  
  console.log('\n📊 OVERALL STATISTICS');
  console.log('─────────────────────');
  console.log(`Total images: ${images.length}`);
  console.log(`Total size: ${(stats.totalSizeKB / 1024).toFixed(2)} MB`);
  console.log(`Average size: ${Math.round(stats.totalSizeKB / images.length)} KB`);
  console.log(`Largest image: ${stats.largestImage.name} (${stats.largestImage.sizeKB} KB)`);
  
  console.log('\n📁 FORMAT BREAKDOWN');
  console.log('──────────────────');
  for (const [format, count] of Object.entries(stats.formatCounts)) {
    const percentage = ((count / images.length) * 100).toFixed(1);
    console.log(`${format.toUpperCase()}: ${count} images (${percentage}%)`);
  }
  
  console.log('\n📂 CATEGORY BREAKDOWN');
  console.log('────────────────────');
  for (const [category, count] of Object.entries(stats.categoryBreakdown)) {
    console.log(`${category}: ${count} images`);
  }
  
  // Critical issues
  if (issues.critical.length > 0) {
    console.log('\n⛔ CRITICAL ISSUES (Immediate attention required)');
    console.log('─────────────────────────────────────────────────');
    for (const issue of issues.critical) {
      console.log(`❌ ${issue.name}: ${issue.reason}`);
    }
  }
  
  // Large images
  if (issues.tooLarge.length > 0) {
    console.log('\n⚠️  OVERSIZED IMAGES');
    console.log('───────────────────');
    console.log(`Found ${issues.tooLarge.length} images exceeding performance budgets:\n`);
    
    // Sort by how much they exceed budget
    issues.tooLarge.sort((a, b) => b.overBy - a.overBy);
    
    // Show top 10
    for (const image of issues.tooLarge.slice(0, 10)) {
      const relativePath = path.relative(publicDir, image.path);
      console.log(`  ${relativePath}`);
      console.log(`    Size: ${image.sizeKB}KB (Budget: ${image.budget}KB, Over by: ${image.overBy}KB)`);
      console.log(`    Device: ${image.device}, Category: ${image.category}`);
      console.log(`    💡 ${RECOMMENDATIONS.tooLarge}`);
      console.log('');
    }
    
    if (issues.tooLarge.length > 10) {
      console.log(`  ... and ${issues.tooLarge.length - 10} more\n`);
    }
  }
  
  // Missing WebP
  if (issues.noWebP.length > 0) {
    console.log('\n📸 MISSING WEBP VERSIONS');
    console.log('───────────────────────');
    console.log(`${issues.noWebP.length} images don't have WebP versions:`);
    
    for (const image of issues.noWebP.slice(0, 5)) {
      const relativePath = path.relative(publicDir, image.path);
      console.log(`  • ${relativePath}`);
    }
    
    if (issues.noWebP.length > 5) {
      console.log(`  ... and ${issues.noWebP.length - 5} more`);
    }
    console.log(`\n  💡 ${RECOMMENDATIONS.noWebP}`);
  }
  
  // Missing responsive variants
  if (issues.noResponsive.length > 0) {
    console.log('\n📱 MISSING RESPONSIVE VARIANTS');
    console.log('─────────────────────────────');
    console.log(`${issues.noResponsive.length} images don't have responsive variants:`);
    
    for (const image of issues.noResponsive.slice(0, 5)) {
      const relativePath = path.relative(publicDir, image.path);
      console.log(`  • ${relativePath}`);
    }
    
    if (issues.noResponsive.length > 5) {
      console.log(`  ... and ${issues.noResponsive.length - 5} more`);
    }
    console.log(`\n  💡 ${RECOMMENDATIONS.noResponsive}`);
  }
  
  // Performance score
  const score = calculatePerformanceScore(images, issues);
  
  console.log('\n🎯 PERFORMANCE SCORE');
  console.log('───────────────────');
  console.log(`Overall Score: ${score}/100`);
  
  if (score >= 90) {
    console.log('✅ Excellent! Images are well optimized.');
  } else if (score >= 70) {
    console.log('⚠️  Good, but there's room for improvement.');
  } else if (score >= 50) {
    console.log('⚠️  Fair. Significant optimization needed for better performance.');
  } else {
    console.log('❌ Poor. Urgent optimization required for acceptable performance.');
  }
  
  // Mobile readiness
  console.log('\n📱 MOBILE READINESS');
  console.log('──────────────────');
  const mobileImages = images.filter(img => {
    const { device } = categorizeImage(img.path);
    return device === 'mobile';
  });
  
  const mobileSizeKB = mobileImages.reduce((sum, img) => sum + img.sizeKB, 0);
  const avgMobileSize = mobileImages.length > 0 ? Math.round(mobileSizeKB / mobileImages.length) : 0;
  
  console.log(`Mobile images: ${mobileImages.length}`);
  console.log(`Average mobile image size: ${avgMobileSize}KB`);
  console.log(`Mobile budget: ${PERFORMANCE_BUDGETS.mobile.maxSizeKB}KB per image`);
  
  if (avgMobileSize <= PERFORMANCE_BUDGETS.mobile.maxSizeKB) {
    console.log('✅ Mobile images are within budget');
  } else {
    console.log(`⚠️  Mobile images exceed budget by ${avgMobileSize - PERFORMANCE_BUDGETS.mobile.maxSizeKB}KB on average`);
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('─────────────────');
  
  if (issues.tooLarge.length > 0) {
    console.log('1. Run `npm run optimize:images` to compress oversized images');
  }
  if (issues.noWebP.length > 0) {
    console.log('2. Generate WebP versions for better compression (25-35% smaller)');
  }
  if (issues.noResponsive.length > 0) {
    console.log('3. Create responsive image variants for different screen sizes');
  }
  if (score < 90) {
    console.log('4. Consider lazy loading for below-the-fold images');
    console.log('5. Use CDN for faster global delivery');
  }
  
  console.log('\n✓ All images should include NRP watermark for brand consistency');
  console.log('✓ Training images must be optimized for mobile data usage');
  
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

/**
 * Calculate performance score
 */
function calculatePerformanceScore(images, issues) {
  let score = 100;
  
  // Deduct for oversized images
  score -= Math.min(30, issues.tooLarge.length * 2);
  
  // Deduct for missing WebP
  score -= Math.min(20, issues.noWebP.length * 0.5);
  
  // Deduct for missing responsive variants
  score -= Math.min(20, issues.noResponsive.length * 0.5);
  
  // Deduct for critical issues
  score -= issues.critical.length * 10;
  
  // Bonus for good format distribution
  const webpCount = images.filter(img => img.format === 'webp').length;
  const webpPercentage = (webpCount / images.length) * 100;
  if (webpPercentage > 50) {
    score += 5;
  }
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

// Run analysis
analyzeImages().catch(console.error);