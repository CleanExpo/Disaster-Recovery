import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Assessment Services | Property Damage Evaluation | NRP Australia',
  description: 'Professional technical assessment and damage evaluation services. IICRC certified inspectors provide comprehensive reports for insurance claims and restoration planning.',
  keywords: [
    'technical assessment',
    'property damage evaluation',
    'moisture detection',
    'thermal imaging',
    'structural damage assessment',
    'insurance inspection',
    'damage documentation',
    'restoration planning'
  ] };

export default function TechnicalAssessmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technical Assessment & Damage Evaluation
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Comprehensive property damage assessment by certified technical specialists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Emergency: online support</a>
              <a
                href="/contact"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Comprehensive Assessment Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">📷</div>
                <h3 className="text-xl font-semibold mb-3">Thermal Imaging Inspection</h3>
                <p className="text-gray-600">Advanced infrared technology to detect hidden moisture, structural issues, and temperature variations.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">💧</div>
                <h3 className="text-xl font-semibold mb-3">Moisture Detection & Mapping</h3>
                <p className="text-gray-600">Precise moisture measurement using calibrated meters and comprehensive mapping of affected areas.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold mb-3">Structural Damage Assessment</h3>
                <p className="text-gray-600">Professional evaluation of structural integrity and safety concerns following water, fire, or storm damage.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🌬️</div>
                <h3 className="text-xl font-semibold mb-3">Air Quality Testing</h3>
                <p className="text-gray-600">Comprehensive testing for mould spores, bacteria, and other airborne contaminants.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-3">Insurance Documentation</h3>
                <p className="text-gray-600">Detailed reporting and photography for insurance claims and adjuster communication.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">📐</div>
                <h3 className="text-xl font-semibold mb-3">Restoration Planning</h3>
                <p className="text-gray-600">Technical specifications and scope development for restoration contractors and project management.</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Why Choose Our Technical Assessment Services?</h2>
              <p>
                Accurate damage assessment is critical for effective restoration and insurance claims. Our certified technical 
                specialists use advanced diagnostic equipment to provide detailed evaluations and documentation for all types 
                of property damage.
              </p>
              
              <h3>Our Certifications Include:</h3>
              <ul>
                <li>IICRC Water Damage Restoration Technician</li>
                <li>IICRC Applied Structural Drying Technician</li>
                <li>IICRC Mould Remediation Specialist</li>
                <li>Thermal Imaging Level I Certified</li>
                <li>Indoor Environmental Professional (IEP)</li>
                <li>Australian Standard AS/NZS 3666 Compliance</li>
              </ul>

              <h3>Our Process</h3>
              <ol>
                <li>Initial site safety assessment</li>
                <li>Visual inspection and documentation</li>
                <li>Thermal imaging and moisture mapping</li>
                <li>Air quality and environmental testing</li>
                <li>Structural integrity evaluation</li>
                <li>Digital documentation and photography</li>
                <li>Detailed technical report preparation</li>
                <li>Restoration scope and specifications</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency Assessment Services</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            When property damage occurs, rapid assessment is essential to prevent further damage and begin the restoration 
            process. Our technical specialists provide 24/7 emergency assessment services.
          </p>
          <a
            href="#contact-form"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Use Our Online Form'
          </a>
        </div>
      </section>
    </div>
  );
}