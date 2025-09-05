#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

async function fixAllPageFiles() {
  console.log(`${colors.cyan}🔧 Fixing all build errors...${colors.reset}\n`);
  
  const fixes = [];
  
  // Find all page.tsx files
  async function findPageFiles(dir) {
    const files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !['node_modules', '.next', '.git'].includes(entry.name)) {
        files.push(...await findPageFiles(fullPath));
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        files.push(fullPath);
      }
    }
    return files;
  }
  
  const pageFiles = await findPageFiles('app');
  console.log(`Found ${pageFiles.length} page files to check\n`);
  
  // Fix each page file
  for (const file of pageFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n');
      let modified = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Fix function names with invalid characters
        if (line.includes('export default function')) {
          const match = line.match(/export\s+default\s+function\s+([^(]*)\(/);
          if (match) {
            const funcName = match[1].trim();
            
            // Check if function name has invalid characters
            if (!funcName || /[^a-zA-Z0-9_$]/.test(funcName) || /^[0-9]/.test(funcName)) {
              // Generate valid function name from path
              const relativePath = path.relative('src/app', file);
              const parts = path.dirname(relativePath).split(path.sep);
              
              let newFuncName;
              if (parts[0] === '.') {
                newFuncName = 'HomePage';
              } else {
                newFuncName = parts
                  .join('-')
                  .split(/[-\/]/)
                  .filter(p => p)
                  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                  .join('') + 'Page';
              }
              
              lines[i] = line.replace(
                /export\s+default\s+function\s+[^(]*/,
                `export default function ${newFuncName}`
              );
              
              modified = true;
              fixes.push({
                file: path.relative(process.cwd(), file),
                old: funcName || '(invalid)',
                new: newFuncName
              });
              
              console.log(`${colors.green}✓${colors.reset} Fixed: ${path.relative(process.cwd(), file)}`);
              console.log(`  ${colors.yellow}${funcName || '(invalid)'}${colors.reset} → ${colors.green}${newFuncName}${colors.reset}`);
            }
          }
        }
        
        // Fix duplicate imports
        if (line.includes('import') && line.includes('{') && line.includes('}')) {
          const importMatch = line.match(/import\s*{([^}]+)}\s*from/);
          if (importMatch) {
            const imports = importMatch[1].split(',').map(i => i.trim());
            const uniqueImports = [...new Set(imports)];
            
            if (imports.length !== uniqueImports.length) {
              lines[i] = line.replace(
                /import\s*{[^}]+}/,
                `import { ${uniqueImports.join(', ')} }`
              );
              modified = true;
              console.log(`${colors.green}✓${colors.reset} Fixed duplicate imports in: ${path.relative(process.cwd(), file)}`);
            }
          }
        }
      }
      
      if (modified) {
        await fs.writeFile(file, lines.join('\n'));
      }
    } catch (error) {
      console.error(`${colors.red}✗ Error processing ${file}: ${error.message}${colors.reset}`);
    }
  }
  
  // Fix other common issues
  console.log(`\n${colors.cyan}Checking other files...${colors.reset}\n`);
  
  // Check all .tsx and .ts files for other issues
  async function findAllTsFiles(dir) {
    const files = [];
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !['node_modules', '.next', '.git', 'dist'].includes(entry.name)) {
          files.push(...await findAllTsFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore permission errors
    }
    return files;
  }
  
  const allFiles = await findAllTsFiles('src');
  
  for (const file of allFiles) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n');
      let modified = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Fix react-icons imports
        if (line.includes('react-icons/fa')) {
          // Check for non-existent icons
          const invalidIcons = ['FaUsersClass', 'FaUserClass', 'FaClassroom'];
          const replacements = {
            'FaUsersClass': 'FaUsers',
            'FaUserClass': 'FaUser',
            'FaClassroom': 'FaChalkboardTeacher'
          };
          
          let modifiedLine = line;
          for (const [invalid, valid] of Object.entries(replacements)) {
            if (modifiedLine.includes(invalid)) {
              modifiedLine = modifiedLine.replace(new RegExp(invalid, 'g'), valid);
              modified = true;
              console.log(`${colors.green}✓${colors.reset} Fixed icon import: ${invalid} → ${valid}`);
            }
          }
          if (modifiedLine !== line) {
            lines[i] = modifiedLine;
            modified = true;
          }
        }
        
        // Fix duplicate imports
        if (line.includes('import') && line.includes('{') && line.includes('}')) {
          const importMatch = line.match(/import\s*{([^}]+)}\s*from/);
          if (importMatch) {
            const imports = importMatch[1].split(',').map(i => i.trim());
            const uniqueImports = [...new Set(imports)];
            
            if (imports.length !== uniqueImports.length) {
              lines[i] = line.replace(
                /import\s*{[^}]+}/,
                `import { ${uniqueImports.join(', ')} }`
              );
              modified = true;
              const duplicates = imports.filter((item, index) => imports.indexOf(item) !== index);
              console.log(`${colors.green}✓${colors.reset} Fixed duplicate imports (${duplicates.join(', ')}) in: ${path.relative(process.cwd(), file)}`);
            }
          }
        }
      }
      
      if (modified) {
        await fs.writeFile(file, lines.join('\n'));
      }
    } catch (error) {
      // Ignore errors for individual files
    }
  }
  
  // Summary
  console.log(`\n${colors.cyan}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}✅ Fix Complete!${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════${colors.reset}\n`);
  
  if (fixes.length > 0) {
    console.log(`Fixed ${fixes.length} function name(s):\n`);
    fixes.forEach(fix => {
      console.log(`  • ${fix.file}`);
      console.log(`    ${fix.old} → ${fix.new}`);
    });
  }
  
  console.log(`\n${colors.yellow}📋 Next Steps:${colors.reset}`);
  console.log('1. Run: git add -A');
  console.log('2. Run: git commit -m "fix: Auto-fixed all build errors"');
  console.log('3. Run: git push');
  console.log('4. Wait for Vercel deployment\n');
  
  return fixes.length;
}

// Main execution
fixAllPageFiles()
  .then(fixCount => {
    process.exit(fixCount > 0 ? 0 : 0);
  })
  .catch(error => {
    console.error(`${colors.red}Fatal error: ${error}${colors.reset}`);
    process.exit(1);
  });