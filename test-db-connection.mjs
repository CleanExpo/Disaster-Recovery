import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://admin:password@localhost:5432/disaster_recovery?schema=public'
    }
  }
});

try {
  await prisma.$connect();
  console.log('✅ Connected to database successfully');
  const result = await prisma.$queryRaw`SELECT version()`;
  console.log('✅ Query executed:', result);
  await prisma.$disconnect();
  console.log('✅ Disconnected successfully');
} catch (error) {
  console.error('❌ Connection failed:', error.message);
  process.exit(1);
}
