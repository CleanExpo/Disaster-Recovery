import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Moon, Sun, AlertTriangle, ArrowRight, DollarSign, MessageSquare} from 'lucide-react';

export const metadata: Metadata = {
  title: '24/7 Online Emergency Response Times & Fees | After Hours, Weekends, Holidays',
  description: 'Emergency disaster recovery available 24/7/365. After hours, weekends, and holiday surcharges explained. Insurance approved.' };

const scenarios = [
  {
    "name": "After Hours Emergency Service",
    "slug": "after-hours-emergency",
    "timeframe": "5PM - 9AM Weekdays",
    "surcharge": "$500",
    "responseTime": "30 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Weekend Emergency Response",
    "slug": "weekend-emergency",
    "timeframe": "Saturday & Sunday",
    "surcharge": "$750",
    "responseTime": "30 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Public Holiday Emergency",
    "slug": "public-holiday-emergency",
    "timeframe": "All Public Holidays",
    "surcharge": "$1000",
    "responseTime": "45 minutes",
    "urgencyLevel": "Critical"
  },
  {
    "name": "Midnight Emergency Response",
    "slug": "midnight-emergency",
    "timeframe": "12AM - 6AM",
    "surcharge": "$750",
    "responseTime": "45 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "Christmas Day Emergency",
    "slug": "christmas-emergency",
    "timeframe": "December 25th",
    "surcharge": "$1500",
    "responseTime": "60 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "New Year Emergency Service",
    "slug": "new-year-emergency",
    "timeframe": "December 31st - January 1st",
    "surcharge": "$1500",
    "responseTime": "60 minutes",
    "urgencyLevel": "Extreme"
  },
  {
    "name": "Early Morning Emergency",
    "slug": "early-morning-emergency",
    "timeframe": "4AM - 7AM",
    "surcharge": "$500",
    "responseTime": "30 minutes",
    "urgencyLevel": "High"
  },
  {
    "name": "Sunday Night Emergency",
    "slug": "sunday-night-emergency",
    "timeframe": "Sunday 6PM - Monday 6AM",
    "surcharge": "$750",
    "responseTime": "30 minutes",
    "urgencyLevel": "High"
  }
];

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
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${colorClass}`}>
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
                      Total: $${totalFee.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-3 mb-4">
                    <p className="text-sm font-bold text-green-800">
                      {scenario.responseTime} Response
                    </p>
                  </div>
                  <Link href={`/emergency/${scenario.slug}`}>
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
                          $${total.toLocaleString()}
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
            <MessageSquare className="mr-2 h-6 w-6" />
            Online Form Available 24/7 - 24/7 Emergency Line
          </Button>
        </div>
      </section>
    </div>
  );
}