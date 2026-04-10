import { Metadata } from 'next';
import Script from 'next/script';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Electronics Water Damage',
  description: 'Professional electronics water damage services across Australia. 24/7 emergency response for computer water damage, device recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/electronics-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can electronics be saved after water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Electronics recovery depends on three factors: whether the device was powered on during water exposure, the category of water (clean versus contaminated), and how quickly treatment begins. Unpowered electronics exposed briefly to clean water have reasonable recovery prospects if treated within hours. Powered electronics that short-circuited during exposure, or those exposed to saltwater or contaminated water, have much lower recovery rates. Do not attempt to power on a water-damaged device — this causes irreversible damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately with a water-damaged laptop or phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Power off immediately if still on. Remove the battery if accessible. Do not shake, blow into, or use a hairdryer on the device. Remove SIM and memory cards and dry them separately. Place the device in a sealed bag with silica gel desiccant packets or in a warm (not hot) dry environment. Do not place in rice — this is ineffective and introduces starch particles into ports. Contact a specialist electronics recovery service within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is electronics water damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Electronics damaged by a covered water event (burst pipe, storm flooding) are claimable under home contents insurance up to the policy\'s contents limits and any applicable electronics sub-limits. Accidental water damage to portable electronics (dropping a phone in water) is covered under policies with accidental damage cover — check your PDS. We provide a damage assessment for each item to support the insurance claim.',
      },
    }
  ],
});

export default function ElectronicsWaterDamagePage() {
  return (
    <>
      <Script id="electronics-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Electronics Water Damage',
        subtitle: 'Professional electronics water damage services across Australia. 24/7 emergency response for computer water damage, device recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Electronics Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Electronics Water Damage', parentCategory: 'Specialty Services', context: 'computer and electronic device water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
