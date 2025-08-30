#!/usr/bin/env node

/**
 * Script to remove all "Australia" references from Disaster Recovery branding
 * This fixes the deployment issue where old branding is still cached
 */

const fs = require('fs').promises;
const path = require('path');

// Files to update
const filesToUpdate = [
  // Critical component files
  'src/components/UltraModernFooter.tsx',
  'src/components/seo/HomepageStructuredData.tsx',
  
  // Configuration files
  'src/lib/constants.ts',
  'src/lib/seo.ts',
  'src/config/image-library.ts',
  
  // Public files
  'public/robots.txt',
  'public/service-worker.js',
  
  // All service and location pages
  'src/app/**/*.tsx',
  'src/app/**/*.ts',
  
  // Scripts
  'scripts/*.js'
];

const replacements = [
  // Main branding
  { from: /Disaster Recovery/g, to: 'Disaster Recovery' },
  { from: /DR/g, to: 'DR' },
  
  // Possessive forms
  { from: /Leading disaster recovery/gi, to: 'Leading disaster recovery' },
  { from: /Premier/gi, to: 'Premier' },
  { from: /#1/gi, to: '#1' },
  { from: /Largest/gi, to: 'Largest' },
  { from: /Most trusted/gi, to: 'Most trusted' },
  
  // Location specific but keeping coverage
  { from: /nationwide/gi, to: 'nationwide' },
  { from: /nationwide/gi, to: 'nationwide' },
  { from: /nationwide/gi, to: 'nationwide' },
  { from: /locally-owned/gi, to: 'locally-owned' },
  
  // Meta descriptions
  { from: /Disaster Recovery \| /g, to: 'Disaster Recovery | ' },
  { from: / \| Disaster Recovery/g, to: ' | Disaster Recovery' },
  
  // URLs and domains should NOT be changed
  // Keep: disasterrecovery.com.au
  // Keep: Australian city names
  // Keep: Australian standards references
];

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let modified = content;
    let changeCount = 0;
    
    for (const replacement of replacements) {
      const before = modified;
      modified = modified.replace(replacement.from, replacement.to);
      if (before !== modified) {
        changeCount++;
      }
    }
    
    if (changeCount > 0) {
      await fs.writeFile(filePath, modified, 'utf8');
      console.log(`✅ Updated ${filePath} (${changeCount} replacements)`);
      return true;
    }
    
    return false;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
    return false;
  }
}

async function getAllFiles(dir, pattern = /\.(tsx?|js|json|md)$/) {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip node_modules, .git, and other build directories
      if (entry.name === 'node_modules' || 
          entry.name === '.git' || 
          entry.name === '.next' ||
          entry.name === 'dist' ||
          entry.name === 'build') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subFiles = await getAllFiles(fullPath, pattern);
        files.push(...subFiles);
      } else if (pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

async function main() {
  console.log('🔍 Scanning for files containing "Disaster Recovery"...\n');
  
  // Get all relevant files
  const srcFiles = await getAllFiles(path.join(process.cwd(), 'src'));
  const publicFiles = await getAllFiles(path.join(process.cwd(), 'public'));
  const scriptFiles = await getAllFiles(path.join(process.cwd(), 'scripts'));
  const docFiles = await getAllFiles(path.join(process.cwd(), 'docs'));
  
  const allFiles = [...srcFiles, ...publicFiles, ...scriptFiles, ...docFiles];
  
  console.log(`Found ${allFiles.length} files to check\n`);
  
  let updatedCount = 0;
  
  // Process all files
  for (const file of allFiles) {
    const updated = await processFile(file);
    if (updated) {
      updatedCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`✅ Updated ${updatedCount} files`);
  console.log('='.repeat(50));
  
  if (updatedCount > 0) {
    console.log('\n⚠️  IMPORTANT: Now you need to:');
    console.log('1. Commit these changes: git add -A && git commit -m "Remove Australia from branding"');
    console.log('2. Push to GitHub: git push origin main');
    console.log('3. Clear Vercel cache in dashboard');
    console.log('4. Trigger a new deployment');
  }
}

// Run the script
main().catch(console.error);