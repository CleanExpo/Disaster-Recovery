import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Ipswich Flood Recovery | Disaster Recovery',
  description: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/ipswich-flood-recovery',
  },
};

export default function IpswichFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Ipswich Flood Recovery',
        subtitle: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Ipswich Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Ipswich Flood Recovery', parentCategory: 'Location Specific', context: 'western corridor flood recovery and water damage restoration in Ipswich' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
