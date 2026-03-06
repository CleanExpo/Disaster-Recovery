#!/usr/bin/env node

/**
 * COMMAND LINE SCRIPT FOR IMAGE GENERATION
 * =========================================
 * 
 * Usage:
 *   npm run generate:images          - Generate all images
 *   npm run generate:images hero     - Generate hero images only
 *   npm run generate:images training - Generate training images only
 *   npm run generate:images verify   - Verify all watermarks
 */

const path = require('path');

// Check if running in development
const isDev = process.env.NODE_ENV !== 'production';

console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     NRP AUTOMATED IMAGE GENERATION WITH WATERMARKING     ║');
console.log('║         ALL IMAGES WILL INCLUDE NRP LOGO - NO EXCEPTIONS ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');

const command = process.argv[2] || 'all';

async function run() {
  try {
    // Import the generation module
    const generator = require('../src/lib/image-generation/generate-images');
    
    switch (command) {
      case 'all':
        console.log('📸 Generating ALL images with NRP watermarks...\n');
        await generator.generateAllImages();
        break;
        
      case 'hero':
        console.log('📸 Generating hero images with NRP watermarks...\n');
        await generator.generateImagesByCategory('website');
        break;
        
      case 'training':
        console.log('📸 Generating training images with NRP watermarks...\n');
        await generator.generateImagesByCategory('training');
        break;
        
      case 'marketing':
        console.log('📸 Generating marketing images with NRP watermarks...\n');
        await generator.generateImagesByCategory('marketing');
        break;
        
      case 'crm':
        console.log('📸 Generating CRM images with NRP watermarks...\n');
        await generator.generateImagesByCategory('crm');
        break;
        
      case 'docs':
        console.log('📸 Generating documentation images with NRP watermarks...\n');
        await generator.generateImagesByCategory('documentation');
        break;
        
      case 'verify':
        console.log('🔍 Verifying all images have NRP watermarks...\n');
        await generator.verifyWatermarks();
        break;
        
      case 'single':
        const imageId = process.argv[3];
        if (!imageId) {
          console.error('❌ Please specify an image ID');
          console.log('   Example: npm run generate:images single hero-water-damage');
          process.exit(1);
        }
        console.log(`📸 Generating single image: ${imageId}\n`);
        await generator.generateSingleImage(imageId);
        break;
        
      default:
        console.log('❌ Unknown command:', command);
        console.log('');
        console.log('Available commands:');
        console.log('  all       - Generate all images');
        console.log('  hero      - Generate hero images');
        console.log('  training  - Generate training images');
        console.log('  marketing - Generate marketing images');
        console.log('  crm       - Generate CRM images');
        console.log('  docs      - Generate documentation images');
        console.log('  verify    - Verify all watermarks');
        console.log('  single    - Generate single image by ID');
        process.exit(1);
    }
    
    console.log('\n✅ Image generation complete!');
    console.log('✓ All images include NRP logo watermark');
    console.log('✓ All images have complete metadata');
    
  } catch (error) {
    console.error('\n❌ Error during image generation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
run().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});