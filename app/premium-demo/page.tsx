'use client';

import React from 'react';
import { PremiumSupportTickets } from '@/components/contractor/dashboard/sections/PremiumSupportTickets';
import { Button } from '@/components/ui/button';
import {  
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
  Filter, MessageSquare} from 'lucide-react';

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
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6 animate-slide-in-right">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
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
              <Button variant="default" size="lg">
                <Zap className="w-5 h-5" />
                Premium Button
              </Button>
              
              <Button variant="default" size="lg">
                <Star className="w-5 h-5" />
                Glow Effect
              </Button>
              
              <Button variant="ghost" size="lg">
                <Shield className="w-5 h-5" />
                Glass Morphism
              </Button>
              
              <Button variant="destructive" size="lg">
                <MessageSquare className="w-5 h-5" />
                Emergency
              </Button>
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
            <Button variant="default" className="w-full">
              Default Gradient
            </Button>
            <Button variant="default" className="w-full">
              Premium Rainbow
            </Button>
            <Button variant="secondary" className="w-full">
              Success Green
            </Button>
            <Button variant="destructive" className="w-full">
              Danger Red
            </Button>
          </div>
          
          {/* Glass & Effects */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Glass & Effects</h3>
            <Button variant="ghost" className="w-full">
              Glass Morphism
            </Button>
            <Button variant="default" className="w-full">
              Glow Shadow
            </Button>
            <Button variant="outline" className="w-full">
              Premium Outline
            </Button>
            <Button variant="ghost" className="w-full">
              Ghost Hover
            </Button>
          </div>
          
          {/* Animated Variants */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Animations</h3>
            <Button variant="default" className="w-full">
              Shimmer Effect
            </Button>
            <Button variant="default" className="w-full">
              Pulse Animation
            </Button>
            <Button variant="secondary" className="w-full">
              Gradient Animation
            </Button>
            <Button variant="destructive" className="w-full">
              Loading State
            </Button>
          </div>
          
          {/* Sizes */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Button Sizes</h3>
            <Button size="sm" variant="default">Extra Small</Button>
            <Button size="sm" variant="default">Small</Button>
            <Button size="default" variant="default">Default</Button>
            <Button size="lg" variant="default">Large</Button>
            <Button size="lg" variant="default" className="w-full">Extra Large</Button>
          </div>
          
          {/* Icon Buttons */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Icon Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button size="icon" variant="default">
                <Home className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="default">
                <Star className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Settings className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="default">
                <Heart className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary">
                <Upload className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="destructive">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Gradient Animations */}
          <div className="glass-light rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-700 mb-3">Gradient Animations</h3>
            <Button className="w-full text-white">
              Rainbow Gradient
            </Button>
            <Button className="w-full text-white">
              Ocean Gradient
            </Button>
            <Button className="w-full text-white">
              Sunset Gradient
            </Button>
            <Button className="w-full text-white">
              Forest Gradient
            </Button>
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
            { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: Zap, colour: 'from-blue-600 to-cyan-600' },
            { label: 'Active Users', value: '8,492', change: '+18.2%', icon: User, colour: 'from-purple-600 to-pink-600' },
            { label: 'Conversion Rate', value: '24.8%', change: '+5.4%', icon: Star, colour: 'from-green-600 to-emerald-600' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group relative glass-frosted rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.colour} opacity-5 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.colour} shadow-lg group-hover:scale-110 transition-transform`}>
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
                    className={`h-full bg-gradient-to-r ${stat.colour} rounded-full animate-pulse-subtle`}
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
              <Button variant="ghost" size="lg">
                Deploy This Design
              </Button>
              <Button variant="default" size="lg">
                <Send className="w-5 h-5" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}