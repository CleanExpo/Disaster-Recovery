const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@127.0.0.1:5432/disaster_recovery'
    }
  },
  log: ['query', 'info', 'warn', 'error']
});

async function testConnection() {
  try {
    console.log('Testing Prisma connection...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Connection successful!', result);

    const users = await prisma.user.findMany();
    console.log(`✅ Found ${users.length} users`);
    users.forEach(u => console.log(`  - ${u.email}`));

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
