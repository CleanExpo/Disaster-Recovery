import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Washing Machine Flood Damage',
  description: 'Professional washing machine flood damage services across Australia. 24/7 emergency response for washing machine overflow, laundry flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/washing-machine-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do washing machines flood suddenly and what causes the most damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Washing machine flooding is caused by: inlet hose failure (the single most common cause of major domestic flooding — rubber inlet hoses have a 5-10 year lifespan); door seal failure on front-loaders; pump or motor failure during a cycle; and blocked drainage causing the tub to overflow. Inlet hose failure is catastrophic because mains water pressure (up to 500kPa) runs continuously until the supply is isolated — the machine does not stop filling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately when the washing machine floods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turn off the water supply to the washing machine at the isolation valve (behind the machine or under the sink) immediately. If you cannot reach the isolation valve, turn off at the mains stopcock. Turn off the machine power. Remove washing and begin absorbing surface water with towels. Do not use the machine again until a plumber has inspected and replaced the faulty component. Call NRPG for extraction and assessment of structural moisture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is washing machine flood damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental water damage from a leaking or flooding washing machine is covered under most Australian home insurance policies. The replacement cost of the washing machine itself is covered under contents insurance if it is damaged as part of the same event. Damage to neighbouring units (in a strata property) from a washing machine flood in your unit is covered under your liability provisions — notify the building manager and your insurer immediately.',
      },
    }
  ],
});

export default function WashingMachineFloodDamagePage() {
  return (
    <>
      <Script id="washing-machine-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Washing Machine Flood Damage',
        subtitle: 'Professional washing machine flood damage services across Australia. 24/7 emergency response for washing machine overflow, laundry flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Washing Machine Flood Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Washing Machine Flood Damage', parentCategory: 'Water Damage', context: 'washing machine overflow and laundry flooding cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
