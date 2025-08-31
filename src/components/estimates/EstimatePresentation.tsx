'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  Eye, 
  Check,
  X,
  AlertTriangle,
  Shield,
  Calendar,
  User,
  Building,
  Mail,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Info
} from 'lucide-react';
import { JobEstimate, EstimateLineItem, EstimateTotals } from '@/types/estimate-generation';

interface EstimatePresentationProps {
  estimate: JobEstimate;
  clientView?: boolean;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
}

const EstimatePresentation: React.FC<EstimatePresentationProps> = ({
  estimate,
  clientView = false,
  onApprove,
  onReject,
  onDownload,
  onSend
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'scope' | 'comparison'>('overview');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colours: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      pending_review: 'bg-yellow-100 text-yellow-800',
      sent_to_client: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colours[status] || 'bg-gray-100 text-gray-800';
  };

  const getDamageLevelColor = (level: string) => {
    const colours: Record<string, string> = {
      minimal: 'text-green-600',
      moderate: 'text-yellow-600',
      significant: 'text-orange-600',
      severe: 'text-red-600',
      total_loss: 'text-red-800'
    };
    return colours[level] || 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Estimate #{estimate.estimateNumber}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(estimate.status)}`}>
                {estimate.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600">Version {estimate.version} • {estimate.type} Estimate</p>
            {estimate.claimNumber && (
              <p className="text-sm text-gray-500 mt-1">Claim #: {estimate.claimNumber}</p>
            )}
          </div>

          <div className="flex space-x-3">
            {!clientView && (
              <>
                <button
                  onClick={onSend}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send to Client
                </button>
                <button
                  onClick={onDownload}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </>
            )}
            {clientView && estimate.status === 'sent_to_client' && (
              <>
                <button
                  onClick={onApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Estimate
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Request Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Key Information */}
        <div className="grid grid-cols-4 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(estimate.totals.total)}</p>
            <p className="text-xs text-gray-500">Inc. GST</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Valid Until</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(estimate.validUntil).toLocaleDateString('en-AU')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Assessment Date</p>
            <p className="text-lg font-semibold text-gray-900">
              {new Date(estimate.assessment.assessmentDate).toLocaleDateString('en-AU')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Duration</p>
            <p className="text-lg font-semibold text-gray-900">
              {estimate.scope.timeline.estimatedDuration} days
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {['overview', 'breakdown', 'scope', 'comparison'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'comparison' ? 'Price Comparison' : tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Property Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-gray-600" />
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="font-medium flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      {estimate.assessment.propertyDetails.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Property Type</p>
                    <p className="font-medium capitalize">{estimate.assessment.propertyDetails.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Area</p>
                    <p className="font-medium">{estimate.assessment.propertyDetails.totalArea} sqm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Affected Area</p>
                    <p className="font-medium text-orange-600">{estimate.assessment.propertyDetails.affectedArea} sqm</p>
                  </div>
                </div>
              </div>

              {/* Damage Assessment */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Damage Assessment
                </h3>
                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Primary Cause</p>
                      <p className="font-semibold capitalize">{estimate.assessment.damageAssessment.primaryCause.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">IICRC Category</p>
                      <p className="font-semibold">Category {estimate.assessment.damageAssessment.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">IICRC Class</p>
                      <p className="font-semibold">Class {estimate.assessment.damageAssessment.class}</p>
                    </div>
                  </div>
                  {estimate.assessment.damageAssessment.hazardLevel !== 'none' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm font-medium text-red-800">
                        Hazard Level: {estimate.assessment.damageAssessment.hazardLevel.toUpperCase()}
                      </p>
                      {estimate.assessment.damageAssessment.contaminants && (
                        <p className="text-sm text-red-600 mt-1">
                          Contaminants: {estimate.assessment.damageAssessment.contaminants.join(', ')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Technician Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  Assessment Technician
                </h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium">{estimate.assessment.technician.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {estimate.assessment.technician.certifications.map((cert, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 mt-0.5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Compliance & Standards</p>
                    <p className="text-sm text-blue-800 mt-1">
                      This estimate complies with IICRC S500-2021 standards and Australian Consumer Law requirements.
                    </p>
                    {estimate.metadata.compliance.buildingCodes.length > 0 && (
                      <p className="text-xs text-blue-700 mt-2">
                        Building Codes: {estimate.metadata.compliance.buildingCodes.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Tab */}
          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estimate.lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.description}</p>
                            {item.notes && (
                              <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(item.unitPrice)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(item.totalPrice)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                            {item.source.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        Subtotal
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        {formatCurrency(estimate.totals.subtotal)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        Contingency (10%)
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        {formatCurrency(estimate.totals.contingency)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        GST
                      </td>
                      <td className="px-6 py-3 text-sm font-bold text-gray-900">
                        {formatCurrency(estimate.totals.gst)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right text-lg font-bold text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-3 text-lg font-bold text-blue-600">
                        {formatCurrency(estimate.totals.total)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Category Totals */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-blue-600">Labour Total</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(estimate.totals.labourTotal)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm text-purple-600">Equipment Total</p>
                  <p className="text-xl font-bold text-purple-900">
                    {formatCurrency(estimate.totals.equipmentTotal)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-green-600">Materials Total</p>
                  <p className="text-xl font-bold text-green-900">
                    {formatCurrency(estimate.totals.materialsTotal)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Scope Tab */}
          {activeTab === 'scope' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Scope Summary</h3>
                <p className="text-gray-600">{estimate.scope.summary}</p>
              </div>

              {/* Work Phases */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Work Phases</h3>
                <div className="space-y-4">
                  {estimate.scope.phases.map((phase) => (
                    <div key={phase.phase} className="bg-gray-50 rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">
                          Phase {phase.phase}: {phase.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {phase.duration} days
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                      <div className="space-y-1">
                        {phase.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Exclusions</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <ul className="space-y-2">
                    {estimate.scope.exclusions.map((exclusion, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <X className="h-4 w-4 mr-2 text-yellow-600 mt-0.5" />
                        <span>{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quality Standards */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quality Standards</h3>
                <div className="grid grid-cols-2 gap-3">
                  {estimate.scope.qualityStandards.map((standard, idx) => (
                    <div key={idx} className="flex items-center text-sm bg-blue-50 p-2 rounded">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{standard}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-3 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Price Transparency</p>
                    <p className="text-sm text-blue-800 mt-1">
                      This estimate shows comparisons between NRP guidelines, contractor rates, and industry averages to ensure fair and transparent pricing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">NRP Guideline</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Contractor Rate</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Industry Avg</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Selected</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Variance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {estimate.comparisons.map((comparison, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {comparison.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          {formatCurrency(comparison.nrpTotal)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          {formatCurrency(comparison.contractorTotal)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          {formatCurrency(comparison.industryAverage)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-bold text-blue-600">
                          {formatCurrency(comparison.selectedPrice)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            Math.abs(comparison.variance) <= 5 
                              ? 'bg-green-100 text-green-800'
                              : Math.abs(comparison.variance) <= 10
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {comparison.variance > 0 ? '+' : ''}{comparison.variance.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Variance shows the percentage difference between the selected price and NRP guidelines. 
                  Variances within ±10% are considered standard market rates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Important Notice</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>{estimate.metadata.disclaimer.text}</p>
          {estimate.metadata.disclaimer.sections.map((section, idx) => (
            <div key={idx} className={section.emphasis === 'highlighted' ? 'bg-yellow-50 p-3 rounded' : ''}>
              <p className="font-semibold">{section.title}</p>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Request Changes</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full h-32 px-3 py-2 border rounded resize-none"
              placeholder="Please describe what changes you would like..."
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReject?.(rejectReason);
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimatePresentation;