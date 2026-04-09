import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Gold Coast Storm and Canal Flooding — Emergency Response Guide',
  description:
    'Gold Coast storm flooding: canal estates, hinterland flash floods, ex-TC Alfred recovery. IICRC-certified restoration for the Gold Coast and Tweed Valley.',
  keywords:
    'gold coast storm flooding, canal estate flooding gold coast, ex-TC Alfred gold coast, gold coast flood damage restoration, hinterland flash flood gold coast',
  alternates: {
    canonical: `${NAP.url}/guides/locations/gold-coast/gold-coast-storm-flooding`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: `${NAP.name} Gold Coast`,
  '@id': `${NAP.url}/#organization-gold-coast`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  areaServed: [
    { '@type': 'Place', name: 'Gold Coast' },
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Gold Coast Storm and Flood Restoration Services',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Gold Coast Storm and Canal Flood Restoration',
  provider: {
    '@type': 'Organization',
    name: `${NAP.name} Gold Coast`,
    '@id': `${NAP.url}/#organization-gold-coast`,
  },
  areaServed: { '@type': 'Place', name: 'Gold Coast' },
  serviceType: 'Flood Damage Restoration',
  description:
    'IICRC-certified storm and flood damage restoration for Gold Coast canal estates, hinterland properties, and Tweed Valley. Emergency water extraction, structural drying, mould remediation, and insurance claim documentation for ex-TC Alfred and ongoing storm flood events.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why do Gold Coast canal estate properties flood differently to other homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Canal estates have direct water frontage on navigable canals connected to the Broadwater and coastal waterways. Storm surge from the Broadwater and Tweed River can push water up through stormwater drains and canal systems even without direct rainfall on the property itself. Compound flooding events — storm surge combined with extreme high tide — can inundate canal estate properties simultaneously from below (through drainage systems) and above (from rainfall). This compound mechanism creates more extensive damage than a typical rainwater flood.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ex-TC Alfred flood damage on the Gold Coast still claimable in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most insurers do not impose strict claim time limits for ex-TC Alfred, and supplementary claims for secondary mould damage and incomplete initial drying are still accepted. PERILS confirmed a final industry loss of AU$1.877 billion for the Alfred event. If your original Alfred claim was underpaid, or if secondary mould damage has emerged since the original claim, lodge a supplementary claim or escalate through AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Gold Coast home insurance cover canal flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Storm surge and coastal inundation through canal systems may require a flood extension on your home and contents policy. Check your Product Disclosure Statement (PDS) for the definition of \'flood\' — ICA\'s standard flood definition covers inundation from external water bodies, which includes canal systems. Many Gold Coast canal estate policies were challenged after ex-TC Alfred due to ambiguous flood vs storm surge categorisation. NRPG helps document which coverage category your damage falls into.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Gold Coast hinterland areas are at flash flood risk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gold Coast hinterland areas at elevated flash flood risk include: Currumbin Valley and Tallebudgera Valley (steep catchments with rapid runoff from Scenic Rim orographic rainfall), Mudgeeraba Creek corridor, Robina flood plain (Nerang River tributary), the Nerang River catchment broadly, and the Canungra Creek corridor. These areas experience rapid runoff during intense rainfall events associated with easterly troughs and tropical lows tracking down the Queensland coast.',
      },
    },
  ],
};

export default function GoldCoastStormFloodingPage() {
  return (
    <>
      <Script
        id="gcstfl-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="gcstfl-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="gcstfl-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Gold Coast Location Guide"
        title="Gold Coast Storm and Canal Flooding — Emergency Response Guide"
        subtitle="Canal estate storm surge, hinterland flash floods, and ex-TC Alfred recovery — what Gold Coast property owners need to know about flood damage and insurance claims"
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Gold Coast', href: '/guides/locations/gold-coast' },
          { label: 'Storm and Canal Flooding' },
        ]}
        cta={{ text: 'Get Emergency Flood Help — Gold Coast', href: '/claim' }}
        sections={[
          {
            heading: 'Gold Coast Flood Risk — Canal Estates vs Hinterland',
            body: (
              <div className="space-y-4">
                <p>
                  The Gold Coast faces two distinct flood risk profiles that require different response approaches and carry different insurance implications. Understanding which risk category your property falls into determines how your claim should be lodged and what documentation is required.
                </p>
                <p>
                  <strong>Broadwater canal system and coastal estate flooding:</strong> The Gold Coast&rsquo;s network of navigable canals — developed extensively through the 1970s&ndash;2000s across Southport, Paradise Point, Hope Island, Sanctuary Cove, Coomera, Helensvale, and surrounds — creates a direct hydraulic connection between residential properties and the Broadwater. Storm surge events from south-east Queensland coastal lows and tropical systems push the Broadwater level up, driving water through the canal network and into properties via ground-level drainage connections. Compound events — storm surge coinciding with a spring high tide — can affect canal estate properties that would not otherwise flood from rainfall alone.
                </p>
                <p>
                  <strong>Tweed River estuary:</strong> Southern Gold Coast properties at Coolangatta, Tugun, and Bilinga sit adjacent to the Tweed River estuary. The Tweed River mouth is prone to flooding during east coast lows and tropical systems that produce prolonged heavy rainfall across the Tweed catchment in Northern NSW. The international border does not create a hydrological boundary — Tweed River flooding affects Queensland-side properties as directly as NSW properties.
                </p>
                <p>
                  <strong>Gold Coast hinterland catchments:</strong> The Scenic Rim ranges immediately west of the Gold Coast generate intense orographic rainfall during east coast lows and tropical lows tracking down the Queensland coast. Currumbin Valley, Tallebudgera Valley, the Nerang River headwaters, and Canungra Creek all experience rapid runoff that reaches the coastal plain within hours of intense rainfall events. Low-lying hinterland properties in narrow valley floors are particularly vulnerable to flash flooding with limited warning time.
                </p>
                <p>
                  <strong>Ex-TC Alfred March 2026:</strong> Tropical Cyclone Alfred made an unusual southward track in March 2026, bringing extreme rainfall and coastal impacts to the Gold Coast corridor. The event generated both canal estate storm surge flooding and hinterland flash flooding simultaneously across the Gold Coast and Tweed Valley. Alfred was the most significant weather event to directly affect the Gold Coast in a generation, with PERILS confirming an industry-wide insured loss of AU$1.877 billion.
                </p>
              </div>
            ),
          },
          {
            heading: 'Ex-TC Alfred Gold Coast Recovery',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Ex-TC Alfred&rsquo;s March 2026 impact on the Gold Coast corridor was the largest weather insurance loss event in recent Queensland coastal history. Many Gold Coast property owners have outstanding claim issues — incomplete drying, secondary mould, disputed coverage categorisations, and underpaid settlements.
                </p>
                <p>
                  <strong>Alfred&rsquo;s impact on the Gold Coast corridor:</strong> Alfred generated storm surge of 0.8&ndash;1.2 metres above normal tide levels along the Gold Coast coastline, coinciding with a spring high tide cycle. Canal estates across Hope Island, Sanctuary Cove, Coomera, Helensvale, and surrounds experienced compound flooding from multiple directions simultaneously. Hinterland areas including Currumbin Valley and Tallebudgera Valley recorded extreme rainfall totals that produced rapid catchment flooding.
                </p>
                <p>
                  <strong>Outstanding Alfred claims:</strong> If your original Alfred claim was accepted but the payment does not cover the full scope of damage — incomplete structural drying, ongoing damp, secondary mould growth since the original claim, or missed contents items — a supplementary claim is available. Most home and building policies do not impose strict time limits for supplementary claims arising from the same event. Contact your insurer directly or escalate to AFCA if the insurer refuses a supplementary lodgement.
                </p>
                <p>
                  <strong>Supplementary mould claims:</strong> Mould that developed after incomplete initial drying from Alfred is a recoverable secondary consequence of the original flood event. If your property was not fully dried in the weeks following Alfred and mould has since appeared, lodge this as a supplementary Alfred claim. IICRC S520 documentation — moisture readings, mould scope of works, and clearance testing — is required for insurer sign-off. NRPG provides this documentation as part of the mould remediation scope.
                </p>
                <p>
                  <strong>NRPG documentation support for AFCA escalations:</strong> If your Alfred claim was underpaid or disputed, AFCA is the appropriate escalation pathway. NRPG provides a complete documentation package — drying logs, scope of works, photographic records, moisture reading timelines, and remediation records — that supports AFCA lodgements. Lodge your claim at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> to engage NRPG for documentation support.
                </p>
              </div>
            ),
          },
          {
            heading: 'Gold Coast Areas We Cover',
            body: (
              <div className="space-y-4">
                <p>
                  NRPG deploys IICRC-certified flood and storm damage restoration contractors across all Gold Coast suburbs, canal estates, and hinterland areas. Response times from the NRPG Gold Coast base are 60 minutes across the metropolitan area, with 90&ndash;120 minutes for hinterland and Tweed Valley locations.
                </p>
                <p>
                  <strong>Gold Coast metropolitan and coastal strip:</strong> Southport, Main Beach, Surfers Paradise, Broadbeach, Mermaid Waters, Mermaid Beach, Miami, Burleigh Heads, Palm Beach, Currumbin Beach, Tugun, Coolangatta.
                </p>
                <p>
                  <strong>Western Gold Coast suburbs:</strong> Robina, Varsity Lakes, Mudgeeraba, Reedy Creek, Tallebudgera, Bonogin, Worongary, Nerang, Advancetown.
                </p>
                <p>
                  <strong>Northern Gold Coast canal estates:</strong> Hope Island, Sanctuary Cove, Coomera, Upper Coomera, Helensvale, Runaway Bay, Biggera Waters, Labrador, Hollywell, Paradise Point.
                </p>
                <p>
                  <strong>Southern Gold Coast and Tweed Valley:</strong> Bilinga, Kirra, Tweed Heads (QLD side), Coolangatta, Currumbin, Currumbin Waters, Palm Beach.
                </p>
                <p>
                  <strong>Hinterland areas:</strong> Currumbin Valley, Tallebudgera Valley, Canungra, Beaudesert, Tamborine Mountain, Beechmont, Springbrook. Note: hinterland areas may have longer response times during active flood events due to road closures — lodge your claim early to secure priority queue placement.
                </p>
              </div>
            ),
          },
          {
            heading: 'Canal Estate Flood Insurance — What to Know',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Canal estate flood insurance is one of the most complex areas of residential property insurance in Australia. The following framework helps Gold Coast canal estate owners navigate their coverage and claim correctly.
                </p>
                <p>
                  <strong>Building policy vs body corporate (if strata):</strong> In strata-title canal estate properties (apartments, townhouses with shared walls or common property), flood damage to the building structure is covered under the body corporate building policy, not the individual owner&rsquo;s policy. Contents and improvements inside the lot boundary are covered by the individual owner&rsquo;s contents policy. Understanding the boundary between body corporate and individual owner responsibility is critical before lodging a canal flood claim.
                </p>
                <p>
                  <strong>Storm surge coverage gaps:</strong> Some Gold Coast home and building policies exclude storm surge as a separate peril or define it as falling under the &lsquo;flood&rsquo; extension rather than the standard &lsquo;storm&rsquo; cover. If your policy does not include a flood extension, storm surge damage may not be covered. After ex-TC Alfred, many Gold Coast canal estate owners discovered this gap. Check your PDS for the precise definitions of &lsquo;storm&rsquo;, &lsquo;storm surge&rsquo;, and &lsquo;flood&rsquo; as separate defined terms.
                </p>
                <p>
                  <strong>Overland flow exclusions:</strong> Some policies exclude &lsquo;overland flow&rsquo; — water that flows over the surface from an external source rather than falling directly as rain. Canal flood water that rises up through drainage connections and flows across the ground into a property may be categorised as overland flow rather than storm surge or flood. This categorisation matters — different sections of your policy may cover or exclude different flow types.
                </p>
                <p>
                  <strong>Documentation for canal flood vs rain flood distinction:</strong> The most important documentation for canal estate flood claims is establishing the source and mechanism of the flooding — was it storm surge through the canal system, direct rainfall, overland flow from neighbours, or a combination? NRPG documents the flood source and mechanism as part of the damage assessment, providing insurers with the evidence needed to correctly categorise and settle the claim. Lodge at <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> for immediate assessment.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Why do Gold Coast canal estate properties flood differently to other homes?',
            answer:
              'Canal estates have direct water frontage on navigable canals connected to the Broadwater. Storm surge can push water up through canal systems and stormwater drains even without direct rainfall. Compound flooding events — storm surge coinciding with extreme high tide — create simultaneous inundation from below and above that is more extensive than typical rain-only flooding.',
          },
          {
            question: 'Is ex-TC Alfred flood damage on the Gold Coast still claimable in 2026?',
            answer:
              'Yes — most insurers do not impose strict claim time limits for Alfred. Supplementary claims for secondary mould and incomplete drying are still accepted. PERILS confirmed AU$1.877B final loss. Lodge a supplementary claim or escalate through AFCA for underpaid Alfred claims.',
          },
          {
            question: 'Does Gold Coast home insurance cover canal flooding?',
            answer:
              'Storm surge and canal inundation may require a flood extension. Check your PDS for the definition of \'flood\' — ICA\'s standard flood definition covers inundation from external water bodies including canal systems. Many GC canal estate policies were challenged after Alfred. NRPG helps determine and document your coverage category.',
          },
          {
            question: 'What Gold Coast hinterland areas are at flash flood risk?',
            answer:
              'Currumbin Valley, Tallebudgera Valley, Mudgeeraba Creek, Robina flood plain, Nerang River catchment, and Canungra Creek corridor all experience rapid runoff from Scenic Rim orographic rainfall events and are at elevated flash flood risk during east coast lows and tropical systems.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Flood Damage Restoration Gold Coast',
            href: '/flood-damage-restoration-gold-coast',
            description:
              'Full flood damage restoration across the Gold Coast — canal estate flooding, hinterland flash floods, and insurance claim support.',
          },
          {
            title: 'Storm Damage Restoration Gold Coast',
            href: '/storm-damage-restoration-gold-coast',
            description:
              'Storm damage restoration for Gold Coast properties — wind, rain, and hail damage repair with IICRC-certified contractors.',
          },
          {
            title: 'Mould Remediation Gold Coast',
            href: '/mould-remediation-gold-coast',
            description:
              'IICRC S520-certified mould remediation across the Gold Coast — post-flood and post-cyclone mould removal and clearance testing.',
          },
        ]}
      />
    </>
  );
}
