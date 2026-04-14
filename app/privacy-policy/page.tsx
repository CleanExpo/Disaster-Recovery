/**
 * Privacy Policy — Australian Privacy Principles (APP 1–13) compliant
 *
 * DR-604: Published at /privacy-policy with canonical URL and updated
 * last-reviewed date for OAIC compliance sweep and Privacy Act
 * small business exemption removal (1 July 2026).
 *
 * Entity: National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142)
 * Trading as: Disaster Recovery Australia
 * Website: disasterrecovery.com.au
 */

import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery Australia',
  description:
    'How Disaster Recovery Australia (National Restoration Professionals Group Pty Ltd) collects, uses, stores, and discloses your personal information under the Australian Privacy Act 1988.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Disaster Recovery Australia',
    description:
      'Privacy policy — how personal information is handled in accordance with the Australian Privacy Principles.',
    url: 'https://disasterrecovery.com.au/privacy-policy',
    type: 'website',
  },
}

const LAST_UPDATED = '14 April 2026'
const ENTITY = 'National Restoration Professionals Group Pty Ltd'
const ABN = '85 151 794 142'
const TRADING_AS = 'Disaster Recovery Australia'
const WEBSITE = 'disasterrecovery.com.au'
const CONTACT_URL = '/contact'
const OAIC_URL = 'https://www.oaic.gov.au'

export default function PrivacyPolicyPage() {
  return (
    <AgGuidePageTemplate
      category="Legal"
      title="Privacy Policy"
      subtitle={`How ${TRADING_AS} collects, uses, and protects your personal information. Last updated ${LAST_UPDATED}.`}
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Lock className="h-10 w-10" />}
      lastReviewed={LAST_UPDATED}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Privacy Policy' },
      ]}
      cta={{ text: 'Contact Us', href: CONTACT_URL }}
      sections={[
        {
          heading: 'About This Policy',
          body: (
            <>
              <p>
                This Privacy Policy describes how <strong>{ENTITY}</strong> (ABN {ABN}), trading as <strong>{TRADING_AS}</strong>, manages personal information collected through the website <strong>{WEBSITE}</strong> and the claim intake and contractor matching services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The entity is bound by the <strong>Australian Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>. This policy sets out how obligations under APPs 1–13 are met.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using the website or submitting a claim through the platform, you agree to the collection and use of your personal information as described in this policy.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 1 — Open and Transparent Management of Personal Information',
          background: 'light',
          body: (
            <>
              <p>
                This Privacy Policy is publicly available at <strong>{WEBSITE}/privacy-policy</strong>. It describes what personal information is collected, why it is collected, how it is used and disclosed, and how individuals can access and correct their information or make a complaint.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Any questions about this policy may be directed to {TRADING_AS} via the{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 2 — Anonymity and Pseudonymity',
          body: (
            <>
              <p>
                Where it is lawful and practicable to do so, individuals may use the website anonymously or by pseudonym (for example, browsing informational pages). However, the claim intake process requires identification — including name, contact details, and property address — to enable contractor matching and insurance liaison. Providing accurate identity information for these processes is a condition of use.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 3 — Collection of Solicited Personal Information',
          background: 'light',
          body: (
            <>
              <p>Personal information is collected only when reasonably necessary to match a claim with a certified IICRC restoration contractor and to support the insurance claim process. The following information may be collected:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Identity information</strong> — full name</li>
                <li><strong>Contact information</strong> — phone number, email address</li>
                <li><strong>Property information</strong> — street address, suburb, state, postcode, property type</li>
                <li><strong>Damage information</strong> — description of damage, affected areas, date of damage, photographs</li>
                <li><strong>Insurance information</strong> — insurance company name, policy number, claim number, excess amount</li>
                <li><strong>Payment information</strong> — payment card details processed by Stripe. Card numbers are not stored.</li>
                <li><strong>Communication records</strong> — records of interactions with the platform and the assigned contractor</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Personal information is collected directly from you when you submit a claim, contact form, or contractor application. Sensitive information (as defined by the Privacy Act) is not collected unless necessary for your claim and you have consented.
              </p>
              <p style={{ marginTop: '1rem' }}>
                At the point of collection, a collection notice is displayed explaining the purpose of collection, the entities to whom information may be disclosed, and how to access or correct the information.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 4 — Dealing with Unsolicited Personal Information',
          body: (
            <>
              <p>
                If personal information is received that was not solicited and could not have been collected under APP 3, the information is destroyed or de-identified as soon as practicable, provided it is lawful and reasonable to do so.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 5 — Notification of Collection',
          background: 'light',
          body: (
            <>
              <p>
                At or before the time personal information is collected, individuals are notified of:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>The identity and contact details of {TRADING_AS}</li>
                <li>The fact that the information is being collected and the circumstances of collection</li>
                <li>The purposes for which the information is collected</li>
                <li>The main consequences if the information is not collected</li>
                <li>Any other entity, body, or person to whom the information is likely to be disclosed</li>
                <li>That this Privacy Policy contains information about access, correction, and complaints</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Collection notices appear on all intake forms prior to submission.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 6 — Use or Disclosure of Personal Information',
          body: (
            <>
              <p>Personal information is used and disclosed only for the primary purposes for which it was collected, or for related secondary purposes that individuals would reasonably expect. Primary purposes include:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Matching a claim with a certified IICRC restoration contractor in the NRPG network</li>
                <li>Enabling the assigned contractor to contact you and schedule an inspection</li>
                <li>Enabling the contractor to liaise with your insurer on your behalf (where authorised)</li>
                <li>Processing the platform fee payment via Stripe</li>
                <li>Maintaining records of completed restoration work for warranty and compliance purposes</li>
                <li>Improving platform and contractor matching processes</li>
                <li>Complying with legal obligations</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Personal information is not sold, rented, or traded to third parties for marketing purposes.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 7 — Direct Marketing',
          background: 'light',
          body: (
            <>
              <p>
                Personal information is not used or disclosed for direct marketing purposes without consent. If direct marketing communications are sent, each communication includes a clear and conspicuous opt-out mechanism. Opt-out requests are actioned promptly and at no cost to the individual.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 8 — Cross-Border Disclosure',
          body: (
            <>
              <p>
                Some technology providers used to operate the platform may store or process data outside Australia — including cloud infrastructure providers operating in the United States and other jurisdictions. Before disclosing personal information to overseas recipients, reasonable steps are taken to ensure those recipients handle the information consistently with the Australian Privacy Principles, including through contractual data processing agreements.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using the platform, you consent to the potential disclosure of your personal information to overseas recipients where necessary to operate the services, including for:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Cloud infrastructure</strong> — database and hosting services (United States)</li>
                <li><strong>Payment processing</strong> — Stripe, Inc. (United States)</li>
                <li><strong>Email delivery</strong> — transactional email services (United States)</li>
                <li><strong>AI translation services</strong> — Google generative AI, used solely for UI string translation; personal information is not sent to this service</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'APP 9 — Adoption, Use, or Disclosure of Government-Related Identifiers',
          background: 'light',
          body: (
            <>
              <p>
                Government-related identifiers (such as tax file numbers, Medicare numbers, or driver licence numbers) are not collected, adopted, used, or disclosed as identifiers for individuals, except where required or authorised by law.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 10 — Quality of Personal Information',
          body: (
            <>
              <p>
                Reasonable steps are taken to ensure that personal information collected is accurate, up to date, and complete. Individuals are encouraged to notify {TRADING_AS} of any changes to their personal information. Correction requests are actioned within 30 days.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 11 — Security of Personal Information',
          background: 'light',
          body: (
            <>
              <p>Reasonable steps are taken to protect personal information from misuse, interference, loss, and unauthorised access, modification, or disclosure. Security measures include:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>TLS encryption for all data transmitted through the website and API</li>
                <li>Access controls limiting personal information to authorised personnel and the assigned contractor</li>
                <li>Payment card data handled exclusively by Stripe — card numbers are not stored on platform systems</li>
                <li>Database encryption at rest for stored personal information</li>
                <li>Regular security reviews of platform infrastructure</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Data retention:</strong> Personal information is retained for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Claim records are typically retained for 7 years following completion of work to satisfy insurance, warranty, and regulatory obligations. Deletion requests are actioned where no ongoing legal obligation to retain exists.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Notifiable Data Breaches:</strong> {TRADING_AS} complies with the Notifiable Data Breaches (NDB) scheme under the Privacy Act. If an eligible data breach occurs that is likely to result in serious harm to affected individuals, the OAIC and affected individuals will be notified as required by law.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 12 — Access to Personal Information',
          body: (
            <>
              <p>
                Individuals have the right to access the personal information held about them. To make an access request, contact {TRADING_AS} via the{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
                Access requests will be responded to within 30 days. There is no charge for making a request, though a reasonable fee may be charged to cover the cost of providing access where permitted by law.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If an access request is refused, written reasons will be provided along with information about how to complain to the OAIC.
              </p>
            </>
          ),
        },
        {
          heading: 'APP 13 — Correction of Personal Information',
          background: 'light',
          body: (
            <>
              <p>
                Individuals have the right to request correction of personal information that is inaccurate, out of date, incomplete, irrelevant, or misleading. Correction requests may be submitted via the{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>
                {' '}and will be actioned within 30 days. If a correction request is refused, written reasons will be provided.
              </p>
            </>
          ),
        },
        {
          heading: 'AML/CTF Obligations',
          body: (
            <>
              <p>
                {TRADING_AS} is not a reporting entity under the <em>Anti-Money Laundering and Counter-Terrorism Financing Act 2006 (Cth)</em> and does not provide designated services as defined under that Act. No AML/CTF program, customer identification procedures, or transaction monitoring obligations apply to the platform at this time.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If the scope of services changes to include designated services in future, this policy will be updated accordingly and appropriate AML/CTF obligations implemented.
              </p>
            </>
          ),
        },
        {
          heading: 'AI-Assisted Features and Automated Processing',
          background: 'light',
          body: (
            <>
              <p>
                The platform includes a multilingual interface powered by an AI language model — <strong>Gemma 4</strong>, developed by Google DeepMind and accessed via Google&apos;s generative AI services. This model is used solely to translate UI text, page headings, form labels, and informational content into 23 languages.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>What the AI model processes:</strong> The translation feature sends page content and interface strings to the AI model. It does <em>not</em> send personal information — including name, address, contact details, damage description, insurance information, or claim details — to the AI model. Personal information submitted through intake forms is handled entirely within platform systems.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Contractor matching:</strong> Matching a claim with an NRPG network contractor is performed by an internal system based on location, damage category, and contractor availability. This does not constitute automated decision-making with a legal or similarly significant effect. A human contractor reviews claim details and makes all decisions relating to restoration services.
              </p>
            </>
          ),
        },
        {
          heading: 'Cookies and Website Analytics',
          body: (
            <>
              <p>
                The website uses cookies and similar technologies to support site functionality and understand how visitors use the site. For detailed information about the cookies used and how to manage them, see the{' '}
                <Link href="/cookies" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Cookie Policy</Link>.
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
                If you believe personal information has been handled in breach of the Australian Privacy Principles, a complaint may be lodged via the{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
                Complaints will be acknowledged within 5 business days and resolved within 30 days.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If the response is unsatisfactory, the complaint may be escalated to the <strong>Office of the Australian Information Commissioner (OAIC)</strong> at{' '}
                <a href={OAIC_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>oaic.gov.au</a>{' '}
                or by calling 1300 363 992.
              </p>
            </>
          ),
        },
        {
          heading: 'Changes to This Policy',
          body: (
            <>
              <p>
                This Privacy Policy may be updated from time to time. When material changes are made, the &quot;Last updated&quot; date at the top of this page will be revised. Reviewing this policy periodically is encouraged.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This policy was last reviewed and updated on <strong>{LAST_UPDATED}</strong> to address the removal of the Privacy Act small business exemption effective 1 July 2026 and in response to the OAIC&apos;s 2026 privacy compliance sweep targeting property-adjacent service sectors.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Who is responsible for personal information on this platform?',
          answer: `${ENTITY} (ABN ${ABN}), trading as ${TRADING_AS}, is the entity responsible for personal information collected through ${WEBSITE}. The entity is regulated by the Australian Privacy Act 1988 and the Australian Privacy Principles.`,
        },
        {
          question: 'Does the assigned contractor see all my details?',
          answer:
            'The contractor assigned to a claim receives contact details, property address, damage description, and insurance information — the information needed to perform restoration work. Payment card details are not shared; those are processed exclusively by Stripe.',
        },
        {
          question: 'How long is my information kept?',
          answer:
            'Claim records are typically retained for 7 years following completion of work to satisfy insurance, warranty, and regulatory obligations. Deletion of personal information may be requested where no ongoing legal obligation to retain exists.',
        },
        {
          question: 'How do I access or correct my personal information?',
          answer:
            'Submit a request via the contact form. Responses will be provided within 30 days. If a correction cannot be made, written reasons will be provided along with information about escalating to the OAIC.',
        },
        {
          question: 'What happens if there is a data breach?',
          answer:
            'The platform complies with the Notifiable Data Breaches (NDB) scheme. If an eligible data breach occurs that is likely to result in serious harm, both the OAIC and affected individuals will be notified as required by law.',
        },
        {
          question: 'Does Disaster Recovery Australia have AML/CTF obligations?',
          answer:
            'No. Disaster Recovery Australia is not a reporting entity under the Anti-Money Laundering and Counter-Terrorism Financing Act 2006. No designated services are provided under that Act, so AML/CTF customer identification or transaction monitoring obligations do not apply.',
        },
      ]}
      relatedGuides={[
        { title: 'Cookie Policy', href: '/cookies' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Contact Us', href: '/contact' },
        { title: 'Lodge a Claim', href: '/claim' },
      ]}
    />
  )
}
