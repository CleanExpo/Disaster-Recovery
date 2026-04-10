import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: '24 Hour Water Extraction',
  description: 'Professional 24 hour water extraction services across Australia. 24/7 emergency response for emergency pumping, rapid extraction.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/24-hour-water-extraction',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you extract water from a flooded property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches IICRC-certified extraction technicians within 60 minutes in most metro areas, 24 hours a day. Truck-mounted extractors can remove hundreds of litres per hour. Emergency extraction and make-safe is typically completed within 2–6 hours depending on the volume of water and affected area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is rapid water extraction so important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water begins saturating structural materials within minutes. After 24–48 hours, mould growth can begin on wet surfaces. Category 1 water (clean) degrades to Category 2 (contaminated) if left standing. Every hour of delay expands the scope of damage, increases restoration cost, and prolongs the drying timeline. The IICRC S500:2025 standard requires extraction to begin as soon as safely possible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to wait for insurance approval before extraction begins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Emergency make-safe — including extraction — does not require prior insurer approval. Under the General Insurance Code of Practice, you have the right to begin emergency work to prevent further damage. We document all conditions before, during, and after extraction so your insurer receives complete evidence for the claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after water extraction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After extraction, technicians install commercial dehumidifiers, air movers, and drying mats to draw remaining moisture from walls, flooring, and subfloor. Moisture readings are taken at each visit and recorded in a drying log. Structural drying typically takes 3–5 days. Antimicrobial treatment is applied to prevent mould. Once dry, repairs and reinstatement begin.',
      },
    },
  ],
});

export default function TwentyFourHourWaterExtractionPage() {
  return (
    <>
      <Script id="24hr-extraction-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
          icon: <Siren className="h-12 w-12" />,
          title: '24 Hour Water Extraction',
          subtitle: 'Professional 24 hour water extraction services across Australia. 24/7 emergency response for emergency pumping, rapid extraction.',
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
    </>
  );
}
