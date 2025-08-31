const fs = require('fs');
const path = require('path');

// Files with TypeScript errors that need fixing
const filesToFix = [
  'src/components/contractor/registration/steps/Step2Company.tsx',
  'src/components/feedback/ReviewModerationDashboard.tsx',
  'src/components/interactive/FloatingActionButtons.tsx',
  'src/components/layout/R6Header.tsx',
  'src/components/partners/AffiliateSignup.tsx',
  'src/crm/training/Dashboard.tsx',
  'src/crm/training/LeadManagement.tsx',
  'src/hooks/useFormValidation.ts',
  'src/lib/dynamic-content-generator.ts',
  'src/lib/seo-keyword-strategy.ts',
  'src/lib/services/mock/mockSMS.ts',
  'src/lib/validation.ts',
  'src/types/support.ts'
];

let totalFixed = 0;

filesToFix.forEach(filePath => {
  const fullPath = path.join('D:/Disaster Recovery', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let fixedCount = 0;
  const originalContent = content;
  
  // Fix unterminated string literals (common from phone removal)
  // Fix lines ending with incomplete 'Online Form:' or similar
  content = content.replace(/Online Form:(['"])?$/gm, 'Online Form: "Contact Us"');
  content = content.replace(/tele(['"])?$/gm, '// Phone removed');
  content = content.replace(/Submit Form:(['"])?$/gm, 'Submit Form: "Contact Us"');
  
  // Fix incomplete property assignments
  content = content.replace(/:\s*,/g, ': "",');
  content = content.replace(/:\s*}/g, ': "" }');
  content = content.replace(/:\s*\]/g, ': "" ]');
  
  // Fix template literal issues
  content = content.replace(/`([^`]*)`\s*\n\s*([^`])/g, '`$1` $2');
  
  // Fix missing commas in object literals
  content = content.replace(/(['"])(\s*\n\s*)([a-zA-Z_$][\w$]*\s*:)/g, '$1,$2$3');
  
  // Fix unterminated strings at end of lines
  content = content.replace(/(['"])([^'"\n]*?)$/gm, (match, quote, str) => {
    if (!str.endsWith(quote)) {
      return `${quote}${str}${quote}`;
    }
    return match;
  });
  
  // Fix specific patterns from phone removal
  content = content.replace(/href="tel:"/g, 'href="/contact"');
  content = content.replace(/href=\{`tel:`\}/g, 'href="/contact"');
  
  // Count changes
  if (content !== originalContent) {
    fixedCount = 1;
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
    totalFixed++;
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);
console.log('\nNext steps:');
console.log('1. Run: npm run type-check');
console.log('2. Run: npm run build');
console.log('3. Fix any remaining errors manually');