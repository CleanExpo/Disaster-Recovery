import { Metadata } from 'next';
import ContractorApplicationPage from './ApplyClient';

export const metadata: Metadata = {
  title: 'Apply to Join | NRPG Contractor Network Australia',
  description: 'Join Australia\'s leading restoration contractor network. Access insurance leads, professional development, and grow your restoration business with NRPG.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/contractor/apply',
  },
  openGraph: {
    title: 'Apply to Join | NRPG Contractor Network Australia',
    description: 'Join Australia\'s leading restoration contractor network. Access insurance leads and grow your business.',
    type: 'website',
  },
};

export default function ContractorApplyPage() {
  return <ContractorApplicationPage />;
}
