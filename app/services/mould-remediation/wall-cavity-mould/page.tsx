import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wall Cavity Mould Removal',
  description: 'Professional wall cavity mould removal services across Australia. 24/7 emergency response for inside wall mould, hidden mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/wall-cavity-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you detect mould inside wall cavities without opening the wall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG uses thermal imaging cameras to identify moisture pockets and cold spots that indicate condensation or water infiltration behind wall linings. Boroscope cameras can be inserted through small access holes to inspect cavity conditions without full demolition. Elevated moisture readings on the wall surface using a non-invasive moisture meter indicate likely cavity contamination. Where cavity mould is confirmed, targeted deconstruction is required for remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does wall cavity mould always require opening the wall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mould inside a wall cavity cannot be effectively treated without opening the wall to access the contamination. Fogging or spraying antifungal through small holes does not achieve adequate surface contact with mould growing on cavity-facing surfaces. IICRC S520:2025 requires physical access to contaminated surfaces for proper remediation. We minimise demolition scope with targeted access panels rather than full wall removal wherever possible.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes mould to grow inside wall cavities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wall cavity mould is caused by: plumbing leaks from within the wall (pipe joints, shower recess waterproofing failures); roof and gutter leaks tracking down wall framing; window frame condensation and seal failures; rising damp in masonry walls; and condensation on vapour barriers in poorly detailed construction. The moisture source must be identified and rectified — mould will recur if the cavity remains wet after treatment.',
      },
    }
  ],
});

export default function WallCavityMouldRemovalPage() {
  return (
    <>
      <Script id="wall-cavity-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Wall Cavity Mould Removal',
        subtitle: 'Professional wall cavity mould removal services across Australia. 24/7 emergency response for inside wall mould, hidden mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Wall Cavity Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wall Cavity Mould Removal', parentCategory: 'Mould Remediation', context: 'hidden mould inside wall cavities' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
