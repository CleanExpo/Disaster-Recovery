'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, Users, Rocket, Copy, ExternalLink, 
  CheckCircle, Clock, MapPin, Phone, Mail,
  Building2, FileText, DollarSign, AlertCircle
} from 'lucide-react';

const DEMO_CREDENTIALS = {
  customer: {
    title: 'Customer Insurance Claim',
    description: 'Submit a claim as a homeowner with water damage',
    url: '/claim/start?demo=auto',
    credentials: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '0411 234 567',
      address: '42 Harbour View Drive, Sydney NSW 2000',
      claimNumber: 'CLM-2024-001234',
      insuranceCompany: 'NRMA Insurance',
      incidentType: 'Water Damage',
      description: 'Burst pipe in upstairs bathroom causing significant water damage'
    },
    features: [
      'Auto-fills customer information',
      'Simulates photo upload process',
      'Shows urgency triage system',
      'Demonstrates instant contractor dispatch',
      'Displays AI damage assessment'
    ],
    duration: '2 minutes'
  },
  contractor: {
    title: 'Contractor Application',
    description: 'Apply to join the network as a restoration contractor',
    url: '/contractor/apply?demo=auto',
    credentials: {
      businessName: 'Demo Restorations Pty Ltd',
      abn: '12 345 678 901',
      email: 'admin@demorestorations.com.au',
      phone: '0400 555 666',
      address: '100 Business Park Drive, Brisbane QLD 4000',
      insurancePolicy: 'POL-2024-789456',
      licenses: ['QBCC 123456', 'IICRC WRT', 'IICRC ASD'],
      serviceRadius: '50km',
      teamSize: '15 technicians'
    },
    features: [
      '7-step onboarding process',
      'Document upload simulation',
      'Insurance verification',
      'Equipment inventory',
      'WHS compliance checks',
      'Banking setup',
      'Training module access'
    ],
    duration: '3 minutes'
  },
  investor: {
    title: 'Investor Pitch Deck',
    description: 'Series A investment presentation for potential investors',
    url: '/demo/investor-pitch',
    credentials: {
      accessCode: 'SERIES-A-2024',
      presentationMode: 'Auto-play enabled',
      slides: '12 professional slides',
      financials: 'Full projections included'
    },
    features: [
      '$909M market opportunity',
      '5-year financial projections',
      'Unit economics breakdown',
      'Competitive analysis',
      'Team credentials',
      'Use of funds',
      'Exit strategy',
      'Live metrics dashboard'
    ],
    duration: '5 minutes'
  }
};

const MOCK_DATA_EXAMPLES = {
  recentClaims: [
    {
      id: 'CLM-2024-001234',
      customer: 'Sarah Johnson',
      type: 'Water Damage',
      location: 'Bondi Beach, NSW',
      value: '$12,500',
      status: 'In Progress',
      contractor: 'Elite Restorations'
    },
    {
      id: 'CLM-2024-001235',
      customer: 'Michael Chen',
      type: 'Fire Damage',
      location: 'Chatswood, NSW',
      value: '$45,000',
      status: 'Assessment',
      contractor: 'Rapid Response Team'
    },
    {
      id: 'CLM-2024-001236',
      customer: 'Emma Williams',
      type: 'Storm Damage',
      location: 'Gold Coast, QLD',
      value: '$8,900',
      status: 'Completed',
      contractor: 'Coastal Repairs'
    }
  ],
  contractors: [
    {
      name: 'Elite Restorations',
      location: 'Sydney Metro',
      rating: 4.9,
      jobs: 1247,
      specialties: ['Water', 'Mould', 'Fire'],
      responseTime: '< 2 hours'
    },
    {
      name: 'Rapid Response Team',
      location: 'Brisbane Region',
      rating: 4.8,
      jobs: 892,
      specialties: ['Emergency', 'Commercial', 'Fire'],
      responseTime: '< 1 hour'
    },
    {
      name: 'Coastal Repairs',
      location: 'Gold Coast',
      rating: 4.7,
      jobs: 634,
      specialties: ['Storm', 'Water', 'Structural'],
      responseTime: '< 3 hours'
    }
  ]
};

export default function DemoCredentialsPage() {
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Demo Credentials & Test Data
              </h1>
              <p className="text-lg text-gray-300">
                Everything you need to explore our platform demonstrations
              </p>
            </div>
            <Link 
              href="/demo"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-2"
            >
              Back to Demos
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Demo Access Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(DEMO_CREDENTIALS).map(([key, demo]) => (
            <div key={key} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{demo.title}</h2>
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-300 mb-2">{demo.description}</p>
                <p className="text-sm text-blue-400">Duration: {demo.duration}</p>
              </div>

              {/* Credentials */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Test Credentials</h3>
                {Object.entries(demo.credentials).map(([field, value]) => (
                  <div key={field} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-sm text-gray-400 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-mono">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                      <button
                        onClick={() => copyToClipboard(
                          Array.isArray(value) ? value.join(', ') : value,
                          `${key}-${field}`
                        )}
                        className="p-1 hover:bg-white/10 rounded transition"
                      >
                        {copiedItem === `${key}-${field}` ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Demo Features</h3>
                {demo.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Launch Button */}
              <Link
                href={demo.url}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                Launch Demo
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Sample Data Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Sample Live Data</h2>
          
          {/* Recent Claims */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Recent Insurance Claims</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Claim ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Value</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Contractor</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DATA_EXAMPLES.recentClaims.map((claim) => (
                    <tr key={claim.id} className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm text-white font-mono">{claim.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{claim.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{claim.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{claim.location}</td>
                      <td className="py-3 px-4 text-sm text-green-400 font-semibold">{claim.value}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          claim.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          claim.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{claim.contractor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Contractors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Top Performing Contractors</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {MOCK_DATA_EXAMPLES.contractors.map((contractor) => (
                <div key={contractor.name} className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{contractor.name}</h4>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {contractor.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-white font-semibold text-sm">{contractor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jobs Completed:</span>
                      <span className="text-white font-semibold">{contractor.jobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-green-400 font-semibold">{contractor.responseTime}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex flex-wrap gap-1">
                        {contractor.specialties.map((specialty) => (
                          <span key={specialty} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-300 mb-2">Demo Mode Instructions</h3>
              <ul className="text-sm text-yellow-200 space-y-1">
                <li>• All demos run with mock data - no real submissions are made</li>
                <li>• Click "Launch Demo" to see automatic form filling and system navigation</li>
                <li>• You can also manually explore each system using the provided credentials</li>
                <li>• Demo data resets every 24 hours</li>
                <li>• For investor access, please contact investors@nrp.com.au</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}