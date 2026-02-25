import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Carpet Mould Remediation | Disaster Recovery',
  description: 'Professional carpet mould remediation services in Queensland. 24/7 emergency response for mouldy carpet, underlay mould.',
};

export default function CarpetMouldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: 'Carpet Mould Remediation',
        subtitle: 'Professional carpet mould remediation services in Queensland. 24/7 emergency response for mouldy carpet, underlay mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Carpet Mould Remediation' },
      ]}
    />
  );
}
