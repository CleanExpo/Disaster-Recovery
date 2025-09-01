import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, DollarSign, FileX, Clock, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Invoice Shock Epidemic - NSW Fair Trading Warns of Contractor Exploitation | Disaster Recovery',
  description: 'NSW Fair Trading reports 45+ complaints against single traders. ACCC investigating emergency pricing exploitation. Learn how to protect yourself from invoice shock tactics.',
  keywords: 'NSW Fair Trading contractor complaints, ACCC emergency pricing, invoice shock epidemic, hidden costs disaster recovery, consumer protection emergency services',
  openGraph: {
    title: 'Invoice Shock Crisis - NSW Fair Trading & ACCC Warnings',
    description: 'Government agencies warn of contractor exploitation. 45 complaints against single trader causing $52,957 consumer detriment.' }
};

export default function InvoiceShockEpidemicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative py-24 px-6 text-center bg-gradient-to-r from-red-900/80 to-slate-900/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <AlertTriangle className="h-12 w-12 text-red-400" />
            <DollarSign className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            The Invoice Shock Epidemic
          </h1>
          <p className="text-xl text-red-200 mb-8 max-w-3xl mx-auto">
            How Emergency Contractors Exploit Vulnerable Property Owners with Hidden Costs
          </p>
          <div className="bg-red-900/40 backdrop-blur-sm border border-red-400/30 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-red-100 text-lg font-medium">
              NSW Fair Trading: 45 complaints against single trader, $52,957 in consumer detriment
            </p>
            <p className="text-red-200 text-sm mt-2">
              Source: <a href="https://www.fairtrading.nsw.gov.au/" 
                className="underline hover:text-red-100" target="_blank" rel="noopener noreferrer">
                NSW Fair Trading Consumer Alerts 2024
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* The Problem */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FileX className="h-8 w-8 text-red-400" />
            The Hidden Cost Crisis
          </h2>
          
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm border border-red-400/30 rounded-lg p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-red-100 text-lg mb-4">
                <strong>The Pattern:</strong> Emergency contractors prey on vulnerable property owners by quoting low initial prices, then exploiting the crisis situation to add massive "unexpected" costs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-red-300 mb-2">The Hook</h3>
                <p className="text-red-200 text-sm">Low emergency quote when you're desperate and vulnerable</p>
              </div>
              
              <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-red-300 mb-2">The Trap</h3>
                <p className="text-red-200 text-sm">Hidden costs "discovered" after work begins</p>
              </div>
              
              <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-red-300 mb-2">The Shock</h3>
                <p className="text-red-200 text-sm">Final invoice 3-6x higher than initial quote</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Real Invoice Shock Cases</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Case 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="text-lg font-semibold text-red-300">Water Damage Emergency</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Initial phone quote:</span>
                  <span className="text-slate-200">$800</span>
                </div>
                <div className="text-slate-400 text-sm">
                  "Just for emergency callout and assessment"
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-4 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">Hidden costs revealed:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Equipment rental (7 days):</span>
                    <span className="text-red-300">+$1,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Hourly labour (undisclosed rate):</span>
                    <span className="text-red-300">+$2,240</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">"Additional scope" discovered:</span>
                    <span className="text-red-300">+$1,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Material disposal fees:</span>
                    <span className="text-red-300">+$650</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-900/40 border border-red-400/50 rounded p-3 text-center">
                <p className="text-red-100 font-semibold">Final Invoice: $6,890</p>
                <p className="text-red-300 text-sm">861% increase from initial quote</p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="text-lg font-semibold text-red-300">Storm Damage Response</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Initial estimate:</span>
                  <span className="text-slate-200">$1,200</span>
                </div>
                <div className="text-slate-400 text-sm">
                  "Emergency make safe and initial repairs"
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-4 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">Shock additions:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Emergency callout fee:</span>
                    <span className="text-red-300">+$480</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Weekend/after hours rate:</span>
                    <span className="text-red-300">+$720</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">"Specialist" equipment:</span>
                    <span className="text-red-300">+$1,950</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Additional trade requirements:</span>
                    <span className="text-red-300">+$2,400</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-900/40 border border-red-400/50 rounded p-3 text-center">
                <p className="text-red-100 font-semibold">Final Invoice: $6,750</p>
                <p className="text-red-300 text-sm">563% increase from initial estimate</p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="text-lg font-semibold text-red-300">Mould Remediation</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Quoted price:</span>
                  <span className="text-slate-200">$2,500</span>
                </div>
                <div className="text-slate-400 text-sm">
                  "Complete mould treatment and prevention"
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-4 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">Invoice surprises:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Air quality testing:</span>
                    <span className="text-red-300">+$890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Containment setup:</span>
                    <span className="text-red-300">+$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Extended treatment time:</span>
                    <span className="text-red-300">+$3,100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Post-treatment verification:</span>
                    <span className="text-red-300">+$650</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-900/40 border border-red-400/50 rounded p-3 text-center">
                <p className="text-red-100 font-semibold">Final Invoice: $8,340</p>
                <p className="text-red-300 text-sm">334% increase from quoted price</p>
              </div>
            </div>

            {/* Case 4 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-red-400/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                <h3 className="text-lg font-semibold text-red-300">Fire Damage Response</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Emergency quote:</span>
                  <span className="text-slate-200">$1,800</span>
                </div>
                <div className="text-slate-400 text-sm">
                  "Smoke damage cleaning and odour removal"
                </div>
              </div>
              
              <div className="border-t border-slate-600 pt-4 mb-4">
                <h4 className="font-semibold text-red-300 mb-2">Hidden scope additions:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">HVAC system cleaning:</span>
                    <span className="text-red-300">+$2,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Ozone treatment equipment:</span>
                    <span className="text-red-300">+$1,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Content pack-out/cleaning:</span>
                    <span className="text-red-300">+$4,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Extended timeline fees:</span>
                    <span className="text-red-300">+$1,950</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-900/40 border border-red-400/50 rounded p-3 text-center">
                <p className="text-red-100 font-semibold">Final Invoice: $12,150</p>
                <p className="text-red-300 text-sm">675% increase from emergency quote</p>
              </div>
            </div>

          </div>
        </div>

        {/* Common Tactics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Common Invoice Shock Tactics</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            <div>
              <h3 className="text-xl font-semibold text-red-300 mb-6">Psychological Manipulation</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Crisis Exploitation</h4>
                  <p className="text-slate-300 text-sm">Taking advantage when property owners are stressed, displaced, and making emotional decisions rather than logical ones.</p>
                </div>
                
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Urgency Pressure</h4>
                  <p className="text-slate-300 text-sm">"We need to start immediately or the damage will get worse" - preventing proper quote comparison or consideration.</p>
                </div>
                
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Technical Intimidation</h4>
                  <p className="text-slate-300 text-sm">Using complex technical jargon to confuse property owners and justify inflated charges.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-red-300 mb-6">Financial Exploitation</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Scope Creep</h4>
                  <p className="text-slate-300 text-sm">Continuously "discovering" additional work needed once they have access to your property and trust.</p>
                </div>
                
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Equipment Rental Scams</h4>
                  <p className="text-slate-300 text-sm">Charging premium daily rates for basic equipment that should be included in service pricing.</p>
                </div>
                
                <div className="bg-slate-800/50 border border-red-600/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-300 mb-2">Hidden Fee Structures</h4>
                  <p className="text-slate-300 text-sm">Emergency fees, after-hours rates, specialist charges - all disclosed after work begins.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* The Solution */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Shield className="h-8 w-8 text-emerald-600" />
            Protection Against Invoice Shock
          </h2>
          
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm border border-green-400/30 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-green-300 mb-6 text-center">The NRP Framework Solution</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-green-300 mb-2">Policy Holder Control</h4>
                <p className="text-green-200 text-sm">You choose the contractor and maintain decision-making power throughout the process</p>
              </div>
              
              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6 text-center">
                <FileX className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-green-300 mb-2">Transparent Pricing</h4>
                <p className="text-green-200 text-sm">All costs disclosed upfront within NRP guidance frameworks - no hidden surprises</p>
              </div>
              
              <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-green-300 mb-2">Faster Resolution</h4>
                <p className="text-green-200 text-sm">Streamlined process reduces time out of home and speeds insurance reimbursement</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-green-200 text-lg mb-4">
                <strong>Result:</strong> Professional service within fair pricing guidelines, with full insurance reimbursement potential
              </p>
              <p className="text-green-300 font-semibold">
                No more invoice shock. No more exploitation during your most vulnerable moments.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Signs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Warning Signs of Invoice Shock Contractors</h2>
          
          <div className="bg-orange-900/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              
              <div>
                <h3 className="text-lg font-semibold text-orange-300 mb-4">Red Flags During Quote</h3>
                <ul className="space-y-2 text-orange-200 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Unusually low initial quote compared to others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Vague scope descriptions or "to be determined" items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Pressure to sign immediately without comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Reluctance to provide detailed written estimates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Door-to-door sales after disasters</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-orange-300 mb-4">Red Flags During Work</h3>
                <ul className="space-y-2 text-orange-200 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Constant "discoveries" of additional work needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Equipment rental charges appearing mid-job</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Hourly rates higher than initially discussed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>New fees for previously included services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Inability to explain cost increases clearly</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 backdrop-blur-sm border border-blue-400/30 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stop Invoice Shock Before It Starts
            </h3>
            <p className="text-blue-200 mb-6">
              Know the warning signs, understand your rights, and choose contractors committed to transparent pricing standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/guides/pricing/professional-response-pricing-breakdown" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                See Transparent Pricing Guide
              </Link>
              <Link href="/guides/insurance/section-54-contractor-rights" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colours">
                Know Your Legal Protections
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}