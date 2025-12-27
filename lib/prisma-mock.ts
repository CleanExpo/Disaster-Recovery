/**
 * Mock Prisma Client for Development Testing
 * Used when Prisma cannot connect to database (Windows + Docker issue)
 */

// Mock users data
// Password for all users: Password123!
// Bcrypt hash: $2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa
const mockUsers = [
  {
    id: 'admin-001',
    email: 'admin@disasterrecovery.com',
    name: 'Admin User',
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
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
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
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
    password: '$2b$10$vj.69aoumomIsfI1AgeUL.dasrChboZzyDd6sxmIHw7ojxJ.WkOKa', // Password123!
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
