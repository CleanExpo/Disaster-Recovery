'use client'

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'zoom' | 'bounce';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fade',
  direction = 'up',
  delay = 0,
  duration = 700,
  once = true,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: once,
  });

  const getAnimationClass = () => {
    if (!isIntersecting) {
      return cn('opacity-0', {
        'translate-y-10': animation === 'slide' && direction === 'up',
        '-translate-y-10': animation === 'slide' && direction === 'down',
        '-translate-x-10': animation === 'slide' && direction === 'left',
        'translate-x-10': animation === 'slide' && direction === 'right',
        'scale-95': animation === 'zoom',
      });
    }

    return cn('opacity-100', {
      'translate-y-0': animation === 'slide' && (direction === 'up' || direction === 'down'),
      'translate-x-0': animation === 'slide' && (direction === 'left' || direction === 'right'),
      'scale-100': animation === 'zoom',
      'animate-bounce': animation === 'bounce' && isIntersecting,
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        getAnimationClass(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};