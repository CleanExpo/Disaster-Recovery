import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import {
  getOperationalExcellenceSections,
  getOperationalExcellenceFaqs,
  getOperationalExcellenceStats,
} from '@/lib/content-sections';
import { OperationalExcellenceSchema } from '@/components/operational-excellence/OperationalExcellenceSchema';
import { getRelatedPages } from '@/lib/internal-links';
import { generateSEO } from '@/lib/seo';

const SLUG = 'safety-ppe';

export const metadata: Metadata = generateSEO({
  title: 'Safety & PPE Standards | Protective Equipment | Disaster Recovery',
  description:
    'Rigorous safety and PPE standards protect every Disaster Recovery technician. Hazmat suits, helmets, respirators and Australian WHS-compliant protective gear deployed on every site.',
  keywords: [
    'safety PPE disaster recovery',
    'personal protective equipment restoration',
    'hazmat suit disaster response',
    'safety standards restoration industry',
    'WHS compliant disaster recovery',
    'respiratory protection mould remediation',
    'protective gear asbestos removal',
    'Australian safety standards restoration',
    'biohazard protective equipment',
    'disaster recovery safety training',
    'PPE compliance Australia',
    'safety protocols fire restoration',
    'air quality monitoring PPE',
    'contamination zone PPE requirements',
    'IICRC safety standards',
    'WorkSafe restoration requirements',
    'hazmat gear Australia',
    'safety equipment disaster sites',
    'technician safety training',
    'NRP Group safety standards',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence/safety-ppe',
});

export default function SafetyPpePage() {
  const faqs = getOperationalExcellenceFaqs(SLUG);

  return (
    <>
      <OperationalExcellenceSchema
        title="Safety & PPE — Protecting Our People on Every Site"
        description="Rigorous safety and PPE standards protect every Disaster Recovery technician. Hazmat suits, helmets, respirators and Australian WHS-compliant protective gear deployed on every site."
        slug={SLUG}
        faqs={faqs}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
          icon: <ShieldCheck className="h-12 w-12" />,
          title: 'Safety & PPE — Protecting Our People on Every Site',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Operational Excellence', href: '/operational-excellence' },
          { label: 'Safety & PPE' },
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
