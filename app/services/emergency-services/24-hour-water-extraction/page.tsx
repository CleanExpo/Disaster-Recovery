import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: '24 Hour Water Extraction',
  description: 'Professional 24 hour water extraction services in Queensland. 24/7 emergency response for emergency pumping, rapid extraction.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/24-hour-water-extraction',
  },
};

export default function TwentyFourHourWaterExtractionPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: '24 Hour Water Extraction',
        subtitle: 'Professional 24 hour water extraction services in Queensland. 24/7 emergency response for emergency pumping, rapid extraction.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: '24 Hour Water Extraction' },
      ]}
      sections={getServiceChildSections({ serviceName: '24 Hour Water Extraction', parentCategory: 'Emergency Services', context: 'emergency pumping and rapid water extraction' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
