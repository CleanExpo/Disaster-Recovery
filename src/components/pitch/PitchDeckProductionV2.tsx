'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { useAudioPlayer, useGlobalAudioPlayer } from 'react-use-audio-player'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Maximize2, ChevronLeft, ChevronRight, RotateCcw,
  TrendingUp, DollarSign, Users, Globe, Zap, Target, Award, 
  ChartBar, Brain, Rocket, Shield, ArrowRight, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'

interface Slide {
  id: number
  title: string
  content: React.ReactNode
  narration: string
  duration: number
  audioUrl?: string
}

export default function PitchDeckProductionV2() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [audioUrls, setAudioUrls] = useState<Map<number, string>>(new Map())
  
  const swiperRef = useRef<SwiperType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Audio player hook
  const { load, play, pause, stop, playing, duration, getPosition } = useAudioPlayer()

  const slides: Slide[] = [
    {
      id: 1,
      title: "Disaster Recovery Reimagined",
      narration: "Welcome to the future of disaster recovery. We're transforming a one billion dollar Australian market with cutting-edge AI orchestration, creating an unstoppable platform positioned for explosive ten times growth.",
      duration: 8000,
      content: (
        <div className="text-center h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-white mb-4">
              Disaster Recovery
            </h1>
            <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Reimagined with AI
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl text-gray-100 mb-8 max-w-4xl mx-auto"
          >
            Transforming a $1B Australian market with AI orchestration,
            creating an unstoppable platform positioned for 10x growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-2 text-blue-200"
          >
            <Rocket className="h-8 w-8" />
            <span className="text-xl font-semibold">Investment Opportunity</span>
          </motion.div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      narration: "The disaster recovery industry is broken. Recovery is slow, inefficient, and frustrating for property owners. Insurance claims take weeks to process with high rejection rates. Contractors struggle to find consistent, quality jobs. There's no unified platform connecting all stakeholders efficiently.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Target className="h-12 w-12 text-red-400" />
            The Problem
          </motion.h2>
          
          <div className="space-y-6">
            {[
              "Disaster recovery is slow, inefficient, and frustrating for property owners",
              "Insurance claims take weeks to process with high rejection rates", 
              "Contractors struggle to find consistent, quality jobs",
              "No unified platform connecting all stakeholders efficiently"
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="bg-red-500/20 p-2 rounded-lg mt-1">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-xl text-gray-100">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      narration: "We've built Australia's first AI-powered disaster recovery platform. Our solution instantly connects property owners with qualified contractors, processes insurance claims in minutes not weeks, and provides contractors with pre-qualified, high-value jobs. The platform operates twenty-four seven with minimal overhead.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Zap className="h-12 w-12 text-green-400" />
            Our Solution
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-8">
            {[
              { icon: Brain, title: "AI-Powered Platform", desc: "Instant contractor matching with AI orchestration" },
              { icon: Shield, title: "Insurance Automation", desc: "Claims processed in minutes, not weeks" },
              { icon: Users, title: "Contractor Network", desc: "Pre-qualified, high-value jobs for contractors" },
              { icon: Globe, title: "24/7 Operation", desc: "Automated platform with minimal overhead" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/30"
              >
                <item.icon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Market Opportunity",
      narration: "The Australian disaster recovery market is valued at over one billion dollars annually, with fifteen percent year-over-year growth driven by increasing natural disasters and climate events. Currently, the market is highly fragmented with no dominant digital platform. This creates a massive opportunity for disruption.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <TrendingUp className="h-12 w-12 text-green-400" />
            Market Opportunity
          </motion.h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-900/30 to-blue-900/30 p-6 rounded-xl border border-green-500/30 text-center"
            >
              <DollarSign className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-2">$1B+</h3>
              <p className="text-gray-300">Australian Market Size</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30 text-center"
            >
              <ChartBar className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-2">15%</h3>
              <p className="text-gray-300">Annual Growth Rate</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-500/30 text-center"
            >
              <Globe className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
              <p className="text-gray-300">Digital Opportunity</p>
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-100 text-center max-w-3xl mx-auto"
          >
            No dominant digital platform exists. The market is fragmented and ripe for disruption.
            We're positioned to capture significant market share with our AI-powered solution.
          </motion.p>
        </div>
      )
    },
    {
      id: 5,
      title: "Revenue Model",
      narration: "Our revenue model is built on three key pillars. First, contractor subscriptions starting at five hundred dollars per month for platform access. Second, lead generation fees of fifty to two hundred dollars per qualified insurance claim. Third, premium features including AI claim optimization and priority matching for enterprise clients.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <DollarSign className="h-12 w-12 text-green-400" />
            Revenue Model
          </motion.h2>
          
          <div className="space-y-6">
            {[
              { 
                title: "Contractor Subscriptions", 
                price: "$500+/month",
                desc: "Platform access for verified contractors",
                color: "from-blue-900/30 to-purple-900/30",
                borderColor: "border-blue-500/30"
              },
              { 
                title: "Lead Generation", 
                price: "$50-200/lead",
                desc: "Qualified insurance claims distributed to contractors",
                color: "from-green-900/30 to-emerald-900/30",
                borderColor: "border-green-500/30"
              },
              { 
                title: "Premium Features", 
                price: "Enterprise pricing",
                desc: "AI claim optimization, priority matching, analytics",
                color: "from-purple-900/30 to-pink-900/30",
                borderColor: "border-purple-500/30"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-gradient-to-r ${item.color} p-6 rounded-xl border ${item.borderColor} flex items-center justify-between`}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Traction & Growth",
      narration: "We've achieved significant early traction with over two hundred contractors on our platform, processing more than fifty thousand dollars in monthly claims volume. Our AI has reduced claim processing time by ninety percent, and we maintain a ninety-five percent contractor satisfaction rate. We're growing at thirty percent month-over-month.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Rocket className="h-12 w-12 text-purple-400" />
            Traction & Growth
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-8 rounded-xl border border-green-500/30 text-center"
            >
              <Users className="h-10 w-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">200+</h3>
              <p className="text-xl text-gray-300">Active Contractors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8 rounded-xl border border-blue-500/30 text-center"
            >
              <DollarSign className="h-10 w-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">$50K+</h3>
              <p className="text-xl text-gray-300">Monthly Claims Volume</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-xl border border-purple-500/30 text-center"
            >
              <Zap className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">90%</h3>
              <p className="text-xl text-gray-300">Faster Processing</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-8 rounded-xl border border-orange-500/30 text-center"
            >
              <Award className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-2">95%</h3>
              <p className="text-xl text-gray-300">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Investment Opportunity",
      narration: "We're raising two million dollars to accelerate growth and capture the market. This investment will fuel national expansion, enhance our AI capabilities, scale our contractor network, and develop enterprise features. We're offering a twenty percent equity stake with a clear path to ten times return on investment.",
      duration: 10000,
      content: (
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"
          >
            <Target className="h-12 w-12 text-yellow-400" />
            Investment Opportunity
          </motion.h2>
          
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-8 rounded-xl border border-yellow-500/30 mb-8">
            <div className="text-center mb-8">
              <h3 className="text-5xl font-bold text-yellow-400 mb-2">$2M</h3>
              <p className="text-2xl text-white">Seed Round</p>
              <p className="text-xl text-gray-300 mt-2">20% Equity • 10x Return Potential</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "National Expansion", desc: "Scale to all major Australian cities" },
                { title: "AI Enhancement", desc: "Advanced claim processing and matching" },
                { title: "Contractor Network", desc: "10x growth in verified contractors" },
                { title: "Enterprise Features", desc: "Insurance company integrations" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <ArrowRight className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Join Us",
      narration: "Together, we're building the future of disaster recovery in Australia. Join us in transforming a billion-dollar industry with AI-powered innovation. Let's create a platform that helps thousands of property owners recover faster while building a sustainable, profitable business. Thank you for your time and consideration.",
      duration: 8000,
      content: (
        <div className="text-center h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h2 className="text-6xl font-bold text-white mb-6">
              Join the Revolution
            </h2>
            <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
              Transform Disaster Recovery with AI
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-12"
          >
            <p className="text-2xl text-gray-100">✓ $1B+ Market Opportunity</p>
            <p className="text-2xl text-gray-100">✓ Proven AI Technology</p>
            <p className="text-2xl text-gray-100">✓ Strong Early Traction</p>
            <p className="text-2xl text-gray-100">✓ 10x Return Potential</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Let's Build Together</h3>
            <p className="text-xl text-gray-100">
              Contact us to learn more about this investment opportunity
            </p>
          </motion.div>
        </div>
      )
    }
  ]

  // Preload audio for all slides when component mounts
  useEffect(() => {
    const preloadAudio = async () => {
      setIsLoading(true)
      const newAudioUrls = new Map<number, string>()
      
      for (const slide of slides) {
        try {
          const response = await fetch('/api/elevenlabs/narrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: slide.narration })
          })
          
          if (response.ok) {
            const audioBlob = await response.blob()
            const audioUrl = URL.createObjectURL(audioBlob)
            newAudioUrls.set(slide.id, audioUrl)
          }
        } catch (error) {
          console.error(`Failed to load audio for slide ${slide.id}:`, error)
        }
      }
      
      setAudioUrls(newAudioUrls)
      setAudioReady(true)
      setIsLoading(false)
    }
    
    if (audioEnabled) {
      preloadAudio()
    }
    
    return () => {
      // Cleanup audio URLs
      audioUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [audioEnabled])

  // Handle slide change
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const newSlide = swiper.activeIndex
    setCurrentSlide(newSlide)
    setProgress(0)
    
    // Stop current audio
    stop()
    
    // Play new slide audio if available
    if (audioEnabled && audioUrls.has(slides[newSlide].id)) {
      const audioUrl = audioUrls.get(slides[newSlide].id)
      if (audioUrl) {
        load(audioUrl, {
          autoplay: isPlaying,
          onend: () => {
            // Auto advance to next slide
            if (newSlide < slides.length - 1 && isPlaying) {
              swiper.slideNext()
            } else {
              setIsPlaying(false)
            }
          }
        })
      }
    }
    
    // Update progress bar
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    if (isPlaying) {
      const duration = slides[newSlide].duration
      const increment = 100 / (duration / 100)
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return 100
          }
          return prev + increment
        })
      }, 100)
    }
  }, [audioEnabled, audioUrls, isPlaying, slides, load, stop])

  // Start/Stop presentation
  const togglePresentation = () => {
    if (isPlaying) {
      setIsPlaying(false)
      pause()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      swiperRef.current?.autoplay.stop()
    } else {
      setIsPlaying(true)
      play()
      swiperRef.current?.autoplay.start()
    }
  }

  // Reset presentation
  const resetPresentation = () => {
    setIsPlaying(false)
    setCurrentSlide(0)
    setProgress(0)
    stop()
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    swiperRef.current?.slideTo(0)
    swiperRef.current?.autoplay.stop()
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key) {
        case ' ':
          e.preventDefault()
          togglePresentation()
          break
        case 'ArrowRight':
          e.preventDefault()
          swiperRef.current?.slideNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          swiperRef.current?.slidePrev()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          resetPresentation()
          break
        case 'm':
        case 'M':
          e.preventDefault()
          setAudioEnabled(!audioEnabled)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [audioEnabled, togglePresentation])

  return (
    <div 
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden"
      style={{ minHeight: isFullscreen ? '100vh' : '600px' }}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="text-white text-xl">Loading presentation audio...</div>
        </div>
      )}

      {/* Swiper Slideshow */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onSlideChange={handleSlideChange}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: slides[currentSlide]?.duration || 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        className="h-full"
        style={{ minHeight: isFullscreen ? '100vh' : '500px' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-full flex items-center justify-center px-12 py-8">
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev !text-white/70 !left-4" />
      <button className="swiper-button-next !text-white/70 !right-4" />

      {/* Control Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        {/* Progress Bar */}
        <Progress value={progress} className="mb-4 h-1" />
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={togglePresentation}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              disabled={!audioReady && audioEnabled}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  {audioReady || !audioEnabled ? 'Play' : 'Loading...'}
                </>
              )}
            </Button>
            
            <Button
              onClick={resetPresentation}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}