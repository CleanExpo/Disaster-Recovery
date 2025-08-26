'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2, Link, Lock, Unlock, Eye, Download, Copy, Mail, Clock,
  Users, Shield, Key, Calendar, AlertTriangle, CheckCircle, XCircle,
  Settings, Trash2, RefreshCw, Plus, Activity, Globe, UserCheck
} from 'lucide-react';
import type { 
  DocumentShare, 
  SharePermissions, 
  ShareAccessEntry, 
  ShareType,
  Document 
} from '@/types/document-management';

interface SecureDocumentSharingProps {
  documentId?: string;
  userRole: 'admin' | 'contractor' | 'auditor';
  userId: string;
  className?: string;
}

const SecureDocumentSharing: React.FC<SecureDocumentSharingProps> = ({
  documentId,
  userRole,
  userId,
  className = ''
}) => {
  const [shares, setShares] = useState<DocumentShare[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAccessLog, setShowAccessLog] = useState<string | null>(null);
  const [shareForm, setShareForm] = useState({
    shareType: 'email' as ShareType,
    recipients: [''],
    permissions: {
      canView: true,
      canDownload: true,
      canShare: false,
      canComment: false,
      canEdit: false
    } as SharePermissions,
    password: '',
    expiryDate: '',
    downloadLimit: 0,
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShares();
    if (documentId) {
      loadDocument();
    }
  }, [documentId, userId]);

  const loadShares = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockShares: DocumentShare[] = [
        {
          id: 'share_001',
          documentId: 'doc_001',
          sharedBy: 'contractor_001',
          sharedWith: ['insurance@provider.com', 'adjuster@company.com'],
          shareType: 'email',
          permissions: {
            canView: true,
            canDownload: true,
            canShare: false,
            canComment: false,
            canEdit: false
          },
          password: 'temp123',
          expiryDate: '2024-05-15T23:59:59Z',
          downloadLimit: 5,
          downloadCount: 2,
          accessLog: [
            {
              id: 'access_001',
              accessedBy: 'insurance@provider.com',
              accessedAt: '2024-04-12T14:30:00Z',
              ipAddress: '192.168.1.100',
              userAgent: 'Mozilla/5.0...',
              action: 'viewed'
            },
            {
              id: 'access_002',
              accessedBy: 'adjuster@company.com',
              accessedAt: '2024-04-13T09:15:00Z',
              ipAddress: '192.168.1.101',
              userAgent: 'Chrome/90.0...',
              action: 'downloaded'
            }
          ],
          createdAt: '2024-04-10T10:00:00Z',
          isActive: true
        },
        {
          id: 'share_002',
          documentId: 'doc_002',
          sharedBy: 'admin_001',
          sharedWith: [],
          shareType: 'public_link',
          permissions: {
            canView: true,
            canDownload: false,
            canShare: false,
            canComment: true,
            canEdit: false
          },
          expiryDate: '2024-04-30T23:59:59Z',
          downloadLimit: 0,
          downloadCount: 15,
          accessLog: [
            {
              id: 'access_003',
              accessedBy: 'anonymous',
              accessedAt: '2024-04-14T16:45:00Z',
              ipAddress: '203.0.113.1',
              userAgent: 'Safari/537.36',
              action: 'viewed'
            }
          ],
          createdAt: '2024-04-08T12:00:00Z',
          isActive: true
        }
      ];

      setShares(mockShares);
    } catch (error) {
      console.error('Error loading shares:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDocument = async () => {
    try {
      // Mock document data - replace with actual API call
      const mockDocument: Document = {
        id: documentId || 'doc_001',
        title: 'General Liability Insurance Certificate',
        description: 'Current liability insurance certificate for contractor operations',
        fileName: 'liability_cert_2024.pdf',
        fileSize: 2048000,
        mimeType: 'application/pdf',
        category: 'insurance',
        tags: ['insurance', 'liability', '2024'],
        uploadedBy: 'contractor_001',
        uploadedAt: '2024-01-15T10:00:00Z',
        lastModifiedAt: '2024-01-15T10:00:00Z',
        version: 1,
        status: 'active',
        expiryDate: '2024-12-31T23:59:59Z',
        isRequired: true,
        accessLevel: 'contractor_only',
        downloadCount: 12,
        checksum: 'abc123',
        storageUrl: '/documents/liability_cert_2024.pdf',
        metadata: {
          contractorId: 'contractor_001',
          signatureRequired: false,
          relatedDocuments: [],
          customFields: {}
        }
      };

      setSelectedDocument(mockDocument);
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

  const handleCreateShare = async () => {
    try {
      // Mock API call - replace with actual implementation
      const newShare: DocumentShare = {
        id: `share_${Date.now()}`,
        documentId: selectedDocument?.id || '',
        sharedBy: userId,
        sharedWith: shareForm.recipients.filter(r => r.trim() !== ''),
        shareType: shareForm.shareType,
        permissions: shareForm.permissions,
        password: shareForm.password || undefined,
        expiryDate: shareForm.expiryDate || undefined,
        downloadLimit: shareForm.downloadLimit || undefined,
        downloadCount: 0,
        accessLog: [],
        createdAt: new Date().toISOString(),
        isActive: true
      };

      setShares(prev => [...prev, newShare]);
      setShowCreateModal(false);
      
      // Reset form
      setShareForm({
        shareType: 'email',
        recipients: [''],
        permissions: {
          canView: true,
          canDownload: true,
          canShare: false,
          canComment: false,
          canEdit: false
        },
        password: '',
        expiryDate: '',
        downloadLimit: 0,
        message: ''
      });
    } catch (error) {
      console.error('Error creating share:', error);
    }
  };

  const copyShareLink = (shareId: string) => {
    const shareUrl = `${window.location.origin}/shared/${shareId}`;
    navigator.clipboard.writeText(shareUrl);
    // Show toast notification
  };

  const revokeShare = async (shareId: string) => {
    try {
      setShares(prev => prev.map(share => 
        share.id === shareId 
          ? { ...share, isActive: false }
          : share
      ));
    } catch (error) {
      console.error('Error revoking share:', error);
    }
  };

  const getShareTypeIcon = (type: ShareType) => {
    switch (type) {
      case 'public_link': return <Globe className="w-5 h-5 text-blue-600" />;
      case 'email': return <Mail className="w-5 h-5 text-green-600" />;
      case 'user_specific': return <UserCheck className="w-5 h-5 text-purple-600" />;
      case 'organization': return <Users className="w-5 h-5 text-orange-600" />;
      default: return <Share2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const CreateShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Share Document</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {selectedDocument && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">{selectedDocument.title}</p>
              <p className="text-sm text-gray-600">
                {selectedDocument.fileName} • {formatFileSize(selectedDocument.fileSize)}
              </p>
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: 'email', label: 'Email Recipients', icon: <Mail className="w-4 h-4" /> },
                { value: 'public_link', label: 'Public Link', icon: <Globe className="w-4 h-4" /> },
                { value: 'user_specific', label: 'Specific Users', icon: <UserCheck className="w-4 h-4" /> },
                { value: 'organization', label: 'Organization', icon: <Users className="w-4 h-4" /> }
              ] as const).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setShareForm(prev => ({ ...prev, shareType: option.value }))}
                  className={`flex items-center p-3 border-2 rounded-lg transition-colors ${
                    shareForm.shareType === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.icon}
                  <span className="ml-2 text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {(shareForm.shareType === 'email' || shareForm.shareType === 'user_specific') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {shareForm.shareType === 'email' ? 'Email Addresses' : 'User IDs'}
              </label>
              <div className="space-y-2">
                {shareForm.recipients.map((recipient, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type={shareForm.shareType === 'email' ? 'email' : 'text'}
                      value={recipient}
                      onChange={(e) => {
                        const newRecipients = [...shareForm.recipients];
                        newRecipients[index] = e.target.value;
                        setShareForm(prev => ({ ...prev, recipients: newRecipients }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={shareForm.shareType === 'email' ? 'Enter email address' : 'Enter user ID'}
                    />
                    {shareForm.recipients.length > 1 && (
                      <button
                        onClick={() => {
                          const newRecipients = shareForm.recipients.filter((_, i) => i !== index);
                          setShareForm(prev => ({ ...prev, recipients: newRecipients }));
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setShareForm(prev => ({ ...prev, recipients: [...prev.recipients, ''] }))}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add {shareForm.shareType === 'email' ? 'Email' : 'User'}
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </label>
            <div className="space-y-3">
              {Object.entries({
                canView: 'Can view document',
                canDownload: 'Can download document',
                canShare: 'Can share with others',
                canComment: 'Can add comments',
                canEdit: 'Can edit document'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={shareForm.permissions[key as keyof SharePermissions]}
                    onChange={(e) => setShareForm(prev => ({
                      ...prev,
                      permissions: {
                        ...prev.permissions,
                        [key]: e.target.checked
                      }
                    }))}
                    className="mr-2"
                    disabled={key === 'canView'}
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Protection (Optional)
              </label>
              <input
                type="password"
                value={shareForm.password}
                onChange={(e) => setShareForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={shareForm.expiryDate}
                onChange={(e) => setShareForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Download Limit (0 = unlimited)
              </label>
              <input
                type="number"
                min="0"
                value={shareForm.downloadLimit}
                onChange={(e) => setShareForm(prev => ({ ...prev, downloadLimit: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              value={shareForm.message}
              onChange={(e) => setShareForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a message for recipients"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Share
          </button>
        </div>
      </div>
    </div>
  );

  const AccessLogModal = () => {
    const share = shares.find(s => s.id === showAccessLog);
    if (!share) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Access Log</h2>
              <button 
                onClick={() => setShowAccessLog(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {share.accessLog.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No access activity yet</p>
                </div>
              ) : (
                share.accessLog.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      entry.action === 'viewed' ? 'bg-blue-50' :
                      entry.action === 'downloaded' ? 'bg-green-50' :
                      'bg-gray-50'
                    }`}>
                      {entry.action === 'viewed' ? 
                        <Eye className="w-4 h-4 text-blue-600" /> :
                        entry.action === 'downloaded' ?
                        <Download className="w-4 h-4 text-green-600" /> :
                        <Activity className="w-4 h-4 text-gray-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{entry.accessedBy}</p>
                      <p className="text-sm text-gray-600 capitalize">{entry.action} document</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.accessedAt).toLocaleString()} • IP: {entry.ipAddress}
                      </p>
                    </div>
                  </div>
                ))
              )}
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
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
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
          <h1 className="text-2xl font-bold text-gray-900">Document Sharing</h1>
          <p className="text-gray-600 mt-1">Securely share documents with controlled access</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => loadShares()}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Create Share
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {shares.length === 0 ? (
          <div className="text-center py-12">
            <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shared documents</h3>
            <p className="text-gray-600 mb-4">Create your first document share to get started</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Share
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {shares.map((share) => (
              <div key={share.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getShareTypeIcon(share.shareType)}
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Document Share • {share.shareType.replace('_', ' ').toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Created {new Date(share.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {share.password && (
                          <div className="flex items-center text-xs text-gray-600 bg-yellow-50 px-2 py-1 rounded">
                            <Lock className="w-3 h-3 mr-1" />
                            Protected
                          </div>
                        )}
                        {share.expiryDate && (
                          <div className="flex items-center text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires {new Date(share.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className={`flex items-center text-xs px-2 py-1 rounded ${
                          share.isActive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {share.isActive ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                          {share.isActive ? 'Active' : 'Revoked'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Recipients</p>
                        <p className="font-medium">
                          {share.shareType === 'public_link' ? 'Public Link' : 
                           share.sharedWith.length > 0 ? share.sharedWith.join(', ') : 'No recipients'}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Access Count</p>
                        <p className="font-medium">{share.downloadCount} times</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Download Limit</p>
                        <p className="font-medium">
                          {share.downloadLimit ? `${share.downloadLimit} downloads` : 'Unlimited'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(share.permissions).filter(([_, value]) => value).map(([permission, _]) => (
                        <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {permission.replace('can', '').toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => copyShareLink(share.id)}
                      className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Link
                    </button>
                    <button
                      onClick={() => setShowAccessLog(share.id)}
                      className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Activity className="w-4 h-4 mr-1" />
                      Access Log
                    </button>
                    {share.isActive && (
                      <button
                        onClick={() => revokeShare(share.id)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && <CreateShareModal />}
      {showAccessLog && <AccessLogModal />}
    </div>
  );
};

export default SecureDocumentSharing;