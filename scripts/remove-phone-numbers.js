#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to update phone numbers
const replacements = [
  // Replace phone links with contact page
  { pattern: /href="tel:1-?800-?DISASTER"/gi, replacement: 'href="/contact"' },
  { pattern: /href='tel:1-?800-?DISASTER'/gi, replacement: "href='/contact'" },
  
  // Replace phone number text
  { pattern: /1-800-DISASTER/g, replacement: 'Contact Us' },
  { pattern: /Call:\s*1-800-DISASTER/g, replacement: 'Get Help Now' },
  { pattern: /Emergency:\s*1-800-DISASTER/g, replacement: 'Emergency Contact' },
  { pattern: /EMERGENCY:\s*1-800-DISASTER/g, replacement: 'EMERGENCY CONTACT' },
  { pattern: /Business Emergency:\s*1-800-DISASTER/g, replacement: 'Business Emergency Contact' },
  { pattern: /Call Now:\s*1-800-DISASTER/g, replacement: 'Get Help Now' },
  { pattern: /Emergency Hotline:\s*1-800-DISASTER/g, replacement: 'Emergency Contact Form' },
  { pattern: /Start Your Claim:\s*1-800-DISASTER/g, replacement: 'Start Your Claim Online' },
  
  // Replace in descriptions and metadata
  { pattern: /Call 1-800-DISASTER/g, replacement: 'Contact us online' },
  { pattern: /"telephone":\s*"1-800-DISASTER"/g, replacement: '"url": "https://disasterrecovery.com.au/contact"' },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    replacements.forEach(({ pattern, replacement }) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Removing phone number references...\n');
  
  const patterns = [
    'src/**/*.{ts,tsx,js,jsx}',
    'app/**/*.{ts,tsx,js,jsx}',
    'components/**/*.{ts,tsx,js,jsx}'
  ];
  
  let totalFiles = 0;
  let filesChanged = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(file => {
      // Skip node_modules and build folders
      if (file.includes('node_modules') || file.includes('.next')) {
        return;
      }
      
      totalFiles++;
      if (processFile(file)) {
        filesChanged++;
      }
    });
  });
  
  console.log('\n📊 Summary:');
  console.log(`Total files scanned: ${totalFiles}`);
  console.log(`Files changed: ${filesChanged}`);
  console.log('\n✨ Phone number removal complete!');
}

// Run the script
main();