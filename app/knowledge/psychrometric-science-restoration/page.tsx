import { Metadata } from 'next';
import { Thermometer } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'psychrometric-science-restoration';

export const metadata: Metadata = {
  title: 'Psychrometric Science in Restoration | Structural Drying | NRPG',
  description:
    'Psychrometric science in disaster restoration: temperature-humidity relationships, grain depression, vapour pressure differentials, and the drying equation for Australian conditions.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/psychrometric-science-restoration' },
};

export default function PsychrometricScienceRestorationPage() {
  return (
    <>
      <KnowledgeSchema
        title="Psychrometric Science in Restoration"
        description="Psychrometric science for structural drying: temperature-humidity relationships, grain depression, vapour pressure differentials, and ASHRAE standards."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0D9488 0%, #22D3EE 100%)',
          icon: <Thermometer className="h-12 w-12" />,
          title: 'Psychrometric Science in Restoration',
          subtitle: 'Temperature-humidity relationships, grain depression, and the drying equation',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Psychrometric Science' },
        ]}
        stats={[
          { label: 'VP Differential', value: '≥4.5 mmHg' },
          { label: 'Target RH', value: '30-50%' },
          { label: 'Timber MC Target', value: '8-12%' },
          { label: 'Standard', value: 'ASHRAE' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
