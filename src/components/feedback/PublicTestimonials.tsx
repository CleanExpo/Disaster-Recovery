'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Building,
  Filter,
  Grid3X3,
  List,
  RotateCcw,
  Play,
  Pause,
  ExternalLink,
  Share2,
  Heart,
  Award,
  CheckCircle,
  Image,
  Eye
} from 'lucide-react';
import type { Testimonial, TestimonialDisplay } from '@/types/customer-feedback';

interface PublicTestimonialsProps {
  contractorId?: string;
  layout?: 'carousel' | 'grid' | 'list';
  filterBy?: {
    jobType?: string[];
    rating?: number;
    location?: string[];
    featured?: boolean;
  };
  sortBy?: 'newest' | 'oldest' | 'rating' | 'featured' | 'random';
  maxCount?: number;
  autoRotate?: boolean;
  rotationInterval?: number;
  showControls?: boolean;
  showFilters?: boolean;
}

export default function PublicTestimonials({
  contractorId,
  layout = 'carousel',
  filterBy,
  sortBy = 'featured',
  maxCount = 10,
  autoRotate = true,
  rotationInterval = 5000,
  showControls = true,
  showFilters = false
}: PublicTestimonialsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | string>('all');
  const [selectedLayout, setSelectedLayout] = useState(layout);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<string | null>(null);

  const mockTestimonials: Testimonial[] = [
    {
      id: '1',
      feedbackId: 'feedback-1',
      contractorId: 'contractor-1',
      customerName: 'Sarah Johnson',
      customerTitle: 'Property Manager',
      customerCompany: 'Sydney Commercial Properties',
      customerLocation: 'Sydney, NSW',
      jobType: 'water_damage',
      rating: 5,
      testimonialText: 'Outstanding service! AquaTech responded immediately to our water damage emergency. Their team was professional, thorough, and restored our office building to perfect condition. The communication throughout the process was excellent, and they worked efficiently to minimize business disruption.',
      photos: ['/testimonials/water-damage-before.jpg', '/testimonials/water-damage-after.jpg'],
      publishedDate: new Date('2024-03-15'),
      featured: true,
      approved: true,
      approvedBy: 'admin@nrp.com.au',
      approvedDate: new Date('2024-03-16'),
      tags: ['emergency response', 'professional', 'commercial'],
      displayOrder: 1,
      consentGiven: true,
      consentDate: new Date('2024-03-15'),
      usageRights: {
        website: true,
        marketing: true,
        socialMedia: true,
        advertising: true
      }
    },
    {
      id: '2',
      feedbackId: 'feedback-2',
      contractorId: 'contractor-1',
      customerName: 'Michael Chen',
      customerLocation: 'Melbourne, VIC',
      jobType: 'fire_damage',
      rating: 5,
      testimonialText: 'After our kitchen fire, we were devastated and didn\'t know where to start. AquaTech handled everything from start to finish - insurance coordination, cleanup, and restoration. The team was compassionate and understanding during a difficult time. Our home looks better than before!',
      publishedDate: new Date('2024-03-10'),
      featured: true,
      approved: true,
      tags: ['fire damage', 'insurance help', 'residential'],
      displayOrder: 2,
      consentGiven: true,
      consentDate: new Date('2024-03-10'),
      usageRights: {
        website: true,
        marketing: false,
        socialMedia: true,
        advertising: false
      }
    },
    {
      id: '3',
      feedbackId: 'feedback-3',
      contractorId: 'contractor-1',
      customerName: 'Emma Thompson',
      customerTitle: 'Facilities Manager',
      customerLocation: 'Brisbane, QLD',
      jobType: 'mold_remediation',
      rating: 5,
      testimonialText: 'Professional mould remediation service that exceeded our expectations. The team conducted thorough testing, explained the process clearly, and completed the job with minimal disruption to our operations. Highly recommend their expertise and attention to detail.',
      publishedDate: new Date('2024-03-05'),
      featured: false,
      approved: true,
      tags: ['mould removal', 'testing', 'commercial'],
      displayOrder: 3,
      consentGiven: true,
      consentDate: new Date('2024-03-05'),
      usageRights: {
        website: true,
        marketing: true,
        socialMedia: false,
        advertising: true
      }
    },
    {
      id: '4',
      feedbackId: 'feedback-4',
      contractorId: 'contractor-1',
      customerName: 'David Wilson',
      customerLocation: 'Perth, WA',
      jobType: 'storm_damage',
      rating: 4,
      testimonialText: 'Quick response after the storm damage to our roof caused water intrusion. The team worked efficiently to prevent further damage and completed the restoration work to a high standard. Great communication throughout the process.',
      publishedDate: new Date('2024-02-28'),
      featured: false,
      approved: true,
      tags: ['storm damage', 'roof repair', 'emergency'],
      displayOrder: 4,
      consentGiven: true,
      consentDate: new Date('2024-02-28'),
      usageRights: {
        website: true,
        marketing: false,
        socialMedia: false,
        advertising: false
      }
    },
    {
      id: '5',
      feedbackId: 'feedback-5',
      contractorId: 'contractor-1',
      customerName: 'Lisa Rodriguez',
      customerTitle: 'Homeowner',
      customerLocation: 'Adelaide, SA',
      jobType: 'water_damage',
      rating: 5,
      testimonialText: 'Exceptional service from start to finish. Water damage from a burst pipe was handled quickly and professionally. The team kept us informed every step of the way and went above and beyond to ensure our family could return home as quickly as possible.',
      publishedDate: new Date('2024-02-20'),
      featured: false,
      approved: true,
      tags: ['burst pipe', 'family home', 'fast service'],
      displayOrder: 5,
      consentGiven: true,
      consentDate: new Date('2024-02-20'),
      usageRights: {
        website: true,
        marketing: true,
        socialMedia: true,
        advertising: false
      }
    }
  ];

  const filteredTestimonials = mockTestimonials.filter(testimonial => {
    if (selectedFilter === 'featured' && !testimonial.featured) return false;
    if (selectedFilter !== 'all' && selectedFilter !== 'featured' && testimonial.jobType !== selectedFilter) return false;
    if (filterBy?.jobType && !filterBy.jobType.includes(testimonial.jobType)) return false;
    if (filterBy?.rating && testimonial.rating < filterBy.rating) return false;
    if (filterBy?.featured !== undefined && testimonial.featured !== filterBy.featured) return false;
    return true;
  }).slice(0, maxCount);

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.publishedDate.getTime() - a.publishedDate.getTime();
      case 'oldest':
        return a.publishedDate.getTime() - b.publishedDate.getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.displayOrder - b.displayOrder;
      case 'random':
        return Math.random() - 0.5;
      default:
        return 0;
    }
  });

  useEffect(() => {
    if (isPlaying && selectedLayout === 'carousel' && sortedTestimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % sortedTestimonials.length);
      }, rotationInterval);
      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedLayout, sortedTestimonials.length, rotationInterval]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % sortedTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + sortedTestimonials.length) % sortedTestimonials.length);
  };

  const getJobTypeLabel = (jobType: string) => {
    return jobType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const TestimonialCard = ({ testimonial, compact = false }: { testimonial: Testimonial; compact?: boolean }) => (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full transition-all duration-300 ${
        hoveredTestimonial === testimonial.id ? 'shadow-lg scale-105' : ''
      }`}
      onMouseEnter={() => setHoveredTestimonial(testimonial.id)}
      onMouseLeave={() => setHoveredTestimonial(null)}
    >
      {testimonial.featured && (
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded-full flex items-center">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </span>
          <div className="flex items-center text-yellow-500">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mb-4">
        <Quote className="w-8 h-8 text-blue-500 opacity-30" />
      </div>

      <blockquote className={`text-gray-700 mb-6 ${compact ? 'text-sm line-clamp-3' : 'text-base'}`}>
        {testimonial.testimonialText}
      </blockquote>

      {testimonial.photos && testimonial.photos.length > 0 && !compact && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {testimonial.photos.slice(0, 2).map((photo, index) => (
            <div key={index} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-400" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {testimonial.customerName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{testimonial.customerName}</p>
            {testimonial.customerTitle && (
              <p className="text-sm text-gray-600 truncate">{testimonial.customerTitle}</p>
            )}
            {testimonial.customerCompany && (
              <p className="text-sm text-gray-500 truncate">{testimonial.customerCompany}</p>
            )}
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {testimonial.customerLocation}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {getJobTypeLabel(testimonial.jobType)}
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {testimonial.publishedDate.toLocaleDateString('en-AU')}
          </p>
        </div>
      </div>

      {testimonial.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {testimonial.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const CarouselView = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sortedTestimonials.map(testimonial => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {showControls && sortedTestimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center items-center space-x-4 mt-6">
            <div className="flex space-x-2">
              {sortedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colours"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </>
      )}
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedTestimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} compact />
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-6">
      {sortedTestimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {showFilters && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Customer Testimonials</h2>
              <p className="text-gray-600 mt-1">
                Real feedback from our satisfied customers
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="featured">Featured</option>
                <option value="water_damage">Water Damage</option>
                <option value="fire_damage">Fire Damage</option>
                <option value="mold_remediation">Mould Remediation</option>
                <option value="storm_damage">Storm Damage</option>
              </select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'carousel', icon: <RotateCcw className="w-4 h-4" /> },
                  { key: 'grid', icon: <Grid3X3 className="w-4 h-4" /> },
                  { key: 'list', icon: <List className="w-4 h-4" /> }
                ].map(layoutOption => (
                  <button
                    key={layoutOption.key}
                    onClick={() => setSelectedLayout(layoutOption.key as typeof selectedLayout)}
                    className={`p-2 rounded-md transition-colours ${
                      selectedLayout === layoutOption.key
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {layoutOption.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
            <span>
              Showing {sortedTestimonials.length} of {mockTestimonials.length} testimonials
            </span>
            <div className="flex items-center space-x-4">
              <span>Average rating:</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showFilters && sortedTestimonials.length > 0 && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-600">
              Based on {mockTestimonials.length} verified reviews
            </span>
          </div>
        </div>
      )}

      {sortedTestimonials.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for more reviews.</p>
        </div>
      ) : (
        <>
          {selectedLayout === 'carousel' && <CarouselView />}
          {selectedLayout === 'grid' && <GridView />}
          {selectedLayout === 'list' && <ListView />}
        </>
      )}

      {!contractorId && (
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Premier Restoration Network
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Become part of a trusted network of restoration professionals and 
              start building your own collection of customer testimonials.
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colours">
              Apply to Join NRP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}