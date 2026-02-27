import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Electronics Water Damage',
  description: 'Professional electronics water damage services in Queensland. 24/7 emergency response for computer water damage, device recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/electronics-water-damage',
  },
};

export default function ElectronicsWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Electronics Water Damage',
        subtitle: 'Professional electronics water damage services in Queensland. 24/7 emergency response for computer water damage, device recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Electronics Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Electronics Water Damage', parentCategory: 'Specialty Services', context: 'computer and electronic device water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
