'use client';

import React from 'react';
import { AlertTriangle, MessageCircle, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencyBar() {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[10000] bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-400 rounded-full animate-ping" />
            </div>
            <span className="font-semibold text-sm md:text-base">
              24/7 EMERGENCY RESPONSE - 100% DIGITAL
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.href = '/claim'}
              className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Online Claim</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/contact'}
              className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 animate-pulse" />
    </motion.div>
  );
}