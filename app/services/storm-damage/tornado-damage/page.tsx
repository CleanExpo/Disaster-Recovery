import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Tornado Damage Cleanup',
  description: 'Professional tornado damage cleanup services across Australia. 24/7 emergency response for twister damage, severe wind.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/tornado-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do tornadoes occur in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Australia experiences tornadoes — referred to locally as \'willy-willies\' (dust devils) at the weak end and true tornadoes at the destructive end. Most Australian tornadoes are EF0-EF2 intensity. South-east Queensland, Western Australia\'s midwest, and parts of Victoria experience the highest tornado frequency. Damage patterns resemble cyclone damage but in a more localised path — intense roof and structural damage along a narrow corridor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes tornado damage restoration different from general storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tornado damage is extremely localised and often involves significant structural damage including roof removal, wall collapse, and impact damage from high-velocity debris. The restoration approach must address structural engineering assessment first, before any cleaning or material removal, to ensure the remaining structure is safe to work in. NRPG coordinates structural engineers as part of the initial site assessment for tornado-affected properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does insurance handle tornado damage versus cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tornado damage in Australia is covered under storm damage provisions in most home and business insurance policies. It does not require a cyclone declaration to be claimable — any sudden and extreme wind event causing structural damage is claimable as storm damage. Document the damage thoroughly with photographs from all angles immediately after the event and before any emergency repairs are made.',
      },
    }
  ],
});

export default function TornadoDamageCleanupPage() {
  return (
    <>
      <Script id="tornado-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Tornado Damage Cleanup',
        subtitle: 'Professional tornado damage cleanup services across Australia. 24/7 emergency response for twister damage, severe wind.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Tornado Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Tornado Damage Cleanup', parentCategory: 'Storm Damage', context: 'twister and severe wind damage restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
