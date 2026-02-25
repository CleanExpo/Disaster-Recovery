import { Metadata } from 'next';
import { FlaskConical } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import {
  getOperationalExcellenceSections,
  getOperationalExcellenceFaqs,
  getOperationalExcellenceStats,
} from '@/lib/content-sections';
import { OperationalExcellenceSchema } from '@/components/operational-excellence/OperationalExcellenceSchema';
import { getRelatedPages } from '@/lib/internal-links';
import { generateSEO } from '@/lib/seo';

const SLUG = 'chemical-remediation-assets';

export const metadata: Metadata = generateSEO({
  title: 'Chemical & Remediation Assets | Equipment | Disaster Recovery',
  description:
    'Professional chemical and remediation assets including negative air machines, antimicrobial treatments, branded containment systems and EPA-registered disinfectants for Australian restoration.',
  keywords: [
    'chemical remediation assets',
    'negative air machine restoration',
    'antimicrobial treatment disaster recovery',
    'EPA registered disinfectant restoration',
    'containment system disaster recovery',
    'branded restoration equipment',
    'HEPA filtration restoration',
    'decontamination equipment Australia',
    'remediation equipment professional',
    'air scrubber HEPA disaster',
    'chemical treatment mould removal',
    'professional restoration assets',
    'disaster recovery equipment fleet',
    'negative pressure containment',
    'antimicrobial application restoration',
    'caution tape disaster site',
    'branded safety equipment',
    'restoration chemical solutions',
    'industrial remediation Australia',
    'NRP Group equipment fleet',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence/chemical-remediation-assets',
});

export default function ChemicalRemediationAssetsPage() {
  const faqs = getOperationalExcellenceFaqs(SLUG);

  return (
    <>
      <OperationalExcellenceSchema
        title="Chemical & Remediation Assets — Professional-Grade Equipment"
        description="Professional chemical and remediation assets including negative air machines, antimicrobial treatments, branded containment systems and EPA-registered disinfectants for Australian restoration."
        slug={SLUG}
        faqs={faqs}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)',
          icon: <FlaskConical className="h-12 w-12" />,
          title: 'Chemical & Remediation Assets — Professional-Grade Equipment',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Operational Excellence', href: '/operational-excellence' },
          { label: 'Chemical & Remediation Assets' },
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
