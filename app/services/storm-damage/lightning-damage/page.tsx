import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Lightning Strike Damage',
  description: 'Professional lightning strike damage services across Australia. 24/7 emergency response for electrical surge, lightning fire.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/lightning-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What damage does a lightning strike cause to a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A direct lightning strike or near-strike causes: electrical surge damage throughout the property\'s wiring and connected devices; fire at the strike point or in wiring within walls; structural damage at the strike point (chimney, roof apex, aerial); and induced voltage in telephone, data, and electrical cables causing downstream equipment failure. Lightning-induced surges cause appliance and electronics damage throughout a property even without a direct strike.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are appliances damaged by lightning covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lightning damage to appliances is covered under most Australian home and contents insurance policies as an accidental damage or electrical surge event. Document all affected appliances with model numbers, purchase receipts or valuations, and photographs. Some policies have sub-limits for surge damage or require a licensed electrician\'s report confirming the lightning cause. Do not discard any damaged items before insurer inspection or written permission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can lightning cause a fire inside a wall without it being immediately visible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lightning can arc between wiring and timber framing inside wall cavities, igniting a slow-smouldering fire that may not break out for hours. Any property struck by lightning or near-strike should be inspected by emergency services for evidence of hidden fire and by a licensed electrician for electrical system integrity before the property is reoccupied. NRPG provides structural assessment for fire and heat damage following lightning events.',
      },
    }
  ],
});

export default function LightningStrikeDamagePage() {
  return (
    <>
      <Script id="lightning-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Lightning Strike Damage',
        subtitle: 'Professional lightning strike damage services across Australia. 24/7 emergency response for electrical surge, lightning fire.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Lightning Strike Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Lightning Strike Damage', parentCategory: 'Storm Damage', context: 'electrical surge and lightning fire restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
