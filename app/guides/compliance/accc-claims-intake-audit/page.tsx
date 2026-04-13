import { Metadata } from 'next';
import Script from 'next/script';
import { ShieldCheck } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'ACCC Dark Patterns in Insurance Claims: Your Rights Explained',
  description:
    'What dark patterns are in insurance and claims platforms, how the ACCC is targeting unfair digital practices under ACL, and what protections apply to disaster-affected consumers in Australia.',
  keywords:
    'ACCC dark patterns insurance, unfair trading practices ACL, section 28B ACL, ACL section 18 misleading conduct, insurance claim dark patterns Australia, ACCC 2026 enforcement',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/compliance/accc-claims-intake-audit',
  },
};

export default function ACCCClaimsIntakeAuditPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I report a dark pattern used by an insurance or claims platform to the ACCC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The ACCC accepts reports of misleading or deceptive conduct and unfair practices at accc.gov.au. You can report a specific platform, describe the conduct you experienced, and the ACCC may use the information to inform enforcement priorities. If your concern relates to the conduct of an insurer specifically \u2014 including how your claim was handled \u2014 AFCA (the Australian Financial Complaints Authority) is the relevant external dispute resolution body, accessible at afca.org.au.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a dark pattern and normal sales persuasion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Australian consumer law does not prohibit persuasion \u2014 it prohibits misleading or deceptive conduct and (where proposed legislation passes) unfair trading practices. A company can lawfully highlight the benefits of its service, promote urgency where that urgency is genuine, and design interfaces that draw attention to particular options. What it cannot do is create a false impression, use interface design to trick consumers into choices they would not otherwise make, or exploit the vulnerability of consumers under stress. The test under ACL s18 is whether the overall conduct is misleading or likely to mislead \u2014 not whether any individual element is technically true.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the Privacy Act protect me against pre-ticked consent boxes on claims forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Australian Privacy Principle 3 (APP 3) requires that an organisation collecting sensitive information \u2014 which includes insurance claim details and financial information \u2014 must do so with the individual\u2019s consent, and that consent must be voluntary and informed. A pre-ticked checkbox does not constitute voluntary, informed consent under APP 3. If you believe a platform collected or disclosed your personal information without valid consent, you can lodge a complaint with the OAIC.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I check before submitting a claim through an online restoration or claims platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Before submitting a claim or engaging a claims referral service online, verify the following: (1) Is the total price \u2014 including any platform or facilitation fee \u2014 disclosed before you enter your personal details? (2) Are all consent checkboxes unchecked by default? (3) Is the platform\u2019s role clearly described \u2014 are they matching you with a contractor, managing your claim, or acting as your advocate? (4) Is there a clear privacy collection notice identifying who collects your information and how to access it? (5) Are there any ongoing fee commitments or subscription arrangements being created by this submission? If any of these are unclear, do not submit until you have a satisfactory answer.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="acccaudit-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Compliance"
      title="Dark Patterns in Insurance Claims"
      subtitle="What the ACCC is targeting, your rights under ACL, and how to identify unfair practices in claims platforms"
      gradient="linear-gradient(135deg, #1A3A2F 0%, #166534 100%)"
      icon={<ShieldCheck className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Compliance', href: '/guides/compliance' },
        { label: 'ACCC Dark Patterns in Claims' },
      ]}
      sections={[
        {
          heading: 'What Are Dark Patterns in Insurance Claims?',
          body: (
            <>
              <p>
                A dark pattern is a user interface or sales technique deliberately designed to
                lead consumers toward choices they would not otherwise make — or to obscure
                options they have a right to know about. The term originated in technology
                research but has become central to how Australian regulators now scrutinise
                digital services, including insurance and claims platforms.
              </p>
              <p style={{ marginTop: '1rem' }}>
                In the insurance and property claims context, dark patterns typically appear as:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Hidden fee disclosure:</strong> A service is advertised at one price
                  but additional charges appear only at the final stage of an online form — after
                  the consumer has invested time and personal information.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Manufactured urgency:</strong> Countdown timers or &ldquo;only 2 spots
                  left&rdquo; messages on claim or service booking pages create artificial
                  pressure, causing distressed consumers to forgo careful review of terms.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Pre-selected consent:</strong> Marketing opt-ins or third-party data
                  sharing authorisations arrive pre-ticked, so the consumer shares data they
                  did not affirmatively choose to share.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Confirmshaming:</strong> The &ldquo;decline&rdquo; option on a prompt
                  is phrased to make the consumer feel foolish or reckless for declining —
                  for example, &ldquo;No thanks, I don&apos;t want help protecting my family.&rdquo;
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Obscured cancellation:</strong> Ongoing commitments are signed up for
                  through a claims or referral form, but the process to cancel or withdraw is
                  buried, difficult to find, or requires significant effort.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Bait-and-switch pricing:</strong> The service described during the intake
                  process differs materially from what is ultimately delivered — a different
                  contractor, scope, or price to the one discussed at sign-up.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The ACCC has identified that these techniques are particularly harmful when
                applied to consumers who are already under stress — including homeowners dealing
                with the immediate aftermath of a flood, fire, or storm.
              </p>
            </>
          ),
        },
        {
          heading: "ACCC's 2026 Enforcement Focus",
          body: (
            <>
              <p>
                The Australian Competition and Consumer Commission publishes annual enforcement
                and compliance priorities. For 2026–27, the ACCC has identified two areas
                directly relevant to insurance and claims platforms:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Vulnerable consumer harm in digital markets:</strong> The ACCC has
                  specifically flagged concern about digital services that exploit consumers
                  during periods of vulnerability — including financial stress, health events,
                  and natural disasters. Claim intake platforms that use urgency, hidden fees,
                  or manipulative consent flows during or after a disaster event fall squarely
                  within this priority.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Subscription traps and forced continuity:</strong> Any platform that
                  enrolls consumers in recurring charges or ongoing service agreements through
                  a claims or emergency intake process — without clear, upfront disclosure —
                  is a current ACCC enforcement target.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The ACCC&apos;s enforcement posture reflects a broader regulatory shift: conduct
                that might previously have been treated as a civil dispute between a business
                and a consumer is increasingly attracting ACCC investigation and, where
                appropriate, court proceedings with civil penalty exposure.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Businesses operating claims, referral, or lead-generation platforms in the
                insurance and restoration space should assume that the ACCC is actively reviewing
                the digital consumer experience these platforms deliver — not just the underlying
                service.
              </p>
            </>
          ),
        },
        {
          heading: 'Six Common Dark Patterns in Claims Platforms',
          body: (
            <>
              <p>
                The following patterns have been observed across insurance referral, claims
                lodgement, and property restoration platforms operating in Australia. This list
                draws on ACCC guidance, published academic research into dark UX, and consumer
                complaints documented by AFCA.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>1. Drip pricing on platform or &ldquo;facilitation&rdquo; fees:</strong>{' '}
                  A restoration or claims referral service advertises no upfront cost or a low
                  &ldquo;free assessment&rdquo; at the entry point. A platform fee — sometimes
                  several hundred to several thousand dollars — is introduced only after the
                  consumer has entered all their personal, insurance, and property information
                  and is presented with a final submission page. Under ACL s29, the full price
                  must be disclosed at the earliest reasonable opportunity.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>2. False urgency in disaster contexts:</strong> Countdown timers,
                  &ldquo;act now before your claim window closes&rdquo; banners, or
                  &ldquo;only 3 contractors available in your area&rdquo; claims on emergency
                  intake forms create artificial pressure. Disaster-affected consumers are
                  already under acute time pressure from real constraints (drying windows,
                  insurer reporting obligations) — manufacturing additional urgency exploits
                  that pressure.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>3. Pre-ticked insurance data sharing authorisations:</strong> Some
                  platforms pre-select a checkbox authorising them to act as the consumer&apos;s
                  claims advocate, to communicate with the insurer on their behalf, or to share
                  their claim data with third parties. Under APP 3 (Privacy Act 1988), collection
                  of sensitive information including insurance details requires informed,
                  voluntary consent. Pre-ticked boxes do not constitute informed, voluntary
                  consent.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>4. Obscured ongoing fee commitments:</strong> A &ldquo;claims
                  management&rdquo; or &ldquo;advocate&rdquo; service signed up through a
                  disaster intake form may include an ongoing fee tied to the claim settlement
                  amount or a recurring monthly subscription. If this commitment is buried in
                  extended terms rather than prominently disclosed in the intake flow, the ACCC
                  treats this as an unfair practice under the ACL.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>5. Misleading representations about claim outcomes:</strong> Platforms
                  that represent — directly or by strong implication — that using their service
                  will result in a higher insurance payout, faster claim settlement, or a
                  specific outcome are making representations about the future. Under ACL s4,
                  representations about future matters carry a specific evidential burden. Phrases
                  like &ldquo;we get you the maximum payout&rdquo; or &ldquo;guaranteed settlement
                  within 30 days&rdquo; without a reasonable basis are misleading conduct.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>6. Bait-and-switch contractor allocation:</strong> A consumer is told
                  during intake that they will be matched with a specific type of certified
                  contractor, but the contractor actually assigned does not meet the described
                  qualifications, or the service described at intake (emergency make-safe,
                  specialist equipment) is materially different from what the contractor delivers.
                  This pattern is a form of misleading conduct and, where it involves a false
                  representation about certifications, may also breach ACL s29(1)(b).
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Your Rights Under ACL Sections 18 and 29',
          body: (
            <>
              <p>
                The Australian Consumer Law (ACL), which operates as Schedule 2 to the
                Competition and Consumer Act 2010, provides two key protections against dark
                patterns and misleading conduct in claims and services platforms.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Section 18 — Misleading or Deceptive Conduct:</strong> Section 18
                prohibits any person engaging in trade or commerce from engaging in conduct
                that is misleading or deceptive, or likely to mislead or deceive. This is a
                broad prohibition: it covers not only false statements but also conduct that
                creates a false impression — including user interface design that leads a
                consumer to believe they are agreeing to one thing when they are agreeing to
                another. Section 18 does not require proof of intent; if the overall impression
                created by a platform is misleading, the conduct contravenes the ACL.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Section 29 — False or Misleading Representations:</strong> Section 29
                prohibits specific categories of false representation in connection with the
                supply of goods or services. For claims platforms, the most relevant categories
                are:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  s29(1)(a): False representation about the standard, quality, value, grade,
                  composition, style, or model of services — for example, falsely representing
                  that assigned contractors hold IICRC certification.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  s29(1)(i): False representation about the price of services — including drip
                  pricing where fees are not disclosed upfront.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  s29(1)(m): False or misleading representation in connection with the promotion
                  of the supply of services — including testimonials, case studies, or outcome
                  claims used to market a claims platform that are not substantiated.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Contraventions of s29 carry civil penalties for corporations. If you believe
                a platform has breached s18 or s29 in connection with your claim, you can
                report the conduct to the ACCC at accc.gov.au and seek to recover loss through
                the courts or via AFCA if the conduct is connected to an insurance product.
              </p>
            </>
          ),
        },
        {
          heading: 'The Proposed Section 28B Unfair Trading Practices Law',
          body: (
            <>
              <p>
                Australia does not yet have a general prohibition on unfair trading practices
                equivalent to those in UK and EU consumer law — but that is expected to change.
                The federal government has been consulting on introducing a new section 28B into
                the ACL that would prohibit &ldquo;unfair trading practices&rdquo; as a
                standalone category, separate from the existing misleading or deceptive conduct
                framework.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The proposed s28B prohibition is expected to capture practices that are
                commercially aggressive or exploitative without necessarily being technically
                misleading — including:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Exploiting consumer vulnerability:</strong> Targeting practices at
                  consumers who are in a state of distress, urgency, or reduced capacity for
                  rational decision-making — including disaster-affected homeowners immediately
                  after an event.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Psychological pressure tactics:</strong> Using dark patterns — including
                  manufactured urgency, confirmshaming, and interface design that steers consumers
                  toward choices against their interests — as a standalone unfair practice, not
                  just as evidence of misleading conduct.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Drip pricing as an unfair practice:</strong> The proposed law is
                  expected to treat failure to disclose the total price of a service at the
                  earliest reasonable point as an unfair trading practice, reinforcing the
                  existing ACL s29 price representation prohibition.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Asymmetric exit conditions:</strong> Designing a service so that
                  sign-up is quick and easy but cancellation or withdrawal is disproportionately
                  difficult would be captured as an unfair practice under the proposed framework.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                At the time of writing, the s28B reforms had not yet been passed into law.
                Businesses operating in the claims and insurance services space should monitor
                developments and ensure that their consumer-facing practices comply with the
                likely direction of the reforms, given the ACCC&apos;s stated intent to use
                the new provisions actively once enacted.
              </p>
            </>
          ),
        },
        {
          heading: 'What NRPG Does Differently',
          body: (
            <>
              <p>
                The Disaster Recovery Australia platform connects homeowners directly with
                certified contractors from the National Restoration Professionals Group (NRPG)
                network. The following practices reflect our approach to the consumer protections
                described in this guide.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Transparent pricing from step one:</strong> The platform fee and the
                  amount held for your contractor are disclosed on the claim form before you
                  enter any personal or insurance details. There are no fees that appear only at
                  the final submission step.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No pre-ticked checkboxes:</strong> Every authorisation on the claim
                  form — property access, insurance liaison, work commencement, marketing
                  communications, and privacy consent — begins unchecked. You make an
                  affirmative choice for each one.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Clear platform role disclosure:</strong> The form explicitly states
                  that Disaster Recovery is a contractor-matching platform, not the party
                  performing the work or controlling the claim outcome. This is disclosed on
                  entry, on the authorisations step, and on the submission confirmation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>APP 5 collection notice:</strong> The privacy collection notice on
                  the form complies with Australian Privacy Principle 5, identifying who
                  collects your information, why, who it is disclosed to, and how to access
                  or correct it. The notice is available in multiple languages.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No manufactured urgency:</strong> The claim form contains no countdown
                  timers, scarcity claims, or pressure language beyond accurate descriptions
                  of the service timeline (contractor contact as soon as a certified contractor is confirmed for your area during business
                  hours).
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No claims outcome representations:</strong> NRPG does not represent
                  that using our platform will result in a higher insurance payout, faster
                  claim settlement, or any particular outcome from your insurer. The outcome
                  of your insurance claim is between you and your insurer.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If at any point you have a concern about how your information was collected or
                used, or about the way a contractor matched through our platform conducted
                themselves, you can contact us via our{' '}
                <a href="/contact" style={{ textDecoration: 'underline' }}>contact form</a> or
                lodge a complaint with the Office of the Australian Information Commissioner
                (OAIC) at oaic.gov.au.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I report a dark pattern used by an insurance or claims platform to the ACCC?',
          answer:
            'Yes. The ACCC accepts reports of misleading or deceptive conduct and unfair practices at accc.gov.au. You can report a specific platform, describe the conduct you experienced, and the ACCC may use the information to inform enforcement priorities. If your concern relates to the conduct of an insurer specifically — including how your claim was handled — AFCA (the Australian Financial Complaints Authority) is the relevant external dispute resolution body, accessible at afca.org.au.',
        },
        {
          question:
            'What is the difference between a dark pattern and normal sales persuasion?',
          answer:
            "Australian consumer law does not prohibit persuasion — it prohibits misleading or deceptive conduct and (where proposed legislation passes) unfair trading practices. A company can lawfully highlight the benefits of its service, promote urgency where that urgency is genuine, and design interfaces that draw attention to particular options. What it cannot do is create a false impression, use interface design to trick consumers into choices they would not otherwise make, or exploit the vulnerability of consumers under stress. The test under ACL s18 is whether the overall conduct is misleading or likely to mislead — not whether any individual element is technically true.",
        },
        {
          question:
            'Does the Privacy Act protect me against pre-ticked consent boxes on claims forms?',
          answer:
            'Australian Privacy Principle 3 (APP 3) requires that an organisation collecting sensitive information — which includes insurance claim details and financial information — must do so with the individual\'s consent, and that consent must be voluntary and informed. A pre-ticked checkbox does not constitute voluntary, informed consent under APP 3. If you believe a platform collected or disclosed your personal information without valid consent, you can lodge a complaint with the OAIC.',
        },
        {
          question:
            'What should I check before submitting a claim through an online restoration or claims platform?',
          answer:
            "Before submitting a claim or engaging a claims referral service online, verify the following: (1) Is the total price — including any platform or facilitation fee — disclosed before you enter your personal details? (2) Are all consent checkboxes unchecked by default? (3) Is the platform's role clearly described — are they matching you with a contractor, managing your claim, or acting as your advocate? (4) Is there a clear privacy collection notice identifying who collects your information and how to access it? (5) Are there any ongoing fee commitments or subscription arrangements being created by this submission? If any of these are unclear, do not submit until you have a satisfactory answer.",
        },
      ]}
      relatedGuides={[
        {
          title: 'ASIC Insurance Enforcement in Australia',
          href: '/guides/insurance/asic-insurance-enforcement-australia',
          description:
            'How ASIC and the 2021 financial services reforms protect policyholders when insurers breach conduct obligations.',
        },
        {
          title: 'Insurance-Approved Contractors: What You Need to Know',
          href: '/guides/insurance/insurance-approved-contractors',
          description:
            'The difference between insurer-appointed repairers and independently chosen certified contractors.',
        },
        {
          title: 'Loss Assessor vs Contractor: Roles Explained',
          href: '/guides/insurance/loss-assessor-vs-contractor',
          description:
            'Understanding who does what in the claims process and how each party is engaged.',
        },
      ]}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
    />
    </>
  );
}
