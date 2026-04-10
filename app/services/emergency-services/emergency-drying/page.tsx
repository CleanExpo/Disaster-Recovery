import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Structural Drying',
  description: 'Professional emergency structural drying services across Australia. 24/7 emergency response for rapid drying, moisture removal.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-drying',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is emergency structural drying and why is it needed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency structural drying is the forced removal of moisture from building materials using commercial dehumidifiers and air movers after a water damage event. Without drying, retained moisture causes mould growth within 24-48 hours, structural degradation, and secondary health risks. IICRC S500:2025 requires drying to begin as soon as extraction is complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does emergency structural drying take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard structural drying takes 3-5 days under normal conditions. Category 3 water events or events involving thick structural elements may take 5-7 days. Moisture readings are taken at each visit — drying is only complete when all affected materials reach target moisture content per IICRC S500:2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is structural drying covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Structural drying is part of the emergency make-safe and restoration process covered under most Australian water damage insurance claims. We provide daily drying logs with moisture readings that serve as evidence of scope and necessity for your insurer.',
      },
    }
  ],
});

export default function EmergencyStructuralDryingPage() {
  return (
    <>
      <Script id="emergency-drying-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Structural Drying',
        subtitle: 'Professional emergency structural drying services across Australia. 24/7 emergency response for rapid drying, moisture removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Structural Drying' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Structural Drying', parentCategory: 'Emergency Services', context: 'rapid structural drying and moisture removal after water damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
