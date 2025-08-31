const fs = require('fs');
const path = require('path');

// List of service pages that need fixing
const servicePagesToFix = [
  'src/app/services/biohazard-cleanup/page.tsx',
  'src/app/services/emergency-response/page.tsx',
  'src/app/services/mold-remediation/page.tsx',
  'src/app/services/storm-damage/page.tsx',
  'src/app/services/structural-drying/page.tsx',
  'src/app/services/trauma-cleanup/page.tsx',
  'src/app/services/trauma-cleanup/biohazard-cleanup/page.tsx',
  'src/app/services/water-damage/page.tsx'
];

let totalFixed = 0;

servicePagesToFix.forEach(filePath => {
  const fullPath = path.join('D:/Disaster Recovery', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let fixedCount = 0;
  
  // Replace SEOImage with Image when used with direct props
  const seoImagePattern = /<SEOImage\s+(?:[^>]*?\s)?(?:src=|alt=|width=|height=|className=)/g;
  
  if (seoImagePattern.test(content)) {
    // Replace SEOImage import with Image import
    content = content.replace(
      /import\s+{\s*SEOImage\s*}\s+from\s+['"]@\/components\/ui\/seo-image['"]/g,
      "import Image from 'next/image'"
    );
    
    // If there's already an Image import, don't duplicate
    if (content.includes("import Image from 'next/image'") && 
        content.match(/import Image from 'next\/image'/g).length > 1) {
      // Remove duplicate
      content = content.replace(/import Image from 'next\/image';\s*import Image from 'next\/image';/g, 
                                "import Image from 'next/image';");
    }
    
    // Replace <SEOImage with <Image when it has direct props
    content = content.replace(/<SEOImage(\s+(?:src=|alt=|width=|height=|className=))/g, '<Image$1');
    
    fixedCount = (content.match(/<Image\s+(?:[^>]*?\s)?(?:src=|alt=|width=|height=|className=)/g) || []).length;
    
    if (fixedCount > 0) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Fixed ${fixedCount} SEOImage instances in ${filePath}`);
      totalFixed += fixedCount;
    }
  } else {
    console.log(`No SEOImage with direct props found in ${filePath}`);
  }
});

console.log(`\nTotal fixed: ${totalFixed} SEOImage instances across all files`);