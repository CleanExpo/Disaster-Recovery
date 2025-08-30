'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Calendar,
  Clock,
  User,
  FileText,
  Shield,
  Link,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Paperclip,
  Camera,
  Award,
  MessageSquare,
  Globe
} from 'lucide-react';
import { 
  ClientCommunication,
  CommunicationType,
  CommunicationStatus,
  TechnicianProfile,
  ServiceDetail,
  Document,
  CommunicationTracking
} from '@/types/clean-claims-integration';

interface CommunicationTemplate {
  id: string;
  type: CommunicationType;
  name: string;
  subject: string;
  body: string;
  attachments: string[];
  isDefault: boolean;
}

interface EmailPreview {
  to: string;
  subject: string;
  html: string;
  attachments: Document[];
}

const ClientCommunicationWorkflow: React.FC = () => {
  const [communications, setCommunications] = useState<ClientCommunication[]>([]);
  const [templates, setTemplates] = useState<CommunicationTemplate[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<ClientCommunication | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CommunicationTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [emailPreview, setEmailPreview] = useState<EmailPreview | null>(null);
  const [filterType, setFilterType] = useState<CommunicationType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<CommunicationStatus | 'all'>('all');

  useEffect(() => {
    loadCommunications();
    loadTemplates();
  }, []);

  const loadCommunications = () => {
    // Mock communications data
    const mockCommunications: ClientCommunication[] = [
      {
        id: 'COMM001',
        jobId: 'JOB001',
        clientId: 'CLIENT001',
        type: 'pre_visit_introduction',
        status: 'scheduled',
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        content: {
          subject: 'Your Upcoming Restoration Service - Meet Your Team',
          body: '',
          technicianProfiles: [
            {
              technicianId: 'T001',
              name: 'John Smith',
              photo: '/api/placeholder/100/100',
              credentials: ['IICRC WRT', 'IICRC ASD'],
              bio: 'Senior restoration technician with 10+ years experience',
              role: 'Lead Technician',
              isExpertBackup: false
            },
            {
              technicianId: 'T002',
              name: 'Sarah Johnson',
              photo: '/api/placeholder/100/100',
              credentials: ['IICRC FSRT'],
              bio: 'Fire damage specialist',
              role: 'Support Technician',
              isExpertBackup: false
            },
            {
              technicianId: 'T003',
              name: 'Michael Chen',
              photo: '/api/placeholder/100/100',
              credentials: ['IICRC WRT', 'Biohazard Certified'],
              bio: 'Expert team member available for consultation',
              role: 'Senior Expert',
              isExpertBackup: true
            }
          ],
          serviceDetails: [
            {
              serviceType: 'Water Damage Restoration',
              description: 'Complete water extraction and structural drying',
              expectedDuration: '3-5 days',
              requirements: ['Clear access to affected areas', 'Power availability'],
              reminders: ['Please secure pets', 'Move valuable items if possible']
            }
          ],
          slaDocument: {
            id: 'DOC001',
            type: 'sla',
            name: 'Service Level Agreement',
            url: '/documents/sla.pdf',
            version: '2.1',
            customizedFor: 'Water Damage Services'
          }
        },
        attachments: [],
        tracking: {
          opens: 0,
          clicks: 0,
          bounces: 0,
          unsubscribes: 0,
          events: []
        }
      },
      {
        id: 'COMM002',
        jobId: 'JOB002',
        clientId: 'CLIENT002',
        type: 'digital_contract',
        status: 'sent',
        sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        openedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        content: {
          subject: 'Digital Contract & Portal Access - Elite Restoration Co',
          body: '',
          slaDocument: {
            id: 'DOC002',
            type: 'contract',
            name: 'Service Contract',
            url: '/documents/contract.pdf',
            version: '1.0',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        },
        attachments: [
          {
            id: 'ATT001',
            filename: 'privacy-policy.pdf',
            mimeType: 'application/pdf',
            size: 245000,
            url: '/documents/privacy-policy.pdf',
            uploadedAt: new Date().toISOString()
          }
        ],
        tracking: {
          emailId: 'EM001',
          opens: 3,
          clicks: 2,
          bounces: 0,
          unsubscribes: 0,
          events: [
            { type: 'open', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
            { type: 'click', timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
          ]
        }
      },
      {
        id: 'COMM003',
        jobId: 'JOB003',
        clientId: 'CLIENT003',
        type: 'portal_invitation',
        status: 'delivered',
        sentAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        content: {
          subject: 'Access Your Restoration Project Portal',
          body: ''
        },
        attachments: [],
        tracking: {
          opens: 1,
          clicks: 1,
          bounces: 0,
          unsubscribes: 0,
          events: []
        }
      }
    ];

    setCommunications(mockCommunications);
  };

  const loadTemplates = () => {
    // Mock template data
    const mockTemplates: CommunicationTemplate[] = [
      {
        id: 'TEMP001',
        type: 'pre_visit_introduction',
        name: 'Pre-Visit Introduction',
        subject: 'Your Upcoming {{serviceType}} Service - Meet Your Team',
        body: `
          <h2>Hello {{clientName}},</h2>
          <p>We're looking forward to helping you with your restoration needs. Your service is scheduled for {{serviceDate}}.</p>
          
          <h3>Meet Your Restoration Team:</h3>
          {{technicianProfiles}}
          
          <h3>Service Details:</h3>
          {{serviceDetails}}
          
          <h3>Important Reminders:</h3>
          {{reminders}}
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
        `,
        attachments: ['sla', 'company-profile'],
        isDefault: true
      },
      {
        id: 'TEMP002',
        type: 'digital_contract',
        name: 'Digital Contract & Access',
        subject: 'Your Service Contract & Portal Access',
        body: `
          <h2>Dear {{clientName}},</h2>
          <p>Please find your service contract and portal access details below.</p>
          
          <h3>Contract Details:</h3>
          <p>Contract Number: {{contractNumber}}</p>
          <p>Service Period: {{startDate}} - {{endDate}}</p>
          
          <h3>Portal Access:</h3>
          <p>Access your project portal to:</p>
          <ul>
            <li>Track progress in real-time</li>
            <li>Upload photos and documents</li>
            <li>Communicate with your team</li>
            <li>View all documentation</li>
          </ul>
          
          <a href="{{portalUrl}}" style="display:inline-block;padding:12px 24px;background:#3B82F6;colour:white;text-decoration:none;border-radius:6px;">Access Portal</a>
        `,
        attachments: ['contract', 'privacy-policy', 'terms'],
        isDefault: true
      }
    ];

    setTemplates(mockTemplates);
  };

  const handleSendCommunication = (commId: string) => {
    setCommunications(comms => 
      comms.map(comm => 
        comm.id === commId 
          ? { ...comm, status: 'sent', sentAt: new Date().toISOString() }
          : comm
      )
    );
  };

  const generateEmailPreview = (communication: ClientCommunication) => {
    // Generate HTML preview
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
          .header { background: #3B82F6; colour: white; padding: 20px; text-align: centre; }
          .content { padding: 20px; }
          .team-member { display: flex; align-items: centre; margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
          .team-member img { width: 80px; height: 80px; border-radius: 50%; margin-right: 20px; }
          .credentials { display: flex; gap: 10px; margin-top: 10px; }
          .credential { background: #3B82F6; colour: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          .service-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #3B82F6; margin: 15px 0; }
          .button { display: inline-block; padding: 12px 24px; background: #3B82F6; colour: white; text-decoration: none; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${communication.content.subject}</h1>
        </div>
        <div class="content">
    `;

    if (communication.content.technicianProfiles) {
      html += '<h2>Your Restoration Team</h2>';
      communication.content.technicianProfiles.forEach(tech => {
        html += `
          <div class="team-member">
            <img src="${tech.photo || '/api/placeholder/80/80'}" alt="${tech.name}">
            <div>
              <h3>${tech.name} - ${tech.role}</h3>
              <p>${tech.bio}</p>
              <div class="credentials">
                ${tech.credentials.map(c => `<span class="credential">${c}</span>`).join('')}
              </div>
              ${tech.isExpertBackup ? '<p style="colour: #059669; font-weight: bold;">✓ Senior Expert on Call</p>' : ''}
            </div>
          </div>
        `;
      });
    }

    if (communication.content.serviceDetails) {
      html += '<h2>Service Details</h2>';
      communication.content.serviceDetails.forEach(service => {
        html += `
          <div class="service-box">
            <h3>${service.serviceType}</h3>
            <p>${service.description}</p>
            <p><strong>Expected Duration:</strong> ${service.expectedDuration}</p>
            ${service.requirements ? `
              <p><strong>Requirements:</strong></p>
              <ul>${service.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
            ` : ''}
            ${service.reminders ? `
              <p><strong>Important Reminders:</strong></p>
              <ul>${service.reminders.map(r => `<li>${r}</li>`).join('')}</ul>
            ` : ''}
          </div>
        `;
      });
    }

    if (communication.type === 'portal_invitation') {
      html += `
        <div style="text-align: centre; margin: 40px 0;">
          <h2>Access Your Project Portal</h2>
          <p>View progress, upload photos, and communicate with your team</p>
          <a href="#" class="button">Launch Portal</a>
        </div>
      `;
    }

    html += `
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: centre; colour: #666; font-size: 12px;">
            <p>Elite Restoration Co • 123 Main St, Sydney NSW 2000</p>
            <p>Phone: +61 2 9000 1234 • Email: info@eliterestore.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    setEmailPreview({
      to: 'client@example.com',
      subject: communication.content.subject,
      html,
      attachments: communication.content.slaDocument ? [communication.content.slaDocument] : []
    });
    setShowPreview(true);
  };

  const getStatusIcon = (status: CommunicationStatus) => {
    switch (status) {
      case 'sent': return Send;
      case 'delivered': return CheckCircle;
      case 'opened': return Eye;
      case 'scheduled': return Calendar;
      case 'failed': return AlertCircle;
      default: return FileText;
    }
  };

  const getStatusColor = (status: CommunicationStatus) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: CommunicationType) => {
    switch (type) {
      case 'pre_visit_introduction': return User;
      case 'service_description': return FileText;
      case 'digital_contract': return Shield;
      case 'portal_invitation': return Globe;
      case 'progress_update': return MessageSquare;
      default: return Mail;
    }
  };

  const filteredCommunications = communications.filter(comm => {
    const matchesType = filterType === 'all' || comm.type === filterType;
    const matchesStatus = filterStatus === 'all' || comm.status === filterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-centre justify-between mb-4">
          <div className="flex items-centre space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Client Communication Workflow</h2>
              <p className="text-sm text-gray-500">Automated client engagement and transparency</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-centre space-x-2">
            <Send className="h-4 w-4" />
            <span>New Communication</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Total Sent</p>
            <p className="text-2xl font-semibold">156</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Delivered</p>
            <p className="text-2xl font-semibold text-green-600">148</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Opened</p>
            <p className="text-2xl font-semibold text-purple-600">132</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Scheduled</p>
            <p className="text-2xl font-semibold text-yellow-600">8</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Open Rate</p>
            <p className="text-2xl font-semibold text-blue-600">84.6%</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-centre justify-between">
          <div className="flex items-centre space-x-2">
            <label className="text-sm font-medium">Type:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Types</option>
              <option value="pre_visit_introduction">Pre-Visit</option>
              <option value="digital_contract">Contract</option>
              <option value="portal_invitation">Portal Invite</option>
              <option value="service_description">Service Info</option>
            </select>
          </div>
          <div className="flex items-centre space-x-2">
            <label className="text-sm font-medium">Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Communications List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200">
          {filteredCommunications.map((comm) => {
            const TypeIcon = getTypeIcon(comm.type);
            const StatusIcon = getStatusIcon(comm.status);
            
            return (
              <div
                key={comm.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedCommunication(comm)}
              >
                <div className="flex items-centre justify-between">
                  <div className="flex items-centre space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <TypeIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{comm.content.subject}</p>
                      <div className="flex items-centre space-x-4 mt-1 text-sm text-gray-600">
                        <span>Job #{comm.jobId}</span>
                        <span>Client #{comm.clientId}</span>
                        <span className="capitalize">{comm.type.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-centre space-x-4">
                    {/* Tracking Stats */}
                    {comm.tracking && comm.status !== 'scheduled' && (
                      <div className="flex items-centre space-x-3 text-sm">
                        <div className="flex items-centre space-x-1">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span>{comm.tracking.opens}</span>
                        </div>
                        <div className="flex items-centre space-x-1">
                          <Link className="h-4 w-4 text-gray-400" />
                          <span>{comm.tracking.clicks}</span>
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-centre space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-centre space-x-1 ${
                        getStatusColor(comm.status)
                      }`}>
                        <StatusIcon className="h-3 w-3" />
                        <span>{comm.status}</span>
                      </span>
                    </div>

                    {/* Time */}
                    <div className="text-right">
                      {comm.status === 'scheduled' && comm.scheduledFor && (
                        <>
                          <p className="text-xs text-gray-500">Scheduled</p>
                          <p className="text-sm">{new Date(comm.scheduledFor).toLocaleString()}</p>
                        </>
                      )}
                      {comm.sentAt && (
                        <>
                          <p className="text-xs text-gray-500">Sent</p>
                          <p className="text-sm">{new Date(comm.sentAt).toLocaleString()}</p>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-centre space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          generateEmailPreview(comm);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      {comm.status === 'scheduled' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendCommunication(comm.id);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Send Now"
                        >
                          <Send className="h-4 w-4 text-blue-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technician Profiles Preview */}
                {comm.content.technicianProfiles && comm.content.technicianProfiles.length > 0 && (
                  <div className="mt-3 flex items-centre space-x-2">
                    <span className="text-xs text-gray-500">Team:</span>
                    {comm.content.technicianProfiles.slice(0, 3).map((tech) => (
                      <div key={tech.technicianId} className="flex items-centre space-x-1">
                        {tech.photo ? (
                          <img
                            src={tech.photo}
                            alt={tech.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200" />
                        )}
                        <span className="text-xs">{tech.name}</span>
                      </div>
                    ))}
                    {comm.content.technicianProfiles.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{comm.content.technicianProfiles.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Attachments */}
                {comm.attachments && comm.attachments.length > 0 && (
                  <div className="mt-3 flex items-centre space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {comm.attachments.length} attachment{comm.attachments.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Email Preview Modal */}
      {showPreview && emailPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex items-centre justify-between">
              <h3 className="text-lg font-semibold">Email Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-4 border-b bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium w-20">To:</span>
                  <span>{emailPreview.to}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-20">Subject:</span>
                  <span>{emailPreview.subject}</span>
                </div>
                {emailPreview.attachments.length > 0 && (
                  <div className="flex">
                    <span className="font-medium w-20">Attachments:</span>
                    <div className="flex items-centre space-x-2">
                      {emailPreview.attachments.map((doc) => (
                        <span key={doc.id} className="px-2 py-1 bg-white rounded border flex items-centre space-x-1">
                          <FileText className="h-3 w-3" />
                          <span>{doc.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <div dangerouslySetInnerHTML={{ __html: emailPreview.html }} />
            </div>

            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCommunicationWorkflow;