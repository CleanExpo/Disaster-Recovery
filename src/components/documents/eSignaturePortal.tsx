'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText, Pen, Send, Clock, CheckCircle, XCircle, AlertCircle,
  Download, Eye, Mail, Users, Calendar, MapPin, Shield, Link,
  ArrowRight, ArrowLeft, Trash2, Copy, RefreshCw, Plus, Settings
} from 'lucide-react';
import type { 
  eSignatureRequest, 
  DocumentSigner, 
  SignatureField, 
  SignatureAuditEntry,
  SignatureStatus,
  SignerStatus
} from '@/types/document-management';

interface eSignaturePortalProps {
  userRole: 'admin' | 'contractor' | 'auditor';
  userId?: string;
  className?: string;
}

const eSignaturePortal: React.FC<eSignaturePortalProps> = ({
  userRole,
  userId,
  className = ''
}) => {
  const [signatureRequests, setSignatureRequests] = useState<eSignatureRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<eSignatureRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed' | 'drafts'>('pending');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [signaturePad, setSignaturePad] = useState<any>(null);
  const [currentSignerIndex, setCurrentSignerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadSignatureRequests();
  }, [userId, activeTab]);

  const loadSignatureRequests = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockRequests: eSignatureRequest[] = [
        {
          id: 'esig_001',
          documentId: 'doc_001',
          title: 'Network Participation Agreement',
          description: 'Annual network participation agreement for NRP contractors',
          requesterUserId: 'admin_001',
          status: 'in_progress',
          createdAt: '2024-04-10T10:00:00Z',
          dueDate: '2024-04-25T23:59:59Z',
          signers: [
            {
              id: 'signer_001',
              name: 'John Contractor',
              email: 'john@contractor.com',
              role: 'Contractor',
              order: 1,
              status: 'signed',
              signedAt: '2024-04-12T14:30:00Z',
              ipAddress: '192.168.1.100',
              userAgent: 'Mozilla/5.0...',
              signature: {
                type: 'drawn',
                data: 'data:image/png;base64,iVBOR...',
                timestamp: '2024-04-12T14:30:00Z',
                certificate: 'cert_001'
              },
              fields: []
            },
            {
              id: 'signer_002',
              name: 'Jane Admin',
              email: 'jane@nrp.com',
              role: 'NRP Administrator',
              order: 2,
              status: 'sent',
              signature: {
                type: 'drawn',
                data: '',
                timestamp: '',
                certificate: ''
              },
              fields: []
            }
          ],
          emailTemplate: 'default',
          reminderSettings: {
            enabled: true,
            firstReminderDays: 3,
            subsequentReminderDays: 2,
            maxReminders: 3
          },
          auditTrail: [
            {
              id: 'audit_001',
              timestamp: '2024-04-10T10:00:00Z',
              action: 'created',
              userId: 'admin_001',
              userEmail: 'admin@nrp.com',
              ipAddress: '192.168.1.50',
              userAgent: 'Mozilla/5.0...',
              details: { title: 'Network Participation Agreement' }
            },
            {
              id: 'audit_002',
              timestamp: '2024-04-10T10:05:00Z',
              action: 'sent',
              userId: 'admin_001',
              userEmail: 'admin@nrp.com',
              ipAddress: '192.168.1.50',
              userAgent: 'Mozilla/5.0...',
              details: { recipients: ['john@contractor.com', 'jane@nrp.com'] }
            }
          ],
          settings: {
            requireAuth: true,
            allowDelegation: false,
            sequentialSigning: true,
            reminderFrequency: 2,
            expirationDays: 30,
            passwordProtected: false,
            downloadRestrictions: false
          }
        },
        {
          id: 'esig_002',
          documentId: 'doc_002',
          title: 'Compliance Declaration Form',
          description: 'Quarterly compliance declaration for all contractors',
          requesterUserId: 'admin_001',
          status: 'completed',
          createdAt: '2024-04-05T09:00:00Z',
          completedAt: '2024-04-08T16:45:00Z',
          signers: [
            {
              id: 'signer_003',
              name: 'Mike Contractor',
              email: 'mike@contractor.com',
              role: 'Contractor',
              order: 1,
              status: 'signed',
              signedAt: '2024-04-08T16:45:00Z',
              signature: {
                type: 'typed',
                data: 'Mike Contractor',
                timestamp: '2024-04-08T16:45:00Z',
                certificate: 'cert_002'
              },
              fields: []
            }
          ],
          emailTemplate: 'compliance',
          reminderSettings: {
            enabled: true,
            firstReminderDays: 2,
            subsequentReminderDays: 1,
            maxReminders: 5
          },
          auditTrail: [],
          settings: {
            requireAuth: false,
            allowDelegation: true,
            sequentialSigning: false,
            reminderFrequency: 1,
            expirationDays: 15,
            passwordProtected: false,
            downloadRestrictions: true
          }
        }
      ];

      setSignatureRequests(mockRequests);
    } catch (error) {
      console.error('Error loading signature requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: SignatureStatus | SignerStatus) => {
    switch (status) {
      case 'completed':
      case 'signed': return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'sent':
      case 'opened': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: SignatureStatus | SignerStatus) => {
    switch (status) {
      case 'completed':
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
      case 'sent':
      case 'opened': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
      case 'declined': return <XCircle className="w-4 h-4" />;
      case 'expired': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredRequests = signatureRequests.filter(request => {
    switch (activeTab) {
      case 'pending': return ['draft', 'sent', 'in_progress'].includes(request.status);
      case 'completed': return request.status === 'completed';
      case 'drafts': return request.status === 'draft';
      default: return true;
    }
  });

  const CreateSignatureRequest = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create Signature Request</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter document title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the document"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date (Optional)
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Signers
            </label>
            <div className="space-y-3">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4 mr-1" />
                Add Signer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Sequential signing</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Require authentication</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Enable reminders</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Password protected</span>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
            Save as Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send for Signature
          </button>
        </div>
      </div>
    </div>
  );

  const SignatureRequestDetail = () => {
    if (!selectedRequest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedRequest.title}</h2>
                <p className="text-gray-600 mt-1">{selectedRequest.description}</p>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  {getStatusIcon(selectedRequest.status)}
                  <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                    {selectedRequest.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Status</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="ml-2 text-sm font-medium">
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Created Date</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="ml-2 text-sm font-medium">
                    {selectedRequest.signers.length} signer{selectedRequest.signers.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total Signers</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Signature Progress</h3>
              <div className="space-y-4">
                {selectedRequest.signers.map((signer, index) => (
                  <div key={signer.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        signer.status === 'signed' ? 'bg-green-100' :
                        signer.status === 'sent' || signer.status === 'opened' ? 'bg-blue-100' :
                        'bg-gray-100'
                      }`}>
                        {signer.status === 'signed' ? 
                          <CheckCircle className="w-4 h-4 text-green-600" /> :
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        }
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{signer.name}</p>
                          <p className="text-sm text-gray-600">{signer.email}</p>
                          <p className="text-xs text-gray-500">{signer.role}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signer.status)}`}>
                            {signer.status.replace('_', ' ').toUpperCase()}
                          </span>
                          {signer.signedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Signed: {new Date(signer.signedAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {signer.status === 'pending' && (
                        <button className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50">
                          <Send className="w-4 h-4 mr-1" />
                          Send Reminder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail</h3>
              <div className="space-y-3">
                {selectedRequest.auditTrail.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-1 bg-white rounded">
                      <Shield className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {entry.action.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">{entry.userEmail}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()} • IP: {entry.ipAddress}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </button>
            {selectedRequest.status !== 'completed' && (
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Request
              </button>
            )}
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
          <div className="flex space-x-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
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
          <h1 className="text-2xl font-bold text-gray-900">eSignature Portal</h1>
          <p className="text-gray-600 mt-1">Create, send, and track document signatures</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </button>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(['pending', 'completed', 'drafts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeTab === tab 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab} signature requests
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'pending' ? 'All signature requests are complete' : 
               activeTab === 'drafts' ? 'Create your first signature request' :
               'No completed signature requests yet'}
            </p>
            {activeTab !== 'completed' && (
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Signature Request
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status.replace('_', ' ').toUpperCase()}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created: {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      {request.dueDate && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {new Date(request.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {request.signers.length} signer{request.signers.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {request.signers.filter(s => s.status === 'signed').length} / {request.signers.length} signed
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ 
                            width: `${(request.signers.filter(s => s.status === 'signed').length / request.signers.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && <CreateSignatureRequest />}
      {selectedRequest && <SignatureRequestDetail />}
    </div>
  );
};

export default eSignaturePortal;