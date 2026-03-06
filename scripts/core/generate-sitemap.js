const fs = require('fs');
const path = require('path');

// Function to recursively find all page files
function findPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (!['node_modules', '.next', '.git', 'public'].includes(file)) {
        findPages(filePath, fileList);
      }
    } else if (file === 'page.tsx' || file === 'page.js') {
      // Get the route path
      const route = filePath
        .replace(path.join(process.cwd(), 'app'), '')
        .replace(/\\/g, '/')
        .replace('/page.tsx', '')
        .replace('/page.js', '')
        .replace(/\[([^\]]+)\]/g, ':$1'); // Convert [param] to :param
      
      fileList.push(route || '/');
    }
  });
  
  return fileList;
}

// Generate the sitemap
console.log('🗺️ Generating sitemap with all pages...\n');

const appDir = path.join(process.cwd(), 'app');
const pages = findPages(appDir);

console.log(`Found ${pages.length} pages total\n`);

// Group pages by category
const categorized = {
  'Portal Pages': pages.filter(p => p.includes('portal')),
  'Service Pages': pages.filter(p => p.includes('service')),
  'Legal Pages': pages.filter(p => p.includes('legal')),
  'Location Pages': pages.filter(p => p.includes('locations')),
  'Guide Pages': pages.filter(p => p.includes('guide')),
  'Other Pages': pages.filter(p => 
    !p.includes('portal') && 
    !p.includes('service') && 
    !p.includes('legal') && 
    !p.includes('locations') &&
    !p.includes('guide')
  )
};

// Log categorized pages
Object.entries(categorized).forEach(([category, categoryPages]) => {
  if (categoryPages.length > 0) {
    console.log(`\n${category} (${categoryPages.length}):`);
    console.log('=' .repeat(40));
    categoryPages.slice(0, 10).forEach(page => {
      console.log(`  ${page}`);
    });
    if (categoryPages.length > 10) {
      console.log(`  ... and ${categoryPages.length - 10} more`);
    }
  }
});

// Create a sitemap.txt file with all routes
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.txt');
const sitemapContent = pages
  .filter(p => !p.includes(':')) // Exclude dynamic routes
  .map(p => `https://disaster-recovery-seven.vercel.app${p}`)
  .join('\n');

fs.writeFileSync(sitemapPath, sitemapContent);
console.log(`\n✅ Sitemap generated at: ${sitemapPath}`);
console.log(`📊 Total static pages: ${pages.filter(p => !p.includes(':')).length}`);
console.log(`📊 Total dynamic pages: ${pages.filter(p => p.includes(':')).length}`);