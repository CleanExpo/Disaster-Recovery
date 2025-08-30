'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp,
  TrendingDown, Calendar, Bell, FileText, Award, Users, BarChart3,
  Activity, AlertOctagon, Info, ChevronRight, Filter, Download,
  RefreshCw, Settings, ArrowUp, ArrowDown
} from 'lucide-react';
import type { 
  ComplianceDashboard,
  ComplianceIndicator,
  ComplianceStatus,
  ComplianceAlert,
  Priority,
  TrendData
} from '@/types/audit-compliance';

interface ComplianceMonitoringDashboardProps {
  contractorId?: string;
  userRole: 'admin' | 'auditor' | 'contractor' | 'compliance_manager';
  className?: string;
}

const ComplianceMonitoringDashboard: React.FC<ComplianceMonitoringDashboardProps> = ({
  contractorId,
  userRole,
  className = ''
}) => {
  const [dashboard, setDashboard] = useState<ComplianceDashboard | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAlerts, setShowAlerts] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [contractorId, selectedTimeframe]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockDashboard: ComplianceDashboard = {
        contractorId,
        period: {
          start: '2024-01-01T00:00:00Z',
          end: '2024-12-31T23:59:59Z',
          frequency: 'monthly'
        },
        overallScore: 87.5,
        status: 'compliant',
        indicators: [
          {
            id: 'ind_001',
            name: 'General Liability Insurance',
            category: 'insurance',
            type: 'document',
            status: 'compliant',
            currentValue: 'Active',
            lastChecked: '2024-04-15T10:00:00Z',
            nextCheckDue: '2024-05-15T10:00:00Z',
            frequency: 'monthly',
            priority: 'critical',
            description: 'General liability insurance coverage verification',
            requiresEvidence: true,
            evidenceDocuments: ['doc_001'],
            automatedCheck: true
          },
          {
            id: 'ind_002',
            name: 'Water Damage Certification',
            category: 'certification',
            type: 'document',
            status: 'warning',
            currentValue: 'Expiring Soon',
            lastChecked: '2024-04-14T09:00:00Z',
            nextCheckDue: '2024-04-21T09:00:00Z',
            frequency: 'weekly',
            priority: 'high',
            description: 'IICRC Water Damage Restoration certification',
            requiresEvidence: true,
            evidenceDocuments: ['doc_002'],
            automatedCheck: true
          },
          {
            id: 'ind_003',
            name: 'Customer Satisfaction Score',
            category: 'kpi',
            type: 'percentage',
            status: 'compliant',
            currentValue: 92,
            targetValue: 85,
            threshold: {
              critical: 70,
              warning: 80,
              good: 85
            },
            lastChecked: '2024-04-15T12:00:00Z',
            nextCheckDue: '2024-04-30T12:00:00Z',
            frequency: 'monthly',
            priority: 'medium',
            description: 'Average customer satisfaction rating',
            requiresEvidence: false,
            evidenceDocuments: [],
            automatedCheck: true
          },
          {
            id: 'ind_004',
            name: 'Safety Training Compliance',
            category: 'training',
            type: 'percentage',
            status: 'warning',
            currentValue: 78,
            targetValue: 100,
            threshold: {
              critical: 60,
              warning: 80,
              good: 95
            },
            lastChecked: '2024-04-10T14:00:00Z',
            nextCheckDue: '2024-04-17T14:00:00Z',
            frequency: 'weekly',
            priority: 'high',
            description: 'Percentage of employees with current safety training',
            requiresEvidence: true,
            evidenceDocuments: [],
            automatedCheck: false
          },
          {
            id: 'ind_005',
            name: 'Background Check Status',
            category: 'background_check',
            type: 'boolean',
            status: 'compliant',
            currentValue: true,
            lastChecked: '2024-03-01T10:00:00Z',
            nextCheckDue: '2025-03-01T10:00:00Z',
            frequency: 'annual',
            priority: 'high',
            description: 'All employees have passed background checks',
            requiresEvidence: true,
            evidenceDocuments: ['doc_003', 'doc_004'],
            automatedCheck: false
          }
        ],
        upcomingAudits: [],
        recentFindings: [],
        openRemediations: [],
        trends: [
          { date: '2024-01-01', complianceScore: 85, auditsPassed: 2, auditsFailed: 0, findingsOpened: 3, findingsClosed: 2 },
          { date: '2024-02-01', complianceScore: 86, auditsPassed: 1, auditsFailed: 0, findingsOpened: 2, findingsClosed: 3 },
          { date: '2024-03-01', complianceScore: 88, auditsPassed: 2, auditsFailed: 0, findingsOpened: 1, findingsClosed: 2 },
          { date: '2024-04-01', complianceScore: 87.5, auditsPassed: 1, auditsFailed: 0, findingsOpened: 2, findingsClosed: 1 }
        ],
        riskScore: 32,
        alerts: [
          {
            id: 'alert_001',
            type: 'expiry_warning',
            severity: 'high',
            title: 'Water Damage Certification Expiring',
            description: 'Your Water Damage Restoration certification will expire in 15 days',
            relatedEntity: {
              type: 'compliance_indicator',
              id: 'ind_002',
              name: 'Water Damage Certification'
            },
            createdAt: '2024-04-15T08:00:00Z',
            acknowledged: false
          },
          {
            id: 'alert_002',
            type: 'non_compliance',
            severity: 'medium',
            title: 'Safety Training Below Threshold',
            description: 'Safety training compliance has fallen below the warning threshold (78% vs 80% required)',
            relatedEntity: {
              type: 'compliance_indicator',
              id: 'ind_004',
              name: 'Safety Training Compliance'
            },
            createdAt: '2024-04-10T14:30:00Z',
            acknowledged: false
          }
        ]
      };

      setDashboard(mockDashboard);
    } catch (error) {
      console.error('Error loading compliance dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'non_compliant': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'pending_review': return 'text-blue-600 bg-blue-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-5 h-5" />;
      case 'non_compliant': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'pending_review': return <Clock className="w-5 h-5" />;
      case 'expired': return <XCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelLabel = (score: number) => {
    if (score <= 25) return { label: 'Low Risk', colour: 'text-green-600 bg-green-50' };
    if (score <= 50) return { label: 'Medium Risk', colour: 'text-yellow-600 bg-yellow-50' };
    if (score <= 75) return { label: 'High Risk', colour: 'text-orange-600 bg-orange-50' };
    return { label: 'Critical Risk', colour: 'text-red-600 bg-red-50' };
  };

  const ComplianceScoreCard = () => {
    if (!dashboard) return null;
    
    const trend = dashboard.trends.length > 1 
      ? dashboard.overallScore - dashboard.trends[dashboard.trends.length - 2].complianceScore
      : 0;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Compliance Score</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(dashboard.status)}`}>
            {dashboard.status.replace('_', ' ').toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="52"
                cx="64"
                cy="64"
              />
              <circle
                className={getScoreColor(dashboard.overallScore)}
                strokeWidth="10"
                strokeDasharray={`${(dashboard.overallScore / 100) * 326.73} 326.73`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="52"
                cx="64"
                cy="64"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className={`text-3xl font-bold ${getScoreColor(dashboard.overallScore)}`}>
                  {dashboard.overallScore.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-600">Compliance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm">
          {trend !== 0 && (
            <>
              {trend > 0 ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600" />
              )}
              <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(trend).toFixed(1)}%
              </span>
              <span className="text-gray-600">from last period</span>
            </>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dashboard.riskScore}</p>
              <p className="text-sm text-gray-600">Risk Score</p>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRiskLevelLabel(dashboard.riskScore).colour}`}>
                {getRiskLevelLabel(dashboard.riskScore).label}
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dashboard.alerts.length}</p>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 bg-yellow-50 text-yellow-800">
                Requires Attention
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComplianceIndicators = () => {
    if (!dashboard) return null;

    const categories = Array.from(new Set(dashboard.indicators.map(i => i.category)));
    const filteredIndicators = selectedCategory === 'all' 
      ? dashboard.indicators 
      : dashboard.indicators.filter(i => i.category === selectedCategory);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Indicators</h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
              ))}
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredIndicators.map((indicator) => (
            <div key={indicator.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${getStatusColor(indicator.status)}`}>
                      {getStatusIcon(indicator.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{indicator.name}</h4>
                      <p className="text-sm text-gray-600">{indicator.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-600">Category</p>
                      <p className="text-sm font-medium capitalize">{indicator.category.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Current Value</p>
                      <p className="text-sm font-medium">
                        {indicator.type === 'percentage' 
                          ? `${indicator.currentValue}%` 
                          : String(indicator.currentValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Next Check</p>
                      <p className="text-sm font-medium">
                        {new Date(indicator.nextCheckDue).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Priority</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(indicator.priority)}`}>
                        {indicator.priority}
                      </span>
                    </div>
                  </div>

                  {indicator.threshold && indicator.type === 'percentage' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">
                          {indicator.currentValue}% / {indicator.targetValue}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            Number(indicator.currentValue) >= indicator.threshold.good 
                              ? 'bg-green-600'
                              : Number(indicator.currentValue) >= indicator.threshold.warning
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min(Number(indicator.currentValue), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {indicator.requiresEvidence && (
                    <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      <FileText className="w-4 h-4 mr-1" />
                      Evidence
                    </button>
                  )}
                  <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ComplianceAlerts = () => {
    if (!dashboard || !showAlerts) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
          <button
            onClick={() => setShowAlerts(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {dashboard.alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">No active compliance alerts</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dashboard.alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border-l-4 p-4 rounded-lg ${
                  alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                  alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded ${
                      alert.severity === 'critical' ? 'bg-red-100' :
                      alert.severity === 'high' ? 'bg-orange-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <AlertOctagon className={`w-4 h-4 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      {alert.relatedEntity && (
                        <p className="text-xs text-gray-500 mt-2">
                          Related: {alert.relatedEntity.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!alert.acknowledged && (
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white">
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ComplianceTrends = () => {
    if (!dashboard || dashboard.trends.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Trends</h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Compliance Score Trend</h4>
            <div className="relative h-48 flex items-end justify-between">
              {dashboard.trends.map((trend, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t mx-1"
                    style={{ 
                      height: `${(trend.complianceScore / 100) * 100}%`,
                      minHeight: '4px'
                    }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2 rotate-45 origin-left">
                    {new Date(trend.date).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {dashboard.trends.reduce((sum, t) => sum + t.auditsPassed, 0)}
              </p>
              <p className="text-sm text-gray-600">Audits Passed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {dashboard.trends.reduce((sum, t) => sum + t.auditsFailed, 0)}
              </p>
              <p className="text-sm text-gray-600">Audits Failed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {dashboard.trends.reduce((sum, t) => sum + t.findingsOpened, 0)}
              </p>
              <p className="text-sm text-gray-600">Findings Opened</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {dashboard.trends.reduce((sum, t) => sum + t.findingsClosed, 0)}
              </p>
              <p className="text-sm text-gray-600">Findings Closed</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-200 rounded-xl h-96"></div>
            <div className="lg:col-span-2 bg-gray-200 rounded-xl h-96"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-200 rounded-xl h-64"></div>
            <div className="bg-gray-200 rounded-xl h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time compliance status and indicators</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          <button 
            onClick={() => loadDashboardData()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ComplianceScoreCard />
        <div className="lg:col-span-2">
          <ComplianceAlerts />
        </div>
      </div>

      <ComplianceIndicators />
      <ComplianceTrends />
    </div>
  );
};

export default ComplianceMonitoringDashboard;