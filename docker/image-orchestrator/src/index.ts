/**
 * Disaster Recovery Image Generation Orchestrator
 * Uses OpenRouter API for prompt research and image generation
 */

import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { DisasterRecoveryImageAgent } from './agents/image-agent';
import { PromptResearchEngine } from './engines/prompt-research';
import { ImageOptimizer } from './engines/image-optimizer';
import { QualityController } from './engines/quality-controller';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize services with OpenRouter API key
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('❌ OPENROUTER_API_KEY not found in environment');
  process.exit(1);
}

const imageAgent = new DisasterRecoveryImageAgent({
  apiKey: OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1'
});

const promptEngine = new PromptResearchEngine({
  apiKey: OPENROUTER_API_KEY,
  researchModels: [
    'anthropic/claude-3.5-sonnet',
    'google/gemini-pro',
    'openai/gpt-4-turbo'
  ]
});

const imageOptimizer = new ImageOptimizer({
  outputFormats: ['webp', 'avif'],
  qualitySettings: {
    webp: 85,
    avif: 80,
    progressive: true
  }
});

const qualityController = new QualityController({
  consistencyThreshold: 0.85,
  brandComplianceRequired: true,
  seoOptimizationRequired: true
});

// Routes

/**
 * Analyze all pages for missing images
 */
app.post('/api/analyze-pages', async (req, res) => {
  try {
    console.log('🔍 Starting comprehensive page analysis...');
    
    const { directory = '/app/src' } = req.body;
    
    const analysis = await imageAgent.analyzeAllPages(directory);
    
    console.log(`✅ Analysis complete: ${analysis.totalMissingImages} missing images found`);
    
    res.json({
      success: true,
      ...analysis,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Page analysis failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Research and optimize prompts for specific context
 */
app.post('/api/research-prompts', async (req, res) => {
  try {
    const { context, imageType, priority = 'high' } = req.body;
    
    console.log(`🧠 Researching optimal prompts for: ${context.service || context.location || 'general'}`);
    
    // Multi-model research for best prompts
    const research = await promptEngine.researchOptimalPrompts({
      context,
      imageType,
      priority,
      requireModern3D: true,
      brandConsistency: true,
      australianContext: true
    });
    
    console.log(`✅ Prompt research complete: ${research.variations.length} variations generated`);
    
    res.json({
      success: true,
      research,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Prompt research failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Generate batch of images with quality control
 */
app.post('/api/generate-batch', async (req, res) => {
  try {
    const { 
      images, 
      parallel = 3, 
      qualityCheck = true,
      optimize = true 
    } = req.body;
    
    console.log(`📦 Starting batch generation: ${images.length} images`);
    
    const results = [];
    const errors = [];
    
    // Process in parallel chunks
    for (let i = 0; i < images.length; i += parallel) {
      const chunk = images.slice(i, i + parallel);
      
      const chunkPromises = chunk.map(async (imageConfig) => {
        try {
          // 1. Research optimal prompt if needed
          let finalPrompt = imageConfig.prompt;
          if (imageConfig.researchPrompt) {
            const research = await promptEngine.enhancePrompt(finalPrompt, imageConfig.context);
            finalPrompt = research.optimizedPrompt;
          }
          
          // 2. Generate image
          const generatedImage = await imageAgent.generateImage({
            prompt: finalPrompt,
            model: 'flux-pro-1.1',
            dimensions: imageConfig.dimensions || { width: 1920, height: 1080 },
            style: 'ultra_modern_3d',
            quality: 'high'
          });
          
          // 3. Quality control check
          if (qualityCheck) {
            const qualityResult = await qualityController.validateImage(generatedImage, {
              brandConsistency: true,
              modern3DStyle: true,
              contextRelevance: true,
              seoOptimization: true
            });
            
            if (qualityResult.score < 0.85) {
              console.log(`⚠️ Quality below threshold: ${qualityResult.score.toFixed(2)}`);
              // Could regenerate or flag for manual review
            }
            
            generatedImage.qualityScore = qualityResult.score;
            generatedImage.qualityDetails = qualityResult.details;
          }
          
          // 4. Optimize for web
          if (optimize) {
            const optimized = await imageOptimizer.optimizeForWeb(generatedImage, {
              generateThumbnails: true,
              addWatermark: true,
              seoMetadata: imageConfig.seoMetadata
            });
            
            return {
              original: generatedImage,
              optimized: optimized.formats,
              thumbnails: optimized.thumbnails,
              metadata: optimized.metadata
            };
          }
          
          return generatedImage;
          
        } catch (error) {
          console.error(`❌ Failed to generate image:`, error);
          return {
            error: error.message,
            config: imageConfig
          };
        }
      });
      
      const chunkResults = await Promise.allSettled(chunkPromises);
      
      chunkResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          if (result.value.error) {
            errors.push(result.value);
          } else {
            results.push(result.value);
          }
        } else {
          errors.push({
            error: result.reason.message,
            config: chunk[index]
          });
        }
      });
      
      console.log(`   Progress: ${Math.min(i + parallel, images.length)}/${images.length}`);
    }
    
    console.log(`✅ Batch complete: ${results.length} successful, ${errors.length} failed`);
    
    res.json({
      success: true,
      results,
      errors,
      summary: {
        total: images.length,
        successful: results.length,
        failed: errors.length,
        averageQuality: results.reduce((sum, r) => sum + (r.qualityScore || 0), 0) / results.length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Batch generation failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Generate SEO-optimized images for specific page
 */
app.post('/api/generate-for-page', async (req, res) => {
  try {
    const { pagePath, forceRegenerate = false } = req.body;
    
    console.log(`📄 Generating images for page: ${pagePath}`);
    
    // Analyze what images this page needs
    const pageAnalysis = await imageAgent.analyzePageForImages(pagePath);
    
    if (pageAnalysis.missingImages.length === 0 && !forceRegenerate) {
      return res.json({
        success: true,
        message: 'Page already has all required images',
        existingImages: pageAnalysis.existingImages
      });
    }
    
    // Generate missing images with context
    const generationTasks = pageAnalysis.missingImages.map(missing => ({
      prompt: missing.suggestedPrompt,
      imageType: missing.type,
      priority: missing.priority,
      context: {
        pagePath,
        service: extractServiceFromPath(pagePath),
        location: extractLocationFromPath(pagePath)
      },
      dimensions: getDimensionsForImageType(missing.type),
      seoMetadata: generatePageSEOMetadata(pagePath, missing)
    }));
    
    // Generate with full pipeline
    const batchResult = await fetch(`${req.protocol}://${req.get('host')}/api/generate-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        images: generationTasks,
        parallel: 2,
        qualityCheck: true,
        optimize: true
      })
    });
    
    const batchData = await batchResult.json();
    
    res.json({
      success: true,
      pageAnalysis,
      generationResults: batchData,
      message: `Generated ${batchData.results.length} images for ${pagePath}`
    });
    
  } catch (error) {
    console.error('❌ Page generation failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', async (req, res) => {
  try {
    // Check API connectivity
    const apiCheck = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const apiHealthy = apiCheck.ok;
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: apiHealthy ? 'connected' : 'disconnected',
        imageAgent: 'ready',
        promptEngine: 'ready',
        optimizer: 'ready',
        qualityController: 'ready'
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: process.memoryUsage(),
        uptime: process.uptime()
      }
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Utility functions
function extractServiceFromPath(pagePath: string): string | null {
  const serviceMatch = pagePath.match(/\/(water-damage|fire-damage|mould-remediation|flood-recovery|storm-damage|sewage-cleanup|biohazard-cleaning|trauma-scene|emergency-board-up|contents-restoration)/);
  return serviceMatch ? serviceMatch[1] : null;
}

function extractLocationFromPath(pagePath: string): string | null {
  const locationMatch = pagePath.match(/\/(sydney|melbourne|brisbane|perth|adelaide|gold-coast|darwin|hobart|canberra|newcastle)/i);
  return locationMatch ? locationMatch[1] : null;
}

function getDimensionsForImageType(imageType: string): { width: number; height: number } {
  const dimensions = {
    hero: { width: 1920, height: 1080 },
    process: { width: 800, height: 600 },
    equipment: { width: 600, height: 600 },
    team: { width: 1200, height: 800 },
    grid: { width: 400, height: 300 }
  };
  
  return dimensions[imageType] || { width: 1200, height: 800 };
}

function generatePageSEOMetadata(pagePath: string, missingImage: any): any {
  const service = extractServiceFromPath(pagePath);
  const location = extractLocationFromPath(pagePath);
  
  return {
    alt: `${service ? service.replace(/-/g, ' ') : ''} ${missingImage.type} ${location ? `in ${location}` : ''} - Disaster Recovery Australia`.trim(),
    title: `${location || ''} ${service || ''} ${missingImage.type} | Disaster Recovery`.trim(),
    description: `Professional 3D visualization of ${service ? service.replace(/-/g, ' ') : 'disaster recovery'} ${missingImage.type} ${location ? `in ${location}, Australia` : ''}. 24/7 emergency response.`,
    keywords: [service, location, missingImage.type, 'disaster recovery', '3D visualization', 'Australia'].filter(Boolean)
  };
}

// Start server
app.listen(PORT, () => {
  console.log('🚀 Disaster Recovery Image Orchestrator started');
  console.log(`   Port: ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   API Key: ${OPENROUTER_API_KEY ? '✅ Connected' : '❌ Missing'}`);
  console.log('   Ready for image generation requests');
});

export default app;