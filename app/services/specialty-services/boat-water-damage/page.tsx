import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Marine Water Damage',
  description: 'Professional marine water damage services across Australia. 24/7 emergency response for boat flooding, yacht restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/boat-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of water damage affect boats most severely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boats are most severely damaged by: bilge flooding from hull penetration, failed through-hulls, or sinking; storm damage to deck fittings and hatches causing below-decks flooding; freshwater ingress into navigation electronics and engine; and extended submersion causing corrosion of wiring, electronics, and engine components. Saltwater is significantly more damaging than freshwater — it corrodes electrical systems and mechanical components rapidly and requires immediate freshwater flushing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a swamped or sunk boat be restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many boats can be restored after swamping or partial sinking if treatment begins within days. The engine must be immediately assessed by a marine mechanic — submersion causes hydrolocking and severe corrosion if not treated promptly. Upholstery, carpeting, and electrical systems typically require replacement. Navigation electronics may or may not be recoverable depending on submersion depth and duration. GRP (fibreglass) hulls are generally restorable; timber hulls require more extensive assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is boat water damage covered by marine insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boat water damage from storm events, sinking, and accidental flooding is covered under most Australian recreational marine insurance policies. Cover depends on the vessel being appropriately maintained and operated within the policy conditions. NRPG provides condition and scope reports for marine insurance claims, working with your marine insurer\'s assessor to establish the restoration scope and claim value.',
      },
    }
  ],
});

export default function MarineWaterDamagePage() {
  return (
    <>
      <Script id="boat-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Marine Water Damage',
        subtitle: 'Professional marine water damage services across Australia. 24/7 emergency response for boat flooding, yacht restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Marine Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Marine Water Damage', parentCategory: 'Specialty Services', context: 'boat flooding and yacht water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
