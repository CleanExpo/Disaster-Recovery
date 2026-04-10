import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Power Solutions',
  description: 'Professional emergency power solutions services across Australia. 24/7 emergency response for generators, temporary power.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-power',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is emergency power restoration required after a disaster?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency power restoration is required when a disaster event — storm, flood, fire, or structural damage — has disabled a building\'s electrical supply in a way that creates safety hazards or prevents essential systems (fire suppression, security, refrigeration, medical equipment) from operating. NRPG coordinates with licensed electricians for emergency switchboard assessment, temporary power supply, and safe reconnection as part of a broader make-safe scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to restore power to a property that has been flooded?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Never restore power to a flood-affected property without a licensed electrician\'s inspection and sign-off. Floodwater infiltrates switchboards, conduit, and electrical fittings. Energising a water-damaged electrical system causes electrocution risk, fire risk, and equipment damage. All electrical infrastructure must be inspected, tested, dried, and certified before reconnection. This applies to the mains connection and to every sub-circuit in the affected area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who pays for emergency electrical repairs after storm or flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Licensed electrician costs for emergency make-safe and reinstatement of electrical systems damaged by a covered event are claimable under home or business insurance. We coordinate with your licensed electrical subcontractor and provide the scope and cost documentation your insurer requires. Some insurers require their own assessor to approve major electrical scopes before work commences — we manage this process on your behalf.',
      },
    }
  ],
});

export default function EmergencyPowerSolutionsPage() {
  return (
    <>
      <Script id="emergency-power-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Power Solutions',
        subtitle: 'Professional emergency power solutions services across Australia. 24/7 emergency response for generators, temporary power.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Power Solutions' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Power Solutions', parentCategory: 'Emergency Services', context: 'temporary generators and emergency power supply after disasters' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
