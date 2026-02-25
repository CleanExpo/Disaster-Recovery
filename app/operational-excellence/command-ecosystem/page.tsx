import { Metadata } from 'next';
import { Monitor } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import {
  getOperationalExcellenceSections,
  getOperationalExcellenceFaqs,
  getOperationalExcellenceStats,
} from '@/lib/content-sections';
import { OperationalExcellenceSchema } from '@/components/operational-excellence/OperationalExcellenceSchema';
import { getRelatedPages } from '@/lib/internal-links';
import { generateSEO } from '@/lib/seo';

const SLUG = 'command-ecosystem';

export const metadata: Metadata = generateSEO({
  title: 'Command Ecosystem | Technology Integration | Disaster Recovery',
  description:
    "Discover how Disaster Recovery's command ecosystem integrates iPads, mobiles and laptops for real-time claims management, GPS dispatch and IICRC-compliant reporting.",
  keywords: [
    'command ecosystem',
    'disaster recovery technology',
    'claims management app',
    'iPad disaster reporting',
    'mobile field technology',
    'restoration management software',
    'GPS contractor dispatch',
    'real-time restoration tracking',
    'IICRC digital reporting',
    'disaster response technology Australia',
    'emergency management platform',
    'restoration project management',
    'digital claims processing',
    'field operations technology',
    'cloud-based restoration',
    'contractor management system',
    'disaster recovery automation',
    'smart restoration tools',
    'restoration tech stack',
    'NRP Group technology',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence/command-ecosystem',
});

export default function CommandEcosystemPage() {
  const faqs = getOperationalExcellenceFaqs(SLUG);

  return (
    <>
      <OperationalExcellenceSchema
        title="Command Ecosystem — Integrated Technology for Disaster Response"
        description="Discover how Disaster Recovery's command ecosystem integrates iPads, mobiles and laptops for real-time claims management, GPS dispatch and IICRC-compliant reporting."
        slug={SLUG}
        faqs={faqs}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F172A 0%, #1E40AF 100%)',
          icon: <Monitor className="h-12 w-12" />,
          title: 'Command Ecosystem — Integrated Technology for Disaster Response',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Operational Excellence', href: '/operational-excellence' },
          { label: 'Command Ecosystem' },
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
