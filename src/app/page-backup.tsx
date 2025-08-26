import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Phone, 
  ArrowRight,
  Award,
  FileCheck,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Monitor,
  DollarSign,
  Target,
  Building,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  ShieldCheck,
  UserCheck,
  Briefcase,
  MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Australia's First Professional Restoration Network | National Restoration Professionals (NRP)",
  description: "Connect directly with certified restoration professionals. No third-party administrators. IICRC certified, fully insured, and accountable. Get professional help now.",
  keywords: "NRP, National Restoration Professionals, restoration network, IICRC certified, professional restoration, disaster recovery, water damage, fire damage, storm damage",
  openGraph: {
    title: "Australia's First Professional Restoration Network - NRP",
    description: "When Disaster Strikes, Professionals Respond. Certified - Insured - Professional - Accountable",
    images: ['/images/logos/nrp/nrp-badge-3d.png'],
  }
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* NRP Badge */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/logos/nrp/nrp-badge-3d.png"
                alt="National Restoration Professionals"
                className="h-32 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Australia's First Professional Restoration Network
            </h1>
            <p className="text-xl sm:text-2xl text-blue-600 font-semibold mb-2">
              When Disaster Strikes, Professionals Respond
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Certified - Insured - Professional - Accountable
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect directly with National Restoration Professionals (NRP) - Australia's premier network of qualified restoration specialists
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-help">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Professional Help Now
                </Button>
              </Link>
              <Link href="/locations">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Your Local NRP Professional
                </Button>
              </Link>
              <Link href="#comparison">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Learn Why We're Different
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Current System is Failing Australian Homeowners
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Administrative Incompetence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Third-party administrators without restoration experience making critical decisions from office chairs
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Unqualified Builders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Builders managing restoration without specialized cleaning and remediation expertise
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Cost-Cutting Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Cheapest bidder approach compromising quality and safety standards
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Claim Delays</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Delayed claims processing due to inexperience and administrative burden
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>No Accountability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  No accountability when restoration goes wrong or takes too long
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Statistical Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Average delays: 4-12 months</li>
                  <li>• Secondary damage: +40%</li>
                  <li>• Compensation: Up to $6,300</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Introducing National Restoration Professionals (NRP)
            </h2>
            <p className="text-xl text-gray-600">Revolutionary Approach to Restoration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Direct Professional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  No third-party administrators between you and qualified restoration experts
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <Award className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Certified Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  All contractors hold CPP40421 Certificate IV and IICRC certifications
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <UserCheck className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>100% Verified Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Comprehensive background checks by independent investigation specialists
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <FileCheck className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Real-time Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Advanced Clean Claims technology ensuring complete transparency
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <Brain className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>AI-Powered Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  CARSI artificial intelligence eliminates errors and delays
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <ShieldCheck className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Performance Guarantees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Professional indemnity insurance and performance bonds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Standards Comparison */}
      <section id="comparison" className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why NRP Professionals Deliver Superior Results
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Current TPA/Builder Model</th>
                  <th className="px-6 py-4 text-left font-semibold text-blue-900">National Restoration Professionals (NRP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Admin staff making technical decisions</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>IICRC-certified technicians on every project</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No restoration qualifications required</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Mandatory CPP40421 Certificate IV specialized training</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Cost-cutting focus over quality</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional standards with quality guarantees</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Multiple portals and systems</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Single integrated Clean Claims platform</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Manual processes prone to errors</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>AI-automated documentation eliminating mistakes</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>No accountability for delays</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional indemnity insurance and performance bonds</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Generic cleaning approach</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Specialized restoration science and methodology</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          {/* For Homeowners */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Don't Let Your Insurance Claim Be Managed by Unqualified Administrators
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/get-help">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  Get Professional Assessment Now
                </Button>
              </Link>
              <Link href="/insurance">
                <Button size="lg" variant="outline">
                  Check Your Claim Rights
                </Button>
              </Link>
              <Link href="/locations">
                <Button size="lg" variant="ghost">
                  Find Local NRP Professional
                </Button>
              </Link>
            </div>
          </div>

          {/* For Contractors */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Transform Your Restoration Business
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Join Australia's premier restoration network and escape TPA control
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contractors/apply">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Apply for NRP Partnership
                </Button>
              </Link>
              <Link href="/contractors">
                <Button size="lg" variant="outline">
                  Calculate Your Earnings Potential
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-8">
              Professional Accreditations & Security
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm text-gray-600">
              <div>
                <ShieldCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p>IICRC Certified Firm Network</p>
              </div>
              <div>
                <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p>RIA Australasian Member Network</p>
              </div>
              <div>
                <BadgeCheck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p>Professional Standards Authority</p>
              </div>
              <div>
                <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <p>Australian Consumer Law Protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
