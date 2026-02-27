import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Gold Coast Flood Restoration | Disaster Recovery',
  description: 'Professional gold coast flood restoration services in Queensland. 24/7 emergency response for coastal flooding, beach property.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/gold-coast-flood-restoration',
  },
};

export default function GoldCoastFloodRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Gold Coast Flood Restoration',
        subtitle: 'Professional gold coast flood restoration services in Queensland. 24/7 emergency response for coastal flooding, beach property.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Gold Coast Flood Restoration' },
      ]}
    />
  );
}
