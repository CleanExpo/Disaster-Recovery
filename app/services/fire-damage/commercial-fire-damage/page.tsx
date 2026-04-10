import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Commercial Fire Restoration',
  description: 'Professional commercial fire restoration services across Australia. 24/7 emergency response for business fire, office fire damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/commercial-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is commercial fire damage restoration different from residential?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial fire restoration must balance restoration quality with business continuity. NRPG works in stages to restore operational sections while completing remediation of fire-damaged areas. Commercial sites have compliance requirements — asbestos, hazardous materials, occupational health — that residential properties do not. We coordinate with your insurer, loss adjuster, and facilities manager throughout.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a commercial property be partially operational during fire restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. NRPG establishes containment zones so unaffected areas remain operational during restoration. Air scrubbers maintain indoor air quality in occupied zones. Intensive work such as demolition, structural repair, and heavy cleaning is scheduled outside operating hours. A business continuity plan is developed before work begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does commercial fire damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minor commercial fire damage with limited structural impact typically takes 1-4 weeks. Major structural fire events requiring engineering assessment, hazardous material removal, structural repair, and full fit-out replacement can take 3-6 months. We provide a detailed timeline after initial assessment and update it weekly throughout the project.',
      },
    }
  ],
});

export default function CommercialFireRestorationPage() {
  return (
    <>
      <Script id="commercial-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Commercial Fire Restoration',
        subtitle: 'Professional commercial fire restoration services across Australia. 24/7 emergency response for business fire, office fire damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Commercial Fire Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Commercial Fire Restoration', parentCategory: 'Fire Damage', context: 'business and office fire damage restoration and recovery' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
