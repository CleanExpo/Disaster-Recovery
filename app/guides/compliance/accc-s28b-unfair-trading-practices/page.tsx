import { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ACCC Section 28B Unfair Trading Practices: What It Means for Insurance Claimants',
  description:
    'What the proposed Australian Consumer Law s28B amendment covers, the five categories of prohibited conduct, and how it protects insurance claimants from exploitative claim handling.',
  keywords:
    'ACCC s28B unfair trading practices, Australian Consumer Law amendment, unfair trading insurance, ACCC complaint, exploitative claim handling, ACL 2026',
  alternates: {
    canonical: `${NAP.url}/guides/compliance/accc-s28b-unfair-trading-practices`,
  },
};

export default function AcccS28BUnfairTradingPracticesPage() {
  return (
    <AgGuidePageTemplate
      category="Compliance"
      title="ACCC Section 28B: Unfair Trading Practices"
      subtitle="What the proposed ACL amendment covers, how it differs from existing protections, and what it means for insurance claimants"
      gradient="linear-gradient(135deg, #1A1A2E 0%, #B91C1C 100%)"
      icon={<ShieldAlert className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Compliance', href: '/guides/compliance' },
        { label: 'ACCC s28B Unfair Trading Practices' },
      ]}
      sections={[
        {
          heading: 'What Is Section 28B of the Australian Consumer Law?',
          body: (
            <>
              <p>
                Section 28B is a proposed amendment to the Australian Consumer Law (ACL), the
                federal statute that governs how businesses must treat consumers in Australia. The
                amendment — which the government has indicated is expected to pass in 2026 — would
                introduce a standalone prohibition on &ldquo;unfair trading practices&rdquo;, a
                category of conduct that causes consumer harm but which does not always fit neatly
                within the existing prohibitions on misleading conduct (s18) or false representations
                (s29).
              </p>
              <p style={{ marginTop: '1rem' }}>
                The ACCC has advocated for an unfair trading practices prohibition for several years,
                citing a gap in consumer protections for conduct that is manipulative or exploitative
                without necessarily being misleading. The UK, EU, and US Federal Trade Commission
                have had equivalent provisions for some time; the s28B proposal brings Australia
                into alignment with those frameworks.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The draft bill is public. The ACCC has published guidance on what the amendment is
                intended to address and how the regulator intends to use the new powers. This guide
                summarises the current state of the proposal and its practical implications — but
                because the law is not yet in force, you should check the ACCC website for the
                current status before relying on these provisions.
              </p>
            </>
          ),
        },
        {
          heading: 'The Five Categories of Prohibited Conduct Under the Draft Bill',
          body: (
            <>
              <p>
                The draft bill identifies five broad categories of conduct that would constitute an
                unfair trading practice. Each is described in general terms, and the ACCC would have
                discretion in applying them to specific facts. The five categories are:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>False urgency and artificial scarcity:</strong> Creating a false impression
                  that a consumer must act immediately — or that an offer is limited in a way that
                  is not genuinely the case — in order to pressure them into a decision they would
                  not otherwise make at that speed. This includes countdown timers that reset,
                  &ldquo;only X left&rdquo; claims that are fabricated, and manufactured deadlines
                  that serve no legitimate business purpose.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Hidden fees and pricing opacity:</strong> Structuring pricing in a way
                  that conceals the true total cost until late in the purchase or sign-up process.
                  This goes beyond the existing false representations prohibition — it targets the
                  design of pricing disclosures that are technically accurate but structured to
                  obscure the full cost from consumers at the point of decision.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Exploiting vulnerability:</strong> Taking advantage of a consumer&apos;s
                  known or reasonably apparent vulnerability — including emotional distress,
                  physical impairment, language barriers, or situational vulnerability (such as
                  being in the immediate aftermath of a disaster) — to obtain consent or agreement
                  that the consumer would not give in ordinary circumstances. The ACCC has
                  specifically flagged post-disaster contexts as a high-risk setting for this
                  category.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Obstruction of cancellation and switching:</strong> Designing processes
                  that make it unreasonably difficult for consumers to cancel a subscription,
                  end a service, or switch providers. The prohibition targets systematic friction
                  — where the difficulty of cancelling is a deliberate design choice rather than
                  an incidental complexity.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Manipulative design and dark patterns:</strong> Using interface or
                  process design to steer consumers toward choices they would not make if
                  presented with a neutral presentation of options. This includes pre-ticked
                  consent boxes, confusingly worded opt-out flows, visual emphasis that
                  misrepresents the relative merits of options, and similar techniques that
                  manipulate decision-making without technically stating anything false.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The categories overlap in some fact patterns — for example, a post-disaster
                sign-up process with a countdown timer and a pre-ticked insurance waiver could
                engage the urgency, vulnerability, and dark pattern categories simultaneously.
              </p>
            </>
          ),
        },
        {
          heading: 'How s28B Differs from Existing Sections 18 and 29',
          body: (
            <>
              <p>
                The existing consumer protection provisions in the ACL — particularly s18
                (misleading or deceptive conduct) and s29 (false representations) — have been the
                main tools for addressing harmful business conduct. Understanding where s28B fits
                requires knowing what s18 and s29 do not cover well.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Section 18 — Misleading or deceptive conduct:</strong> Prohibits conduct
                  that is misleading or deceptive, or likely to mislead or deceive. This is a broad
                  and powerful provision, but it requires that the conduct create a false impression
                  about something. Manipulative design or manufactured urgency can harm consumers
                  without creating a technically false impression — and that is the gap s28B is
                  intended to fill.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Section 29 — False representations:</strong> Targets specific categories
                  of false or misleading statements about goods or services, prices, conditions of
                  supply, and similar matters. It requires an identifiable false representation. A
                  countdown timer that is technically not a &ldquo;representation&rdquo; (because
                  it is not a statement of fact) may not fall cleanly within s29, even if it
                  functions to deceive consumers about urgency.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Section 28B — Unfair trading practices:</strong> Targets the conduct
                  itself — the manipulation, the exploitation of vulnerability, the deliberate
                  obstruction — regardless of whether any specific false statement was made.
                  This is a significant expansion. It allows the ACCC to address the architecture
                  of commercial processes, not just individual statements within them.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                In practice, egregious conduct will often attract both s18 and s28B claims. The
                significance of s28B is in the cases where existing provisions fall short — where
                the harm is real but the deception is structural rather than representational.
              </p>
            </>
          ),
        },
        {
          heading: 'What Section 28B Means for Insurance Claimants',
          body: (
            <>
              <p>
                The insurance claims context is one of the most directly relevant areas for the
                new unfair trading practices prohibition. Post-disaster claimants are often in
                circumstances that engage multiple categories of protected vulnerability, and
                claims handling processes have historically exhibited some of the conduct patterns
                that s28B is designed to address.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Cash settlement pressure:</strong> Offering a cash settlement in the
                  immediate aftermath of a disaster, combined with manufactured urgency about
                  the offer expiring, may engage both the urgency and vulnerability categories.
                  Insurers have legitimate reasons to offer cash settlements — but doing so in
                  a way that exploits a claimant&apos;s distress and time pressure to secure
                  acceptance of an inadequate amount is the kind of conduct s28B targets.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Scope suppression in managed repair networks:</strong> Where the design
                  of a managed repair process makes it unreasonably difficult for claimants to
                  understand what they are entitled to, or to exercise their right to seek
                  independent assessment, the obstruction of switching and hidden terms categories
                  may be relevant.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Vulnerable claimant handling:</strong> Part 9 of the General Insurance
                  Code of Practice already imposes obligations on insurers in relation to
                  vulnerable customers. Section 28B, if enacted, would create a parallel statutory
                  obligation — and would bring the ACCC (as well as AFCA) into the picture as a
                  potential regulator of this conduct.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Post-disaster contractor solicitation:</strong> Third parties — not just
                  insurers — can be subject to ACL obligations. Storm chasers and other contractors
                  who use post-disaster door-knocking to obtain work through high-pressure
                  techniques, artificial urgency, or exploitation of distressed homeowners would
                  also fall within the scope of s28B conduct.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Section 28B does not give individual claimants a private right of action in
                addition to what already exists under s18 — the ACCC is the primary enforcement
                body. However, ACCC enforcement action typically results in improved industry
                conduct, and AFCA is separately able to consider fairness in its dispute
                resolution process under its own rules.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Lodge an ACCC Complaint About Unfair Trading',
          body: (
            <>
              <p>
                If you believe you have experienced conduct that constitutes unfair trading — by an
                insurer, a contractor, or any other business — you can report it to the ACCC. The
                ACCC does not act as an advocate for individual complainants, but complaints inform
                the ACCC&apos;s enforcement priorities and can contribute to investigations into
                systemic conduct.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Online report:</strong> Use the ACCC&apos;s online consumer complaint
                  form at <strong>accc.gov.au/report</strong>. Describe the conduct in specific
                  terms: what happened, when it happened, which category of prohibited conduct you
                  believe it falls within, and what evidence you have.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document the conduct:</strong> Before lodging a complaint, document
                  everything — screenshots, recordings (subject to applicable state recording
                  laws), written correspondence, and a written account of verbal interactions.
                  The ACCC needs specifics, not general impressions.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Complaints don&apos;t generate individual remedies:</strong> ACCC
                  complaints are regulatory, not compensatory. For individual remedies — a
                  refund, revised settlement, or compensation — your pathways are AFCA (for
                  insurance disputes), the relevant state small claims tribunal, or a solicitor.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>State fair trading offices:</strong> State consumer protection agencies
                  (NSW Fair Trading, Consumer Affairs Victoria, etc.) also have jurisdiction over
                  ACL matters and may act more quickly on local matters. They can be lodged with
                  simultaneously.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This guide is informational and does not constitute legal advice. The s28B
                amendment has not yet passed as at the date of publication. Check the ACCC
                website and{' '}
                <strong>legislation.gov.au</strong> for current status. If you believe you
                have been harmed by a business&apos;s conduct and need individual assistance,
                consult a solicitor or a free community legal service.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Has section 28B of the Australian Consumer Law been passed?',
          answer:
            'As at April 2026, the s28B amendment is a draft bill that the government has indicated it expects to pass during 2026. It has not yet been enacted. You should check the ACCC website and legislation.gov.au for the current legislative status before relying on these provisions.',
        },
        {
          question: 'What is the difference between unfair trading practices and misleading conduct?',
          answer:
            'Misleading conduct (s18 ACL) requires that the conduct create a false impression about something — a statement or representation that is untrue or likely to deceive. Unfair trading practices under s28B target manipulative or exploitative conduct that harms consumers without necessarily involving a false statement: things like manufactured urgency, dark pattern design, and exploitation of vulnerability. There is overlap, but s28B is intended to catch cases where s18 falls short.',
        },
        {
          question: 'Can I sue a company for unfair trading practices under s28B?',
          answer:
            'The ACCC is the primary enforcement body under the s28B proposal. Individual consumers may be able to bring private actions under the ACL depending on how the final legislation is structured — but for insurance disputes specifically, AFCA is the more direct pathway for individual remedies. Consult a solicitor if you need advice on your specific circumstances.',
        },
        {
          question: 'Does s28B apply to insurers?',
          answer:
            'Yes. Insurers are businesses engaged in trade or commerce and are subject to the Australian Consumer Law. The insurance sector is also subject to the General Insurance Code of Practice and AFCA oversight. Section 28B, if enacted, would apply in parallel with those frameworks — not instead of them.',
        },
        {
          question: 'What should I do if an insurer or contractor used high-pressure tactics on me after a disaster?',
          answer:
            'Document the conduct in writing immediately — what was said, when, and by whom. If it involved an insurer, lodge a complaint through the insurer\'s internal dispute resolution process and escalate to AFCA if unresolved. If it involved a contractor, you can report to the ACCC and your state fair trading office. If you suffered financial harm, consult a solicitor or community legal service about your options.',
        },
      ]}
      relatedGuides={[
        {
          title: 'General Insurance Code of Practice — Policyholder Rights',
          href: '/guides/insurance/general-insurance-code-of-practice',
          description:
            'ICA member obligations, claim timeframes, vulnerable customer provisions, and the AFCA escalation pathway.',
        },
        {
          title: 'ASIC Insurance Enforcement in Australia',
          href: '/guides/insurance/asic-insurance-enforcement-australia',
          description:
            'How ASIC and the 2021 reforms protect policyholders when insurers breach conduct obligations.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'How insurer delays compound disaster costs and what your rights are under the Code of Practice.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
