import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | NRPG — National Restoration Professionals Group',
  description:
    'Privacy Policy for NRPG (disasterrecovery.com.au) — how we collect, use, and protect your personal information in accordance with the Privacy Act 1988 (Cth).',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#1C2E47] mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          Effective date: 15 April 2026 | Organisation: National Restoration Professionals Group (NRPG)
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">

          {/* APP 3 Collection Notice */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[#1C2E47] mb-3">
              Collection Notice (Australian Privacy Principles — APP 3)
            </h2>
            <p className="text-gray-700 text-sm mb-2">
              National Restoration Professionals Group (NRPG) collects your personal information — including your name, contact
              details, property address, and insurance claim information — for the purpose of providing independent insurance
              advocacy and claim dispute services.
            </p>
            <p className="text-gray-700 text-sm">
              If you do not provide the requested information, NRPG may not be able to assess your claim or provide advocacy
              services. Your information is handled in accordance with the <em>Privacy Act 1988</em> (Cth).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">1. Information We Collect</h2>
            <div className="space-y-3 text-gray-700">
              <p>When you contact NRPG for insurance advocacy services, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Property details and address</li>
                <li>Insurance policy information (insurer name, policy number, claim number)</li>
                <li>Damage assessment information and photographs</li>
                <li>Communication records relating to your claim</li>
              </ul>
              <p className="mt-4 font-medium">
                We do not collect copies of identity documents (passports, driver&apos;s licences, or other government-issued ID)
                as part of our standard intake process.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">2. Purpose of Collection</h2>
            <div className="space-y-3 text-gray-700">
              <p>NRPG collects and uses your personal information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assessing your insurance claim and identifying applicable coverage</li>
                <li>Preparing and lodging dispute submissions to the Australian Financial Complaints Authority (AFCA)</li>
                <li>Liaising with your insurer and their assessors on your behalf</li>
                <li>Engaging independent building assessors to prepare damage reports</li>
                <li>Providing updates on your claim progress</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">3. Authorised Disclosures</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                NRPG may share your personal information only where necessary for your advocacy services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>AFCA:</strong> When lodging a formal dispute on your behalf
                </li>
                <li>
                  <strong>Your insurer:</strong> For claim advocacy communication and dispute resolution
                </li>
                <li>
                  <strong>Licensed building assessors:</strong> For independent damage assessment reports
                </li>
                <li>
                  <strong>Legal representatives:</strong> If your dispute requires formal legal escalation (only with your
                  consent)
                </li>
                <li>
                  <strong>Government authorities:</strong> Where required by law
                </li>
              </ul>
              <p className="mt-4 font-medium">
                NRPG does not sell your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">4. Data Security</h2>
            <div className="space-y-3 text-gray-700">
              <p>We protect your information through:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>TLS/SSL encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Access controls limiting information to authorised NRPG personnel</li>
                <li>Regular security reviews</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">5. Data Retention</h2>
            <p className="text-gray-700">
              NRPG retains your personal information for the period necessary to provide advocacy services and for a
              minimum of 7 years thereafter, to comply with applicable legal obligations. We do not retain full copies
              of identity documents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">6. Your Rights</h2>
            <div className="space-y-3 text-gray-700">
              <p>Under the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information NRPG holds about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your information (subject to legal retention obligations)</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at{' '}
                  <a
                    href="https://www.oaic.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1C2E47] underline"
                  >
                    oaic.gov.au
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">7. AML/CTF Statement</h2>
            <p className="text-gray-700">
              NRPG has assessed its obligations under the <em>Anti-Money Laundering and Counter-Terrorism Financing Act 2006</em>{' '}
              (Cth) and the 2024 Tranche 2 amendments effective 1 July 2026. NRPG does not retain copies of customer
              identity documents. NRPG&apos;s obligations as a reporting entity under Tranche 2 are subject to ongoing legal
              review; this statement will be updated upon receipt of formal legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">8. Cookies and Tracking</h2>
            <div className="space-y-3 text-gray-700">
              <p>Our website uses:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies required for website functionality</li>
                <li>Analytics cookies to improve user experience (Google Analytics)</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings, though this may affect website functionality. We do
                not use cookies to identify you personally without your consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700">
              NRPG may update this Privacy Policy to reflect changes in law or practice. Material changes will be
              notified via this page with an updated effective date. Continued use of our services after notification
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#1C2E47] mb-4">10. Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>For privacy-related questions, access requests, or complaints:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">National Restoration Professionals Group (NRPG)</p>
                <p>Email: privacy@disasterrecovery.com.au</p>
                <p>Website:{' '}
                  <Link href="/contact" className="text-[#1C2E47] underline">
                    Contact Form
                  </Link>
                </p>
                <p>Location: Brisbane, Queensland, Australia</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                If you are unsatisfied with our response, you may escalate to the OAIC at{' '}
                <a
                  href="https://www.oaic.gov.au/privacy/privacy-complaints"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  oaic.gov.au/privacy/privacy-complaints
                </a>
                .
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
