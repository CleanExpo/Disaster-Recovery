import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'insurance-payout-settlement';

export const metadata: Metadata = {
  title: 'Insurance Payouts & Cash Settlements | Disaster Recovery | NRPG',
  description:
    'When to accept an insurance payout, when to refuse, contents claims strategy, hidden damage risks, and your rights under Australian insurance law.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/insurance-payout-settlement' },
};

export default function InsurancePayoutSettlementPage() {
  return (
    <>
      <KnowledgeSchema
        title="Insurance Payouts & Cash Settlements"
        description="Comprehensive guide to insurance cash settlements in Australian property restoration — when payouts work in your favour, when they cost you more, and how to protect your rights."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #92400E 0%, #D97706 100%)',
          icon: <DollarSign className="h-12 w-12" />,
          title: 'Insurance Payouts & Cash Settlements',
          subtitle: 'When to accept, when to refuse, and how to protect your rights under Australian insurance law',
        }}
        cta={{ text: 'Get a Professional Assessment', href: '/claim' }}
        secondaryCta={{ text: 'Insurance Claims Guide', href: '/knowledge/insurance-claims-process-australia' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Insurance Payouts & Cash Settlements' },
        ]}
        stats={[
          { label: 'Framework', value: 'ICA 1984' },
          { label: 'Dispute Body', value: 'AFCA' },
          { label: 'Dispute Limit', value: '$1.085M' },
          { label: 'Key Risk', value: 'Hidden Damage' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
