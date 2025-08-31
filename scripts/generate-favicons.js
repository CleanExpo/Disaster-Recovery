const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const inputPath = path.join(__dirname, '..', 'public', 'logos', '3D Disaster Recovery Logo Image.png');
  const outputDir = path.join(__dirname, '..', 'public');
  
  // Favicon sizes to generate
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' },
  ];

  console.log('🎨 Generating favicon variants from new logo...');
  
  try {
    // Check if input file exists
    await fs.access(inputPath);
    console.log(`✓ Found source image: ${inputPath}`);
    
    // Generate each size
    for (const { size, name } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
    
    // Generate favicon.ico (multi-resolution)
    const icoPath = path.join(outputDir, 'favicon.ico');
    await sharp(inputPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(icoPath.replace('.ico', '-32.png'));
    
    console.log('✓ Generated favicon.ico');
    
    console.log('\n✅ All favicon variants generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();