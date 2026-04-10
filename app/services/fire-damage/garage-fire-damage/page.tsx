import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Garage Fire Restoration',
  description: 'Professional garage fire restoration services across Australia. 24/7 emergency response for vehicle fire, garage smoke damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/garage-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can garage fire damage spread to the main house?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Garage fires frequently spread to the main structure through the shared wall, ceiling penetrations, or ductwork. Australian building codes require a fire-rated separation between an attached garage and the habitable dwelling — but older homes may lack compliant separation. A structural inspection is required after any garage fire to assess whether fire spread has occurred inside wall cavities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What items in a garage are typically restorable after fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metal tools, garden equipment, and stored items with non-porous surfaces can often be cleaned and deodorised. Vehicles require specialist assessment. Timber furniture, cardboard storage, and soft items heavily affected by smoke and heat are generally not restorable. A contents restoration specialist will assess each item individually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover garage fire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The garage structure and its contents are typically covered under Australian home and contents insurance policies. Items stored in the garage may be subject to contents sub-limits — check your Product Disclosure Statement. Vehicles must be covered under a separate comprehensive motor vehicle policy.',
      },
    }
  ],
});

export default function GarageFireRestorationPage() {
  return (
    <>
      <Script id="garage-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Garage Fire Restoration',
        subtitle: 'Professional garage fire restoration services across Australia. 24/7 emergency response for vehicle fire, garage smoke damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Garage Fire Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Garage Fire Restoration', parentCategory: 'Fire Damage', context: 'vehicle fire and garage smoke damage restoration' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
