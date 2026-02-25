import { Metadata } from 'next';
import { Flashlight } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import {
  getOperationalExcellenceSections,
  getOperationalExcellenceFaqs,
  getOperationalExcellenceStats,
} from '@/lib/content-sections';
import { OperationalExcellenceSchema } from '@/components/operational-excellence/OperationalExcellenceSchema';
import { getRelatedPages } from '@/lib/internal-links';
import { generateSEO } from '@/lib/seo';

const SLUG = 'field-essentials';

export const metadata: Metadata = generateSEO({
  title: 'Field Essentials | Deployment Kits | Disaster Recovery',
  description:
    'Battle-tested field essentials for Australian disaster recovery. Branded deployment kits with flashlights, powerbanks, weatherproof gear and emergency supplies for any environment.',
  keywords: [
    'disaster recovery field essentials',
    'emergency deployment kit Australia',
    'disaster response equipment pack',
    'field essentials restoration',
    'branded disaster recovery gear',
    'portable power disaster sites',
    'emergency lighting restoration',
    'weatherproof restoration equipment',
    'storm response field kit',
    'disaster recovery preparedness',
    'emergency supply kit professional',
    'field operations disaster recovery',
    'deployment readiness restoration',
    'disaster response equipment Australia',
    'portable equipment disaster recovery',
    'emergency preparedness tools',
    'professional restoration kit',
    'field technician equipment',
    'all-weather disaster gear',
    'NRP Group field essentials',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence/field-essentials',
});

export default function FieldEssentialsPage() {
  const faqs = getOperationalExcellenceFaqs(SLUG);

  return (
    <>
      <OperationalExcellenceSchema
        title="Field Essentials — Prepared for Any Environment"
        description="Battle-tested field essentials for Australian disaster recovery. Branded deployment kits with flashlights, powerbanks, weatherproof gear and emergency supplies for any environment."
        slug={SLUG}
        faqs={faqs}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1A3A2A 0%, #16A34A 100%)',
          icon: <Flashlight className="h-12 w-12" />,
          title: 'Field Essentials — Prepared for Any Environment',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Operational Excellence', href: '/operational-excellence' },
          { label: 'Field Essentials' },
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
