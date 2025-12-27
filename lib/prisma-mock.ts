/**
 * Mock Prisma Client for Development Testing
 * Used when Prisma cannot connect to database (Windows + Docker issue)
 */

// Mock users data
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@disasterrecovery.com',
    name: 'Admin User',
    password: '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy', // Password123!
    userType: 'ADMIN',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  },
  {
    id: 'client-001',
    email: 'client@example.com',
    name: 'John Client',
    password: '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
    userType: 'CLIENT',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  },
  {
    id: 'contractor-001',
    email: 'contractor@example.com',
    name: 'Mike Contractor',
    password: '$2a$10$rKzMgJW.vYW0YhFG.jQs0uO5wJ3O0lX0x7U6wLa8qGzVz6M4qWKGy',
    userType: 'CONTRACTOR',
    isActive: true,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    googleId: null,
    avatar: null,
    tenantId: null
  }
];

export const mockPrisma = {
  user: {
    findUnique: async ({ where }: any) => {
      if (where.email) {
        return mockUsers.find(u => u.email === where.email) || null;
      }
      if (where.id) {
        return mockUsers.find(u => u.id === where.id) || null;
      }
      return null;
    },
    findMany: async () => mockUsers,
    create: async ({ data }: any) => ({
      id: `user-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }),
    update: async ({ where, data }: any) => {
      const user = mockUsers.find(u => u.id === where.id || u.email === where.email);
      return user ? { ...user, ...data, updatedAt: new Date() } : null;
    }
  },
  contractor: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async ({ data }: any) => data,
    update: async ({ data }: any) => data
  },
  serviceRequest: {
    findMany: async () => [],
    create: async ({ data }: any) => data
  },
  message: {
    findMany: async () => [],
    create: async ({ data }: any) => data
  },
  $disconnect: async () => {},
  $connect: async () => {}
};
