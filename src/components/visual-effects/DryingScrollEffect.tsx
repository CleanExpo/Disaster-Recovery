'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DryingScrollEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function DryingScrollEffect({ children, className = '' }: DryingScrollEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moistureOverlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const moistureOverlay = moistureOverlayRef.current;
    const content = contentRef.current;
    
    if (!container || !moistureOverlay || !content) return;

    // Initial wet state
    gsap.set(moistureOverlay, {
      opacity: 0.4,
      background: `
        radial-gradient(ellipse at 20% 30%, rgba(10, 147, 150, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(0, 95, 115, 0.3) 0%, transparent 50%),
        linear-gradient(180deg, rgba(10, 147, 150, 0.2) 0%, transparent 100%)
      `
    });

    // Content starts slightly blurred and desaturated
    gsap.set(content, {
      filter: 'blur(1px) saturate(0.7)',
      opacity: 0.9
    });

    // Create the drying timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Update moisture overlay
          moistureOverlay.style.background = `
            radial-gradient(ellipse at ${20 + progress * 60}% ${30 - progress * 20}%, 
              rgba(10, 147, 150, ${0.3 * (1 - progress)}) 0%, transparent ${50 + progress * 30}%),
            radial-gradient(ellipse at ${80 - progress * 60}% ${70 + progress * 20}%, 
              rgba(0, 95, 115, ${0.3 * (1 - progress)}) 0%, transparent ${50 + progress * 30}%),
            linear-gradient(180deg, 
              rgba(10, 147, 150, ${0.2 * (1 - progress)}) 0%, transparent 100%)
          `;
          
          // Add water droplet particles that evaporate
          if (progress > 0.3 && progress < 0.7 && Math.random() > 0.98) {
            createEvaporatingDroplet(container);
          }
        }
      }
    });

    // Animate moisture overlay fading
    tl.to(moistureOverlay, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    });

    // Animate content becoming crisp
    tl.to(content, {
      filter: 'blur(0px) saturate(1)',
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, '<');

    // Color shift from cool/damp to warm/dry
    tl.to(container, {
      backgroundColor: 'rgba(249, 249, 249, 1)',
      duration: 1
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Create evaporating water droplet effect
  const createEvaporatingDroplet = (container: HTMLElement) => {
    const droplet = document.createElement('div');
    droplet.className = 'absolute pointer-events-none';
    droplet.style.cssText = `
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(10, 147, 150, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(droplet);
    
    gsap.to(droplet, {
      y: -30,
      opacity: 0,
      scale: 2,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => droplet.remove()
    });
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative transition-colors duration-1000 ${className}`}
      style={{ backgroundColor: 'rgba(230, 240, 245, 1)' }}
    >
      {/* Moisture overlay */}
      <div 
        ref={moistureOverlayRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'multiply' }}
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-20">
        {children}
      </div>
      
      {/* Water droplets container */}
      <div className="absolute inset-0 pointer-events-none z-30" />
    </div>
  );
}