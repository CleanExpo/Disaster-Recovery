const fs = require('fs');
const path = require('path');

// Emergency time-based scenarios
const emergencyTimeScenarios = [
  {
    slug: 'after-hours-emergency',
    name: 'After Hours Emergency Service',
    timeframe: '5PM - 9AM Weekdays',
    surcharge: '$500',
    description: '24/7 emergency response when disaster strikes outside business hours',
    keywords: ['after hours emergency', 'night time disaster recovery', 'evening emergency service'],
    urgencyLevel: 'Critical',
    responseTime: '30 minutes'
  },
  {
    slug: 'weekend-emergency',
    name: 'Weekend Emergency Response',
    timeframe: 'Saturday & Sunday',
    surcharge: '$750',
    description: 'Immediate weekend disaster recovery when you need it most',
    keywords: ['weekend emergency', 'saturday disaster recovery', 'sunday emergency service'],
    urgencyLevel: 'Critical',
    responseTime: '30 minutes'
  },
  {
    slug: 'public-holiday-emergency',
    name: 'Public Holiday Emergency',
    timeframe: 'All Public Holidays',
    surcharge: '$1000',
    description: 'Holiday disaster response when other services are closed',
    keywords: ['public holiday emergency', 'christmas emergency', 'easter disaster recovery'],
    urgencyLevel: 'Critical',
    responseTime: '45 minutes'
  },
  {
    slug: 'midnight-emergency',
    name: 'Midnight Emergency Response',
    timeframe: '12AM - 6AM',
    surcharge: '$750',
    description: 'Middle of the night disaster recovery services',
    keywords: ['midnight emergency', 'late night disaster', '3am emergency service'],
    urgencyLevel: 'Extreme',
    responseTime: '45 minutes'
  },
  {
    slug: 'christmas-emergency',
    name: 'Christmas Day Emergency',
    timeframe: 'December 25th',
    surcharge: '$1500',
    description: 'Christmas Day disaster recovery - we never close',
    keywords: ['christmas emergency', 'december 25 disaster', 'xmas day recovery'],
    urgencyLevel: 'Extreme',
    responseTime: '60 minutes'
  },
  {
    slug: 'new-year-emergency',
    name: 'New Year Emergency Service',
    timeframe: 'December 31st - January 1st',
    surcharge: '$1500',
    description: 'New Year disaster response when others are celebrating',
    keywords: ['new year emergency', 'nye disaster recovery', 'january 1 emergency'],
    urgencyLevel: 'Extreme',
    responseTime: '60 minutes'
  },
  {
    slug: 'early-morning-emergency',
    name: 'Early Morning Emergency',
    timeframe: '4AM - 7AM',
    surcharge: '$500',
    description: 'Dawn disaster recovery before the day begins',
    keywords: ['early morning emergency', 'dawn disaster', '5am emergency service'],
    urgencyLevel: 'High',
    responseTime: '30 minutes'
  },
  {
    slug: 'sunday-night-emergency',
    name: 'Sunday Night Emergency',
    timeframe: 'Sunday 6PM - Monday 6AM',
    surcharge: '$750',
    description: 'Sunday night disaster recovery before the work week',
    keywords: ['sunday night emergency', 'sunday evening disaster', 'pre-monday emergency'],
    urgencyLevel: 'High',
    responseTime: '30 minutes'
  }
];

// Generate emergency time pages
emergencyTimeScenarios.forEach(scenario => {
  const pageContent = `import { Metadata } from 'next';
import { Clock, AlertTriangle, Phone, DollarSign, Zap, Shield, Calendar, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '${scenario.name} | ${scenario.timeframe} | $2200 Minimum + ${scenario.surcharge} Surcharge',
  description: '${scenario.description}. ${scenario.responseTime} response time. Available ${scenario.timeframe}. Insurance approved.',
  keywords: ${JSON.stringify(scenario.keywords)}
};

export default function ${scenario.name.replace(/[\s-]+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3 animate-pulse">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-bold">${scenario.urgencyLevel.toUpperCase()} EMERGENCY - CALL NOW: 1300 DISASTER</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Clock className="h-16 w-16 text-orange-400 animate-spin-slow" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ${scenario.name}
            </h1>
            <div className="bg-orange-600 text-white inline-block px-6 py-3 rounded-full mb-6">
              <span className="text-2xl font-bold">${scenario.timeframe}</span>
            </div>
            <p className="text-xl mb-8">
              ${scenario.description}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur p-4">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-lg font-bold">${scenario.responseTime}</p>
                <p className="text-sm">Response Time</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-lg font-bold">$2200 + ${scenario.surcharge}</p>
                <p className="text-sm">Total Minimum</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-lg font-bold">100%</p>
                <p className="text-sm">Insurance Covered</p>
              </Card>
            </div>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
              <Phone className="mr-2 h-6 w-6" />
              Call 1300 DISASTER - ${scenario.timeframe} Service
            </Button>
          </div>
        </div>
      </section>

      {/* Why We Charge More Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why ${scenario.name} Costs More
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-600">
                ${scenario.timeframe} Surcharge: ${scenario.surcharge}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Premium rates for specialized technicians</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Double-time penalty rates for staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-call team availability costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Emergency vehicle dispatch priority</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Immediate parts and equipment access</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                What You Get for the Premium
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>${scenario.responseTime} guaranteed response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Senior technicians only (10+ years)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority over standard callouts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete equipment mobilization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Insurance direct billing available</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost of Waiting Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-red-600">
              The True Cost of Waiting Until Business Hours
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-600 mb-2">+$5,000</p>
                <p className="font-bold mb-2">Every 6 Hours</p>
                <p className="text-gray-600">Additional damage from water spreading</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-orange-600 mb-2">+$8,000</p>
                <p className="font-bold mb-2">After 12 Hours</p>
                <p className="text-gray-600">Mould growth begins, structural damage</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-700 mb-2">+$15,000</p>
                <p className="font-bold mb-2">After 24 Hours</p>
                <p className="text-gray-600">Major structural repairs required</p>
              </Card>
            </div>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8">
              <p className="text-2xl font-bold text-green-800 mb-4">
                Save Thousands by Acting Now
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our ${scenario.surcharge} ${scenario.timeframe.toLowerCase()} surcharge is a fraction 
                of the cost of waiting until regular hours.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-5 w-5" />
                Call Now - Save $15,000+ in Damage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Covers ${scenario.name} Fees
            </h2>
            <Card className="p-8 bg-blue-50">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-2xl font-bold">Most Policies Include After-Hours Coverage</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Standard Coverage Includes:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Emergency response fees</li>
                    <li>• After-hours surcharges</li>
                    <li>• Weekend penalty rates</li>
                    <li>• Holiday service premiums</li>
                    <li>• Priority response costs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3">We Handle Everything:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Direct insurance billing</li>
                    <li>• All documentation provided</li>
                    <li>• Photos and reports included</li>
                    <li>• Adjuster coordination</li>
                    <li>• No upfront payment needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Clock className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">
            ${scenario.timeframe} Disaster Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let ${scenario.timeframe.toLowerCase()} timing cost you thousands more in damage. 
            Our expert teams are ready NOW with ${scenario.responseTime} response.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">Total Emergency Fee:</p>
            <p className="text-3xl font-bold">$2,200 base + ${scenario.surcharge} = $${(2200 + parseInt(scenario.surcharge.replace('$', '').replace(',', ''))).toLocaleString()}</p>
            <p className="text-lg mt-2">Insurance Approved • Direct Billing Available</p>
          </div>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            1300 DISASTER - ${scenario.timeframe} Emergency
          </Button>
        </div>
      </section>
    </div>
  );
}`;

  // Create emergency directory and page
  const emergencyDir = path.join(__dirname, '..', 'src', 'app', 'emergency', scenario.slug);
  
  if (!fs.existsSync(emergencyDir)) {
    fs.mkdirSync(emergencyDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(emergencyDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${scenario.name} page`);
});

// Create emergency index page
const indexContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Moon, Sun, AlertTriangle, ArrowRight, Phone, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: '24/7 Emergency Response Times & Fees | After Hours, Weekends, Holidays',
  description: 'Emergency disaster recovery available 24/7/365. After hours, weekends, and holiday surcharges explained. Insurance approved.',
};

const scenarios = ${JSON.stringify(emergencyTimeScenarios.map(s => ({ 
  name: s.name, 
  slug: s.slug, 
  timeframe: s.timeframe,
  surcharge: s.surcharge,
  responseTime: s.responseTime,
  urgencyLevel: s.urgencyLevel
})), null, 2)};

export default function EmergencyTimesPage() {
  const getIcon = (name: string) => {
    if (name.includes('Weekend')) return Sun;
    if (name.includes('Night') || name.includes('Midnight')) return Moon;
    if (name.includes('Holiday') || name.includes('Christmas') || name.includes('Year')) return Calendar;
    return Clock;
  };

  const getColorClass = (level: string) => {
    if (level === 'Extreme') return 'bg-red-600';
    if (level === 'Critical') return 'bg-orange-600';
    return 'bg-yellow-600';
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-orange-900 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Clock className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-spin-slow" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            24/7/365 Emergency Response
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Disaster doesn't wait for business hours - neither do we. 
            Transparent pricing for after-hours, weekend, and holiday emergencies.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 inline-block">
            <p className="text-2xl font-bold">Base Fee: $2,200 + Time-Based Surcharge</p>
            <p className="text-lg mt-2">All fees covered by insurance</p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Emergency Response Times & Surcharges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const IconComponent = getIcon(scenario.name);
              const colorClass = getColorClass(scenario.urgencyLevel);
              const totalFee = 2200 + parseInt(scenario.surcharge.replace('$', '').replace(',', ''));
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-10 w-10 text-orange-600" />
                    <span className={\`px-3 py-1 rounded-full text-white text-sm font-bold \${colorClass}\`}>
                      {scenario.urgencyLevel}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{scenario.name}</h2>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {scenario.timeframe}
                    </p>
                    <p className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Surcharge: {scenario.surcharge}
                    </p>
                    <p className="flex items-center font-bold text-black">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                      Total: $\${totalFee.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-3 mb-4">
                    <p className="text-sm font-bold text-green-800">
                      {scenario.responseTime} Response
                    </p>
                  </div>
                  <Link href={\`/emergency/\${scenario.slug}\`}>
                    <Button className="w-full" variant="outline">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick Reference: When to Call
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-orange-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Time Period</th>
                    <th className="p-4 text-center">Surcharge</th>
                    <th className="p-4 text-center">Total Fee</th>
                    <th className="p-4 text-center">Response</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((scenario, index) => {
                    const total = 2200 + parseInt(scenario.surcharge.replace('$', '').replace(',', ''));
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4">
                          <div>
                            <p className="font-bold">{scenario.name}</p>
                            <p className="text-sm text-gray-600">{scenario.timeframe}</p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold">{scenario.surcharge}</td>
                        <td className="p-4 text-center font-bold text-orange-600">
                          $\${total.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">{scenario.responseTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">
            Emergency Happening Now?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Every minute counts in disaster recovery. Call now for immediate response, 
            any time, any day. Insurance covers all emergency fees.
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            1300 DISASTER - 24/7 Emergency Line
          </Button>
        </div>
      </section>
    </div>
  );
}`;

const emergencyDir = path.join(__dirname, '..', 'src', 'app', 'emergency');
if (!fs.existsSync(emergencyDir)) {
  fs.mkdirSync(emergencyDir, { recursive: true });
}
fs.writeFileSync(path.join(emergencyDir, 'page.tsx'), indexContent);

console.log('\n✅ All emergency time-based pages generated successfully!');
console.log(`Generated ${emergencyTimeScenarios.length} emergency time pages.`);