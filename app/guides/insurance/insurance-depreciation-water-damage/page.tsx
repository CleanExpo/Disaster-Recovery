import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Understanding Depreciation in Water Damage Claims | Disaster Recovery',
  description: 'How insurance depreciation affects water damage payouts in Australia. Learn how insurers calculate depreciation, when to dispute it, and how to maximise your claim.',
  keywords: 'insurance depreciation water damage, water damage claim payout, depreciation dispute insurance, insurance claim depreciation Australia, replacement vs depreciated value',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/insurance-depreciation-water-damage' },
};

export default function InsuranceDepreciationWaterDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Understanding Depreciation in Water Damage Claims"
      subtitle="When your insurer applies depreciation to a water damage claim, your payout can be reduced by thousands. This guide explains how depreciation works in Australian insurance, when it applies, and how to dispute unfair deductions."
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Understanding Depreciation in Water Damage Claims' },
      ]}
      sections={[
        {
          heading: 'What Is Insurance Depreciation?',
          body: (
            <>
              <p>
                Insurance depreciation is the reduction in value that an insurer applies to
                damaged items or materials based on their age and condition at the time of
                loss. The principle is straightforward: a 10-year-old carpet is not worth the
                same as a new carpet, so the insurer reduces the payout to reflect its
                pre-loss value — not the cost of a brand-new replacement.
              </p>
              <p style={{ marginTop: '1rem' }}>
                In Australian home and contents insurance, there are two main policy types
                that determine how depreciation affects your payout:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Replacement value (new for old):</strong> The insurer pays to
                  replace the damaged item with a new equivalent, regardless of age. This is
                  the most common policy type for home insurance in Australia. Depreciation
                  generally does not apply to building repairs under replacement value policies.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Indemnity value (market value):</strong> The insurer pays the current
                  market value of the item at the time of damage — factoring in age, wear,
                  and depreciation. These policies have lower premiums but significantly lower
                  payouts, especially for older items and fittings.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The type of policy you hold is the single biggest factor determining whether
                depreciation will affect your water damage claim. Check your Product Disclosure
                Statement (PDS) to confirm your cover type.
              </p>
            </>
          ),
        },
        {
          heading: 'How Insurers Calculate Depreciation on Water Damage',
          body: (
            <>
              <p>
                When depreciation is applied to a water damage claim, insurers typically use
                a combination of these factors:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Age of the item or material:</strong> The older the carpet, flooring,
                  cabinetry, or appliance, the higher the depreciation applied. Insurers often
                  use standard depreciation schedules — for example, carpet may be depreciated
                  at 10% per year, giving a 5-year-old carpet a 50% reduction.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Condition before the incident:</strong> If the carpet was already
                  stained, worn, or damaged before the water event, the insurer may apply
                  additional depreciation beyond the standard age-based schedule.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Expected useful life:</strong> Insurers assign different lifespans
                  to different materials. Carpet might have a 10-year expected life, while
                  timber flooring might be 25 years. Items near the end of their expected life
                  face the steepest depreciation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Betterment:</strong> If replacing the damaged item results in an
                  improvement (for example, replacing 15-year-old carpet with new carpet),
                  some insurers claim &quot;betterment&quot; — arguing you are ending up with something
                  better than you had. This is one of the most commonly disputed aspects of
                  depreciation.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The practical impact can be significant. A water damage claim involving carpet,
                underlay, and timber skirting boards in a 15-year-old home could see the
                insurer reduce the payout by 40% to 60% under an indemnity policy — leaving
                you thousands of dollars short of the actual restoration cost.
              </p>
            </>
          ),
        },
        {
          heading: 'When and How to Dispute Unfair Depreciation',
          body: (
            <>
              <p>
                Not all depreciation is applied fairly, and you have the right to challenge
                your insurer&apos;s assessment. Common grounds for dispute include:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Replacement value policy but depreciation applied:</strong> If you
                  hold a replacement value (new for old) policy, your insurer should not be
                  depreciating building materials. This is a clear policy breach that can be
                  escalated.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Excessive depreciation rates:</strong> If your insurer is depreciating
                  carpet at 15% per year when the industry standard is closer to 10%, the
                  calculation may be challengeable. Request the depreciation schedule used.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Condition evidence ignored:</strong> If you can prove the item was
                  in excellent condition before the water event (through photos, receipts, or
                  maintenance records), standard age-based depreciation may overstate the
                  reduction.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Betterment applied incorrectly:</strong> Betterment should only
                  apply when the replacement genuinely improves your position. Replacing
                  water-damaged carpet with the same grade of carpet is not betterment — it is
                  restoration to pre-loss condition.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If your insurer will not resolve the dispute internally, lodge a complaint with
                AFCA (Australian Financial Complaints Authority). AFCA provides free and
                independent dispute resolution for insurance complaints.
              </p>
            </>
          ),
        },
        {
          heading: 'How Professional Documentation Supports Your Claim',
          body: (
            <>
              <p>
                The quality of documentation you provide to your insurer directly affects
                their depreciation assessment. Thorough, professional documentation makes it
                harder for insurers to apply excessive depreciation. Through Disaster Recovery:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Pre-restoration photography:</strong> Your IICRC certified contractor
                  photographs all damage before any work begins, establishing the condition
                  of materials at the time of the event — not after deterioration from delayed
                  response.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Moisture mapping and daily reports:</strong> Detailed moisture
                  readings document the extent of water penetration, proving which materials
                  were genuinely affected versus which may have had pre-existing issues.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Scope of works with line items:</strong> A detailed scope ensures
                  your insurer can see exactly what was damaged, what needs replacing, and
                  why — reducing the opportunity for blanket depreciation.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly — the client, not the insurer. Work begins immediately
                without waiting for insurer approval, and full claims documentation is
                provided to support your reimbursement. After make-safe, your NRPG contractor
                provides a formal contract with terms and conditions for the full restoration
                scope. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                if needed.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Does insurance depreciation apply to all water damage claims in Australia?',
          answer:
            'It depends on your policy type. Replacement value (new for old) policies generally do not apply depreciation to building repairs — your insurer pays to replace damaged materials with new equivalents. Indemnity value policies pay the current market value, which factors in depreciation based on age and condition. Check your Product Disclosure Statement to confirm your cover type.',
        },
        {
          question: 'How much can depreciation reduce my water damage insurance payout?',
          answer:
            'Under an indemnity policy, depreciation can reduce payouts by 40% to 60% for older properties. For example, 10-year-old carpet depreciated at 10% per year could receive zero payout, leaving you to cover the full replacement cost. Even under replacement value policies, contents may still be subject to depreciation.',
        },
        {
          question: 'Can I dispute depreciation applied to my water damage claim?',
          answer:
            'Yes. Common grounds for dispute include depreciation applied incorrectly under a replacement value policy, excessive depreciation rates above industry standards, condition evidence being ignored, and betterment being applied when you are simply restoring to pre-loss condition. Lodge a complaint with AFCA if your insurer will not resolve the dispute.',
        },
        {
          question: 'What is betterment and how does it affect my water damage claim?',
          answer:
            'Betterment is when an insurer reduces your payout because the replacement is arguably better than the original. For example, replacing old carpet with new carpet. However, betterment should only apply when the replacement genuinely improves your position — simply restoring to pre-loss condition with current materials is not betterment.',
        },
        {
          question: 'How does professional documentation help reduce depreciation on my claim?',
          answer:
            'Thorough professional documentation — pre-restoration photography, moisture mapping, daily drying reports, and detailed scope of works — makes it harder for insurers to apply blanket depreciation. Through Disaster Recovery, your IICRC certified contractor provides full claims documentation from day one to support your reimbursement.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Should I Take a Cash Settlement or Restoration?',
          href: '/guides/insurance/should-i-take-a-payout',
          description: 'Understanding the pros and cons of cash settlements versus professional restoration.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Ensure your insurance claim is properly supported with evidence from day one.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description: 'How waiting for insurer approval leads to secondary damage and higher costs.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
