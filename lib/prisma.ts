import { PrismaClient } from '@prisma/client';
import { mockPrisma } from './prisma-mock';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  useMock: boolean | undefined;
};

// Check if we should use mock (Windows + Docker issue)
const USE_MOCK = process.env.USE_MOCK_DB === 'true' || false;

let prismaInstance: any;

if (USE_MOCK) {
  console.log('Using mock Prisma client (database connection issue)');
  prismaInstance = mockPrisma;
} else {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
  }
}

export const prisma = prismaInstance;

export default prisma;
