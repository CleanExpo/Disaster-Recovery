const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'claude-orchestrator.ps1');
let content = fs.readFileSync(filePath, 'utf8');

// Replace smart quotes with regular quotes
content = content.replace(/[""]/g, '"');
content = content.replace(/['']/g, "'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed smart quotes in claude-orchestrator.ps1');