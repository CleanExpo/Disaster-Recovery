/**
 * IICRC S220 Floor Covering Restoration — IICRC Standards Guide
 *
 * Framing: "What to Expect from an IICRC-Certified Contractor" — not a standards reference.
 * Does not describe, reproduce, or characterise the content of IICRC S220.
 * Canonical points to the authoritative category page.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Layers } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Floor Covering Restoration — What to Expect from an IICRC-Certified Contractor',
  description:
    'What an IICRC-certified floor covering restoration contractor does: moisture mapping, subfloor assessment, drying management, and insurance documentation for carpet, timber, vinyl, tile, and stone.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/iicrc/s220-floor-covering-restoration',
  },
  openGraph: {
    title: 'Floor Covering Restoration — IICRC-Certified Contractor Process',
    description:
      'What to expect from an IICRC-certified floor covering restoration contractor: the assessment, drying, and documentation process for all flooring types.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an IICRC-certified floor covering restoration contractor do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IICRC-certified floor covering restoration contractor will assess and moisture-map all affected floor surfaces and subfloors, determine what can be restored versus what requires replacement, manage drying conditions specific to each floor covering type, apply antimicrobial treatment where required, and produce documentation for the insurance claim at each stage. Subfloor assessment is a separate step — not bundled into a general floor damage assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged timber floors be restored rather than replaced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In many cases, yes — but the outcome depends on how quickly the floor is treated, the source and extent of water, and how drying is managed. Timber floors that have begun cupping can often be restored with controlled drying, but the process requires patience and monitoring. Over-drying causes crowning, which can be as damaging as the original water event. A certified contractor will assess the floor, map moisture readings, and manage the drying process to give the best chance of restoration. Whether restoration or replacement is warranted requires direct professional assessment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my carpet need to be replaced if the water damage looks minor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Surface appearance is not a reliable indicator of carpet condition after a water event. Moisture in carpet pile and underlay creates conditions for rapid mould growth — often within 24 to 48 hours of exposure — even when the carpet surface dries quickly. The underlay beneath carpet almost always requires replacement regardless of the carpet's condition, because it retains moisture and cannot be effectively dried in place. Contaminated water sources (sewage, stormwater) require replacement regardless of visible damage. Your contractor can explain the basis for their recommendation for your specific situation.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is subfloor damage and why does it matter for my insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subfloor damage refers to moisture or structural damage beneath the surface floor covering — in the plywood, particleboard, concrete, or timber substrate the floor sits on. Subfloor damage frequently accompanies surface floor covering damage but is not visible without moisture testing. If subfloor damage is not documented and included in the initial claim scope, it may not be covered when it manifests later as secondary damage. A certified floor covering restorer assesses and documents the subfloor as a separate item in the scope of works.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request an independent assessment if I dispute the floor covering scope?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. You can request an independent assessment through Disaster Recovery Australia even if your insurer has already appointed a repairer. An independent scope of works gives you an objective basis for reviewing whether the insurer-appointed contractor's scope captures the full extent of damage — particularly subfloor items that are commonly missed. If you believe the scope is incomplete, documentation from an independent certified restorer provides the evidence base for a dispute through AFCA.",
      },
    },
  ],
};

export default function S220FloorCoveringRestorationPage() {
  return (
    <>
      <Script
        id="s220-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Certification"
        title="Floor Covering Restoration"
        subtitle="What to Expect from an IICRC-Certified Contractor"
        gradient="linear-gradient(135deg, #1A3A2E 0%, #2D7A5B 100%)"
        icon={<Layers className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'IICRC Certification', href: '/guides/iicrc' },
          { label: 'Floor Covering Restoration' },
        ]}
        sections={[
          {
            heading: 'IICRC-Certified Floor Covering Restoration Contractors',
            body: (
              <>
                <p>
                  Contractors in the Disaster Recovery Australia network hold current IICRC
                  certification in floor covering restoration. Certification confirms that a
                  contractor has the professional knowledge to assess, scope, and restore
                  floor coverings — including carpet, hardwood and engineered timber, vinyl
                  and luxury vinyl tile (LVT), ceramic and porcelain tile, and natural stone —
                  following water, mould, fire, and smoke damage events.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Floor covering restoration is a specialist discipline. In most damage
                  scenarios, floors are affected alongside structural drying (S500) and mould
                  remediation (S520) requirements. A contractor certified across all three
                  areas treats the floor coverings and the building structure as one integrated
                  scope — not separate jobs.
                </p>
              </>
            ),
          },
          {
            heading: 'The On-Site Process',
            body: (
              <>
                <p>A certified floor covering restoration contractor follows this sequence:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moisture mapping</strong> — recording moisture readings across all
                    affected floor surfaces and subfloors using calibrated meters before any
                    work begins; this establishes the full extent of damage and documents it
                    for the insurance claim
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subfloor assessment</strong> — assessing the substrate separately
                    from the surface floor covering; wet subfloors beneath visually intact LVT
                    or tile are frequently missed when non-specialist contractors handle floor
                    damage
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Restoration-versus-replacement scoping</strong> — determining what
                    can be restored and what requires replacement based on material condition,
                    contamination type, and manufacturer requirements; each decision is
                    documented with supporting evidence
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Drying system selection and monitoring</strong> — selecting
                    equipment and conditions appropriate to the floor covering type (timber
                    requires slow, controlled drying; carpet tolerates more aggressive airflow)
                    and monitoring daily
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Antimicrobial treatment</strong> — applying treatment where water
                    damage creates conditions for mould growth, particularly in carpet underlay,
                    timber joints, and grout
                  </li>
                  <li>
                    <strong>Progress documentation and clearance</strong> — recording moisture
                    readings throughout the drying period and producing final clearance
                    documentation for the insurance claim
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'How Different Floor Types Respond to Damage',
            body: (
              <>
                <p>
                  Not all floor coverings respond to water, mould, or fire damage in the same
                  way. The following is general guidance only; every job requires direct
                  assessment by a qualified professional.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Carpet</strong> — highly susceptible to mould growth in pile and
                    underlay. Restoration is possible when the water source is clean and the
                    carpet is treated quickly. Contaminated water or extended exposure typically
                    requires replacement. Underlay almost always requires replacement regardless
                    of carpet condition.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Hardwood and engineered timber</strong> — absorbs moisture and
                    expands, leading to cupping, swelling at joints, and finish failure.
                    Cupping is frequently reversible with controlled drying, but the timeline
                    can extend weeks or months. Hardwood damage is commonly under-scoped in
                    initial assessments because manifestation is delayed.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Vinyl and LVT</strong> — can appear unaffected while moisture
                    migrates through adhesive to the subfloor beneath. Adhesive failure,
                    bubbling, and lifting at seams are common secondary outcomes. The subfloor
                    beneath vinyl frequently requires treatment even when the vinyl surface
                    looks intact.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Ceramic and porcelain tile</strong> — the tile itself is generally
                    unaffected by water, but grout lines are permeable and the substrate can
                    become fully saturated. Once saturated, tiles can lift, crack, or debond.
                    Assessment must include moisture content of the substrate, not just surface
                    inspection.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Natural stone</strong> — porous and susceptible to staining and
                    mineral deposits when exposed to contaminated water. Restoration requires
                    specialist cleaning techniques; standard products used on other floor types
                    can permanently damage stone surfaces.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Why Floor Coverings Are Often Under-Scoped in Claims',
            body: (
              <>
                <p>
                  Floor covering damage is one of the most commonly under-scoped elements of
                  a water or fire damage claim.
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subfloor damage is not visible without moisture testing</strong> —
                    an assessor relying on visual inspection alone cannot determine whether the
                    subfloor beneath LVT or tile is saturated
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Hardwood cupping takes time to manifest</strong> — a timber floor
                    that appears flat days after a water event can develop cupping over
                    subsequent weeks; initial assessments carried out too early may miss this
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Partial replacement may not be appropriate</strong> — when matching
                    boards are no longer available, or moisture has spread beyond the visible
                    damage zone, partial replacement results in a permanently mismatched floor
                    or recurring problems
                  </li>
                </ul>
                <p style={{ marginTop: '0.75rem' }}>
                  When a certified contractor documents moisture readings, subfloor assessments,
                  and the basis for restoration-versus-replacement decisions, the claim scope is
                  grounded in objective evidence that is significantly harder to dispute than
                  contractor opinion alone.
                </p>
              </>
            ),
          },
          {
            heading: 'What to Ask a Contractor',
            body: (
              <>
                <p>Before a floor covering restoration contractor starts work, ask:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Can you show me your current IICRC certification number?</li>
                  <li style={{ marginBottom: '0.5rem' }}>Will you assess and moisture-map the subfloor separately from the surface covering?</li>
                  <li style={{ marginBottom: '0.5rem' }}>What is your basis for recommending restoration versus replacement for this floor type?</li>
                  <li style={{ marginBottom: '0.5rem' }}>How frequently will you monitor drying progress and record readings?</li>
                  <li>What documentation will you provide for my insurance claim?</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'If You Disagree with the Scope',
            body: (
              <p>
                If an insurer-appointed contractor has produced a scope that you believe
                understates floor covering or subfloor damage, an independent certified
                contractor can assess the property and prepare a separate scope. Independent
                documentation — moisture maps, subfloor readings, and a written scope of works
                — provides the evidence base for disputing a claim through AFCA. Disaster
                Recovery Australia can arrange an independent assessment.
              </p>
            ),
          },
        ]}
      />
    </>
  );
}
