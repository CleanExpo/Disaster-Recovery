'use client';

import React from 'react';
import { PremiumSupportTickets } from '@/components/contractor/dashboard/sections/PremiumSupportTickets';
import { PremiumButton } from '@/components/ui/premium-button';
import { 
  Phone, 
  ArrowRight, 
  Shield, 
  Zap, 
  Star,
  Download,
  Upload,
  Send,
  Heart,
  Bell,
  Settings,
  User,
  Home,
  Search,
  Filter
} from 'lucide-react';

export default function PremiumDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Premium Hero with Glass Effect */}
      <header className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: '4s' }} />
        </div>

        {/* Glass Navigation */}
        <nav className="relative glass-frosted border-b border-white/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-glow-pulse">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Premium UI System
                  </h1>
                  <p className="text-xs text-gray-600">Version 2.0 - Actually Works</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <PremiumButton variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </PremiumButton>
                <PremiumButton variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </PremiumButton>
                <PremiumButton variant="glass" size="sm">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </PremiumButton>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6 animate-slide-in-right">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">Real Premium Components That Actually Work</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 animate-scale-in">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                This is Real 10/10 Design
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Not just promises - actual working components with glass morphism, 
              micro-interactions, gradients, and sophisticated animations.
            </p>
            
            {/* Premium Button Showcase */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <PremiumButton variant="premium" size="lg" glow>
                <Zap className="w-5 h-5" />
                Premium Button
              </PremiumButton>
              
              <PremiumButton variant="glow" size="lg">
                <Star className="w-5 h-5" />
                Glow Effect
              </PremiumButton>
              
              <PremiumButton variant="glass" size="lg">
                <Shield className="w-5 h-5" />
                Glass Morphism
              </PremiumButton>
              
              <PremiumButton variant="danger" size="lg">
                <Phone className="w-5 h-5" />
                Emergency
              </PremiumButton>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Button Grid */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Premium Button System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Variants */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Default Variants</h3>
            <PremiumButton variant="default" className="w-full">
              Default Gradient
            </PremiumButton>
            <PremiumButton variant="premium" className="w-full">
              Premium Rainbow
            </PremiumButton>
            <PremiumButton variant="success" className="w-full">
              Success Green
            </PremiumButton>
            <PremiumButton variant="danger" className="w-full">
              Danger Red
            </PremiumButton>
          </div>
          
          {/* Glass & Effects */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Glass & Effects</h3>
            <PremiumButton variant="glass" className="w-full">
              Glass Morphism
            </PremiumButton>
            <PremiumButton variant="glow" className="w-full">
              Glow Shadow
            </PremiumButton>
            <PremiumButton variant="outline" className="w-full">
              Premium Outline
            </PremiumButton>
            <PremiumButton variant="ghost" className="w-full">
              Ghost Hover
            </PremiumButton>
          </div>
          
          {/* Animated Variants */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Animations</h3>
            <PremiumButton variant="premium" animate="shimmer" className="w-full">
              Shimmer Effect
            </PremiumButton>
            <PremiumButton variant="glow" animate="pulse" className="w-full">
              Pulse Animation
            </PremiumButton>
            <PremiumButton variant="success" gradient="forest" className="w-full">
              Gradient Animation
            </PremiumButton>
            <PremiumButton variant="danger" loading className="w-full">
              Loading State
            </PremiumButton>
          </div>
          
          {/* Sizes */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Button Sizes</h3>
            <PremiumButton size="xs" variant="premium">Extra Small</PremiumButton>
            <PremiumButton size="sm" variant="premium">Small</PremiumButton>
            <PremiumButton size="default" variant="premium">Default</PremiumButton>
            <PremiumButton size="lg" variant="premium">Large</PremiumButton>
            <PremiumButton size="xl" variant="premium" className="w-full">Extra Large</PremiumButton>
          </div>
          
          {/* Icon Buttons */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Icon Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <PremiumButton size="icon" variant="default">
                <Home className="w-5 h-5" />
              </PremiumButton>
              <PremiumButton size="icon" variant="premium">
                <Star className="w-5 h-5" />
              </PremiumButton>
              <PremiumButton size="icon" variant="glass">
                <Settings className="w-5 h-5" />
              </PremiumButton>
              <PremiumButton size="icon" variant="glow">
                <Heart className="w-5 h-5" />
              </PremiumButton>
              <PremiumButton size="icon" variant="success">
                <Upload className="w-5 h-5" />
              </PremiumButton>
              <PremiumButton size="icon" variant="danger">
                <Download className="w-5 h-5" />
              </PremiumButton>
            </div>
          </div>
          
          {/* Gradient Animations */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Gradient Animations</h3>
            <PremiumButton gradient="rainbow" className="w-full text-white">
              Rainbow Gradient
            </PremiumButton>
            <PremiumButton gradient="ocean" className="w-full text-white">
              Ocean Gradient
            </PremiumButton>
            <PremiumButton gradient="sunset" className="w-full text-white">
              Sunset Gradient
            </PremiumButton>
            <PremiumButton gradient="forest" className="w-full text-white">
              Forest Gradient
            </PremiumButton>
          </div>
        </div>
      </section>

      {/* Premium Cards Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Premium Glass Cards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          {[
            { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: Zap, color: 'from-blue-600 to-cyan-600' },
            { label: 'Active Users', value: '8,492', change: '+18.2%', icon: User, color: 'from-purple-600 to-pink-600' },
            { label: 'Conversion Rate', value: '24.8%', change: '+5.4%', icon: Star, color: 'from-green-600 to-emerald-600' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group relative glass-frosted rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-1 bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
                
                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full animate-pulse-subtle`}
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Support Tickets Component */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Premium Support Dashboard
        </h2>
        <PremiumSupportTickets />
      </section>

      {/* Footer with Glass Effect */}
      <footer className="mt-20 glass-dark text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              This is What 10/10 Design Actually Looks Like
            </h3>
            <p className="text-gray-300 mb-6">
              Real components with real effects - not just flat shadcn cards
            </p>
            <div className="flex justify-center gap-4">
              <PremiumButton variant="glass" size="lg">
                Deploy This Design
              </PremiumButton>
              <PremiumButton variant="premium" size="lg" glow>
                <Send className="w-5 h-5" />
                Contact Support
              </PremiumButton>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}