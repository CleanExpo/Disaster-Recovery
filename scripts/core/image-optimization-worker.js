#!/usr/bin/env node

/**
 * Autonomous Image Optimization Worker
 * Runs independently to optimize all images in the application
 */

const path = require('path');
const fs = require('fs').promises;
const { existsSync } = require('fs');
const sharp = require('sharp');
const chokidar = require('chokidar');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  // Directories to watch
  watchDirs: [
    path.join(process.cwd(), 'public', 'images'),
    path.join(process.cwd(), 'public', 'uploads'),
    path.join(process.cwd(), 'uploads'),
  ],
  
  // Optimization profiles
  profiles: {
    thumbnail: {
      width: 400,
      height: 400,
      quality: 70,
      format: 'webp',
      maxSizeKB: 50,
    },
    hero: {
      width: 1920,
      height: 1080,
      quality: 85,
      format: 'webp',
      maxSizeKB: 500,
    },
    content: {
      width: 1200,
      height: 800,
      quality: 80,
      format: 'webp',
      maxSizeKB: 300,
    },
    logo: {
      width: 500,
      height: 500,
      quality: 90,
      format: 'webp',
      maxSizeKB: 100,
    },
    social: {
      width: 200,
      height: 200,
      quality: 85,
      format: 'webp',
      maxSizeKB: 50,
    },
  },
  
  // File patterns
  ignorePatterns: [
    '*.svg',
    '*.ico',
    '*.original.*',
    '*-optimized.*',
    '*.min.*',
    '.DS_Store',
    'Thumbs.db',
  ],
  
  // Size thresholds
  minSizeKB: 50, // Don't optimize files smaller than this
  maxSizeMB: 10, // Warning for files larger than this
};

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Optimization cache to prevent re-processing
const optimizationCache = new Map();

// Statistics
const stats = {
  processed: 0,
  optimized: 0,
  skipped: 0,
  errors: 0,
  totalSaved: 0,
};

/**
 * Log with color and formatting
 */
function log(message, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Get file hash for caching
 */
async function getFileHash(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
  } catch (error) {
    return null;
  }
}

/**
 * Determine optimization profile based on file path and name
 */
function getOptimizationProfile(filePath) {
  const fileName = path.basename(filePath).toLowerCase();
  const dirPath = path.dirname(filePath).toLowerCase();
  
  // Check directory patterns
  if (dirPath.includes('thumbnail') || dirPath.includes('thumbs')) {
    return CONFIG.profiles.thumbnail;
  }
  if (dirPath.includes('hero') || dirPath.includes('banner')) {
    return CONFIG.profiles.hero;
  }
  if (dirPath.includes('logo') || dirPath.includes('icon')) {
    return CONFIG.profiles.logo;
  }
  if (dirPath.includes('social') || fileName.includes('facebook') || 
      fileName.includes('instagram') || fileName.includes('linkedin') || 
      fileName.includes('youtube') || fileName.includes('twitter')) {
    return CONFIG.profiles.social;
  }
  
  // Check filename patterns
  if (fileName.includes('thumb') || fileName.includes('tn_')) {
    return CONFIG.profiles.thumbnail;
  }
  if (fileName.includes('hero') || fileName.includes('banner')) {
    return CONFIG.profiles.hero;
  }
  if (fileName.includes('logo') || fileName.includes('icon')) {
    return CONFIG.profiles.logo;
  }
  
  // Default profile
  return CONFIG.profiles.content;
}

/**
 * Check if file should be optimized
 */
function shouldOptimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  // Check supported formats
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
  if (!supportedFormats.includes(ext)) {
    return false;
  }
  
  // Check ignore patterns
  for (const pattern of CONFIG.ignorePatterns) {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      if (regex.test(fileName)) {
        return false;
      }
    } else if (fileName === pattern) {
      return false;
    }
  }
  
  return true;
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  try {
    stats.processed++;
    
    // Check if file should be optimized
    if (!shouldOptimize(filePath)) {
      stats.skipped++;
      return;
    }
    
    // Get file stats
    const fileStat = await fs.stat(filePath);
    const originalSize = fileStat.size;
    const originalSizeKB = originalSize / 1024;
    
    // Skip small files
    if (originalSizeKB < CONFIG.minSizeKB) {
      log(`⏭️  Skipping ${path.basename(filePath)} (${formatBytes(originalSize)} - too small)`, colors.dim);
      stats.skipped++;
      return;
    }
    
    // Warn about large files
    if (originalSize > CONFIG.maxSizeMB * 1024 * 1024) {
      log(`⚠️  Large file: ${path.basename(filePath)} (${formatBytes(originalSize)})`, colors.yellow);
    }
    
    // Check cache
    const fileHash = await getFileHash(filePath);
    if (optimizationCache.has(fileHash)) {
      log(`✓ Already optimized: ${path.basename(filePath)}`, colors.dim);
      stats.skipped++;
      return;
    }
    
    // Get optimization profile
    const profile = getOptimizationProfile(filePath);
    
    log(`🔧 Optimizing ${path.basename(filePath)}...`, colors.cyan);
    
    // Read image
    const buffer = await fs.readFile(filePath);
    
    // Create sharp instance
    let sharpInstance = sharp(buffer);
    
    // Get metadata
    const metadata = await sharpInstance.metadata();
    
    // Resize if needed
    if (metadata.width > profile.width) {
      sharpInstance = sharpInstance.resize(profile.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }
    
    // Optimize with progressive quality reduction
    let optimizedBuffer;
    let quality = profile.quality;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (attempts < maxAttempts) {
      // Apply format-specific optimization
      if (profile.format === 'webp') {
        optimizedBuffer = await sharp(buffer)
          .resize(profile.width, null, { withoutEnlargement: true, fit: 'inside' })
          .webp({ quality })
          .toBuffer();
      } else if (profile.format === 'png') {
        optimizedBuffer = await sharp(buffer)
          .resize(profile.width, null, { withoutEnlargement: true, fit: 'inside' })
          .png({ compressionLevel: 9, palette: true })
          .toBuffer();
      } else {
        optimizedBuffer = await sharp(buffer)
          .resize(profile.width, null, { withoutEnlargement: true, fit: 'inside' })
          .jpeg({ quality, progressive: true })
          .toBuffer();
      }
      
      const optimizedSizeKB = optimizedBuffer.length / 1024;
      
      // Check if we meet the target size
      if (optimizedSizeKB <= profile.maxSizeKB || quality <= 50) {
        break;
      }
      
      // Reduce quality for next attempt
      quality -= 10;
      attempts++;
    }
    
    // Calculate savings
    const optimizedSize = optimizedBuffer.length;
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);
    
    // Only save if we achieved meaningful compression (>10%)
    if (savedPercent > 10) {
      // Create backup of original
      const backupPath = filePath.replace(/(\.[^.]+)$/, '.original$1');
      if (!existsSync(backupPath)) {
        await fs.copyFile(filePath, backupPath);
      }
      
      // Save optimized image
      await fs.writeFile(filePath, optimizedBuffer);
      
      // Update cache
      optimizationCache.set(fileHash, true);
      
      // Update stats
      stats.optimized++;
      stats.totalSaved += savedBytes;
      
      log(
        `✅ Optimized ${path.basename(filePath)}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${colors.green}-${savedPercent}%${colors.reset})`,
        colors.green
      );
    } else {
      stats.skipped++;
      log(`✓ Already optimal: ${path.basename(filePath)}`, colors.dim);
    }
  } catch (error) {
    stats.errors++;
    log(`❌ Error optimizing ${filePath}: ${error.message}`, colors.red);
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        await optimizeImage(fullPath);
      }
    }
  } catch (error) {
    log(`❌ Error processing directory ${dirPath}: ${error.message}`, colors.red);
  }
}

/**
 * Start the optimization worker
 */
async function startWorker() {
  log('🚀 Starting Autonomous Image Optimization Worker', colors.bright + colors.blue);
  log('=' .repeat(50), colors.dim);
  
  // Filter existing directories
  const existingDirs = CONFIG.watchDirs.filter(dir => existsSync(dir));
  
  if (existingDirs.length === 0) {
    log('⚠️  No directories found to watch', colors.yellow);
    return;
  }
  
  log(`📁 Watching directories:`, colors.cyan);
  existingDirs.forEach(dir => {
    log(`   • ${dir}`, colors.dim);
  });
  
  // Initial optimization
  log('\n🔍 Scanning existing images...', colors.cyan);
  for (const dir of existingDirs) {
    await processDirectory(dir);
  }
  
  // Print initial stats
  printStats();
  
  // Set up file watcher
  log('\n👁️  Starting file watcher...', colors.cyan);
  
  const watcher = chokidar.watch(existingDirs, {
    ignored: CONFIG.ignorePatterns,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });
  
  // Watch for new or changed files
  watcher
    .on('add', async (filePath) => {
      log(`📸 New image detected: ${path.basename(filePath)}`, colors.blue);
      await optimizeImage(filePath);
      printStats();
    })
    .on('change', async (filePath) => {
      log(`📝 Image changed: ${path.basename(filePath)}`, colors.blue);
      // Remove from cache to force re-optimization
      const hash = await getFileHash(filePath);
      if (hash) optimizationCache.delete(hash);
      await optimizeImage(filePath);
      printStats();
    })
    .on('error', (error) => {
      log(`❌ Watcher error: ${error}`, colors.red);
    });
  
  log('\n✅ Worker is running. Press Ctrl+C to stop.', colors.green);
  
  // Print stats every 5 minutes
  setInterval(printStats, 5 * 60 * 1000);
}

/**
 * Print statistics
 */
function printStats() {
  log('\n' + '='.repeat(50), colors.dim);
  log('📊 Optimization Statistics', colors.bright + colors.cyan);
  log('='.repeat(50), colors.dim);
  log(`Processed: ${stats.processed} files`, colors.reset);
  log(`Optimized: ${stats.optimized} files`, colors.green);
  log(`Skipped: ${stats.skipped} files`, colors.yellow);
  log(`Errors: ${stats.errors} files`, colors.red);
  log(`Total saved: ${formatBytes(stats.totalSaved)}`, colors.bright + colors.green);
  log('='.repeat(50), colors.dim);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n\n🛑 Shutting down worker...', colors.yellow);
  printStats();
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('\n\n🛑 Shutting down worker...', colors.yellow);
  printStats();
  process.exit(0);
});

// Start the worker
startWorker().catch(error => {
  log(`❌ Fatal error: ${error}`, colors.red);
  process.exit(1);
});