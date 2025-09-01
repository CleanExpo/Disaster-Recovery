'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, Clock, Calendar, FileText, CheckCircle, XCircle,
  Upload, RefreshCw, Bell, Filter, Download, Mail,
  ChevronDown, ChevronRight, Users, Building2, Award, Shield, MessageSquare} from 'lucide-react';
import type { 
  ExpirationAlert, 
  ComplianceStatus, 
  ComplianceCategory,
  Document,
  DocumentCategory 
} from '@/types/document-management';

interface DocumentExpiryTrackerProps {
  contractorId?: string;
  userRole: 'admin' | 'contractor' | 'auditor';
  className?: string;
}

const DocumentExpiryTracker: React.FC<DocumentExpiryTrackerProps> = ({
  contractorId,
  userRole,
  className = ''
}) => {
  const [expirationAlerts, setExpirationAlerts] = useState<ExpirationAlert[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'urgent' | 'high' | 'medium' | 'low'>('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpirationData();
  }, [contractorId, selectedTimeframe]);

  const loadExpirationData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockAlerts: ExpirationAlert[] = [
        {
          documentId: 'doc_001',
          title: 'General Liability Insurance',
          category: 'insurance',
          expiryDate: '2024-05-15T23:59:59Z',
          daysUntilExpiry: 30,
          priority: 'high',
          contractorId: 'contractor_001',
          notificationsSent: 2
        },
        {
          documentId: 'doc_002',
          title: 'Water Damage Certification',
          category: 'certification',
          expiryDate: '2024-04-20T23:59:59Z',
          daysUntilExpiry: 5,
          priority: 'urgent',
          contractorId: 'contractor_001',
          notificationsSent: 3
        },
        {
          documentId: 'doc_003',
          title: 'Business License',
          category: 'compliance',
          expiryDate: '2024-06-30T23:59:59Z',
          daysUntilExpiry: 75,
          priority: 'medium',
          contractorId: 'contractor_001',
          notificationsSent: 1
        },
        {
          documentId: 'doc_004',
          title: 'OSHA Safety Training',
          category: 'training',
          expiryDate: '2024-03-25T23:59:59Z',
          daysUntilExpiry: -10,
          priority: 'urgent',
          contractorId: 'contractor_001',
          notificationsSent: 5
        }
      ];

      const mockCompliance: ComplianceStatus = {
        contractorId: contractorId || 'contractor_001',
        overallStatus: 'warning',
        lastUpdated: '2024-04-15T10:00:00Z',
        completionRate: 78.5,
        categories: [
          {
            category: 'insurance',
            required: 4,
            submitted: 4,
            approved: 3,
            expired: 1,
            status: 'warning',
            documents: []
          },
          {
            category: 'certification',
            required: 6,
            submitted: 5,
            approved: 4,
            expired: 1,
            status: 'warning',
            documents: []
          },
          {
            category: 'compliance',
            required: 3,
            submitted: 3,
            approved: 3,
            expired: 0,
            status: 'complete',
            documents: []
          },
          {
            category: 'training',
            required: 4,
            submitted: 3,
            approved: 2,
            expired: 1,
            status: 'incomplete',
            documents: []
          }
        ],
        upcomingExpirations: mockAlerts.filter(alert => alert.daysUntilExpiry > 0),
        overdueDocuments: []
      };

      setExpirationAlerts(mockAlerts);
      setComplianceStatus(mockCompliance);
    } catch (error) {
      console.error('Error loading expiration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-blue-700 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case 'insurance': return <Shield className="w-5 h-5" />;
      case 'certification': return <Award className="w-5 h-5" />;
      case 'compliance': return <CheckCircle className="w-5 h-5" />;
      case 'training': return <Users className="w-5 h-5" />;
      case 'contract': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'complete': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'non_compliant':
      case 'incomplete': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredAlerts = expirationAlerts.filter(alert => {
    const matchesPriority = selectedPriority === 'all' || alert.priority === selectedPriority;
    
    const matchesTimeframe = (() => {
      if (selectedTimeframe === 'all') return true;
      const days = parseInt(selectedTimeframe.replace('d', ''));
      return Math.abs(alert.daysUntilExpiry) <= days;
    })();

    return matchesPriority && matchesTimeframe;
  });

  const ComplianceOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Overview</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complianceStatus?.overallStatus || '')}`}>
            {complianceStatus?.overallStatus.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Overall Completion</span>
            <span className="text-sm font-medium text-gray-900">
              {complianceStatus?.completionRate.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${complianceStatus?.completionRate || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {complianceStatus?.categories.map((category) => (
            <div key={category.category} className="border border-gray-200 rounded-lg p-4">
              <button
                onClick={() => {
                  const categoryId = category.category;
                  setExpandedCategories(prev => 
                    prev.includes(categoryId) 
                      ? prev.filter(id => id !== categoryId)
                      : [...prev, categoryId]
                  );
                }}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {getCategoryIcon(category.category)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900 capitalize">
                      {category.category.replace('_', ' ')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {category.approved}/{category.required} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                    {category.status.replace('_', ' ')}
                  </div>
                  {expandedCategories.includes(category.category) ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </div>
              </button>

              {expandedCategories.includes(category.category) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{category.required}</p>
                      <p className="text-sm text-gray-600">Required</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{category.submitted}</p>
                      <p className="text-sm text-gray-600">Submitted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{category.approved}</p>
                      <p className="text-sm text-gray-600">Approved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{category.expired}</p>
                      <p className="text-sm text-gray-600">Expired</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colours">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colours">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colours">
              <MessageSquare className="w-4 h-4 mr-2" />
              Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExpirationAlerts = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Document Expiration Alerts</h3>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Next 7 days</option>
            <option value="30d">Next 30 days</option>
            <option value="90d">Next 90 days</option>
            <option value="all">All time</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">All documents are up to date</h4>
          <p className="text-gray-600">No expiration alerts for the selected timeframe</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.documentId} 
              className={`border-2 rounded-lg p-4 ${
                alert.daysUntilExpiry < 0 
                  ? 'border-red-200 bg-red-50' 
                  : getPriorityColor(alert.priority).includes('red') 
                    ? 'border-red-200 bg-red-50'
                    : getPriorityColor(alert.priority).includes('orange')
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-yellow-200 bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    alert.daysUntilExpiry < 0 ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {alert.daysUntilExpiry < 0 ? 
                      <XCircle className="w-5 h-5 text-red-600" /> :
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    }
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {alert.category.replace('_', ' ')} • {alert.notificationsSent} reminders sent
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(alert.priority)}`}>
                  {alert.priority.toUpperCase()}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Expires: {new Date(alert.expiryDate).toLocaleDateString()}
                  </div>
                  <div className={`flex items-center font-medium ${
                    alert.daysUntilExpiry < 0 ? 'text-red-600' : 'text-blue-700'
                  }`}>
                    <Clock className="w-4 h-4 mr-1" />
                    {alert.daysUntilExpiry < 0 
                      ? `${Math.abs(alert.daysUntilExpiry)} days overdue` 
                      : `${alert.daysUntilExpiry} days remaining`
                    }
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colours">
                    <Upload className="w-4 h-4 mr-1" />
                    Replace
                  </button>
                  <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colours">
                    <Bell className="w-4 h-4 mr-1" />
                    Remind
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-gray-200 rounded-xl h-64"></div>
            <div className="bg-gray-200 rounded-xl h-64"></div>
          </div>
          <div className="bg-gray-200 rounded-xl h-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Expiry Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor compliance status and upcoming document expirations</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </button>
      </div>

      <ComplianceOverview />
      <ExpirationAlerts />
    </div>
  );
};

export default DocumentExpiryTracker;