import { Metadata } from 'next';
import TrackClaimPage from './TrackClient';

export const metadata: Metadata = {
  title: 'Track Your Claim',
  description: 'Track your property damage claim in real time. View contractor assignment, job progress, and claim milestones from submission to completion.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/track',
  },
  openGraph: {
    title: 'Track Your Claim',
    description: 'Track your property damage claim in real time. View progress from submission to completion.',
    type: 'website',
  },
};

export default function TrackClaimPageWrapper() {
  return <TrackClaimPage />;
}
