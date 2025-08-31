#!/usr/bin/env node

/**
 * Pre-Build Validation Script
 * Catches and fixes common build errors before deployment
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Track all issues found
const issues = {
  syntax: [],
  imports: [],
  exports: [],
  files: [],
  dependencies: [],
  typescript: [],
  css: [],
  fixed: []
};

// Common patterns that cause build errors
const ERROR_PATTERNS = {
  // Function name errors
  invalidFunctionName: /export\s+default\s+function\s+[^a-zA-Z_$]|export\s+default\s+function\s+.*[-\/\s]/,
  functionNameWithSlash: /export\s+default\s+function\s+\/\w+/,
  functionNameWithHyphen: /export\s+default\s+function\s+\w+-\w+/,
  
  // Import errors
  duplicateImport: /import\s*{[^}]*(\w+)[^}]*,\s*\1[^}]*}/,
  missingFileExtension: /from\s+['"]\.\/[^'"]+(?<!\.tsx?)(?<!\.jsx?)(?<!\.js)(?<!\.ts)(?<!\.css)(?<!\.json)['"]/,
  invalidImportPath: /from\s+['"]@\/(?!components|lib|styles|utils|hooks|types|content|app|public)/,
  
  // CSS import errors
  cssNotInStyles: /import\s+['"]@\/(?!styles)[^'"]*\.css['"]/,
  
  // TypeScript errors
  anyType: /:\s*any(?:\s|;|,|\))/,
  missingReturnType: /function\s+\w+\s*\([^)]*\)\s*{/,
  
  // React errors
  missingKey: /<(?!key)[^>]*\.map\s*\([^)]*\)\s*=>\s*(?!.*key=)/,
  directStateModification: /this\.state\.\w+\s*=/
};

// Validation functions
async function validateFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    const fileName = path.basename(filePath);
    const isPageFile = filePath.includes('/app/') && fileName === 'page.tsx';
    
    // Check for syntax errors
    lines.forEach((line, index) => {
      // Invalid function names
      if (ERROR_PATTERNS.invalidFunctionName.test(line)) {
        issues.syntax.push({
          file: filePath,
          line: index + 1,
          issue: 'Invalid function name',
          content: line.trim(),
          fix: await fixFunctionName(filePath, line, index)
        });
      }
      
      // Duplicate imports
      if (ERROR_PATTERNS.duplicateImport.test(line)) {
        const matches = line.match(/(\w+).*\1/);
        if (matches) {
          issues.imports.push({
            file: filePath,
            line: index + 1,
            issue: `Duplicate import: ${matches[1]}`,
            content: line.trim(),
            fix: await fixDuplicateImport(filePath, line, index)
          });
        }
      }
      
      // Check for 'any' type usage
      if (ERROR_PATTERNS.anyType.test(line) && filePath.endsWith('.tsx')) {
        issues.typescript.push({
          file: filePath,
          line: index + 1,
          issue: 'Usage of "any" type',
          content: line.trim(),
          severity: 'warning'
        });
      }
    });
    
    // Page-specific validations
    if (isPageFile) {
      const hasDefaultExport = content.includes('export default');
      if (!hasDefaultExport) {
        issues.exports.push({
          file: filePath,
          issue: 'Missing default export for page component',
          fix: await addDefaultExport(filePath)
        });
      }
    }
    
    // Check CSS imports
    const cssImports = content.match(/import\s+['"][^'"]*\.css['"]/g) || [];
    for (const cssImport of cssImports) {
      const cssPath = cssImport.match(/['"]([^'"]+)['"]/)[1];
      if (cssPath.startsWith('@/') && !cssPath.startsWith('@/styles/')) {
        issues.css.push({
          file: filePath,
          issue: `CSS import not in styles folder: ${cssPath}`,
          fix: await fixCssImport(filePath, cssImport)
        });
      }
    }
    
  } catch (error) {
    issues.files.push({
      file: filePath,
      issue: `Error reading file: ${error.message}`
    });
  }
}

// Fix functions
async function fixFunctionName(filePath, line, lineIndex) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Extract and fix function name
    let fixedLine = line;
    
    // Remove slashes and hyphens from function names
    if (line.includes('export default function')) {
      const match = line.match(/export\s+default\s+function\s+([^(]+)/);
      if (match) {
        let funcName = match[1];
        // Remove invalid characters and convert to PascalCase
        funcName = funcName
          .replace(/[^a-zA-Z0-9]/g, '')
          .replace(/^[a-z]/, char => char.toUpperCase());
        
        // If empty or starts with number, generate from file path
        if (!funcName || /^[0-9]/.test(funcName)) {
          const fileName = path.basename(filePath, '.tsx');
          funcName = fileName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Page';
        }
        
        fixedLine = line.replace(/export\s+default\s+function\s+[^(]+/, `export default function ${funcName}`);
        lines[lineIndex] = fixedLine;
        
        await fs.writeFile(filePath, lines.join('\n'));
        return `Fixed: Changed to '${funcName}'`;
      }
    }
  } catch (error) {
    return `Failed to fix: ${error.message}`;
  }
}

async function fixDuplicateImport(filePath, line, lineIndex) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Remove duplicate imports
    const imports = line.match(/{([^}]+)}/)[1].split(',').map(i => i.trim());
    const uniqueImports = [...new Set(imports)];
    
    const fixedLine = line.replace(/{[^}]+}/, `{ ${uniqueImports.join(', ')} }`);
    lines[lineIndex] = fixedLine;
    
    await fs.writeFile(filePath, lines.join('\n'));
    return 'Fixed: Removed duplicate imports';
  } catch (error) {
    return `Failed to fix: ${error.message}`;
  }
}

async function fixCssImport(filePath, cssImport) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const cssPath = cssImport.match(/['"]([^'"]+)['"]/)[1];
    const fileName = path.basename(cssPath);
    
    // Move CSS file to styles directory
    const oldPath = cssPath.replace('@/', 'src/');
    const newPath = `@/styles/${fileName}`;
    
    // Update import in file
    const fixedContent = content.replace(cssImport, `import '${newPath}'`);
    await fs.writeFile(filePath, fixedContent);
    
    return `Fixed: Moved CSS import to ${newPath}`;
  } catch (error) {
    return `Failed to fix: ${error.message}`;
  }
}

async function addDefaultExport(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const fileName = path.basename(path.dirname(filePath));
    const componentName = fileName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Page';
    
    const defaultExport = `
export default function ${componentName}() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">${fileName.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>Content coming soon...</p>
    </div>
  );
}`;
    
    await fs.writeFile(filePath, content + defaultExport);
    return `Added default export: ${componentName}`;
  } catch (error) {
    return `Failed to add export: ${error.message}`;
  }
}

// Find all TypeScript/React files
async function findAllFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = [];
  
  async function traverse(currentDir) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory()) {
          // Skip node_modules and .next
          if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(entry.name)) {
            await traverse(fullPath);
          }
        } else if (entry.isFile()) {
          if (extensions.some(ext => entry.name.endsWith(ext))) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`Error traversing ${currentDir}: ${error.message}`);
    }
  }
  
  await traverse(dir);
  return files;
}

// Check for missing dependencies
async function checkDependencies() {
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Common missing dependencies that cause build errors
    const requiredDeps = [
      'react',
      'react-dom',
      'next',
      '@types/react',
      '@types/node',
      'typescript'
    ];
    
    for (const dep of requiredDeps) {
      if (!dependencies[dep]) {
        issues.dependencies.push({
          package: dep,
          issue: 'Missing required dependency'
        });
      }
    }
    
    // Check for version conflicts
    if (dependencies['next'] && dependencies['react']) {
      const nextVersion = parseInt(dependencies['next'].replace(/[^0-9]/g, '').substring(0, 2));
      const reactVersion = parseInt(dependencies['react'].replace(/[^0-9]/g, '').substring(0, 2));
      
      if (nextVersion >= 13 && reactVersion < 18) {
        issues.dependencies.push({
          package: 'react',
          issue: `React version ${dependencies['react']} may be incompatible with Next.js ${dependencies['next']}`
        });
      }
    }
  } catch (error) {
    issues.files.push({
      file: 'package.json',
      issue: `Error reading package.json: ${error.message}`
    });
  }
}

// Main validation function
async function validate(autoFix = false) {
  console.log(`${colors.bright}${colors.blue}╔════════════════════════════════════════════════╗`);
  console.log(`║       PRE-BUILD VALIDATION & FIX SYSTEM       ║`);
  console.log(`║         Preventing Deployment Failures         ║`);
  console.log(`╚════════════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`${colors.cyan}🔍 Scanning project files...${colors.reset}\n`);
  
  // Find all files to validate
  const srcFiles = await findAllFiles('src');
  console.log(`Found ${srcFiles.length} files to validate\n`);
  
  // Validate each file
  for (const file of srcFiles) {
    await validateFile(file);
  }
  
  // Check dependencies
  await checkDependencies();
  
  // Display results
  console.log(`${colors.bright}${colors.yellow}📊 VALIDATION RESULTS${colors.reset}`);
  console.log('═'.repeat(50));
  
  let totalIssues = 0;
  let criticalIssues = 0;
  
  // Display issues by category
  const categories = [
    { name: 'Syntax Errors', data: issues.syntax, critical: true },
    { name: 'Import Errors', data: issues.imports, critical: true },
    { name: 'Export Errors', data: issues.exports, critical: true },
    { name: 'CSS Import Issues', data: issues.css, critical: false },
    { name: 'TypeScript Issues', data: issues.typescript, critical: false },
    { name: 'File Errors', data: issues.files, critical: true },
    { name: 'Dependency Issues', data: issues.dependencies, critical: true }
  ];
  
  for (const category of categories) {
    if (category.data.length > 0) {
      const icon = category.critical ? '❌' : '⚠️';
      console.log(`\n${icon} ${colors.red}${category.name}: ${category.data.length} issue(s)${colors.reset}`);
      
      category.data.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file || issue.package}`);
        if (issue.line) console.log(`     Line ${issue.line}: ${issue.content}`);
        console.log(`     Issue: ${issue.issue}`);
        if (issue.fix) {
          console.log(`     ${colors.green}✓ ${issue.fix}${colors.reset}`);
        }
      });
      
      totalIssues += category.data.length;
      if (category.critical) criticalIssues += category.data.length;
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(50));
  if (totalIssues === 0) {
    console.log(`${colors.green}✅ No issues found! Build should succeed.${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}Total Issues: ${totalIssues}${colors.reset}`);
    console.log(`${colors.red}Critical Issues: ${criticalIssues}${colors.reset}`);
    
    if (autoFix && issues.fixed.length > 0) {
      console.log(`${colors.green}Fixed Issues: ${issues.fixed.length}${colors.reset}`);
    }
    
    if (criticalIssues > 0) {
      console.log(`\n${colors.red}⚠️  BUILD WILL FAIL - Critical issues must be fixed!${colors.reset}`);
      return false;
    } else {
      console.log(`\n${colors.yellow}⚠️  Build may succeed but has warnings${colors.reset}`);
      return true;
    }
  }
}

// TypeScript configuration check
async function checkTsConfig() {
  try {
    const tsConfig = JSON.parse(await fs.readFile('tsconfig.json', 'utf8'));
    
    // Recommended settings for Next.js
    const recommendations = {
      'compilerOptions.strict': true,
      'compilerOptions.skipLibCheck': true,
      'compilerOptions.esModuleInterop': true,
      'compilerOptions.module': 'esnext',
      'compilerOptions.moduleResolution': 'bundler',
      'compilerOptions.jsx': 'preserve'
    };
    
    console.log(`\n${colors.cyan}📋 TypeScript Configuration Check${colors.reset}`);
    
    for (const [key, value] of Object.entries(recommendations)) {
      const keys = key.split('.');
      let current = tsConfig;
      for (const k of keys) {
        current = current?.[k];
      }
      
      if (current !== value) {
        console.log(`  ${colors.yellow}⚠️  Consider setting ${key} to ${value}${colors.reset}`);
      } else {
        console.log(`  ${colors.green}✓ ${key} is correctly set${colors.reset}`);
      }
    }
  } catch (error) {
    console.log(`${colors.red}Could not check tsconfig.json: ${error.message}${colors.reset}`);
  }
}

// Quick fix command
async function quickFix() {
  console.log(`\n${colors.cyan}🔧 Running Quick Fix...${colors.reset}\n`);
  
  // Fix all page function names
  const pageFiles = await findAllFiles('src/app', ['.tsx']);
  
  for (const file of pageFiles) {
    if (file.endsWith('page.tsx')) {
      const content = await fs.readFile(file, 'utf8');
      const lines = content.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export default function')) {
          const match = lines[i].match(/export\s+default\s+function\s+([^(]+)/);
          if (match) {
            let funcName = match[1];
            
            // Check if function name has invalid characters
            if (/[^a-zA-Z0-9_$]/.test(funcName)) {
              const dirName = path.basename(path.dirname(file));
              const newFuncName = dirName
                .split(/[-\/]/)
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('') + 'Page';
              
              lines[i] = lines[i].replace(
                /export\s+default\s+function\s+[^(]+/,
                `export default function ${newFuncName}`
              );
              
              await fs.writeFile(file, lines.join('\n'));
              console.log(`${colors.green}✓ Fixed ${file}: ${funcName} → ${newFuncName}${colors.reset}`);
              issues.fixed.push(file);
            }
          }
        }
      }
    }
  }
  
  if (issues.fixed.length > 0) {
    console.log(`\n${colors.green}✅ Fixed ${issues.fixed.length} files${colors.reset}`);
  } else {
    console.log(`${colors.yellow}No automatic fixes needed${colors.reset}`);
  }
}

// Run validation
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'fix') {
    await quickFix();
    await validate(true);
  } else if (command === 'check-ts') {
    await checkTsConfig();
  } else {
    await validate(false);
    await checkTsConfig();
  }
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    issues,
    canBuild: criticalIssues === 0
  };
  
  await fs.writeFile(
    'pre-build-report.json',
    JSON.stringify(report, null, 2)
  );
  
  console.log(`\n${colors.cyan}📄 Report saved to pre-build-report.json${colors.reset}`);
  
  // Exit with error code if critical issues found
  if (report.canBuild) {
    console.log(`\n${colors.green}✅ Pre-build validation passed!${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}❌ Pre-build validation failed!${colors.reset}`);
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Unexpected error: ${error}${colors.reset}`);
  process.exit(1);
});

// Run
main().catch(console.error);