import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | RestoreAssist',
  description: 'Privacy policy for the RestoreAssist mobile application.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/restoreassist/privacy-policy',
  },
  robots: { index: true, follow: false },
};

export default function RestoreAssistPrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">RestoreAssist — Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">
        Last updated: 14 April 2026 &nbsp;|&nbsp; Effective: 14 April 2026
      </p>

      <section className="prose prose-gray max-w-none space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">1. Overview</h2>
          <p>
            RestoreAssist is a field operations application developed by Unite-Group NEXUS Pty Ltd
            (ABN 95 691 477 844) (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) for use by
            verified disaster restoration contractors. This policy describes how RestoreAssist
            collects, uses, stores, and protects your personal information in accordance with the
            <em> Privacy Act 1988 (Cth)</em> and the Australian Privacy Principles.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Information Collected</h2>
          <p>RestoreAssist collects the following categories of data when you use the app:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Account information:</strong> Name, email address, mobile number, and
              contractor licence / ABN provided during registration.
            </li>
            <li>
              <strong>Location data:</strong> Precise GPS location is collected while the app is
              in use to assist with job-site navigation and attendance verification. Location is
              not collected in the background.
            </li>
            <li>
              <strong>Photos and media:</strong> Images and videos captured within the app for
              job documentation purposes (before/after records, damage evidence).
            </li>
            <li>
              <strong>Job and work-order data:</strong> Details of assigned jobs, customer
              property addresses, scope notes, and completion records.
            </li>
            <li>
              <strong>Device information:</strong> Device model, operating system version, and
              app version for diagnostic purposes.
            </li>
            <li>
              <strong>Usage data:</strong> App activity logs used to improve reliability and
              detect errors.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. How Information Is Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To authenticate and manage your contractor account</li>
            <li>To assign and track restoration job orders</li>
            <li>To enable real-time communication between contractors and coordinators</li>
            <li>To generate job completion reports shared with property owners and insurers</li>
            <li>To comply with regulatory and licensing obligations</li>
            <li>To improve the reliability and performance of the application</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
          <p>
            Data collected in RestoreAssist is shared only as necessary to provide the service:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong>Disaster Recovery platform:</strong> Job records and documentation are
              shared with the coordinating platform operated by Unite-Group NEXUS Pty Ltd.
            </li>
            <li>
              <strong>Property owners and insurers:</strong> Job completion reports (including
              photos) may be shared with the relevant property owner or their insurer.
            </li>
            <li>
              <strong>Infrastructure providers:</strong> Data is stored on Supabase (cloud
              database) and AWS S3-compatible storage, subject to their privacy and security
              commitments.
            </li>
          </ul>
          <p className="mt-3">
            Data is never sold to third parties and is never used for advertising.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
          <p>
            Account data is retained for the duration of your contractor engagement and for up to
            7 years thereafter to satisfy Australian tax and regulatory obligations. Job
            documentation is retained for a minimum of 7 years. You may request deletion of your
            account at any time (see Section 7).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Security</h2>
          <p>
            All data in transit is encrypted via TLS 1.3. Data at rest is encrypted using
            AES-256. Access to production systems is restricted by role-based access controls
            and multi-factor authentication. We conduct regular security reviews.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Account Deletion</h2>
          <p>
            Contractors may request deletion of their RestoreAssist account and associated
            personal data at any time. Submit a deletion request at:
          </p>
          <p className="mt-2">
            <a
              href="https://disasterrecovery.com.au/restoreassist/delete-account"
              className="text-blue-600 underline"
            >
              https://disasterrecovery.com.au/restoreassist/delete-account
            </a>
          </p>
          <p className="mt-2">
            Requests are processed within 30 days. Certain records may be retained for legal
            compliance as noted in Section 5.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
          <p>Under the Australian Privacy Principles you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Access the personal information held about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and data (subject to legal retention obligations)</li>
            <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">9. Contact</h2>
          <p>
            For privacy enquiries, contact our Privacy Officer via the contact form at{' '}
            <a
              href="https://disasterrecovery.com.au/contact"
              className="text-blue-600 underline"
            >
              disasterrecovery.com.au/contact
            </a>
            .
          </p>
          <p className="mt-2">
            <strong>Unite-Group NEXUS Pty Ltd</strong>
            <br />
            ABN 95 691 477 844
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
          <p>
            Material changes to this policy will be communicated via in-app notification at least
            14 days before they take effect. Continued use of RestoreAssist following the
            effective date constitutes acceptance of the updated policy.
          </p>
        </div>
      </section>
    </main>
  );
}
