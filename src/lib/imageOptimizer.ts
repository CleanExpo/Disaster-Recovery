import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'jpeg' | 'webp' | 'avif' | 'png';
  maintainAspectRatio?: boolean;
}

export class ImageOptimizer {
  private static defaultOptions: ImageOptimizationOptions = {
    quality: 85,
    format: 'webp',
    maintainAspectRatio: true,
  };

  /**
   * Optimize an image buffer
   */
  static async optimizeBuffer(
    buffer: Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<Buffer> {
    const opts = { ...this.defaultOptions, ...options };
    
    let sharpInstance = sharp(buffer);
    
    // Get metadata to determine if resize is needed
    const metadata = await sharpInstance.metadata();
    
    // Resize if dimensions provided
    if (opts.width || opts.height) {
      sharpInstance = sharpInstance.resize(opts.width, opts.height, {
        fit: opts.maintainAspectRatio ? 'inside' : 'cover',
        withoutEnlargement: true,
      });
    }
    
    // Apply format-specific optimizations
    switch (opts.format) {
      case 'jpeg':
        return sharpInstance
          .jpeg({ quality: opts.quality, progressive: true })
          .toBuffer();
      
      case 'webp':
        return sharpInstance
          .webp({ quality: opts.quality })
          .toBuffer();
      
      case 'avif':
        return sharpInstance
          .avif({ quality: opts.quality })
          .toBuffer();
      
      case 'png':
        return sharpInstance
          .png({ compressionLevel: 9, progressive: true })
          .toBuffer();
      
      default:
        // Auto-detect best format based on input
        if (metadata.format === 'png' && metadata.channels === 4) {
          // Has transparency, use WebP
          return sharpInstance.webp({ quality: opts.quality }).toBuffer();
        } else {
          // No transparency, use JPEG
          return sharpInstance
            .jpeg({ quality: opts.quality, progressive: true })
            .toBuffer();
        }
    }
  }

  /**
   * Optimize a file and save it
   */
  static async optimizeFile(
    inputPath: string,
    outputPath?: string,
    options: ImageOptimizationOptions = {}
  ): Promise<void> {
    const buffer = await fs.readFile(inputPath);
    const optimized = await this.optimizeBuffer(buffer, options);
    
    // If no output path, overwrite original
    const savePath = outputPath || inputPath;
    
    // Update extension if format changed
    if (options.format && !outputPath) {
      const parsed = path.parse(savePath);
      parsed.ext = `.${options.format}`;
      delete parsed.base;
      await fs.writeFile(path.format(parsed), optimized);
      
      // Delete original if format changed
      if (path.parse(inputPath).ext !== `.${options.format}`) {
        await fs.unlink(inputPath);
      }
    } else {
      await fs.writeFile(savePath, optimized);
    }
  }

  /**
   * Generate multiple sizes for responsive images
   */
  static async generateResponsiveSizes(
    buffer: Buffer,
    sizes: number[] = [480, 768, 1024, 1920]
  ): Promise<{ width: number; buffer: Buffer }[]> {
    const results = [];
    
    for (const width of sizes) {
      const optimized = await this.optimizeBuffer(buffer, {
        width,
        format: 'webp',
        quality: 85,
      });
      results.push({ width, buffer: optimized });
    }
    
    return results;
  }

  /**
   * Get optimization stats
   */
  static async getOptimizationStats(
    originalBuffer: Buffer,
    optimizedBuffer: Buffer
  ): Promise<{
    originalSize: number;
    optimizedSize: number;
    reduction: number;
    reductionPercent: number;
  }> {
    const originalSize = originalBuffer.length;
    const optimizedSize = optimizedBuffer.length;
    const reduction = originalSize - optimizedSize;
    const reductionPercent = Math.round((reduction / originalSize) * 100);
    
    return {
      originalSize,
      optimizedSize,
      reduction,
      reductionPercent,
    };
  }

  /**
   * Batch optimize multiple files
   */
  static async batchOptimize(
    directory: string,
    options: ImageOptimizationOptions = {}
  ): Promise<{ file: string; stats: any }[]> {
    const results = [];
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);
      
      if (stat.isFile() && this.isImageFile(filePath)) {
        try {
          const originalBuffer = await fs.readFile(filePath);
          const optimizedBuffer = await this.optimizeBuffer(originalBuffer, options);
          const stats = await this.getOptimizationStats(originalBuffer, optimizedBuffer);
          
          // Save optimized version
          await fs.writeFile(filePath, optimizedBuffer);
          
          results.push({
            file,
            stats,
          });
        } catch (error) {
          console.error(`Failed to optimize ${file}:`, error);
        }
      }
    }
    
    return results;
  }

  /**
   * Check if file is an image
   */
  private static isImageFile(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'].includes(ext);
  }
}

export default ImageOptimizer;