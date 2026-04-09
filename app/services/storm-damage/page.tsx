import { Metadata } from 'next';
import Script from 'next/script';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should I do immediately after storm damage to my home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prioritise safety — do not enter structurally compromised areas. Contact your insurer to lodge your claim. Photograph all damage before cleanup. Arrange emergency tarping for open roofs to prevent further water ingress, but keep receipts as these costs are usually claimable under your policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover cyclone and hail damage in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most Australian home insurance policies cover storm, cyclone, hail, and wind damage. Since 2022, the ARPC Cyclone Reinsurance Pool applies to cyclone events in northern Australia, which affects how some claims are handled. Lodge your claim promptly and document all damage with photos.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I claim for storm damage on my insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact your insurer as soon as safe to do so. Lodge as "storm damage" with itemised categories: roof damage, water ingress, structural impact, and contents. Request an IICRC-certified assessor — not just any contractor — to document the full scope. Keep all receipts for emergency repairs and temporary accommodation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between storm damage and flood damage for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm damage covers water entering through storm-damaged roof or walls. Flood damage refers to inundation from external water bodies (rivers, overflows). Many policies cover storm but exclude flood. Check your PDS carefully — NRPG can help identify which peril applies and ensure your claim is lodged correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can emergency roof repairs be done after a storm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG contractors can respond within 60 minutes of clearance from emergency services. Emergency tarping and make-safe works are typically completed within hours of arrival. Permanent roof repairs are scheduled after insurer scope approval, usually within 2–4 weeks for standard events.',
      },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Storm & Natural Disaster Recovery',
  description: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Storm Damage Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Storm & Natural Disaster Recovery | Emergency Response',
  description: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
  keywords: [
    'storm damage restoration',
    'cyclone damage repair',
    'hail damage restoration',
    'wind damage repair',
    'natural disaster recovery',
    'roof storm damage',
    'emergency roof repair',
    'storm cleanup',
    'tree damage removal',
    'flood damage restoration',
    'storm restoration company',
    'severe weather damage',
    'tornado damage repair',
    'lightning damage restoration',
    'bushfire damage recovery'
  ],
  openGraph: {
    title: 'Storm & Natural Disaster Recovery Services | 24/7',
    description: 'Professional storm and natural disaster recovery services. Expert cyclone, hail, and wind damage restoration with 24/7 emergency response nationwide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storm & Natural Disaster Recovery | Emergency Response',
    description: 'Expert storm damage restoration services. Professional cyclone, hail, and wind damage repair available 24/7.',
  },
  alternates: {
    canonical: '/services/storm-damage' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function StormDamagePage() {
  return (
    <>
    <Script id="storm-damage-faq-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <Script id="storm-damage-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm & Natural Disaster Recovery',
        subtitle: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm & Natural Disaster Recovery' },
      ]}
      sections={[
        {
          heading: 'Storm Damage Restoration Services',
          body: <ServiceChildLinks category="storm-damage" />,
        },
      ]}
      relatedPages={getRelatedPages('storm-damage')}
    />
    </>
  );
}
