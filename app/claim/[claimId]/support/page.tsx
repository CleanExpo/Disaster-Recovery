import { Metadata } from 'next';
import ClaimSupportPage from './SupportClient';

export const metadata: Metadata = {
  title: 'Claim Support Pack | Disaster Recovery Australia',
  description: 'Your insurance claim support pack with expert contacts, questions for your insurer, know your rights under Australian law, and a document checklist.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/claim/support',
  },
  openGraph: {
    title: 'Claim Support Pack | Disaster Recovery Australia',
    description: 'Insurance claim support: expert contacts, your rights, and step-by-step claim guidance.',
    type: 'website',
  },
};

export default function ClaimSupportPageWrapper() {
  return <ClaimSupportPage />;
}
