'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WaterRippleHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function WaterRippleHero({ children, className = '' }: WaterRippleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const ripples = useRef<Array<{ x: number; y: number; radius: number; opacity: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Water ripple effect
    const createRipple = (x: number, y: number) => {
      ripples.current.push({
        x,
        y,
        radius: 0,
        opacity: 0.3
      });
    };

    // Subtle automatic ripples
    const autoRippleInterval = setInterval(() => {
      if (ripples.current.length < 3) {
        createRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }
    }, 2000);

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create subtle ripple on mouse movement
      if (Math.random() > 0.95 && ripples.current.length < 5) {
        createRipple(x, y);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 95, 115, 0.02)'); // Primary Trust Blue
      gradient.addColorStop(1, 'rgba(10, 147, 150, 0.02)'); // Secondary Aqua
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update ripples
      ripples.current = ripples.current.filter(ripple => {
        ripple.radius += 2;
        ripple.opacity -= 0.005;

        if (ripple.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(10, 147, 150, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner ripple for depth
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 95, 115, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Scroll-triggered drying effect
    gsap.to(canvas, {
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          canvas.style.opacity = `${1 - progress * 0.5}`;
          canvas.style.filter = `blur(${progress * 2}px)`;
        }
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      clearInterval(autoRippleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}