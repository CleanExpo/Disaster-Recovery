#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files with "Contact Us" references
const filesToUpdate = [
  'src/app/services/trauma-cleanup/page.tsx',
  'src/app/services/trauma-cleanup/biohazard-cleanup/page.tsx',
  'src/app/services/structural-drying/page.tsx',
  'src/app/services/storm-damage/page.tsx',
  'src/app/services/mold-remediation/page.tsx',
  'src/app/services/fire-damage/page.tsx',
  'src/app/services/emergency-response/page.tsx',
  'src/app/services/biohazard-cleanup/page.tsx',
  'src/app/services/water-damage/page.tsx',
  'src/app/services/page.tsx',
  'src/app/insurance/page.tsx',
  'src/app/services/commercial/page.tsx',
  'src/components/services/ServicePageLayout.tsx'
];

console.log('🔍 Removing "Contact Us" references...\n');

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
  
  // Replace "Contact Us" with appropriate alternatives
  content = content.replace(/Contact Us Now/g, () => { fixCount++; return 'Get Help Now'; });
  content = content.replace(/Contact Us/g, () => { fixCount++; return 'Get Help Now'; });
  content = content.replace(/Call Contact Us/g, () => { fixCount++; return 'Get Emergency Help'; });
  content = content.replace(/>Contact Us</g, () => { fixCount++; return '>Get Help Now<'; });
  
  // Replace phone paths with warning icons
  const phoneIconPath = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';
  const warningIconPath = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
  
  if (content.includes(phoneIconPath)) {
    content = content.replace(new RegExp(phoneIconPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), warningIconPath);
    fixCount++;
  }
  
  // Replace 'tel:' links with regular links
  content = content.replace(/href="tel:Contact Us"/g, () => { fixCount++; return 'href="/emergency"'; });
  content = content.replace(/href="tel:[^"]*"/g, () => { fixCount++; return 'href="/emergency"'; });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${fixCount} reference(s) in: ${file}`);
    totalFixed += fixCount;
  }
});

console.log(`\n🎉 Total references fixed: ${totalFixed}`);
console.log('📦 Remember to commit and push these changes!');