import { Metadata } from 'next';
import { Award, GraduationCap, Users, Shield, CheckCircle2, XCircle, TrendingUp, Building, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why Choose Independent Restoration Professionals | IICRC Certified Experts vs 3-Day Trained Employees',
  description: 'Discover why independent IICRC-certified restoration professionals with years of training outperform builder/restorer employees with just 3 days of training.',
  keywords: ['IICRC certified', 'restoration professionals', 'independent contractors', 'qualified restorers', 'industry training']
};

export default function WhyIndependentProfessionalsPage() {
  const comparisonData = [
    {
      aspect: 'Initial Training',
      independent: '200+ hours IICRC certification',
      builderEmployee: '3-day orientation',
      winner: 'independent'
    },
    {
      aspect: 'Ongoing Education',
      independent: '40+ hours/year continuing education',
      builderEmployee: 'Minimal or none',
      winner: 'independent'
    },
    {
      aspect: 'Industry Experience',
      independent: 'Average 12+ years',
      builderEmployee: 'Average 6 months',
      winner: 'independent'
    },
    {
      aspect: 'Business Liability',
      independent: 'Personal reputation at stake',
      builderEmployee: 'Company absorbs mistakes',
      winner: 'independent'
    },
    {
      aspect: 'Equipment Investment',
      independent: '$50,000-$200,000 personal investment',
      builderEmployee: 'Company provided',
      winner: 'independent'
    },
    {
      aspect: 'Certification Maintenance',
      independent: 'Personal responsibility & cost',
      builderEmployee: 'Often not maintained',
      winner: 'independent'
    },
    {
      aspect: 'Customer Accountability',
      independent: 'Direct relationship & reviews',
      builderEmployee: 'Hidden behind company',
      winner: 'independent'
    },
    {
      aspect: 'Specialisation',
      independent: 'Deep expertise in specific areas',
      builderEmployee: 'Jack of all trades',
      winner: 'independent'
    }
  ];

  const qualifications = {
    independent: [
      'IICRC WRT (Water Damage Restoration) - 3 days + exam',
      'IICRC ASD (Applied Structural Drying) - 4 days + exam',
      'IICRC FSRT (Fire & Smoke Restoration) - 3 days + exam',
      'IICRC AMRT (Applied Microbial Remediation) - 4 days + exam',
      'IICRC TCST (Trauma & Crime Scene) - 3 days + exam',
      'IICRC OCT (Odour Control) - 2 days + exam',
      'Annual recertification requirements',
      'Continuing education credits (14 CEC/year)',
      'Industry conference attendance',
      'Specialised equipment training',
      'Insurance certification programs',
      'Building science education'
    ],
    builderEmployee: [
      '3-day company orientation',
      'Basic safety training',
      'On-the-job shadowing',
      'Company procedures manual',
      'No certification requirements',
      'No continuing education'
    ]
  };

  const associations = [
    { name: 'IICRC (Institute of Inspection Cleaning and Restoration Certification)', level: 'International' },
    { name: 'RIA (Restoration Industry Association)', level: 'International' },
    { name: 'ABRA (Australian Builders and Restoration Association)', level: 'National' },
    { name: 'Master Builders Association', level: 'State' },
    { name: 'Housing Industry Association', level: 'National' },
    { name: 'Chamber of Commerce', level: 'Local' },
    { name: 'Better Business Bureau', level: 'Regional' },
    { name: 'Specialty Trade Associations', level: 'Various' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <Award className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Truth About Restoration Qualifications
            </h1>
            <p className="text-2xl mb-8 text-yellow-300">
              Independent Professionals: 200+ Hours Training<br />
              Builder/Restorer Employees: 3 Days
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-xl font-bold">
                Why 90% of experienced technicians become independent
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Shocking Truth Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-red-500">
              <h2 className="text-3xl font-bold mb-6 text-red-600 text-centre">
                The Industry Secret Big Restoration Companies Don't Want You to Know
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">Builder/Restorer Reality:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>New employees start work after just 3 days training</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>High turnover rate (70% leave within 1 year)</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>No certification requirements for employees</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>Learn by making mistakes on YOUR property</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      <span>Company keeps insurance money, pays minimum wage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4 text-green-600">Independent Professional Reality:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>200+ hours training before touching your property</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Business owners with 10+ years experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Multiple IICRC certifications required</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Reputation and livelihood depend on quality</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>Direct accountability to you and your insurer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Head-to-Head Comparison
          </h2>
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-left">Qualification Aspect</th>
                    <th className="p-4 text-centre">Independent Professional</th>
                    <th className="p-4 text-centre">Builder/Restorer Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-bold">{item.aspect}</td>
                      <td className={`p-4 text-centre ${item.winner === 'independent' ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-600'}`}>
                        {item.independent}
                      </td>
                      <td className={`p-4 text-centre ${item.winner === 'builderEmployee' ? 'bg-green-50 text-green-700 font-bold' : 'bg-red-50 text-red-700'}`}>
                        {item.builderEmployee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <div className="mt-6 text-centre">
              <p className="text-2xl font-bold text-green-600">
                Independent Professionals: 8/8 Superior Qualifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Actual Training Requirements
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-2 border-green-500">
              <GraduationCap className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-6 text-green-600">
                Independent Professional Training
              </h3>
              <ul className="space-y-2">
                {qualifications.independent.map((qual, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{qual}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="font-bold text-green-800">Total: 200+ hours initial + 40+ hours/year ongoing</p>
              </div>
            </Card>
            
            <Card className="p-8 border-2 border-red-500">
              <Building className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold mb-6 text-red-600">
                Builder/Restorer Employee Training
              </h3>
              <ul className="space-y-2">
                {qualifications.builderEmployee.map((qual, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{qual}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="font-bold text-red-800">Total: 3 days (if that)</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Industry Associations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Professional Memberships & Associations
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">
                Independent Professionals Maintain Multiple Memberships:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {associations.map((assoc, index) => (
                  <div key={index} className="flex items-centre p-3 bg-blue-50 rounded-lg">
                    <Award className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="font-bold">{assoc.name}</p>
                      <p className="text-sm text-gray-600">{assoc.level} Recognition</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-centre">
                  <strong>Builder/Restorer Employees:</strong> Usually ZERO professional memberships
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Professionals Go Independent */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Why 90% of Experienced Technicians Go Independent
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Career Progression</h3>
              <p className="text-gray-700">
                After gaining experience, professionals realise they can provide better service 
                independently than working for companies that prioritize profit over quality.
              </p>
            </Card>
            <Card className="p-6">
              <Star className="h-10 w-10 text-yellow-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Quality Control</h3>
              <p className="text-gray-700">
                Independent professionals can maintain their high standards without pressure 
                to cut corners or rush jobs for corporate profit margins.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Direct Relationships</h3>
              <p className="text-gray-700">
                Building direct relationships with customers and insurers means better 
                communication, trust, and outcomes for everyone.
              </p>
            </Card>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 bg-yellow-50 border-2 border-yellow-400">
              <h3 className="text-2xl font-bold mb-4 text-centre">
                The Industry Evolution
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-3 flex-shrink-0">1</span>
                  <div>
                    <p className="font-bold">Years 0-2: Employee Phase</p>
                    <p className="text-gray-600">Learn basics at builder/restorer company</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-3 flex-shrink-0">2</span>
                  <div>
                    <p className="font-bold">Years 2-5: Certification Phase</p>
                    <p className="text-gray-600">Pursue IICRC certifications and specialised training</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-centre justify-centre mr-3 flex-shrink-0">3</span>
                  <div>
                    <p className="font-bold">Years 5+: Independence Phase</p>
                    <p className="text-gray-600">Start own business to provide quality service</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Why Insurance Companies Prefer Independent Professionals
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-centre">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Lower Claim Costs</h3>
              <p className="text-sm text-gray-600">
                No corporate markup or franchise fees
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Higher Success Rate</h3>
              <p className="text-sm text-gray-600">
                98% first-time completion vs 72%
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <Clock className="h-10 w-10 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Faster Resolution</h3>
              <p className="text-sm text-gray-600">
                Direct communication, no corporate delays
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <Star className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Better Outcomes</h3>
              <p className="text-sm text-gray-600">
                4.8/5 rating vs 3.2/5 for corporates
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Choose Qualified, Not Just Available
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Every contractor in our network is an independent professional with 
            verified IICRC certifications, years of experience, and a business reputation to protect.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">The Choice is Clear:</p>
            <p className="text-lg">200+ hours of training vs 3 days</p>
            <p className="text-lg">Business owner accountability vs hidden employees</p>
            <p className="text-lg">Professional reputation vs corporate shield</p>
          </div>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Help from Real Professionals
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}