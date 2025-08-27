'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Shield,
  Droplets,
  Flame,
  Wind,
  AlertTriangle,
  Home,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  features?: string[];
  badge?: string;
  category: 'water' | 'fire' | 'mold' | 'storm' | 'biohazard' | 'commercial';
  responseTime?: string;
  isFeatured?: boolean;
}

const categoryConfig = {
  water: {
    icon: Droplets,
    gradient: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/20',
    borderColor: 'border-blue-500/20',
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconBg: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    iconColor: 'text-blue-600'
  },
  fire: {
    icon: Flame,
    gradient: 'from-orange-500 to-red-500',
    shadowColor: 'shadow-orange-500/20',
    borderColor: 'border-orange-500/20',
    bgPattern: 'bg-gradient-to-br from-orange-50 to-red-50',
    iconBg: 'bg-gradient-to-br from-orange-100 to-red-100',
    iconColor: 'text-orange-600'
  },
  mold: {
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/20',
    borderColor: 'border-green-500/20',
    bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconBg: 'bg-gradient-to-br from-green-100 to-emerald-100',
    iconColor: 'text-green-600'
  },
  storm: {
    icon: Wind,
    gradient: 'from-purple-500 to-indigo-500',
    shadowColor: 'shadow-purple-500/20',
    borderColor: 'border-purple-500/20',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    iconBg: 'bg-gradient-to-br from-purple-100 to-indigo-100',
    iconColor: 'text-purple-600'
  },
  biohazard: {
    icon: AlertTriangle,
    gradient: 'from-red-500 to-pink-500',
    shadowColor: 'shadow-red-500/20',
    borderColor: 'border-red-500/20',
    bgPattern: 'bg-gradient-to-br from-red-50 to-pink-50',
    iconBg: 'bg-gradient-to-br from-red-100 to-pink-100',
    iconColor: 'text-red-600'
  },
  commercial: {
    icon: Building,
    gradient: 'from-gray-600 to-slate-700',
    shadowColor: 'shadow-gray-500/20',
    borderColor: 'border-gray-500/20',
    bgPattern: 'bg-gradient-to-br from-gray-50 to-slate-50',
    iconBg: 'bg-gradient-to-br from-gray-100 to-slate-100',
    iconColor: 'text-gray-700'
  }
};

export default function PremiumServiceCard({
  title,
  description,
  image,
  href,
  features = [],
  badge,
  category,
  responseTime,
  isFeatured = false
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <Link href={href} className="block group h-full">
      <article
        className={cn(
          "relative h-full bg-white rounded-2xl overflow-hidden",
          "border border-gray-100 transition-all duration-500",
          "hover:shadow-2xl hover:-translate-y-2",
          config.shadowColor,
          isFeatured && "ring-2 ring-blue-500 ring-offset-2"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              "bg-gradient-to-r", config.gradient,
              "text-white shadow-lg"
            )}>
              {badge}
            </div>
          </div>
        )}

        {/* Response Time Badge */}
        {responseTime && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <Clock className="w-3 h-3 text-green-600" />
              <span className="text-xs font-semibold text-gray-700">{responseTime}</span>
            </div>
          </div>
        )}

        {/* Image Container with Sophisticated Overlay */}
        <div className="relative h-48 overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          )}
          
          {/* Main Image */}
          <Image
            src={image}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered ? "scale-110" : "scale-100",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
            "transition-opacity duration-500",
            isHovered ? "opacity-70" : "opacity-50"
          )} />

          {/* Category Icon Badge */}
          <div className="absolute bottom-4 right-4">
            <div className={cn(
              "p-3 rounded-xl backdrop-blur-md",
              "bg-white/20 border border-white/30",
              "transition-transform duration-300",
              isHovered ? "scale-110 rotate-3" : "scale-100"
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title with Category Indicator */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-1 h-6 rounded-full bg-gradient-to-b",
                config.gradient
              )} />
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Features List */}
          {features.length > 0 && (
            <ul className="space-y-2">
              {features.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start gap-2 text-sm text-gray-600",
                    "transition-all duration-300 delay-75",
                    isHovered ? "translate-x-1" : "translate-x-0"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className={cn("w-4 h-4 mt-0.5 flex-shrink-0", config.iconColor)} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-sm font-semibold",
                "bg-gradient-to-r bg-clip-text text-transparent",
                config.gradient
              )}>
                Learn More
              </span>
              <div className={cn(
                "p-2 rounded-lg transition-all duration-300",
                config.iconBg,
                "group-hover:translate-x-1"
              )}>
                <ArrowRight className={cn("w-4 h-4", config.iconColor)} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-gradient-to-t from-transparent via-transparent to-white/5",
          "opacity-0 transition-opacity duration-500",
          isHovered && "opacity-100"
        )} />

        {/* Premium Corner Accent */}
        <div className={cn(
          "absolute -top-24 -right-24 w-48 h-48 rounded-full",
          "bg-gradient-to-br", config.gradient,
          "opacity-5 transition-transform duration-700",
          isHovered ? "scale-150" : "scale-100"
        )} />
      </article>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </Link>
  );
}