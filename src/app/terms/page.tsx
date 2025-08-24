import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Disaster Recovery Australia - Emergency restoration and disaster recovery services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <section>
            <p className="text-sm text-gray-600 mb-6">Effective Date: {new Date().toLocaleDateString('en-AU')}</p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700">
              By accessing or using Disaster Recovery Australia's services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Emergency Services</h2>
            <div className="space-y-3 text-gray-700">
              <p>Our emergency disaster recovery services include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>24/7 emergency response for water, fire, and storm damage</li>
                <li>Mould remediation and biohazard cleanup</li>
                <li>Structural drying and dehumidification</li>
                <li>Insurance claim assistance and documentation</li>
                <li>Commercial and residential restoration</li>
              </ul>
              <p className="mt-4">
                Response times may vary based on location, weather conditions, and service demand. 
                We strive to provide the fastest possible response to all emergency situations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Areas</h2>
            <div className="space-y-3 text-gray-700">
              <p>We provide services across Australia, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All major metropolitan areas</li>
                <li>Regional centers and surrounding areas</li>
                <li>Remote locations (additional charges may apply)</li>
              </ul>
              <p className="mt-4">
                Service availability in specific areas may be provided through our network of certified partner restoration companies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Lead Distribution System</h2>
            <div className="space-y-3 text-gray-700">
              <h3 className="text-lg font-semibold mt-4">For Customers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your service request may be assigned to a qualified partner in your area</li>
                <li>Partners are vetted and certified restoration professionals</li>
                <li>You will be contacted within 30 minutes for emergency services</li>
                <li>Standard response time is 2-4 hours for non-emergency services</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-4">For Partner Restorers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Leads are distributed based on location, specialization, and availability</li>
                <li>Lead cost is $550 for qualified, high-value leads</li>
                <li>Partners must maintain minimum service standards</li>
                <li>Invalid or duplicate leads will be credited</li>
                <li>Payment terms: Net 7 days from lead delivery</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Pricing and Payment</h2>
            <div className="space-y-3 text-gray-700">
              <p>Service pricing:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Emergency call-out fees may apply</li>
                <li>Quotes provided after initial assessment</li>
                <li>Insurance direct billing available</li>
                <li>Payment plans available for non-insurance work</li>
                <li>All prices include GST</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Insurance Claims</h2>
            <div className="space-y-3 text-gray-700">
              <p>We assist with insurance claims by:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Documenting all damage with photos and reports</li>
                <li>Providing detailed scope of work</li>
                <li>Direct communication with insurance adjusters</li>
                <li>Managing the entire claims process</li>
              </ul>
              <p className="mt-4">
                Note: We are not insurance brokers or adjusters. Final claim approval rests with your insurance company.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Warranties and Guarantees</h2>
            <div className="space-y-3 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>All work guaranteed for 12 months</li>
                <li>IICRC certified technicians</li>
                <li>Australian Standards compliant</li>
                <li>Full insurance and licensing</li>
                <li>Satisfaction guarantee on all services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitations of Liability</h2>
            <div className="space-y-3 text-gray-700">
              <p>Disaster Recovery Australia's liability is limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The cost of re-performing the service</li>
                <li>Refund of amounts paid for unsatisfactory service</li>
                <li>We are not liable for pre-existing damage</li>
                <li>Force majeure events exempt us from liability</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including text, graphics, logos, and software, is the property of 
              Disaster Recovery Australia and protected by Australian copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Dispute Resolution</h2>
            <div className="space-y-3 text-gray-700">
              <p>Any disputes will be resolved through:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Direct negotiation between parties</li>
                <li>Mediation through a qualified mediator</li>
                <li>Arbitration under Australian law</li>
                <li>Legal proceedings in Australian courts</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this website. 
              Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
              <p className="font-semibold">Disaster Recovery Australia</p>
              <p>Email: legal@disasterrecovery.com.au</p>
              <p>Phone: 1300 DISASTER (1300 347 278)</p>
              <p>Address: Brisbane, Australia</p>
              <p>ABN: [To be provided]</p>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              These Terms of Service are governed by the laws of Australia.
              By using our services, you consent to the exclusive jurisdiction of Australian courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
