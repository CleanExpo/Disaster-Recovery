import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Moreton Bay Flood Services',
  description: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/moreton-bay-flooding',
  },
};

export default function MoretonBayFloodServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Moreton Bay Flood Services',
        subtitle: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Moreton Bay Flood Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Moreton Bay Flood Services', parentCategory: 'Location Specific', context: 'northern Brisbane and Moreton Bay region flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
