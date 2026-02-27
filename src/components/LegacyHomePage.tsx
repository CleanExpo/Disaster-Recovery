'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe, Clock, Shield, Users, Zap, Star, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LegacyHomePage() {
  return (
    <div className="min-h-screen">
      {/* Storm Effects - BACKGROUND ONLY with negative z-index */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -10 }}
        aria-hidden="true"
      >
        {/* Storm clouds gradient - far background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-blue-900/10 to-indigo-900/10" />

        {/* Animated clouds - still in background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 via-slate-800/5 to-blue-900/5 animate-pulse"
               style={{ animationDuration: '8s' }} />
        </div>
      </div>


      {/* Main Content */}
      <main className="relative" style={{ zIndex: 1 }}>

        {/* Hero Section with Gradient Overlay */}
        <section className="py-20 bg-gradient-to-b from-blue-50/95 to-white/95 backdrop-blur-sm hero-gradient-overlay">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 hero-title"
              >
                <span className="text-4xl sm:text-6xl md:text-8xl font-black text-blue-600 block mb-4 tracking-tight animate-pulse" style={{ animationDuration: '3s' }}>WHO'S FIRST</span>
                Australia's #1 Digital Disaster
                <span className="block gradient-text">Recovery Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-700 mb-8"
              >
                Connect with Australia's elite IICRC-certified restoration specialists.
                24-48 hour response prevents 50% of secondary damage. 100% online.
              </motion.p>

              {/* Digital Contact Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8"
              >
<Card className="card-hover glass cursor-pointer bg-white/95 overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <Globe className="h-10 w-10 text-green-600 mx-auto mb-3 floating" style={{ animationDelay: '0.5s' }} />
                    <h3 className="font-semibold mb-1">Online Claim</h3>
                    <p className="text-sm text-gray-700">2-minute form</p>
                    <p className="text-xs text-green-600 mt-2">Quick & Easy</p>
                  </CardContent>
                </Card>

                <Card className="card-hover glass cursor-pointer bg-white/95 overflow-hidden group">
                  <CardContent className="p-6 text-center relative">
                    <Mail className="h-10 w-10 text-purple-600 mx-auto mb-3 floating" style={{ animationDelay: '1s' }} />
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-sm text-gray-700">Detailed help</p>
                    <p className="text-xs text-green-600 mt-2">&lt; 1hr response</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Primary CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
<Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg bg-white/95 border-gradient hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/claim'}
                >
                  Submit Online Claim
                  <Globe className="ml-2 h-5 w-5 animate-pulse" />
                </Button>

                <Button
                  size="lg"
                  className="ml-4 px-8 py-6 text-lg bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = '/demo/workflow'}
                >
                  View Workflow Demo
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Credibility Banner */}
        <section className="py-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold">4,000+</div>
                <div className="text-sm opacity-90">Lives saved annually</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">688</div>
                <div className="text-sm opacity-90">Mesothelioma deaths prevented</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm opacity-90">Increase in disasters since 2019</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30" />
              <div>
                <div className="text-2xl font-bold">3.7%</div>
                <div className="text-sm opacity-90">Master Technician elite status</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Emergency Services - 100% Digital
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Water Damage', icon: '💧', urgent: true, desc: 'Burst pipes to major floods' },
                { title: 'Fire & Smoke', icon: '🔥', urgent: true, desc: 'Kitchen fires to bushfires' },
                { title: 'Mould Remediation', icon: '🦠', urgent: false, desc: 'All species & contamination' },
                { title: 'Storm Damage', icon: '⛈️', urgent: true, desc: 'Cyclones to hail damage' }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  viewport={{ once: true }}
                  className="service-card bg-white rounded-xl p-6 shadow-lg cursor-pointer glass"
                >
                  {service.urgent && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full mb-3">
                      URGENT - 24/7
                    </span>
                  )}
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">{service.desc}</p>
                  <div
                    className="text-blue-600 font-semibold hover:text-blue-700 px-4 py-0 flex items-center justify-center rounded-lg transition-all hover:bg-blue-50 cursor-pointer"
                    style={{
                      height: '44px',
                      minHeight: '44px',
                      lineHeight: '1',
                      boxSizing: 'border-box'
                    }}
                    onClick={() => window.location.href = '/services'}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && (window.location.href = '/services')}
                    aria-label={`Get help for ${service.title}`}
                  >
                    Get Help Online →
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Complete Coverage Across Australia
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '<10,000', label: 'IICRC Certified Contractors' },
                { value: '24/7', label: 'Digital Availability' },
                { value: '60min', label: 'Response Time' },
                { value: '100%', label: 'Online Platform' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-blue-800">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              All Property Types Covered
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Residential</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Single homes to 80+ floor high-rises</li>
                  <li>• Granny flats to luxury penthouses</li>
                  <li>• Strata & body corporate</li>
                  <li>• Student accommodation</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Commercial</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Corner shops to mega malls</li>
                  <li>• Offices to corporate towers</li>
                  <li>• Hotels, restaurants, cafes</li>
                  <li>• Medical centers & pharmacies</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Industrial</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Warehouses to factories</li>
                  <li>• Data centers & clean rooms</li>
                  <li>• Mining sites & oil rigs</li>
                  <li>• PNG & offshore operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why We're Different
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Clock, title: '24-48hr Critical', desc: 'Prevents mould growth' },
                { icon: Shield, title: '$1.37B Market', desc: 'Industry-leading standards' },
                { icon: Users, title: '<10,000 Elite', desc: 'IICRC certified in Australia' },
                { icon: Zap, title: '50%+ Time Savings', desc: 'vs rebuilding' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', title: 'Report Online', desc: 'Chat, form or email' },
                { step: '2', title: 'AI Matching', desc: 'Instant contractor match' },
                { step: '3', title: 'Get Estimate', desc: 'Transparent pricing' },
                { step: '4', title: 'Work Begins', desc: 'Fast response guaranteed' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by Thousands
            </h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-600 fill-current" />
              ))}
            </div>
            <p className="text-center text-lg text-gray-700 mb-12">
              4.9/5 from 10,000+ verified reviews
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "Response was incredible. Water damage fixed within hours.",
                  author: "Sarah M.",
                  location: "Brisbane",
                  service: "Water Damage"
                },
                {
                  quote: "Insurance handled perfectly. No stress, just results.",
                  author: "James C.",
                  location: "Sydney",
                  service: "Fire Restoration"
                },
                {
                  quote: "Professional, fast, and exactly as estimated.",
                  author: "Emma W.",
                  location: "Melbourne",
                  service: "Storm Recovery"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-600 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-700">{testimonial.location}</p>
                      <p className="text-xs text-blue-600 mt-1">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Emergency? Get Help Now
            </h2>
            <p className="text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
              100% digital platform. No phone calls needed.
              Connect instantly with certified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-6 text-lg"
                onClick={() => window.location.href = '/claim'}
              >
                Submit Claim Online
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
