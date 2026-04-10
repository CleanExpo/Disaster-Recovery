import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Smoke Odour Removal Services',
  description: 'Professional smoke odour removal services services across Australia. 24/7 emergency response for smoke smell, fire odour elimination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/smoke-odour-removal',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can smoke odour be completely eliminated after a fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Professional smoke odour removal using thermal fogging, ozone treatment, and hydroxyl generators can eliminate smoke odour at the molecular level. DIY cleaning and standard air fresheners are ineffective because smoke particles penetrate porous surfaces. IICRC-certified technicians treat all affected surfaces and airspace for complete odour neutralisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does smoke odour removal take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Surface deodorisation typically takes 1-3 days. Structural odour treatment using ozone or thermal fogging requires the property to be vacated for 4-12 hours per treatment cycle. Severe smoke events with deep penetration into wall cavities and insulation may require multiple treatment cycles and partial deconstruction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is smoke odour removal covered by fire insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Smoke odour removal is part of the scope of fire damage restoration covered under most Australian home and business policies. It must be completed to a professional standard — insurers expect IICRC S700:2025 certified documentation for smoke damage claims.',
      },
    }
  ],
});

export default function SmokeOdourRemovalServicesPage() {
  return (
    <>
      <Script id="smoke-odour-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Smoke Odour Removal Services',
        subtitle: 'Professional smoke odour removal services services across Australia. 24/7 emergency response for smoke smell, fire odour elimination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Smoke Odour Removal Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Smoke Odour Removal Services', parentCategory: 'Fire Damage', context: 'smoke smell elimination and fire odour treatment' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
