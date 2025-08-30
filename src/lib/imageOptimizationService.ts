import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import chokidar from 'chokidar';
import PQueue from 'p-queue';
import sharp from 'sharp';
import crypto from 'crypto';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

// Configuration for different image types and contexts
export const IMAGE_OPTIMIZATION_CONFIG = {
  // Optimization profiles
  profiles: {
    thumbnail: {
      maxWidth: 400,
      maxHeight: 400,
      quality: 70,
      format: 'webp' as const,
      targetSizeKB: 50,
    },
    hero: {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      format: 'webp' as const,
      targetSizeKB: 500,
    },
    content: {
      maxWidth: 1200,
      maxHeight: 800,
      quality: 80,
      format: 'webp' as const,
      targetSizeKB: 300,
    },
    logo: {
      maxWidth: 500,
      maxHeight: 500,
      quality: 90,
      format: 'webp' as const,
      targetSizeKB: 100,
    },
    icon: {
      maxWidth: 128,
      maxHeight: 128,
      quality: 90,
      format: 'png' as const,
      targetSizeKB: 30,
    },
  },
  
  // Directory-based rules
  directoryRules: {
    '/public/images/thumbnails': 'thumbnail',
    '/public/images/heroes': 'hero',
    '/public/images/logos': 'logo',
    '/public/images/icons': 'icon',
    '/public/images/places': 'content',
    '/public/images/equipment': 'content',
    '/public/images/damage': 'content',
    '/public/uploads': 'content',
    '/uploads': 'content',
  },
  
  // File patterns to ignore
  ignorePatterns: [
    '*.svg',
    '*.ico',
    '*-optimized.*',
    '*.min.*',
    '.DS_Store',
    'Thumbs.db',
  ],
  
  // Maximum file size before mandatory optimization (in MB)
  maxFileSizeMB: 5,
  
  // Minimum file size to trigger optimization (in KB)
  minFileSizeKB: 100,
};

export class ImageOptimizationService {
  private static instance: ImageOptimizationService;
  private watcher: chokidar.FSWatcher | null = null;
  private queue: PQueue;
  private optimizedCache: Map<string, string> = new Map();
  private isRunning: boolean = false;
  
  private constructor() {
    // Process queue with concurrency limit
    this.queue = new PQueue({ concurrency: 2 });
  }
  
  public static getInstance(): ImageOptimizationService {
    if (!ImageOptimizationService.instance) {
      ImageOptimizationService.instance = new ImageOptimizationService();
    }
    return ImageOptimizationService.instance;
  }
  
  /**
   * Start the autonomous image optimization service
   */
  public async start(directories?: string[]): Promise<void> {
    if (this.isRunning) {
      console.log('🔄 Image optimization service already running');
      return;
    }
    
    this.isRunning = true;
    console.log('🚀 Starting autonomous image optimization service...');
    
    // Default directories to watch
    const watchDirs = directories || [
      path.join(process.cwd(), 'public', 'images'),
      path.join(process.cwd(), 'public', 'uploads'),
      path.join(process.cwd(), 'uploads'),
    ];
    
    // Filter existing directories
    const existingDirs = watchDirs.filter(dir => {
      try {
        return fs.statSync(dir).isDirectory();
      } catch {
        return false;
      }
    });
    
    if (existingDirs.length === 0) {
      console.log('⚠️ No directories to watch');
      return;
    }
    
    // Initial optimization of existing images
    console.log('🔍 Scanning existing images...');
    for (const dir of existingDirs) {
      await this.optimizeDirectory(dir);
    }
    
    // Set up file watcher
    this.watcher = chokidar.watch(existingDirs, {
      ignored: IMAGE_OPTIMIZATION_CONFIG.ignorePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    });
    
    // Watch for new or changed images
    this.watcher
      .on('add', (filePath) => this.handleFileChange(filePath, 'added'))
      .on('change', (filePath) => this.handleFileChange(filePath, 'changed'))
      .on('error', (error) => console.error('❌ Watcher error:', error));
    
    console.log('✅ Image optimization service started');
    console.log(`👁️ Watching directories: ${existingDirs.join(', ')}`);
  }
  
  /**
   * Stop the service
   */
  public async stop(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
    }
    
    await this.queue.onIdle();
    this.isRunning = false;
    console.log('🛑 Image optimization service stopped');
  }
  
  /**
   * Handle file changes
   */
  private async handleFileChange(filePath: string, event: string): Promise<void> {
    if (!this.shouldOptimize(filePath)) {
      return;
    }
    
    console.log(`📸 Image ${event}: ${path.basename(filePath)}`);
    
    // Add to queue for optimization
    this.queue.add(async () => {
      try {
        await this.optimizeImage(filePath);
      } catch (error) {
        console.error(`❌ Failed to optimize ${filePath}:`, error);
      }
    });
  }
  
  /**
   * Check if file should be optimized
   */
  private shouldOptimize(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
    
    if (!supportedFormats.includes(ext)) {
      return false;
    }
    
    // Check ignore patterns
    const fileName = path.basename(filePath);
    for (const pattern of IMAGE_OPTIMIZATION_CONFIG.ignorePatterns) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
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
   * Get optimization profile for a file
   */
  private getOptimizationProfile(filePath: string): keyof typeof IMAGE_OPTIMIZATION_CONFIG.profiles {
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    // Check directory rules
    for (const [pattern, profile] of Object.entries(IMAGE_OPTIMIZATION_CONFIG.directoryRules)) {
      if (normalizedPath.includes(pattern)) {
        return profile as keyof typeof IMAGE_OPTIMIZATION_CONFIG.profiles;
      }
    }
    
    // Check filename patterns
    const fileName = path.basename(filePath).toLowerCase();
    if (fileName.includes('thumb') || fileName.includes('tn_')) {
      return 'thumbnail';
    }
    if (fileName.includes('hero') || fileName.includes('banner')) {
      return 'hero';
    }
    if (fileName.includes('logo') || fileName.includes('icon')) {
      return 'logo';
    }
    
    // Default profile
    return 'content';
  }
  
  /**
   * Optimize a single image
   */
  public async optimizeImage(filePath: string): Promise<void> {
    try {
      const stats = await stat(filePath);
      const fileSizeKB = stats.size / 1024;
      
      // Skip if file is too small
      if (fileSizeKB < IMAGE_OPTIMIZATION_CONFIG.minFileSizeKB) {
        console.log(`⏭️ Skipping ${path.basename(filePath)} (too small: ${fileSizeKB.toFixed(1)}KB)`);
        return;
      }
      
      // Get optimization profile
      const profileName = this.getOptimizationProfile(filePath);
      const profile = IMAGE_OPTIMIZATION_CONFIG.profiles[profileName];
      
      console.log(`🔧 Optimizing ${path.basename(filePath)} with profile: ${profileName}`);
      
      // Read original image
      const buffer = await readFile(filePath);
      
      // Calculate hash to check if already optimized
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      if (this.optimizedCache.has(hash)) {
        console.log(`✅ Already optimized: ${path.basename(filePath)}`);
        return;
      }
      
      // Optimize image
      let optimizedBuffer = buffer;
      let quality = profile.quality;
      let attempts = 0;
      const maxAttempts = 5;
      
      // Progressive quality reduction to meet target size
      while (attempts < maxAttempts) {
        const sharpInstance = sharp(buffer);
        
        // Get metadata
        const metadata = await sharpInstance.metadata();
        
        // Resize if needed
        if (metadata.width && metadata.width > profile.maxWidth) {
          sharpInstance.resize(profile.maxWidth, null, {
            withoutEnlargement: true,
            fit: 'inside',
          });
        }
        
        // Convert format and compress
        if (profile.format === 'webp') {
          optimizedBuffer = await sharpInstance.webp({ quality }).toBuffer();
        } else if (profile.format === 'png') {
          optimizedBuffer = await sharpInstance.png({ 
            compressionLevel: 9,
            palette: true,
          }).toBuffer();
        } else {
          optimizedBuffer = await sharpInstance.jpeg({ 
            quality,
            progressive: true,
          }).toBuffer();
        }
        
        const optimizedSizeKB = optimizedBuffer.length / 1024;
        
        // Check if we meet the target size
        if (optimizedSizeKB <= profile.targetSizeKB || quality <= 50) {
          break;
        }
        
        // Reduce quality for next attempt
        quality -= 10;
        attempts++;
      }
      
      // Calculate savings
      const originalSizeKB = buffer.length / 1024;
      const optimizedSizeKB = optimizedBuffer.length / 1024;
      const savings = ((originalSizeKB - optimizedSizeKB) / originalSizeKB * 100).toFixed(1);
      
      // Only save if we achieved meaningful compression
      if (parseFloat(savings) > 10) {
        // Backup original if first optimization
        const backupPath = filePath.replace(/(\.[^.]+)$/, '.original$1');
        if (!fs.existsSync(backupPath)) {
          await writeFile(backupPath, buffer);
        }
        
        // Save optimized image
        await writeFile(filePath, optimizedBuffer);
        
        // Cache the optimization
        this.optimizedCache.set(hash, filePath);
        
        console.log(`✅ Optimized ${path.basename(filePath)}: ${originalSizeKB.toFixed(1)}KB → ${optimizedSizeKB.toFixed(1)}KB (-${savings}%)`);
      } else {
        console.log(`⏭️ Skipping ${path.basename(filePath)} (already optimal)`);
      }
    } catch (error) {
      console.error(`❌ Error optimizing ${filePath}:`, error);
    }
  }
  
  /**
   * Optimize all images in a directory
   */
  public async optimizeDirectory(dirPath: string, recursive: boolean = true): Promise<void> {
    try {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const fileStat = await stat(fullPath);
        
        if (fileStat.isDirectory() && recursive) {
          await this.optimizeDirectory(fullPath, recursive);
        } else if (fileStat.isFile() && this.shouldOptimize(fullPath)) {
          await this.queue.add(async () => {
            await this.optimizeImage(fullPath);
          });
        }
      }
      
      // Wait for queue to process
      await this.queue.onIdle();
    } catch (error) {
      console.error(`❌ Error optimizing directory ${dirPath}:`, error);
    }
  }
  
  /**
   * Get service statistics
   */
  public getStats(): {
    isRunning: boolean;
    queueSize: number;
    optimizedCount: number;
  } {
    return {
      isRunning: this.isRunning,
      queueSize: this.queue.size,
      optimizedCount: this.optimizedCache.size,
    };
  }
}

// Export singleton instance
export const imageOptimizationService = ImageOptimizationService.getInstance();