// Test database connection
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('Attempting to connect to database...');
    console.log('Connection string:', process.env.DATABASE_URL);

    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    console.log('Connection successful!');
    console.log('Result:', result);
  } catch (error) {
    console.error('Connection failed:',  error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
