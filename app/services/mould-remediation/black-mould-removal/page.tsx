import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Black Mould Removal Brisbane | Disaster Recovery',
  description: 'Professional black mould removal brisbane services in Queensland. 24/7 emergency response for toxic black mould, stachybotrys removal.',
};

export default function BlackMouldRemovalBrisbanePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Black Mould Removal Brisbane',
        subtitle: 'Professional black mould removal brisbane services in Queensland. 24/7 emergency response for toxic black mould, stachybotrys removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Black Mould Removal Brisbane' },
      ]}
    />
  );
}
