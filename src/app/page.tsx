import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  AlertTriangle, Shield, Clock, Users, CheckCircle2, ArrowRight, 
  MapPin, Award, XCircle, Gavel, FileCheck, Scale, AlertOctagon,
  ShieldAlert, Timer, BadgeCheck, UserCheck, HardHat, Briefcase,
  Home, Building, TrendingUp, Phone, HeartHandshake, Target,
  AlertCircle, Banknote, ChevronRight, ShieldCheck, Badge,
  Droplets, Flame
} from 'lucide-react'
import { BUSINESS_NAME } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">24/7 EMERGENCY RESPONSE - PROFESSIONAL NETWORK READY</span>
        </div>
      </div>

      {/* Hero Section - New Value Proposition */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 inline-block">
              <p className="text-lg font-bold text-red-300">The Restoration Professional Network</p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Why Your Restoration Should Be Led by <span className="text-blue-400">Experts</span>, 
              <br />Not <span className="text-red-400">Office Administrators</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-200 max-w-4xl mx-auto">
              The current system is broken: Third-party administrators with no restoration experience 
              control your claim from office desks. We connect you directly with IICRC-certified 
              professionals who have a legal duty of care to restore your property properly.
            </p>

            {/* Key Differentiators */}
            <div className="grid md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20 p-4">
                <Gavel className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <p className="font-bold text-lg">Legal Duty of Care</p>
                <p className="text-sm text-gray-300 mt-1">Unlike TPAs, we're legally obligated to deliver quality</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 p-4">
                <BadgeCheck className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p className="font-bold text-lg">CPP40421 Certified</p>
                <p className="text-sm text-gray-300 mt-1">Specialized restoration qualifications required</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20 p-4">
                <Timer className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p className="font-bold text-lg">10-Day Response</p>
                <p className="text-sm text-gray-300 mt-1">Meeting insurance code requirements</p>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/get-help">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Get Professional Help Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/why-independent-professionals">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-6">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Learn Why TPAs Fail You
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Duty of Care Problem */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              The Duty of Care Problem
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Understanding why the current system fails homeowners
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Current System Failures */}
              <Card className="p-8 bg-red-100 border-red-300">
                <div className="flex items-center mb-4">
                  <XCircle className="h-8 w-8 text-red-600 mr-3" />
                  <h3 className="text-2xl font-bold text-red-900">Current System Failures</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <AlertOctagon className="h-5 w-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">No Restoration Experience</p>
                      <p className="text-sm text-gray-700">TPAs dictate scope without ever seeing your property</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertOctagon className="h-5 w-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">No Legal Accountability</p>
                      <p className="text-sm text-gray-700">TPAs have no duty of care for restoration quality</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertOctagon className="h-5 w-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Builders Managing Restoration</p>
                      <p className="text-sm text-gray-700">Without specialized cleaning & remediation expertise</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertOctagon className="h-5 w-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Stagnant Pricing Models</p>
                      <p className="text-sm text-gray-700">Don't reflect real-world restoration requirements</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Your Legal Rights */}
              <Card className="p-8 bg-green-50 border-green-300">
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-green-900">Your Legal Rights</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">10-Business-Day Response</p>
                      <p className="text-sm text-gray-700">Required under General Insurance Code of Practice</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">4-Month Claim Decision</p>
                      <p className="text-sm text-gray-700">Maximum timeframe (12 months in exceptional cases)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Compensation for Delays</p>
                      <p className="text-sm text-gray-700">Up to $6,300 for unreasonable delays</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Duty of Reasonable Care</p>
                      <p className="text-sm text-gray-700">That TPAs consistently fail to meet</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/insurance">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                  Learn About Your Insurance Rights
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Professional Standards Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Professional Standards Comparison
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              See the difference between office administrators and restoration professionals
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-left font-bold">Service Aspect</th>
                    <th className="p-4 text-center font-bold border-l border-slate-700">
                      <div className="flex items-center justify-center">
                        <XCircle className="h-5 w-5 mr-2 text-red-400" />
                        Current TPA/Builder Model
                      </div>
                    </th>
                    <th className="p-4 text-center font-bold border-l border-slate-700">
                      <div className="flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                        Our Professional Network
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Qualifications</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">No restoration requirements</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">CPP40421 Certificate IV mandatory</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Decision Making</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Admin staff making technical calls</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">IICRC-certified technicians</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Focus</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Cost-cutting over quality</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">Proper restoration standards</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Accountability</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">No liability for delays</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">Legal duty of care</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Approach</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Generic cleaning methods</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">Specialized restoration science</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Training</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Optional or none</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">10+ IICRC CEC courses annually</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-semibold">Response Time</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Days to weeks</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">24-hour emergency response</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-semibold">Industry Recognition</td>
                    <td className="p-4 text-center text-red-700 bg-red-50">Not recognized as trade</td>
                    <td className="p-4 text-center text-green-700 bg-green-50">CARSI certified professionals</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center">
              <Link href="/contractors">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Our Network Standards
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Professional Duty of Care */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Professional Duty of Care
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Real accountability and legal obligations that protect you
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Our Legal Obligations */}
              <Card className="p-8">
                <div className="flex items-center mb-6">
                  <Gavel className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold">Our Legal Obligations to You</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Statutory Duty of Care</p>
                      <p className="text-sm text-gray-600">Under restoration contractor requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Professional Indemnity</p>
                      <p className="text-sm text-gray-600">Coverage for all network members</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">WHS Compliance</p>
                      <p className="text-sm text-gray-600">Documented risk assessments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Building Product Conformity</p>
                      <p className="text-sm text-gray-600">All materials meet Australian standards</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Accountability Framework */}
              <Card className="p-8">
                <div className="flex items-center mb-6">
                  <FileCheck className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold">Accountability Framework</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Badge className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">6-Year Warranty</p>
                      <p className="text-sm text-gray-600">Coverage for major restoration defects</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">2-Year Coverage</p>
                      <p className="text-sm text-gray-600">For minor restoration issues</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Contemporary Documentation</p>
                      <p className="text-sm text-gray-600">All restoration processes recorded</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Independent QA</p>
                      <p className="text-sm text-gray-600">Through CARSI protocols</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Time and Quality Guarantees */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Time and Quality Guarantees
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Meeting insurance requirements while preventing additional damage
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Meeting Insurance Requirements */}
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center mb-6">
                  <Clock className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold">On-Time Response</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Timer className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <span><strong>24-hour</strong> emergency response for water/fire</span>
                  </li>
                  <li className="flex items-start">
                    <Timer className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <span><strong>Regulated</strong> design compliance under DBP Act</span>
                  </li>
                  <li className="flex items-start">
                    <Timer className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <span><strong>No delays</strong> from inexperience</span>
                  </li>
                  <li className="flex items-start">
                    <Timer className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <span><strong>Direct communication</strong> throughout process</span>
                  </li>
                </ul>
              </Card>

              {/* Preventing Additional Damage */}
              <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-center mb-6">
                  <ShieldAlert className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold">Damage Prevention</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <span><strong>Proper assessment</strong> prevents secondary damage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <span><strong>Scientific approach</strong> to moisture & air quality</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <span><strong>AS-IICRC S500</strong> standards compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <span><strong>Mold prevention</strong> through proper drying</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Educational Authority */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Why Restoration is a Specialized Trade
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Understanding the expertise required for proper restoration
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Specialized Knowledge Required */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <HardHat className="h-8 w-8 text-orange-600 mr-3" />
                  Specialized Knowledge Required
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Environmental Science</p>
                      <p className="text-sm text-gray-600">Complex chemistry and physics of damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Health & Safety Expertise</p>
                      <p className="text-sm text-gray-600">Hazardous material handling protocols</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Structural Knowledge</p>
                      <p className="text-sm text-gray-600">Safe remediation without further damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Target className="h-5 w-5 text-orange-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Insurance Compliance</p>
                      <p className="text-sm text-gray-600">Ensuring claims are processed correctly</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Problems We Solve */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <AlertOctagon className="h-8 w-8 text-red-600 mr-3" />
                  Current Industry Problems We Solve
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Under-scoping</p>
                      <p className="text-sm text-gray-600">Inexperienced assessors miss critical damage</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Delayed Claims</p>
                      <p className="text-sm text-gray-600">Lack of technical knowledge slows process</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Secondary Damage</p>
                      <p className="text-sm text-gray-600">Improper initial response causes more harm</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Code Compliance Failures</p>
                      <p className="text-sm text-gray-600">That void insurance coverage</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Homeowner Empowerment */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Homeowner Empowerment
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Your rights and the benefits of choosing professional restoration
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Your Rights We Protect */}
              <Card className="p-8 bg-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Scale className="h-8 w-8 text-purple-600 mr-3" />
                  Your Rights We Protect
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HeartHandshake className="h-6 w-6 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Choose Qualified Contractors</p>
                      <p className="text-sm text-gray-600">Not forced TPA appointments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HeartHandshake className="h-6 w-6 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Fair Pricing</p>
                      <p className="text-sm text-gray-600">Based on actual requirements, not estimates</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HeartHandshake className="h-6 w-6 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Professional Advocacy</p>
                      <p className="text-sm text-gray-600">When dealing with insurance companies</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <HeartHandshake className="h-6 w-6 text-purple-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Compensation Claims</p>
                      <p className="text-sm text-gray-600">For insurer delays and poor service</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Direct Benefits */}
              <Card className="p-8 bg-white shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
                  Direct Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Faster Resolution</p>
                      <p className="text-sm text-gray-600">Proper assessment speeds claims</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Higher Quality</p>
                      <p className="text-sm text-gray-600">From specialized training</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Better Communication</p>
                      <p className="text-sm text-gray-600">Direct contact, not call centers</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">Long-term Protection</p>
                      <p className="text-sm text-gray-600">Proper restoration prevents future issues</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Strong Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertOctagon className="h-20 w-20 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Let Office Administrators Manage Your Restoration Emergency
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Your property deserves professional restoration from certified experts who are 
              legally obligated to deliver quality results - not cost-cutting administrators 
              working from office desks.
            </p>

            <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Take Control of Your Restoration</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <p className="font-semibold mb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Free Consultation
                  </p>
                  <p className="text-sm text-white/80">Assess if your claim is properly managed</p>
                </div>
                <div>
                  <p className="font-semibold mb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Second Opinion Service
                  </p>
                  <p className="text-sm text-white/80">For existing TPA-managed claims</p>
                </div>
                <div>
                  <p className="font-semibold mb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Direct Restoration
                  </p>
                  <p className="text-sm text-white/80">Meeting professional duty of care</p>
                </div>
                <div>
                  <p className="font-semibold mb-2 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Insurance Advocacy
                  </p>
                  <p className="text-sm text-white/80">Ensure fair treatment & timely resolution</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/get-help">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-10 py-7">
                  <Phone className="mr-2 h-6 w-6" />
                  Get Professional Help Now
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/contractors/apply">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-10 py-7">
                  <UserCheck className="mr-2 h-6 w-6" />
                  Join Our Professional Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Updated */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Professional Restoration Services
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Delivered by certified professionals, not office administrators
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/services/water-damage-restoration">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Droplets className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Water Damage</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>24/7 water extraction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Structural drying to IICRC S500</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Moisture mapping & monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Insurance approved documentation</span>
                  </li>
                </ul>
                <div className="mt-4 flex items-center text-blue-600 font-semibold">
                  Learn More <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </Card>
            </Link>
            
            <Link href="/services/fire-damage-restoration">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Flame className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Fire & Smoke</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Smoke & soot removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Odour elimination technology</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Contents restoration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Complete structural rebuild</span>
                  </li>
                </ul>
                <div className="mt-4 flex items-center text-orange-600 font-semibold">
                  Learn More <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </Card>
            </Link>
            
            <Link href="/services/mould-remediation">
              <Card className="p-6 hover:shadow-xl transition-all cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <AlertCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold ml-4">Mould Remediation</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>IICRC S520 mould removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Air quality testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>HEPA filtration systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Prevention treatments</span>
                  </li>
                </ul>
                <div className="mt-4 flex items-center text-green-600 font-semibold">
                  Learn More <ChevronRight className="h-5 w-5 ml-1" />
                </div>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                View All Professional Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Map - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Professional Network Coverage
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            IICRC-certified professionals ready to respond across Australia
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { state: 'NSW', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'], color: 'blue' },
              { state: 'VIC', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'], color: 'purple' },
              { state: 'QLD', cities: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns'], color: 'green' },
              { state: 'WA', cities: ['Perth', 'Fremantle', 'Bunbury', 'Mandurah'], color: 'orange' },
              { state: 'SA', cities: ['Adelaide', 'Mount Gambier', 'Whyalla'], color: 'red' },
              { state: 'TAS', cities: ['Hobart', 'Launceston', 'Devonport'], color: 'indigo' },
              { state: 'ACT', cities: ['Canberra', 'Gungahlin'], color: 'pink' },
              { state: 'NT', cities: ['Darwin', 'Alice Springs', 'Palmerston'], color: 'yellow' }
            ].map((location, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <MapPin className={`h-6 w-6 text-${location.color}-600 mr-2`} />
                  <h3 className="font-bold text-lg">{location.state}</h3>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {location.cities.map((city, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      {city}
                    </li>
                  ))}
                </ul>
                <Link href={`/locations/${location.state.toLowerCase()}`}>
                  <p className="text-sm text-blue-600 hover:text-blue-700 mt-3 font-semibold flex items-center">
                    View {location.state} Network
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </p>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Choose Your Service Radius</h3>
            <p className="text-gray-600 mb-6">
              Unlike TPAs who assign whoever they want, you choose how far contractors can come from:
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold">10km</p>
                <p className="text-sm text-gray-600">Local only</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold">25km</p>
                <p className="text-sm text-gray-600">Metro area</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold">50km</p>
                <p className="text-sm text-gray-600">Regional</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-bold">100km+</p>
                <p className="text-sm text-gray-600">Remote areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ShieldAlert className="h-20 w-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
          <h2 className="text-5xl font-bold mb-6">
            Your Property Deserves Professional Care
          </h2>
          <p className="text-2xl mb-8 max-w-4xl mx-auto text-blue-100">
            Stop letting office administrators control your restoration. 
            Connect with IICRC-certified professionals who have a legal duty to protect your interests.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 max-w-3xl mx-auto mb-10 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-yellow-400">$2,200</p>
                <p className="text-sm">Minimum Service Fee</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">24/7</p>
                <p className="text-sm">Emergency Response</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">100%</p>
                <p className="text-sm">Insurance Approved</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/get-help">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white text-xl px-12 py-8 shadow-2xl">
                <Phone className="mr-3 h-7 w-7" />
                Get Professional Help Now
                <ArrowRight className="ml-3 h-7 w-7" />
              </Button>
            </Link>
            <Link href="/compare/professional-vs-diy">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur border-2 border-white text-white hover:bg-white hover:text-slate-900 text-xl px-12 py-8">
                Compare Your Options
                <ChevronRight className="ml-3 h-7 w-7" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-blue-200">
            Join thousands of Australians who've taken control of their restoration
          </p>
        </div>
      </section>

      {/* Footer - Updated */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl mb-4">{BUSINESS_NAME}</h3>
              <p className="text-sm text-gray-400 mb-4">
                Australia's professional network of IICRC-certified restoration specialists 
                with a legal duty of care to protect your property.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="h-8 w-8 text-blue-400" />
                <BadgeCheck className="h-8 w-8 text-green-400" />
                <ShieldCheck className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Property Owners</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/get-help" className="hover:text-white">Get Emergency Help</Link></li>
                <li><Link href="/services" className="hover:text-white">Our Services</Link></li>
                <li><Link href="/locations" className="hover:text-white">Service Areas</Link></li>
                <li><Link href="/insurance" className="hover:text-white">Insurance Rights</Link></li>
                <li><Link href="/compare/professional-vs-diy" className="hover:text-white">Why Choose Professionals</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contractors" className="hover:text-white">Join Our Network</Link></li>
                <li><Link href="/contractors/apply" className="hover:text-white">Apply Now</Link></li>
                <li><Link href="/certifications/iicrc-certified" className="hover:text-white">Certification Standards</Link></li>
                <li><Link href="/contractors/benefits" className="hover:text-white">Network Benefits</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/guides" className="hover:text-white">Restoration Guides</Link></li>
                <li><Link href="/emergency" className="hover:text-white">Emergency Times</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing Guide</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 {BUSINESS_NAME}. All rights reserved. | IICRC Certified Network | ABN: 12 345 678 901
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}