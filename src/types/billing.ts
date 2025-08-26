// Contractor Billing Types and Interfaces

export type SubscriptionPlan = 'basic' | 'professional' | 'enterprise';
export type BillingCycle = 'monthly' | 'quarterly' | 'annual';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled' | 'paused';

export interface PricingTier {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  basePrice: number;
  features: string[];
  maxJobs?: number;
  maxTeamMembers?: number;
  storageGB?: number;
  prioritySupport: boolean;
  apiAccess: boolean;
  customBranding: boolean;
}

export interface OnboardingDiscount {
  month: number;
  discountPercent: number;
  description: string;
}

export interface ContractorSubscription {
  id: string;
  contractorId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelledAt?: Date;
  pausedAt?: Date;
  onboardingMonth: number; // 1-3 for onboarding period, 4+ for regular
  nextBillingDate: Date;
  currentMonthlyPrice: number;
  regularMonthlyPrice: number;
}

export interface Invoice {
  id: string;
  contractorId: string;
  subscriptionId: string;
  invoiceNumber: string;
  status: PaymentStatus;
  amount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  dueDate: Date;
  paidAt?: Date;
  paymentMethod?: PaymentMethod;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountPercent?: number;
  discountAmount?: number;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'bank_account' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface BillingAddress {
  id: string;
  contractorId: string;
  businessName: string;
  abn?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UsageMetrics {
  jobsCompleted: number;
  jobsActive: number;
  storageUsedGB: number;
  teamMembersActive: number;
  apiCallsThisMonth: number;
}

// Pricing Configuration
export const PRICING_PLANS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    plan: 'basic',
    basePrice: 299,
    features: [
      'Up to 20 jobs per month',
      '2 team members',
      '10GB storage',
      'Basic reporting',
      'Email support',
      'Mobile app access'
    ],
    maxJobs: 20,
    maxTeamMembers: 2,
    storageGB: 10,
    prioritySupport: false,
    apiAccess: false,
    customBranding: false
  },
  {
    id: 'professional',
    name: 'Professional',
    plan: 'professional',
    basePrice: 599,
    features: [
      'Up to 100 jobs per month',
      '10 team members',
      '100GB storage',
      'Advanced reporting',
      'Priority support',
      'API access',
      'Custom branding',
      'Job scheduling',
      'Customer portal'
    ],
    maxJobs: 100,
    maxTeamMembers: 10,
    storageGB: 100,
    prioritySupport: true,
    apiAccess: true,
    customBranding: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    plan: 'enterprise',
    basePrice: 1499,
    features: [
      'Unlimited jobs',
      'Unlimited team members',
      '1TB storage',
      'Custom reporting',
      'Dedicated support',
      'Full API access',
      'White labeling',
      'Custom integrations',
      'Training included',
      'SLA guarantee'
    ],
    maxJobs: undefined,
    maxTeamMembers: undefined,
    storageGB: 1000,
    prioritySupport: true,
    apiAccess: true,
    customBranding: true
  }
];

// Onboarding Discount Schedule
export const ONBOARDING_DISCOUNTS: OnboardingDiscount[] = [
  {
    month: 1,
    discountPercent: 100,
    description: 'First month FREE'
  },
  {
    month: 2,
    discountPercent: 60,
    description: '60% off second month'
  },
  {
    month: 3,
    discountPercent: 50,
    description: '50% off third month'
  }
];

// Billing Cycle Discounts
export const BILLING_CYCLE_DISCOUNTS = {
  monthly: 0,
  quarterly: 5, // 5% discount
  annual: 15 // 15% discount
};

// Helper Functions
export const calculateOnboardingPrice = (
  basePrice: number,
  onboardingMonth: number
): number => {
  const discount = ONBOARDING_DISCOUNTS.find(d => d.month === onboardingMonth);
  if (!discount) return basePrice;
  
  const discountAmount = basePrice * (discount.discountPercent / 100);
  return basePrice - discountAmount;
};

export const calculateBillingCyclePrice = (
  monthlyPrice: number,
  billingCycle: BillingCycle
): number => {
  const discount = BILLING_CYCLE_DISCOUNTS[billingCycle];
  const discountAmount = monthlyPrice * (discount / 100);
  const finalMonthlyPrice = monthlyPrice - discountAmount;
  
  switch (billingCycle) {
    case 'monthly':
      return finalMonthlyPrice;
    case 'quarterly':
      return finalMonthlyPrice * 3;
    case 'annual':
      return finalMonthlyPrice * 12;
    default:
      return monthlyPrice;
  }
};

export const getNextBillingDate = (
  currentDate: Date,
  billingCycle: BillingCycle
): Date => {
  const nextDate = new Date(currentDate);
  
  switch (billingCycle) {
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'quarterly':
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
    case 'annual':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
  }
  
  return nextDate;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};