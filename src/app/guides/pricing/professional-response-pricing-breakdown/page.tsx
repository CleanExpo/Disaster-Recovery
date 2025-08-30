import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, CheckCircle, XCircle, AlertTriangle, Calculator, FileText, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NRP Pricing Guidance - Professional Standards & Fair Pricing Framework | Disaster Recovery',
  description: 'NRP contractor pricing guidance framework. Understand recommended service inclusions and fair pricing ranges that empower policy holders and streamline claims processing.',
  keywords: 'NRP pricing guidance, professional contractor standards, fair pricing framework, policy holder empowerment, insurance claims streamlining',
  openGraph: {
    title: 'NRP Pricing Guidance - Empowering Policy Holders',
    description: 'Professional contractor guidance framework that puts decision-making power back in the hands of policy holders and bill payers.',
  }
};

export default function ProfessionalResponsePricingBreakdownPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center bg-gradient-to-r from-blue-900/80 to-slate-900/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calculator className="h-12 w-12 text-green-400" />
            <Shield className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            NRP Pricing Guidance Framework
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Professional Standards & Fair Pricing Guidelines - Empowering Policy Holders
          </p>
          <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-400/30 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-blue-100 text-lg font-medium">
              Industry guidance for professional contractor pricing ranges and service standards
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* NRP Framework Introduction */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-400/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Empowering Policy Holders Through Professional Standards</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-3">NRP's Role</h3>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li>• Provide pricing guidance frameworks to contractors</li>
                  <li>• Establish <Link href="/guides/professional/nrp-best-practices-guide" className="underline hover:text-blue-100">professional service standards</Link></li>
                  <li>• Help stabilize industry pricing practices</li>
                  <li>• Support policy holder decision-making power</li>
                  <li>• Address <Link href="/guides/industry-problems/invoice-shock-epidemic" className="underline hover:text-blue-100">invoice shock epidemic</Link></li>
                </ul>
                <div className="mt-3 p-2 bg-blue-800/30 rounded text-xs text-blue-300">
                  <a href="https://www.fairtrading.nsw.gov.au/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
                    NSW Fair Trading: 45 complaints against single contractor
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Benefits to Policy Holders</h3>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li>• Faster claim processing (<Link href="/guides/insurance/real-cost-insurance-delays" className="underline hover:text-blue-100">avoid ASIC-noted delays</Link>)</li>
                  <li>• Reduced time out of home or with equipment noise</li>
                  <li>• Better chance of full insurance reimbursement</li>
                  <li>• Direct involvement in contractor selection and decisions</li>
                  <li>• Protection under <Link href="/guides/insurance/section-54-contractor-rights" className="underline hover:text-blue-100">Section 54 rights</Link></li>
                </ul>
                <div className="mt-3 p-2 bg-blue-800/30 rounded text-xs text-blue-300">
                  <a href="https://insurancecouncil.com.au/wp-content/uploads/2024/08/21100_ICA_Catastrophe-Report_Print-2024_Final-single-pages.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
                    ICA: 10,000+ Ex-Cyclone Jasper claims still processing
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-400" />
            NRP Recommended Service Inclusions Framework
          </h2>
          
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-semibold text-green-300">Emergency Callout</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• 24/7 availability</li>
                  <li>• 2-hour response time</li>
                  <li>• Qualified technician dispatch</li>
                  <li>• Emergency vehicle equipment</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $400-600 elsewhere</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="font-semibold text-green-300">Administrative Processing</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Insurance claim initiation</li>
                  <li>• Documentation preparation</li>
                  <li>• Regulatory compliance</li>
                  <li>• Communication management</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $300-450 elsewhere</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="font-semibold text-green-300">Professional Inspection</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• IICRC certified technician</li>
                  <li>• Comprehensive assessment</li>
                  <li>• Damage classification</li>
                  <li>• Risk evaluation</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $500-750 elsewhere</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <h3 className="font-semibold text-green-300">Detection Equipment</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Professional moisture meters</li>
                  <li>• FLIR thermal imaging camera</li>
                  <li>• Environmental monitoring</li>
                  <li>• Calibrated instruments</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $400-600 elsewhere</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
                  <h3 className="font-semibold text-green-300">Make Safe Procedures</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Emergency stabilization</li>
                  <li>• Water extraction (initial)</li>
                  <li>• Contamination control</li>
                  <li>• Safety measures</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $600-900 elsewhere</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
                  <h3 className="font-semibold text-green-300">Transparent Scope</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Detailed work scope</li>
                  <li>• Upfront pricing</li>
                  <li>• Timeline estimation</li>
                  <li>• Clear expectations</li>
                </ul>
                <div className="mt-4 text-green-400 font-semibold">NRP Standard: Required transparency</div>
              </div>

              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6 md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
                  <h3 className="font-semibold text-green-300">Detailed Professional Report</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Comprehensive documentation</li>
                    <li>• Photographic evidence</li>
                    <li>• Moisture mapping</li>
                  </ul>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Thermal imaging analysis</li>
                    <li>• Environmental readings</li>
                    <li>• Damage classification</li>
                  </ul>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Insurance compliance</li>
                    <li>• Legal documentation</li>
                    <li>• Professional certification</li>
                  </ul>
                </div>
                <div className="mt-4 text-green-400 font-semibold">NRP Guidance: $800-1,200 range</div>
              </div>

            </div>
            
            <div className="mt-8 p-6 bg-green-900/30 border border-green-400/50 rounded-lg text-center">
              <p className="text-green-100 text-lg">
                <strong>Total Individual Service NRP Guidance: $3,000-4,500</strong>
              </p>
              <p className="text-green-300 text-2xl font-bold mt-2">
                Recommended All-Inclusive Range: $2,400-3,200
              </p>
              <p className="text-green-200 mt-2">
                NRP guidance helps contractors provide fair, transparent pricing within professional standards
              </p>
            </div>
          </div>
        </div>

        {/* System Reform Benefits */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-purple-400/30 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Transforming the Claims Process</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-900/40 p-4 rounded-lg mb-3">
                  <h3 className="font-semibold text-red-300 mb-2">Current System</h3>
                  <p className="text-red-200 text-sm">Administrators get paid more than contractors doing actual work</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-green-900/40 p-4 rounded-lg mb-3">
                  <h3 className="font-semibold text-green-300 mb-2">NRP System</h3>
                  <p className="text-green-200 text-sm">Fair contractor compensation with professional standards guidance</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-900/40 p-4 rounded-lg mb-3">
                  <h3 className="font-semibold text-blue-300 mb-2">Result</h3>
                  <p className="text-blue-200 text-sm">Insurance saves money, policy holders get better service</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <XCircle className="h-8 w-8 text-red-400" />
            Current Industry Problems vs NRP Solution
          </h2>
          
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Current System Problems */}
              <div>
                <h3 className="text-2xl font-semibold text-red-300 mb-6">Current Industry Problems</h3>
                <div className="bg-slate-800/50 border border-red-500/30 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <p className="text-red-300 text-lg mb-2">Initial Phone Quote</p>
                    <p className="text-3xl font-bold text-red-400">$500-800</p>
                    <p className="text-red-200 text-sm">"Emergency callout and assessment"</p>
                  </div>
                </div>
                
                <h4 className="font-semibold text-red-300 mb-4">Then the hidden costs appear:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded">
                    <span className="text-red-200">Hidden callout fee</span>
                    <span className="text-red-300 font-semibold">+$400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded">
                    <span className="text-red-200">Equipment "rental"</span>
                    <span className="text-red-300 font-semibold">+$200/day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded">
                    <span className="text-red-200">Hourly rates (not disclosed)</span>
                    <span className="text-red-300 font-semibold">+$300/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded">
                    <span className="text-red-200">"Additional scope" discovered</span>
                    <span className="text-red-300 font-semibold">+$1,500-3,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-900/20 rounded">
                    <span className="text-red-200">Documentation fees</span>
                    <span className="text-red-300 font-semibold">+$300-500</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-red-900/40 border border-red-400/50 rounded-lg text-center">
                  <p className="text-red-100 text-lg font-semibold">Shock Invoice Total:</p>
                  <p className="text-3xl font-bold text-red-400">$3,200-5,800+</p>
                  <p className="text-red-200 text-sm mt-2">Plus additional "surprises" during work</p>
                </div>
              </div>

              {/* NRP Solution */}
              <div>
                <h3 className="text-2xl font-semibold text-green-300 mb-6">NRP Framework Solution</h3>
                <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6 mb-6">
                  <div className="text-center">
                    <p className="text-green-300 text-lg mb-2">NRP Guided Range</p>
                    <p className="text-3xl font-bold text-green-400">$2,400-3,200</p>
                    <p className="text-green-200 text-sm">"Professional contractor sets price within guidance framework"</p>
                  </div>
                </div>
                
                <h4 className="font-semibold text-green-300 mb-4">Everything included - no surprises:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded">
                    <span className="text-green-200">Emergency callout response</span>
                    <span className="text-green-300 font-semibold">✅ Included</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded">
                    <span className="text-green-200">Professional equipment</span>
                    <span className="text-green-300 font-semibold">✅ Included</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded">
                    <span className="text-green-200">Certified technician time</span>
                    <span className="text-green-300 font-semibold">✅ Included</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded">
                    <span className="text-green-200">Standard emergency procedures</span>
                    <span className="text-green-300 font-semibold">✅ Included</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-900/20 rounded">
                    <span className="text-green-200">Complete documentation</span>
                    <span className="text-green-300 font-semibold">✅ Included</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-900/40 border border-green-400/50 rounded-lg text-center">
                  <p className="text-green-100 text-lg font-semibold">Final Invoice:</p>
                  <p className="text-3xl font-bold text-green-400">Within Guidance Range</p>
                  <p className="text-green-200 text-sm mt-2">Exactly as quoted - no hidden costs, policy holder empowered</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-400" />
            Additional Services (If Required) - Transparent Pricing
          </h2>
          
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-400/30 rounded-lg p-8">
            <p className="text-blue-200 mb-6 text-center">
              Only charged if additional work is required beyond standard emergency response - all quoted upfront for approval
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Specialised Equipment</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Large dehumidifiers: $150/day</li>
                  <li>• Air scrubbers: $100/day</li>
                  <li>• Structural drying fans: $75/day</li>
                  <li>• Specialty extraction: $200/day</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">Pre-approved pricing</p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Additional Trades</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Electrical safety: $280-450</li>
                  <li>• Plumbing repairs: $320-580</li>
                  <li>• Structural assessment: $450-680</li>
                  <li>• HVAC cleaning: $380-650</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">Fixed rate pricing</p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Testing & Certification</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Air quality testing: $180-280</li>
                  <li>• Mould sampling: $150-250/room</li>
                  <li>• Asbestos testing: $280-380</li>
                  <li>• Lead paint testing: $150-220</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">Laboratory certified</p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Material Disposal</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• General building waste: $45/m³</li>
                  <li>• Contaminated materials: $85/m³</li>
                  <li>• Hazardous waste: $150/m³</li>
                  <li>• Carpet/flooring: $35/m²</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">EPA compliant</p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Extended Services</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• 24/7 monitoring: $120/day</li>
                  <li>• Security measures: $180/day</li>
                  <li>• Temporary accommodation: Variable</li>
                  <li>• Content pack-out: $8-15/box</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">As-needed basis</p>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6">
                <h3 className="font-semibold text-blue-300 mb-4">Project Management</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Daily site visits: $150/visit</li>
                  <li>• Progress reporting: $100/report</li>
                  <li>• Coordination meetings: $180/hour</li>
                  <li>• Compliance auditing: $280/audit</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-900/30 rounded text-center">
                  <p className="text-blue-300 font-medium">Professional oversight</p>
                </div>
              </div>

            </div>
            
            <div className="mt-8 p-6 bg-blue-900/30 border border-blue-400/50 rounded-lg text-center">
              <p className="text-blue-100 text-lg font-semibold mb-2">
                Additional Services Policy
              </p>
              <p className="text-blue-200">
                All additional services must be approved by you before work begins. No surprise charges. Ever.
              </p>
            </div>
          </div>
        </div>

        {/* Cost Comparison Summary */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-yellow-400" />
            Real Cost Comparison Summary
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cowboy Operator */}
            <div className="bg-gradient-to-b from-red-900/30 to-red-800/20 backdrop-blur-sm border border-red-400/40 rounded-lg p-6">
              <div className="text-center mb-6">
                <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-red-300">Cowboy Operator</h3>
                <p className="text-red-200 text-sm">Cheap quote, expensive reality</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-red-200">Initial quote:</span>
                  <span className="text-red-300">$500-800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Hidden costs:</span>
                  <span className="text-red-300">+$2,700-5,000</span>
                </div>
                <div className="border-t border-red-400/30 pt-2 flex justify-between font-semibold">
                  <span className="text-red-200">Total shock:</span>
                  <span className="text-red-400 text-lg">$3,200-5,800+</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300">Unqualified technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300">Basic equipment only</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300">Minimal documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="text-red-300">Invoice shock guaranteed</span>
                </div>
              </div>
            </div>

            {/* Standard Contractor */}
            <div className="bg-gradient-to-b from-orange-900/30 to-yellow-800/20 backdrop-blur-sm border border-orange-400/40 rounded-lg p-6">
              <div className="text-center mb-6">
                <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-orange-300">Standard Contractor</h3>
                <p className="text-orange-200 text-sm">Some standards, some surprises</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-orange-200">Initial quote:</span>
                  <span className="text-orange-300">$1,200-1,800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-200">Additional costs:</span>
                  <span className="text-orange-300">+$1,200-2,200</span>
                </div>
                <div className="border-t border-orange-400/30 pt-2 flex justify-between font-semibold">
                  <span className="text-orange-200">Total actual:</span>
                  <span className="text-orange-400 text-lg">$2,400-4,000</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300">Some certifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300">Adequate equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300">Partial documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-300">Some price surprises</span>
                </div>
              </div>
            </div>

            {/* Professional NRP */}
            <div className="bg-gradient-to-b from-green-900/30 to-blue-800/20 backdrop-blur-sm border border-green-400/40 rounded-lg p-6">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-green-300">Professional NRP</h3>
                <p className="text-green-200 text-sm">Transparent, comprehensive, certified</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-green-200">Complete quote:</span>
                  <span className="text-green-300">$2,750</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-200">Hidden costs:</span>
                  <span className="text-green-300">$0</span>
                </div>
                <div className="border-t border-green-400/30 pt-2 flex justify-between font-semibold">
                  <span className="text-green-200">Total final:</span>
                  <span className="text-green-400 text-lg">$2,750</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">IICRC certified technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Professional equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Complete documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Zero price surprises</span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-green-300 text-lg font-semibold mb-2">
                Professional Standards Save You Money
              </p>
              <p className="text-green-200">
                Avoid the $1,000-3,000+ in surprise costs by choosing transparent professional service upfront
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 backdrop-blur-sm border border-blue-400/30 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Reclaim Your Decision-Making Power
            </h3>
            <p className="text-blue-200 mb-6">
              The NRP framework puts policy holders back in control. Choose your contractor, understand your costs, and work directly with professionals who answer to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides/professional/nrp-best-practices-guide" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                Verify Professional Standards
              </Link>
              <Link href="/guides/insurance/section-54-contractor-rights" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                Know Your Legal Rights
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}