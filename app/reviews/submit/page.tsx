'use client';

/**
 * DR-388: Public review submission page
 * URL: /reviews/submit?claimId=xxx&contractorId=xxx
 *
 * Clients visit this page after claim completion to leave a review for
 * the contractor who handled their restoration work.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Star, Send, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface StarRatingProps {
  value: number;
  onChange: (val: number) => void;
  hovered: number;
  onHover: (val: number) => void;
  onLeave: () => void;
}

function StarRatingInput({ value, onChange, hovered, onHover, onLeave }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            aria-pressed={star === value}
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            <Star
              className={`w-9 h-9 transition-colors ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-none text-gray-300 hover:text-amber-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

const RATING_LABELS: Record<number, string> = {
  1: 'Very poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

export default function ReviewSubmitPage() {
  const searchParams = useSearchParams();
  const claimId = searchParams.get('claimId') ?? '';
  const contractorId = searchParams.get('contractorId') ?? '';

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewId, setReviewId] = useState('');

  // Validate review length client-side
  const reviewTooShort = review.length > 0 && review.length < 10;
  const reviewTooLong = review.length > 2000;
  const canSubmit =
    rating >= 1 &&
    rating <= 5 &&
    !reviewTooShort &&
    !reviewTooLong &&
    submitState !== 'submitting';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitState('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId,
          contractorId,
          rating,
          review: review.trim() || undefined,
          authorName: authorName.trim() || undefined,
        }),
      });

      const data = await res.json() as { success?: boolean; reviewId?: string; error?: string };

      if (!res.ok || !data.success) {
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
        setSubmitState('error');
        return;
      }

      setReviewId(data.reviewId ?? '');
      setSubmitState('success');
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitState('error');
    }
  }

  if (submitState === 'success') {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank you!</h1>
          <p className="text-gray-600 mb-6">
            Your review helps others in disaster situations find trustworthy restoration
            professionals when they need help most.
          </p>
          {reviewId && (
            <p className="text-xs text-gray-400 mb-6">Review ID: {reviewId}</p>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-lg w-full p-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Leave a review</h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Your honest feedback helps other property owners find certified restoration
            professionals they can trust.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Star rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Overall rating <span className="text-red-500">*</span>
            </label>
            <StarRatingInput
              value={rating}
              onChange={setRating}
              hovered={hovered}
              onHover={setHovered}
              onLeave={() => setHovered(0)}
            />
            {(hovered || rating) > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {RATING_LABELS[hovered || rating]}
              </p>
            )}
            {submitState === 'error' && rating === 0 && (
              <p className="mt-1 text-sm text-red-600">Please select a star rating.</p>
            )}
          </div>

          {/* Written review */}
          <div>
            <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Written review <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tell others about the quality of work, response time, and professionalism of the contractor..."
              rows={5}
              maxLength={2000}
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-colors ${
                reviewTooShort || reviewTooLong
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1.5">
              {reviewTooShort ? (
                <p className="text-xs text-red-600">Review must be at least 10 characters.</p>
              ) : reviewTooLong ? (
                <p className="text-xs text-red-600">Review must be 2,000 characters or fewer.</p>
              ) : (
                <span />
              )}
              <p className={`text-xs ml-auto ${review.length > 1800 ? 'text-amber-600' : 'text-gray-400'}`}>
                {review.length}/2000
              </p>
            </div>
          </div>

          {/* Author name */}
          <div>
            <label htmlFor="authorName" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your name <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Sarah M."
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <p className="mt-1 text-xs text-gray-400">
              Only your first name or initials will be shown publicly.
            </p>
          </div>

          {/* Error state */}
          {submitState === 'error' && errorMessage && (
            <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitState === 'submitting' ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit review
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-400">
            By submitting you agree to our{' '}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
            {' '}and{' '}
            <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>.
          </p>
        </form>
      </div>
    </main>
  );
}
