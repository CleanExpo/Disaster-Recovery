import { faker } from '@faker-js/faker';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export type ServiceType =
  | 'WATER_DAMAGE'
  | 'FIRE_RESTORATION'
  | 'MOLD_REMEDIATION'
  | 'STORM_DAMAGE'
  | 'BIOHAZARD_CLEANUP'
  | 'SMOKE_DAMAGE'
  | 'VANDALISM_CLEANUP'
  | 'GENERAL_RESTORATION';

export type EmergencyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MockBooking {
  id: string;
  clientId: string;
  contractorId: string | null;
  serviceType: ServiceType;
  emergencyLevel: EmergencyLevel;
  status: BookingStatus;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  scheduledDate: Date | null;
  completedDate: Date | null;
  estimatedCost: number;
  finalCost: number | null;
  notes: string | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, any>;
}

export interface MockBookingAssignment {
  id: string;
  bookingId: string;
  contractorId: string;
  assignedAt: Date;
  acceptedAt: Date | null;
  declinedAt: Date | null;
  reason: string | null;
}

export const SERVICE_TYPES: ServiceType[] = [
  'WATER_DAMAGE',
  'FIRE_RESTORATION',
  'MOLD_REMEDIATION',
  'STORM_DAMAGE',
  'BIOHAZARD_CLEANUP',
  'SMOKE_DAMAGE',
  'VANDALISM_CLEANUP',
  'GENERAL_RESTORATION',
];

export const createMockBooking = (overrides: Partial<MockBooking> = {}): MockBooking => {
  const status = overrides.status || faker.helpers.arrayElement([
    'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED'
  ] as BookingStatus[]);

  return {
    id: faker.string.uuid(),
    clientId: faker.string.uuid(),
    contractorId: status !== 'PENDING' ? faker.string.uuid() : null,
    serviceType: faker.helpers.arrayElement(SERVICE_TYPES),
    emergencyLevel: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    status,
    description: faker.lorem.paragraph(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    scheduledDate: status !== 'PENDING' ? faker.date.future() : null,
    completedDate: status === 'COMPLETED' ? faker.date.recent() : null,
    estimatedCost: faker.number.float({ min: 500, max: 50000, fractionDigits: 2 }),
    finalCost: status === 'COMPLETED'
      ? faker.number.float({ min: 500, max: 50000, fractionDigits: 2 })
      : null,
    notes: faker.datatype.boolean() ? faker.lorem.sentences(2) : null,
    images: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      () => faker.image.url()
    ),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    metadata: {},
    ...overrides,
  };
};

export const createMockBookingAssignment = (
  overrides: Partial<MockBookingAssignment> = {}
): MockBookingAssignment => ({
  id: faker.string.uuid(),
  bookingId: faker.string.uuid(),
  contractorId: faker.string.uuid(),
  assignedAt: faker.date.recent(),
  acceptedAt: faker.datatype.boolean() ? faker.date.recent() : null,
  declinedAt: null,
  reason: null,
  ...overrides,
});

export const createMockEmergencyBooking = (
  overrides: Partial<MockBooking> = {}
): MockBooking =>
  createMockBooking({
    emergencyLevel: 'CRITICAL',
    status: 'PENDING',
    ...overrides,
  });

export const createMockCompletedBooking = (
  overrides: Partial<MockBooking> = {}
): MockBooking =>
  createMockBooking({
    status: 'COMPLETED',
    completedDate: faker.date.recent(),
    finalCost: faker.number.float({ min: 500, max: 50000, fractionDigits: 2 }),
    ...overrides,
  });

export const createMockBookings = (count: number): MockBooking[] =>
  Array.from({ length: count }, () => createMockBooking());
