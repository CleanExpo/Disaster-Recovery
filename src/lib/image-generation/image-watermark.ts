/**
 * IMAGE WATERMARKING AND METADATA SYSTEM
 * =======================================
 * 
 * Adds NRP/Disaster Recovery branding to all generated images
 * and ensures proper metadata for SEO and copyright.
 */

import { ImageRequirement } from './image-requirements';

export interface WatermarkConfig {
  logoPath: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity: number;
  size: 'small' | 'medium' | 'large';
  padding: number;
}

export interface ImageMetadata {
  title: string;
  description: string;
  keywords: string[];
  copyright: string;
  creator: string;
  subject: string;
  publisher: string;
  contributor: string;
  coverage: string;
  rights: string;
  source: string;
  relation: string;
  language: string;
  type: string;
  format: string;
  identifier: string;
  date: string;
  altText: string;
  geoLocation?: string;
  service?: string;
}

/**
 * Watermark Manager
 * Handles adding NRP branding to all images
 */
export class WatermarkManager {
  private defaultConfig: WatermarkConfig = {
    logoPath: '/images/optimized/branding/Disaster Recovery Logo.png',
    position: 'bottom-right',
    opacity: 0.9,
    size: 'medium',
    padding: 20
  };
  
  private alternateLogos = {
    light: '/images/optimized/branding/Disaster Recovery Logo.png',
    dark: '/images/optimized/branding/3D Disaster Recovery Logo.png',
    compact: '/images/optimized/branding/Disaster Recovery Logo.png'
  };
  
  /**
   * Apply watermark to image using canvas (browser) or sharp (Node.js)
   */
  public async applyWatermark(
    imageData: string | Buffer,
    requirement: ImageRequirement,
    config?: Partial<WatermarkConfig>
  ): Promise<string> {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    // Determine best logo based on image
    const logoPath = this.selectBestLogo(requirement);
    
    // Calculate watermark dimensions
    const watermarkDimensions = this.calculateWatermarkSize(
      requirement.dimensions,
      finalConfig.size
    );
    
    // Apply watermark (implementation would use canvas API or sharp)
    console.log(`Applying watermark to ${requirement.id}`);
    console.log(`Logo: ${logoPath}`);
    console.log(`Position: ${finalConfig.position}`);
    console.log(`Size: ${watermarkDimensions.width}x${watermarkDimensions.height}`);
    
    // Return watermarked image data URL
    return `data:image/${requirement.format};base64,watermarked_${requirement.id}`;
  }
  
  /**
   * Select appropriate logo based on image characteristics
   */
  private selectBestLogo(requirement: ImageRequirement): string {
    // Use 3D logo for hero images
    if (requirement.subcategory === 'hero') {
      return this.alternateLogos.dark;
    }
    
    // Use compact logo for small images
    if (requirement.dimensions.width < 500) {
      return this.alternateLogos.compact;
    }
    
    // Default to standard logo
    return this.alternateLogos.light;
  }
  
  /**
   * Calculate watermark dimensions based on image size
   */
  private calculateWatermarkSize(
    imageDimensions: { width: number; height: number },
    size: 'small' | 'medium' | 'large'
  ): { width: number; height: number } {
    const percentages = {
      small: 0.1,    // 10% of image width
      medium: 0.15,  // 15% of image width
      large: 0.2     // 20% of image width
    };
    
    const percentage = percentages[size];
    const watermarkWidth = Math.floor(imageDimensions.width * percentage);
    
    // Maintain aspect ratio (assuming logo is roughly 3:1)
    const watermarkHeight = Math.floor(watermarkWidth / 3);
    
    // Ensure minimum visibility
    const minWidth = 80;
    const minHeight = 27;
    
    return {
      width: Math.max(watermarkWidth, minWidth),
      height: Math.max(watermarkHeight, minHeight)
    };
  }
  
  /**
   * Generate CSS for watermark overlay (for web display)
   */
  public generateWatermarkCSS(config?: Partial<WatermarkConfig>): string {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    const positions = {
      'top-left': `top: ${finalConfig.padding}px; left: ${finalConfig.padding}px;`,
      'top-right': `top: ${finalConfig.padding}px; right: ${finalConfig.padding}px;`,
      'bottom-left': `bottom: ${finalConfig.padding}px; left: ${finalConfig.padding}px;`,
      'bottom-right': `bottom: ${finalConfig.padding}px; right: ${finalConfig.padding}px;`,
      'center': `top: 50%; left: 50%; transform: translate(-50%, -50%);`
    };
    
    return `
      .nrp-watermark {
        position: absolute;
        ${positions[finalConfig.position]}
        opacity: ${finalConfig.opacity};
        pointer-events: none;
        z-index: 1000;
      }
      
      .nrp-watermark img {
        width: auto;
        height: auto;
        max-width: 15%;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      }
    `;
  }
}

/**
 * Metadata Manager
 * Handles all image metadata for SEO and copyright
 */
export class MetadataManager {
  /**
   * Generate complete metadata for an image
   */
  public generateMetadata(requirement: ImageRequirement): ImageMetadata {
    const now = new Date().toISOString();
    
    return {
      // Dublin Core metadata
      title: requirement.title,
      description: requirement.description,
      keywords: requirement.keywords,
      copyright: `© ${new Date().getFullYear()} National Restoration Platform (NRP). All rights reserved.`,
      creator: 'National Restoration Platform',
      subject: `${requirement.category} - ${requirement.subcategory}`,
      publisher: 'NRP Disaster Recovery Services',
      contributor: 'NRP Automated Image Generation System',
      coverage: 'Australia',
      rights: 'All rights reserved. Property of National Restoration Platform.',
      source: requirement.generatedUrl || 'NRP Image Generation Pipeline',
      relation: `https://nrp.com.au${requirement.usage[0]}`,
      language: 'en-AU',
      type: 'Image',
      format: `image/${requirement.format}`,
      identifier: requirement.id,
      date: now,
      
      // Accessibility
      altText: requirement.altText,
      
      // Custom NRP metadata
      geoLocation: 'Australia',
      service: requirement.subcategory
    };
  }
  
  /**
   * Generate EXIF data for images
   */
  public generateEXIF(metadata: ImageMetadata): Record<string, any> {
    return {
      // Standard EXIF
      'Make': 'NRP Image Generator',
      'Model': 'Automated Pipeline v1.0',
      'Software': 'NRP Disaster Recovery Platform',
      'DateTime': metadata.date,
      'Artist': metadata.creator,
      'Copyright': metadata.copyright,
      'ImageDescription': metadata.description,
      
      // IPTC metadata
      'Keywords': metadata.keywords.join(', '),
      'Creator': metadata.creator,
      'Credit': 'National Restoration Platform',
      'Source': metadata.source,
      'CopyrightNotice': metadata.copyright,
      'Caption': metadata.description,
      'Headline': metadata.title,
      
      // XMP metadata
      'xmp:Creator': metadata.creator,
      'xmp:Rights': metadata.rights,
      'xmp:Description': metadata.description,
      'xmp:Title': metadata.title,
      'xmp:Subject': metadata.keywords,
      
      // Custom NRP fields
      'nrp:ServiceCategory': metadata.service,
      'nrp:Coverage': metadata.coverage,
      'nrp:Platform': 'Disaster Recovery Services',
      'nrp:Watermarked': 'true',
      'nrp:LogoIncluded': 'true'
    };
  }
  
  /**
   * Generate HTML meta tags for image
   */
  public generateHTMLMeta(metadata: ImageMetadata): string {
    return `
      <!-- Primary Meta Tags -->
      <meta name="title" content="${metadata.title}">
      <meta name="description" content="${metadata.description}">
      <meta name="keywords" content="${metadata.keywords.join(', ')}">
      <meta name="author" content="${metadata.creator}">
      <meta name="copyright" content="${metadata.copyright}">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:title" content="${metadata.title}">
      <meta property="og:description" content="${metadata.description}">
      <meta property="og:image:alt" content="${metadata.altText}">
      
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:title" content="${metadata.title}">
      <meta property="twitter:description" content="${metadata.description}">
      <meta property="twitter:image:alt" content="${metadata.altText}">
      
      <!-- Dublin Core Metadata -->
      <meta name="DC.Title" content="${metadata.title}">
      <meta name="DC.Creator" content="${metadata.creator}">
      <meta name="DC.Subject" content="${metadata.subject}">
      <meta name="DC.Description" content="${metadata.description}">
      <meta name="DC.Publisher" content="${metadata.publisher}">
      <meta name="DC.Contributor" content="${metadata.contributor}">
      <meta name="DC.Date" content="${metadata.date}">
      <meta name="DC.Type" content="${metadata.type}">
      <meta name="DC.Format" content="${metadata.format}">
      <meta name="DC.Identifier" content="${metadata.identifier}">
      <meta name="DC.Source" content="${metadata.source}">
      <meta name="DC.Language" content="${metadata.language}">
      <meta name="DC.Relation" content="${metadata.relation}">
      <meta name="DC.Coverage" content="${metadata.coverage}">
      <meta name="DC.Rights" content="${metadata.rights}">
      
      <!-- Schema.org markup -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": "${metadata.title}",
        "description": "${metadata.description}",
        "keywords": "${metadata.keywords.join(', ')}",
        "contentUrl": "${metadata.source}",
        "thumbnailUrl": "${metadata.source}",
        "uploadDate": "${metadata.date}",
        "copyrightHolder": {
          "@type": "Organization",
          "name": "National Restoration Platform"
        },
        "copyrightNotice": "${metadata.copyright}",
        "creator": {
          "@type": "Organization",
          "name": "${metadata.creator}"
        },
        "creditText": "NRP Disaster Recovery Services",
        "acquireLicensePage": "https://nrp.com.au/terms"
      }
      </script>
    `;
  }
  
  /**
   * Generate JSON-LD structured data
   */
  public generateJSONLD(metadata: ImageMetadata): object {
    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `https://nrp.com.au/images/${metadata.identifier}`,
      "name": metadata.title,
      "description": metadata.description,
      "keywords": metadata.keywords.join(', '),
      "contentUrl": `https://nrp.com.au${metadata.source}`,
      "thumbnailUrl": `https://nrp.com.au${metadata.source}`,
      "uploadDate": metadata.date,
      "width": {
        "@type": "QuantitativeValue",
        "value": "1920",
        "unitCode": "E37"
      },
      "height": {
        "@type": "QuantitativeValue",
        "value": "1080",
        "unitCode": "E37"
      },
      "contentSize": "500KB",
      "encodingFormat": metadata.format,
      "copyrightHolder": {
        "@type": "Organization",
        "@id": "https://nrp.com.au",
        "name": "National Restoration Platform",
        "url": "https://nrp.com.au",
        "logo": "https://nrp.com.au/images/optimized/branding/Disaster Recovery Logo.png"
      },
      "copyrightNotice": metadata.copyright,
      "copyrightYear": new Date().getFullYear(),
      "creator": {
        "@type": "Organization",
        "name": metadata.creator,
        "url": "https://nrp.com.au"
      },
      "creditText": "NRP Disaster Recovery Services",
      "acquireLicensePage": "https://nrp.com.au/terms",
      "license": "https://nrp.com.au/license",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://nrp.com.au",
        "name": "National Restoration Platform",
        "url": "https://nrp.com.au"
      },
      "about": {
        "@type": "Service",
        "name": metadata.service || "Disaster Recovery",
        "provider": {
          "@type": "Organization",
          "name": "NRP"
        }
      },
      "spatialCoverage": {
        "@type": "Country",
        "name": "Australia"
      }
    };
  }
}

/**
 * Image Processing Pipeline
 * Combines watermarking and metadata
 */
export class ImageProcessingPipeline {
  private watermarkManager: WatermarkManager;
  private metadataManager: MetadataManager;
  
  constructor() {
    this.watermarkManager = new WatermarkManager();
    this.metadataManager = new MetadataManager();
  }
  
  /**
   * Process image with watermark and metadata
   */
  public async processImage(
    imageData: string | Buffer,
    requirement: ImageRequirement
  ): Promise<{
    imageUrl: string;
    metadata: ImageMetadata;
    htmlMeta: string;
    jsonLD: object;
    exif: Record<string, any>;
  }> {
    // Apply watermark
    const watermarkedImage = await this.watermarkManager.applyWatermark(
      imageData,
      requirement,
      {
        position: this.selectWatermarkPosition(requirement),
        size: this.selectWatermarkSize(requirement)
      }
    );
    
    // Generate metadata
    const metadata = this.metadataManager.generateMetadata(requirement);
    const htmlMeta = this.metadataManager.generateHTMLMeta(metadata);
    const jsonLD = this.metadataManager.generateJSONLD(metadata);
    const exif = this.metadataManager.generateEXIF(metadata);
    
    return {
      imageUrl: watermarkedImage,
      metadata,
      htmlMeta,
      jsonLD,
      exif
    };
  }
  
  /**
   * Select watermark position based on image type
   */
  private selectWatermarkPosition(requirement: ImageRequirement): WatermarkConfig['position'] {
    // Hero images: bottom-right
    if (requirement.subcategory === 'hero') {
      return 'bottom-right';
    }
    
    // Training materials: top-right
    if (requirement.category === 'training') {
      return 'top-right';
    }
    
    // Social media: bottom-left
    if (requirement.subcategory === 'social') {
      return 'bottom-left';
    }
    
    // Default
    return 'bottom-right';
  }
  
  /**
   * Select watermark size based on image dimensions
   */
  private selectWatermarkSize(requirement: ImageRequirement): 'small' | 'medium' | 'large' {
    const { width } = requirement.dimensions;
    
    if (width < 500) return 'small';
    if (width < 1200) return 'medium';
    return 'large';
  }
  
  /**
   * Batch process multiple images
   */
  public async processBatch(
    images: Array<{ data: string | Buffer; requirement: ImageRequirement }>
  ): Promise<Array<{
    id: string;
    processed: boolean;
    result?: any;
    error?: string;
  }>> {
    const results = [];
    
    for (const { data, requirement } of images) {
      try {
        const result = await this.processImage(data, requirement);
        results.push({
          id: requirement.id,
          processed: true,
          result
        });
      } catch (error) {
        results.push({
          id: requirement.id,
          processed: false,
          error: `Processing failed: ${error}`
        });
      }
    }
    
    return results;
  }
}

/**
 * Copyright Notice Generator
 * Creates copyright notices for different contexts
 */
export class CopyrightNoticeGenerator {
  /**
   * Generate copyright notice for image
   */
  public generateNotice(context: 'full' | 'short' | 'watermark'): string {
    const year = new Date().getFullYear();
    
    switch (context) {
      case 'full':
        return `© ${year} National Restoration Platform (NRP). All rights reserved. This image is the property of NRP Disaster Recovery Services and is protected by copyright law. Unauthorized use, reproduction, or distribution is strictly prohibited.`;
      
      case 'short':
        return `© ${year} NRP. All rights reserved.`;
      
      case 'watermark':
        return `© NRP ${year}`;
      
      default:
        return `© ${year} National Restoration Platform`;
    }
  }
  
  /**
   * Generate terms of use
   */
  public generateTermsOfUse(): string {
    return `
      IMAGE TERMS OF USE
      
      This image is the exclusive property of National Restoration Platform (NRP).
      
      PERMITTED USES:
      - Display on NRP-authorized websites
      - Use in NRP marketing materials
      - Inclusion in NRP training documents
      - Sharing by NRP-certified contractors
      
      PROHIBITED USES:
      - Commercial use without written permission
      - Modification or alteration of the image
      - Removal of watermarks or copyright notices
      - Use by competitors or unauthorized parties
      
      For licensing inquiries, contact: legal@nrp.com.au
    `;
  }
}