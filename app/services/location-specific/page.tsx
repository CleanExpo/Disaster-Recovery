import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import Link from 'next/link';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Location-Specific Restoration Services',
  description: 'Disaster recovery services tailored to specific Australian locations. Brisbane CBD, Gold Coast, Sunshine Coast, Cairns, Townsville, and more.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Location-Specific Disaster Recovery',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Location-Specific Restoration Services',
  description: 'Disaster recovery services tailored to specific Australian locations. Brisbane CBD, Gold Coast, Sunshine Coast, Cairns, Townsville, and more.',
  alternates: { canonical: 'https://disasterrecovery.com.au/services/location-specific' },
};

const locationServices = [
  { title: 'Brisbane CBD Water Damage', href: '/services/location-specific/brisbane-cbd-water-damage', description: 'CBD flooding, high-rise water damage and downtown Brisbane emergency response.' },
  { title: 'Cairns Cyclone Damage', href: '/services/location-specific/cairns-cyclone-damage', description: 'Tropical cyclone damage restoration for Far North Queensland properties.' },
  { title: 'Gold Coast Flood Restoration', href: '/services/location-specific/gold-coast-flood-restoration', description: 'Gold Coast flood recovery for beachfront and canal properties.' },
  { title: 'Ipswich Flood Recovery', href: '/services/location-specific/ipswich-flood-recovery', description: 'Bremer River flood zone recovery for Ipswich homes and businesses.' },
  { title: 'Logan Water Damage', href: '/services/location-specific/logan-water-damage', description: 'Water damage restoration across the Logan City area.' },
  { title: 'Moreton Bay Flooding', href: '/services/location-specific/moreton-bay-flooding', description: 'Flood recovery for Moreton Bay Region properties.' },
  { title: 'Redlands Storm Damage', href: '/services/location-specific/redlands-storm-damage', description: 'Storm damage repair for Redland City and bayside suburbs.' },
  { title: 'Sunshine Coast Water Damage', href: '/services/location-specific/sunshine-coast-water-damage', description: 'Water damage restoration on the Sunshine Coast.' },
  { title: 'Toowoomba Water Damage', href: '/services/location-specific/toowoomba-water-damage', description: 'Toowoomba Range water damage and flash flood recovery.' },
  { title: 'Townsville Flood Restoration', href: '/services/location-specific/townsville-flood-restoration', description: 'Townsville flood and monsoonal damage recovery.' },
];

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does professional restoration response time vary by location across Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Response time is determined by contractor proximity, equipment availability, and access conditions. Metropolitan areas such as Sydney, Melbourne, and Brisbane have dense contractor networks enabling 2-4 hour emergency response. Regional centres like Toowoomba, Ballarat, and Cairns have established contractor presence with 4-8 hour response typical. Remote rural and outback areas require logistics planning for equipment and personnel deployment, with response times potentially extending 12-24+ hours depending on distance and road conditions. NRPG\'s national network is structured to triage jobs by severity and route nearest available contractors.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do local building codes and council requirements affect restoration work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Restoration work often triggers notification or approval obligations under local planning schemes and the National Construction Code (NCC). Structural repairs, changes to building fabric, and reinstatement works may require a building permit or development approval from the local council. In flood-affected areas, Queensland QFES, NSW SES, and other state authorities may specify drainage and resilience improvements as conditions of rebuilding permits. NRPG project managers coordinate compliance with local requirements as part of the full restoration project scope for each location.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are NRPG\'s local contractors selected and vetted for specific locations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG\'s contractor network is built on a proprietary vetting and onboarding process that includes: verification of current IICRC certification for the relevant work category; confirmation of adequate professional indemnity and public liability insurance (minimum $10M); trade licensing relevant to the scope (builder, plumber, electrician as applicable); police clearance for trauma and sensitive work categories; structured capability assessment for local equipment, vehicle assets, and crew capacity; and ongoing performance monitoring against response time, quality, and compliance standards.',
      },
    }
  ],
});

export default function LocationSpecificPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="location-svc-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <Script id="location-specific-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Location-Specific Restoration',
        subtitle: 'Disaster recovery services tailored to specific Queensland locations and their unique risk profiles, climate challenges, and local conditions.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific' },
      ]}
      sections={[
        {
          heading: 'Queensland Location Services',
          body: (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locationServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          ),
        },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
