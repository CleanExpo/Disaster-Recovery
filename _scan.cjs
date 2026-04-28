const fs = require('fs');
const path = require('path');
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'route.ts') out.push(p);
  }
  return out;
}
const files = walk('app/api');
const results = [];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const methods = [];
  for (const m of ['POST', 'PUT', 'PATCH', 'DELETE', 'GET']) {
    const re1 = new RegExp(`export\\s+(async\\s+)?function\\s+${m}\\b`);
    const re2 = new RegExp(`export\\s+const\\s+${m}\\b`);
    if (re1.test(c) || re2.test(c)) methods.push(m);
  }
  const muts = methods.filter((m) => m !== 'GET');
  if (muts.length === 0) continue;
  const hasCapture = /captureException/.test(c);
  const hasCompliance = /logComplianceEvent/.test(c);
  results.push({ f, muts, hasCapture, hasCompliance });
}
const missing = results.filter((r) => !r.hasCapture || !r.hasCompliance);
console.log('Total mutation routes:', results.length);
console.log('Missing one or both:', missing.length);
for (const r of missing) {
  console.log(
    r.muts.join(',').padEnd(18),
    (r.hasCapture ? 'C' : '-') + (r.hasCompliance ? 'L' : '-'),
    r.f.replace(/\\/g, '/'),
  );
}
