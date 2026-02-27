import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'commercial-vs-residential-restoration';

export const metadata: Metadata = {
  title: 'Commercial vs Residential Restoration | BCA Compliance | NRPG',
  description:
    'Commercial vs residential disaster restoration: BCA class differences, ISO 22301 business continuity, multi-stakeholder coordination, and compliance requirements in Australia.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/commercial-vs-residential-restoration' },
};

export default function CommercialVsResidentialRestorationPage() {
  return (
    <>
      <KnowledgeSchema
        title="Commercial vs Residential Restoration"
        description="Differences between commercial and residential disaster restoration: BCA compliance, ISO 22301 business continuity, and multi-stakeholder coordination."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #334155 0%, #64748B 100%)',
          icon: <Building2 className="h-12 w-12" />,
          title: 'Commercial vs Residential Restoration',
          subtitle: 'BCA compliance, ISO 22301 business continuity, and multi-stakeholder coordination',
        }}
        cta={{ text: 'Commercial Services', href: '/services/commercial-services' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Commercial vs Residential' },
        ]}
        stats={[
          { label: 'BCA Classes', value: '1-9' },
          { label: 'Commercial Standard', value: 'ISO 22301' },
          { label: 'Ventilation', value: 'AS/NZS 1668.2' },
          { label: 'Service', value: '24/7' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
