'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  PhoneIcon,
  FireIcon,
  HomeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BeakerIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function Homepage() {
  const services = [
    {
      title: 'Water Damage Restoration',
      description: 'Fast water extraction and drying services available 24/7',
      icon: HomeIcon,
      color: 'bg-blue-500',
      features: ['Emergency Response', 'Water Extraction', 'Structural Drying']
    },
    {
      title: 'Fire & Smoke Damage',
      description: 'Complete fire damage restoration and smoke odor removal',
      icon: FireIcon,
      color: 'bg-red-500',
      features: ['Smoke Cleanup', 'Odor Removal', 'Structural Repairs']
    },
    {
      title: 'Mould Remediation',
      description: 'Professional mould removal and prevention services',
      icon: BeakerIcon,
      color: 'bg-green-500',
      features: ['Mould Testing', 'Safe Removal', 'Prevention Treatment']
    },
    {
      title: 'Commercial Services',
      description: 'Large-scale disaster recovery for businesses',
      icon: BuildingOfficeIcon,
      color: 'bg-purple-500',
      features: ['Minimal Downtime', 'Insurance Support', 'Project Management']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">24/7 Emergency Response Available</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Disaster Recovery Services
            </h1>
            
            <p className="text-xl mb-8 text-blue-100">
              Australia's trusted restoration specialists. Fast response, professional service, insurance approved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1800-DISASTER"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneIcon className="w-6 h-6" />
                Call 1800-DISASTER
              </Link>
              
              <Link
                href="/get-help"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center justify-center gap-2 transition-colors"
              >
                Get Instant Quote
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">15,000+</div>
                <div className="text-blue-200">Properties Restored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">&lt; 2hrs</div>
                <div className="text-blue-200">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-blue-200">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200">Emergency Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional restoration services for all types of property damage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`${service.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  Learn More
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Why Choose Disaster Recovery?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <ClockIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Fast Response</h3>
                <p className="text-gray-600">
                  Emergency teams available 24/7 with guaranteed 2-hour response time
                </p>
              </div>
              
              <div className="text-center">
                <ShieldCheckIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Certified Experts</h3>
                <p className="text-gray-600">
                  IICRC certified technicians with years of experience
                </p>
              </div>
              
              <div className="text-center">
                <CheckCircleIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Insurance Approved</h3>
                <p className="text-gray-600">
                  Work directly with all major insurance companies
                </p>
              </div>
            </div>

            <div className="bg-blue-900 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Need Emergency Help?
              </h3>
              <p className="text-lg mb-6">
                Our disaster recovery experts are standing by 24/7
              </p>
              <Link
                href="tel:1800-DISASTER"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2 transition-colors"
              >
                <PhoneIcon className="w-6 h-6" />
                Call Now: 1800-DISASTER
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted & Certified
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['IICRC Certified', 'ISO 9001', 'EPA RRP', 'BBB A+', 'WorkSafe'].map((cert) => (
              <div key={cert} className="text-center">
                <div className="bg-gray-100 rounded-lg px-6 py-4">
                  <div className="font-bold text-gray-900">{cert}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
