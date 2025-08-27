'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Add staggered delays for children
          const children = entry.target.querySelectorAll('.reveal-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return null;
}