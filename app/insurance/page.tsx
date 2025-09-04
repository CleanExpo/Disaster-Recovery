import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, FileCheck, CheckCircle2, AlertCircle, Users, Clock, MessageSquare} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Insurance Claims Assistance | All Major Australian Insurers | Direct Billing Available',
  description: 'Expert insurance claims assistance for disaster recovery. Work with NRMA, Suncorp, AAMI, QBE, Allianz and all major Australian insurers. Direct billing available.',
  keywords: [
    'insurance claims assistance',
    'disaster recovery insurance',
    'NRMA insurance claims',
    'Suncorp insurance claims',
    'AAMI insurance claims',
    'direct insurance billing',
    'insurance approved contractors',
    'water damage insurance',
    'fire damage insurance',
    'storm damage insurance',
    'mould insurance coverage',
    'insurance claim documentation',
    'restoration insurance claims'
  ],
  openGraph: {
    title: 'Insurance Claims Assistance | All Major Australian Insurers',
    description: 'Expert help with disaster recovery insurance claims. Direct billing available. Work with all major Australian insurance companies.',
    type: 'website',
    images: ['/images/optimised/process/3D Assessment.png'] },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance' }
};

const majorInsurers = [
  { name: 'NRMA Insurance', href: '/insurance/nrma', logo: 'nrma' },
  { name: 'Suncorp', href: '/insurance/suncorp', logo: 'suncorp' },
  { name: 'AAMI', href: '/insurance/aami', logo: 'aami' },
  { name: 'QBE Insurance', href: '/insurance/qbe', logo: 'qbe' },
  { name: 'Allianz', href: '/insurance/allianz', logo: 'allianz' },
  { name: 'CGU Insurance', href: '/insurance/cgu', logo: 'cgu' },
  { name: 'GIO', href: '/insurance/gio', logo: 'gio' },
  { name: 'Budget Direct', href: '/insurance/budget-direct', logo: 'budget-direct' },
  { name: 'RACV', href: '/insurance/racv', logo: 'racv' },
  { name: 'RAA', href: '/insurance/raa', logo: 'raa' },
  { name: 'RAC', href: '/insurance/rac', logo: 'rac' },
  { name: 'RACQ', href: '/insurance/racq', logo: 'racq' }
];

const claimTypes = [
  {
    title: 'Water Damage Claims',
    description: 'Burst pipes, appliance leaks, storm flooding, and water extraction services',
    coverage: 'Typically covered when sudden and accidental',
    icon: '💧'
  },
  {
    title: 'Fire & Smoke Damage',
    description: 'Structural fire damage, smoke cleanup, soot removal, and contents restoration',
    coverage: 'Usually fully covered under comprehensive policies',
    icon: '🔥'
  },
  {
    title: 'Storm Damage',
    description: 'Wind damage, hail damage, fallen trees, and emergency repairs',
    coverage: 'Covered under most home and contents policies',
    icon: '🌪️'
  },
  {
    title: 'Mould Remediation',
    description: 'Mould removal following water damage or sudden moisture events',
    coverage: 'Coverage depends on cause - sudden events usually covered',
    icon: '🦠'
  }
];

const claimsProcess = [
  {
    step: 1,
    title: 'Emergency Contact',
    description: 'Call us immediately after damage occurs. We coordinate with your insurer.',
    action: 'Call Get Help Now'
  },
  {
    step: 2,
    title: 'Initial Assessment',
    description: 'Our certified technicians assess damage and document everything for your claim.',
    action: 'Professional documentation'
  },
  {
    step: 3,
    title: 'Insurance Coordination',
    description: 'We liaise with your insurance company and adjuster throughout the process.',
    action: 'Direct insurance communication'
  },
  {
    step: 4,
    title: 'Restoration Work',
    description: 'Complete restoration work with detailed progress reports to your insurer.',
    action: 'Professional restoration'
  }
];

export default function InsurancePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Insurance Claims Assistance
            </h1>
            <p className="text-xl mb-8">
              Expert help navigating disaster recovery insurance claims with all major Australian insurers. 
              Direct billing available - no upfront costs for approved claims.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <Card className="bg-white/10 backdrop-blur p-4">
                <FileCheck className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Complete Documentation</p>
                <p className="text-sm opacity-90">Detailed reports and photos</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Direct Billing</p>
                <p className="text-sm opacity-90">No upfront costs</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">Claims Support</p>
                <p className="text-sm opacity-90">Full process assistance</p>
              </Card>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="mr-2" />
                Start Your Claim: Get Help Now
              </Button>
              <Link
                href="/book-service?source=insurance"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colours"
              >
                Submit Insurance Claim
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Major Insurance Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            We Work With All Major Australian Insurers
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {majorInsurers.map((insurer, index) => (
                <Link
                  key={index}
                  href={insurer.href}
                  className="group"
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow group-hover:bg-blue-50">
                    <div className="h-16 flex items-center justify-center mb-3">
                      <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-800">
                        {insurer.name.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm">{insurer.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Don't see your insurer? We work with all Australian insurance companies.
              </p>
              <Link
                href="/contact"
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                Contact us about your specific insurer →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Types of Claims We Handle
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {claimTypes.map((claim, index) => (
                <Card key={index} className="p-6 bg-white shadow-md">
                  <div className="flex items-start">
                    <span className="text-4xl mr-4">{claim.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{claim.title}</h3>
                      <p className="text-gray-700 mb-4">{claim.description}</p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                          <span className="text-sm text-green-800">{claim.coverage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Claims Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Handle Your Insurance Claim
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {claimsProcess.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="p-6">
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                        {item.action}
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation We Provide */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Insurance Documentation We Provide
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Assessment & Documentation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Pre-loss condition photographs and videos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Detailed damage assessment reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Moisture readings and thermal imaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Scope of work and repair estimates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Material lists and labour breakdowns</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Progress & Completion</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Daily work progress reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Equipment placement diagrams</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Moisture monitoring logs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Final completion certificates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                    <span>Post-remediation verification tests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Working With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Insurance Claims Service
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Insurance Approved</h3>
                <p className="text-gray-700">
                  Pre-approved by major insurers with established relationships and preferred provider status
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Expert Documentation</h3>
                <p className="text-gray-700">
                  Comprehensive documentation that meets insurance requirements and maximizes claim approval
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Billing</h3>
                <p className="text-gray-700">
                  No upfront costs - we bill your insurance company directly for approved claims
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold mb-3">Claims Advocacy</h3>
                <p className="text-gray-700">
                  We advocate for you throughout the claims process, ensuring fair treatment and full coverage
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Emergency Response</h3>
                <p className="text-gray-700">
                  24/7 emergency response to prevent further damage and document initial conditions immediately
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Guaranteed Work</h3>
                <p className="text-gray-700">
                  All restoration work is guaranteed and warranty-backed for your peace of mind
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-yellow-50 border-t-4 border-blue-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <AlertCircle className="w-8 h-8 text-yellow-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-yellow-800 mb-3">
                  Important Information About Insurance Coverage
                </h3>
                <div className="space-y-3 text-yellow-800">
                  <p>
                    <strong>Time is Critical:</strong> Contact us immediately after damage occurs. 
                    Delays can affect coverage and lead to secondary damage.
                  </p>
                  <p>
                    <strong>Coverage Varies:</strong> Not all damage is covered by insurance. 
                    Sudden and accidental events are typically covered, while gradual damage may not be.
                  </p>
                  <p>
                    <strong>Document Everything:</strong> Take photos and videos before we arrive, 
                    but don't attempt cleanup as this may affect your claim.
                  </p>
                  <p>
                    <strong>Professional Assessment Required:</strong> Insurance companies typically 
                    require professional assessment and restoration for coverage approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Help With Your Insurance Claim?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't navigate the claims process alone. Our insurance experts are ready to help 
            you get the coverage you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colours"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Call: Get Help Now
            </a>
            <Link
              href="/book-service?source=insurance"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition-colours"
            >
              Start Insurance Claim
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}