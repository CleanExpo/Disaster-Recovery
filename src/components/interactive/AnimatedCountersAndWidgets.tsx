'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  Star, 
  Award, 
  TrendingUp, 
  Phone,
  MapPin,
  Zap
} from 'lucide-react';

// Animated Counter Component
interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  colour?: string;
}

function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '', decimals = 0, colour = 'text-blue-600' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      setCount(target * easeProgress);

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

  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.round(num).toLocaleString();
    }
    return num.toFixed(decimals);
  };

  return (
    <div ref={ref} className={`font-black text-5xl ${colour} leading-none`}>
      <motion.span
        animate={inView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {prefix}{formatNumber(count)}{suffix}
      </motion.span>
    </div>
  );
}

// Live Availability Widget
function LiveAvailabilityWidget() {
  const [teamStatus, setTeamStatus] = useState({
    available: true,
    responseTime: 45,
    activeJobs: 12,
    teamsReady: 8,
  });

  const [pulseKey, setPulseKey] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTeamStatus(prev => ({
        available: Math.random() > 0.1, // 90% uptime
        responseTime: 30 + Math.floor(Math.random() * 30), // 30-60 min range
        activeJobs: 8 + Math.floor(Math.random() * 8), // 8-16 jobs
        teamsReady: 6 + Math.floor(Math.random() * 4), // 6-10 teams
      }));
      setPulseKey(prev => prev + 1);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-green-800">Live Availability</h3>
        <motion.div
          key={pulseKey}
          className="w-3 h-3 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="space-y-4">
        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-gray-700">Teams Available</span>
          </div>
          <motion.span 
            className={`font-bold text-lg ${teamStatus.available ? 'text-green-600' : 'text-red-600'}`}
            animate={{ scale: teamStatus.available ? 1 : [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            {teamStatus.available ? 'YES' : 'LIMITED'}
          </motion.span>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-700">Response Time</span>
          </div>
          <motion.span 
            className="font-bold text-lg text-blue-600"
            key={teamStatus.responseTime}
            initial={{ scale: 1.2, colour: '#ef4444' }}
            animate={{ scale: 1, colour: '#2563eb' }}
            transition={{ duration: 0.3 }}
          >
            {teamStatus.responseTime} min
          </motion.span>
        </div>

        {/* Active Jobs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span className="font-semibold text-gray-700">Active Jobs</span>
          </div>
          <motion.span 
            className="font-bold text-lg text-yellow-600"
            key={teamStatus.activeJobs}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {teamStatus.activeJobs}
          </motion.span>
        </div>

        {/* Teams Ready */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-gray-700">Teams Ready</span>
          </div>
          <motion.span 
            className="font-bold text-lg text-purple-600"
            key={teamStatus.teamsReady}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {teamStatus.teamsReady}
          </motion.span>
        </div>
      </div>

      {/* CTA Button */}
      <motion.div className="mt-6">
        <motion.a
          href="tel:1300566166"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-bold text-center block"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Call Now - Teams Standing By</span>
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

// Statistics Card Component
interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  colour: string;
  delay?: number;
}

function StatCard({ icon: Icon, value, label, suffix = '', prefix = '', colour, delay = 0 }: StatCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${colour} rounded-2xl mb-6`}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>

      <AnimatedCounter
        target={value}
        prefix={prefix}
        suffix={suffix}
        colour="text-gray-900"
        duration={2000}
      />

      <motion.p
        className="text-lg font-bold text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 1 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

// Real-time Response Map Widget
function ResponseTimeMap() {
  const locations = [
    { city: 'Sydney', time: 35, colour: 'from-green-500 to-green-600', lat: -33.8688, lng: 151.2093 },
    { city: 'Melbourne', time: 42, colour: 'from-green-500 to-green-600', lat: -37.8136, lng: 144.9631 },
    { city: 'Brisbane', time: 48, colour: 'from-yellow-500 to-yellow-600', lat: -27.4698, lng: 153.0251 },
    { city: 'Perth', time: 55, colour: 'from-yellow-500 to-yellow-600', lat: -31.9505, lng: 115.8605 },
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-blue-800">Live Response Times</h3>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <MapPin className="h-5 w-5 text-blue-600" />
        </motion.div>
      </div>

      <div className="space-y-4">
        {locations.map((location, index) => (
          <motion.div
            key={location.city}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className={`w-3 h-3 bg-gradient-to-r ${location.colour} rounded-full`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
              <span className="font-semibold text-gray-700">{location.city}</span>
            </div>
            <div className="text-right">
              <motion.div 
                className="font-bold text-lg text-gray-900"
                key={`${location.city}-${location.time}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {location.time}min
              </motion.div>
              <div className="text-xs text-gray-500">Est. Response</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Main Component
export default function AnimatedCountersAndWidgets() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    {
      icon: CheckCircle,
      value: 98,
      suffix: '%',
      label: 'Customer Satisfaction',
      colour: 'from-blue-500 to-blue-600',
      delay: 0,
    },
    {
      icon: Users,
      value: 2500,
      suffix: '+',
      label: 'Properties Restored',
      colour: 'from-green-500 to-green-600',
      delay: 0.2,
    },
    {
      icon: Award,
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      colour: 'from-purple-500 to-purple-600',
      delay: 0.4,
    },
    {
      icon: Star,
      value: 4.9,
      decimals: 1,
      label: 'Average Rating',
      colour: 'from-yellow-500 to-yellow-600',
      delay: 0.6,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={ref}>
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          <span className="font-semibold">Live Performance Metrics</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Real-Time Emergency Response
        </h2>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track our live performance metrics and team availability nationwide
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={stat.delay}
          />
        ))}
      </div>

      {/* Live Widgets Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <LiveAvailabilityWidget />
        <ResponseTimeMap />
      </div>
    </div>
  );
}