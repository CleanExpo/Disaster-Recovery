import type { ContentSection } from '@/components/antigravity';

interface InsuranceSectionParams {
  insurerName: string;
  insurerSlug: string;
}

export function getInsuranceSections({ insurerName, insurerSlug }: InsuranceSectionParams): ContentSection[] {
  return [
    {
      heading: `${insurerName} Insurance Claims — How We Help`,
      body: (
        <>
          <p>
            When disaster strikes and you need to make a claim with {insurerName}, we make the
            process as smooth as possible. We understand {insurerName}&apos;s claims requirements,
            documentation standards, and scope-of-works procedures — so we can provide you with
            everything you need to submit a successful claim and get your life back to normal.
          </p>
          <p>
            Our relationship with {insurerName} means we understand their claims process, required
            documentation, and scope-of-works approval procedures. This experience translates to
            faster claim approvals, fewer delays, and a better outcome for you.
          </p>
          <p>
            We bill you directly — not your insurer. This means work begins immediately without
            waiting for insurer approval or scope-of-works sign-off. Once restoration is complete,
            we provide full documentation to support your {insurerName} claim for reimbursement.
            Payment plans are available through our finance partner,{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      ),
    },
    {
      heading: `The ${insurerName} Claims Process — Step by Step`,
      background: 'light',
      body: (
        <>
          <p>
            Filing a disaster recovery claim with {insurerName} follows a straightforward process
            when you have an approved provider managing it for you:
          </p>
          <ol>
            <li><strong>Contact us for emergency response</strong> — Call or submit an online form. We dispatch a local team immediately while simultaneously notifying {insurerName} of the incident.</li>
            <li><strong>On-site assessment and documentation</strong> — Our technician documents all damage with photos, moisture readings, and a detailed scope of works for {insurerName}&apos;s review.</li>
            <li><strong>Scope and costings documentation</strong> — We prepare a detailed scope of works and costings that meets {insurerName}&apos;s requirements, giving you everything you need for your reimbursement claim.</li>
            <li><strong>Professional restoration</strong> — Once approved, we begin restoration using certified technicians and industrial-grade equipment. We keep both you and {insurerName} updated throughout.</li>
            <li><strong>Completion and sign-off</strong> — We conduct a final inspection, provide completion documentation to {insurerName}, and hand your property back in pre-loss condition.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `What ${insurerName} Typically Covers`,
      body: (
        <>
          <p>
            While every {insurerName} policy differs, most home and commercial policies cover
            restoration for the following sudden, accidental events:
          </p>
          <ul>
            <li><strong>Water damage</strong> — Burst pipes, leaking appliances, roof leaks from storms, and accidental overflow.</li>
            <li><strong>Fire and smoke damage</strong> — Kitchen fires, electrical fires, bushfire ember attack, and associated smoke/soot damage.</li>
            <li><strong>Storm damage</strong> — Wind damage, hail damage, fallen trees, and rain water ingress.</li>
            <li><strong>Flood damage</strong> — Depending on your policy level and whether flood cover is included.</li>
            <li><strong>Impact damage</strong> — Vehicle impact, falling objects, and vandalism (with some policy variations).</li>
          </ul>
          <p>
            Common exclusions across most {insurerName} policies include gradual damage from lack
            of maintenance, pre-existing mould, wear and tear, and damage from unapproved
            renovations. If you are unsure about your coverage, our team can review your
            {insurerName} policy at no cost.
          </p>
        </>
      ),
    },
    {
      heading: 'How Billing & Payment Works',
      background: 'light',
      body: (
        <>
          <p>
            Understanding how billing works ensures there are no surprises. Our model is designed
            to get work started faster and keep you in control of the process:
          </p>
          <ul>
            <li><strong>We bill you directly</strong> — Our contractors invoice you (the property owner / policyholder / management group), not your insurer. This allows work to begin immediately.</li>
            <li><strong>You claim reimbursement from {insurerName}</strong> — We provide all documentation, photos, scope of works, and reports your insurer needs to process your claim.</li>
            <li><strong>Why this is better for you</strong> — No waiting for insurer approval before make-safe begins. No scope disputes delaying your restoration. You control the process.</li>
            <li><strong>Payment options available</strong> — Flexible payment terms through our finance partner <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a> for fast loan approvals.</li>
            <li><strong>Contract provided</strong> — After the make-safe is completed, your contractor provides a formal contract with clear terms and conditions.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${insurerName} Claims FAQ`,
      body: (
        <>
          <h3>How do I start a claim with {insurerName}?</h3>
          <p>
            Contact us first for emergency response. We will lodge the claim with {insurerName} on
            your behalf during the initial assessment. Alternatively, you can contact {insurerName}
            directly and nominate us as your preferred restoration provider.
          </p>
          <h3>How long does a {insurerName} claim take?</h3>
          <p>
            Scope approval typically takes 24–48 hours for straightforward claims. Complex or
            large-scale claims may take 3–5 business days. Restoration timelines depend on the type
            and severity of damage.
          </p>
          <h3>What documentation do I need for my {insurerName} claim?</h3>
          <p>
            We handle the documentation for you — including photos, moisture readings, scope of
            works, and progress reports. You will need your {insurerName} policy number and may
            need to sign an authority for us to act on your behalf.
          </p>
          <h3>Can I choose my own restorer with {insurerName}?</h3>
          <p>
            Yes. Under Australian consumer law, you have the right to choose your own restoration
            provider. As an approved provider, nominating us often results in faster approvals and
            a smoother process with {insurerName}.
          </p>
        </>
      ),
    },
  ];
}
