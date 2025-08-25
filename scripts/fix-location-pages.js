const fs = require('fs');
const path = require('path');

// Fix all location pages
const states = {
  'act': 'act',
  'nsw': 'nsw',
  'nt': 'nt',
  'qld': 'qld',
  'sa': 'sa',
  'tas': 'tas',
  'vic': 'vic',
  'wa': 'wa'
};

Object.entries(states).forEach(([stateDir, stateCode]) => {
  const filePath = path.join(__dirname, `../src/app/locations/${stateDir}/page.tsx`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all instances of ${stateCode} or {stateCode with the actual state code
    content = content.replace(/\$\{stateCode\}/g, stateCode);
    content = content.replace(/\{stateCode\.toLowerCase\(\)\}/g, `'${stateCode}'`);
    content = content.replace(/\{stateCode/g, `'${stateCode}'`);
    
    // Fix the specific line causing the error
    content = content.replace(
      /href=\{`\/locations\/\$\{stateCode\.toLowerCase\(\)\}\/\$\{city\.toLowerCase\(\)\.replace\(\/s\+\/g, '-'\)\}`\}/g,
      `href={\`/locations/${stateCode}/\${city.toLowerCase().replace(/\\s+/g, '-')}\`}`
    );
    
    // Also check for any remaining stateCode references
    content = content.replace(
      /href=\{`\/locations\/\$\{stateCode/g,
      `href={\`/locations/${stateCode}`
    );
    
    // Fix if there's a bare stateCode.toLowerCase() reference
    const regex = new RegExp(`\\bstateCode\\.toLowerCase\\(\\)`, 'g');
    content = content.replace(regex, `'${stateCode}'`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${stateDir} (${stateCode})`);
  }
});

console.log('All location pages fixed!');