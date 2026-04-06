/**
 * Cookie Policy — Australian Privacy Principles compliant
 *
 * DR-327: Updated for OAIC compliance sweep.
 *
 * Entity: National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142)
 * Trading as: Disaster Recovery Australia
 */

import type { Metadata } from 'next'
import { Cookie } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Disaster Recovery Australia',
  description:
    'How Disaster Recovery Australia uses cookies and similar tracking technologies on our website, and how you can manage your preferences.',
  alternates: {
    canonical: `${NAP.url}/cookies`,
  },
  openGraph: {
    title: 'Cookie Policy | Disaster Recovery Australia',
    description:
      'Our cookie policy — what cookies we use, why, and how to manage them.',
    url: `${NAP.url}/cookies`,
    type: 'website',
  },
}

const LAST_UPDATED = '8 April 2026'
const TRADING_AS = 'Disaster Recovery Australia'
const CONTACT_URL = '/contact'
const PRIVACY_URL = '/privacy'

export default function CookiePolicyPage() {
  return (
    <AgGuidePageTemplate
      category="Legal"
      title="Cookie Policy"
      subtitle={`How ${TRADING_AS} uses cookies and similar technologies on our website. Last updated ${LAST_UPDATED}.`}
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Cookie className="h-10 w-10" />}
      lastReviewed={LAST_UPDATED}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Cookie Policy' },
      ]}
      cta={{ text: 'Contact Us', href: CONTACT_URL }}
      sections={[
        {
          heading: 'What Are Cookies',
          body: (
            <>
              <p>
                Cookies are small text files placed on your device by websites you visit. They are widely used to make websites function correctly, to improve performance, and to provide information to the website operator.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Similar technologies — including local storage, session storage, and pixel tags — serve comparable purposes and are also covered by this policy. We refer to all of these collectively as &quot;cookies&quot; throughout this document.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This Cookie Policy should be read alongside our{' '}
                <Link href={PRIVACY_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Privacy Policy</Link>,
                which sets out how we handle personal information collected through our website and claim intake platform.
              </p>
            </>
          ),
        },
        {
          heading: 'Cookies We Use',
          background: 'light',
          body: (
            <>
              <p>We use the following categories of cookies on our website:</p>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Strictly Necessary Cookies</h4>
                <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                  These cookies are required for the website to function and cannot be switched off. They are set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms. Without these cookies, services you have asked for — such as submitting a claim — cannot be provided.
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: 2, fontSize: '0.9rem' }}>
                  <li><strong>Session cookies</strong> — maintain your session state while you navigate the claim form</li>
                  <li><strong>CSRF tokens</strong> — protect form submissions against cross-site request forgery</li>
                  <li><strong>Authentication cookies</strong> — for logged-in users of the contractor portal</li>
                </ul>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Analytics and Performance Cookies</h4>
                <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                  These cookies allow us to count visits and understand how visitors interact with our website so we can improve performance. All information collected by these cookies is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you have visited our site.
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: 2, fontSize: '0.9rem' }}>
                  <li><strong>Google Analytics (_ga, _gid, _gat)</strong> — page visit counts, traffic sources, and site usage statistics. Data is anonymised before transmission. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Google Privacy Policy</a>.</li>
                  <li><strong>Vercel Analytics</strong> — performance monitoring for our hosting infrastructure. No personal data is retained.</li>
                </ul>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Functional Cookies</h4>
                <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                  These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we use on our pages.
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: 2, fontSize: '0.9rem' }}>
                  <li><strong>Preference cookies</strong> — remember your state, location, or claim type selections</li>
                  <li><strong>Form state cookies</strong> — preserve your progress in multi-step forms if you navigate away</li>
                </ul>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Third-Party Payment Cookies</h4>
                <p style={{ fontSize: '0.9rem', color: '#374151' }}>
                  Where you proceed to payment, Stripe (our payment processor) sets its own cookies to enable secure payment processing and fraud prevention. These cookies are governed by{' '}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Stripe&apos;s Privacy Policy</a>.
                  We do not control these cookies.
                </p>
              </div>

              <p style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: '#F0FDF4', borderRadius: '0.375rem', borderLeft: '4px solid #16A34A', fontSize: '0.9rem' }}>
                <strong>We do not use advertising or targeting cookies.</strong> We do not display advertisements on our website and we do not share data with ad networks or data brokers for marketing purposes.
              </p>
            </>
          ),
        },
        {
          heading: 'How Long Cookies Last',
          body: (
            <>
              <p>Cookies are either <strong>session cookies</strong> (deleted when you close your browser) or <strong>persistent cookies</strong> (remain on your device for a defined period).</p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Session cookies</strong> — deleted at end of browser session. Used for form state and CSRF protection.</li>
                <li><strong>Google Analytics</strong> — the <code>_ga</code> cookie persists for 2 years; <code>_gid</code> for 24 hours.</li>
                <li><strong>Preference cookies</strong> — typically persist for 30 days.</li>
                <li><strong>Stripe cookies</strong> — duration varies; see Stripe&apos;s Privacy Policy.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                You can clear cookies at any time through your browser settings. Clearing cookies may affect website functionality, including resetting form progress.
              </p>
            </>
          ),
        },
        {
          heading: 'Managing Your Cookie Preferences',
          background: 'light',
          body: (
            <>
              <p>You can control and manage cookies in several ways:</p>

              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Browser Settings</h4>
                <p style={{ fontSize: '0.9rem' }}>
                  Most browsers allow you to refuse, delete, or be notified when cookies are set. The method varies by browser:
                </p>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: 2, fontSize: '0.9rem' }}>
                  <li><strong>Chrome</strong> — Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox</strong> — Settings → Privacy &amp; Security → Cookies and Site Data</li>
                  <li><strong>Safari</strong> — Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge</strong> — Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
                <p style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  Please note that disabling strictly necessary cookies will impair the website&apos;s functionality, including the ability to submit a claim.
                </p>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Opt Out of Google Analytics</h4>
                <p style={{ fontSize: '0.9rem' }}>
                  You can prevent Google Analytics from collecting data about your visits by installing the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>.
                </p>
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Do Not Track</h4>
                <p style={{ fontSize: '0.9rem' }}>
                  Some browsers transmit a &quot;Do Not Track&quot; signal to websites. Because there is no agreed standard for how websites should respond, our website does not currently alter its behaviour in response to Do Not Track signals. If a standard is adopted, we will review our approach.
                </p>
              </div>
            </>
          ),
        },
        {
          heading: 'Changes to This Policy',
          body: (
            <>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We encourage you to review this policy periodically. This policy was last updated on <strong>{LAST_UPDATED}</strong>.
              </p>
            </>
          ),
        },
        {
          heading: 'Contact Us',
          background: 'light',
          body: (
            <>
              <p>
                If you have any questions about how we use cookies, or if you would like to exercise your rights under our{' '}
                <Link href={PRIVACY_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>Privacy Policy</Link>,
                please contact us through our{' '}
                <Link href={CONTACT_URL} style={{ color: '#1D4ED8', textDecoration: 'underline' }}>contact form</Link>.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Do you use advertising cookies?',
          answer:
            'No. We do not use advertising or targeting cookies and we do not share data with ad networks or data brokers for marketing purposes.',
        },
        {
          question: 'What happens if I disable cookies?',
          answer:
            'Disabling strictly necessary cookies will prevent key features from working, including the claim submission form. Analytics and preference cookies can be disabled without affecting core functionality, though some personalisation features may not work.',
        },
        {
          question: 'Does Stripe set cookies?',
          answer:
            'Yes. When you proceed to payment, Stripe sets its own cookies for payment processing and fraud prevention. We do not control these cookies. See the Stripe Privacy Policy for details.',
        },
        {
          question: 'How do I delete cookies already on my device?',
          answer:
            'You can delete cookies through your browser settings. In most browsers, go to Settings → Privacy → Clear browsing data, and select "Cookies and other site data". This will remove all cookies for all sites, not just ours.',
        },
      ]}
      relatedGuides={[
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Contact Us', href: '/contact' },
      ]}
    />
  )
}
