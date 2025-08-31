'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';

// Parallax Background Component
interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

function ParallaxBackground({ children, speed = 0.5, className = '' }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Staggered List Animation
interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

function StaggeredList({ children, staggerDelay = 0.1, direction = 'up' }: StaggeredListProps) {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  const initial = getInitialPosition();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.3 } } };

  const item = {
    hidden: { 
      opacity: 0,
      ...initial },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12 } } };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Scroll Progress Indicator
function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transform origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Fade In On Scroll Component
interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
}

function FadeInOnScroll({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = '' 
}: FadeInOnScrollProps) {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true });

  const getAnimation = () => {
    const baseAnimation = {
      opacity: inView ? 1 : 0,
      transition: { duration, delay }
    };

    switch (direction) {
      case 'up':
        return { ...baseAnimation, y: inView ? 0 : 50 };
      case 'down':
        return { ...baseAnimation, y: inView ? 0 : -50 };
      case 'left':
        return { ...baseAnimation, x: inView ? 0 : 50 };
      case 'right':
        return { ...baseAnimation, x: inView ? 0 : -50 };
      case 'scale':
        return { ...baseAnimation, scale: inView ? 1 : 0.8 };
      default:
        return { ...baseAnimation, y: inView ? 0 : 50 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...(direction === 'up' && { y: 50 }),
        ...(direction === 'down' && { y: -50 }),
        ...(direction === 'left' && { x: 50 }),
        ...(direction === 'right' && { x: -50 }),
        ...(direction === 'scale' && { scale: 0.8 }) }}
      animate={getAnimation()}
    >
      {children}
    </motion.div>
  );
}

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay } } };

  const child = {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(4px)' },
    show: { 
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12 } } };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Scroll-triggered Counter
interface ScrollCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

function ScrollCounter({ target, duration = 2000, suffix = '', className = '' }: ScrollCounterProps) {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true });

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      setCount(Math.round(target * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, target, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        key={count}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
    </motion.div>
  );
}

// Parallax Section with Scroll Effects
interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundElement?: React.ReactNode;
  speed?: number;
  className?: string;
}

function ParallaxSection({ 
  children, 
  backgroundElement, 
  speed = 0.5, 
  className = '' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 50}%`]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Background Layer */}
      {backgroundElement && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y: backgroundY }}
        >
          {backgroundElement}
        </motion.div>
      )}

      {/* Content Layer */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Sticky Element with Scroll Animations
interface StickyScrollElementProps {
  children: React.ReactNode;
  className?: string;
}

function StickyScrollElement({ children, className = '' }: StickyScrollElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={`sticky top-0 ${className}`}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Horizontal Scroll Section
interface HorizontalScrollProps {
  children: React.ReactNode[];
  className?: string;
}

function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          style={{ x }} 
          className="flex gap-8 will-change-transform"
        >
          {children.map((child, index) => (
            <div key={index} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Main Export Object with All Animation Components
const ScrollAnimations = {
  ParallaxBackground,
  StaggeredList,
  ScrollProgressIndicator,
  FadeInOnScroll,
  TextReveal,
  ScrollCounter,
  ParallaxSection,
  StickyScrollElement,
  HorizontalScroll };

export default ScrollAnimations;

// Individual exports for convenience
export {
  ParallaxBackground,
  StaggeredList,
  ScrollProgressIndicator,
  FadeInOnScroll,
  TextReveal,
  ScrollCounter,
  ParallaxSection,
  StickyScrollElement,
  HorizontalScroll };