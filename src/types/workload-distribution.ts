export interface Contractor {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  
  address: ContractorAddress;
  serviceArea: ServiceArea;
  availability: AvailabilityStatus;
  capacity: ContractorCapacity;
  kpiScore: KPIScore;
  leadStatistics: LeadStatistics;
  preferences: ContractorPreferences;
  status: ContractorStatus;
  certifications: string[];
  specializations: ServiceType[];
  metadata: ContractorMetadata;
}

export interface ContractorAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ServiceArea {
  id: string;
  contractorId: string;
  primaryRadius: number; // in miles
  maxRadius: number;
  centerPoint: Coordinates;
  coveragePolygon?: Coordinates[]; // Custom service area shape
  excludedZones?: ExcludedZone[];
  serviceTypes: ServiceType[];
  responseTime: {
    emergency: number; // in minutes
    standard: number;
  };
}

export interface ExcludedZone {
  id: string;
  name: string;
  polygon: Coordinates[];
  reason: string;
}

export type ServiceType = 
  | 'water_damage'
  | 'fire_damage'
  | 'mold_remediation'
  | 'storm_damage'
  | 'biohazard'
  | 'reconstruction'
  | 'emergency_response'
  | 'contents_restoration';

export type AvailabilityStatus = 
  | 'available'
  | 'busy'
  | 'at_capacity'
  | 'unavailable'
  | 'on_vacation'
  | 'suspended';

export interface ContractorCapacity {
  maxActiveJobs: number;
  currentActiveJobs: number;
  maxWeeklyJobs: number;
  currentWeeklyJobs: number;
  maxMonthlyJobs: number;
  currentMonthlyJobs: number;
  utilizationRate: number; // percentage
  teamSize: number;
  equipmentCapacity: number;
}

export interface KPIScore {
  overallScore: number; // 0-100
  responseTime: KPIMetric;
  completionTime: KPIMetric;
  customerSatisfaction: KPIMetric;
  reportQuality: KPIMetric;
  communicationScore: KPIMetric;
  complianceScore: KPIMetric;
  lastUpdated: string;
  trend: 'improving' | 'stable' | 'declining';
  bonusMultiplier: number; // e.g., 1.15 for 15% bonus
}

export interface KPIMetric {
  value: number;
  weight: number; // Weight in overall calculation
  benchmark: number;
  performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  trend: 'up' | 'stable' | 'down';
}

export interface LeadStatistics {
  totalLeadsReceived: number;
  totalLeadsAccepted: number;
  totalLeadsDeclined: number;
  acceptanceRate: number;
  averageResponseTime: number; // in minutes
  conversionRate: number;
  currentMonthLeads: number;
  lastLeadAssignedAt?: string;
  leadSharePercentage: number; // In overlap zones
  historicalData: LeadHistoryEntry[];
}

export interface LeadHistoryEntry {
  date: string;
  leadsAssigned: number;
  leadsAccepted: number;
  averageValue: number;
}

export interface ContractorPreferences {
  preferredJobTypes: ServiceType[];
  maxJobValue?: number;
  minJobValue?: number;
  preferredSchedule: {
    daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:MM
    endTime: string;
  };
  autoAcceptLeads: boolean;
  notificationChannels: NotificationChannel[];
}

export type NotificationChannel = 
  | 'email'
  | 'sms'
  | 'push'
  | 'email'
  | 'in_app';

export type ContractorStatus = 
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'probation'
  | 'terminated';

export interface ContractorMetadata {
  joinedDate: string;
  lastActiveDate: string;
  totalJobsCompleted: number;
  totalRevenue: number;
  averageJobValue: number;
  tags?: string[];
}

export interface Lead {
  id: string;
  claimNumber?: string;
  customerInfo: CustomerInfo;
  jobLocation: JobLocation;
  jobDetails: JobDetails;
  priority: LeadPriority;
  estimatedValue?: number;
  status: LeadStatus;
  assignmentInfo?: AssignmentInfo;
  timeline: LeadTimeline;
  requirements: JobRequirements;
  metadata: LeadMetadata;
}

export interface CustomerInfo {
  name: string;
  
  email?: string;
  preferredContact: 'email' | 'email' | 'text';
  insuranceCompany?: string;
  policyNumber?: string;
}

export interface JobLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: Coordinates;
  propertyType: PropertyType;
  accessInstructions?: string;
}

export type PropertyType = 
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'multi_family'
  | 'government';

export interface JobDetails {
  serviceType: ServiceType;
  description: string;
  damageDescription?: string;
  urgency: 'emergency' | 'urgent' | 'standard' | 'scheduled';
  estimatedDuration?: number; // in hours
  specialRequirements?: string[];
  photos?: string[];
}

export type LeadPriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

export type LeadStatus = 
  | 'new'
  | 'pending_assignment'
  | 'assigned'
  | 'accepted'
  | 'declined'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface AssignmentInfo {
  assignedTo?: string; // contractor ID
  assignedAt?: string;
  assignmentMethod: AssignmentMethod;
  assignmentReason: string;
  alternativeContractors: string[]; // Backup contractor IDs
  declinedBy: string[]; // Contractor IDs who declined
}

export type AssignmentMethod = 
  | 'round_robin'
  | 'kpi_based'
  | 'proximity_based'
  | 'weighted_random'
  | 'manual'
  | 'preferred_contractor';

export interface LeadTimeline {
  createdAt: string;
  firstAssignmentAt?: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  responseDeadline?: string;
  completionDeadline?: string;
}

export interface JobRequirements {
  certifications?: string[];
  equipment?: string[];
  teamSize?: number;
  specialSkills?: string[];
  languageRequirements?: string[];
}

export interface LeadMetadata {
  source: LeadSource;
  referralCode?: string;
  campaignId?: string;
  tags?: string[];
  notes?: string;
}

export type LeadSource = 
  | 'insurance_partner'
  | 'direct_customer'
  | 'referral'
  | 'website'
  | 'emergency_hotline'
  | 'partner_network';

export interface AllocationRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  enabled: boolean;
  conditions: AllocationCondition[];
  actions: AllocationAction[];
  schedule?: RuleSchedule;
  overrides?: RuleOverride[];
}

export interface AllocationCondition {
  type: ConditionType;
  operator: ComparisonOperator;
  value: any;
  weight?: number;
}

export type ConditionType = 
  | 'service_type'
  | 'job_value'
  | 'location_zone'
  | 'time_of_day'
  | 'contractor_capacity'
  | 'kpi_threshold'
  | 'customer_type';

export type ComparisonOperator = 
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'contains'
  | 'in_range';

export interface AllocationAction {
  type: ActionType;
  parameters: Record<string, any>;
}

export type ActionType = 
  | 'assign_to_contractor'
  | 'add_to_queue'
  | 'apply_bonus'
  | 'send_notification'
  | 'escalate';

export interface RuleSchedule {
  startDate: string;
  endDate?: string;
  daysOfWeek?: number[];
  timeRanges?: TimeRange[];
}

export interface TimeRange {
  startTime: string; // HH:MM
  endTime: string;
}

export interface RuleOverride {
  contractorId: string;
  reason: string;
  validUntil?: string;
}

export interface AllocationEvent {
  id: string;
  leadId: string;
  timestamp: string;
  eventType: AllocationEventType;
  allocatedTo?: string;
  allocationScore: AllocationScore;
  eligibleContractors: EligibleContractor[];
  decision: AllocationDecision;
  auditInfo: AuditInfo;
}

export type AllocationEventType = 
  | 'lead_created'
  | 'lead_assigned'
  | 'lead_accepted'
  | 'lead_declined'
  | 'lead_reassigned'
  | 'lead_expired'
  | 'manual_override';

export interface AllocationScore {
  contractorId: string;
  baseScore: number;
  kpiBonus: number;
  proximityBonus: number;
  loadBalancingAdjustment: number;
  finalScore: number;
  rank: number;
}

export interface EligibleContractor {
  contractorId: string;
  companyName: string;
  distance: number; // in miles
  drivingTime: number; // in minutes
  kpiScore: number;
  capacity: number;
  leadSharePercentage: number;
  score: AllocationScore;
  eligibilityReason: string;
}

export interface AllocationDecision {
  method: AssignmentMethod;
  winner: string; // contractor ID
  reasoning: string[];
  alternates: string[];
  constraints: string[];
}

export interface AuditInfo {
  performedBy: string;
  performedAt: string;
  ipAddress: string;
  userAgent: string;
  systemVersion: string;
}

export interface LoadBalancingConfig {
  enabled: boolean;
  maxLeadSharePercentage: number; // e.g., 40%
  evaluationPeriod: 'daily' | 'weekly' | 'monthly';
  rebalanceThreshold: number; // Percentage difference to trigger rebalancing
  saturationProtection: {
    enabled: boolean;
    maxCapacityUtilization: number; // e.g., 80%
    cooldownPeriod: number; // in minutes
  };
  fairnessWeight: number; // 0-1, weight of fairness vs performance
  performanceWeight: number; // 0-1
  proximityWeight: number; // 0-1
}

export interface ContractorPerformance {
  contractorId: string;
  period: PerformancePeriod;
  metrics: PerformanceMetrics;
  ranking: number;
  percentile: number;
  badges: PerformanceBadge[];
  improvements: string[];
  warnings: PerformanceWarning[];
}

export interface PerformancePeriod {
  startDate: string;
  endDate: string;
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
}

export interface PerformanceMetrics {
  jobsCompleted: number;
  averageResponseTime: number;
  averageCompletionTime: number;
  customerRating: number;
  reportQuality: number;
  revenueGenerated: number;
  profitability: number;
  complianceRate: number;
}

export interface PerformanceBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: BadgeCategory;
}

export type BadgeCategory = 
  | 'speed'
  | 'quality'
  | 'customer_service'
  | 'volume'
  | 'reliability'
  | 'expertise';

export interface PerformanceWarning {
  id: string;
  type: WarningType;
  message: string;
  severity: 'low' | 'medium' | 'high';
  issuedAt: string;
  acknowledgedAt?: string;
}

export type WarningType = 
  | 'low_acceptance_rate'
  | 'high_decline_rate'
  | 'slow_response'
  | 'capacity_issues'
  | 'quality_concerns'
  | 'compliance_violation';

export interface GeographicZone {
  id: string;
  name: string;
  polygon: Coordinates[];
  contractors: string[];
  statistics: ZoneStatistics;
  demandForecast: DemandForecast;
}

export interface ZoneStatistics {
  totalJobs: number;
  activeJobs: number;
  averageResponseTime: number;
  coverageRatio: number; // contractors per sq mile
  competitionLevel: 'low' | 'medium' | 'high';
}

export interface DemandForecast {
  period: string;
  expectedJobs: number;
  confidence: number;
  peakTimes: TimeRange[];
  seasonalFactors: string[];
}

export interface AllocationAnalytics {
  period: AnalyticsPeriod;
  totalLeads: number;
  allocationMethodBreakdown: MethodBreakdown[];
  contractorDistribution: ContractorDistribution[];
  fairnessScore: number;
  efficiencyScore: number;
  customerSatisfactionScore: number;
  recommendations: AnalyticsRecommendation[];
}

export interface AnalyticsPeriod {
  startDate: string;
  endDate: string;
  comparisonPeriod?: {
    startDate: string;
    endDate: string;
  };
}

export interface MethodBreakdown {
  method: AssignmentMethod;
  count: number;
  percentage: number;
  averageResponseTime: number;
  successRate: number;
}

export interface ContractorDistribution {
  contractorId: string;
  companyName: string;
  leadsAssigned: number;
  leadsAccepted: number;
  sharePercentage: number;
  deviationFromTarget: number;
}

export interface AnalyticsRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  expectedImprovement: string;
}

export type RecommendationType = 
  | 'adjust_weights'
  | 'expand_coverage'
  | 'recruit_contractors'
  | 'modify_rules'
  | 'training_needed'
  | 'system_optimization';