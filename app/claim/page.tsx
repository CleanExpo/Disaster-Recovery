import { Metadata } from 'next';
import OnlineClaimPage from './ClaimFormClient';

export const metadata: Metadata = {
  title: 'Lodge a Claim | Disaster Recovery Australia',
  description: 'Submit your property damage claim online 24/7. Professional restoration contractors matched within 60 minutes. IICRC-certified contractor network.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim',
  },
  openGraph: {
    title: 'Lodge a Claim | Disaster Recovery Australia',
    description: 'Submit your property damage claim online 24/7. Professional restoration contractors matched within 60 minutes.',
    type: 'website',
  },
};

export default function ClaimPage() {
  return <OnlineClaimPage />;
}
