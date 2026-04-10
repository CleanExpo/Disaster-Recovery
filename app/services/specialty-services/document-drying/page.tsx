import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Document Water Damage Recovery',
  description: 'Professional document water damage recovery services across Australia. 24/7 emergency response for paper restoration, book drying.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/document-drying',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can water-damaged documents be restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many water-damaged documents can be stabilised and partially or fully restored if treated within 24-72 hours. Photographs, books, archival records, legal documents, and business records can be freeze-dried (vacuum freeze drying) to halt biological deterioration and remove moisture without further physical damage. Severely degraded or disintegrated documents may not be recoverable, but even partially legible documents can often be photographically captured before further degradation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the priority order for saving documents after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prioritise by replacement impossibility: irreplaceable originals (wills, property deeds, certificates, passports, historic photographs) first; then documents with business or legal significance; then documents with financial records. Do not attempt to open or unfold wet bound documents — this causes tearing. Stack flat and refrigerate (not freeze) wet papers to slow biological degradation while awaiting professional treatment. Photograph everything in wet condition for insurance documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is document restoration covered by insurance after water or fire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cost of professionally drying and restoring documents and records damaged in a covered water or fire event is claimable under most Australian home and business insurance policies. Business interruption insurance may also cover the cost of recreating business records that cannot be restored. We provide treatment scope and outcome documentation for insurance submissions.',
      },
    }
  ],
});

export default function DocumentWaterDamageRecoveryPage() {
  return (
    <>
      <Script id="document-drying-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Document Water Damage Recovery',
        subtitle: 'Professional document water damage recovery services across Australia. 24/7 emergency response for paper restoration, book drying.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Document Water Damage Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Document Water Damage Recovery', parentCategory: 'Specialty Services', context: 'paper restoration and book drying services' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
