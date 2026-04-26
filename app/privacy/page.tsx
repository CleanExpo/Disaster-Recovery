/**
 * Privacy Policy — Australian Privacy Principles (APP 1–13) compliant
 *
 * DR-327 / DR-328: Updated for OAIC compliance sweep and Privacy Act
 * small business exemption removal (1 July 2026).
 *
 * Entity: National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142)
 * Trading as: Disaster Recovery
 * Website: disasterrecovery.com.au
 */

import type { Metadata } from 'next';
import { Lock } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery',
  description:
    'How Disaster Recovery (National Restoration Professionals Group Pty Ltd) collects, uses, stores, and discloses your personal information under the Australian Privacy Act 1988.',
  alternates: {
    canonical: `${NAP.url}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | Disaster Recovery',
    description:
      'Our privacy policy — how we handle your personal information in accordance with the Australian Privacy Principles.',
    url: `${NAP.url}/privacy`,
    type: 'website',
  },
};

const LAST_UPDATED = '23 April 2026';
const ENTITY = 'National Restoration Professionals Group Pty Ltd';
const ABN = '85 151 794 142';
const TRADING_AS = 'Disaster Recovery';
const WEBSITE = 'disasterrecovery.com.au';
const CONTACT_URL = '/contact';
const OAIC_URL = 'https://www.oaic.gov.au';

export default function PrivacyPolicyPage() {
  return (
    <AgGuidePageTemplate
      category="Legal"
      title="Privacy Policy"
      subtitle={`How ${TRADING_AS} collects, uses, and protects your personal information. Last updated ${LAST_UPDATED}.`}
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Lock className="h-10 w-10" />}
      lastReviewed={LAST_UPDATED}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      cta={{ text: 'Contact Us', href: CONTACT_URL }}
      sections={[
        {
          heading: 'About This Policy',
          body: (
            <>
              <p>
                This Privacy Policy describes how <strong>{ENTITY}</strong> (ABN {ABN}), trading as{' '}
                <strong>{TRADING_AS}</strong> (<em>&quot;we&quot;</em>, <em>&quot;us&quot;</em>,{' '}
                <em>&quot;our&quot;</em>), manages personal information collected through our
                website <strong>{WEBSITE}</strong> and our claim intake and contractor matching
                services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We are bound by the <strong>Australian Privacy Act 1988 (Cth)</strong> and the{' '}
                <strong>Australian Privacy Principles (APPs)</strong>. This policy sets out how we
                meet our obligations under APPs 1–13.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using our website or submitting a claim through our platform, you agree to the
                collection and use of your personal information as described in this policy.
              </p>
            </>
          ),
        },
        {
          heading: 'What Personal Information We Collect',
          background: 'light',
          body: (
            <>
              <p>
                We collect personal information that is reasonably necessary to match you with a
                certified restoration contractor and to support your insurance claim process. This
                includes:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>
                  <strong>Identity information</strong> — full name
                </li>
                <li>
                  <strong>Contact information</strong> — phone number, email address
                </li>
                <li>
                  <strong>Property information</strong> — street address, suburb, state, postcode,
                  property type
                </li>
                <li>
                  <strong>Damage information</strong> — description of damage, affected areas, date
                  of damage, photographs
                </li>
                <li>
                  <strong>Insurance information</strong> — insurance company name, policy number,
                  claim number, excess amount
                </li>
                <li>
                  <strong>Payment information</strong> — payment card details processed by our
                  payment provider (Stripe). We do not store card numbers.
                </li>
                <li>
                  <strong>Communication records</strong> — records of your interactions with our
                  platform and the assigned contractor
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We collect this information directly from you when you submit a claim through our
                platform (APP 3). We do not collect sensitive information (as defined by the Privacy
                Act) unless it is necessary for your claim and you have consented to its collection.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Where it is lawful and practicable to do so, you may use our website anonymously or
                by pseudonym (APP 2). However, the claim intake process requires identification to
                enable contractor matching and insurance liaison.
              </p>
            </>
          ),
        },
        {
          heading: 'Why We Collect Your Information (APP 3 & 5)',
          body: (
            <>
              <p>We collect personal information for the following primary purposes:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>
                  Matching your claim with a certified IICRC restoration contractor in our network
                </li>
                <li>Enabling the assigned contractor to contact you and schedule an inspection</li>
                <li>
                  Enabling the contractor to liaise with your insurer on your behalf (where
                  authorised)
                </li>
                <li>Processing the platform fee payment via Stripe</li>
                <li>
                  Maintaining records of completed restoration work for warranty and compliance
                  purposes
                </li>
                <li>Improving our platform and contractor matching processes</li>
                <li>Complying with our legal obligations</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We will not collect personal information that is not reasonably necessary for one of
                these purposes (APP 3.3).
              </p>
            </>
          ),
        },
        {
          heading: 'How We Use and Disclose Your Information (APP 6)',
          background: 'light',
          body: (
            <>
              <p>
                We use and disclose your personal information only for the primary purposes for
                which it was collected, or for related secondary purposes that you would reasonably
                expect.
              </p>
              <p style={{ marginTop: '1rem' }}>Your personal information may be disclosed to:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>
                  <strong>The assigned NRPG contractor</strong> — who receives your contact details,
                  property address, damage description, and insurance details to perform the
                  restoration work
                </li>
                <li>
                  <strong>Your insurance company</strong> — where you have authorised the contractor
                  to liaise with your insurer
                </li>
                <li>
                  <strong>Stripe</strong> — our payment processor, which receives payment card data
                  to process the platform fee. Stripe operates under its own privacy policy.
                </li>
                <li>
                  <strong>Our technology providers</strong> — cloud hosting, database, and email
                  delivery services that process data on our behalf under data processing agreements
                </li>
                <li>
                  <strong>Regulatory and government bodies</strong> — where required by law,
                  including the OAIC, AFCA, or courts
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We do not sell, rent, or trade your personal information to third parties for
                marketing purposes (APP 7).
              </p>
            </>
          ),
        },
        {
          heading: 'Cross-Border Disclosure (APP 8)',
          body: (
            <>
              <p>
                Personal information we collect is processed by the following providers. Where a
                provider operates outside Australia, we take reasonable steps to ensure they handle
                your information consistently with the Australian Privacy Principles, including
                through contractual data processing agreements.
              </p>
              <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #CBD5E1' }}>
                        Provider
                      </th>
                      <th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #CBD5E1' }}>
                        Country
                      </th>
                      <th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #CBD5E1' }}>
                        Function
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Vercel
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States, European Union
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Web hosting, serverless compute
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Supabase
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Australia (ap-southeast-2)
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Primary database
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Anthropic
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        AI content generation for internal ops
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        OpenAI
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        AI services (where used)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Google
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Global
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Analytics, Tag Manager, Gemma translation API
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Microsoft
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Global
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Clarity session recording (opt-in only)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Meta
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Pixel tracking (opt-in only, when enabled)
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Stripe
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Payment processing
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Twilio / ElevenLabs
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        United States
                      </td>
                      <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        Voice telephony and AI call transcription
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem' }}>Cloudflare</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>Global</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>CDN and DNS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '1rem' }}>
                <strong>Session recording disclosure.</strong> If you consent to product-experience
                cookies via our cookie banner, Microsoft Clarity records anonymised mouse movement,
                clicks, scrolling and page interactions for usability analysis. Recordings exclude
                fields marked sensitive (payment card, passwords). Session recordings are retained
                on a 90-day rolling deletion. Clarity is off by default; it activates only if you
                opt in.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using our platform, you consent to the disclosure of your personal information to
                the overseas recipients above where reasonably necessary to provide our services.
                Opt-in cookies (Clarity, Meta Pixel) do not activate unless you accept them via the
                cookie banner.
              </p>
            </>
          ),
        },
        {
          heading: 'Voice AI Assistant (Sarah) and Telephony',
          background: 'light',
          body: (
            <>
              <p>
                When you call our intake line, your call may be answered by <strong>Sarah</strong>,
                an AI voice assistant built on{' '}
                <strong>ElevenLabs Conversational AI (Flash v2.5)</strong>. Telephony is carried by{' '}
                <strong>Twilio</strong>. Both ElevenLabs and Twilio are United States-headquartered
                providers, and voice audio, transcripts, and associated metadata are processed on
                servers located in the United States (Twilio edge infrastructure may also be
                configured to route through Australian points of presence; core processing remains
                in the US).
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Informed consent at call open (APP 8):</strong> At the start of every call,
                before any audio is streamed to ElevenLabs, the Twilio layer plays a short opening
                utterance that discloses (i) the call may be handled by an AI assistant, (ii) the
                call is recorded so we can help you, and (iii) your information may be processed by
                our technology providers overseas under the Australian Privacy Principles. You are
                asked whether that is OK to continue. You can press 0 at any time to speak to a
                person. If you decline, stay silent, or press 0, the call is immediately transferred
                to a human operator and no audio is streamed to the AI provider.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>What the voice channel collects:</strong> your name, phone number (via
                caller line identification), email address (spelled out during the call), postcode
                and property address, description of the damage, and insurance information (insurer
                name, policy number, claim number). This is the same categories of information
                collected through our web claim form — the voice channel is simply an alternative
                intake path.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Recording and retention:</strong> calls are recorded and
                machine-transcribed. Default retention is{' '}
                <strong>30 days for audio recordings</strong>,{' '}
                <strong>90 days for transcripts</strong>, and{' '}
                <strong>7 years for the redacted audit log</strong> (call metadata, consent outcome,
                claim reference — with direct identifiers removed). These retention windows align
                with our claim-record obligations under APP 11 and with the minimum retention needed
                to resolve billing and dispute matters with our carriers.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>How to withdraw consent:</strong> you may decline consent at the opening
                prompt by pressing 0, saying &quot;no&quot;, or staying silent (no audio leaves
                Twilio for the AI provider in any of those cases), or you may request a human
                transfer at any point during the call by saying &quot;human&quot; or
                &quot;operator&quot; — Sarah is configured to transfer on that request at every
                turn.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Automated decision-making (APP 1.7, commences 10 December 2026):</strong>{' '}
                Sarah collects information and books appointments; she does not make decisions that
                produce a legal or similarly significant effect on you. All contractor-assignment,
                scope-of-work, and insurance decisions remain with the assigned human contractor and
                your insurer, consistent with the &quot;AI-Assisted Features and Automated
                Processing&quot; section below. We are preparing for the APP 1.7 transparency
                requirements ahead of the 10 December 2026 commencement date.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Disclosure to ElevenLabs and Twilio is made in accordance with APP 8 (cross-border
                disclosure) and is governed by data processing agreements with each provider. Review
                of this consent mechanism by privacy counsel is part of our pre-go-live checklist.
              </p>
            </>
          ),
        },
        {
          heading: 'AI-Assisted Features and Automated Processing',
          body: (
            <>
              <p>
                Our platform includes a multilingual interface powered by an AI language model —
                specifically <strong>Gemma 4</strong>, developed by Google DeepMind and accessed via
                Google&apos;s generative AI services. This model is used solely to translate UI
                text, page headings, form labels, and informational content into 23 languages,
                enabling users across the Asia-Pacific region and beyond to access our services in
                their preferred language.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>What the AI model does and does not process:</strong> The translation
                feature sends page content and interface strings to the AI model. It does{' '}
                <em>not</em> send your personal information — including your name, address, contact
                details, damage description, insurance information, or claim details — to the AI
                model. Personal information you submit through our claim intake form is handled
                entirely within our own systems and is not passed to any AI translation service.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Contractor matching and automated decisions:</strong> Matching your claim
                with an NRPG network contractor is performed by our internal contractor matching
                system based on location, damage category, and contractor availability. This process
                does not constitute automated decision-making that has a legal or similarly
                significant effect on you. A human contractor reviews your claim details and makes
                all decisions relating to the provision of restoration services. No automated system
                determines your entitlements, your insurance outcome, or the scope of work — those
                decisions rest with the contractor and your insurer.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Cross-border processing:</strong> Google&apos;s AI services process
                translation requests on servers that may be located outside Australia, including in
                the United States. This processing is limited to UI strings and informational
                content (not personal information), and is consistent with the cross-border
                disclosure above (APP 8). We rely on Google&apos;s data processing agreements and
                contractual safeguards to ensure appropriate handling of any data transmitted to
                these services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This disclosure is made in accordance with <strong>APP 3</strong> (transparency
                about collection practices) and <strong>APP 8</strong> (cross-border disclosure),
                and reflects our commitment to transparency ahead of the Privacy Act amendments
                taking effect 1 July 2026.
              </p>
            </>
          ),
        },
        {
          heading: 'New Zealand Consumers — Privacy Act 2020',
          body: (
            <>
              <p>
                If you are in New Zealand or submit a claim for a property located in New Zealand,
                the New Zealand <strong>Privacy Act 2020</strong> and its 13 Information Privacy
                Principles (IPPs) apply to our handling of your personal information, in addition to
                the Australian Privacy Act and APPs.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>IPP 3 collection notice.</strong> When you submit a claim from New Zealand
                we collect your name, contact details, property address, damage description, and
                (where provided) insurance information for the purposes of matching you with a
                restoration contractor and enabling the contractor to contact you and liaise with
                your insurer. Collection is from you directly. Providing this information is
                voluntary, but without it we cannot match your claim.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>IPP 12 cross-border disclosure.</strong> Your personal information is
                transferred to Australia for storage and processing and may be disclosed to
                contractors, insurers, and service providers located in Australia and overseas as
                set out above. We take reasonable steps to ensure overseas recipients handle your
                information consistently with the Privacy Act 2020.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Access, correction, and complaints.</strong> You may request access to or
                correction of your personal information at any time. If you are dissatisfied with
                our response, you may complain to the Office of the Privacy Commissioner at{' '}
                <a
                  href="https://www.privacy.org.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1D4ED8', textDecoration: 'underline' }}
                >
                  privacy.org.nz
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: 'How We Protect Your Information (APP 11)',
          background: 'light',
          body: (
            <>
              <p>
                We take reasonable steps to protect the personal information we hold from misuse,
                interference, loss, and unauthorised access, modification, or disclosure. Our
                security measures include:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>TLS encryption for all data transmitted through our website and API</li>
                <li>
                  Access controls limiting personal information to authorised personnel and the
                  assigned contractor
                </li>
                <li>
                  Payment card data handled exclusively by Stripe — we do not store card numbers on
                  our systems
                </li>
                <li>Database encryption at rest for stored personal information</li>
                <li>Regular security reviews of our platform infrastructure</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Data retention:</strong> We retain personal information for as long as
                necessary to fulfil the purposes for which it was collected, or as required by law.
                Claim records are typically retained for 7 years following completion of work to
                satisfy insurance and warranty obligations. You may request deletion of your
                personal information where we have no ongoing legal obligation to retain it (see
                &quot;Your Rights&quot; below).
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Notifiable Data Breaches:</strong> We comply with the Notifiable Data
                Breaches (NDB) scheme under the Privacy Act. If we become aware of an eligible data
                breach that is likely to result in serious harm to affected individuals, we will
                notify the OAIC and affected individuals as required.
              </p>
            </>
          ),
        },
        {
          heading: 'Your Rights — Access and Correction (APP 12 & 13)',
          body: (
            <>
              <p>You have the right to:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>
                  <strong>Access</strong> the personal information we hold about you (APP 12)
                </li>
                <li>
                  <strong>Correct</strong> personal information that is inaccurate, out of date,
                  incomplete, or misleading (APP 13)
                </li>
                <li>
                  <strong>Request deletion</strong> of your personal information where we have no
                  ongoing legal obligation to retain it
                </li>
                <li>
                  <strong>Make a complaint</strong> about how we handle your personal information
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                To exercise any of these rights, contact us through our{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
                  contact form
                </Link>
                . We will respond to access and correction requests within 30 days. There is no
                charge for making a request, though we may charge a reasonable fee to cover the cost
                of providing access where permitted by law.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If we refuse an access or correction request, we will provide you with written
                reasons and information about how to complain to the OAIC.
              </p>
            </>
          ),
        },
        {
          heading: 'Complaints',
          background: 'light',
          body: (
            <>
              <p>
                If you believe we have handled your personal information in breach of the Australian
                Privacy Principles, you may lodge a complaint with us by using our{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
                  contact form
                </Link>
                . We will acknowledge your complaint within 5 business days and aim to resolve it
                within 30 days.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If you are not satisfied with our response, you may escalate your complaint to the{' '}
                <strong>Office of the Australian Information Commissioner (OAIC)</strong> at{' '}
                <a
                  href={OAIC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1D4ED8', textDecoration: 'underline' }}
                >
                  oaic.gov.au
                </a>{' '}
                or by calling 1300 363 992.
              </p>
            </>
          ),
        },
        {
          heading: 'Cookies and Website Analytics',
          body: (
            <>
              <p>
                Our website uses cookies and similar technologies to support site functionality and
                understand how visitors use the site. For detailed information about the cookies we
                use and how to manage them, see our{' '}
                <Link href="/cookies" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
                  Cookie Policy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          heading: 'Changes to This Policy',
          background: 'light',
          body: (
            <>
              <p>
                We may update this Privacy Policy from time to time. When we make material changes,
                we will update the &quot;Last updated&quot; date at the top of this page. We
                encourage you to review this policy periodically.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This policy was last reviewed and updated on <strong>{LAST_UPDATED}</strong> to add
                a New Zealand Privacy Act 2020 section (IPP 3 collection notice and IPP 12
                cross-border disclosure) for consumers submitting claims from New Zealand. Earlier
                updates addressed the removal of the Privacy Act small business exemption effective
                1 July 2026 and the OAIC&apos;s 2026 privacy compliance sweep.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Who controls my personal information?',
          answer: `${ENTITY} (ABN ${ABN}), trading as ${TRADING_AS}, is the entity responsible for the personal information collected through ${WEBSITE}. We are regulated by the Australian Privacy Act 1988 and the Australian Privacy Principles.`,
        },
        {
          question: 'Does the assigned contractor see all my details?',
          answer:
            'The contractor assigned to your claim receives your contact details, property address, damage description, and insurance information — the information they need to perform the restoration work. They do not receive your payment card details, which are processed exclusively by Stripe.',
        },
        {
          question: 'How long do you keep my information?',
          answer:
            'Claim records are typically retained for 7 years following completion of work to satisfy insurance, warranty, and regulatory obligations. You may request deletion of personal information where we have no ongoing legal obligation to retain it.',
        },
        {
          question: 'How do I access or correct my personal information?',
          answer:
            'Contact us through our contact form. We will respond within 30 days. If we cannot correct information you believe is inaccurate, we will provide you with written reasons and information about escalating to the OAIC.',
        },
        {
          question: 'What happens if there is a data breach?',
          answer:
            'We comply with the Notifiable Data Breaches (NDB) scheme. If an eligible data breach occurs that is likely to result in serious harm, we will notify both the OAIC and affected individuals as required by law.',
        },
      ]}
      relatedGuides={[
        { title: 'Cookie Policy', href: '/cookies' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Contact Us', href: '/contact' },
        { title: 'Lodge a Claim', href: '/claim' },
      ]}
    />
  );
}
