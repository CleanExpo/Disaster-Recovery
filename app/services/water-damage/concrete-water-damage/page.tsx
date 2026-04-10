import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Concrete Water Damage Restoration',
  description: 'Professional concrete water damage restoration services across Australia. 24/7 emergency response for concrete flooding, slab moisture.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/concrete-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does water damage affect concrete and how long does concrete take to dry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Concrete is porous and absorbs water into its matrix, reducing compressive strength, promoting rebar corrosion, and supporting mould growth on the surface. Concrete slabs in contact with floodwater take significantly longer to dry than timber or plasterboard — a standard 100mm concrete slab can take 30-90 days to reach equilibrium moisture content after saturation. Desiccant dehumidifiers with floor mats accelerate drying, but flooring cannot be reinstated until the slab is fully dry.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can flooring be installed over a wet concrete slab after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Installing timber, engineered timber, vinyl planks, or carpet over a wet slab causes immediate moisture damage to the new floor covering and creates the ideal conditions for mould growth between the slab and the floor. A moisture vapour emission rate (MVER) test or concrete relative humidity test must confirm the slab is within tolerance (typically below 75-80% RH in-slab) before any non-breathable floor covering is installed. Tile and grout can be installed over a moderately damp slab with appropriate moisture tolerant adhesives.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does flood-damaged concrete need to be replaced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rarely. Concrete that has been structurally sound prior to flooding and does not show cracking, spalling, or significant rebar corrosion does not need replacement — it needs drying and, in some cases, surface preparation before reinstating floor coverings. Concrete that was structurally compromised before the flood (poor curing, inadequate reinforcement, significant pre-existing cracking) should be assessed by a structural engineer.',
      },
    }
  ],
});

export default function ConcreteWaterDamageRestorationPage() {
  return (
    <>
      <Script id="concrete-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Concrete Water Damage Restoration',
        subtitle: 'Professional concrete water damage restoration services across Australia. 24/7 emergency response for concrete flooding, slab moisture.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Concrete Water Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Concrete Water Damage Restoration', parentCategory: 'Water Damage', context: 'concrete flooding and slab moisture remediation' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
