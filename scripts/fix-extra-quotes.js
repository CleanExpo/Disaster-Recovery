const fs = require('fs');
const path = require('path');

// Files that need fixing
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
  const originalContent = content;
  
  // Remove double quotes at end of import statements
  content = content.replace(/';'/g, "';");
  content = content.replace(/'','$/gm, "''");
  content = content.replace(/","$/gm, '",');
  content = content.replace(/'\s*'$/gm, "'");
  content = content.replace(/"\s*"$/gm, '"');
  
  // Fix empty string patterns
  content = content.replace(/: '','$/gm, ": '',");
  content = content.replace(/: "","$/gm, ': "",');
  content = content.replace(/: '''$/gm, ": ''");
  content = content.replace(/: """$/gm, ': ""');
  
  // Fix other syntax issues
  content = content.replace(/, '$/gm, ", ''");
  content = content.replace(/, "$/gm, ', ""');
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
    totalFixed++;
  }
});

console.log(`\nTotal files fixed: ${totalFixed}`);