import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Ceiling Water Damage Repair | 24/7 Response',
  description: 'Expert ceiling water damage repair and restoration across Australia. Emergency response for ceiling leaks, sagging, and collapse prevention.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/ceiling-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is a wet or bulging ceiling dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A water-saturated plasterboard ceiling is at risk of sudden collapse. The weight of retained water can cause the ceiling to fail without warning. Do not stand under a bulging ceiling. If safe to do so, place a bucket and carefully make a small hole in the lowest point of the bulge to release water in a controlled manner rather than risking sudden collapse. Evacuate the area and contact an emergency make-safe contractor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes ceiling water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common causes in Australian properties are: roof leaks (cracked or displaced tiles, deteriorated flashing, failed skylights); burst or leaking plumbing in the ceiling space (bathroom above, roof-space hot water system or solar thermal); blocked gutters causing overflow under the eaves; and air conditioning condensate drain blockages. The cause must be identified and rectified before ceiling repairs — repairing the ceiling without fixing the source guarantees recurrence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged plasterboard ceilings be dried and retained or do they need replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wet plasterboard loses approximately 50% of its structural strength when saturated and does not return to full strength after drying. Plasterboard that has been wet for more than 24 hours, has delaminated, shows sagging or cracking, or is confirmed to have mould penetration must be replaced. Minor surface staining on plasterboard that dried rapidly (within 24 hours) and has not lost structural integrity may be retained after antimicrobial treatment and painting with stain-blocking primer.',
      },
    }
  ],
});

export default function CeilingWaterDamagePage() {
  return (
    <>
      <Script id="ceiling-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Ceiling Water Damage Repair',
        subtitle: 'Expert ceiling water damage repair and restoration across Australia. Emergency response for ceiling leaks, sagging, and collapse prevention.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Ceiling Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Ceiling Water Damage Repair', parentCategory: 'Water Damage', context: 'ceiling leak repair, sagging prevention, and collapse mitigation' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
