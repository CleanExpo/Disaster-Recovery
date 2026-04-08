'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Wrench,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  ShieldAlert,
} from 'lucide-react';

interface OfferData {
  id: string;
  jobId: string;
  contractorId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  pool: string;
  offeredAt: string;
  expiresAt: string;
  requiresLiabilityAck: boolean;
  liabilityAcknowledgedAt: string | null;
  isExpired: boolean;
  timeRemainingSeconds: number;
}

interface JobData {
  id: string;
  serviceType: string;
  suburb: string;
  state: string;
  description?: string;
  urgencyLevel?: string;
}

export default function JobOfferPage() {
  const { offerId } = useParams<{ offerId: string }>();
  const router = useRouter();

  const [offer, setOffer] = useState<OfferData | null>(null);
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liabilityAcked, setLiabilityAcked] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [countdown, setCountdown] = useState(0);

  const fetchOffer = useCallback(async () => {
    try {
      const res = await fetch(`/api/contractors/job-offer/${offerId}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('This job offer could not be found.');
        } else {
          setError('Failed to load job offer. Please try again.');
        }
        return;
      }
      const data = await res.json();
      if (data.success) {
        setOffer(data.offer);
        setCountdown(data.offer.timeRemainingSeconds);

        // Fetch job details
        if (data.offer.jobId) {
          const jobRes = await fetch(`/api/contractor/jobs/${data.offer.jobId}`);
          if (jobRes.ok) {
            const jobData = await jobRes.json();
            if (jobData.success) setJob(jobData.job);
          }
        }
      }
    } catch {
      setError('Network error. Please refresh and try again.');
    } finally {
      setLoading(false);
    }
  }, [offerId]);

  useEffect(() => {
    fetchOffer();
  }, [fetchOffer]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return undefined;
    const interval = setInterval(() => {
      setCountdown((s) => {
        if (s <= 1) {
          clearInterval(interval);
          fetchOffer(); // re-fetch to get expired status
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown, fetchOffer]);

  const handleAction = async (action: 'accept' | 'decline') => {
    if (acting) return;

    if (action === 'accept' && offer?.requiresLiabilityAck && !liabilityAcked) {
      setError('You must acknowledge the liability disclaimer before accepting.');
      return;
    }

    setActing(true);
    setError(null);

    try {
      const res = await fetch(`/api/contractors/job-offer/${offerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          liabilityAcknowledged: liabilityAcked,
        }),
      });

      const data = await res.json();

      if (res.status === 410) {
        setResult({ type: 'error', message: 'This offer has expired and is no longer available.' });
        return;
      }

      if (res.status === 409) {
        setResult({ type: 'error', message: `This offer has already been ${offer?.status}.` });
        return;
      }

      if (!res.ok || !data.success) {
        setResult({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
        return;
      }

      if (action === 'accept') {
        setResult({ type: 'success', message: 'Job accepted! A confirmation email has been sent.' });
        setTimeout(() => router.push('/contractor/portal'), 3000);
      } else {
        setResult({ type: 'error', message: 'Offer declined. You will be considered for future jobs.' });
        setTimeout(() => router.push('/contractor/portal'), 3000);
      }
    } catch {
      setResult({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setActing(false);
    }
  };

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error && !offer) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-white mb-2">Offer Unavailable</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link href="/contractor/portal" className="text-blue-400 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 text-center">
          {result.type === 'success' ? (
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          )}
          <p className="text-white text-lg mb-2">{result.message}</p>
          <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  if (!offer) return null;

  const isExpiredOrActioned = offer.isExpired || offer.status !== 'pending';

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/contractor/portal" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <span className="text-sm text-gray-500">National Recovery Partners Group</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Expired / Already Actioned Banner */}
        {isExpiredOrActioned && (
          <div className="mb-6 bg-red-950 border border-red-800 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">
              {offer.isExpired || offer.status === 'expired'
                ? 'This offer has expired.'
                : `This offer has already been ${offer.status}.`}
            </p>
          </div>
        )}

        {/* Countdown */}
        {!isExpiredOrActioned && countdown > 0 && (
          <div className={`mb-6 rounded-lg p-4 flex items-center gap-3 ${
            countdown < 300
              ? 'bg-red-950 border border-red-800'
              : 'bg-blue-950 border border-blue-800'
          }`}>
            <Clock className={`w-5 h-5 flex-shrink-0 ${countdown < 300 ? 'text-red-400' : 'text-blue-400'}`} />
            <div>
              <p className={`font-semibold ${countdown < 300 ? 'text-red-300' : 'text-blue-300'}`}>
                Offer expires in {formatCountdown(countdown)}
              </p>
              <p className="text-gray-500 text-xs">If not accepted, the job will be offered to the next contractor.</p>
            </div>
          </div>
        )}

        {/* Job Card */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">New Job Offer</h1>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Service Type</p>
                <p className="font-medium">{job?.serviceType ?? offer.pool}</p>
              </div>
            </div>

            {(job?.suburb || job?.state) && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                  <p className="font-medium">{[job.suburb, job.state].filter(Boolean).join(', ')}</p>
                </div>
              </div>
            )}

            {job?.urgencyLevel && (
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Urgency</p>
                  <p className="font-medium capitalize">{job.urgencyLevel}</p>
                </div>
              </div>
            )}

            {job?.description && (
              <div className="mt-4 bg-gray-800 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Description</p>
                <p className="text-gray-300 text-sm">{job.description}</p>
              </div>
            )}
          </div>

          {/* Pool badge */}
          {offer.pool && offer.pool !== 'primary_qualified' && (
            <div className="mt-4 bg-yellow-950 border border-yellow-800 rounded-lg p-3">
              <p className="text-yellow-300 text-sm">
                This job is being offered outside primary coverage zones.
              </p>
            </div>
          )}
        </div>

        {/* Liability Acknowledgement */}
        {!isExpiredOrActioned && offer.requiresLiabilityAck && (
          <div className="bg-orange-950 border border-orange-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-orange-300 mb-1">Liability Disclaimer</p>
                <p className="text-orange-200 text-sm mb-3">
                  This job is outside your primary registered service area. By accepting, you confirm that
                  you hold valid public liability insurance, relevant trade licences, and IICRC certifications
                  applicable to this job type. You accept full professional responsibility for the work performed.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liabilityAcked}
                    onChange={(e) => setLiabilityAcked(e.target.checked)}
                    className="w-4 h-4 accent-orange-500"
                  />
                  <span className="text-orange-200 text-sm font-medium">
                    I acknowledge and accept the above liability terms
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-950 border border-red-800 rounded-lg p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        {!isExpiredOrActioned && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAction('accept')}
              disabled={acting || (offer.requiresLiabilityAck && !liabilityAcked)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500
                         disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed
                         text-white font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              {acting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
              Accept Job
            </button>
            <button
              onClick={() => handleAction('decline')}
              disabled={acting}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         text-gray-300 font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              <XCircle className="w-5 h-5" />
              Decline
            </button>
          </div>
        )}

        {isExpiredOrActioned && (
          <Link
            href="/contractor/portal"
            className="block text-center bg-blue-700 hover:bg-blue-600 text-white font-semibold
                       py-4 px-6 rounded-xl transition-colors"
          >
            Back to Dashboard
          </Link>
        )}
      </main>
    </div>
  );
}
