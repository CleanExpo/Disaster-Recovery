export default async function globalSetup() {
  // Set up test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

  console.log('\n[Global Setup] Test environment initialized');
  console.log('[Global Setup] Test database URL:', process.env.DATABASE_URL);

  // Any global test setup tasks can go here
  // For example: seed test database, start test containers, etc.
}
