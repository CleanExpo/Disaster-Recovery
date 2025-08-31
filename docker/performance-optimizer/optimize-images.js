const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const IMAGE_CONFIG = {
  sizes: [320, 640, 768, 1024, 1280, 1920],
  formats: ['webp', 'avif', 'jpg'],
  quality: {
    webp: 85,
    avif: 80,
    jpg: 90
  }
};

async function optimizeImages() {
  console.log('🖼️ Starting Image Optimization...');
  
  const publicDir = path.join(__dirname, '../../public');
  const imagesDir = path.join(publicDir, 'images');
  const optimizedDir = path.join(publicDir, 'optimized');
  
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
    
    const images = await fs.readdir(imagesDir);
    let optimizedCount = 0;
    let totalSavings = 0;
    
    for (const image of images) {
      if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(image)) continue;
      
      const inputPath = path.join(imagesDir, image);
      const stats = await fs.stat(inputPath);
      const originalSize = stats.size;
      
      console.log(`  Processing: ${image} (${(originalSize / 1024).toFixed(2)}KB)`);
      
      // Generate responsive sizes
      for (const size of IMAGE_CONFIG.sizes) {
        for (const format of IMAGE_CONFIG.formats) {
          const outputName = `${path.basename(image, path.extname(image))}-${size}w.${format}`;
          const outputPath = path.join(optimizedDir, outputName);
          
          try {
            let pipeline = sharp(inputPath)
              .resize(size, null, {
                withoutEnlargement: true,
                fit: 'inside'
              });
            
            if (format === 'webp') {
              pipeline = pipeline.webp({ quality: IMAGE_CONFIG.quality.webp });
            } else if (format === 'avif') {
              pipeline = pipeline.avif({ quality: IMAGE_CONFIG.quality.avif });
            } else {
              pipeline = pipeline.jpeg({ quality: IMAGE_CONFIG.quality.jpg, progressive: true });
            }
            
            await pipeline.toFile(outputPath);
            
            const optimizedStats = await fs.stat(outputPath);
            const savings = originalSize - optimizedStats.size;
            totalSavings += savings > 0 ? savings : 0;
            
            console.log(`    ✓ Created: ${outputName} (${(optimizedStats.size / 1024).toFixed(2)}KB)`);
          } catch (err) {
            console.error(`    ✗ Failed: ${outputName} - ${err.message}`);
          }
        }
      }
      
      optimizedCount++;
    }
    
    // Optimize logos separately with lossless compression
    const logosDir = path.join(publicDir, 'logos');
    const logos = await fs.readdir(logosDir);
    
    for (const logo of logos) {
      if (!/\.(png|svg)$/i.test(logo)) continue;
      
      const inputPath = path.join(logosDir, logo);
      const outputPath = path.join(optimizedDir, 'logos', logo);
      
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      
      if (logo.endsWith('.png')) {
        await sharp(inputPath)
          .png({ 
            quality: 100,
            compressionLevel: 9,
            palette: true
          })
          .toFile(outputPath);
      } else {
        await fs.copyFile(inputPath, outputPath);
      }
      
      console.log(`  ✓ Optimized logo: ${logo}`);
    }
    
    // Generate image manifest
    const manifest = {
      totalImages: optimizedCount,
      totalSavings: `${(totalSavings / 1024 / 1024).toFixed(2)}MB`,
      formats: IMAGE_CONFIG.formats,
      sizes: IMAGE_CONFIG.sizes,
      timestamp: new Date().toISOString()
    };
    
    await fs.writeFile(
      path.join(optimizedDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`\n✅ Image Optimization Complete!`);
    console.log(`   - Images processed: ${optimizedCount}`);
    console.log(`   - Total savings: ${manifest.totalSavings}`);
    console.log(`   - Formats generated: ${IMAGE_CONFIG.formats.join(', ')}`);
    
    return manifest;
  } catch (error) {
    console.error('❌ Image optimization failed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };