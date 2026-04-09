import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cairns Cyclone Mould Response — TC Maila Post-Storm Guide 2026',
  description:
    'Why mould hits Cairns properties within 48 hours of TC Maila. IICRC S520 mould response for the tropical north. Act now before the humidity does the damage.',
  keywords:
    'cairns cyclone mould, TC Maila mould cairns, post-cyclone mould FNQ, mould remediation cairns tropical',
  alternates: {
    canonical: `${NAP.url}/guides/locations/cairns/cairns-cyclone-mould-response`,
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
    { '@type': 'State', name: 'Queensland' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cairns Cyclone Mould Remediation',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cairns Cyclone Mould Remediation',
  provider: { '@type': 'Organization', name: `${NAP.name} Cairns`, '@id': `${NAP.url}/#organization-cairns` },
  areaServed: { '@type': 'Place', name: 'Cairns' },
  serviceType: 'Mould Remediation',
  description:
    'IICRC S520:2023 post-cyclone mould remediation for Cairns and Far North Queensland. Containment, HEPA air scrubbing, antimicrobial treatment, clearance testing, and ARPC/insurer documentation for TC Maila mould claims.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does mould appear in Cairns after TC Maila?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould can appear within 24–48 hours of cyclone water ingress in Cairns. The city averages 85% relative humidity year-round, and post-cyclone temperatures of 28–32°C create ideal mould germination conditions. Visible mould growth can appear on wet plasterboard within 36 hours — significantly faster than in temperate Australian cities. Every hour without drying and remediation intervention increases the scope and cost of mould removal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does TC Maila mould remediation involve in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TC Maila mould remediation in Cairns follows the IICRC S520:2023 standard. This involves establishing physical containment with 600mm polyethylene barriers, deploying HEPA air scrubbers to create negative air pressure in affected zones, applying EPA-registered antimicrobial agents effective in 30°C+ tropical environments, and conducting post-remediation air clearance testing. All work is documented with moisture readings, remediation logs, and photographic evidence for ARPC/insurer claim submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can TC Maila mould be covered by insurance in Cairns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — mould arising from the TC Maila event (a covered cyclone peril) is generally covered under home and building policies. Lodge mould as a secondary damage item within your cyclone claim rather than as a separate mould claim. The ARPC Cyclone Reinsurance Pool processing applies across Far North Queensland (FNQ). Most insurers require IICRC S520:2023 documentation — including containment scope, air testing results, and clearance certification — for sign-off on mould remediation claims.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is asbestos a risk in older Cairns homes being remediated for mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — many Cairns fibro homes built pre-1987 contain asbestos cement sheeting in wall and ceiling linings. Mould remediation that involves disturbing or removing wall linings in these properties requires a licensed asbestos assessor to inspect and prepare an asbestos management plan prior to any work commencing. NRPG coordinates asbestos assessors and licensed asbestos removalists as part of post-cyclone remediation scopes, ensuring regulatory compliance under the Queensland Work Health and Safety Regulation 2011.',
      },
    },
  ],
};

export default function CairnsCycloneMouldResponsePage() {
  return (
    <>
      <Script
        id="cncmr-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cncmr-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cncmr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Cairns Location Guide"
        title="Cairns Cyclone Mould Response — TC Maila Post-Storm Guide 2026"
        subtitle="Why mould hits Cairns properties within 48 hours of a cyclone — and what IICRC S520:2023 remediation in the tropical north looks like"
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-13"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Locations', href: '/guides/locations' },
          { label: 'Cairns', href: '/guides/locations/cairns' },
          { label: 'Cyclone Mould Response' },
        ]}
        cta={{ text: 'Get Cairns Mould Assessment Now', href: '/claim' }}
        sections={[
          {
            heading: 'The TC Maila Mould Clock — Cairns Timeline',
            body: (
              <div className="space-y-4">
                <p>
                  Cairns sits in Far North Queensland&rsquo;s wet tropics, where average relative humidity exceeds 85% and ambient temperatures remain between 28&ndash;32&deg;C in the aftermath of a cyclone event. These conditions compress the mould timeline dramatically compared to temperate Australian cities. Understanding the hour-by-hour progression after TC Maila landfall is critical for property owners making remediation decisions.
                </p>
                <p>
                  <strong>Hours 0&ndash;24: Water ingress and surface wetting.</strong> TC Maila delivers torrential rainfall, storm surge, and extreme wind-driven rain. Roof tiles and flashings are breached, louvres and screens are destroyed, and stormwater overwhelms drainage. Walls, ceilings, subfloors, and carpet absorb water across the full structure. In elevated Queenslander-style homes, subfloor areas flood from below while the roof leaks from above simultaneously.
                </p>
                <p>
                  <strong>Hours 24&ndash;48: Mould spore germination on wet plasterboard, carpet, and subfloor.</strong> Mould spores are ubiquitous in Cairns&rsquo;s tropical air. Once surface moisture is present on organic substrates — plasterboard paper facing, timber framing, carpet backing — germination begins within this window. Cairns&rsquo;s humidity means surfaces remain wet far longer than in drier climates, extending the germination window.
                </p>
                <p>
                  <strong>Hours 48&ndash;72: Visible mould colonies.</strong> Black, green, or grey mould colonies become visible on plasterboard, ceiling boards, and timber surfaces. At this stage, professional IICRC S520:2023 containment and remediation is mandatory — surface cleaning alone is insufficient. The affected materials must be properly contained, treated, and cleared.
                </p>
                <p>
                  <strong>Beyond 72 hours: HVAC contamination risk.</strong> If air conditioning systems are operated before mould is contained, spores are drawn into the return air stream and distributed throughout the property. HVAC duct contamination requires full system inspection and antimicrobial treatment — a significantly more complex and expensive scope than surface mould remediation. In Cairns&rsquo;s heat, property owners are often tempted to run the air conditioning immediately after a cyclone. This must be avoided until a moisture assessment confirms it is safe to do so.
                </p>
                <p>
                  Cairns&rsquo;s persistent humidity accelerates every stage of this timeline. What takes 72 hours in Sydney can happen in 36 hours in Cairns — and what takes 5 days in Melbourne can happen in 2 days in the tropical north.
                </p>
              </div>
            ),
          },
          {
            heading: 'Cairns Properties Most at Risk',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Not all Cairns properties face the same post-cyclone mould risk. Several property types and locations carry elevated risk profiles that demand faster response and more comprehensive remediation scopes.
                </p>
                <p>
                  <strong>Pre-1987 fibro and asbestos cement homes.</strong> A significant proportion of Cairns&rsquo;s residential housing stock pre-dates 1987 and was constructed with fibro sheeting that may contain asbestos cement. These homes are not only more susceptible to cyclone damage (older building envelope, deteriorated fixings) but require additional regulatory steps before mould remediation can begin. A licensed asbestos assessor must inspect and classify materials before any wall linings are disturbed.
                </p>
                <p>
                  <strong>Queenslander elevated homes.</strong> Traditional Queenslander homes with raised subfloors provide natural ventilation in normal conditions, but post-cyclone subfloor flooding creates an extensive wet organic substrate (bearer timber, joists, flooring) that promotes mould growth from below. Subfloor moisture readings and targeted drying are essential components of any post-cyclone remediation scope in these homes.
                </p>
                <p>
                  <strong>Low-lying flood-prone areas.</strong> Cairns suburbs including Aeroglen, Brinsmead, and White Rock are situated in natural drainage paths and experienced significant inundation during TC Maila. Category 3 floodwater contamination — carrying soil bacteria, sewage remnants, and tropical organisms — compounds the mould risk with a contamination risk that requires full black water remediation protocols.
                </p>
                <p>
                  <strong>Homes with post-cyclone ventilation failures.</strong> Broken louvres and destroyed insect screens — ubiquitous cyclone damage in Cairns — eliminate cross-ventilation at a time when natural airflow is most needed. Properties that cannot be ventilated effectively after TC Maila retain moisture for longer, extending the mould growth window. Temporary ventilation solutions (fans, dehumidifiers) must be deployed as part of the emergency response.
                </p>
              </div>
            ),
          },
          {
            heading: 'IICRC S520:2023 Mould Remediation in Cairns',
            body: (
              <div className="space-y-4">
                <p>
                  IICRC S520:2023 is the international standard for mould remediation. In Cairns&rsquo;s tropical environment, several elements of the standard have heightened significance due to the climatic conditions.
                </p>
                <p>
                  <strong>Containment requirements.</strong> Physical containment using 600mm polyethylene sheeting barriers with negative air pressure isolates the mould-affected zone from the rest of the property. This prevents cross-contamination of spores into unaffected areas during remediation work. In Cairns, containment must be maintained rigorously — the high ambient humidity means spore dispersal is more persistent than in drier environments.
                </p>
                <p>
                  <strong>HEPA filtration in tropical climates.</strong> HEPA air scrubbers capture mould spores at 0.3 microns and above. In Cairns&rsquo;s post-cyclone environment, air scrubbers must be sized for the tropical ambient air volume and run continuously throughout the remediation. The combination of negative air pressure (air exhausted to outside) and HEPA filtration ensures spores generated during physical remediation work are captured before they can resettle.
                </p>
                <p>
                  <strong>Antimicrobial agents effective in 30&deg;C+ environments.</strong> Standard antimicrobial formulations are tested for efficacy across a range of temperatures. In Cairns, where ambient temperatures may not drop below 28&deg;C post-cyclone, EPA-registered agents with confirmed efficacy at elevated temperatures must be specified. Application rates, dwell times, and surface coverage are documented as part of the remediation record.
                </p>
                <p>
                  <strong>Post-remediation clearance testing methodology.</strong> Clearance testing confirms that spore counts have returned to or below background levels before containment is removed and affected areas reinstated. In Cairns, clearance testing must account for the elevated ambient spore count typical of tropical environments. Both air sampling (AIHA-accredited laboratory analysis) and visual inspection form part of the clearance protocol. The clearance report is a required document for most insurer sign-off on mould claims.
                </p>
              </div>
            ),
          },
          {
            heading: 'Insurance Documentation for TC Maila Mould Claims',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Thorough documentation is the difference between a fully settled mould claim and a disputed or underpaid one. For TC Maila mould claims in Cairns, the following documentation framework maximises claim outcomes.
                </p>
                <p>
                  <strong>Timing documentation with timestamps.</strong> Photographs taken immediately after TC Maila landfall, before any cleanup or intervention, establish the baseline damage state. Metadata timestamps embedded in photographs are accepted by insurers as evidence of timing. Document water ingress points (roof breaches, broken windows, storm surge entry), depth and extent of flooding, and initial visible mould growth as it appears.
                </p>
                <p>
                  <strong>Moisture readings before and after drying.</strong> Calibrated moisture meter readings taken systematically across all affected surfaces — walls, ceilings, floors, subfloor — before drying begins establish the moisture baseline. Post-drying readings confirm structural moisture has returned to acceptable levels (typically below 16% for timber, below 0.5% for concrete). This drying log is required by most insurers.
                </p>
                <p>
                  <strong>IICRC S520:2023 scope of works.</strong> A formal IICRC S520:2023 scope of works prepared by a certified Mould Remediation Contractor (MRC) documents the extent and classification of mould growth, the remediation methodology, antimicrobial agents used, containment measures, and clearance testing results. This scope forms the basis of the mould claim item within the broader TC Maila cyclone claim.
                </p>
                <p>
                  <strong>ARPC cyclone event reference.</strong> TC Maila is a declared cyclone event under the ARPC Cyclone Reinsurance Pool. All cyclone-related claims — including secondary mould damage — should reference the TC Maila event number when lodging with insurers operating under the ARPC pool. Confirm your insurer&rsquo;s ARPC participation when lodging. Lodge your claim through <a href="/claim" className="text-green-400 hover:underline">disasterrecovery.com.au/claim</a> for NRPG contractor coordination and claim documentation support.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How quickly does mould appear in Cairns after TC Maila?',
            answer: 'Mould can appear within 24–48 hours of cyclone water ingress in Cairns. The city averages 85% relative humidity year-round, and post-cyclone temperatures of 28–32°C create ideal mould germination conditions. Visible mould growth can appear on wet plasterboard within 36 hours — significantly faster than in temperate Australian cities.',
          },
          {
            question: 'What does TC Maila mould remediation involve in Cairns?',
            answer: 'TC Maila mould remediation in Cairns follows the IICRC S520:2023 standard. This involves establishing physical containment with 600mm polyethylene barriers, deploying HEPA air scrubbers to create negative air pressure in affected zones, applying EPA-registered antimicrobial agents effective in 30°C+ tropical environments, and conducting post-remediation air clearance testing. All work is documented for ARPC/insurer claim submission.',
          },
          {
            question: 'Can TC Maila mould be covered by insurance in Cairns?',
            answer: 'Yes — mould arising from the TC Maila event (a covered cyclone peril) is generally covered. Lodge mould as a secondary damage item within your cyclone claim. ARPC Cyclone Reinsurance Pool processing applies across FNQ. Most insurers require IICRC S520:2023 documentation — containment scope, air testing results, and clearance certification — for sign-off.',
          },
          {
            question: 'Is asbestos a risk in older Cairns homes being remediated for mould?',
            answer: 'Yes — many Cairns fibro homes built pre-1987 contain asbestos cement sheeting. Mould remediation that involves disturbing wall linings in these properties requires a licensed asbestos assessor to inspect and prepare a management plan prior to any work commencing. NRPG coordinates asbestos management plans as part of post-cyclone remediation.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Mould Remediation Cairns',
            href: '/mould-remediation-cairns',
            description: 'Specialist mould remediation services across Cairns and Far North Queensland — IICRC S520 certified.',
          },
          {
            title: 'TC Maila FNQ Emergency',
            href: '/events/tc-maila-fnq-2026',
            description: 'TC Maila emergency response for Far North Queensland — contractor coordination, claim lodgement, and recovery resources.',
          },
          {
            title: 'Cyclone Damage Restoration Cairns',
            href: '/cyclone-damage-restoration-cairns',
            description: 'Full cyclone damage restoration services for Cairns — structural drying, mould remediation, and ARPC claim documentation.',
          },
        ]}
      />
    </>
  );
}
