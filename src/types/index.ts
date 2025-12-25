export type UserRole = 'USER' | 'ADMIN' | 'CONTRACTOR' | 'SUPER_ADMIN';

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

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'DISPUTED'
  | 'CANCELLED';

export type PaymentMethod = 'CARD' | 'BANK_TRANSFER' | 'CHECK' | 'CASH' | 'INSURANCE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  twoFactorEnabled: boolean;
}

export interface Contractor extends User {
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

export interface Client extends User {
  clientId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'SMS';
  emergencyContact: string | null;
}

export interface Booking {
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
}

export interface Payment {
  id: string;
  bookingId: string;
  clientId: string;
  contractorId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId: string | null;
  stripeChargeId: string | null;
  description: string;
  processingFee: number;
  platformFee: number;
  netAmount: number;
  refundedAmount: number;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
