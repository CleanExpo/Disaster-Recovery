import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fire Damaged Contents Restoration',
  description: 'Professional fire damaged contents restoration services across Australia. 24/7 emergency response for belongings restoration, document recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/contents-restoration',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What items can be restored after fire and smoke damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many items can be salvaged including furniture, clothing, documents, photographs, electronics, artwork, and collectibles using ultrasonic cleaning, ozone treatment, freeze-drying for documents, and specialist electronics drying. Porous materials with deep soot penetration may not be restorable. IICRC-certified contents specialists assess each item individually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is contents restoration covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Contents restoration after fire damage is covered under most Australian contents insurance policies. You have the right to professional restoration attempts before contents are written off. Insurers must cover restoration costs up to replacement value. Document all affected items with photographs and purchase receipts before any cleaning or disposal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is pack-out and why is it used in fire restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pack-out involves removing all salvageable contents from the fire-damaged property to a specialist facility for cleaning and storage. This protects items from ongoing smoke and soot exposure, allows structural cleaning to proceed unimpeded, and enables thorough contents decontamination. Items are catalogued, cleaned, and returned when the property is ready for reoccupation.',
      },
    }
  ],
});

export default function FireDamagedContentsRestorationPage() {
  return (
    <>
      <Script id="contents-restoration-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Fire Damaged Contents Restoration',
        subtitle: 'Professional fire damaged contents restoration services across Australia. 24/7 emergency response for belongings restoration, document recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Fire Damaged Contents Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fire Damaged Contents Restoration', parentCategory: 'Fire Damage', context: 'salvaging and restoring belongings and documents after fire' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
    </>
  );
}
