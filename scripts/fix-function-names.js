const fs = require('fs');
const path = require('path');

// Directories to fix
const directories = [
  'src/app/cost/gold-coast-fire-damage',
  'src/app/cost/gold-coast-flood-restoration',
  'src/app/cost/gold-coast-mould-removal',
  'src/app/cost/gold-coast-storm-damage',
  'src/app/cost/gold-coast-water-damage',
  'src/app/cost/sunshine-coast-fire-damage',
  'src/app/cost/sunshine-coast-flood-restoration',
  'src/app/cost/sunshine-coast-mould-removal',
  'src/app/cost/sunshine-coast-storm-damage',
  'src/app/cost/sunshine-coast-water-damage',
];

directories.forEach(dir => {
  const filePath = path.join(__dirname, '..', dir, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix function names - remove spaces and capitalize properly
    content = content.replace(/export default function Gold Coast(\w+)/g, (match, rest) => {
      return `export default function GoldCoast${rest}`;
    });
    
    content = content.replace(/export default function Sunshine Coast(\w+)/g, (match, rest) => {
      return `export default function SunshineCoast${rest}`;
    });
    
    // Also fix in the content
    content = content.replace(/Gold Coast/g, 'Gold Coast');
    content = content.replace(/Sunshine Coast/g, 'Sunshine Coast');
    
    // But keep function names without spaces
    content = content.replace(/function Gold Coastfire/g, 'function GoldCoastFire');
    content = content.replace(/function Gold Coastflood/g, 'function GoldCoastFlood');
    content = content.replace(/function Gold Coastmould/g, 'function GoldCoastMould');
    content = content.replace(/function Gold Coaststorm/g, 'function GoldCoastStorm');
    content = content.replace(/function Gold Coastwater/g, 'function GoldCoastWater');
    
    content = content.replace(/function Sunshine Coastfire/g, 'function SunshineCoastFire');
    content = content.replace(/function Sunshine Coastflood/g, 'function SunshineCoastFlood');
    content = content.replace(/function Sunshine Coastmould/g, 'function SunshineCoastMould');
    content = content.replace(/function Sunshine Coaststorm/g, 'function SunshineCoastStorm');
    content = content.replace(/function Sunshine Coastwater/g, 'function SunshineCoastWater');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${dir}`);
  }
});

console.log('Function names fixed!');