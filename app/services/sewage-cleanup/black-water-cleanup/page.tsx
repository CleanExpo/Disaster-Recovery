import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Black Water Contamination | Disaster Recovery',
  description: 'Professional black water contamination services in Queensland. 24/7 emergency response for category 3 water, hazardous sewage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/black-water-cleanup',
  },
};

export default function BlackWaterContaminationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Black Water Contamination',
        subtitle: 'Professional black water contamination services in Queensland. 24/7 emergency response for category 3 water, hazardous sewage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Black Water Contamination' },
      ]}
    />
  );
}
