/**
 * Image Processing Script
 * Optimizes images for web and mobile use
 * Generates multiple formats (WebP, AVIF, JPG) and sizes
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1200, height: 1200 },
  hero: { width: 1920, height: 1080 }
};

const OUTPUT_FORMATS = ['webp', 'avif', 'jpg'];

const IMAGE_QUALITY = {
  webp: 85,
  avif: 80,
  jpg: 85,
  png: 95
};

// Image categories based on filename patterns
const IMAGE_CATEGORIES = {
  'mould': 'damage/mould',
  'fire': 'damage/fire',
  'water': 'damage/water',
  'burst': 'damage/water',
  'air-mover': 'equipment/air-movers',
  'air mover': 'equipment/air-movers',
  'dehumidifier': 'equipment/dehumidifiers',
  'extractor': 'equipment/extractors',
  'spotting': 'equipment/extractors',
  'hepa': 'equipment/filters',
  'filter': 'equipment/filters',
  'phoenix': 'equipment/air-movers',
  'evolution': 'equipment/dehumidifiers',
  'lgr': 'equipment/dehumidifiers',
  'drying': 'process/drying',
  'moisture': 'process/measurement',
  'documentation': 'process/documentation',
  'logo': 'branding',
  'carsi': 'branding/partners'
};

/**
 * Process a single image file
 */
async function processImage(inputPath, filename) {
  console.log(`Processing: ${filename}`);
  
  // Determine category based on filename
  const category = determineCategory(filename);
  const baseName = sanitizeFilename(filename);
  
  try {
    // Read the original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);
    
    // Process each size
    for (const [sizeName, dimensions] of Object.entries(IMAGE_SIZES)) {
      // Skip if image is smaller than target size
      if (metadata.width < dimensions.width && metadata.height < dimensions.height) {
        if (sizeName !== 'thumbnail') continue;
      }
      
      // Process each format
      for (const format of OUTPUT_FORMATS) {
        const outputDir = path.join(
          process.cwd(),
          'public/images',
          category
        );
        
        // Create output directory if it doesn't exist
        await fs.mkdir(outputDir, { recursive: true });
        
        const outputFilename = `${baseName}-${sizeName}.${format}`;
        const outputPath = path.join(outputDir, outputFilename);
        
        // Configure sharp based on format
        let pipeline = sharp(inputPath)
          .resize(dimensions.width, dimensions.height, {
            fit: 'inside',
            withoutEnlargement: true
          });
        
        // Apply format-specific settings
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp({ quality: IMAGE_QUALITY.webp });
            break;
          case 'avif':
            pipeline = pipeline.avif({ quality: IMAGE_QUALITY.avif });
            break;
          case 'jpg':
            pipeline = pipeline.jpeg({ quality: IMAGE_QUALITY.jpg });
            break;
        }
        
        // Save the processed image
        await pipeline.toFile(outputPath);
        console.log(`    Created: ${sizeName} ${format} -> ${outputFilename}`);
      }
    }
    
    // Also save original in optimised format
    const originalDir = path.join(
      process.cwd(),
      'public/images',
      category,
      'original'
    );
    await fs.mkdir(originalDir, { recursive: true });
    
    // Save optimised original
    await sharp(inputPath)
      .webp({ quality: IMAGE_QUALITY.webp })
      .toFile(path.join(originalDir, `${baseName}-original.webp`));
    
    console.log(`  ✓ Completed processing ${filename}`);
    return true;
    
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
    return false;
  }
}

/**
 * Determine category based on filename
 */
function determineCategory(filename) {
  const lowerFilename = filename.toLowerCase();
  
  for (const [keyword, category] of Object.entries(IMAGE_CATEGORIES)) {
    if (lowerFilename.includes(keyword)) {
      return category;
    }
  }
  
  return 'uncategorized';
}

/**
 * Sanitize filename for web use
 */
function sanitizeFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/3d\s*/gi, '') // Remove '3D' prefix
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Process all images in a directory
 */
async function processImagesInDirectory(directory) {
  console.log(`\n🖼️  Starting image processing from: ${directory}\n`);
  
  try {
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    console.log(`Found ${imageFiles.length} images to process\n`);
    
    let successful = 0;
    let failed = 0;
    
    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const result = await processImage(inputPath, file);
      
      if (result) {
        successful++;
      } else {
        failed++;
      }
      
      console.log(''); // Add spacing between images
    }
    
    console.log(`\n✨ Processing complete!`);
    console.log(`   ✓ Successfully processed: ${successful}`);
    if (failed > 0) {
      console.log(`   ✗ Failed: ${failed}`);
    }
    
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

/**
 * Generate image manifest for TypeScript
 */
async function generateManifest() {
  const publicDir = path.join(process.cwd(), 'public/images');
  const manifest = {};
  
  async function scanDirectory(dir, relativePath = '') {
    const files = await fs.readdir(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relPath = path.join(relativePath, file.name);
      
      if (file.isDirectory()) {
        await scanDirectory(fullPath, relPath);
      } else if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file.name)) {
        const category = relativePath.split(path.sep)[0] || 'root';
        if (!manifest[category]) {
          manifest[category] = [];
        }
        manifest[category].push({
          filename: file.name,
          path: `/images/${relPath.replace(/\\/g, '/')}`,
          size: (await fs.stat(fullPath)).size
        });
      }
    }
  }
  
  await scanDirectory(publicDir);
  
  // Write manifest file
  const manifestPath = path.join(process.cwd(), 'src/config/image-manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📝 Manifest generated: ${manifestPath}`);
}

// CLI interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: node process-images.js <directory>

Example:
  node process-images.js "C:\\Users\\Disaster Recovery 4\\Downloads"

This will process all images in the specified directory and output
optimised versions in multiple formats and sizes to public/images/
`);
} else {
  const inputDirectory = args[0];
  
  processImagesInDirectory(inputDirectory)
    .then(() => generateManifest())
    .catch(console.error);
}

module.exports = {
  processImage,
  processImagesInDirectory,
  generateManifest
};