import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Black Water Contamination',
  description: 'Professional black water contamination services across Australia. 24/7 emergency response for category 3 water, hazardous sewage.',
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
        subtitle: 'Professional black water contamination services across Australia. 24/7 emergency response for category 3 water, hazardous sewage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Black Water Contamination' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Black Water Contamination', parentCategory: 'Sewage Cleanup', context: 'category 3 water and hazardous sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
