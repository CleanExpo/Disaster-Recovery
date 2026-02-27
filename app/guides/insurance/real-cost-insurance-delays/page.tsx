import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'The Real Cost of Insurance Delays - ASIC & ICA Data on Claims Crisis | Disaster Recovery',
  description: 'ASIC concerned about unresolved 2022 flood claims. ICA reports 78% of catastrophes Oct-April. Learn your Section 54 rights and how delays cost thousands in secondary damage.',
  keywords: 'insurance claim delays ASIC, ICA catastrophe report 2024, flood claims unresolved, AFCA complaints, Section 54 Insurance Contracts Act, Ex-Tropical Cyclone Jasper claims',
  openGraph: {
    title: 'Insurance Delays Crisis - ASIC & ICA Data Reveals System Failures',
    description: 'ASIC concerned about ongoing 2022 flood claims. One in 10 AFCA complaints about claims handling delays.',
    images: ['/images/insurance-delays-cost.jpg'] },
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/real-cost-insurance-delays' },
};

export default function RealCostInsuranceDelaysPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="The Real Cost of Insurance Delays - ASIC & ICA Data on Claims Crisis"
      subtitle="ASIC concerned about unresolved 2022 flood claims. ICA reports 78% of catastrophes Oct-April. Learn your Section 54 rights and how delays cost thousands in secondary damage."
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Shield className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'The Real Cost of Insurance Delays - ASIC & ICA ...' },
      ]}
      sections={[
        {
          heading: 'The Scale of the Delays Problem in Australia',
          body: (
            <>
              <p>
                Insurance delays are not a minor inconvenience — they are a systemic crisis
                costing Australian property owners millions in preventable secondary damage.
                ASIC has publicly expressed concern about the number of unresolved claims
                from the 2022 floods, with some policyholders still waiting years for
                resolution. The Insurance Council of Australia (ICA) reports that 78% of
                declared catastrophes occur between October and April — the same period when
                claim volumes overwhelm insurer capacity, creating a bottleneck that delays
                even straightforward claims.
              </p>
              <p style={{ marginTop: '1rem' }}>
                AFCA (Australian Financial Complaints Authority) data shows that one in ten
                complaints relates to claims handling delays. These are not complex disputes
                about policy interpretation — they are cases where insurers simply take too
                long to assess, approve, or pay claims. For property owners with active water,
                fire, or storm damage, every day of delay causes measurable additional harm.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The financial impact is devastating. A water damage claim that could have been
                resolved for $5,000 with same-day extraction and drying can escalate to
                $15,000 or more when delayed by two weeks — mould remediation, additional
                demolition, extended drying, and contents replacement all compound the original
                scope of works.
              </p>
            </>
          ),
        },
        {
          heading: 'How Delays Cause Secondary Damage',
          body: (
            <>
              <p>
                The science of water damage is unforgiving. Here is what happens to your
                property while you wait for insurer approval:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>24–48 hours:</strong> Mould spores begin germinating on damp organic
                  materials — plasterboard, timber, carpet backing, and furnishings. In
                  Australian summer conditions (high humidity, warm temperatures), mould
                  colonies can establish within 24 hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>48–72 hours:</strong> Timber subfloors and framing begin to swell.
                  Engineered flooring delaminates. Plasterboard loses structural integrity as
                  the gypsum core saturates. Metal fixings and electrical connections begin
                  corroding.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>1–2 weeks:</strong> Established mould colonies spread through wall
                  cavities and ceiling spaces. Structural timbers may require replacement
                  rather than drying. Contents that could have been restored are now beyond
                  salvage. Odour becomes embedded in porous materials.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>2+ weeks:</strong> The property may become uninhabitable due to
                  mould contamination and structural compromise. What started as a $5,000
                  extraction and dry has become a $20,000+ demolition, remediation, and
                  rebuild project.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Each of these stages represents damage that would not have occurred with
                timely intervention. This is preventable loss, caused entirely by waiting.
              </p>
            </>
          ),
        },
        {
          heading: 'Your Section 54 Rights',
          body: (
            <>
              <p>
                Section 54 of the Insurance Contracts Act 1984 (Cth) is one of the most
                important consumer protections in Australian insurance law. It prevents
                insurers from refusing a claim solely because the policyholder did not comply
                with a policy term — provided the non-compliance did not cause or contribute
                to the loss.
              </p>
              <p style={{ marginTop: '1rem' }}>
                In practical terms for disaster recovery, Section 54 protects your right to:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Appoint your own contractor:</strong> You are not obligated to use
                  your insurer&apos;s nominated restorer. You have the right to engage a
                  qualified contractor of your choosing.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Begin make-safe works before claim approval:</strong> Your duty to
                  mitigate (Section 56) actually requires you to take reasonable steps to
                  prevent further damage. Starting make-safe before your insurer responds is
                  not only permitted — it is expected.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Claim reimbursement for reasonable costs:</strong> Provided the costs
                  are reasonable and the work is related to an insured event, your make-safe
                  and restoration expenses are claimable regardless of whether your insurer
                  pre-approved them.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                These rights are why Disaster Recovery&apos;s billing model works in your
                favour. We bill you directly, so work begins immediately without waiting
                for insurer approval. You exercise your Section 54 and Section 56 rights
                simultaneously — starting make-safe while retaining full control over the
                contractor selection and process.
              </p>
            </>
          ),
        },
        {
          heading: 'The Solution: Act First, Claim Later',
          body: (
            <>
              <p>
                The most effective way to protect yourself from insurance delay damage is
                simple: do not wait. Start make-safe works immediately and claim
                reimbursement afterward. This approach:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Minimises secondary damage:</strong> Extraction and drying within
                  hours, not days, dramatically reduces the total scope of works.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Fulfils your duty to mitigate:</strong> You are meeting your legal
                  obligation under the Insurance Contracts Act, strengthening your claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Creates stronger documentation:</strong> Your contractor documents
                  the damage before deterioration, providing your insurer with clear evidence
                  of the insured event versus secondary damage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Reduces overall costs:</strong> A $2,750 make-safe performed on day
                  one can prevent $10,000+ in secondary damage — saving both you and your
                  insurer money.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Through Disaster Recovery, the initial commitment is $2,750 ($550 platform
                fee plus $2,200 contractor credit for make-safe works). After make-safe,
                your NRPG contractor provides a formal contract with terms and conditions
                for the full restoration scope. Full claims documentation is provided to
                support your insurance reimbursement. Payment plans are available through{' '}
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
          question: 'How much extra does insurance delay cost in secondary damage?',
          answer:
            'A water damage claim that costs $5,000 with same-day intervention can escalate to $15,000-$20,000 or more with a two-week delay. Mould growth, timber swelling, flooring delamination, and contents degradation all compound rapidly. Every day of delay increases the total restoration cost.',
        },
        {
          question: 'Do I have to wait for my insurer to approve restoration before starting work?',
          answer:
            'No. Under the Insurance Contracts Act 1984, you have a duty to mitigate (Section 56) — meaning you should take reasonable steps to prevent further damage. Through Disaster Recovery, we bill you directly so work begins immediately. Full claims documentation is provided to support your reimbursement.',
        },
        {
          question: 'What is Section 54 and how does it protect me?',
          answer:
            'Section 54 of the Insurance Contracts Act 1984 prevents insurers from refusing a claim solely due to non-compliance with a policy term, provided the non-compliance did not cause the loss. In practice, this protects your right to choose your own contractor, begin make-safe before claim approval, and claim reimbursement for reasonable costs.',
        },
        {
          question: 'How quickly does mould grow after water damage in Australia?',
          answer:
            'In Australian conditions — particularly during the warmer months with high humidity — mould spores can begin germinating within 24 hours on damp organic materials. Established colonies can form within 48 to 72 hours. This is why same-day extraction and drying equipment deployment is critical.',
        },
        {
          question: 'What documentation do I need to support my insurance claim after starting work early?',
          answer:
            'You need pre-restoration photographs, moisture readings, a written scope of works, equipment logs, and daily monitoring reports. Through Disaster Recovery, your IICRC certified contractor provides all of this documentation as standard. This evidence demonstrates the damage was from the insured event, the response was reasonable, and the costs are justified.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Section 54 — Your Right to Choose Your Own Contractor',
          href: '/guides/insurance/section-54-contractor-rights',
          description: 'Your legal right to appoint your own restoration contractor under the Insurance Contracts Act.',
        },
        {
          title: 'Make Safe Services: What Insurance Covers',
          href: '/guides/insurance/make-safe-insurance-coverage',
          description: 'What make-safe includes and what your insurer is obliged to cover.',
        },
        {
          title: 'Invoice Shock Epidemic',
          href: '/guides/industry-problems/invoice-shock-epidemic',
          description: 'How to protect yourself from inflated restoration invoices and pricing exploitation.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
