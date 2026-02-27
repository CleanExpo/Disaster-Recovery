import { Metadata } from 'next';
import { Factory } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Invoice Shock Epidemic | NSW Fair Trading',
  description: 'NSW Fair Trading reports 45+ complaints against single traders. ACCC investigating emergency pricing exploitation. Learn how to protect yourself from invoice shock tactics.',
  keywords: 'NSW Fair Trading contractor complaints, ACCC emergency pricing, invoice shock epidemic, hidden costs disaster recovery, consumer protection emergency services',
  openGraph: {
    title: 'Invoice Shock Crisis - NSW Fair Trading & ACCC Warnings',
    description: 'Government agencies warn of contractor exploitation. 45 complaints against single trader causing $52,957 consumer detriment.' },
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/industry-problems/invoice-shock-epidemic' },
};

export default function InvoiceShockEpidemicPage() {
  return (
    <AgGuidePageTemplate
      category="Industry Problems"
      title="Invoice Shock Epidemic - NSW Fair Trading Warns of Contractor Exploitation"
      subtitle="NSW Fair Trading reports 45+ complaints against single traders. ACCC investigating emergency pricing exploitation. Learn how to protect yourself from invoice shock tactics."
      gradient="linear-gradient(135deg, #1E293B 0%, #475569 100%)"
      icon={<Factory className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Industry Problems', href: '/guides/industry-problems' },
        { label: 'Invoice Shock Epidemic - NSW Fair Trading Warns...' },
      ]}
      sections={[
        {
          heading: 'What Is Invoice Shock and Why Is It So Common?',
          body: (
            <>
              <p>
                Invoice shock occurs when a property owner receives a final bill from a
                restoration contractor that is dramatically higher than expected — sometimes
                two, three, or even five times the verbal estimate given on-site. NSW Fair
                Trading has documented cases where single traders accumulated 45 or more
                complaints, with individual consumer detriment reaching $52,957 per case.
                The ACCC has also flagged emergency service pricing practices for investigation.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The root cause is the power imbalance inherent in emergency situations.
                When your property is flooding at midnight or smoke is still clearing after
                a kitchen fire, you are not in a position to comparison-shop. Unscrupulous
                operators exploit this urgency — quoting low over the phone to secure the
                job, then inflating the scope once on-site. Common tactics include charging
                for equipment that was never deployed, billing for &quot;overtime&quot; at inflated
                rates, adding services that were never discussed or authorised, and
                submitting invoices with vague line items that cannot be verified.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The problem is particularly acute in the restoration industry because the
                work involves specialised equipment (dehumidifiers, air movers, HEPA
                filtration) that most property owners cannot evaluate. When a contractor
                says you need six dehumidifiers running for ten days, most people have no
                basis to challenge that — even if three units for five days would have
                achieved the same result.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Protect Yourself from Invoice Shock',
          body: (
            <>
              <p>
                While you cannot always control when an emergency happens, you can take
                steps to protect yourself from exploitative billing:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Demand a written scope before authorising work:</strong> A
                  professional restorer should provide a written scope of make-safe works
                  before starting, clearly outlining what will be done and the associated
                  costs. Verbal estimates are not enough — insist on documentation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Understand the difference between make-safe and full restoration:</strong>{' '}
                  Make-safe is the emergency stabilisation — extraction, drying setup,
                  board-up, tarping. Full restoration is the rebuild. These should be quoted
                  and contracted separately. A contractor who tries to get you to sign a
                  full restoration contract at 2 am before assessing the damage is a red flag.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Check IICRC certification:</strong> IICRC certified contractors
                  follow evidence-based protocols with documented drying standards. This means
                  equipment usage and drying timelines are based on measurable moisture targets,
                  not arbitrary decisions that inflate the bill.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Request daily moisture reports:</strong> Professional drying includes
                  daily moisture monitoring with psychrometric calculations. These reports
                  prove when the structure has reached its dry standard — preventing unnecessary
                  extended equipment hire.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Know your consumer rights:</strong> Under Australian Consumer Law,
                  you have the right to a clear quote or estimate before work begins. NSW Fair
                  Trading and your state&apos;s consumer protection body can assist with
                  disputes. AFCA (Australian Financial Complaints Authority) handles insurance-
                  related disputes.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'The Transparent Pricing Alternative',
          body: (
            <>
              <p>
                Disaster Recovery was built specifically to address the trust deficit in the
                restoration industry. Our pricing structure is transparent from the outset:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Clear upfront commitment:</strong> The initial commitment is $2,750
                  ($550 platform fee plus $2,200 contractor credit for emergency make-safe
                  works). This is published, documented, and consistent — not a bait-and-switch
                  estimate.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Formal contract after make-safe:</strong> After the emergency is
                  stabilised, your NRPG contractor provides a formal contract with clear terms
                  and conditions for the full restoration scope. You review and approve the
                  scope before any additional work begins.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>IICRC certified contractors only:</strong> Every contractor in the
                  NRPG network must maintain current IICRC certification, carry minimum $20
                  million public liability insurance, and pass quality audits. This ensures
                  equipment usage and drying timelines are based on evidence, not bill padding.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Full documentation provided:</strong> We bill you directly — the
                  client, not the insurer. Full claims documentation is provided including
                  photos, moisture reports, equipment logs, and scope of works. This
                  transparency works in your favour with your insurer and eliminates the
                  opaque billing that enables invoice shock.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What to Do If You Have Experienced Invoice Shock',
          body: (
            <>
              <p>
                If you have already received an inflated invoice from a restoration contractor,
                you have several options:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Request an itemised breakdown:</strong> You are entitled to a
                  detailed breakdown of all charges, including equipment types, quantities,
                  hours of operation, and labour hours. Vague line items like &quot;drying
                  services — $8,500&quot; are not acceptable.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Get an independent assessment:</strong> An independent IICRC
                  certified assessor can review the scope of works and determine whether
                  the charges are reasonable for the damage documented.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge a complaint with Fair Trading:</strong> Each state has a
                  consumer protection body — NSW Fair Trading, Consumer Affairs Victoria,
                  the Office of Fair Trading (QLD), etc. These bodies can investigate and
                  mediate disputes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contact AFCA for insurance disputes:</strong> If the dispute
                  involves your insurer or a contractor appointed by your insurer, AFCA
                  (Australian Financial Complaints Authority) handles these complaints at
                  no cost to you.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If managing restoration costs is a concern, payment plans are available
                through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                for work completed through the Disaster Recovery platform.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is invoice shock in the restoration industry?',
          answer:
            'Invoice shock occurs when a property owner receives a final restoration bill dramatically higher than expected — sometimes 2 to 5 times the verbal estimate. It typically involves inflated equipment charges, unbilled scope additions, vague line items, and exploitation of the emergency situation. NSW Fair Trading has documented cases with consumer detriment exceeding $50,000 per incident.',
        },
        {
          question: 'How can I avoid invoice shock from a disaster restoration contractor?',
          answer:
            'Demand a written scope before authorising work, ensure make-safe and full restoration are quoted separately, check IICRC certification, request daily moisture reports, and know your consumer rights under Australian Consumer Law. Through Disaster Recovery, pricing is transparent — $2,750 initial commitment with a formal contract provided after make-safe.',
        },
        {
          question: 'What should I do if I receive an inflated restoration invoice?',
          answer:
            'Request an itemised breakdown of all charges, get an independent IICRC certified assessment, lodge a complaint with your state Fair Trading body, and contact AFCA if the dispute involves your insurer. You are entitled to a detailed explanation of every charge.',
        },
        {
          question: 'Why do some restoration companies inflate their invoices?',
          answer:
            'The power imbalance in emergency situations allows unscrupulous operators to exploit distressed property owners. Common tactics include low phone quotes that balloon on-site, billing for equipment never deployed, charging inflated overtime rates, and using vague line items that cannot be independently verified.',
        },
        {
          question: 'How does Disaster Recovery prevent invoice shock?',
          answer:
            'Disaster Recovery publishes clear upfront pricing ($2,750 initial commitment), requires IICRC certification for all contractors, provides a formal contract with terms and conditions after make-safe, and delivers full claims documentation. We bill you directly with complete transparency — no hidden charges, no scope creep without approval.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Real Emergency Response Costs Explained',
          href: '/guides/pricing/real-emergency-response-costs',
          description: 'A transparent breakdown of what emergency restoration actually costs in Australia.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description: 'How delays in starting restoration lead to secondary damage and escalating costs.',
        },
        {
          title: 'Why Hire an IICRC Certified Restorer?',
          href: '/guides/certifications/why-hire-iicrc-certified',
          description: 'How IICRC certification protects you from substandard work and inflated billing.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
