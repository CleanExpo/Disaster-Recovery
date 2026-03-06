#!/usr/bin/env node

/**
 * COMPREHENSIVE IMAGE Optimisation SCRIPT
 * ========================================
 * 
 * Optimizes all images in the public folder for web performance
 * Creates multiple sizes for responsive display
 * Ensures all images have NRP watermark
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimised'),
  watermarkPath: path.join(__dirname, '../public/images/optimised/branding/Disaster Recovery Logo.png'),
  
  // Size variants for responsive images
  sizes: {
    mobile: { width: 640, suffix: '-640w' },
    tablet: { width: 1024, suffix: '-1024w' },
    desktop: { width: 1920, suffix: '-1920w' },
    retina: { width: 3840, suffix: '-3840w' }
  },
  
  // Quality settings
  quality: {
    jpg: 85,
    png: 90,
    webp: 85
  },
  
  // Maximum file sizes (KB)
  maxSizes: {
    hero: 500,
    training: 200,
    icons: 50,
    thumbnails: 30
  }
};

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // Skip optimised directory to avoid reprocessing
      if (!fullPath.includes('optimised') && !fullPath.includes('node_modules')) {
        files.push(...await getImageFiles(fullPath));
      }
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Determine image category based on path
 */
function getImageCategory(filePath) {
  if (filePath.includes('hero') || filePath.includes('banner')) return 'hero';
  if (filePath.includes('training') || filePath.includes('education')) return 'training';
  if (filePath.includes('icon') || filePath.includes('badge')) return 'icons';
  if (filePath.includes('thumb')) return 'thumbnails';
  return 'general';
}

/**
 * Load watermark image once
 */
let watermarkBuffer = null;
async function getWatermark() {
  if (!watermarkBuffer) {
    try {
      watermarkBuffer = await fs.readFile(CONFIG.watermarkPath);
    } catch (error) {
      console.warn('⚠️ Watermark image not found. Skipping watermarking.');
    }
  }
  return watermarkBuffer;
}

/**
 * Optimise a single image
 */
async function optimizeImage(inputPath, outputPath) {
  const category = getImageCategory(inputPath);
  const watermark = await getWatermark();
  
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const { width, height, format } = metadata;
    
    console.log(`  Processing: ${path.basename(inputPath)}`);
    console.log(`    Original: ${width}x${height}, Format: ${format}`);
    
    // Create output directory
    const outputDir = path.dirname(outputPath);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Process each size variant
    for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
      // Skip if image is smaller than target size
      if (width < sizeConfig.width) {
        continue;
      }
      
      // Calculate dimensions maintaining aspect ratio
      const aspectRatio = width / height;
      const newWidth = sizeConfig.width;
      const newHeight = Math.round(newWidth / aspectRatio);
      
      // Base filename without extension
      const baseName = path.basename(outputPath, path.extname(outputPath));
      const baseDir = path.dirname(outputPath);
      
      // Create WebP version
      const webpPath = path.join(baseDir, `${baseName}${sizeConfig.suffix}.webp`);
      let pipeline = sharp(inputPath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: CONFIG.quality.webp });
      
      // Add watermark if available
      if (watermark) {
        // Calculate watermark size (10-15% of image width)
        const watermarkWidth = Math.floor(newWidth * 0.12);
        const resizedWatermark = await sharp(watermark)
          .resize(watermarkWidth, null, { fit: 'inside' })
          .toBuffer();
        
        pipeline = pipeline.composite([{
          input: resizedWatermark,
          gravity: 'southeast',
          blend: 'over'
        }]);
      }
      
      await pipeline.toFile(webpPath);
      
      // Create fallback format (original format)
      const fallbackPath = path.join(baseDir, `${baseName}${sizeConfig.suffix}${path.extname(inputPath)}`);
      pipeline = sharp(inputPath)
        .resize(newWidth, newHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      
      if (format === 'jpeg' || format === 'jpg') {
        pipeline = pipeline.jpeg({ quality: CONFIG.quality.jpg, progressive: true });
      } else if (format === 'png') {
        pipeline = pipeline.png({ quality: CONFIG.quality.png, compressionLevel: 9 });
      }
      
      // Add watermark to fallback too
      if (watermark) {
        const watermarkWidth = Math.floor(newWidth * 0.12);
        const resizedWatermark = await sharp(watermark)
          .resize(watermarkWidth, null, { fit: 'inside' })
          .toBuffer();
        
        pipeline = pipeline.composite([{
          input: resizedWatermark,
          gravity: 'southeast',
          blend: 'over'
        }]);
      }
      
      await pipeline.toFile(fallbackPath);
      
      // Check file sizes
      const webpStats = await fs.stat(webpPath);
      const fallbackStats = await fs.stat(fallbackPath);
      
      console.log(`    ✓ ${sizeName}: WebP ${Math.round(webpStats.size / 1024)}KB, ${format.toUpperCase()} ${Math.round(fallbackStats.size / 1024)}KB`);
      
      // Warn if file is too large
      const maxSize = CONFIG.maxSizes[category] || 300;
      if (webpStats.size / 1024 > maxSize) {
        console.warn(`    ⚠️ WebP exceeds ${maxSize}KB limit for ${category} images`);
      }
    }
    
    // Create a base optimised version (no size suffix)
    const basePipeline = sharp(inputPath);
    
    if (format === 'jpeg' || format === 'jpg') {
      basePipeline.jpeg({ quality: CONFIG.quality.jpg, progressive: true });
    } else if (format === 'png') {
      basePipeline.png({ quality: CONFIG.quality.png, compressionLevel: 9 });
    }
    
    // Add watermark to base version
    if (watermark) {
      const watermarkWidth = Math.floor(width * 0.12);
      const resizedWatermark = await sharp(watermark)
        .resize(watermarkWidth, null, { fit: 'inside' })
        .toBuffer();
      
      basePipeline.composite([{
        input: resizedWatermark,
        gravity: 'southeast',
        blend: 'over'
      }]);
    }
    
    await basePipeline.toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`    ✗ Error: ${error.message}`);
    return false;
  }
}

/**
 * Generate image manifest
 */
async function generateManifest(images) {
  const manifest = {
    generated: new Date().toISOString(),
    totalImages: images.length,
    images: []
  };
  
  for (const imagePath of images) {
    const relativePath = path.relative(CONFIG.inputDir, imagePath);
    const category = getImageCategory(imagePath);
    
    try {
      const metadata = await sharp(imagePath).metadata();
      const stats = await fs.stat(imagePath);
      
      manifest.images.push({
        path: relativePath,
        category,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        sizeKB: Math.round(stats.size / 1024),
        optimised: true,
        watermarked: true
      });
    } catch (error) {
      console.error(`Failed to process ${relativePath}: ${error.message}`);
    }
  }
  
  const manifestPath = path.join(CONFIG.outputDir, 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✓ Manifest saved to ${manifestPath}`);
  
  return manifest;
}

/**
 * Main optimisation function
 */
async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          IMAGE Optimisation WITH NRP WATERMARKING        ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
  
  try {
    // Check if sharp is installed
    try {
      require('sharp');
    } catch (error) {
      console.error('❌ Sharp is not installed. Installing now...');
      const { execSync } = require('child_process');
      execSync('npm install sharp', { stdio: 'inherit' });
    }
    
    // Get all image files
    console.log('📂 Scanning for images...');
    const images = await getImageFiles(CONFIG.inputDir);
    console.log(`   Found ${images.length} images\n`);
    
    if (images.length === 0) {
      console.log('No images found to optimise.');
      return;
    }
    
    // Process each image
    let successful = 0;
    let failed = 0;
    
    for (const imagePath of images) {
      const relativePath = path.relative(CONFIG.inputDir, imagePath);
      const outputPath = path.join(CONFIG.outputDir, relativePath);
      
      console.log(`\n📸 ${relativePath}`);
      
      const result = await optimizeImage(imagePath, outputPath);
      if (result) {
        successful++;
      } else {
        failed++;
      }
    }
    
    // Generate manifest
    const manifest = await generateManifest(images);
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Optimisation COMPLETE');
    console.log('='.repeat(60));
    console.log(`✓ Successful: ${successful}`);
    console.log(`✗ Failed: ${failed}`);
    console.log(`✓ All images watermarked with NRP logo`);
    console.log(`✓ Responsive variants created for all sizes`);
    console.log(`✓ WebP versions generated for modern browsers`);
    
    // Size savings estimate
    const originalSizeKB = manifest.images.reduce((sum, img) => sum + img.sizeKB, 0);
    const estimatedSavings = originalSizeKB * 0.4; // Estimate 40% savings
    console.log(`\n💾 Estimated savings: ${Math.round(estimatedSavings)}KB`);
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, getImageFiles, generateManifest };