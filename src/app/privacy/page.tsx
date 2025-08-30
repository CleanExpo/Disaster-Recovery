import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Disaster Recovery - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <p className="text-sm text-gray-600 mb-6">Effective Date: {new Date().toLocaleDateString('en-AU')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-3 text-gray-700">
              <p>When you contact us for disaster recovery services, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact information (name, email, phone number, address)</li>
                <li>Property details and damage assessment information</li>
                <li>Insurance information (if applicable)</li>
                <li>Photos and documentation of damage</li>
                <li>Communication records and service history</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-3 text-gray-700">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide emergency disaster recovery services</li>
                <li>Coordinate with insurance companies on your behalf</li>
                <li>Schedule and manage restoration work</li>
                <li>Send service updates and important notifications</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <div className="space-y-3 text-gray-700">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our certified restoration technicians and contractors</li>
                <li>Insurance companies (with your consent)</li>
                <li>Partner restoration companies in your service area</li>
                <li>Government agencies as required by law</li>
                <li>Third-party services essential for restoration work</li>
              </ul>
              <p className="mt-4">We never sell your personal information to third parties for marketing purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Lead Distribution for Partners</h2>
            <div className="space-y-3 text-gray-700">
              <p>When you submit a service request:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your information may be shared with qualified restoration partners in your area</li>
                <li>Partners are contractually obligated to protect your information</li>
                <li>Only partners who can service your specific needs receive your information</li>
                <li>You can opt-out of lead sharing at any time</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <div className="space-y-3 text-gray-700">
              <p>We protect your information through:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Limited access to authorised personnel only</li>
                <li>Regular security audits and monitoring</li>
                <li>Compliance with Australian privacy laws</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <div className="space-y-3 text-gray-700">
              <p>Under Australian Privacy Law, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information we hold</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with the Privacy Commissioner</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <div className="space-y-3 text-gray-700">
              <p>Our website uses:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to improve user experience</li>
                <li>Google Analytics for website traffic analysis</li>
                <li>Facebook Pixel for service remarketing</li>
              </ul>
              <p className="mt-4">You can disable cookies in your browser settings, though this may affect website functionality.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>For privacy-related questions or concerns:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Disaster Recovery</p>
                <p>Email: privacy@disasterrecovery.com.au</p>
                <p>Phone: 1300 DISASTER (1300 347 278)</p>
                <p>Address: Brisbane, Queensland, Australia</p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This Privacy Policy complies with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}