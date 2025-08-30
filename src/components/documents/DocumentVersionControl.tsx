'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock, FileText, Download, Eye, RotateCcw, GitBranch, User,
  Calendar, AlertCircle, CheckCircle, ArrowRight, ArrowLeft,
  Compare, History, Upload, Trash2, Star, Tag, Edit3, Save
} from 'lucide-react';
import type { 
  Document, 
  DocumentVersion, 
  DocumentActivity,
  ActivityAction 
} from '@/types/document-management';

interface DocumentVersionControlProps {
  documentId: string;
  userRole: 'admin' | 'contractor' | 'auditor';
  userId: string;
  className?: string;
}

const DocumentVersionControl: React.FC<DocumentVersionControlProps> = ({
  documentId,
  userRole,
  userId,
  className = ''
}) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [activities, setActivities] = useState<DocumentActivity[]>([]);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState<DocumentVersion | null>(null);
  const [activeTab, setActiveTab] = useState<'versions' | 'activity'>('versions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocumentData();
  }, [documentId]);

  const loadDocumentData = async () => {
    setLoading(true);
    try {
      // Mock document data - replace with actual API call
      const mockDocument: Document = {
        id: documentId,
        title: 'Network Participation Agreement',
        description: 'Standard contractor network participation agreement',
        fileName: 'network_agreement_v3.pdf',
        fileSize: 3072000,
        mimeType: 'application/pdf',
        category: 'contract',
        tags: ['agreement', 'network', 'contract'],
        uploadedBy: 'admin_001',
        uploadedAt: '2024-04-15T10:00:00Z',
        lastModifiedAt: '2024-04-15T10:00:00Z',
        version: 3,
        status: 'active',
        isRequired: true,
        accessLevel: 'contractor_only',
        downloadCount: 15,
        checksum: 'abc123current',
        storageUrl: '/documents/network_agreement_v3.pdf',
        metadata: {
          contractorId: 'contractor_001',
          signatureRequired: true,
          signatureStatus: 'pending_signature',
          relatedDocuments: [],
          customFields: {}
        }
      };

      const mockVersions: DocumentVersion[] = [
        {
          id: 'version_003',
          documentId,
          version: 3,
          fileName: 'network_agreement_v3.pdf',
          fileSize: 3072000,
          uploadedBy: 'admin_001',
          uploadedAt: '2024-04-15T10:00:00Z',
          changeLog: 'Updated liability coverage requirements and added new safety protocols',
          storageUrl: '/documents/versions/network_agreement_v3.pdf',
          checksum: 'abc123v3'
        },
        {
          id: 'version_002',
          documentId,
          version: 2,
          fileName: 'network_agreement_v2.pdf',
          fileSize: 2854000,
          uploadedBy: 'admin_001',
          uploadedAt: '2024-02-20T14:30:00Z',
          changeLog: 'Revised payment terms section and corrected terminology in section 4.2',
          storageUrl: '/documents/versions/network_agreement_v2.pdf',
          checksum: 'def456v2'
        },
        {
          id: 'version_001',
          documentId,
          version: 1,
          fileName: 'network_agreement_v1.pdf',
          fileSize: 2640000,
          uploadedBy: 'admin_001',
          uploadedAt: '2024-01-10T09:00:00Z',
          changeLog: 'Initial version of the network participation agreement',
          storageUrl: '/documents/versions/network_agreement_v1.pdf',
          checksum: 'ghi789v1'
        }
      ];

      const mockActivities: DocumentActivity[] = [
        {
          id: 'activity_001',
          documentId,
          userId: 'admin_001',
          action: 'uploaded',
          timestamp: '2024-04-15T10:00:00Z',
          details: { version: 3, changeLog: 'Updated liability coverage requirements and added new safety protocols' },
          ipAddress: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Chrome/121.0)'
        },
        {
          id: 'activity_002',
          documentId,
          userId: 'contractor_001',
          action: 'downloaded',
          timestamp: '2024-04-14T16:45:00Z',
          details: { version: 2 },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Safari/537.36)'
        },
        {
          id: 'activity_003',
          documentId,
          userId: 'contractor_002',
          action: 'viewed',
          timestamp: '2024-04-13T11:20:00Z',
          details: { version: 2 },
          ipAddress: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Firefox/115.0)'
        },
        {
          id: 'activity_004',
          documentId,
          userId: 'admin_001',
          action: 'uploaded',
          timestamp: '2024-02-20T14:30:00Z',
          details: { version: 2, changeLog: 'Revised payment terms section and corrected terminology in section 4.2' },
          ipAddress: '192.168.1.50',
          userAgent: 'Mozilla/5.0 (Chrome/121.0)'
        },
        {
          id: 'activity_005',
          documentId,
          userId: 'contractor_001',
          action: 'signed',
          timestamp: '2024-02-18T09:15:00Z',
          details: { version: 1 },
          ipAddress: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Safari/537.36)'
        }
      ];

      setDocument(mockDocument);
      setVersions(mockVersions);
      setActivities(mockActivities);
    } catch (error) {
      console.error('Error loading document data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else if (prev.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev[1], versionId];
      }
    });
  };

  const handleRestoreVersion = async (version: DocumentVersion) => {
    try {
      // Mock API call - replace with actual implementation
      const newVersion: DocumentVersion = {
        id: `version_${Date.now()}`,
        documentId,
        version: (document?.version || 0) + 1,
        fileName: version.fileName,
        fileSize: version.fileSize,
        uploadedBy: userId,
        uploadedAt: new Date().toISOString(),
        changeLog: `Restored from version ${version.version}`,
        storageUrl: version.storageUrl,
        checksum: version.checksum
      };

      setVersions(prev => [newVersion, ...prev]);
      if (document) {
        setDocument({
          ...document,
          version: newVersion.version,
          lastModifiedAt: newVersion.uploadedAt,
          checksum: newVersion.checksum
        });
      }
      setShowRestoreModal(null);
    } catch (error) {
      console.error('Error restoring version:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getActivityIcon = (action: ActivityAction) => {
    switch (action) {
      case 'uploaded': return <Upload className="w-4 h-4 text-blue-600" />;
      case 'downloaded': return <Download className="w-4 h-4 text-green-600" />;
      case 'viewed': return <Eye className="w-4 h-4 text-gray-600" />;
      case 'signed': return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'archived': return <Trash2 className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (action: ActivityAction) => {
    switch (action) {
      case 'uploaded': return 'bg-blue-50';
      case 'downloaded': return 'bg-green-50';
      case 'viewed': return 'bg-gray-50';
      case 'signed': return 'bg-purple-50';
      case 'approved': return 'bg-green-50';
      case 'rejected': return 'bg-red-50';
      case 'archived': return 'bg-orange-50';
      default: return 'bg-gray-50';
    }
  };

  const CompareVersionsModal = () => {
    if (!showCompareModal || selectedVersions.length !== 2) return null;

    const version1 = versions.find(v => v.id === selectedVersions[0]);
    const version2 = versions.find(v => v.id === selectedVersions[1]);

    if (!version1 || !version2) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-centre justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Compare Versions</h2>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-centre justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Version {version1.version}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(version1.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">File Size:</p>
                    <p className="text-gray-600">{formatFileSize(version1.fileSize)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Uploaded By:</p>
                    <p className="text-gray-600">{version1.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Changes:</p>
                    <p className="text-gray-600">{version1.changeLog}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-centre justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Version {version2.version}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(version2.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">File Size:</p>
                    <p className="text-gray-600">{formatFileSize(version2.fileSize)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Uploaded By:</p>
                    <p className="text-gray-600">{version2.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Changes:</p>
                    <p className="text-gray-600">{version2.changeLog}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Comparison Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• File size changed by {((version2.fileSize - version1.fileSize) / version1.fileSize * 100).toFixed(1)}%</p>
                <p>• {Math.abs(version2.version - version1.version)} version{Math.abs(version2.version - version1.version) !== 1 ? 's' : ''} apart</p>
                <p>• Time difference: {Math.floor((new Date(version2.uploadedAt).getTime() - new Date(version1.uploadedAt).getTime()) / (1000 * 60 * 60 * 24))} days</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setShowCompareModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Download Both Versions
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RestoreVersionModal = () => {
    if (!showRestoreModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Restore Version</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-centre space-x-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Are you sure you want to restore this version?</p>
                <p className="text-sm text-gray-600">This will create a new version based on the selected one.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">Version {showRestoreModal.version}</h4>
              <p className="text-sm text-gray-600 mt-1">{showRestoreModal.changeLog}</p>
              <p className="text-xs text-gray-500 mt-2">
                Created on {new Date(showRestoreModal.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setShowRestoreModal(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => handleRestoreVersion(showRestoreModal)}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Restore Version
            </button>
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
          <div className="bg-gray-200 rounded-xl h-32 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Version Control</h1>
          <p className="text-gray-600 mt-1">Track document changes and manage versions</p>
        </div>
        <div className="flex items-centre space-x-2">
          {selectedVersions.length === 2 && (
            <button 
              onClick={() => setShowCompareModal(true)}
              className="flex items-centre px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Compare className="w-4 h-4 mr-2" />
              Compare Versions
            </button>
          )}
        </div>
      </div>

      {document && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{document.title}</h2>
              <p className="text-gray-600">{document.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-600">v{document.version}</p>
              <p className="text-sm text-gray-500">Current Version</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">File Size</p>
              <p className="font-medium">{formatFileSize(document.fileSize)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Last Modified</p>
              <p className="font-medium">{new Date(document.lastModifiedAt).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Total Versions</p>
              <p className="font-medium">{versions.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Downloads</p>
              <p className="font-medium">{document.downloadCount}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['versions', 'activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-colours ${
              activeTab === tab 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'versions' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-centre justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
              {selectedVersions.length > 0 && (
                <div className="text-sm text-gray-600">
                  {selectedVersions.length} version{selectedVersions.length !== 1 ? 's' : ''} selected
                </div>
              )}
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {versions.map((version, index) => (
              <div 
                key={version.id} 
                className={`p-6 hover:bg-gray-50 transition-colours ${
                  selectedVersions.includes(version.id) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedVersions.includes(version.id)}
                      onChange={() => handleVersionSelect(version.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-centre space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Version {version.version}
                          {index === 0 && (
                            <span className="ml-2 inline-flex items-centre px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              <Star className="w-3 h-3 mr-1" />
                              Current
                            </span>
                          )}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatFileSize(version.fileSize)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{version.changeLog}</p>
                      
                      <div className="flex items-centre space-x-4 text-sm text-gray-500">
                        <div className="flex items-centre">
                          <User className="w-4 h-4 mr-1" />
                          {version.uploadedBy}
                        </div>
                        <div className="flex items-centre">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(version.uploadedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-centre">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(version.uploadedAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-centre space-x-2">
                    <button className="flex items-centre px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-centre px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    {index !== 0 && userRole === 'admin' && (
                      <button 
                        onClick={() => setShowRestoreModal(version)}
                        className="flex items-centre px-3 py-2 text-sm text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div key={activity.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.action)}`}>
                    {getActivityIcon(activity.action)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-centre justify-between mb-2">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {activity.action.replace('_', ' ')} Document
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      User: {activity.userId}
                      {activity.details.version && ` • Version ${activity.details.version}`}
                    </p>
                    
                    {activity.details.changeLog && (
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {activity.details.changeLog}
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      IP: {activity.ipAddress} • {activity.userAgent.split(' ')[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCompareModal && <CompareVersionsModal />}
      {showRestoreModal && <RestoreVersionModal />}
    </div>
  );
};

export default DocumentVersionControl;