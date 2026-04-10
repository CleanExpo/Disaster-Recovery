import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Data Centre Water Damage',
  description: 'Professional data centre water damage services across Australia. 24/7 emergency response for server room flooding, IT disaster.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/data-center-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the immediate priorities when a data centre floods?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immediately: isolate electrical supply to the affected zone — do not attempt this unless you have qualified electrical personnel on-site. Activate your business continuity plan and contact your managed services provider. Do not power on wet equipment — this causes permanent damage and creates electrical hazards. Contact an IICRC-certified restoration contractor for emergency water extraction and environmental stabilisation (temperature and humidity control) to protect sensitive equipment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged server and network equipment be recovered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some hardware can be recovered if power was off during water exposure and extraction begins within hours. Solid-state storage (SSDs, flash) has better recovery prospects than mechanical hard drives. Specialist IT asset recovery services can attempt recovery of individual drives. However, significant exposure — especially to contaminated or saline water — often results in total loss for electronic components.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you restore air conditioning and power infrastructure after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Electrical switchgear, UPS systems, PDUs, and HVAC equipment must be fully de-energised, inspected, and cleared by licensed electrical and mechanical engineers before reinstatement. NRPG coordinates specialist subcontractors for electrical, mechanical, and communications infrastructure as part of the data centre restoration scope.',
      },
    }
  ],
});

export default function DataCenterWaterDamagePage() {
  return (
    <>
      <Script id="data-center-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Data Centre Water Damage',
        subtitle: 'Professional data centre water damage services across Australia. 24/7 emergency response for server room flooding, IT disaster.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Data Centre Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Data Centre Water Damage', parentCategory: 'Commercial Services', context: 'server room flooding and IT infrastructure recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
