'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle2,
  Building,
  Users,
  Award,
  Zap,
  Droplets,
  Flame,
  Wind,
  Phone,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';


export default function HomePage() {
  const services = [
    {
      icon: Droplets,
      title: 'Water Damage Restoration',
      description: 'Immediate water extraction, structural drying, and damage mitigation',
      features: ['24/7 Emergency Response', 'Advanced Drying Equipment', 'Insurance Approved'],
      href: '/services/water-damage'
    },
    {
      icon: Flame,
      title: 'Fire & Smoke Damage',
      description: 'Complete fire damage restoration and smoke odor removal',
      features: ['Soot & Ash Cleanup', 'Odor Elimination', 'Content Restoration'],
      href: '/services/fire-damage'
    },
    {
      icon: Wind,
      title: 'Mould Remediation',
      description: 'Safe and thorough mould removal with prevention strategies',
      features: ['HEPA Filtration', 'Antimicrobial Treatment', 'Air Quality Testing'],
      href: '/services/mould-remediation'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Brisbane, QLD',
      rating: 5,
      text: 'Incredible response time and professionalism. They saved our home after severe flooding.'
    },
    {
      name: 'James Chen',
      location: 'Sydney, NSW',
      rating: 5,
      text: 'The team was thorough, compassionate, and worked directly with our insurance company.'
    },
    {
      name: 'Emily Thompson',
      location: 'Melbourne, VIC',
      rating: 5,
      text: 'Outstanding service during a stressful time. Highly recommend their expertise.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* Hero Section with Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-8">
              {/* Emergency Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-100">24/7 Emergency Response Available</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="block">Disaster Recovery</span>
                <span className="block text-3xl lg:text-5xl mt-2 text-blue-200">When Every Minute Counts</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
                IICRC certified restoration specialists providing immediate response 
                for water, fire, and mould damage across Australia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/get-help">
                  <Button 
                    size="lg" 
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Get Emergency Help Now
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg"
                  >
                    Free Damage Assessment
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {[
                  { icon: Shield, label: 'IICRC Certified', value: 'Industry Standard' },
                  { icon: Clock, label: 'Response Time', value: '30-60 Minutes' },
                  { icon: CheckCircle, label: 'Insurance', value: 'Pre-Approved' },
                  { icon: Star, label: 'Customer Rating', value: '4.9/5 Stars' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <item.icon className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                    <p className="text-xs text-blue-200">{item.label}</p>
                    <p className="font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 lg:h-20" viewBox="0 0 1440 120" fill="none">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Restoration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional disaster recovery solutions with cutting-edge technology 
              and certified expertise for complete peace of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      href={service.href}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group/link"
                    >
                      Learn More 
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Industry Leaders Choose Us
              </h2>
              <p className="text-xl text-gray-600">
                Certified excellence backed by proven results and unmatched expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, title: '200+ Hours', label: 'Expert Training', color: 'from-purple-500 to-pink-500' },
                { icon: Users, title: '15+ Years', label: 'Combined Experience', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: '$20M', label: 'Insurance Coverage', color: 'from-blue-500 to-cyan-500' },
                { icon: Building, title: '500+', label: 'Properties Restored', color: 'from-orange-500 to-red-500' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl shadow-xl mb-4`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{stat.title}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Thousands Across Australia
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real customers who experienced our exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="p-8 hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Don't Wait - Every Second Counts
            </h2>
            <p className="text-xl lg:text-2xl text-white/90">
              Our certified emergency response team is standing by 24/7 
              to help you recover from any disaster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-help">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-xl"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Emergency Hotline
                </Button>
              </Link>
              <Link href="/schedule">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold"
                >
                  Schedule Assessment
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
              <div className="text-white">
                <p className="text-3xl font-bold">30min</p>
                <p className="text-sm opacity-90">Avg Response</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm opacity-90">Availability</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-90">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}