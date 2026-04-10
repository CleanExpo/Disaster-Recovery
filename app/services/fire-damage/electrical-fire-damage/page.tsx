import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Electrical Fire Damage Cleanup',
  description: 'Professional electrical fire damage cleanup services across Australia. 24/7 emergency response for wiring fire, electrical burn damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/electrical-fire-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to re-enter a property after an electrical fire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Do not re-enter until emergency services and a licensed electrician have confirmed the property is safe. Electrical fires can cause hidden smouldering in wall cavities and ceiling spaces that reignites hours later. The electrical system must be isolated and inspected before any power is restored. Air quality testing is recommended before occupants return.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes electrical fires in Australian homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common causes include faulty wiring in older homes (especially pre-1980s with aluminium wiring), overloaded circuits, damaged or frayed power cords, malfunctioning appliances, and faults in switchboards. Electrical fires often begin inside wall cavities where the fire smoulders undetected before breaking out.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover electrical fire damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental electrical fire damage is covered by most Australian home and business insurance policies. The cause of the fire should be documented by a licensed electrician — this report is important evidence if the insurer seeks to deny the claim on maintenance grounds. Begin restoration documentation before any cleanup.',
      },
    }
  ],
});

export default function ElectricalFireDamageCleanupPage() {
  return (
    <>
      <Script id="electrical-fire-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Electrical Fire Damage Cleanup',
        subtitle: 'Professional electrical fire damage cleanup services across Australia. 24/7 emergency response for wiring fire, electrical burn damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Electrical Fire Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Electrical Fire Damage Cleanup', parentCategory: 'Fire Damage', context: 'wiring fire and electrical burn damage cleanup and restoration' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
