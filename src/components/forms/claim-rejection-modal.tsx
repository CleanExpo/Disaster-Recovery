'use client';

import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface ClaimRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RejectionData) => void;
  claimId: string;
  claimNumber: string;
}

interface RejectionData {
  claimId: string;
  reason: string;
  notes: string;
  notifyCustomer: boolean;
}

const rejectionReasons = [
  {
    value: 'insufficient_documentation',
    label: 'Insufficient Documentation',
    description: 'Required documents are missing or incomplete',
  },
  {
    value: 'out_of_coverage',
    label: 'Out of Coverage',
    description: 'The claimed damage is not covered by the policy',
  },
  {
    value: 'exceeded_limit',
    label: 'Exceeded Claim Limit',
    description: 'The claim amount exceeds the policy limit',
  },
  {
    value: 'policy_lapsed',
    label: 'Policy Lapsed',
    description: 'The insurance policy was not active at time of damage',
  },
  {
    value: 'fraudulent',
    label: 'Suspected Fraud',
    description: 'The claim appears to be fraudulent',
  },
  {
    value: 'duplicate',
    label: 'Duplicate Claim',
    description: 'This claim has already been processed',
  },
];

export default function ClaimRejectionModal({
  isOpen,
  onClose,
  onSubmit,
  claimId,
  claimNumber,
}: ClaimRejectionModalProps) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!reason) {
      newErrors.reason = 'Please select a rejection reason';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSubmit({
        claimId,
        reason,
        notes,
        notifyCustomer,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setReason('');
        setNotes('');
        setNotifyCustomer(true);
      }, 2000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to reject claim. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Reject Claim</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {showSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Claim Rejected
                </h3>
                <p className="text-slate-600 text-sm">
                  The customer has been notified of the rejection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Claim Info */}
                <div className="bg-slate-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-slate-600">Claim #</p>
                  <p className="font-semibold text-slate-900">{claimNumber}</p>
                </div>

                {/* Rejection Reason Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-3">
                    Rejection Reason
                  </label>
                  <div className="space-y-2">
                    {rejectionReasons.map((item) => (
                      <label
                        key={item.value}
                        className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={item.value}
                          checked={reason === item.value}
                          onChange={(e) => setReason(e.target.value)}
                          className="mt-1 w-4 h-4 accent-red-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.reason && (
                    <p className="text-sm text-red-600 mt-2">{errors.reason}</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional details..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm"
                  />
                </div>

                {/* Notify Customer Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="notify"
                    checked={notifyCustomer}
                    onChange={(e) => setNotifyCustomer(e.target.checked)}
                    className="w-4 h-4 accent-red-600 rounded"
                  />
                  <label htmlFor="notify" className="text-sm text-slate-700">
                    Notify customer immediately
                  </label>
                </div>

                {/* Info Box */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">
                    The customer can appeal this decision within 30 days.
                  </p>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Cancel
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
        </div>
      </div>
    </>
  );
}
