#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    
    // Fix incomplete 'tele' lines (should be telephone: '')
    if (content.includes('    tele\n    address:')) {
      content = content.replace(/    tele\n    address:/g, '    telephone: "",\n    address:');
      modified = true;
    }
    
    // Fix template literal issues in className
    // This is tricky because we need to preserve the template literal structure
    const templateLiteralPattern = /className=\{`([^`]*)\$\{info\.colour\}([^`]*)`\}/g;
    if (templateLiteralPattern.test(content)) {
      // Don't modify - the template literals are actually correct
      // The error might be elsewhere
    }
    
    // Fix any standalone 'tele' lines
    content = content.replace(/^\s*tele\s*$/gm, '    telephone: "",');
    
    // Fix incomplete property definitions
    content = content.replace(/,\s*tele\s*\n/g, ',\n    telephone: "",\n');
    
    if (modified) {
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
  console.log('🔧 Fixing syntax errors from phone removal...\n');
  
  // Find all biohazard-cleaning service pages
  const biohazardFiles = glob.sync('src/app/services/biohazard-cleaning/**/*.tsx');
  
  let fixed = 0;
  for (const file of biohazardFiles) {
    if (await fixFile(file)) {
      fixed++;
    }
  }
  
  // Also check the contact page
  const contactFile = 'src/app/contact/page.tsx';
  try {
    let content = await fs.readFile(contactFile, 'utf8');
    
    // The template literal in contact page is actually correct
    // The issue might be with how the colour property is used
    // Let's ensure info.colour exists and is properly formatted
    
    // Check if there are any syntax issues with the template literals
    const hasTemplateIssue = content.includes('${info.colour}');
    if (hasTemplateIssue) {
      console.log(`ℹ️ Template literals in ${contactFile} appear correct`);
    }
  } catch (error) {
    console.error(`❌ Error checking ${contactFile}:`, error.message);
  }
  
  console.log(`\n✨ Fixed ${fixed} files with syntax errors`);
  
  // Additional check for any remaining 'tele' instances
  console.log('\n🔍 Searching for any remaining issues...');
  const allFiles = glob.sync('src/**/*.{tsx,ts}', {
    ignore: ['node_modules/**', '.next/**']
  });
  
  for (const file of allFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      if (content.includes('    tele\n')) {
        console.log(`⚠️ Found incomplete 'tele' in: ${file}`);
        // Auto-fix it
        const fixed = content.replace(/    tele\n/g, '    telephone: "",\n');
        await fs.writeFile(file, fixed, 'utf8');
        console.log(`  ✅ Auto-fixed: ${file}`);
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
}

main().catch(console.error);