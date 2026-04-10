import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Basement Sewage Flooding',
  description: 'Professional basement sewage flooding services across Australia. 24/7 emergency response for lower level sewage, underground backup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/basement-sewage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What category of water is sewage in a basement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sewage is Category 3 (black water) — the highest contamination category under IICRC S500:2025. It contains bacteria (E. coli, Salmonella), viruses (Hepatitis A, Norovirus), and parasites (Cryptosporidium, Giardia). Do not enter a sewage-flooded basement without full PPE. Do not operate electrical appliances or switches. All porous materials in contact with black water must be removed and disposed of — they cannot be adequately decontaminated.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly must sewage cleanup begin in a basement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immediately. Category 3 water begins degrading structural materials within hours and creates ideal conditions for mould growth within 24-48 hours. The health risk to occupants increases with every hour sewage remains in the space. NRPG provides 24/7 emergency sewage extraction. All work follows IICRC S500:2025 — extraction, decontamination, structural drying, and clearance testing in sequence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can basement contents be saved after a sewage backup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non-porous items — metal tools, sealed appliances, glass, sealed plastic containers — can typically be decontaminated. All porous materials that were in direct contact with sewage (cardboard, timber furniture, rugs, clothing, paper) must be disposed of as contaminated waste. We conduct a contents assessment and document all disposed items for your insurance claim.',
      },
    }
  ],
});

export default function BasementSewageFloodingPage() {
  return (
    <>
      <Script id="basement-sewage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Basement Sewage Flooding',
        subtitle: 'Professional basement sewage flooding services across Australia. 24/7 emergency response for lower level sewage, underground backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Basement Sewage Flooding' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Basement Sewage Flooding', parentCategory: 'Sewage Cleanup', context: 'lower level and underground sewage backup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
