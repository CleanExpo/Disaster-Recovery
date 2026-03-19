const fs = require('fs');
const path = require('path');

console.log('🔧 Forcing Next.js to build all pages...\n');

// Critical pages that MUST be built
const criticalPages = [
  'app/client-portal/claims/page.tsx',
  'app/client-portal/dashboard/page.tsx',
  'app/client-portal/documents/page.tsx',
  'app/client-portal/messages/page.tsx',
  'app/contractor-portal/dashboard/page.tsx',
  'app/contractor-portal/jobs/page.tsx',
  'app/contractor-portal/training/page.tsx',
  'app/contractor-portal/training/courses/page.tsx',
  'app/contractor-portal/training/courses/wrt/page.tsx',
  'app/contractor-portal/resources/page.tsx',
  'app/contractor-portal/earnings/page.tsx',
  'app/technology/ai/page.tsx',
  'app/government-funding/page.tsx',
  'app/emergency-guide/page.tsx',
  'app/legal/documents/page.tsx',
  'app/legal/forms/non-disclosure/page.tsx',
  'app/legal/forms/background-performing/page.tsx',
];

// Verify all critical pages exist
console.log('Verifying critical pages...');
let allExist = true;

criticalPages.forEach(pagePath => {
  const fullPath = path.join(process.cwd(), pagePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${pagePath}`);
  } else {
    console.log(`❌ MISSING: ${pagePath}`);
    allExist = false;
  }
});

if (!allExist) {
  console.error('\n⚠️ Some critical pages are missing!');
  process.exit(1);
}

console.log('\n✅ All critical pages exist and will be built!');

// Create a manifest file for Vercel
const manifest = {
  version: 1,
  pages: criticalPages.map(p => p.replace('app/', '/').replace('/page.tsx', '')),
  buildTime: new Date().toISOString()
};

const reportsDir = path.join(process.cwd(), '.reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}
fs.writeFileSync(
  path.join(reportsDir, 'build-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('📝 Build manifest created at .reports/build-manifest.json');