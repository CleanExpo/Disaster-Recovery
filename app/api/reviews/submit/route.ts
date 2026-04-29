import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

/**
 * DR-388: POST /api/reviews/submit
 *
 * Body: { claimId, contractorId, rating: 1-5, review?: string, authorName?: string }
 *
 * Validates:
 *  - rating is an integer 1–5
 *  - review (if provided) is between 10 and 2000 characters
 *
 * Rate-limited to 1 review per claimId (bookingId) — duplicate submissions
 * are rejected with a 409.
 *
 * Stores to the `Rating` Prisma model (bookingId = claimId).
 * Returns: { success: true, reviewId }
 */

export const dynamic = 'force-dynamic';

interface SubmitBody {
  claimId?: unknown;
  contractorId?: unknown;
  rating?: unknown;
  review?: unknown;
  authorName?: unknown;
}

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/reviews/submit' });
  let body: SubmitBody;

  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { claimId, contractorId, rating, review, authorName } = body;

  // ── Validate claimId ────────────────────────────────────────────────────────
  if (!claimId || typeof claimId !== 'string' || claimId.trim() === '') {
    return NextResponse.json({ error: 'claimId is required.' }, { status: 400 });
  }

  // ── Validate contractorId ───────────────────────────────────────────────────
  if (!contractorId || typeof contractorId !== 'string' || contractorId.trim() === '') {
    return NextResponse.json({ error: 'contractorId is required.' }, { status: 400 });
  }

  // ── Validate rating ─────────────────────────────────────────────────────────
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: 'rating must be an integer between 1 and 5.' },
      { status: 400 }
    );
  }

  // ── Validate review (optional) ──────────────────────────────────────────────
  if (review !== undefined && review !== null) {
    if (typeof review !== 'string') {
      return NextResponse.json({ error: 'review must be a string.' }, { status: 400 });
    }
    const trimmedReview = review.trim();
    if (trimmedReview.length > 0 && trimmedReview.length < 10) {
      return NextResponse.json(
        { error: 'Written review must be at least 10 characters.' },
        { status: 400 }
      );
    }
    if (trimmedReview.length > 2000) {
      return NextResponse.json(
        { error: 'Written review must be 2,000 characters or fewer.' },
        { status: 400 }
      );
    }
  }

  // ── Validate authorName (optional) ─────────────────────────────────────────
  if (authorName !== undefined && authorName !== null) {
    if (typeof authorName !== 'string' || authorName.length > 100) {
      return NextResponse.json(
        { error: 'authorName must be a string of 100 characters or fewer.' },
        { status: 400 }
      );
    }
  }

  const trimmedClaimId = (claimId as string).trim();
  const trimmedContractorId = (contractorId as string).trim();

  // ── Rate limit: 1 review per claimId ───────────────────────────────────────
  const existing = await prisma.rating.findFirst({
    where: { bookingId: trimmedClaimId },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json(
      { error: 'A review has already been submitted for this claim.' },
      { status: 409 }
    );
  }

  // ── Persist ─────────────────────────────────────────────────────────────────
  // clientId is not known from a public URL — use a placeholder.
  // In production this would be derived from an authenticated session or
  // a signed token embedded in the submission link.
  const reviewText = typeof review === 'string' ? review.trim() : null;
  const nameValue = typeof authorName === 'string' ? authorName.trim() : null;

  try {
    const created = await prisma.rating.create({
      data: {
        bookingId: trimmedClaimId,
        contractorId: trimmedContractorId,
        // Public submission — clientId resolved from signed link in production.
        // Using contractorId as a stand-in so the NOT NULL constraint is satisfied.
        clientId: nameValue ?? 'anonymous',
        rating: rating as number,
        comment: reviewText || null,
        title: nameValue || null,
        isPublished: false, // pending moderation
        isVerified: false,
      },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: trimmedClaimId,
      correlationType: 'claim',
      entityType: 'system',
      metadata: {
        route: '/api/reviews/submit',
        request_id: log.requestId,
        review_id: created.id,
        contractor_id: trimmedContractorId,
        rating: rating as number,
        has_comment: Boolean(reviewText),
      },
    });

    return NextResponse.json({ success: true, reviewId: created.id }, { status: 201 });
  } catch (err) {
    log.error('prisma error', { error: err instanceof Error ? err.message : String(err) });
    captureException(err, { tags: { route: '/api/reviews/submit' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { error: 'Failed to save review. Please try again.' },
      { status: 500 }
    );
  }
}
