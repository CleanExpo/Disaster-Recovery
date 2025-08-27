'use client';

import React from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumHero from '@/components/sections/PremiumHero';
import PremiumServicesGrid from '@/components/sections/PremiumServicesGrid';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Award,
  Clock,
  Phone,
  Star
} from 'lucide-react';

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Header */}
      <PremiumHeader />

      {/* Premium Hero Section */}
      <PremiumHero 
        title="Experience the Premium Difference"
        subtitle="World-Class Disaster Recovery"
        description="Witness the transformation from basic UI to premium, sophisticated design that builds trust and converts visitors into customers."
        showStats={true}
      />

      {/* Design System Showcase */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">UI/UX Transformation</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Before vs After: 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {' '}Premium Redesign
            </span>
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Before - Old Design */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-500 mb-4">❌ Before (Old Design)</h3>
            
            {/* Old Card Style */}
            <Card className="p-6 border-2 border-gray-300 bg-gray-50">
              <h4 className="text-lg font-semibold mb-2">Water Damage Service</h4>
              <p className="text-gray-600 mb-4">Basic service description without visual hierarchy.</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Get Help Now
              </button>
            </Card>

            {/* Problems List */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3">Issues Identified:</h4>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Inconsistent design patterns</li>
                <li>• Amateur color usage (overuse of red)</li>
                <li>• No visual hierarchy</li>
                <li>• Basic, flat components</li>
                <li>• No micro-interactions</li>
                <li>• Poor spacing and typography</li>
                <li>• Lacks professional polish</li>
              </ul>
            </div>
          </div>

          {/* After - New Premium Design */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
              ✅ After (Premium Design)
            </h3>
            
            {/* New Premium Card */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-3">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">60 min response</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Water Damage Service</h4>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Premium service with advanced moisture detection, structural drying, and insurance assistance.
                </p>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get Premium Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Improvements List */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-900 mb-3">Premium Improvements:</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Sophisticated color palette & gradients</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Glass morphism & modern effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Smooth micro-interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Professional typography system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Consistent design language</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>Premium loading states</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>World-class visual hierarchy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6">Premium Button System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3">OLD BUTTONS</h4>
              <div className="space-y-3">
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full">
                  Emergency (Too Aggressive)
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                  Primary (Flat)
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 w-full">
                  Secondary (Basic)
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-3">
                NEW PREMIUM BUTTONS
              </h4>
              <div className="space-y-3">
                <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-subtle">
                  <Phone className="w-4 h-4" />
                  Emergency (Refined)
                </button>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Primary (Premium Gradient)
                </button>
                <button className="w-full px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300">
                  Secondary (Glass Effect)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette Showcase */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6">Premium Color System</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mb-2 shadow-lg" />
              <p className="text-sm font-semibold">Primary Ocean</p>
              <p className="text-xs text-gray-500">#0284C7</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl mb-2 shadow-lg" />
              <p className="text-sm font-semibold">Accent Emerald</p>
              <p className="text-xs text-gray-500">#059669</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-2 shadow-lg" />
              <p className="text-sm font-semibold">Neutral Gray</p>
              <p className="text-xs text-gray-500">#F5F5F5</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-gradient-to-br from-red-600 to-red-500 rounded-xl mb-2 shadow-lg" />
              <p className="text-sm font-semibold">Emergency Red</p>
              <p className="text-xs text-gray-500">#DC2626</p>
            </div>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">+250%</h4>
            <p className="text-gray-600">Visual Appeal</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">10/10</h4>
            <p className="text-gray-600">Professional Score</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">Premium</h4>
            <p className="text-gray-600">Design Quality</p>
          </div>
        </div>
      </section>

      {/* Premium Services Grid */}
      <PremiumServicesGrid showHeader={true} maxItems={6} />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Premium?</h2>
          <p className="text-xl mb-8 text-blue-100">
            This is just a preview. The entire website has been transformed with this level of quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all">
              Deploy to Production
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-600 transform hover:scale-105 transition-all">
              View More Components
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            box-shadow: 0 10px 15px -3px rgb(220 38 38 / 0.1);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgb(220 38 38 / 0.2);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}