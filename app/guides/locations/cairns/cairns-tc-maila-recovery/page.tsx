import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cairns TC Maila Recovery — Complete Guide for Property Owners 2026',
  description:
    'Complete TC Maila recovery guide for Cairns property owners. Cairns (4870) is the primary TC Maila landfall zone. What to do now, ARPC cyclone pool claims, mould prevention, and NRPG 60-minute post-clearance response.',
  keywords:
    'cairns TC Maila recovery, cyclone Maila cairns, cairns cyclone damage 2026, ARPC cyclone pool cairns, cairns 4870 cyclone recovery',
  alternates: {
    canonical: `${NAP.url}/guides/locations/cairns/cairns-tc-maila-recovery`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Cairns`,
  '@id': `${NAP.url}/#organization-cairns`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Cairns' },
    { '@type': 'Place', name: 'Far North Queensland' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cairns TC Maila Recovery Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cairns TC Maila Recovery Services',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Cairns`,
    '@id': `${NAP.url}/#organization-cairns`,
  },
  areaServed: { '@type': 'Place', name: 'Cairns' },
  serviceType: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone damage restoration, structural drying, mould remediation, and ARPC/insurer claim documentation for Cairns property owners affected by TC Maila April 2026. Primary landfall zone — 60-minute post-clearance response.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What should Cairns property owners do immediately after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait for Queensland Police or SES to confirm the all-clear before leaving shelter or entering your property. Do not re-enter during the calm of the eye — TC Maila\'s eye wall passed over Cairns and violent conditions returned as it tracked south. Photograph all damage immediately with timestamps before any cleanup or repairs. Notify your insurer within 24–48 hours to activate your Additional Living Expenses benefit. Lodge at disasterrecovery.com.au/claim — NRPG contractors are deployed across Cairns for 60-minute post-clearance response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the ARPC Cyclone Pool affect Cairns TC Maila claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairns (16.9°S) is well north of the Tropic of Capricorn and is fully within the ARPC Cyclone Reinsurance Pool coverage zone. The pool backs all home and building insurance policies in cyclone-prone regions — your claim is lodged directly with your own insurer, and the ARPC pool operates in the background. Lodge damage as three separate line items: cyclone wind damage, water ingress, and mould (if present). This prevents each being subsumed into a single underpaid lump sum.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is mould from TC Maila covered in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould directly caused by TC Maila water ingress is covered as a secondary consequence of the cyclone event. Cairns averages 35°C+ post-cyclone with humidity above 80%, which means visible mould can appear on wet plasterboard within 24–36 hours. Document the moisture chain: cyclone water entry point, spread path, and mould growth location. IICRC S520 containment and remediation documentation is required for insurer sign-off. Lodge mould as a separate line item within the cyclone claim, not as a standalone mould claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my Cairns insurer is slow to respond after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurers must acknowledge claims within 10 business days under ICA obligations. TC Maila is a declared catastrophe event — ICA catastrophe protocols require expedited processing. If your insurer does not respond within this timeframe, disputes a clearly cyclone-related item, or underpays the settlement, escalate to the Australian Financial Complaints Authority (AFCA) at no cost. NRPG provides a complete documentation package — psychrometric drying logs, moisture readings, scope of works, photographic records — that supports AFCA lodgements.',
      },
    },
  ],
};

export default function CairnsTCMailaRecoveryPage() {
  return (
    <>
      <Script
        id="cntcr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cntcr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cntcr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Cairns Location Guide"
        title="Cairns TC Maila Recovery — Complete Guide for Property Owners 2026"
        subtitle="Cairns (4870) is the primary TC Maila landfall zone. What Cairns property owners need to do now — emergency make-safe, ARPC cyclone pool claims, mould prevention, and full property restoration."
        gradient="linear-gradient(135deg, #4A0404 0%, #7B1FA2 50%, #0C2340 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-12"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Cairns', href: '/guides/locations/cairns' },
          { label: 'TC Maila Recovery' },
        ]}
        cta={{ text: 'Lodge TC Maila Claim — Cairns', href: '/claim' }}
        sections={[
          {
            heading: 'TC Maila Cairns Impact — What Happened',
            body: (
              <div className="space-y-4">
                <p>
                  Tropical Cyclone Maila made landfall across the Far North Queensland coast on 11&ndash;12 April 2026 as a Category 5 system, with sustained winds of 215 km/h. Cairns, situated at 16.9&deg;S on Trinity Inlet, was within the direct TC Maila landfall corridor. The Cairns region received the full force of TC Maila&rsquo;s eye wall passage — not the outer bands experienced further south, but the destructive core of the system.
                </p>
                <p>
                  <strong>Trinity Inlet and CBD storm surge</strong> pushed seawater into low-lying areas of the Cairns CBD, the Esplanade, and Trinity Beach. Properties fronting Trinity Inlet and the northern beaches (Machans Beach, Holloways Beach, Yorkeys Knob, Trinity Beach, Clifton Beach, Palm Cove) experienced combined storm surge inundation and wind-driven rain, creating compound water damage events across thousands of residential and commercial properties.
                </p>
                <p>
                  <strong>Barron River catchment flooding</strong> affected the western and northern suburbs. The Barron River, swollen by TC Maila&rsquo;s extreme rainfall event, rose rapidly through Smithfield, Caravonica, Freshwater, and Kewarra Beach. Properties in the Barron River floodplain experienced flood inundation in addition to wind and cyclone water ingress, creating dual-peril claims requiring separate coverage analysis — cyclone water ingress is pool-covered under ARPC; overland flood is a separate policy item.
                </p>
                <p>
                  <strong>Structural wind damage</strong> was widespread across all Cairns suburbs. At 215 km/h, TC Maila exceeded the design wind speed of many older residential structures built before the AS4055:2012 cyclone zone design updates. Roof structures in Cairns North, Bungalow, Manoora, Woree, Manunda, and Mooroobool sustained significant damage. Queenslander-style homes, lightweight steel frame construction, and fibrous cement cladding are particularly susceptible to Category 5 wind loads.
                </p>
                <p>
                  <strong>NRPG contractors are deployed</strong> across all Cairns postcodes. Emergency response teams with water extraction equipment, industrial drying arrays, and roof tarping materials are staging from pre-positioned depots for 60-minute post-clearance response across 4870, 4878, and 4879. Lodge at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to enter the priority response queue.
                </p>
              </div>
            ),
          },
          {
            heading: 'Cairns TC Maila Recovery — By Damage Type',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  TC Maila created multi-peril damage across Cairns. Identifying your damage types correctly at the point of claim lodgement is critical — each peril is assessed differently and, in some cases, covered under different policy sections.
                </p>
                <p>
                  <strong>Wind structural damage:</strong> Emergency make-safe is the immediate priority once the Queensland SES or Police issue the all-clear. Temporary roof tarping prevents further water ingress into cyclone-breached roof cavities. Securing compromised structural elements and boarding damaged openings prevents further deterioration. Make-safe costs are covered under the cyclone claim and can commence before formal insurer approval. Do not attempt DIY roof access after a Category 5 event — structural compromise may not be visually apparent from ground level.
                </p>
                <p>
                  <strong>Cyclone water ingress:</strong> The 24-hour window for extraction and drying commencement is critical in Cairns&rsquo; tropical climate. Water entering through cyclone-damaged roofs, walls, or windows is classified as cyclone water ingress and is covered under the ARPC Cyclone Pool. Extraction and structural drying must commence immediately — every hour of delay in Cairns&rsquo; heat accelerates secondary damage, category degradation, and mould establishment.
                </p>
                <p>
                  <strong>Barron River / overland flood:</strong> If your property was inundated by the Barron River or overland flow rather than cyclone water ingress, this is a separate peril. Standard home insurance flood cover applies, not the ARPC Cyclone Pool. Lodge flood damage as a separate claim line item from cyclone damage. NRPG documents which water damage is attributable to cyclone ingress and which to flood to ensure the correct policy section covers each component.
                </p>
                <p>
                  <strong>Mould:</strong> Cairns averages 35&deg;C post-cyclone with relative humidity consistently above 80%. Mould germination on wet plasterboard, timber framing, and insulation can begin within 24 hours of water ingress. Mould stemming directly from TC Maila water ingress is covered under the cyclone claim as a secondary consequence. Containment and remediation must begin before mould establishes across structural cavities — post-establishment remediation is significantly more expensive and takes longer to complete.
                </p>
                <p>
                  <strong>Contents damage:</strong> Contents damaged by TC Maila wind, water ingress, or flood are covered under a separate contents insurance policy section. Lodge contents damage with photographs and an itemised list. NRPG focuses on building and structure restoration but can refer contents specialists where required.
                </p>
              </div>
            ),
          },
          {
            heading: 'Insurance Claim Guide — TC Maila Cairns',
            body: (
              <div className="space-y-4">
                <p>
                  Lodging your TC Maila claim correctly from the outset determines your settlement outcome. Cairns property owners should understand how the ARPC Cyclone Pool applies and how to structure their claim to prevent underassessment.
                </p>
                <p>
                  <strong>ARPC Cyclone Pool mechanics:</strong> The Australian Reinsurance Pool Corporation (ARPC) Cyclone Reinsurance Pool covers all home and building insurance policies in cyclone-prone regions, including all of Queensland. TC Maila is a declared cyclone event — your claim is lodged with your own insurer as normal. The pool operates transparently behind the scenes; your rights and the claims process are unchanged. Contact your insurer directly to lodge — do not wait for them to contact you.
                </p>
                <p>
                  <strong>Correct lodgement structure:</strong> For maximum recovery, lodge TC Maila damage with distinct line items: (1) <strong>cyclone wind structural damage</strong> — building envelope breaches, roof damage, structural failure; (2) <strong>cyclone water ingress</strong> — interior water damage entering through cyclone-damaged openings; (3) <strong>mould</strong> — secondary mould growth arising directly from cyclone water ingress; (4) <strong>flood damage</strong> — separately, if your property was also inundated by overland flow or the Barron River. Each item requires separate documentation and may be assessed by different specialists.
                </p>
                <p>
                  <strong>Photographic evidence requirements:</strong> Timestamped photographs are the foundation of a TC Maila claim. Photograph the exterior of the property from all four elevations before any cleanup. Document every internal room with standing water, visible damage, and moisture readings. Photograph roof access points, compromised wall cavities, and any structural failures. All NRPG restoration work is documented with before/during/after photographs for inclusion in the claims package.
                </p>
                <p>
                  <strong>Preferred contractor rights:</strong> Your insurer may appoint their own preferred contractor. Under the ICA General Insurance Code of Practice, you have the right to use your preferred IICRC-certified contractor. If your insurer&rsquo;s contractor is unavailable, unresponsive, or cannot attend within a timeframe that prevents further damage, you can engage NRPG directly. NRPG provides identical claims documentation to that provided by insurer-appointed contractors.
                </p>
                <p>
                  <strong>AFCA escalation:</strong> If your insurer does not acknowledge your claim within 10 business days, disputes a clearly cyclone-related item, or issues a settlement that does not reflect the documented damage, escalate to AFCA. AFCA handles insurance complaints at no cost to the policyholder. NRPG&rsquo;s documentation package — psychrometric drying logs, scope of works, moisture readings, photographic records — is structured to support AFCA lodgements.
                </p>
              </div>
            ),
          },
          {
            heading: 'Recovery Timeline — What to Expect',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Cairns TC Maila recovery follows a structured timeline. As the primary landfall zone for a Category 5 event, some properties will require extended restoration programs — particularly those with combined wind, water, mould, and flood damage.
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Day 1: All-clear and emergency make-safe.</strong> Once Queensland SES or Police confirm area clearance, NRPG deploys within 60 minutes. Emergency roof tarping, structural securing, and boarding of compromised openings. Electrical safety check coordinated before power restoration. All make-safe works documented for the claim.
                  </li>
                  <li>
                    <strong>Days 1&ndash;3: Water extraction and drying deployment.</strong> Industrial water extraction from all affected areas. Deployment of structural drying and dehumidification equipment. Initial moisture mapping of all affected structural elements — walls, ceilings, floors, subfloors. Mould prevention treatment applied to vulnerable surfaces in Cairns&rsquo; tropical conditions.
                  </li>
                  <li>
                    <strong>Weeks 1&ndash;3: Structural drying monitoring.</strong> Industrial drying equipment operates continuously with daily psychrometric readings. In Cairns&rsquo; climate, structural drying typically takes 14&ndash;21 days for moderate water ingress. More extensive inundation events may require 28+ days. Drying logs are maintained throughout for the insurance claim.
                  </li>
                  <li>
                    <strong>Weeks 2&ndash;6: Scope approval and mould remediation.</strong> Full restoration scope prepared and submitted to the insurer. Insurer assessment (in-person or desktop review) occurs during this period. Mould remediation commences under IICRC S520 containment protocols once containment is established — do not delay mould remediation pending insurer approval if active mould growth is present.
                  </li>
                  <li>
                    <strong>Weeks 4&ndash;20: Repairs and rebuilds.</strong> Structural repairs — roof covering replacement, wall lining replacement, ceiling replacement, flooring, windows, doors, electrical — proceed once insurer scope approval is received. Category 5 structural damage (roof frame failure, load-bearing wall damage, full building envelope replacement) can extend the program to 6&ndash;12 months for the most severely affected properties.
                  </li>
                  <li>
                    <strong>Ongoing: Clearance testing and practical completion.</strong> Post-remediation air clearance testing confirms mould counts have returned to background levels before affected areas are reinstated. Clearance testing documentation is required for insurer sign-off. NRPG coordinates accredited laboratory clearance certification before final handover.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What should Cairns property owners do immediately after TC Maila?',
            answer:
              'Wait for Queensland Police or SES to confirm the all-clear before leaving shelter or entering your property. Photograph all damage with timestamps before any cleanup. Notify your insurer within 24–48 hours. Lodge at disasterrecovery.com.au/claim — NRPG contractors are deployed across Cairns for 60-minute post-clearance response. Do not commence permanent repairs without insurer scope approval.',
          },
          {
            question: 'How does the ARPC Cyclone Pool affect Cairns TC Maila claims?',
            answer:
              'Cairns (16.9°S) is fully within the ARPC Cyclone Reinsurance Pool zone. Lodge with your own insurer as normal — the ARPC pool operates in the background. Lodge cyclone wind damage, cyclone water ingress, and mould as separate line items within the same claim. If your property was also flooded by the Barron River, lodge flood as a separate peril.',
          },
          {
            question: 'Is mould from TC Maila covered in Cairns?',
            answer:
              'Yes — mould directly caused by TC Maila water ingress is covered as a secondary consequence of the cyclone event. In Cairns\' tropical heat, mould can appear within 24 hours. Document the moisture chain from cyclone entry point to mould growth. IICRC S520 documentation is required for insurer sign-off. Lodge mould as a separate line item within the cyclone claim.',
          },
          {
            question: 'What if my Cairns insurer is slow to respond after TC Maila?',
            answer:
              'Insurers must acknowledge claims within 10 business days under ICA obligations. TC Maila is a declared catastrophe — ICA protocols require expedited processing. Escalate to AFCA if your insurer does not respond or underpays. NRPG provides full documentation — psychrometric drying logs, scope of works, moisture readings — to support AFCA lodgements at no cost to you.',
          },
        ]}
        relatedGuides={[
          {
            title: 'TC Maila Recovery Hub',
            href: '/events/tc-maila-recovery-2026',
            description:
              'Central recovery hub for TC Maila across all FNQ postcodes — claim lodgement, government assistance, and contractor deployment status.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description:
              'Cairns cyclone damage restoration — IICRC-certified contractors, structural drying, and ARPC claim documentation.',
          },
          {
            title: 'Flood Damage Restoration Cairns',
            href: '/flood-damage-restoration-cairns',
            description:
              'Cairns flood damage restoration — Barron River inundation, storm surge, and insurance claim support.',
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
