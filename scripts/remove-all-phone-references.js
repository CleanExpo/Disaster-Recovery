const fs = require('fs');
const path = require('path');

// List of directories to search
const directories = [
  'src/app/services',
  'src/components',
  'src/app'
];

// Phone number patterns to remove or replace
const phonePatterns = [
  // Remove phone numbers with various formats
  { pattern: /1300\s*\d{3}\s*\d{3}/gi, replacement: 'online support' },
  { pattern: /1300\s*[A-Z\s]+/gi, replacement: 'online support' },
  { pattern: /1800\s*\d{3}\s*\d{3}/gi, replacement: 'online support' },
  { pattern: /1800-DISASTER/gi, replacement: 'online support' },
  { pattern: /Call\s+1300\s*\d{3}\s*\d{3}/gi, replacement: 'Use online form' },
  { pattern: /Call\s+1800\s*\d{3}\s*\d{3}/gi, replacement: 'Use online form' },
  { pattern: /Emergency:\s*1300\s*\d{3}\s*\d{3}/gi, replacement: 'Emergency: Use online form' },
  { pattern: /tel:1300[A-Z]+/gi, replacement: '/contact' },
  
  // Replace "Call" CTAs with online alternatives
  { pattern: /Call\s+us\s+at\s+1300\s*\d{3}\s*\d{3}/gi, replacement: 'Contact us online' },
  { pattern: /Call\s+our\s+certified\s+technicians\s+at\s+1300\s*\d{3}\s*\d{3}/gi, replacement: 'Contact our certified technicians online' },
  { pattern: /call\s+our\s+24\/7\s+emergency\s+line\s+at\s+1300\s*\d{3}\s*\d{3}/gi, replacement: 'use our 24/7 online emergency form' },
  { pattern: /Call\s+us\s+immediately\s+at\s+1300\s*\d{3}\s*\d{3}/gi, replacement: 'Contact us immediately online' },
  { pattern: /please\s+call\s+our\s+24\/7\s+hotline\s+at.*?<\/strong>/gi, replacement: 'please use our 24/7 online emergency form</strong>' },
  
  // Replace phone number displays with online support text
  { pattern: /<p\s+className="text-2xl\s+font-bold\s+text-blue-700">1300\s*\d{3}\s*\d{3}<\/p>/gi, replacement: '<p className="text-2xl font-bold text-blue-700">Online Support 24/7</p>' },
  { pattern: /<p\s+className="text-2xl\s+font-bold\s+text-red-600">1300\s*\d{3}\s*\d{3}<\/p>/gi, replacement: '<p className="text-2xl font-bold text-red-600">Online Support 24/7</p>' },
  { pattern: /<p\s+className="text-2xl\s+font-bold\s+text-emerald-600">1300\s*\d{3}\s*\d{3}<\/p>/gi, replacement: '<p className="text-2xl font-bold text-emerald-600">Online Support 24/7</p>' },
  { pattern: /<p\s+className="font-bold\s+text-blue-600">1300\s*\d{3}\s*\d{3}<\/p>/gi, replacement: '<p className="font-bold text-blue-600">Online Support</p>' },
  
  // Replace emergency phone references
  { pattern: /Emergency\s+Response:\s*1300\s*\d{3}\s*\d{3}/gi, replacement: 'Emergency Response: Online Form' },
  { pattern: /📞\s*Operations\s+Manager:\s*1300\s*XXX\s*XXX/gi, replacement: '💬 Operations Manager: Online Support' },
  { pattern: /📞\s*24\/7\s*Technical\s+Support:\s*1300\s*XXX\s*XXX/gi, replacement: '💬 24/7 Technical Support: Online Chat' },
  
  // Replace schema telephone fields with empty strings
  { pattern: /"telephone":\s*"1800-DISASTER"/gi, replacement: '"telephone": ""' },
  { pattern: /"servicePhone":\s*"1800-DISASTER"/gi, replacement: '"servicePhone": ""' },
  { pattern: /"serviceSmsNumber":\s*"1800-DISASTER"/gi, replacement: '"serviceSmsNumber": ""' },
  
  // Replace any remaining specific numbers
  { pattern: /1300\s*566\s*166/gi, replacement: 'online support' },
  { pattern: /1300\s*814\s*870/gi, replacement: 'online support' },
  { pattern: /1300\s*309\s*361/gi, replacement: 'online support' },
  { pattern: /1300\s*776\s*062/gi, replacement: 'online support' },
  { pattern: /1300\s*737\s*867/gi, replacement: 'online support' },
  { pattern: /1300\s*RESTORE/gi, replacement: 'online support' },
  { pattern: /1300\s*ASSESS/gi, replacement: 'online support' },
  { pattern: /1300\s*BIOHAZARD/gi, replacement: 'online support' },
  { pattern: /1300\s*EMERGENCY/gi, replacement: 'online support' },
  { pattern: /1300\s*NRP\s*SUP/gi, replacement: 'online support' },
  { pattern: /1300-NRP-247/gi, replacement: 'online support' }
];

// Function to process a file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    phonePatterns.forEach(({ pattern, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        modified = true;
        console.log(`  Found ${matches.length} matches for pattern: ${pattern.source} in ${filePath}`);
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

// Function to recursively find all .tsx and .ts files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next') {
        findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
console.log('🔍 Searching for phone number references...\n');

let totalFilesUpdated = 0;

directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`\nProcessing directory: ${dir}`);
    const files = findFiles(fullPath);
    
    files.forEach(file => {
      if (processFile(file)) {
        totalFilesUpdated++;
      }
    });
  } else {
    console.log(`⚠️  Directory not found: ${dir}`);
  }
});

console.log(`\n✨ Complete! Updated ${totalFilesUpdated} files.`);