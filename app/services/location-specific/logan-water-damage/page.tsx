import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Logan Water Damage Services | Disaster Recovery',
  description: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/logan-water-damage',
  },
};

export default function LoganWaterDamageServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Logan Water Damage Services',
        subtitle: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Logan Water Damage Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Logan Water Damage Services', parentCategory: 'Location Specific', context: 'Logan and southern Brisbane flood and water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
