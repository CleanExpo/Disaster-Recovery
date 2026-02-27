import { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'biohazard-trauma-cleaning-standards';

export const metadata: Metadata = {
  title: 'Biohazard & Trauma Cleaning Standards | AS/NZS 3816 | NRPG',
  description:
    'Biohazard and trauma cleaning standards in Australia: IICRC S540, AS/NZS 3816 clinical waste management, bloodborne pathogen protocols, and WHS regulations.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/biohazard-trauma-cleaning-standards' },
};

export default function BiohazardTraumaCleaningStandardsPage() {
  return (
    <>
      <KnowledgeSchema
        title="Biohazard & Trauma Cleaning Standards"
        description="Australian biohazard cleaning standards: IICRC S540, AS/NZS 3816 clinical waste, bloodborne pathogen protocols, and meth lab decontamination guidelines."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
          icon: <ShieldAlert className="h-12 w-12" />,
          title: 'Biohazard & Trauma Cleaning Standards',
          subtitle: 'AS/NZS 3816 clinical waste, bloodborne pathogen protocols, and biohazard classification',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Biohazard & Trauma Cleaning' },
        ]}
        stats={[
          { label: 'Biohazard Levels', value: '3' },
          { label: 'Pathogen Kill Rate', value: '99.99%' },
          { label: 'Hep B Surface Life', value: '7 days' },
          { label: 'Standard', value: 'AS/NZS 3816' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
