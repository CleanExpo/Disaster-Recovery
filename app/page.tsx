'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, MessageCircle, Globe, CheckCircle, 
  Clock, Shield, Users, Zap, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
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

      {/* Single Digital Contact Bar - Top */}
      <header 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 shadow-lg"
        style={{ zIndex: 100 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="animate-pulse">🚨</span>
            <span className="font-semibold">24/7 Digital Emergency Response</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const event = new CustomEvent('openChat');
                window.dispatchEvent(event);
              }}
              className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition-colors"
            >
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Live Chat
            </button>
            <a 
              href="/claim"
              className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-green-400 transition-colors"
            >
              Submit Claim
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - PROPERLY OFFSET */}
      <main className="relative" style={{ paddingTop: '64px', zIndex: 1 }}>
        
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50/95 to-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Australia's Digital Disaster
                <span className="block text-blue-600">Recovery Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 mb-8"
              >
                Connect with 115,000+ certified contractors instantly.
                100% online. No phone calls. Help in minutes.
              </motion.p>

              {/* Digital Contact Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/95">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-sm text-gray-600">Instant response</p>
                    <p className="text-xs text-green-600 mt-2">Available Now</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/95">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Online Claim</h3>
                    <p className="text-sm text-gray-600">2-minute form</p>
                    <p className="text-xs text-green-600 mt-2">Quick & Easy</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/95">
                  <CardContent className="p-6 text-center">
                    <Globe className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-sm text-gray-600">Detailed help</p>
                    <p className="text-xs text-green-600 mt-2">< 1hr response</p>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                  onClick={() => {
                    const event = new CustomEvent('openChat');
                    window.dispatchEvent(event);
                  }}
                >
                  Start Live Chat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg bg-white/95"
                >
                  Submit Online Claim
                  <Globe className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
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
                { title: 'Water Damage', icon: '💧', urgent: true },
                { title: 'Fire & Smoke', icon: '🔥', urgent: true },
                { title: 'Mould Remediation', icon: '🦠', urgent: false },
                { title: 'Storm Damage', icon: '⛈️', urgent: true }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  {service.urgent && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full mb-3">
                      URGENT
                    </span>
                  )}
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Get Help Online →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Clock, title: '60min Response', desc: 'Guaranteed arrival' },
                { icon: Shield, title: 'Insurance Direct', desc: 'We handle claims' },
                { icon: Users, title: '115,000+ Pros', desc: 'Certified network' },
                { icon: Zap, title: '100% Digital', desc: 'No phone needed' }
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
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', title: 'Report Online', desc: 'Chat or form' },
                { step: '2', title: 'AI Matching', desc: 'Instant match' },
                { step: '3', title: 'Get Estimate', desc: 'Transparent pricing' },
                { step: '4', title: 'Work Begins', desc: 'Fast response' }
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
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50/95 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Trusted by Thousands
            </h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-center text-lg text-gray-600 mb-12">
              4.9/5 from 10,000+ verified reviews
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "Response was incredible. Water damage fixed within hours.",
                  author: "Sarah M.",
                  location: "Brisbane"
                },
                {
                  quote: "Insurance handled perfectly. No stress, just results.",
                  author: "James C.",
                  location: "Sydney"
                },
                {
                  quote: "Professional, fast, and exactly as estimated.",
                  author: "Emma W.",
                  location: "Melbourne"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
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
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              100% digital platform. No phone calls needed. 
              Connect instantly with certified professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
                onClick={() => {
                  const event = new CustomEvent('openChat');
                  window.dispatchEvent(event);
                }}
              >
                Start Live Chat
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                className="bg-green-500 hover:bg-green-400 text-white px-8 py-6 text-lg"
              >
                Submit Claim Online
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* SINGLE Chat Button - Bottom Right */}
      <button 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
        style={{ zIndex: 90 }}
        aria-label="Open chat"
        onClick={() => {
          const event = new CustomEvent('openChat');
          window.dispatchEvent(event);
        }}
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
      </button>

      {/* Mobile Bottom Bar - Optional */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-xl md:hidden"
        style={{ zIndex: 80 }}
      >
        <div className="grid grid-cols-2 gap-1 p-2">
          <button 
            onClick={() => {
              const event = new CustomEvent('openChat');
              window.dispatchEvent(event);
            }}
            className="flex flex-col items-center justify-center py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <MessageCircle className="h-6 w-6 text-blue-600 mb-1" />
            <span className="text-xs font-medium">Live Chat</span>
          </button>
          <a 
            href="/claim"
            className="flex flex-col items-center justify-center py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Globe className="h-6 w-6 text-green-600 mb-1" />
            <span className="text-xs font-medium">Submit Claim</span>
          </a>
        </div>
      </div>
    </div>
  );
}