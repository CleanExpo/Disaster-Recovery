'use client';

import React from 'react';
import { 
  Shield, Users, TrendingUp, FileCheck, Calculator, 
  MessageSquare, Clock, AlertCircle, Building, HandshakeIcon,
  CheckCircle, Info, DollarSign, Star, Award, Globe
} from 'lucide-react';

// The UBER Model of Disaster Recovery - Complete Transparency
export function TransparencyHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - The Vision */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              The UBER of Disaster Recovery
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Revolutionary transparency connecting clients directly with vetted contractors.
              No hidden fees. No surprises. Just honest, professional restoration.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Globe className="h-12 w-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-semibold mb-2">National Coverage</h3>
                <p className="text-blue-100">115,000+ contractors across every Australian postcode</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Shield className="h-12 w-12 mb-4 text-green-400" />
                <h3 className="text-xl font-semibold mb-2">100% Transparent</h3>
                <p className="text-blue-100">See exactly what's covered and what isn't</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <Users className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">Direct Connection</h3>
                <p className="text-blue-100">No middleman markup, direct contractor rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different - The Revolution */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why We're Revolutionary</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Traditional Model */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-red-900 mb-6">❌ Traditional Model</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Insurance Dictates Everything</strong>
                    <p className="text-gray-600">You're told what's covered with no options</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Hidden Costs & Markups</strong>
                    <p className="text-gray-600">Multiple layers add unnecessary costs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>No Choice or Control</strong>
                    <p className="text-gray-600">Take it or leave it approach</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <div>
                    <strong>Confusing Process</strong>
                    <p className="text-gray-600">Nobody explains your actual coverage</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Our Model */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6">✓ Our UBER Model</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>You're Educated & Empowered</strong>
                    <p className="text-gray-600">We explain exactly what your policy covers</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Transparent Pricing</strong>
                    <p className="text-gray-600">See contractor rates directly, no hidden fees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Your Choice, Your Decision</strong>
                    <p className="text-gray-600">Choose to pay difference for non-covered items</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Clear Communication</strong>
                    <p className="text-gray-600">Every step explained in plain English</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Client Transparency Section */}
      <ClientTransparency />
      
      {/* Contractor Transparency Section */}
      <ContractorTransparency />
      
      {/* Site Manager Fee Explainer */}
      <SiteManagerFeeSection />
    </div>
  );
}

export function ClientTransparency() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">For Clients: Complete Transparency</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-600" />
              Understanding Your Claim - The Truth
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-lg mb-2">What Actually Happens:</h4>
                <p className="text-gray-700 mb-4">
                  When disaster strikes, most people don't understand their insurance coverage. 
                  We change that. Our contractors will:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Review your specific policy details with you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Explain what's likely covered vs. what might not be</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Provide options for items outside coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Let YOU decide what additional work you want</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Example Scenario:
                </h4>
                <p className="text-gray-700">
                  Your bathroom has water damage. Insurance covers the restoration but not 
                  the upgrade to premium tiles you've always wanted. We'll explain this clearly, 
                  quote both options, and let YOU choose whether to pay the difference for the upgrade.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">✅ What's Usually Covered:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Sudden water damage</li>
                    <li>• Fire and smoke damage</li>
                    <li>• Storm damage</li>
                    <li>• Theft/vandalism repairs</li>
                    <li>• Emergency mitigation</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-3">❓ Often Not Covered:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Gradual damage/wear</li>
                    <li>• Maintenance issues</li>
                    <li>• Upgrades/improvements</li>
                    <li>• Pre-existing damage</li>
                    <li>• Certain mould types</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg p-6">
                <p className="text-blue-900 font-medium">
                  <strong>Our Promise:</strong> No surprises. No pressure. Just honest, 
                  professional advice so you can make informed decisions about your property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContractorTransparency() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">For Contractors: Fair Partnership</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <HandshakeIcon className="h-6 w-6 text-green-600" />
              Join the Revolution - Be Your Own Boss
            </h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">Your Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Set your own rates within guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Choose your service areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Accept jobs that suit you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Direct payment, no delays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">Build your reputation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">We Provide:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">Qualified leads in your area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">Insurance liaison support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">Training & certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">Technology platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">Marketing & SEO power</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold mb-2">Pricing Guidelines Explained:</h4>
                <p className="text-gray-700 mb-3">
                  You set your own rates, but we provide industry guidelines to ensure:
                </p>
                <ul className="space-y-1 ml-4 text-gray-600">
                  <li>• Fair compensation for your expertise</li>
                  <li>• Competitive market positioning</li>
                  <li>• Client protection from overcharging</li>
                  <li>• Consistent quality standards</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
                <p className="text-gray-800">
                  <strong>The Bottom Line:</strong> We're partners, not bosses. You run your business, 
                  we provide the platform and support. Together, we're changing the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteManagerFeeSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-purple-600" />
              NEW: Site Manager Fee Option
            </h3>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
              <p className="text-purple-900 font-medium mb-3">
                For complex claims requiring expert policy navigation and project management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">When Applicable:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Large commercial projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Multi-unit complexes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Complex insurance claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Projects over $100,000</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">What It Covers:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Dedicated project manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Policy expertise & advocacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Multi-contractor coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-purple-500 mt-0.5" />
                    <span>Weekly progress reports</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Transparent Fee Structure:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Standard projects (under $50k):</span>
                  <span className="font-semibold">No site manager fee</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium projects ($50k-$100k):</span>
                  <span className="font-semibold">Optional 3-5% fee</span>
                </div>
                <div className="flex justify-between">
                  <span>Large projects (over $100k):</span>
                  <span className="font-semibold">5-8% recommended</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                *Fee is optional and only applied when client agrees to enhanced management services
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Client Choice:</strong> This fee is completely optional and transparent. 
                Clients can choose standard service or enhanced management based on their needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransparencyHub;