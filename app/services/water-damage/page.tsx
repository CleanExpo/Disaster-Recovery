import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration',
  description: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Water Damage Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Water Damage Restoration | 24/7 IICRC S500',
  description: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
  keywords: 'water damage restoration, flood cleanup, water extraction, structural drying, IICRC S500, emergency water removal, burst pipe repair, sewage cleanup, basement flooding, water mitigation',
  openGraph: {
    title: 'Emergency Water Damage - IICRC Certified Professionals',
    description: 'Immediate response for water damage emergencies. IICRC S500 certified technicians, advanced drying equipment, IICRC-certified. Submit your claim online now.',
    type: 'website' },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage' }
};

export default function WaterDamageRestorationPage() {
  return (
    <>
    <Script id="water-damage-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Water Damage Restoration Services',
        subtitle: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage Restoration Services' },
      ]}
      sections={[
        {
          heading: 'Water Damage Restoration Services',
          body: <ServiceChildLinks category="water-damage" />,
        },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
