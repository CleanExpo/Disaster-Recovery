'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  UserPlus, 
  LogIn, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  Home
} from 'lucide-react';

export default function ContractorPortalLanding() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Network',
      description: 'Join Australia\'s trusted network of restoration contractors'
    },
    {
      icon: Award,
      title: 'IICRC Standards',
      description: 'All work follows industry-leading IICRC standards and guidelines'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Access more jobs and expand your service territory'
    },
    {
      icon: Users,
      title: 'Professional Support',
      description: '24/7 support and continuous training opportunities'
    }
  ];

  const benefits = [
    'Direct job assignments from insurance companies',
    'Transparent pricing with industry guidelines',
    'Digital documentation and reporting',
    'Performance-based territory allocation',
    'Professional development and training',
    'Marketing and branding support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Home className="h-6 w-6 mr-2 text-gray-600" />
                <span className="text-gray-600 hover:text-gray-900">Home</span>
              </Link>
              <span className="mx-3 text-gray-400">/</span>
              <span className="font-semibold text-gray-900">Contractor Portal</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <div className="mb-8">
                  <img
                    src="/logos/3D Disaster Recovery Logo Image.png"
                    alt="National Restoration Professionals"
                    className="h-20 mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.getElementById('nrp-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div id="nrp-fallback" className="hidden items-center justify-center w-20 h-20 bg-blue-600 rounded-full mx-auto">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">NRP Contractor</span>
                  <span className="block text-blue-600">Management Portal</span>
                </h1>
                
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Access your dashboard, manage jobs, update certifications, and grow your restoration business.
                </p>
                
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contractor/login"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colours"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </Link>
                  
                  <Link
                    href="/contractor/register"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colours"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Apply to Join
                  </Link>
                </div>

                {/* Demo Access Card */}
                <div className="mt-12 max-w-md mx-auto">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold">Demo Access Available</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Test the contractor portal with our demo account:
                    </p>
                    <div className="bg-gray-50 rounded p-4 text-left">
                      <p className="text-sm">
                        <span className="font-semibold">Username:</span>{' '}
                        <code className="bg-blue-100 px-2 py-1 rounded">demo</code>
                      </p>
                      <p className="text-sm mt-2">
                        <span className="font-semibold">Password:</span>{' '}
                        <code className="bg-blue-100 px-2 py-1 rounded">Demo123!</code>
                      </p>
                    </div>
                    <Link
                      href="/contractor/login"
                      className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colours"
                    >
                      Try Demo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Join Our Network?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Be part of Leading disaster recovery contractor network
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Contractor Benefits
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join our network of professional restoration contractors today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contractor/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colours"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contractor/login"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-blue-600 transition-colours"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}