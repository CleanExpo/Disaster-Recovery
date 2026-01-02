/**
 * LeadPreview Component
 *
 * Sample anonymized lead preview card
 * Shows what contractors can expect from platform leads
 */

import React from 'react';
import { MapPin, Clock, Shield, AlertCircle, Image, CheckCircle } from 'lucide-react';

export interface LeadPreviewProps {
  urgency?: 'critical' | 'urgent' | 'high' | 'medium';
  disasterType: string;
  location: string;
  postcode: string;
  insured: boolean;
  insuranceProvider?: string;
  hasPhotos?: boolean;
  timeAgo?: string;
  className?: string;
}

export function LeadPreview({
  urgency = 'urgent',
  disasterType,
  location,
  postcode,
  insured,
  insuranceProvider,
  hasPhotos = false,
  timeAgo = '5 minutes ago',
  className = '',
}: LeadPreviewProps) {
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'urgent':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'high':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border-2 border-gray-700 shadow-xl ${className}`}
    >
      {/* Header with urgency badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold uppercase ${getUrgencyColor()}`}
        >
          <AlertCircle className="h-4 w-4" />
          {urgency}
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Clock className="h-4 w-4" />
          {timeAgo}
        </div>
      </div>

      {/* Main content */}
      <h3 className="font-sans-modern font-bold text-2xl text-white mb-4">
        {disasterType}
      </h3>

      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin className="h-5 w-5 text-nrpg-primary flex-shrink-0" />
          <span>
            {location}, {postcode}
          </span>
        </div>

        {/* Insurance status */}
        <div className="flex items-center gap-3">
          {insured ? (
            <>
              <Shield className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-green-400 font-medium">
                Insured {insuranceProvider && `(${insuranceProvider})`}
              </span>
            </>
          ) : (
            <>
              <Shield className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <span className="text-gray-400">Uninsured</span>
            </>
          )}
        </div>

        {/* Photos indicator */}
        {hasPhotos && (
          <div className="flex items-center gap-3 text-gray-300">
            <Image className="h-5 w-5 text-nrpg-primary flex-shrink-0" />
            <span>Photos attached</span>
          </div>
        )}

        {/* Quality indicators */}
        <div className="pt-3 border-t border-gray-700 mt-4">
          <p className="text-sm text-gray-400 mb-2">Lead Quality Indicators:</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Contact verified
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Location confirmed
            </div>
            {insured && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Insurance validated
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center italic">
          This is a sample lead. Actual leads contain full contact details and damage descriptions.
        </p>
      </div>
    </div>
  );
}

export default LeadPreview;
