import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bedroom Mould Remediation',
  description: 'Professional bedroom mould remediation services across Australia. 24/7 emergency response for sleeping area mould, health risks.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/bedroom-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes mould in bedrooms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bedroom mould is typically caused by condensation on cold walls (common in poorly insulated homes in winter), moisture from occupant breath and perspiration overnight, water ingress through window frames or wall penetrations, or undetected leaks above the ceiling. Fitted wardrobes against external walls trap moist air and create cold spots. Poor cross-ventilation allows humidity to accumulate to levels that support mould growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can bedroom mould cause health problems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sleeping in a mould-affected room involves prolonged, low-level exposure to mould spores and mycotoxins. Health effects include respiratory irritation, allergic sensitisation, asthma exacerbation, recurrent sinus infections, skin reactions, and fatigue. Children, the elderly, and immunocompromised individuals are most at risk. Health symptoms should resolve after professional remediation and the source moisture is eliminated.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you remove mould from bedroom walls without making it worse?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do not dry-brush or vacuum mould without HEPA filtration — this releases spores throughout the room. NRPG technicians work under containment with negative air pressure to prevent spore spread, using HEPA-vacuuming, damp wiping with antifungal solutions, and penetrating biocide treatment. Affected plasterboard is replaced if mould has penetrated the paper facing. The moisture source is identified and rectified as part of the scope.',
      },
    }
  ],
});

export default function BedroomMouldRemediationPage() {
  return (
    <>
      <Script id="bedroom-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Bedroom Mould Remediation',
        subtitle: 'Professional bedroom mould remediation services across Australia. 24/7 emergency response for sleeping area mould, health risks.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Bedroom Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bedroom Mould Remediation', parentCategory: 'Mould Remediation', context: 'bedroom mould removal and health risks' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
