import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Does Home Insurance Cover Mould Removal in Australia?',
  description: 'When does home insurance cover mould? Understand the causal chain from covered event to mould, how to dispute insurer denials, and landlord insurance coverage for mould.',
  keywords: 'mould insurance coverage, does insurance cover mould Australia, mould insurance claim, mould removal insurance, landlord insurance mould',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/mould-insurance-coverage' },
};

export default function MouldInsuranceCoveragePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does home insurance cover mould removal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Home insurance covers mould removal only when the mould has arisen directly from a covered event — such as a storm, cyclone, burst pipe, or other sudden and accidental water damage. Gradual mould, endemic mould, or mould arising from condensation, poor ventilation, or long-term moisture buildup is excluded from almost all standard home and contents policies under the gradual deterioration exclusion. To claim for mould, you must be able to demonstrate the causal chain: covered event → water damage → mould (within a reasonable timeframe).',
        },
      },
      {
        '@type': 'Question',
        name: 'What if the insurer says my mould is pre-existing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your insurer bears the burden of proving that a mould exclusion applies. Counter the "pre-existing" argument with: timestamped photos or inspection reports from before the triggering event showing no mould; an IICRC-certified mould assessment documenting the likely cause and timeline; and a certified drying log if the original water damage was restored by an IICRC contractor. If the dispute is unresolved through Internal Dispute Resolution, escalate to AFCA — mould claims are a common AFCA category and outcomes favour policyholders who can document the causal chain.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does landlord insurance cover mould in a rental property?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Landlord insurance may cover mould remediation if the mould was caused by a covered event such as a storm or burst pipe. Gradual mould arising from maintenance failures or tenant behaviour is generally excluded. In Queensland, New South Wales, and Victoria, Residential Tenancies legislation places an obligation on landlords to remediate mould — whether or not insurance covers it. If your landlord insurance covers the triggering water damage event, the resulting mould remediation is typically also claimable, provided the causal chain is documented.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prove mould was caused by a storm event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To prove mould was caused by a storm event, you need to establish: (1) the storm event occurred on a specific date — document with Bureau of Meteorology data and timestamped photos; (2) water entered the property as a result — document water ingress, roof damage, or building envelope failure; (3) drying was either not completed or not completed to standard — document with a psychrometric drying log (or note its absence if you are disputing a closed claim); (4) mould appeared within a timeframe consistent with the water damage — IICRC guidelines indicate mould can establish within 24–48 hours in tropical climates. An IICRC-certified mould assessment documenting these four elements is the strongest evidence for an insurer or AFCA dispute.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="mouldinsclaim-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="Does Home Insurance Cover Mould?"
        subtitle="When insurance covers mould removal — and how to prove it"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Mould Insurance Coverage' },
        ]}
        sections={[
          {
            heading: 'When Does Insurance Cover Mould?',
            body: (
              <>
                <p>
                  Mould is only covered by home insurance when it arises directly from a covered
                  event. Gradual mould, endemic mould, and mould arising from condensation or poor
                  ventilation are excluded from almost all standard Australian home and contents
                  policies under the gradual deterioration exclusion.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Covered: mould from a sudden water damage event.</strong> If a burst
                    pipe, storm, cyclone, or roof failure caused water to enter the property and
                    mould subsequently developed, the mould remediation is typically claimable as
                    part of the water damage claim. The triggering event must be covered under your
                    policy.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Not covered: gradual or pre-existing mould.</strong> Mould arising
                    from long-term moisture, poor ventilation, or maintenance neglect is excluded
                    under the gradual deterioration clause in most standard policies. This includes
                    bathroom mould, condensation mould, and mould in unventilated roof cavities.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>The 48-hour rule in tropical and subtropical climates:</strong> In
                    Queensland, Northern Territory, and northern WA, mould can establish within
                    48 hours of a water event. Document and lodge as soon as mould is discovered —
                    delaying can give insurers grounds to argue the mould is not contemporaneous
                    with the claimed event.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Rental properties — additional obligations:</strong> Landlords in
                    Queensland, New South Wales, and Victoria have an obligation under Residential
                    Tenancies legislation to remediate mould regardless of insurance outcome.
                    Landlord insurance may cover event-caused mould; check your PDS and engage
                    a certified contractor to document the cause.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Always check your Product Disclosure Statement for the specific mould and
                  gradual deterioration clauses in your policy before lodging.
                </p>
              </>
            ),
          },
          {
            heading: 'Proving the Causal Chain — Event to Mould',
            body: (
              <>
                <p>
                  The critical requirement for a mould insurance claim is establishing the causal
                  chain: covered event → water damage → mould. Without documentation of each link,
                  your insurer will dispute coverage. This is where most mould claims fail —
                  not because coverage is absent, but because the chain cannot be proven.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Link 1 — The covered event:</strong> Document the event date and
                    nature with Bureau of Meteorology data (for storms and cyclones), plumber&apos;s
                    report (for burst pipes), or building inspection report (for roof or structural
                    failure). Timestamped photos of damage correlating with the event strengthen
                    this link.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Link 2 — Water damage from that event:</strong> Show that water
                    entered the property as a direct result of the covered event. Photos of water
                    entry points, water lines, and saturated materials at the time of the event
                    are the primary evidence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Link 3 — Mould from that water damage:</strong> An IICRC-certified
                    mould assessment documenting the species, location, and likely cause of the
                    mould — with reference to the documented water event — closes this link. A
                    psychrometric drying log from the original restoration (if one was completed)
                    shows whether drying reached target moisture content.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>The absent drying log problem:</strong> If no drying log exists from
                    the original restoration (because non-certified tradespeople performed the
                    work), insurers will argue that the mould arose from incomplete drying that
                    was the homeowner&apos;s responsibility — not from the original event. An
                    independent IICRC-certified assessment can still support your claim, but
                    the case is harder to make without contemporaneous records.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Disputing Mould Claim Denials',
            body: (
              <>
                <p>
                  Mould claims are among the most frequently denied and disputed categories in
                  Australian home insurance. Insurers use several standard tactics to avoid
                  coverage — knowing them in advance lets you prepare your counter.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tactic: &quot;pre-existing mould&quot;:</strong> Insurers may claim
                    the mould existed before the covered event. Counter with pre-event inspection
                    records, real estate photographs, or a pre-purchase building inspection showing
                    no mould. Your insurer bears the burden of proving the pre-existing exclusion
                    applies.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tactic: &quot;gradual deterioration&quot;:</strong> If there is any
                    gap between the water event and when mould was discovered, insurers may argue
                    it developed gradually. An IICRC-certified assessment documenting the typical
                    growth timeline for the mould species and conditions (particularly in tropical
                    climates) is the most effective counter.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Tactic: &quot;failure to mitigate&quot;:</strong> Insurers may argue
                    the homeowner failed to take reasonable steps to prevent mould after the water
                    event. Counter by documenting the steps taken immediately after the event —
                    extraction, drying equipment deployed, claims lodged promptly — or by
                    demonstrating that mitigation was not possible (e.g., inaccessible roof
                    cavity).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA mould disputes:</strong> Mould claim denials are a common AFCA
                    category. Lodge with AFCA within 2 years of the claim decision if Internal
                    Dispute Resolution is unsuccessful. Policyholders who provide IICRC-certified
                    causal chain documentation have significantly stronger outcomes. AFCA is free
                    and its determinations are binding on insurers.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  IICRC-certified documentation may support your claim at insurer and AFCA level,
                  though outcomes cannot be guaranteed.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does home insurance cover mould removal?',
            answer:
              'Home insurance covers mould removal only when the mould has arisen directly from a covered event — such as a storm, cyclone, burst pipe, or other sudden and accidental water damage. Gradual mould, endemic mould, or mould arising from condensation, poor ventilation, or long-term moisture buildup is excluded from almost all standard home and contents policies under the gradual deterioration exclusion. To claim for mould, you must be able to demonstrate the causal chain: covered event → water damage → mould (within a reasonable timeframe).',
          },
          {
            question: 'What if the insurer says my mould is pre-existing?',
            answer:
              'Your insurer bears the burden of proving that a mould exclusion applies. Counter the "pre-existing" argument with: timestamped photos or inspection reports from before the triggering event showing no mould; an IICRC-certified mould assessment documenting the likely cause and timeline; and a certified drying log if the original water damage was restored by an IICRC contractor. If the dispute is unresolved through Internal Dispute Resolution, escalate to AFCA — mould claims are a common AFCA category and outcomes favour policyholders who can document the causal chain.',
          },
          {
            question: 'Does landlord insurance cover mould in a rental property?',
            answer:
              'Landlord insurance may cover mould remediation if the mould was caused by a covered event such as a storm or burst pipe. Gradual mould arising from maintenance failures or tenant behaviour is generally excluded. In Queensland, New South Wales, and Victoria, Residential Tenancies legislation places an obligation on landlords to remediate mould — whether or not insurance covers it. If your landlord insurance covers the triggering water damage event, the resulting mould remediation is typically also claimable, provided the causal chain is documented.',
          },
          {
            question: 'How do I prove mould was caused by a storm event?',
            answer:
              'To prove mould was caused by a storm event, you need to establish: (1) the storm event occurred on a specific date — document with Bureau of Meteorology data and timestamped photos; (2) water entered the property as a result — document water ingress, roof damage, or building envelope failure; (3) drying was either not completed or not completed to standard — document with a psychrometric drying log (or note its absence if you are disputing a closed claim); (4) mould appeared within a timeframe consistent with the water damage — IICRC guidelines indicate mould can establish within 24–48 hours in tropical climates. An IICRC-certified mould assessment documenting these four elements is the strongest evidence for an insurer or AFCA dispute.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Mould Removal Insurance Coverage',
            href: '/guides/insurance-guides/mould-removal-insurance-coverage',
            description: 'Detailed guide to when mould removal is and is not covered by insurance.',
          },
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'How to photograph and document water damage to support your claim.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
          {
            title: 'Water Damage Claim Process',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'The full water damage insurance claim process from lodgement to sign-off.',
          },
        ]}
        cta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
      />
    </>
  );
}
