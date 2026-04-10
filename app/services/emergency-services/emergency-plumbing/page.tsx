import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Plumbing Services',
  description: 'Professional emergency plumbing services services across Australia. 24/7 emergency response for burst pipe repair, leak stop.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-plumbing',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is a plumbing failure a restoration emergency rather than just a plumbing job?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A plumbing failure becomes a restoration emergency when water has escaped into the building structure — soaking flooring, walls, ceiling cavities, or subfloor. A plumber stops the leak; a restoration contractor dries the structure. If water has been present for more than 30 minutes in a building, professional moisture assessment and structural drying are required. Category 2 or 3 water (grey or black water from burst sewage or contaminated sources) requires biohazard treatment in addition to drying.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately when a pipe bursts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turn off the water at the main stopcock immediately. Turn off electricity to the affected zone if water is near electrical fittings — do not do this if you must stand in water to reach the switchboard. Open windows to begin air circulation. Mop up as much surface water as possible with towels but do not use a standard vacuum — water will damage the motor. Call an emergency plumber and an IICRC-certified restoration contractor simultaneously.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover burst pipe water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden and accidental burst pipe damage is covered by most Australian home and business insurance policies. The cost of repairing or replacing the failed pipe itself may or may not be covered depending on the cause — ask your insurer. All consequential water damage to the building and contents is claimable. Begin emergency make-safe and drying immediately — do not wait for insurer approval as delay escalates the claim scope.',
      },
    }
  ],
});

export default function EmergencyPlumbingServicesPage() {
  return (
    <>
      <Script id="emergency-plumbing-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Plumbing Services',
        subtitle: 'Professional emergency plumbing services services across Australia. 24/7 emergency response for burst pipe repair, leak stop.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Plumbing Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Plumbing Services', parentCategory: 'Emergency Services', context: 'burst pipe repair and emergency leak stop services' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
