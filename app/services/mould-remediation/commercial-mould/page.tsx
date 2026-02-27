import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Commercial Mould Remediation | Disaster Recovery',
  description: 'Professional commercial mould remediation services in Queensland. 24/7 emergency response for office mould, workplace mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/commercial-mould',
  },
};

export default function CommercialMouldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Commercial Mould Remediation',
        subtitle: 'Professional commercial mould remediation services in Queensland. 24/7 emergency response for office mould, workplace mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Commercial Mould Remediation' },
      ]}
    />
  );
}
