/**
 * TestimonialCard Component
 *
 * Social proof cards for contractor testimonials
 * - Earnings testimonials
 * - Lead quality testimonials
 * - Business growth stories
 */

import React from 'react';
import { Star, TrendingUp, DollarSign, Users } from 'lucide-react';

export interface TestimonialCardProps {
  type?: 'earnings' | 'quality' | 'growth';
  name: string;
  business: string;
  location: string;
  quote: string;
  metric?: {
    value: string;
    label: string;
  };
  avatar?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  type = 'quality',
  name,
  business,
  location,
  quote,
  metric,
  avatar,
  rating = 5,
  className = '',
}: TestimonialCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'earnings':
        return <DollarSign className="h-6 w-6" />;
      case 'growth':
        return <Users className="h-6 w-6" />;
      default:
        return <TrendingUp className="h-6 w-6" />;
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'earnings':
        return 'text-nrpg-secondary border-nrpg-secondary/30';
      case 'growth':
        return 'text-blue-500 border-blue-500/30';
      default:
        return 'text-nrpg-primary border-nrpg-primary/30';
    }
  };

  // Generate initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all ${className}`}
    >
      {/* Header with avatar and info */}
      <div className="flex items-center mb-4">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getAccentColor()} bg-opacity-20 border`}>
            <span className="font-bold">{initials}</span>
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-white">{business}</h4>
          <p className="text-gray-400 text-sm">{location}</p>
        </div>
        {type !== 'earnings' && (
          <div className="flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 text-nrpg-secondary fill-current"
              />
            ))}
          </div>
        )}
      </div>

      {/* Quote */}
      <p className="text-gray-300 mb-4 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Metric */}
      {metric && (
        <div className={`flex items-center gap-2 font-semibold ${getAccentColor()}`}>
          {getIcon()}
          <span>{metric.value}</span>
        </div>
      )}
    </div>
  );
}

export default TestimonialCard;
