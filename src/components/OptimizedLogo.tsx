import React from 'react';

// Optimized logo component that doesn't rely on external image files
export const OptimizedLogo: React.FC<{ 
  size?: number;
  className?: string;
}> = ({ size = 60, className = '' }) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 3D styled logo using SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#FF8E53" />
            <stop offset="100%" stopColor="#FFB347" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="4" result="offsetblur"/>
            <feFlood floodColor="#000000" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
        
        {/* Main circle background */}
        <circle 
          cx="100" 
          cy="100" 
          r="90" 
          fill="#1a1a1a"
          filter="url(#shadow)"
        />
        
        {/* Inner gradient circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="85" 
          fill="url(#logoGradient)"
          opacity="0.9"
        />
        
        {/* 3D effect - inner shadow */}
        <circle 
          cx="100" 
          cy="100" 
          r="80" 
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.2"
        />
        
        {/* DR Text */}
        <text 
          x="100" 
          y="110" 
          fontFamily="Arial Black, sans-serif" 
          fontSize="65" 
          fontWeight="900"
          fill="url(#textGradient)"
          textAnchor="middle"
          filter="url(#shadow)"
        >
          DR
        </text>
        
        {/* Bottom text */}
        <text 
          x="100" 
          y="145" 
          fontFamily="Arial, sans-serif" 
          fontSize="12" 
          fontWeight="600"
          fill="#FFFFFF"
          textAnchor="middle"
          opacity="0.9"
        >
          DISASTER RECOVERY
        </text>
        
        {/* Small tagline */}
        <text 
          x="100" 
          y="160" 
          fontFamily="Arial, sans-serif" 
          fontSize="8" 
          fontWeight="400"
          fill="#FFFFFF"
          textAnchor="middle"
          opacity="0.7"
        >
          24/7 EMERGENCY RESPONSE
        </text>
      </svg>
    </div>
  );
};

export default OptimizedLogo;