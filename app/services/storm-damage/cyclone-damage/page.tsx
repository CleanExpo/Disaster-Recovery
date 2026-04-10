import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration services across Australia. 24/7 emergency response for tropical cyclone, hurricane damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/cyclone-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of damage does a cyclone cause to buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cyclones cause wind damage (roof sheet failure, cladding loss, window and door failures), water ingress through breached envelopes, storm surge flooding in coastal areas, structural damage from uplift forces on roofs, impact damage from flying debris, and flash flooding from extreme rainfall. Damage occurs simultaneously across multiple building systems — roof, structural frame, electrical, and contents — requiring a coordinated multi-trade restoration approach.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is it safe to inspect cyclone damage after the event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only re-enter a cyclone-damaged property once emergency services confirm the area is clear and the all-clear has been issued. Inspect for structural damage, downed powerlines, and gas leaks before entering. Do not enter if the roof or walls appear compromised. Take photographs of all damage immediately after entering. The ATO and state governments maintain disaster assistance portals for cyclone-affected areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does insurance respond to cyclone damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cyclone damage — both wind damage and storm surge/rainfall flooding — is covered under most Australian home and business insurance policies if the event is classified as a named cyclone or declared natural disaster. Some policies distinguish between wind and flood damage, so review your PDS carefully. Insurer catastrophe response teams are typically deployed after major cyclone events to expedite assessments. File your claim and lodge your NRPG emergency make-safe documentation as quickly as possible after the event.',
      },
    }
  ],
});

export default function CycloneDamageRestorationPage() {
  return (
    <>
      <Script id="cyclone-damage-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Cyclone Damage Restoration',
        subtitle: 'Professional cyclone damage restoration services across Australia. 24/7 emergency response for tropical cyclone, hurricane damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Cyclone Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Cyclone Damage Restoration', parentCategory: 'Storm Damage', context: 'tropical cyclone and hurricane damage recovery' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
