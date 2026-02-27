import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getEmergencyMakeSafeSections } from '@/lib/content-sections/emergency-make-safe-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Make-Safe Repairs | $2,750 Guide',
  description:
    'Complete guide to emergency make-safe repair costs in Australia. Learn about the $2,750 initial service, insurance reimbursement process, Authority to Commence requirements, and your right to choose a contractor under the General Insurance Code of Practice.',
  keywords: [
    'emergency make-safe',
    'make safe repairs',
    '$2750 emergency service',
    'insurance reimbursement',
    'authority to commence',
    'GICOP 2020',
    'right to choose contractor',
    'emergency restoration',
    'disaster recovery insurance',
    'insurance claim process Australia',
  ],
  openGraph: {
    title: 'Emergency Make-Safe Repairs: $2,750 Cost, Insurance',
    description:
      'Complete guide to the $2,750 emergency make-safe service, insurance reimbursement process, and your rights under the General Insurance Code of Practice 2020.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance/emergency-make-safe-guide',
  },
};

export default function EmergencyMakeSafeGuidePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 50%, #1a365d 100%)',
        icon: <ShieldCheck className="h-12 w-12" />,
        title: 'Emergency Make-Safe Repairs',
        subtitle: '$2,750 initial service with insurance-compliant invoicing for reimbursement',
      }}
      stats={[
        { label: 'Emergency Service', value: '$2,750' },
        { label: 'GICOP Response', value: '10 Days' },
        { label: 'NRPG Coverage', value: 'National' },
      ]}
      cta={{ text: 'Request Emergency Service', href: '/contact' }}
      secondaryCta={{ text: 'Lodge a Claim', href: 'https://disasterrecovery.com.au' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Emergency Make-Safe Guide' },
      ]}
      sections={getEmergencyMakeSafeSections()}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
