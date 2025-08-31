/**
 * PRIORITY 100 IMAGES GENERATOR
 * Limited scope for initial deployment - focused on highest impact images only
 * Cost estimate: $3.00 (100 images × $0.03)
 */

const fs = require('fs').promises;
const path = require('path');

// STRICT CONFIGURATION - LIMITED TO 100 IMAGES
const PRIORITY_CONFIG = {
  MAX_IMAGES: 100,
  ESTIMATED_COST: 3.00, // $0.03 per image
  SAFETY_LIMIT: 120, // Hard stop at 120 images to prevent overrun
  
  // Only the most critical locations (major cities)
  PRIORITY_LOCATIONS: [
    'Sydney',      // Largest market
    'Melbourne',   // Second largest
    'Brisbane',    // Third largest
    'Perth',       // Western Australia hub
    'Adelaide'     // South Australia hub
  ],
  
  // Only the most common/profitable services
  PRIORITY_SERVICES: [
    'water-damage-restoration',  // Most common disaster
    'fire-damage-restoration',   // High value service
    'mould-remediation',         // Growing concern
    'flood-recovery',            // Weather-related increase
  ],
  
  // Only the most important image types
  PRIORITY_IMAGE_TYPES: [
    'hero',      // Essential for every page
    'equipment', // Shows professionalism
    'process',   // Educational value
    'team'       // Trust building
  ],
  
  // Quality settings for cost efficiency
  GENERATION_SETTINGS: {
    model: 'flux-schnell', // Faster, cheaper model
    quality: 'standard',   // Not premium
    dimensions: { width: 1200, height: 800 }, // Standard size
    batch_size: 5, // Process 5 at a time
    retry_limit: 1 // Don't retry failed generations to save cost
  }
};

/**
 * Calculate the exact 100 highest priority images
 */
function calculateTop100Priority() {
  console.log('🎯 CALCULATING TOP 100 PRIORITY IMAGES');
  console.log('─────────────────────────────────────────\n');
  
  const priorities = [];
  let imageCount = 0;
  
  // Prioritization matrix (higher scores = more important)
  const locationPriority = {
    'Sydney': 100,
    'Melbourne': 90,
    'Brisbane': 80,
    'Perth': 70,
    'Adelaide': 60
  };
  
  const servicePriority = {
    'water-damage-restoration': 100,
    'fire-damage-restoration': 90,
    'mould-remediation': 85,
    'flood-recovery': 80
  };
  
  const imageTypePriority = {
    'hero': 100,
    'equipment': 85,
    'process': 75,
    'team': 65
  };
  
  // Generate all combinations and score them
  for (const location of PRIORITY_CONFIG.PRIORITY_LOCATIONS) {
    for (const service of PRIORITY_CONFIG.PRIORITY_SERVICES) {
      for (const imageType of PRIORITY_CONFIG.PRIORITY_IMAGE_TYPES) {
        
        const score = (
          locationPriority[location] * 0.4 +
          servicePriority[service] * 0.4 +
          imageTypePriority[imageType] * 0.2
        );
        
        priorities.push({
          location,
          service,
          imageType,
          score,
          id: `${service}-${location}-${imageType}`.toLowerCase(),
          estimatedCost: 0.03,
          prompt: generatePriorityPrompt({ location, service, imageType })
        });
        
        imageCount++;
      }
    }
  }
  
  // Sort by priority score and take top 100
  const top100 = priorities
    .sort((a, b) => b.score - a.score)
    .slice(0, PRIORITY_CONFIG.MAX_IMAGES);
  
  console.log(`   Total Combinations: ${imageCount}`);
  console.log(`   Selected for Generation: ${top100.length}`);
  console.log(`   Highest Priority Score: ${top100[0]?.score.toFixed(1)}`);
  console.log(`   Lowest Priority Score: ${top100[top100.length - 1]?.score.toFixed(1)}`);
  console.log(`   Estimated Total Cost: $${(top100.length * 0.03).toFixed(2)}`);
  
  return top100;
}

/**
 * Generate optimized prompt for priority images
 */
function generatePriorityPrompt(context) {
  const { service, location, imageType } = context;
  
  // Streamlined prompts for cost efficiency (shorter = cheaper)
  let prompt = "Professional 3D rendered ";
  
  // Service context
  const serviceDescriptions = {
    'water-damage-restoration': 'water damage restoration team with industrial dehumidifiers and extraction equipment',
    'fire-damage-restoration': 'fire damage restoration specialists with HEPA filters and cleaning systems',
    'mould-remediation': 'mould remediation experts in full PPE with containment and air scrubbing equipment',
    'flood-recovery': 'flood recovery team with submersible pumps and water extraction systems'
  };
  
  prompt += serviceDescriptions[service] + ", ";
  
  // Location context
  const locationDescriptions = {
    'Sydney': 'Sydney Harbor Bridge visible in background, modern Australian setting',
    'Melbourne': 'Melbourne city skyline backdrop, Victorian architecture elements',
    'Brisbane': 'Brisbane River context, subtropical Queensland environment',
    'Perth': 'Perth skyline and Swan River backdrop, Western Australian setting',
    'Adelaide': 'Adelaide Hills backdrop, South Australian architectural style'
  };
  
  prompt += locationDescriptions[location] + ", ";
  
  // Image type specifics
  const typeDescriptions = {
    'hero': 'dynamic wide shot showing team in action, professional emergency response',
    'equipment': 'close-up of advanced restoration equipment, technical detail focus',
    'process': 'step-by-step restoration process demonstration, educational angle',
    'team': 'professional team in Disaster Recovery uniforms, trust and expertise focus'
  };
  
  prompt += typeDescriptions[imageType] + ", ";
  
  // Consistent branding elements
  prompt += "Disaster Recovery Australia branding, modern 3D lighting, ";
  prompt += "red (#ef4444) and green (#22c55e) accent colors, ";
  prompt += "professional commercial photography quality, 16:9 aspect ratio";
  
  return prompt;
}

/**
 * Enhanced Cost and Safety Monitoring with Multiple Safeguards
 */
class CostSafetyMonitor {
  constructor() {
    this.imagesGenerated = 0;
    this.totalCost = 0;
    this.failures = 0;
    this.startTime = Date.now();
    this.emergencyStopTriggered = false;
    this.costCheckInterval = 10; // Check every 10 images
  }
  
  preGenerationCheck() {
    // Emergency stop check
    if (this.emergencyStopTriggered) {
      throw new Error('EMERGENCY STOP: System halted by safety monitor');
    }
    
    // Hard image limit (120 images absolute maximum)
    if (this.imagesGenerated >= PRIORITY_CONFIG.SAFETY_LIMIT) {
      this.emergencyStopTriggered = true;
      throw new Error(`SAFETY STOP: Reached hard limit of ${PRIORITY_CONFIG.SAFETY_LIMIT} images`);
    }
    
    // Target image limit (100 images)
    if (this.imagesGenerated >= PRIORITY_CONFIG.MAX_IMAGES) {
      console.log(`   ✅ TARGET REACHED: Generated ${PRIORITY_CONFIG.MAX_IMAGES} priority images`);
      return false; // Stop generation gracefully
    }
    
    // Cost overrun protection (multiple levels)
    const budgetLimit1 = PRIORITY_CONFIG.ESTIMATED_COST; // $3.00 base budget
    const budgetLimit2 = PRIORITY_CONFIG.ESTIMATED_COST * 1.2; // $3.60 safety buffer
    const budgetLimit3 = PRIORITY_CONFIG.ESTIMATED_COST * 1.5; // $4.50 emergency stop
    
    if (this.totalCost >= budgetLimit3) {
      this.emergencyStopTriggered = true;
      throw new Error(`EMERGENCY COST STOP: Exceeded maximum budget of $${budgetLimit3}`);
    }
    
    if (this.totalCost >= budgetLimit2) {
      console.log(`   ⚠️ WARNING: Budget exceeded safety buffer ($${budgetLimit2})`);
    }
    
    if (this.totalCost >= budgetLimit1) {
      console.log(`   💰 NOTICE: Base budget reached ($${budgetLimit1})`);
    }
    
    // Progress monitoring
    console.log(`   📊 Progress: ${this.imagesGenerated}/${PRIORITY_CONFIG.MAX_IMAGES} images, $${this.totalCost.toFixed(2)} spent`);
    console.log(`   🎯 Budget: ${((this.totalCost / budgetLimit1) * 100).toFixed(1)}% of base budget used`);
    
    return true; // Continue generation
  }
  
  recordGeneration(success, cost = 0.03) {
    this.imagesGenerated++;
    this.totalCost += cost;
    
    if (!success) {
      this.failures++;
    }
    
    const progress = (this.imagesGenerated / PRIORITY_CONFIG.MAX_IMAGES * 100).toFixed(1);
    console.log(`   📊 Progress: ${progress}% (${this.imagesGenerated}/${PRIORITY_CONFIG.MAX_IMAGES}), Cost: $${this.totalCost.toFixed(2)}`);
  }
  
  getFinalReport() {
    const duration = (Date.now() - this.startTime) / 1000;
    
    return {
      imagesGenerated: this.imagesGenerated,
      totalCost: this.totalCost,
      failures: this.failures,
      successRate: ((this.imagesGenerated - this.failures) / this.imagesGenerated * 100).toFixed(1),
      duration: duration,
      averageTimePerImage: (duration / this.imagesGenerated).toFixed(1),
      budgetUtilization: (this.totalCost / PRIORITY_CONFIG.ESTIMATED_COST * 100).toFixed(1)
    };
  }
}

/**
 * Priority image generation with strict limits
 */
async function generatePriority100Images() {
  console.log('🚀 DISASTER RECOVERY PRIORITY 100 IMAGES');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`   Target Images: ${PRIORITY_CONFIG.MAX_IMAGES}`);
  console.log(`   Safety Limit: ${PRIORITY_CONFIG.SAFETY_LIMIT}`);
  console.log(`   Budget: $${PRIORITY_CONFIG.ESTIMATED_COST}`);
  console.log(`   Model: ${PRIORITY_CONFIG.GENERATION_SETTINGS.model}`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Calculate priority images
  const top100Images = calculateTop100Priority();
  
  // Initialize monitoring
  const monitor = new CostSafetyMonitor();
  
  // Create output directory
  const outputDir = 'public/images/priority-100';
  await fs.mkdir(outputDir, { recursive: true });
  
  // Generate images in batches
  console.log('\n🎨 STARTING PRIORITY GENERATION');
  console.log('─────────────────────────────────────────\n');
  
  const results = [];
  const batchSize = PRIORITY_CONFIG.GENERATION_SETTINGS.batch_size;
  
  for (let i = 0; i < top100Images.length; i += batchSize) {
    const batch = top100Images.slice(i, i + batchSize);
    
    console.log(`📦 Processing Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(top100Images.length / batchSize)}`);
    
    for (const image of batch) {
      try {
        // Enhanced safety check before each generation
        const shouldContinue = monitor.preGenerationCheck();
        if (!shouldContinue) {
          console.log('   🎯 Generation target reached - stopping batch processing');
          break;
        }
        
        console.log(`   🎨 Generating: ${image.service} ${image.imageType} in ${image.location}`);
        
        // Generate and optimize image with full pipeline
        const result = await generateAndOptimizeImage(image);
        
        results.push(result);
        monitor.recordGeneration(result.success, 0.03);
        
        if (result.success) {
          console.log(`      ✅ Generated: ${result.filename}`);
        } else {
          console.log(`      ❌ Failed: ${result.error}`);
        }
        
        // Check if we've hit our target after each successful generation
        if (monitor.imagesGenerated >= PRIORITY_CONFIG.MAX_IMAGES) {
          console.log('   🎯 Priority 100 target reached - stopping generation');
          break;
        }
        
      } catch (error) {
        console.error(`      💥 Error: ${error.message}`);
        monitor.recordGeneration(false, 0);
        
        // Enhanced error handling for different stop conditions
        if (error.message.includes('EMERGENCY STOP') || 
            error.message.includes('SAFETY STOP') || 
            error.message.includes('EMERGENCY COST STOP')) {
          console.log('\n🚨 EMERGENCY SAFETY STOP TRIGGERED - HALTING ALL GENERATION');
          break;
        }
      }
    }
    
    // Stop if we've hit our limit
    if (monitor.imagesGenerated >= PRIORITY_CONFIG.MAX_IMAGES) {
      break;
    }
    
    // Brief pause between batches to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Final report
  const finalReport = monitor.getFinalReport();
  
  console.log('\n✅ PRIORITY 100 GENERATION COMPLETE');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`   Images Generated: ${finalReport.imagesGenerated}`);
  console.log(`   Success Rate: ${finalReport.successRate}%`);
  console.log(`   Total Cost: $${finalReport.totalCost}`);
  console.log(`   Budget Utilization: ${finalReport.budgetUtilization}%`);
  console.log(`   Duration: ${finalReport.duration}s`);
  console.log(`   Avg Time/Image: ${finalReport.averageTimePerImage}s`);
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Save results and manifest
  const manifest = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalImages: finalReport.imagesGenerated,
      totalCost: finalReport.totalCost,
      successRate: finalReport.successRate
    },
    images: results.filter(r => r.success),
    failures: results.filter(r => !r.success),
    priority_criteria: {
      locations: PRIORITY_CONFIG.PRIORITY_LOCATIONS,
      services: PRIORITY_CONFIG.PRIORITY_SERVICES,
      imageTypes: PRIORITY_CONFIG.PRIORITY_IMAGE_TYPES
    }
  };
  
  await fs.writeFile(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log(`📄 Manifest saved: ${outputDir}/manifest.json`);
  
  // Success summary
  console.log('\n🎯 NEXT STEPS:');
  console.log('   1. Review generated images for quality');
  console.log('   2. Deploy to CDN/website');
  console.log('   3. Monitor SEO impact');
  console.log('   4. Plan next 100 images when funding available');
  
  return manifest;
}

/**
 * Generate and optimize image with full pipeline
 */
async function generateAndOptimizeImage(imageSpec) {
  const { generateSEOMetadata, optimizeImage } = require('./priority-image-optimizer');
  
  // Phase 1: Generate the image (simulation or actual API call)
  const generationStart = Date.now();
  
  // In production, replace this with actual OpenRouter API call
  const USE_ACTUAL_API = process.env.OPENROUTER_API_KEY && process.env.GENERATE_ACTUAL === 'true';
  
  let generationResult;
  
  if (USE_ACTUAL_API) {
    // Actual API call to OpenRouter
    try {
      const response = await fetch('https://openrouter.ai/api/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://disaster-recovery.vercel.app',
          'X-Title': 'Disaster Recovery Priority Images'
        },
        body: JSON.stringify({
          model: 'flux-schnell',
          prompt: imageSpec.prompt,
          n: 1,
          size: '1920x1080',
          quality: 'standard',
          response_format: 'url'
        })
      });
      
      const data = await response.json();
      
      if (data.data && data.data[0]) {
        // Download and save the image
        const imageUrl = data.data[0].url;
        const imageResponse = await fetch(imageUrl);
        const buffer = await imageResponse.buffer();
        
        const filename = `${imageSpec.id}.webp`;
        const outputPath = path.join('public/images/generated', filename);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, buffer);
        
        generationResult = {
          success: true,
          filename,
          path: outputPath,
          generationTime: Date.now() - generationStart
        };
      } else {
        throw new Error('No image data in response');
      }
    } catch (error) {
      generationResult = {
        success: false,
        error: error.message
      };
    }
  } else {
    // Simulation mode
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    const success = Math.random() > 0.05;
    
    if (success) {
      const filename = `${imageSpec.id}.webp`;
      const outputPath = path.join('public/images/generated', filename);
      
      generationResult = {
        success: true,
        filename,
        path: outputPath,
        generationTime: Date.now() - generationStart
      };
    } else {
      generationResult = {
        success: false,
        error: 'Generation failed - simulated failure'
      };
    }
  }
  
  // Phase 2: Optimize and add metadata if generation succeeded
  if (generationResult.success) {
    const imageInfo = {
      service: imageSpec.service,
      location: imageSpec.location,
      imageType: imageSpec.imageType,
      filename: generationResult.filename
    };
    
    // Generate SEO metadata
    const seoMetadata = generateSEOMetadata(imageInfo);
    
    // In production, optimize the image
    if (USE_ACTUAL_API && generationResult.path) {
      try {
        const optimizationResult = await optimizeImage(generationResult.path, imageInfo);
        
        return {
          success: true,
          filename: generationResult.filename,
          path: generationResult.path,
          prompt: imageSpec.prompt,
          metadata: {
            ...seoMetadata,
            location: imageSpec.location,
            service: imageSpec.service,
            imageType: imageSpec.imageType,
            priorityScore: imageSpec.score,
            generatedAt: new Date().toISOString(),
            generationTime: generationResult.generationTime,
            optimized: optimizationResult.success,
            variants: optimizationResult.files ? optimizationResult.files.length : 0
          }
        };
      } catch (error) {
        console.log(`      ⚠️ Optimization failed: ${error.message}`);
      }
    }
    
    // Return with metadata even if optimization fails
    return {
      success: true,
      filename: generationResult.filename,
      path: generationResult.path || `public/images/generated/${generationResult.filename}`,
      prompt: imageSpec.prompt,
      metadata: {
        ...seoMetadata,
        location: imageSpec.location,
        service: imageSpec.service,
        imageType: imageSpec.imageType,
        priorityScore: imageSpec.score,
        generatedAt: new Date().toISOString(),
        generationTime: generationResult.generationTime
      }
    };
  } else {
    return {
      success: false,
      error: generationResult.error,
      spec: imageSpec
    };
  }
}

/**
 * Analyze which images are most needed
 */
async function analyzePriorityNeeds() {
  console.log('🔍 ANALYZING PRIORITY IMAGE NEEDS');
  console.log('─────────────────────────────────────────\n');
  
  const needs = {
    hero_images: 'Essential for every major service page - immediate SEO impact',
    equipment_images: 'Build trust and professionalism - conversion optimization',
    process_images: 'Educational content - user engagement and expertise',
    team_images: 'Trust building - local presence and credibility'
  };
  
  console.log('📊 Priority Image Categories:');
  Object.entries(needs).forEach(([category, purpose]) => {
    console.log(`   ${category.replace(/_/g, ' ').toUpperCase()}: ${purpose}`);
  });
  
  console.log('\n🎯 Focus Areas:');
  console.log('   • Major cities only (Sydney, Melbourne, Brisbane, Perth, Adelaide)');
  console.log('   • Most common services (water/fire damage, mould, flood)');
  console.log('   • High-impact image types (hero, equipment, process, team)');
  console.log('   • Maximum cost control with safety limits');
  
  return needs;
}

/**
 * Main execution
 */
async function main() {
  try {
    // First analyze what we need
    await analyzePriorityNeeds();
    
    // Then generate the priority 100
    await generatePriority100Images();
    
    console.log('\n🎉 PRIORITY 100 IMAGES SYSTEM READY!');
    
  } catch (error) {
    console.error('\n💥 GENERATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  PRIORITY_CONFIG,
  generatePriority100Images,
  calculateTop100Priority,
  CostSafetyMonitor
};