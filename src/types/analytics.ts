// Analytics and Reporting Types

export interface KPIMetrics {
  avgResponseTime: number; // in hours
  avgInspectionTime: number; // in hours
  avgReportCompletionTime: number; // in hours
  customerSatisfactionScore: number; // out of 5
  cleanClaimsCompliance: number; // percentage
  totalFines: number;
  totalBonuses: number;
  totalIncidents: number;
  performanceScore: number; // overall score out of 100
  trend: 'up' | 'down' | 'stable';
  periodComparison: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface ComplianceMetrics {
  certifications: {
    id: string;
    name: string;
    status: 'valid' | 'expiring' | 'expired';
    expiryDate: Date;
    daysUntilExpiry: number;
  }[];
  insurance: {
    type: string;
    provider: string;
    policyNumber: string;
    status: 'active' | 'expiring' | 'expired';
    expiryDate: Date;
    coverage: number;
  }[];
  ceuCredits: {
    earned: number;
    required: number;
    deadline: Date;
    onTrack: boolean;
  };
  overallComplianceScore: number;
  upcomingDeadlines: {
    item: string;
    type: 'certification' | 'insurance' | 'training' | 'audit';
    dueDate: Date;
    priority: 'high' | 'medium' | 'low';
  }[];
}

export interface FinancialMetrics {
  subscription: {
    tier: string;
    monthlyFee: number;
    status: 'active' | 'overdue' | 'cancelled';
    nextBillingDate: Date;
  };
  territoryFees: {
    total: number;
    territories: Array<{
      name: string;
      fee: number;
      status: 'paid' | 'pending' | 'overdue';
    }>;
  };
  revenue: {
    total: number;
    byMonth: Array<{
      month: string;
      amount: number;
    }>;
    byJobType: Array<{
      type: string;
      amount: number;
      count: number;
    }>;
  };
  expenses: {
    subscriptions: number;
    territories: number;
    fines: number;
    other: number;
    total: number;
  };
  outstandingBalance: number;
  bondAdjustments: Array<{
    date: Date;
    amount: number;
    reason: string;
    type: 'debit' | 'credit';
  }>;
}

export interface LeadAnalytics {
  volume: {
    total: number;
    byPeriod: Array<{
      period: string;
      count: number;
    }>;
    byGeography: Array<{
      region: string;
      count: number;
      percentage: number;
    }>;
    byJobType: Array<{
      type: string;
      count: number;
      value: number;
    }>;
  };
  conversion: {
    rate: number;
    leadToQuote: number;
    quoteToJob: number;
    avgTimeToConvert: number; // in days
    lostReasons: Array<{
      reason: string;
      count: number;
      percentage: number;
    }>;
  };
  coverage: {
    totalArea: number;
    coveredArea: number;
    coveragePercentage: number;
    gaps: Array<{
      region: string;
      demand: number;
      coverage: number;
      opportunity: number;
    }>;
    competitorAnalysis: Array<{
      region: string;
      competitors: number;
      marketShare: number;
    }>;
  };
  performance: {
    avgResponseTime: number;
    avgQuoteTime: number;
    winRate: number;
    customerRetention: number;
  };
}

export interface SystemAuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  category: 'user_management' | 'data_access' | 'compliance' | 'financial' | 'system';
  resourceType: string;
  resourceId?: string;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failure';
  metadata?: Record<string, any>;
}

export interface Report {
  id: string;
  name: string;
  type: 'kpi' | 'compliance' | 'financial' | 'leads' | 'audit' | 'custom';
  description?: string;
  createdBy: string;
  createdAt: Date;
  lastRunAt?: Date;
  schedule?: ReportSchedule;
  filters: ReportFilter[];
  columns: ReportColumn[];
  format: 'pdf' | 'csv' | 'xlsx';
  recipients?: string[];
  isPublic: boolean;
  permissions: string[];
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  time: string; // HH:MM format
  timezone: string;
  enabled: boolean;
  nextRunAt: Date;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: any;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'array';
}

export interface ReportColumn {
  field: string;
  label: string;
  dataType: 'string' | 'number' | 'date' | 'currency' | 'percentage' | 'boolean';
  width?: number;
  align?: 'left' | 'center' | 'right';
  format?: string;
  aggregate?: 'sum' | 'avg' | 'min' | 'max' | 'count';
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'gauge' | 'map';
  dataSource: string;
  refreshInterval?: number; // in seconds
  config: {
    chartType?: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'scatter';
    metrics?: string[];
    dimensions?: string[];
    filters?: ReportFilter[];
    colors?: string[];
    showLegend?: boolean;
    showGrid?: boolean;
  };
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  owner: string;
  widgets: DashboardWidget[];
  filters: ReportFilter[];
  refreshInterval?: number;
  isPublic: boolean;
  sharedWith: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricAlert {
  id: string;
  name: string;
  metric: string;
  condition: {
    operator: 'greater_than' | 'less_than' | 'equals' | 'change_by';
    value: number;
    threshold?: number;
  };
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  recipients: string[];
  channels: ('email' | 'sms' | 'in_app')[];
  enabled: boolean;
  lastTriggered?: Date;
  triggeredCount: number;
}

export interface AnalyticsDateRange {
  preset?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'last_quarter' | 'last_year' | 'custom';
  startDate: Date;
  endDate: Date;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }>;
}

export interface TableData {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
  }>;
  rows: Array<Record<string, any>>;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}