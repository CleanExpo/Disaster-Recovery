'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, Star, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SocialProofBar() {
  const [propertiesCount, setPropertiesCount] = useState(12847)
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPropertiesCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { 
      number: propertiesCount.toLocaleString(), 
      label: "Properties Saved This Month",
      icon: TrendingUp,
      color: "text-green-500"
    },
    { 
      number: "47min", 
      label: "Average Response Time",
      icon: Clock,
      color: "text-blue-500"
    },
    { 
      number: "98.6%", 
      label: "Customer Satisfaction",
      icon: Star,
      color: "text-yellow-500"
    },
    { 
      number: "24/7", 
      label: "Always Available",
      icon: AlertCircle,
      color: "text-red-500"
    }
  ]

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 border-y border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}