import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Piano Water Damage Restoration | Disaster Recovery',
  description: 'Professional piano water damage restoration services in Queensland. 24/7 emergency response for musical instrument, piano flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/piano-water-damage',
  },
};

export default function PianoWaterDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Piano Water Damage Restoration',
        subtitle: 'Professional piano water damage restoration services in Queensland. 24/7 emergency response for musical instrument, piano flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Piano Water Damage Restoration' },
      ]}
    />
  );
}
