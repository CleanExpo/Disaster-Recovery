'use client';

/**
 * TestimonialCarousel Component
 *
 * Swipeable carousel for displaying multiple testimonials
 * Used for showcasing customer success stories
 *
 * Features:
 * - Touch-enabled swipe navigation
 * - Keyboard accessible
 * - Auto-play with pause on hover
 * - Dot indicators
 * - WCAG 2.1 AA compliant
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, fontFamilies, fontWeights } from '../../tokens';

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role?: string;
  photoUrl?: string;
  rating?: number;
  incidentType?: string;
}

export interface TestimonialCarouselProps {
  /** Array of testimonials */
  testimonials: TestimonialItem[];
  /** Auto-play interval in milliseconds (0 = disabled) */
  autoPlayInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for carousel */
  ariaLabel?: string;
}

/**
 * TestimonialCarousel - Swipeable testimonial carousel
 *
 * @example
 * ```tsx
 * <TestimonialCarousel
 *   testimonials={[
 *     {
 *       id: '1',
 *       quote: 'Amazing service! They arrived within hours.',
 *       name: 'John Smith',
 *       role: 'Homeowner, Melbourne VIC',
 *       rating: 5,
 *     },
 *     // ... more testimonials
 *   ]}
 *   autoPlayInterval={5000}
 *   showArrows
 *   showDots
 * />
 * ```
 */
export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  className = '',
  ariaLabel = 'Customer testimonials',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayInterval > 0 && !isPaused) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, isPaused, goToNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    }
    if (touchStart - touchEnd < -50) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const carouselStyles: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.xl,
    backgroundColor: '#FFFFFF',
    padding: `${spacing[12]} ${spacing[8]}`,
    minHeight: '320px',
  };

  const slideContainerStyles: React.CSSProperties = {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    transform: `translateX(-${currentIndex * 100}%)`,
  };

  const slideStyles: React.CSSProperties = {
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: spacing[6],
  };

  const quoteStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: '1.25rem',
    fontWeight: fontWeights.normal,
    lineHeight: 1.7,
    color: disasterRecoveryColors.authority.text,
    fontStyle: 'italic',
    maxWidth: '700px',
    position: 'relative',
  };

  const authorContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[3],
  };

  const photoStyles: React.CSSProperties = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `3px solid ${disasterRecoveryColors.neutral[200]}`,
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.125rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
  };

  const roleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.textSecondary,
  };

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: `2px solid ${disasterRecoveryColors.neutral[300]}`,
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: disasterRecoveryColors.authority.primary,
    transition: 'all 0.2s',
    zIndex: 10,
  };

  const dotsContainerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing[2],
    marginTop: spacing[6],
  };

  const dotStyles = (isActive: boolean): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isActive ? disasterRecoveryColors.authority.primary : disasterRecoveryColors.neutral[300],
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    padding: 0,
  });

  const ratingContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[1],
    justifyContent: 'center',
  };

  const starStyles: React.CSSProperties = {
    color: '#F59E0B',
    fontSize: '1.25rem',
  };

  return (
    <div className={className} style={containerStyles}>
      <div
        ref={carouselRef}
        style={carouselStyles}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        <div style={slideContainerStyles}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} style={slideStyles}>
              {/* Rating */}
              {testimonial.rating && (
                <div style={ratingContainerStyles} aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={starStyles} aria-hidden="true">
                      {i < testimonial.rating! ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote style={quoteStyles}>
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div style={authorContainerStyles}>
                {testimonial.photoUrl && (
                  <img
                    src={testimonial.photoUrl}
                    alt={`Photo of ${testimonial.name}`}
                    style={photoStyles}
                  />
                )}
                <div>
                  <div style={nameStyles}>{testimonial.name}</div>
                  {testimonial.role && <div style={roleStyles}>{testimonial.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && testimonials.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{ ...arrowStyles, left: spacing[4] }}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              style={{ ...arrowStyles, right: spacing[4] }}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {showDots && testimonials.length > 1 && (
        <div style={dotsContainerStyles} role="tablist" aria-label="Testimonial indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={dotStyles(index === currentIndex)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}
    </div>
  );
};

TestimonialCarousel.displayName = 'TestimonialCarousel';
