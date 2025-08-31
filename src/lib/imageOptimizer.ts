// Sharp-free image optimizer for Vercel deployment
// Uses browser-image-compression for client-side optimization

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
    maintainAspectRatio: true };

  /**
   * Optimize an image buffer (simplified version without Sharp)
   * For production use, this should be done client-side or with a cloud service
   */
  static async optimizeBuffer(
    buffer: Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<Buffer> {
    // For now, return the original buffer
    // In production, use a cloud service like Cloudinary or client-side optimization
    console.log('Image optimization skipped (Sharp removed for Vercel compatibility)');
    return buffer;
  }

  /**
   * Optimize a file from disk (simplified version)
   */
  static async optimizeFile(
    inputPath: string,
    outputPath?: string,
    options: ImageOptimizationOptions = {}
  ): Promise<{ 
    success: boolean; 
    outputPath: string; 
    originalSize: number; 
    optimizedSize: number;
  }> {
    try {
      const buffer = await fs.readFile(inputPath);
      const stats = await fs.stat(inputPath);
      
      // For now, just copy the file
      const output = outputPath || inputPath;
      if (output !== inputPath) {
        await fs.writeFile(output, buffer);
      }
      
      return {
        success: true,
        outputPath: output,
        originalSize: stats.size,
        optimizedSize: stats.size, // Same size since no optimization
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }

  /**
   * Get optimization statistics
   */
  static async getOptimizationStats(
    originalBuffer: Buffer,
    optimizedBuffer: Buffer
  ): Promise<{
    originalSize: number;
    optimizedSize: number;
    reduction: number;
    reductionPercent: string;
  }> {
    const originalSize = originalBuffer.length;
    const optimizedSize = optimizedBuffer.length;
    const reduction = originalSize - optimizedSize;
    const reductionPercent = ((reduction / originalSize) * 100).toFixed(2);
    
    return {
      originalSize,
      optimizedSize,
      reduction: Math.max(0, reduction),
      reductionPercent: reduction > 0 ? reductionPercent : '0' };
  }

  /**
   * Generate responsive image sizes (simplified)
   */
  static async generateResponsiveSizes(
    buffer: Buffer,
    sizes: number[] = [480, 768, 1024, 1920]
  ): Promise<{ width: number; buffer: Buffer }[]> {
    // For now, return the original buffer for all sizes
    return sizes.map(width => ({
      width,
      buffer }));
  }

  /**
   * Batch optimize images in a directory (simplified)
   */
  static async batchOptimize(
    directory: string,
    options: ImageOptimizationOptions = {}
  ): Promise<Array<{ file: string; success: boolean; error?: string }>> {
    const results: Array<{ file: string; success: boolean; error?: string }> = [];
    
    try {
      const files = await fs.readdir(directory);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      
      for (const file of imageFiles) {
        const filePath = path.join(directory, file);
        try {
          await this.optimizeFile(filePath, undefined, options);
          results.push({ file, success: true });
        } catch (error) {
          results.push({ 
            file, 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    } catch (error) {
      console.error('Batch optimization error:', error);
    }
    
    return results;
  }

  /**
   * Check if file is an image
   */
  static isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  /**
   * Get image format from filename
   */
  static getFormatFromFilename(filename: string): 'jpeg' | 'png' | 'webp' | 'avif' {
    const ext = path.extname(filename).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        return 'jpeg';
      case '.png':
        return 'png';
      case '.webp':
        return 'webp';
      case '.avif':
        return 'avif';
      default:
        return 'jpeg';
    }
  }
}

// Note: For production image optimization, consider:
// 1. Client-side optimization using browser-image-compression
// 2. Cloud services like Cloudinary, Imgix, or Vercel's built-in image optimization
// 3. Next.js Image component with automatic optimization
// 4. CDN-based image transformation services

export default ImageOptimizer;