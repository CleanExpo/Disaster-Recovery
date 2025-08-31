import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response | All Australian Natural Disasters',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.' };

const disasters = [
  {
    "name": "Cyclone Damage Recovery",
    "slug": "cyclone-response",
    "description": "Expert cyclone damage restoration including structural repairs, water extraction, and debris removal",
    "severity": "Extreme",
    "regions": [
      "Far North Queensland",
      "Northern Territory",
      "North Western Australia"
    ]
  },
  {
    "name": "Bushfire & Smoke Damage",
    "slug": "bushfire-restoration",
    "description": "Complete bushfire recovery including smoke damage, soot removal, and structural restoration",
    "severity": "Extreme",
    "regions": [
      "NSW",
      "Victoria",
      "South Australia",
      "Tasmania",
      "Western Australia"
    ]
  },
  {
    "name": "Major Flood Recovery",
    "slug": "flood-recovery",
    "description": "Comprehensive flood damage restoration, water extraction, and mould prevention",
    "severity": "High",
    "regions": [
      "Queensland",
      "Northern NSW",
      "Victoria"
    ]
  },
  {
    "name": "Severe Storm Response",
    "slug": "storm-damage",
    "description": "Emergency storm damage repairs including roof tarping, water extraction, and debris removal",
    "severity": "High",
    "regions": [
      "All Australian States"
    ]
  },
  {
    "name": "Coastal & Storm Surge Damage",
    "slug": "coastal-erosion",
    "description": "Specialised coastal property restoration from storm surge, king tides, and erosion damage",
    "severity": "High",
    "regions": [
      "All Coastal Areas"
    ]
  }
];

export default function DisastersPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Disaster Types Coverage
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Complete disaster recovery services for every type of natural disaster nationwide
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasters.map((disaster, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                    disaster.severity === 'Extreme' ? 'bg-red-600' : 'bg-orange-600'
                  }`}>
                    {disaster.severity}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{disaster.name}</h2>
                <p className="text-gray-600 mb-4">{disaster.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  Regions: {disaster.regions.slice(0, 2).join(', ')}
                  {disaster.regions.length > 2 && ` +${disaster.regions.length - 2} more`}
                </div>
                <Link href={`/disasters/${disaster.slug}`}>
                  <Button variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}