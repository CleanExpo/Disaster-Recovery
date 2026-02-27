import { Metadata } from 'next';
import Script from 'next/script';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityServicePageTemplate } from '@/components/antigravity';
import { laserCleaningData } from '@/components/antigravity';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Precision Laser Cleaning Services',
  description: 'Advanced laser cleaning and restoration for smoke, soot, heritage brickwork, and delicate surfaces. Non-abrasive vaporisation technology by IICRC-certified technicians across Australia.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Laser Cleaning Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Precision Laser Cleaning Services',
  description:
    'Advanced laser cleaning and restoration for smoke, soot, heritage brickwork, and delicate surfaces. Non-abrasive vaporisation technology by IICRC-certified technicians across Australia.',
  keywords: [
    'laser cleaning restoration',
    'non-abrasive soot removal',
    'heritage brickwork restoration',
    'laser vaporisation cleaning',
    'smoke damage laser cleaning',
    'precision restoration Australia',
  ].join(', '),
  openGraph: {
    title: 'Precision Laser Cleaning',
    description:
      'Non-abrasive laser vaporisation for smoke, soot, and heritage surface restoration. Advanced technology deployed by certified technicians.',
    type: 'website',
  },
};

export default function LaserCleaningPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  const schemaTag = <Script id="laser-cleaning-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />;
  if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <>{schemaTag}<AntigravityServicePageTemplate data={laserCleaningData} heroImage="/images/generated/disaster-recovery/hero-fire-damage.webp" /></>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Precision Laser Cleaning</h1>
        <p className="text-lg text-gray-600">Coming soon — advanced laser restoration services.</p>
      </div>
    </div>
  );
}
