import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Office Water Damage Restoration',
  description: 'Professional office water damage restoration services across Australia. 24/7 emergency response for commercial flooding, workplace water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/office-water-damage',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you respond to office water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches IICRC-certified technicians as soon as a certified contractor is confirmed for your area in most metro areas, 24/7. For office water damage, rapid extraction is critical — water in commercial environments affects IT infrastructure, documents, electrical systems, and flooring. Every hour of delay increases the scope and cost of restoration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can office restoration be scheduled outside business hours?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Drying equipment can run continuously with remote monitoring, and intensive work such as carpet extraction, wall opening, and equipment installation can be scheduled overnight or on weekends to avoid disrupting your team. We develop a business continuity plan that minimises trading impact from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will office water damage be covered by business insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most commercial property insurance policies cover sudden water damage events including burst pipes, appliance failure, and roof leaks. Business interruption coverage may also apply if the property is uninhabitable. We provide IICRC-certified documentation — scope of works, moisture drying logs, photographs — to support your claim and minimise settlement delays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can IT equipment and documents be recovered after office flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many electronic components can be salvaged if extraction begins within hours. Documents, records, and media can often be freeze-dried or treated for recovery. We coordinate specialist contents restoration for electronics and documents as part of the overall scope. Do not attempt to power on wet electronics — this causes permanent damage and creates electrical hazards.',
      },
    },
  ],
});

export default function OfficeWaterDamageRestorationPage() {
  return (
    <>
      <Script id="office-wd-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
          icon: <Building2 className="h-12 w-12" />,
          title: 'Office Water Damage Restoration',
          subtitle: 'Professional office water damage restoration services across Australia. 24/7 emergency response for commercial flooding, workplace water.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Commercial Services', href: '/services/commercial-services' },
          { label: 'Office Water Damage Restoration' },
        ]}
        sections={getServiceChildSections({ serviceName: 'Office Water Damage Restoration', parentCategory: 'Commercial Services', context: 'commercial flooding and workplace water damage recovery' })}
        relatedPages={getRelatedPages('water-damage')}
      />
    </>
  );
}
