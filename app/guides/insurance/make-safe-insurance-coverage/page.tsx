import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Make Safe Services: What Insurance Covers',
  description: 'What make-safe works include, your duty to mitigate, and what insurers are obliged to cover. Understand your rights before lodging a claim.',
  keywords: 'make safe insurance coverage, duty to mitigate insurance, emergency make safe works, what insurance covers make safe, insurance obligations Australia',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/make-safe-insurance-coverage' },
};

export default function MakeSafeInsuranceCoveragePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="Make Safe Services: What Insurance Covers"
      subtitle="Make-safe is the emergency stabilisation that prevents further damage to your property. Understanding what make-safe includes, your legal duty to mitigate, and what your insurer is obliged to cover puts you in control of the process."
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Make Safe Services: What Insurance Covers' },
      ]}
      sections={[
        {
          heading: 'What Make-Safe Works Include',
          body: (
            <>
              <p>
                Make-safe is the initial emergency response that stabilises your property and
                prevents further damage. It is not the full restoration — it is the critical
                first phase that stops the situation from getting worse. Depending on the type
                of incident, make-safe can include:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water damage make-safe:</strong> Emergency water extraction,
                  deployment of commercial-grade dehumidifiers and air movers, antimicrobial
                  treatment to prevent mould growth, furniture elevation, and initial moisture
                  mapping of affected areas.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Fire damage make-safe:</strong> Emergency board-up of broken windows
                  and damaged openings, temporary weather protection, securing the property
                  against unauthorised access, and initial ventilation to clear smoke and soot.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Storm damage make-safe:</strong> Emergency tarping of damaged roofs,
                  board-up of broken windows, removal of immediate hazards (hanging branches,
                  loose debris), and temporary weatherproofing to prevent ongoing water ingress.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Biohazard make-safe:</strong> Containment of contaminated areas, PPE
                  protocols, initial decontamination, and securing the area to prevent exposure.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                In every case, make-safe includes comprehensive photographic documentation,
                written assessment of the damage, and a detailed record of all works performed.
                This documentation is essential for your insurance claim.
              </p>
            </>
          ),
        },
        {
          heading: 'Your Duty to Mitigate: Why Make-Safe Is Not Optional',
          body: (
            <>
              <p>
                Under Section 56 of the Insurance Contracts Act 1984 (Cth), policyholders
                have a legal duty to take reasonable steps to prevent or minimise loss after
                an insured event. This is commonly known as the &quot;duty to mitigate.&quot; In
                practice, this means:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  If a pipe bursts, you should turn off the water mains and arrange extraction —
                  not leave the water running while you wait for your insurer to respond.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  If a storm damages your roof, you should arrange emergency tarping — not
                  allow rain to continue entering the property for days while a claim is
                  assessed.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  If fire damages a window or wall, you should arrange boarding — not leave the
                  property open to the weather and potential intruders.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Failure to mitigate can result in your insurer reducing your claim payout or
                declining coverage for secondary damage. The key phrase is &quot;reasonable
                steps&quot; — you are not expected to perform the work yourself, but you are
                expected to arrange professional make-safe in a timely manner.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This is precisely why Disaster Recovery exists. We bill you directly so work
                begins immediately without waiting for insurer approval. Your duty to mitigate
                is fulfilled the moment you lodge your claim and your contractor begins
                make-safe works.
              </p>
            </>
          ),
        },
        {
          heading: 'What Your Insurer Is Obliged to Cover',
          body: (
            <>
              <p>
                Under most Australian home and contents insurance policies, make-safe works
                that are reasonable, necessary, and related to an insured event are claimable
                expenses. This typically includes:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Emergency extraction and drying:</strong> Water removal and deployment
                  of drying equipment to prevent mould and structural damage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Board-up and tarping:</strong> Temporary protection of the property
                  after storm, fire, or break-in damage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Hazard removal:</strong> Clearing immediate dangers like fallen trees,
                  broken glass, or contaminated materials.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Temporary accommodation:</strong> If the property is uninhabitable,
                  many policies cover reasonable accommodation costs.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                However, insurers may dispute make-safe costs that they consider excessive or
                unnecessary. This is where professional documentation becomes critical —
                thorough before-and-after photographs, moisture readings, and written scope of
                works demonstrate that every action taken was reasonable and necessary. Your
                NRPG contractor provides this full claims documentation to support your
                reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'How Make-Safe Works Through Disaster Recovery',
          body: (
            <>
              <p>
                Through Disaster Recovery, the make-safe process follows a structured,
                documented procedure:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 1 — Lodge your claim:</strong> Submit your damage details and
                  photos at disasterrecovery.com.au/claim. The platform operates 24/7.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 2 — Contractor matching:</strong> You are matched with an IICRC
                  certified contractor in your area. Work begins immediately without waiting
                  for insurer approval because we bill you directly.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 3 — Emergency make-safe:</strong> Your contractor performs all
                  necessary stabilisation works, documents everything, and deploys equipment
                  as required.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 4 — Formal contract:</strong> After make-safe is complete, your
                  NRPG contractor provides a formal contract with clear terms and conditions
                  for the full restoration scope.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The initial commitment is $2,750 ($550 platform fee plus $2,200 contractor
                credit for make-safe works). Full claims documentation is provided to support
                your insurance reimbursement. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage costs while awaiting your insurance outcome.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is included in make-safe works for water damage?',
          answer:
            'Water damage make-safe includes emergency water extraction, deployment of commercial dehumidifiers and air movers, antimicrobial treatment to prevent mould, furniture elevation, initial moisture mapping, and comprehensive photographic documentation. This stabilises the property and prevents secondary damage while the full restoration scope is assessed.',
        },
        {
          question: 'Am I legally required to arrange make-safe before my insurer approves my claim?',
          answer:
            'Yes. Under Section 56 of the Insurance Contracts Act 1984, you have a duty to take reasonable steps to prevent or minimise further loss. Delaying make-safe while waiting for insurer approval can result in reduced payouts or declined coverage for secondary damage. Through Disaster Recovery, we bill you directly so work begins immediately.',
        },
        {
          question: 'Does insurance cover the cost of make-safe works?',
          answer:
            'Most Australian home and contents policies cover make-safe works that are reasonable, necessary, and related to an insured event. This typically includes emergency extraction, drying, board-up, tarping, and hazard removal. Your contractor provides full claims documentation to support your reimbursement.',
        },
        {
          question: 'What happens after make-safe is complete?',
          answer:
            'After make-safe, your NRPG contractor provides a formal contract with clear terms and conditions for the full restoration scope. You review and approve the scope before additional work begins. The make-safe documentation — photos, moisture reports, and initial assessment — forms the basis of your insurance claim.',
        },
        {
          question: 'How much does make-safe cost through Disaster Recovery?',
          answer:
            'The initial commitment is $2,750, comprising a $550 platform fee and $2,200 contractor credit applied to emergency make-safe works. This covers claim lodgement, contractor matching, emergency stabilisation, and full documentation. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Section 54 — Your Right to Choose Your Own Contractor',
          href: '/guides/insurance/section-54-contractor-rights',
          description: 'Your legal right to appoint your own restoration contractor under the Insurance Contracts Act.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description: 'How waiting for insurer approval causes secondary damage and escalating costs.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Professional documentation practices that strengthen your insurance claim.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
