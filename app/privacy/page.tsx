/**
 * Privacy Policy — Australian Privacy Principles (APP 1–13) compliant
 *
 * DR-327 / DR-328: Updated for OAIC compliance sweep and Privacy Act
 * small business exemption removal (1 July 2026).
 *
 * Entity: National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142)
 * Trading as: Disaster Recovery Australia
 * Website: disasterrecovery.com.au
 */

import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Disaster Recovery Australia',
  description:
    'How Disaster Recovery Australia (National Restoration Professionals Group Pty Ltd) collects, uses, stores, and discloses your personal information under the Australian Privacy Act 1988.',
  alternates: {
    canonical: `${NAP.url}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | Disaster Recovery Australia',
    description:
      'Our privacy policy — how we handle your personal information in accordance with the Australian Privacy Principles.',
    url: `${NAP.url}/privacy`,
    type: 'website',
  },
}

const LAST_UPDATED = '8 April 2026'
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
                This Privacy Policy describes how <strong>{ENTITY}</strong> (ABN {ABN}), trading as <strong>{TRADING_AS}</strong> (<em>&quot;we&quot;</em>, <em>&quot;us&quot;</em>, <em>&quot;our&quot;</em>), manages personal information collected through our website <strong>{WEBSITE}</strong> and our claim intake and contractor matching services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We are bound by the <strong>Australian Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>. This policy sets out how we meet our obligations under APPs 1–13.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using our website or submitting a claim through our platform, you agree to the collection and use of your personal information as described in this policy.
              </p>
            </>
          ),
        },
        {
          heading: 'What Personal Information We Collect',
          background: 'light',
          body: (
            <>
              <p>We collect personal information that is reasonably necessary to match you with a certified restoration contractor and to support your insurance claim process. This includes:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Identity information</strong> — full name</li>
                <li><strong>Contact information</strong> — phone number, email address</li>
                <li><strong>Property information</strong> — street address, suburb, state, postcode, property type</li>
                <li><strong>Damage information</strong> — description of damage, affected areas, date of damage, photographs</li>
                <li><strong>Insurance information</strong> — insurance company name, policy number, claim number, excess amount</li>
                <li><strong>Payment information</strong> — payment card details processed by our payment provider (Stripe). We do not store card numbers.</li>
                <li><strong>Communication records</strong> — records of your interactions with our platform and the assigned contractor</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We collect this information directly from you when you submit a claim through our platform (APP 3). We do not collect sensitive information (as defined by the Privacy Act) unless it is necessary for your claim and you have consented to its collection.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Where it is lawful and practicable to do so, you may use our website anonymously or by pseudonym (APP 2). However, the claim intake process requires identification to enable contractor matching and insurance liaison.
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
                <li>Matching your claim with a certified IICRC restoration contractor in our network</li>
                <li>Enabling the assigned contractor to contact you and schedule an inspection</li>
                <li>Enabling the contractor to liaise with your insurer on your behalf (where authorised)</li>
                <li>Processing the platform fee payment via Stripe</li>
                <li>Maintaining records of completed restoration work for warranty and compliance purposes</li>
                <li>Improving our platform and contractor matching processes</li>
                <li>Complying with our legal obligations</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We will not collect personal information that is not reasonably necessary for one of these purposes (APP 3.3).
              </p>
            </>
          ),
        },
        {
          heading: 'How We Use and Disclose Your Information (APP 6)',
          background: 'light',
          body: (
            <>
              <p>We use and disclose your personal information only for the primary purposes for which it was collected, or for related secondary purposes that you would reasonably expect.</p>
              <p style={{ marginTop: '1rem' }}>Your personal information may be disclosed to:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>The assigned NRPG contractor</strong> — who receives your contact details, property address, damage description, and insurance details to perform the restoration work</li>
                <li><strong>Your insurance company</strong> — where you have authorised the contractor to liaise with your insurer</li>
                <li><strong>Stripe</strong> — our payment processor, which receives payment card data to process the platform fee. Stripe operates under its own privacy policy.</li>
                <li><strong>Our technology providers</strong> — cloud hosting, database, and email delivery services that process data on our behalf under data processing agreements</li>
                <li><strong>Regulatory and government bodies</strong> — where required by law, including the OAIC, AFCA, or courts</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We do not sell, rent, or trade your personal information to third parties for marketing purposes (APP 7).
              </p>
            </>
          ),
        },
        {
          heading: 'Cross-Border Disclosure (APP 8)',
          body: (
            <>
              <p>
                Some of the technology providers we use to operate our platform may store or process data outside Australia — including cloud infrastructure providers operating in the United States and other jurisdictions. Where we disclose personal information to overseas recipients, we take reasonable steps to ensure those recipients handle your information in a manner consistent with the Australian Privacy Principles, including through contractual data processing agreements.
              </p>
              <p style={{ marginTop: '1rem' }}>
                By using our platform, you consent to the potential disclosure of your personal information to overseas recipients for the purpose of operating our services, where such disclosure is necessary.
              </p>
            </>
          ),
        },
        {
          heading: 'AI-Assisted Features and Automated Processing',
          body: (
            <>
              <p>
                Our platform includes a multilingual interface powered by an AI language model — specifically <strong>Gemma 4</strong>, developed by Google DeepMind and accessed via Google&apos;s generative AI services. This model is used solely to translate UI text, page headings, form labels, and informational content into 23 languages, enabling users across the Asia-Pacific region and beyond to access our services in their preferred language.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>What the AI model does and does not process:</strong> The translation feature sends page content and interface strings to the AI model. It does <em>not</em> send your personal information — including your name, address, contact details, damage description, insurance information, or claim details — to the AI model. Personal information you submit through our claim intake form is handled entirely within our own systems and is not passed to any AI translation service.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Contractor matching and automated decisions:</strong> Matching your claim with an NRPG network contractor is performed by our internal contractor matching system based on location, damage category, and contractor availability. This process does not constitute automated decision-making that has a legal or similarly significant effect on you. A human contractor reviews your claim details and makes all decisions relating to the provision of restoration services. No automated system determines your entitlements, your insurance outcome, or the scope of work — those decisions rest with the contractor and your insurer.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Cross-border processing:</strong> Google&apos;s AI services process translation requests on servers that may be located outside Australia, including in the United States. This processing is limited to UI strings and informational content (not personal information), and is consistent with the cross-border disclosure above (APP 8). We rely on Google&apos;s data processing agreements and contractual safeguards to ensure appropriate handling of any data transmitted to these services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This disclosure is made in accordance with <strong>APP 3</strong> (transparency about collection practices) and <strong>APP 8</strong> (cross-border disclosure), and reflects our commitment to transparency ahead of the Privacy Act amendments taking effect 1 July 2026.
              </p>
            </>
          ),
        },
        {
          heading: 'How We Protect Your Information (APP 11)',
          background: 'light',
          body: (
            <>
              <p>We take reasonable steps to protect the personal information we hold from misuse, interference, loss, and unauthorised access, modification, or disclosure. Our security measures include:</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>TLS encryption for all data transmitted through our website and API</li>
                <li>Access controls limiting personal information to authorised personnel and the assigned contractor</li>
                <li>Payment card data handled exclusively by Stripe — we do not store card numbers on our systems</li>
                <li>Database encryption at rest for stored personal information</li>
                <li>Regular security reviews of our platform infrastructure</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Data retention:</strong> We retain personal information for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Claim records are typically retained for 7 years following completion of work to satisfy insurance and warranty obligations. You may request deletion of your personal information where we have no ongoing legal obligation to retain it (see &quot;Your Rights&quot; below).
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Notifiable Data Breaches:</strong> We comply with the Notifiable Data Breaches (NDB) scheme under the Privacy Act. If we become aware of an eligible data breach that is likely to result in serious harm to affected individuals, we will notify the OAIC and affected individuals as required.
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
                <li><strong>Access</strong> the personal information we hold about you (APP 12)</li>
                <li><strong>Correct</strong> personal information that is inaccurate, out of date, incomplete, or misleading (APP 13)</li>
                <li><strong>Request deletion</strong> of your personal information where we have no ongoing legal obligation to retain it</li>
                <li><strong>Make a complaint</strong> about how we handle your personal information</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                To exercise any of these rights, contact us through our{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
                We will respond to access and correction requests within 30 days. There is no charge for making a request, though we may charge a reasonable fee to cover the cost of providing access where permitted by law.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If we refuse an access or correction request, we will provide you with written reasons and information about how to complain to the OAIC.
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
                If you believe we have handled your personal information in breach of the Australian Privacy Principles, you may lodge a complaint with us by using our{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
                We will acknowledge your complaint within 5 business days and aim to resolve it within 30 days.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If you are not satisfied with our response, you may escalate your complaint to the <strong>Office of the Australian Information Commissioner (OAIC)</strong> at{' '}
                <a href={OAIC_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>oaic.gov.au</a>{' '}
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
                Our website uses cookies and similar technologies to support site functionality and understand how visitors use the site. For detailed information about the cookies we use and how to manage them, see our{' '}
                <Link href="/cookies" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Cookie Policy</Link>.
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
                We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This policy was last reviewed and updated on <strong>{LAST_UPDATED}</strong> to reflect the removal of the Privacy Act small business exemption effective 1 July 2026, and in response to the OAIC&apos;s 2026 privacy compliance sweep targeting property-adjacent service sectors.
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
  )
}
