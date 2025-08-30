'use client';

import { useState, useEffect } from 'react';
import { Upload, FileText, Image, Calendar, MapPin, DollarSign, AlertTriangle, CheckCircle, Plus, X, Eye } from 'lucide-react';
import { DocumentUpload } from './DocumentUpload';

interface ProofOfWorkEvidence {
  id: string;
  type: 'BEFORE_PHOTO' | 'AFTER_PHOTO' | 'INVOICE' | 'COMPLETION_CERTIFICATE' | 'CLIENT_TESTIMONIAL' | 'INSURANCE_REPORT';
  url: string;
  description: string;
  uploadedAt: string;
}

interface ProofOfWorkClaim {
  id?: string;
  workType: string;
  projectName: string;
  clientName: string;
  clientContact: string;
  projectAddress: string;
  completionDate: string;
  projectValue: number;
  projectDescription: string;
  damageType: string[];
  propertyType: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'INSTITUTIONAL';
  emergencyResponse: boolean;
  insuranceClaim: boolean;
  insuranceCompany?: string;
  evidence: ProofOfWorkEvidence[];
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationNotes?: string;
}

interface ProofOfWorkSubmissionProps {
  contractorId: string;
  requiredWorkTypes: string[];
  onSubmissionComplete?: (claims: ProofOfWorkClaim[]) => void;
}

const WORK_TYPES = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'mould-remediation',
  'storm-damage-repair',
  'flood-recovery',
  'sewage-cleanup',
  'biohazard-cleaning',
  'trauma-scene-cleaning',
  'vandalism-repair',
  'emergency-board-up'
];

const DAMAGE_TYPES = [
  'Water Damage', 'Fire Damage', 'Smoke Damage', 'Mould Growth',
  'Storm Damage', 'Flood Damage', 'Sewage Overflow', 'Biohazard',
  'Trauma Scene', 'Vandalism', 'Structural Damage', 'Contents Damage'
];

const EVIDENCE_TYPES = [
  { value: 'BEFORE_PHOTO', label: 'Before Photos', required: true },
  { value: 'AFTER_PHOTO', label: 'After Photos', required: true },
  { value: 'INVOICE', label: 'Invoice/Receipt', required: true },
  { value: 'COMPLETION_CERTIFICATE', label: 'Completion Certificate', required: false },
  { value: 'CLIENT_TESTIMONIAL', label: 'Client Testimonial', required: false },
  { value: 'INSURANCE_REPORT', label: 'Insurance Report', required: false },
];

export default function ProofOfWorkSubmission({
  contractorId,
  requiredWorkTypes,
  onSubmissionComplete
}: ProofOfWorkSubmissionProps) {
  const [claims, setClaims] = useState<ProofOfWorkClaim[]>([]);
  const [currentClaim, setCurrentClaim] = useState<ProofOfWorkClaim | null>(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize empty claims for each required work type
  useEffect(() => {
    const initialClaims = requiredWorkTypes.map(workType => ({
      workType,
      projectName: '',
      clientName: '',
      clientContact: '',
      projectAddress: '',
      completionDate: '',
      projectValue: 0,
      projectDescription: '',
      damageType: [],
      propertyType: 'RESIDENTIAL' as const,
      emergencyResponse: false,
      insuranceClaim: false,
      evidence: [],
      verificationStatus: 'PENDING' as const,
    }));
    setClaims(initialClaims);
  }, [requiredWorkTypes]);

  const openClaimForm = (workType: string) => {
    const existingClaim = claims.find(c => c.workType === workType);
    setCurrentClaim(existingClaim || {
      workType,
      projectName: '',
      clientName: '',
      clientContact: '',
      projectAddress: '',
      completionDate: '',
      projectValue: 0,
      projectDescription: '',
      damageType: [],
      propertyType: 'RESIDENTIAL',
      emergencyResponse: false,
      insuranceClaim: false,
      evidence: [],
      verificationStatus: 'PENDING',
    });
    setShowClaimForm(true);
  };

  const saveClaim = (claim: ProofOfWorkClaim) => {
    setClaims(prev => {
      const updated = prev.filter(c => c.workType !== claim.workType);
      return [...updated, claim];
    });
    setShowClaimForm(false);
    setCurrentClaim(null);
  };

  const removeClaim = (workType: string) => {
    setClaims(prev => prev.filter(c => c.workType !== workType));
  };

  const submitAllClaims = async () => {
    setSubmitting(true);
    try {
      // Validate all claims have minimum required evidence
      for (const claim of claims) {
        const requiredEvidence = EVIDENCE_TYPES.filter(et => et.required);
        const hasAllRequired = requiredEvidence.every(required =>
          claim.evidence.some(ev => ev.type === required.value)
        );
        
        if (!hasAllRequired) {
          throw new Error(`Claim for ${claim.workType} is missing required evidence`);
        }
      }

      // Submit to API
      const response = await fetch('/api/proof-of-work/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          claims
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit proof of work claims');
      }

      const result = await response.json();
      
      if (onSubmissionComplete) {
        onSubmissionComplete(result.claims);
      }

      alert('Proof of work claims submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting claims:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit claims');
    } finally {
      setSubmitting(false);
    }
  };

  const isClaimComplete = (workType: string) => {
    const claim = claims.find(c => c.workType === workType);
    if (!claim) return false;

    const hasBasicInfo = claim.projectName && claim.clientName && claim.completionDate && claim.projectValue > 0;
    const requiredEvidence = EVIDENCE_TYPES.filter(et => et.required);
    const hasAllRequired = requiredEvidence.every(required =>
      claim.evidence.some(ev => ev.type === required.value)
    );

    return hasBasicInfo && hasAllRequired;
  };

  const getCompletionCount = () => {
    return requiredWorkTypes.filter(workType => isClaimComplete(workType)).length;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proof of Work Submission
          </h2>
          <p className="text-gray-600 mb-6">
            You must provide evidence of at least 5 completed projects for each work type you wish to be certified for. 
            Each claim requires before/after photos, invoices, and project details.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-centre gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Submission Requirements</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Minimum 5 claims per work type category</li>
              <li>• Before and after photos showing clear damage and restoration</li>
              <li>• Original invoices or receipts proving payment</li>
              <li>• Valid client contact details for verification calls</li>
              <li>• Projects completed within the last 3 years</li>
              <li>• Minimum project value of $1,000 per claim</li>
            </ul>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-centre justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Progress Overview</h3>
              <span className="text-sm text-gray-600">
                {getCompletionCount()} of {requiredWorkTypes.length} work types completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getCompletionCount() / requiredWorkTypes.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Work Type Cards */}
        <div className="space-y-6 mb-8">
          {requiredWorkTypes.map((workType) => {
            const claim = claims.find(c => c.workType === workType);
            const isComplete = isClaimComplete(workType);
            
            return (
              <div key={workType} className={`
                border-2 rounded-lg p-6 transition-all
                ${isComplete ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}
              `}>
                <div className="flex items-centre justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {workType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-gray-600">
                      {claim ? `${claim.evidence.length} evidence items uploaded` : 'No evidence submitted yet'}
                    </p>
                  </div>
                  
                  <div className="flex items-centre gap-3">
                    {isComplete && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    
                    <button
                      onClick={() => openClaimForm(workType)}
                      className="flex items-centre gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      {claim ? <Eye className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {claim ? 'View/Edit' : 'Add Claims'}
                    </button>
                  </div>
                </div>

                {claim && (
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Recent Project</p>
                      <p className="text-gray-600">{claim.projectName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Evidence Items</p>
                      <p className="text-gray-600">{claim.evidence.length} files</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Status</p>
                      <span className={`
                        inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      `}>
                        {isComplete ? 'Complete' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Complete all {requiredWorkTypes.length} work types to proceed with certification
              </p>
            </div>
            <button
              onClick={submitAllClaims}
              disabled={submitting || getCompletionCount() !== requiredWorkTypes.length}
              className="flex items-centre gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit All Claims
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Claim Form Modal */}
      {showClaimForm && currentClaim && (
        <ClaimFormModal
          claim={currentClaim}
          onSave={saveClaim}
          onClose={() => {
            setShowClaimForm(false);
            setCurrentClaim(null);
          }}
          contractorId={contractorId}
        />
      )}
    </div>
  );
}

// Separate component for the claim form modal
function ClaimFormModal({
  claim,
  onSave,
  onClose,
  contractorId
}: {
  claim: ProofOfWorkClaim;
  onSave: (claim: ProofOfWorkClaim) => void;
  onClose: () => void;
  contractorId: string;
}) {
  const [formData, setFormData] = useState<ProofOfWorkClaim>(claim);
  const [activeTab, setActiveTab] = useState<'details' | 'evidence'>('details');

  const handleSave = () => {
    // Validate required fields
    if (!formData.projectName || !formData.clientName || !formData.completionDate || formData.projectValue <= 0) {
      alert('Please fill in all required project details');
      return;
    }

    onSave(formData);
  };

  const addEvidence = (evidence: ProofOfWorkEvidence) => {
    setFormData(prev => ({
      ...prev,
      evidence: [...prev.evidence, evidence]
    }));
  };

  const removeEvidence = (evidenceId: string) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter(e => e.id !== evidenceId)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-centre justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {formData.workType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Claims
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'details' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Project Details
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'evidence' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Evidence ({formData.evidence.length})
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' ? (
            <ProjectDetailsForm formData={formData} setFormData={setFormData} />
          ) : (
            <EvidenceUploadSection
              evidence={formData.evidence}
              onAddEvidence={addEvidence}
              onRemoveEvidence={removeEvidence}
              contractorId={contractorId}
            />
          )}
        </div>

        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Claim
          </button>
        </div>
      </div>
    </div>
  );
}

// Project details form component
function ProjectDetailsForm({
  formData,
  setFormData
}: {
  formData: ProofOfWorkClaim;
  setFormData: (data: ProofOfWorkClaim) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          value={formData.projectName}
          onChange={(e) => setFormData({...formData, projectName: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Residential Water Damage Restoration"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Name *
        </label>
        <input
          type="text"
          value={formData.clientName}
          onChange={(e) => setFormData({...formData, clientName: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Client or company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Contact *
        </label>
        <input
          type="text"
          value={formData.clientContact}
          onChange={(e) => setFormData({...formData, clientContact: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Phone or email for verification"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Address *
        </label>
        <input
          type="text"
          value={formData.projectAddress}
          onChange={(e) => setFormData({...formData, projectAddress: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Full address of project site"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Completion Date *
        </label>
        <input
          type="date"
          value={formData.completionDate}
          onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Value (AUD) *
        </label>
        <input
          type="number"
          min="1000"
          value={formData.projectValue}
          onChange={(e) => setFormData({...formData, projectValue: Number(e.target.value)})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Minimum $1,000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type *
        </label>
        <select
          value={formData.propertyType}
          onChange={(e) => setFormData({...formData, propertyType: e.target.value as any})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="INDUSTRIAL">Industrial</option>
          <option value="INSTITUTIONAL">Institutional</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Insurance Company
        </label>
        <input
          type="text"
          value={formData.insuranceCompany || ''}
          onChange={(e) => setFormData({...formData, insuranceCompany: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="If insurance claim"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Damage Types
        </label>
        <div className="flex flex-wrap gap-2">
          {DAMAGE_TYPES.map(type => (
            <label key={type} className="flex items-centre gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.damageType.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({...formData, damageType: [...formData.damageType, type]});
                  } else {
                    setFormData({...formData, damageType: formData.damageType.filter(t => t !== type)});
                  }
                }}
                className="rounded border-gray-300"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          value={formData.projectDescription}
          onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed description of the damage, restoration process, and outcome"
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex gap-6">
          <label className="flex items-centre gap-2">
            <input
              type="checkbox"
              checked={formData.emergencyResponse}
              onChange={(e) => setFormData({...formData, emergencyResponse: e.target.checked})}
              className="rounded border-gray-300"
            />
            Emergency Response (24/7 call-out)
          </label>

          <label className="flex items-centre gap-2">
            <input
              type="checkbox"
              checked={formData.insuranceClaim}
              onChange={(e) => setFormData({...formData, insuranceClaim: e.target.checked})}
              className="rounded border-gray-300"
            />
            Insurance Claim
          </label>
        </div>
      </div>
    </div>
  );
}

// Evidence upload section component
function EvidenceUploadSection({
  evidence,
  onAddEvidence,
  onRemoveEvidence,
  contractorId
}: {
  evidence: ProofOfWorkEvidence[];
  onAddEvidence: (evidence: ProofOfWorkEvidence) => void;
  onRemoveEvidence: (evidenceId: string) => void;
  contractorId: string;
}) {
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string>('BEFORE_PHOTO');

  const handleEvidenceUpload = (result: any) => {
    const newEvidence: ProofOfWorkEvidence = {
      id: Date.now().toString(),
      type: selectedEvidenceType as any,
      url: result.documentUrl,
      description: `${selectedEvidenceType.replace(/_/g, ' ')} - ${result.file.name}`,
      uploadedAt: new Date().toISOString(),
    };
    onAddEvidence(newEvidence);
  };

  const getEvidenceTypeCount = (type: string) => {
    return evidence.filter(e => e.type === type).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Evidence Type
        </label>
        <select
          value={selectedEvidenceType}
          onChange={(e) => setSelectedEvidenceType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {EVIDENCE_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label} {type.required ? '(Required)' : '(Optional)'} - {getEvidenceTypeCount(type.value)} uploaded
            </option>
          ))}
        </select>
      </div>

      {/* Upload Component */}
      <DocumentUpload
        contractorId={contractorId}
        documentType="PROOF_OF_WORK"
        title={`Upload ${EVIDENCE_TYPES.find(et => et.value === selectedEvidenceType)?.label}`}
        description="Upload clear, high-quality images or documents that support this proof of work claim"
        onUploadComplete={handleEvidenceUpload}
      />

      {/* Existing Evidence */}
      {evidence.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Uploaded Evidence ({evidence.length})</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {evidence.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      {EVIDENCE_TYPES.find(et => et.value === item.type)?.label}
                    </p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button
                    onClick={() => onRemoveEvidence(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements Checklist */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Evidence Requirements</h4>
        <div className="space-y-2">
          {EVIDENCE_TYPES.map(type => {
            const count = getEvidenceTypeCount(type.value);
            const isComplete = type.required ? count > 0 : true;
            
            return (
              <div key={type.value} className="flex items-centre justify-between text-sm">
                <span className={isComplete ? 'text-green-700' : 'text-red-700'}>
                  {type.label} {type.required && '*'}
                </span>
                <div className="flex items-centre gap-2">
                  <span className="text-gray-600">{count} uploaded</span>
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}