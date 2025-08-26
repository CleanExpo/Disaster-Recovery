export interface PriceGuideline {
  id: string;
  category: PriceCategory;
  subcategory?: string;
  itemName: string;
  unit: PriceUnit;
  priceRange: PriceRange;
  gstIncluded: boolean;
  notes?: string;
  validFrom: string;
  validTo?: string;
  lastUpdated: string;
  updatedBy: string;
}

export type PriceCategory = 
  | 'call_out'
  | 'labour'
  | 'equipment'
  | 'chemicals'
  | 'services'
  | 'administration'
  | 'custom';

export type PriceUnit = 
  | 'fixed'
  | 'per_hour'
  | 'per_day'
  | 'per_sqm'
  | 'per_cubic_meter'
  | 'per_litre'
  | 'per_room'
  | 'per_application'
  | 'per_claim'
  | 'per_visit';

export interface PriceRange {
  min: number;
  max: number;
  fixed?: number;
  normalHours?: { min: number; max: number };
  afterHours?: { min: number; max: number };
  withRemoteMonitoring?: { min: number; max: number };
  standard?: { min: number; max: number };
  firstUnit?: { min: number; max: number };
  additionalUnit?: { min: number; max: number };
}

export interface ContractorRate {
  id: string;
  contractorId: string;
  contractorName: string;
  guidelineId?: string;
  category: PriceCategory;
  itemName: string;
  customItem: boolean;
  unit: PriceUnit;
  price: number;
  normalHoursPrice?: number;
  afterHoursPrice?: number;
  notes?: string;
  validFrom: string;
  validTo?: string;
  status: RateStatus;
  validationResult?: ValidationResult;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type RateStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'flagged'
  | 'expired';

export interface ValidationResult {
  isValid: boolean;
  isWithinRange: boolean;
  percentageDeviation?: number;
  flags: ValidationFlag[];
  message?: string;
  requiresReview: boolean;
}

export interface ValidationFlag {
  type: FlagType;
  severity: 'info' | 'warning' | 'error';
  message: string;
  field?: string;
  value?: any;
}

export type FlagType = 
  | 'out_of_range'
  | 'new_item'
  | 'missing_guideline'
  | 'unusual_unit'
  | 'excessive_deviation'
  | 'duplicate_entry'
  | 'incomplete_data';

export interface BillingItem {
  id: string;
  jobId: string;
  category: PriceCategory;
  itemName: string;
  description?: string;
  quantity: number;
  unit: PriceUnit;
  unitPrice: number;
  totalPrice: number;
  gstAmount: number;
  contractorRateId?: string;
  guidelineId?: string;
  isApproved: boolean;
  approvalStatus: ApprovalStatus;
  notes?: string;
  addedAt: string;
  addedBy: string;
}

export type ApprovalStatus = 
  | 'auto_approved'
  | 'pending_review'
  | 'admin_approved'
  | 'admin_rejected'
  | 'client_approved'
  | 'client_disputed';

export interface Quote {
  id: string;
  jobId: string;
  clientId: string;
  contractorId: string;
  quoteNumber: string;
  status: QuoteStatus;
  items: BillingItem[];
  subtotal: number;
  gstTotal: number;
  total: number;
  callOutFee?: number;
  administrationFees?: AdministrationFee[];
  discounts?: Discount[];
  validUntil: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  notes?: string;
  termsAndConditions?: string;
}

export type QuoteStatus = 
  | 'draft'
  | 'pending_review'
  | 'sent_to_client'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'revised';

export interface AdministrationFee {
  type: 'claim_admin' | 'insurance_processing' | 'custom';
  description: string;
  amount: number;
  isClientVisible: boolean;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  description: string;
  value: number;
  amount: number;
}

export interface Invoice {
  id: string;
  quoteId?: string;
  jobId: string;
  clientId: string;
  contractorId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  items: BillingItem[];
  subtotal: number;
  gstTotal: number;
  total: number;
  paidAmount: number;
  outstandingAmount: number;
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  paymentTerms: string;
  paymentMethod?: PaymentMethod;
  attachments?: Attachment[];
}

export type InvoiceStatus = 
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'partially_paid'
  | 'paid'
  | 'overdue'
  | 'disputed'
  | 'cancelled';

export type PaymentMethod = 
  | 'bank_transfer'
  | 'credit_card'
  | 'insurance_direct'
  | 'cash'
  | 'cheque';

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: 'invoice' | 'receipt' | 'supporting_doc';
  uploadedAt: string;
}

export interface PriceUpload {
  id: string;
  contractorId: string;
  uploadedAt: string;
  uploadedBy: string;
  filename?: string;
  status: UploadStatus;
  totalItems: number;
  processedItems: number;
  approvedItems: number;
  rejectedItems: number;
  flaggedItems: number;
  errors?: UploadError[];
}

export type UploadStatus = 
  | 'processing'
  | 'completed'
  | 'failed'
  | 'partially_completed';

export interface UploadError {
  row?: number;
  field?: string;
  value?: any;
  error: string;
}

export interface LabourRate {
  role: TechnicianRole;
  normalHours: PriceRange;
  afterHours: PriceRange;
  specialConditions?: string[];
  certificationRequired?: string[];
}

export type TechnicianRole = 
  | 'lead_technician'
  | 'standard_technician'
  | 'specialized_technician'
  | 'assistant'
  | 'supervisor';

export interface EquipmentRate {
  equipmentType: string;
  category: EquipmentCategory;
  dailyRate?: PriceRange;
  hourlyRate?: PriceRange;
  withRemoteMonitoring?: PriceRange;
  standardRate?: PriceRange;
  minimumCharge?: number;
  maximumDaysPerWeek?: number;
  notes?: string;
}

export type EquipmentCategory = 
  | 'drying'
  | 'extraction'
  | 'air_filtration'
  | 'monitoring'
  | 'containment'
  | 'specialized';

export interface ServiceRate {
  serviceType: string;
  unit: PriceUnit;
  priceRange: PriceRange;
  includedMaterials?: string[];
  additionalCharges?: string[];
  minimumCharge?: number;
}

export interface ChemicalRate {
  chemicalType: string;
  purpose: string;
  unit: PriceUnit;
  priceRange: PriceRange;
  safetyRequirements?: string[];
  applicationMethod?: string;
}

export interface AdminReview {
  id: string;
  contractorRateId: string;
  contractorName: string;
  itemName: string;
  submittedPrice: number;
  guidelineRange?: PriceRange;
  deviation?: number;
  status: ReviewStatus;
  priority: ReviewPriority;
  assignedTo?: string;
  reviewNotes?: string;
  decision?: ReviewDecision;
  decidedAt?: string;
  decidedBy?: string;
}

export type ReviewStatus = 
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'request_info'
  | 'escalated';

export type ReviewPriority = 
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export interface ReviewDecision {
  action: 'approve' | 'reject' | 'modify' | 'add_guideline';
  reason: string;
  modifiedPrice?: number;
  newGuidelineRange?: PriceRange;
}

export interface PricingConfiguration {
  gstRate: number;
  normalHoursStart: string; // HH:MM
  normalHoursEnd: string;
  normalWorkdays: number[]; // 0-6 (Sunday-Saturday)
  afterHoursMultiplier: number;
  emergencyMultiplier: number;
  remoteMonitoringPremium: number;
  autoApprovalThreshold: number; // percentage deviation
  requireClientApprovalAbove: number; // dollar amount
}

export interface CostAnalytics {
  period: string;
  totalQuotes: number;
  totalInvoices: number;
  averageJobCost: number;
  averageLabourCost: number;
  averageEquipmentCost: number;
  averageMaterialsCost: number;
  mostCommonItems: ItemFrequency[];
  priceDeviations: DeviationAnalysis[];
  contractorComparisons: ContractorPricing[];
}

export interface ItemFrequency {
  itemName: string;
  category: PriceCategory;
  frequency: number;
  averagePrice: number;
  priceRange: { min: number; max: number };
}

export interface DeviationAnalysis {
  itemName: string;
  guidelinePrice: number;
  averageContractorPrice: number;
  deviation: number;
  outliers: OutlierData[];
}

export interface OutlierData {
  contractorId: string;
  price: number;
  deviation: number;
}

export interface ContractorPricing {
  contractorId: string;
  contractorName: string;
  totalItems: number;
  averageDeviation: number;
  withinRangePercentage: number;
  flaggedItems: number;
  averagePrices: {
    labour: number;
    equipment: number;
    materials: number;
  };
}

export interface ClientPriceView {
  categories: PriceCategory[];
  items: ClientPriceItem[];
  disclaimer: string;
  lastUpdated: string;
  notes: string[];
}

export interface ClientPriceItem {
  category: PriceCategory;
  subcategory?: string;
  name: string;
  description?: string;
  priceDisplay: string; // e.g., "$50-$70/hr" or "Fixed $550"
  unit: string;
  conditions?: string[];
  notes?: string;
}