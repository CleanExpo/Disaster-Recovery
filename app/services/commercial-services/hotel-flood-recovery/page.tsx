import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hotel Flood Restoration',
  description: 'Professional hotel flood restoration services across Australia. 24/7 emergency response for accommodation flooding, guest room water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/hotel-flood-recovery',
  },
};

export default function HotelFloodRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Hotel Flood Restoration',
        subtitle: 'Professional hotel flood restoration services across Australia. 24/7 emergency response for accommodation flooding, guest room water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Hotel Flood Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hotel Flood Restoration', parentCategory: 'Commercial Services', context: 'accommodation flooding and guest room water damage' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
