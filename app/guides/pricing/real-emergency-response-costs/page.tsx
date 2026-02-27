import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: "Real Emergency Response Costs — What You'll Actually Pay | Disaster Recovery",
  description: "The real costs of emergency disaster response in Australia. Emergency callout fees, after-hours pricing, what drives costs up, and the DR platform's transparent $2,750 model.",
  keywords: 'emergency response costs, disaster callout fees, after hours restoration pricing, emergency restoration cost Australia, transparent restoration pricing',
  openGraph: {
    title: 'Real Emergency Response Costs — Transparent Pricing',
    description: 'What professional emergency response actually costs in Australia — no surprise invoices.',
  },
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/pricing/real-emergency-response-costs' },
};

export default function RealEmergencyResponseCostsPage() {
  return (
    <AgGuidePageTemplate
      category="Pricing"
      title="Real Emergency Response Costs — What You'll Actually Pay"
      subtitle="Emergency disaster response pricing in Australia — what drives costs, what after-hours callouts really cost, and how the DR platform model keeps pricing transparent."
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Pricing', href: '/guides/pricing' },
        { label: 'Real Emergency Response Costs' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'Emergency Callout Fees in Australia',
          body: (
            <div className="space-y-4">
              <p>
                When disaster strikes — a burst pipe at 2 a.m., a kitchen fire on a Saturday afternoon, storm damage during a public holiday — the first question most property owners ask is: <em>how much will this cost?</em>
              </p>
              <p>
                The honest answer is that emergency restoration pricing in Australia varies enormously between providers. Here is what you can expect across the industry:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Callout fees</strong> — Many restoration companies charge a separate callout fee of $150 to $500 just to attend the property, before any work begins. This fee is often non-refundable even if you decide not to proceed.
                </li>
                <li>
                  <strong>Minimum service charges</strong> — Most professional restoration companies have a minimum service charge ranging from $1,500 to $3,500. This covers the mobilisation of equipment, the initial assessment, and the first phase of emergency works.
                </li>
                <li>
                  <strong>Hourly rates</strong> — Where hourly billing applies, expect $80 to $180 per hour per technician for standard restoration work. Specialist services (asbestos, biohazard, confined space) command higher rates.
                </li>
                <li>
                  <strong>Equipment hire</strong> — If not included in the service quote, daily equipment hire can add $50 to $150 per dehumidifier, $30 to $80 per air mover, and $100 to $300 per HEPA air scrubber. A typical residential drying setup may use 2 to 4 dehumidifiers and 6 to 12 air movers for 3 to 5 days — these costs accumulate quickly.
                </li>
              </ul>
              <p>
                <strong>The critical question to ask any restorer:</strong> Is your quote all-inclusive, or will there be additional charges for callout, equipment, travel, after-hours, and documentation?
              </p>
            </div>
          ),
        },
        {
          heading: 'After-Hours and Weekend Pricing',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Disasters happen disproportionately outside business hours. Burst pipes often fail at night when water pressure is highest and usage is lowest. Storms hit without regard for the calendar. Kitchen fires peak during evening cooking.
              </p>
              <p>
                The restoration industry&apos;s response to this reality varies:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Standard industry practice</strong> — Many restoration companies charge a 50% premium for after-hours callouts (after 6 p.m. weekdays) and a 100% premium for weekends and public holidays. On a $3,000 emergency response, that can mean paying $4,500 to $6,000 for the same work simply because of timing.
                </li>
                <li>
                  <strong>The Disaster Recovery platform</strong> — DR does not charge after-hours or weekend surcharges. The $2,750 initial commitment ($550 platform fee + $2,200 contractor credit) is the same at 2 a.m. on Christmas Day as it is at 10 a.m. on a Tuesday. Emergencies do not have business hours, and neither does our pricing.
                </li>
              </ul>
              <p>
                This difference alone can save you $1,500 to $3,000 on a single emergency response. When you are comparing quotes, always ask: <em>does this price change if I call outside business hours?</em>
              </p>
            </div>
          ),
        },
        {
          heading: 'What Drives Emergency Costs Up',
          body: (
            <div className="space-y-4">
              <p>
                Understanding what makes emergency restoration expensive helps you make informed decisions and avoid unnecessary costs. The main cost drivers are:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Delay</strong> — This is the single biggest cost driver. Every hour of delay after water damage allows moisture to migrate further into the structure — behind walls, under floors, into ceiling cavities. A burst pipe addressed within 2 hours may require drying a single room. The same burst pipe left for 24 hours may require drying three rooms, removing saturated plasterboard, and treating for mould. Delay can double or triple the total cost.
                </li>
                <li>
                  <strong>Contamination category</strong> — Clean water from a burst supply pipe (Category 1) is the simplest and cheapest to address. Grey water from a washing machine or dishwasher (Category 2) requires antimicrobial treatment. Sewage, floodwater, or any water that has contacted soil (Category 3) requires complete removal of all contacted porous materials and full decontamination — this is significantly more expensive.
                </li>
                <li>
                  <strong>Affected area and materials</strong> — Carpet and underlay dry faster and cheaper than timber flooring. Timber flooring dries faster than concrete slab. The number of rooms, floors, and the type of building materials all affect the quantity of equipment needed and the drying duration.
                </li>
                <li>
                  <strong>Access difficulty</strong> — High-rise apartments, multi-level properties, properties with restricted access (narrow driveways, heritage-listed buildings) increase labour and logistics costs. Equipment transport to a 15th-floor apartment takes considerably longer than to a ground-floor house.
                </li>
                <li>
                  <strong>Secondary damage</strong> — If the initial damage is not addressed properly, secondary damage develops: mould growth (within 24 to 48 hours in Australian conditions), timber swelling and warping, electrical corrosion, and structural compromise. Addressing secondary damage is always more expensive than preventing it.
                </li>
              </ul>
              <p>
                <strong>The takeaway:</strong> The fastest path to the lowest total cost is rapid professional response. Every hour of delay makes the job more complex and more expensive.
              </p>
            </div>
          ),
        },
        {
          heading: 'The DR Platform Model — $550 Fee + $2,200 Contractor Credit',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                The Disaster Recovery platform was built to solve the two biggest problems property owners face during emergencies: <em>how do I find a qualified restorer right now</em> and <em>how much is this going to cost me?</em>
              </p>
              <p>
                Here is exactly how the pricing works:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>$550 platform fee</strong> — Paid to Disaster Recovery. Covers claim lodgement, instant matching with an IICRC-certified contractor within your selected radius (20&ndash;100 km), full documentation support, and case coordination throughout the restoration.
                </li>
                <li>
                  <strong>$2,200 contractor credit</strong> — Goes directly to your matched contractor. Covers the emergency make-safe, initial damage assessment, and commencement of critical works. Your contractor arrives, secures the property, assesses the full extent of damage, and begins urgent interventions.
                </li>
              </ul>
              <p>
                <strong>Total initial commitment: $2,750.</strong> You know exactly what you are paying before any work starts.
              </p>
              <p>
                We bill you directly — the property owner. This is a deliberate choice. It means work begins immediately without waiting for insurer approval, without scope disputes between assessors, and without weeks of delay while your property deteriorates. You control the process from start to finish.
              </p>
              <p>
                Full claims documentation is provided — photographs, moisture readings, thermal imaging, scope of works, daily progress reports — everything your insurer requires to process your reimbursement claim. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>{' '}
                if you need to manage cash flow while waiting for reimbursement.
              </p>
            </div>
          ),
        },
        {
          heading: 'When Costs Exceed the Initial $2,750',
          body: (
            <div className="space-y-4">
              <p>
                The $2,750 initial commitment covers the emergency phase — make-safe, initial assessment, and urgent works. For minor incidents (a single-room water leak caught quickly, a small area of storm damage), this may cover the entire job. For larger or more complex damage, additional works will be needed.
              </p>
              <p>
                Here is how that works:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Emergency phase completes</strong> — Your contractor secures the property, extracts water or makes safe, and completes the initial assessment. You receive a detailed report of what was found, including any concealed damage identified through moisture mapping and thermal imaging.
                </li>
                <li>
                  <strong>Formal contract provided</strong> — After make-safe, your contractor provides a formal contract with full terms and conditions for the complete restoration scope. This includes a line-item breakdown of all work, materials, equipment, and timeframes.
                </li>
                <li>
                  <strong>You approve before work proceeds</strong> — No additional work begins without your written approval. You see exactly what is needed, what it costs, and why. There are no surprise invoices.
                </li>
                <li>
                  <strong>Documentation continues</strong> — Every phase of additional work is documented with photos, readings, and progress reports. This documentation supports your insurance reimbursement claim for the full restoration cost — not just the initial $2,750.
                </li>
              </ol>
              <p>
                <strong>Payment options:</strong> You can pay as the project progresses, or access payment plans through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>.{' '}
                Many property owners use finance to bridge the gap between paying the contractor and receiving their insurance reimbursement.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is the total upfront cost for emergency disaster response through Disaster Recovery?',
          answer: 'The total initial commitment is $2,750, consisting of a $550 platform fee (claim lodgement, contractor matching, documentation support) and a $2,200 contractor credit (emergency make-safe, assessment, and urgent works). This price is the same 24/7 — no after-hours or weekend surcharges. If the restoration requires works beyond the initial credit, your contractor provides a formal contract with transparent pricing before any additional work proceeds.',
        },
        {
          question: 'Does Disaster Recovery charge extra for after-hours or public holiday callouts?',
          answer: 'No. The Disaster Recovery platform charges the same $2,750 initial commitment regardless of when you lodge your claim — 2 a.m. on a Sunday, Christmas Day, or any public holiday. Many competitors charge 50% to 100% premiums for out-of-hours callouts. Our pricing is consistent because emergencies do not have business hours.',
        },
        {
          question: 'How do I pay for restoration if I am waiting for my insurance reimbursement?',
          answer: 'We bill you directly so work begins immediately without waiting for insurer approval. We provide full claims documentation — photos, moisture logs, scope of works, progress reports — to support your insurance reimbursement. If you need to manage cash flow while waiting, payment plans are available through Blue Fire Finance (bluefirefinance.com.au).',
        },
        {
          question: 'Why is fast response cheaper than waiting?',
          answer: 'Every hour of delay after water, fire, or storm damage allows damage to spread — moisture migrates behind walls and under floors, mould begins growing within 24 to 48 hours, and smoke residue embeds deeper into porous materials. A burst pipe addressed within 2 hours may require drying one room. The same burst pipe left 24 hours may require three rooms of drying, plasterboard removal, and mould treatment. Fast response consistently results in lower total restoration costs.',
        },
        {
          question: 'What happens if the restoration costs more than the initial $2,750?',
          answer: 'After the emergency make-safe, your contractor provides a formal contract with full terms and conditions for the complete restoration scope. This includes a line-item breakdown of all additional work, materials, and costs. No additional work proceeds without your written approval. Full documentation is provided for every phase to support your insurance reimbursement claim for the total restoration cost.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Professional Response Pricing Breakdown',
          href: '/guides/pricing/professional-response-pricing-breakdown',
          description: 'Detailed breakdown of what professional disaster response includes — extraction, drying, decontamination, and monitoring.',
        },
        {
          title: 'What Disaster Recovery Includes',
          href: '/guides/services/what-disaster-recovery-includes',
          description: 'The full service breakdown — platform fee, contractor credit, documentation, and what happens after make-safe.',
        },
        {
          title: 'Make-Safe and Insurance Coverage',
          href: '/guides/insurance/make-safe-insurance-coverage',
          description: 'Understanding make-safe obligations and how insurance covers emergency stabilisation works.',
        },
      ]}
    />
  );
}
