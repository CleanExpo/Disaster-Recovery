const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/JavaScript files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  cwd: path.join(__dirname, '..'),
  absolute: true
});

console.log(`Found ${files.length} files to check for Phone icons...`);

let filesModified = 0;
let totalReplacements = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Track original content
    const originalContent = content;
    
    // Remove Phone from imports
    content = content.replace(
      /(import\s*{[^}]*)\bPhone\b([^}]*}\s*from\s*['"]lucide-react['"])/g,
      (match, before, after) => {
        // Remove Phone and clean up commas
        let newImport = before + after;
        newImport = newImport.replace(/,\s*,/g, ','); // Remove double commas
        newImport = newImport.replace(/{,/g, '{'); // Remove leading comma
        newImport = newImport.replace(/,}/g, '}'); // Remove trailing comma
        modified = true;
        return newImport;
      }
    );
    
    // Replace <Phone with <MessageSquare in JSX
    const phoneUsageCount = (content.match(/<Phone\s/g) || []).length;
    if (phoneUsageCount > 0) {
      // Add MessageSquare to imports if Phone was used
      content = content.replace(
        /(import\s*{[^}]*)(}\s*from\s*['"]lucide-react['"])/g,
        (match, imports, end) => {
          if (!imports.includes('MessageSquare')) {
            // Add MessageSquare to imports
            const cleanImports = imports.replace(/}$/, '').trim();
            return cleanImports + ', MessageSquare' + end;
          }
          return match;
        }
      );
      
      // Replace Phone components with MessageSquare
      content = content.replace(/<Phone\s/g, '<MessageSquare ');
      modified = true;
      totalReplacements += phoneUsageCount;
    }
    
    // Replace Phone. references (for component references)
    const phoneRefCount = (content.match(/\bPhone\./g) || []).length;
    if (phoneRefCount > 0) {
      content = content.replace(/\bPhone\./g, 'MessageSquare.');
      modified = true;
      totalReplacements += phoneRefCount;
    }
    
    // Replace {Phone} in JSX expressions
    const phoneExprCount = (content.match(/{Phone}/g) || []).length;
    if (phoneExprCount > 0) {
      content = content.replace(/{Phone}/g, '{MessageSquare}');
      modified = true;
      totalReplacements += phoneExprCount;
    }
    
    // Write back if modified
    if (modified && content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      filesModified++;
      console.log(`✓ Modified: ${path.relative(process.cwd(), file)}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\n=== Phone Icon Removal Complete ===');
console.log(`Files modified: ${filesModified}`);
console.log(`Total Phone icons replaced: ${totalReplacements}`);
console.log('All Phone icons have been replaced with MessageSquare icons');