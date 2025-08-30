'use client';

import { useState } from 'react';
import { Shield, MapPin, CheckCircle2, Users, Award, Building, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [isContractor, setIsContractor] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <Shield className="h-20 w-20 mx-auto mb-6 text-yellow-400 animate-pulse" />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Coming Soon: Australia's #1
              <span className="block text-yellow-400">Disaster Recovery Network</span>
            </h1>
            
            <p className="text-2xl mb-8 text-blue-200">
              The Most Authoritative Restoration Knowledge Base in the World
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                We're Building Something Revolutionary
              </h2>
              <p className="text-lg mb-6">
                A comprehensive platform connecting property owners with IICRC certified 
                restoration professionals, backed by scientific data from universities, 
                government standards, and peer-reviewed research.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-1" />
                  <div>
                    <p className="font-bold">100% Verified Contractors</p>
                    <p className="text-sm text-blue-200">IICRC certified only</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-1" />
                  <div>
                    <p className="font-bold">Scientific Authority</p>
                    <p className="text-sm text-blue-200">Peer-reviewed sources</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-1" />
                  <div>
                    <p className="font-bold">E.E.A.T Compliant</p>
                    <p className="text-sm text-blue-200">Google's highest standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Sources */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12 text-white">
            Our Knowledge Comes From The Best Sources
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur text-white border-blue-400">
              <h3 className="font-bold mb-2">Government Standards</h3>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• Australian Standards</li>
                <li>• Building Codes</li>
                <li>• EPA Guidelines</li>
                <li>• WorkSafe Requirements</li>
              </ul>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur text-white border-blue-400">
              <h3 className="font-bold mb-2">Scientific Research</h3>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• University Papers</li>
                <li>• CSIRO Research</li>
                <li>• Chemistry Studies</li>
                <li>• Material Science</li>
              </ul>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur text-white border-blue-400">
              <h3 className="font-bold mb-2">Industry Standards</h3>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• IICRC S500, S520</li>
                <li>• RIA Guidelines</li>
                <li>• ABRA Standards</li>
                <li>• WHO Protocols</li>
              </ul>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur text-white border-blue-400">
              <h3 className="font-bold mb-2">Technical Data</h3>
              <ul className="text-sm space-y-1 text-blue-200">
                <li>• BOM Weather Data</li>
                <li>• Building Materials</li>
                <li>• Psychrometric Charts</li>
                <li>• Drying Science</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contractor Registration Status */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white">
              <h2 className="text-3xl font-bold mb-6 text-centre">
                Areas Going Live Soon
              </h2>
              <p className="text-centre text-gray-600 mb-8">
                Service areas activate as IICRC certified contractors join our network
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4 text-green-600">✅ Ready to Launch</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>Brisbane CBD - 3 contractors verified</span>
                    </li>
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>Sydney North Shore - 2 contractors verified</span>
                    </li>
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      <span>Melbourne Eastern Suburbs - 4 contractors verified</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4 text-orange-600">🔄 In Progress</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                      <span>Perth Metro - Verification pending</span>
                    </li>
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                      <span>Adelaide CBD - Documentation review</span>
                    </li>
                    <li className="flex items-centre">
                      <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                      <span>Gold Coast - IICRC verification</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <p className="text-centre font-bold mb-2">
                  Are you an IICRC Certified Restoration Professional?
                </p>
                <p className="text-centre text-sm text-gray-600 mb-4">
                  Help us launch your area and get exclusive territory rights
                </p>
                <div className="text-centre">
                  <Link href="/contractors/apply">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Award className="mr-2 h-4 w-4" />
                      Apply to Join Network
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Notification Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-white">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-centre">
                    Get Notified When We Launch in Your Area
                  </h2>
                  
                  <form onSubmit={handleNotification} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="postcode">Your Postcode</Label>
                      <Input
                        id="postcode"
                        required
                        maxLength={4}
                        pattern="[0-9]{4}"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="4000"
                      />
                    </div>
                    
                    <div className="flex items-centre space-x-2">
                      <input
                        type="checkbox"
                        id="contractor"
                        checked={isContractor}
                        onChange={(e) => setIsContractor(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="contractor" className="font-normal">
                        I'm a restoration contractor interested in joining
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Notify Me When Available
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-centre py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're on the List!</h3>
                  <p className="text-gray-600">
                    We'll notify you as soon as we have verified contractors in {postcode}.
                  </p>
                  {isContractor && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="font-bold">Welcome, Future Partner!</p>
                      <p className="text-sm">We'll send you contractor onboarding information soon.</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold text-centre mb-12">
              Why We'll Be #1 Globally
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-white/10 backdrop-blur border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Unmatched Authority
                </h3>
                <p className="text-blue-200">
                  Every piece of content is backed by scientific research, government 
                  standards, and peer-reviewed studies. We don't guess - we know.
                </p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Dual Language Approach
                </h3>
                <p className="text-blue-200">
                  Technical accuracy for professionals, plain English for property 
                  owners. Everyone understands, everyone trusts.
                </p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Real-Time Verification
                </h3>
                <p className="text-blue-200">
                  Live contractor verification, real-time area activation, instant 
                  insurance validation. No outdated directories.
                </p>
              </Card>
              
              <Card className="p-6 bg-white/10 backdrop-blur border-yellow-400">
                <h3 className="text-xl font-bold mb-4 text-yellow-400">
                  Global Standards, Local Expertise
                </h3>
                <p className="text-blue-200">
                  IICRC international standards with local building codes, weather 
                  patterns, and regional requirements.
                </p>
              </Card>
            </div>
            
            <div className="mt-12 text-centre">
              <p className="text-2xl font-bold text-yellow-400 mb-4">
                "The Wikipedia of Disaster Recovery"
              </p>
              <p className="text-lg text-blue-200">
                But verified, actionable, and connected to real professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/20 text-white">
        <div className="container mx-auto px-4 text-centre">
          <p className="text-sm text-blue-200 mb-2">
            © 2024 Disaster Recovery Australia - Building the Future of Restoration
          </p>
          <p className="text-xs text-blue-300">
            Every fact verified. Every contractor certified. Every answer authoritative.
          </p>
        </div>
      </footer>
    </div>
  );
}