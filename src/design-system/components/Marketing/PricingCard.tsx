/**
 * PricingCard Component
 *
 * Subscription tier pricing cards
 * - Basic, Pro, Enterprise tiers
 * - Feature lists with checkmarks
 * - Popular badge
 */

import React from 'react';
import { Button } from '../Button/Button';
import { Check, Star } from 'lucide-react';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  tier: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
  period?: string;
  description?: string;
  features: PricingFeature[];
  popular?: boolean;
  ctaText?: string;
  onCTAClick?: () => void;
  className?: string;
}

export function PricingCard({
  tier,
  name,
  price,
  period = 'month',
  description,
  features,
  popular = false,
  ctaText = 'Get Started',
  onCTAClick,
  className = '',
}: PricingCardProps) {
  const getAccentColor = () => {
    switch (tier) {
      case 'pro':
        return 'border-nrpg-primary';
      case 'enterprise':
        return 'border-nrpg-secondary';
      default:
        return 'border-gray-700';
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border-2 ${getAccentColor()} ${className}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-nrpg-primary text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
            <Star className="h-4 w-4 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="font-sans-modern font-semibold text-2xl text-white mb-2">
          {name}
        </h3>
        {description && (
          <p className="text-gray-400 text-sm mb-4">{description}</p>
        )}
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-nrpg-primary">
            ${price}
          </span>
          <span className="text-gray-400">/{period}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 ${
              feature.included ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            <Check
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                feature.included ? 'text-nrpg-primary' : 'text-gray-600'
              }`}
            />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        size="lg"
        variant={popular ? 'default' : 'outline'}
        onClick={onCTAClick}
        className={`w-full ${
          popular
            ? 'bg-nrpg-primary hover:bg-nrpg-primary/90'
            : 'border-gray-600 hover:bg-gray-700'
        }`}
      >
        {ctaText}
      </Button>
    </div>
  );
}

export default PricingCard;
