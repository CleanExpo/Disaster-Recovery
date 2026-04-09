import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Insurance Claim Process — Australia 2026',
  description:
    'Step-by-step guide to lodging a fire damage insurance claim in Australia. Learn how to document damage, deal with assessors, and avoid common claim pitfalls.',
  keywords:
    'fire damage insurance claim australia, fire insurance claim process, how to claim fire damage, fire damage insurance payout, IICRC S700 fire restoration',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/fire-damage-insurance-claim-process`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  '@id': `${NAP.url}/#organization`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fire Damage Insurance Claims Support',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fire Damage Insurance Documentation',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Fire Damage Insurance Documentation',
  description:
    'IICRC S700-certified fire and smoke damage documentation for insurance claims. Full scope of works, HVAC contamination assessment, secondary smoke migration evidence, and psychrometric drying logs for insurer and AFCA lodgement.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I lodge a fire damage insurance claim in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notify your insurer within 24–48 hours of the event. Before contacting them, photograph all damage — structure, smoke migration, contents — without disturbing the origin zone. When you call, provide your policy number, the date and time of the fire, and a description of what occurred. Request a claim number and ask whether the insurer will appoint a loss assessor. For best outcomes, arrange an independent scope from an IICRC S700-certified contractor before the insurer\'s assessor attends.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does fire damage insurance cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most standard home and contents policies cover structure repair or rebuild, smoke and soot remediation throughout the property, temporary accommodation while the property is uninhabitable, contents replacement, and loss of rent (for investment properties). Exact coverage depends on your Product Disclosure Statement — check the definitions section for exclusions such as arson, unoccupied dwellings, and gradual deterioration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a fire damage insurance claim take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Straightforward fire claims with good documentation typically settle in 4–8 weeks. Complex claims involving total loss, structural rebuild, or significant smoke migration disputes can take 6–18 months. Under the General Insurance Code of Practice, your insurer must respond within 10 business days of receiving all required information. If they delay beyond this, you can escalate to AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my insurer force me to use their builder for fire repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your insurer has the right to appoint a repairer under the policy terms, but you can formally request that a preferred IICRC-certified contractor — such as one from the NRPG network — be used instead. Make this request in writing when lodging your claim. If the insurer\'s appointed contractor performs work that is below standard or incomplete, you have the right to request rectification. If the insurer refuses, lodge a complaint with AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my fire damage insurance claim is underpaid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commission an independent scope of works from an IICRC S700-certified contractor and compare it against the insurer\'s accepted scope. If there are material differences — particularly around secondary smoke damage or HVAC contamination — lodge a formal internal dispute with your insurer. If unresolved within 30 days, escalate to AFCA. Your insurer must respond within 10 business days of the dispute lodgement. IICRC S700:2025 specifically documents secondary smoke damage patterns that loss assessors commonly miss, and AFCA adjudicators give weight to certified scope documentation.',
      },
    },
  ],
};

export default function FireDamageInsuranceClaimProcessPage() {
  return (
    <>
      <Script
        id="fdic-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="fdic-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="fdic-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Fire Damage Insurance Claim Process"
        subtitle="Step-by-step guide to lodging a fire damage insurance claim in Australia"
        gradient="linear-gradient(135deg, #7F0000 0%, #C62828 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Fire Damage Insurance Claim Process' },
        ]}
        sections={[
          {
            heading: 'Step-by-Step Fire Insurance Claim Process',
            body: (
              <>
                <p>
                  Fire insurance claims are among the most complex general insurance claims in
                  Australia. Unlike water damage, fire scenes may involve forensic investigation
                  alongside the insurance process, and secondary smoke damage — the most frequently
                  underpaid element — evolves rapidly in the first 24–72 hours. The steps below
                  give you the best chance of a full settlement.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 1 — Make-safe and safety first:</strong> Do not re-enter a
                    fire-damaged property until fire services have confirmed it is structurally safe.
                    Arrange emergency make-safe works — boarding broken windows, tarping compromised
                    roofing, securing the perimeter. Document all make-safe works before and after.
                    Keep every receipt; these costs are typically claimable.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 2 — Notify your insurer:</strong> Contact your insurer within
                    24–48 hours. Provide your policy number, the date and approximate time of the
                    fire, and a brief description of what occurred. Request a claim number and ask
                    when an assessor will attend. Do not authorise permanent repairs at this stage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 3 — Photograph all damage before any cleanup:</strong> Document
                    every room from the doorway first (wide shot), then close-ups of soot
                    deposition, structural damage, and contents. Prioritise smoke migration to
                    secondary rooms and HVAC return air grilles — these are the areas insurers most
                    commonly underpay. Do not disturb the fire origin zone until the cause of fire
                    is formally determined.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 4 — Lodge your claim:</strong> Submit your claim with initial
                    photographic documentation. You do not need a complete scope at this stage.
                    Specify all damage categories: structure, smoke and soot, contents, HVAC
                    contamination, and any secondary water damage from fire suppression.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 5 — Insurer appoints an assessor:</strong> The insurer&apos;s
                    loss assessor works for the insurer, not you. They are incentivised to narrow
                    the scope of works. Before their visit, arrange an independent IICRC
                    S700-certified scope of works so you have a documented counter-position if
                    the assessor underscopes secondary smoke damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 6 — Scope dispute process:</strong> If you disagree with the
                    insurer&apos;s scope or valuation, lodge a formal internal dispute (IDR).
                    Provide your independent IICRC-certified scope of works. The insurer must
                    respond within 30 days. If unresolved, escalate to AFCA.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 7 — Restoration and sign-off:</strong> Once the scope is agreed,
                    restoration work is scheduled. Ensure your contractor provides a completion
                    report with final inspection sign-off before you accept settlement. Do not sign
                    a release or accept final payment until all agreed works are complete and
                    documented.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'What Fire Assessors Often Miss',
            body: (
              <>
                <p>
                  Fire damage assessors — particularly those attending within 48 hours of a major
                  event when assessor availability is stretched — frequently underscope four
                  categories of damage. Understanding these gaps allows you to document them
                  proactively before the assessor attends.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smoke and soot migration to adjacent rooms:</strong> Smoke is a
                    complex aerosol that permeates porous materials — plasterboard, insulation,
                    carpet, soft furnishings, timber — in rooms that appear undamaged. Assessors
                    who only inspect the fire origin zone will miss this contamination. Photograph
                    soot deposition in every room, including bathrooms and storage areas, before
                    the assessor attends.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>HVAC contamination:</strong> Return air and supply registers spread
                    smoke particles throughout the entire ducting system during and after a fire.
                    Contaminated ducting requires full cleaning or replacement — a scope item
                    commonly omitted from insurer assessments. Remove the cover plate from return
                    air grilles and photograph the interior of the duct before any cleaning.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Structural drying requirements after firefighting:</strong> Water used
                    in fire suppression — from fire services or sprinklers — soaks into floors,
                    walls, and ceilings. Without professional structural drying to IICRC S500
                    target moisture contents, this secondary water damage causes mould growth,
                    structural movement, and subfloor deterioration. Assessors focused on fire
                    damage often fail to account for the water damage component.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Secondary damage from water used to fight fire:</strong> The water
                    damage component of a fire claim is separate from the fire and smoke component.
                    Document water lines on walls and ceilings, standing water in subfloor spaces,
                    and moisture readings in walls adjacent to fire suppression zones. This
                    establishes causation for any secondary water damage claim.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'IICRC S700:2025 — Why Certification Matters for Fire Claims',
            body: (
              <>
                <p>
                  The ANSI/IICRC S700:2025 Fire and Smoke Damage Restoration Standard is the
                  benchmark document for professional fire restoration in Australia. Insurers and
                  AFCA adjudicators increasingly require evidence that restoration work was
                  performed to this standard before accepting claim sign-off.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>S700:2025 governs fire and smoke restoration:</strong> The standard
                    defines the inspection, assessment, and remediation requirements for fire,
                    smoke, and soot damage — including secondary smoke permeation, HVAC
                    contamination, and odour control treatment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Psychrometric drying logs:</strong> Where firefighting water has
                    caused secondary moisture damage, S700-certified contractors produce
                    psychrometric drying logs documenting daily temperature, relative humidity,
                    and material moisture content. These logs demonstrate that structural drying
                    was completed to target moisture content under IICRC S500 protocols —
                    preventing later disputes over mould or structural issues.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Thermal fogging and ozone treatment documentation:</strong> S700
                    requires documentation of odour control treatments including thermal fogging,
                    ozone treatment, and hydroxyl generation. Insurers can dispute ongoing odour
                    complaints if treatment records are absent.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurers increasingly require S700-certified work for claim
                    sign-off:</strong> Completion reports from S700-certified contractors —
                    documenting the full scope, treatment methods, and final clearance readings —
                    give insurers the evidence they need to close the claim and reduce the risk
                    of secondary claims arising after sign-off.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Common Fire Claim Disputes and How to Resolve Them',
            body: (
              <>
                <p>
                  Four dispute categories account for the majority of fire insurance claim
                  disagreements in Australia. Knowing them in advance — and building your
                  documentation to pre-empt them — significantly improves your settlement outcome.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Smoke damage scope denial:</strong> Insurers frequently accept the
                    fire-damaged rooms but dispute smoke remediation in secondary rooms, arguing
                    the contamination is cosmetic. Counter with an IICRC S700-certified scope
                    documenting soot depth, odour permeation, and HVAC contamination across the
                    full property.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents depreciation disputes:</strong> Insurers may apply actual
                    cash value (ACV) depreciation to contents that your policy covers on a
                    replacement cost value (RCV) basis. Check your PDS carefully. For high-value
                    items, provide serial numbers, purchase records, and manufacturer&apos;s
                    suggested retail pricing. Dispute any depreciation that is inconsistent with
                    your policy terms in writing.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rebuild vs repair decisions:</strong> Insurers may prefer repair over
                    rebuild even where structural damage makes full repair uneconomic or where
                    repaired elements will not match the original standard. Commission an
                    independent building report identifying why rebuild is the appropriate
                    response. AFCA accepts rebuild vs repair disputes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Betterment clauses:</strong> Some policies allow insurers to apply
                    a betterment deduction — reducing the payout because the repair or rebuild
                    will result in a &quot;better than before&quot; outcome. Betterment
                    deductions must be reasonable and are subject to challenge at AFCA if
                    applied inappropriately.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your fire claim dispute is unresolved through the insurer&apos;s Internal
                  Dispute Resolution process, escalate to AFCA. AFCA is free, its determinations
                  are binding on insurers, and fire damage disputes — particularly secondary smoke
                  underpayment — are a well-established category where certified documentation
                  significantly improves outcomes.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How do I lodge a fire damage insurance claim in Australia?',
            answer:
              "Notify your insurer within 24–48 hours of the event. Before contacting them, photograph all damage — structure, smoke migration, contents — without disturbing the origin zone. When you call, provide your policy number, the date and time of the fire, and a description of what occurred. Request a claim number and ask whether the insurer will appoint a loss assessor. For best outcomes, arrange an independent scope from an IICRC S700-certified contractor before the insurer's assessor attends.",
          },
          {
            question: 'What does fire damage insurance cover?',
            answer:
              'Most standard home and contents policies cover structure repair or rebuild, smoke and soot remediation throughout the property, temporary accommodation while the property is uninhabitable, contents replacement, and loss of rent (for investment properties). Exact coverage depends on your Product Disclosure Statement — check the definitions section for exclusions such as arson, unoccupied dwellings, and gradual deterioration.',
          },
          {
            question: 'How long does a fire damage insurance claim take?',
            answer:
              'Straightforward fire claims with good documentation typically settle in 4–8 weeks. Complex claims involving total loss, structural rebuild, or significant smoke migration disputes can take 6–18 months. Under the General Insurance Code of Practice, your insurer must respond within 10 business days of receiving all required information. If they delay beyond this, you can escalate to AFCA.',
          },
          {
            question: 'Can my insurer force me to use their builder for fire repairs?',
            answer:
              "Your insurer has the right to appoint a repairer under the policy terms, but you can formally request that a preferred IICRC-certified contractor — such as one from the NRPG network — be used instead. Make this request in writing when lodging your claim. If the insurer's appointed contractor performs work that is below standard or incomplete, you have the right to request rectification. If the insurer refuses, lodge a complaint with AFCA.",
          },
          {
            question: 'What if my fire damage insurance claim is underpaid?',
            answer:
              "Commission an independent scope of works from an IICRC S700-certified contractor and compare it against the insurer's accepted scope. If there are material differences — particularly around secondary smoke damage or HVAC contamination — lodge a formal internal dispute with your insurer. If unresolved within 30 days, escalate to AFCA. Your insurer must respond within 10 business days of the dispute lodgement. IICRC S700:2025 specifically documents secondary smoke damage patterns that loss assessors commonly miss, and AFCA adjudicators give weight to certified scope documentation.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Fire Damage for Insurance',
            href: '/guides/insurance/document-fire-damage-insurance',
            description: 'How to photograph and document fire and smoke damage before cleanup.',
          },
          {
            title: 'Fire Damage Restoration Cost',
            href: '/guides/cost-guides/how-much-fire-damage-restoration-cost',
            description: 'What fire damage restoration costs in Australia — by damage type and scope.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
        ]}
        cta={{ text: 'Get IICRC-Certified Fire Assessment', href: '/claim' }}
      />
    </>
  );
}
