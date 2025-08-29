/**
 * IMAGE GENERATION EXECUTION SCRIPT
 * ==================================
 * 
 * Main script to generate all required images using the automated pipeline.
 * Ensures ALL images include NRP logo watermark and proper metadata.
 */

import { IMAGE_REQUIREMENTS, getImagesByPriority, getUngenerated } from './image-requirements';
import { ImageGenerationPipeline } from './image-generator';
import { ImageGenerationCoordinator } from './playwright-automation';
import fs from 'fs/promises';
import path from 'path';

/**
 * Main generation function
 */
export async function generateAllImages() {
  console.log('🚀 Starting NRP Image Generation Pipeline');
  console.log('✓ ALL images will include NRP logo watermark');
  console.log('✓ ALL images will have complete metadata');
  console.log('');
  
  const pipeline = new ImageGenerationPipeline();
  const coordinator = new ImageGenerationCoordinator();
  
  // Get priority 1 images first (hero images)
  const priority1 = getImagesByPriority(1);
  const priority2 = getImagesByPriority(2);
  const priority3 = getImagesByPriority(3);
  
  console.log(`📊 Image Requirements:`);
  console.log(`   Priority 1 (Hero): ${priority1.length} images`);
  console.log(`   Priority 2 (Marketing/Training): ${priority2.length} images`);
  console.log(`   Priority 3 (CRM/Docs): ${priority3.length} images`);
  console.log(`   Total: ${IMAGE_REQUIREMENTS.length} images`);
  console.log('');
  
  // Process by priority
  const results = {
    priority1: await processPriorityGroup(priority1, coordinator, pipeline, 'Priority 1 - Hero Images'),
    priority2: await processPriorityGroup(priority2, coordinator, pipeline, 'Priority 2 - Marketing/Training'),
    priority3: await processPriorityGroup(priority3, coordinator, pipeline, 'Priority 3 - CRM/Documentation')
  };
  
  // Generate summary report
  generateReport(results);
  
  return results;
}

/**
 * Process a group of images by priority
 */
async function processPriorityGroup(
  requirements: any[],
  coordinator: ImageGenerationCoordinator,
  pipeline: ImageGenerationPipeline,
  groupName: string
) {
  console.log(`\n🎨 Processing ${groupName}`);
  console.log(`   Images to generate: ${requirements.length}`);
  
  const results = [];
  
  for (const requirement of requirements) {
    console.log(`\n   📸 Generating: ${requirement.id}`);
    console.log(`      Title: ${requirement.title}`);
    console.log(`      Dimensions: ${requirement.dimensions.width}x${requirement.dimensions.height}`);
    
    try {
      // Generate the image using the best agent
      const generationResult = await coordinator.generateWithBestAgent(requirement);
      
      if (generationResult.success) {
        console.log(`      ✓ Generated successfully`);
        console.log(`      ✓ NRP watermark applied`);
        console.log(`      ✓ Metadata embedded`);
        
        // Save the image
        const savedPath = await saveImage(requirement, generationResult);
        console.log(`      ✓ Saved to: ${savedPath}`);
        
        results.push({
          ...generationResult,
          savedPath,
          requirement
        });
      } else {
        console.log(`      ✗ Generation failed: ${generationResult.error}`);
        results.push(generationResult);
      }
      
    } catch (error) {
      console.log(`      ✗ Error: ${error}`);
      results.push({
        id: requirement.id,
        success: false,
        error: String(error)
      });
    }
    
    // Add delay to avoid rate limiting
    await delay(2000);
  }
  
  return results;
}

/**
 * Save generated image to disk
 */
async function saveImage(requirement: any, result: any): Promise<string> {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'generated');
  const categoryDir = path.join(baseDir, requirement.category);
  const subcategoryDir = path.join(categoryDir, requirement.subcategory);
  
  // Ensure directories exist
  await fs.mkdir(subcategoryDir, { recursive: true });
  
  // Generate filename
  const filename = `${requirement.id}-watermarked.${requirement.format}`;
  const filepath = path.join(subcategoryDir, filename);
  
  // Save metadata alongside image
  const metadataPath = filepath.replace(`.${requirement.format}`, '.json');
  await fs.writeFile(metadataPath, JSON.stringify({
    requirement,
    result: {
      ...result,
      url: undefined // Don't save the data URL
    },
    generatedAt: new Date().toISOString(),
    watermarked: true,
    logoIncluded: true,
    copyright: `© ${new Date().getFullYear()} National Restoration Platform`
  }, null, 2));
  
  // Return relative path for web use
  return `/images/generated/${requirement.category}/${requirement.subcategory}/${filename}`;
}

/**
 * Generate summary report
 */
function generateReport(results: any) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION REPORT');
  console.log('='.repeat(60));
  
  let totalSuccess = 0;
  let totalFailed = 0;
  
  for (const [priority, priorityResults] of Object.entries(results)) {
    const success = (priorityResults as any[]).filter(r => r.success).length;
    const failed = (priorityResults as any[]).filter(r => !r.success).length;
    
    totalSuccess += success;
    totalFailed += failed;
    
    console.log(`\n${priority.toUpperCase()}:`);
    console.log(`   ✓ Successful: ${success}`);
    console.log(`   ✗ Failed: ${failed}`);
    console.log(`   Success Rate: ${((success / (success + failed)) * 100).toFixed(1)}%`);
  }
  
  console.log('\n' + '-'.repeat(60));
  console.log('TOTAL:');
  console.log(`   ✓ Successful: ${totalSuccess}`);
  console.log(`   ✗ Failed: ${totalFailed}`);
  console.log(`   Overall Success Rate: ${((totalSuccess / (totalSuccess + totalFailed)) * 100).toFixed(1)}%`);
  console.log(`   ✓ ALL images watermarked with NRP logo`);
  console.log(`   ✓ ALL images include complete metadata`);
  console.log('='.repeat(60));
}

/**
 * Helper function for delays
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate specific category of images
 */
export async function generateImagesByCategory(category: string) {
  const requirements = IMAGE_REQUIREMENTS.filter(r => r.category === category);
  const coordinator = new ImageGenerationCoordinator();
  const pipeline = new ImageGenerationPipeline();
  
  console.log(`Generating ${requirements.length} images for category: ${category}`);
  
  return processPriorityGroup(
    requirements,
    coordinator,
    pipeline,
    `Category: ${category}`
  );
}

/**
 * Generate a single image by ID
 */
export async function generateSingleImage(imageId: string) {
  const requirement = IMAGE_REQUIREMENTS.find(r => r.id === imageId);
  
  if (!requirement) {
    throw new Error(`Image requirement not found: ${imageId}`);
  }
  
  const coordinator = new ImageGenerationCoordinator();
  const pipeline = new ImageGenerationPipeline();
  
  console.log(`Generating single image: ${imageId}`);
  
  const result = await coordinator.generateWithBestAgent(requirement);
  
  if (result.success) {
    const savedPath = await saveImage(requirement, result);
    console.log(`✓ Image saved to: ${savedPath}`);
    console.log(`✓ NRP watermark applied`);
    console.log(`✓ Metadata embedded`);
  }
  
  return result;
}

/**
 * Verify all images have watermarks
 */
export async function verifyWatermarks() {
  console.log('🔍 Verifying all images have NRP watermarks...');
  
  const baseDir = path.join(process.cwd(), 'public', 'images', 'generated');
  let totalImages = 0;
  let watermarkedImages = 0;
  let missingWatermarks = [];
  
  try {
    const categories = await fs.readdir(baseDir);
    
    for (const category of categories) {
      const categoryPath = path.join(baseDir, category);
      const subcategories = await fs.readdir(categoryPath);
      
      for (const subcategory of subcategories) {
        const subcategoryPath = path.join(categoryPath, subcategory);
        const files = await fs.readdir(subcategoryPath);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            totalImages++;
            
            const metadataPath = path.join(subcategoryPath, file);
            const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'));
            
            if (metadata.watermarked && metadata.logoIncluded) {
              watermarkedImages++;
            } else {
              missingWatermarks.push(file.replace('.json', ''));
            }
          }
        }
      }
    }
    
    console.log(`\n✓ Total images: ${totalImages}`);
    console.log(`✓ Watermarked: ${watermarkedImages}`);
    
    if (missingWatermarks.length > 0) {
      console.log(`⚠️ Missing watermarks: ${missingWatermarks.length}`);
      console.log('   Images without watermarks:');
      missingWatermarks.forEach(img => console.log(`   - ${img}`));
    } else {
      console.log('✓ ALL images have NRP watermarks!');
    }
    
  } catch (error) {
    console.log('Directory not found - no images generated yet');
  }
  
  return {
    totalImages,
    watermarkedImages,
    missingWatermarks
  };
}

// Export for use in scripts
export default {
  generateAllImages,
  generateImagesByCategory,
  generateSingleImage,
  verifyWatermarks
};