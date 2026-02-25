import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getKnowledgeBaseSections, getKnowledgeEntryFaqs } from '@/lib/content-sections';
import { KnowledgeSchema } from '@/components/knowledge/KnowledgeSchema';
import { getRelatedPages } from '@/lib/internal-links';

const SLUG = 'fire-damage-restoration-process';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Process | IICRC S540 Standards | NRP Group',
  description:
    'Complete fire damage restoration process: IICRC S540 standards, 4-phase restoration, smoke particle science, asbestos obligations, and Australian insurance claims for fire damage.',
};

export default function FireDamageRestorationProcessPage() {
  return (
    <>
      <KnowledgeSchema
        title="Fire Damage Restoration Process"
        description="IICRC S540 fire and smoke damage restoration process, toxic combustion compounds, asbestos obligations, and Australian insurance claims."
        slug={SLUG}
        faqs={getKnowledgeEntryFaqs(SLUG)}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #C2410C 0%, #EF4444 100%)',
          icon: <Flame className="h-12 w-12" />,
          title: 'Fire Damage Restoration Process',
          subtitle: 'Four-phase restoration, IICRC S540 standards, and smoke particle science',
        }}
        cta={{ text: 'Get Emergency Help', href: '/emergency' }}
        secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Base', href: '/knowledge' },
          { label: 'Fire Damage Restoration Process' },
        ]}
        stats={[
          { label: 'Toxic Compounds', value: '400+' },
          { label: 'Smoke Particle Size', value: '0.01-4μm' },
          { label: 'Restoration Phases', value: '4' },
          { label: 'Standard', value: 'IICRC S540' },
        ]}
        sections={getKnowledgeBaseSections(SLUG)}
        relatedPages={getRelatedPages('knowledge-base')}
      />
    </>
  );
}
