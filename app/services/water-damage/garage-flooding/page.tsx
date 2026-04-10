import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Garage Flood Cleanup',
  description: 'Professional garage flood cleanup services across Australia. 24/7 emergency response for garage water damage, carport flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/garage-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes garages to flood and what damage results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Garages flood from: stormwater inundation through the door threshold (most common after heavy rain); surface drainage failure directing water into the garage; plumbing failure from a laundry or hot water system in the garage; and roof leaks. Damage includes water-damaged contents, flooring deterioration, particleboard or plasterboard wall lining damage, rust on metal shelving and stored vehicles, and potential mould if drying is delayed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do garages need professional drying after flooding or is it fine to let them air dry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A concrete garage floor typically dries adequately by air circulation if water exposure was brief (under a few hours) and the volume was limited. However, if water infiltrated internal wall linings, affected stored items, or reached the garage door bottom seal and frame, professional drying assessment is warranted. Any particleboard or plasterboard that absorbed water will not dry adequately without mechanical drying and will develop mould within weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is garage flooding covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Garage flooding from a storm event or plumbing failure is covered under most Australian home insurance policies as part of the structures cover (for the garage) and contents cover (for items stored in the garage). Motor vehicles must be covered under a separate comprehensive motor vehicle policy. Items stored in an unattached garage may be subject to contents sub-limits — check your PDS.',
      },
    }
  ],
});

export default function GarageFloodCleanupPage() {
  return (
    <>
      <Script id="garage-flooding-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Garage Flood Cleanup',
        subtitle: 'Professional garage flood cleanup services across Australia. 24/7 emergency response for garage water damage, carport flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Garage Flood Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Garage Flood Cleanup', parentCategory: 'Water Damage', context: 'garage water damage and carport flooding restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
