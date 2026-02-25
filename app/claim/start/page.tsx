import { Metadata } from 'next';
import ClaimStartPage from './ClaimStartClient';

export const metadata: Metadata = {
  title: 'Start Your Claim | Disaster Recovery Australia',
  description: 'Begin your emergency property damage claim. 24/7 online submission with photo upload. Certified contractors respond within 60 minutes.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
  openGraph: {
    title: 'Start Your Claim | Disaster Recovery Australia',
    description: 'Begin your emergency property damage claim. 24/7 online submission with certified contractor response within 60 minutes.',
    type: 'website',
  },
};

export default function ClaimStartPageWrapper() {
  return <ClaimStartPage />;
}
