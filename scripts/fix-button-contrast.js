#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to update based on grep results
const filesToUpdate = [
  'src/app/technology/thermal/page.tsx',
  'src/app/technology/page.tsx',
  'src/app/technology/hepa/page.tsx',
  'src/app/technology/ai/page.tsx',
  'src/app/services/fire-damage-restoration/page.tsx',
  'src/app/disasters/storm-damage/page.tsx',
  'src/app/disasters/flood-recovery/page.tsx',
  'src/app/disasters/cyclone-response/page.tsx',
  'src/app/disasters/coastal-erosion/page.tsx',
  'src/app/disasters/bushfire-restoration/page.tsx',
  'src/app/locations/wa/page.tsx',
  'src/app/locations/vic/page.tsx',
  'src/app/locations/act/page.tsx',
  'src/app/locations/tas/page.tsx',
  'src/app/locations/nt/page.tsx',
  'src/app/locations/qld/page.tsx',
  'src/app/locations/nsw/page.tsx',
  'src/app/locations/sa/page.tsx',
  'src/app/services/sewage-cleanup/page.tsx',
  'src/app/services/emergency-services/page.tsx',
  'src/app/events/gallery/page.tsx',
  'src/app/equipment/specifications/[id]/page.tsx',
  'src/app/equipment/catalog/page.tsx'
];

// Pattern replacements for better contrast
const replacements = [
  {
    // Outline buttons with white text on blue/dark backgrounds
    pattern: /variant="outline"\s+className="([^"]*)?(?:text-white|border-white)[^"]*"/g,
    replacement: 'className="bg-[#FF0000] hover:bg-[#CC0000] text-white $1"'
  },
  {
    // Reverse pattern
    pattern: /className="([^"]*)?(?:text-white|border-white)[^"]*"\s+variant="outline"/g,
    replacement: 'className="bg-[#FF0000] hover:bg-[#CC0000] text-white $1"'
  },
  {
    // Transparent background buttons with white text
    pattern: /className="bg-transparent\s+(?:text-white|border-white)[^"]*"/g,
    replacement: 'className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-none"'
  }
];

console.log('🎨 Fixing button contrast issues with YouTube red (#FF0000) background...\n');

let totalFixed = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixCount = 0;
  
  replacements.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      fixCount += matches.length;
      content = content.replace(pattern, replacement);
    }
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${fixCount} button(s) in: ${file}`);
    totalFixed += fixCount;
  }
});

console.log(`\n🎉 Total buttons fixed: ${totalFixed}`);
console.log('📦 Remember to commit and push these changes!');