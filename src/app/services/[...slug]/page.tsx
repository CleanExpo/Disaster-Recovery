import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import {  MapPin, Clock, CheckCircle, Star, Shield, MessageSquare} from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

interface PageParams {
  slug: string[];
}

async function getSEOPage(slug: string) {
  // TODO: Implement when sEOLocationPage model is added to schema
  // const page = await prisma.sEOLocationPage.findUnique({
  //   where: { 
  //     slug: slug,
  //     status: 'PUBLISHED'
  //   }
  // });
  
  // if (page) {
  //   // Update view count
  //   await prisma.sEOLocationPage.update({
  //     where: { id: page.id },
  //     data: {
  //       organicClicks: {
  //         increment: 1
  //       },
  //       lastViewedAt: new Date()
  //     }
  //   });
  // }
  
  // return page;
  return null;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const slug = params.slug.join('/');
  const page = await getSEOPage(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found | Disaster Recovery',
      description: 'The requested page could not be found.'
    };
  }
  
  const structuredData = page.structuredData ? JSON.parse(page.structuredData) : null;
  
  return {
    title: page.title,
    description: page.metaDescription,
    keywords: [
      page.serviceName,
      `${page.city} ${page.serviceName}`,
      `${page.propertyType} ${page.serviceName}`,
      page.businessType && `${page.businessType} ${page.serviceName}`,
      'disaster recovery',
      'insurance claims',
      page.state,
      page.postcode
    ].filter(Boolean).join(', '),
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: 'website',
      locale: 'en_AU',
      siteName: 'National Recovery Partners',
      url: `https://disasterrecovery.com.au/services/${slug}`,
      images: [
        {
          url: '/images/disaster-recovery-og.jpg',
          width: 1200,
          height: 630,
          alt: page.serviceName + ' in ' + page.city }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription,
      images: ['/images/disaster-recovery-twitter.jpg'] },
    alternates: {
      canonical: `https://disasterrecovery.com.au/services/${slug}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1 } },
    other: structuredData ? {
      'script': JSON.stringify(structuredData)
    } : {}
  };
}

export default async function SEOLocationPage({ params }: { params: PageParams }) {
  const slug = params.slug.join('/');
  const page = await getSEOPage(slug);
  
  if (!page) {
    notFound();
  }
  
  const structuredData = page.structuredData ? JSON.parse(page.structuredData) : null;
  
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  {page.serviceName} in {page.city}
                  {page.suburb && (
                    <span className="block text-3xl lg:text-4xl text-blue-200 mt-2">
                      {page.suburb} {page.postcode}
                    </span>
                  )}
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Professional {page.serviceName.toLowerCase()} services for {page.propertyType.toLowerCase()} properties{page.businessType && ` including ${page.businessType.replace(/-/g, ' ')}`}. 24/7 emergency response across {page.city} and surrounding areas.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Get Instant Quote
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition">
                    View Our Work
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <span>24/7 Online Emergency Response</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <span>Fully Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                    <span>Insurance Approved</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-500" />
                    <span>Local {page.city} Contractors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Dynamic Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get Free Quote
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Institutional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe Your Situation
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      placeholder="Tell us about your damage..."
                    ></textarea>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition">
                    Get Instant Quote
                  </button>
                </form>
              </div>
              
              {/* Service Areas */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Service Areas
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{page.city} CBD</span>
                  </div>
                  {page.suburb && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{page.suburb}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>All {page.city} Suburbs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Greater {page.city} Area</span>
                  </div>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Trusted by Thousands
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <Star className="w-5 h-5 text-blue-500 fill-current" />
                    <span className="text-sm text-gray-600">4.9/5 Rating</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>500+ Jobs Completed</strong> in {page.city}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>24/7 Emergency Service</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Insurance Approved</strong> Contractors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}