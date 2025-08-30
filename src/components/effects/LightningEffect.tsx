'use client';

import React from 'react';

export default function LightningEffect() {
  return (
    <>
      {/* Lightning SVG Definitions */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          {/* Multiple gradients for 3D effect */}
          <linearGradient id="lightning-gradient-core" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="20%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="80%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="lightning-gradient-outer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="20%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="lightning-gradient-glow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#bfdbfe" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
          </radialGradient>
          
          {/* Enhanced 3D filters */}
          <filter id="lightning-3d-glow" x="-200%" y="-200%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur3" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0.8 0.8 0.8 0.8 0.8 0.8 0.8 0.8 0.8 0.8" />
            </feComponentTransfer>
          </filter>

          <filter id="lightning-inner-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Drop shadow for depth */}
          <filter id="lightning-shadow">
            <feDropShadow dx="2" dy="4" stdDeviation="6" floodOpacity="0.3" floodColor="#1e3a8a"/>
          </filter>
        </defs>
      </svg>

      {/* Main Lightning Bolt - Center */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="relative w-full h-full">
          {/* Primary lightning path - Multiple layers for 3D effect */}
          <svg className="absolute inset-0 w-48 h-full -left-24" viewBox="0 0 192 1000" preserveAspectRatio="none">
            {/* Shadow layer - furthest back */}
            <path
              d="M 96 0 L 88 120 L 104 160 L 82 280 L 110 320 L 78 480 L 114 520 L 86 700 L 102 740 L 96 1000"
              stroke="#1e3a8a"
              strokeWidth="8"
              fill="none"
              filter="url(#lightning-shadow)"
              className="animate-lightning-strike"
              opacity="0.2"
              transform="translate(4, 8)"
            />
            
            {/* Outer glow layer */}
            <path
              d="M 96 0 L 88 120 L 104 160 L 82 280 L 110 320 L 78 480 L 114 520 L 86 700 L 102 740 L 96 1000"
              stroke="url(#lightning-gradient-outer)"
              strokeWidth="12"
              fill="none"
              filter="url(#lightning-3d-glow)"
              className="animate-lightning-strike"
              opacity="0.3"
            />
            
            {/* Middle layer */}
            <path
              d="M 96 0 L 88 120 L 104 160 L 82 280 L 110 320 L 78 480 L 114 520 L 86 700 L 102 740 L 96 1000"
              stroke="#93c5fd"
              strokeWidth="6"
              fill="none"
              filter="url(#lightning-inner-glow)"
              className="animate-lightning-strike"
              opacity="0.4"
            />
            
            {/* Inner bright layer */}
            <path
              d="M 96 0 L 88 120 L 104 160 L 82 280 L 110 320 L 78 480 L 114 520 L 86 700 L 102 740 L 96 1000"
              stroke="#dbeafe"
              strokeWidth="3"
              fill="none"
              className="animate-lightning-strike"
              opacity="0.6"
            />
            
            {/* Core white-hot center */}
            <path
              d="M 96 0 L 88 120 L 104 160 L 82 280 L 110 320 L 78 480 L 114 520 L 86 700 L 102 740 L 96 1000"
              stroke="url(#lightning-gradient-core)"
              strokeWidth="1.5"
              fill="none"
              className="animate-lightning-strike"
              opacity="0.9"
            />
          </svg>

          {/* Lightning branches - 3D layered */}
          <svg className="absolute inset-0 w-80 h-full -left-40" viewBox="0 0 320 1000" preserveAspectRatio="none">
            {/* Left branch - Multiple layers */}
            <g className="animate-lightning-branch-left">
              <path
                d="M 160 200 L 130 250 L 110 320 L 100 360"
                stroke="#1e3a8a"
                strokeWidth="4"
                fill="none"
                opacity="0.1"
                transform="translate(2, 4)"
              />
              <path
                d="M 160 200 L 130 250 L 110 320 L 100 360"
                stroke="#60a5fa"
                strokeWidth="3"
                fill="none"
                filter="url(#lightning-inner-glow)"
                opacity="0.2"
              />
              <path
                d="M 160 200 L 130 250 L 110 320 L 100 360"
                stroke="#dbeafe"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            </g>
            
            {/* Right branch - Multiple layers */}
            <g className="animate-lightning-branch-right">
              <path
                d="M 160 400 L 190 450 L 210 520 L 220 580"
                stroke="#1e3a8a"
                strokeWidth="4"
                fill="none"
                opacity="0.1"
                transform="translate(2, 4)"
              />
              <path
                d="M 160 400 L 190 450 L 210 520 L 220 580"
                stroke="#60a5fa"
                strokeWidth="3"
                fill="none"
                filter="url(#lightning-inner-glow)"
                opacity="0.2"
              />
              <path
                d="M 160 400 L 190 450 L 210 520 L 220 580"
                stroke="#dbeafe"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            </g>
            
            {/* Small branches with 3D effect */}
            <g className="animate-lightning-branch-small">
              <path
                d="M 160 600 L 145 640 L 135 680"
                stroke="#60a5fa"
                strokeWidth="2"
                fill="none"
                filter="url(#lightning-inner-glow)"
                opacity="0.15"
              />
              <path
                d="M 160 300 L 175 330 L 180 360"
                stroke="#60a5fa"
                strokeWidth="2"
                fill="none"
                filter="url(#lightning-inner-glow)"
                opacity="0.15"
              />
            </g>
          </svg>

          {/* Ambient glow effect */}
          <div className="absolute inset-0 w-32 -left-16">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-400/5 to-transparent animate-lightning-glow" />
          </div>
        </div>
      </div>

      {/* Secondary Lightning Strikes - Occasional flashes */}
      <div className="absolute left-1/3 top-0 h-2/3 w-px pointer-events-none" style={{ zIndex: 1 }}>
        <svg className="w-20 h-full -left-10 relative" viewBox="0 0 80 600" preserveAspectRatio="none">
          <path
            d="M 40 0 L 38 100 L 42 120 L 35 250 L 45 270 L 38 400 L 42 420 L 40 600"
            stroke="#60a5fa"
            strokeWidth="0.5"
            fill="none"
            className="animate-lightning-flash"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="absolute right-1/3 top-0 h-3/4 w-px pointer-events-none" style={{ zIndex: 1 }}>
        <svg className="w-20 h-full -left-10 relative" viewBox="0 0 80 750" preserveAspectRatio="none">
          <path
            d="M 40 0 L 42 120 L 38 140 L 45 300 L 35 320 L 42 500 L 38 520 L 40 750"
            stroke="#60a5fa"
            strokeWidth="0.5"
            fill="none"
            className="animate-lightning-flash-delayed"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes lightning-strike {
          0%, 100% {
            opacity: 0;
            stroke-dasharray: 0 1000;
          }
          1% {
            opacity: 0.6;
            stroke-dasharray: 1000 0;
          }
          2% {
            opacity: 0.3;
          }
          3% {
            opacity: 0.6;
          }
          4% {
            opacity: 0.2;
          }
          5% {
            opacity: 0;
          }
        }

        @keyframes lightning-branch-left {
          0%, 100% {
            opacity: 0;
            transform: translateX(0);
          }
          1.5% {
            opacity: 0.3;
            transform: translateX(-2px);
          }
          3% {
            opacity: 0;
            transform: translateX(0);
          }
        }

        @keyframes lightning-branch-right {
          0%, 100% {
            opacity: 0;
            transform: translateX(0);
          }
          2% {
            opacity: 0.3;
            transform: translateX(2px);
          }
          3.5% {
            opacity: 0;
            transform: translateX(0);
          }
        }

        @keyframes lightning-branch-small {
          0%, 100% {
            opacity: 0;
          }
          2.5% {
            opacity: 0.15;
          }
          3% {
            opacity: 0;
          }
        }

        @keyframes lightning-glow {
          0%, 100% {
            opacity: 0;
          }
          1% {
            opacity: 0.5;
          }
          2% {
            opacity: 0.2;
          }
          3% {
            opacity: 0.4;
          }
          4% {
            opacity: 0.1;
          }
          5% {
            opacity: 0;
          }
        }

        @keyframes lightning-flash {
          0%, 100% {
            opacity: 0;
          }
          48% {
            opacity: 0;
          }
          49% {
            opacity: 0.2;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes lightning-flash-delayed {
          0%, 100% {
            opacity: 0;
          }
          73% {
            opacity: 0;
          }
          74% {
            opacity: 0.2;
          }
          75% {
            opacity: 0;
          }
        }

        .animate-lightning-strike {
          animation: lightning-strike 8s infinite;
        }

        .animate-lightning-branch-left {
          animation: lightning-branch-left 8s infinite;
        }

        .animate-lightning-branch-right {
          animation: lightning-branch-right 8s infinite;
        }

        .animate-lightning-glow {
          animation: lightning-glow 8s infinite;
        }

        .animate-lightning-flash {
          animation: lightning-flash 6s infinite;
        }

        .animate-lightning-flash-delayed {
          animation: lightning-flash-delayed 7s infinite;
        }

        .animate-lightning-branch-small {
          animation: lightning-branch-small 8s infinite;
        }
      `}</style>
    </>
  );
}