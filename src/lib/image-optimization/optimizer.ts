/**
 * COMPREHENSIVE IMAGE Optimisation SYSTEM
 * ========================================
 * 
 * Ensures all images are properly compressed and optimised for performance
 * across all devices (desktop, tablet, mobile).
 */

export interface OptimizationConfig {
  quality: {
    jpg: number;
    png: number;
    webp: number;
  };
  sizes: {
    mobile: number;
    tablet: number;
    desktop: number;
    retina: number;
  };
  formats: string[];
  maxFileSize: number; // in KB
}

export const DEFAULT_OPTIMIZATION_CONFIG: OptimizationConfig = {
  quality: {
    jpg: 85,
    png: 90,
    webp: 85
  },
  sizes: {
    mobile: 640,    // Mobile devices
    tablet: 1024,   // Tablets and small laptops
    desktop: 1920,  // Desktop monitors
    retina: 3840    // 4K and retina displays
  },
  formats: ['webp', 'jpg', 'png'],
  maxFileSize: 500 // 500KB max for hero images
};

/**
 * Image compression targets by use case
 */
export const COMPRESSION_TARGETS = {
  hero: {
    maxSize: 500,  // KB
    quality: 85,
    formats: ['webp', 'jpg']
  },
  training: {
    maxSize: 200,  // KB - Smaller for mobile training
    quality: 80,
    formats: ['webp', 'jpg']
  },
  icons: {
    maxSize: 50,   // KB
    quality: 90,
    formats: ['webp', 'png']
  },
  thumbnails: {
    maxSize: 30,   // KB
    quality: 75,
    formats: ['webp', 'jpg']
  },
  documentation: {
    maxSize: 150,  // KB
    quality: 85,
    formats: ['webp', 'png']
  }
};

/**
 * Responsive image breakpoints
 */
export const BREAKPOINTS = {
  // Mobile first approach
  xs: 320,   // Small phones
  sm: 640,   // Large phones
  md: 768,   // Tablets
  lg: 1024,  // Small laptops
  xl: 1280,  // Desktop
  '2xl': 1536, // Large desktop
  '3xl': 1920, // Full HD
  '4xl': 2560, // 2K
  '5xl': 3840  // 4K
};

/**
 * Device-specific optimisation profiles
 */
export const DEVICE_PROFILES = {
  mobile: {
    maxWidth: 640,
    quality: 75,
    dpr: [1, 2, 3], // Device pixel ratios
    format: 'webp',
    lazyLoad: true,
    priority: 'low'
  },
  tablet: {
    maxWidth: 1024,
    quality: 80,
    dpr: [1, 2],
    format: 'webp',
    lazyLoad: true,
    priority: 'medium'
  },
  desktop: {
    maxWidth: 1920,
    quality: 85,
    dpr: [1, 2],
    format: 'webp',
    lazyLoad: false,
    priority: 'high'
  }
};

/**
 * Training platform image requirements
 */
export const TRAINING_IMAGE_REQUIREMENTS = {
  // Optimised for mobile learning
  mobile: {
    maxWidth: 640,
    maxHeight: 480,
    quality: 75,
    format: 'webp',
    maxFileSize: 100 // KB - Critical for mobile data
  },
  tablet: {
    maxWidth: 1024,
    maxHeight: 768,
    quality: 80,
    format: 'webp',
    maxFileSize: 200 // KB
  },
  desktop: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    format: 'webp',
    maxFileSize: 300 // KB
  }
};

/**
 * Image Optimisation Manager
 */
export class ImageOptimizer {
  private config: OptimizationConfig;
  
  constructor(config?: Partial<OptimizationConfig>) {
    this.config = { ...DEFAULT_OPTIMIZATION_CONFIG, ...config };
  }
  
  /**
   * Generate responsive image srcset
   */
  public generateSrcSet(imagePath: string, sizes: number[]): string {
    return sizes
      .map(size => `${this.getSizedImagePath(imagePath, size)} ${size}w`)
      .join(', ');
  }
  
  /**
   * Get optimised image path for specific size
   */
  private getSizedImagePath(imagePath: string, width: number): string {
    const parts = imagePath.split('.');
    const ext = parts.pop();
    const base = parts.join('.');
    return `${base}-${width}w.${ext}`;
  }
  
  /**
   * Generate picture element for responsive images
   */
  public generatePictureElement(
    imagePath: string,
    alt: string,
    category: keyof typeof COMPRESSION_TARGETS
  ): string {
    const target = COMPRESSION_TARGETS[category];
    
    return `
      <picture>
        <!-- WebP for modern browsers -->
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcset="${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 640)} 1x,
                  ${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 1280)} 2x,
                  ${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 1920)} 3x"
        />
        <source
          type="image/webp"
          media="(max-width: 1024px)"
          srcset="${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 1024)} 1x,
                  ${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 2048)} 2x"
        />
        <source
          type="image/webp"
          srcset="${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 1920)} 1x,
                  ${this.getSizedImagePath(imagePath.replace(/\.[^.]+$/, '.webp'), 3840)} 2x"
        />
        
        <!-- Fallback for older browsers -->
        <source
          media="(max-width: 640px)"
          srcset="${this.getSizedImagePath(imagePath, 640)} 1x,
                  ${this.getSizedImagePath(imagePath, 1280)} 2x"
        />
        <source
          media="(max-width: 1024px)"
          srcset="${this.getSizedImagePath(imagePath, 1024)} 1x,
                  ${this.getSizedImagePath(imagePath, 2048)} 2x"
        />
        
        <!-- Default image -->
        <img
          src="${imagePath}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
          class="w-full h-auto"
        />
      </picture>
    `;
  }
  
  /**
   * Calculate optimal dimensions for device
   */
  public getOptimalDimensions(
    deviceType: 'mobile' | 'tablet' | 'desktop',
    aspectRatio: number = 16/9
  ): { width: number; height: number } {
    const profile = DEVICE_PROFILES[deviceType];
    const width = profile.maxWidth;
    const height = Math.round(width / aspectRatio);
    
    return { width, height };
  }
  
  /**
   * Estimate file size after compression
   */
  public estimateFileSize(
    originalSizeKB: number,
    quality: number,
    format: 'jpg' | 'png' | 'webp'
  ): number {
    const compressionRatios = {
      jpg: 0.15,   // ~85% compression
      png: 0.30,   // ~70% compression
      webp: 0.12   // ~88% compression
    };
    
    const ratio = compressionRatios[format];
    const qualityFactor = quality / 100;
    
    return Math.round(originalSizeKB * ratio * qualityFactor);
  }
  
  /**
   * Check if image needs optimisation
   */
  public needsOptimization(
    fileSizeKB: number,
    category: keyof typeof COMPRESSION_TARGETS
  ): boolean {
    const target = COMPRESSION_TARGETS[category];
    return fileSizeKB > target.maxSize;
  }
  
  /**
   * Generate optimisation report
   */
  public generateOptimizationReport(images: Array<{
    path: string;
    sizeKB: number;
    category: keyof typeof COMPRESSION_TARGETS;
  }>): {
    needsOptimization: Array<any>;
    optimised: Array<any>;
    totalSavings: number;
  } {
    const needsOptimization = [];
    const optimised = [];
    let totalSavings = 0;
    
    for (const image of images) {
      if (this.needsOptimization(image.sizeKB, image.category)) {
        const target = COMPRESSION_TARGETS[image.category];
        const estimatedSize = this.estimateFileSize(
          image.sizeKB,
          target.quality,
          'webp'
        );
        const savings = image.sizeKB - estimatedSize;
        
        needsOptimization.push({
          ...image,
          currentSize: image.sizeKB,
          targetSize: target.maxSize,
          estimatedSize,
          savings
        });
        
        totalSavings += savings;
      } else {
        optimised.push(image);
      }
    }
    
    return {
      needsOptimization,
      optimised,
      totalSavings
    };
  }
}

/**
 * Lazy Loading Manager
 */
export class LazyLoadManager {
  /**
   * Generate intersection observer for lazy loading
   */
  public static createObserver(options?: IntersectionObserverInit): string {
    return `
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, ${JSON.stringify(options || { rootMargin: '50px' })});
      
      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    `;
  }
  
  /**
   * Generate lazy load image HTML
   */
  public static generateLazyImage(
    src: string,
    alt: string,
    placeholder?: string
  ): string {
    const placeholderSrc = placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="%23f3f4f6"/%3E%3C/svg%3E';
    
    return `
      <img
        class="lazy w-full h-auto"
        src="${placeholderSrc}"
        data-src="${src}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
      />
    `;
  }
}

/**
 * Performance Budget Manager
 */
export class PerformanceBudget {
  private static readonly BUDGETS = {
    mobile: {
      totalImages: 500,    // KB total
      largestImage: 100,   // KB
      criticalImages: 200  // KB for above-fold
    },
    tablet: {
      totalImages: 1000,   // KB total
      largestImage: 200,   // KB
      criticalImages: 400  // KB for above-fold
    },
    desktop: {
      totalImages: 2000,   // KB total
      largestImage: 500,   // KB
      criticalImages: 800  // KB for above-fold
    }
  };
  
  /**
   * Check if page meets performance budget
   */
  public static checkBudget(
    device: 'mobile' | 'tablet' | 'desktop',
    images: Array<{ sizeKB: number; critical?: boolean }>
  ): {
    withinBudget: boolean;
    totalSize: number;
    budget: number;
    criticalSize: number;
    recommendations: string[];
  } {
    const budget = this.BUDGETS[device];
    const totalSize = images.reduce((sum, img) => sum + img.sizeKB, 0);
    const criticalSize = images
      .filter(img => img.critical)
      .reduce((sum, img) => sum + img.sizeKB, 0);
    
    const recommendations: string[] = [];
    
    if (totalSize > budget.totalImages) {
      recommendations.push(`Reduce total image size by ${totalSize - budget.totalImages}KB`);
    }
    
    const largestImage = Math.max(...images.map(img => img.sizeKB));
    if (largestImage > budget.largestImage) {
      recommendations.push(`Largest image (${largestImage}KB) exceeds budget (${budget.largestImage}KB)`);
    }
    
    if (criticalSize > budget.criticalImages) {
      recommendations.push(`Critical images (${criticalSize}KB) exceed budget (${budget.criticalImages}KB)`);
    }
    
    return {
      withinBudget: totalSize <= budget.totalImages,
      totalSize,
      budget: budget.totalImages,
      criticalSize,
      recommendations
    };
  }
}

/**
 * CDN URL Generator
 */
export class CDNManager {
  private static readonly CDN_BASE = process.env.NEXT_PUBLIC_CDN_URL || '';
  
  /**
   * Generate CDN URL with optimisation parameters
   */
  public static getCDNUrl(
    imagePath: string,
    options?: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'auto' | 'webp' | 'jpg' | 'png';
      fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    }
  ): string {
    if (!this.CDN_BASE) {
      return imagePath; // Return original if no CDN configured
    }
    
    const params = new URLSearchParams();
    
    if (options?.width) params.append('w', options.width.toString());
    if (options?.height) params.append('h', options.height.toString());
    if (options?.quality) params.append('q', options.quality.toString());
    if (options?.format) params.append('f', options.format);
    if (options?.fit) params.append('fit', options.fit);
    
    const queryString = params.toString();
    return `${this.CDN_BASE}${imagePath}${queryString ? '?' + queryString : ''}`;
  }
}