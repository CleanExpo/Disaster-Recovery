#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const fixes = [
  {
    file: 'src/app/api/contractors/distribute-job/route.ts',
    search: 'Online Form:',
    replace: 'email:'
  },
  {
    file: 'src/app/api/disputes/route.ts',
    search: /}\s+interface/g,
    replace: '}\n\ninterface'
  },
  {
    file: 'src/app/claim/start/page.tsx',
    search: /<a href="\s*Online Form Available 24\/7/g,
    replace: '<a href="#contact-form" className="text-2xl font-bold text-red-600 hover:text-red-700">\n                Online Form Available 24/7'
  },
  {
    file: 'src/components/forms/LeadCaptureForm.tsx',
    search: 'placeholder=""',
    replace: 'placeholder="Your contact details"'
  }
];

async function fixFile(file, search, replace) {
  try {
    const filePath = path.join(process.cwd(), file);
    let content = await fs.readFile(filePath, 'utf8');
    
    if (typeof search === 'string') {
      if (content.includes(search)) {
        content = content.replace(search, replace);
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${file}`);
        return true;
      }
    } else if (search instanceof RegExp) {
      if (search.test(content)) {
        content = content.replace(search, replace);
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${file}`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing syntax errors from phone removal...\n');
  
  let fixed = 0;
  for (const fix of fixes) {
    if (await fixFile(fix.file, fix.search, fix.replace)) {
      fixed++;
    }
  }
  
  // Additional comprehensive fixes
  const additionalFixes = [
    'src/app/api/contractors/distribute-job/route.ts',
    'src/components/forms/LeadCaptureForm.tsx',
    'src/app/claim/start/page.tsx'
  ];
  
  for (const file of additionalFixes) {
    try {
      const filePath = path.join(process.cwd(), file);
      let content = await fs.readFile(filePath, 'utf8');
      
      // Remove empty phone fields
      content = content.replace(/phone:\s*,/g, '');
      content = content.replace(/Phone:\s*,/g, '');
      
      // Fix broken JSX
      content = content.replace(/<a href="\s*\n/g, '<a href="#"\n');
      
      // Fix empty placeholders
      content = content.replace(/placeholder=""\s*\/>/g, 'placeholder="Enter details" />');
      
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`✅ Additional fixes applied to: ${file}`);
    } catch (error) {
      console.error(`❌ Error with additional fixes for ${file}:`, error.message);
    }
  }
  
  console.log(`\n✨ Fixed ${fixed} files with syntax errors`);
}

main().catch(console.error);