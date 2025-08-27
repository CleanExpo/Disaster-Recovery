/**
 * Automated Image SEO Processing Script
 * Applies comprehensive SEO optimizations to all images
 * Generates sitemaps, structured data, and optimized metadata
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// SEO Configuration
const SEO_CONFIG = {
  siteName: 'Disaster Recovery Australia',
  siteUrl: 'https://disasterrecovery.com.au',
  defaultLocation: 'Brisbane, Queensland',
  businessName: 'National Restoration Professionals (NRP)',
  
  // Image optimization settings
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85
  },
  
  // Responsive breakpoints
  breakpoints: [320, 640, 768, 1024, 1280, 1920],
  
  // SEO filename patterns
  filenamePatterns: {
    'mould': 'professional-mould-remediation',
    'water': 'water-damage-restoration',
    'fire': 'fire-damage-cleanup',
    'burst': 'emergency-burst-pipe-repair',
    'dehumidifier': 'commercial-dehumidifier-equipment',
    'air-mover': 'industrial-air-mover-drying',
    'extractor': 'water-extraction-equipment',
    'hepa': 'hepa-air-filtration-system'
  }
};

/**
 * Process image with SEO optimizations
 */
async function processSEOImage(inputPath, originalFilename) {
  console.log(`\n🔍 SEO Processing: ${originalFilename}`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate SEO-optimized filename
    const seoFilename = generateSEOFilename(originalFilename);
    const category = determineCategory(originalFilename);
    
    // Generate SEO metadata
    const seoData = generateSEOMetadata(originalFilename, category, metadata);
    
    // Process responsive images
    const responsiveImages = await generateResponsiveImages(
      inputPath,
      seoFilename,
      category
    );
    
    // Generate structured data
    const structuredData = generateStructuredData(
      seoFilename,
      seoData,
      responsiveImages
    );
    
    // Save SEO metadata
    await saveSEOMetadata(seoFilename, {
      ...seoData,
      structuredData,
      responsiveImages
    });
    
    console.log(`  ✅ SEO optimized: ${seoFilename}`);
    
    return {
      filename: seoFilename,
      seoData,
      structuredData,
      responsiveImages
    };
    
  } catch (error) {
    console.error(`  ❌ Error processing ${originalFilename}:`, error.message);
    return null;
  }
}

/**
 * Generate SEO-optimized filename
 */
function generateSEOFilename(originalName) {
  const base = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/3d\s*/gi, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Apply SEO patterns
  for (const [keyword, replacement] of Object.entries(SEO_CONFIG.filenamePatterns)) {
    if (base.includes(keyword)) {
      const timestamp = Date.now().toString(36).slice(-4);
      return `${replacement}-${timestamp}`;
    }
  }
  
  return base;
}

/**
 * Determine image category
 */
function determineCategory(filename) {
  const lower = filename.toLowerCase();
  
  if (lower.includes('mould') || lower.includes('mold')) return 'mould-damage';
  if (lower.includes('water') || lower.includes('flood')) return 'water-damage';
  if (lower.includes('fire') || lower.includes('smoke')) return 'fire-damage';
  if (lower.includes('air') && lower.includes('mover')) return 'equipment/air-movers';
  if (lower.includes('dehumidifier') || lower.includes('lgr')) return 'equipment/dehumidifiers';
  if (lower.includes('extractor') || lower.includes('pump')) return 'equipment/extractors';
  if (lower.includes('hepa') || lower.includes('filter')) return 'equipment/filters';
  
  return 'restoration';
}

/**
 * Generate comprehensive SEO metadata
 */
function generateSEOMetadata(filename, category, imageMetadata) {
  const categoryMeta = {
    'mould-damage': {
      title: 'Professional Mould Remediation and Removal Services',
      keywords: ['mould remediation', 'black mould removal', 'mould inspection', 'toxic mold cleanup'],
      description: 'IICRC certified mould remediation specialists providing safe, thorough mould removal and prevention services'
    },
    'water-damage': {
      title: '24/7 Emergency Water Damage Restoration Services',
      keywords: ['water damage restoration', 'flood damage repair', 'water extraction', 'emergency water removal'],
      description: 'Emergency water damage restoration with rapid response, professional extraction, and complete structural drying'
    },
    'fire-damage': {
      title: 'Fire and Smoke Damage Restoration Specialists',
      keywords: ['fire damage restoration', 'smoke damage cleanup', 'soot removal', 'fire restoration'],
      description: 'Complete fire damage restoration including smoke odor removal, soot cleanup, and structural repairs'
    },
    'equipment/air-movers': {
      title: 'Industrial Air Movers for Water Damage Drying',
      keywords: ['air movers', 'drying equipment', 'restoration fans', 'structural drying'],
      description: 'Professional-grade air movers and drying equipment for rapid water damage restoration'
    },
    'equipment/dehumidifiers': {
      title: 'Commercial Dehumidifiers for Moisture Control',
      keywords: ['commercial dehumidifier', 'LGR dehumidifier', 'moisture removal', 'humidity control'],
      description: 'High-capacity commercial dehumidifiers for effective moisture extraction and humidity control'
    },
    'equipment/extractors': {
      title: 'Professional Water Extraction Equipment',
      keywords: ['water extractor', 'flood pump', 'water removal', 'extraction equipment'],
      description: 'Heavy-duty water extraction equipment for emergency flood water removal and cleanup'
    }
  };
  
  const meta = categoryMeta[category] || categoryMeta['water-damage'];
  
  // Generate location-specific variations
  const locations = ['Brisbane', 'Sydney', 'Melbourne', 'Gold Coast', 'Perth'];
  const locationKeywords = locations.flatMap(city => 
    meta.keywords.map(kw => `${kw} ${city}`)
  );
  
  return {
    title: `${meta.title} | ${SEO_CONFIG.businessName}`,
    altText: `${meta.description}. Professional restoration services available 24/7 across Australia`,
    caption: meta.description,
    keywords: [...meta.keywords, ...locationKeywords],
    description: meta.description,
    dimensions: {
      width: imageMetadata.width,
      height: imageMetadata.height
    },
    format: imageMetadata.format,
    size: imageMetadata.size
  };
}

/**
 * Generate responsive images with SEO naming
 */
async function generateResponsiveImages(inputPath, seoFilename, category) {
  const outputDir = path.join('public/images/seo', category);
  await fs.mkdir(outputDir, { recursive: true });
  
  const sizes = [];
  
  for (const breakpoint of SEO_CONFIG.breakpoints) {
    try {
      // Generate WebP version
      const webpFilename = `${seoFilename}-${breakpoint}w.webp`;
      const webpPath = path.join(outputDir, webpFilename);
      
      await sharp(inputPath)
        .resize(breakpoint, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: SEO_CONFIG.quality.webp })
        .toFile(webpPath);
      
      // Generate fallback JPG
      const jpgFilename = `${seoFilename}-${breakpoint}w.jpg`;
      const jpgPath = path.join(outputDir, jpgFilename);
      
      await sharp(inputPath)
        .resize(breakpoint, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: SEO_CONFIG.quality.jpg })
        .toFile(jpgPath);
      
      sizes.push({
        width: breakpoint,
        webp: `/images/seo/${category}/${webpFilename}`,
        jpg: `/images/seo/${category}/${jpgFilename}`
      });
      
      console.log(`  📐 Generated ${breakpoint}px responsive image`);
    } catch (error) {
      console.error(`  ⚠️  Failed to generate ${breakpoint}px image:`, error.message);
    }
  }
  
  return sizes;
}

/**
 * Generate structured data for the image
 */
function generateStructuredData(filename, seoData, responsiveImages) {
  const largestImage = responsiveImages[responsiveImages.length - 1];
  
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${SEO_CONFIG.siteUrl}/images/${filename}`,
    "name": seoData.title,
    "description": seoData.description,
    "contentUrl": `${SEO_CONFIG.siteUrl}${largestImage.webp}`,
    "thumbnailUrl": `${SEO_CONFIG.siteUrl}${responsiveImages[0].webp}`,
    "uploadDate": new Date().toISOString(),
    "width": {
      "@type": "QuantitativeValue",
      "value": seoData.dimensions.width,
      "unitCode": "PX"
    },
    "height": {
      "@type": "QuantitativeValue",
      "value": seoData.dimensions.height,
      "unitCode": "PX"
    },
    "representativeOfPage": true,
    "caption": seoData.caption,
    "keywords": seoData.keywords.join(", "),
    "copyrightHolder": {
      "@type": "Organization",
      "name": SEO_CONFIG.businessName,
      "url": SEO_CONFIG.siteUrl
    },
    "creator": {
      "@type": "Organization",
      "name": SEO_CONFIG.businessName
    },
    "creditText": `${SEO_CONFIG.businessName} - Professional Restoration Services`,
    "acquireLicenseUrl": `${SEO_CONFIG.siteUrl}/contact`
  };
}

/**
 * Save SEO metadata to JSON file
 */
async function saveSEOMetadata(filename, data) {
  const metadataDir = path.join('src/data/seo');
  await fs.mkdir(metadataDir, { recursive: true });
  
  const metadataPath = path.join(metadataDir, `${filename}.json`);
  await fs.writeFile(metadataPath, JSON.stringify(data, null, 2));
}

/**
 * Generate image sitemap
 */
async function generateImageSitemap(processedImages) {
  const sitemapEntries = processedImages
    .filter(img => img !== null)
    .map(img => `
  <url>
    <loc>${SEO_CONFIG.siteUrl}/gallery/${img.filename}</loc>
    <image:image>
      <image:loc>${SEO_CONFIG.siteUrl}${img.responsiveImages[img.responsiveImages.length - 1].webp}</image:loc>
      <image:title>${escapeXML(img.seoData.title)}</image:title>
      <image:caption>${escapeXML(img.seoData.caption)}</image:caption>
      <image:geo_location>${SEO_CONFIG.defaultLocation}</image:geo_location>
      <image:license>${SEO_CONFIG.siteUrl}/terms</image:license>
    </image:image>
  </url>`).join('');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries}
</urlset>`;
  
  await fs.writeFile('public/sitemap-images.xml', sitemap);
  console.log('\n📋 Generated image sitemap: public/sitemap-images.xml');
}

/**
 * Generate HTML picture element code
 */
function generatePictureElement(filename, seoData, responsiveImages) {
  const srcset = responsiveImages
    .map(img => `${img.webp} ${img.width}w`)
    .join(', ');
  
  const sizes = `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `.trim();
  
  return `
<picture>
  <source
    type="image/webp"
    srcset="${srcset}"
    sizes="${sizes}"
  />
  <source
    type="image/jpeg"
    srcset="${responsiveImages.map(img => `${img.jpg} ${img.width}w`).join(', ')}"
    sizes="${sizes}"
  />
  <img
    src="${responsiveImages[Math.floor(responsiveImages.length / 2)].jpg}"
    alt="${escapeHTML(seoData.altText)}"
    title="${escapeHTML(seoData.title)}"
    loading="lazy"
    decoding="async"
    width="${seoData.dimensions.width}"
    height="${seoData.dimensions.height}"
    class="responsive-image"
  />
</picture>`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Escape HTML special characters
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Process all images in directory with SEO optimizations
 */
async function processDirectoryWithSEO(directory) {
  console.log(`\n🚀 Starting SEO Image Processing\n`);
  console.log(`📁 Source: ${directory}\n`);
  
  try {
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    console.log(`📸 Found ${imageFiles.length} images to process\n`);
    
    const processedImages = [];
    
    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const result = await processSEOImage(inputPath, file);
      
      if (result) {
        processedImages.push(result);
        
        // Generate HTML code sample
        const htmlCode = generatePictureElement(
          result.filename,
          result.seoData,
          result.responsiveImages
        );
        
        // Save HTML sample
        const samplesDir = path.join('src/components/gallery/samples');
        await fs.mkdir(samplesDir, { recursive: true });
        await fs.writeFile(
          path.join(samplesDir, `${result.filename}.html`),
          htmlCode
        );
      }
    }
    
    // Generate image sitemap
    await generateImageSitemap(processedImages);
    
    // Generate usage documentation
    await generateUsageDoc(processedImages);
    
    console.log(`\n✨ SEO Processing Complete!`);
    console.log(`   ✅ Processed: ${processedImages.length} images`);
    console.log(`   📋 Sitemap: public/sitemap-images.xml`);
    console.log(`   📄 Documentation: docs/seo-images-usage.md`);
    
  } catch (error) {
    console.error('❌ Error processing directory:', error);
  }
}

/**
 * Generate usage documentation
 */
async function generateUsageDoc(processedImages) {
  const doc = `# SEO-Optimized Images Usage Guide

## Processed Images

${processedImages.map(img => `
### ${img.seoData.title}

- **Filename**: ${img.filename}
- **Alt Text**: ${img.seoData.altText}
- **Keywords**: ${img.seoData.keywords.slice(0, 5).join(', ')}
- **Responsive Sizes**: ${img.responsiveImages.map(r => `${r.width}px`).join(', ')}

\`\`\`html
<!-- Usage Example -->
<img
  src="${img.responsiveImages[2].webp}"
  alt="${img.seoData.altText}"
  title="${img.seoData.title}"
  loading="lazy"
  width="${img.seoData.dimensions.width}"
  height="${img.seoData.dimensions.height}"
/>
\`\`\`
`).join('\n')}

## Structured Data

Add this to your page head for each image:

\`\`\`html
<script type="application/ld+json">
${JSON.stringify(processedImages[0]?.structuredData || {}, null, 2)}
</script>
\`\`\`

## Image Sitemap

The image sitemap has been generated at: \`public/sitemap-images.xml\`

Add this to your robots.txt:
\`\`\`
Sitemap: https://disasterrecovery.com.au/sitemap-images.xml
\`\`\`
`;
  
  await fs.mkdir('docs', { recursive: true });
  await fs.writeFile('docs/seo-images-usage.md', doc);
}

// CLI interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
🔍 SEO Image Processing Tool

Usage: node seo-process-images.js <directory>

Example:
  node seo-process-images.js "C:\\Users\\Disaster Recovery 4\\Downloads"

Features:
  ✅ SEO-optimized filenames
  ✅ Comprehensive alt text and metadata
  ✅ Responsive image generation
  ✅ Structured data (Schema.org)
  ✅ Image sitemap generation
  ✅ HTML code samples
  ✅ Usage documentation
`);
} else {
  processDirectoryWithSEO(args[0]);
}

module.exports = {
  processSEOImage,
  processDirectoryWithSEO,
  generateImageSitemap
};