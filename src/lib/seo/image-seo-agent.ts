/**
 * Image SEO Optimisation Agent
 * Intelligent system for optimising images for Google Search ranking
 * Implements best practices for image SEO, accessibility, and performance
 */

import { IMAGE_LIBRARY, type ImageAsset } from '@/config/image-library';

export interface SEOOptimizedImage {
  // Core identifiers
  id: string;
  originalFilename: string;
  
  // SEO-optimised naming
  seoFilename: string;
  
  // SEO metadata
  title: string;
  altText: string;
  caption: string;
  description: string;
  
  // Keywords and context
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  semanticKeywords: string[];
  
  // Structured data
  schemaType: 'ImageObject' | 'Product' | 'Service' | 'HowTo';
  schemaData: any;
  
  // Technical SEO
  formats: {
    webp: string;
    avif?: string;
    jpg: string;
  };
  responsiveSizes: {
    mobile: string;    // 320-768px
    tablet: string;    // 768-1024px
    desktop: string;   // 1024-1920px
    large: string;     // 1920px+
  };
  
  // Performance metrics
  loadingStrategy: 'eager' | 'lazy';
  priority: 'high' | 'medium' | 'low';
  aspectRatio: string;
  dimensions: {
    width: number;
    height: number;
  };
  
  // Context and placement
  recommendedPlacement: 'above-fold' | 'in-content' | 'gallery';
  relatedContent: string[];
  pageContext: string;
  
  // Local SEO
  geoTargeting?: {
    location: string;
    region: string;
    serviceArea: string[];
  };
}

/**
 * SEO Keyword Database for Disaster Recovery
 */
const SEO_KEYWORDS = {
  // Primary service keywords
  waterDamage: {
    primary: 'water damage restoration',
    secondary: ['flood damage repair', 'water extraction', 'emergency water removal'],
    longTail: [
      'water damage restoration services near me',
      '24 hour emergency water damage repair',
      'professional water damage restoration company',
      'residential water damage cleanup services'
    ],
    semantic: ['flooding', 'water mitigation', 'moisture removal', 'structural drying']
  },
  
  fireDamage: {
    primary: 'fire damage restoration',
    secondary: ['smoke damage cleanup', 'fire restoration services', 'soot removal'],
    longTail: [
      'fire and smoke damage restoration services',
      'emergency fire damage cleanup company',
      'residential fire damage repair near me',
      'commercial fire restoration specialists'
    ],
    semantic: ['smoke odour removal', 'fire remediation', 'burn damage', 'charred materials']
  },
  
  mouldRemediation: {
    primary: 'mould remediation',
    secondary: ['mould removal', 'black mould treatment', 'mould inspection'],
    longTail: [
      'professional mould remediation services',
      'black mould removal specialists near me',
      'toxic mould inspection and removal',
      'certified mould remediation company'
    ],
    semantic: ['fungus', 'mildew', 'spores', 'air quality', 'moisture control']
  },
  
  equipment: {
    airMovers: {
      primary: 'industrial air movers',
      secondary: ['drying equipment', 'restoration fans', 'carpet dryers'],
      longTail: [
        'professional grade air movers for water damage',
        'industrial strength drying fans rental',
        'high velocity air movers for restoration'
      ]
    },
    dehumidifiers: {
      primary: 'commercial dehumidifiers',
      secondary: ['LGR dehumidifier', 'moisture removal equipment', 'desiccant dehumidifier'],
      longTail: [
        'industrial dehumidifier for water damage',
        'LGR dehumidifier rental near me',
        'commercial grade moisture removal equipment'
      ]
    },
    extractors: {
      primary: 'water extraction equipment',
      secondary: ['flood pumps', 'wet vacuum', 'water removal machines'],
      longTail: [
        'professional water extraction equipment rental',
        'industrial water pump for flooding',
        'emergency water removal equipment'
      ]
    }
  },
  
  // Location-based keywords
  locations: {
    australia: ['Australia', 'Australian'],
    states: ['Queensland', 'NSW', 'Victoria', 'Western Australia', 'South Australia'],
    cities: ['Brisbane', 'Sydney', 'Melbourne', 'Perth', 'Adelaide', 'Gold Coast'],
    modifiers: ['near me', 'local', 'emergency', '24/7', 'same day']
  }
};

/**
 * Image SEO Optimisation Agent Class
 */
export class ImageSEOAgent {
  /**
   * Generate SEO-optimised metadata for an image
   */
  static optimizeImage(
    image: ImageAsset,
    context: {
      pageTopic?: string;
      location?: string;
      serviceType?: string;
    } = {}
  ): SEOOptimizedImage {
    // Determine service type and keywords
    const keywords = this.extractKeywords(image, context);
    
    // Generate SEO-optimised filename
    const seoFilename = this.generateSEOFilename(image, keywords.primaryKeyword);
    
    // Generate comprehensive alt text
    const altText = this.generateAltText(image, keywords, context);
    
    // Generate title and caption
    const title = this.generateTitle(image, keywords, context);
    const caption = this.generateCaption(image, keywords, context);
    
    // Generate schema data
    const schemaData = this.generateSchemaData(image, keywords, context);
    
    // Determine loading strategy
    const loadingStrategy = this.determineLoadingStrategy(image);
    
    return {
      id: image.id,
      originalFilename: image.name,
      seoFilename,
      title,
      altText,
      caption,
      description: image.description,
      primaryKeyword: keywords.primaryKeyword,
      secondaryKeywords: keywords.secondaryKeywords,
      longTailKeywords: keywords.longTailKeywords,
      semanticKeywords: keywords.semanticKeywords,
      schemaType: 'ImageObject',
      schemaData,
      formats: image.formats as any,
      responsiveSizes: {
        mobile: image.sizes.small || '',
        tablet: image.sizes.medium || '',
        desktop: image.sizes.large || '',
        large: image.sizes.original || ''
      },
      loadingStrategy,
      priority: this.determinePriority(image),
      aspectRatio: '16/9', // Calculate from actual dimensions
      dimensions: image.dimensions || { width: 1200, height: 800 },
      recommendedPlacement: this.determineOptimalPlacement(image),
      relatedContent: this.findRelatedContent(image),
      pageContext: context.pageTopic || '',
      geoTargeting: context.location ? {
        location: context.location,
        region: this.extractRegion(context.location),
        serviceArea: this.getServiceArea(context.location)
      } : undefined
    };
  }
  
  /**
   * Extract relevant keywords based on image category and context
   */
  private static extractKeywords(image: ImageAsset, context: any) {
    let primaryKeyword = '';
    let secondaryKeywords: string[] = [];
    let longTailKeywords: string[] = [];
    let semanticKeywords: string[] = [];
    
    // Determine primary service category
    if (image.category.includes('water')) {
      primaryKeyword = SEO_KEYWORDS.waterDamage.primary;
      secondaryKeywords = SEO_KEYWORDS.waterDamage.secondary;
      longTailKeywords = SEO_KEYWORDS.waterDamage.longTail;
      semanticKeywords = SEO_KEYWORDS.waterDamage.semantic;
    } else if (image.category.includes('fire')) {
      primaryKeyword = SEO_KEYWORDS.fireDamage.primary;
      secondaryKeywords = SEO_KEYWORDS.fireDamage.secondary;
      longTailKeywords = SEO_KEYWORDS.fireDamage.longTail;
      semanticKeywords = SEO_KEYWORDS.fireDamage.semantic;
    } else if (image.category.includes('mould')) {
      primaryKeyword = SEO_KEYWORDS.mouldRemediation.primary;
      secondaryKeywords = SEO_KEYWORDS.mouldRemediation.secondary;
      longTailKeywords = SEO_KEYWORDS.mouldRemediation.longTail;
      semanticKeywords = SEO_KEYWORDS.mouldRemediation.semantic;
    } else if (image.category.includes('air-mover')) {
      primaryKeyword = SEO_KEYWORDS.equipment.airMovers.primary;
      secondaryKeywords = SEO_KEYWORDS.equipment.airMovers.secondary;
      longTailKeywords = SEO_KEYWORDS.equipment.airMovers.longTail;
    } else if (image.category.includes('dehumidifier')) {
      primaryKeyword = SEO_KEYWORDS.equipment.dehumidifiers.primary;
      secondaryKeywords = SEO_KEYWORDS.equipment.dehumidifiers.secondary;
      longTailKeywords = SEO_KEYWORDS.equipment.dehumidifiers.longTail;
    }
    
    // Add location modifiers if provided
    if (context.location) {
      longTailKeywords = longTailKeywords.map(keyword => 
        `${keyword} ${context.location}`
      );
    }
    
    return {
      primaryKeyword,
      secondaryKeywords,
      longTailKeywords,
      semanticKeywords
    };
  }
  
  /**
   * Generate SEO-optimised filename
   */
  private static generateSEOFilename(image: ImageAsset, primaryKeyword: string): string {
    const keyword = primaryKeyword.toLowerCase().replace(/\s+/g, '-');
    const category = image.category.split('/').pop();
    const uniqueId = image.id.split('-').pop();
    
    return `${keyword}-${category}-${uniqueId}`;
  }
  
  /**
   * Generate comprehensive, descriptive alt text
   */
  private static generateAltText(
    image: ImageAsset,
    keywords: any,
    context: any
  ): string {
    const templates = {
      'mould-damage': `Professional ${keywords.primaryKeyword} showing ${image.description}. IICRC certified mould remediation specialists providing ${keywords.secondaryKeywords[0]} services`,
      'water-damage': `${keywords.primaryKeyword} in progress - ${image.description}. Emergency ${keywords.secondaryKeywords[0]} by certified restoration professionals`,
      'fire-damage': `${keywords.primaryKeyword} scene showing ${image.description}. Expert ${keywords.secondaryKeywords[0]} and restoration services`,
      'equipment-air-movers': `Professional ${keywords.primaryKeyword} equipment - ${image.name}. High-performance ${keywords.secondaryKeywords[0]} for water damage restoration`,
      'equipment-dehumidifiers': `Commercial grade ${keywords.primaryKeyword} - ${image.name}. Industrial ${keywords.secondaryKeywords[0]} for moisture control`,
      'equipment-extractors': `Professional ${keywords.primaryKeyword} - ${image.name}. Heavy-duty ${keywords.secondaryKeywords[0]} for emergency response`
    };
    
    const template = templates[image.category as keyof typeof templates] || image.alt;
    
    // Add location if provided
    if (context.location) {
      return `${template} in ${context.location}`;
    }
    
    return template;
  }
  
  /**
   * Generate SEO-optimised title
   */
  private static generateTitle(
    image: ImageAsset,
    keywords: any,
    context: any
  ): string {
    const location = context.location ? ` in ${context.location}` : '';
    return `${keywords.primaryKeyword}${location} | ${image.name} | Professional Restoration Services`;
  }
  
  /**
   * Generate engaging caption with keywords
   */
  private static generateCaption(
    image: ImageAsset,
    keywords: any,
    context: any
  ): string {
    const captions = {
      'mould-damage': `Our certified technicians performing ${keywords.primaryKeyword}. We use advanced techniques and equipment for safe, thorough ${keywords.secondaryKeywords[0]}.`,
      'water-damage': `Emergency ${keywords.primaryKeyword} in action. Our 24/7 response team provides immediate ${keywords.secondaryKeywords[0]} to prevent secondary damage.`,
      'fire-damage': `Professional ${keywords.primaryKeyword} underway. Complete ${keywords.secondaryKeywords[0]} to restore your property to pre-loss condition.`,
      'equipment-air-movers': `Industrial-grade ${keywords.primaryKeyword} deployed for rapid structural drying. Essential ${keywords.secondaryKeywords[0]} for effective water damage restoration.`,
      'equipment-dehumidifiers': `High-capacity ${keywords.primaryKeyword} removing moisture from affected areas. Professional ${keywords.secondaryKeywords[0]} ensures complete drying.`,
      'equipment-extractors': `Powerful ${keywords.primaryKeyword} in operation. Professional-grade ${keywords.secondaryKeywords[0]} for immediate water removal.`
    };
    
    return captions[image.category as keyof typeof captions] || image.description;
  }
  
  /**
   * Generate structured data for the image
   */
  private static generateSchemaData(
    image: ImageAsset,
    keywords: any,
    context: any
  ): any {
    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "name": this.generateTitle(image, keywords, context),
      "description": this.generateAltText(image, keywords, context),
      "contentUrl": image.formats.webp || image.formats.jpg,
      "thumbnailUrl": image.sizes.thumbnail,
      "uploadDate": new Date().toISOString(),
      "acquireLicenseUrl": "https://disasterrecovery.com.au/contact",
      "copyrightHolder": {
        "@type": "Organisation",
        "name": "Disaster Recovery Australia"
      },
      "creator": {
        "@type": "Organisation",
        "name": "Disaster Recovery Australia"
      },
      "creditText": "Disaster Recovery Australia - Professional Restoration Services",
      "keywords": [
        keywords.primaryKeyword,
        ...keywords.secondaryKeywords,
        ...keywords.semanticKeywords
      ].join(", "),
      "representativeOfPage": true,
      "caption": this.generateCaption(image, keywords, context),
      "exifData": {
        "@type": "PropertyValue",
        "name": "Professional Equipment",
        "value": image.name
      }
    };
  }
  
  /**
   * Determine optimal loading strategy
   */
  private static determineLoadingStrategy(image: ImageAsset): 'eager' | 'lazy' {
    // Load above-the-fold images eagerly
    const eagerCategories = ['hero', 'emergency', 'primary-service'];
    const lazyCategories = ['gallery', 'equipment', 'process'];
    
    if (image.tags.some(tag => eagerCategories.includes(tag))) {
      return 'eager';
    }
    
    return 'lazy';
  }
  
  /**
   * Determine image priority
   */
  private static determinePriority(image: ImageAsset): 'high' | 'medium' | 'low' {
    if (image.category.includes('damage') && image.tags.includes('emergency')) {
      return 'high';
    }
    if (image.category.includes('equipment')) {
      return 'medium';
    }
    return 'low';
  }
  
  /**
   * Determine optimal placement on page
   */
  private static determineOptimalPlacement(image: ImageAsset): 'above-fold' | 'in-content' | 'gallery' {
    if (image.tags.includes('hero') || image.tags.includes('emergency')) {
      return 'above-fold';
    }
    if (image.category.includes('equipment')) {
      return 'gallery';
    }
    return 'in-content';
  }
  
  /**
   * Find related content for contextual placement
   */
  private static findRelatedContent(image: ImageAsset): string[] {
    const related: string[] = [];
    
    if (image.category.includes('water')) {
      related.push(
        'Water Damage Restoration Process',
        'Emergency Water Extraction',
        'Structural Drying Techniques',
        'Preventing Secondary Water Damage'
      );
    } else if (image.category.includes('fire')) {
      related.push(
        'Fire Damage Assessment',
        'Smoke and Soot Removal',
        'Odour Elimination Process',
        'Fire Damage Reconstruction'
      );
    } else if (image.category.includes('mould')) {
      related.push(
        'Mould Inspection and Testing',
        'Safe Mould Removal Process',
        'Air Quality Restoration',
        'Mould Prevention Strategies'
      );
    }
    
    return related;
  }
  
  /**
   * Extract region from location
   */
  private static extractRegion(location: string): string {
    const regions: { [key: string]: string } = {
      'Brisbane': 'Queensland',
      'Sydney': 'New South Wales',
      'Melbourne': 'Victoria',
      'Perth': 'Western Australia',
      'Adelaide': 'South Australia',
      'Gold Coast': 'Queensland',
      'Sunshine Coast': 'Queensland'
    };
    
    for (const [city, region] of Object.entries(regions)) {
      if (location.includes(city)) {
        return region;
      }
    }
    
    return 'Australia';
  }
  
  /**
   * Get service area for location
   */
  private static getServiceArea(location: string): string[] {
    const baseArea = [location];
    
    // Add surrounding areas based on location
    if (location.includes('Brisbane')) {
      baseArea.push('Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan');
    } else if (location.includes('Sydney')) {
      baseArea.push('Parramatta', 'Penrith', 'Liverpool', 'Blacktown');
    }
    
    return baseArea;
  }
  
  /**
   * Batch optimise all images in library
   */
  static optimizeAllImages(context?: any): SEOOptimizedImage[] {
    return IMAGE_LIBRARY.map(image => this.optimizeImage(image, context));
  }
  
  /**
   * Generate image sitemap entries
   */
  static generateSitemapEntries(images: SEOOptimizedImage[]): string {
    const entries = images.map(img => `
    <image:image>
      <image:loc>https://disasterrecovery.com.au${img.formats.webp}</image:loc>
      <image:title>${this.escapeXML(img.title)}</image:title>
      <image:caption>${this.escapeXML(img.caption)}</image:caption>
      <image:geo_location>Australia</image:geo_location>
      <image:license>https://disasterrecovery.com.au/terms</image:license>
    </image:image>`).join('');
    
    return entries;
  }
  
  /**
   * Escape XML special characters
   */
  private static escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}

/**
 * Export singleton instance
 */
export const imageSEOAgent = new ImageSEOAgent();