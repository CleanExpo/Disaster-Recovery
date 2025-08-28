import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Droplets,
  Flame,
  Wind,
  AlertTriangle
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const services = [
  {
    icon: Droplets,
    title: 'Water Damage',
    description: 'Rapid water extraction, drying, and restoration',
    color: 'text-blue-500'
  },
  {
    icon: Flame,
    title: 'Fire Restoration',
    description: 'Complete fire and smoke damage recovery',
    color: 'text-red-500'
  },
  {
    icon: Wind,
    title: 'Storm Damage',
    description: 'Emergency tarping, repairs, and cleanup',
    color: 'text-gray-500'
  },
  {
    icon: AlertTriangle,
    title: 'Mold Remediation',
    description: 'Professional mold removal and prevention',
    color: 'text-green-500'
  }
]

const stats = [
  { label: 'Emergency Response Time', value: '60min', description: 'Average response' },
  { label: 'Customer Satisfaction', value: '98%', description: 'Happy customers' },
  { label: 'Years Experience', value: '15+', description: 'In the industry' },
  { label: 'Jobs Completed', value: '10k+', description: 'Successful restorations' },
]

export const HomePage: React.FC = () => {
  const { ref: heroRef, isIntersecting: heroVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  })
  
  const { ref: servicesRef, isIntersecting: servicesVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  })

  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  })

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-danger-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              24/7 Emergency Response Available
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Rapid Recovery<br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                When Disaster Strikes
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Australia's most trusted disaster recovery specialists. Water damage, fire restoration, 
              mold remediation, and storm damage repair with guaranteed 60-minute response times.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="tel:1800DISASTER"
                className="group bg-danger-600 hover:bg-danger-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <Phone className="w-6 h-6" />
                <span>Call 1800 DISASTER</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link
                to="/emergency"
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 flex items-center space-x-3"
              >
                <Shield className="w-6 h-6" />
                <span>Emergency Request</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: statsVisible ? 1 : 0, 
                  scale: statsVisible ? 1 : 0.5 
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: servicesVisible ? 1 : 0, y: servicesVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              Emergency <span className="text-primary-600">Recovery Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: servicesVisible ? 1 : 0, y: servicesVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Professional disaster recovery services available 24/7 across Australia
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: servicesVisible ? 1 : 0, y: servicesVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group card hover:shadow-2xl cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Clock className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Don't Wait - Every Minute Counts
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our emergency response team is standing by 24/7, ready to minimize damage 
                and begin restoration immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:1800DISASTER"
                  className="bg-danger-600 hover:bg-danger-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <Phone className="w-6 h-6" />
                  <span>Emergency Hotline</span>
                </a>
                <Link
                  to="/emergency"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20 flex items-center justify-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>Request Service Online</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}