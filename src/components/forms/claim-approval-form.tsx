'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  AlertCircle,
  Upload,
  X,
} from 'lucide-react';

interface ClaimApprovalFormProps {
  claimId: string;
  claimNumber: string;
  customerName: string;
  claimAmount: number;
  claimReason: string;
  submissionDate: string;
  onApprove: (data: ApprovalData) => void;
  onReject: (data: RejectionData) => void;
}

interface ApprovalData {
  claimId: string;
  status: 'approved';
  approvalAmount: number;
  approvalNotes: string;
  documents: File[];
}

interface RejectionData {
  claimId: string;
  status: 'rejected';
  rejectionReason: string;
  rejectionNotes: string;
}

export default function ClaimApprovalForm({
  claimId,
  claimNumber,
  customerName,
  claimAmount,
  claimReason,
  submissionDate,
  onApprove,
  onReject,
}: ClaimApprovalFormProps) {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [approvalAmount, setApprovalAmount] = useState(claimAmount);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (approvalAmount <= 0) {
      newErrors.approvalAmount = 'Approval amount must be greater than 0';
    }

    if (approvalAmount > claimAmount) {
      newErrors.approvalAmount = 'Approval amount cannot exceed claim amount';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onApprove({
        claimId,
        status: 'approved',
        approvalAmount,
        approvalNotes,
        documents: uploadedDocs,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!rejectionReason) {
      newErrors.rejectionReason = 'Rejection reason is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onReject({
        claimId,
        status: 'rejected',
        rejectionReason,
        rejectionNotes,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedDocs((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeDocument = (index: number) => {
    setUploadedDocs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Claim Review & Decision
        </h2>
        <p className="text-slate-600">
          Review the insurance claim and approve or reject it
        </p>
      </div>

      {/* Claim Summary */}
      <div className="bg-slate-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Claim Number</p>
            <p className="font-semibold text-slate-900">{claimNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Customer Name</p>
            <p className="font-semibold text-slate-900">{customerName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Claim Amount (AUD)</p>
            <p className="font-semibold text-slate-900">${claimAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Submission Date</p>
            <p className="font-semibold text-slate-900">{submissionDate}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-600 mb-1">Claim Reason</p>
          <p className="font-semibold text-slate-900">{claimReason}</p>
        </div>
      </div>

      {/* Action Selection */}
      {!action ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setAction('approve')}
            className="flex items-center justify-center gap-3 p-6 border-2 border-green-300 rounded-lg hover:bg-green-50 transition-colors"
          >
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-semibold text-green-900">Approve Claim</p>
              <p className="text-sm text-green-700">Accept and process</p>
            </div>
          </button>
          <button
            onClick={() => setAction('reject')}
            className="flex items-center justify-center gap-3 p-6 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <XCircle className="w-6 h-6 text-red-600" />
            <div className="text-left">
              <p className="font-semibold text-red-900">Reject Claim</p>
              <p className="text-sm text-red-700">Deny and notify</p>
            </div>
          </button>
        </div>
      ) : null}

      {/* Approval Form */}
      {action === 'approve' && (
        <form onSubmit={handleApprove} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Approve Claim</h3>
            <button
              type="button"
              onClick={() => setAction(null)}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Approval Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Approval Amount (AUD)
            </label>
            <input
              type="number"
              value={approvalAmount}
              onChange={(e) => {
                setApprovalAmount(Number(e.target.value));
                if (errors.approvalAmount) {
                  setErrors((prev) => ({ ...prev, approvalAmount: '' }));
                }
              }}
              step="0.01"
              min="0"
              max={claimAmount}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.approvalAmount && (
              <p className="text-sm text-red-600 mt-1">{errors.approvalAmount}</p>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Claim amount: ${claimAmount.toFixed(2)}
            </p>
          </div>

          {/* Approval Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Approval Notes
            </label>
            <textarea
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              placeholder="Add any notes about this approval..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Supporting Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-3">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="doc-upload"
              />
              <label
                htmlFor="doc-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-sm font-medium text-slate-900">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-slate-500">
                  PDF, images, or documents up to 10MB
                </span>
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedDocs.length > 0 && (
              <div className="space-y-2 mb-4">
                {uploadedDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-100 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-900">{doc.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(idx)}
                      className="p-1 hover:bg-slate-200 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              Approving this claim will notify the customer and process payment within 3-5 business days.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setAction(null)}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:bg-slate-400"
            >
              {isSubmitting ? 'Processing...' : 'Approve Claim'}
            </button>
          </div>
        </form>
      )}

      {/* Rejection Form */}
      {action === 'reject' && (
        <form onSubmit={handleReject} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Reject Claim</h3>
            <button
              type="button"
              onClick={() => setAction(null)}
              className="p-1 hover:bg-slate-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rejection Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Rejection Reason
            </label>
            <select
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                if (errors.rejectionReason) {
                  setErrors((prev) => ({ ...prev, rejectionReason: '' }));
                }
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a reason</option>
              <option value="insufficient_documentation">Insufficient Documentation</option>
              <option value="out_of_coverage">Out of Coverage</option>
              <option value="exceeded_limit">Exceeded Claim Limit</option>
              <option value="policy_lapsed">Policy Lapsed</option>
              <option value="fraudulent">Suspected Fraud</option>
              <option value="duplicate">Duplicate Claim</option>
              <option value="other">Other</option>
            </select>
            {errors.rejectionReason && (
              <p className="text-sm text-red-600 mt-1">{errors.rejectionReason}</p>
            )}
          </div>

          {/* Rejection Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Detailed Explanation
            </label>
            <textarea
              value={rejectionNotes}
              onChange={(e) => setRejectionNotes(e.target.value)}
              placeholder="Provide detailed explanation for rejection..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">
              Rejecting this claim will notify the customer with the reason. They can appeal within 30 days.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setAction(null)}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:bg-slate-400"
            >
              {isSubmitting ? 'Processing...' : 'Reject Claim'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
