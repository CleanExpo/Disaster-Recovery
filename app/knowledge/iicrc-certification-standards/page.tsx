import { Metadata } from 'next';
import { Award } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'iicrc-certification-standards';

export const metadata: Metadata = {
  title: 'IICRC Certification Standards | 8 Core Standards Explained | NRP Group',
  description:
    'Complete guide to IICRC certification: 8 core standards (S500, S520, S540, S590, S700), certification levels, insurance recognition, and why it matters for your restoration claim.',
};

export default function IICRCCertificationStandardsPage() {
  return (
    <>
      <KnowledgeSchema
        title="IICRC Certification Standards"
        description="IICRC certification requirements, 8 core restoration standards, certification levels, and Australian insurance industry recognition."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #6D28D9 0%, #A855F7 100%)',
          icon: <Award className="h-12 w-12" />,
          title: 'IICRC Certification Standards',
          subtitle: '8 core standards, certification levels, and why certification matters for your claim',
        }}
        cta={{ text: 'Find Certified Contractors', href: '/contractors' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'IICRC Certification Standards' },
        ]}
        stats={[
          { label: 'Core Standards', value: '8' },
          { label: 'Training Hours', value: '14+' },
          { label: 'Certification Levels', value: '4' },
          { label: 'Credibility', value: '10/10' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
