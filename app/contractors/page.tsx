import { Metadata } from 'next';
import { Shield, CheckCircle2, Users, TrendingUp, Award, DollarSign, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { CONTRACTOR_REQUIREMENTS, SERVICE_RADIUS_OPTIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Join Our Network | IICRC Certified Contractors | Disaster Recovery',
  description: 'Join Australia\'s premier disaster recovery network. IICRC certification required. Get qualified leads in your service area.' };

export default function ContractorsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Quality Leads',
      description: 'Pre-qualified emergency leads with insurance coverage',
      value: '$550+ per lead value'
    },
    {
      icon: MapPin,
      title: 'Territory Control',
      description: 'Define your service radius (20-100km)',
      value: 'Exclusive territories available'
    },
    {
      icon: Users,
      title: 'No Call Centres',
      description: 'Direct connection to customers in need',
      value: 'You control the relationship'
    },
    {
      icon: TrendingUp,
      title: 'Growth Support',
      description: 'Marketing and business development resources',
      value: 'Proven growth strategies'
    }
  ];

  const requirements = [
    'IICRC Certification (Water, Fire, or Mould)',
    'Current Disaster Recovery Network Membership',
    'Minimum $20M Public Liability Insurance',
    '24/7 Online Emergency Response Capability',
    'Professional Equipment & Vehicles',
    'Trained & Certified Technicians',
    'Quality Management Systems',
    'Customer Service Excellence'
  ];

  const membershipTiers = [
    {
      name: 'Local Partner',
      radius: '20km',
      leads: '10-20/month',
      price: '$500/month',
      features: [
        '20km exclusive radius',
        'Residential leads only',
        'Standard priority',
        'Basic listing'
      ]
    },
    {
      name: 'Regional Partner',
      radius: '50km',
      leads: '30-50/month',
      price: '$1,500/month',
      features: [
        '50km service radius',
        'Residential & commercial',
        'Priority dispatch',
        'Enhanced listing',
        'Marketing support'
      ],
      popular: true
    },
    {
      name: 'Premium Partner',
      radius: '100km',
      leads: '50-100/month',
      price: '$3,000/month',
      features: [
        '100km territory',
        'All property types',
        'First priority dispatch',
        'Premium listing',
        'Full marketing suite',
        'Account management'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Premier Disaster Recovery Network
            </h1>
            <p className="text-xl mb-8">
              Connect with customers who need your expertise. 
              IICRC certified contractors only.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <p className="text-2xl font-bold mb-2">
                Qualified Leads • Your Territory • No Competition
              </p>
              <p className="text-lg">
                Average lead value: $5,500+ • Close rate: 85%+
              </p>
            </div>
            <Link href="/contractors/apply">
              <Button size="lg" className="bg-blue-700 hover:bg-orange-700 text-lg px-8 py-6">
                Apply to Join Network
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Network?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 mb-3">{benefit.description}</p>
                  <p className="text-green-600 font-bold">{benefit.value}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Network Requirements
            </h2>
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-blue-700 mr-3" />
                <h3 className="text-2xl font-bold">Qualification Standards</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <p className="text-center font-bold text-blue-900">
                  We maintain the highest standards to ensure customer satisfaction 
                  and protect our network's reputation.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Membership Options
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the coverage area that matches your capacity. 
            Upgrade or downgrade anytime based on your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`p-8 ${tier.popular ? 'border-2 border-blue-700 relative' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">{tier.price}</p>
                <p className="text-gray-600 mb-6">
                  {tier.radius} radius • {tier.leads} expected
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contractors/apply">
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-blue-700 hover:bg-orange-700' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Select {tier.name}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Lead Distribution Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Customer Submits Request</h3>
                    <p className="text-gray-600">
                      Customer fills out detailed form with location, damage type, and urgency. 
                      System validates insurance and property details.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Smart Radius Matching</h3>
                    <p className="text-gray-600">
                      System identifies all qualified contractors within the selected radius 
                      (20km, 25km, 50km, or 100km) of the property.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lead Notification</h3>
                    <p className="text-gray-600">
                      Qualified contractors receive instant notification with full job details. 
                      First to respond gets priority consideration.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Direct Customer Connection</h3>
                    <p className="text-gray-600">
                      You quote directly to the customer. No middleman, no commission on jobs. 
                      You own the relationship.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Network Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-blue-600 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Joined 6 months ago and now getting 40+ quality leads per month. 
                The radius system means no competition from across town."
              </p>
              <p className="font-bold">- John's Restoration, Brisbane</p>
              <p className="text-sm text-gray-500">Regional Partner - 50km</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-blue-600 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Best decision for our business. Insurance-approved leads with 
                realistic customers who understand the $2,200 minimum."
              </p>
              <p className="font-bold">- Premium Restore, Sydney</p>
              <p className="text-sm text-gray-500">Premium Partner - 100km</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-blue-600 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Growing steadily with the local partner plan. Perfect for our 
                small team. Upgrade path is clear as we expand."
              </p>
              <p className="font-bold">- Rapid Dry Services, Adelaide</p>
              <p className="text-sm text-gray-500">Local Partner - 20km</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Grow Your Restoration Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join Most trusted disaster recovery network. 
            IICRC certified contractors only. Territories filling fast.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">Limited Territories Available</p>
            <p className="text-lg">
              First qualified contractor in each area gets exclusive rights
            </p>
          </div>
          <Link href="/contractors/apply">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6">
              Apply Now - Secure Your Territory
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}