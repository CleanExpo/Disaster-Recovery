import { NextResponse } from 'next/server';
import { GBP_PLACE_ID } from '@/lib/constants';

// =============================================================================
// /api/rating — Google Places API (New) live star rating endpoint
// UNI-765: Fetches real-time AggregateRating data from Google Business Profile
// Uses Place Details (Basic fields = free tier, $0 cost)
// =============================================================================

const PLACE_ID = GBP_PLACE_ID;

// In-memory cache with 24-hour TTL (reset on cold start)
let cachedRating: { rating: number; reviewCount: number; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Fallback values — used if Places API is unavailable
const FALLBACK_RATING = 4.7;
const FALLBACK_REVIEW_COUNT = 49;

export async function GET() {
  // Return cached data if fresh
  if (cachedRating && Date.now() - cachedRating.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json({
      rating: cachedRating.rating,
      reviewCount: cachedRating.reviewCount,
      source: 'cache',
      cachedAt: new Date(cachedRating.fetchedAt).toISOString(),
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      rating: FALLBACK_RATING,
      reviewCount: FALLBACK_REVIEW_COUNT,
      source: 'fallback',
      reason: 'GOOGLE_PLACES_API_KEY not configured',
    });
  }

  try {
    // Place Details (New) — Basic fields are free ($0/request)
    // Field mask: rating + userRatingCount only
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[rating] Places API failed:', response.status, errorText);
      return NextResponse.json({
        rating: FALLBACK_RATING,
        reviewCount: FALLBACK_REVIEW_COUNT,
        source: 'fallback',
        reason: `Places API error: ${response.status}`,
      });
    }

    const data = await response.json();
    const rating = data.rating ?? FALLBACK_RATING;
    const reviewCount = data.userRatingCount ?? FALLBACK_REVIEW_COUNT;

    // Update cache
    cachedRating = { rating, reviewCount, fetchedAt: Date.now() };

    return NextResponse.json({
      rating,
      reviewCount,
      source: 'google-places',
      cachedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[rating] Places API fetch error:', error);
    return NextResponse.json({
      rating: FALLBACK_RATING,
      reviewCount: FALLBACK_REVIEW_COUNT,
      source: 'fallback',
      reason: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
