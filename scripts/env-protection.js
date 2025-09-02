const fs = require('fs');
const path = require('path');

const LOCK_FILE = path.resolve(__dirname, '../.env.lock');
const ENV_FILE = path.resolve(__dirname, '../.env');
const ALLOWED_KEYS = [
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SITE_URL',
  'NEXTAUTH_SECRET',
  'NEXT_PUBLIC_DEMO_MODE'
];

// Load lock file or create if missing
function loadLockFile() {
  if (!fs.existsSync(LOCK_FILE)) {
    console.log('.env.lock file missing, creating with current .env values');
    const envContent = fs.readFileSync(ENV_FILE, 'utf8');
    fs.writeFileSync(LOCK_FILE, envContent);
  }
  return fs.readFileSync(LOCK_FILE, 'utf8');
}

// Parse env content into key-value map
function parseEnv(content) {
  const lines = content.split(/\\r?\\n/);
  const map = {};
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const [key, ...rest] = line.split('=');
    map[key.trim()] = rest.join('=').trim();
  }
  return map;
}

// Validate .env against lock file
function validateEnv() {
  const lockContent = loadLockFile();
  const lockMap = parseEnv(lockContent);
  const envContent = fs.readFileSync(ENV_FILE, 'utf8');
  const envMap = parseEnv(envContent);

  for (const key of ALLOWED_KEYS) {
    if (envMap[key] !== lockMap[key]) {
      console.error(`ERROR: Unauthorized change detected for ${key}. Reverting to locked value.`);
      envMap[key] = lockMap[key];
    }
  }

  // Rewrite .env with locked values for allowed keys
  const newEnvLines = [];
  for (const [key, value] of Object.entries(envMap)) {
    newEnvLines.push(`${key}=${value}`);
  }
  fs.writeFileSync(ENV_FILE, newEnvLines.join('\\n'));
  console.log('.env validated and locked keys enforced.');
}

// Run validation on script execution
validateEnv();
