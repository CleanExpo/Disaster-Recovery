import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lodge a Claim | Disaster Recovery',
  description:
    'Submit your property damage claim online 24/7. Matched with IICRC-certified restoration contractors across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
};

/**
 * ADR-002: canonical claim intake is `/claim`.
 * Keep this route for bookmarks/SEO; permanently redirect to the single intake.
 */
export default function ClaimStartRedirect() {
  redirect('/claim');
}
