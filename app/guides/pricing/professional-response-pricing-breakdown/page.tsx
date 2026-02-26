import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Professional Disaster Response Pricing Breakdown | Disaster Recovery',
  description: 'Understand what professional disaster response actually costs in Australia. Extraction, drying, decontamination, monitoring — transparent pricing with no hidden fees.',
  keywords: 'disaster response pricing, restoration costs Australia, water damage pricing, fire restoration cost, mould remediation pricing, emergency restoration fees, transparent pricing',
  openGraph: {
    title: 'Professional Disaster Response Pricing Breakdown',
    description: 'What professional disaster response costs in Australia — extraction, drying, decontamination, and monitoring explained with transparent pricing.',
  },
};

export default function ProfessionalResponsePricingBreakdownPage() {
  return (
    <AgGuidePageTemplate
      category="Pricing"
      title="Professional Disaster Response Pricing Breakdown"
      subtitle="What professional disaster response actually costs in Australia — from emergency extraction to structural drying and decontamination. No hidden fees, no surprises."
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Pricing', href: '/guides/pricing' },
        { label: 'Professional Response Pricing Breakdown' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'What Professional Response Costs Include',
          body: (
            <div className="space-y-4">
              <p>
                Professional disaster response is not a single service — it is a sequence of specialist interventions, each requiring specific equipment, training, and certification. Understanding what is included helps you evaluate quotes accurately and avoid paying for work that was never done.
              </p>
              <p>
                A complete professional response typically includes the following stages:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Emergency extraction</strong> — Removing standing water, sewage, or contaminated material using truck-mounted or portable extraction units. This is the critical first step that limits secondary damage. For water damage, every hour of delay increases drying time and restoration cost significantly.
                </li>
                <li>
                  <strong>Structural drying</strong> — Deploying commercial-grade dehumidifiers and air movers to dry the structure to its dry standard. This phase typically runs 3 to 5 days and requires daily monitoring with calibrated moisture meters. The number of units needed depends on the affected area, materials involved, and ambient conditions.
                </li>
                <li>
                  <strong>Decontamination</strong> — Antimicrobial treatment, soot and smoke residue removal, mould remediation, or biohazard cleaning depending on the damage type. Each contamination type requires specific chemicals, application methods, and safety protocols. IICRC S500 (water), S520 (mould), and FSRT (fire/smoke) standards govern these processes.
                </li>
                <li>
                  <strong>Monitoring and documentation</strong> — Daily moisture readings, air quality testing, thermal imaging, and photographic records. This documentation serves two purposes: it confirms the restoration is progressing correctly, and it provides the evidence your insurer needs to process your claim.
                </li>
                <li>
                  <strong>Contents handling</strong> — Inventory, pack-out, specialist cleaning, and return of salvageable contents. Depending on damage type, this may include ultrasonic cleaning, ozone treatment, or dry cleaning of textiles.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Typical Price Ranges by Service Type',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Pricing varies based on damage severity, affected area, contamination category, and access difficulty. The ranges below reflect typical Australian residential projects:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Water damage restoration</strong> — $2,200 to $15,000+ for residential properties. A single-room burst pipe with quick response sits at the lower end. Multi-room flooding with Category 2 or 3 contamination pushes costs higher due to demolition, decontamination, and extended drying requirements.
                </li>
                <li>
                  <strong>Fire and smoke restoration</strong> — $3,000 to $50,000+ depending on the extent of fire, smoke, and soot damage. Smoke remediation is often the largest cost component because smoke residue penetrates HVAC systems, wall cavities, and porous surfaces throughout the property — not just the room where the fire occurred.
                </li>
                <li>
                  <strong>Mould remediation</strong> — $2,500 to $20,000+ depending on species, extent, and whether the mould is accessible or concealed behind wall linings and in ceiling cavities. Containment setup, air filtration (HEPA scrubbers), and post-remediation clearance testing add to the cost but are essential for safe and effective treatment.
                </li>
                <li>
                  <strong>Storm damage restoration</strong> — $2,000 to $30,000+ depending on structural damage, water ingress, and whether temporary make-safe (board-up, tarping) was required. Cyclone and severe storm events can push costs well beyond these ranges.
                </li>
                <li>
                  <strong>Sewage and biohazard cleanup</strong> — $3,000 to $25,000+ due to the strict decontamination protocols required for Category 3 contamination. All porous materials contacted by contaminated water must be removed and replaced, and the affected area must pass clearance testing.
                </li>
              </ul>
              <p>
                <strong>Important:</strong> These ranges are for the restoration phase only. Rebuild costs (replacing plasterboard, painting, flooring, cabinetry) are additional and quoted separately once the structure is confirmed dry and clean.
              </p>
            </div>
          ),
        },
        {
          heading: 'Hidden Costs to Watch for in Quotes',
          body: (
            <div className="space-y-4">
              <p>
                Not all restoration quotes are created equal. Some companies quote low to win the job, then add charges throughout the project. Here are the most common hidden costs to watch for:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>After-hours and weekend surcharges</strong> — Some companies charge 50% to 100% premiums for callouts outside business hours. Disasters do not wait for Monday morning, so check whether the quote includes after-hours rates or standard rates regardless of timing.
                </li>
                <li>
                  <strong>Equipment hire charged separately</strong> — Dehumidifiers, air movers, HEPA scrubbers, and moisture meters should be included in the restoration quote. Some companies quote labour only, then add daily equipment hire fees that accumulate rapidly over a 3 to 7 day drying period.
                </li>
                <li>
                  <strong>Travel and callout fees</strong> — Some companies charge a separate callout fee on top of the service quote. Others include travel time in their hourly rate, effectively billing you for their commute.
                </li>
                <li>
                  <strong>Scope creep without approval</strong> — Work expanding beyond the original scope without your written approval, then being billed at the end. A professional restorer will identify additional work needed, explain it, and get your approval before proceeding.
                </li>
                <li>
                  <strong>Missing documentation</strong> — If the restorer does not provide detailed documentation (photos, moisture logs, scope of works), your insurance claim may be delayed or underpaid. Documentation is not optional — it is part of the professional service.
                </li>
              </ul>
              <p>
                <strong>Ask every restorer:</strong> Does your quote include all equipment hire, after-hours rates, travel, and full insurance documentation? If the answer is vague, that is a red flag.
              </p>
            </div>
          ),
        },
        {
          heading: "Disaster Recovery's Transparent $550 + $2,200 Model",
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                The Disaster Recovery platform operates on a transparent two-part pricing model designed to get work started immediately:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>$550 platform fee</strong> — Covers claim lodgement, instant contractor matching within your selected radius (20&ndash;100 km), documentation support, and ongoing case coordination. This is a one-time fee paid to the platform.
                </li>
                <li>
                  <strong>$2,200 contractor credit</strong> — Goes directly to your matched IICRC-certified contractor. This covers the emergency make-safe, initial damage assessment, and commencement of urgent works. Your contractor arrives, secures the property, assesses the damage, and begins critical interventions.
                </li>
              </ul>
              <p>
                <strong>Total initial commitment: $2,750.</strong> This covers the emergency response phase. After make-safe, your contractor provides a formal contract with full terms and conditions for the complete restoration scope. Any additional works beyond the initial $2,200 credit are quoted transparently before proceeding.
              </p>
              <p>
                We bill you directly — the property owner, not the insurer. This means work begins immediately without waiting for insurer approval. You control the process, you choose when work starts, and there are no scope disputes with insurance assessors delaying your restoration.
              </p>
              <p>
                Full claims documentation is provided — photos, moisture logs, scope of works, daily progress reports — everything your insurer needs to process your reimbursement claim.
              </p>
              <p>
                Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>{' '}
                if you need to spread the cost while waiting for your insurance reimbursement.
              </p>
            </div>
          ),
        },
        {
          heading: 'Why Professional Restoration Is Cost-Effective vs DIY',
          body: (
            <div className="space-y-4">
              <p>
                The initial cost of professional restoration can seem high compared to hiring a carpet cleaner or renting a dehumidifier from the hardware store. But the maths consistently favours professional intervention — here is why:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Secondary damage prevention</strong> — Professional extraction and drying within the first 24 hours can reduce total restoration costs by 40% to 60% compared to delayed or inadequate response. Mould colonisation, timber warping, and electrical damage all escalate rapidly without proper intervention.
                </li>
                <li>
                  <strong>Insurance claim support</strong> — Professional documentation (moisture readings, thermal imaging, photos, scope of works) is what your insurer needs to approve reimbursement. DIY efforts rarely produce the evidence required, which can result in claim denial or reduced payouts.
                </li>
                <li>
                  <strong>Correct identification of damage extent</strong> — A professional uses moisture meters, thermal cameras, and hygrometers to identify all affected areas — including behind walls, under floors, and in ceiling cavities. DIY drying addresses only visible moisture, leaving concealed moisture to cause mould, rot, and structural damage that costs far more to fix later.
                </li>
                <li>
                  <strong>Health and safety</strong> — Category 2 and 3 water (grey and black water), mould spores, soot residue, and asbestos-containing materials all pose serious health risks. Professional restorers use appropriate PPE, containment, and decontamination protocols. DIY attempts without proper protection can result in illness and cross-contamination.
                </li>
                <li>
                  <strong>Time cost</strong> — Professional drying with commercial equipment takes 3 to 5 days. Consumer-grade dehumidifiers in the same space may take 2 to 4 weeks — during which time secondary damage is actively occurring and you may be unable to use the affected rooms.
                </li>
              </ul>
              <p>
                <strong>The bottom line:</strong> Professional restoration costs more upfront than a DIY attempt, but it costs significantly less than fixing the secondary damage that DIY efforts almost always leave behind. When you factor in insurance reimbursement, the out-of-pocket cost of professional restoration is often lower than the out-of-pocket cost of the DIY approach that your insurer will not cover.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How much does professional disaster response cost in Australia?',
          answer: 'Professional disaster response in Australia typically starts from $2,200 for the restoration phase, with most residential projects ranging from $2,200 to $15,000 for water damage, $3,000 to $50,000+ for fire and smoke, and $2,500 to $20,000+ for mould remediation. The Disaster Recovery platform has a transparent initial commitment of $2,750 ($550 platform fee + $2,200 contractor credit) which covers emergency make-safe, initial assessment, and commencement of urgent works.',
        },
        {
          question: 'Does Disaster Recovery charge extra for after-hours or weekend callouts?',
          answer: 'No. The Disaster Recovery platform operates 24/7 with no after-hours or weekend surcharges. The $2,750 initial commitment ($550 platform fee + $2,200 contractor credit) is the same regardless of when you lodge your claim. Many competitors charge 50% to 100% premiums for out-of-hours callouts — always ask before engaging any restoration company.',
        },
        {
          question: 'What does the $550 platform fee cover?',
          answer: 'The $550 platform fee covers claim lodgement, instant matching with an IICRC-certified contractor within your selected radius (20 to 100 km), documentation support throughout the restoration process, and ongoing case coordination. It is a one-time fee paid to the Disaster Recovery platform.',
        },
        {
          question: 'What happens if restoration costs exceed the initial $2,750?',
          answer: 'After the emergency make-safe phase, your contractor provides a formal contract with full terms and conditions for the complete restoration scope. Any works beyond the initial $2,200 contractor credit are quoted transparently before proceeding — you approve all additional costs in writing. Full claims documentation is provided to support your insurance reimbursement. Payment plans are available through Blue Fire Finance.',
        },
        {
          question: 'Is professional restoration covered by insurance?',
          answer: 'Most Australian home and contents insurance policies cover professional restoration for sudden and accidental damage such as burst pipes, storms, fire, and appliance leaks. We bill you directly so work begins immediately without waiting for insurer approval. We provide full claims documentation — photos, moisture logs, scope of works, and progress reports — so you can claim reimbursement from your insurer with complete evidence.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Real Emergency Response Costs',
          href: '/guides/pricing/real-emergency-response-costs',
          description: 'What you will actually pay for emergency disaster response — callout fees, after-hours pricing, and the DR platform model.',
        },
        {
          title: 'What Disaster Recovery Includes',
          href: '/guides/services/what-disaster-recovery-includes',
          description: 'The full service breakdown — what the platform fee covers, what the contractor credit covers, and what happens next.',
        },
        {
          title: 'The Invoice Shock Epidemic',
          href: '/guides/industry-problems/invoice-shock-epidemic',
          description: 'Why restoration invoices often shock property owners and how transparent pricing prevents it.',
        },
      ]}
    />
  );
}
