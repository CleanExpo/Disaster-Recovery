import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Water Damaged Art Restoration',
  description: 'Professional water damaged art restoration services across Australia. 24/7 emergency response for painting restoration, artwork recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/art-restoration',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can water-damaged artworks be restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many artworks can be stabilised and partially or fully restored by specialist conservators if treatment begins within hours. The key variables are the medium (oil on canvas is more resilient than watercolour on paper), the extent of water contact, whether the water was clean or contaminated, and how quickly treatment begins. Oil paintings on canvas soaked briefly with clean water have good restoration prospects. Watercolours and works on paper with extended water contact have much poorer prognosis.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately if artwork is water damaged?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Remove the artwork from the wet environment immediately. Lay it flat (not upright) on a clean dry surface — do not lean a wet canvas against a wall as this causes deformation. Blot (do not wipe) surface water gently with clean white cotton cloths. Do not apply heat or place in direct sun. Contact a conservator or specialist restoration service within hours. Photographs of the damage condition before any treatment are essential for insurance and restoration records.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is damaged art covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Artworks above a certain value typically require separate scheduling on a home insurance policy with a professionally assessed agreed value. Standard contents cover may include artworks up to a sub-limit (often $3,000-$5,000) which may be insufficient for significant pieces. We coordinate with specialist art insurance assessors and conservators, providing damage condition reports in the format insurers require for art damage claims.',
      },
    }
  ],
});

export default function WaterDamagedArtRestorationPage() {
  return (
    <>
      <Script id="art-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Water Damaged Art Restoration',
        subtitle: 'Professional water damaged art restoration services across Australia. 24/7 emergency response for painting restoration, artwork recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Water Damaged Art Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Water Damaged Art Restoration', parentCategory: 'Specialty Services', context: 'painting and artwork water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
