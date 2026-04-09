import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Strata Building Water Damage — Body Corporate Response Guide',
  description: 'Water damage in strata buildings: how body corporates coordinate restoration, lot vs common property responsibility, BCCMA/SSMA frameworks, and insurance claim coordination.',
  keywords: 'strata water damage restoration, body corporate water damage, lot owner vs body corporate water damage, strata building flood, BCCMA water damage, SSMA strata restoration',
  alternates: { canonical: `${NAP.url}/guides/commercial/strata-building-water-damage` },
};

const lastReviewed = '2026-04-09';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is responsible for water damage in a strata building \u2014 lot owner or body corporate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The boundary between body corporate and lot owner responsibility turns on whether the source of the water damage is common property or lot property. Common property \u2014 including pipes embedded in common property structures, roofing, external walls, shared drainage infrastructure, and building services that serve more than one lot \u2014 is the body corporate\u2019s responsibility. Pipes and fittings that serve only a single lot, and that are within that lot, are the lot owner\u2019s responsibility. Disputes arise frequently at this boundary, particularly for pipes running inside wall cavities. The applicable legislation and regulation module in each state (QLD: BCCMA, NSW: SSMA, VIC: OCA, SA: CCSA) provides the definitional framework, but individual disputes often require adjudication.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does strata insurance cover water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Body corporate building insurance covers damage to common property and lot fixtures (structural elements, built-in cabinetry, flooring fixed to the slab) caused by insured events including water damage. Lot owners are responsible for insuring their own contents, including furniture, appliances, and loose floor coverings. Where a water event originates from one lot and damages another, the originating lot owner\u2019s public liability policy may be engaged. A specialist strata insurance broker can advise on the interaction between the body corporate policy and individual lot owner policies for complex multi-lot water events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does restoration work when multiple lots are affected?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG coordinates a single-contractor approach across all affected lots to avoid the confusion and conflicting works that arise when multiple contractors are engaged by different lot owners simultaneously. A unified scope of works is prepared under IICRC S500:2025 protocol, covering all affected lots and common property. The body corporate\u2019s authorisation is required for access to common property areas including subfloor voids, wall cavities, and shared plant rooms. Individual lot owners are kept informed throughout and receive their own documentation for their insurance claims. This coordinated approach typically achieves faster drying outcomes and cleaner insurance documentation than a fragmented multi-contractor response.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the QLD BCCMA boundary for plumbing responsibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Body Corporate and Community Management Act 1997 (QLD) and the applicable regulation module, pipes, cables, and other services that are:\n\u2022 within a lot and that serve only that lot are lot owner responsibility;\n\u2022 common infrastructure serving more than one lot, or embedded in common property structure, are body corporate responsibility.\nThe 2011 regulation module clarifications addressed some common disputes around water supply pipes in external walls. In practice, the first step is to identify the location and function of the pipe at the source of the water event. A plumber\u2019s report documenting the pipe location and function is essential evidence for determining responsibility and supporting insurance claims by either the lot owner or the body corporate.',
      },
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Strata Building Water Damage — Body Corporate Response Guide',
  dateModified: lastReviewed,
  author: { '@type': 'Organization', name: NAP.name },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Strata Building Water Damage Restoration',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Australia' },
  serviceType: 'Strata Water Damage Restoration',
  description: 'Coordinated water damage restoration for strata buildings and body corporates, covering common property and multiple lots under a single IICRC S500-compliant scope of works.',
};

export default function StrataBuildingWaterDamagePage() {
  return (
    <>
      <Script id="sbwd-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="sbwd-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="sbwd-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <AgGuidePageTemplate
        category="Commercial Restoration"
        title="Strata Building Water Damage — Body Corporate Response Guide"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #37474F 0%, #546E7A 100%)"
        icon={<Building2 className="h-10 w-10" />}
        lastReviewed={lastReviewed}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Commercial', href: '/guides/commercial' },
          { label: 'Strata Building Water Damage' },
        ]}
        cta={{ text: 'Coordinate Strata Water Damage Restoration', href: '/claim' }}
        sections={[
          {
            heading: 'Lot vs Common Property — The Most Disputed Issue',
            body: (
              <div className="space-y-4">
                <p>
                  The single most disputed issue in strata water damage is the boundary between lot owner responsibility and body corporate responsibility. Getting this determination right from the outset prevents costly disputes, delays in insurance claim lodgement, and conflicting restoration works that can worsen the damage.
                </p>
                <p>
                  <strong>Legislative frameworks by state</strong> each define the boundary differently:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Queensland (BCCMA):</strong> The Body Corporate and Community Management Act 1997 and applicable regulation modules define common property as all areas that are not within a lot boundary as defined in the plan of subdivision. Pipes serving only one lot within that lot&apos;s boundary are lot owner property.</li>
                  <li><strong>New South Wales (SSMA):</strong> The Strata Schemes Management Act 2015 places responsibility for common property maintenance with the owners corporation (body corporate equivalent). The concept of &ldquo;original condition&rdquo; is relevant for determining whether a lot owner has altered infrastructure they are now responsible for.</li>
                  <li><strong>Victoria (OCA):</strong> The Owners Corporations Act 2006 governs common property in Victoria. Pipes embedded in common property structure are owners corporation responsibility regardless of which lot they serve.</li>
                  <li><strong>South Australia (CCSA):</strong> The Community Titles Act 1996 applies similar principles with specific reference to community plans defining the boundary of lot property.</li>
                </ul>
                <p>
                  <strong>The pipe responsibility matrix</strong> for a typical high-rise apartment building: the building&apos;s main water riser (serving all floors) is common property. The branch line from the riser to an individual apartment is typically common property to the point it enters the lot. The pipes within the lot serving only that lot are lot owner property. The determination of the exact branching point is a factual question requiring a plumber&apos;s report, not a legislative one.
                </p>
                <p>
                  <strong>Boundary disputes resolution</strong> for significant water damage events typically involves an adjudicator (QLD: Commissioner for Body Corporate and Community Management), tribunal (NSW, VIC: NCAT, VCAT), or formal mediation. Restoration should not wait for dispute resolution &mdash; emergency works proceed immediately, with responsibility to be determined subsequently on the evidence.
                </p>
              </div>
            ),
          },
          {
            heading: 'Coordinating Multi-Lot Restoration',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Water damage in a strata building almost never affects only one lot. A burst pipe in a bathroom on floor 12 typically wets the ceilings, walls, and floors of the apartments on floors 11, 10, and potentially below. Coordinating restoration across multiple simultaneously affected lots is a logistical challenge that is best managed through a single-contractor approach with body corporate authorisation.
                </p>
                <p>
                  <strong>Single contractor scope across lots</strong> means that one IICRC-certified contractor prepares a unified scope of works covering all affected lots and common property. This eliminates the risk of different contractors using incompatible drying approaches in adjacent spaces, creating moisture migration between zones that individual contractors are not aware of. A single moisture map across all affected lots drives the drying strategy.
                </p>
                <p>
                  <strong>Body corporate approval for access</strong> is required before the restoration contractor can access common property areas, including subfloor voids, basement plant rooms, wall cavity access panels in corridors, and shared drainage infrastructure. The strata manager or body corporate committee should be contacted immediately to provide this authorisation. Emergency powers in most state strata legislation allow urgent works to proceed without a full committee meeting.
                </p>
                <p>
                  <strong>Common property drying</strong> in a strata building includes the subfloor void, cavity walls between units, communal corridors, and building services spaces. These areas are often overlooked when lot owners manage their own restoration independently &mdash; wet common property cavities continue to drive moisture into adjacent lots even after the lot itself has been dried, causing mould and secondary damage.
                </p>
                <p>
                  <strong>Simultaneous lot restoration</strong> is more efficient than sequencing lots one at a time. Commercial drying equipment deployed across all affected lots simultaneously dries the building as a system, reducing total drying time and preventing moisture migration between lots during the drying phase.
                </p>
              </div>
            ),
          },
          {
            heading: 'Body Corporate Insurance Claim Process',
            body: (
              <div className="space-y-4">
                <p>
                  Body corporate insurance claims for water damage events are more complex than single-property claims because they involve multiple affected parties, shared and individual insurance policies, and the legislative framework of strata law. Understanding the process avoids the most common pitfalls.
                </p>
                <p>
                  <strong>Policy trigger</strong> for the body corporate policy is typically the insured event (burst pipe, storm water ingress, etc.) causing damage to common property or lot fixtures. The body corporate&apos;s insurer assesses the claim against the body corporate policy. Individual lot owners&apos; contents damage is claimed on their own contents policies, not the body corporate policy.
                </p>
                <p>
                  <strong>Sum insured adequacy</strong> is a persistent risk for older strata buildings. If the body corporate policy sum insured does not reflect the current replacement value of the building, an underinsurance situation arises where the insurer applies average to reduce the claim payout. Strata buildings should have the sum insured reviewed annually by a qualified quantity surveyor.
                </p>
                <p>
                  <strong>Excess allocation</strong> is a common source of dispute. Where the water damage originated from a defect in common property, the body corporate&apos;s excess applies and is funded from the administrative fund. Where the cause is attributed to a lot owner&apos;s negligence (e.g., failure to maintain plumbing within their lot), the body corporate may seek recovery of the excess from that lot owner. Clear documentation of the cause by a plumber and the restoration contractor supports this determination.
                </p>
                <p>
                  <strong>Loss of common facilities coverage</strong> applies where water damage has rendered communal amenities (gym, pool, lift lobby, common room) unusable for a period. The policy&apos;s business interruption or additional costs provisions may cover temporary facilities or notify levies for the loss period.
                </p>
                <p>
                  <strong>Body corporate meeting requirements</strong> for claims above certain thresholds vary by state legislation and by the body corporate&apos;s rules. The strata manager should be consulted on whether a general meeting or extraordinary general meeting is required to authorise the claim and approve the scope of restoration works.
                </p>
              </div>
            ),
          },
          {
            heading: 'Preventing Future Water Damage in Strata',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Strata buildings that have experienced a water damage event are statistically at higher risk of recurrence. The same ageing infrastructure, inadequate waterproofing, and deferred maintenance that caused the first event often remains in place. A proactive prevention program is both good management practice and a requirement under the duty of care obligations applicable to body corporate committees.
                </p>
                <p>
                  <strong>Common property plumbing inspection</strong> should be conducted by a licensed plumber at intervals appropriate to the age of the building &mdash; typically every 3&ndash;5 years for buildings over 20 years old. The inspection includes the condition of the main riser, branch connections, roof drainage, internal stormwater downpipes, and any known problem areas. A written inspection report provides the body corporate with documented evidence of due diligence.
                </p>
                <p>
                  <strong>Sinking fund allocation</strong> for waterproofing and plumbing maintenance is a regulatory requirement in most states. The 10-year maintenance plan (or equivalent) should allocate specific provisions for waterproofing renewal of wet areas, balconies, and roof terraces based on the expected asset life of the original waterproofing system. Deferred waterproofing maintenance is the most common cause of chronic strata water damage.
                </p>
                <p>
                  <strong>Annual gutter and roof inspection program</strong> identifies blocked gutters, cracked flashings, and failing sealants before they become internal water damage events. Roof access in a multi-storey building requires appropriately licensed contractors and must be conducted at the right frequency based on the building&apos;s tree canopy exposure and roof system type.
                </p>
                <p>
                  <strong>Body corporate water damage response plan</strong> ensures that when a water event does occur, the committee, strata manager, and building manager know exactly what steps to take, who to contact, and how to authorise emergency works quickly. A written response plan significantly reduces the time between discovery of a water event and contractor mobilisation, which is the single biggest factor in limiting damage extent and restoration cost.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Who is responsible for water damage in a strata building \u2014 lot owner or body corporate?',
            answer: 'The boundary between body corporate and lot owner responsibility turns on whether the source of the water damage is common property or lot property. Common property \u2014 including pipes embedded in common property structures, roofing, external walls, shared drainage infrastructure, and building services that serve more than one lot \u2014 is the body corporate\u2019s responsibility. Pipes and fittings that serve only a single lot, and that are within that lot, are the lot owner\u2019s responsibility. Disputes arise frequently at this boundary, particularly for pipes running inside wall cavities. The applicable legislation and regulation module in each state (QLD: BCCMA, NSW: SSMA, VIC: OCA, SA: CCSA) provides the definitional framework, but individual disputes often require adjudication.',
          },
          {
            question: 'Does strata insurance cover water damage?',
            answer: 'Body corporate building insurance covers damage to common property and lot fixtures (structural elements, built-in cabinetry, flooring fixed to the slab) caused by insured events including water damage. Lot owners are responsible for insuring their own contents, including furniture, appliances, and loose floor coverings. Where a water event originates from one lot and damages another, the originating lot owner\u2019s public liability policy may be engaged. A specialist strata insurance broker can advise on the interaction between the body corporate policy and individual lot owner policies for complex multi-lot water events.',
          },
          {
            question: 'How does restoration work when multiple lots are affected?',
            answer: 'NRPG coordinates a single-contractor approach across all affected lots to avoid the confusion and conflicting works that arise when multiple contractors are engaged by different lot owners simultaneously. A unified scope of works is prepared under IICRC S500:2025 protocol, covering all affected lots and common property. The body corporate\u2019s authorisation is required for access to common property areas including subfloor voids, wall cavities, and shared plant rooms. Individual lot owners are kept informed throughout and receive their own documentation for their insurance claims. This coordinated approach typically achieves faster drying outcomes and cleaner insurance documentation than a fragmented multi-contractor response.',
          },
          {
            question: 'What is the QLD BCCMA boundary for plumbing responsibility?',
            answer: 'Under the Body Corporate and Community Management Act 1997 (QLD) and the applicable regulation module, pipes, cables, and other services that are within a lot and serve only that lot are lot owner responsibility; shared infrastructure serving more than one lot, or infrastructure embedded in common property structure, is body corporate responsibility. The 2011 regulation module clarifications addressed some common disputes around water supply pipes in external walls. In practice, the first step is to identify the location and function of the pipe at the source of the water event. A plumber\u2019s report documenting the pipe location and function is essential evidence for determining responsibility and supporting insurance claims by either the lot owner or the body corporate.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Strata Water Damage Guide',
            href: '/guides/property/strata-water-damage',
            description: 'Detailed guidance on strata water damage, lot owner obligations, and body corporate response.',
          },
          {
            title: 'Water Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Understand the cost drivers for water damage restoration across residential and commercial properties.',
          },
          {
            title: 'For Strata Managers',
            href: '/for-business/strata-managers',
            description: 'How Disaster Recovery works with strata managers to coordinate fast, compliant restoration outcomes.',
          },
        ]}
      />
    </>
  );
}
