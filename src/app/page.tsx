import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Shield, Clock, Users, CheckCircle2, ArrowRight, MapPin, Award } from 'lucide-react'
import { BUSINESS_NAME } from '@/lib/constants'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">24/7 EMERGENCY RESPONSE - GET HELP NOW</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {BUSINESS_NAME}
            </h1>
            <p className="text-2xl mb-8">
              Australia's Trusted Network of IICRC Certified Restoration Professionals
            </p>
            <p className="text-xl mb-8 text-blue-200">
              Water Damage • Fire Restoration • Mould Removal • Flood Recovery
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur p-3 text-center">
                <Shield className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm font-bold">IICRC Certified</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-3 text-center">
                <Clock className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm font-bold">30-60min Response</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-3 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm font-bold">All Australia</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-3 text-center">
                <Users className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm font-bold">Local Contractors</p>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/get-help">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Get Emergency Help Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contractors">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6">
                  <Award className="mr-2 h-5 w-5" />
                  Join Our Network
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Our System Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Submit Request</h3>
              <p className="text-sm text-gray-600">
                Fill out our simple online form with your damage details
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Smart Matching</h3>
              <p className="text-sm text-gray-600">
                We find qualified contractors in your selected radius
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Get Quotes</h3>
              <p className="text-sm text-gray-600">
                Receive multiple quotes from certified professionals
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Choose & Start</h3>
              <p className="text-sm text-gray-600">
                Select your contractor and begin restoration
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Disaster Recovery Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/services/water-damage">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold mb-3">Water Damage Restoration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>24/7 water extraction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Structural drying</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Insurance approved</span>
                  </li>
                </ul>
              </Card>
            </Link>
            
            <Link href="/services/fire-damage">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold mb-3">Fire & Smoke Damage</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Smoke & soot removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Odour elimination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Complete restoration</span>
                  </li>
                </ul>
              </Card>
            </Link>
            
            <Link href="/services/mould-removal">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold mb-3">Mould Remediation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Safe mould removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Air quality testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Prevention treatment</span>
                  </li>
                </ul>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Network Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Network Standards
            </h2>
            <Card className="p-8 bg-blue-50">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Every Contractor Must Have:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>IICRC Certification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>$20M Public Liability Insurance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>24/7 Emergency Response</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>Current Network Membership</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Customer Benefits:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span>Multiple competitive quotes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span>Choose your service radius</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span>Direct contractor relationship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <span>Quality guaranteed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Australia-Wide Coverage
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { state: 'NSW', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
              { state: 'VIC', cities: ['Melbourne', 'Geelong', 'Ballarat'] },
              { state: 'QLD', cities: ['Brisbane', 'Gold Coast', 'Cairns'] },
              { state: 'WA', cities: ['Perth', 'Fremantle', 'Bunbury'] },
              { state: 'SA', cities: ['Adelaide', 'Mount Gambier'] },
              { state: 'TAS', cities: ['Hobart', 'Launceston'] },
              { state: 'ACT', cities: ['Canberra'] },
              { state: 'NT', cities: ['Darwin', 'Alice Springs'] }
            ].map((location, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-bold text-lg mb-2">{location.state}</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {location.cities.map((city, idx) => (
                    <li key={idx}>• {city}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600">
            Plus hundreds more suburbs and regional areas
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">
            Disaster Can't Wait - Neither Should You
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect instantly with IICRC certified contractors in your area. 
            Get multiple quotes, choose your contractor, start recovery.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">$2,200 Minimum Service Fee</p>
            <p className="text-lg">Insurance approved • Direct billing available</p>
          </div>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6">
              Get Help Now - Online Form
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">{BUSINESS_NAME}</h3>
              <p className="text-sm text-gray-400">
                Australia's trusted network of IICRC certified disaster recovery professionals.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/get-help" className="hover:text-white">Get Emergency Help</Link></li>
                <li><Link href="/services" className="hover:text-white">Our Services</Link></li>
                <li><Link href="/locations" className="hover:text-white">Service Areas</Link></li>
                <li><Link href="/insurance" className="hover:text-white">Insurance Claims</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contractors" className="hover:text-white">Join Our Network</Link></li>
                <li><Link href="/contractors/apply" className="hover:text-white">Apply Now</Link></li>
                <li><Link href="/contractors/standards" className="hover:text-white">Standards</Link></li>
                <li><Link href="/contractors/benefits" className="hover:text-white">Benefits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/emergency" className="hover:text-white">Emergency Times</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing Guide</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 {BUSINESS_NAME}. All rights reserved. | IICRC Certified Network</p>
          </div>
        </div>
      </footer>
    </div>
  )
}