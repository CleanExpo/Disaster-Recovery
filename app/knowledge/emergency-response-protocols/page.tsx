import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'emergency-response-protocols';

export const metadata: Metadata = {
  title: 'Emergency Response Protocols | PPRR Framework | NRPG',
  description:
    'Emergency disaster response protocols: PPRR framework, the golden hour in restoration, WHS obligations, professional response sequence, and Safe Work Australia compliance.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/emergency-response-protocols' },
};

export default function EmergencyResponseProtocolsPage() {
  return (
    <>
      <KnowledgeSchema
        title="Emergency Response Protocols"
        description="PPRR emergency response framework, professional response sequence, WHS obligations, and the golden hour principle in disaster restoration."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #DC2626 0%, #F43F5E 100%)',
          icon: <Siren className="h-12 w-12" />,
          title: 'Emergency Response Protocols',
          subtitle: 'PPRR framework, the golden hour, and professional emergency response sequence',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Make a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Emergency Response Protocols' },
        ]}
        stats={[
          { label: 'Response Target', value: '60 min' },
          { label: 'Cost Increase/Hour', value: '10-15%' },
          { label: 'PPRR Phases', value: '4' },
          { label: 'Availability', value: '24/7' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
