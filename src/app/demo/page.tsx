'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Rocket, Users, Building2, TrendingUp, Shield, 
  PlayCircle, FileText, ChevronRight, Sparkles
} from 'lucide-react';

const demos = [
  {
    title: 'Insurance Claim Portal',
    description: 'Watch how customers submit claims with our intelligent form auto-completion and AI damage assessment',
    icon: Shield,
    href: '/claim/start?demo=auto',
    features: ['Auto-fill demo', 'Photo upload', 'Urgency triage', 'Instant dispatch'],
    bgColor: 'from-green-600 to-emerald-600',
    status: 'live'
  },
  {
    title: 'Contractor Application',
    description: 'Experience our streamlined contractor onboarding process with auto-fill demonstration',
    icon: Users,
    href: '/contractor/apply?demo=auto',
    features: ['7-step process', 'Auto-fill demo', 'Document upload', 'Real-time validation'],
    bgColor: 'from-blue-600 to-cyan-600',
    status: 'live'
  },
  {
    title: 'Investor Pitch Deck',
    description: 'Professional 12-slide presentation showcasing our vision, market opportunity, and growth strategy',
    icon: Rocket,
    href: '/demo/investor-pitch',
    features: ['Auto-play mode', '12 slides', 'Professional design', 'Mobile responsive'],
    bgColor: 'from-purple-600 to-pink-600',
    status: 'live'
  },
  {
    title: 'AI Claims Matching',
    description: 'See how our AI instantly matches insurance claims with qualified contractors',
    icon: Sparkles,
    href: '/ai-demo',
    features: ['Real-time matching', 'Smart scoring', 'Location-based', 'Instant dispatch'],
    bgColor: 'from-green-600 to-teal-600',
    status: 'live'
  },
  {
    title: 'Contractor Training',
    description: 'Interactive training modules for water damage, mould remediation, and safety compliance',
    icon: FileText,
    href: '/contractor/training/demo?auto=true',
    features: ['Video content', 'Certifications', 'Progress tracking', 'Interactive tests'],
    bgColor: 'from-blue-700 to-red-600',
    status: 'live'
  },
  {
    title: 'Emergency Response',
    description: 'Live emergency response tracker showing real-time team dispatch and coordination',
    icon: Shield,
    href: '/r6-demo',
    features: ['Live tracking', 'Team status', 'Response times', 'Heat mapping'],
    bgColor: 'from-red-600 to-pink-600',
    status: 'live'
  },
  {
    title: 'Premium Dashboard',
    description: 'Advanced analytics dashboard for enterprise clients with comprehensive metrics',
    icon: TrendingUp,
    href: '/premium-demo',
    features: ['Real-time data', 'Custom reports', 'Team analytics', 'Revenue tracking'],
    bgColor: 'from-indigo-600 to-purple-600',
    status: 'live'
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Platform Demonstrations
              </h1>
              <p className="text-lg text-gray-300">
                Experience the power of our disaster recovery platform through interactive demos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/demo/credentials"
                className="px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition flex items-center gap-2"
              >
                View Test Credentials
              </Link>
              <Link 
                href="/"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-2"
              >
                <Building2 className="h-5 w-5" />
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${demo.bgColor} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500/20 text-emerald-600 text-xs font-semibold rounded-full border border-green-500/30">
                      {demo.status === 'live' ? 'LIVE DEMO' : 'COMING SOON'}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${demo.bgColor} p-3 mb-6`}>
                    <Icon className="h-full w-full text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {demo.title}
                  </h3>
                  <p className="text-gray-300 mb-6 line-clamp-2">
                    {demo.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {demo.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={demo.href}
                    className={`
                      w-full py-3 rounded-lg font-semibold text-white transition-all
                      bg-gradient-to-r ${demo.bgColor} opacity-90 hover:opacity-100
                      flex items-center justify-center gap-2 group
                    `}
                  >
                    <PlayCircle className="h-5 w-5" />
                    Launch Demo
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why These Demos Matter
            </h2>
            <p className="text-gray-300 mb-6">
              Each demonstration showcases a different aspect of our comprehensive disaster recovery platform. 
              From AI-powered contractor matching to real-time emergency response coordination, these demos 
              illustrate how we're revolutionizing the industry.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400">10,000+</div>
                <div className="text-sm text-gray-400">Contractors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">$2.8B</div>
                <div className="text-sm text-gray-400">Market Size</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}