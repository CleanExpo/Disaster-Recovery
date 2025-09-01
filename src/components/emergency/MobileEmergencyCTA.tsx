'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default function MobileEmergencyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Show after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/90 to-transparent"
        >
          <Link
            href="/contact"
            className="block w-full bg-gradient-to-r from-red-600 to-blue-700 text-white rounded-full py-4 px-6 font-bold text-lg shadow-2xl"
          >
            <div className="flex items-center justify-center gap-3">
              <AlertCircle className="h-6 w-6 animate-pulse" />
              <span>GET EMERGENCY HELP NOW</span>
              <ArrowRight className="h-6 w-6" />
            </div>
          </Link>
          
          <div className="mt-2 text-center text-white/80 text-sm">
            Average response: 47 minutes • Available 24/7
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}