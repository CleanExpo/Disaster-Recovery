import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Attic Mould Removal | Disaster Recovery',
  description: 'Professional attic mould removal services in Queensland. 24/7 emergency response for roof cavity mould, ceiling mould.',
};

export default function AtticMouldRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Attic Mould Removal',
        subtitle: 'Professional attic mould removal services in Queensland. 24/7 emergency response for roof cavity mould, ceiling mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Attic Mould Removal' },
      ]}
    />
  );
}
