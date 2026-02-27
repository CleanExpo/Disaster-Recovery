import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Solar Panel Water Damage | Disaster Recovery',
  description: 'Professional solar panel water damage services in Queensland. 24/7 emergency response for solar system, panel flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/solar-panel-water-damage',
  },
};

export default function SolarPanelWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Solar Panel Water Damage',
        subtitle: 'Professional solar panel water damage services in Queensland. 24/7 emergency response for solar system, panel flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Solar Panel Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Solar Panel Water Damage', parentCategory: 'Specialty Services', context: 'solar system and panel water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
