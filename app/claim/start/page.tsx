import { Metadata } from 'next';
import ClaimStartPage from './ClaimStartClient';

export const metadata: Metadata = {
  title: 'Start Your Claim',
  description: 'Begin your emergency property damage claim. 24/7 online submission with photo upload. Certified contractors respond as soon as a certified contractor is confirmed for your area.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
  openGraph: {
    title: 'Start Your Claim',
    description: 'Begin your emergency property damage claim. 24/7 online submission with certified contractor response as soon as a certified contractor is confirmed for your area.',
    type: 'website',
  },
};

export default function ClaimStartPageWrapper() {
  return <ClaimStartPage />;
}
