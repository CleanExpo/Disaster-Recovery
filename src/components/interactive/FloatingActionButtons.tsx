'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {  
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  HelpCircle,
  Calendar,
  FileText,
  X,
  Plus
} from 'lucide-react';

// Individual Floating Action Button with Magnetic Effect
interface FloatingButtonProps {
  icon: React.ElementType;
  label: string;
  action: () => void;
  colour: string;
  delay?: number;
  size?: 'sm' | 'md' | 'lg';
}

function MagneticFloatingButton({ 
  icon: Icon, 
  label, 
  action, 
  colour, 
  delay = 0, 
  size = 'md'
}: FloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);
    const magneticRange = 80;
    
    if (distance < magneticRange) {
      const strength = Math.max(0, 1 - distance / magneticRange);
      x.set(mouseX * strength * 0.3);
      y.set(mouseY * strength * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 300,
        damping: 20 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Magnetic field visualization */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-dashed ${colour.replace('bg-', 'border-').replace('-600', '-300')} opacity-0`}
        animate={{
          scale: isHovered ? [1, 1.3, 1.1] : 1,
          opacity: isHovered ? [0, 0.3, 0.1] : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main button */}
      <motion.button
        ref={buttonRef}
        className={` relative ${sizeClasses[size]} ${colour} text-white rounded-full 
          shadow-lg backdrop-blur-sm border border-white/20 
          group overflow-hidden z-10
        `}
        style={{
          x: mouseXSpring,
          y: mouseYSpring }}
        onClick={action}
        onMouseEnter={() => setIsHovered(true)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={isHovered ? { 
            scale: [0, 1.5, 2], 
            opacity: [0.3, 0.1, 0] 
          } : {
            scale: 0,
            opacity: 0
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Icon with rotation on hover */}
        <motion.div
          className="relative z-10"
          animate={isHovered ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className={`${iconSizes[size]} mx-auto`} />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${colour} blur-md opacity-30`}
          animate={isHovered ? { scale: 1.5, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Label tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">"
              {label}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">"
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Expandable FAB Menu
function ExpandableFABMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: FileText,
      label: 'Submit Claim Form',
      colour: 'bg-gradient-to-r from-blue-600 to-blue-700',
      action: () => window.location.href = '/book-service'
    },
    {
      icon: Mail,
      label: 'Email Documentation',
      colour: 'bg-gradient-to-r from-green-600 to-green-700',
      action: () => window.open('mailto:claims@disasterrecovery.com.au', '_self')
    },
    {
      icon: Calendar,
      label: 'Schedule Assessment',
      colour: 'bg-gradient-to-r from-purple-600 to-purple-700',
      action: () => window.location.href = '/schedule'
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">"
      <div className="relative">"
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="absolute bottom-20"
                  style={{ right: 0 }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: -(index + 1) * 70 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0,
                    y: 20 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25 }}
                >
                  <MagneticFloatingButton
                    icon={item.icon}
                    label={item.label}
                    colour={item.colour}
                    action={item.action}
                    size="md"
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center relative overflow-hidden group"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        >
          {/* Pulse animation when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 0, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" }}
            />
          )}

          {/* Icon */}
          <motion.div
            animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}"
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 -z-10"
            animate={isOpen ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Help text when closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-20 right-0 whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 2 }}
            >
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">"
                Need help? Click here!
                <div className="absolute top-full right-4">"
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />"
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Quick Action Dock (Bottom Centre)
function QuickActionDock() {
  const [isDockVisible, setIsDockVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsDockVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const dockItems = [
    {
      icon: FileText,
      label: 'Submit Claim',
      colour: 'bg-gradient-to-r from-red-500 to-red-600',
      action: () => window.location.href = '/book-service',
      size: 'lg' as const
    },
    {
      icon: Clock,
      label: 'Track Claim',
      colour: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => window.location.href = '/portal/client',
      size: 'md' as const
    },
    {
      icon: MapPin,
      label: 'Service Areas',
      colour: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => window.location.href = '/services',
      size: 'md' as const
    },
    {
      icon: HelpCircle,
      label: 'Resources',
      colour: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => window.location.href = '/resources',
      size: 'md' as const
    },
  ];

  return (
    <AnimatePresence>
      {isDockVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            type: "spring", ""
            stiffness: 200, 
            damping: 20,
            delay: 0.5
          }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-full p-3 shadow-2xl border border-white/20">"
            <div className="flex items-center space-x-4">"
              {dockItems.map((item, index) => (
                <MagneticFloatingButton
                  key={item.label}
                  {...item}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Emergency Response Timer Widget
function EmergencyResponseTimer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    const visibilityTimer = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(visibilityTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-24 right-6 z-40 max-w-xs"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">"
            <div className="flex items-center space-x-3">"
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut" }}
              />
              <div className="flex-1">"
                <div className="text-sm font-semibold text-gray-700">Response Timer</div>"
                <div className="text-xs text-gray-500">Teams dispatching</div>"
              </div>
              <div className="text-right">"
                <motion.div 
                  className="text-lg font-bold text-green-600"
                  key={timeElapsed}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {formatTime(timeElapsed)}
                </motion.div>
                <div className="text-xs text-gray-500">elapsed</div>"
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main Component
export default function FloatingActionButtons() {
  return (
    <>
      <ExpandableFABMenu />
      <QuickActionDock />
      <EmergencyResponseTimer />
    </>
  );
}