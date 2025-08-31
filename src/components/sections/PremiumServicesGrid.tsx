'use client';

import React, { useState, useEffect } from 'react';
import PremiumServiceCard, { ServiceCardProps } from '@/components/cards/PremiumServiceCard';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';

const services: ServiceCardProps[] = [
  {
    title: "Water Damage Restoration",
    description: "Rapid water extraction, structural drying, and complete restoration to prevent secondary damage and mould growth.",
    image: "/images/optimised/equipment/3D Moisture Meter Reading.png",
    href: "/services/water-damage",
    category: "water",
    badge: "Most Common",
    responseTime: "60 min",
    features: [
      "24/7 emergency water extraction",
      "Advanced moisture detection",
      "Structural drying & dehumidification",
      "Insurance claim assistance"
    ],
    isFeatured: true
  },
  {
    title: "Fire & Smoke Restoration",
    description: "Complete fire damage restoration including smoke odour removal, soot cleaning, and structural repairs.",
    image: "/images/optimised/damage/3D image of a house fire.png",
    href: "/services/fire-damage-restoration",
    category: "fire",
    responseTime: "90 min",
    features: [
      "Emergency board-up services",
      "Smoke & soot removal",
      "Odour neutralisation",
      "Content restoration"
    ]
  },
  {
    title: "Mould Remediation",
    description: "Professional mould removal and prevention using IICRC certified techniques to ensure a healthy environment.",
    image: "/images/optimised/process/3D Hazardous Cleaning.png",
    href: "/services/mould-remediation",
    category: "mould",
    badge: "Health Priority",
    features: [
      "HEPA air filtration",
      "Safe mould removal",
      "Antimicrobial treatment",
      "Prevention strategies"
    ]
  },
  {
    title: "Storm & Flood Damage",
    description: "Comprehensive storm damage recovery including emergency tarping, water extraction, and full restoration.",
    image: "/images/optimised/damage/3D Vehicle into Home.png",
    href: "/services/storm-damage",
    category: "storm",
    responseTime: "45 min",
    features: [
      "Emergency tarping & board-up",
      "Debris removal",
      "Flood water extraction",
      "Structural repairs"
    ]
  },
  {
    title: "Biohazard Cleanup",
    description: "Sensitive and professional cleanup of biohazardous materials following strict safety protocols.",
    image: "/images/optimised/process/3D Emergency Squalor Cleanup.png",
    href: "/services/biohazard-cleaning",
    category: "biohazard",
    features: [
      "Crime scene cleanup",
      "Unattended death cleanup",
      "Hoarding cleanup",
      "Infectious disease control"
    ]
  },
  {
    title: "Commercial Services",
    description: "Large-scale disaster recovery for businesses, minimising downtime and revenue loss.",
    image: "/images/services/commercial-residential.png",
    href: "/services/commercial-services",
    category: "commercial",
    badge: "Business Solutions",
    features: [
      "Priority response",
      "Minimal business disruption",
      "Document restoration",
      "Equipment restoration"
    ]
  }
];

interface ServicesGridProps {
  showHeader?: boolean;
  maxItems?: number;
  filterCategory?: ServiceCardProps['category'];
}

export default function PremiumServicesGrid({
  showHeader = true,
  maxItems,
  filterCategory
}: ServicesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCardProps['category'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Simulate loading and stagger card animations
    setTimeout(() => {
      setIsLoading(false);
      services.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 100);
      });
    }, 300);
  }, []);

  const filteredServices = services.filter(service => {
    if (filterCategory) return service.category === filterCategory;
    if (selectedCategory === 'all') return true;
    return service.category === selectedCategory;
  }).slice(0, maxItems);

  const categories = [
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'water', label: 'Water Damage', icon: null },
    { id: 'fire', label: 'Fire Damage', icon: null },
    { id: 'mould', label: 'Mould', icon: null },
    { id: 'storm', label: 'Storm', icon: null },
    { id: 'biohazard', label: 'Biohazard', icon: null },
    { id: 'commercial', label: 'Commercial', icon: null }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230EA5E9' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="container mx-auto px-6 relative">
        {showHeader && (
          <>
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">IICRC Certified Services</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Professional Restoration
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Services You Can Trust
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                From emergency water extraction to complete fire restoration, our expert team delivers 
                comprehensive solutions with cutting-edge equipment and proven techniques.
              </p>
            </div>

            {/* Category Filter Pills */}
            {!filterCategory && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={cn(
                      "px-5 py-2.5 rounded-full font-medium text-sm",
                      "transition-all duration-300 transform hover:scale-105",
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {category.icon && <category.icon className="w-4 h-4" />}
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading Skeletons
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-4/5" />
                    <div className="h-3 bg-gray-100 rounded w-3/5" />
                    <div className="h-3 bg-gray-100 rounded w-4/6" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredServices.map((service, index) => (
              <div
                key={service.href}
                className={cn(
                  "transition-all duration-500",
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
              >
                <PremiumServiceCard {...service} />
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA Section */}
        {showHeader && (
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-md">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">Need Emergency Service?</h3>
                  <p className="text-sm text-gray-600">Available 24/7 across Queensland</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a
                  href="#contact-form"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Use Our Online Form
                </a>
                <a
                  href="/services"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all"
                >
                  View All Services
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}