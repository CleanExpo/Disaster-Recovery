import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import Link from 'next/link';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "What's Included in Disaster Recovery Services — Full Breakdown | Disaster Recovery",
  description: 'Complete breakdown of what the Disaster Recovery platform includes: $550 platform fee, $2,200 contractor credit, documentation, formal contract, and payment options.',
  keywords: 'disaster recovery services, what is included, platform fee, contractor credit, restoration documentation, emergency restoration Australia, IICRC certified',
};

export default function WhatDisasterRecoveryIncludesPage() {
  return (
    <AgGuidePageTemplate
      category="Services"
      title="What the Disaster Recovery Platform Includes"
      subtitle="The full service breakdown — what the platform fee covers, what the contractor credit covers, what happens after the initial commitment, and your payment options."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<Wrench className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Services', href: '/guides/services' },
        { label: "What's Included in DR Services" },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'What the $550 Platform Fee Covers',
          body: (
            <div className="space-y-4">
              <p>
                The $550 platform fee is a one-time payment to Disaster Recovery that activates the full platform service. It is not a &ldquo;booking fee&rdquo; or a &ldquo;service charge&rdquo; that disappears into overhead — it funds specific, tangible services that directly support your restoration:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Claim lodgement</strong> — You submit your damage details, location, and photos through the online claim form at <Link href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</Link>. The platform processes your claim immediately — no phone queues, no business-hours-only service desk, no waiting for a callback.
                </li>
                <li>
                  <strong>Instant contractor matching</strong> — The platform matches you with the nearest available IICRC-certified contractor within your selected radius (20 to 100 km). Matching happens automatically based on your location, damage type, and contractor availability. You receive confirmation within minutes, with a 60-minute emergency response target.
                </li>
                <li>
                  <strong>Documentation support</strong> — Throughout the restoration, the platform coordinates documentation standards with your contractor. This ensures you receive professional-grade claims documentation — not just a few photos and an invoice, but the full evidence package your insurer requires.
                </li>
                <li>
                  <strong>Case coordination</strong> — The platform maintains oversight of your claim from lodgement through to completion. If issues arise, if additional resources are needed, or if the scope changes, the platform coordinates between you and your contractor.
                </li>
              </ul>
              <p>
                The platform fee is the same regardless of when you lodge — no after-hours surcharges, no weekend premiums, no public holiday markups. Emergencies do not have business hours, and neither does our pricing.
              </p>
            </div>
          ),
        },
        {
          heading: 'What the $2,200 Contractor Credit Covers',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                The $2,200 contractor credit goes directly to your matched IICRC-certified contractor. It covers the critical first phase of any disaster restoration:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Emergency make-safe</strong> — Securing the property against further damage. Depending on the event, this may include water extraction, emergency board-up, tarping damaged roofing, isolating electrical hazards, or establishing containment zones for contamination. Make-safe stops the damage from getting worse while the full assessment is completed.
                </li>
                <li>
                  <strong>Initial damage assessment</strong> — A thorough evaluation of the damage using professional equipment — moisture meters, thermal imaging cameras, hygrometers, and visual inspection. The assessment identifies the full extent of damage, including concealed damage behind walls, under floors, and in ceiling cavities that is not visible to the eye.
                </li>
                <li>
                  <strong>Commencement of urgent works</strong> — Depending on the damage type, this may include deploying drying equipment (dehumidifiers, air movers), applying antimicrobial treatments, beginning soot and smoke residue removal, or establishing HEPA-filtered containment for mould remediation. These are time-critical interventions that reduce secondary damage and total restoration cost.
                </li>
              </ul>
              <p>
                The contractor credit is applied to the first $2,200 of restoration work. Your contractor does not charge an additional callout fee or assessment fee on top of this credit — it covers attendance, assessment, and emergency works in a single amount.
              </p>
            </div>
          ),
        },
        {
          heading: 'What Happens After the Initial Commitment',
          body: (
            <div className="space-y-4">
              <p>
                The $2,750 total initial commitment ($550 platform fee + $2,200 contractor credit) covers the emergency phase. For minor incidents, this may be sufficient. For larger or more complex damage, additional works will be required. Here is exactly how the transition works:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Emergency phase completes</strong> — Your contractor finishes make-safe, completes the damage assessment, and begins urgent interventions. You receive a detailed report of findings, including photographs, moisture readings, and a description of all damage identified — visible and concealed.
                </li>
                <li>
                  <strong>Formal contract provided</strong> — After make-safe, your contractor provides a formal contract with full terms and conditions. This is not a vague estimate — it is a detailed scope of works with line-item pricing for every task: demolition, drying, decontamination, contents handling, rebuild, and any specialist services required.
                </li>
                <li>
                  <strong>You review and approve</strong> — You see exactly what work is proposed, what it costs, and why it is needed. You can ask questions, request changes, or get a second opinion. No additional work proceeds without your written approval.
                </li>
                <li>
                  <strong>Restoration proceeds</strong> — Once approved, the full restoration continues with daily monitoring, ongoing documentation, and regular progress updates. Your contractor manages the project from drying through to rebuild completion.
                </li>
                <li>
                  <strong>Final documentation delivered</strong> — At project completion, you receive the complete documentation package: before and after photographs, moisture logs, air quality results (where applicable), scope of works, daily reports, and final invoicing. This package supports your insurance reimbursement claim for the full restoration cost.
                </li>
              </ol>
            </div>
          ),
        },
        {
          heading: 'What Documentation You Receive',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Documentation is not an afterthought — it is a core deliverable of the Disaster Recovery platform. The documentation your contractor provides serves two critical purposes: it confirms the restoration was completed to IICRC standards, and it gives your insurer everything they need to process your reimbursement.
              </p>
              <p>
                Your documentation package includes:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Photographic evidence</strong> — Before, during, and after photographs of all affected areas. These are dated and captioned, showing the initial damage, the restoration process, and the completed result.
                </li>
                <li>
                  <strong>Moisture readings and logs</strong> — Daily moisture meter readings showing the drying progress for each affected material and area. These readings demonstrate that the structure was dried to its dry standard — the objective measure that drying is complete.
                </li>
                <li>
                  <strong>Thermal imaging reports</strong> — Where thermal imaging was used to identify concealed damage, the images and interpretation are included. These are powerful evidence for insurance claims because they show damage that is invisible to the naked eye.
                </li>
                <li>
                  <strong>Scope of works</strong> — A detailed document listing every task performed, materials used, equipment deployed, and the rationale for each. This is the primary document your insurer uses to verify the claim is reasonable and necessary.
                </li>
                <li>
                  <strong>Air quality reports</strong> — Where mould remediation or contamination was involved, air quality testing results (pre-remediation and post-remediation) confirm the property meets safe occupancy standards.
                </li>
                <li>
                  <strong>Contents inventory</strong> — If pack-out was required, a detailed inventory of all items removed, their condition, storage location, and cleaning or disposal outcomes.
                </li>
                <li>
                  <strong>Daily progress reports</strong> — A record of work completed each day, equipment in place, readings taken, and any issues or scope changes identified.
                </li>
              </ul>
              <p>
                Full claims documentation is provided as a standard part of the service — not as an optional extra.
              </p>
            </div>
          ),
        },
        {
          heading: 'Payment Options and Blue Fire Finance',
          body: (
            <div className="space-y-4">
              <p>
                We bill you directly — the property owner. This is a deliberate choice that benefits you in several important ways:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Work begins immediately</strong> — Because we do not wait for insurer approval, your emergency response starts as soon as a contractor is matched. No scope disputes, no assessor visits, no weeks of delay while your property continues to deteriorate.
                </li>
                <li>
                  <strong>You control the process</strong> — You choose when work starts, you approve the scope, and you decide how the restoration proceeds. There is no insurer-appointed project manager making decisions about your property.
                </li>
                <li>
                  <strong>Full reimbursement support</strong> — The comprehensive claims documentation we provide gives your insurer everything they need to process your reimbursement. You are not left trying to piece together evidence after the fact.
                </li>
              </ul>
              <p>
                <strong>Payment structure:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>$550 platform fee — paid at claim lodgement</li>
                <li>$2,200 contractor credit — paid at claim lodgement</li>
                <li>Additional works — as quoted in the formal contract, invoiced as work progresses</li>
              </ul>
              <p>
                If you need to manage cash flow while waiting for your insurance reimbursement, payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>.{' '}
                Blue Fire Finance offers flexible terms that can bridge the gap between paying your contractor and receiving funds from your insurer.
              </p>
              <p>
                Many property owners use finance because insurance reimbursement timelines vary from 2 weeks to several months depending on the insurer, claim complexity, and documentation completeness. Our documentation is designed to minimise processing time, but finance provides certainty regardless of insurer timelines.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What does the $550 platform fee cover?',
          answer: 'The $550 platform fee covers claim lodgement, instant matching with an IICRC-certified contractor within your selected radius (20 to 100 km), documentation support throughout the restoration, and ongoing case coordination. It is a one-time fee with no after-hours or weekend surcharges.',
        },
        {
          question: 'What does the $2,200 contractor credit cover?',
          answer: 'The $2,200 contractor credit goes directly to your matched IICRC-certified contractor and covers the emergency make-safe, initial damage assessment (using moisture meters, thermal imaging, and professional inspection), and commencement of urgent works. There is no additional callout or assessment fee on top of this credit.',
        },
        {
          question: 'What happens if my restoration costs more than $2,750?',
          answer: 'After the emergency make-safe phase, your contractor provides a formal contract with full terms and conditions for the complete restoration scope. This includes a line-item breakdown of all work, materials, equipment, and costs. No additional work proceeds without your written approval. Full documentation is provided for every phase to support your insurance reimbursement claim for the total cost.',
        },
        {
          question: 'How does payment work if I am claiming on insurance?',
          answer: 'We bill you directly so work begins immediately without waiting for insurer approval. You pay the contractor and we provide full claims documentation — photos, moisture logs, scope of works, progress reports — so you can claim reimbursement from your insurer with complete evidence. If you need to manage cash flow while waiting, payment plans are available through Blue Fire Finance (bluefirefinance.com.au).',
        },
        {
          question: 'What documentation will I receive for my insurance claim?',
          answer: 'You receive a complete documentation package including before/during/after photographs, daily moisture readings and logs, thermal imaging reports, detailed scope of works, air quality results (if applicable), contents inventory (if pack-out occurred), and daily progress reports. This professional-grade documentation is provided as standard — not an optional extra — and gives your insurer everything they need to process your reimbursement.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Professional Response Pricing Breakdown',
          href: '/guides/pricing/professional-response-pricing-breakdown',
          description: 'What professional disaster response costs include — extraction, drying, decontamination, and monitoring explained.',
        },
        {
          title: 'Contents Pack-Out & Storage',
          href: '/guides/services/contents-pack-out-storage',
          description: 'How contents pack-out works during restoration — inventory, packing, storage, cleaning, and return.',
        },
        {
          title: 'Make-Safe and Insurance Coverage',
          href: '/guides/insurance/make-safe-insurance-coverage',
          description: 'Understanding make-safe obligations and how emergency stabilisation works are covered by insurance.',
        },
      ]}
    />
  );
}
