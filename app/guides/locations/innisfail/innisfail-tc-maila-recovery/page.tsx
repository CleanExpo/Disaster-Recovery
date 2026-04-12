import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Innisfail TC Maila Recovery — Property Owner Guide 2026',
  description:
    'TC Maila recovery guide for Innisfail and Cassowary Coast property owners. Innisfail (4860) is in the TC Maila impact corridor. ARPC cyclone pool claims, mould prevention in tropical conditions, and NRPG 60-minute post-clearance response.',
  keywords:
    'innisfail TC Maila recovery, cyclone Maila innisfail, innisfail cyclone damage 2026, cassowary coast cyclone recovery 2026, innisfail 4860 cyclone',
  alternates: {
    canonical: `${NAP.url}/guides/locations/innisfail/innisfail-tc-maila-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Innisfail`,
  '@id': `${NAP.url}/#organization-innisfail`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Innisfail' },
    { '@type': 'Place', name: 'Cassowary Coast' },
    { '@type': 'Place', name: 'Far North Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Innisfail TC Maila Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Innisfail TC Maila Recovery Services',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Innisfail`,
    '@id': `${NAP.url}/#organization-innisfail`,
  },
  areaServed: { '@type': 'Place', name: 'Innisfail' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone damage restoration, structural drying, mould remediation, and ARPC claim documentation for Innisfail and Cassowary Coast property owners affected by TC Maila April 2026.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should Innisfail property owners do immediately after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for Queensland Police or SES to confirm the all-clear for your specific area before leaving shelter or entering your property. Photograph all damage with timestamps before any cleanup or repairs. Notify your insurer within 24–48 hours. Lodge at disasterrecovery.com.au/claim — NRPG is deployed across Innisfail (4860) and the Cassowary Coast for 60-minute post-clearance response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool apply to Innisfail TC Maila claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Innisfail (17.5°S, postcode 4860) is fully within the ARPC Cyclone Reinsurance Pool coverage zone. Lodge your claim with your own insurer as normal — the pool operates transparently in the background. For maximum recovery, lodge cyclone wind damage, water ingress, and mould as separate line items. If your property was also inundated by the Johnstone River or overland flow, lodge flood damage as a separate peril.',
      },
    },
    {
      '@type': 'Question',
      name: 'Innisfail has flooded before — how do I tell the difference between cyclone and flood damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cyclone water ingress enters through damaged building envelopes — breached roofs, compromised windows and walls, lifted cladding. Flood inundation enters at ground level via rising water. NRPG documents the source and path of all water damage as part of the restoration scope. This distinction determines whether the ARPC Cyclone Pool or your standard flood cover applies — getting it right prevents underassessment of either component.',
      },
    },
    {
      '@type': 'Question',
      name: 'Innisfail is the wettest town in Australia — how fast does mould spread after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Innisfail receives over 3,000mm of rainfall per year and humidity rarely drops below 75%. After TC Maila water ingress, mould germination on wet plasterboard and timber can begin within 12–24 hours in these conditions — faster than most other Australian locations. Mould from TC Maila is covered under the cyclone claim. Extraction and drying must commence at the earliest possible opportunity after the all-clear — every hour of delay increases remediation cost and timeline.',
      },
    },
  ],
};

export default function InnisfailTCMailaRecoveryPage() {
  return (
    <>
      <Script
        id="intcr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="intcr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="intcr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Innisfail Location Guide"
        title="Innisfail TC Maila Recovery — Property Owner Guide 2026"
        subtitle="Innisfail (4860) and the Cassowary Coast are in the TC Maila impact corridor. What property owners need to do now — emergency make-safe, ARPC cyclone pool claims, and rapid mould response in Australia's wettest town."
        gradient="linear-gradient(135deg, #4A0404 0%, #7B1FA2 50%, #0C2340 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Innisfail', href: '/guides/locations/innisfail' },
          { label: 'TC Maila Recovery' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Innisfail', href: '/claim' }}
        sections={[
          {
            heading: 'TC Maila Innisfail Impact — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Tropical Cyclone Maila made landfall across the Far North Queensland coast on 11&ndash;12 April 2026 as a Category 5 system with sustained winds of 215 km/h. Innisfail (4860), situated approximately 90 km south of Cairns on the Cassowary Coast, was within the TC Maila impact corridor. The Cassowary Coast Regional Council area — including Innisfail, Mourilyan, Babinda, and Tully — experienced significant wind and rain impact from TC Maila&rsquo;s passage.
                </p>
                <p>
                  <strong>Innisfail has historical cyclone exposure:</strong> Innisfail was severely damaged by Cyclone Larry in 2006 and Cyclone Yasi in 2011. Many properties in the Innisfail area were rebuilt or significantly repaired post-Larry and post-Yasi, with updated cyclone tie-downs and structural reinforcement. TC Maila has tested these upgrades — properties that were not upgraded post-Larry or post-Yasi are at significantly higher risk of structural failure.
                </p>
                <p>
                  <strong>Johnstone River flooding</strong> is a separate concern to cyclone damage. The North and South Johnstone Rivers, which converge at Innisfail, are prone to rapid rise during major rainfall events. TC Maila&rsquo;s extreme rainfall across the Atherton Tablelands catchment drove significant river rises, potentially inundating low-lying properties in Innisfail and Mourilyan separately from cyclone water ingress. Properties with both cyclone and flood damage require careful documentation of each peril&rsquo;s contribution.
                </p>
                <p>
                  <strong>Babinda Boulders corridor</strong> and the Bellenden Ker range — the wettest mountain range in Australia — channelled extreme rainfall from TC Maila into the Mulgrave and Russell River catchments, affecting properties in Gordonvale, Babinda, and Mirriwinni.
                </p>
                <p>
                  <strong>NRPG contractors are deployed</strong> across Innisfail (4860) and the Cassowary Coast for 60-minute post-clearance response. Lodge at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to enter the priority response queue.
                </p>
              </div>
            ),
          },
          {
            heading: 'Innisfail TC Maila — Damage Types and Mould Risk',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Innisfail&rsquo;s unique climate — Australia&rsquo;s highest annual rainfall, consistently high temperatures, and extreme humidity — makes rapid mould response after TC Maila more critical here than almost anywhere else in Australia.
                </p>
                <p>
                  <strong>Wind structural damage:</strong> TC Maila&rsquo;s outer bands delivered destructive wind loads across the Cassowary Coast. Make-safe works — roof tarping, structural securing, boarding of compromised openings — must commence immediately after the SES all-clear. Do not attempt DIY roof access. NRPG emergency teams are pre-staged for the region.
                </p>
                <p>
                  <strong>Cyclone water ingress:</strong> Water entering through cyclone-damaged building envelopes is covered under the ARPC Cyclone Pool. Lodge separately from any Johnstone River flood inundation. In Innisfail&rsquo;s climate, water extraction and drying must commence within hours — not days — of the all-clear. Category 1 clean water from cyclone ingress degrades rapidly to Category 2 in Innisfail&rsquo;s ambient conditions.
                </p>
                <p>
                  <strong>Mould — critical urgency in Innisfail:</strong> Innisfail receives over 3,000mm of annual rainfall and sits at the base of the Wet Tropics World Heritage Area. Ambient humidity rarely drops below 75%. After TC Maila water ingress, visible mould can appear on wet plasterboard within 12&ndash;24 hours. This is faster than Cairns, faster than Townsville, and faster than any temperate Australian location. Drying equipment must be deployed at the first available moment after the all-clear. Mould from TC Maila water ingress is covered under the cyclone claim.
                </p>
                <p>
                  <strong>Flood damage (Johnstone River):</strong> If your property was inundated by the Johnstone River or overland flow rather than cyclone water ingress, standard flood cover applies. NRPG documents which water damage is attributable to cyclone ingress and which to flood inundation, ensuring the correct policy section is applied to each component and preventing scope gaps that create claim disputes.
                </p>
                <p>
                  <strong>Post-Larry / post-Yasi upgrades:</strong> If your property was upgraded post-Larry (2006) or post-Yasi (2011), request the original restoration documentation from previous owners or your council. This establishes the pre-TC Maila structural standard and can support claims for damage that falls below the upgraded specification.
                </p>
              </div>
            ),
          },
          {
            heading: 'Insurance Claim Guide — TC Maila Innisfail',
            body: (
              <div className="space-y-4">
                <p>
                  Innisfail&rsquo;s cyclone history — Larry in 2006, Yasi in 2011, and now TC Maila in 2026 — means many properties have prior claims history. This affects how insurers assess TC Maila claims. Understanding the correct lodgement structure protects your recovery.
                </p>
                <p>
                  <strong>ARPC Cyclone Pool lodgement:</strong> Lodge with your own insurer as normal. Lodge separate line items for: (1) cyclone wind structural damage; (2) cyclone water ingress; (3) mould from cyclone water; (4) flood damage if applicable. Do not allow your insurer to combine these into a single assessment — each requires a different specialist and different remediation protocol.
                </p>
                <p>
                  <strong>Pre-existing damage considerations:</strong> Insurers may attempt to attribute TC Maila damage to pre-existing wear, prior cyclone events, or deferred maintenance. NRPG&rsquo;s documentation package identifies and separates TC Maila event damage from pre-existing conditions, protecting the claim from scope reduction on these grounds.
                </p>
                <p>
                  <strong>Preferred contractor rights:</strong> You have the right to use your preferred IICRC-certified contractor under the ICA General Insurance Code of Practice. NRPG provides the same documentation package — psychrometric drying logs, scope of works, moisture readings, photographic records — that insurer-appointed contractors provide.
                </p>
                <p>
                  <strong>AFCA escalation:</strong> If your insurer is unresponsive, underpays, or disputes a clearly cyclone-related item, escalate to AFCA. AFCA handles insurance complaints at no cost and is particularly relevant in Innisfail where claim disputes after Yasi in 2011 resulted in a significant number of AFCA escalations. NRPG&rsquo;s documentation package is designed to support these escalations.
                </p>
              </div>
            ),
          },
          {
            heading: 'Recovery Timeline — Innisfail',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Innisfail TC Maila recovery timelines are compressed relative to temperate locations due to the extreme mould risk and ongoing wet season conditions. Speed of make-safe and drying deployment is the single biggest factor in limiting total restoration cost.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>All-clear and immediate make-safe.</strong> NRPG deploys within 60 minutes of Queensland SES area clearance. Roof tarping, structural securing, boarding of openings. Mould prevention treatment applied to all wet surfaces at the point of make-safe — not deferred to later in the program.
                  </li>
                  <li>
                    <strong>Hours 1&ndash;24: Water extraction and drying deployment.</strong> Industrial extraction from all affected areas, including subfloor spaces. Deployment of structural drying and dehumidification equipment. Initial moisture mapping. In Innisfail&rsquo;s climate, equipment deployment within the first 24 hours is critical — drying that starts in 48 hours costs significantly more than drying that starts in 12.
                  </li>
                  <li>
                    <strong>Weeks 1&ndash;3: Structural drying monitoring.</strong> Daily psychrometric readings. Structural drying in Innisfail typically takes 14&ndash;28 days due to ambient humidity — equipment runs continuously. Drying logs maintained for the insurance claim throughout.
                  </li>
                  <li>
                    <strong>Weeks 2&ndash;6: Mould remediation and scope approval.</strong> IICRC S520 mould remediation under containment once assessment is complete. Full restoration scope submitted to insurer. Insurer assessment during this period.
                  </li>
                  <li>
                    <strong>Weeks 4&ndash;20: Structural repairs and rebuilds.</strong> Roof, wall linings, ceilings, flooring, windows, doors repaired or replaced. Air clearance testing at practical completion for mould remediation sign-off.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should Innisfail property owners do immediately after TC Maila?',
            answer:
              'Wait for Queensland Police or SES all-clear before leaving shelter or entering your property. Photograph all damage with timestamps. Notify your insurer within 24–48 hours. Lodge at disasterrecovery.com.au/claim — NRPG is deployed across Innisfail (4860) for 60-minute post-clearance response.',
          },
          {
            question: 'How does the ARPC Cyclone Pool apply to Innisfail TC Maila claims?',
            answer:
              'Innisfail (17.5°S, 4860) is fully within the ARPC pool zone. Lodge with your own insurer as normal. Lodge cyclone wind damage, water ingress, and mould as separate line items. If your property was also flooded by the Johnstone River, lodge flood as a separate peril with separate documentation.',
          },
          {
            question: 'Innisfail has flooded before — how do I tell the difference between cyclone and flood damage?',
            answer:
              'Cyclone water enters through damaged building envelopes — breached roofs, windows, walls. Flood inundation enters at ground level via rising water. NRPG documents the source and path of all water damage to ensure the correct policy section covers each component.',
          },
          {
            question: 'Innisfail is the wettest town in Australia — how fast does mould spread after TC Maila?',
            answer:
              'Mould germination can begin within 12–24 hours of water ingress in Innisfail\'s climate — faster than most Australian locations. Mould from TC Maila water ingress is covered under the cyclone claim. Extraction and drying must commence at the earliest possible opportunity after the all-clear.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila Recovery Hub',
            href: '/events/tc-maila-recovery-2026',
            description:
              'Central TC Maila recovery hub — claim lodgement, government assistance, and contractor deployment status across all FNQ postcodes.',
          },
          {
            title: 'Cairns TC Maila Recovery',
            href: '/guides/locations/cairns/cairns-tc-maila-recovery',
            description:
              'TC Maila recovery guide for Cairns — the primary landfall zone for the event.',
          },
          {
            title: 'Cyclone Damage Restoration Innisfail',
            href: '/cyclone-damage-restoration-innisfail',
            description:
              'Innisfail cyclone damage restoration — IICRC-certified contractors, structural drying, and ARPC claim documentation.',
          },
          {
            title: 'ARPC Cyclone Pool Explained',
            href: '/guides/insurance/arpc-cyclone-reinsurance-pool',
            description:
              'How the ARPC Cyclone Reinsurance Pool works and what it means for your TC Maila claim.',
          },
        ]}
      />
    </>
  );
}
