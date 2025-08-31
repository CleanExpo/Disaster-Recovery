import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Shield, FileText, AlertTriangle, Users, Clock, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NRP Best Practices Guide - Professional Standards for Disaster Recovery | Disaster Recovery',
  description: 'Comprehensive guide to National Restoration Professionals best practices, mandatory procedures, and professional standards for emergency response and disaster recovery contractors.',
  keywords: 'NRP best practices, professional standards, disaster recovery procedures, emergency response protocols, contractor certification, industry standards',
  openGraph: {
    title: 'NRP Best Practices Guide - Professional Standards',
    description: 'Official guide to professional standards and mandatory procedures for NRP contractors in emergency response and disaster recovery.' }
};

export default function NRPBestPracticesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center bg-gradient-to-r from-blue-900/80 to-slate-900/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-12 w-12 text-blue-400" />
            <Award className="h-10 w-10 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            NRP Best Practices Guide
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Professional Standards and Mandatory Procedures for National Restoration Professionals
          </p>
          <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-400/30 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-blue-100 text-lg font-medium">
              Industry Policy and Procedures for Emergency Response Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Standards Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-400" />
            Mandatory Standards for NRP Contractors
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">Professional Certification Requirements</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>IICRC Applied Structural Drying (ASD) Certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Water Restoration Technician (WRT) Certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Applied Microbial Remediation Technician (AMRT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Level 1 Thermography Certification (<Link href="/technology/thermal" className="underline hover:text-blue-200">Thermal Imaging Reality</Link>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>AS-IICRC S520:2025 Draft Standard (<a href="https://www.standards.org.au/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">Standards Australia</a>)</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-400/30 rounded text-sm text-blue-200">
                See: <Link href="/guides/mould/why-mould-returns-6-months" className="underline hover:text-blue-100">Why 92% of claims have water defects (VBA Research)</Link>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-300 mb-4">Equipment Standards</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Professional moisture meters (penetrating & non-invasive)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Calibrated thermal imaging cameras (FLIR T-series minimum)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Professional dehumidification equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Air filtration systems (HEPA standard)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Response Procedures */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Clock className="h-8 w-8 text-orange-400" />
            Emergency Response Procedures
          </h2>
          
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-6">7 Essential Services - Professional Response Standard</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Emergency Callout Response</h4>
                    <p className="text-slate-300 text-sm">24/7 availability with maximum 2-hour response time for emergency situations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Administrative Processing</h4>
                    <p className="text-slate-300 text-sm">Complete insurance documentation, claim initiation, and regulatory compliance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Professional Inspection</h4>
                    <p className="text-slate-300 text-sm">Certified technician assessment with comprehensive damage evaluation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Professional Detection Equipment</h4>
                    <p className="text-slate-300 text-sm">Moisture meters, thermal imaging, and environmental monitoring equipment</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Make Safe Procedures</h4>
                    <p className="text-slate-300 text-sm">Emergency stabilization and mitigation to prevent further damage</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">6</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Transparent Scope & Pricing</h4>
                    <p className="text-slate-300 text-sm">Detailed scope of work with upfront pricing - no hidden costs or surprises</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">7</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Detailed Professional Report</h4>
                    <p className="text-slate-300 text-sm">Comprehensive documentation for insurance and legal compliance</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-900/30 border border-green-600/30 rounded-lg">
                  <p className="text-green-300 font-medium">
                    ✅ All services included in professional response fee - no additional charges for standard emergency procedures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Standards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-400" />
            Documentation & Reporting Standards
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Initial Assessment Report</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Photographic documentation</li>
                <li>• Moisture mapping with readings</li>
                <li>• Thermal imaging analysis</li>
                <li>• Damage classification</li>
                <li>• Environmental conditions</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Work Progress Documentation</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Daily monitoring logs</li>
                <li>• Equipment placement records</li>
                <li>• Environmental readings</li>
                <li>• Progress photography</li>
                <li>• Material disposal certificates</li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Completion Certification</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Final moisture readings</li>
                <li>• Post-remediation verification</li>
                <li>• Air quality clearance</li>
                <li>• Warranty documentation</li>
                <li>• Insurance compliance certificate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-400" />
            Quality Assurance & Compliance
          </h2>
          
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Australian Compliance Standards</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Australian Consumer Law compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Work Health and Safety Act 2011</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Environmental Protection regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><Link href="/guides/insurance/section-54-contractor-rights" className="underline hover:text-blue-200">Section 54 Insurance Contracts Act 1984</Link></span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-4">Professional Standards Verification</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Continuous education requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Annual certification renewals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Equipment calibration schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Quality assurance audits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Compliance Warning */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm border border-red-400/40 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-semibold text-red-300 mb-4">Warning: Non-Compliant Operators</h3>
                <p className="text-red-100 mb-4">
                  Contractors not meeting NRP Best Practices standards pose significant risks to property owners:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-200 mb-2">Common Non-Compliance Issues:</h4>
                    <ul className="space-y-1 text-red-100 text-sm">
                      <li>• Lack of proper certifications</li>
                      <li>• Inadequate equipment standards</li>
                      <li>• Poor documentation practices</li>
                      <li>• Hidden cost structures</li>
                      <li>• Insufficient insurance coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-200 mb-2">Potential Consequences:</h4>
                    <ul className="space-y-1 text-red-100 text-sm">
                      <li>• Secondary damage from improper work</li>
                      <li>• Insurance claim complications</li>
                      <li>• Health risks from incomplete remediation</li>
                      <li>• Legal liability issues</li>
                      <li>• Costly rework requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-400/30 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ensure Professional Standards Compliance
            </h3>
            <p className="text-blue-200 mb-6">
              Verify your contractor meets NRP Best Practices before work begins. Professional standards protect your property and investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides/pricing/real-emergency-response-costs" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                View Transparent Pricing
              </Link>
              <Link href="/guides/insurance/section-54-contractor-rights" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                Know Your Rights
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}