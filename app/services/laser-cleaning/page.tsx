import { Metadata } from 'next';
import Script from 'next/script';
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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What damage types is laser cleaning used for in property restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Laser cleaning (laser ablation) is used in specialist restoration contexts where conventional methods risk damaging delicate surfaces. It is particularly effective for smoke, soot, and char removal from heritage masonry, stonework, exposed timber beams, decorative plasterwork, and architectural metalwork. Laser cleaning removes carbonised surface residue with high precision without abrasives, chemicals, or water — making it appropriate for materials that cannot withstand conventional restoration techniques or where substrate preservation is paramount.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is laser cleaning safe for heritage and listed buildings in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, laser cleaning is accepted by state heritage authorities in Australia (NSW Heritage Office, Heritage Victoria, Queensland Heritage Council, and others) because it is a non-contact, non-abrasive process that preserves the original fabric of historic materials. Its controllable energy parameters allow technicians to remove fire residue without penetrating or altering the substrate. The Burra Charter (ICOMOS Australia) principles supporting minimally invasive, reversible conservation techniques are satisfied by laser cleaning, making it appropriate for buildings with statutory heritage protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does laser cleaning compare to conventional fire restoration methods on cost and speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Conventional methods — chemical cleaning, dry ice blasting, soda blasting, and abrasive media — are significantly faster and lower cost for large-area smoke and soot restoration on standard materials. Laser cleaning is slower and higher cost but provides precision and substrate safety for irreplaceable or architecturally significant surfaces. In most fire restoration projects it is used in combination: laser cleaning for heritage features, exposed timber, and stonework, with conventional methods applied to standard painted surfaces and linings. This hybrid approach optimises both cost and conservation outcomes.',
      },
    }
  ],
});

export default function LaserCleaningPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  const schemaTag = <Script id="laser-cleaning-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />;
  return <>{schemaTag}<AntigravityServicePageTemplate data={laserCleaningData} heroImage="/images/generated/disaster-recovery/hero-fire-damage.webp" /></>;
}
