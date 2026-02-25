import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Timber Mould Treatment | Disaster Recovery',
  description: 'Professional timber mould treatment services in Queensland. 24/7 emergency response for wood rot, structural mould.',
};

export default function TimberMouldTreatmentPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: 'Timber Mould Treatment',
        subtitle: 'Professional timber mould treatment services in Queensland. 24/7 emergency response for wood rot, structural mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Timber Mould Treatment' },
      ]}
    />
  );
}
