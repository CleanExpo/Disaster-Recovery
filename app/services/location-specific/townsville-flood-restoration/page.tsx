import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Townsville Flood Restoration',
  description: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/townsville-flood-restoration',
  },
};

export default function TownsvilleFloodRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Townsville Flood Restoration',
        subtitle: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Townsville Flood Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Townsville Flood Restoration', parentCategory: 'Location Specific', context: 'north Queensland tropical flood recovery and water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
