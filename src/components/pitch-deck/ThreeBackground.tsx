'use client';

import React, { useEffect, useRef } from 'react';

interface ThreeBackgroundProps {
  type: string;
  className?: string;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ type, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Initialize particles based on type
    const initParticles = () => {
      particles = [];
      const count = type === 'matrix' ? 100 : 50;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: type === 'matrix' ? Math.random() * 2 + 1 : (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (type === 'gradient') {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
        } else if (type === 'matrix') {
          ctx.fillStyle = `rgba(0, 255, 0, ${particle.opacity})`;
        } else if (type === 'dark') {
          ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
        } else if (type === 'tech') {
          ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`;
        } else if (type === 'epic') {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, `rgba(251, 146, 60, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(250, 204, 21, ${particle.opacity * 0.5})`);
          gradient.addColorStop(1, 'rgba(251, 146, 60, 0)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        }
        
        ctx.fill();
      });

      // Draw connections for tech type
      if (type === 'tech') {
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 0.5;
        
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const distance = Math.sqrt(
              Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
            );
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [type]);

  const getBackgroundGradient = () => {
    switch (type) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 via-black to-gray-900';
      case 'chart':
        return 'bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900';
      case 'tech':
        return 'bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900';
      case 'matrix':
        return 'bg-black';
      case 'epic':
        return 'bg-gradient-to-br from-orange-900 via-red-900 to-purple-900';
      default:
        return 'bg-gradient-to-br from-slate-900 to-slate-800';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${getBackgroundGradient()} ${className}`}
    >
      {/* Additional overlay effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
      </div>

      {/* Grid pattern for tech background */}
      {type === 'tech' && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      )}

      {/* Matrix rain effect */}
      {type === 'matrix' && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-500 text-xs opacity-50 animate-pulse"
              style={{
                left: `${i * 5}%`,
                top: '-20px',
                animation: `matrixFall ${10 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            >
              {Array.from({ length: 30 }).map((_, j) => (
                <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes matrixFall {
          to {
            transform: translateY(calc(100vh + 600px));
          }
        }
      `}</style>
    </div>
  );
};

export default ThreeBackground;