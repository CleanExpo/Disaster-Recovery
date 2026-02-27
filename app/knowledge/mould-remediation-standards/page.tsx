import { Metadata } from 'next';
import { Microscope } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'mould-remediation-standards';

export const metadata: Metadata = {
  title: 'Mould Remediation Standards | IICRC S520 Protocols | NRPG',
  description:
    'Professional mould remediation standards: IICRC S520 containment protocols, HEPA filtration, antimicrobial treatment, and WHO indoor air quality guidelines for Australian properties.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/mould-remediation-standards' },
};

export default function MouldRemediationStandardsPage() {
  return (
    <>
      <KnowledgeSchema
        title="Mould Remediation Standards"
        description="IICRC S520 mould remediation protocols, containment requirements, HEPA filtration, and Australian landlord-tenant obligations for mould remediation."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #15803D 0%, #10B981 100%)',
          icon: <Microscope className="h-12 w-12" />,
          title: 'Mould Remediation Standards',
          subtitle: 'IICRC S520 containment, HEPA filtration, and post-remediation verification protocols',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Mould Remediation Standards' },
        ]}
        stats={[
          { label: 'Containment Pressure', value: '≥0.03 Pa' },
          { label: 'HEPA Efficiency', value: '99.97%' },
          { label: 'Mould Species (AUS)', value: '1,000+' },
          { label: 'Standard', value: 'IICRC S520' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
