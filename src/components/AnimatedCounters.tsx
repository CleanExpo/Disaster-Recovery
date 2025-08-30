'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedCounters() {
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const animateCounter = (element: HTMLElement) => {
      const target = parseInt(element.getAttribute('data-target') || '0');
      const duration = 2000; // 2 seconds
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toString();
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach((counter) => {
            animateCounter(counter as HTMLElement);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  return (
    <div ref={countersRef} className="grid md:grid-cols-4 gap-8 mb-16">
      <div className="text-centre scroll-reveal">
        <p className="text-5xl font-bold text-blue-600 counter" data-target="45">0</p>
        <p className="text-gray-600 mt-2">Team Members</p>
      </div>
      <div className="text-centre scroll-reveal" style={{animationDelay: '0.1s'}}>
        <p className="text-5xl font-bold text-blue-600 counter" data-target="15">0</p>
        <p className="text-gray-600 mt-2">Years Experience</p>
      </div>
      <div className="text-centre scroll-reveal" style={{animationDelay: '0.2s'}}>
        <p className="text-5xl font-bold text-blue-600 counter" data-target="2500">0</p>
        <p className="text-gray-600 mt-2">Projects Completed</p>
      </div>
      <div className="text-centre scroll-reveal" style={{animationDelay: '0.3s'}}>
        <p className="text-5xl font-bold text-blue-600 counter" data-target="98">0</p>
        <p className="text-gray-600 mt-2">% Satisfaction</p>
      </div>
    </div>
  );
}