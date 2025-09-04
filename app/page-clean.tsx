'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Shield, Users, 
  Zap, Star, MessageCircle, Globe, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CleanHomePage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    { 
      title: 'Water Damage', 
      icon: '💧', 
      description: 'Emergency water extraction and drying',
      urgent: true 
    },
    { 
      title: 'Fire & Smoke', 
      icon: '🔥', 
      description: 'Complete fire damage restoration',
      urgent: true 
    },
    { 
      title: 'Mould Remediation', 
      icon: '🦠', 
      description: 'Safe and thorough mould removal',
      urgent: false 
    },
    { 
      title: 'Storm Damage', 
      icon: '⛈️', 
      description: 'Emergency repairs and restoration',
      urgent: true 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Digital Contact Bar - NO PHONE */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="animate-pulse">🚨</span>
            <span className="font-semibold">24/7 Digital Emergency Response</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition-colors">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Live Chat
            </button>
            <Link href="/claim" className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-green-400 transition-colors">
              Submit Claim
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Australia's #1 Digital
              <span className="block text-blue-600">Disaster Recovery Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Connect instantly with 115,000+ certified contractors.
              100% online. No phone calls needed. Get help in minutes.
            </motion.p>

            {/* Digital Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-sm text-gray-600">Instant response</p>
                  <p className="text-xs text-green-600 mt-2">Available Now</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Globe className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Online Claim</h3>
                  <p className="text-sm text-gray-600">2-minute form</p>
                  <p className="text-xs text-green-600 mt-2">Quick & Easy</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Mail className="h-10 w-10 text-purple-600 mx-auto mb-3" />
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

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Emergency Services - 100% Online
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onMouseEnter={() => setActiveService(index)}
              >
                {service.urgent && (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full mb-3">
                    URGENT
                  </span>
                )}
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  Get Help Online →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get Help in 4 Simple Steps - All Online
          </h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Report Online', desc: 'Chat or submit form', icon: MessageCircle },
              { step: '2', title: 'AI Matching', desc: 'Instant contractor match', icon: Zap },
              { step: '3', title: 'Get Estimate', desc: 'Transparent pricing', icon: Shield },
              { step: '4', title: 'Work Begins', desc: 'Contractor arrives', icon: CheckCircle }
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
                <item.icon className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">115,000+</div>
              <div className="text-blue-100">Certified Contractors</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-blue-100">Online Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold">60min</div>
              <div className="text-blue-100">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-blue-100">Digital Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Emergency? Get Help Now - 100% Online
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No phone calls needed. Connect instantly through our digital platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Start Live Chat Now
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
              Submit Emergency Claim
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-50">
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping" />
      </button>
    </div>
  );
}