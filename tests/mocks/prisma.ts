import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

// Reset all mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export type PrismaMock = DeepMockProxy<PrismaClient>;

// Helper to mock Prisma query results
export function mockPrismaQuery<T>(
  modelName: keyof PrismaClient,
  operation: string,
  returnValue: T
): void {
  const model = prismaMock[modelName] as any;
  if (model && model[operation]) {
    model[operation].mockResolvedValue(returnValue);
  }
}

// Mock transaction
export function mockPrismaTransaction<T>(returnValue: T): void {
  prismaMock.$transaction.mockResolvedValue(returnValue as any);
}

// Mock raw query
export function mockPrismaRaw<T>(returnValue: T): void {
  prismaMock.$queryRaw.mockResolvedValue(returnValue as any);
}

// Re-export for convenience
export { mockDeep, mockReset };
