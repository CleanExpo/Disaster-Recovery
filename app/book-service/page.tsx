import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lodge a Claim | Disaster Recovery',
  description:
    'Book restoration by lodging a claim. Matched with IICRC-certified contractors who bill you directly.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
};

/**
 * ADR-014 Path A + ADR-002: client intake is `/claim` only.
 * Former book-service flow was a mock Stripe/$2,750 client-payment funnel (Path B).
 * Redirect so secondary intake cannot fight the canonical claim shape.
 */
export default function BookServiceRedirect() {
  redirect('/claim');
}
