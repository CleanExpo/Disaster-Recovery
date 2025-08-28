'use client';

import { useEffect, useRef } from 'react';

interface MagneticOptions {
  strength?: number;
  scale?: number;
  duration?: number;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
  const { strength = 0.5, scale = 1.05, duration = 0.4 } = options;
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const translateX = (distanceX * strength * (1 - distance / maxDistance));
        const translateY = (distanceY * strength * (1 - distance / maxDistance));
        const currentScale = 1 + (scale - 1) * (1 - distance / maxDistance);
        
        animationFrameId = requestAnimationFrame(() => {
          element.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
          element.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        });
      }
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.style.transform = 'translate(0, 0) scale(1)';
      element.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, scale, duration]);

  return elementRef;
}

export function useParallaxEffect(strength: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -strength;
      element.style.transform = `translateY(${rate}px)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  return elementRef;
}

export function use3DRotateEffect() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const rotateY = (x - 0.5) * 20;
      const rotateX = (y - 0.5) * -20;
      
      element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
}