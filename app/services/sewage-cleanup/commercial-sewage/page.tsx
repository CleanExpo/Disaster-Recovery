import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Commercial Sewage Cleanup | Disaster Recovery',
  description: 'Professional commercial sewage cleanup services in Queensland. 24/7 emergency response for business sewage, workplace contamination.',
};

export default function CommercialSewageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Commercial Sewage Cleanup',
        subtitle: 'Professional commercial sewage cleanup services in Queensland. 24/7 emergency response for business sewage, workplace contamination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Commercial Sewage Cleanup' },
      ]}
    />
  );
}
