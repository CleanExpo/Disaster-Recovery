import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Basement Sewage Flooding',
  description: 'Professional basement sewage flooding services in Queensland. 24/7 emergency response for lower level sewage, underground backup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/basement-sewage',
  },
};

export default function BasementSewageFloodingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Basement Sewage Flooding',
        subtitle: 'Professional basement sewage flooding services in Queensland. 24/7 emergency response for lower level sewage, underground backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Basement Sewage Flooding' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Basement Sewage Flooding', parentCategory: 'Sewage Cleanup', context: 'lower level and underground sewage backup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
