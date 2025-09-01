'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Glass Morphism Card Component
interface GlassMorphismCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  glow?: boolean;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'yellow';
}

export function GlassMorphismCard({
  children,
  className = '',
  intensity = 'medium',
  blur = 'md',
  border = true,
  glow = false,
  glowColor = 'blue'
}: GlassMorphismCardProps) {
  const getBackgroundIntensity = () => {
    switch (intensity) {
      case 'light': return 'bg-white/10';
      case 'medium': return 'bg-white/20';
      case 'strong': return 'bg-white/30';
      default: return 'bg-white/20';
    }
  };

  const getBlurClass = () => {
    switch (blur) {
      case 'sm': return 'backdrop-blur-sm';
      case 'md': return 'backdrop-blur-md';
      case 'lg': return 'backdrop-blur-lg';
      case 'xl': return 'backdrop-blur-xl';
      default: return 'backdrop-blur-md';
    }
  };

  const getGlowClass = () => {
    if (!glow) return '';
    
    switch (glowColor) {
      case 'blue': return 'shadow-blue-500/25';
      case 'purple': return 'shadow-purple-500/25';
      case 'green': return 'shadow-green-500/25';
      case 'red': return 'shadow-red-500/25';
      case 'yellow': return 'shadow-blue-600/25';
      default: return 'shadow-blue-500/25';
    }
  };

  const getBorderClass = () => {
    return border ? 'border border-white/20' : '';
  };

  return (
    <motion.div
      className={cn(
        'rounded-2xl',
        getBackgroundIntensity(),
        getBlurClass(),
        getBorderClass(),
        glow && `shadow-2xl ${getGlowClass()}`,
        className
      )}
      whileHover={glow ? { 
        boxShadow: `0 25px 50px -12px rgba(${
          glowColor === 'blue' ? '59, 130, 246' : 
          glowColor === 'purple' ? '168, 85, 247' :
          glowColor === 'green' ? '34, 197, 94' :
          glowColor === 'red' ? '239, 68, 68' :
          '234, 179, 8'
        }, 0.4)`,
        transition: { duration: 0.3 }
      } : {}}
    >
      {children}
    </motion.div>
  );
}

// Neon Glow Button Component
interface NeonGlowButtonProps {
  children: React.ReactNode;
  colour?: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'pink';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'ghost';
  animated?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NeonGlowButton({
  children,
  colour = 'blue',
  size = 'md',
  variant = 'solid',
  animated = true,
  onClick,
  className = ''
}: NeonGlowButtonProps) {
  const getColorClasses = () => {
    const colours = {
      blue: {
        solid: 'bg-blue-600 text-white border-blue-500 shadow-blue-500/50',
        outline: 'border-blue-500 text-blue-400 hover:bg-blue-500/10',
        ghost: 'text-blue-400 hover:bg-blue-500/10'
      },
      purple: {
        solid: 'bg-purple-600 text-white border-purple-500 shadow-purple-500/50',
        outline: 'border-purple-500 text-purple-400 hover:bg-purple-500/10',
        ghost: 'text-purple-400 hover:bg-purple-500/10'
      },
      green: {
        solid: 'bg-green-600 text-white border-green-500 shadow-green-500/50',
        outline: 'border-green-500 text-emerald-600 hover:bg-green-500/10',
        ghost: 'text-emerald-600 hover:bg-green-500/10'
      },
      red: {
        solid: 'bg-red-600 text-white border-red-600 shadow-red-500/50',
        outline: 'border-red-600 text-red-400 hover:bg-red-500/10',
        ghost: 'text-red-400 hover:bg-red-500/10'
      },
      yellow: {
        solid: 'bg-yellow-600 text-white border-blue-600 shadow-blue-600/50',
        outline: 'border-blue-600 text-blue-500 hover:bg-blue-600/10',
        ghost: 'text-blue-500 hover:bg-blue-600/10'
      },
      pink: {
        solid: 'bg-pink-600 text-white border-pink-500 shadow-pink-500/50',
        outline: 'border-pink-500 text-pink-400 hover:bg-pink-500/10',
        ghost: 'text-pink-400 hover:bg-pink-500/10'
      }
    };
    
    return colours[colour][variant];
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'md': return 'px-4 py-2 text-base';
      case 'lg': return 'px-6 py-3 text-lg';
      case 'xl': return 'px-8 py-4 text-xl';
      default: return 'px-4 py-2 text-base';
    }
  };

  const getBorderClass = () => {
    return variant === 'solid' ? 'border-2' : variant === 'outline' ? 'border-2' : '';
  };

  return (
    <motion.button
      className={cn(
        'relative rounded-lg font-semibold transition-all duration-300 overflow-hidden',
        getSizeClasses(),
        getBorderClass(),
        getColorClasses(),
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === 'solid' ? `0 0 30px ${
          colour === 'blue' ? 'rgba(59, 130, 246, 0.6)' :
          colour === 'purple' ? 'rgba(168, 85, 247, 0.6)' :
          colour === 'green' ? 'rgba(34, 197, 94, 0.6)' :
          colour === 'red' ? 'rgba(239, 68, 68, 0.6)' :
          colour === 'yellow' ? 'rgba(234, 179, 8, 0.6)' :
          'rgba(236, 72, 153, 0.6)'
        }` : undefined
      }}
      whileTap={{ scale: 0.95 }}
      animate={animated && variant === 'solid' ? {
        boxShadow: [
          `0 0 20px ${
            colour === 'blue' ? 'rgba(59, 130, 246, 0.4)' :
            colour === 'purple' ? 'rgba(168, 85, 247, 0.4)' :
            colour === 'green' ? 'rgba(34, 197, 94, 0.4)' :
            colour === 'red' ? 'rgba(239, 68, 68, 0.4)' :
            colour === 'yellow' ? 'rgba(234, 179, 8, 0.4)' :
            'rgba(236, 72, 153, 0.4)'
          }`,
          `0 0 30px ${
            colour === 'blue' ? 'rgba(59, 130, 246, 0.6)' :
            colour === 'purple' ? 'rgba(168, 85, 247, 0.6)' :
            colour === 'green' ? 'rgba(34, 197, 94, 0.6)' :
            colour === 'red' ? 'rgba(239, 68, 68, 0.6)' :
            colour === 'yellow' ? 'rgba(234, 179, 8, 0.6)' :
            'rgba(236, 72, 153, 0.6)'
          }`,
          `0 0 20px ${
            colour === 'blue' ? 'rgba(59, 130, 246, 0.4)' :
            colour === 'purple' ? 'rgba(168, 85, 247, 0.4)' :
            colour === 'green' ? 'rgba(34, 197, 94, 0.4)' :
            colour === 'red' ? 'rgba(239, 68, 68, 0.4)' :
            colour === 'yellow' ? 'rgba(234, 179, 8, 0.4)' :
            'rgba(236, 72, 153, 0.4)'
          }`
        ]
      } : {}}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {/* Inner glow overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Neon Text Effect Component
interface NeonTextProps {
  children: React.ReactNode;
  colour?: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'pink' | 'cyan';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  animated?: boolean;
  className?: string;
}

export function NeonText({
  children,
  colour = 'blue',
  size = 'md',
  animated = true,
  className = ''
}: NeonTextProps) {
  const getColorClass = () => {
    switch (colour) {
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'green': return 'text-emerald-600';
      case 'red': return 'text-red-400';
      case 'yellow': return 'text-blue-500';
      case 'pink': return 'text-pink-400';
      case 'cyan': return 'text-cyan-400';
      default: return 'text-blue-400';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      case '3xl': return 'text-3xl';
      default: return 'text-base';
    }
  };

  const getGlowColor = () => {
    switch (colour) {
      case 'blue': return '59, 130, 246';
      case 'purple': return '168, 85, 247';
      case 'green': return '34, 197, 94';
      case 'red': return '239, 68, 68';
      case 'yellow': return '234, 179, 8';
      case 'pink': return '236, 72, 153';
      case 'cyan': return '34, 211, 238';
      default: return '59, 130, 246';
    }
  };

  return (
    <motion.span
      className={cn(
        'font-bold',
        getColorClass(),
        getSizeClass(),
        className
      )}
      style={{
        textShadow: `0 0 10px rgba(${getGlowColor()}, 0.8), 0 0 20px rgba(${getGlowColor()}, 0.6), 0 0 30px rgba(${getGlowColor()}, 0.4)`
      }}
      animate={animated ? {
        textShadow: [
          `0 0 10px rgba(${getGlowColor()}, 0.8), 0 0 20px rgba(${getGlowColor()}, 0.6), 0 0 30px rgba(${getGlowColor()}, 0.4)`,
          `0 0 15px rgba(${getGlowColor()}, 1), 0 0 30px rgba(${getGlowColor()}, 0.8), 0 0 45px rgba(${getGlowColor()}, 0.6)`,
          `0 0 10px rgba(${getGlowColor()}, 0.8), 0 0 20px rgba(${getGlowColor()}, 0.6), 0 0 30px rgba(${getGlowColor()}, 0.4)`
        ]
      } : {}}
      transition={{
        textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {children}
    </motion.span>
  );
}

// Frosted Glass Panel
interface FrostedGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  frost?: 'light' | 'medium' | 'heavy';
}

export function FrostedGlassPanel({
  children,
  className = '',
  frost = 'medium'
}: FrostedGlassPanelProps) {
  const getFrostClass = () => {
    switch (frost) {
      case 'light': return 'backdrop-blur-sm bg-white/5';
      case 'medium': return 'backdrop-blur-md bg-white/10';
      case 'heavy': return 'backdrop-blur-lg bg-white/15';
      default: return 'backdrop-blur-md bg-white/10';
    }
  };

  return (
    <div className={cn(
      'rounded-xl border border-white/10',
      getFrostClass(),
      className
    )}>
      {children}
    </div>
  );
}

// Holographic Card Effect
interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = '' }: HolographicCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 backdrop-blur-lg border border-white/20 overflow-hidden',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Holographic shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 20%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 80%, rgba(255,255,255,0.1) 100%)',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'subtract',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'subtract'
        }}
        animate={{
          background: [
            'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))',
            'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))',
            'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))',
            'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(236, 72, 153, 0.3))'
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}

// Cyberpunk Grid Background
export function CyberpunkGrid({ className = '' }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="cyberpunk-grid"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        
        <rect
          width="100%"
          height="100%"
          fill="url(#cyberpunk-grid)"
        />
        
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#grid-fade)"
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

// Main Glass Morphism Effects Container
interface GlassMorphismEffectsProps {
  children: React.ReactNode;
  variant?: 'subtle' | 'medium' | 'dramatic';
  theme?: 'blue' | 'purple' | 'cyberpunk' | 'emergency';
  className?: string;
}

export default function GlassMorphismEffects({
  children,
  variant = 'medium',
  theme = 'blue',
  className = ''
}: GlassMorphismEffectsProps) {
  const getBackgroundGradient = () => {
    switch (theme) {
      case 'blue':
        return 'bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-800/20';
      case 'purple':
        return 'bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-pink-800/20';
      case 'cyberpunk':
        return 'bg-gradient-to-br from-green-900/20 via-blue-900/10 to-purple-800/20';
      case 'emergency':
        return 'bg-gradient-to-br from-red-900/20 via-orange-800/10 to-red-800/20';
      default:
        return 'bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-cyan-800/20';
    }
  };

  return (
    <div className={cn(
      'relative min-h-screen',
      getBackgroundGradient(),
      className
    )}>
      {/* Grid background for cyberpunk theme */}
      {theme === 'cyberpunk' && <CyberpunkGrid />}
      
      {/* Floating orbs for atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: variant === 'subtle' ? 3 : variant === 'dramatic' ? 8 : 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute w-32 h-32 rounded-full opacity-20 blur-xl',
              theme === 'blue' && 'bg-blue-500',
              theme === 'purple' && 'bg-purple-500',
              theme === 'cyberpunk' && 'bg-green-500',
              theme === 'emergency' && 'bg-red-500'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%` }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5 }}
          />
        ))}
      </div>
      
      {children}
    </div>
  );
}