import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Black Mould Removal | IICRC Certified',
  description: 'Professional black mould removal services across Australia. 24/7 emergency response for toxic black mould, stachybotrys removal. IICRC S520:2025 certified.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/black-mould-removal',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is black mould more dangerous than other types of mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '\'Black mould\' commonly refers to Stachybotrys chartarum, which produces trichothecene mycotoxins that are toxic at low concentrations. However, colour alone does not identify mould species — many non-toxic moulds are black. Only laboratory testing can confirm Stachybotrys. Any extensive mould growth — regardless of colour — should be treated as potentially hazardous and remediated professionally under IICRC S520:2025 protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can black mould be killed with bleach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bleach disinfects surface mould on non-porous surfaces but does not penetrate porous materials to eliminate the root structure (hyphae). Stachybotrys grows on cellulose-based materials (plasterboard, timber) where bleach cannot reach. Water in bleach solution can also add moisture and feed further mould growth. Professional remediation involves removing contaminated materials and treating the underlying substrate with penetrating antifungal agents rather than surface-only disinfection.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should occupants vacate a property during black mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Occupants should vacate during active mould remediation work that involves demolition, HEPA vacuuming, and antifungal application. Children, pregnant women, the elderly, and immunocompromised individuals should not return until post-remediation air clearance testing is complete and spore counts meet IICRC S520:2025 clearance criteria. NRPG provides a clearance report before reoccupation.',
      },
    }
  ],
});

export default function BlackMouldRemovalPage() {
  return (
    <>
      <Script id="black-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Black Mould Removal Services',
        subtitle: 'Professional black mould removal services across Australia. 24/7 emergency response for toxic black mould, stachybotrys removal. IICRC S520:2025 certified.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Black Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Black Mould Removal', parentCategory: 'Mould Remediation', context: 'toxic black mould and stachybotrys removal' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
