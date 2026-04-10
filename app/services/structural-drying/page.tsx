import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Structural Drying Services',
  description: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
  keywords: [
    'structural drying',
    'professional water extraction',
    'industrial dehumidifiers',
    'building drying services',
    'moisture removal',
    'water damage drying',
    'structural moisture control',
    'professional drying equipment',
    'water extraction services',
    'humidity control',
    'moisture monitoring',
    'building dehumidification',
    'water damage mitigation',
    'structural water removal',
    'professional drying technicians'
  ],
  openGraph: {
    title: 'Professional Structural Drying Services',
    description: 'Expert structural drying services with industrial equipment. Professional water extraction, dehumidification, and moisture monitoring to prevent mould and structural damage.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structural Drying Services | Professional Water Extraction',
    description: 'Expert structural drying services. Industrial dehumidifiers, air movers, and professional moisture monitoring available 24/7.',
  },
  alternates: {
    canonical: '/services/structural-drying' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Structural Drying Services',
  description: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Structural Drying and Dehumidification',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What equipment is used in professional structural drying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional structural drying uses a combination of refrigerant and desiccant dehumidifiers (typically LGR — low grain refrigerant — units), axial and centrifugal air movers to create directional airflow across wet materials, injectidry or drying mat systems to inject warm dry air directly into wall cavities without full demolition, and precision moisture monitoring equipment including calibrated pin and pinless metres and thermal imaging cameras. Equipment is selected, sized, and positioned according to IICRC S500 psychrometric principles to achieve efficient drying within the target timeframe.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is structural drying progress monitored during a restoration project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drying technicians record daily monitoring logs at each visit documenting: moisture content readings at mapped reference points in each material type; ambient temperature and relative humidity in the drying zone; equipment status (type, quantity, placement, and settings); and daily psychrometric calculations (grains per pound). This data is charted against a drying curve to confirm progress toward drying goals. IICRC-trained technicians adjust equipment placement and settings based on daily readings to maintain efficient drying rates throughout the project.',
      },
    },
    {
      '@type': 'Question',
      name: 'What moisture levels confirm structural drying is complete?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S500 drying goals require structural materials to reach moisture content within 4% of unaffected reference materials in the same building, confirmed across all monitoring points. Relative humidity in the drying zone should stabilise at 40-50% before equipment is demobilised. Floor coverings, wall linings, and subflooring are each verified individually using the appropriate instrument. Final documentation includes a drying completion report with all monitoring data confirming drying goals have been achieved before reconstruction or reinstatement begins.',
      },
    }
  ],
});

export default function StructuralDryingPage() {
  return (
    <>
    <Script id="structural-drying-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Script id="structural-drying-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Wind className="h-12 w-12" />,
        title: 'Structural Drying Services',
        subtitle: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Structural Drying Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Structural Drying Services', parentCategory: 'Water Damage', context: 'industrial dehumidification and moisture control' })}
      relatedPages={getRelatedPages('structural-drying')}
    />
    </>
  );
}
