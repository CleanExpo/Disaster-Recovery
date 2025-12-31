/**
 * NRPG HeroCarousel Component
 *
 * Sophisticated auto-rotating carousel with scanning beam effect and HUD overlay.
 * Pattern from Phil McGurk's DisasterRecovery.com.au design.
 *
 * Features:
 * - Auto-rotates every 5 seconds
 * - Scanning beam effect (blue line animating vertically)
 * - HUD overlay (top-left, monospace, blue text)
 * - Smooth opacity transitions between slides
 * - Aspect ratio 16/10, rounded-[3rem]
 * - Pause on hover
 * - Keyboard navigation (Arrow keys)
 * - Touch swipe support
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { designTokens } from '@/lib/design-tokens';

// Types
export interface HeroScenario {
  id: string;
  title: string;
  sector: string; // e.g., "Residential", "Commercial"
  hazard: string; // e.g., "Flood Emergency", "Fire Damage"
  status: string; // e.g., "Response Active", "Vetting Complete"
  image: string; // Path to image
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface HeroCarouselProps {
  /** Array of scenarios to display */
  scenarios: HeroScenario[];
  /** Auto-rotation interval in milliseconds (default: 5000) */
  interval?: number;
  /** Whether to show HUD overlay (default: true) */
  showHUD?: boolean;
  /** Whether to show scanning beam effect (default: true) */
  showScanningBeam?: boolean;
  /** Whether to pause on hover (default: true) */
  pauseOnHover?: boolean;
  /** Custom className for container */
  className?: string;
  /** Callback when slide changes */
  onSlideChange?: (index: number, scenario: HeroScenario) => void;
}

/**
 * HeroCarousel - Auto-rotating carousel with technical effects
 *
 * @example
 * ```tsx
 * <HeroCarousel
 *   scenarios={[
 *     {
 *       id: '1',
 *       sector: 'Commercial',
 *       hazard: 'Flood Emergency',
 *       status: 'Response Active',
 *       image: '/images/scenarios/flood.jpg',
 *       title: 'Rapid Water Extraction'
 *     }
 *   ]}
 *   interval={5000}
 * />
 * ```
 */
export function HeroCarousel({
  scenarios,
  interval = 5000,
  showHUD = true,
  showScanningBeam = true,
  pauseOnHover = true,
  className = '',
  onSlideChange,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const currentScenario = scenarios[currentIndex];

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [scenarios.length]);

  const goToPrevious = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [scenarios.length]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex]);

  // Auto-rotation
  useEffect(() => {
    if (isPaused || scenarios.length <= 1) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [goToNext, isPaused, scenarios.length, interval]);

  // Slide change callback
  useEffect(() => {
    if (onSlideChange && currentScenario) {
      onSlideChange(currentIndex, currentScenario);
    }
  }, [currentIndex, currentScenario, onSlideChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  if (scenarios.length === 0) return null;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero carousel"
      aria-live="polite"
    >
      {/* Carousel Container - 16:10 Aspect Ratio */}
      <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-900">
        {/* Image Slides */}
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={scenario.image}
              alt={scenario.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />

            {/* Dark Overlay for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
          </div>
        ))}

        {/* Scanning Beam Effect */}
        {showScanningBeam && <div className="scanning-beam" />}

        {/* HUD Overlay - Top Left */}
        {showHUD && currentScenario && (
          <div
            className="absolute top-8 left-8 z-20 font-mono text-xs md:text-sm space-y-1"
            style={{ color: designTokens.colors.protocolBlue }}
          >
            <div className="flex items-center gap-2">
              <span className="label-small text-blue-400">SECTOR</span>
              <span className="text-white font-bold tracking-wide">{currentScenario.sector}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="label-small text-blue-400">HAZARD</span>
              <span className="text-white font-bold tracking-wide">{currentScenario.hazard}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="label-small text-green-400">STATUS</span>
              <span className="text-green-400 font-bold tracking-wide animate-pulse">
                {currentScenario.status}
              </span>
            </div>
          </div>
        )}

        {/* Content - Bottom Center */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {currentScenario.title}
            </h2>

            {currentScenario.description && (
              <p className="text-lg md:text-xl text-slate-200 mb-6 max-w-2xl mx-auto">
                {currentScenario.description}
              </p>
            )}

            {currentScenario.cta && (
              <a
                href={currentScenario.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              >
                {currentScenario.cta.label}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {scenarios.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Slide Indicators */}
      {scenarios.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                index === currentIndex
                  ? 'w-12 bg-blue-600'
                  : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-blue-400'
              }`}
              aria-label={`Go to slide ${index + 1}: ${scenario.title}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}

      {/* Pause Indicator */}
      {isPaused && scenarios.length > 1 && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="text-xs font-mono text-white">PAUSED</span>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
