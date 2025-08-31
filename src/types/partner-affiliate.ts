// Partner & Affiliate Management Types

export interface Partner {
  id: string;
  companyName: string;
  tradingName?: string;
  abn: string;
  acn?: string;
  email: string;
  
  website?: string;
  logo?: string;
  description: string;
  category: PartnerCategory;
  tier: PartnerTier;
  status: PartnerStatus;
  joinedDate: Date;
  agreementSigned: Date;
  agreementVersion: string;
  primaryContact: PartnerContact;
  additionalContacts?: PartnerContact[];
  address: Address;
  bankingDetails?: BankingDetails;
  commissionStructure: CommissionStructure;
  performance: PartnerPerformance;
  marketplace: MarketplaceListing;
  sponsorships: Sponsorship[];
  compliance: PartnerCompliance;
  settings: PartnerSettings;
}

export type PartnerCategory = 
  | 'equipment_supplier'
  | 'insurance_provider'
  | 'legal_services'
  | 'training_provider'
  | 'software_vendor'
  | 'financial_services'
  | 'marketing_agency'
  | 'consulting'
  | 'logistics'
  | 'other';

export type PartnerTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export type PartnerStatus = 
  | 'pending_approval'
  | 'active'
  | 'suspended'
  | 'terminated'
  | 'on_hold';

export interface PartnerContact {
  id: string;
  name: string;
  role: string;
  email: string;
  
  mobile?: string;
  isPrimary: boolean;
  notifications: {
    commission: boolean;
    performance: boolean;
    campaigns: boolean;
    system: boolean;
  };
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface BankingDetails {
  accountName: string;
  bsb: string;
  accountNumber: string;
  bankName: string;
  swiftCode?: string;
  paymentMethod: 'eft' | 'paypal' | 'stripe' | 'check';
  taxId?: string;
  preferredCurrency: string;
}

// Commission & Revenue Tracking
export interface CommissionStructure {
  type: 'percentage' | 'fixed' | 'tiered' | 'hybrid';
  baseRate: number;
  tiers?: CommissionTier[];
  bonuses?: CommissionBonus[];
  minimumPayout: number;
  payoutFrequency: 'weekly' | 'fortnightly' | 'monthly' | 'quarterly';
  nextPayoutDate: Date;
  autoApprove: boolean;
  terms: string;
}

export interface CommissionTier {
  id: string;
  name: string;
  threshold: number; // Revenue or count threshold
  rate: number;
  type: 'revenue' | 'count' | 'both';
}

export interface CommissionBonus {
  id: string;
  name: string;
  type: 'performance' | 'seasonal' | 'promotional';
  amount: number;
  isPercentage: boolean;
  conditions: string;
  validFrom: Date;
  validTo: Date;
  applied: boolean;
}

export interface Commission {
  id: string;
  partnerId: string;
  period: {
    start: Date;
    end: Date;
  };
  status: 'pending' | 'approved' | 'paid' | 'disputed' | 'cancelled';
  revenue: {
    gross: number;
    net: number;
    refunds: number;
    adjustments: number;
  };
  commission: {
    base: number;
    bonuses: number;
    deductions: number;
    total: number;
  };
  transactions: AffiliateTransaction[];
  invoice?: Invoice;
  paidDate?: Date;
  paymentReference?: string;
  notes?: string;
}

export interface AffiliateTransaction {
  id: string;
  date: Date;
  type: 'lead' | 'sale' | 'click' | 'signup' | 'renewal';
  description: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  amount: number;
  commission: number;
  status: 'pending' | 'approved' | 'rejected';
  trackingCode?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  pdfUrl?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxable: boolean;
}

// Performance Tracking
export interface PartnerPerformance {
  lifetime: PerformanceMetrics;
  currentPeriod: PerformanceMetrics;
  lastPeriod: PerformanceMetrics;
  trends: {
    revenue: number; // percentage change
    conversions: number;
    leads: number;
    clicks: number;
  };
  ranking: {
    overall: number;
    category: number;
    tier: number;
  };
  achievements: Achievement[];
}

export interface PerformanceMetrics {
  revenue: number;
  leads: number;
  conversions: number;
  clicks: number;
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  churnRate?: number;
  satisfactionScore?: number;
}

export interface Achievement {
  id: string;
  type: 'milestone' | 'performance' | 'quality' | 'loyalty';
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  reward?: string;
}

// Marketplace & Promotion
export interface MarketplaceListing {
  id: string;
  enabled: boolean;
  visibility: 'public' | 'private' | 'network_only';
  featured: boolean;
  featuredUntil?: Date;
  priority: number; // 1-100, higher = better placement
  categories: string[];
  tags: string[];
  services: ServiceOffering[];
  promotions: PartnerPromotion[];
  reviews: {
    count: number;
    average: number;
    recent: Review[];
  };
  analytics: ListingAnalytics;
}

export interface ServiceOffering {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: {
    type: 'fixed' | 'hourly' | 'quote' | 'subscription';
    amount?: number;
    currency: string;
    billingPeriod?: string;
  };
  availability: string[];
  deliveryTime?: string;
  images?: string[];
  documents?: string[];
  active: boolean;
}

export interface PartnerPromotion {
  id: string;
  name: string;
  type: 'discount' | 'bundle' | 'trial' | 'exclusive';
  code?: string;
  description: string;
  terms: string;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usageCount: number;
  targetAudience: 'all' | 'new' | 'existing' | 'tier_specific';
  eligibleTiers?: PartnerTier[];
  performance: {
    views: number;
    clicks: number;
    redemptions: number;
    revenue: number;
  };
  active: boolean;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  response?: {
    comment: string;
    date: Date;
  };
}

export interface ListingAnalytics {
  views: number;
  clicks: number;
  inquiries: number;
  conversions: number;
  conversionRate: number;
  averageTimeOnPage: number;
  bounceRate: number;
  topReferrers: string[];
  popularServices: string[];
}

// Event Sponsorship
export interface Sponsorship {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: Date;
  package: SponsorshipPackage;
  amount: number;
  benefits: SponsorshipBenefit[];
  deliverables: SponsorshipDeliverable[];
  roi: {
    leads: number;
    conversions: number;
    revenue: number;
    brandImpressions: number;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export type SponsorshipPackage = 
  | 'title'
  | 'platinum'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'exhibitor';

export interface SponsorshipBenefit {
  id: string;
  type: 'logo' | 'booth' | 'speaking' | 'materials' | 'digital' | 'networking';
  description: string;
  specifications?: string;
  delivered: boolean;
}

export interface SponsorshipDeliverable {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  files?: string[];
  notes?: string;
}

// Compliance & Quality
export interface PartnerCompliance {
  agreementSigned: boolean;
  agreementVersion: string;
  termsAccepted: Date;
  insuranceValid: boolean;
  insuranceExpiry?: Date;
  licensesValid: boolean;
  licenses?: License[];
  qualityScore: number;
  complaints: number;
  disputes: number;
  lastAudit?: Date;
  nextAudit?: Date;
}

export interface License {
  id: string;
  type: string;
  number: string;
  issuer: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'valid' | 'expiring' | 'expired';
  documentUrl?: string;
}

// Settings & Preferences
export interface PartnerSettings {
  notifications: {
    email: NotificationPreferences;
    sms: NotificationPreferences;
    inApp: NotificationPreferences;
  };
  api: {
    enabled: boolean;
    key?: string;
    secret?: string;
    webhookUrl?: string;
    ipWhitelist?: string[];
  };
  branding: {
    primaryColor?: string;
    logo?: string;
    customDomain?: string;
    whitelabel: boolean;
  };
  automation: {
    autoApproveLeads: boolean;
    autoInvoice: boolean;
    autoReport: boolean;
    reportFrequency?: 'daily' | 'weekly' | 'monthly';
  };
}

export interface NotificationPreferences {
  enabled: boolean;
  commission: boolean;
  performance: boolean;
  campaigns: boolean;
  events: boolean;
  system: boolean;
  digest: boolean;
  digestFrequency?: 'daily' | 'weekly';
}

// Campaign Management
export interface AffiliateCampaign {
  id: string;
  name: string;
  description: string;
  type: 'product_launch' | 'seasonal' | 'referral' | 'retention' | 'acquisition';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date;
  budget?: number;
  spent: number;
  targetPartners: string[];
  targetTiers?: PartnerTier[];
  creatives: CampaignCreative[];
  trackingLinks: TrackingLink[];
  performance: CampaignPerformance;
  goals: CampaignGoal[];
}

export interface CampaignCreative {
  id: string;
  type: 'banner' | 'email' | 'social' | 'landing_page' | 'video';
  name: string;
  url: string;
  dimensions?: string;
  format?: string;
  language: string;
  approved: boolean;
}

export interface TrackingLink {
  id: string;
  partnerId: string;
  url: string;
  shortUrl?: string;
  qrCode?: string;
  clicks: number;
  conversions: number;
  revenue: number;
  active: boolean;
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
  cpc: number; // cost per click
  cpa: number; // cost per acquisition
  conversionRate: number;
}

export interface CampaignGoal {
  id: string;
  metric: 'revenue' | 'conversions' | 'clicks' | 'signups';
  target: number;
  achieved: number;
  percentage: number;
  deadline?: Date;
}

// Dashboard & Reporting
export interface PartnerDashboard {
  overview: {
    status: PartnerStatus;
    tier: PartnerTier;
    nextTierProgress: number;
    complianceScore: number;
  };
  earnings: {
    pending: number;
    approved: number;
    paid: number;
    lifetime: number;
    nextPayout: {
      amount: number;
      date: Date;
    };
  };
  performance: {
    period: 'today' | 'week' | 'month' | 'quarter' | 'year';
    metrics: PerformanceMetrics;
    charts: {
      revenue: ChartData[];
      conversions: ChartData[];
      traffic: ChartData[];
    };
  };
  activities: PartnerActivity[];
  announcements: Announcement[];
}

export interface ChartData {
  date: Date;
  value: number;
  label?: string;
}

export interface PartnerActivity {
  id: string;
  type: 'lead' | 'sale' | 'commission' | 'promotion' | 'event';
  description: string;
  date: Date;
  value?: number;
  status?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  date: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// Constants
export const PARTNER_TIERS = {
  bronze: {
    name: 'Bronze',
    minRevenue: 0,
    commissionBonus: 0,
    benefits: ['Basic listing', 'Monthly reports', 'Standard support']
  },
  silver: {
    name: 'Silver',
    minRevenue: 10000,
    commissionBonus: 5,
    benefits: ['Enhanced listing', 'Weekly reports', 'Priority support', 'Campaign access']
  },
  gold: {
    name: 'Gold',
    minRevenue: 50000,
    commissionBonus: 10,
    benefits: ['Featured listing', 'Daily reports', 'Dedicated support', 'Premium campaigns', 'Event invites']
  },
  platinum: {
    name: 'Platinum',
    minRevenue: 100000,
    commissionBonus: 15,
    benefits: ['Premium placement', 'Real-time reports', 'Account manager', 'Exclusive campaigns', 'VIP events', 'Co-branding']
  }
};

export const COMMISSION_RATES = {
  equipment_supplier: { base: 10, max: 20 },
  insurance_provider: { base: 15, max: 30 },
  legal_services: { base: 20, max: 35 },
  training_provider: { base: 25, max: 40 },
  software_vendor: { base: 30, max: 50 },
  financial_services: { base: 15, max: 25 },
  marketing_agency: { base: 20, max: 35 },
  consulting: { base: 25, max: 40 },
  logistics: { base: 10, max: 20 },
  other: { base: 15, max: 25 }
};

export const SPONSORSHIP_PACKAGES = {
  title: { amount: 50000, benefits: 20 },
  platinum: { amount: 25000, benefits: 15 },
  gold: { amount: 10000, benefits: 10 },
  silver: { amount: 5000, benefits: 7 },
  bronze: { amount: 2500, benefits: 5 },
  exhibitor: { amount: 1000, benefits: 3 }
};