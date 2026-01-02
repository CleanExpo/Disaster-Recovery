/**
 * FeaturedResourceCarousel Component
 *
 * Carousel showcasing featured resources with:
 * - Auto-rotating slides
 * - Manual navigation
 * - Progress indicators
 * - Responsive layout
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Resource } from '@/lib/resources/types';
import { ResourceCard } from './ResourceCard';

interface FeaturedResourceCarouselProps {
  resources: Resource[];
  autoPlayInterval?: number;
  className?: string;
}

export function FeaturedResourceCarousel({
  resources,
  autoPlayInterval = 5000,
  className,
}: FeaturedResourceCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying || resources.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resources.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, resources.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % resources.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (resources.length === 0) {
    return null;
  }

  return (
    <div className={cn('relative', className)}>
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-lg">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {resources.map((resource) => (
            <div key={resource.id} className="min-w-full">
              <ResourceCard resource={resource} variant="featured" />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {resources.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Controls */}
      {resources.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {resources.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'w-8 bg-dr-education'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-muted-foreground"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Play
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
