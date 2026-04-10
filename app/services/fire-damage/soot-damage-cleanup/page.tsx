import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Soot Damage Cleaning',
  description: 'Professional soot damage cleaning services across Australia. 24/7 emergency response for soot removal, carbon cleaning.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/soot-damage-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is soot and why is it hazardous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Soot is a byproduct of incomplete combustion — fine carbon particles mixed with chemical residues from burned materials. It is hazardous because it contains carcinogens, heavy metals, and toxic organic compounds. Soot embeds in surfaces and airspace and cannot be removed safely by standard cleaning. Skin and respiratory contact must be avoided without PPE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean soot damage myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. DIY soot cleanup spreads contamination, drives particles deeper into porous surfaces, and creates airborne hazards. IICRC-certified technicians use HEPA-filtered vacuums, chemical sponges, and specialist cleaning agents to safely remove soot without spreading it. Attempting to wipe soot with standard cleaning materials typically worsens the damage and the resulting smell.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is soot removed from painted walls and ceilings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dry chemical sponges are used first to absorb loose soot without smearing. Specialist alkaline cleaning solutions neutralise soot deposits on hard surfaces. In severe cases, walls and ceilings require repainting after cleaning — soot residue will bleed through standard paint without an appropriate sealer. IICRC S700:2025 protocols govern the full process.',
      },
    }
  ],
});

export default function SootDamageCleaningPage() {
  return (
    <>
      <Script id="soot-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Soot Damage Cleaning',
        subtitle: 'Professional soot damage cleaning services across Australia. 24/7 emergency response for soot removal, carbon cleaning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Soot Damage Cleaning' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Soot Damage Cleaning', parentCategory: 'Fire Damage', context: 'soot removal and carbon cleaning after fire damage' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
