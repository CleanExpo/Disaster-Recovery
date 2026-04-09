import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Temporary Repairs After a Storm — What Your Insurance Covers',
  description: 'Practical guide to emergency temporary repairs after a storm — what counts as make-safe, what your insurer covers, how to document costs, and the duty to mitigate.',
  keywords: 'temporary repairs after storm, emergency storm repairs, make-safe storm damage, storm damage temporary repairs insurance, duty to mitigate insurance',
  alternates: {
    canonical: `${NAP.url}/guides/emergency/temporary-repairs-after-storm`,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does insurance cover temporary repairs after a storm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most home and contents insurance policies cover reasonable emergency temporary repair costs under the duty to mitigate clause. These costs are reimbursed as part of your claim. Keep all receipts and document all works with photographs before and after. Most policies reimburse emergency make-safe costs up to $1,000–$5,000 depending on the policy. Check your Product Disclosure Statement for your specific policy limit. Costs above the emergency repair limit can still be included in your main claim if they were reasonably necessary.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I hire any contractor for emergency repairs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can hire a licensed contractor for emergency temporary repairs. However, do not hire unlicensed contractors — if something goes wrong or the insurer questions the work, unlicensed contractors may void coverage for that element of the claim. For temporary tarping and boarding, a licensed builder or roofing contractor is appropriate. For tree removal from the structure, a licensed arborist. Request a tax invoice with the contractor\'s licence number for all works. Do not authorise permanent repairs without written insurer approval — only make-safe and temporary stabilisation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if the insurer disputes my temporary repair costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your insurer disputes your temporary repair costs, respond in writing with your receipts, before-and-after photographs, and a brief explanation of why each repair was necessary to prevent further damage. Under the General Insurance Code of Practice, insurers must handle claims fairly and in good faith. If the dispute is not resolved through the internal review process, you can escalate to AFCA at no cost. Document your insurer correspondence carefully — written records are essential if the dispute reaches AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do I have to make temporary repairs after a storm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complete emergency temporary repairs within 24–48 hours of storm clearance — that is, once it is safe to access the property. Delay beyond 72 hours significantly increases the risk of your insurer disputing causation, arguing that secondary damage (water ingress, structural movement, mould onset) occurred after the storm event rather than because of it. If you cannot arrange repairs within this window due to storm-related access or contractor availability, document why in writing and note the attempts you made to engage contractors.',
      },
    },
  ],
};

const lastReviewed = '2026-04-09';

export default function TemporaryRepairsAfterStormPage() {
  return (
    <>
      <Script
        id="temprepair-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="temprepair-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Temporary Repairs After a Storm — What Your Insurance Covers',
            dateModified: lastReviewed,
            author: { '@type': 'Organization', name: 'Disaster Recovery' },
          }),
        }}
      />
      <AgGuidePageTemplate
        category="Emergency"
        title="Temporary Repairs After a Storm — What Your Insurance Covers"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)"
        icon={<AlertTriangle className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Emergency', href: '/guides/emergency' },
          { label: 'Temporary Repairs After a Storm' },
        ]}
        sections={[
          {
            heading: 'What Counts as Emergency Temporary Repair',
            body: (
              <>
                <p>
                  After a storm, your first obligation as a property owner is to prevent
                  further damage. This is known as the duty to mitigate — it is written into
                  most home insurance policies and under Australian contract law. Reasonable
                  emergency temporary repairs are covered by your insurer as part of your
                  claim. Permanent repairs are not — not without prior written approval.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Understanding the distinction between temporary and permanent repairs is
                  critical. Temporary repairs stabilise the property and prevent further
                  loss. Permanent repairs restore the property to its pre-loss condition.
                  Your insurer covers the first. The second requires their authorisation.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  What counts as emergency temporary repair:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Roof tarping:</strong> Temporary tarping over compromised
                    sections of roof to prevent water ingress while a permanent repair is
                    assessed and approved. This is one of the most common and most
                    clearly covered emergency repair types.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Board-up of broken windows and doors:</strong> Plywood or
                    polycarbonate sheeting over broken glazing and damaged door frames
                    to secure the property against weather and unauthorised entry.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tree and branch removal from the structure:</strong> If a
                    tree or large branch has fallen onto the building, removal from the
                    structure (not full stump removal or clean-up of the garden) is a
                    covered emergency repair. Arborist costs for this work are
                    reimbursable.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Sandbag placement and waterproofing:</strong> If water
                    ingress is ongoing or likely — through a compromised subfloor,
                    damaged retaining structure, or affected drainage — temporary
                    sandbag placement or waterproofing membrane application is an
                    emergency repair.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Temporary structural propping:</strong> If a wall, beam,
                    or other structural element has been compromised, temporary propping
                    by a licensed builder to prevent collapse or further movement is an
                    emergency repair. This is particularly relevant after cyclone or
                    significant hail events.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  What does not count as emergency temporary repair:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Replacing damaged tiles, cladding, or guttering (permanent repair)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Re-plastering, painting, or finishing any surface (permanent repair)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Full tree removal including stump and garden clean-up (only removal
                    from structure is covered as emergency repair)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Replacing damaged fencing or outbuildings without insurer approval
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Your Duty to Mitigate — and What Your Insurer Covers',
            body: (
              <>
                <p>
                  The duty to mitigate requires you to take reasonable steps to prevent
                  further loss after a storm event. Most home and contents policies state
                  this expressly. Failing to mitigate — for example, leaving a large hole
                  in the roof for a week without arranging tarping — gives your insurer
                  grounds to argue that subsequent water damage was not caused by the storm
                  but by your failure to act.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The same duty protects you: if you arrange reasonable emergency repairs
                  promptly, your insurer is obliged to reimburse those costs as part of
                  the claim. The key word is &quot;reasonable&quot; — costs that are
                  proportionate to the damage and consistent with what a licensed contractor
                  would charge for emergency make-safe works.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Reimbursement limits:</strong> Most home insurance policies
                    include an emergency repair sub-limit of $1,000–$5,000. Check your
                    Product Disclosure Statement for your specific limit. Costs above
                    this sub-limit are not automatically excluded — they can be included
                    in your main building claim if they were reasonably necessary.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Receipt requirements:</strong> Every emergency repair cost
                    must be supported by a tax invoice from the contractor. The invoice
                    must include the contractor&apos;s business name, ABN, licence number,
                    a description of works performed, and the amount charged. Handwritten
                    receipts without ABN or licence numbers may be rejected.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photographic documentation:</strong> Photograph the damage
                    before any repair begins, and after the repair is complete. This
                    establishes both the pre-repair condition (evidence for the claim) and
                    the scope and quality of the temporary repair. These photos are
                    submitted with your repair invoices.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not authorise permanent repairs:</strong> Permanent repairs
                    made without insurer approval remove the insurer&apos;s ability to
                    assess the damage in its post-storm condition. This can reduce or
                    void coverage for those elements. Wait for written approval before
                    any permanent restoration begins.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not remove damaged materials:</strong> Keeping damaged
                    materials in place (broken tiles, displaced cladding, fractured timber)
                    preserves evidence for the assessor. Only remove materials as part of
                    the approved permanent restoration scope.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Step-by-Step: Temporary Repairs After a Storm',
            body: (
              <>
                <p>
                  Follow this sequence after a storm to protect your property, preserve your
                  claim evidence, and maximise reimbursement of emergency repair costs.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 1 — Safety first:</strong> Do not access the property
                    until storm clearance. If there is any risk of structural collapse,
                    live power lines down, gas leak, or flooding, call emergency services
                    before entering. Only proceed when safe.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 2 — Document everything before touching anything:</strong>{' '}
                    Walk the full property and photograph all damage from every angle.
                    Wide shots first, then close-ups. Photograph the roof from the ground
                    and, if a drone is available, from above. Do not move debris or
                    damaged materials. This is your pre-repair evidence record.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 3 — Notify your insurer immediately:</strong> Lodge
                    your claim or notify your insurer before or concurrent with arranging
                    temporary repairs. Most policies require prompt notification. If your
                    insurer has a 24-hour emergency line, use it. Tell them you are
                    arranging emergency make-safe and will provide receipts.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 4 — Engage licensed contractors for make-safe:</strong>{' '}
                    Contact a licensed builder or roofing contractor for tarping, a
                    licensed glazier for board-up, and a licensed arborist for tree
                    removal from structure. Request a tax invoice with ABN and licence
                    number. Complete temporary repairs within 24–48 hours of safe access.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 5 — Photograph after repairs:</strong> Once temporary
                    repairs are complete, photograph the finished make-safe works. This
                    documents what was done and allows the assessor to see both the
                    pre-repair damage and the temporary repair installed.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 6 — Request a full scope assessment:</strong> After
                    make-safe, engage an IICRC-certified contractor to conduct a full
                    scope of works assessment. This assessment becomes the basis of
                    your insurance claim and documents all storm damage including
                    secondary elements such as water ingress through compromised areas.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Step 7 — Submit all documentation to your insurer:</strong>{' '}
                    Provide your pre-repair photographs, all contractor invoices, your
                    post-repair photographs, and the full scope of works assessment
                    together with your claim. The more complete your submission, the
                    faster and smoother the claims process.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Through the Disaster Recovery platform, our IICRC-certified contractors
                  attend promptly after storm events and provide full documentation —
                  pre-works photographs, scope of works, and a completion report — giving
                  your insurer everything they need to process your claim efficiently.
                  We bill you directly so work begins immediately without waiting for
                  claim approval.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does insurance cover temporary repairs after a storm?',
            answer:
              'Yes. Most home and contents insurance policies cover reasonable emergency temporary repair costs under the duty to mitigate clause. These costs are reimbursed as part of your claim. Keep all receipts and document all works with photographs before and after. Most policies reimburse emergency make-safe costs up to $1,000–$5,000 depending on the policy. Check your Product Disclosure Statement for your specific policy limit. Costs above the emergency repair limit can still be included in your main claim if they were reasonably necessary.',
          },
          {
            question: 'Can I hire any contractor for emergency repairs?',
            answer:
              'You can hire a licensed contractor for emergency temporary repairs. However, do not hire unlicensed contractors — if something goes wrong or the insurer questions the work, unlicensed contractors may void coverage for that element of the claim. For temporary tarping and boarding, a licensed builder or roofing contractor is appropriate. For tree removal from the structure, a licensed arborist. Request a tax invoice with the contractor\'s licence number for all works. Do not authorise permanent repairs without written insurer approval — only make-safe and temporary stabilisation.',
          },
          {
            question: 'What if the insurer disputes my temporary repair costs?',
            answer:
              'If your insurer disputes your temporary repair costs, respond in writing with your receipts, before-and-after photographs, and a brief explanation of why each repair was necessary to prevent further damage. Under the General Insurance Code of Practice, insurers must handle claims fairly and in good faith. If the dispute is not resolved through the internal review process, you can escalate to AFCA at no cost. Document your insurer correspondence carefully — written records are essential if the dispute reaches AFCA.',
          },
          {
            question: 'How long do I have to make temporary repairs after a storm?',
            answer:
              'Complete emergency temporary repairs within 24–48 hours of storm clearance — that is, once it is safe to access the property. Delay beyond 72 hours significantly increases the risk of your insurer disputing causation, arguing that secondary damage (water ingress, structural movement, mould onset) occurred after the storm event rather than because of it. If you cannot arrange repairs within this window due to storm-related access or contractor availability, document why in writing and note the attempts you made to engage contractors.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Emergency Board-Up Storm Damage',
            href: '/guides/emergency/emergency-board-up-storm-damage',
            description: 'When and how to board up storm-damaged windows and doors to protect your property.',
          },
          {
            title: 'Emergency Roof Tarping',
            href: '/guides/services/emergency-roof-tarping-make-safe',
            description: 'How emergency roof tarping works and what it costs in Australia.',
          },
          {
            title: 'Document Storm Damage Insurance',
            href: '/guides/insurance/document-storm-damage-insurance',
            description: 'How to document storm damage and counter pre-existing damage disputes.',
          },
          {
            title: 'Storm Damage Cost Guide',
            href: '/guides/cost-guides/how-much-storm-damage-restoration-cost',
            description: 'What storm damage restoration costs in Australia — by damage type.',
          },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}
