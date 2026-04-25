// Sub-Contractor Manager shared types + helpers
// Extracted from SubContractorManager.tsx per ADR-009.

import type { EngagementStatus, OnboardingStatus } from '@/types/sub-contractor';

export const ENGAGEMENT_STATUS_CONFIG: Record<EngagementStatus, { label: string; colour: string }> =
  {
    QUOTED: { label: 'Quoted', colour: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    PENDING_AGREEMENT: {
      label: 'Pending Agreement',
      colour: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    ACTIVE: { label: 'Active', colour: 'bg-blue-100 text-blue-800 border-blue-200' },
    COMPLETE: { label: 'Complete', colour: 'bg-green-100 text-green-800 border-green-200' },
    INVOICED: { label: 'Invoiced', colour: 'bg-purple-100 text-purple-800 border-purple-200' },
    CANCELLED: { label: 'Cancelled', colour: 'bg-gray-100 text-gray-600 border-gray-200' },
  };

export const ONBOARDING_STATUS_CONFIG: Record<OnboardingStatus, { label: string; colour: string }> =
  {
    NOT_STARTED: { label: 'Not Started', colour: 'bg-gray-100 text-gray-600' },
    IN_PROGRESS: { label: 'In Progress', colour: 'bg-yellow-100 text-yellow-800' },
    AWAITING_SIGNATURE: { label: 'Awaiting Signature', colour: 'bg-orange-100 text-orange-800' },
    COMPLETE: { label: 'Onboarded', colour: 'bg-green-100 text-green-800' },
    REJECTED: { label: 'Rejected', colour: 'bg-red-100 text-red-800' },
  };

export function formatAud(cents: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
  }).format(cents);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
