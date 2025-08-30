#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔍 Searching for CSS class typos...\n');

// Find all TypeScript/TSX files
const files = glob.sync('src/**/*.{ts,tsx}', {
  cwd: process.cwd(),
  absolute: true
});

let totalFixed = 0;
const typoMap = {
  'text-centre': 'text-center',
  'items-centre': 'items-center',
  'justify-centre': 'justify-center',
  'self-centre': 'self-center',
  'place-items-centre': 'place-items-center',
  'place-content-centre': 'place-content-center',
  'place-self-centre': 'place-self-center',
  'content-centre': 'content-center'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  let fixCount = 0;
  
  Object.entries(typoMap).forEach(([typo, correct]) => {
    const regex = new RegExp(`\\b${typo}\\b`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, correct);
      hasChanges = true;
      fixCount += matches.length;
      totalFixed += matches.length;
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
    const relativePath = path.relative(process.cwd(), file);
    console.log(`✅ Fixed ${fixCount} typo(s) in: ${relativePath}`);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`✨ Fixed ${totalFixed} CSS class typo(s) total`);
console.log('='.repeat(50));

if (totalFixed > 0) {
  console.log('\n📝 Summary of fixes:');
  Object.entries(typoMap).forEach(([typo, correct]) => {
    console.log(`   ${typo} → ${correct}`);
  });
}