'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {  Users, Clock, Shield, CheckCircle, Star, Zap, MessageSquare} from 'lucide-react';

export default function AnimatedHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* CSS Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080 }}
            animate={{
              x: Math.random() * 1920,
              y: Math.random() * 1080 }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear" }}
          />
        ))}
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,0,0,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(0,100,255,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,100,0,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,0,0,0.3) 0%, transparent 50%)",
          ] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Emergency Indicators */}
        <div className="absolute top-10 w-full flex justify-center space-x-8">
          {[
            { icon: Shield, label: "IICRC Certified", colour: "green" },
            { icon: Clock, label: "24/7 Response", colour: "blue" },
            { icon: Zap, label: "Rapid Service", colour: "yellow" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3 }}
                className={`p-3 bg-${item.colour}-500/20 rounded-full border-2 border-${item.colour}-400`}
              >
                <item.icon className={`h-6 w-6 text-${item.colour}-400`} />
              </motion.div>
              <span className="text-white font-semibold">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Main Hero Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,0,0,0)",
                "0 0 40px rgba(255,0,0,0.8)",
                "0 0 60px rgba(255,100,0,0.6)",
                "0 0 20px rgba(255,0,0,0)",
              ] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            EMERGENCY
          </motion.h1>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-blue-500 to-blue-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            RESTORATION
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mt-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Professional Disaster Recovery Services Available 24/7
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold rounded-full flex items-center justify-center space-x-2 text-lg"
            >
              <MessageSquare className="h-6 w-6" />
              <span>Call online support</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,100,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full text-lg"
            >
              Get Free Quote
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          className="absolute bottom-10 w-full flex justify-center space-x-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { number: "5000+", label: "Properties Restored" },
            { number: "15+", label: "Years Experience" },
            { number: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              animate={{
                y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2 }}
            >
              <motion.div
                className="text-3xl font-bold text-white"
                animate={{
                  scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{
                y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}