import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Storm & Natural Disaster Recovery',
  description: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Storm Damage Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Storm & Natural Disaster Recovery | Emergency Response',
  description: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
  keywords: [
    'storm damage restoration',
    'cyclone damage repair',
    'hail damage restoration',
    'wind damage repair',
    'natural disaster recovery',
    'roof storm damage',
    'emergency roof repair',
    'storm cleanup',
    'tree damage removal',
    'flood damage restoration',
    'storm restoration company',
    'severe weather damage',
    'tornado damage repair',
    'lightning damage restoration',
    'bushfire damage recovery'
  ],
  openGraph: {
    title: 'Storm & Natural Disaster Recovery Services | 24/7',
    description: 'Professional storm and natural disaster recovery services. Expert cyclone, hail, and wind damage restoration with 24/7 emergency response nationwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storm & Natural Disaster Recovery | Emergency Response',
    description: 'Expert storm damage restoration services. Professional cyclone, hail, and wind damage repair available 24/7.',
  },
  alternates: {
    canonical: '/services/storm-damage' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function StormDamagePage() {
  return (
    <>
    <Script id="storm-damage-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm & Natural Disaster Recovery',
        subtitle: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm & Natural Disaster Recovery' },
      ]}
      sections={[
        {
          heading: 'Storm Damage Restoration Services',
          body: <ServiceChildLinks category="storm-damage" />,
        },
      ]}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
