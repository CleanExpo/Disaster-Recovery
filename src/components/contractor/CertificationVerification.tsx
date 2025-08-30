'use client';

import { useState, useEffect } from 'react';
import { Upload, Shield, CheckCircle, AlertTriangle, Clock, X, ExternalLink, Phone, Calendar, FileText, Award } from 'lucide-react';
import { DocumentUpload } from './DocumentUpload';

interface Certification {
  id: string;
  type: 'IICRC' | 'BLUE_CARD' | 'WHITE_CARD' | 'WWC' | 'POLICE_CHECK' | 'ASBESTOS_AWARENESS' | 'CONFINED_SPACE' | 'WORKING_AT_HEIGHTS' | 'FIRST_AID' | 'FIRE_SAFETY' | 'OTHER';
  certificationNumber?: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'INVALID';
  documentUrl?: string;
  verificationNotes?: string;
  autoVerified: boolean;
  lastVerifiedDate?: string;
}

interface CertificationVerificationProps {
  contractorId: string;
  requiredCertifications: string[];
  onVerificationComplete?: (certifications: Certification[]) => void;
}

const CERTIFICATION_TYPES = [
  {
    type: 'IICRC',
    name: 'IICRC Certification',
    description: 'Institute of Inspection, Cleaning and Restoration Certification',
    required: true,
    categories: ['Water Damage', 'Fire & Smoke', 'Applied Microbial Remediation', 'Upholstery & Fabric'],
    verificationMethod: 'ONLINE_DATABASE',
    renewalPeriod: 12, // months
    website: 'https://www.iicrc.org/consumers/find-a-professional'
  },
  {
    type: 'BLUE_CARD',
    name: 'Blue Card (Construction)',
    description: 'Queensland Construction Industry White/Blue Card',
    required: true,
    verificationMethod: 'GOVERNMENT_DATABASE',
    renewalPeriod: 36,
    website: 'https://www.worksafe.qld.gov.au/'
  },
  {
    type: 'WHITE_CARD',
    name: 'White Card (General Construction)',
    description: 'General Construction Induction Card',
    required: true,
    verificationMethod: 'GOVERNMENT_DATABASE',
    renewalPeriod: null, // No expiry
    website: 'https://www.safeworkaustralia.gov.au/'
  },
  {
    type: 'WWC',
    name: 'Working with Children Check',
    description: 'Required for work in schools, childcare, residential properties with minors',
    required: true,
    verificationMethod: 'GOVERNMENT_DATABASE',
    renewalPeriod: 36,
    website: 'https://www.ccyp.wa.gov.au/working-with-children/apply-for-a-wwc-check/'
  },
  {
    type: 'POLICE_CHECK',
    name: 'National Police Check',
    description: 'National criminal background check',
    required: true,
    verificationMethod: 'MANUAL_REVIEW',
    renewalPeriod: 12,
    website: 'https://www.acic.gov.au/services/national-police-checks'
  },
  {
    type: 'ASBESTOS_AWARENESS',
    name: 'Asbestos Awareness Training',
    description: 'Required for buildings constructed before 1990',
    required: false,
    verificationMethod: 'DOCUMENT_VERIFICATION',
    renewalPeriod: 24,
  },
  {
    type: 'CONFINED_SPACE',
    name: 'Confined Space Entry',
    description: 'Required for basement, tank, and enclosed space work',
    required: false,
    verificationMethod: 'DOCUMENT_VERIFICATION',
    renewalPeriod: 36,
  },
  {
    type: 'WORKING_AT_HEIGHTS',
    name: 'Working at Heights',
    description: 'Required for multi-story building work',
    required: false,
    verificationMethod: 'DOCUMENT_VERIFICATION',
    renewalPeriod: 24,
  },
  {
    type: 'FIRST_AID',
    name: 'First Aid Certificate',
    description: 'Current first aid certification',
    required: false,
    verificationMethod: 'DOCUMENT_VERIFICATION',
    renewalPeriod: 36,
  },
  {
    type: 'FIRE_SAFETY',
    name: 'Fire Safety Training',
    description: 'Fire safety and emergency response training',
    required: false,
    verificationMethod: 'DOCUMENT_VERIFICATION',
    renewalPeriod: 12,
  }
];

export default function CertificationVerification({
  contractorId,
  requiredCertifications,
  onVerificationComplete
}: CertificationVerificationProps) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  // Load existing certifications
  useEffect(() => {
    loadCertifications();
  }, [contractorId]);

  const loadCertifications = async () => {
    try {
      const response = await fetch(`/api/certifications?contractorId=${contractorId}`);
      if (response.ok) {
        const data = await response.json();
        setCertifications(data.certifications || []);
      }
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
  };

  const addCertification = async (certData: Partial<Certification>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/certifications/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          ...certData
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCertifications(prev => [...prev, result.certification]);
        setShowAddModal(false);
        setSelectedCert(null);
        
        // Auto-verify if possible
        if (result.certification.type === 'IICRC' && result.certification.certificationNumber) {
          verifyCertification(result.certification.id);
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification');
    } finally {
      setLoading(false);
    }
  };

  const verifyCertification = async (certificationId: string) => {
    try {
      setVerifying(certificationId);
      const response = await fetch('/api/certifications/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificationId }),
      });

      if (response.ok) {
        const result = await response.json();
        setCertifications(prev =>
          prev.map(cert =>
            cert.id === certificationId ? { ...cert, ...result.certification } : cert
          )
        );
      } else {
        const errorData = await response.json();
        alert(`Verification error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error verifying certification:', error);
      alert('Failed to verify certification');
    } finally {
      setVerifying(null);
    }
  };

  const removeCertification = async (certificationId: string) => {
    if (!confirm('Are you sure you want to remove this certification?')) return;

    try {
      const response = await fetch(`/api/certifications/${certificationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCertifications(prev => prev.filter(cert => cert.id !== certificationId));
      } else {
        alert('Failed to remove certification');
      }
    } catch (error) {
      console.error('Error removing certification:', error);
      alert('Failed to remove certification');
    }
  };

  const submitAllCertifications = async () => {
    try {
      setLoading(true);

      // Check if all required certifications are present and verified
      const requiredCertTypes = CERTIFICATION_TYPES
        .filter(ct => requiredCertifications.includes(ct.type))
        .map(ct => ct.type);

      const missingRequired = requiredCertTypes.filter(type =>
        !certifications.find(cert => cert.type === type && cert.verificationStatus === 'VERIFIED')
      );

      if (missingRequired.length > 0) {
        alert(`Missing required certifications: ${missingRequired.join(', ')}`);
        return;
      }

      const response = await fetch('/api/certifications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          certificationIds: certifications.map(c => c.id)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (onVerificationComplete) {
          onVerificationComplete(certifications);
        }
        alert('Certifications submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Submission error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting certifications:', error);
      alert('Failed to submit certifications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'text-green-600 bg-green-100';
      case 'EXPIRED': return 'text-red-600 bg-red-100';
      case 'INVALID': return 'text-red-600 bg-red-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED': return <CheckCircle className="w-4 h-4" />;
      case 'EXPIRED': return <AlertTriangle className="w-4 h-4" />;
      case 'INVALID': return <X className="w-4 h-4" />;
      case 'PENDING': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const isExpiryWarning = (cert: Certification) => {
    if (!cert.expiryDate) return false;
    const expiry = new Date(cert.expiryDate);
    const warningDate = new Date();
    warningDate.setMonth(warningDate.getMonth() + 1); // 1 month warning
    return expiry <= warningDate;
  };

  const getCompletionCount = () => {
    const requiredCertTypes = CERTIFICATION_TYPES
      .filter(ct => requiredCertifications.includes(ct.type))
      .map(ct => ct.type);

    return requiredCertTypes.filter(type =>
      certifications.find(cert => cert.type === type && cert.verificationStatus === 'VERIFIED')
    ).length;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Certification Verification
          </h2>
          <p className="text-gray-600 mb-6">
            Upload and verify your professional certifications, licenses, and training credentials. 
            All certifications are automatically verified against official databases where possible.
          </p>

          {/* Progress Overview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-centre justify-between mb-4">
              <h3 className="font-semibold text-blue-900">Certification Progress</h3>
              <span className="text-sm text-blue-700">
                {getCompletionCount()} of {requiredCertifications.length} required certifications verified
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getCompletionCount() / requiredCertifications.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>✓ Automatic verification against official databases</div>
              <div>✓ Expiry date monitoring and renewal reminders</div>
              <div>✓ Secure document storage and encryption</div>
              <div>✓ Real-time status updates and notifications</div>
            </div>
          </div>
        </div>

        {/* Required Certifications */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Certifications</h3>
          <div className="grid gap-4">
            {CERTIFICATION_TYPES
              .filter(certType => requiredCertifications.includes(certType.type))
              .map((certType) => {
                const existingCert = certifications.find(c => c.type === certType.type);
                const isComplete = existingCert?.verificationStatus === 'VERIFIED';
                
                return (
                  <div key={certType.type} className={`
                    border-2 rounded-lg p-6 transition-all
                    ${isComplete ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}
                  `}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-centre gap-3 mb-2">
                          <Shield className={`w-6 h-6 ${isComplete ? 'text-green-600' : 'text-gray-400'}`} />
                          <h4 className="text-lg font-semibold text-gray-900">{certType.name}</h4>
                          {isComplete && <CheckCircle className="w-5 h-5 text-green-600" />}
                        </div>
                        <p className="text-gray-600 mb-3">{certType.description}</p>
                        
                        {existingCert && (
                          <div className="space-y-2">
                            <div className="flex items-centre gap-2">
                              {getStatusIcon(existingCert.verificationStatus)}
                              <span className={`
                                inline-flex px-2 py-1 text-xs font-medium rounded-full
                                ${getStatusColor(existingCert.verificationStatus)}
                              `}>
                                {existingCert.verificationStatus}
                              </span>
                              {existingCert.autoVerified && (
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                  Auto-verified
                                </span>
                              )}
                            </div>
                            
                            {existingCert.certificationNumber && (
                              <p className="text-sm text-gray-600">
                                <strong>Number:</strong> {existingCert.certificationNumber}
                              </p>
                            )}
                            
                            {existingCert.expiryDate && (
                              <div className="flex items-centre gap-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className={`text-sm ${
                                  isExpiryWarning(existingCert) ? 'text-red-600 font-medium' : 'text-gray-600'
                                }`}>
                                  Expires: {new Date(existingCert.expiryDate).toLocaleDateString('en-AU')}
                                </span>
                                {isExpiryWarning(existingCert) && (
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {certType.website && (
                          <a
                            href={certType.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-centre gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Verify Online
                          </a>
                        )}
                      </div>

                      <div className="flex items-centre gap-2">
                        {existingCert && existingCert.verificationStatus === 'PENDING' && (
                          <button
                            onClick={() => verifyCertification(existingCert.id)}
                            disabled={verifying === existingCert.id}
                            className="flex items-centre gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {verifying === existingCert.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                Verifying...
                              </>
                            ) : (
                              <>
                                <Shield className="w-3 h-3" />
                                Verify
                              </>
                            )}
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedCert(certType.type);
                            setShowAddModal(true);
                          }}
                          className={`flex items-centre gap-2 px-4 py-2 rounded-lg transition ${
                            existingCert
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {existingCert ? (
                            <>
                              <FileText className="w-4 h-4" />
                              Update
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Upload
                            </>
                          )}
                        </button>
                        
                        {existingCert && (
                          <button
                            onClick={() => removeCertification(existingCert.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Optional Certifications */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Certifications</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 mb-4">
              Add additional certifications to increase your qualification score and access to specialised work types.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {CERTIFICATION_TYPES
                .filter(certType => !requiredCertifications.includes(certType.type))
                .map((certType) => {
                  const existingCert = certifications.find(c => c.type === certType.type);
                  
                  return (
                    <div key={certType.type} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-centre justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{certType.name}</h5>
                          <p className="text-sm text-gray-600">{certType.description}</p>
                          {existingCert && (
                            <span className={`
                              inline-flex px-2 py-1 text-xs font-medium rounded-full mt-2
                              ${getStatusColor(existingCert.verificationStatus)}
                            `}>
                              {existingCert.verificationStatus}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCert(certType.type);
                            setShowAddModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {existingCert ? 'Update' : 'Add'}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Complete all required certifications to proceed with onboarding
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Certifications are verified against official databases and renewal dates are monitored
              </p>
            </div>
            <button
              onClick={submitAllCertifications}
              disabled={loading || getCompletionCount() !== requiredCertifications.length}
              className="flex items-centre gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  Submit Certifications
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add Certification Modal */}
      {showAddModal && selectedCert && (
        <AddCertificationModal
          certificationType={selectedCert}
          contractorId={contractorId}
          onClose={() => {
            setShowAddModal(false);
            setSelectedCert(null);
          }}
          onSave={addCertification}
        />
      )}
    </div>
  );
}

// Modal component for adding/editing certifications
function AddCertificationModal({
  certificationType,
  contractorId,
  onClose,
  onSave
}: {
  certificationType: string;
  contractorId: string;
  onClose: () => void;
  onSave: (certData: Partial<Certification>) => void;
}) {
  const certType = CERTIFICATION_TYPES.find(ct => ct.type === certificationType);
  const [formData, setFormData] = useState({
    certificationNumber: '',
    issuingAuthority: certType?.name || '',
    issueDate: '',
    expiryDate: '',
    documentUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.issuingAuthority || !formData.issueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate expiry date if renewal period is known
    let calculatedExpiryDate = formData.expiryDate;
    if (!calculatedExpiryDate && certType?.renewalPeriod) {
      const issueDate = new Date(formData.issueDate);
      issueDate.setMonth(issueDate.getMonth() + certType.renewalPeriod);
      calculatedExpiryDate = issueDate.toISOString().split('T')[0];
    }

    onSave({
      type: certificationType as any,
      certificationNumber: formData.certificationNumber || undefined,
      issuingAuthority: formData.issuingAuthority,
      issueDate: formData.issueDate,
      expiryDate: calculatedExpiryDate || undefined,
      documentUrl: formData.documentUrl || undefined,
      verificationStatus: 'PENDING',
      autoVerified: false,
    });
  };

  const handleDocumentUpload = (result: any) => {
    setFormData(prev => ({ ...prev, documentUrl: result.documentUrl }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-centre justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              Add {certType?.name}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          {certType?.description && (
            <p className="text-gray-600 mt-2">{certType.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification/License Number
              </label>
              <input
                type="text"
                value={formData.certificationNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, certificationNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter certification number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing Authority *
              </label>
              <input
                type="text"
                value={formData.issuingAuthority}
                onChange={(e) => setFormData(prev => ({ ...prev, issuingAuthority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., IICRC, WorkSafe QLD"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date {certType?.renewalPeriod && `(Auto-calculated: ${certType.renewalPeriod} months)`}
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <DocumentUpload
              contractorId={contractorId}
              documentType="CERTIFICATION"
              title="Upload Certification Document"
              description="Upload a clear photo or scan of your certification/license"
              onUploadComplete={handleDocumentUpload}
            />
          </div>

          {/* Verification Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Automatic Verification</p>
                <p>
                  {certType?.verificationMethod === 'ONLINE_DATABASE' && 
                    'This certification will be automatically verified against the official database.'}
                  {certType?.verificationMethod === 'GOVERNMENT_DATABASE' && 
                    'This certification will be verified against government records.'}
                  {certType?.verificationMethod === 'DOCUMENT_VERIFICATION' && 
                    'This certification will be manually reviewed by our team.'}
                  {certType?.verificationMethod === 'MANUAL_REVIEW' && 
                    'This document requires manual verification and may take 1-2 business days.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Certification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}