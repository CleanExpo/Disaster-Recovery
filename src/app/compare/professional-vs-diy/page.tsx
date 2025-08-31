import { Metadata } from 'next';
import { AlertTriangle, CheckCircle2, XCircle, DollarSign, Clock, Shield, Users, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Professional vs DIY Disaster Recovery | Cost & Risk Comparison',
  description: 'Compare professional disaster recovery vs DIY attempts. Understand the real costs, risks, and why professional restoration saves money.' };

export default function ProfessionalVsDIYPage() {
  const comparisonData = [
    {
      aspect: 'Initial Cost',
      diy: '$500-$2,000',
      professional: '$2,200 minimum',
      winner: 'diy'
    },
    {
      aspect: 'Total Cost (including secondary damage)',
      diy: '$5,000-$25,000+',
      professional: '$2,200-$8,000',
      winner: 'professional'
    },
    {
      aspect: 'Time to Complete',
      diy: '2-4 weeks',
      professional: '3-7 days',
      winner: 'professional'
    },
    {
      aspect: 'Insurance Coverage',
      diy: 'Often void/rejected',
      professional: '100% covered',
      winner: 'professional'
    },
    {
      aspect: 'Mould Prevention',
      diy: '30% success rate',
      professional: '99% success rate',
      winner: 'professional'
    },
    {
      aspect: 'Equipment Quality',
      diy: 'Rental grade',
      professional: 'Industrial grade',
      winner: 'professional'
    },
    {
      aspect: 'Health & Safety',
      diy: 'High risk',
      professional: 'Fully protected',
      winner: 'professional'
    },
    {
      aspect: 'Warranty',
      diy: 'None',
      professional: 'Lifetime guarantee',
      winner: 'professional'
    }
  ];

  const diyRisks = [
    {
      risk: 'Hidden Water Damage',
      consequence: 'Structural rot and collapse',
      cost: '$15,000-$50,000'
    },
    {
      risk: 'Mould Growth',
      consequence: 'Health issues and spreading',
      cost: '$5,000-$20,000'
    },
    {
      risk: 'Electrical Hazards',
      consequence: 'Fire or electrocution',
      cost: 'Potentially fatal'
    },
    {
      risk: 'Insurance Denial',
      consequence: 'Full cost responsibility',
      cost: '$10,000-$100,000+'
    },
    {
      risk: 'Contamination Spread',
      consequence: 'Whole house affected',
      cost: '$20,000-$75,000'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional vs DIY Restoration
            </h1>
            <p className="text-2xl mb-8">
              Why DIY Disaster Recovery Costs More in the End
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-xl font-bold">
                DIY attempts void insurance in 73% of cases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Side-by-Side Comparison
          </h2>
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Aspect</th>
                    <th className="p-4 text-center">DIY Attempt</th>
                    <th className="p-4 text-center">Professional Service</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-bold">{item.aspect}</td>
                      <td className={`p-4 text-center ${item.winner === 'diy' ? 'text-green-600 font-bold' : 'text-red-600'}`}>
                        <div className="flex items-center justify-center">
                          {item.winner === 'diy' ? 
                            <CheckCircle2 className="h-5 w-5 mr-2" /> : 
                            <XCircle className="h-5 w-5 mr-2" />
                          }
                          {item.diy}
                        </div>
                      </td>
                      <td className={`p-4 text-center ${item.winner === 'professional' ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
                        <div className="flex items-center justify-center">
                          {item.winner === 'professional' && 
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                          }
                          {item.professional}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <div className="mt-8 text-center">
              <p className="text-2xl font-bold text-green-600">
                Professional: 7/8 Advantages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Costs of DIY */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hidden Costs & Risks of DIY
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {diyRisks.map((risk, index) => (
              <Card key={index} className="p-6 border-red-200">
                <AlertTriangle className="h-10 w-10 text-red-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{risk.risk}</h3>
                <p className="text-gray-600 mb-3">{risk.consequence}</p>
                <p className="text-2xl font-bold text-red-600">{risk.cost}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Cost Analysis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            True Cost Analysis: Water Damage Example
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-600">
                DIY Attempt Costs
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Equipment rental (1 week)</span>
                  <span className="font-bold">$800</span>
                </div>
                <div className="flex justify-between">
                  <span>Fans and dehumidifiers</span>
                  <span className="font-bold">$400</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning supplies</span>
                  <span className="font-bold">$200</span>
                </div>
                <div className="flex justify-between">
                  <span>Your time (40 hours)</span>
                  <span className="font-bold">$2,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Mistakes & rework</span>
                  <span className="font-bold">$1,500</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Mould growth (2 weeks later)</span>
                  <span className="font-bold">$8,000</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Insurance claim denied</span>
                  <span className="font-bold">$7,000</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total Cost</span>
                  <span className="text-red-600">$19,900</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 border-2 border-green-600">
              <h3 className="text-2xl font-bold mb-6 text-green-600">
                Professional Service
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Emergency response</span>
                  <span className="font-bold">$2,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Water extraction</span>
                  <span className="font-bold">$1,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Structural drying</span>
                  <span className="font-bold">$1,800</span>
                </div>
                <div className="flex justify-between">
                  <span>Antimicrobial treatment</span>
                  <span className="font-bold">$500</span>
                </div>
                <div className="flex justify-between">
                  <span>Restoration & repairs</span>
                  <span className="font-bold">$1,000</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Insurance covers</span>
                  <span className="font-bold">-$7,000</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You pay (excess only)</span>
                  <span className="font-bold">$500</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Your Total Cost</span>
                  <span className="text-green-600">$500</span>
                </div>
              </div>
              <div className="mt-6 bg-green-100 rounded-lg p-4">
                <p className="text-center font-bold text-green-800">
                  Save $19,400 with professional service!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why DIY Fails */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why DIY Disaster Recovery Fails
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <Wrench className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Wrong Equipment</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Home dehumidifiers too small</li>
                <li>• Can't detect hidden moisture</li>
                <li>• No thermal imaging capability</li>
                <li>• Inadequate air movement</li>
              </ul>
            </Card>
            <Card className="p-6">
              <Clock className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Time Critical Mistakes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 24-48 hour mould window missed</li>
                <li>• Water spreads while learning</li>
                <li>• Secondary damage occurs</li>
                <li>• Insurance deadlines missed</li>
              </ul>
            </Card>
            <Card className="p-6">
              <XCircle className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Critical Errors</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Cross-contamination spread</li>
                <li>• Electrical hazards created</li>
                <li>• Structural damage worsened</li>
                <li>• Health hazards introduced</li>
              </ul>
            </Card>
            <Card className="p-6">
              <DollarSign className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Financial Disasters</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Insurance claim voided</li>
                <li>• Property value decreased</li>
                <li>• Future premiums increased</li>
                <li>• Legal liability risks</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Service Benefits
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Guaranteed Results</h3>
                <p className="text-gray-700">Lifetime warranty on all work with documented success</p>
              </Card>
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Insurance Approved</h3>
                <p className="text-gray-700">Direct billing means you pay only your excess</p>
              </Card>
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Faster Recovery</h3>
                <p className="text-gray-700">Back to normal in days, not weeks or months</p>
              </Card>
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Health Protection</h3>
                <p className="text-gray-700">Proper containment and safety protocols followed</p>
              </Card>
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Property Value</h3>
                <p className="text-gray-700">Maintains value with professional documentation</p>
              </Card>
              <Card className="p-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Peace of Mind</h3>
                <p className="text-gray-700">IICRC certified experts handle everything</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Don't Risk DIY - Get Professional Help
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Save money, time, and your property with IICRC certified professionals. 
            Insurance approved, guaranteed results.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold">Average DIY Cost: $19,900</p>
            <p className="text-2xl font-bold">Professional Cost (with insurance): $500</p>
          </div>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Professional Help Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}