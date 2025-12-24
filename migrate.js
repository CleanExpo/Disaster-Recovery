const { execSync } = require('child_process');

try {
  console.log('Running prisma db push...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
  console.log('Migration successful!');
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}
