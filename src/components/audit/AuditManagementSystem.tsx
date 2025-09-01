'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, FileCheck, AlertTriangle, CheckCircle,
  PlayCircle, PauseCircle, XCircle, Edit3, Trash2, Eye, Download,
  Plus, Filter, Search, TrendingUp, Shield, Shuffle, Target,
  ClipboardCheck, AlertOctagon, BarChart3, ChevronRight, Archive
} from 'lucide-react';
import type { 
  Audit, 
  AuditType, 
  AuditStatus,
  AuditChecklistItem,
  AuditFinding,
  RiskLevel,
  ChecklistResponse
} from '@/types/audit-compliance';

interface AuditManagementSystemProps {
  userRole: 'admin' | 'auditor' | 'contractor' | 'compliance_manager';
  userId: string;
  contractorId?: string;
  className?: string;
}

const AuditManagementSystem: React.FC<AuditManagementSystemProps> = ({
  userRole,
  userId,
  contractorId,
  className = ''
}) => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'scheduled' | 'in_progress' | 'completed'>('scheduled');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<AuditType | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAudits();
  }, [userRole, contractorId, activeTab]);

  const loadAudits = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockAudits: Audit[] = [
        {
          id: 'audit_001',
          title: 'Annual Compliance Audit 2024',
          description: 'Comprehensive annual compliance review for all contractors',
          type: 'scheduled',
          status: 'scheduled',
          contractorId: 'contractor_001',
          contractorName: 'ABC Restoration Inc.',
          auditorId: 'auditor_001',
          auditorName: 'Jane Smith',
          scheduledDate: '2024-05-01T09:00:00Z',
          dueDate: '2024-05-15T17:00:00Z',
          scope: {
            categories: ['insurance', 'certification', 'training', 'safety'],
            indicators: ['ind_001', 'ind_002', 'ind_003'],
            departments: ['Operations', 'Safety'],
            locations: ['Main Office', 'Warehouse'],
            timeframe: {
              start: '2023-05-01T00:00:00Z',
              end: '2024-04-30T23:59:59Z'
            },
            includeSubcontractors: true
          },
          riskLevel: 'medium',
          checklistTemplateId: 'template_001',
          checklist: [
            {
              id: 'check_001',
              category: 'insurance',
              question: 'Is General Liability Insurance current and meets minimum requirements?',
              description: 'Verify GL insurance coverage of at least $1M per occurrence',
              requiresEvidence: true,
              evidenceType: ['document', 'certificate'],
              weight: 10,
              response: {
                status: 'pass',
                value: 'Coverage verified at $2M',
                comments: 'Insurance certificate on file, expires 12/31/2024',
                timestamp: '2024-04-15T10:30:00Z',
                respondedBy: 'contractor_001'
              }
            },
            {
              id: 'check_002',
              category: 'certification',
              question: 'Are all required certifications current?',
              description: 'Check IICRC certifications for water damage and mould remediation',
              requiresEvidence: true,
              evidenceType: ['certificate'],
              weight: 8,
              response: {
                status: 'partial',
                value: 'Water damage current, mould remediation expiring soon',
                comments: 'Mould certification expires in 30 days',
                timestamp: '2024-04-15T11:00:00Z',
                respondedBy: 'contractor_001'
              }
            }
          ],
          findings: [],
          score: 85,
          recommendations: [],
          remediationRequired: false,
          evidenceFiles: [],
          comments: [],
          metadata: {
            createdAt: '2024-03-15T10:00:00Z',
            createdBy: 'admin_001',
            lastModifiedAt: '2024-04-15T11:00:00Z',
            lastModifiedBy: 'auditor_001',
            version: 1
          }
        },
        {
          id: 'audit_002',
          title: 'Surprise Safety Inspection',
          description: 'Random safety compliance check triggered by incident report',
          type: 'surprise',
          status: 'in_progress',
          contractorId: 'contractor_002',
          contractorName: 'XYZ Restoration Services',
          auditorId: 'auditor_002',
          auditorName: 'John Doe',
          startDate: '2024-04-14T14:00:00Z',
          dueDate: '2024-04-21T17:00:00Z',
          scope: {
            categories: ['safety', 'training'],
            indicators: ['ind_004', 'ind_005'],
            departments: ['Field Operations'],
            locations: ['Job Site 1', 'Job Site 2'],
            timeframe: {
              start: '2024-03-01T00:00:00Z',
              end: '2024-04-14T23:59:59Z'
            },
            includeSubcontractors: false
          },
          riskLevel: 'high',
          triggerReason: 'Safety incident reported on 04/10/2024',
          checklistTemplateId: 'template_safety',
          checklist: [],
          findings: [
            {
              id: 'finding_001',
              checklistItemId: 'check_safety_001',
              type: 'non_compliance',
              severity: 'major',
              title: 'Missing Safety Equipment',
              description: 'Several employees observed without required PPE',
              impact: 'Increased risk of workplace injuries',
              rootCause: 'Inadequate safety training and equipment distribution',
              recommendation: 'Immediate safety training and PPE distribution required',
              evidence: [],
              status: 'open',
              assignedTo: 'contractor_002',
              dueDate: '2024-04-25T17:00:00Z'
            }
          ],
          score: 62,
          outcome: 'requires_remediation',
          recommendations: [
            'Implement mandatory safety training program',
            'Establish daily safety equipment checks',
            'Review and update safety protocols'
          ],
          remediationRequired: true,
          evidenceFiles: [],
          comments: [],
          metadata: {
            createdAt: '2024-04-14T13:00:00Z',
            createdBy: 'system',
            lastModifiedAt: '2024-04-15T16:00:00Z',
            lastModifiedBy: 'auditor_002',
            version: 2
          }
        }
      ];

      setAudits(mockAudits);
    } catch (error) {
      console.error('Error loading audits:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerSurpriseAudit = async () => {
    try {
      // Mock API call to trigger surprise audit
      const newAudit: Audit = {
        id: `audit_${Date.now()}`,
        title: 'Surprise Audit',
        description: 'Random compliance check',
        type: 'surprise',
        status: 'scheduled',
        auditorId: userId,
        auditorName: 'Current User',
        scheduledDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        scope: {
          categories: ['insurance', 'certification'],
          indicators: [],
          timeframe: {
            start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString()
          },
          includeSubcontractors: false
        },
        riskLevel: 'medium',
        triggerReason: 'Random selection based on risk factors',
        checklistTemplateId: 'template_001',
        checklist: [],
        findings: [],
        recommendations: [],
        remediationRequired: false,
        evidenceFiles: [],
        comments: [],
        metadata: {
          createdAt: new Date().toISOString(),
          createdBy: userId,
          lastModifiedAt: new Date().toISOString(),
          lastModifiedBy: userId,
          version: 1
        }
      };

      setAudits(prev => [...prev, newAudit]);
    } catch (error) {
      console.error('Error triggering surprise audit:', error);
    }
  };

  const getStatusColor = (status: AuditStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending_review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: AuditStatus) => {
    switch (status) {
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'in_progress': return <PlayCircle className="w-4 h-4" />;
      case 'pending_review': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'overdue': return <AlertOctagon className="w-4 h-4" />;
      default: return <FileCheck className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-blue-700 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      case 'minimal': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAuditTypeIcon = (type: AuditType) => {
    switch (type) {
      case 'scheduled': return <Calendar className="w-5 h-5" />;
      case 'surprise': return <Shuffle className="w-5 h-5" />;
      case 'incident_triggered': return <AlertTriangle className="w-5 h-5" />;
      case 'risk_based': return <Target className="w-5 h-5" />;
      case 'compliance': return <Shield className="w-5 h-5" />;
      default: return <FileCheck className="w-5 h-5" />;
    }
  };

  const filteredAudits = audits.filter(audit => {
    const matchesTab = 
      (activeTab === 'scheduled' && audit.status === 'scheduled') ||
      (activeTab === 'in_progress' && ['in_progress', 'pending_review'].includes(audit.status)) ||
      (activeTab === 'completed' && ['completed', 'cancelled'].includes(audit.status));

    const matchesSearch = !searchQuery || 
      audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.contractorName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'all' || audit.type === filterType;

    return matchesTab && matchesSearch && matchesType;
  });

  const AuditCard = ({ audit }: { audit: Audit }) => (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedAudit(audit)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getRiskColor(audit.riskLevel)}`}>
            {getAuditTypeIcon(audit.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{audit.title}</h3>
            <p className="text-sm text-gray-600">{audit.contractorName || 'All Contractors'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
            {getStatusIcon(audit.status)}
            <span className="ml-1">{audit.status.replace('_', ' ')}</span>
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{audit.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Auditor</p>
          <p className="text-sm font-medium">{audit.auditorName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Risk Level</p>
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getRiskColor(audit.riskLevel)}`}>
            {audit.riskLevel}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            {audit.status === 'scheduled' ? 'Scheduled' : 
             audit.status === 'completed' ? 'Completed' : 'Due'}
          </p>
          <p className="text-sm font-medium">
            {new Date(
              audit.scheduledDate || audit.completedDate || audit.dueDate || ''
            ).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Score</p>
          <p className="text-sm font-medium">
            {audit.score ? `${audit.score}%` : 'Pending'}
          </p>
        </div>
      </div>

      {audit.triggerReason && (
        <div className="p-3 bg-yellow-50 rounded-lg mb-4">
          <p className="text-xs font-medium text-yellow-800">Trigger Reason:</p>
          <p className="text-sm text-yellow-700">{audit.triggerReason}</p>
        </div>
      )}

      {audit.findings && audit.findings.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">
              {audit.findings.length} Finding{audit.findings.length !== 1 ? 's' : ''}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-600" />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAudit(audit);
              setShowChecklistModal(true);
            }}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            <ClipboardCheck className="w-4 h-4 mr-1" />
            Checklist
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            <Download className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const CreateAuditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Schedule New Audit</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Title *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter audit title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['scheduled', 'compliance', 'quality', 'safety'] as AuditType[]).map((type) => (
                <button
                  key={type}
                  className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:bg-blue-50"
                >
                  {getAuditTypeIcon(type)}
                  <span className="ml-2 text-sm font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date *
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Contractor(s)
            </label>
            <select
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Contractors</option>
              <option value="contractor_001">ABC Restoration Inc.</option>
              <option value="contractor_002">XYZ Restoration Services</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Scope
            </label>
            <div className="space-y-2">
              {['Insurance', 'Certification', 'Training', 'Safety', 'Financial', 'Operational'].map((category) => (
                <label key={category} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Assessment
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="minimal">Minimal</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Schedule Audit
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Management</h1>
          <p className="text-gray-600 mt-1">Schedule and manage compliance audits</p>
        </div>
        <div className="flex items-center space-x-2">
          {(userRole === 'admin' || userRole === 'compliance_manager') && (
            <>
              <button 
                onClick={triggerSurpriseAudit}
                className="flex items-center px-4 py-2 border border-orange-300 text-blue-700 rounded-lg hover:bg-blue-50"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Surprise Audit
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Audit
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as AuditType | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="scheduled">Scheduled</option>
            <option value="surprise">Surprise</option>
            <option value="compliance">Compliance</option>
            <option value="safety">Safety</option>
          </select>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {(['scheduled', 'in_progress', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colours ${
                activeTab === tab 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {filteredAudits.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No audits found</h3>
          <p className="text-gray-600">
            {searchQuery || filterType !== 'all' 
              ? 'Try adjusting your search or filters' 
              : `No ${activeTab} audits`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAudits.map((audit) => (
            <AuditCard key={audit.id} audit={audit} />
          ))}
        </div>
      )}

      {showCreateModal && <CreateAuditModal />}
    </div>
  );
};

export default AuditManagementSystem;