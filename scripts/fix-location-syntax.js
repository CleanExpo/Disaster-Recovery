const fs = require('fs');
const path = require('path');

// Fix all location pages with incorrect syntax
const states = ['act', 'nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'];

states.forEach(state => {
  const filePath = path.join(__dirname, `../src/app/locations/${state}/page.tsx`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the incorrect $'state' syntax
    const incorrectPattern = new RegExp(`\\$'${state}'`, 'g');
    content = content.replace(incorrectPattern, state);
    
    // Also fix if there's /s+ instead of /\s+
    content = content.replace(/\/s\+/g, '/\\s+');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${state}`);
  }
});

console.log('All location pages syntax fixed!');