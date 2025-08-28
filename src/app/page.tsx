'use client';

import React from 'react';
import ModernHeroSection from '@/components/ModernHeroSection';
import ModernServiceCards from '@/components/ModernServiceCards';
import { 
  Building,
  Users,
  Award,
  MapPin,
  Star
} from 'lucide-react';


export default function HomePage() {
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
    <div className="min-h-screen relative">
      {/* Modern Hero Section */}
      <ModernHeroSection />
      
      {/* Modern Service Cards */}
      <ModernServiceCards />

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