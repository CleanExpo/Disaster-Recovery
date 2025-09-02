export default async (): Promise<void> => {
  // Global setup for all tests
  console.log('Setting up test environment...');
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/nrp_crm_test';
  process.env.REDIS_URL = 'redis://localhost:6379/1';
  
  // Additional global setup can be added here
};