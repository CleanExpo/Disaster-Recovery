import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Piano Water Damage Restoration',
  description: 'Professional piano water damage restoration services across Australia. 24/7 emergency response for musical instrument, piano flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/piano-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a piano be restored after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many pianos can be partially or fully restored after water damage depending on the extent of exposure and the speed of response. Uprights and grand pianos have different vulnerability — the soundboard, strings, pin block, and felt hammers are the most affected components. A brief clean water exposure with rapid drying has much better prospects than prolonged submersion or contaminated water exposure. Do not attempt to dry a piano with heaters — rapid drying causes the soundboard to crack.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the immediate treatment for a water-damaged piano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Move the piano away from water as soon as safely possible. Open the lid and front panels to allow air circulation. Remove standing water from the bottom of an upright piano with a dry cloth — do not tip the instrument. Allow the piano to dry slowly at room temperature (18-22°C) for at least two weeks before any mechanical assessment or tuning is attempted. Contact a piano technician to assess the pin block and strings before the first post-restoration tuning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a piano covered by home insurance after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pianos are contents items and are claimable under home contents insurance after a covered water damage event, up to the contents limit or any separately declared value. High-value instruments should be listed specifically on the policy with an agreed value. We provide condition assessment and restoration scope reports for piano insurance claims, coordinating with specialist piano technicians for technical assessment.',
      },
    }
  ],
});

export default function PianoWaterDamageRestorationPage() {
  return (
    <>
      <Script id="piano-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Piano Water Damage Restoration',
        subtitle: 'Professional piano water damage restoration services across Australia. 24/7 emergency response for musical instrument, piano flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Piano Water Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Piano Water Damage Restoration', parentCategory: 'Specialty Services', context: 'musical instrument and piano flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
