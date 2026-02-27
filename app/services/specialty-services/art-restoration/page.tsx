import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damaged Art Restoration | Disaster Recovery',
  description: 'Professional water damaged art restoration services in Queensland. 24/7 emergency response for painting restoration, artwork recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/art-restoration',
  },
};

export default function WaterDamagedArtRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Water Damaged Art Restoration',
        subtitle: 'Professional water damaged art restoration services in Queensland. 24/7 emergency response for painting restoration, artwork recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Water Damaged Art Restoration' },
      ]}
    />
  );
}
