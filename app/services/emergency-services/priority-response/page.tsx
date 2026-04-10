import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Priority Emergency Response',
  description: 'Professional priority emergency response services across Australia. 24/7 emergency response for rapid deployment, first response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/priority-response',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What qualifies a property for priority emergency response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Properties qualify for priority dispatch when: there is active water ingress or fire spread; the structure is unsafe or uninhabitable; essential services (power, water, gas) are disrupted; vulnerable occupants (elderly, children, people with disability) are present; or the commercial property has critical operations at risk. NRPG triages incoming requests and dispatches the closest available certified team to priority sites first.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does NRPG guarantee a rapid response time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG maintains IICRC-certified response teams in all major Australian metro areas and regional centres. Dispatch is 24/7 with a target response time of 60 minutes in metro areas, 2-4 hours in regional areas. Response time guarantees are subject to simultaneous catastrophic events affecting multiple properties — during declared disasters, response is prioritised by risk severity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if the emergency escalates after the first team arrives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The attending team assesses the full scope and calls for reinforcements immediately if the situation exceeds their capacity. NRPG has surge capacity through its national contractor network. In catastrophic events, we coordinate with emergency services, insurer catastrophe response teams, and government recovery agencies. You will receive a scope and timeline update within 2 hours of the initial team\'s arrival.',
      },
    }
  ],
});

export default function PriorityEmergencyResponsePage() {
  return (
    <>
      <Script id="priority-response-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Priority Emergency Response',
        subtitle: 'Professional priority emergency response services across Australia. 24/7 emergency response for rapid deployment, first response.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Priority Emergency Response' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Priority Emergency Response', parentCategory: 'Emergency Services', context: 'rapid deployment and first response for urgent disaster situations' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
