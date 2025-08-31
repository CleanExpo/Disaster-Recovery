import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Biohazard Cleanup Services | NRP Australia',
  description: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
  keywords: [
    'biohazard cleanup',
    'crime scene cleanup',
    'trauma scene cleanup',
    'biohazard decontamination',
    'bloodborne pathogen cleanup',
    'infectious waste removal',
    'hazmat cleanup',
    'OSHA compliance cleanup'
  ],
};

export default function BiohazardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Biohazard Cleanup Services
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Expert decontamination and biohazard remediation by certified specialists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form"
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Emergency: 1300 BIOHAZARD
              </a>
              <a
                href="/contact"
                className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition"
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
              Comprehensive Biohazard Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-3">Crime Scene Cleanup</h3>
                <p className="text-gray-600">Professional cleanup and decontamination of crime scenes with compassionate, discreet service.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🩺</div>
                <h3 className="text-xl font-semibold mb-3">Trauma Scene Cleanup</h3>
                <p className="text-gray-600">Specialised cleanup of traumatic incidents including accidents, suicides, and unattended deaths.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🩸</div>
                <h3 className="text-xl font-semibold mb-3">Bloodborne Pathogen Cleanup</h3>
                <p className="text-gray-600">Safe removal and disposal of blood and other potentially infectious materials (OPIM).</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🗂️</div>
                <h3 className="text-xl font-semibold mb-3">Infectious Waste Removal</h3>
                <p className="text-gray-600">Proper handling and disposal of medical waste, sharps, and contaminated materials.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">⚗️</div>
                <h3 className="text-xl font-semibold mb-3">Drug Lab Cleanup</h3>
                <p className="text-gray-600">Specialised remediation of illegal drug manufacturing sites and chemical contamination.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-3xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold mb-3">Hoarding Cleanup</h3>
                <p className="text-gray-600">Compassionate cleanup of hoarding situations with biohazard considerations.</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Why Choose Our Biohazard Cleanup Services?</h2>
              <p>
                When biohazardous situations occur, professional remediation is essential for safety and legal compliance. 
                Our certified biohazard cleanup specialists provide comprehensive decontamination services following strict 
                OSHA and EPA protocols.
              </p>
              
              <h3>Our Certifications Include:</h3>
              <ul>
                <li>OSHA Bloodborne Pathogen Training</li>
                <li>IICRC Applied Microbial Remediation Technician</li>
                <li>DOT Hazardous Materials Transport</li>
                <li>EPA Waste Management Compliance</li>
                <li>State Biohazard Remediation License</li>
                <li>Trauma Scene Waste Management</li>
              </ul>

              <h3>Our Process</h3>
              <ol>
                <li>Initial safety assessment and containment setup</li>
                <li>Personal protective equipment (PPE) deployment</li>
                <li>Biohazard material removal and packaging</li>
                <li>EPA-approved disinfection and decontamination</li>
                <li>Air quality testing and verification</li>
                <li>Proper waste disposal and documentation</li>
                <li>Final safety clearance and certification</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Biohazard Response</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Biohazard emergencies require immediate professional response. Our certified technicians are available 
            around the clock to provide discreet, compassionate, and thorough cleanup services.
          </p>
          <a
            href="#contact-form"
            className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Use Our Online Form
          </a>
        </div>
      </section>
    </div>
  );
}