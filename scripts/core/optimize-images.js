const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '..', 'public', 'images'),
  quality: 85,
  formats: ['webp'], // Can add 'avif' for better compression
  maxWidth: 1920,
  skipPatterns: ['.svg', '.ico'], // Skip these file types
};

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

async function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'].includes(ext) &&
         !CONFIG.skipPatterns.includes(ext);
}

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath);
  const nameWithoutExt = path.parse(filename).name;
  const results = [];

  // Get original size
  const originalSize = await getFileSize(inputPath);
  
  try {
    // Read image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Process each format
    for (const format of CONFIG.formats) {
      const outputFilename = `${nameWithoutExt}.${format}`;
      const outputPath = path.join(outputDir, outputFilename);
      
      // Skip if already in target format and optimized
      if (path.extname(inputPath).toLowerCase() === `.${format}` && 
          inputPath === outputPath) {
        console.log(`${colors.yellow}⚠${colors.reset}  Skipping ${filename} (already ${format})`);
        continue;
      }

      // Optimize image
      let sharpInstance = sharp(inputPath);
      
      // Resize if larger than maxWidth
      if (metadata.width > CONFIG.maxWidth) {
        sharpInstance = sharpInstance.resize(CONFIG.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });
      }

      // Apply format-specific optimization
      switch (format) {
        case 'webp':
          await sharpInstance
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);
          break;
        case 'avif':
          await sharpInstance
            .avif({ quality: CONFIG.quality })
            .toFile(outputPath);
          break;
        case 'jpeg':
          await sharpInstance
            .jpeg({ quality: CONFIG.quality, progressive: true })
            .toFile(outputPath);
          break;
      }

      const optimizedSize = await getFileSize(outputPath);
      const reduction = originalSize - optimizedSize;
      const reductionPercent = Math.round((reduction / originalSize) * 100);

      results.push({
        format,
        originalSize,
        optimizedSize,
        reduction,
        reductionPercent,
        outputPath,
      });

      console.log(
        `${colors.green}✓${colors.reset} ${filename} → ${outputFilename} ` +
        `(${colors.green}-${reductionPercent}%${colors.reset} ` +
        `${await formatBytes(originalSize)} → ${await formatBytes(optimizedSize)})`
      );
    }
  } catch (error) {
    console.error(`${colors.red}✗${colors.reset} Failed to optimize ${filename}:`, error.message);
  }

  return results;
}

async function processDirectory(dirPath, baseDir = dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  let totalOriginal = 0;
  let totalOptimized = 0;
  let fileCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively process subdirectories
      const subResults = await processDirectory(fullPath, baseDir);
      totalOriginal += subResults.totalOriginal;
      totalOptimized += subResults.totalOptimized;
      fileCount += subResults.fileCount;
    } else if (entry.isFile() && await isImageFile(fullPath)) {
      const results = await optimizeImage(fullPath, dirPath);
      
      for (const result of results) {
        totalOriginal += result.originalSize;
        totalOptimized += result.optimizedSize;
        fileCount++;
      }
    }
  }

  return { totalOriginal, totalOptimized, fileCount };
}

async function main() {
  console.log(`${colors.blue}🖼️  Image Optimization Script${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  console.log(`📁 Directory: ${CONFIG.inputDir}`);
  console.log(`🎯 Formats: ${CONFIG.formats.join(', ')}`);
  console.log(`📐 Max width: ${CONFIG.maxWidth}px`);
  console.log(`✨ Quality: ${CONFIG.quality}%\n`);

  try {
    // Check if directory exists
    await fs.access(CONFIG.inputDir);
    
    const startTime = Date.now();
    const results = await processDirectory(CONFIG.inputDir);
    const endTime = Date.now();
    
    const totalReduction = results.totalOriginal - results.totalOptimized;
    const reductionPercent = results.totalOriginal > 0 
      ? Math.round((totalReduction / results.totalOriginal) * 100)
      : 0;

    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✨ Optimization Complete!${colors.reset}\n`);
    console.log(`📊 Files processed: ${results.fileCount}`);
    console.log(`💾 Original size: ${await formatBytes(results.totalOriginal)}`);
    console.log(`🎯 Optimized size: ${await formatBytes(results.totalOptimized)}`);
    console.log(`📉 Total reduction: ${await formatBytes(totalReduction)} (${reductionPercent}%)`);
    console.log(`⏱️  Time taken: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`${colors.red}✗ Directory not found: ${CONFIG.inputDir}${colors.reset}`);
    } else {
      console.error(`${colors.red}✗ Error:${colors.reset}`, error);
    }
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, processDirectory };