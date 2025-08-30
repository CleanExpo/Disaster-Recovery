export interface JobEstimate {
  id: string;
  jobId: string;
  claimNumber?: string;
  estimateNumber: string;
  version: number;
  status: EstimateStatus;
  type: EstimateType;
  assessment: SiteAssessment;
  lineItems: EstimateLineItem[];
  calculations: EstimateCalculations;
  totals: EstimateTotals;
  comparisons: PriceComparison[];
  scope: ScopeOfWork;
  approvals: EstimateApproval[];
  metadata: EstimateMetadata;
  createdAt: string;
  updatedAt: string;
  validUntil: string;
}

export type EstimateStatus = 
  | 'draft'
  | 'pending_review'
  | 'sent_to_client'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'revised'
  | 'superseded';

export type EstimateType = 
  | 'initial'
  | 'revised'
  | 'supplemental'
  | 'emergency'
  | 'final';

export interface SiteAssessment {
  id: string;
  assessmentDate: string;
  technician: TechnicianInfo;
  propertyDetails: PropertyDetails;
  damageAssessment: DamageAssessment;
  environmentalReadings: EnvironmentalReading[];
  photos: AssessmentPhoto[];
  notes: string;
  completedAt: string;
}

export interface TechnicianInfo {
  id: string;
  name: string;
  certifications: string[];
  contactNumber?: string;
}

export interface PropertyDetails {
  address: string;
  propertyType: 'residential' | 'commercial' | 'industrial';
  yearBuilt?: number;
  constructionType?: string;
  totalArea?: number; // in sqm
  affectedArea: number; // in sqm
  rooms: RoomDetail[];
}

export interface RoomDetail {
  id: string;
  name: string;
  type: RoomType;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  area: number; // in sqm
  affectedPercentage: number;
  materials: MaterialType[];
  damageLevel: DamageLevel;
  equipment: RequiredEquipment[];
}

export type RoomType = 
  | 'bedroom'
  | 'bathroom'
  | 'kitchen'
  | 'living_room'
  | 'dining_room'
  | 'garage'
  | 'basement'
  | 'attic'
  | 'hallway'
  | 'office'
  | 'other';

export type MaterialType = 
  | 'carpet'
  | 'hardwood'
  | 'tile'
  | 'vinyl'
  | 'concrete'
  | 'drywall'
  | 'plaster'
  | 'insulation'
  | 'other';

export type DamageLevel = 
  | 'minimal'
  | 'moderate'
  | 'significant'
  | 'severe'
  | 'total_loss';

export interface RequiredEquipment {
  type: string;
  quantity: number;
  duration: number; // in days
  purpose: string;
}

export interface DamageAssessment {
  primaryCause: DamageCause;
  secondaryCauses?: DamageCause[];
  category: number; // 1, 2, or 3 per IICRC
  class: number; // 1, 2, 3, or 4 per IICRC
  hazardLevel: HazardLevel;
  contaminants?: string[];
  specialRequirements?: string[];
}

export type DamageCause = 
  | 'water_damage'
  | 'fire_damage'
  | 'smoke_damage'
  | 'storm_damage'
  | 'mould'
  | 'sewage'
  | 'biohazard'
  | 'vandalism'
  | 'other';

export type HazardLevel = 
  | 'none'
  | 'low'
  | 'medium'
  | 'high'
  | 'extreme';

export interface EnvironmentalReading {
  type: ReadingType;
  location: string;
  value: number;
  unit: string;
  timestamp: string;
  equipment: string;
}

export type ReadingType = 
  | 'moisture'
  | 'temperature'
  | 'humidity'
  | 'air_quality'
  | 'mold_spores'
  | 'voc';

export interface AssessmentPhoto {
  id: string;
  url: string;
  caption: string;
  location: string;
  timestamp: string;
  tags: string[];
}

export interface EstimateLineItem {
  id: string;
  category: LineItemCategory;
  subcategory?: string;
  itemCode?: string; // IICRC or industry code
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  source: PriceSource;
  priceComparison: {
    nrpGuideline?: number;
    contractorRate?: number;
    industryAverage?: number;
    variance?: number; // percentage from guideline
  };
  taxable: boolean;
  notes?: string;
  standard?: StandardReference;
}

export type LineItemCategory = 
  | 'emergency_services'
  | 'labour'
  | 'equipment'
  | 'materials'
  | 'disposal'
  | 'cleaning'
  | 'restoration'
  | 'reconstruction'
  | 'testing'
  | 'administration';

export type PriceSource = 
  | 'nrp_guideline'
  | 'contractor_rate'
  | 'industry_average'
  | 'custom'
  | 'negotiated';

export interface StandardReference {
  standard: 'IICRC' | 'AS/NZS' | 'Industry';
  code: string;
  description: string;
  methodology?: string;
}

export interface EstimateCalculations {
  method: CalculationMethod;
  parameters: CalculationParameter[];
  formulas: Formula[];
  assumptions: string[];
  contingency: {
    percentage: number;
    amount: number;
    justification: string;
  };
}

export type CalculationMethod = 
  | 'iicrc_standard'
  | 'xactimate'
  | 'contractor_custom'
  | 'industry_average';

export interface CalculationParameter {
  name: string;
  value: number;
  unit: string;
  source: string;
}

export interface Formula {
  name: string;
  expression: string;
  result: number;
  unit: string;
}

export interface EstimateTotals {
  subtotal: number;
  equipmentTotal: number;
  labourTotal: number;
  materialsTotal: number;
  contingency: number;
  discount?: number;
  taxableAmount: number;
  gst: number;
  total: number;
  deposit?: number;
  balanceDue: number;
}

export interface PriceComparison {
  category: string;
  nrpTotal: number;
  contractorTotal: number;
  industryAverage: number;
  selectedPrice: number;
  variance: number; // percentage
  justification?: string;
}

export interface ScopeOfWork {
  id: string;
  summary: string;
  phases: WorkPhase[];
  exclusions: string[];
  assumptions: string[];
  timeline: ProjectTimeline;
  deliverables: string[];
  qualityStandards: string[];
  safetyRequirements: string[];
  attachments: ScopeAttachment[];
}

export interface WorkPhase {
  phase: number;
  name: string;
  description: string;
  tasks: string[];
  duration: number; // in days
  dependencies?: number[]; // phase numbers
  milestones: string[];
}

export interface ProjectTimeline {
  startDate?: string;
  estimatedDuration: number; // in days
  phases: PhaseTimeline[];
  criticalDates: CriticalDate[];
}

export interface PhaseTimeline {
  phase: number;
  startDay: number;
  endDay: number;
  description: string;
}

export interface CriticalDate {
  date: string;
  description: string;
  type: 'milestone' | 'deadline' | 'inspection' | 'delivery';
}

export interface ScopeAttachment {
  id: string;
  type: AttachmentType;
  name: string;
  url: string;
  description?: string;
}

export type AttachmentType = 
  | 'floor_plan'
  | 'equipment_list'
  | 'material_specs'
  | 'photos'
  | 'report'
  | 'certificate';

export interface EstimateApproval {
  id: string;
  type: ApprovalType;
  status: ApprovalStatus;
  approverName: string;
  approverEmail: string;
  approverRole: string;
  comments?: string;
  conditions?: string[];
  signature?: DigitalSignature;
  approvedAt?: string;
  ipAddress?: string;
  documentVersion: number;
}

export type ApprovalType = 
  | 'client'
  | 'insurance'
  | 'contractor'
  | 'admin'
  | 'technical';

export type ApprovalStatus = 
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'conditional'
  | 'expired';

export interface DigitalSignature {
  signatureData: string; // base64 or URL
  signedAt: string;
  verificationCode: string;
  legally_binding: boolean;
  consent: LegalConsent;
}

export interface LegalConsent {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  scopeAcknowledged: boolean;
  estimateDisclaimer: boolean;
  variationClause: boolean;
  consumerRights: boolean;
  timestamp: string;
}

export interface EstimateMetadata {
  createdBy: string;
  lastModifiedBy: string;
  revisionHistory: RevisionEntry[];
  tags: string[];
  customFields?: Record<string, any>;
  compliance: ComplianceInfo;
  disclaimer: EstimateDisclaimer;
}

export interface RevisionEntry {
  version: number;
  date: string;
  author: string;
  changes: string[];
  reason: string;
}

export interface ComplianceInfo {
  australianConsumerLaw: boolean;
  fairTrading: boolean;
  buildingCodes: string[];
  insuranceRequirements: string[];
  environmentalStandards: string[];
}

export interface EstimateDisclaimer {
  text: string;
  sections: DisclaimerSection[];
  lastUpdated: string;
  legalReview: boolean;
}

export interface DisclaimerSection {
  title: string;
  content: string;
  emphasis: 'standard' | 'bold' | 'highlighted';
  required: boolean;
}

export interface EstimateTemplate {
  id: string;
  name: string;
  category: DamageCause;
  description: string;
  lineItems: TemplateLineItem[];
  calculations: EstimateCalculations;
  scope: ScopeTemplate;
  isActive: boolean;
  usageCount: number;
  lastUsed?: string;
}

export interface TemplateLineItem {
  category: LineItemCategory;
  description: string;
  unit: string;
  defaultQuantity?: number;
  priceFormula?: string;
  notes?: string;
}

export interface ScopeTemplate {
  phases: WorkPhase[];
  standardTasks: string[];
  standardExclusions: string[];
  typicalDuration: number;
}

export interface EstimateValidation {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  recommendations: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  severity: 'critical' | 'high' | 'medium';
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface EstimateDelivery {
  id: string;
  estimateId: string;
  method: DeliveryMethod;
  recipient: RecipientInfo;
  sentAt: string;
  openedAt?: string;
  downloadedAt?: string;
  status: DeliveryStatus;
  tracking?: DeliveryTracking;
}

export type DeliveryMethod = 
  | 'email'
  | 'sms'
  | 'portal'
  | 'app_notification'
  | 'print';

export interface RecipientInfo {
  name: string;
  email?: string;
  phone?: string;
  role: 'client' | 'insurance' | 'adjuster' | 'contractor';
}

export type DeliveryStatus = 
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'bounced'
  | 'failed';

export interface DeliveryTracking {
  emailId?: string;
  opens: number;
  downloads: number;
  lastActivity?: string;
}