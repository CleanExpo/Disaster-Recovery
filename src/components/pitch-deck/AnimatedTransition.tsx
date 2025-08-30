'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  animation: string;
  duration?: number;
  className?: string;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  animation,
  duration = 1000,
  className = ''
}) => {
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fadeIn':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
      
      case 'slideLeft':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 }
        };
      
      case 'slideRight':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 }
        };
      
      case 'slideUp':
        return {
          initial: { y: '100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '-100%', opacity: 0 }
        };
      
      case 'zoom':
        return {
          initial: { scale: 0.5, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.5, opacity: 0 }
        };
      
      case 'fadeScale':
        return {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 }
        };
      
      case 'matrix':
        return {
          initial: { 
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'perspective(1000px) rotateY(-30deg) translateZ(-100px)'
          },
          animate: { 
            opacity: 1,
            filter: 'blur(0px)',
            transform: 'perspective(1000px) rotateY(0deg) translateZ(0px)'
          },
          exit: { 
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'perspective(1000px) rotateY(30deg) translateZ(-100px)'
          }
        };
      
      case 'stagger':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          },
          exit: { opacity: 0, y: -20 }
        };
      
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration: duration / 1000,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;