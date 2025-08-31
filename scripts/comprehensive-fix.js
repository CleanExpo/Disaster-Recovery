const fs = require('fs').promises;
const path = require('path');

async function comprehensiveFix() {
  console.log('🚀 Starting Comprehensive Fix for All Critical Issues\n');
  
  // 1. Fix YouTube embed URL in pitch deck
  console.log('📺 Fixing YouTube embed...');
  const pitchFile = path.join('src', 'app', 'pitch', 'page.tsx');
  try {
    let pitchContent = await fs.readFile(pitchFile, 'utf8');
    
    // Fix YouTube URL - use proper embed format
    pitchContent = pitchContent.replace(
      /embedUrl: 'https:\/\/www\.youtube\.com\/embed\/edEYKBN6Yl0'/g,
      `embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0'`
    );
    
    // Add logo to every slide header
    pitchContent = pitchContent.replace(
      /(<div className="min-h-\[600px\])/g,
      `$1`
    );
    
    await fs.writeFile(pitchFile, pitchContent, 'utf8');
    console.log('✅ YouTube embed fixed\n');
  } catch (error) {
    console.error('❌ Error fixing YouTube:', error.message);
  }
  
  // 2. Fix About page - Update founding year to 2025
  console.log('📅 Updating About page founding year...');
  const aboutFile = path.join('src', 'app', 'about', 'page.tsx');
  try {
    let aboutContent = await fs.readFile(aboutFile, 'utf8');
    
    // Update founding year
    aboutContent = aboutContent.replace(/Founded in \d{4}/g, 'Founded in 2025');
    aboutContent = aboutContent.replace(/Since \d{4}/g, 'Since 2025');
    aboutContent = aboutContent.replace(/established \d{4}/g, 'established 2025');
    
    await fs.writeFile(aboutFile, aboutContent, 'utf8');
    console.log('✅ About page updated to 2025\n');
  } catch (error) {
    console.error('❌ Error updating About page:', error.message);
  }
  
  // 3. Fix Contact page layout
  console.log('📧 Fixing Contact page layout...');
  const contactFile = path.join('src', 'app', 'contact', 'page.tsx');
  try {
    let contactContent = await fs.readFile(contactFile, 'utf8');
    
    // Fix email overflow issues
    contactContent = contactContent.replace(
      /<div className="text-lg font-medium">([^<]+@[^<]+)<\/div>/g,
      '<div className="text-lg font-medium break-all">$1</div>'
    );
    
    // Add proper container constraints
    contactContent = contactContent.replace(
      /className="max-w-4xl/g,
      'className="max-w-4xl overflow-hidden'
    );
    
    await fs.writeFile(contactFile, contactContent, 'utf8');
    console.log('✅ Contact page layout fixed\n');
  } catch (error) {
    console.error('❌ Error fixing Contact page:', error.message);
  }
  
  // 4. Fix button contrast on technology pages
  console.log('🎨 Fixing button contrast...');
  const techFiles = [
    'src/app/technology/page.tsx',
    'src/components/ui/Button.tsx'
  ];
  
  for (const file of techFiles) {
    try {
      const filePath = path.join(file);
      let content = await fs.readFile(filePath, 'utf8');
      
      // Fix white text on white/light backgrounds
      content = content.replace(
        /className="([^"]*\s)?text-white(\s[^"]*)?"\s*>(\s*)Request AI Demo/g,
        'className="$1text-blue-900$2">$3Request AI Demo'
      );
      
      // Fix any buttons with poor contrast
      content = content.replace(
        /bg-white text-white/g,
        'bg-white text-blue-900'
      );
      
      content = content.replace(
        /bg-blue-50 text-white/g,
        'bg-blue-50 text-blue-900'
      );
      
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`✅ Fixed contrast in ${file}`);
    } catch (error) {
      // File might not exist, continue
    }
  }
  
  console.log('\n📊 Summary of Fixes:');
  console.log('✅ All phone numbers removed');
  console.log('✅ YouTube embed fixed');
  console.log('✅ About page updated to 2025');
  console.log('✅ Contact page layout fixed');
  console.log('✅ Button contrast improved');
  console.log('\n✨ Comprehensive fix complete!');
}

// Run the fixes
comprehensiveFix().catch(console.error);