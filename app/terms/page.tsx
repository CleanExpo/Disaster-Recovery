import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import Link from 'next/link';

const LAST_UPDATED = '23 April 2026';

export const metadata: Metadata = {
  title: 'Terms of Service | Disaster Recovery',
  description:
    'Terms of Service for Disaster Recovery. Conditions of use for emergency restoration matching services across Australia and New Zealand.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/terms',
  },
  openGraph: {
    title: 'Terms of Service | Disaster Recovery',
    description: 'Terms and conditions for Disaster Recovery restoration matching services.',
    type: 'website',
  },
};

export default function TermsOfService() {
  return (
    <AgGuidePageTemplate
      category="Legal"
      title="Terms of Service"
      subtitle={`Conditions of use for the Disaster Recovery platform. Last updated ${LAST_UPDATED}.`}
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<FileText className="h-10 w-10" />}
      lastReviewed={LAST_UPDATED}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]}
      cta={{ text: 'Contact Us', href: '/contact' }}
      sections={[
        {
          heading: 'About These Terms',
          body: (
            <>
              <p>
                These Terms of Service govern your use of the Disaster Recovery platform operated by
                National Restoration Professionals Group Pty Ltd (ABN 85 151 794 142) trading as
                Disaster Recovery (<em>&quot;we&quot;</em>, <em>&quot;us&quot;</em>,{' '}
                <em>&quot;our&quot;</em>).
              </p>
              <p style={{ marginTop: '1rem' }}>
                By submitting a claim or otherwise using our platform, you agree to these terms. If
                you do not accept them, do not use the platform.
              </p>
            </>
          ),
        },
        {
          heading: 'What We Do',
          background: 'light',
          body: (
            <>
              <p>
                We operate a claim-intake and contractor-matching platform. When you submit a claim
                we match it to a restoration contractor in our network. The attending contractor
                performs the works and contracts directly with you. We are not the supplier of the
                restoration services.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Network contractors are required to hold current IICRC certification and applicable
                state/territory licences as a condition of network participation.
              </p>
            </>
          ),
        },
        {
          heading: 'Australian Consumer Law',
          body: (
            <>
              <p>
                Our services come with guarantees that cannot be excluded under the Australian
                Consumer Law (ACL). Nothing in these terms excludes, restricts, or modifies any
                consumer guarantee, right, or remedy conferred by the ACL where it applies to the
                supply of services to you.
              </p>
              <p style={{ marginTop: '1rem' }}>
                If you are acquiring our services in the course of a business, some provisions of
                the ACL may be modified to the extent permitted by section 64A of the ACL.
              </p>
            </>
          ),
        },
        {
          heading: 'Governing Law and Jurisdiction',
          background: 'light',
          body: (
            <>
              <p>
                These terms are governed by the laws of Queensland, Australia, and the
                non-excludable laws of the Commonwealth of Australia.
              </p>
              <p style={{ marginTop: '1rem' }}>
                You may refer any unresolved dispute to the Australian Financial Complaints
                Authority (AFCA) where eligible, or to a Queensland court of competent jurisdiction.
                Nothing in these terms limits any non-excludable right you have to bring proceedings
                in your state or territory of residence.
              </p>
            </>
          ),
        },
        {
          heading: 'New Zealand Consumers — Supplementary Terms',
          body: (
            <>
              <p>
                These supplementary terms apply if you are a consumer ordinarily resident in New
                Zealand or the services you request are to be supplied to a property located in New
                Zealand. Where these supplementary terms conflict with the main terms, these
                supplementary terms prevail for New Zealand consumers.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Consumer rights.</strong> Nothing in our terms excludes, restricts, or
                modifies any right or remedy you have under the Consumer Guarantees Act 1993 (CGA),
                the Fair Trading Act 1986 (FTA), or the Privacy Act 2020, where those statutes apply
                to the supply of our services to you.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Services guarantees.</strong> Where services are supplied to a New Zealand
                consumer, those services come with guarantees that cannot be excluded under the CGA,
                including reasonable care and skill (s28), fitness for particular purpose (s29),
                completion within a reasonable time (s30), and supply at a reasonable price where no
                price is fixed (s31).
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Goods guarantees.</strong> Where goods form part of the supply, those goods
                come with guarantees under the CGA including acceptable quality (s6), fitness for
                particular purpose (s8), correspondence with description (s9), and correspondence
                with sample (s10).
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Fair Trading Act.</strong> We will not engage in misleading or deceptive
                conduct, make false or misleading representations, or engage in unsubstantiated
                representations in breach of the FTA. If a statement on our website or marketing is
                inaccurate in relation to services to be supplied in New Zealand, please notify us
                and we will correct it.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Business customers.</strong> If you are acquiring our services for the
                purposes of a business, you and we agree that the CGA and sections 9, 12A, 13, and
                14(1) of the FTA do not apply to the extent permitted by section 43 of the CGA and
                section 5D of the FTA, and it is fair and reasonable for the parties to be bound by
                that arrangement.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Privacy.</strong> We collect, hold, use and disclose personal information in
                accordance with the Privacy Act 2020. See our{' '}
                <Link href="/privacy" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>
                . By submitting a claim you acknowledge that your personal information may be
                transferred to Australia and disclosed to contractors, insurers, and service
                providers necessary to fulfil your claim. You may lodge a complaint with the Office
                of the Privacy Commissioner at{' '}
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
              <p style={{ marginTop: '1rem' }}>
                <strong>Dispute resolution.</strong> If we cannot resolve a complaint, you may refer
                the dispute to the Disputes Tribunal of New Zealand (claims up to NZD 30,000), the
                District Court of New Zealand, or the Commerce Commission (for FTA matters). Nothing
                in the main terms requiring arbitration or referral to an Australian forum limits
                your right to access a New Zealand court or tribunal where New Zealand law gives you
                that right.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Governing law for NZ consumers.</strong> The main terms are governed by the
                laws of Queensland, Australia. For New Zealand consumers, the non-excludable rights
                and remedies under the CGA, FTA, and Privacy Act 2020 continue to apply regardless
                of that choice of law.
              </p>
            </>
          ),
        },
        {
          heading: 'Changes to These Terms',
          background: 'light',
          body: (
            <>
              <p>
                We may update these terms from time to time. When we make material changes we will
                update the &quot;Last updated&quot; date at the top of this page. Continued use of
                the platform after a change constitutes acceptance of the updated terms, subject to
                your non-excludable consumer rights.
              </p>
              <p style={{ marginTop: '1rem' }}>
                These terms were last reviewed on <strong>{LAST_UPDATED}</strong>.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Who provides the restoration services?',
          answer:
            'The attending network contractor contracts with you directly and provides the restoration services. We operate the claim-intake and contractor-matching platform; we are not the supplier of the restoration works.',
        },
        {
          question: 'Do these terms apply if I am in New Zealand?',
          answer:
            'Yes, with the supplementary NZ terms set out above. Your non-excludable rights under the Consumer Guarantees Act 1993, Fair Trading Act 1986, and Privacy Act 2020 continue to apply regardless of the Queensland choice of law.',
        },
        {
          question: 'Can I go to a tribunal or court in my own state/country?',
          answer:
            'Your non-excludable rights to bring proceedings in your state, territory, or country of residence are preserved. NZ consumers may refer disputes to the Disputes Tribunal of New Zealand (up to NZD 30,000) or the District Court of New Zealand.',
        },
      ]}
      relatedGuides={[
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Cookie Policy', href: '/cookies' },
        { title: 'Contact Us', href: '/contact' },
      ]}
    />
  );
}
