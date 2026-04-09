import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mackay TC Maila Recovery — Property Owner Guide 2026',
  description:
    'TC Maila recovery guide for Mackay property owners. Pioneer River flooding, cyclone wind damage, ARPC claims, and NRPG emergency response guide.',
  keywords:
    'mackay TC Maila recovery, cyclone Maila mackay, pioneer river flooding TC Maila, ARPC cyclone pool mackay 2026',
  alternates: {
    canonical: `${NAP.url}/guides/locations/mackay/mackay-tc-maila-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Mackay`,
  '@id': `${NAP.url}/#organization-mackay`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Mackay' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mackay TC Maila Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mackay TC Maila Recovery Services',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Mackay`,
    '@id': `${NAP.url}/#organization-mackay`,
  },
  areaServed: { '@type': 'Place', name: 'Mackay' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone and flood damage restoration for Mackay property owners affected by TC Maila. Pioneer River flood response, ARPC cyclone pool claims documentation, and multi-peril restoration across Mackay and the Whitsunday region.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Mackay directly in TC Maila\'s impact zone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mackay (21.1°S) is in TC Maila\'s projected southern impact zone for the April 11–14 2026 window. While the direct landfall occurred north of Mackay, the outer wind bands and sustained rainfall from TC Maila caused damage across the Mackay region, including Pioneer River catchment flooding and structural wind damage to residential and commercial properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Pioneer River flood risk from TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila rainfall in the Pioneer River catchment can cause river flooding independent of direct cyclone impact. The 2017 TC Debbie event generated Pioneer River flooding that affected low-lying Mackay suburbs including West Mackay and South Mackay. Lodge Pioneer River flooding as \'cyclone-related flooding\' under the TC Maila claim — it is a secondary consequence of the cyclone event and should be covered under the same ARPC pool claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool cover Mackay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Mackay (21.1°S) is north of the Tropic of Capricorn and the ARPC Cyclone Reinsurance Pool applies. Lodge your claim as \'cyclone damage\' to ensure ARPC pool processing. Your existing insurer handles the claim on behalf of the pool — the claims process is the same as a standard policy claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I lodge a Mackay TC Maila claim if my insurer says it\'s just storm damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila is a declared tropical cyclone — ARPC pool coverage applies regardless of how your insurer characterises the event. If your insurer categorises the damage as \'storm\' instead of \'cyclone\', dispute this characterisation through AFCA. The cyclone vs storm categorisation directly affects whether ARPC pool processing applies and can significantly affect your claim entitlements.',
      },
    },
  ],
};

export default function MackayTCMailaRecoveryPage() {
  return (
    <>
      <Script
        id="mkytcr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="mkytcr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="mkytcr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Mackay Location Guide"
        title="Mackay TC Maila Recovery — Property Owner Guide 2026"
        subtitle="What Mackay property owners need to know about TC Maila wind damage, Pioneer River flooding, ARPC cyclone pool claims, and NRPG emergency response"
        gradient="linear-gradient(135deg, #0C2340 0%, #1565C0 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Mackay', href: '/guides/locations/mackay' },
          { label: 'TC Maila Recovery' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Mackay', href: '/claim' }}
        sections={[
          {
            heading: 'Mackay\'s TC Maila Exposure — Risk Profile',
            body: (
              <div className="space-y-4">
                <p>
                  Mackay sits at 21.1&deg;S on the Queensland coast, placing it firmly within the ARPC Cyclone Reinsurance Pool&rsquo;s coverage zone and within the typical southern impact corridor of tropical cyclones that make landfall north of Cairns. TC Maila&rsquo;s April 2026 track brought both direct wind impacts from outer bands and significant rainfall into the Pioneer River catchment, creating a multi-peril event for Mackay property owners.
                </p>
                <p>
                  <strong>TC Debbie 2017 precedent:</strong> TC Debbie in March 2017 is the relevant modern precedent for Mackay. Despite making direct landfall at Airlie Beach (north of Mackay), Debbie generated Pioneer River flooding that inundated low-lying suburbs including West Mackay, South Mackay, and Walkerston. TC Maila follows a similar track profile, and Mackay property owners in Pioneer River flood-prone suburbs should anticipate the same compound damage pattern.
                </p>
                <p>
                  <strong>Expected TC Maila outer band impacts:</strong> Mackay experienced sustained winds of 70&ndash;110 km/h from TC Maila&rsquo;s outer bands — sufficient to damage older residential roof coverings, destroy shade structures, and strip cladding from poorly maintained building envelopes. The combination of sustained wind and extreme rainfall creates multi-peril damage that requires a single integrated claims approach.
                </p>
                <p>
                  <strong>NRPG pre-staging in Mackay:</strong> NRPG pre-positioned contractors and equipment in Mackay ahead of TC Maila&rsquo;s landfall. Emergency response teams with water extraction, structural drying, and roof tarping equipment were ready to deploy across the Mackay region immediately after the Bureau of Meteorology issued the all-clear. Lodge your claim at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to enter the priority response queue.
                </p>
              </div>
            ),
          },
          {
            heading: 'Multi-Peril Damage in Mackay — Wind + Water + Flood',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  TC Maila created overlapping damage types across the Mackay region. Property owners may have multiple simultaneous damage events — wind structural damage, stormwater ingress through breached building envelopes, Pioneer River flooding, and post-cyclone electrical hazards. NRPG handles all damage types under a single scope.
                </p>
                <p>
                  <strong>Cyclone wind damage:</strong> Damaged roof coverings, stripped cladding, destroyed shade structures, broken louvres and windows. Emergency make-safe — roof tarping, board-up, structural shoring — is the immediate priority. Make-safe costs are recoverable under the cyclone claim. Do not attempt DIY roof access on cyclone-damaged properties.
                </p>
                <p>
                  <strong>Stormwater ingress:</strong> Wind-driven rain penetrating breached roofs and broken windows is the most common form of cyclone water damage in Mackay. Water extraction and structural drying must commence within 24 hours of the all-clear. IICRC S500:2025 structural drying protocols apply. In Mackay&rsquo;s subtropical climate, standing water degrades to Category 2 within 24&ndash;48 hours.
                </p>
                <p>
                  <strong>Pioneer River flooding (if rainfall sufficient):</strong> Properties in Pioneer River flood-affected suburbs — West Mackay, South Mackay, Walkerston, Mirani — may experience riverine flooding independent of direct wind damage. Pioneer River flooding is lodged as &lsquo;cyclone-related flooding&rsquo; within the TC Maila claim. The BOM TC Maila event reference supports this lodgement categorisation.
                </p>
                <p>
                  <strong>Post-cyclone electrical fires:</strong> Damaged wiring, wet switchboards, and compromised electrical infrastructure create fire risk in cyclone-affected properties. All cyclone-damaged Mackay properties should have an electrical safety inspection before power is restored. NRPG coordinates licensed electricians as part of the post-cyclone make-safe protocol.
                </p>
              </div>
            ),
          },
          {
            heading: 'Mackay Claim Lodgement Guide',
            body: (
              <div className="space-y-4">
                <p>
                  Lodging your Mackay TC Maila claim correctly from the outset maximises your settlement. The following framework covers the key steps and documentation requirements.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>ARPC pool lodgement — use &#39;cyclone damage&#39;.</strong> Mackay (21.1&deg;S) is within the ARPC Cyclone Reinsurance Pool zone. Lodge your claim explicitly as &lsquo;cyclone damage&rsquo; to trigger ARPC pool processing. If your insurer attempts to categorise the damage as &lsquo;storm damage&rsquo;, dispute this — TC Maila is a declared tropical cyclone and the ARPC pool applies.
                  </li>
                  <li>
                    <strong>24-hour notification requirement.</strong> Notify your insurer of the TC Maila damage as soon as possible — within 24&ndash;48 hours of the event. Delayed notification can be used to dispute claim entitlements. Keep records of when and how you notified your insurer.
                  </li>
                  <li>
                    <strong>Documentation checklist.</strong> Photograph all damage immediately with timestamps. Record weather conditions at the time of damage. Keep all receipts for emergency make-safe expenditure. Record serial numbers and purchase dates for damaged contents. NRPG provides a comprehensive documentation package as part of the restoration scope.
                  </li>
                  <li>
                    <strong>BOM TC Maila event reference.</strong> The Bureau of Meteorology TC Maila event tracking data is the authoritative source confirming cyclone impact in the Mackay region. Reference the BOM event ID when lodging your claim. This data supports the ARPC pool classification of your claim.
                  </li>
                  <li>
                    <strong>NRPG single scope for all damage types.</strong> NRPG prepares a single integrated scope covering wind, water, flood, and mould damage. A unified scope prevents coverage gaps between damage types and ensures the full restoration is captured in a single claim document.
                  </li>
                </ol>
              </div>
            ),
          },
          {
            heading: 'Mackay Areas Covered by NRPG',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  NRPG deploys IICRC-certified contractors across all Mackay suburbs and the broader Whitsunday region. The following areas are covered for TC Maila emergency response and full restoration:
                </p>
                <p>
                  <strong>Mackay metropolitan area:</strong> Mackay CBD, North Mackay, South Mackay, West Mackay, East Mackay, Andergrove, Beaconsfield, Bucasia, Eimeo, Rural View, Mount Pleasant, Ooralea, Paget, Walkerston, Sarina, Pioneer Valley corridor (Marian, Mirani, Finch Hatton).
                </p>
                <p>
                  <strong>Airlie Beach and Whitsunday region:</strong> Airlie Beach, Cannonvale, Jubilee Pocket, Proserpine, Bowen, Collinsville. The Whitsunday region sits within TC Maila&rsquo;s direct impact corridor and experienced significant wind damage at and north of Airlie Beach.
                </p>
                <p>
                  <strong>Bowen:</strong> Bowen (19.9&deg;S) sits to the north of Mackay and experienced more direct TC Maila impact. NRPG covers Bowen and surrounding farming and coastal communities.
                </p>
                <p>
                  Response times from NRPG&rsquo;s pre-staged Mackay base are 60&ndash;90 minutes across all Mackay suburbs. Regional areas including Bowen, Collinsville, and the Pioneer Valley corridor are covered with response times of 90&ndash;120 minutes. Lodge your claim at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to confirm coverage and response availability for your location.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is Mackay directly in TC Maila\'s impact zone?',
            answer:
              'Mackay (21.1°S) is in TC Maila\'s projected southern impact zone for the April 11–14 2026 window. While the direct landfall occurred north of Mackay, the outer wind bands and sustained rainfall from TC Maila caused damage across the Mackay region, including Pioneer River catchment flooding.',
          },
          {
            question: 'What is the Pioneer River flood risk from TC Maila?',
            answer:
              'TC Maila rainfall in the Pioneer River catchment can cause river flooding independent of direct cyclone impact. The 2017 TC Debbie event generated Pioneer River flooding in West and South Mackay. Lodge river flooding as \'cyclone-related flooding\' under the TC Maila claim.',
          },
          {
            question: 'Does the ARPC Cyclone Pool cover Mackay?',
            answer:
              'Yes — Mackay (21.1°S) is north of the Tropic of Capricorn and the ARPC Cyclone Reinsurance Pool applies. Lodge your claim as \'cyclone damage\' to ensure ARPC pool processing. Your existing insurer handles the claim on behalf of the pool.',
          },
          {
            question: 'Can I lodge a Mackay TC Maila claim if my insurer says it\'s just storm damage?',
            answer:
              'TC Maila is a declared tropical cyclone — ARPC pool coverage applies regardless of how your insurer characterises the event. If your insurer categorises the damage as \'storm\' instead of \'cyclone\', dispute this through AFCA. The categorisation directly affects your ARPC pool entitlements.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description:
              'TC Maila emergency response for Far North Queensland — contractor coordination, claim lodgement, and recovery resources.',
          },
          {
            title: 'Cyclone Damage Restoration Mackay',
            href: '/cyclone-damage-restoration-mackay',
            description:
              'Full cyclone damage restoration for Mackay — structural drying, mould remediation, and ARPC claim documentation.',
          },
          {
            title: 'Storm Damage Restoration Mackay',
            href: '/storm-damage-restoration-mackay',
            description:
              'Storm damage restoration across the Mackay region — wind, water, and hail damage repair and insurance claim support.',
          },
        ]}
      />
    </>
  );
}
