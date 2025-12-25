'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface BookingRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RescheduleData) => void;
  bookingId: string;
  currentDate: string;
  currentTime: string;
  contractorName: string;
}

interface RescheduleData {
  bookingId: string;
  newDate: string;
  newTime: string;
  reason: string;
  notes: string;
}

export default function BookingRescheduleModal({
  isOpen,
  onClose,
  onSubmit,
  bookingId,
  currentDate,
  currentTime,
  contractorName,
}: BookingRescheduleModalProps) {
  const [formData, setFormData] = useState<RescheduleData>({
    bookingId,
    newDate: '',
    newTime: '',
    reason: 'customer_request',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.newDate) {
      newErrors.newDate = 'New date is required';
    }

    if (!formData.newTime) {
      newErrors.newTime = 'New time is required';
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({
          bookingId,
          newDate: '',
          newTime: '',
          reason: 'customer_request',
          notes: '',
        });
      }, 2000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to reschedule booking. Please try again.',
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
            <h2 className="text-xl font-bold text-slate-900">Reschedule Booking</h2>
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
                  Rescheduled Successfully!
                </h3>
                <p className="text-slate-600 text-sm">
                  Your booking has been rescheduled. The contractor will be notified shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Booking Info */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-600 mb-2">Current Booking</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {currentDate} at {currentTime}
                    </p>
                    <p className="text-sm text-slate-600">
                      Assigned to: {contractorName}
                    </p>
                  </div>
                </div>

                {/* New Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    New Date
                  </label>
                  <input
                    type="date"
                    name="newDate"
                    value={formData.newDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.newDate && (
                    <p className="text-sm text-red-600 mt-1">{errors.newDate}</p>
                  )}
                </div>

                {/* New Time */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    New Time
                  </label>
                  <input
                    type="time"
                    name="newTime"
                    value={formData.newTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.newTime && (
                    <p className="text-sm text-red-600 mt-1">{errors.newTime}</p>
                  )}
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Reason for Rescheduling
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="customer_request">Customer Request</option>
                    <option value="emergency">Emergency</option>
                    <option value="weather">Bad Weather</option>
                    <option value="contractor_unavailable">Contractor Unavailable</option>
                    <option value="property_access">Property Access Issue</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.reason && (
                    <p className="text-sm text-red-600 mt-1">{errors.reason}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Explain why you need to reschedule..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    The contractor will be notified of the new time and can accept or decline.
                  </p>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
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
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-slate-400"
                  >
                    {isSubmitting ? 'Rescheduling...' : 'Reschedule Booking'}
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
