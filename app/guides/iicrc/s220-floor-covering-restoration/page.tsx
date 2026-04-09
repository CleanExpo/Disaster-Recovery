import { Metadata } from 'next';
import Script from 'next/script';
import { Layers } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'IICRC S220 Floor Covering Restoration — What Certified Contractors Do Differently',
  description:
    'IICRC S220 covers professional restoration of carpet, hardwood, tile and vinyl after water, mould or fire damage. Here\'s what the standard means for your flooring claim.',
  keywords:
    'IICRC S220, floor covering restoration, carpet water damage, hardwood floor drying, vinyl LVT flood damage, tile restoration, certified floor contractor, floor covering insurance claim Australia',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/iicrc/s220-floor-covering-restoration',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does IICRC S220 cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'IICRC S220 is the Standard for Professional Onsite Textile Services. It covers the assessment, cleaning and restoration of floor coverings \u2014 including carpet, hardwood and engineered timber, vinyl and LVT, ceramic and porcelain tile, and natural stone \u2014 following damage events such as water intrusion, mould growth, or fire and smoke. It is currently under its second public review (closing 19 April 2026), making it one of the most actively maintained standards in the restoration field.' },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged timber floors be restored rather than replaced?',
      acceptedAnswer: { '@type': 'Answer', text: "In many cases, yes \u2014 but the outcome depends on how quickly the floor is treated, the source and extent of water, and how drying is managed. Timber floors that have begun cupping can often be restored with controlled drying, but the process requires patience and monitoring. Over-drying causes crowning, which can be as damaging as the original water event. A certified contractor will assess the floor, map moisture readings, and manage the drying process to give the best chance of restoration. Whether restoration or replacement is warranted requires direct professional assessment." },
    },
    {
      '@type': 'Question',
      name: 'Why does my carpet need to be replaced if the water damage looks minor?',
      acceptedAnswer: { '@type': 'Answer', text: "Surface appearance is not a reliable indicator of carpet condition after a water event. Moisture in carpet pile and underlay creates conditions for rapid mould growth \u2014 often within 24 to 48 hours of exposure \u2014 even when the carpet surface dries quickly. The underlay beneath carpet almost always requires replacement regardless of the carpet\u2019s condition, because it retains moisture and cannot be effectively dried in place. Contaminated water sources (sewage, stormwater) require replacement of carpet regardless of visible damage. Your contractor can explain the basis for their recommendation for your specific situation." },
    },
    {
      '@type': 'Question',
      name: 'What is subfloor damage and why does it matter for my insurance claim?',
      acceptedAnswer: { '@type': 'Answer', text: 'Subfloor damage refers to moisture or structural damage that occurs beneath the surface floor covering \u2014 in the plywood, particleboard, concrete, or timber substrate that the floor covering sits on. Subfloor damage frequently accompanies surface floor covering damage but is not visible without moisture testing. If subfloor damage is not documented and included in the initial claim scope, it may not be covered when it manifests later as secondary damage (swelling, movement, mould). A certified floor covering restorer will assess and document the subfloor as a separate item in the scope of works.' },
    },
    {
      '@type': 'Question',
      name: "Can I use the Disaster Recovery platform if my insurer has already appointed a contractor?",
      acceptedAnswer: { '@type': 'Answer', text: "Yes. You can request an independent assessment through Disaster Recovery even if your insurer has already appointed a repairer. An independent scope of works gives you an objective basis for reviewing whether the insurer-appointed contractor\u2019s scope captures the full extent of damage \u2014 particularly for subfloor and floor covering items that are commonly missed. If you believe the appointed contractor\u2019s scope is incomplete, documentation from an independent certified restorer provides the evidence base for a dispute through AFCA." },
    },
  ],
};

export default function S220FloorCoveringRestorationPage() {
  return (
    <>
      <Script id="s220floor-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
      category="IICRC Standards"
      title="IICRC S220 Floor Covering Restoration"
      subtitle="What Certified Contractors Do Differently"
      gradient="linear-gradient(135deg, #1A3A2E 0%, #2D7A5B 100%)"
      icon={<Layers className="h-10 w-10" />}
      lastReviewed="2026-04-07"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'IICRC Standards', href: '/guides/iicrc' },
        { label: 'S220 Floor Covering Restoration' },
      ]}
      sections={[
        {
          heading: 'What Is IICRC S220?',
          body: (
            <>
              <p>
                IICRC S220 is the Standard for Professional Onsite Textile Services, covering
                the assessment, cleaning and restoration of floor coverings — including carpet,
                hardwood and engineered timber, vinyl and luxury vinyl tile (LVT), ceramic and
                porcelain tile, and natural stone. Where most people are familiar with S500
                (water damage remediation) and S520 (mould remediation), S220 addresses the
                specific challenges that arise when these damage events affect your floors.
              </p>
              <p style={{ marginTop: '1rem' }}>
                S220 is currently in its second public review period, which closes on
                19 April 2026. This means the standard is at its most actively developed
                and the guidance available from certified practitioners reflects
                current best practice — not a document that has sat unchanged for years.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>How S220 relates to S500 and S520:</strong> In most real-world
                  damage scenarios — a burst pipe, a roof leak, a flash flood — water damage,
                  mould risk and floor covering damage occur simultaneously. Certified contractors
                  work across all three standards. S500 governs the structural drying and water
                  extraction process; S520 governs mould assessment and remediation; S220 governs
                  what happens to the floor coverings themselves throughout and after that process.
                  A contractor who understands only one of these standards is not equipped to
                  handle a multi-damage event completely.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Floor covering restoration is a specialist skill:</strong> General
                  water damage remediation focuses on structural drying — walls, framing,
                  subfloors. Floor covering restoration requires additional knowledge of how
                  each flooring material responds to moisture, heat, and drying systems, what
                  can be salvaged and how, and what the manufacturer&apos;s requirements are for
                  warranty-compliant restoration. Non-specialist contractors often treat all
                  flooring as a write-off when skilled restoration would have preserved it —
                  or, conversely, attempt to dry flooring that has passed the point of recovery.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Why this matters for your claim:</strong> Floor coverings are often
                  one of the most contested elements of a home insurance claim — both in terms
                  of whether they are restorable or require replacement, and whether the
                  subfloor damage beneath them is included in the scope. S220-aligned
                  documentation gives your claim a defensible, standards-based foundation.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Floor Covering Types and Damage Considerations',
          body: (
            <>
              <p>
                Not all floor coverings respond to water, mould or fire damage in the same
                way. Understanding what is typically restorable — and what is not — helps
                policyholders engage meaningfully with both their contractor and their insurer.
                The following is general guidance only; every job requires direct assessment
                by a qualified professional.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Carpet:</strong> Carpet is highly susceptible to water saturation,
                  mould growth within the pile and underlay, odour from microbial activity,
                  and delamination of the backing layer. Restoration is often possible when
                  the water source is clean and the carpet is treated quickly. Contaminated
                  water — sewage, stormwater, or water that has sat for an extended period —
                  typically requires replacement rather than restoration. Underlay almost
                  always requires replacement regardless of the carpet&apos;s condition.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Hardwood and engineered timber:</strong> Timber floors absorb
                  moisture and expand, leading to cupping (edges rise above the centre),
                  crowning (centre rises above the edges after over-drying), swelling at
                  joints, and finish failure. Cupping is frequently reversible with controlled
                  drying, but the timeline for stabilisation can extend to weeks or months.
                  Because manifestation is delayed, hardwood damage is commonly under-scoped
                  in initial insurance assessments. Engineered boards are generally less
                  stable than solid timber once moisture reaches the core layers.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Vinyl and luxury vinyl tile (LVT):</strong> Vinyl products can
                  appear unaffected while moisture migrates through adhesive to the subfloor
                  beneath. Adhesive failure, bubbling, and lifting at seams are common
                  secondary outcomes. LVT with a click-lock installation is more vulnerable
                  to subfloor moisture than glue-down installations because moisture can
                  travel along the gaps freely. The subfloor beneath vinyl frequently requires
                  drying and treatment even when the vinyl surface itself looks intact.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Ceramic and porcelain tile:</strong> Tile itself is generally
                  unaffected by water, but grout lines are permeable and substrate materials
                  (cement board, mortar bed, concrete) can become fully saturated.
                  Once the substrate is saturated, tiles can lift, crack, or debond. Grout
                  failure is a common pathway for mould growth in tiled areas following
                  water damage. Assessment needs to include moisture content of the substrate,
                  not just surface inspection of the tile.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Natural stone:</strong> Stone flooring — marble, travertine,
                  slate, limestone — is porous and susceptible to staining, mineral deposit
                  formation, and etching when exposed to contaminated water. Structural
                  integrity can be affected if moisture reaches the substrate or mortar bed.
                  Restoration requires specialist cleaning techniques; standard cleaning
                  products used on other floor types can permanently damage stone surfaces.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What a Certified Floor Covering Restorer Does',
          body: (
            <>
              <p>
                A contractor with floor covering restoration certification approaches the job
                systematically, with documentation at each stage that supports both the
                technical outcome and the insurance claim.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Moisture mapping and documentation:</strong> Before any work begins,
                  a certified restorer maps the moisture levels across the affected area using
                  calibrated meters. This documents the extent of damage at the start of the
                  job and provides a baseline for measuring drying progress. Without this
                  documentation, there is no objective record of the damage that was present
                  before restoration began.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Subfloor assessment:</strong> This is the most frequently missed
                  step when non-specialist contractors handle floor damage. Moisture in carpet,
                  vinyl or timber almost always reaches the subfloor — and subfloor drying
                  requirements are separate from surface drying requirements. A certified
                  restorer assesses the subfloor as a distinct component and includes it in
                  the scope of works and drying plan.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Drying system selection and monitoring:</strong> Different flooring
                  materials require different drying approaches. Timber requires slow, controlled
                  drying to prevent overcorrection (crowning). Carpet can tolerate more
                  aggressive airflow. Tile and stone substrates may require longer drying
                  cycles. A certified restorer selects equipment and settings appropriate
                  to the floor type, monitors conditions throughout the drying period,
                  and adjusts as needed rather than setting equipment and leaving until
                  the job is done.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Antimicrobial treatment:</strong> Where water damage creates
                  conditions for mould growth — particularly in carpet underlay, timber
                  joints, and grout — appropriate antimicrobial treatment is applied as
                  part of the restoration process. This is particularly relevant when
                  drying timelines extend beyond 24 to 48 hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Progress documentation for insurance claims:</strong> At each
                  stage — initial assessment, mid-drying readings, final clearance — a
                  certified restorer produces written records with moisture readings,
                  equipment logs, and photographs. This documentation is the evidence
                  base for the scope of works submitted to the insurer and is essential
                  if any element of the claim is disputed.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Why Floor Coverings Are Often Under-Scoped in Insurance Claims',
          body: (
            <>
              <p>
                Floor covering damage is one of the most commonly under-scoped elements of
                a water or fire damage claim. Understanding why this happens helps policyholders
                identify when their claim may not be capturing the full extent of their loss.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Subfloor damage is not visible:</strong> An assessor who looks at
                  a floor visually — without moisture meters and a subfloor probe — cannot
                  determine whether the subfloor beneath is saturated. Wet subfloors beneath
                  visually undamaged LVT or tile are frequently missed in initial assessments
                  and discovered later when secondary damage (lifting, swelling, mould) becomes
                  apparent.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Hardwood cupping takes time to manifest:</strong> Timber floors
                  that appear flat in the first days after a water event can develop cupping
                  over subsequent weeks as moisture redistributes through the board. An
                  initial assessment carried out before this manifests may conclude the
                  floor is undamaged when, in fact, structural movement is already underway.
                  This is a well-documented characteristic of timber floor damage, and
                  experienced contractors plan for it.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Insurer preference for partial replacement:</strong> Insurers may
                  prefer to replace only the visibly affected boards or tiles rather than the
                  complete floor covering. In some cases this is appropriate; in others —
                  particularly with timber floors where matching boards are no longer
                  available, or where moisture has spread beyond the visible damage zone —
                  partial replacement results in a permanently mismatched floor or recurrent
                  problems. A certified restorer can document why full replacement is
                  warranted in these circumstances.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>How S220-aligned documentation supports a complete scope:</strong>{' '}
                  When a contractor documents moisture readings, subfloor assessments,
                  drying progress and the basis for restoration-versus-replacement decisions,
                  the claim scope is grounded in objective evidence. This is significantly
                  harder for an insurer to dispute than a contractor&apos;s opinion alone.
                  It also gives policyholders a clear record to rely on if they need to
                  escalate through AFCA.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What to Ask Your Floor Covering Contractor',
          body: (
            <>
              <p>
                Before engaging a contractor for floor covering restoration, ask these questions
                to understand their qualifications and approach.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>What certifications do you hold for floor covering restoration?</strong>{' '}
                  Look for IICRC certifications relevant to the floor types involved. For
                  water damage that has affected floors, the contractor should hold credentials
                  covering both water damage restoration and floor covering cleaning and
                  restoration.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Will you assess and document the subfloor separately?</strong>{' '}
                  A contractor who treats the floor covering and the subfloor as the same
                  item is likely to miss subfloor damage. Ask specifically whether the
                  subfloor will be moisture-mapped and included in the scope of works.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>How will drying progress be monitored?</strong>{' '}
                  Ask how frequently the contractor will return to take readings, what
                  records will be kept, and how you will be notified if the drying is not
                  progressing as expected.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>What documentation will I receive for my insurance claim?</strong>{' '}
                  You should receive initial moisture readings, a scope of works, equipment
                  logs, progress notes, and final clearance documentation. If a contractor
                  cannot describe what records they will produce, that is a significant gap.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>What is your basis for recommending restoration versus replacement?</strong>{' '}
                  Ask the contractor to explain what criteria they use to decide whether
                  a floor covering should be restored or replaced. A qualified contractor
                  can articulate this in terms of material condition, contamination risk,
                  and manufacturer requirements — not just cost or convenience.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How NRPG Approaches Floor Covering Restoration',
          body: (
            <>
              <p>
                The National Restoration Professionals Group (NRPG) network includes contractors
                who work to IICRC S220 standards alongside S500 and S520 — treating floor
                covering damage as an integrated component of the broader restoration scope,
                not an afterthought.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>S220-aligned contractors across the network:</strong> NRPG contractors
                  hold relevant IICRC certifications and maintain their continuing education
                  requirements independently. Each contractor is responsible for their own
                  certifications, insurance, and licence obligations — the network does not
                  substitute for individual contractor accountability.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Complete scope documentation from day one:</strong> NRPG contractors
                  document moisture conditions before, during, and after the restoration process.
                  For floor covering jobs, this means subfloor readings are taken and recorded
                  as a separate line item — not bundled into a general &quot;floor damage&quot;
                  assessment.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Supporting your claim:</strong> The documentation NRPG contractors
                  produce is designed to support your insurance claim at every stage — initial
                  notification, scope negotiation, and if required, any dispute through AFCA.
                  Disaster Recovery&apos;s role is to connect you with qualified tradespeople;
                  the outcome of your insurance claim remains between you and your insurer.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If floor coverings have been damaged in a water, mould or fire event at your
                property, you can start the process of connecting with a certified contractor
                through the link below.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What does IICRC S220 cover?',
          answer:
            'IICRC S220 is the Standard for Professional Onsite Textile Services. It covers the assessment, cleaning and restoration of floor coverings — including carpet, hardwood and engineered timber, vinyl and LVT, ceramic and porcelain tile, and natural stone — following damage events such as water intrusion, mould growth, or fire and smoke. It is currently under its second public review (closing 19 April 2026), making it one of the most actively maintained standards in the restoration field.',
        },
        {
          question: 'Can water-damaged timber floors be restored rather than replaced?',
          answer:
            'In many cases, yes — but the outcome depends on how quickly the floor is treated, the source and extent of water, and how drying is managed. Timber floors that have begun cupping can often be restored with controlled drying, but the process requires patience and monitoring. Over-drying causes crowning, which can be as damaging as the original water event. A certified contractor will assess the floor, map moisture readings, and manage the drying process to give the best chance of restoration. Whether restoration or replacement is warranted requires direct professional assessment.',
        },
        {
          question: 'Why does my carpet need to be replaced if the water damage looks minor?',
          answer:
            'Surface appearance is not a reliable indicator of carpet condition after a water event. Moisture in carpet pile and underlay creates conditions for rapid mould growth — often within 24 to 48 hours of exposure — even when the carpet surface dries quickly. The underlay beneath carpet almost always requires replacement regardless of the carpet\'s condition, because it retains moisture and cannot be effectively dried in place. Contaminated water sources (sewage, stormwater) require replacement of carpet regardless of visible damage. Your contractor can explain the basis for their recommendation for your specific situation.',
        },
        {
          question: 'What is subfloor damage and why does it matter for my insurance claim?',
          answer:
            'Subfloor damage refers to moisture or structural damage that occurs beneath the surface floor covering — in the plywood, particleboard, concrete, or timber substrate that the floor covering sits on. Subfloor damage frequently accompanies surface floor covering damage but is not visible without moisture testing. If subfloor damage is not documented and included in the initial claim scope, it may not be covered when it manifests later as secondary damage (swelling, movement, mould). A certified floor covering restorer will assess and document the subfloor as a separate item in the scope of works.',
        },
        {
          question: 'Can I use the Disaster Recovery platform if my insurer has already appointed a contractor?',
          answer:
            'Yes. You can request an independent assessment through Disaster Recovery even if your insurer has already appointed a repairer. An independent scope of works gives you an objective basis for reviewing whether the insurer-appointed contractor\'s scope captures the full extent of damage — particularly for subfloor and floor covering items that are commonly missed. If you believe the appointed contractor\'s scope is incomplete, documentation from an independent certified restorer provides the evidence base for a dispute through AFCA.',
        },
      ]}
      relatedGuides={[
        {
          title: 'IICRC S500 Water Damage Restoration — What Certified Contractors Do',
          href: '/guides/iicrc/s500-water-damage-restoration',
          description:
            'How the IICRC S500 standard governs professional water damage remediation and what it means for your claim.',
        },
        {
          title: 'IICRC S520 Mould Remediation — What Certified Contractors Do',
          href: '/guides/iicrc/s520-mould-remediation',
          description:
            'What the S520 standard requires of certified mould remediation contractors and why it matters after water damage.',
        },
        {
          title: 'Why Floor Coverings Are Commonly Under-Scoped in Water Damage Claims',
          href: '/guides/floor-coverings/iicrc-s220-floor-coverings-inspection-standard',
          description:
            'A detailed look at the inspection standard for floor coverings and the most common scoping gaps in insurance claims.',
        },
      ]}
      cta={{ text: 'Get Help With Your Claim', href: '/claim' }}
    />
    </>
  );
}
