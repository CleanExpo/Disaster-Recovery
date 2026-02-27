import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'water-damage-restoration-science';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Science | IICRC',
  description:
    'Comprehensive guide to water damage restoration science: IICRC S500 contamination categories, drying classes, psychrometric principles, and Australian insurance obligations.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/water-damage-restoration-science' },
};

export default function WaterDamageRestorationSciencePage() {
  return (
    <>
      <KnowledgeSchema
        title="Water Damage Restoration Science"
        description="IICRC S500 water damage restoration protocols, contamination categories, drying classes, and psychrometric drying science for Australian properties."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0369A1 0%, #06B6D4 100%)',
          icon: <Droplets className="h-12 w-12" />,
          title: 'Water Damage Restoration Science',
          subtitle: 'IICRC S500 protocols, contamination categories, and psychrometric drying principles',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Water Damage Restoration Science' },
        ]}
        stats={[
          { label: 'Water Categories', value: '3' },
          { label: 'Drying Classes', value: '4' },
          { label: 'Mould Risk Window', value: '24-48hrs' },
          { label: 'Standard', value: 'IICRC S500' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
