'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, X, Clock, AlertTriangle, FileText, Image, MapPin, Calendar, DollarSign, MessageSquare} from 'lucide-react';
import Link from 'next/link';

interface ProofOfWorkClaim {
  id: string;
  contractorId: string;
  workType: string;
  projectName: string;
  clientName: string;
  clientContact: string;
  projectAddress: string;
  completionDate: string;
  projectValue: number;
  projectDescription: string;
  damageType: string[];
  propertyType: string;
  emergencyResponse: boolean;
  insuranceClaim: boolean;
  insuranceCompany?: string;
  evidence: Array<{
    type: string;
    url: string;
    description: string;
    uploadedAt: string;
  }>;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationNotes?: string;
  submittedAt: string;
  contractor: {
    email: string;
    businessName: string | null;
    status: string;
  };
}

interface Statistics {
  total: number;
  byVerificationStatus: Record<string, number>;
  byWorkType: Record<string, number>;
}

export default function ProofOfWorkAdmin() {
  const [claims, setClaims] = useState<ProofOfWorkClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics>({ 
    total: 0, 
    byVerificationStatus: {}, 
    byWorkType: {} 
  });
  
  const [selectedClaim, setSelectedClaim] = useState<ProofOfWorkClaim | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const [filters, setFilters] = useState({
    workType: '',
    verificationStatus: '',
    propertyType: '',
    search: ''
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  const fetchClaims = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.workType && { workType: filters.workType }),
        ...(filters.verificationStatus && { verificationStatus: filters.verificationStatus }) });

      const response = await fetch(`/api/proof-of-work/submit?${params}`);
      const data = await response.json();

      if (data.claims) {
        setClaims(data.claims);
        setPagination(data.pagination);
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error('Error fetching proof of work claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateClaimStatus = async (claimId: string, status: string, notes?: string) => {
    try {
      const response = await fetch(`/api/proof-of-work/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId,
          verificationStatus: status,
          verificationNotes: notes }) });

      if (response.ok) {
        await fetchClaims(); // Refresh the list
        setShowReviewModal(false);
        setSelectedClaim(null);
        alert(`Claim ${status.toLowerCase()} successfully`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating claim status:', error);
      alert('Failed to update claim status');
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [filters]);

  const workTypes = [
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

  const propertyTypes = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'INSTITUTIONAL'];
  const verificationStatuses = ['PENDING', 'VERIFIED', 'REJECTED'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'text-green-600 bg-green-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED': return <CheckCircle className="w-4 h-4" />;
      case 'REJECTED': return <X className="w-4 h-4" />;
      case 'PENDING': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'BEFORE_PHOTO':
      case 'AFTER_PHOTO':
        return <Image className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Proof of Work Review</h1>
              <p className="text-gray-600">
                Review and verify contractor project evidence for certification approval
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Claims</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{statistics.byVerificationStatus.PENDING || 0}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-3xl font-bold text-green-600">{statistics.byVerificationStatus.VERIFIED || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{statistics.byVerificationStatus.REJECTED || 0}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
              <select
                value={filters.workType}
                onChange={(e) => setFilters({...filters, workType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Work Types</option>
                {workTypes.map(type => (
                  <option key={type} value={type}>
                    {type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.verificationStatus}
                onChange={(e) => setFilters({...filters, verificationStatus: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {verificationStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Property Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contractor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-500">Loading proof of work claims...</p>
                    </td>
                  </tr>
                ) : claims.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-gray-500">No proof of work claims found</p>
                    </td>
                  </tr>
                ) : claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{claim.projectName}</div>
                        <div className="text-sm text-gray-500">{claim.clientName}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(claim.completionDate).toLocaleDateString('en-AU')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {claim.contractor.businessName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">{claim.contractor.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {claim.workType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className="text-xs text-gray-500">{claim.propertyType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${claim.projectValue.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {claim.emergencyResponse && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Emergency</span>
                        )}
                        {claim.insuranceClaim && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Insurance</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {claim.evidence.map((evidence, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                            {getEvidenceIcon(evidence.type)}
                            <span>{evidence.type.replace(/_/g, ' ')}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {claim.evidence.length} items
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(claim.verificationStatus)}
                        <span className={`
                          inline-flex px-2 py-1 text-xs font-medium rounded-full
                          ${getStatusColor(claim.verificationStatus)}
                        `}>
                          {claim.verificationStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedClaim(claim);
                          setShowReviewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                  {pagination.total} results
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchClaims(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchClaims(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedClaim && (
        <ClaimReviewModal
          claim={selectedClaim}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedClaim(null);
          }}
          onUpdateStatus={updateClaimStatus}
        />
      )}
    </div>
  );
}

// Separate component for the review modal
function ClaimReviewModal({
  claim,
  onClose,
  onUpdateStatus
}: {
  claim: ProofOfWorkClaim;
  onClose: () => void;
  onUpdateStatus: (claimId: string, status: string, notes?: string) => void;
}) {
  const [verificationNotes, setVerificationNotes] = useState(claim.verificationNotes || '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Review Proof of Work</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Project Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Name</label>
                  <p className="text-sm text-gray-900">{claim.projectName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Client</label>
                  <p className="text-sm text-gray-900">{claim.clientName}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {claim.clientContact}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {claim.projectAddress}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Completion Date</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(claim.completionDate).toLocaleDateString('en-AU')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Project Details</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Work Type</label>
                  <p className="text-sm text-gray-900">
                    {claim.workType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Property Type</label>
                  <p className="text-sm text-gray-900">{claim.propertyType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Value</label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ${claim.projectValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Damage Types</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {claim.damageType.map(type => (
                      <span key={type} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                {claim.insuranceCompany && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Insurance Company</label>
                    <p className="text-sm text-gray-900">{claim.insuranceCompany}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Project Description</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">
              {claim.projectDescription}
            </p>
          </div>

          {/* Evidence */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Evidence ({claim.evidence.length} items)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {claim.evidence.map((evidence, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {evidence.type.includes('PHOTO') ? (
                      <Image className="w-4 h-4 text-gray-600" />
                    ) : (
                      <FileText className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {evidence.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{evidence.description}</p>
                  <a
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    View Evidence →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Notes
            </label>
            <textarea
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add notes about your verification decision..."
            />
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={() => onUpdateStatus(claim.id, 'REJECTED', verificationNotes)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <X className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => onUpdateStatus(claim.id, 'VERIFIED', verificationNotes)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}