import { Metadata } from 'next';
import { CloudRain } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'storm-flood-damage-recovery';

export const metadata: Metadata = {
  title: 'Storm & Flood Damage Recovery | Category 3 Protocols',
  description:
    'Storm and flood damage recovery in Australia: Category 3 floodwater protocols, IICRC S500, BOM severe weather data, flood insurance, and government disaster assistance.',
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge/storm-flood-damage-recovery' },
};

export default function StormFloodDamageRecoveryPage() {
  return (
    <>
      <KnowledgeSchema
        title="Storm & Flood Damage Recovery"
        description="Australian storm and flood damage recovery: Category 3 contamination protocols, IICRC S500, flood insurance, and government disaster recovery assistance."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 100%)',
          icon: <CloudRain className="h-12 w-12" />,
          title: 'Storm & Flood Damage Recovery',
          subtitle: 'Category 3 floodwater protocols, storm damage categories, and disaster assistance',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Storm & Flood Damage Recovery' },
        ]}
        stats={[
          { label: 'Severe Events/Year', value: '10,000+' },
          { label: 'Extraction Window', value: '24 hrs' },
          { label: 'Floodwater Category', value: 'Cat. 3' },
          { label: 'Standard', value: 'IICRC S500' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
