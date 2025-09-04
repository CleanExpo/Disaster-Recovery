'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Globe, Mail, CheckCircle, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Z_INDEX, CONTACT_METHODS, COLORS, ANIMATION } from '@/lib/ui-system';

// This is the UNIFIED page that uses the central UI system
// No phone numbers, no conflicts, no whack-a-mole

export default function UnifiedHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Digital Contact Bar - Uses unified Z_INDEX */}
      <div 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 shadow-lg"
        style={{ zIndex: Z_INDEX.EMERGENCY_BAR }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="animate-pulse">🚨</span>
            <span className="font-semibold">24/7 Digital Emergency Response</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition-colors">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              {CONTACT_METHODS.CHAT.label}
            </button>
            <button className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-green-400 transition-colors">
              Submit Claim
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Properly offset from fixed header */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION.normal / 1000 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Australia's #1 Digital
                <span className="block text-blue-600">Disaster Recovery Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION.normal / 1000, delay: 0.1 }}
                className="text-xl text-gray-600 mb-8"
              >
                Connect instantly with 115,000+ certified contractors.
                100% online. Zero phone calls. Help in minutes.
              </motion.p>

              {/* Contact Options - Digital Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION.normal / 1000, delay: 0.2 }}
                className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
              >
                {Object.entries(CONTACT_METHODS).map(([key, method], index) => (
                  <Card key={key} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      {key === 'CHAT' && <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />}
                      {key === 'FORM' && <Globe className="h-10 w-10 text-green-600 mx-auto mb-3" />}
                      {key === 'EMAIL' && <Mail className="h-10 w-10 text-purple-600 mx-auto mb-3" />}
                      <h3 className="font-semibold mb-1">{method.label}</h3>
                      <p className="text-sm text-gray-600">{method.responseTime}</p>
                      {method.available && (
                        <p className="text-xs text-green-600 mt-2">Available Now</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION.normal / 1000, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Start Live Chat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  Submit Online Claim
                  <Globe className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why We're Different
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Zap, title: 'Instant Response', desc: '60-minute arrival guarantee' },
                { icon: Shield, title: 'Insurance Approved', desc: 'Direct billing, no hassle' },
                { icon: Users, title: 'Certified Network', desc: '115,000+ professionals' },
                { icon: CheckCircle, title: '100% Digital', desc: 'No phone calls needed' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Emergency Services
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
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

        {/* Trust Indicators */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '115,000+', label: 'Contractors' },
                { value: '24/7', label: 'Availability' },
                { value: '60min', label: 'Response' },
                { value: '100%', label: 'Digital' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands who've discovered the future of disaster recovery.
              100% digital. 100% transparent. 100% reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Start Live Chat
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Submit Claim
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Button - Uses unified Z_INDEX */}
      <button 
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all"
        style={{ zIndex: Z_INDEX.CHAT_WIDGET }}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
      </button>
    </div>
  );
}