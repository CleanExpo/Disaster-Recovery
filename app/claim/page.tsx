import { Metadata } from 'next';
import OnlineClaimPage from './ClaimFormClient';

export const metadata: Metadata = {
  title: 'Lodge a Claim',
  description: 'Submit your property damage claim online 24/7. Matched with IICRC-certified restoration contractors across Australia. Available 24/7.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
  openGraph: {
    title: 'Lodge a Claim',
    description: 'Submit your property damage claim online 24/7. Matched with IICRC-certified restoration contractors across Australia.',
    type: 'website',
  },
};

export default function ClaimPage() {
  return <OnlineClaimPage />;
}
