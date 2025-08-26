'use client';

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  FileText, 
  Shield,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  BarChart,
  Download,
  Filter,
  Search,
  Eye
} from 'lucide-react';
import { 
  AllocationEvent, 
  LoadBalancingConfig,
  Contractor,
  Lead,
  AllocationEventType,
  EligibleContractor
} from '@/types/workload-distribution';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: AllocationEventType;
  leadId: string;
  contractorId: string | null;
  contractorName: string;
  decision: string;
  score: number;
  eligibleCount: number;
  method: string;
  userId: string;
  ipAddress: string;
  duration: number;
  success: boolean;
  details: Record<string, any>;
}

interface LoadMetrics {
  contractorId: string;
  companyName: string;
  currentLoad: number;
  maxCapacity: number;
  utilizationRate: number;
  weeklyLeads: number;
  monthlyLeads: number;
  sharePercentage: number;
  targetShare: number;
  deviation: number;
  status: 'underutilized' | 'optimal' | 'near_capacity' | 'at_capacity';
}

interface SystemHealth {
  fairnessScore: number;
  efficiencyScore: number;
  responseTimeAvg: number;
  acceptanceRate: number;
  redistributionNeeded: boolean;
  alerts: HealthAlert[];
}

interface HealthAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  message: string;
  contractor?: string;
  timestamp: string;
  resolved: boolean;
}

const LoadBalancingAuditSystem: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loadMetrics, setLoadMetrics] = useState<LoadMetrics[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loadBalancingConfig, setLoadBalancingConfig] = useState<LoadBalancingConfig>({
    enabled: true,
    maxLeadSharePercentage: 40,
    evaluationPeriod: 'weekly',
    rebalanceThreshold: 15,
    saturationProtection: {
      enabled: true,
      maxCapacityUtilization: 80,
      cooldownPeriod: 30
    },
    fairnessWeight: 0.4,
    performanceWeight: 0.4,
    proximityWeight: 0.2
  });
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [filterType, setFilterType] = useState<AllocationEventType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);

  useEffect(() => {
    loadMockData();
    const interval = setInterval(() => {
      generateNewEvent();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMockData = () => {
    // Mock audit logs
    const mockLogs: AuditLogEntry[] = [
      {
        id: 'AL001',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        eventType: 'lead_assigned',
        leadId: 'L001',
        contractorId: 'C001',
        contractorName: 'Elite Restoration Co',
        decision: 'KPI-based allocation',
        score: 94,
        eligibleCount: 5,
        method: 'kpi_based',
        userId: 'system',
        ipAddress: '192.168.1.1',
        duration: 1250,
        success: true,
        details: {
          kpiScore: 94,
          distance: 3.2,
          capacity: 70,
          leadShare: 22
        }
      },
      {
        id: 'AL002',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        eventType: 'lead_declined',
        leadId: 'L002',
        contractorId: 'C002',
        contractorName: 'Rapid Response Team',
        decision: 'Contractor at capacity',
        score: 0,
        eligibleCount: 4,
        method: 'round_robin',
        userId: 'system',
        ipAddress: '192.168.1.1',
        duration: 890,
        success: false,
        details: {
          reason: 'At maximum capacity',
          currentJobs: 12,
          maxJobs: 12
        }
      },
      {
        id: 'AL003',
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        eventType: 'lead_reassigned',
        leadId: 'L003',
        contractorId: 'C003',
        contractorName: 'Premier Services',
        decision: 'Manual reassignment by admin',
        score: 88,
        eligibleCount: 3,
        method: 'manual',
        userId: 'admin_user',
        ipAddress: '192.168.1.100',
        duration: 2100,
        success: true,
        details: {
          previousContractor: 'C001',
          reason: 'Customer request'
        }
      }
    ];

    // Mock load metrics
    const mockMetrics: LoadMetrics[] = [
      {
        contractorId: 'C001',
        companyName: 'Elite Restoration Co',
        currentLoad: 8,
        maxCapacity: 15,
        utilizationRate: 53,
        weeklyLeads: 12,
        monthlyLeads: 48,
        sharePercentage: 28,
        targetShare: 25,
        deviation: 3,
        status: 'optimal'
      },
      {
        contractorId: 'C002',
        companyName: 'Rapid Response Team',
        currentLoad: 11,
        maxCapacity: 12,
        utilizationRate: 92,
        weeklyLeads: 15,
        monthlyLeads: 60,
        sharePercentage: 35,
        targetShare: 25,
        deviation: 10,
        status: 'near_capacity'
      },
      {
        contractorId: 'C003',
        companyName: 'Premier Services',
        currentLoad: 5,
        maxCapacity: 20,
        utilizationRate: 25,
        weeklyLeads: 8,
        monthlyLeads: 32,
        sharePercentage: 19,
        targetShare: 25,
        deviation: -6,
        status: 'underutilized'
      },
      {
        contractorId: 'C004',
        companyName: 'Quick Fix Solutions',
        currentLoad: 10,
        maxCapacity: 10,
        utilizationRate: 100,
        weeklyLeads: 10,
        monthlyLeads: 40,
        sharePercentage: 18,
        targetShare: 25,
        deviation: -7,
        status: 'at_capacity'
      }
    ];

    // Mock system health
    const mockHealth: SystemHealth = {
      fairnessScore: calculateFairnessScore(mockMetrics),
      efficiencyScore: 85,
      responseTimeAvg: 28,
      acceptanceRate: 82,
      redistributionNeeded: mockMetrics.some(m => Math.abs(m.deviation) > 10),
      alerts: [
        {
          id: 'HA001',
          severity: 'medium',
          type: 'capacity',
          message: 'Rapid Response Team approaching maximum capacity',
          contractor: 'C002',
          timestamp: new Date().toISOString(),
          resolved: false
        },
        {
          id: 'HA002',
          severity: 'low',
          type: 'fairness',
          message: 'Load distribution variance exceeds threshold',
          timestamp: new Date().toISOString(),
          resolved: false
        }
      ]
    };

    setAuditLogs(mockLogs);
    setLoadMetrics(mockMetrics);
    setSystemHealth(mockHealth);
  };

  const calculateFairnessScore = (metrics: LoadMetrics[]): number => {
    const shares = metrics.map(m => m.sharePercentage);
    const avgShare = shares.reduce((a, b) => a + b, 0) / shares.length;
    const variance = shares.reduce((sum, share) => sum + Math.pow(share - avgShare, 2), 0) / shares.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, Math.round(100 - (stdDev * 2)));
  };

  const generateNewEvent = () => {
    const eventTypes: AllocationEventType[] = ['lead_assigned', 'lead_accepted', 'lead_declined'];
    const contractors = ['Elite Restoration Co', 'Rapid Response Team', 'Premier Services', 'Quick Fix Solutions'];
    const methods = ['kpi_based', 'round_robin', 'proximity_based', 'weighted_random'];

    const newLog: AuditLogEntry = {
      id: `AL${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      leadId: `L${Math.floor(Math.random() * 1000)}`,
      contractorId: `C00${Math.floor(Math.random() * 4) + 1}`,
      contractorName: contractors[Math.floor(Math.random() * contractors.length)],
      decision: 'Automated allocation',
      score: Math.floor(Math.random() * 30) + 70,
      eligibleCount: Math.floor(Math.random() * 5) + 1,
      method: methods[Math.floor(Math.random() * methods.length)],
      userId: 'system',
      ipAddress: '192.168.1.1',
      duration: Math.floor(Math.random() * 2000) + 500,
      success: Math.random() > 0.2,
      details: {}
    };

    setAuditLogs(prev => [newLog, ...prev].slice(0, 100));
  };

  const triggerRebalance = () => {
    // Simulate rebalancing
    const rebalancedMetrics = loadMetrics.map(metric => ({
      ...metric,
      sharePercentage: metric.targetShare + (Math.random() - 0.5) * 5,
      deviation: (Math.random() - 0.5) * 5
    }));

    setLoadMetrics(rebalancedMetrics);
    setShowRebalanceModal(false);

    // Add rebalance event to audit log
    const rebalanceLog: AuditLogEntry = {
      id: `AL${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType: 'manual_override',
      leadId: 'REBALANCE',
      contractorId: null,
      contractorName: 'System',
      decision: 'Manual load rebalancing triggered',
      score: 0,
      eligibleCount: loadMetrics.length,
      method: 'manual',
      userId: 'admin',
      ipAddress: '192.168.1.100',
      duration: 3500,
      success: true,
      details: {
        previousFairness: systemHealth?.fairnessScore,
        contractorsAffected: loadMetrics.length
      }
    };

    setAuditLogs(prev => [rebalanceLog, ...prev]);
  };

  const exportAuditLogs = () => {
    const csv = [
      ['Timestamp', 'Event Type', 'Lead ID', 'Contractor', 'Method', 'Score', 'Success', 'Duration (ms)'].join(','),
      ...auditLogs.map(log => [
        log.timestamp,
        log.eventType,
        log.leadId,
        log.contractorName,
        log.method,
        log.score,
        log.success,
        log.duration
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'underutilized': return 'bg-blue-100 text-blue-800';
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'near_capacity': return 'bg-yellow-100 text-yellow-800';
      case 'at_capacity': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (eventType: AllocationEventType) => {
    switch (eventType) {
      case 'lead_assigned': return CheckCircle;
      case 'lead_accepted': return CheckCircle;
      case 'lead_declined': return XCircle;
      case 'lead_reassigned': return Activity;
      default: return FileText;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesType = filterType === 'all' || log.eventType === filterType;
    const matchesSearch = searchTerm === '' || 
      log.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.leadId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Scale className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Load Balancing & Audit System</h2>
              <p className="text-sm text-gray-500">Fair distribution monitoring and complete allocation history</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRebalanceModal(true)}
              disabled={!systemHealth?.redistributionNeeded}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                systemHealth?.redistributionNeeded
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Rebalance</span>
            </button>
            <button
              onClick={exportAuditLogs}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* System Health Overview */}
        {systemHealth && (
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Fairness Score</p>
                  <p className="text-2xl font-semibold">{systemHealth.fairnessScore}%</p>
                </div>
                <Scale className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Efficiency</p>
                  <p className="text-2xl font-semibold">{systemHealth.efficiencyScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Avg Response</p>
                  <p className="text-2xl font-semibold">{systemHealth.responseTimeAvg}m</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Accept Rate</p>
                  <p className="text-2xl font-semibold">{systemHealth.acceptanceRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Load Balancing Configuration */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-purple-600" />
          Load Balancing Configuration
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Load Balancing</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={loadBalancingConfig.enabled}
                  onChange={(e) => setLoadBalancingConfig({
                    ...loadBalancingConfig,
                    enabled: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div>
              <label className="text-sm font-medium">Max Lead Share</label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={loadBalancingConfig.maxLeadSharePercentage}
                  onChange={(e) => setLoadBalancingConfig({
                    ...loadBalancingConfig,
                    maxLeadSharePercentage: parseInt(e.target.value)
                  })}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">{loadBalancingConfig.maxLeadSharePercentage}%</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Evaluation Period</label>
              <select
                value={loadBalancingConfig.evaluationPeriod}
                onChange={(e) => setLoadBalancingConfig({
                  ...loadBalancingConfig,
                  evaluationPeriod: e.target.value as any
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Weight Distribution</label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fairness</span>
                  <span className="text-sm font-medium">{Math.round(loadBalancingConfig.fairnessWeight * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <span className="text-sm font-medium">{Math.round(loadBalancingConfig.performanceWeight * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Proximity</span>
                  <span className="text-sm font-medium">{Math.round(loadBalancingConfig.proximityWeight * 100)}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Saturation Protection</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={loadBalancingConfig.saturationProtection.enabled}
                  onChange={(e) => setLoadBalancingConfig({
                    ...loadBalancingConfig,
                    saturationProtection: {
                      ...loadBalancingConfig.saturationProtection,
                      enabled: e.target.checked
                    }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Load Distribution Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Current Load Distribution
        </h3>

        <div className="space-y-3">
          {loadMetrics.map((metric) => (
            <div key={metric.contractorId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{metric.companyName}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(metric.status)}`}>
                      {metric.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">
                      {metric.currentLoad}/{metric.maxCapacity} active jobs
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{metric.utilizationRate}%</p>
                  <p className="text-xs text-gray-500">Utilization</p>
                </div>
              </div>

              {/* Load Bar */}
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    metric.utilizationRate > 80 ? 'bg-red-500' :
                    metric.utilizationRate > 60 ? 'bg-yellow-500' :
                    metric.utilizationRate > 30 ? 'bg-green-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${metric.utilizationRate}%` }}
                />
                {/* Target share indicator */}
                <div
                  className="absolute top-0 h-full w-0.5 bg-gray-800"
                  style={{ left: `${metric.targetShare * 2}%` }}
                  title={`Target: ${metric.targetShare}%`}
                />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Weekly Leads</p>
                  <p className="text-sm font-medium">{metric.weeklyLeads}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Monthly Leads</p>
                  <p className="text-sm font-medium">{metric.monthlyLeads}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lead Share</p>
                  <p className="text-sm font-medium">{metric.sharePercentage}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Deviation</p>
                  <p className={`text-sm font-medium ${
                    Math.abs(metric.deviation) > 10 ? 'text-red-600' :
                    Math.abs(metric.deviation) > 5 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {metric.deviation > 0 ? '+' : ''}{metric.deviation}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Alerts */}
      {systemHealth && systemHealth.alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
            System Alerts
          </h3>

          <div className="space-y-3">
            {systemHealth.alerts.map((alert) => (
              <div key={alert.id} className={`border-l-4 pl-4 py-2 ${
                alert.severity === 'critical' ? 'border-red-500' :
                alert.severity === 'high' ? 'border-orange-500' :
                alert.severity === 'medium' ? 'border-yellow-500' :
                'border-blue-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <p className="text-sm font-medium">{alert.message}</p>
                    {alert.contractor && (
                      <span className="text-sm text-gray-500">({alert.contractor})</span>
                    )}
                  </div>
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      // Mark alert as resolved
                      if (systemHealth) {
                        const updatedAlerts = systemHealth.alerts.map(a =>
                          a.id === alert.id ? { ...a, resolved: true } : a
                        );
                        setSystemHealth({ ...systemHealth, alerts: updatedAlerts });
                      }
                    }}
                  >
                    {alert.resolved ? 'Resolved' : 'Resolve'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-gray-600" />
            Allocation Audit Trail
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Events</option>
              <option value="lead_assigned">Assigned</option>
              <option value="lead_accepted">Accepted</option>
              <option value="lead_declined">Declined</option>
              <option value="lead_reassigned">Reassigned</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contractor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.slice(0, 10).map((log) => {
                const Icon = getEventIcon(log.eventType);
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${
                          log.success ? 'text-green-500' : 'text-red-500'
                        }`} />
                        <span className="text-sm capitalize">{log.eventType.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">{log.leadId}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{log.contractorName}</td>
                    <td className="px-4 py-2 text-sm text-gray-600 capitalize">{log.method.replace('_', ' ')}</td>
                    <td className="px-4 py-2">
                      <span className="text-sm font-medium">{log.score || '-'}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{log.duration}ms</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rebalance Modal */}
      {showRebalanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Load Rebalancing</h3>
            <p className="text-gray-600 mb-6">
              This will redistribute leads among contractors to achieve better fairness. 
              Current fairness score: {systemHealth?.fairnessScore}%
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRebalanceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={triggerRebalance}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Rebalance Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Audit Log Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Event ID</p>
                  <p className="font-medium">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Event Type</p>
                  <p className="font-medium capitalize">{selectedLog.eventType.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lead ID</p>
                  <p className="font-medium">{selectedLog.leadId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contractor</p>
                  <p className="font-medium">{selectedLog.contractorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allocation Method</p>
                  <p className="font-medium capitalize">{selectedLog.method.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="font-medium">{selectedLog.score || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{selectedLog.duration}ms</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Success</p>
                  <p className="font-medium">{selectedLog.success ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p className="font-medium">{selectedLog.userId}</p>
                </div>
              </div>
              {Object.keys(selectedLog.details).length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Additional Details</p>
                  <pre className="bg-gray-50 p-3 rounded text-xs">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadBalancingAuditSystem;