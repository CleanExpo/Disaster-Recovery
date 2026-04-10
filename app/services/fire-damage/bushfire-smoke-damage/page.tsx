import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bushfire Smoke Damage',
  description: 'Professional bushfire smoke damage services across Australia. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/bushfire-smoke-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can bushfire smoke damage a home that was not directly in the fire zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bushfire smoke can travel tens of kilometres, depositing toxic soot and particulates on surfaces inside and outside properties not directly affected by flames. Properties within smoke plume zones often require professional cleaning of HVAC systems, soft furnishings, and hard surfaces. Smoke particulate penetrates ceiling insulation, wall cavities, and roof spaces — standard cleaning is insufficient.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health risks does bushfire smoke cause inside a home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bushfire smoke contains fine particulate matter (PM2.5), carbon monoxide, nitrogen oxides, and toxic compounds from burned vegetation and structures. Indoor exposure causes respiratory irritation, asthma exacerbation, and cardiovascular effects. Vulnerable occupants should not re-enter a smoke-affected property until professional air quality testing confirms safe levels.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover bushfire smoke damage if the property was not burned?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many Australian home insurance policies cover smoke damage as part of bushfire or fire damage coverage, even if the property was not directly burned. Check your Product Disclosure Statement under fire or smoke damage inclusions. We provide IICRC S700:2025 certified assessment reports to support smoke damage claims.',
      },
    }
  ],
});

export default function BushfireSmokeDamagePage() {
  return (
    <>
      <Script id="bushfire-smoke-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Bushfire Smoke Damage',
        subtitle: 'Professional bushfire smoke damage services across Australia. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Bushfire Smoke Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bushfire Smoke Damage', parentCategory: 'Fire Damage', context: 'wildfire and bushfire smoke damage restoration and air quality recovery' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
