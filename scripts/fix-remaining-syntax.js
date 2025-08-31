#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    const original = content;
    
    // Fix incomplete tele lines
    content = content.replace(/^\s*tele\s*$/gm, '  telephone: "",');
    content = content.replace(/,\s*tele\s*\n/g, ',\n  telephone: "",\n');
    content = content.replace(/  tele\n  email:/g, '  telephone: "",\n  email:');
    content = content.replace(/  tele\n  address:/g, '  telephone: "",\n  address:');
    
    // Fix unterminated strings with "Use Our Online Form" at the end
    content = content.replace(/Use Our Online Form$/gm, "Use Our Online Form'");
    content = content.replace(/Use Our Online Form\n/g, "Use Our Online Form',\n");
    
    // Fix description fields that are unterminated
    content = content.replace(/(description:\s*'[^']*?)Use Our Online Form\s*\n\s*keywords:/g, "$1Use Our Online Form',\n  keywords:");
    content = content.replace(/(description:\s*'[^']*?)Use Our Online Form\s*\n\s*}/g, "$1Use Our Online Form'\n  }");
    
    // Fix any description that ends without closing quote before keywords
    content = content.replace(/(description:\s*'[^']*?)\n\s*keywords:/g, (match, p1) => {
      if (!p1.endsWith("'") && !p1.endsWith('",')) {
        return p1 + "',\n  keywords:";
      }
      return match;
    });
    
    if (content !== original) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Fixing remaining syntax errors...\n');
  
  // Fix specific known problem files
  const problemFiles = [
    'src/lib/seo.ts',
    'src/app/services/biohazard-cleaning/page.tsx',
    'src/app/services/fire-damage-restoration/page.tsx',
    'src/app/services/mould-remediation/page.tsx',
    'src/app/services/sewage-cleanup/page.tsx',
    'src/app/services/storm-damage/page.tsx',
    'src/app/services/water-damage/page.tsx',
    'src/app/services/emergency-response/page.tsx',
    'src/app/services/biohazard/page.tsx'
  ];
  
  for (const file of problemFiles) {
    await fixFile(file);
  }
  
  // Fix all service pages
  const serviceFiles = glob.sync('src/app/services/**/*.tsx');
  
  let fixed = 0;
  for (const file of serviceFiles) {
    if (await fixFile(file)) {
      fixed++;
    }
  }
  
  // Fix the contact page template literal issue
  const contactFile = 'src/app/contact/page.tsx';
  try {
    let content = await fs.readFile(contactFile, 'utf8');
    
    // The template literal syntax is correct, but we need to ensure colour property exists
    // Check if colour is properly spelled (not color)
    if (content.includes('${info.colour}')) {
      console.log(`ℹ️ Contact page template literals appear correct`);
    }
    
  } catch (error) {
    console.error(`❌ Error checking contact:`, error.message);
  }
  
  console.log(`\n✨ Fixed ${fixed} files`);
  
  // Final sweep for any remaining tele or unterminated strings
  console.log('\n🔍 Final syntax check...');
  const allFiles = glob.sync('src/**/*.{tsx,ts}', {
    ignore: ['node_modules/**', '.next/**', 'build/**']
  });
  
  for (const file of allFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      
      // Check for standalone tele
      if (/^\s*tele\s*$/m.test(content)) {
        console.log(`⚠️ Found standalone 'tele' in: ${file}`);
        await fixFile(file);
      }
      
      // Check for unterminated "Use Our Online Form"
      if (/Use Our Online Form\s*\n\s*keywords:/m.test(content)) {
        console.log(`⚠️ Found unterminated string in: ${file}`);
        await fixFile(file);
      }
    } catch (error) {
      // Skip unreadable files
    }
  }
  
  console.log('\n✅ Syntax fixing complete!');
}

main().catch(console.error);