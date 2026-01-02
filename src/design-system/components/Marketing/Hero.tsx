/**
 * Hero Component
 *
 * Full-width hero sections with multiple variants for marketing pages
 * - Split hero (text + image)
 * - Centered hero
 * - Video background hero
 */

import React from 'react';
import { Button } from '../Button/Button';
import { ArrowRight, Play } from 'lucide-react';

export interface HeroProps {
  variant?: 'split' | 'centered' | 'video';
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  image?: string;
  videoUrl?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  className?: string;
}

export function Hero({
  variant = 'centered',
  badge,
  title,
  titleHighlight,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  videoUrl,
  stats,
  className = '',
}: HeroProps) {
  const renderContent = () => (
    <div className={variant === 'split' ? 'lg:w-1/2' : 'max-w-4xl mx-auto text-center'}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-nrpg-primary/10 border border-nrpg-primary/30 rounded-full text-nrpg-primary text-sm font-medium mb-6">
          {badge.icon}
          {badge.text}
        </div>
      )}

      <h1 className="font-sans-modern font-bold text-4xl md:text-5xl lg:text-6xl text-balance mb-6">
        {title}
        {titleHighlight && (
          <span className="block text-nrpg-primary">{titleHighlight}</span>
        )}
      </h1>

      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        {description}
      </p>

      {(primaryCTA || secondaryCTA) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCTA && (
            <Button
              size="lg"
              onClick={primaryCTA.onClick}
              className="bg-nrpg-primary hover:bg-nrpg-primary/90"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
          {secondaryCTA && (
            <Button
              size="lg"
              variant="outline"
              onClick={secondaryCTA.onClick}
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <Play className="mr-2 h-5 w-5" />
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      )}

      {stats && stats.length > 0 && (
        <div className="mt-12 grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-nrpg-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderMedia = () => {
    if (variant === 'video' && videoUrl) {
      return (
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>
      );
    }

    if (variant === 'split' && image) {
      return (
        <div className="lg:w-1/2">
          <img
            src={image}
            alt="Hero"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <section className={`relative py-20 lg:py-32 ${className}`}>
      {renderMedia()}

      <div className="container mx-auto px-6">
        <div className={variant === 'split' ? 'flex flex-col lg:flex-row items-center gap-12' : ''}>
          {renderContent()}
          {variant === 'split' && renderMedia()}
        </div>
      </div>
    </section>
  );
}

export default Hero;
