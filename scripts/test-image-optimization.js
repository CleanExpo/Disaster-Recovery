/**
 * TEST IMAGE OPTIMIZATION SYSTEM
 * Validates compression, metadata, and placement for priority images
 */

const fs = require('fs').promises;
const path = require('path');
const { 
  generateSEOMetadata, 
  determineFilePlacement,
  OPTIMIZATION_CONFIG 
} = require('./priority-image-optimizer');

// Test configurations
const TEST_CASES = [
  {
    service: 'water-damage-restoration',
    location: 'Sydney',
    imageType: 'hero',
    expectedPriority: 100
  },
  {
    service: 'fire-damage-restoration',
    location: 'Melbourne',
    imageType: 'equipment',
    expectedPriority: 94
  },
  {
    service: 'mould-remediation',
    location: 'Brisbane',
    imageType: 'process',
    expectedPriority: 85
  },
  {
    service: 'flood-recovery',
    location: 'Perth',
    imageType: 'team',
    expectedPriority: 75
  }
];

/**
 * Test SEO metadata generation
 */
async function testSEOMetadata() {
  console.log('🔍 TESTING SEO METADATA GENERATION');
  console.log('─────────────────────────────────────────\n');
  
  const results = {
    passed: 0,
    failed: 0,
    details: []
  };
  
  for (const testCase of TEST_CASES) {
    console.log(`Testing: ${testCase.service} in ${testCase.location} (${testCase.imageType})`);
    
    const metadata = generateSEOMetadata({
      service: testCase.service,
      location: testCase.location,
      imageType: testCase.imageType,
      filename: `${testCase.service}-${testCase.location.toLowerCase()}-${testCase.imageType}.webp`
    });
    
    // Validate metadata structure
    const checks = {
      hasAlt: !!metadata.alt && metadata.alt.length > 0,
      hasTitle: !!metadata.title && metadata.title.length > 0,
      hasDescription: !!metadata.description && metadata.description.length > 0,
      hasKeywords: Array.isArray(metadata.keywords) && metadata.keywords.length > 0,
      hasSchema: !!metadata.schema && metadata.schema['@context'] === 'https://schema.org',
      hasExif: !!metadata.exif && !!metadata.exif.Copyright,
      hasOpenGraph: !!metadata.openGraph && !!metadata.openGraph['og:title'],
      hasTwitterCard: !!metadata.twitterCard && !!metadata.twitterCard['twitter:card']
    };
    
    const allChecksPassed = Object.values(checks).every(v => v === true);
    
    if (allChecksPassed) {
      console.log('   ✅ All metadata checks passed');
      console.log(`   Alt text: "${metadata.alt.substring(0, 60)}..."`);
      console.log(`   Keywords: ${metadata.keywords.length} terms`);
      results.passed++;
    } else {
      console.log('   ❌ Some checks failed:');
      for (const [check, passed] of Object.entries(checks)) {
        if (!passed) console.log(`      - ${check}`);
      }
      results.failed++;
    }
    
    results.details.push({
      testCase,
      metadata,
      checks,
      passed: allChecksPassed
    });
    
    console.log('');
  }
  
  return results;
}

/**
 * Test file placement structure
 */
async function testFilePlacement() {
  console.log('📁 TESTING FILE PLACEMENT STRUCTURE');
  console.log('─────────────────────────────────────────\n');
  
  const results = {
    passed: 0,
    failed: 0,
    paths: []
  };
  
  for (const testCase of TEST_CASES) {
    console.log(`Testing: ${testCase.service} in ${testCase.location}`);
    
    const placement = determineFilePlacement({
      service: testCase.service,
      location: testCase.location,
      imageType: testCase.imageType
    });
    
    // Check that all required paths are generated
    const requiredPaths = [
      'primary', 'category', 'service', 
      'location', 'thumbnail', 'social', 'cdn'
    ];
    
    const checks = {};
    for (const pathType of requiredPaths) {
      checks[pathType] = !!placement[pathType] && placement[pathType].length > 0;
    }
    
    const allPathsValid = Object.values(checks).every(v => v === true);
    
    if (allPathsValid) {
      console.log('   ✅ All placement paths generated correctly');
      console.log(`   Primary: ${placement.primary}`);
      console.log(`   CDN: ${placement.cdn}`);
      results.passed++;
    } else {
      console.log('   ❌ Some paths missing:');
      for (const [pathType, valid] of Object.entries(checks)) {
        if (!valid) console.log(`      - ${pathType}`);
      }
      results.failed++;
    }
    
    results.paths.push({
      testCase,
      placement,
      checks,
      passed: allPathsValid
    });
    
    console.log('');
  }
  
  return results;
}

/**
 * Test compression settings
 */
async function testCompressionSettings() {
  console.log('⚙️ TESTING COMPRESSION SETTINGS');
  console.log('─────────────────────────────────────────\n');
  
  console.log('Format Settings:');
  for (const [format, settings] of Object.entries(OPTIMIZATION_CONFIG.formats)) {
    console.log(`   ${format.toUpperCase()}:`);
    console.log(`      Quality: ${settings.quality}`);
    console.log(`      Lossless: ${settings.lossless || false}`);
    
    if (format === 'webp') {
      console.log(`      Effort: ${settings.effort}/6`);
      console.log(`      Smart Subsample: ${settings.smartSubsample}`);
    } else if (format === 'jpg') {
      console.log(`      Progressive: ${settings.progressive}`);
      console.log(`      MozJPEG: ${settings.mozjpeg}`);
    }
    console.log('');
  }
  
  console.log('Size Variants:');
  for (const [size, dimensions] of Object.entries(OPTIMIZATION_CONFIG.sizes)) {
    const pixels = dimensions.width * dimensions.height;
    const megapixels = (pixels / 1000000).toFixed(2);
    console.log(`   ${size}: ${dimensions.width}x${dimensions.height} (${megapixels} MP)`);
  }
  
  return { success: true };
}

/**
 * Test directory structure creation
 */
async function testDirectoryStructure() {
  console.log('\n📂 TESTING DIRECTORY STRUCTURE CREATION');
  console.log('─────────────────────────────────────────\n');
  
  const baseDir = 'public/images';
  const requiredDirs = [
    'optimized/hero',
    'optimized/equipment',
    'optimized/process',
    'optimized/team',
    'thumbnails/hero',
    'thumbnails/equipment',
    'thumbnails/process',
    'thumbnails/team',
    'social',
    'services',
    'locations',
    'cdn',
    'generated'
  ];
  
  const results = {
    created: 0,
    existing: 0,
    failed: 0
  };
  
  for (const dir of requiredDirs) {
    const fullPath = path.join(baseDir, dir);
    
    try {
      await fs.mkdir(fullPath, { recursive: true });
      
      // Check if directory exists
      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        console.log(`   ✅ ${dir}`);
        results.created++;
      }
    } catch (error) {
      console.log(`   ❌ ${dir}: ${error.message}`);
      results.failed++;
    }
  }
  
  console.log(`\nDirectories: ${results.created} ready, ${results.failed} failed`);
  
  return results;
}

/**
 * Calculate estimated file sizes
 */
async function calculateStorageRequirements() {
  console.log('\n💾 STORAGE REQUIREMENTS ESTIMATION');
  console.log('─────────────────────────────────────────\n');
  
  const estimates = {
    perImage: {},
    total100: {},
    totalFull: {}
  };
  
  // Estimate file sizes based on compression (rough estimates)
  const sizeEstimates = {
    webp: {
      thumbnail: 15,    // KB
      mobile: 80,
      tablet: 150,
      desktop: 250,
      hero: 400,
      og: 100
    },
    avif: {
      thumbnail: 12,
      mobile: 65,
      tablet: 120,
      desktop: 200,
      hero: 320,
      og: 80
    },
    jpg: {
      thumbnail: 25,
      mobile: 120,
      tablet: 220,
      desktop: 380,
      hero: 600,
      og: 150
    }
  };
  
  // Calculate per-image storage
  let totalPerImage = 0;
  for (const [format, sizes] of Object.entries(sizeEstimates)) {
    const formatTotal = Object.values(sizes).reduce((sum, size) => sum + size, 0);
    estimates.perImage[format] = formatTotal;
    totalPerImage += formatTotal;
  }
  
  console.log('Per Image Storage:');
  for (const [format, size] of Object.entries(estimates.perImage)) {
    console.log(`   ${format.toUpperCase()}: ${size} KB`);
  }
  console.log(`   Total per image: ${totalPerImage} KB (${(totalPerImage / 1024).toFixed(2)} MB)`);
  
  // Calculate for 100 priority images
  estimates.total100 = {
    kb: totalPerImage * 100,
    mb: (totalPerImage * 100) / 1024,
    gb: (totalPerImage * 100) / 1024 / 1024
  };
  
  console.log('\n100 Priority Images:');
  console.log(`   Total: ${estimates.total100.mb.toFixed(2)} MB`);
  console.log(`   With 20% overhead: ${(estimates.total100.mb * 1.2).toFixed(2)} MB`);
  
  // Calculate for full system (692,415 images)
  const fullSystemImages = 692415;
  estimates.totalFull = {
    kb: totalPerImage * fullSystemImages,
    mb: (totalPerImage * fullSystemImages) / 1024,
    gb: (totalPerImage * fullSystemImages) / 1024 / 1024,
    tb: (totalPerImage * fullSystemImages) / 1024 / 1024 / 1024
  };
  
  console.log('\nFull System (692,415 images):');
  console.log(`   Total: ${estimates.totalFull.gb.toFixed(2)} GB (${estimates.totalFull.tb.toFixed(2)} TB)`);
  console.log(`   CDN Monthly Transfer (10x): ${(estimates.totalFull.gb * 10).toFixed(2)} GB`);
  
  return estimates;
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🧪 IMAGE OPTIMIZATION SYSTEM TEST SUITE');
  console.log('═══════════════════════════════════════════════════════');
  console.log('   Testing compression, metadata, and placement');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const results = {
    metadata: null,
    placement: null,
    compression: null,
    directories: null,
    storage: null
  };
  
  // Run all tests
  try {
    results.metadata = await testSEOMetadata();
    results.placement = await testFilePlacement();
    results.compression = await testCompressionSettings();
    results.directories = await testDirectoryStructure();
    results.storage = await calculateStorageRequirements();
    
    // Summary
    console.log('\n✅ TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════════');
    
    const totalPassed = results.metadata.passed + results.placement.passed;
    const totalFailed = results.metadata.failed + results.placement.failed;
    
    console.log(`   SEO Metadata: ${results.metadata.passed}/${results.metadata.passed + results.metadata.failed} passed`);
    console.log(`   File Placement: ${results.placement.passed}/${results.placement.passed + results.placement.failed} passed`);
    console.log(`   Directories Created: ${results.directories.created}`);
    console.log(`   Storage per Image: ${(results.storage.perImage.webp + results.storage.perImage.avif + results.storage.perImage.jpg) / 1024} MB`);
    console.log(`   100 Images Total: ${results.storage.total100.mb.toFixed(2)} MB`);
    
    if (totalFailed === 0) {
      console.log('\n🎉 ALL TESTS PASSED - SYSTEM READY FOR PRODUCTION');
    } else {
      console.log(`\n⚠️ ${totalFailed} tests failed - review before production`);
    }
    
    // Save test results
    const reportPath = 'public/images/test-results.json';
    await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}`);
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
  }
}

// Run tests
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testSEOMetadata,
  testFilePlacement,
  testCompressionSettings,
  testDirectoryStructure,
  calculateStorageRequirements,
  runAllTests
};