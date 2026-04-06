/**
 * Floor Covering Inspection — What to Expect from a Certified Contractor
 *
 * GAP-056: References ANSI/IICRC S220 as the certification benchmark
 * for floor covering inspection. Describes our certified process —
 * not the standard's content.
 *
 * ANSI/IICRC S220 (Standard for the Inspection of Flooring Systems)
 * is currently in public review (closes 19 April 2026).
 *
 * IICRC compliance: names the standard, states contractors follow it,
 * describes what a certified inspection involves in contractor process terms.
 * Does NOT reproduce the standard's framework or content.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next'
import { Layers } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Floor Covering Inspection After Water or Flood Damage | Disaster Recovery Australia',
  description:
    'What professional floor covering inspection involves after water or flood damage. How ANSI/IICRC S220-certified contractors assess, document, and determine restoration versus replacement for damaged flooring.',
  keywords: [
    'floor covering inspection',
    'IICRC floor inspection',
    'water damaged flooring assessment',
    'flood damage floor replacement',
    'hardwood floor inspection',
    'floor covering insurance claim',
    'certified floor inspection Australia',
    'IICRC S220',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/floor-coverings/iicrc-s220-floor-coverings-inspection-standard`,
  },
  openGraph: {
    title: 'Floor Covering Inspection After Water or Flood Damage',
    description:
      'Professional floor covering inspection: what ANSI/IICRC S220-certified contractors assess, what documentation your insurance claim needs, and how restoration vs. replacement decisions are made correctly.',
    url: `${NAP.url}/guides/floor-coverings/iicrc-s220-floor-coverings-inspection-standard`,
    type: 'website',
  },
}

export default function FloorCoveringInspectionWhatToExpectPage() {
  return (
    <AgGuidePageTemplate
      category="Floor Coverings"
      title="Floor Covering Inspection — What to Expect"
      subtitle="What professional floor covering inspection involves after water or flood damage, what your certified contractor should document, and how restoration versus replacement decisions are properly made."
      gradient="linear-gradient(135deg, #3B1F0A 0%, #6B3A1F 100%)"
      icon={<Layers className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Floor Coverings', href: '/guides/floor-coverings' },
        { label: 'Floor Covering Inspection — What to Expect' },
      ]}
      cta={{ text: 'Find a Certified Contractor', href: '/claim' }}
      sections={[
        {
          heading: 'The Professional Standard: ANSI/IICRC S220',
          body: (
            <>
              <p>
                Professional floor covering inspection in Australia is performed to <strong>ANSI/IICRC S220</strong> — the Standard for the Inspection of Flooring Systems, published by the Institute of Inspection, Cleaning and Restoration Certification (IICRC). This is the professional benchmark for assessing installed flooring systems after water damage, flooding, or other loss events — and is the standard referenced by insurers and AFCA when evaluating whether a flooring assessment was conducted appropriately.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The ANSI/IICRC S220 standard is currently under revision with public review closing 19 April 2026. Contractors in the NRPG network hold current IICRC Floor Care Technician (FCT) certification. For information on the ANSI/IICRC S220 standard, visit{' '}
                <a href="https://iicrc.org" target="_blank" rel="noopener noreferrer">
                  iicrc.org
                </a>.
              </p>
            </>
          ),
        },
        {
          heading: 'Why Certified Floor Inspection Matters After Water Damage',
          background: 'light',
          body: (
            <>
              <p>
                Flooring is the most visible component of water or flood damage — but surface appearance alone does not determine whether flooring can be restored or must be replaced. Water migrates beneath flooring materials, into the subfloor and structural elements below, where moisture is invisible without specialist equipment.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An ANSI/IICRC S220-certified contractor is trained to:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Measure moisture content within the flooring material and the subfloor beneath it — not just surface moisture</li>
                <li>Assess the type of water source (clean, grey, or contaminated) and whether the flooring material can be safely retained after exposure</li>
                <li>Determine whether individual floor types — hardwood, engineered timber, laminate, vinyl, carpet, or tile — are restorable or require replacement based on the extent and duration of exposure</li>
                <li>Identify subfloor damage, mould onset, or structural issues that would prevent retained flooring from performing correctly</li>
                <li>Document all findings with moisture readings and photographs to support the insurance claim and justify the restoration or replacement recommendation</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                A general builder or cleaner does not have this specialist flooring assessment training. Retained flooring that was not properly assessed may cup, buckle, delaminate, or develop mould beneath the surface — causing secondary damage and a second insurance dispute months after the original claim was closed.
              </p>
            </>
          ),
        },
        {
          heading: 'What Your Contractor Should Document',
          body: (
            <>
              <p>
                A professional floor covering assessment produces documentation your insurance claim requires. If the contractor cannot provide these records, the assessment may not have been conducted to the standard required:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Moisture reading records</strong> — Baseline moisture measurements taken in the flooring material, the subfloor, and adjacent structural elements before any decision on restoration or replacement is made.</li>
                <li><strong>Water source classification</strong> — Documentation of the water source type, as this directly affects whether porous materials such as carpet and timber can be safely retained.</li>
                <li><strong>Scope of works — floor-by-floor</strong> — Each affected area documented separately: floor type, extent of damage, moisture readings, and the recommended course of action (dry in place, lift and dry, or replace).</li>
                <li><strong>Photographic evidence</strong> — Before and after photographs showing condition at time of assessment, during drying, and upon completion.</li>
                <li><strong>Matching assessment</strong> — Where partial replacement is required, documentation of whether matching replacement product is available — relevant to insurance matching rights claims.</li>
                <li><strong>Completion readings</strong> — Final moisture readings confirming retained flooring has reached acceptable moisture content before the job is closed.</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Restoration vs. Replacement: How Decisions Should Be Made',
          background: 'light',
          body: (
            <>
              <p>
                One of the most common flooring insurance disputes arises when an insurer&apos;s contractor recommends drying retained flooring that should be replaced — or conversely, replaces flooring that could have been restored. Both errors have financial consequences for the policyholder. An ANSI/IICRC S220-certified assessment bases this decision on objective criteria, not cost minimisation:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.25rem' }}>
                {[
                  {
                    type: 'Solid and Engineered Hardwood',
                    color: '#92400E',
                    bg: '#FFFBEB',
                    border: '#FDE68A',
                    note: 'May be restorable if drying commences promptly and moisture content can be returned to acceptable ranges without permanent distortion. Extended exposure, contaminated water, or significant cupping and buckling typically requires replacement. Subfloor condition is assessed before a decision is made.',
                  },
                  {
                    type: 'Laminate and LVP / Hybrid Flooring',
                    color: '#1E40AF',
                    bg: '#EFF6FF',
                    border: '#BFDBFE',
                    note: 'Laminate swells irreversibly when saturated and is typically replaced rather than dried. Luxury vinyl plank and hybrid flooring is water-resistant on surface but moisture can penetrate seams and adhesive bonds — assessment determines whether the installation can be retained.',
                  },
                  {
                    type: 'Carpet and Carpet Underlay',
                    color: '#065F46',
                    bg: '#F0FDF4',
                    border: '#BBF7D0',
                    note: 'Carpet exposed to clean water may be restorable within a short window if drying commences promptly. Carpet exposed to contaminated or sewage-affected water is typically replaced for health reasons. Underlay is almost always replaced regardless of water source. The replacement vs. restore decision is time-sensitive.',
                  },
                  {
                    type: 'Ceramic, Porcelain, and Stone Tile',
                    color: '#374151',
                    bg: '#F9FAFB',
                    border: '#E5E7EB',
                    note: 'Tile itself is not damaged by water, but the adhesive bed and grout joints may trap moisture. Assessment focuses on the subfloor condition and whether moisture is present beneath the tile installation — which can cause adhesive failure, hollow tiles, or mould growth beneath the surface over time.',
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    style={{
                      background: item.bg,
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      border: `1px solid ${item.border}`,
                      borderLeft: `5px solid ${item.color}`,
                    }}
                  >
                    <div style={{ fontWeight: 700, color: item.color, marginBottom: '0.5rem' }}>{item.type}</div>
                    <p style={{ fontSize: '0.9rem', color: '#374151' }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </>
          ),
        },
        {
          heading: 'Matching Rights: When Partial Replacement Creates a Dispute',
          body: (
            <>
              <p>
                A frequently disputed insurance issue after floor damage is the insurer&apos;s obligation when only part of a floor run is damaged. If the damaged section cannot be matched — because the product is discontinued, the colour has faded, or the exact product is no longer available — replacing only the damaged section leaves a visible mismatch.
              </p>
              <p style={{ marginTop: '1rem' }}>
                AFCA has ruled on flooring matching disputes in policyholders&apos; favour in cases where:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>The replacement product could not be matched to the undamaged portion within the same room or open-plan space</li>
                <li>The insurer&apos;s scope only covered the damaged section, leaving a visually mismatched floor</li>
                <li>The policyholder provided independent documentation that a match was not available</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                An independent ANSI/IICRC S220 assessment documents whether matching replacement product is available, and what the reasonable scope of replacement is — including adjoining areas where a visible mismatch would result from partial replacement.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  href="/claim"
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
                    background: '#6B3A1F',
                    color: 'white',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Get an Independent Floor Assessment
                </Link>
              </div>
            </>
          ),
        },
        {
          heading: 'If Your Insurer\'s Flooring Decision Falls Short',
          background: 'light',
          body: (
            <>
              <p>
                Flooring disputes most commonly arise from three scenarios: retained flooring that develops secondary problems after claim closure, partial replacement scopes that produce visible mismatches, and failure to assess subfloor damage beneath retained flooring. If you have concerns:
              </p>
              <ol style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2.2 }}>
                <li><strong>Request all assessment documentation</strong> — Moisture readings, scope of works, and the basis for any restoration vs. replacement decision, before accepting claim closure.</li>
                <li><strong>Get an independent ANSI/IICRC S220 assessment</strong> — An independent certified contractor documents current flooring condition, moisture levels, and the adequacy of any work already completed.</li>
                <li><strong>Lodge an internal dispute with your insurer</strong> — Attach the independent assessment. All Australian insurers must have an internal dispute resolution process.</li>
                <li><strong>Escalate to AFCA if unresolved within 30 days</strong> — AFCA accepts flooring and matching disputes at no cost and has a published track record on matching rights cases.</li>
              </ol>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is ANSI/IICRC S220?',
          answer:
            'ANSI/IICRC S220 is the Standard for the Inspection of Flooring Systems, published by the IICRC. It is the professional benchmark for certified floor covering inspection — including assessment of water-damaged flooring, restoration versus replacement decisions, and documentation standards for insurance claims. The standard is currently under public review with the next edition expected in 2026. For more information, visit iicrc.org.',
        },
        {
          question: 'How do I know if my floor assessment was done properly?',
          answer:
            'A proper ANSI/IICRC S220 floor inspection produces written moisture readings taken in the flooring material and the subfloor, a scope of works documenting the basis for any restoration or replacement recommendation, and photographic evidence. If the contractor made a decision without moisture meter readings or without inspecting the subfloor beneath the affected area, the assessment documentation standard was not met.',
        },
        {
          question: 'Can hardwood floors be saved after flooding?',
          answer:
            'Hardwood floors may be restorable if drying commences promptly, the subfloor is dry, and moisture content can be returned to acceptable ranges without permanent distortion. Extended water exposure, contaminated water sources, or significant structural movement (cupping, buckling) typically requires replacement. The correct answer depends on an objective assessment by a certified technician — not a presumption in either direction.',
        },
        {
          question: 'Does insurance cover flooring replacement after water damage?',
          answer:
            'Coverage depends on the cause and your policy. Flooring damaged by a sudden and accidental covered event (burst pipe, storm flooding) is typically covered. The insurer may try to dry and retain flooring rather than replace it — a certified assessment determines whether drying is appropriate or replacement is required. If the insurer\'s decision is disputed, an independent ANSI/IICRC S220 assessment provides the documentation for a formal claim review.',
        },
        {
          question: 'Am I entitled to have my entire floor replaced if only part of it was damaged?',
          answer:
            'If matching replacement product is not available, AFCA has ruled in policyholders\' favour for replacement of the full floor run within the affected room or space. The key evidence is independent documentation that a match is not available. An ANSI/IICRC S220 assessment includes a matching assessment as part of the scope of works.',
        },
      ]}
      relatedGuides={[
        { title: 'Restoring Flood Damaged Hardwood Floors', href: '/guides/flood-damage/flood-damage-hardwood-floors' },
        { title: 'Water Damage Restoration — What to Expect', href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard' },
        { title: 'Mould Remediation — What to Expect', href: '/guides/mould/iicrc-s520-mould-remediation-standard' },
        { title: 'Your Advocate vs Your Insurer\'s Builder', href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder' },
        { title: 'Why Hire an IICRC-Certified Professional', href: '/guides/certifications/why-hire-iicrc-certified' },
      ]}
    />
  )
}
