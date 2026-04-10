import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Drain Sewage Backup',
  description: 'Professional storm drain sewage backup services across Australia. 24/7 emergency response for stormwater overflow, drain flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/storm-drain-backup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do storm drains back up during heavy rain and what enters a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During intense rainfall, stormwater volumes exceed the capacity of council stormwater infrastructure. Surcharging stormwater drains cause water to back up through low-lying floor drains, downpipe connections, and property stormwater outlets. Stormwater backflow is classified as Category 3 (black water) because it contains sediment, agricultural runoff, animal waste, industrial chemicals, and microorganisms from the catchment — it is not clean water despite originating as rain.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you protect against future storm drain backups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Protection measures include: installation of stormwater backflow prevention valves on all property drain connections to the council system; raising floor drain outlets above the property\'s flood level; improving surface drainage to direct water away from the building perimeter; and considering a sump pump system for basements or below-grade areas. NRPG can advise on appropriate flood mitigation measures as part of the post-event assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is storm drain backup damage covered by home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stormwater and storm surge damage is covered under most Australian storm damage insurance policies. The key factor is whether the event was caused by a sudden storm — which it typically is. Check your PDS for flood versus storm exclusions, as some policies distinguish between riverine flooding and stormwater inundation. We provide incident documentation including storm date, rainfall data, and ingress point to support your claim.',
      },
    }
  ],
});

export default function StormDrainSewageBackupPage() {
  return (
    <>
      <Script id="storm-drain-backup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Storm Drain Sewage Backup',
        subtitle: 'Professional storm drain sewage backup services across Australia. 24/7 emergency response for stormwater overflow, drain flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Storm Drain Sewage Backup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Drain Sewage Backup', parentCategory: 'Sewage Cleanup', context: 'stormwater overflow and drain flooding' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
