const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

const PHONE_PATTERNS = [
  // Remove 1300 DISASTER and variations
  /1300\s*DISASTER(\s*\(1300\s*347\s*278\))?/gi,
  /1300[\s-]?347[\s-]?278/gi,
  
  // Remove any Australian phone numbers
  /\+61\s*[2-9]\s*\d{4}\s*\d{4}/gi,
  /\+61\s*4\d{2}\s*\d{3}\s*\d{3}/gi,
  /0[2-9]\d{2}\s*\d{3}\s*\d{3}/gi,
  /04\d{2}\s*\d{3}\s*\d{3}/gi,
  
  // Remove phone-related HTML/JSX
  /<a\s+href=["']tel:[^"']*["'][^>]*>[^<]*<\/a>/gi,
  /href=["']tel:[^"']*["']/gi,
  
  // Remove phone labels and placeholders
  /Phone:\s*[^<\n]*/gi,
  /Call\s+Now:\s*[^<\n]*/gi,
  /Emergency\s+Hotline:\s*[^<\n]*/gi,
  /24\/7\s+Hotline:\s*[^<\n]*/gi,
];

const REPLACEMENTS = {
  // Replace phone CTAs with online alternatives
  'Call Now': 'Get Help Now',
  'Call Us': 'Contact Us Online',
  'Phone Support': 'Online Support',
  'Emergency Hotline': 'Emergency Response',
  '24/7 Hotline': '24/7 Online Support',
  'telephone': 'email',
  'Phone Number': 'Email Address',
  'phone': 'email',
};

async function removePhoneNumbers() {
  console.log('🔍 Starting comprehensive phone number removal...\n');
  
  // Find all relevant files
  const patterns = [
    'src/**/*.{tsx,ts,js,jsx}',
    'scripts/**/*.js',
    'docs/**/*.md',
    'pitch-materials/**/*.md',
    '*.md',
    'public/**/*.json'
  ];
  
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  for (const pattern of patterns) {
    const files = glob.sync(pattern, { 
      ignore: ['node_modules/**', '.next/**', 'build/**', 'scripts/remove-all-phone-numbers.js'] 
    });
    
    for (const file of files) {
      try {
        let content = await fs.readFile(file, 'utf8');
        let originalContent = content;
        
        // Remove phone numbers
        for (const pattern of PHONE_PATTERNS) {
          content = content.replace(pattern, '');
        }
        
        // Replace phone-related text
        for (const [search, replace] of Object.entries(REPLACEMENTS)) {
          const regex = new RegExp(`\\b${search}\\b`, 'gi');
          content = content.replace(regex, replace);
        }
        
        // Clean up empty phone fields
        content = content.replace(/Phone:\s*\n/gi, '');
        content = content.replace(/Tel:\s*\n/gi, '');
        content = content.replace(/telephone:\s*['"]['"]/gi, '');
        
        // Remove phone input fields
        content = content.replace(/<input[^>]*type=["']tel["'][^>]*>/gi, '<!-- Phone input removed -->');
        
        // Update placeholders
        content = content.replace(/placeholder=["']0400\s*000\s*000["']/gi, 'placeholder="your@email.com"');
        content = content.replace(/placeholder=["']\+61[^"']*["']/gi, 'placeholder="your@email.com"');
        
        if (content !== originalContent) {
          await fs.writeFile(file, content, 'utf8');
          console.log(`✅ Modified: ${file}`);
          modifiedFiles++;
        }
        
        totalFiles++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total files scanned: ${totalFiles}`);
  console.log(`   Files modified: ${modifiedFiles}`);
  console.log(`\n✨ Phone number removal complete!`);
}

// Run the removal
removePhoneNumbers().catch(console.error);