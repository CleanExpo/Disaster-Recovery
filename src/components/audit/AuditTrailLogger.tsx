'use client';

import React, { useState, useEffect } from 'react';
import {
  History, FileText, Upload, Download, Eye, Shield, User, Clock,
  Filter, Search, Calendar, Activity, Database, Link, Archive,
  AlertTriangle, CheckCircle, XCircle, Edit3, Trash2, Camera,
  Paperclip, File, Image, Video, ChevronDown, ChevronRight,
  Plus, Building2, Award
} from 'lucide-react';
import type { 
  AuditTrail, 
  EvidenceFile, 
  EntityType,
  AuditAction,
  EvidenceCategory
} from '@/types/audit-compliance';

interface AuditTrailLoggerProps {
  entityType?: EntityType;
  entityId?: string;
  userRole: 'admin' | 'auditor' | 'contractor' | 'compliance_manager';
  userId: string;
  className?: string;
}

const AuditTrailLogger: React.FC<AuditTrailLoggerProps> = ({
  entityType,
  entityId,
  userRole,
  userId,
  className = ''
}) => {
  const [auditTrails, setAuditTrails] = useState<AuditTrail[]>([]);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [filteredTrails, setFilteredTrails] = useState<AuditTrail[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState<EntityType | 'all'>(entityType || 'all');
  const [selectedAction, setSelectedAction] = useState<AuditAction | 'all'>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditTrails();
    loadEvidenceFiles();
  }, [entityType, entityId]);

  useEffect(() => {
    filterTrails();
  }, [auditTrails, searchQuery, selectedEntityType, selectedAction, selectedDateRange]);

  const loadAuditTrails = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockTrails: AuditTrail[] = [
        {
          id: 'trail_001',
          entityType: 'audit',
          entityId: 'audit_001',
          action: 'created',
          performedBy: 'admin_001',
          performedAt: '2024-04-15T10:00:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0',
          description: 'Annual Compliance Audit 2024 created',
          metadata: {
            auditTitle: 'Annual Compliance Audit 2024',
            auditType: 'scheduled'
          }
        },
        {
          id: 'trail_002',
          entityType: 'compliance_indicator',
          entityId: 'ind_002',
          action: 'updated',
          performedBy: 'contractor_001',
          performedAt: '2024-04-15T09:30:00Z',
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
          previousValue: { status: 'compliant', expiryDate: '2024-05-01' },
          newValue: { status: 'warning', expiryDate: '2024-04-20' },
          description: 'Water Damage Certification status updated to warning',
          metadata: {
            indicatorName: 'Water Damage Certification',
            reason: 'Certificate expiring soon'
          }
        },
        {
          id: 'trail_003',
          entityType: 'evidence',
          entityId: 'evidence_001',
          action: 'uploaded',
          performedBy: 'contractor_001',
          performedAt: '2024-04-14T16:45:00Z',
          ipAddress: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148',
          description: 'Insurance certificate uploaded',
          metadata: {
            fileName: 'liability_insurance_2024.pdf',
            fileSize: 2048000,
            category: 'document'
          }
        },
        {
          id: 'trail_004',
          entityType: 'finding',
          entityId: 'finding_001',
          action: 'created',
          performedBy: 'auditor_002',
          performedAt: '2024-04-14T15:00:00Z',
          ipAddress: '192.168.1.103',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/115.0',
          description: 'Non-compliance finding created: Missing Safety Equipment',
          metadata: {
            severity: 'major',
            auditId: 'audit_002'
          }
        },
        {
          id: 'trail_005',
          entityType: 'remediation_task',
          entityId: 'task_001',
          action: 'assigned',
          performedBy: 'admin_001',
          performedAt: '2024-04-14T14:00:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/121.0',
          description: 'Remediation task assigned to contractor_002',
          metadata: {
            taskTitle: 'Implement safety training program',
            assignee: 'contractor_002',
            dueDate: '2024-04-25'
          }
        },
        {
          id: 'trail_006',
          entityType: 'document',
          entityId: 'doc_001',
          action: 'viewed',
          performedBy: 'auditor_001',
          performedAt: '2024-04-13T11:20:00Z',
          ipAddress: '192.168.1.104',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Chrome/121.0',
          description: 'Network Participation Agreement viewed',
          metadata: {
            documentTitle: 'Network Participation Agreement',
            version: 2
          }
        },
        {
          id: 'trail_007',
          entityType: 'user',
          entityId: 'contractor_001',
          action: 'approved',
          performedBy: 'admin_001',
          performedAt: '2024-04-12T10:00:00Z',
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0',
          description: 'Contractor account approved for network participation',
          metadata: {
            contractorName: 'ABC Restoration Inc.',
            approvalLevel: 'full'
          }
        }
      ];

      setAuditTrails(mockTrails);
    } catch (error) {
      console.error('Error loading audit trails:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEvidenceFiles = async () => {
    try {
      // Mock evidence files - replace with actual API call
      const mockEvidence: EvidenceFile[] = [
        {
          id: 'evidence_001',
          fileName: 'liability_insurance_2024.pdf',
          fileType: 'application/pdf',
          fileSize: 2048000,
          uploadedBy: 'contractor_001',
          uploadedAt: '2024-04-14T16:45:00Z',
          description: 'General liability insurance certificate for 2024',
          category: 'certificate',
          relatedItemId: 'audit_001',
          relatedItemType: 'audit',
          url: '/evidence/liability_insurance_2024.pdf',
          metadata: {
            expiryDate: '2024-12-31',
            coverageAmount: '$2,000,000'
          }
        },
        {
          id: 'evidence_002',
          fileName: 'safety_violation_photo.jpg',
          fileType: 'image/jpeg',
          fileSize: 1536000,
          uploadedBy: 'auditor_002',
          uploadedAt: '2024-04-14T15:30:00Z',
          description: 'Photo evidence of safety equipment violation',
          category: 'photo',
          relatedItemId: 'finding_001',
          relatedItemType: 'finding',
          url: '/evidence/safety_violation_photo.jpg',
          metadata: {
            location: 'Job Site 1',
            timestamp: '2024-04-14T14:00:00Z'
          }
        },
        {
          id: 'evidence_003',
          fileName: 'training_log.xlsx',
          fileType: 'application/vnd.ms-excel',
          fileSize: 512000,
          uploadedBy: 'contractor_002',
          uploadedAt: '2024-04-13T10:00:00Z',
          description: 'Employee safety training log',
          category: 'log',
          relatedItemId: 'ind_004',
          relatedItemType: 'indicator',
          url: '/evidence/training_log.xlsx'
        }
      ];

      setEvidenceFiles(mockEvidence);
    } catch (error) {
      console.error('Error loading evidence files:', error);
    }
  };

  const filterTrails = () => {
    let filtered = auditTrails;

    if (searchQuery) {
      filtered = filtered.filter(trail => 
        trail.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trail.performedBy.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedEntityType !== 'all') {
      filtered = filtered.filter(trail => trail.entityType === selectedEntityType);
    }

    if (selectedAction !== 'all') {
      filtered = filtered.filter(trail => trail.action === selectedAction);
    }

    if (selectedDateRange !== 'all') {
      const now = new Date();
      const rangeMs = selectedDateRange === 'today' ? 24 * 60 * 60 * 1000 :
                     selectedDateRange === '7d' ? 7 * 24 * 60 * 60 * 1000 :
                     selectedDateRange === '30d' ? 30 * 24 * 60 * 60 * 1000 :
                     90 * 24 * 60 * 60 * 1000;
      
      filtered = filtered.filter(trail => {
        const trailDate = new Date(trail.performedAt);
        return now.getTime() - trailDate.getTime() <= rangeMs;
      });
    }

    setFilteredTrails(filtered);
  };

  const getActionIcon = (action: AuditAction) => {
    switch (action) {
      case 'created': return <Plus className="w-4 h-4" />;
      case 'updated': return <Edit3 className="w-4 h-4" />;
      case 'deleted': return <Trash2 className="w-4 h-4" />;
      case 'viewed': return <Eye className="w-4 h-4" />;
      case 'downloaded': return <Download className="w-4 h-4" />;
      case 'uploaded': return <Upload className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'assigned': return <User className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: AuditAction) => {
    switch (action) {
      case 'created': return 'bg-green-50 text-green-600';
      case 'updated': return 'bg-blue-50 text-blue-600';
      case 'deleted': return 'bg-red-50 text-red-600';
      case 'approved': return 'bg-green-50 text-green-600';
      case 'rejected': return 'bg-red-50 text-red-600';
      case 'uploaded': return 'bg-purple-50 text-purple-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'compliance_indicator': return <Shield className="w-4 h-4" />;
      case 'audit': return <FileText className="w-4 h-4" />;
      case 'finding': return <AlertTriangle className="w-4 h-4" />;
      case 'remediation_task': return <CheckCircle className="w-4 h-4" />;
      case 'evidence': return <Paperclip className="w-4 h-4" />;
      case 'document': return <File className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      case 'contractor': return <Building2 className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getEvidenceIcon = (category: EvidenceCategory) => {
    switch (category) {
      case 'photo': return <Image className="w-5 h-5 text-blue-600" />;
      case 'video': return <Video className="w-5 h-5 text-purple-600" />;
      case 'document': return <FileText className="w-5 h-5 text-green-600" />;
      case 'certificate': return <Award className="w-5 h-5 text-orange-600" />;
      case 'log': return <Database className="w-5 h-5 text-gray-600" />;
      case 'screenshot': return <Camera className="w-5 h-5 text-indigo-600" />;
      default: return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const AuditTrailItem = ({ trail }: { trail: AuditTrail }) => {
    const isExpanded = expandedItems.includes(trail.id);

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
        <div 
          className="flex items-start justify-between cursor-pointer"
          onClick={() => toggleExpanded(trail.id)}
        >
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${getActionColor(trail.action)}`}>
              {getActionIcon(trail.action)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{trail.description}</p>
              <div className="flex items-centre space-x-4 mt-1 text-sm text-gray-600">
                <div className="flex items-centre">
                  <User className="w-3 h-3 mr-1" />
                  {trail.performedBy}
                </div>
                <div className="flex items-centre">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(trail.performedAt).toLocaleString()}
                </div>
                <div className="flex items-centre">
                  {getEntityIcon(trail.entityType)}
                  <span className="ml-1 capitalize">{trail.entityType.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pl-11 space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">IP Address:</p>
                  <p className="font-mono">{trail.ipAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600">Entity ID:</p>
                  <p className="font-mono">{trail.entityId}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">User Agent:</p>
                <p className="font-mono text-xs">{trail.userAgent}</p>
              </div>

              {trail.previousValue && trail.newValue && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Previous Value:</p>
                    <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(trail.previousValue, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">New Value:</p>
                    <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(trail.newValue, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {trail.metadata && Object.keys(trail.metadata).length > 0 && (
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Additional Details:</p>
                  <div className="bg-white p-2 rounded">
                    {Object.entries(trail.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {trail.entityType === 'evidence' && (
              <button className="flex items-centre px-3 py-1.5 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50">
                <Link className="w-4 h-4 mr-1" />
                View Evidence
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const EvidenceSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-centre justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Evidence Files</h3>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-centre px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <Upload className="w-4 h-4 mr-1" />
          Upload Evidence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidenceFiles.map((evidence) => (
          <div key={evidence.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                {getEvidenceIcon(evidence.category)}
              </div>
              <span className="text-xs text-gray-500 capitalize">
                {evidence.category}
              </span>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-1 truncate">
              {evidence.fileName}
            </h4>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {evidence.description}
            </p>
            
            <div className="space-y-1 text-xs text-gray-500">
              <p>Size: {formatFileSize(evidence.fileSize)}</p>
              <p>Uploaded: {new Date(evidence.uploadedAt).toLocaleDateString()}</p>
              <p>By: {evidence.uploadedBy}</p>
            </div>
            
            <div className="flex items-centre justify-between mt-3 pt-3 border-t border-gray-200">
              <button className="flex items-centre px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                <Eye className="w-3 h-3 mr-1" />
                View
              </button>
              <button className="flex items-centre px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                <Download className="w-3 h-3 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-centre justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Trail & Evidence</h1>
          <p className="text-gray-600 mt-1">Complete log of compliance events and supporting evidence</p>
        </div>
        <div className="flex items-centre space-x-2">
          <button className="flex items-centre px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Archive className="w-4 h-4 mr-2" />
            Export Log
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-centre justify-between mb-6 space-y-4 lg:space-y-0">
          <div className="flex items-centre space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedEntityType}
              onChange={(e) => setSelectedEntityType(e.target.value as EntityType | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Entities</option>
              <option value="compliance_indicator">Compliance Indicators</option>
              <option value="audit">Audits</option>
              <option value="finding">Findings</option>
              <option value="remediation_task">Remediation Tasks</option>
              <option value="evidence">Evidence</option>
              <option value="document">Documents</option>
              <option value="user">Users</option>
            </select>
            
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as AuditAction | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="deleted">Deleted</option>
              <option value="viewed">Viewed</option>
              <option value="uploaded">Uploaded</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredTrails.length} event{filteredTrails.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTrails.length === 0 ? (
            <div className="text-centre py-8">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No audit trail events found</p>
            </div>
          ) : (
            filteredTrails.map((trail) => (
              <AuditTrailItem key={trail.id} trail={trail} />
            ))
          )}
        </div>
      </div>

      <EvidenceSection />
    </div>
  );
};

export default AuditTrailLogger;