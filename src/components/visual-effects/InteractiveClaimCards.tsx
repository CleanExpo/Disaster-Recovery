'use client';

import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface ClaimType {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  icon: React.ReactNode;
  color: string;
}

interface InteractiveClaimCardsProps {
  claimTypes: ClaimType[];
  className?: string;
}

export function InteractiveClaimCards({ claimTypes, className = '' }: InteractiveClaimCardsProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = cardsRef.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotationY: rotateY,
      rotationX: rotateX,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (cardId: string) => {
    const card = cardsRef.current[cardId];
    if (!card) return;

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {claimTypes.map((claim) => (
        <div
          key={claim.id}
          ref={(el) => { cardsRef.current[claim.id] = el; }}
          className="relative group cursor-pointer transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseMove={(e) => handleMouseMove(e, claim.id)}
          onMouseLeave={() => handleMouseLeave(claim.id)}
          onClick={() => setActiveCard(activeCard === claim.id ? null : claim.id)}
        >
          {/* Card Container */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl">
            {/* Header */}
            <div 
              className="p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: claim.color }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4">{claim.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{claim.title}</h3>
                <p className="text-white/90 text-sm">{claim.description}</p>
              </div>
            </div>

            {/* Before/After Slider */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              {activeCard === claim.id ? (
                <BeforeAfterSlider
                  beforeImage={claim.beforeImage}
                  afterImage={claim.afterImage}
                  title={claim.title}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={claim.beforeImage}
                    alt={`${claim.title} damage`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">Click to see restoration</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="p-4 bg-gray-50">
              <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Get Emergency Help
              </button>
            </div>
          </div>

          {/* 3D Shadow Effect */}
          <div 
            className="absolute -inset-4 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${claim.color}40, ${claim.color}20)` 
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Before/After Slider Component
function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  title 
}: { 
  beforeImage: string; 
  afterImage: string; 
  title: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${title} restored`}
          fill
          className="object-cover"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${title} damage`}
          fill
          className="object-cover"
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold">
        AFTER
      </div>
    </div>
  );
}