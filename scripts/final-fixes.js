const fs = require('fs');
const path = require('path');

// Fix disaster pages
const disasterPages = [
  'bushfire-restoration',
  'coastal-erosion', 
  'cyclone-response',
  'flood-recovery',
  'storm-damage'
];

disasterPages.forEach(page => {
  const filePath = path.join(__dirname, `../src/app/disasters/${page}/page.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Already fixed bushfire, fix the rest
    if (page !== 'bushfire-restoration') {
      content = content.replace(/{disaster\.severity\.toUpperCase\(\)}/g, 'EXTREME');
      content = content.replace(/{disaster\.responseTime}/g, '30-60MIN');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${page}`);
  }
});

// Fix location pages stateCode issue
const states = ['act', 'nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'];
const stateNames = {
  'act': 'ACT',
  'nsw': 'NSW', 
  'nt': 'NT',
  'qld': 'QLD',
  'sa': 'SA',
  'tas': 'TAS',
  'vic': 'VIC',
  'wa': 'WA'
};

states.forEach(state => {
  const filePath = path.join(__dirname, `../src/app/locations/${state}/page.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace stateCode variable with actual state code
    content = content.replace(/\$\{stateCode\}/g, state);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${state} location page`);
  }
});

console.log('All fixes applied!');