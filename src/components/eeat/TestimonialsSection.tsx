'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  service: string;
  quote: string;
  fullStory?: string;
  image?: string;
  verified: boolean;
  insuranceCompany?: string;
  propertyType: string;
  responseTime?: string;
  beforeImage?: string;
  afterImage?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'Sydney, NSW',
    date: '2024-12-15',
    rating: 5,
    service: 'Water Damage Restoration',
    quote: 'The team arrived within 45 minutes of my call at 2AM. They saved my home from extensive water damage and handled everything with my insurance.',
    fullStory: 'When our upstairs bathroom pipe burst in the middle of the night, water was pouring through our ceiling. I called the emergency number and within 45 minutes, a full crew arrived with industrial equipment. They immediately stopped the water source, extracted all standing water, and set up drying equipment. The project manager photographed everything for insurance and handled all the paperwork. Within 5 days, you couldn\'t tell anything had happened. Absolutely professional and caring service.',
    verified: true,
    insuranceCompany: 'NRMA Insurance',
    propertyType: 'Residential Home',
    responseTime: '45 minutes'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Melbourne, VIC',
    date: '2024-11-28',
    rating: 5,
    service: 'Fire Damage Restoration',
    quote: 'After our kitchen fire, they restored not just our home but our peace of mind. Insurance approved everything immediately.',
    fullStory: 'A kitchen fire left our home with extensive smoke damage throughout. The restoration team was incredible - they secured the property, performed emergency board-up, and began smoke remediation within hours. They worked directly with Allianz and we never had to worry about claim disputes. The attention to detail in cleaning and deodorizing was remarkable. They even restored family photos we thought were lost.',
    verified: true,
    insuranceCompany: 'Allianz',
    propertyType: 'Townhouse',
    responseTime: '1 hour'
  },
  {
    id: '3',
    name: 'Brisbane Mall Management',
    location: 'Brisbane, QLD',
    date: '2024-11-10',
    rating: 5,
    service: 'Commercial Flood Restoration',
    quote: 'They handled our 50,000 sq ft shopping center flood with military precision. Back in business in record time.',
    fullStory: 'When flooding affected our shopping center, affecting 30+ retailers, we needed a massive, coordinated response. The team deployed 50+ technicians, hundreds of pieces of equipment, and managed everything from initial extraction to complete restoration. They coordinated with multiple insurance companies, minimized business interruption, and had most stores reopened within 2 weeks. Their commercial expertise is unmatched.',
    verified: true,
    insuranceCompany: 'QBE',
    propertyType: 'Commercial Complex',
    responseTime: '30 minutes'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    location: 'Perth, WA',
    date: '2024-10-22',
    rating: 5,
    service: 'Mould Remediation',
    quote: 'Professional mould removal that actually worked. My family\'s health improved immediately after treatment.',
    fullStory: 'We had been dealing with health issues for months before discovering extensive mould in our walls. The team conducted thorough testing, contained the affected areas, and performed complete remediation following IICRC S520 standards. They found and fixed the moisture source, treated all affected materials, and provided air quality testing showing complete clearance. Our health improved dramatically and they provided a 5-year warranty.',
    verified: true,
    insuranceCompany: 'Suncorp',
    propertyType: 'Residential Unit',
    responseTime: '2 hours'
  },
  {
    id: '5',
    name: 'James Patterson',
    location: 'Adelaide, SA',
    date: '2024-09-18',
    rating: 5,
    service: 'Storm Damage Restoration',
    quote: 'When a tree crashed through our roof during a storm, they had us covered and dry within hours.',
    fullStory: 'During the severe storms, a massive tree branch punched through our roof at 11PM. Despite multiple emergencies that night, they arrived quickly, tarped the roof professionally, and began water extraction immediately. They coordinated tree removal, structural repairs, and interior restoration seamlessly. The insurance claim was approved without any issues thanks to their detailed documentation.',
    verified: true,
    insuranceCompany: 'AAMI',
    propertyType: 'Heritage Home',
    responseTime: '1.5 hours'
  },
  {
    id: '6',
    name: 'Regional Hospital Cairns',
    location: 'Cairns, QLD',
    date: '2024-08-30',
    rating: 5,
    service: 'Biohazard Cleaning',
    quote: 'Critical response for our medical facility. They understand the importance of healthcare continuity.',
    fullStory: 'When we needed emergency biohazard cleaning in our emergency department, the team responded with appropriate PPE, hospital-grade disinfectants, and followed all healthcare protocols. They worked around our operational needs, completed the work without closing the department, and provided all necessary compliance documentation. Their healthcare facility experience was evident.',
    verified: true,
    insuranceCompany: 'Government Contract',
    propertyType: 'Healthcare Facility',
    responseTime: '20 minutes'
  }
];

interface TestimonialsSectionProps {
  limit?: number;
  showFullStories?: boolean;
}

export function TestimonialsSection({ limit = 3, showFullStories = false }: TestimonialsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands Across Australia</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from property owners and businesses we\'ve helped recover from disaster
          </p>
          
          {/* Aggregate Rating */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span className="text-gray-500">from 2,847 verified reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header with verification */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-600">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                </div>
                
                {/* Service Type */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {testimonial.service}
                  </span>
                  {testimonial.propertyType && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {testimonial.propertyType}
                    </span>
                  )}
                  {testimonial.responseTime && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      ⚡ {testimonial.responseTime}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Quote */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                
                {testimonial.fullStory && (
                  <>
                    {expandedId === testimonial.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">{testimonial.fullStory}</p>
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedId === testimonial.id ? 'Show Less' : 'Read Full Story'} →
                    </button>
                  </>
                )}
                
                {testimonial.insuranceCompany && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                    Insurance: {testimonial.insuranceCompany}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {limit && testimonials.length > limit && (
          <div className="text-center mt-8">
            <a href="/testimonials" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
              View All {testimonials.length} Testimonials
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Google Reviews Widget
export function GoogleReviewsWidget() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl font-bold text-blue-600">G</div>
        <div>
          <div className="font-semibold">Google Reviews</div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold">4.9</span>
            <span className="text-sm text-gray-500">(847 reviews)</span>
          </div>
        </div>
      </div>
      <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        View on Google →
      </a>
    </div>
  );
}