import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'insurance-claims-process-australia';

export const metadata: Metadata = {
  title: 'Insurance Claims Process Australia | Disaster Recovery | NRPG',
  description:
    'Australian insurance claims process for disaster recovery: Insurance Contracts Act 1984, General Insurance Code of Practice, AFCA dispute resolution, and claims timeline guide.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/insurance-claims-process-australia' },
};

export default function InsuranceClaimsProcessPage() {
  return (
    <>
      <KnowledgeSchema
        title="Insurance Claims Process — Australia"
        description="Australian disaster recovery insurance claims guide covering the Insurance Contracts Act 1984, AFCA, claims timeline, and policyholder rights."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)',
          icon: <FileText className="h-12 w-12" />,
          title: 'Insurance Claims Process — Australia',
          subtitle: 'Insurance Contracts Act 1984, AFCA dispute resolution, and claims timeline',
        }}
        cta={{ text: 'Start a Claim', href: '/claim' }}
        secondaryCta={{ text: 'Get Emergency Help', href: '/emergency' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Insurance Claims Process' },
        ]}
        stats={[
          { label: 'Claim Acknowledgement', value: '10 days' },
          { label: 'Decision Deadline', value: '4 months' },
          { label: 'AFCA Limit', value: '$1.085M' },
          { label: 'Framework', value: 'ICA 1984' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
