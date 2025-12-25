import { faker } from '@faker-js/faker';

export interface MockUser {
  id: string;
  email: string;
  name: string;
  password: string;
  hashedPassword: string;
  role: 'USER' | 'ADMIN' | 'CONTRACTOR' | 'SUPER_ADMIN';
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  twoFactorEnabled: boolean;
}

export interface MockContractor extends MockUser {
  contractorId: string;
  businessName: string;
  licenseNumber: string;
  insuranceExpiry: Date;
  serviceArea: string[];
  specialties: string[];
  rating: number;
  completedJobs: number;
  isVerified: boolean;
  stripeAccountId: string | null;
}

export interface MockClient extends MockUser {
  clientId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'SMS';
  emergencyContact: string | null;
}

export const createMockUser = (overrides: Partial<MockUser> = {}): MockUser => ({
  id: faker.string.uuid(),
  email: faker.internet.email().toLowerCase(),
  name: faker.person.fullName(),
  password: 'TestPassword123!',
  hashedPassword: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u', // bcrypt hash of 'TestPassword123!'
  role: 'USER',
  emailVerified: faker.date.past(),
  image: faker.image.avatar(),
  phone: faker.phone.number(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  isActive: true,
  twoFactorEnabled: false,
  ...overrides,
});

export const createMockAdmin = (overrides: Partial<MockUser> = {}): MockUser =>
  createMockUser({ role: 'ADMIN', ...overrides });

export const createMockSuperAdmin = (overrides: Partial<MockUser> = {}): MockUser =>
  createMockUser({ role: 'SUPER_ADMIN', twoFactorEnabled: true, ...overrides });

export const createMockContractor = (overrides: Partial<MockContractor> = {}): MockContractor => ({
  ...createMockUser({ role: 'CONTRACTOR' }),
  contractorId: faker.string.uuid(),
  businessName: faker.company.name(),
  licenseNumber: faker.string.alphanumeric(10).toUpperCase(),
  insuranceExpiry: faker.date.future(),
  serviceArea: [faker.location.zipCode(), faker.location.zipCode(), faker.location.zipCode()],
  specialties: ['Water Damage', 'Fire Restoration', 'Mold Remediation'],
  rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
  completedJobs: faker.number.int({ min: 0, max: 500 }),
  isVerified: true,
  stripeAccountId: `acct_${faker.string.alphanumeric(16)}`,
  ...overrides,
});

export const createMockClient = (overrides: Partial<MockClient> = {}): MockClient => ({
  ...createMockUser(),
  clientId: faker.string.uuid(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  zipCode: faker.location.zipCode(),
  preferredContactMethod: 'EMAIL',
  emergencyContact: faker.phone.number(),
  ...overrides,
});

export const createMockUsers = (count: number): MockUser[] =>
  Array.from({ length: count }, () => createMockUser());

export const createMockContractors = (count: number): MockContractor[] =>
  Array.from({ length: count }, () => createMockContractor());

export const createMockClients = (count: number): MockClient[] =>
  Array.from({ length: count }, () => createMockClient());
