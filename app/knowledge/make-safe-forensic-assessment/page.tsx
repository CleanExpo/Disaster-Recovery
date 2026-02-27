import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import Script from 'next/script';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'make-safe-forensic-assessment';

export const metadata: Metadata = {
  title: 'Make Safe & Forensic Assessment | $2,750',
  description:
    'NRPG $2,750 Make Safe & Forensic Assessment: IICRC inspection, thermal imaging, moisture mapping, emergency stabilisation, and Paperwork Assurance Report for insurance claims.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/make-safe-forensic-assessment' },
};

export default function MakeSafeForensicAssessmentPage() {
  const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Make Safe & Forensic Assessment',
    description:
      'Scientific risk mitigation and liability transfer service including IICRC forensic inspection, emergency stabilisation, and Paperwork Assurance Report.',
    provider: {
      '@type': 'Organization',
      name: 'NRPG',
      url: 'https://disaster-recovery-seven-virid.vercel.app',
    },
    offers: {
      '@type': 'Offer',
      price: '2750',
      priceCurrency: 'AUD',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    serviceType: 'Disaster Recovery Assessment',
  });

  return (
    <>
      <KnowledgeSchema
        title="Make Safe & Forensic Assessment Service"
        description="$2,750 fixed-price Make Safe service: IICRC forensic inspection, emergency stabilisation, and Paperwork Assurance Report for insurance claims."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <Script id="service-schema-make-safe" type="application/ld+json" strategy="afterInteractive">
        {serviceSchema}
      </Script>
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #047857 100%)',
          icon: <ShieldCheck className="h-12 w-12" />,
          title: 'Make Safe & Forensic Assessment',
          subtitle: '$2,750 fixed-price scientific risk mitigation and liability transfer service',
        }}
        cta={{ text: 'Book Make Safe Now', href: '/book-service' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Make Safe & Forensic Assessment' },
        ]}
        stats={[
          { label: 'Fixed Price', value: '$2,750' },
          { label: 'Response Time', value: '60 min' },
          { label: 'Report Delivery', value: '24 hrs' },
          { label: 'Claim Recovery Uplift', value: '30-50%' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
