import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Dishwasher Leak Water Damage',
  description: 'Professional dishwasher leak water damage services across Australia. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/dishwasher-leaks',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What parts of a dishwasher are most likely to leak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common dishwasher leak sources are: the door seal (especially on older machines where the door gasket has hardened); the inlet water supply hose (flexible braided hose at the dishwasher connection or the undersink isolation valve); the drain hose connection to the waste trap; the pump and motor housing in older machines; and the detergent dispenser seal. Undersink water damage from a dishwasher supply hose is one of the most common causes of kitchen base cabinet water damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much damage can an undetected dishwasher leak cause?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A slow drip from a dishwasher supply hose inside the cabinet can saturate the particleboard base of the cabinet and the subfloor beneath within days, without any visible water on the floor. By the time the damage is noticed, particleboard has swollen and delaminated, the floor covering is damaged, and mould is growing in the cabinet base. If a hose fails completely during a wash cycle, the dishwasher\'s water intake (typically 6-15 litres per cycle) floods continuously until the supply is turned off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is dishwasher leak damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental water damage from a leaking dishwasher is covered under most Australian home insurance policies. Gradual leaks from a slow drip that was not reported promptly may face scrutiny — insurers may apply a gradual damage exclusion if the damage is consistent with a long-standing slow leak rather than a sudden failure. Acting quickly on any sign of moisture under the dishwasher or in adjoining cabinets protects your claim.',
      },
    }
  ],
});

export default function DishwasherLeakWaterDamagePage() {
  return (
    <>
      <Script id="dishwasher-leak-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Dishwasher Leak Water Damage',
        subtitle: 'Professional dishwasher leak water damage services across Australia. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Dishwasher Leak Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Dishwasher Leak Water Damage', parentCategory: 'Water Damage', context: 'dishwasher overflow and kitchen water damage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
