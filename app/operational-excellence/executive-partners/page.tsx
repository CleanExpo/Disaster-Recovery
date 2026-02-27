import { Metadata } from 'next';
import { Handshake } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import {
  getOperationalExcellenceSections,
  getOperationalExcellenceFaqs,
  getOperationalExcellenceStats,
} from '@/lib/content-sections';
import { OperationalExcellenceSchema } from '@/components/operational-excellence/OperationalExcellenceSchema';
import { getRelatedPages } from '@/lib/internal-links';
import { generateSEO } from '@/lib/seo';

const SLUG = 'executive-partners';

export const metadata: Metadata = generateSEO({
  title: 'Executive Partners | IICRC CARSI NRPG',
  description:
    'Proudly affiliated with IICRC, CARSI, RestoreAssist and NRPG. Our executive partnerships set the standard for restoration excellence across Australia and New Zealand.',
  keywords: [
    'IICRC certified Australia',
    'CARSI restoration affiliation',
    'RestoreAssist partnership',
    'NRPG disaster recovery',
    'executive partnerships restoration',
    'industry affiliations disaster recovery',
    'certified restoration network Australia',
    'IICRC accredited company',
    'restoration industry associations ANZ',
    'professional certifications disaster recovery',
    'CARSI Australia member',
    'restoration standards partnership',
    'NRPG network restoration',
    'industry body disaster recovery',
    'accredited restoration service',
    'restoration association New Zealand',
    'professional restoration affiliations',
    'certified disaster recovery partner',
    'IICRC S500 certified',
    'IICRC S520 certified',
    'restoration industry leaders',
    'NRP Group partnerships',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence/executive-partners',
});

export default function ExecutivePartnersPage() {
  const faqs = getOperationalExcellenceFaqs(SLUG);

  return (
    <>
      <OperationalExcellenceSchema
        title="Executive Partners — Industry-Leading Affiliations"
        description="Proudly affiliated with IICRC, CARSI, RestoreAssist and NRPG. Our executive partnerships set the standard for restoration excellence across Australia and New Zealand."
        slug={SLUG}
        faqs={faqs}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #6366F1 100%)',
          icon: <Handshake className="h-12 w-12" />,
          title: 'Executive Partners — Industry-Leading Affiliations',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Operational Excellence', href: '/operational-excellence' },
          { label: 'Executive Partners' },
        ]}
        stats={getOperationalExcellenceStats(SLUG)}
        sections={[
          ...getOperationalExcellenceSections(SLUG),
          {
            heading: 'Frequently Asked Questions',
            background: 'light' as const,
            body: (
              <div>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ag-primary-blue, #0F2942)' }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#374151' }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
        relatedPages={getRelatedPages('operational-excellence')}
      />
    </>
  );
}
