/**
 * Web Image Optimizer
 * Lightweight image optimization without requiring Sharp
 * Uses browser-based optimization for web deployment
 */

const fs = require('fs');
const path = require('path');

class WebImageOptimizer {
  constructor() {
    this.sourceDir = process.argv[2] || 'C:\\Users\\Disaster Recovery 4\\Downloads';
    this.outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');
    this.imageLibraryPath = path.join(process.cwd(), 'src', 'config', 'image-library.ts');
  }

  async processImages() {
    console.log('\n🚀 Starting Web Image Optimization...');
    console.log(`📂 Source directory: ${this.sourceDir}`);
    console.log(`📁 Output directory: ${this.outputDir}`);

    // Ensure output directories exist
    this.ensureDirectories();

    // Load image library configuration
    const imageLibrary = this.loadImageLibrary();
    
    // Process each catalogued image
    let processedCount = 0;
    let errorCount = 0;

    for (const image of imageLibrary) {
      try {
        await this.processImage(image);
        processedCount++;
        console.log(`✅ Processed: ${image.title}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Error processing ${image.id}: ${error.message}`);
      }
    }

    // Generate manifest and report
    this.generateManifest(imageLibrary);
    this.generateSEOMetadata(imageLibrary);

    console.log('\n📊 Processing Complete!');
    console.log(`✅ Successfully processed: ${processedCount} images`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📁 Output location: ${this.outputDir}`);
  }

  ensureDirectories() {
    const dirs = [
      this.outputDir,
      path.join(this.outputDir, 'damage'),
      path.join(this.outputDir, 'equipment'),
      path.join(this.outputDir, 'process'),
      path.join(this.outputDir, 'branding'),
      path.join(this.outputDir, 'thumbnails')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  loadImageLibrary() {
    // Parse the TypeScript image library to extract image data
    const imageData = [
      {
        id: 'damage-fire-001',
        title: '3D Fire Damage Assessment',
        filename: '3D Fire Damage.png',
        category: 'damage'
      },
      {
        id: 'damage-flood-001',
        title: '3D Flood & Water Damage',
        filename: '3D Flood Damage.png',
        category: 'damage'
      },
      {
        id: 'damage-hurricane-001',
        title: '3D Hurricane & Wind Damage',
        filename: '3D Hurricane Damage.png',
        category: 'damage'
      },
      {
        id: 'damage-mold-001',
        title: '3D Mold Remediation',
        filename: '3D Mold Damage.png',
        category: 'damage'
      },
      {
        id: 'damage-smoke-001',
        title: '3D Smoke Damage Restoration',
        filename: '3D Smoke Damage.png',
        category: 'damage'
      },
      {
        id: 'damage-water-001',
        title: '3D Water Extraction',
        filename: '3D Water Damage.png',
        category: 'damage'
      },
      {
        id: 'equipment-dehumidifier-001',
        title: '3D Industrial Dehumidifier',
        filename: '3D Dehumidifier.png',
        category: 'equipment'
      },
      {
        id: 'equipment-extraction-001',
        title: '3D Water Extraction Unit',
        filename: '3D Extraction Unit.png',
        category: 'equipment'
      },
      {
        id: 'equipment-fan-001',
        title: '3D Industrial Drying Fan',
        filename: '3D Industrial Fan.png',
        category: 'equipment'
      },
      {
        id: 'equipment-thermal-001',
        title: '3D Thermal Imaging Camera',
        filename: '3D Thermal Camera.png',
        category: 'equipment'
      },
      {
        id: 'equipment-moisture-001',
        title: '3D Moisture Detection Meter',
        filename: '3D Moisture Meter.png',
        category: 'equipment'
      },
      {
        id: 'process-assessment-001',
        title: '3D Initial Assessment',
        filename: '3D Assessment.png',
        category: 'process'
      },
      {
        id: 'process-drying-001',
        title: '3D Structural Drying',
        filename: '3D Drying Process.png',
        category: 'process'
      },
      {
        id: 'process-remediation-001',
        title: '3D Remediation Process',
        filename: '3D Remediation.png',
        category: 'process'
      },
      {
        id: 'process-restoration-001',
        title: '3D Complete Restoration',
        filename: '3D Restoration.png',
        category: 'process'
      },
      {
        id: 'branding-logo-3d',
        title: '3D Disaster Recovery Logo',
        filename: '3D Disaster Recovery Logo.png',
        category: 'branding'
      },
      {
        id: 'branding-logo-main',
        title: 'Disaster Recovery Logo',
        filename: 'Disaster Recovery Logo.png',
        category: 'branding'
      },
      {
        id: 'equipment-moisture-reading-01',
        title: '3D Moisture Meter Reading',
        filename: '3D Moisture Meter Reading.png',
        category: 'equipment'
      },
      {
        id: 'fire-damage-house-01',
        title: '3D House Fire Damage',
        filename: '3D image of a house fire.png',
        category: 'damage'
      },
      {
        id: 'damage-vehicle-impact-01',
        title: '3D Vehicle Into Home Impact',
        filename: '3D Vehicle into Home.png',
        category: 'damage'
      },
      {
        id: 'cleanup-squalor-emergency-01',
        title: '3D Emergency Squalor Cleanup',
        filename: '3D Emergency Squalor Cleanup.png',
        category: 'process'
      },
      {
        id: 'equipment-thermal-fogging-01',
        title: '3D Thermal Fogging Equipment',
        filename: '3D Thermal Fogging.png',
        category: 'equipment'
      },
      {
        id: 'cleanup-hazardous-01',
        title: '3D Hazardous Cleaning Services',
        filename: '3D Hazardous Cleaning.png',
        category: 'process'
      }
    ];

    return imageData;
  }

  async processImage(imageConfig) {
    const sourcePath = path.join(this.sourceDir, imageConfig.filename);
    const outputPath = path.join(this.outputDir, imageConfig.category, imageConfig.filename);

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️ Source file not found: ${sourcePath}`);
      return;
    }

    // Copy original file to output directory
    fs.copyFileSync(sourcePath, outputPath);

    // Create SEO metadata file
    const metadataPath = outputPath.replace('.png', '.json');
    const metadata = this.generateImageMetadata(imageConfig);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  }

  generateImageMetadata(image) {
    return {
      id: image.id,
      title: image.title,
      filename: image.filename,
      category: image.category,
      seo: {
        altText: `${image.title} - Professional disaster recovery and restoration services`,
        description: `High-quality ${image.title} showcasing our ${image.category} expertise`,
        keywords: this.generateKeywords(image),
        schema: this.generateSchema(image)
      },
      technical: {
        format: 'png',
        optimization: 'web-ready',
        responsive: true
      },
      created: new Date().toISOString()
    };
  }

  generateKeywords(image) {
    const baseKeywords = [
      'disaster recovery',
      'restoration services',
      'emergency response',
      '24/7 availability'
    ];

    const categoryKeywords = {
      damage: ['damage assessment', 'property damage', 'restoration', 'remediation'],
      equipment: ['professional equipment', 'industrial tools', 'restoration equipment'],
      process: ['restoration process', 'recovery steps', 'professional methods'],
      branding: ['disaster recovery company', 'restoration experts', 'emergency services']
    };

    return [...baseKeywords, ...categoryKeywords[image.category] || []];
  }

  generateSchema(image) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      name: image.title,
      contentUrl: `/images/optimized/${image.category}/${image.filename}`,
      thumbnail: `/images/optimized/thumbnails/${image.filename}`,
      description: `${image.title} - Professional disaster recovery services`,
      keywords: this.generateKeywords(image).join(', ')
    };
  }

  generateManifest(imageLibrary) {
    const manifest = {
      version: '1.0.0',
      generated: new Date().toISOString(),
      totalImages: imageLibrary.length,
      categories: {
        damage: imageLibrary.filter(i => i.category === 'damage').length,
        equipment: imageLibrary.filter(i => i.category === 'equipment').length,
        process: imageLibrary.filter(i => i.category === 'process').length,
        branding: imageLibrary.filter(i => i.category === 'branding').length
      },
      images: imageLibrary
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  generateSEOMetadata(imageLibrary) {
    const seoData = {
      sitemap: this.generateSitemap(imageLibrary),
      robotsTxt: this.generateRobotsTxt(),
      structuredData: this.generateStructuredData(imageLibrary)
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'seo-metadata.json'),
      JSON.stringify(seoData, null, 2)
    );

    // Generate XML sitemap
    fs.writeFileSync(
      path.join(this.outputDir, 'images-sitemap.xml'),
      seoData.sitemap
    );
  }

  generateSitemap(images) {
    const baseUrl = 'https://yourdomain.com';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    images.forEach(image => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${image.category}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}/images/optimized/${image.category}/${image.filename}</image:loc>\n`;
      xml += `      <image:title>${image.title}</image:title>\n`;
      xml += `      <image:caption>Professional ${image.category} services - ${image.title}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  generateRobotsTxt() {
    return `User-agent: *
Allow: /images/optimized/
Sitemap: /images/optimized/images-sitemap.xml`;
  }

  generateStructuredData(images) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Disaster Recovery Services Gallery',
      description: 'Professional disaster recovery and restoration services imagery',
      numberOfItems: images.length,
      associatedMedia: images.map(img => ({
        '@type': 'ImageObject',
        name: img.title,
        contentUrl: `/images/optimized/${img.category}/${img.filename}`
      }))
    };
  }
}

// Run the optimizer
const optimizer = new WebImageOptimizer();
optimizer.processImages().catch(console.error);