import prisma from '@/lib/prisma';

export { prisma };

// Helper functions for common database operations
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
  role?: string;
}) {
  return prisma.user.create({
    data: {
      ...data,
      email: data.email.toLowerCase(),
    },
  });
}

export async function updateUser(id: string, data: Partial<{
  name: string;
  email: string;
  image: string;
  phone: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
}>) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

// Booking operations
export async function findBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      client: true,
      contractor: true,
      payments: true,
    },
  });
}

export async function createBooking(data: {
  clientId: string;
  serviceType: string;
  emergencyLevel: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  estimatedCost: number;
}) {
  return prisma.booking.create({
    data: {
      ...data,
      status: 'PENDING',
    },
  });
}

export async function updateBookingStatus(id: string, status: string) {
  return prisma.booking.update({
    where: { id },
    data: { status },
  });
}

// Payment operations
export async function createPayment(data: {
  bookingId: string;
  clientId: string;
  contractorId: string;
  amount: number;
  paymentMethod: string;
}) {
  const processingFee = data.amount * 0.029 + 0.30;
  const platformFee = data.amount * 0.05;

  return prisma.payment.create({
    data: {
      ...data,
      status: 'PENDING',
      currency: 'usd',
      processingFee,
      platformFee,
      netAmount: data.amount - processingFee - platformFee,
      refundedAmount: 0,
    },
  });
}

export async function updatePaymentStatus(id: string, status: string, additionalData?: {
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  paidAt?: Date;
}) {
  return prisma.payment.update({
    where: { id },
    data: {
      status,
      ...additionalData,
    },
  });
}

// Transaction helper
export async function runTransaction<T>(
  fn: (tx: typeof prisma) => Promise<T>
): Promise<T> {
  return prisma.$transaction(fn as any);
}

export default prisma;
