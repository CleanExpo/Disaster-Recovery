'use client';

import React from 'react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Zap,
  Award,
  Calendar,
} from 'lucide-react';

// Booking Status Badge
export function BookingStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: <Clock className="w-3 h-3" />,
      label: 'Pending',
    },
    confirmed: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Confirmed',
    },
    in_progress: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      icon: <Zap className="w-3 h-3" />,
      label: 'In Progress',
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Completed',
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <XCircle className="w-3 h-3" />,
      label: 'Cancelled',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// Claim Status Badge
export function ClaimStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    draft: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      icon: <AlertCircle className="w-3 h-3" />,
      label: 'Draft',
    },
    submitted: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Submitted',
    },
    under_review: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: <Clock className="w-3 h-3" />,
      label: 'Under Review',
    },
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Approved',
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <XCircle className="w-3 h-3" />,
      label: 'Rejected',
    },
    paid: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      icon: <Award className="w-3 h-3" />,
      label: 'Paid',
    },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// Contractor Certification Badge
export function CertificationBadge({
  name,
  isValid,
}: {
  name: string;
  isValid: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
        isValid
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {isValid ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {name}
    </div>
  );
}

// Payment Status Badge
export function PaymentStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: <Clock className="w-3 h-3" />,
      label: 'Pending',
    },
    processing: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      icon: <Zap className="w-3 h-3" />,
      label: 'Processing',
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <CheckCircle className="w-3 h-3" />,
      label: 'Completed',
    },
    failed: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <XCircle className="w-3 h-3" />,
      label: 'Failed',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// Health Check Status Light
export function HealthStatusLight({ status }: { status: 'healthy' | 'degraded' | 'unhealthy' }) {
  const config = {
    healthy: { bg: 'bg-green-500', label: 'Healthy' },
    degraded: { bg: 'bg-yellow-500', label: 'Degraded' },
    unhealthy: { bg: 'bg-red-500', label: 'Unhealthy' },
  };

  const { bg, label } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${bg}`}></div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

// Emergency Level Badge
export function EmergencyLevelBadge({ level }: { level: string }) {
  const levelConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string }
  > = {
    routine: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      icon: <Calendar className="w-3 h-3" />,
      label: 'Routine',
    },
    urgent: {
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      icon: <AlertCircle className="w-3 h-3" />,
      label: 'Urgent',
    },
    emergency: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <Zap className="w-3 h-3" />,
      label: 'Emergency',
    },
  };

  const config = levelConfig[level] || levelConfig.routine;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
}

// Contractor Performance Tier Badge
export function PerformanceTierBadge({ tier }: { tier: string }) {
  const tierConfig: Record<
    string,
    { bg: string; text: string; icon: React.ReactNode; label: string; color: string }
  > = {
    platinum: {
      bg: 'bg-gradient-to-r from-cyan-50 to-blue-50',
      text: 'text-cyan-700',
      icon: <Award className="w-4 h-4 text-cyan-600" />,
      label: 'Platinum',
      color: 'from-cyan-400 to-blue-400',
    },
    gold: {
      bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
      text: 'text-amber-700',
      icon: <Award className="w-4 h-4 text-amber-600" />,
      label: 'Gold',
      color: 'from-amber-400 to-yellow-400',
    },
    silver: {
      bg: 'bg-gradient-to-r from-slate-100 to-gray-100',
      text: 'text-slate-700',
      icon: <Award className="w-4 h-4 text-slate-600" />,
      label: 'Silver',
      color: 'from-slate-400 to-gray-400',
    },
    bronze: {
      bg: 'bg-gradient-to-r from-orange-50 to-red-50',
      text: 'text-orange-700',
      icon: <Award className="w-4 h-4 text-orange-600" />,
      label: 'Bronze',
      color: 'from-orange-400 to-red-400',
    },
    standard: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      icon: <CheckCircle className="w-4 h-4 text-slate-600" />,
      label: 'Standard',
      color: 'from-slate-400',
    },
  };

  const config = tierConfig[tier] || tierConfig.standard;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} ${config.text} text-sm font-semibold`}>
      {config.icon}
      {config.label}
    </div>
  );
}
