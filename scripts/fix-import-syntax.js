const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/JavaScript files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

console.log(`Checking ${files.length} files for import syntax errors...`);

let filesFixed = 0;
let totalFixes = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    const originalContent = content;
    
    // Fix double commas in imports
    const doubleCommaPattern = /import\s*{[^}]*,,+[^}]*}\s*from/g;
    const doubleCommaMatches = content.match(doubleCommaPattern);
    
    if (doubleCommaMatches) {
      content = content.replace(/,,+/g, ',');
      modified = true;
      totalFixes += doubleCommaMatches.length;
    }
    
    // Fix leading commas in imports
    const leadingCommaPattern = /import\s*{\s*,/g;
    const leadingCommaMatches = content.match(leadingCommaPattern);
    
    if (leadingCommaMatches) {
      content = content.replace(/import\s*{\s*,/g, 'import { ');
      modified = true;
      totalFixes += leadingCommaMatches.length;
    }
    
    // Fix trailing commas before closing brace
    const trailingCommaPattern = /,\s*}/g;
    const trailingCommaMatches = content.match(trailingCommaPattern);
    
    if (trailingCommaMatches) {
      content = content.replace(/,\s*}/g, ' }');
      modified = true;
      totalFixes += trailingCommaMatches.length;
    }
    
    // Fix empty imports like { } or {  }
    const emptyImportPattern = /import\s*{\s*}\s*from\s*['"][^'"]+['"]/g;
    const emptyImportMatches = content.match(emptyImportPattern);
    
    if (emptyImportMatches) {
      // Remove the entire empty import line
      content = content.replace(/import\s*{\s*}\s*from\s*['"][^'"]+['"];?\n?/g, '');
      modified = true;
      totalFixes += emptyImportMatches.length;
    }
    
    // Fix imports with only commas and spaces
    const onlyCommasPattern = /import\s*{\s*[,\s]+}\s*from/g;
    const onlyCommasMatches = content.match(onlyCommasPattern);
    
    if (onlyCommasMatches) {
      // Remove the entire malformed import line
      content = content.replace(/import\s*{\s*[,\s]+}\s*from\s*['"][^'"]+['"];?\n?/g, '');
      modified = true;
      totalFixes += onlyCommasMatches.length;
    }
    
    // Write back if modified
    if (modified && content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      filesFixed++;
      console.log(`✓ Fixed: ${path.relative(process.cwd(), file)}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\n=== Import Syntax Fix Complete ===');
console.log(`Files fixed: ${filesFixed}`);
console.log(`Total syntax errors fixed: ${totalFixes}`);